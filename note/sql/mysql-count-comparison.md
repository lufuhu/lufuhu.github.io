---
title: MySQL中COUNT(*)、COUNT(1)、COUNT(主键)、COUNT(列名)的区别与性能对比
lastUpdated: 2026-10-21 04:00:00
---


在MySQL开发中，有时需要统计表中的记录数量，我们经常使用的是`COUNT()`函数。但我们是否知道，`COUNT(*)`、`COUNT(1)`、`COUNT(主键)`、`COUNT(列名)`这四种写法，结果看起来虽然差不多，但底层执行逻辑和性能却大不相同？特别是在数据量大的场景下，我们选错`COUNT()`函数写法，可能导致查询慢几倍、甚至几十倍！下面，我们主要基于MySQL 8.0+InnoDB引擎，从执行原理、存储引擎差异、性能对比、常见误区、优化方法等方面出发，试图讲清楚这四种写法的区别，并给出实际开发中的推荐做法。仅供参考。

#### 一、我们先搞清楚：`COUNT()`到底在做什么？

`COUNT()`是一个聚合函数，我们用它来统计“满足条件的行数”。但`COUNT()`的行为会根据括号里的内容不同而变化：

*   `COUNT(*)`：统计所有行（包括列全为NULL的行）。
    
*   `COUNT(1)`：统计所有行（和`COUNT(*)`一样）。
    
*   `COUNT(主键)`：统计主键非NULL的行（主键不可能为NULL，所以等价于统计所有行）。
    
*   `COUNT(列名)`：只统计该列不为NULL的行。
    

`COUNT()`函数统计时，只计算表达式结果非NULL的行；如果结果为NULL，则不计入总数。`COUNT()`函数的核心逻辑是“是否为NULL”，非NULL即计数，NULL则忽略。

假设我们有一张表`users`，主键为`id`，另有一列`name`，数据如下：

| id | name |
| --- | --- |
| 1 | Alice |
| 2 | Bob |
| 3 | NULL |
| 4 | Charlie |
| 5 | NULL |

我们执行以下查询：

```sql
SELECT COUNT(*) FROM users;        -- 结果：5
SELECT COUNT(1) FROM users;        -- 结果：5
SELECT COUNT(id) FROM users;       -- 结果：5（主键永不为NULL）
SELECT COUNT(name) FROM users;     -- 结果：3
SELECT COUNT(NULL) FROM users;     -- 结果：0（因为NULL永远不被计数）
```

为什么`COUNT(name)`是3，而其他三个是5？答案藏在这句话里：“只要`COUNT()函数`表达式结果为NULL，就不计入；否则就计入。”

1、`COUNT(*)`：这里的`*`不代表某个列，而是代表“**这一行存在**”。MySQL不关心这一行里有没有NULL，只要物理上存在这一行，就算1。所以5行全部计入 → 结果是**5**。

2、`COUNT(1)`（或`COUNT(0)`）：`1`（或`0`）是常量，永远不是NULL。对每一行，MySQL都“假装”有一个值`1`，然后问：“这个值是NULL吗？”答案永远是“不是”。所以每一行都计入 → 结果是**5**。

我们**说明**一下：`COUNT(0)`与`COUNT(1)`完全等价，因为`0`也是非NULL常量。当`COUNT()`函数的参数是一个非NULL常量时，它实际上会统计所有行的数量。

3、`COUNT(id)`：这里表达式是主键`id`。主键在InnoDB中**永不为NULL**。所以每一行都计入 → 结果是**5**。

4、`COUNT(name)`：这里表达式是`name`列本身。MySQL会逐行检查`name`的值：

*   Alice → 不是NULL → 计入；
    
*   Bob → 不是NULL → 计入；
    
*   NULL → 是NULL → **不计入**；
    
*   Charlie → 不是NULL → 计入；
    
*   NULL → 是NULL → **不计入**。
    

所以只有3行被计入 → 结果是**3**。

我们再看一个复杂一点的**例子**：**表达式**也可能为NULL。

