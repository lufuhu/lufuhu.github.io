---
title: 78个SQL性能优化实用方法，覆盖开发、设计、索引与优化器五大层面
lastUpdated: 2026-07-01 04:00:00
---


SQL性能优化的实用方法，我们试着把它分为五大类，分别对应：开发层(我们怎么写SQL)、设计层(怎么建表)、系统层(怎么部署与协同)、存储引擎层(根据业务场景选对引擎+用好引擎特性，这个地方我们主要讲高阶索引技巧)、优化器层(怎么让数据库聪明地执行)，仅供参考。

#### 一、SQL语句本身的优化(开发层)

1、**我们要避免在索引列上使用函数**  
**问题**：`WHERE DATE(created_at) = '2024-01-01'`会使索引失效。  
**解决**：改为`WHERE created_at >= '2024-01-01 00:00:00' AND created_at < '2024-01-02 00:00:00'`。

2、**优化分页查询(含游标分页)**  
**问题**：传统`LIMIT offset, size`在`offset`过大时，会扫描大量无用数据。  
**解决**：我们使用游标分页，通过索引列(如：ID、时间戳)定位起始位置，避免全表扫描。

```sql
-- 游标分页示例(基于ID)
SELECT * FROM table WHERE id > 1000 LIMIT 20;
```

3、**拆分复杂查询**  
**问题**：一个包含多个`JOIN`和子查询的巨型SQL难以优化。  
**解决**：我们把它拆分为多个小查询，用应用层代码组合结果，或使用临时表分步处理。

4、**减少`JOIN`的数据量**  
**问题**：大表直接`JOIN`会产生巨大的中间结果集。  
**解决**：先用子查询过滤，我们再进行`JOIN`操作。

```sql
-- 优化前
SELECT * FROM large_table l JOIN small_table s ON l.id = s.id;

-- 优化后
SELECT * FROM (SELECT * FROM large_table WHERE ...) l
JOIN (SELECT * FROM small_table WHERE ...) s ON l.id = s.id;
```

5、**避免`SELECT DISTINCT`和`ORDER BY`的滥用**  
**问题**：这两个操作都可能触发排序，消耗大量资源。  
**解决**：我们检查是否真的需要去重或排序，能用索引自然排序的就不要显式排序。

6、**避免使用**`SELECT *`  
**问题**：`SELECT *`会读取不必要的列，增加I/O、网络传输和内存开销，尤其在宽表或包含大字段(如：BLOB、TEXT)时影响显著。  
**解决**：我们只选择业务真正需要的字段。  
**额外好处**：更容易利用**覆盖索引**。

7、**合理使用`EXISTS`代替`IN`(或反之)**  
当子查询结果集较大时，`EXISTS`通常优于`IN`(因为`EXISTS`是“存在即停”)；当外层结果集大、内层小，且内层可去重时，`IN`可能更优。我们要**注意**：现代优化器(如：MySQL 8.0+、PostgreSQL)对两者优化趋同，但仍需结合执行计划判断。

8、**避免隐式类型转换**  
**问题**：`WHERE user_id = '123'`(`user_id`为`INT`)会导致索引失效，因为数据库需对每行进行类型转换。  
**解决**：我们保证查询条件与字段类型一致。

9、**控制子查询层级与相关性**  
**相关子查询**(Correlated Subquery)在每一行都要执行一次，性能极差。  
**优化**：我们尝试改写为`JOIN`或使用窗口函数(如：`ROW_NUMBER()`)替代。

10、**避免在`WHERE`中使用`!=`或`NOT IN`**  
**问题**：`!=`、`NOT IN`通常无法有效利用索引，且可能引发全表扫描；`NOT IN`在子查询含`NULL`时结果恒为空。  
**解决**：改用`NOT EXISTS`或反向条件(如：`status IN (2,3,4)`代替`status != 1`)。

11、**减少事务中的SQL数量与范围**  
**问题**：长事务会持有锁更久，阻塞其他操作，增加死锁概率。  
**解决**：我们将非必要操作移出事务，或拆分为多个小事务。

12、**避免在循环中执行SQL(N+1查询)**  
**问题**：应用层循环调用数据库，产生大量小查询，网络开销巨大。  
**解决**：我们使用批量查询、JOIN或预加载机制(如：ORM的eager loading)。

13、**批量操作优化**  
(1)**批量UPDATE优化**：避免循环执行`UPDATE table SET ... WHERE id = ?`，我们改用`CASE WHEN`批量更新，减少事务提交次数：

```sql
 -- 批量更新示例
 UPDATE users 
 SET status = CASE id 
   WHEN 1 THEN 2 
   WHEN 2 THEN 3 
   WHEN 3 THEN 1 
 END 
 WHERE id IN (1,2,3);
```

(2)**批量DELETE优化**：大表删除避免`DELETE FROM table WHERE ...`(会锁表)，我们改用`LIMIT`分批次删除，降低锁占用时间(需在**存储过程**/函数中执行)：

```sql
 DELIMITER //
 CREATE PROCEDURE batch_delete_orders()
 BEGIN
   DECLARE done INT DEFAULT FALSE;
   -- 关闭自动提交
   SET autocommit = 0;

   read_loop: LOOP
     DELETE FROM orders WHERE created_at < '2023-01-01' LIMIT 1000;
     IF ROW_COUNT() = 0 THEN
       LEAVE read_loop;
     END IF;
     COMMIT;  -- 提交本批次
     DO SLEEP(0.1);  -- 使用DO避免返回结果集
   END LOOP;

   SET autocommit = 1;
 END //
 DELIMITER ;
```

注：`DO expr`是MySQL专用语法，用在执行表达式但不返回结果。

14、**避免`LIKE '%xxx'`前缀模糊查询**  
**问题**：`WHERE name LIKE '%张'`或`WHERE name LIKE '%张三%'`会导致索引失效，触发全表扫描。  
**解决**：若需前缀模糊匹配，我们优先用`LIKE '张%'`(可利用前缀索引)；若需全模糊匹配，我们改用**全文索引**或Elasticsearch等搜索引擎。

