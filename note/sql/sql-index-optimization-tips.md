---
title: 60余条SQL索引优化技巧，从B+树底层逻辑到高并发场景实践
lastUpdated: 2026-10-04 04:00:00
---


我们有没有过这样的经历？数据库里数据一多，我们查个报表都要等半天，写条插入语句还老卡壳？出现这样的情况，问题很可能出在SQL索引上。SQL索引就是数据库里的“导航地图”，用好了SQL查询能飞起来，用错了会拖慢系统。我们刚开始接触SQL索引时，因为不懂，随便建一堆索引导致写入变慢，就头疼！遇到JSON这类非结构化数据时，我们直接手足无措。别慌！今天我们就来解决这些索引的头疼问题。下面我们一起从索引的底层逻辑到索引设计原则，怎样避开查询里的常见坑？再针对读写平衡、分布式架构等高频场景，甚至连超大规模表、高并发写入这类极端情况，还有自动化运维技巧，我们都会逐一拆解。不管我们用的是MySQL、PostgreSQL，还是Oracle，95%以上的SQL索引问题，我们今天都一并给解决掉。

#### 一、先搞懂各数据库索引的底层逻辑

##### 1、常用索引类型与共性存储结构（B+树）

主流数据库（MySQL InnoDB、PostgreSQL、Oracle）默认采用**B+树索引**，基本特性一致：非叶子节点仅存索引值（最大化单节点存储量，减少IO）、叶子节点存完整数据（聚簇索引）或主键/ROWID（二级索引）、叶子节点通过双向指针形成有序链表（支持快速范围查询）。

主流数据库常用索引类型对比：

| 索引类型 | 功能描述 | 支持数据库 |
| --- | --- | --- |
| 主键索引 | 唯一标识记录，默认聚簇存储 | 主流数据库 |
| 唯一索引 | 确保字段无重复值，查询无需判断重复 | 主流数据库 |
| 普通索引 | 无唯一性约束，仅加速查询 | 主流数据库 |
| 联合索引 | 多字段组合，遵循“最左匹配”原则 | 主流数据库 |
| 全文索引 | 优化长文本模糊查询，替代`LIKE %xxx%` | MySQL（FULLTEXT）、PostgreSQL（tsvector）、Oracle（CONTEXT） |
| 空间索引 | 优化地理信息查询（经纬度、区域匹配） | MySQL（SPATIAL）、PostgreSQL（GIST）、Oracle（SPATIAL） |
| 函数索引 | 基于字段函数结果建索引，解决“字段函数查询失效”问题 | MySQL 8.0+、PostgreSQL、Oracle |
| 部分索引（条件索引） | 仅对符合条件的数据建索引，减少索引体积 | MySQL 8.0+、PostgreSQL、Oracle |

##### 2、有无聚簇索引与二级索引的概念及实现

*   **MySQL InnoDB**：默认以主键为聚簇索引，叶子节点存完整行数据；二级索引叶子节点存主键值，查询需“回表”（通过主键查聚簇索引）。
    
*   **Oracle**：无聚簇索引概念，默认用“堆表”存储，索引叶子节点存ROWID（物理地址），查询需通过ROWID定位数据；支持“索引组织表（IOT）”，类似聚簇索引，按主键有序存储数据。
    
*   **PostgreSQL**：默认堆表存储，索引叶子节点存CTID（物理行标识）；支持“BRIN索引”（块范围索引），适合时序数据，不支持聚簇索引，但可通过`CLUSTER`命令按索引排序表数据。
    

**示例：MySQL回表问题 vs PostgreSQL CTID定位**

*   MySQL需回表（二级索引未覆盖查询字段）：
    
    ```sql
    -- 建普通索引（二级索引）
    CREATE INDEX idx_customer_username ON customer(username);
    -- 需回表：索引仅含username，需通过主键查age和city
    SELECT username, age, city FROM customer WHERE username = 'Jerry'; -- 回表，效率低
    ```
    
*   PostgreSQL无回表，但需CTID定位：
    
    ```sql
    -- 建普通索引
    CREATE INDEX idx_customer_username ON customer(username);
    -- 我们查询时，索引返回CTID，通过CTID快速定位数据（无需类似MySQL的主键回表）
    SELECT username, age, city FROM customer WHERE username = 'Jerry'; -- 效率高于MySQL未覆盖索引
    ```
    

##### 3、索引特性

（1）**MySQL 8.0+的降序索引、哈希索引（模拟）**

*   **降序索引**：解决“混合排序”无法用索引问题（8.0前联合索引默认升序，`ORDER BY age ASC, score DESC`需文件排序）。示例：
    
    ```sql
    -- 建降序联合索引
    CREATE INDEX idx_age_score_desc ON user(age ASC, score DESC);
    -- 命中索引，无文件排序
    SELECT * FROM user ORDER BY age ASC, score DESC; -- 生效
    ```
    
*   **模拟哈希索引**：InnoDB无显式哈希索引，通过“哈希列+普通索引”实现，适合高频等值查询。看示例：
    
    ```sql
    -- 新增哈希列（SHA1生成哈希值）
    ALTER TABLE customer ADD username_hash CHAR(40) GENERATED ALWAYS AS (SHA1(username)) STORED;
    -- 建哈希列索引
    CREATE INDEX idx_customer_username_hash ON customer(username_hash);
    -- 查询：先匹配哈希值，再验证原字段（避免冲突）
    SELECT * FROM customer WHERE username_hash = SHA1('Jerry') AND username = 'Jerry';
    ```
    

（2）**PostgreSQL的BRIN索引、GIN索引**

*   **BRIN索引（块范围索引）**：适合时序数据（如：日志、监控数据），按数据块存储索引，体积极小（仅传统B+树的1%）。我们看示例：
    
    ```sql
    -- 对时序表的time字段建BRIN索引（每100个数据块为一个范围）
    CREATE INDEX idx_log_time_brin ON logs(time) USING BRIN WITH (pages_per_range = 100);  -- 默认值为128，根据数据有序性程序调整该参数
    -- 范围查询高效（仅扫描目标块范围）
    SELECT * FROM logs WHERE time BETWEEN '2024-09-01' AND '2024-09-02';
    ```
    
*   **GIN索引（通用倒排索引）**：适合数组、JSONB类型，支持多值匹配（如：查询含多个标签的文章）。看示例：
    
    ```sql
    -- 表含tags数组字段（如：['java', 'mysql']）
    CREATE TABLE articles (id INT PRIMARY KEY, title TEXT, tags TEXT[]);
    -- 建GIN索引
    CREATE INDEX idx_articles_tags_gin ON articles USING GIN(tags);
    -- 多值匹配查询（命中GIN索引）
    SELECT title FROM articles WHERE tags @> ARRAY['java', 'mysql'];
    ```
    

（3）**Oracle的位图索引、函数索引（扩展）**

*   **位图索引**：适合低选择性字段（如：性别、状态），用位图存储字段值与ROWID映射，查询时通过位图运算（AND/OR）快速过滤。注意：在OLTP等高并发写入场景中，位图索引因锁粒度极大，极易导致严重的锁冲突，应避免使用。示例：
    
    ```sql
    -- 对低选择性的status字段建位图索引（仅Oracle支持）
    CREATE BITMAP INDEX idx_order_status ON orders(status);
    -- 多条件查询高效（位图运算替代全表扫描）
    SELECT order_id FROM orders WHERE status = 'paid' AND user_id = 1001;
    ```
    
*   **基于表达式的函数索引**：支持复杂表达式（如：`UPPER(name)`、`salary*12`），比MySQL函数索引更灵活。我们看示例：
    
    ```sql
    -- 建基于UPPER(name)的函数索引
    CREATE INDEX idx_emp_name_upper ON employees(UPPER(name));
    -- 查询命中索引（无需全表扫描）
    SELECT * FROM employees WHERE UPPER(name) = 'JERRY';
    ```
    

#### 二、索引设计：从“源头”优化，避免性能浪费

##### 1、联合索引顺序：按“最左匹配+选择性”排序

所有数据库对联合索引均遵循“从左到右、中断失效”原则，排序优先级：  
（1）选择性高（不重复值多，如：身份证号，选择性>0.8）的字段放前面；  
（2）查询频率高的字段放前面；  
（3）范围查询（如：`age>20`）的字段放最后。

**踩坑示例**：

```sql
-- 错误顺序：username（低选择性）→ age（范围）→ city，导致city无法命中
CREATE INDEX idx_customer_bad ON customer(username, age, city);
-- 坑1：缺失最左username，索引失效
SELECT * FROM customer WHERE age = 28 AND city = 'Shanghai';
-- 坑2：中间age是范围查询，city失效
SELECT * FROM customer WHERE username = 'Jerry' AND age > 28 AND city = 'Shanghai';
```

**正确操作**：

```sql
-- 正确顺序：age（选择性0.9）→ username（0.85）→ city（0.3）
CREATE INDEX idx_customer_good ON customer(age, username, city);
-- 命中前2列，效率高
SELECT * FROM customer WHERE age = 28 AND username = 'Jerry';
-- 三列全命中，索引最大化利用
SELECT * FROM customer WHERE age = 28 AND username = 'Jerry' AND city = 'Shanghai';
```

##### 2、覆盖索引：避免“回表/定位”，一次查全数据

“覆盖索引”指索引包含查询所需所有字段，无需额外访问表数据（MySQL避免回表、PostgreSQL避免CTID定位、Oracle避免ROWID定位），效率大幅提升。

**需额外定位数据**：

```sql
-- 仅username单列索引，无法覆盖age和city
CREATE INDEX idx_customer_username ON customer(username);
-- 需额外定位数据（MySQL回表、PostgreSQL查CTID），效率低
SELECT username, age, city FROM customer WHERE username = 'Jerry';
```

**覆盖索引**：