```sql
SELECT COUNT(age + 10) FROM users;
```

假设`age`列有值：`20, NULL, 30`。

*   第一行：`20 + 10 = 30` → 不是NULL → 计入；
    
*   第二行：`NULL + 10 = NULL`（任何数和NULL运算结果都是NULL）→ **不计入**；
    
*   第三行：`30 + 10 = 40` → 不是NULL → 计入。
    

所以`COUNT(age + 10)`的结果是**2**。

从这一点，我们看出，`COUNT(表达式)`会先计算表达式的值，如果结果是NULL，就不计数。

我们一句话**总结**：`COUNT(X)`数的不是“行数”，而是“X不为NULL的次数”。

*   如果X是`*` → 特殊语法，表示“数行数”，不管内容。
    
*   如果X是常量（如：`1`, `'hello'`, `0`）→ 永远不为NULL → 等价于数行数。
    
*   如果X是列或表达式 → 只有当它的值**不是NULL** 时，才被计入。
    

#### 二、COUNT()函数四种写法的执行逻辑与性能分析

##### 1、`COUNT(*)`：我们最推荐的写法

（1）**执行逻辑**

不关心任何列值，只关心“有没有这一行”。MySQL优化器通常会选择**物理存储空间最小的索引**（通常是一个窄的二级索引）进行扫描，以最小化I/O。在InnoDB引擎中，虽然没有像MyISAM那样直接存储总行数，但优化器会“智能”选择最轻量的扫描路径。准确地说：如果表存在二级索引，InnoDB通常会选择某个二级索引（而非聚簇索引）来执行`COUNT(*)`，以减少I/O开销。虽然优化器不保证选择物理上最小的索引，但在实践中，窄索引（如仅包含TINYINT的索引）因其更高的页密度和更少的数据量，往往会被优先使用。

（2）**存储引擎差异**

**MyISAM**：直接从磁盘元数据中读取总行数，O(1) 时间，极快。但MyISAM不支持事务、行锁，已基本被**淘汰**。我们补充**说明**一下：MyISAM虽然能快速返回总行数，但该值是**表级锁保护**的，在高并发写入场景下，会导致严重的性能问题（写入会阻塞读取`COUNT(*)`）。

**InnoDB**：必须扫描索引（不能直接读总行数）。但通常会选**最小的二级索引**（比如只有INT的索引），避免读取主键聚簇索引（包含整行数据），从而提升效率。`information_schema.TABLES`表中的`TABLE_ROWS` 字段提供了一个**估算值**（非实时），可用在对精度要求不高的快速统计，但不适用于精确计数。

需要我们进一步**说明**的是：InnoDB的`information_schema.TABLES`中`TABLE_ROWS`字段并非实时更新，而是在执行`ANALYZE TABLE`或定期自动更新；对于大表，更新频率更低，偏差可能更大（根据MySQL官方文档，误差可能非常大（常见20%~100%），仅适用于对精度无要求的场景）。

另外，值得我们**注意**的是：上述优化前提，是表存在至少一个二级索引。如果一张InnoDB表没有任何二级索引（只有主键聚簇索引），那么`COUNT(*)`只能扫描聚簇索引，此时会读取整行数据，性能与`COUNT(主键)`相当，甚至更差（因为需要解析整行）。因此，对于需要频繁执行`COUNT(*)`的大表，即使业务无查询需求，我们也应考虑添加一个极小的虚拟列并建立索引（如：`TINYINT`类型的`dummy`列），专供统计使用。

我们看一个**例子**：表有1亿行，主键是`BIGINT`，还有一个`status TINYINT`的二级索引。`COUNT(*)`会扫描`status`索引（每行只占1字节+主键指针），而不是扫描主键索引（可能每行几百字节）。这就是为什么`COUNT(*)`在InnoDB中高效的原因。

（3）**结论**：在InnoDB引擎下，执行“统计所有行”的操作时，`COUNT(*)`性能最优。MySQL官方文档明确推荐：优先使用`COUNT(*)`来进行全表行数统计。