15、**合理使用临时表与CTE(公共表表达式)**  
**适用场景**：复杂查询中需重复使用同一子查询结果(如：多表JOIN前的统一过滤)。  
**优化逻辑**：临时表可存储中间结果并建立索引，减少重复计算；CTE(如：`WITH`子句)可简化嵌套查询，部分数据库(PostgreSQL、MySQL 8.0+)会对CTE做执行计划优化。

```sql
 -- CTE示例(简化多表JOIN)
 WITH filtered_orders AS (
   SELECT id, user_id, amount FROM orders WHERE created_at > '2024-01-01'
 )
 SELECT u.name, fo.amount 
 FROM users u
 JOIN filtered_orders fo ON u.id = fo.user_id;
```

16、**使用`UNION ALL`代替`UNION`(当无需去重时)**  
**问题**：`UNION`会自动去重，通常通过哈希或临时排序实现，开销较大。  
**解决**：若业务允许重复，或已知结果无重复，我们用`UNION ALL`。

```sql
 -- 优化前
 SELECT name FROM users WHERE region = 'north'
 UNION
 SELECT name FROM users WHERE region = 'south';

 -- 优化后(若无重叠)
 SELECT name FROM users WHERE region = 'north'
 UNION ALL
 SELECT name FROM users WHERE region = 'south';
```

17、**避免在`ORDER BY`中混用`ASC/DESC`(除非有对应降序索引)**  
在MySQL 5.7及以下，`ORDER BY a ASC, b DESC`无法使用`(a, b)`联合索引进行排序，会触发filesort。  
**解决**：要么统一排序方向，要么在MySQL 8.0+中显式创建`(a ASC, b DESC)`索引。

18、**合理使用`LIMIT`配合`ORDER BY`(避免“排序全表再截断”)**  
在分页优化中，我们需特别注意：`ORDER BY`与`LIMIT`组合使用时，必须为排序字段建立对应索引。否则，即便仅使用`LIMIT 1`，数据库仍会对全表数据进行排序后再截取结果，严重影响性能。

```sql
 -- 若无(status, created_at)索引，即使LIMIT 1也会排序全表
 SELECT * FROM orders WHERE status = 1 ORDER BY created_at DESC LIMIT 1;
```

19、**超大批量数据导入优先使用`LOAD DATA INFILE`(MySQL)**  
**问题**：我们使用`INSERT INTO ... VALUES (...), (...), ...`插入百万级数据时，即使批量提交，仍需逐行解析、校验、写日志，效率低下。  
**解决**：对本地或服务端文件，我们使用`LOAD DATA INFILE`，可绕过部分SQL解析层，直接批量写入存储引擎，性能会大幅提升。

```
 -- 1、服务端(由DBA执行)：
 SET GLOBAL local_infile = ON;
 -- 2、客户端连接时(命令行)：
 mysql --local-infile=1 -u user -p
 -- 3、或在客户端会话中(若服务端已开)：
 SET SESSION local_infile = 1;  -- 部分版本支持，但非必须
 -- 4、执行导入(确保/tmp/users.csv权限为644，且MySQL进程可读取)
 LOAD DATA LOCAL INFILE '/tmp/users.csv'
 INTO TABLE users
 FIELDS TERMINATED BY ','  -- 按逗号分隔字段
 ENCLOSED BY '"'           -- 若字段含引号，需指定包裹符(可选)
 LINES TERMINATED BY '\n'  -- 按换行符分隔行
 IGNORE 1 ROWS             -- 若CSV有表头，忽略第一行(可选)
 (id, name, email);        -- 对应表字段顺序
```

**注意事项**：

*   我们需确保文件路径可访问(`local_infile=ON`)；
    
*   虽然`LOAD DATA INFILE`在`InnoDB`表上支持事务和回滚，但由于其批量写入特性，不适合需要细粒度回滚或强一致性校验的在线业务场景；
    
*   更适合离线数据导入及初始化、日志回放、ETL场景。
    

20、**避免“幻读”导致的重复处理(事务隔离级别与业务逻辑)**  
**场景**：在`REPEATABLE READ`下循环处理“待处理订单”：

```sql
 -- 事务A
 SELECT * FROM orders WHERE status = 'pending' LIMIT 1 FOR UPDATE;
 -- 处理后UPDATE status = 'processing'
```

**问题**：若并发高，可能多个事务同时读到同一批“pending”订单(因间隙锁未覆盖新插入行)，导致重复处理。

**优化**：  
使用`READ COMMITTED`+`SELECT ... FOR UPDATE SKIP LOCKED`(MySQL 8.0+、PostgreSQL 9.5+)；或业务层加分布式锁(如：Redis锁住订单ID)。

21、**利用“延迟关联”(Deferred Join)优化深分页**  
对**必须用`OFFSET`的场景**(如：跳页)，我们可优化为：

```sql
 -- 传统深分页(慢)
 SELECT * FROM orders ORDER BY id LIMIT 1000000, 20;

 -- 延迟关联(快)
 SELECT o.* FROM orders o
 INNER JOIN (SELECT id FROM orders ORDER BY id LIMIT 1000000, 20) tmp
 ON o.id = tmp.id;
```

**原理**：子查询只扫描索引(`id`)，避免回表；外层再通过主键回表取20行。

*   此优化在MySQL 8.0+中稳定有效；在5.7及以下版本中，需确保子查询能被优化器正确保留排序(我们可通过EXPLAIN验证是否使用了索引扫描)。
    
*   此优化要求排序字段(如：id)连续且单调递增，否则分页结果可能与传统OFFSET不一致。若id不连续，我们应优先采用游标分页(基于上一页最后一条记录的值)。
    

22、**避免“隐式字符集/排序规则转换”**  
**问题**：

```sql
 -- 表字段是utf8mb4_bin，但连接条件用utf8_general_ci字符串
 SELECT * FROM users WHERE name = '张三' COLLATE utf8_general_ci;
```

会导致索引失效，甚至报错。  
**解决**：我们确保**字段、连接条件、表、库的字符集与排序规则一致**。