```sql
-- 索引包含查询的三个字段，实现覆盖查询
CREATE INDEX idx_customer_cover ON customer(username, age, city);
-- 直接从索引取数，无需额外定位
SELECT username, age, city FROM customer WHERE username = 'Jerry';
```

**SQL Server优化**：利用“包含列（INCLUDE）”建覆盖索引，避免索引键过大（索引键仅存高选择性字段，INCLUDE列存其他字段）。我们看示例：

```sql
-- 索引键为username（高选择性），INCLUDE列存age和city（不参与索引排序）
CREATE INDEX idx_customer_include ON customer(username) INCLUDE (age, city);
-- 同样实现覆盖查询，索引体积更小
SELECT username, age, city FROM customer WHERE username = 'Jerry';
```

##### 3、长字符串优化：前缀索引/部分索引

对长字符串（如：`varchar(200)`的商品描述），全字段建索引浪费空间，我们需截取前缀或按条件建索引，确保选择性接近全字段。

（1）**前缀索引（MySQL、PostgreSQL通用）**

**全字段浪费空间**：

```
-- 全字段建索引，占用空间大
CREATE INDEX idx_goods_detail_bad ON goods(goods_detail);
```

**前缀索引高效省空间**：

```sql
-- 步骤1：计算不同前缀的选择性（MySQL/PostgreSQL通用）
SELECT 
  COUNT(DISTINCT LEFT(goods_detail, 20))/COUNT(*) AS sel_20,  -- 0.92
  COUNT(DISTINCT LEFT(goods_detail, 30))/COUNT(*) AS sel_30,  -- 0.99（接近全字段0.995）
  COUNT(DISTINCT goods_detail)/COUNT(*) AS sel_full 
FROM goods;

-- 步骤2：用30个字符建前缀索引
CREATE INDEX idx_goods_detail_good ON goods(goods_detail(30)); -- MySQL
-- PostgreSQL 需用SUBSTRING函数
CREATE INDEX idx_goods_detail_good ON goods(SUBSTRING(goods_detail FROM 1 FOR 30));
```

（2）**PostgreSQL的部分索引（条件更灵活）**PostgreSQL的部分索引支持复杂条件（如：`age>18 AND status='active'`），比MySQL的部分索引（仅支持`=`/`IN`）更强大。我们看示例：

```sql
-- 仅对“活跃且年龄>18”的用户建索引
CREATE INDEX idx_active_adult_user ON customer(username, email) 
WHERE status = 'active' AND age > 18;
-- 查询命中索引，索引体积减少60%+
SELECT username, email FROM customer WHERE status = 'active' AND age = 28 AND username = 'Jerry';
```

##### 4、多条件查询：复合索引替代多单列索引

所有数据库一次查询仅能高效使用一个单列索引（“索引合并”例外，效率低），多条件查询需建复合索引，而非多个单列索引。

**多单例索引低效**：

```sql
-- 建两个单列索引，查询仅能用一个
CREATE INDEX idx_customer_age ON customer(age);
CREATE INDEX idx_customer_city ON customer(city);
-- 仅命中一个索引，另一个条件需过滤，效率低
SELECT * FROM customer WHERE age = 28 AND city = 'Shanghai';
```

**复合索引高效**：

```sql
-- 建age+city复合索引，同时命中两个条件
CREATE INDEX idx_customer_age_city ON customer(age, city);
-- 索引直接匹配两个条件，查询速度提升明显
SELECT * FROM customer WHERE age = 28 AND city = 'Shanghai';
```

##### 5、唯一索引：优先用在“无重复”场景

对手机号、身份证号等唯一字段，我们优先建唯一索引而非普通索引：唯一索引B+树更紧凑，查询无需判断重复值，效率更高；同时避免数据重复插入。我们看示例：

```sql
-- MySQL/PostgreSQL
CREATE UNIQUE INDEX idx_customer_phone ON customer(phone);
-- Oracle
CREATE UNIQUE INDEX idx_customer_phone ON customer(phone);

-- 唯一索引查询效率高于普通索引
SELECT * FROM customer WHERE phone = '13800138000';
```

##### 6、避免“过度索引”：控制单表索引数量

索引越多，插入/更新/删除的开销越大（需同步维护所有索引），单表索引建议≤5个，定期清理无用索引。

（1）**查询无用/冗余索引**

*   **MySQL**：
    
    ```sql
    -- 查未使用的索引（需开启Performance Schema）
    SELECT * FROM performance_schema.schema_unused_indexes WHERE table_schema = 'shop';
    -- 查冗余索引（如：(username,age)和(username)，后者冗余）
    SELECT * FROM sys.schema_redundant_indexes WHERE table_schema = 'shop';
    ```
    
*   **PostgreSQL**：需安装`pg_stat_statements`扩展，查询索引使用频率：
    
    ```sql
    -- 查近30天未使用的索引
    SELECT schemaname, relname, indexrelname 
    FROM pg_stat_user_indexes 
    WHERE idx_scan = 0 AND now() - statime > INTERVAL '30 days';
    ```
    
*   **Oracle**：通过`DBA_INDEXES`和`V$SQL_PLAN`查询冗余索引：
    
    ```sql
    -- 查未使用的索引（需开启AWR）
    SELECT owner, table_name, index_name 
    FROM dba_indexes 
    WHERE index_name NOT IN (
      SELECT DISTINCT object_name 
      FROM v$sql_plan 
      WHERE object_type = 'INDEX'
    );
    ```
    

（2）**删除冗余索引**

```
-- MySQL/PostgreSQL/Oracle 通用语法
DROP INDEX idx_customer_username ON customer;
```

#### 三、查询避坑：别让索引“失效”

##### 1、避免字段上用函数/运算：索引失效

所有数据库若在索引字段上用函数（如：`YEAR(time)`、`UPPER(name)`）或运算（如：`age+1`），会导致索引无法匹配，触发全表扫描。

**索引失效**：

```sql
-- 建order_time索引
CREATE INDEX idx_order_time ON orders(order_time);
-- 字段用函数，索引失效（全表扫描）
SELECT * FROM orders WHERE YEAR(order_time) = 2024; -- MySQL/PostgreSQL
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_time) = 2024; -- Oracle
```

**索引生效**：

```sql
-- 用时间范围替代函数，命中索引
SELECT * FROM orders 
WHERE order_time >= '2024-01-01 00:00:00' 
  AND order_time < '2025-01-01 00:00:00';
```

**函数索引场景**：这是一个例外。若已建函数索引，字段用函数可命中索引（主流数据库通用）。我们看示例：

```sql
-- MySQL：建YEAR(order_time)函数索引
CREATE INDEX idx_order_time_year ON orders(YEAR(order_time));
-- 查询命中索引
SELECT * FROM orders WHERE YEAR(order_time) = 2024;

-- PostgreSQL：建EXTRACT(YEAR FROM order_time)函数索引
CREATE INDEX idx_order_time_year ON orders(EXTRACT(YEAR FROM order_time));
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_time) = 2024;
```

##### 2、字段类型必须匹配：避免隐式转换

查询条件的值类型与字段类型不匹配（如：`varchar`用数字查、`decimal`用`int`查），所有数据库都会进行隐式转换，导致索引失效。

**隐式转换，索引失效**：

```sql
-- customer_id为varchar类型，建索引
CREATE INDEX idx_customer_id ON customer(customer_id);
-- 用数字查询，隐式转换（varchar→int），索引失效
SELECT * FROM customer WHERE customer_id = 456; -- MySQL/PostgreSQL/Oracle
```

**类型一致，索引生效**：

```sql
-- 用字符串匹配varchar字段，命中索引
SELECT * FROM customer WHERE customer_id = '456';
```

**Oracle特殊隐式转换**：`datetime`与`timestamp`互转也会失效，需显式转换。

**隐式转换失效**：

```sql
-- order_time为DATE类型，用TIMESTAMP值查询，隐式转换失效
SELECT * FROM orders WHERE order_time = TO_TIMESTAMP('2024-09-04', 'YYYY-MM-DD');
```

**显式转换，命中索引**：

```sql
-- 显式转为DATE类型，命中索引
SELECT * FROM orders WHERE order_time = TO_DATE('2024-09-04', 'YYYY-MM-DD');
```

##### 3、模糊查询：避免“%”开头

`LIKE '%xxx'`（前缀模糊）会导致所有数据库索引失效；`LIKE 'xxx%'`（后缀模糊）可命中索引；前缀模糊需用各数据库自己的方法优化。

（1）**后缀模糊（直接用索引）**

```sql
-- 建goods_name索引
CREATE INDEX idx_goods_name ON goods(goods_name);
-- 后缀模糊，命中索引
SELECT * FROM goods WHERE goods_name LIKE '华为%';
```

（2）**前缀模糊优化**

*   **MySQL**：反转字段+索引
    
    ```sql
    -- 1、新增反转字段
    ALTER TABLE goods ADD goods_name_rev VARCHAR(100);
    -- 2、触发器自动反转（插入/更新时）
    DELIMITER //
    CREATE TRIGGER trg_goods_rev BEFORE INSERT ON goods
    FOR EACH ROW SET NEW.goods_name_rev = REVERSE(NEW.goods_name);//
    DELIMITER ;
    -- 3、建反转字段索引
    CREATE INDEX idx_goods_name_rev ON goods(goods_name_rev);
    -- 4、查询时反转关键词，命中索引
    SELECT * FROM goods WHERE goods_name_rev LIKE CONCAT(REVERSE('手机'), '%');
    ```
    
*   **PostgreSQL**：用`pg_trgm`扩展（支持任意模糊查询）
    
    ```sql
    -- 1、安装pg_trgm扩展（支持 trigram 索引）
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    -- 2、建GIN trigram索引（支持%xxx%模糊查询）
    CREATE INDEX idx_goods_name_trgm ON goods USING GIN(goods_name gin_trgm_ops);
    -- 3、任意模糊查询，命中索引
    SELECT * FROM goods WHERE goods_name LIKE '%手机%';
    ```
    