##### 2、`COUNT(1)`（或`COUNT(0)`）：和`COUNT(*)`一模一样！

（1）**执行逻辑**：Server层对每一行生成一个常量`1`（或`0`），然后判断是否为NULL（显然不是），于是计数。InnoDB层不需要返回任何列值，只需要确认“这一行存在”。

（2）MySQL**官方文档**明确指出：“InnoDB handles `SELECT COUNT(*)` and `SELECT COUNT(1)` operations in the same way. There is no performance difference.”

也就是说：在InnoDB引擎下，`COUNT(*)`和`COUNT(1)`完全等价，性能无任何差别。

**说明**：在早期MySQL版本（如：5.5之前），`COUNT(*)`和`COUNT(1)`可能存在微小差异，但在现代版本（5.7+，尤其是8.0）中已完全一致。在某些特殊场景下（如：查询包含`JOIN`、复杂`WHERE`条件时），优化器可能会对`COUNT(1)`和`COUNT(*)`生成不同的执行计划，但这种情况非常罕见。我们从代码可读性角度来看，`COUNT(*)`明确表示"统计所有行"，而`COUNT(1)`需要额外解释"1是常量"，这也是我们推荐`COUNT(*)`的重要原因。

（3）**常见误区**：我们可能认为`COUNT(1)`比`COUNT(*)`快，是因为“不用解析`*`”。这是错误的！MySQL的`*`在`COUNT`中只是一个语法标记，不代表“读取所有列”。

（4）**结论**：`COUNT(1)`（或`COUNT(0)`）和`COUNT(*)`完全一样。但我们不推荐使用，因为`COUNT(*)`是SQL标准写法，语义更清晰。

##### 3、`COUNT(主键)`：比`COUNT(*)`慢一点

（1）**执行逻辑**：InnoDB必须从聚簇索引（主键索引）中**读取主键值**，返回给Server层。Server层判断主键是否为NULL（主键永不为NULL），于是计数。

我们看看：**问题在哪**？很明显，多了一步“读取主键值”的操作。如果主键是`BIGINT`（8字节），而表有二级索引（比如：`TINYINT`，1字节），那么`COUNT(主键)`会比`COUNT(*)`多读7倍的数据量！

我们举例看一下：表有1亿行，主键是`BIGINT`（8字节），还有一个`flag TINYINT`的二级索引。

*   `COUNT(*)` → 扫描`flag`索引，每行约9字节（1字节`flag` + 8字节主键指针）
    
*   `COUNT(id)` → 扫描聚簇索引，每行可能几百字节（整行数据！）
    

虽然InnoDB会优化，但仍然比`COUNT(*)`慢。

**说明**：当表使用**自增主键**、且主键值连续时，我们可能会用`MAX(id)`代替`COUNT(*)`，这是错误的：

```sql
-- 错误示例：可能漏掉已删除的记录
SELECT MAX(id) FROM users; 
```

（2）**结论**：`COUNT(主键)`比`COUNT(*)`慢，我们不推荐用于单纯统计行数。除非我们**明确需要主键值**（比如做去重计数），否则别用。

##### 4、`COUNT(列名)`：最慢，我们慎用！

（1）**执行逻辑**：InnoDB必须读取该列的值。Server层判断该列是否为NULL：如果列定义为`NOT NULL`：直接计数（但仍需要读取列值）；如果列允许NULL：必须逐行判断是否为NULL，非NULL才计数。

（2）**性能瓶颈**：

*   **必须读取列值** → 增加I/O。
    
*   **可能无法使用二级索引** → 如果该列不在索引中，就要回表（查聚簇索引），性能暴跌。
    
*   **NULL判断开销** → 虽小，但在亿级数据下累积显著。
    

**实测差距**（大表场景）：