23、**使用“只读事务”提升性能(MySQL 5.6+/PostgreSQL)**  
对纯查询事务，显式声明为只读：

```sql
 START TRANSACTION READ ONLY;
 SELECT ...;
 COMMIT;
```

**MySQL**：可减少事务系统开销(如：避免分配事务ID、减少undo日志生成)，提升并发查询性能，**注**：MySQL 8.0+对只读事务有较好支持；5.7及以下建议通过应用层控制事务只读性，或使用`SET TRANSACTION READ ONLY`(需在事务开始前设置)；  
**PostgreSQL**：可安全从备库读(配合hot\_standby\_feedback)。

24、**避免在事务中进行无关查询与操作**  
**问题**：事务中混入与主要业务无关的查询(如：日志查询、统计查询)或耗时操作(如：远程调用、文件读写)，会不必要地拉长事务周期，增加锁持有时间和死锁风险。  
**解决**：严格控制事务边界，仅包含核心DML操作；我们将所有非必要的查询、计算和外部调用移至事务之外执行。

```sql
 -- 优化前
 START TRANSACTION;
 UPDATE orders SET status = 'paid' WHERE id = 123; -- 核心业务
 SELECT COUNT(*) FROM logs WHERE order_id = 123; -- 无关查询，拉长事务
 CALL remote_notify_service(123); -- 耗时远程调用
 COMMIT;

 -- 优化后
 -- 1、前置查询(可选，非必须)
 SELECT COUNT(*) FROM logs WHERE order_id = 123;
 -- 2、极简事务
 START TRANSACTION;
 UPDATE orders SET status = 'paid' WHERE id = 123;
 COMMIT;
 -- 3、后置操作
 CALL remote_notify_service(123);
```

25、**合理使用`CASE WHEN`简化条件判断，减少分支查询(含可靠`CASE WHEN`示例)**  
**问题**：应用层根据不同条件，执行不同SQL查询(如：按日/周/月统计销售额)，会产生多个相似SQL，增加维护成本，且无法有效复用执行计划。若直接使用会话变量(如：`@type`)，在`GROUP BY`中配合`CASE WHEN`动态切换分组粒度(如：`CASE @type ... END AS period`)，会导致**执行顺序不确定、结果不可靠、执行计划无法优化**，属于反模式。  
**解决**：在确保条件值为常量(非会话变量)的前提下，我们可使用`CASE WHEN`实现安全的单SQL多粒度聚合。典型场景是**前端传入具体粒度值，应用将其作为字面量拼入SQL**(或通过预处理确保为常量)。此时`CASE WHEN`表达式可被优化器稳定解析，且配合`GROUP BY`安全可靠。

```sql
 -- 优化前(应用层分支)
 -- 若type='day'
 SELECT DATE(created_at) AS period, SUM(amount) FROM orders GROUP BY DATE(created_at);
 -- 若type = 'month'
 SELECT DATE_FORMAT(created_at, '%Y-%m') AS period, SUM(amount) FROM orders GROUP BY DATE_FORMAT(created_at, '%Y-%m');

 -- 优化后(SQL内分支，type值作为常量字面量传入)
 SELECT 
   CASE 'month'  -- 注意：此处是字面量'month'，是硬编码常量，而非变量@type，此写法仅在MySQL 5.7+且确保CASE表达式为常量时有效
     WHEN 'day'   THEN DATE(created_at)
     WHEN 'week'  THEN YEARWEEK(created_at, 1)
     WHEN 'month' THEN DATE_FORMAT(created_at, '%Y-%m')
   END AS period,
   SUM(amount) AS total
 FROM orders
 GROUP BY 
   CASE 'month'  -- 与SELECT中的表达式完全一致
     WHEN 'day'   THEN DATE(created_at)
     WHEN 'week'  THEN YEARWEEK(created_at, 1)
     WHEN 'month' THEN DATE_FORMAT(created_at, '%Y-%m')
   END
 ORDER BY period;
```

**说明**：

*   上述`CASE 'month'`中的`'month'`是由应用层根据用户输入替换后的常量字符串(如：通过字符串模板拼接)，不是数据库会话变量`@type`。
    
*   `GROUP BY`子句中，我们必须**重复完整的`CASE`表达式**(不能仅写别名`period`)，以确保分组逻辑与`SELECT`一致(部分MySQL版本对`GROUP BY 别名`支持不稳定)。
    
*   此写法在`type`取值固定且已知时安全有效，优化器可对实际生效的分支进行索引优化(如：`type = 'month'`时，等价于按`DATE_FORMAT(created_at, '%Y-%m')`分组)。
    
*   如果需要支持任意动态粒度，我们仍推荐使用**应用层分支**或**存储过程动态SQL**，避免运行时不确定性。
    

#### 二、表结构与数据类型优化(设计层)

1、**我们要选择合适的数据类型**  
**够用即可，避免浪费**。例如：性别用`TINYINT`或`CHAR(1)`，不用`VARCHAR(20)`；手机号用`CHAR(11)`，不用`INT`；金额用`DECIMAL(10,2)`不用`FLOAT`(避免精度丢失)；时间用`DATETIME`(需时区转换用`TIMESTAMP`)

2、**大表分区**  
**适用**：数据量大且有明显时间或范围特征的表(如：订单表)。  
**好处**：提高查询性能(只扫描相关分区)，方便管理(可快速删除旧分区)。  
**常见分区类型**：MySQL支持RANGE(按范围)、LIST(按列表)、HASH(按哈希)分区，其中RANGE分区(如：按时间分区)最常用。

3、**拆分大表**  
**垂直拆分**：我们将不常用的大字段(如：TEXT类型)拆分到单独的表。  
**水平拆分**：按用户ID、时间等维度，我们将数据分散到多个表。  
**拆分工具**：可借助Sharding-JDBC(我们推荐使用4.0+版本，支持分布式事务与动态分表)、MyCat等中间件实现水平拆分后的路由与聚合。

4、**使用枚举或字典表替代字符串状态字段**  
**例子**：订单状态用`TINYINT`(1=待支付，2=已支付…)而非`VARCHAR('paid')`，节省空间且提升JOIN/索引效率。  
**注意**：需权衡可读性，我们可通过视图或应用层映射提升可维护性。