*   **Oracle**：用全文索引（CONTEXT类型）
    
    ```sql
    -- 1、建全文索引
    CREATE INDEX idx_goods_name_ft ON goods(goods_name) INDEXTYPE IS CTXSYS.CONTEXT;
    -- 2、前缀模糊查询（用CONTAINS函数）
    SELECT * FROM goods WHERE CONTAINS(goods_name, '手机%') > 0;
    ```
    

##### 4、避免否定查询：用范围替代NOT/!=

`NOT IN`、`!=`、`<>`等否定查询会导致所有数据库索引失效，我们需转换为范围查询（`<`+`>`）命中索引。

**否定查询，索引失效**：

```sql
-- 建goods_type索引
CREATE INDEX idx_goods_type ON goods(goods_type);
-- 否定查询，全表扫描
SELECT * FROM goods WHERE goods_type != 3;
```

**范围查询，命中索引**：

```sql
-- 拆分为两个范围条件，命中索引
SELECT * FROM goods WHERE goods_type < 3 OR goods_type > 3;
```

##### 5、分页大偏移量：用“索引覆盖+关联”优化

`LIMIT 100000,10`（MySQL/PostgreSQL）或`ROWNUM > 100000 AND ROWNUM <= 100010`（Oracle）需扫描大量数据再丢弃，效率极低，我们需用“索引覆盖+关联”优化。

（1）**MySQL/PostgreSQL优化**

```sql
-- 反例：大偏移量，慢
SELECT * FROM goods ORDER BY goods_id LIMIT 100000, 10;

-- 正例：子查询用主键索引查ID，再关联主表
SELECT g.* FROM goods g
JOIN (
  SELECT goods_id FROM goods ORDER BY goods_id LIMIT 100000, 10 -- 主键索引，快
) tmp ON g.goods_id = tmp.goods_id;
```

说明：此优化技巧在MySQL 5.6及以上版本中效果显著，其优化器能高效地先在覆盖索引上完成排序和分页，再回表查询。

（2）**Oracle 优化（ROWNUM 特性）**

Oracle的`ROWNUM`是“先筛选后编号”，直接`ROWNUM > 100000`会失效，需嵌套子查询。

```sql
-- 反例：慢，全表扫描
SELECT * FROM (
  SELECT * FROM goods ORDER BY goods_id
) WHERE ROWNUM > 100000 AND ROWNUM <= 100010;

-- 正例：子查询先编号，再筛选
SELECT * FROM (
  SELECT g.*, ROWNUM AS rn FROM (
    SELECT * FROM goods ORDER BY goods_id -- 主键索引排序，快
  ) g WHERE ROWNUM <= 100010
) WHERE rn > 100000;
```

##### 6、禁用SELECT \*：按需取字段

`SELECT *`会查询所有字段，可能破坏覆盖索引，还浪费内存和带宽，所有数据库我们均需明确指定所需字段。

**SELECT \* 低效**：

```sql
-- 查所有字段，覆盖索引失效
SELECT * FROM customer WHERE username = 'Jerry';
```

**指定字段，命中覆盖索引**：

```sql
-- 仅查需要的字段，命中覆盖索引
SELECT customer_id, username, email FROM customer WHERE username = 'Jerry';
```

##### 7、用执行计划验证：提前发现问题

所有数据库均提供执行计划工具，用于分析索引是否命中，我们主要看“索引使用情况”、“扫描类型”。

| 数据库 | 执行计划命令 | 主要看的字段 |
| --- | --- | --- |
| MySQL | `EXPLAIN SELECT ...` | `type`（ref/range 优，ALL 差）、`key`（非空则命中） |
| PostgreSQL | `EXPLAIN ANALYZE SELECT ...` | `Index Scan`（命中）、`Seq Scan`（全表） |
| Oracle | `EXPLAIN PLAN FOR SELECT ...`+`SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY)` | `INDEX RANGE SCAN`（命中）、`FULL TABLE SCAN`（全表） |

**示例**（MySQL）：

```sql
-- 分析查询是否命中索引
EXPLAIN SELECT customer_id, username FROM customer WHERE age = 28 AND username = 'Jerry';
-- 若type=ref、key=idx_customer_age_username，说明命中索引
```

**注意**：索引失效规则的例外——跳跃扫描（Index Skip Scan）

现代数据库优化器在某些场景下能突破“最左匹配”限制，通过**跳跃扫描**机制利用非前导列索引。这一点，我们详细看一下：

*   **场景**：联合索引`(gender, name)`，`gender`只有少数枚举值（如：'M'/'F'）。
    
*   **查询**：`SELECT * FROM users WHERE name = 'Alice'`（未指定`gender`）。
    
*   **优化器行为**（MySQL 8.0+/Oracle）：  
    （1）先枚举 `gender` 的所有可能值（'M' 和 'F'）；  
    （2）对每个值执行一次索引范围扫描（`gender='M' AND name='Alice'` + `gender='F' AND name='Alice'`）；  
    （3）合并结果，避免全表扫描。
    
*   **触发条件**：
    

*   前导列的选择性极低（重复值多）；
    
*   优化器代价计算认为跳跃扫描比全表扫描更优（可通过执行计划确认）。
    

*   **Oracle启用命令**：
    
    ```
    ALTER SESSION SET optimizer_features_enable = '12.2.0.1';  -- 需≥12.2版本
    ```
    

尽管跳跃扫描提供了灵活性，索引设计我们仍应优先遵循最左匹配原则，避免依赖此特性。

#### 四、特殊场景：针对性优化

##### 1、ORDER BY排序：用索引避免“文件排序”

若查询含“过滤+排序”，我们需将过滤字段和排序字段组合成联合索引，所有数据库均可避免“文件排序”（MySQL的Using filesort、PostgreSQL的Sort、Oracle的Sort Order By）。

**文件排序，慢**：

```sql
-- 仅username索引，排序需额外文件排序
CREATE INDEX idx_customer_username ON customer(username);
SELECT * FROM customer WHERE username = 'Jerry' ORDER BY age; -- 慢
```

**使用排序，块**：

```sql
-- 建username+age联合索引，过滤后直接按索引排序
CREATE INDEX idx_customer_name_age ON customer(username, age);
SELECT * FROM customer WHERE username = 'Jerry' ORDER BY age; -- 无文件排序，快
```

**MySQL的混合排序（ASC+DESC）**：8.0+支持降序索引，解决混合排序问题。我们看示例：

```sql
-- 建age升序、score降序的联合索引
CREATE INDEX idx_age_score_desc ON customer(age ASC, score DESC);
-- 混合排序，命中索引（无文件排序）
SELECT * FROM customer ORDER BY age ASC, score DESC;
```

##### 2、大表建索引：用在线DDL避免锁表

百万级以上大表直接建索引会锁表，主流数据库的在线DDL，建索引期间不影响业务读写。

*   **MySQL** 8.0+：用`ALGORITHM=INPLACE`+`LOCK=NONE`，看示例：
    
    ```
    -- 在线建索引，不锁表
    CREATE INDEX idx_order_state ON orders(order_state) ALGORITHM=INPLACE, LOCK=NONE;
    ```
    
*   **PostgreSQL**：默认支持在线建索引（`CONCURRENTLY`选项，不锁表），看示例：
    
    ```
    -- 并发建索引，不阻塞表读写
    CREATE INDEX idx_order_state ON orders(order_state) CONCURRENTLY;
    ```
    
*   **Oracle**：用`ONLINE`选项，看示例：
    
    ```
    -- 在线建索引，不锁表
    CREATE INDEX idx_order_state ON orders(order_state) ONLINE;
    ```
    

##### 3、JSON数据查询：用JSON索引优化

主流数据库均支持JSON类型，但我们直接查询JSON字段会全表扫描，我们需建JSON索引。

*   MySQL 8.0+：支持JSON路径索引，我们看示例：
    
    ```sql
    -- 表含JSON字段user_tags（如：{"gender":"male","hobby":["reading"]}）
    CREATE TABLE users (id INT PRIMARY KEY, user_tags JSON);
    -- 建JSON路径索引（针对gender键）
    CREATE INDEX idx_users_tags_gender ON users(CAST(user_tags->>'$.gender' AS CHAR(10)));
    -- 查询命中索引
    SELECT * FROM users WHERE CAST(user_tags->>'$.gender' AS CHAR(10)) = 'male';
    ```
    
*   **PostgreSQL**：用JSONB类型+GIN索引（支持多键查询），看示例：
    
    ```sql
    -- 表含JSONB字段user_tags
    CREATE TABLE users (id INT PRIMARY KEY, user_tags JSONB);
    -- 建GIN索引（支持任意JSONB键查询）
    CREATE INDEX idx_users_tags_gin ON users USING GIN(user_tags);
    -- 查询命中索引（匹配hobby含reading的用户）
    SELECT * FROM users WHERE user_tags @> '{"hobby":["reading"]}';
    ```
    
*   Oracle 12c+：用JSON搜索索引，看示例：
    
    ```sql
    -- 表含JSON字段user_tags
    CREATE TABLE users (id INT PRIMARY KEY, user_tags JSON);
    -- 建JSON搜索索引
    CREATE SEARCH INDEX idx_users_tags ON users(user_tags) FOR JSON;
    -- 查询命中索引
    SELECT * FROM users WHERE user_tags.gender = 'male';
    ```
    

##### 4、全文检索：用全文索引替代LIKE

对长文本（如：文章、商品描述），`LIKE %xxx%`效率极低，主流数据库有全文索引方法。

*   **MySQL**：FULLTEXT索引，看示例：
    
    ```sql
    -- 建全文索引
    CREATE FULLTEXT INDEX idx_goods_desc ON goods(goods_description);
    -- 匹配含“华为”或“手机”的商品
    SELECT * FROM goods WHERE MATCH(goods_description) AGAINST('华为 手机' IN BOOLEAN MODE);
    ```
    