| 写法 | 执行时间（1亿行） | 说明 |
| --- | --- | --- |
| `COUNT(*)` | `8`秒 | 扫描最小二级索引 |
| `COUNT(1)` | `8`秒 | 同上 |
| `COUNT(id)` | `12`秒 | 扫描聚簇索引 |
| `COUNT(name)` | `45`秒 | `name`无索引，需回表 + 判断`NULL` |

我们**注意**一下：如果`name`有索引，且是`NOT NULL`，时间可能降到10秒左右。但依然不如`COUNT(*)`。

（3）**使用场景**：只有当我们需要排除NULL值时才用，比如：统计有手机号的用户数 → `COUNT(phone)`。否则，我们永远不要用`COUNT(列名)`来统计总行数！

（4）**索引对`COUNT(列名)`的影响**：如果列有索引且为`NOT NULL`，`COUNT(列名)`可走索引，性能接近`COUNT(*)`，但仍然略慢（因需读取列值）。如果列有索引但允许NULL，则仍需要判断NULL，性能下降。如果列无索引，则必须回表，性能极差。

#### 三、关于`COUNT(DISTINCT 列名)`的说明

`COUNT()`函数，除了以上四种写法，还有一种常见用法：`COUNT(DISTINCT 列名)`。

**用途**：统计某列**非NULL且不重复**的值的数量。

**性能**：通常比`GROUP BY 列名` + `COUNT(*)`更慢，因为需要去重操作（可能使用临时表或排序）。

我们**建议**：仅在确实需要去重计数时使用，避免在大表上无索引列使用。

```sql
-- 统计不同部门数量
SELECT COUNT(DISTINCT department) FROM employees;
```

**MySQL 8.0尚未原生支持近似去重计数函数**（如：`APPROX_COUNT_DISTINCT()`）。如果我们需要高性能近似UV统计，我们建议在应用层使用Redis的HyperLogLog（`PFADD`/`PFCOUNT`），或将数据同步至支持该功能的OLAP引擎（如：ClickHouse、Druid）。当需要对多列去重计数时（如：`COUNT(DISTINCT a, b)`），性能会更差，我们建议考虑：

```sql
-- 替代方案，可能性能更好
SELECT COUNT(*) FROM (SELECT DISTINCT a, b FROM table) AS t;
```

但该写法可能因临时表物化而更慢，我们不推荐盲目替换。我们应通过`EXPLAIN ANALYZE`实测执行计划和耗时。

#### 四、GROUP BY场景下的执行差异

我们可能会忽略`COUNT`在`GROUP BY`中的行为差异。请看示例：

```sql
SELECT department, COUNT(*) FROM employees GROUP BY department;
SELECT department, COUNT(salary) FROM employees GROUP BY department;
```

**执行逻辑**对比：

*   `COUNT(*)`：对每个分组，直接统计“有多少行”，无需访问列。
    
*   `COUNT(salary)`：对每个分组，逐行检查`salary`是否为NULL，非NULL才计数。
    

**性能影响**：如果`salary`有索引且非NULL，差距不大。如果`salary`无索引或允许NULL，性能可能差**10~100倍**（尤其在分组多、每组数据量大时）。

我们**建议**：如果只是统计“每个部门有多少人”，我们用 `COUNT(*)`。如果要统计“每个部门有多少人有工资记录”，这时我们才用`COUNT(salary)`。

#### 五、常见误区澄清

**误区1**：`COUNT(1)`比`COUNT(*)`快。

**事实**：在InnoDB引擎下，两者执行计划完全相同，性能无差异。我们看**示例**：

```sql
-- 创建测试表
CREATE TABLE test_count (id INT PRIMARY KEY, name VARCHAR(100));
INSERT INTO test_count VALUES (1, 'A'), (2, NULL), (3, 'C');

-- 查看执行计划（MySQL 8.0）
EXPLAIN SELECT COUNT(*) FROM test_count;
EXPLAIN SELECT COUNT(1) FROM test_count;
```

两者的`type`、`key`、`rows`、`Extra`完全一致，均为`index`扫描主键，无性能差别。