5、**我们合理设置自增主键 vs 业务主键**  
**自增主键**(如：`BIGINT AUTO_INCREMENT`)有利于B+树索引的顺序插入，减少页分裂。  
**业务主键**(如：UUID)虽全局唯一，但随机性高，易导致索引碎片。若必须使用，我们可考虑有序UUID(如：UUIDv7)或哈希分桶。

6、**避免使用NULL，尽量设为NOT NULL**  
**原因**：NULL值在索引中需特殊处理，影响索引效率；`COUNT(col)`会忽略NULL，易引发逻辑错误。  
我们**建议**：用默认值(如：0、空字符串)替代NULL，除非语义上必须表示“未知”。

7、**我们合理使用压缩与行格式(如：InnoDB的COMPRESSED、DYNAMIC)**  
**适用**：含大字段(TEXT/BLOB)的表。  
**好处**：减少磁盘I/O和内存占用，提升缓存命中率。  
**注意**：COMPRESSED格式会增加CPU开销，需在I/O压力与CPU资源间权衡。

8、**规范命名与注释**  
虽不直接影响性能，但有助于我们团队协作、索引审查和慢SQL定位。  
我们**建议**：字段、索引、表，均添加清晰注释，命名体现业务含义(如：`idx_order_create_time`而非`idx_1`)。

9、**我们使用`TINYINT(1)`谨慎表示布尔值(尤其在MySQL)**  
虽然常用`TINYINT(1)`表示布尔，但：实际存储仍是1字节，与`BOOLEAN`(MySQL中是`TINYINT(1)`别名)无异；在MySQL中可使用`BOOLEAN`提升可读性(其本质仍是 `TINYINT(1)`)，但若考虑跨数据库兼容性，我们建议统一使用`TINYINT`并配合字段注释；**关键点**：避免用字符串`'true'/'false'`，浪费空间且无法高效索引。

10、**考虑使用生成列(Generated Columns)简化查询**  
对需频繁计算的字段(如：`full_name = CONCAT(first_name, ' ', last_name)`)，我们可建**虚拟生成列 + 索引**，避免运行时计算。

```
 ALTER TABLE users 
 ADD COLUMN full_name VARCHAR(100) 
 GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)) VIRTUAL,
 ADD INDEX idx_full_name (full_name);
```

可替代部分“函数索引”场景(尤其是在MySQL 5.7)。

11、**避免在事务中执行DDL(如：`ALTER TABLE`)**  
**问题**：我们在事务中混用DML(如：`INSERT/UPDATE`)和DDL(如：`ALTER TABLE`)：

*   **MySQL 5.7及更早版本**：DDL会隐式提交当前事务，并对表加全局元数据锁(MDL)，阻塞所有读写；
    
*   **即使MySQL 8.0+支持Online DDL**，部分操作(如：`ALGORITHM=COPY`)仍会锁表，且事务上下文会增加回滚复杂度。
    

**解决**：

*   **DDL操作应独立执行**，不在业务事务中；
    
*   我们使用变更管理工具(如：pt-online-schema-change、gh-ost)，实现无锁表结构变更；
    
*   上线前，我们通过SQL审核平台拦截“事务内DDL”。
    

**典型反例**：

```sql
 START TRANSACTION;
 INSERT INTO logs (...) VALUES (...);
 ALTER TABLE users ADD COLUMN new_flag TINYINT DEFAULT 0; -- 危险！
 COMMIT;
```

12、**合理使用分区表的“子分区”(Subpartitioning)细化数据管理**  
**适用**：已按时间范围(RANGE)分区的大表，我们需进一步按用户ID或地域等维度拆分，优化特定查询场景(如：查询2024年1月北京用户的订单)。  
**好处**：实现“双层过滤”，我们查询可同时命中范围分区和子分区，进一步减少扫描的数据量；便于按多维度归档数据(如：删除2023年1月华东地区的历史数据)。  
**示例**：我们先按时间RANGE分区，再按用户ID HASH子分区。

```sql
 CREATE TABLE orders (
   id BIGINT,
   user_id INT,
   amount DECIMAL(10,2),
   created_at DATETIME,
   region VARCHAR(20)
 )
 PARTITION BY RANGE (TO_DAYS(created_at))
 SUBPARTITION BY HASH (user_id)
 SUBPARTITIONS 4 -- 拆分为4个子分区
 (
   PARTITION p202401 VALUES LESS THAN (TO_DAYS('2024-02-01')),
   PARTITION p202402 VALUES LESS THAN (TO_DAYS('2024-03-01')),
   PARTITION p202403 VALUES LESS THAN (TO_DAYS('2024-04-01'))
 );
```

**注意**：子分区会增加表结构复杂度，我们需结合实际查询模式设计，避免过度分区导致管理成本上升。

13、**我们避免使用过长的VARCHAR字段作为JOIN条件**  
**问题**：我们用`VARCHAR(255)`等长字符串字段(如：`device_id`、`external_code`)作为JOIN条件时，会增加哈希计算开销和中间结果集大小，且索引占用空间大、查询效率低。

**解决**：

*   优先用整型ID作为JOIN条件；
    
*   若必须使用字符串，我们可对字段做哈希处理，新增`BIGINT`类型的哈希字段(如：`device_id_hash = CRC32(device_id)`)，并基于哈希字段建立索引和JOIN，同时保留原字符串字段用于精确校验。
    

```sql
 -- 新增哈希字段
 ALTER TABLE device_logs ADD COLUMN device_id_hash BIGINT GENERATED ALWAYS AS (CRC32(device_id)) VIRTUAL;
 ALTER TABLE devices ADD COLUMN device_id_hash BIGINT GENERATED ALWAYS AS (CRC32(device_id)) VIRTUAL;
 -- 基于哈希字段建立索引
 CREATE INDEX idx_device_hash ON device_logs(device_id_hash);
 CREATE INDEX idx_device_hash ON devices(device_id_hash);
 -- 优化后的JOIN查询
 SELECT l.*, d.name 
 FROM device_logs l
 JOIN devices d ON l.device_id_hash = d.device_id_hash AND l.device_id = d.device_id; -- 双重校验避免哈希冲突
```