*   **PostgreSQL**：tsvector+tsquery（支持中文需插件），示例（我们需安装`pg_jieba`中文分词插件）：
    
    ```sql
    -- 1、新增tsvector字段，存储分词结果
    ALTER TABLE articles ADD content_tsv tsvector GENERATED ALWAYS AS (to_tsvector('jieba', content)) STORED;
    -- 2、建tsvector索引
    CREATE INDEX idx_articles_content ON articles USING GIN(content_tsv);
    -- 3、全文检索（匹配含“数据库”的文章）
    SELECT title FROM articles WHERE content_tsv @@ to_tsquery('jieba', '数据库');
    ```
    
*   **Oracle**：CONTEXT全文索引，看示例：
    
    ```sql
    -- 建全文索引
    CREATE INDEX idx_articles_content ON articles(content) INDEXTYPE IS CTXSYS.CONTEXT;
    -- 匹配含“数据库优化”的文章
    SELECT title FROM articles WHERE CONTAINS(content, '数据库优化') > 0;
    ```
    

##### 5、空间数据查询：用空间索引加速

涉及经纬度、区域匹配的业务（如：查询5公里内的店铺），我们需用空间索引优化。

*   **MySQL**：SPATIAL索引（仅支持MyISAM/InnoDB，POINT类型），示例：
    
    ```sql
    CREATE TABLE shops (
      id INT PRIMARY KEY,
      location POINT NOT NULL, -- 存储经纬度（X=经度，Y=纬度）
      SPATIAL INDEX idx_shop_location (location)
    );
    -- 插入数据
    INSERT INTO shops (location) VALUES (ST_GeomFromText('POINT(116.40 39.91)'));
    -- 查询1公里内的店铺（1公里≈0.009度）
    SELECT * FROM shops 
    WHERE ST_Distance_Sphere(location, ST_GeomFromText('POINT(116.40 39.91)')) < 1000;
    ```
    
*   **PostgreSQL**：GIST空间索引（支持更多类型，如：POLYGON），示例（我们需安装`postgis`扩展）：
    
    ```sql
    -- 1、安装postgis扩展
    CREATE EXTENSION IF NOT EXISTS postgis;
    -- 2、表含geometry字段（存储经纬度）
    CREATE TABLE shops (id INT PRIMARY KEY, location geometry(Point, 4326));
    -- 3、建GIST空间索引
    CREATE INDEX idx_shop_location ON shops USING GIST(location);
    -- 4、查询1公里内的店铺（用ST_DWithin函数）
    SELECT * FROM shops 
    WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint(116.40, 39.91), 4326), 1000);
    ```
    

#### 五、维护监控：让索引持续高效

##### 1、清理索引碎片：定期优化

频繁删除/更新会导致索引碎片化（索引页有空洞），我们需定期整理。

*   **MySQL InnoDB**：用`OPTIMIZE TABLE`或重建索引，示例：
    
    ```
    -- 优化表（整理碎片）
    OPTIMIZE TABLE orders;
    -- 或重建索引（效果等同）
    ALTER TABLE orders DROP INDEX idx_order_time, ADD INDEX idx_order_time(order_time);
    ```
    
*   **PostgreSQL**：用`REINDEX`（支持并发），看示例：
    
    ```
    -- 并发重建索引，不锁表
    REINDEX INDEX CONCURRENTLY idx_order_time;
    ```
    
*   **Oracle**：用`ALTER INDEX REBUILD`，看示例：
    
    ```
    -- 重建索引，整理碎片
    ALTER INDEX idx_order_time REBUILD;
    ```
    

##### 2、刷新索引统计：避免优化器误判

数据库依赖索引统计信息（如：基数、行数）选择索引，统计不准会导致选错索引，我们需定期刷新。

*   **MySQL**：`ANALYZE TABLE`，示例：
    
    ```
    -- 刷新表统计信息
    ANALYZE TABLE customer;
    ```
    
*   **PostgreSQL**：`ANALYZE`，示例：
    
    ```
    -- 刷新表统计信息
    ANALYZE customer;
    ```
    
*   **Oracle**：`DBMS_STATS.GATHER_TABLE_STATS`，示例：
    
    ```
    -- 刷新表统计信息
    EXEC DBMS_STATS.GATHER_TABLE_STATS(OWNNAME => 'SCOTT', TABNAME => 'CUSTOMER');
    ```
    

##### 3、索引失效排查：定位未命中索引的查询

生产环境中需快速定位“未命中索引的慢查询”，主流数据库均提供了监控工具。

*   **MySQL**：用`performance_schema`，我们看示例：
    
    ```sql
    -- 开启监控
    UPDATE performance_schema.setup_consumers SET ENABLED='YES' WHERE NAME='events_statements_current';
    -- 查未使用索引的查询（type=ALL或key=NULL）
    SELECT DIGEST_TEXT AS sql_text, COUNT_STAR AS exec_count 
    FROM performance_schema.events_statements_summary_by_digest
    WHERE DIGEST_TEXT LIKE '%FROM customer%' AND key IS NULL
    ORDER BY exec_count DESC;
    ```
    
*   **PostgreSQL**：用`pg_stat_statements`，示例：
    
    ```sql
    -- 查全表扫描的慢查询
    SELECT query, calls, total_time 
    FROM pg_stat_statements 
    WHERE query LIKE '%FROM customer%' AND query NOT LIKE '%INDEX%'
    ORDER BY total_time DESC;
    ```
    

#### 六、读写平衡场景：避免索引成为写入瓶颈

##### 1、高频更新字段：用“延迟索引”平衡读写

对于商品库存、用户在线状态等**每秒更新数十次**的字段，我们直接建索引会导致每次更新同步维护索引，严重拖慢写性能。我们需通过“辅助表+定时同步”实现“延迟索引”，主表负责高频写入，辅助表负责查询优化，具体思路为：

（1）主表：不建高频更新字段的索引，确保写入效率；  
（2）辅助表：存储需查询的高频更新字段+主键，建查询索引；  
（3）定时同步：我们通过定时任务（如：Crontab、Airflow）将主表数据同步到辅助表，同步间隔按业务实时性调整（1-5秒）。

**示例**：

*   `MySQL`：
    
    ```sql
    -- 1、主表（无库存索引，写入快）
    CREATE TABLE goods (
      goods_id INT PRIMARY KEY AUTO_INCREMENT,
      goods_name VARCHAR(100),
      stock INT  -- 高频更新字段，不建索引
    );
    
    -- 2、辅助表（建库存索引，用于查询）
    CREATE TABLE goods_stock_index (
      goods_id INT PRIMARY KEY,
      stock INT,
      INDEX idx_goods_stock (stock)
    );
    
    -- 3、定时同步（每3秒执行一次，用存储过程+事件调度）
    DELIMITER //
    CREATE PROCEDURE sync_stock()
    BEGIN
      REPLACE INTO goods_stock_index (goods_id, stock)
      SELECT goods_id, stock FROM goods;
    END //
    DELIMITER ;
    
    -- 开启事件调度，每3秒执行同步
    SET GLOBAL event_scheduler = ON;
    CREATE EVENT sync_stock_event 
    ON SCHEDULE EVERY 3 SECOND 
    DO CALL sync_stock();
    
    -- 4、查询库存（查辅助表，不影响主表写入）
    SELECT goods_id FROM goods_stock_index WHERE stock < 10;
    ```
    
*   `PostgreSQL`：用“物化视图”替代辅助表（自动刷新，无需我们手动写同步任务）
    
    ```sql
    -- 1、主表（无库存索引）
    CREATE TABLE goods (
      goods_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      goods_name VARCHAR(100),
      stock INT
    );
    
    -- 2、物化视图（相当于辅助表，支持索引，定时刷新）
    CREATE MATERIALIZED VIEW goods_stock_mv AS
    SELECT goods_id, stock FROM goods;
    
    -- 3、给物化视图建索引
    CREATE INDEX idx_mv_stock ON goods_stock_mv(stock);
    
    -- 4、定时刷新物化视图（每3秒，用pg_cron扩展）
    -- 安装pg_cron：CREATE EXTENSION IF NOT EXISTS pg_cron;
    SELECT cron.schedule(
    'sync-stock-mv', 
    '*/3 * * * * *',  -- 每3秒
    'REFRESH MATERIALIZED VIEW goods_stock_mv;'
    );
    
    -- 5、查询库存（查物化视图）
    SELECT goods_id FROM goods_stock_mv WHERE stock < 10;
    ```
    
*   `Oracle`：用“物化视图日志+快速刷新”优化同步效率
    
    ```sql
    -- 1、主表（无库存索引）
    CREATE TABLE goods (
      goods_id INT PRIMARY KEY,
      goods_name VARCHAR(100),
      stock INT
    );
    
    -- 2、建物化视图日志（记录主表变更，支持快速刷新）
    CREATE MATERIALIZED VIEW LOG ON goods WITH PRIMARY KEY;
    
    -- 3、建物化视图（快速刷新，仅同步变更数据）
    CREATE MATERIALIZED VIEW goods_stock_mv
    REFRESH FAST ON DEMAND  -- 按需快速刷新
    AS SELECT goods_id, stock FROM goods;
    
    -- 4、给物化视图建索引
    CREATE INDEX idx_mv_stock ON goods_stock_mv(stock);
    
    -- 5、定时刷新（用DBMS_SCHEDULER，每3秒）
    BEGIN
      DBMS_SCHEDULER.CREATE_JOB(
        job_name => 'SYNC_STOCK_MV',
        job_type => 'PLSQL_BLOCK',
        job_action => 'BEGIN DBMS_MVIEW.REFRESH(''GOODS_STOCK_MV'', ''F''); END;',
        repeat_interval => 'FREQ=SECONDLY;INTERVAL=3',
        enabled => TRUE
      );
    END;
    /
    
    -- 6、查询库存
    SELECT goods_id FROM goods_stock_mv WHERE stock < 10;
    ```
    