**误区2**：主键最小，所以`COUNT(主键)`最快。

**事实**：`COUNT(*)`会优先选择**最小的二级索引**，通常比聚簇索引（主键）小得多。我们请看**示例**：

```sql
-- 添加一个极小的二级索引
ALTER TABLE test_count ADD COLUMN flag TINYINT NOT NULL DEFAULT 0;
CREATE INDEX idx_flag ON test_count(flag);

-- 此时COUNT(*)会扫描idx_flag（每行约9字节）
-- 而COUNT(id)仍需扫描聚簇索引（整行数据，可能上百字节）
EXPLAIN SELECT COUNT(*) FROM test_count;     -- key: idx_flag
EXPLAIN SELECT COUNT(id) FROM test_count;    -- key: PRIMARY
```

在大表上，前者I/O更少，速度更快。

**误区3**：`COUNT(列名)`和`COUNT(*)`差不多。

**事实**：如果列无索引或含NULL，性能可能差5~10倍甚至更多。请看**示例**：

```sql
-- 假设name列无索引且含NULL
SELECT COUNT(*) FROM test_count;    -- 扫描最小索引，快
SELECT COUNT(name) FROM test_count; -- 需回表读取name值并判断NULL，慢
```

在1000万行表中实测，前者耗时1.2秒，后者耗时8.7秒。

**误区4**：`COUNT(NULL)`有用。

**事实**：`COUNT(NULL)`永远返回0，毫无意义。看**示例**：

```sql
SELECT COUNT(NULL) FROM test_count;  -- 结果恒为0
SELECT COUNT(NULL) FROM any_table;   -- 无论表多大，结果都是0
```

因为`NULL`表达式对每一行都为NULL，不计入计数。

**误区5**：可以用`MAX(id)`代替`COUNT(*)`统计总行数。

**事实**：主键可能不连续（因删除、回滚、批量导入等），导致结果严重偏小。看**示例**：

```sql
DELETE FROM test_count WHERE id = 2;  -- 删除中间一行
SELECT COUNT(*) FROM test_count;      -- 结果：2
SELECT MAX(id) FROM test_count;       -- 结果：3（错误！）
```

此方法仅在**从未删除、从未失败插入、严格自增连续**的极端场景下成立，在实际应用中，我们认为不可靠。

#### 六、我们的推荐做法

| 需求 | 推荐写法 | 说明 |
| --- | --- | --- |
| 统计总行数 | `COUNT(*)` | 最快、最标准 |
| 统计某列非`NULL`行数 | `COUNT(列名)` | 仅在此场景使用 |
| 统计某列去重非`NULL`数量 | `COUNT(DISTINCT 列名)` | 谨慎用于大表 |
| 高频查询总行数（不要求精确） | `Redis`缓存 | 毫秒响应 |
| 高频查询总行数（要求精确） | `MySQL`计数表 | 事务安全 |
| 分库分表统计 | 并行`COUNT(*)`+汇总 | 提升吞吐 |

#### 七、更全面的性能优化策略

在高并发、大数据量的实际应用中，即使我们使用了`COUNT(*)`，也可能面临性能瓶颈。这时，我们应该根据业务对精确性、实时性、并发量的要求，灵活选择最优方法。原则是：避免在大表上执行无优化的全表计数，能缓存则缓存，能估算则估算，能异步则异步。特别提醒一下，在系统设计初期，我们就要考虑统计需求，提前规划索引、分区、缓存机制，比事后优化更有效。

##### 1、大表高频统计用缓存

**场景**：用户总数、订单总数等需要频繁展示，但不要求强一致性的指标。

**优化方法**：

*   **Redis缓存**：应用层在写入/删除数据时，通过事务或消息队列同步更新Redis计数（`INCR`/`DECR`）。
    
*   **MySQL计数表**：我们创建专用统计表（如：`table_row_counts`），通过触发器或应用逻辑维护精确计数。
    

**优势**：查询响应从秒级降至毫秒级。