#### 三、架构与运维层面优化(系统层)

1、**读写分离**  
主库负责写，从库负责读，提高整体吞吐量。我们需处理主从延迟带来的数据一致性问题(如：关键读请求强制走主库、使用半同步复制)。我们可通过MGR(MySQL Group Replication)、ProxySQL实现读写分离路由。

2、**结果缓存**  
适用于查询频率高但数据变化不频繁的场景。我们可使用Redis等缓存中间件，或应用层本地缓存(如：Guava Cache)。**注意**：我们需处理缓存一致性(如：更新数据后主动删除缓存)和缓存穿透/击穿/雪崩问题(穿透用空值缓存，击穿用互斥锁，雪崩用过期时间随机化)。

3、**定期分析慢查询日志**  
我们使用`pt-query-digest`、MySQL Workbench等工具分析慢查询日志。发现性能瓶颈，为优化提供数据支持。MySQL中，我们建议将`long_query_time`设为1秒(默认10秒)，并开启`log_queries_not_using_indexes`记录未走索引的查询。

4、**异步写入与批量处理**  
对于日志、埋点等高频写入场景，我们可采用：批量INSERT(如：`INSERT INTO ... VALUES (...), (...), ...`，单批次建议不超过1000条)；消息队列缓冲(Kafka → 批量入库)。减少事务开销和锁竞争。

5、**查询预计算与物化视图**  
对高频复杂聚合查询(如：每日销售额、用户活跃度)，我们可以：定时预计算结果存入汇总表(如：用cron任务执行`INSERT INTO sum_sales SELECT DATE(created_at), SUM(amount) FROM orders GROUP BY DATE(created_at)`)；使用数据库的**物化视图**(如：PostgreSQL、Oracle支持，MySQL可通过定时任务模拟)。牺牲一定实时性换取查询性能。

6、**数据归档与冷热分离**  
我们将历史数据(如：1年前订单)迁移到归档表或冷库存储(如：MySQL归档表用ARCHIVE引擎，或迁移至对象存储 + Presto查询)，可以缩小主表体积，提升查询与索引效率，降低备份成本。

7、**监控与告警体系建设**  
我们通常用Prometheus+Grafana(可视化)、Zabbix(告警)、云数据库自带监控等等，监控：慢查询数、QPS/TPS、连接数、缓冲池命中率、锁等待时间、I/O吞吐量等，实现性能问题“早发现、早干预”(如：慢查询数突增时触发短信告警)。

8、**上线前SQL审核与压测**  
我们通过SQL审计平台(如：Yearning、Archery)拦截高危语句(如：无索引的全表DELETE、大表JOIN未过滤)；对核心接口，我们要进行压力测试(工具：JMeter、Locust)，验证在高并发下的执行稳定性(如：QPS达到1000时的响应时间是否达标)。

9、**连接池配置优化**  
连接池是应用与数据库间的关键中间层，配置不当会导致连接耗尽或性能浪费。**主要参数**：

*   `max_pool_size`：最大连接数，HDD环境建议设为“CPU核心数×2 + 有效磁盘数”(如：8核CPU设为18)，SSD环境简化为“CPU核心数×2”，避免过多连接导致数据库线程切换开销。
    
*   `min_idle`：最小空闲连接数，设为`max_pool_size`的1/4~1/2，减少连接创建销毁成本。
    
*   `idle_timeout`：空闲连接超时时间，建议300秒，避免无效连接占用资源。
    

**工具推荐**：Java应用用HikariCP(性能最优)，Python应用用DBUtils，需强调避免直连数据库。

10、**冷热数据分离+读写分离组合使用**  
我们强调一下：**历史数据归档后，从库可只同步热数据**，进一步减轻从库负载，提升读性能。

11、**使用连接池的“预热”与“健康检查”**  
连接池应支持：**预热**：应用启动时预先创建部分连接，避免首请求慢；**健康检查**：定期验证连接有效性，避免使用已断开的连接(如：MySQL的`testOnBorrow`或`connectionTestQuery`)。

12、**监控“临时表/文件排序”磁盘落盘**  
`Using temporary; Using filesort`若数据量大，会写入磁盘临时文件(`tmpdir`)，I/O暴增。**优化**：我们调大`tmp_table_size`和`max_heap_table_size`(MySQL)，让临时表尽量在内存；从根本上避免`GROUP BY`/`ORDER BY`无索引。

13、**利用“读写分离+延迟从库”分层承载查询压力**  
**问题**：传统读写分离中，所有读请求均指向实时从库，当报表查询、数据导出等重量级查询并发时，会占用大量从库资源，影响业务实时查询性能。  
**解决**：构建“实时从库+延迟从库”的分层架构：**实时从库**：同步延迟控制在秒级，承载主要业务的实时读请求(如：商品详情、订单查询)；**延迟从库**：故意设置10-30分钟延迟(通过`CHANGE MASTER TO MASTER_DELAY = 600`配置)，专门承接非实时查询(如：日报表生成、历史数据导出、数据分析)。  
**好处**：隔离重量级查询对主要业务的影响，同时延迟从库可作为“时间机器”，用在快速恢复误删数据。

14、**定期清理数据库碎片(Fragmentation)**  
**问题**：我们频繁执行`DELETE`、`UPDATE`操作后，InnoDB表会产生大量碎片(未被充分利用的磁盘空间)，导致：表体积虚增，占用过多磁盘空间；索引扫描需跳过碎片页，增加I/O开销；缓存命中率下降。  
**解决**：`MySQL`，对`InnoDB`表执行`ALTER TABLE table_name ENGINE = InnoDB`(Online DDL，不锁表)或`OPTIMIZE TABLE table_name`(本质同上)；`PostgreSQL`，执行`VACUUM FULL table_name`(需锁表，建议在低峰期执行)或使用`pg_repack`插件实现无锁清理。  
**建议**：结合监控(如：MySQL的`information_schema.TABLES`中`DATA_FREE`字段)，我们对碎片率超过30%的表定期清理。