**注意**：同步间隔需平衡“实时性”与“写性能”，实时性要求高（如：秒杀库存）设1-2秒，非核心查询（如：商品库存统计）设30秒-5分钟。

##### 2、读写分离场景：从库单独加“查询专用索引”

在“主库写入、从库查询”的读写分离架构中，主库若因写压力无法加联合索引（如：订单表的“用户+时间”索引），我们可在从库单独创建**查询专用索引**，既优化从库查询，又不影响主库写入，具体原则为：

（1）主库：仅保留写入必需的索引（如：主键、外键索引），减少写入时的索引维护开销；  
（2）从库：根据查询需求加专用索引（如：联合索引、函数索引），不同步回主库；  
（3）索引同步控制：从库加索引前需临时停止SQL同步，避免主库的DDL覆盖从库索引。

**示例**：

*   `MySQL`（基于MGR/主从复制）：
    
    ```sql
    -- 1、主库表结构（仅保留主键和用户ID索引，写入快）
    CREATE TABLE orders (
      order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
      user_id INT,
      order_time DATETIME,
      order_amount DECIMAL(10,2),
      INDEX idx_orders_user_id (user_id)  -- 主库仅需此索引
    );
    
    -- 2、从库操作：临时停止SQL同步（避免主库覆盖索引）
    STOP SLAVE SQL_THREAD;
    
    -- 3、从库加查询专用索引（“用户+时间”联合索引，优化历史订单查询）
    CREATE INDEX idx_orders_user_time_slave ON orders(user_id, order_time);
    
    -- 4、从库重启SQL同步（仅同步数据，不同步从库专属索引）
    START SLAVE SQL_THREAD;
    
    -- 5、从库查询（命中专用索引，效率高）
    SELECT DATE_FORMAT(order_time, '%Y-%m'), SUM(order_amount)
    FROM orders
    WHERE user_id = 1001 AND order_time >= '2024-01-01'
    GROUP BY DATE_FORMAT(order_time, '%Y-%m');
    ```
    
*   `PostgreSQL`（基于流复制）：
    
    ```sql
    -- 1、主库表结构（仅保留主键和用户ID索引）
    CREATE TABLE orders (
      order_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id INT,
      order_time TIMESTAMP,
      order_amount NUMERIC(10,2),
      INDEX idx_orders_user_id (user_id)
    );
    
    -- 2、从库操作：临时设置为“只读-不同步DDL”（PostgreSQL流复制默认同步所有DDL，需手动过滤）
    -- 方法：从库修改postgresql.conf，我们临时关闭DDL同步（重启生效，仅测试环境用）
    -- 生产环境推荐：从库用“逻辑复制”，订阅时排除DDL，仅同步数据
    
    -- 3、从库加查询专用索引
    CREATE INDEX idx_orders_user_time_slave ON orders(user_id, order_time);
    
    -- 4、从库查询（命中索引）
    SELECT TO_CHAR(order_time, 'YYYY-MM'), SUM(order_amount)
    FROM orders
    WHERE user_id = 1001 AND order_time >= '2024-01-01'
    GROUP BY TO_CHAR(order_time, 'YYYY-MM');
    ```
    
*   `Oracle`（基于Data Guard）：
    
    ```sql
    -- 1、主库表结构（仅保留主键和用户ID索引）
    CREATE TABLE orders (
      order_id BIGINT PRIMARY KEY,
      user_id INT,
      order_time DATE,
      order_amount NUMBER(10,2),
      INDEX idx_orders_user_id (user_id)
    );
    
    -- 2、备库操作：切换为“读写模式”（默认备库只读，需先激活）
    ALTER DATABASE ACTIVATE PHYSICAL STANDBY DATABASE;
    ALTER DATABASE OPEN;
    
    -- 3、备库加查询专用索引
    CREATE INDEX idx_orders_user_time_slave ON orders(user_id, order_time);
    
    -- 4、备库我们切换回“只读模式”（继续同步主库数据）
    ALTER DATABASE RECOVER MANAGED STANDBY DATABASE DISCONNECT FROM SESSION;
    
    -- 5、备库查询（命中索引）
    SELECT TO_CHAR(order_time, 'YYYY-MM'), SUM(order_amount)
    FROM orders
    WHERE user_id = 1001 AND order_time >= TO_DATE('2024-01-01', 'YYYY-MM-DD')
    GROUP BY TO_CHAR(order_time, 'YYYY-MM');
    ```
    

##### 3、小表大索引：删除冗余索引，用“主键覆盖”替代

对小表（行数<1万），若索引体积接近甚至超过表数据体积（如：5000行表，索引占10MB，表数据仅8MB），索引会增加IO开销（查询时需同时加载表和索引）。此时我们应删除冗余索引，利用“主键有序存储”优化查询。

**底层逻辑**：小表全表扫描的IO开销（加载8MB数据）远低于“加载索引（10MB）+ 回表/定位（8MB）”的开销；且主键索引是聚簇索引（MySQL）或按主键有序存储（PostgreSQL/Oracle），我们查询后无需额外排序，效率更高。

**示例**：

小表大索引，IO开销大：

```sql
-- 小表建多个冗余索引，索引体积过大
CREATE TABLE dict_city (
  city_id INT PRIMARY KEY AUTO_INCREMENT,  -- 主键索引
  city_name VARCHAR(50),
  province VARCHAR(50),
  INDEX idx_city_name (city_name),  -- 冗余：小表查名字直接扫主键更快
  INDEX idx_city_province (province)  -- 冗余
);

-- 查询时加载索引+表数据，IO开销大
SELECT city_id FROM dict_city WHERE city_name = 'Shanghai';
```

删除冗余索引，直接主键覆盖：

```sql
-- 1、删除冗余索引
DROP INDEX idx_city_name ON dict_city;
DROP INDEX idx_city_province ON dict_city;

-- 2、查询优化
-- 场景1：查单条数据（主键索引直接命中，无需其他索引）
SELECT * FROM dict_city WHERE city_id = 10;

-- 场景2：查多条数据（小表全表扫描+主键排序，效率高于索引查询）
SELECT city_id, city_name FROM dict_city WHERE province = 'Guangdong';
```

#### 七、批量操作场景：临时禁用索引，提升效率

批量操作（如：批量导入10万条数据、批量更新thousands行记录）时，每条记录都会触发索引维护（更新B+树结构），导致操作缓慢。我们需**临时禁用非主键索引**，完成后再重建，大幅减少索引维护开销。

**各数据库实现方式**（非主键索引禁用/启用）：

| 数据库 | 禁用非主键索引命令 | 启用非主键索引命令 | 注意事项 |
| --- | --- | --- | --- |
| MySQL | `ALTER TABLE 表名 DISABLE KEYS;` | `ALTER TABLE 表名 ENABLE KEYS;` | 仅对MyISAM和InnoDB的非主键索引有效，主键索引始终启用 |
| PostgreSQL | 无直接禁用命令，需先删除索引，批量后重建 | \- | 推荐用“临时表+批量插入后建索引”替代 |
| Oracle | `ALTER INDEX 索引名 UNUSABLE;` | `ALTER INDEX 索引名 REBUILD;` | 可批量禁用多个索引，禁用后索引不可用，需重建 |

**示例1：MySQL批量导入**

```sql
-- 场景：goods表有3个非主键索引，批量导入10万条数据
CREATE TABLE goods (
  goods_id INT PRIMARY KEY AUTO_INCREMENT,
  goods_name VARCHAR(100),
  goods_price DECIMAL(10,2),
  category_id INT,
  INDEX idx_goods_name (goods_name),
  INDEX idx_goods_price (goods_price),
  INDEX idx_goods_category (category_id)
);

-- 反例：直接批量导入，每条记录维护3个索引，耗时10分钟
LOAD DATA INFILE '/tmp/goods_data.csv' INTO TABLE goods FIELDS TERMINATED BY ',';

-- 正例：我们临时禁用索引，导入后重建
-- 1、禁用非主键索引
ALTER TABLE goods DISABLE KEYS;

-- 2、批量导入（无需维护非主键索引，耗时降至1分钟）
LOAD DATA INFILE '/tmp/goods_data.csv' INTO TABLE goods FIELDS TERMINATED BY ',';

-- 3、重建非主键索引（一次性维护，比逐行维护快）
ALTER TABLE goods ENABLE KEYS;
```

**示例2：Oracle批量更新**

```sql
-- 场景：我们批量更新10万条订单状态，订单表有2个非主键索引
CREATE TABLE orders (
  order_id BIGINT PRIMARY KEY,
  user_id INT,
  order_status VARCHAR(20),
  INDEX idx_orders_user_id (user_id),
  INDEX idx_orders_status (order_status)
);

-- 反例：直接批量更新，每条记录维护2个索引，耗时8分钟
UPDATE orders SET order_status = 'shipped' WHERE order_time < '2024-09-01';

-- 正例：临时禁用索引，更新后重建
-- 1、批量禁用非主键索引
ALTER INDEX idx_orders_user_id UNUSABLE;
ALTER INDEX idx_orders_status UNUSABLE;

-- 2、批量更新（无需维护索引，耗时降至2分钟）
UPDATE orders SET order_status = 'shipped' WHERE order_time < '2024-09-01';

-- 3、重建索引
ALTER INDEX idx_orders_user_id REBUILD;
ALTER INDEX idx_orders_status REBUILD;
```

**示例3：PostgreSQL批量插入（临时表替代禁用索引）**

PostgreSQL无直接禁用索引命令，我们推荐用“临时表+批量插入后建索引”优化：

