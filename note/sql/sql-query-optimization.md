---
title: SQL查询优化实践，先聚合再JOIN减少大表关联的计算量
lastUpdated: 2026-08-29 04:00:00
---


我们在做数据分析或写 SQL 时，有没有遇到过 “查个统计结果要等半天” 的情况？尤其是涉及订单表、用户表关联再统计时，数据量大了简直卡到崩溃。其实这里面的问题可能就一个：没搞对 “聚合” 和 “JOIN” 的顺序。下面我们就一起来用一些简单例子演绎一遍 “先聚合再 JOIN” 这个优化技巧，我们会发现，不管是小表测试还是千万级数据，“先聚合再 JOIN” 都能让查询速度飞起来。先介绍几个概念：

**聚合（Aggregation）**：是将多行数据按某个字段（如：`user_id`）分组，然后对每组数据进行统计计算（如：`SUM`, `COUNT`, `AVG` 等）。具体过程为：① 数据库扫描目标表（如：`orders`）；② 使用 `GROUP BY` 字段建立哈希表或排序结构；③ 对每组内的数据执行聚合函数，输出**每组一行**的结果。从而“大幅减少行数（从 N 行 → M 行，M << N）”。

**JOIN（连接）**：是根据关联字段（如：`user_id`）将两个表的数据合并。以 `INNER JOIN` 为例：数据库对两个表进行匹配，找出 `ON` 条件成立的行组合，常见实现方式：**Nested Loop**、**Hash Join**、**Merge Join**。`JOIN` 的计算复杂度与两个表的行数乘积相关，数据量越大，性能越差。

**优化思想**：我们要尽早减少数据量，避免在大数据集上做JOIN。如果“先JOIN再聚合”：先把所有订单和用户信息拼在一起，数据量大，再在大表上执行 JOIN 操作，一个字“慢”。如果“先聚合再JOIN”：先在订单表内聚合，变成“每个用户总金额”，再关联用户信息，JOIN 的数据量极小，一个字“快”。因此，我们在此场景做优化，必须是“**先聚合再JOIN**”。下面我们通过示例来具体拆解：

#### 一、创建模拟表及插入模拟数据

##### 1、创建用户表（users）

```sql
-- 创建用户表，存储用户基本信息
-- user_id 是主键，唯一标识每个用户
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(50)
);
```

##### 2、创建订单表（orders）

```sql
-- 创建订单表，记录每个订单的金额和所属用户
-- user_id 是外键，关联 users 表
-- 订单表通常比用户表大很多（一个用户有多个订单）
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    order_amount DECIMAL(10, 2),  -- 订单金额
    order_date DATE,
    -- 外键约束，关联users表的user_id
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    -- 显式为user_id建索引（外键会自动建，但显式更清晰）
    INDEX idx_orders_user_id (user_id)
);
```

##### 3、插入模拟数据

```sql
-- 插入3个用户
INSERT INTO users (user_id, user_name) VALUES
(1, 'Alice'),     -- 用户1：Alice
(2, 'Bob'),       -- 用户2：Bob
(3, 'Charlie');   -- 用户3：Charlie

-- 插入5个订单，其中 Alice 有2个订单，Bob 有2个，Charlie 有1个
INSERT INTO orders (order_id, user_id, order_amount, order_date) VALUES
(101, 1, 150.00, '2024-01-01'),  -- Alice 的订单
(102, 1, 200.00, '2024-01-02'),  -- Alice 的另一个订单
(103, 2, 75.00,  '2024-01-03'),  -- Bob 的订单
(104, 3, 300.00, '2024-01-04'),  -- Charlie 的订单
(105, 2, 125.00, '2024-01-05');  -- Bob 的另一个订单
```

#### 二、对比查询

##### 1、推荐做法：先聚合再JOIN

```sql
-- 优化策略：我们先对 orders 表按 user_id 聚合，计算每个用户的总消费
-- 这样可以把 5 行订单数据压缩成 3 行（每个用户一行）
-- 再与 users 表 JOIN，极大减少 JOIN 的数据量
SELECT
    u.user_name,           -- 用户姓名
    agg.total_amount       -- 聚合后的总金额
FROM
    users u                -- 主表：用户信息
JOIN (
    -- 子查询：先在订单表中完成聚合
    SELECT
        user_id,                           -- 分组字段
        SUM(order_amount) AS total_amount  -- 聚合函数：计算每个用户的订单总金额
    FROM
        orders                             -- 从订单表读取数据
    GROUP BY
        user_id                            -- 按用户ID分组，每个用户生成一行
    -- 结果：3行数据（user_id: 1,2,3），每行包含总金额
) AS agg ON u.user_id = agg.user_id;      -- 用 user_id 关联用户表
```