#### 四、高级索引技巧(存储引擎层)

1、**存储引擎选型**  
存储引擎选择，需匹配业务场景，它直接影响性能表现。

*   **InnoDB**：支持事务、行锁、MVCC，适合电商订单、金融交易等强一致性需求场景。
    
*   **MyISAM**：不支持事务、行锁和崩溃恢复，仅支持表级锁，历史上读性能较好，但现代InnoDB在多数场景下已超越其性能；除极少数只读、无并发、全表扫描为主的特殊场景外，新项目我们应避免使用MyISAM。
    
*   **ARCHIVE**：仅支持INSERT和SELECT，压缩比高(约1:10)，适合归档历史数据(如：1年前的日志)。
    
*   **MEMORY**：数据存于内存，读写极快但重启丢失，适合临时计算(如：会话数据、临时统计)。
    

2、**我们要合理设计联合索引顺序**  
**原则**：遵循 “最左前缀原则”，我们将过滤条件最严格(选择性高)、查询频率最高的列放在前面。  
**例子**：如果查询条件为`WHERE status = 1 AND created_at > '2024-01-01'`，联合索引我们应设为`(status, created_at)`；若同时有`ORDER BY amount DESC`，可扩展为`(status, created_at, amount DESC)`利用索引排序。  
**反例**：查询`WHERE created_at > '2024-01-01' AND status = 1`，如果索引为`(created_at, status)`，因为`created_at`是范围条件，`status`无法利用索引，不符合“最左前缀+范围条件放最后”的原则。

3、**覆盖索引**  
索引包含了查询所需的所有列，无需回表查询(即“索引覆盖查询”)，性能很高，因为查询可以仅通过索引完成，避免磁盘随机I/O。  
**示例**：查询`SELECT id, name FROM users WHERE status = 1`，如果建立联合索引`(status, id, name)`，则可通过索引直接返回结果，无需回表。

4、**函数索引**  
适用于必须在列上使用函数但又想利用索引的场景(如：`WHERE UPPER(name) = 'ZHANG SAN'`)。我们要**注意**：不同数据库支持程度不同(MySQL 8.0+支持，5.7及以下需通过生成列间接实现)，会增加写入成本(INSERT/UPDATE时需计算函数值)。函数索引仅支持确定性函数(如：UPPER()、DATE())，不支持RAND()、NOW()等非确定性函数。

```
 -- MySQL 8.0+函数索引示例
 CREATE INDEX idx_upper_name ON users (UPPER(name));
```

5、**全文索引**  
适用于需要在长文本中进行模糊查询的场景(如：文章内容搜索、商品描述匹配)，比`LIKE '%keyword%'`性能高得多(全文索引会建立词元索引，支持分词匹配)。但MySQL全文索引仅支持CHAR、VARCHAR、TEXT类型，且对中文支持较弱(我们建议结合Elasticsearch实现中文分词搜索)。

6、**索引下推(Index Condition Pushdown, ICP)**  
适用于MySQL 5.6+等支持ICP的引擎(如：InnoDB)，在存储引擎层，就过滤索引中的非前导列条件，减少回表次数(原本需回表后在服务器层过滤)。我们看**示例**：

```sql
 -- 联合索引(a, b)
 SELECT * FROM t WHERE a = 1 AND b LIKE 'abc%';
```

即使`b`不是等值条件，ICP也能在索引层过滤，避免无效回表。

7、我们要**避免过度索引**  
每个索引都会增加写入成本(INSERT/UPDATE/DELETE需维护索引)，并占用存储；过多索引还会导致优化器选择困难，可能选错索引。我们**建议**：

*   删除长期未使用的索引(可通过`sys.schema_unused_indexes`或慢日志分析，如：MySQL中查询`SELECT * FROM sys.schema_unused_indexes`)。
    
*   合并功能重叠的索引(如：已存在`(a,b)`联合索引，可删除单独的`(a)`索引)。
    

8、**前缀索引的合理使用**  
对长字符串字段(如：URL、邮箱)，我们可建前缀索引减少索引占用空间：

```
 CREATE INDEX idx_email ON users(email(20)); -- 取邮箱前20个字符建索引
```

**注意**：需评估前缀长度是否足够保证区分度(我们可通过`SELECT COUNT(DISTINCT LEFT(email, n)) / COUNT(*) FROM users`计算，结果接近1则区分度合格)，否则可能引发重复扫描，反而降低性能。

9、**利用降序索引(Descending Index)**  
适用于需按时间倒序查询(如：获取最新10条订单)或多列排序场景。MySQL 5.7支持降序索引，但仅在`ORDER BY`与索引顺序完全一致时生效，且不支持联合索引中部分列降序；MySQL 8.0解除此限制，可在联合索引中混合升序/降序列(如：`(status ASC, created_at DESC)`)。我们看**示例**：

```sql
 CREATE INDEX idx_created_desc ON orders(created_at DESC);
 SELECT * FROM orders ORDER BY created_at DESC LIMIT 10; -- 直接利用索引排序，避免filesort
```

避免`ORDER BY ... DESC`触发文件排序(filesort)，减少CPU与内存消耗。

10、**考虑索引的“选择性”(Cardinality)**  
我们优先为高区分度字段建索引(如：user\_id、order\_no，几乎每行值唯一)，避免为低区分度字段单独建索引(如：gender、status，值仅2-3种)。我们可通过`SHOW INDEX FROM table`查看`Cardinality`值(值越接近表总行数，区分度越高)；若`Cardinality`过低，索引过滤效果差，可能被优化器忽略。

11、**多列索引 vs 多个单列索引**  
**误区**：我们认为“建多个单列索引，查询时会自动组合使用”。  
**事实**：大多数数据库(除PostgreSQL的Bitmap Index Scan)无法高效合并多个单列索引，通常仅选择其中一个过滤效果最好的索引，其余索引失效。  
**建议**：我们应根据实际查询模式设计联合索引(如：频繁执行`WHERE a=? AND b=?`，则建`(a,b)`联合索引)，而非堆砌单列索引。