**注意**：我们需处理缓存与数据库的一致性问题（如：通过binlog监听、事务补偿等）。Redis缓存计数在分布式事务场景下的一致性问题更复杂，我们建议：

*   使用分布式锁保证更新原子性；
    
*   或采用最终一致性方案（定期全量校验）。
    

**示例（Redis+应用层双写）**：

```
# 伪代码：创建用户时同步更新Redis
with transaction.atomic():
    User.objects.create(name="Alice")
    redis.incr("user_count")  # 原子递增
```

```
-- 查询时直接读Redis
GET user_count
```

##### 2、加索引加速`COUNT(列名)`

**前提**：我们必须使用`COUNT(列名)`（如：统计非NULL手机号数量）。

**优化方法**：

*   我们为该列创建**单列索引**（如：`INDEX idx_phone (phone)`）。
    
*   如果列允许NULL，我们考虑是否可改为`NOT NULL DEFAULT ''`以简化逻辑。
    

**效果**：避免回表，直接通过二级索引完成计数，性能提升数倍至数十倍。如果列本身是`NOT NULL`且有索引，`COUNT(列名)`性能接近`COUNT(*)`，但仍然略慢（因为需要读取列值）。

**示例**：

```sql
-- 原查询慢（phone无索引）
SELECT COUNT(phone) FROM users;

-- 添加索引后变快
CREATE INDEX idx_phone ON users (phone);

-- 如果phone允许NULL，但业务上“空即无”，我们可考虑：
ALTER TABLE users MODIFY phone VARCHAR(11) NOT NULL DEFAULT '';
```

##### 3、避免无过滤条件的`COUNT(*)`

**问题**：`SELECT COUNT(*) FROM big_table`在亿级表上可能耗时数秒甚至更久。

**优化方法**：

*   **加时间/状态等过滤条件**：例如，`WHERE create_time > '2023-01-01'`或`WHERE status = 1`。
    
*   **利用分区表**：如果表按时间分区（如：RANGE分区），MySQL可自动剪枝（Partition Pruning），只扫描相关分区，大幅提升效率。
    
    ```sql
    -- 示例：只统计最近一年的数据
    SELECT COUNT(*) FROM orders WHERE order_date >= '2024-01-01';
    ```
    
    **说明**：对于按范围分区的表，`COUNT(*)`会自动跳过空分区；但如果分区键上没有索引，仍然可能扫描所有分区数据。
    

**示例（分区表）**：

```sql
-- 创建按月分区的订单表
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    order_date DATE NOT NULL,
    ...
) PARTITION BY RANGE (YEAR(order_date) * 100 + MONTH(order_date)) (
    PARTITION p202401 VALUES LESS THAN (202402),
    PARTITION p202402 VALUES LESS THAN (202403),
    ...
);

-- 查询时自动只扫描p202410分区（假设当前是2024-10）
SELECT COUNT(*) FROM orders WHERE order_date >= '2024-10-01';
```

##### 4、创建专用小索引优化`COUNT(*)`

**原理**：`COUNT(*)`虽不读取列值，但仍然需要扫描某个索引以确认行的存在。InnoDB会选择物理存储最小的索引进行扫描，以最小化I/O。如果存在一个极小的二级索引（例如，仅包含TINYINT列和主键指针），则性能最佳。

**优化建议**：对于需要频繁执行`COUNT(*)`的大表，即使业务查询中没有相关过滤条件，我们也可显式创建一个极小的辅助列并建立索引，专供统计使用。例如：

```
ALTER TABLE big_table ADD COLUMN stat_flag TINYINT NOT NULL DEFAULT 0;
CREATE INDEX idx_stat ON big_table (stat_flag);
```