**执行过程分析**：  
（1）**聚合阶段**：`orders` 表 5 行 → 按 `user_id` 分组 → 得到 3 行聚合结果。  
（2）**JOIN阶段**：`users`（3行） JOIN `agg`（3行） → 匹配3行结果。  
（3）**总处理数据量小**，性能高。

**输出结果**：

| user\_name | total\_amount |
| --- | --- |
| Alice | 350.00 |
| Bob | 200.00 |
| Charlie | 300.00 |

##### 2、不推荐做法：先JOIN再聚合

```sql
-- 非优化策略：先JOIN再聚合
-- 问题：我们先把 users 和 orders 全部关联，生成中间大表，再聚合
SELECT
    user_name,                    -- 用户姓名
    SUM(order_amount) AS total_amount  -- 对每个用户的订单金额求和
FROM (
    -- 子查询：先做 JOIN，生成宽表
    SELECT
        u.user_name,              -- 用户名
        o.order_amount            -- 订单金额
    FROM
        users u                   -- 用户表
    JOIN
        orders o ON u.user_id = o.user_id  -- 关联订单表
    -- 结果：5行数据（每个订单一行），包含用户名和金额
) AS joined_data                -- 别名：连接后的中间表
GROUP BY
    user_name;                   -- 按用户名分组，再聚合
```

**执行过程分析**：  
（1）**JOIN阶段**：`users`（3行） × `orders`（5行） → 生成 **5行中间结果**（每个订单一行）。 （2）**聚合阶段**：对这5行按 `user_name` 分组求和。 （3）**问题**：JOIN 时处理了所有订单行，数据量大，浪费资源。

##### 3、性能对比

| 比较项 | 先聚合再JOIN | 先JOIN再聚合 |
| --- | --- | --- |
| JOIN前数据量 | orders 聚合后：3行 | orders 未聚合：5行 |
| JOIN操作规模 | 3行 vs 3行 | 3行 vs 5行（实际生成5行） |
| 内存使用 | 少 | 多（中间表更大） |
| I/O读取 | 少（聚合后数据小） | 多（JOIN前未压缩） |
| 扩展性 | 好（用户百万，订单亿级仍高效） | 差（JOIN爆炸） |

> **极端情况**：如果一个用户有1万笔订单，先JOIN会生成1万行中间数据，而先聚合只需1行。  
> **真实场景**：假设：`users` 表：100万用户；`orders` 表：10亿条订单，平均每个用户有1000条订单。
> 
> | 操作 | 数据量 |
> | --- | --- |
> | 直接 JOIN | 生成约 10亿 行中间表 ❌巨大 |
> | 先聚合再JOIN | 聚合后只剩 100万 行 ✅可控 |
> 
> **小结**：先聚合把“10亿行JOIN”变成“100万行JOIN”，性能以数量级提升！

##### 4、总结：为什么“先聚合再JOIN”是优化关键？

| 原则 | 说明 |
| --- | --- |
| **尽早聚合** | 在数据流入JOIN前，尽可能压缩数据量 |
| **JOIN小表** | 让JOIN操作作用在聚合后的“小结果集”上 |
| **避免宽表聚合** | 宽表（含重复维度）聚合效率低且易出错 |
| **分步处理** | 将复杂查询拆解为“聚合 → 关联 → 展示”三步 |
| **索引辅助** | 为 `GROUP BY` 和 `JOIN` 字段建立索引 |
| **尽早减少数据量** | 聚合是“数据压缩”操作，越早做，后续操作越快 |
| **减少JOIN成本** | JOIN 是昂贵操作，参与行数越少越好 |
| **符合执行计划优化器偏好** | 数据库优化器更喜欢小表JOIN，先聚合有助于生成高效执行计划 |
| **避免重复数据** | 先JOIN会导致用户信息重复（如：Alice出现2次），浪费资源 |

**优化建议**：  
（1）**对大表优先聚合**：如果 `orders` 是大表，先对它 `GROUP BY`。  
（2）**避免在JOIN后聚合**：除非必须保留明细。  
（3）**使用索引**：确保 `user_id` 在 `orders` 表上有索引，加速聚合和JOIN。  
（4）**考虑物化聚合表**：如：`user_summary` 表，定期更新，用于报表查询。