12、**利用“索引合并”(Index Merge)的局限性认知**  
MySQL的`index_merge`(如：`Using union(idx1,idx2)`)**通常性能不如联合索引**，因为需多次扫描+合并。看到执行计划中出现`index_merge`，我们应优先考虑，是否可建联合索引替代？

13、**对时间字段使用“时间分区+分区裁剪”**  
查询需包含分区键条件，否则无法触发 “分区裁剪”(Partition Pruning)，会导致扫描所有分区，反而降低性能。

```sql
 -- 若按created_at RANGE分区，但查询未带created_at条件，则全分区扫描
 SELECT * FROM orders WHERE user_id = 123; -- 无法裁剪
 SELECT * FROM orders WHERE user_id = 123 AND created_at > '2024-01-01'; -- 可裁剪
```

14、**利用“部分索引”(Partial Index/Filtered Index)优化特定场景**  
适用于仅需对表中部分数据(满足特定条件的行)建立索引的场景(如：仅查询未删除的订单、仅统计活跃用户数据)，常见于PostgreSQL、SQL Server。可大幅减少索引体积，降低写入时的索引维护成本，提升查询效率。我们看**示例**：  
**PostgreSQL**：为未删除的订单建立索引

```
 CREATE INDEX idx_active_orders ON orders (user_id, created_at)
 WHERE is_deleted = FALSE; -- 仅对未删除的行建索引
```

**MySQL**：通过生成列模拟部分索引

```
 -- 添加虚拟生成列，仅当is_deleted=0时值为1，否则为NULL
 ALTER TABLE orders 
 ADD COLUMN is_active TINYINT 
 GENERATED ALWAYS AS (IF(is_deleted = 0, 1, NULL)) VIRTUAL;
 
 -- 在生成列上建立索引(MySQL索引默认不包含NULL值)
 CREATE INDEX idx_active_orders ON orders (is_active, user_id, created_at);
```

我们**注意**：(1)查询时必须包含生成列条件才能触发部分索引；(2)生成列定义中的条件应与查询条件一致；(3)适用于MySQL 5.7+(支持虚拟列)。

**查询示例**：

```sql
-- 正确：查询未删除订单，触发部分索引
SELECT * FROM orders 
WHERE is_active = 1  -- 与生成列逻辑一致(1=未删除)
  AND user_id = 1001
  AND created_at > '2024-01-01';

-- 错误示例：条件与生成列逻辑冲突，无法使用索引
SELECT * FROM orders 
WHERE is_active = 0  -- 生成列中无0值，索引失效
  AND user_id = 1001;
```

15、**理解并利用“InnoDB自适应哈希索引(AHI)”**  
适用于：MySQL InnoDB引擎，存在大量等值查询(如：`WHERE id = ?`、`WHERE user_id = ?`)的场景。`InnoDB`会自动监控索引的查询频率，对被频繁访问的索引页，在内存中构建哈希表，将B+树的随机I/O转化为哈希表的快速查找，提升等值查询性能。**优化建议**：

*   开启AHI(`innodb_adaptive_hash_index = ON`，默认开启)，无需我们手动创建；
    
*   AHI对范围查询(如：`>`,`<`,`BETWEEN`)无效，此类场景仍需依赖B+树索引；
    
*   如果数据库以范围查询为主，我们可关闭AHI节省内存(`innodb_adaptive_hash_index = OFF`)。
    

#### 五、统计信息与执行计划管理(优化器层)

1、**保持统计信息准确**  
**问题**：优化器依赖表和索引的统计信息(如：行数、值分布、数据密度)生成执行计划；若统计信息过期(如：大表批量插入后未更新统计)，可能导致优化器选错路径(如：本该走索引却全表扫描)。  
**解决**：**MySQL**：我们要定期执行`ANALYZE TABLE table_name`(`InnoDB`表执行时不锁表，仅更新统计信息)；开启`innodb_stats_auto_recalc=ON`(默认开启)，让数据库自动更新统计信息。**PostgreSQL**：运行`ANALYZE table_name`或`ANALYZE`(更新所有表统计)。**Oracle/SQL Server**：启用自动统计信息更新(如：Oracle的`AUTO_STATS_ADVISOR_TASK`)，或我们手动执行`DBMS_STATS.GATHER_TABLE_STATS`。

2、**防止执行计划突变(Plan Regression)**  
**问题**：数据量增长、表结构变更或参数调整后，同一SQL的执行计划可能突然劣化(如：昨天走索引，今天全表扫描)。  
**解决**：**Oracle**：我们使用SQL Plan Baseline锁定高效执行计划，仅允许已验证的计划执行；或通过SQL Profile强制优化器选择指定路径。**MySQL** 8.0+：企业版支持“Plan Stability”功能固化执行计划；社区版可通过`USE INDEX`临时指定索引，或结合存储过程监控执行计划变化。**PostgreSQL**：我们使用`pg_hint_plan`插件添加查询提示，或调整`plan_cache_mode`参数避免“参数嗅探”导致的计划偏差。

3、**合理使用查询提示(Hints)**  
适用于：当优化器因统计信息不准、数据分布特殊而选错索引时，我们可临时用Hint强制指定执行路径。**常见Hint示例**：

*   MySQL：`SELECT /*+ USE INDEX(idx_user_id) */ * FROM users WHERE user_id=123;`(强制使用idx\_user\_id索引)。
    
*   Oracle：`SELECT /*+ INDEX(users idx_user_id) */ * FROM users WHERE user_id=123;`。
    

**注意**：Hint应作为临时解决方案，避免长期依赖。若需频繁用Hint，我们需优先排查统计信息准确性或索引设计问题，而非依赖Hint“掩盖”根本问题。

4、**理解参数化查询与执行计划缓存**  
**问题**：参数嗅探(Parameter Sniffing)，同一参数化SQL(如：`SELECT * FROM orders WHERE user_id=?`)，因传入参数不同(如：高活跃用户 vs 低活跃用户)，最优执行计划可能不同；若数据库缓存了某一参数的计划并复用，可能导致其他参数查询性能劣化。  
**优化**：对数据分布差异大的场景，拆分为多个SQL(如：高活跃用户单独查询、普通用户单独查询)，避免参数复用；部分数据库支持自适应执行计划(如：SQL Server 的 Adaptive Query Processing、MySQL 8.0 的 Adaptive Hash Index)，我们可根据实际参数，动态调整计划。