```sql
-- 1、建临时表（无索引，批量插入快）
CREATE TEMPORARY TABLE tmp_goods (
  goods_name VARCHAR(100),
  goods_price NUMERIC(10,2),
  category_id INT
);

-- 2、批量插入临时表（无索引维护，耗时短）
COPY tmp_goods FROM '/tmp/goods_data.csv' DELIMITER ',' CSV;

-- 3、从临时表插入主表（主表此时无索引，插入快）
INSERT INTO goods (goods_name, goods_price, category_id)
SELECT goods_name, goods_price, category_id FROM tmp_goods;

-- 4、主表建索引（一次性维护）
CREATE INDEX idx_goods_name ON goods(goods_name);
CREATE INDEX idx_goods_category ON goods(category_id);

-- 5、删除临时表
DROP TABLE tmp_goods;
```

#### 八、分布式与分表场景：索引设计适配架构

##### 1、分布式分表场景：分表键+局部索引，避免跨表查询

在分布式分表架构（如：MySQL Sharding-JDBC、PostgreSQL Citus、Oracle Sharding）中，索引设计需绑定“分表键”，否则易触发跨表查询（扫描所有分表）。主要原则是“分表键优先+局部索引适配”，我们确保查询命中单表索引，具体原则为：

（1）所有查询索引必须包含分表键：确保中间件能精准定位分表（如：Sharding-JDBC通过分表键哈希/范围定位分表）；  
（2）分表键放联合索引最左：符合“最左匹配”原则，同时适配分表定位；  
（3）避免非分表键的范围查询：如：`order_time>='2024-01-01'`需跟在分表键后，否则索引失效。

**示例**（基于Sharding-JDBC分表，MySQL）：

无分表键，查询需跨表：

```sql
-- 场景：orders表按user_id哈希分4张表（orders_0~orders_3），分表键=user_id
-- 分表规则：user_id % 4 = 表后缀（如：user_id=10→orders_2）

-- 每张分表仅建order_time索引，无分表键user_id
CREATE TABLE orders_0 (
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  order_time DATETIME,
  INDEX idx_order_time (order_time)  -- 未包含分表键，查询需跨表
);

-- 查询user_id=10的2024年订单：因索引无user_id，需扫描所有4张分表，效率极低
SELECT * FROM orders WHERE user_id=10 AND order_time>='2024-01-01';
```

直接命中联合索引（包含分表键），无需跨表：

```sql
-- 每张分表建“分表键user_id+查询字段order_time”联合索引
CREATE TABLE orders_0 (
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  order_time DATETIME,
  INDEX idx_user_time (user_id, order_time)  -- 分表键放前面
);

-- 查询时：Sharding-JDBC通过user_id%4定位到orders_2，直接命中联合索引，无需跨表
SELECT * FROM orders WHERE user_id=10 AND order_time>='2024-01-01';
```

##### 2、历史数据归档：拆分表+独立索引，减轻主表压力

对订单表、日志表等大表，历史数据（如：1年前的订单）查询频率低，但占用大量空间，导致主表索引体积过大、查询变慢。我们需采用“表拆分+归档索引”方案：主表仅保留近期数据，历史数据迁移到归档表，各自维护独立索引。这样做的好处有：

*   主表索引体积减少70%+，查询速度显著提升；
    
*   归档表可单独部署在低配置服务器，降低主库资源占用；
    
*   归档数据删除/维护不影响主表。
    

**示例**：

```sql
-- 1、主表：仅保留近1年订单，索引体积小
CREATE TABLE orders_current (
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  order_time DATETIME,
  order_amount DECIMAL(10,2),
  INDEX idx_orders_user_time (user_id, order_time)  -- 小体积索引，查询快
);

-- 2、归档表：存储1年以上历史订单，独立索引
CREATE TABLE orders_archive (
  order_id BIGINT PRIMARY KEY,
  user_id INT,
  order_time DATETIME,
  order_amount DECIMAL(10,2),
  INDEX idx_orders_archive_user_time (user_id, order_time)  -- 归档专用索引
);

-- 3、定时归档（每月1号迁移上月数据，用定时任务执行）
-- 迁移数据到归档表
INSERT INTO orders_archive (order_id, user_id, order_time, order_amount)
SELECT order_id, user_id, order_time, order_amount 
FROM orders_current
WHERE order_time < DATE_SUB(CURDATE(), INTERVAL 1 YEAR);

-- 删除主表已归档数据
DELETE FROM orders_current 
WHERE order_time < DATE_SUB(CURDATE(), INTERVAL 1 YEAR);

-- 4、查询方案
-- 查近期订单（主表，快）
SELECT * FROM orders_current 
WHERE user_id = 501 AND order_time > '2024-01-01';

-- 查历史订单（归档表，无主表压力）
SELECT * FROM orders_archive 
WHERE user_id = 501 AND order_time < '2023-01-01';

-- 查全量订单（主表+归档表联合查询，用UNION ALL）
SELECT * FROM orders_current WHERE user_id = 501
UNION ALL
SELECT * FROM orders_archive WHERE user_id = 501;
```

#### 九、痛点突破：解决经典索引失效与性能问题

##### 1、唯一索引冲突优化：用“INSERT ... ON DUPLICATE KEY UPDATE”替代“先查后插”（MySQL/Oracle）

插入数据时需避免唯一索引冲突（如：用户手机号唯一），“先查询是否存在→再插入”会产生竞态问题（并发时可能重复插入）且效率低。我们可直接用数据库原生语法，利用唯一索引的冲突检测机制，一步完成“插入/更新”。具体数据库支持情况为：

*   MySQL：支持`INSERT ... ON DUPLICATE KEY UPDATE`；
    
*   Oracle：支持`MERGE INTO`；
    
*   PostgreSQL：支持`INSERT ... ON CONFLICT ... DO UPDATE`。
    

**示例1**：MySQL

```sql
-- 建用户表，手机号唯一索引
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(20) UNIQUE,  -- 唯一索引
  username VARCHAR(50)
);

-- 反例：先查后插，效率低且有竞态问题
SELECT user_id FROM users WHERE phone = '13800138000';  -- 第一次查询
IF NOT EXISTS THEN
  INSERT INTO users (phone, username) VALUES ('13800138000', 'Tom');
ELSE
  UPDATE users SET username = 'Tom' WHERE phone = '13800138000';
END IF;

-- 正例：我们用唯一索引冲突检测，一步完成
INSERT INTO users (phone, username) 
VALUES ('13800138000', 'Tom')
ON DUPLICATE KEY UPDATE username = 'Tom';  -- 冲突则更新
```

**示例2**：Oracle（MERGE INTO）

```sql
-- 建用户表，手机号唯一索引
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  phone VARCHAR(20) UNIQUE,
  username VARCHAR(50)
);

-- 正例：我们用MERGE INTO检测唯一冲突
MERGE INTO users u
USING (SELECT '13800138000' AS phone, 'Tom' AS username FROM DUAL) t
ON (u.phone = t.phone)
WHEN MATCHED THEN  -- 存在则更新
  UPDATE SET u.username = t.username
WHEN NOT MATCHED THEN  -- 不存在则插入
  INSERT (user_id, phone, username) VALUES (users_seq.NEXTVAL, t.phone, t.username);
```

##### 2、中间模糊查询（%xxx%）：我们用“倒排索引表”替代LIKE

对“中间模糊查询”（如：`goods_name LIKE '%华为手机%'`），普通索引和前缀索引均失效，全表扫描效率极低。我们可采用“倒排索引表”方法：提前拆分字段中的关键词，建立“关键词→记录ID”的映射关系，实现高效模糊查询。具体逻辑为：

我们将长文本拆分为多个关键词（如：“华为Mate60手机”拆分为“华为”、“Mate60”、“手机”、“华为Mate60”），存储到倒排索引表，查询时通过关键词匹配快速定位记录ID，再关联主表获取数据，效率从“秒级”降至“毫秒级”。

**示例**：

```sql
-- 1、主表：商品表
CREATE TABLE goods (
  goods_id INT PRIMARY KEY AUTO_INCREMENT,
  goods_name VARCHAR(100)  -- 如：华为Mate60手机、荣耀华为合作款
);

-- 2、倒排索引表：关键词→商品ID映射
CREATE TABLE goods_inverted_index (
  keyword VARCHAR(50),
  goods_id INT,
  PRIMARY KEY (keyword, goods_id),  -- 复合主键，避免重复映射
  INDEX idx_inverted_goods_id (goods_id)
);

-- 3、插入商品时同步生成关键词（通过程序或触发器实现）
-- 例：插入“华为Mate60手机”，拆分关键词并插入倒排表
INSERT INTO goods (goods_name) VALUES ('华为Mate60手机');
INSERT INTO goods_inverted_index (keyword, goods_id)
VALUES 
  ('华为', LAST_INSERT_ID()),
  ('Mate60', LAST_INSERT_ID()),
  ('手机', LAST_INSERT_ID()),
  ('华为Mate60', LAST_INSERT_ID()),
  ('Mate60手机', LAST_INSERT_ID());

-- 4、中间模糊查询（通过关键词匹配，无需全表扫描）
-- 查含“华为手机”的商品（匹配“华为”和“手机”的交集）
SELECT g.goods_id, g.goods_name
FROM goods g
JOIN goods_inverted_index i1 ON g.goods_id = i1.goods_id
JOIN goods_inverted_index i2 ON g.goods_id = i2.goods_id
WHERE i1.keyword = '华为' AND i2.keyword = '手机';
```

##### 3、索引与缓存协同：缓存“索引过滤后的数据”

高频查询场景中，即使每次查询都命中索引，仍会消耗数据库CPU。我们可将“索引过滤后的小结果集”缓存到Redis，让查询先查缓存，未命中再查数据库索引，减轻数据库压力。配合注意事项为：

（1）缓存结果集需“小而稳定”：结果集行数建议<1000，更新频率低（如：分类列表、字典数据）；  
（2）缓存键设计关联索引条件：如：`goods:category:10`对应“category\_id=10+status=1”的索引条件；  
（3）更新策略优先“删除缓存”：避免“更新数据库+更新缓存”的竞态问题（更新数据库后删除缓存，下次我们查询时重新加载）。