**结论**：“先聚合再JOIN”是一种基于“减少中间数据量”的优化策略，能显著提升查询性能，尤其在大数据量场景下效果惊人。

#### 三、拓展分析

下面我们从 **执行计划分析、索引优化、适用场景扩展** 等多个角度，进一步深化我们对“**先聚合再JOIN**”这一SQL优化原则的理解。

##### 1、查看执行计划（EXPLAIN）对比性能差异

以下以 **MySQL** 为例（其他数据库语法略有不同），我们使用 `EXPLAIN` 来观察两种写法在数据库中的执行路径差异。

**（1）查看“先聚合再JOIN”的执行计划**：

```sql
EXPLAIN
SELECT
    u.user_name,
    agg.total_amount
FROM
    users u
JOIN (
    SELECT
        user_id,
        SUM(order_amount) AS total_amount
    FROM
        orders
    GROUP BY
        user_id
) AS agg ON u.user_id = agg.user_id;
```

**执行计划分析（模拟输出）**：

| id | select\_type | table | type | possible\_keys | key | rows | Extra |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | PRIMARY | u | ALL | PRIMARY | NULL | 3 |  |
| 1 | PRIMARY |  | ALL | NULL | NULL | 3 |  |
| 2 | DERIVED | orders | ALL | NULL | NULL | 5 | Using temporary; Using filesort |

*   `<derived2>` 表示子查询生成的临时表（agg）。
    
*   `rows=5`：扫描了5条订单记录进行聚合。
    
*   聚合后只有3行参与JOIN，整体高效。
    
*   `Extra` 为 `Using temporary`; `Using filesort`：不要误解 “聚合一定会产生临时表和文件排序”。
    

**优点**：聚合在子查询中完成，JOIN时数据量小。

**（2）查看“先JOIN再聚合”的执行计划**：

```sql
EXPLAIN
SELECT
    user_name,
    SUM(order_amount) AS total_amount
FROM (
    SELECT
        u.user_name,
        o.order_amount
    FROM
        users u
    JOIN
        orders o ON u.user_id = o.user_id
) AS joined_data
GROUP BY
    user_name;
```

**执行计划分析（模拟输出）**：

| id | select\_type | table | type | rows | Extra |
| --- | --- | --- | --- | --- | --- |
| 1 | PRIMARY |  | ALL | 5 | Using temporary; Using filesort |
| 2 | DERIVED | u | ALL | 3 |  |
| 2 | DERIVED | o | ALL | 5 | Using where |

*   子查询中先执行 `JOIN`，生成5行中间结果。
    
*   外层再对这5行做 `GROUP BY` 和聚合。
    
*   执行计划中，id=1（外层聚合）的Extra显示Using temporary; Using filesort，这是因为外层需要对 JOIN 产生的中间结果进行GROUP BY操作 —— 数据库会创建临时表存储中间数据，并通过文件排序完成分组。而id=2（内层 JOIN）的Extra无此标记，说明 JOIN 过程本身不涉及临时表和排序操作。
    

**缺点**：中间结果大，聚合发生在宽表上，资源消耗更高。

##### 2、添加索引进一步优化

我们为 `orders.user_id` 添加索引，可显著提升聚合和JOIN性能。

```
-- 为 orders 表的 user_id 字段创建索引
-- 这样 GROUP BY user_id 和 JOIN user_id 都能走索引
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

**优化效果**：聚合时：`GROUP BY user_id` 可利用索引有序性，减少排序开销。JOIN时：数据库可通过索引快速定位匹配行，避免全表扫描。在亿级订单表中，此索引可将查询从分钟级降到毫秒级。

##### 3、（模拟）大数据量下的性能对比实验

我们扩展数据量，验证优化效果。（具体效果以试验机器为准）

**（1）插入更多数据（模拟10万订单）**：

```sql
-- 使用递归CTE生成大量测试订单（MySQL 8.0+ 支持）
INSERT INTO orders (order_id, user_id, order_amount, order_date)
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 100000  -- 生成10万行
)
SELECT
    1000 + n,                    -- order_id
    1 + (n % 3),                 -- user_id 循环分配给3个用户
    ROUND(RAND() * 500, 2),      -- 随机金额 0~500
    DATE_SUB('2024-01-01', INTERVAL (n % 365) DAY)  -- 随机日期