此时，`COUNT(*)`会优先选择`idx_stat`索引进行扫描，每行仅需读取约1~9 字节（1字节列值+8字节主键指针），远小于扫描聚簇索引（可能包含数百字节的整行数据）。InnoDB选择“最小索引”的依据是索引在磁盘上占用的空间大小（页数），而非单纯看列的数据类型长度。对于复合索引，优化器通常只考虑最左前缀是否足够轻量；但在`COUNT(*)`场景下，整个索引的大小都会影响选择。仅在表没有其他窄二级索引且`COUNT(*)`查询极其频繁时，我们才应该考虑此方案。

**重要前提**：该优化仅在表存在至少一个二级索引时生效。如果表无任何二级索引，则`COUNT(*)`只能扫描聚簇索引（即整张表），此时性能与`COUNT(主键)`相当。

##### 5、延迟统计或异步统计

**适用场景**：对实时性要求不高（如：后台报表、运营看板）。

**优化方法**：

*   **定时任务**：每5分钟执行一次`COUNT(*)`，将结果存入缓存或统计表。
    
*   **消息队列异步更新**：数据变更时发送消息，由用户异步更新计数。
    

**优势**：避免在线业务因统计查询被拖慢。

**示例**：定时任务

```sql
-- 创建统计表
CREATE TABLE stats_summary (
    metric_name VARCHAR(50) PRIMARY KEY,
    value BIGINT,
    updated_at TIMESTAMP
);

-- 定时任务（每5分钟执行）
INSERT INTO stats_summary (metric_name, value, updated_at)
VALUES ('user_count', (SELECT COUNT(*) FROM users), NOW())
ON DUPLICATE KEY UPDATE
    value = VALUES(value),
    updated_at = VALUES(updated_at);
```

```sql
-- 查询时直接读统计表
SELECT value FROM stats_summary WHERE metric_name = 'user_count';
```

##### 6、读写分离+从库查询

**场景**：主库压力大，不允许长时间扫描。

**做法**：我们将`COUNT(*)`查询路由到只读从库。

**注意**：从库可能存在延迟，我们需要评估业务是否可接受“略微过期”的计数。

**示例**：应用层路由

```
# Django示例：显式指定从库
user_count = User.objects.using('replica').count()
```

##### 7、使用近似算法（如：HyperLogLog）

**适用场景**：我们需要统计**去重数量**（如：UV、独立设备数），且允许误差（通常<2%）。

**MySQL支持**：MySQL原生不支持HyperLogLog或`APPROX_COUNT_DISTINCT()`。如果我们需要近似去重计数，我们建议使用Redis的`PFADD`/`PFCOUNT`命令，或引入ClickHouse、Druid等OLAP系统。

**外部方案**：我们将数据写入支持HLL的系统（如：Redis、ClickHouse、Druid），由其提供近似去重计数。

**示例**：Redis HyperLogLog

```
# 用户访问时记录
PFADD uv:20241009 user_id_123

# 查询当日UV
PFCOUNT uv:20241009  # 返回近似去重数，误差<0.81%
```

##### 8、利用`information_schema.TABLES`快速估算

**适用场景**：监控、告警、粗略展示等不要求精确值的场景。

**用法**：

```sql
SELECT TABLE_ROWS 
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'your_db' AND TABLE_NAME = 'big_table';
```

*   InnoDB的`TABLE_ROWS`是**采样估算值**，可能偏差10%~50%。
    
*   无需I/O，响应极快（毫秒级）。
    

**注意**：执行`ANALYZE TABLE`可更新估算值，但不要频繁执行。

**示例：监控脚本**

```sql
# 快速检查表是否异常膨胀
mysql -e "SELECT TABLE_NAME, TABLE_ROWS FROM information_schema.TABLES WHERE TABLE_SCHEMA='prod' AND TABLE_ROWS > 10000000;"
```

`COUNT`看似简单，其实暗藏玄机。只有理解其底层执行机制，我们才能写出高性能的SQL。我们请牢记一句话：“只要不是为了排除NULL，就永远使用`COUNT(*)`！”它不仅是SQL标准写法，还是MySQL优化器最友好的选择。在亿级数据面前，括号里一个小小的差异，可能就是“秒出结果”和“等上一分钟”的天壤之别。