**示例**：

```sql
-- 1、主表：商品表，建“分类+状态”联合索引
CREATE TABLE goods (
  goods_id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  goods_name VARCHAR(100),
  status TINYINT,  -- 1=上架，0=下架
  INDEX idx_category_status (category_id, status)
);

-- 2、缓存逻辑（伪代码，结合Redis）
function getGoodsByCategory(categoryId) {
  // （1）先查Redis缓存
  cacheKey = "goods:category:" + categoryId;
  cachedData = Redis.get(cacheKey);
if (cachedData) {
    return cachedData;  // 缓存命中，直接返回
  }

  // （2）缓存未命中，查数据库（命中索引）
  sql = "SELECT goods_id, goods_name FROM goods WHERE category_id = ? AND status = 1";
  data = DB.query(sql, [categoryId]);

  // （3）结果存入Redis（设置过期时间，如：30分钟）
  Redis.set(cacheKey, data, 30*60);

return data;
}

-- 3、数据更新时删除缓存（避免脏数据）
function updateGoodsStatus(goodsId, newStatus) {
  // 更新数据库
  sql = "UPDATE goods SET status = ? WHERE goods_id = ?";
  DB.execute(sql, [newStatus, goodsId]);

  // 删除关联缓存（如：该商品所属分类的缓存）
  categoryId = DB.query("SELECT category_id FROM goods WHERE goods_id = ?", [goodsId]);
  cacheKey = "goods:category:" + categoryId;
  Redis.delete(cacheKey);
}
```

#### 十、极端数据场景：亿级表与非结构化数据优化

##### 1、亿级大表索引优化：分区索引+采样统计

当表数据量突破1亿行，传统单表索引会面临“索引体积过大（数十GB）”、“查询扫描范围广”、“统计信息更新慢”三大问题，我们需结合**表分区+分区索引+采样统计**，将索引“拆分到分区”，减少单索引扫描范围。具体这么做：

*   表分区：按时间/范围/哈希将大表拆分为多个小分区（如：订单表按月份分区），每个分区独立存储；
    
*   分区索引：索引与分区绑定，查询仅扫描目标分区的索引（如：查2024年1月订单，仅扫描202401分区索引）；
    
*   采样统计：关闭全量统计信息更新，采用采样（如：1%数据）生成统计信息，避免统计更新耗时过长。
    

（1）**MySQL 8.0+按时间分区+分区索引**

```sql
-- 1、建亿级订单表（按月份分区，共12个分区）
CREATE TABLE orders_100m (
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  order_time DATETIME,
  order_amount DECIMAL(10,2),
  -- 分区索引：与分区绑定，仅在对应分区生效
  INDEX idx_orders_user_time (user_id, order_time)
)
-- 按订单时间分12个月度分区
PARTITION BY RANGE (TO_DAYS(order_time)) (
  PARTITION p202401 VALUES LESS THAN (TO_DAYS('2024-02-01')),
  PARTITION p202402 VALUES LESS THAN (TO_DAYS('2024-03-01')),
  ...
  PARTITION p202412 VALUES LESS THAN (TO_DAYS('2025-01-01'))
);

-- 2、开启采样统计（避免全量统计耗时）
ALTER TABLE orders_100m SET STATISTICS_SAMPLE_PAGES = 100;  -- 采样100个数据页

-- 3、查询优化：仅扫描目标分区索引
-- 查2024年1月用户1001的订单，仅扫描p202401分区
SELECT * FROM orders_100m 
WHERE user_id = 1001 AND order_time BETWEEN '2024-01-01' AND '2024-01-31';
```

（2）**PostgreSQL 14+哈希分区+BRIN索引（时序数据）**

```sql
-- 1、建亿级监控日志表（按设备ID哈希分8个分区）
CREATE TABLE monitor_logs_100m (
  log_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  device_id INT,
  log_time TIMESTAMP,
  log_content JSONB,
  -- BRIN索引：适合时序数据，索引体积仅传统B+树的0.1%
  INDEX idx_log_time_brin ON monitor_logs_100m USING BRIN(log_time)
)
-- 按device_id哈希分8个分区
PARTITION BY HASH (device_id);

-- 2、创建8个分区（手动或自动）
CREATE TABLE monitor_logs_100m_p1 PARTITION OF monitor_logs_100m FOR VALUES WITH (MODULUS 8, REMAINDER 0);
CREATE TABLE monitor_logs_100m_p2 PARTITION OF monitor_logs_100m FOR VALUES WITH (MODULUS 8, REMAINDER 1);
...
CREATE TABLE monitor_logs_100m_p8 PARTITION OF monitor_logs_100m FOR VALUES WITH (MODULUS 8, REMAINDER 7);

-- 3、开启采样统计
ALTER TABLE monitor_logs_100m ALTER COLUMN log_time SET STATISTICS 1000;  -- 采样1000条数据

-- 4、查询优化：哈希定位分区+BRIN索引范围扫描
SELECT log_content FROM monitor_logs_100m 
WHERE device_id = 5001 AND log_time BETWEEN '2024-09-01 00:00' AND '2024-09-01 01:00';
```

（3）**Oracle 19c区间分区+本地索引**

```sql
-- 1、建亿级用户行为表（按时间区间分4个季度分区）
CREATE TABLE user_behavior_100m (
  behavior_id BIGINT PRIMARY KEY,
  user_id INT,
  behavior_time DATE,
  behavior_type VARCHAR(20),
  -- 本地索引：与分区绑定，仅在分区内生效
  INDEX idx_behavior_user_time (user_id, behavior_time) LOCAL
)
-- 按行为时间分4个季度分区
PARTITION BY RANGE (behavior_time) (
  PARTITION p2024q1 VALUES LESS THAN (TO_DATE('2024-04-01', 'YYYY-MM-DD')),
  PARTITION p2024q2 VALUES LESS THAN (TO_DATE('2024-07-01', 'YYYY-MM-DD')),
  PARTITION p2024q3 VALUES LESS THAN (TO_DATE('2024-10-01', 'YYYY-MM-DD')),
  PARTITION p2024q4 VALUES LESS THAN (TO_DATE('2025-01-01', 'YYYY-MM-DD'))
);

-- 2、开启采样统计（减少统计更新耗时）
BEGIN
  DBMS_STATS.SET_TABLE_PREFS(
    OWNNAME => 'SCOTT',
    TABNAME => 'USER_BEHAVIOR_100M',
    PREFERENCE_NAME => 'ESTIMATE_PERCENT',
    PREFERENCE_VALUE => '1'  -- 采样1%数据
  );
END;
/

-- 3、查询优化：仅扫描目标分区的本地索引
SELECT behavior_type FROM user_behavior_100m 
WHERE user_id = 10001 AND behavior_time BETWEEN TO_DATE('2024-01-01', 'YYYY-MM-DD') AND TO_DATE('2024-03-31', 'YYYY-MM-DD');
```

##### 2、非结构化数据索引：JSON/数组/文本的深度优化

主流数据库对JSON、数组、长文本等非结构化数据的原生支持差异较大，我们需用各数据库特有的索引类型突破查询性能瓶颈，避免全表扫描。

（1）**MySQL 8.0+ JSON数据：多值索引+路径优化**

MySQL支持JSON多值索引（针对JSON数组），解决“查询数组包含某值”的低效问题，我们需注意索引路径与查询路径完全一致。

**直接查询JSON数组，全表扫描**：

```sql
-- 表含JSON数组字段tags（如：{"tags":["java","mysql","redis"]}）
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content JSON
);

-- 直接查询JSON数组，全表扫描
SELECT * FROM articles WHERE JSON_CONTAINS(content->>'$.tags', '"mysql"');
```

**建JSON多值索引**：

```sql
-- 1、建JSON多值索引（针对tags数组）
CREATE INDEX idx_articles_tags ON articles(CAST(content->>'$.tags[*]' AS CHAR(20) ARRAY));

-- 2、查询时用MEMBER OF或JSON_CONTAINS，命中索引
-- 方法1：MEMBER OF（推荐，更简洁）
SELECT * FROM articles WHERE 'mysql' MEMBER OF (content->>'$.tags');
-- 方法2：JSON_CONTAINS（需与索引路径一致）
SELECT * FROM articles WHERE JSON_CONTAINS(content->>'$.tags', '"mysql"');
```

（2）**PostgreSQL JSONB/数组：GIN索引+表达式索引**

PostgreSQL的GIN索引对JSONB和数组类型支持最优，我们可结合表达式索引实现复杂查询优化，如：JSON嵌套字段+数组多值匹配。我们看示例：

```sql
-- 1、表含JSONB字段user_info（如：{"name":"Jerry","hobbies":["reading","hiking"],"address":{"city":"Shanghai"}}）
CREATE TABLE users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_info JSONB
);

-- 2、建GIN索引（支持JSONB嵌套字段和数组）
-- 索引1：针对hobbies数组
CREATE INDEX idx_users_hobbies ON users USING GIN(user_info->'hobbies');
-- 索引2：针对嵌套的address.city字段（表达式索引）
CREATE INDEX idx_users_city ON users USING GIN((user_info->'address'->>'city'));

-- 3、高效查询示例
-- 查爱好含hiking的用户（命中idx_users_hobbies）
SELECT id FROM users WHERE user_info->'hobbies' @> '"hiking"'::JSONB;
-- 查上海且爱好含reading的用户（命中两个GIN索引，索引合并）
SELECT id FROM users 
WHERE user_info->'hobbies' @> '"reading"'::JSONB 
  AND (user_info->'address'->>'city') = 'Shanghai';
```

（3）**Oracle 12c+文本数据：全文索引+分词优化**