FROM nums;
```

现在：`users`：3 行；`orders`：100,000 行。

**（2）测试两种查询的执行时间**：

**方式一：先聚合再JOIN（快）**：

```sql
SELECT
    u.user_name,
    agg.total_amount
FROM
    users u
JOIN (
    SELECT user_id, SUM(order_amount) AS total_amount
    FROM orders
    GROUP BY user_id
) agg ON u.user_id = agg.user_id;
```

*   **执行时间**：约 **50ms**（有索引）
    
*   **逻辑读取**：少量数据页
    

**方式二：先JOIN再聚合（慢）**：

```sql
SELECT
    user_name,
    SUM(order_amount) AS total_amount
FROM (
    SELECT u.user_name, o.order_amount
    FROM users u JOIN orders o ON u.user_id = o.user_id
) t
GROUP BY user_name;
```

*   **执行时间**：约 **300ms+**
    
*   **原因**：需构建10万行中间表，再分组聚合，内存压力大
    

**结论**：数据量越大，性能差距越明显！由此可见，**“先聚合再JOIN” = 数据压缩 + 高效连接，是大数据量下SQL性能优化的黄金法则**。如果我们正在写报表、BI 分析、后台统计类 SQL，这条原则将帮助我们从“慢查询”走向“秒出结果”。

##### 4、常见误区与纠正

| 误区 | 正确认知 |
| --- | --- |
| “结果一样，写法无所谓” | 执行效率天差地别，尤其在大数据量下 |
| “数据库会自动优化” | 优化器不一定能重写“先JOIN再聚合”为“先聚合再JOIN” |
| “必须先JOIN才能聚合” | 错！只要聚合字段在单表内，就可以提前聚合 |
| “GROUP BY 一定要在最外层” | 不一定，子查询中聚合更高效 |

##### 5、适用场景扩展

**（1）适合“先聚合再JOIN”的场景**：  
① **报表统计**：如：“每个用户的订单总额”；  
② **指标计算**：如：“每个地区的销售总量”；  
③ **维度关联**：事实表（订单）先聚合，再关联维度表（用户、地区、商品）；  
④ **大数据分页统计**：先聚合出指标，再JOIN展示信息。

**（2）不适合的场景**：  
① **需要明细数据**：如果我们要展示“每个订单的用户姓名”，就必须先JOIN；  
② **聚合依赖多表字段**：如：`SUM(price * tax_rate)`，其中 `tax_rate` 在另一张表中，无法提前聚合。  
③ **需过滤 “关联表字段” 后再聚合**：若业务需求是 “统计‘北京地区用户’的订单总额”，且 “地区” 字段在users表（不在orders表），则需先 JOINusers表过滤 “北京用户”，再聚合orders表 —— 此时 “先 JOIN 再聚合” 更高效（若先聚合orders表，会先计算所有用户的总额，再过滤北京用户，多计算了非北京用户的聚合结果，浪费资源）。

**（3）进阶写法：使用 CTE 提高可读性（MySQL 8.0+）**：

```sql
-- 使用CTE（公用表表达式）让逻辑更清晰
WITH order_summary AS (
    -- 第一步：先聚合订单数据
    SELECT
        user_id,
        SUM(order_amount) AS total_amount,
        COUNT(*) AS order_count
    FROM
        orders
    GROUP BY
        user_id
)
-- 第二步：与用户表JOIN
SELECT
    u.user_name,
    os.total_amount,
    os.order_count
FROM
    users u
JOIN
    order_summary os ON u.user_id = os.user_id
ORDER BY
    os.total_amount DESC;
```

优势：逻辑分层清晰；易于维护和扩展；性能与子查询一致。

**（4）分布式场景下的优化**：

在分布式数据库（如：Spark、ClickHouse、BigQuery）中，“先聚合再JOIN”原则依然适用，但实现方式有所不同：

*   **数据分片**：聚合操作可以在每个分片上独立完成，减少网络传输。
    
*   **广播小表**：JOIN 时，小表（聚合结果）可以被广播到所有节点，避免 Shuffle。
    
*   **并行处理**：每个节点并行执行聚合和JOIN，提升整体效率。
    

示例（Spark SQL）：

```sql
-- 在 Spark 中，CBO（基于成本的优化器）会自动选择广播小表
-- Spark 中，若 agg 表（1万行）为小表，CBO 会自动广播，避免 Shuffle
SELECT
    u.user_name,
    agg.total_amount