5、**定期审查执行计划变化**  
对主要业务SQL(如：订单支付、商品查询)，我们建立执行计划快照(如：每周执行`EXPLAIN ANALYZE`并保存结果)，通过工具(如：`pt-upgrade`、自研平台)对比历史计划。主要看是否出现“全表扫描替代索引扫描”、“Using filesort/Using temporary 新增”、“JOIN顺序变更导致中间结果集增大”等问题。我们要在性能退化前，发现执行路径劣化，及时干预(如：更新统计信息、调整索引)。

6、我们要**理解优化器成本模型**  
优化器是通过“成本模型”选择执行计划的(如：走索引的成本更低，还是全表扫描成本更低)，其主要参数决定成本计算逻辑：

**MySQL**：

*   `innodb_stats_persistent`：是否持久化统计信息(我们建议开启，避免重启后统计丢失)。
    
*   `optimizer_switch`：控制优化器特性(如：`index_merge=on`允许索引合并，`ICP=on`启用索引下推)。
    

**PostgreSQL**：

*   `random_page_cost`：随机读取一页的成本(SSD环境，我们建议设为1-2，HDD设为4，默认4)。
    
*   `seq_page_cost`：顺序读取一页的成本(默认1，我们无需频繁调整)。
    
*   `effective_cache_size`：优化器预估的可用缓存大小(我们建议设为服务器内存的50%-70%)。
    

我们应该根据硬件特性(SSD vs HDD)、内存大小调整成本参数，引导优化器，选择更贴合实际环境的执行计划(如：SSD环境降低`random_page_cost`，让优化器更倾向于选择索引扫描)。

7、**我们要避免“过度优化”同一SQL**  
为追求“极致性能”，我们使用复杂嵌套子查询、多层Hint或自定义执行逻辑，绕过优化器自动选择。这样会牺牲SQL可读性与可维护性，当数据分布、表结构变化后，手动优化的逻辑可能失效，反而导致性能暴跌。所以我们**建议**：优先通过“规范SQL写法、合理设计索引、保证统计信息准确”让优化器“自然选对”执行计划；仅在核心SQL且优化器确实无法满足需求时，我们再考虑有限度的手动干预。

8、**监控“执行计划缓存命中率”**  
数据库会对执行计划进行缓存（例如：SQL Server的Plan Cache、Oracle的Shared Pool），以此提升查询执行效率。  
**高频问题**：当系统中存在大量“一次性SQL”（如：通过字符串拼接生成的SQL而非参数化查询）时，会导致缓存被无效计划污染，不仅占用缓存空间，还会引发执行计划频繁重编译，显著降低数据库性能。  
**解决措施**：我们通过强制使用**参数化查询**，保证相似逻辑的SQL语句，能够复用同一执行计划，减少计划编译开销，从而有效提升执行计划缓存的命中率和复用率。

9、**我们要警惕“直方图缺失”导致的选择性误判(PostgreSQL/SQL Server)**  
对于数据分布极度不均的列(如：99% status=1，1% status=2)，普通统计信息(仅平均分布假设)会误导优化器。我们应该这样**解决**：

*   PostgreSQL：创建**直方图统计**(`CREATE STATISTICS ... (dependencies, ndistinct)`或`ALTER TABLE ... ALTER COLUMN ... SET STATISTICS`)；
    
*   SQL Server：创建**Filtered Statistics** 或 **Filtered Index**。
    

10、**针对大表批量更新后，我们要强制刷新统计信息**  
**问题**：对大表执行`UPDATE ... SET col = value WHERE ...`等批量操作后，即使我们开启了自动统计更新，数据库也可能因“变化量未达阈值”而不刷新统计信息，导致优化器基于旧数据生成低效计划。  
**解决**：批量操作后，我们主动执行统计信息更新命令，保证优化器获取最新数据分布。

*   **MySQL**：`ANALYZE TABLE table_name;`(轻量，不锁表)
    
*   **PostgreSQL**：`ANALYZE VERBOSE table_name;`(可查看更新详情)
    
*   **Oracle**：`EXEC DBMS_STATS.GATHER_TABLE_STATS(ownname => 'SCHEMA_NAME', tabname => 'TABLE_NAME', estimate_percent => 100);`
    
*   **示例**：批量更新100万行订单状态后，刷新统计
    

```sql
 -- 批量更新
 UPDATE orders SET status = 'completed' WHERE created_at < '2024-01-01';
 COMMIT;
 -- 强制刷新统计信息
 ANALYZE TABLE orders;
```

11、**我们利用“执行计划绑定”固化主要SQL的执行路径(MySQL 8.0+)**  
**问题**：MySQL社区版无Plan Stability功能，主要SQL可能因数据变化，导致执行计划突变，而`USE INDEX`等Hint侵入性强、维护成本高。  
**解决**：我们使用MySQL 8.0+企业版，支持“执行计划绑定”功能，将高效执行计划与SQL绑定，避免计划劣化。

```sql
 -- 1、生成目标SQL的指纹(我们需先开启performance_schema)
 SELECT DIGEST, DIGEST_TEXT FROM performance_schema.events_statements_summary_by_digest WHERE DIGEST_TEXT LIKE 'SELECT * FROM orders WHERE user_id = ? AND created_at > ?%';
 -- 2、绑定执行计划(假设DIGEST为'abc123...')
 CREATE SQL PLAN BASELINE FOR DIGEST 'abc123...' USING HISTORY;
 -- 3、验证绑定(我们查看是否使用绑定的计划)
 SELECT * FROM performance_schema.sql_plan_baselines WHERE DIGEST = 'abc123...';
```

**好处**：非侵入式固化执行计划，无需修改应用SQL；支持手动演进计划，当数据分布变化后，我们可更新绑定的计划。