Oracle的全文索引（CONTEXT类型）支持中文分词（需安装中文分词包），解决长文本“关键词检索”的低效问题，比`LIKE %xxx%`效率提升100倍以上。我们看示例：

```sql
-- 1、安装中文分词包（需DBA权限）
EXEC CTXSYS.CTX_DDL.CREATE_PREFERENCE('CHINESE_LEXER', 'CTXSYS.CHINESE_VGRAM_LEXER');

-- 2、建长文本表（文章内容）
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(200),
  content CLOB  -- 长文本字段
);

-- 3、建全文索引（指定中文分词）
CREATE INDEX idx_articles_content_ft ON articles(content)
INDEXTYPE IS CTXSYS.CONTEXT
PARAMETERS ('LEXER CHINESE_LEXER');

-- 4、全文检索示例
-- 查含“数据库优化”的文章（支持关键词拆分）
SELECT title FROM articles WHERE CONTAINS(content, '数据库优化') > 0;
-- 查含“MySQL”或“PostgreSQL”的文章（布尔逻辑）
SELECT title FROM articles WHERE CONTAINS(content, 'MySQL OR PostgreSQL') > 0;
```

##### 3、高并发写入场景：索引延迟构建+批量提交

当写入并发超过1000 TPS（如：秒杀、日志上报），实时维护索引会导致写入阻塞，我们需采用“索引延迟构建+批量提交”策略，将索引维护从“实时”改为“准实时”，降低写入锁冲突。具体思路为：

（1）写入层：数据先写入“无索引临时表”（仅主键索引，写入快），避免实时维护索引；  
（2）异步层：通过定时任务（如：每5秒）将临时表数据批量合并到“主表”（含完整索引），批量维护索引；  
（3）查询层：查询时同时扫描“临时表”和“主表”，合并结果（确保数据不丢失）。

**示例**：MySQL

```sql
-- 1、临时表（无索引，仅主键，写入快）
CREATE TABLE goods_temp (
  goods_id INT PRIMARY KEY AUTO_INCREMENT,
  goods_name VARCHAR(100),
  price DECIMAL(10,2),
  category_id INT
);

-- 2、主表（含完整索引，查询快）
CREATE TABLE goods_main (
  goods_id INT PRIMARY KEY,
  goods_name VARCHAR(100),
  price DECIMAL(10,2),
  category_id INT,
  INDEX idx_goods_name (goods_name),
  INDEX idx_goods_category (category_id)
);

-- 3、高并发写入临时表（无索引维护，写入速度快）
-- 示例：秒杀场景批量插入商品
INSERT INTO goods_temp (goods_name, price, category_id)
VALUES 
  ('秒杀商品1', 9.9, 1),
  ('秒杀商品2', 19.9, 1),
  ...;  -- 每秒可处理10000+条写入

-- 4、定时任务批量合并到主表（每5秒执行一次）
DELIMITER //
CREATE PROCEDURE sync_temp_to_main()
BEGIN
  -- （1）批量插入新数据（ON DUPLICATE KEY处理更新）
  INSERT INTO goods_main (goods_id, goods_name, price, category_id)
  SELECT goods_id, goods_name, price, category_id FROM goods_temp
  ON DUPLICATE KEY UPDATE 
    goods_name = VALUES(goods_name),
    price = VALUES(price),
    category_id = VALUES(category_id);

  -- （2）清空临时表（避免重复同步）
  TRUNCATE TABLE goods_temp;
END //
DELIMITER ;

-- 5、查询时合并临时表和主表数据
SELECT * FROM goods_main WHERE category_id = 1
UNION ALL
SELECT * FROM goods_temp WHERE category_id = 1;
```

#### 十一、索引自动化运维：工具与流程落地

手动维护索引存在“效率低、易遗漏、响应慢”问题，我们需通过“工具监控+自动执行+告警闭环”实现自动化运维，降低人力成本，避免人为失误。

##### 1、索引监控工具：全链路可视化

主流数据库有原生或第三方工具，我们可实时监控索引使用情况、碎片率、性能损耗，实现“问题早发现”。

| 数据库 | 原生工具 | 第三方工具 | 监控指标 |
| --- | --- | --- | --- |
| MySQL | Performance Schema、Sys Schema | Percona Monitoring and Management (PMM) | 索引使用次数、未使用索引查询、碎片率 |
| PostgreSQL | pg\_stat\_statements、pg\_stat\_user\_indexes | pgHero、Prometheus+Grafana | 索引扫描次数、全表扫描占比、统计信息过期时间 |
| Oracle | AWR、ASH、DBA\_INDEXES | Oracle Enterprise Manager (OEM) | 索引响应时间、锁等待次数、碎片率 |

**示例**：MySQL用PMM监控索引

（1）**部署PMM**：通过Docker快速部署PMM Server和PMM Client，客户端接入MySQL实例；  
（2）**监控指标配置**：

*   新建仪表盘，添加“索引使用次数”、“未使用索引的SQL数量”、“索引碎片率”指标；
    
*   设置告警阈值：未使用索引SQL占比>5%告警，索引碎片率>30%告警；  
    （3）**可视化与告警**：实时查看索引性能趋势，异常时通过邮件/钉钉推送告警，如：订单表idx\_order\_time索引已7天未使用，建议删除。
    

##### 2、自动运维脚本：索引清理与优化

通过脚本实现“无用索引自动清理”、“碎片自动整理”、“统计信息自动刷新”，定期执行（如：每日凌晨低峰期），无需我们人工干预。

（1）**MySQL自动清理无用索引脚本**

```sql
-- 脚本功能：自动删除30天未使用的非主键索引，输出执行日志
DELIMITER //
CREATE PROCEDURE auto_clean_unused_indexes(IN db_name VARCHAR(50))
BEGIN
  -- 1、定义变量
  DECLARE done INT DEFAULT 0;
  DECLARE table_name VARCHAR(50);
  DECLARE index_name VARCHAR(50);
  DECLARE log_msg VARCHAR(255);

  -- 2、游标：获取30天未使用的非主键索引
  DECLARE idx_cursor CURSOR FOR
    SELECT 
      table_name, 
      index_name 
    FROM 
      performance_schema.schema_unused_indexes 
    WHERE 
      table_schema = db_name
      AND index_name NOT IN (SELECT COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE constraint_type = 'PRIMARY KEY' AND table_schema = db_name)
      AND timestampdiff(DAY, last_used, now()) > 30;

  -- 3、异常处理
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  -- 4、打开游标，循环删除索引
  OPEN idx_cursor;
  idx_loop: LOOP
    FETCH idx_cursor INTO table_name, index_name;
    IF done = 1 THEN
      LEAVE idx_loop;
    END IF;

    -- 5、拼接删除索引SQL，执行并记录日志
    SET @drop_sql = CONCAT('DROP INDEX ', index_name, ' ON ', db_name, '.', table_name);
    PREPARE stmt FROM @drop_sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    -- 6、记录日志（插入到运维日志表）
    SET log_msg = CONCAT('Auto deleted unused index: ', index_name, ' on table ', table_name, ' at ', now());
    INSERT INTO db_ops_log (log_content, log_type) VALUES (log_msg, 'INDEX_CLEAN');
  END LOOP;
  CLOSE idx_cursor;
END //
DELIMITER ;

-- 7、定时执行（每日凌晨3点）
SET GLOBAL event_scheduler = ON;
CREATE EVENT event_auto_clean_idx
ON SCHEDULE EVERY 1 DAY STARTS '2024-09-01 03:00:00'
DO CALL auto_clean_unused_indexes('shop');
```

（2）**PostgreSQL自动整理索引碎片脚本**

```sql
-- 脚本功能：自动重建碎片率>30%的索引，支持并发执行
CREATE OR REPLACE FUNCTION auto_rebuild_fragmented_indexes()
RETURNS VOID AS $$
DECLARE
  rec RECORD;
  rebuild_sql TEXT;
BEGIN
  -- 1、查询碎片率>30%的索引（排除系统索引和主键索引）
  FOR rec IN
    SELECT 
      schemaname, 
      relname AS table_name, 
      indexrelname AS index_name
    FROM 
      pg_stat_user_indexes
    JOIN 
      pg_indexes ON pg_stat_user_indexes.indexrelname = pg_indexes.indexname
    WHERE 
      pg_stat_user_indexes.schemaname NOT IN ('pg_catalog', 'information_schema')
      AND pg_indexes.primary = 'f'  -- 排除主键索引
      AND (pg_stat_user_indexes.idx_scan > 0 OR pg_stat_user_indexes.idx_scan IS NULL)  -- 排除未使用的索引（已由其他脚本清理）
      AND (SELECT relpages FROM pg_class WHERE relname = pg_stat_user_indexes.indexrelname) > 10  -- 排除小索引
      AND (SELECT (relpages - reltuples::INTEGER)::FLOAT / relpages FROM pg_class WHERE relname = pg_stat_user_indexes.indexrelname) > 0.3  -- 碎片率>30%
  LOOP
    -- 2、拼接并发重建索引SQL（避免锁表）
    rebuild_sql := FORMAT(
      'REINDEX INDEX CONCURRENTLY %I.%I;',
      rec.schemaname,
      rec.index_name
    );

    -- 3、执行重建并记录日志
    RAISE NOTICE 'Rebuilding index: %.%', rec.schemaname, rec.index_name;
    EXECUTE rebuild_sql;
    INSERT INTO db_ops_log (log_content, log_time)
    VALUES (FORMAT('Rebuilt fragmented index: %.%', rec.schemaname, rec.index_name), NOW());
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 4、定时执行（每周日凌晨2点，用pg_cron）
SELECT cron.schedule(
'auto-rebuild-indexes',
'0 2 * * 0',  -- 每周日2点
'SELECT auto_rebuild_fragmented_indexes();'
);
```

说到底，SQL索引优化没有捷径，我们先把通用规则练扎实，再结合数据库特性和业务场景灵活调整。