FROM
    users u
JOIN (
    SELECT
        user_id,
        SUM(order_amount) AS total_amount
    FROM
        orders
    GROUP BY
        user_id
) agg ON u.user_id = agg.user_id
-- Spark 会自动选择 BroadcastHashJoin，避免 Shuffle
-- 显式指定广播（可选，用于强制优化）
/*+ BROADCAST(agg) */
```

**（5）复杂聚合场景**：

① **多层聚合**：

当需要多层聚合时，我们可以使用 **窗口函数** 或 **CTE** 来分层处理：（regions 表：r.region\_name、r.region\_id 自行脑补）

```sql
-- 使用 CTE 进行多层聚合
WITH order_summary AS (
    -- 第一层：按用户聚合
    SELECT
        user_id,
        SUM(order_amount) AS total_amount,
        COUNT(*) AS order_count
    FROM
        orders
    GROUP BY
        user_id
),
user_region AS (
    -- 第二层：按地区聚合
    SELECT
        u.region,
        SUM(os.total_amount) AS region_total,
        AVG(os.order_count) AS avg_orders
    FROM
        users u
    JOIN
        order_summary os ON u.user_id = os.user_id
    GROUP BY
        u.region
)
-- 第三层：与地区表JOIN
SELECT
    r.region_name,
    ur.region_total,
    ur.avg_orders
FROM
    regions r
JOIN
    user_region ur ON r.region_id = ur.region;
```

② **复杂聚合函数**：

对于复杂聚合函数（如：`PERCENTILE`, `CORR`），我们可以使用 **窗口函数** 或 **子查询** 来提前计算：

```sql
-- 使用窗口函数提前计算复杂聚合
SELECT
    user_name,
    total_amount,
    PERCENT_RANK() OVER (ORDER BY total_amount) AS rank
FROM (
    SELECT
        u.user_name,
        SUM(o.order_amount) AS total_amount
    FROM
        users u
    JOIN (
        SELECT
            user_id,
            order_amount
        FROM
            orders
    ) o ON u.user_id = o.user_id
    GROUP BY
        u.user_name
) t;
```

**（6）高级优化技巧**：

① **使用物化视图**：

对于频繁查询的聚合结果，我们可以使用 **物化视图** 来预计算：

```sql
-- 创建物化视图
CREATE MATERIALIZED VIEW order_summary_mv AS
SELECT
    user_id,
    SUM(order_amount) AS total_amount,
    COUNT(*) AS order_count
FROM
    orders
GROUP BY
    user_id;

-- 查询时直接使用物化视图
SELECT
    u.user_name,
    mv.total_amount,
    mv.order_count
FROM
    users u
JOIN
    order_summary_mv mv ON u.user_id = mv.user_id;
```

② **使用分区表**：

对于大表，我们可以使用 **分区表** 来减少扫描数据量：

```sql
-- 按日期分区
CREATE TABLE orders (
    order_id INT,
    user_id INT,
    order_amount DECIMAL(10, 2),
    order_date DATE
) PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
);
```

③ **使用缓存**：

对于不频繁更新的聚合结果，我们可以使用 **缓存** 来减少数据库压力：

*   **Redis**：将聚合结果缓存到 Redis，减少数据库查询。
    
*   **本地缓存**：使用 **Guava Cache** 或 **Caffeine** 进行本地缓存。
    

**小结**：“先聚合再JOIN”原则在 **分布式场景、复杂聚合、高级优化** 中依然适用，但需要结合具体场景进行调整：① **分布式场景**：利用数据分片、广播小表、并行处理来优化性能。② **复杂聚合**：使用窗口函数、CTE、物化视图等技术来分层处理。③ **高级优化**：结合分区表、缓存等技术，进一步提升查询效率。当我们面对 **海量数据、复杂查询** 时，始终要记住：**“先聚合再JOIN” = 数据压缩 + 高效连接，是 SQL 性能优化的黄金法则。**

#### 四、电商场景实例分析

下面我们通过一个 **电商场景的实际案例**，完整演示“先聚合再JOIN”的优化思路：从问题发现、执行计划分析、优化实施到性能验证。

##### 1、案例背景：电商用户订单分析

**（1）业务需求**：  
我们要统计每个用户的累计消费金额，并关联用户信息表获取用户昵称和注册地。

**（2）表结构与数据量**：

*   **users**：用户信息表，约 100 万行
    
*   **orders**：订单表，约 1000 万行
    

**（3）初始慢 SQL（先 JOIN 再聚合）**：

```sql
SELECT
    u.user_name,
    u.region,
    SUM(o.order_amount) AS total_amount
FROM
    users u
JOIN
    orders o ON u.user_id = o.user_id
GROUP BY
    u.user_name,
    u.region;
```

##### 2、问题分析

**（1）执行计划（EXPLAIN）关键信息**：

| id | select\_type | table | type | rows | Extra |
| --- | --- | --- | --- | --- | --- |
| 1 | SIMPLE | u | ALL | 1000000 |  |
| 1 | SIMPLE | o | ALL | 10000000 | Using where; Using join buffer |

*   **rows 扫描量**：100 万 × 1000 万，笛卡尔积式扫描
    
*   **Extra**：使用了 join buffer，但仍有大量磁盘 I/O
    

**（2）性能瓶颈**：

*   **数据量过大**：JOIN 产生 1000 万行中间结果
    
*   **聚合成本高**：在 1000 万行上做 GROUP BY，内存占用高
    

##### 3、优化实施（先聚合再 JOIN）

**（1）优化后的 SQL**：

```sql
SELECT
    u.user_name,
    u.region,
    agg.total_amount
FROM
    users u
JOIN (
    SELECT
        user_id,
        SUM(order_amount) AS total_amount
    FROM
        orders
    GROUP BY
        user_id
) AS agg ON u.user_id = agg.user_id;
```

**（2）执行计划对比**：

| id | select\_type | table | type | rows | Extra |
| --- | --- | --- | --- | --- | --- |
| 1 | PRIMARY | u | ALL | 1000000 |  |
| 1 | PRIMARY |  | ALL | 1000000 |  |
| 2 | DERIVED | orders | ALL | 10000000 | Using temporary; Using filesort |

*   **rows 扫描量**：子查询 1000 万行 → 聚合后 100 万行 → JOIN 仅 100 万行
    
*   **内存占用**：聚合在子查询完成，避免大结果集 GROUP BY
    

**（3）性能提升效果**：（具体效果以试验机器为准）

*   **执行时间**：从 30 秒降至 2 秒（降低 93%）
    
*   **CPU 占用**：从 80% 降至 20%
    
*   **内存占用**：从 2 GB 降至 200 MB
    

##### 4、进阶优化技巧

**（1）我们为 orders 表添加复合索引**：

```
CREATE INDEX idx_orders_user_amount ON orders(user_id, order_amount);
```

*   **作用**：加速子查询的 GROUP BY 和 SUM 聚合
    
*   **效果**：子查询执行时间从 15 秒降至 1 秒
    

**（2）分区表优化（按时间分区）**：

```sql
-- 对 orders 表按月分区
CREATE TABLE orders (
    order_id BIGINT,
    user_id INT,
    order_amount DECIMAL(10,2),
    order_date DATE
) PARTITION BY RANGE (YEAR(order_date)*100 + MONTH(order_date)) (
    PARTITION p202501 VALUES LESS THAN (202502),
    PARTITION p202502 VALUES LESS THAN (202503),
    ...
);
```

*   **作用**：减少扫描数据量，仅查询需要的分区
    

**（3）结果缓存（Redis）**：

```
# 缓存 key 设计
user_order_summary:202508
```

*   **缓存策略**：每小时更新一次，减少重复计算
    

##### 5、优化总结

| 优化手段 | 性能提升点 | 适用场景 |
| --- | --- | --- |
| 先聚合再 JOIN | 减少中间结果集 | 大表 JOIN + 聚合 |
| 复合索引 | 加速聚合和过滤 | 高频查询字段 |
| 分区表 | 减少扫描量 | 时间序列数据 |
| 结果缓存 | 避免重复计算 | 实时性要求低的场景 |

通过这个场景实例，我们可以看到“先聚合再 JOIN”原则在实际业务中的厉害，配合索引、分区和缓存，可轻松应对千万级数据的复杂查询。

看完以上例子和优化技巧，我们不难发现 “先聚合再 JOIN” 不是什么复杂理论，就是让数据 “先瘦身再联动”。实际工作里，不管是做报表统计，还是处理电商千万级订单，什么先把大表聚合压缩，再跟小表关联，再配上索引、分区这些小技巧，之前卡半天的查询，秒出结果真不是什么事儿。