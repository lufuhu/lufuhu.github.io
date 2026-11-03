---
title: SQL实战场景必背50条语句，从单表查询到事务控制的避坑示例
lastUpdated: 2026-09-18 04:00:00
---


我们日常做数据查询、更新或者统计时，有没有卡过壳？比如：想查特定用户订单，却不知道怎么关联表？批量删数据怕锁表；写个统计SQL，还总出NULL值……别慌！下面这50个SQL实战场景都是我们干活时常用的，从单表查询到多表联查，从插入更新到事务控制，一步步带我们避坑，新手也能跟着用！

##### 1、单表基础查询

**需求**：我们从`user`表中查询所有用户的ID、姓名、手机号，且只显示前10条数据。

**SQL实现**：

```sql
-- 查询指定字段，限制返回条数（MySQL用LIMIT，Oracle用ROWNUM，SQL Server用TOP）
SELECT user_id, user_name, phone 
FROM `user`  -- 表名若为关键字，需用反引号包裹
LIMIT 10;    -- 生产中我们要避免直接SELECT *，减少无效数据传输
```

**解析**：指定字段查询是基础操作，`LIMIT`用于控制结果集大小，防止全表扫描导致性能问题。  
**避坑**：表名/字段名若与SQL关键字（如：`order`、`user`）重复，需用反引号（MySQL）、双引号（Oracle）或方括号（SQL Server）包裹。  
**优化**：优先查询所需字段，而非`SELECT *`，降低IO开销。

##### 2、带条件的单表查询

**需求**：我们从`user`表中查询2023年注册、状态为“正常”的用户姓名和注册时间。

**SQL实现**：

```sql
-- 多条件筛选（AND连接），日期范围查询
SELECT user_name, register_time 
FROM `user` 
WHERE status = 'normal'  -- 字符型条件需加单引号
  AND register_time BETWEEN '2023-01-01 00:00:00' AND '2023-12-31 23:59:59';  -- 闭区间日期查询
```

**解析**：`WHERE`用于筛选数据，`BETWEEN`适合连续范围查询，比`>=`和`<=`简洁。  
**避坑**：日期字段若只写`'2023-01-01'`，默认时间为`00:00:00`，可能漏查当天后期数据；字符型值必须加单引号，否则会被当作字段名。  
**优化**：我们在`status`和`register_time`上建立联合索引，提升条件筛选速度。

##### 3、单表排序查询

**需求**：我们从`order`表中查询用户ID为1001的订单，按下单时间倒序、订单金额正序排列。

**SQL实现**：

```sql
-- 多字段排序（DESC降序，ASC升序，默认ASC）
SELECT order_id, order_amount, create_time 
FROM `order` 
WHERE user_id = 1001 
ORDER BY create_time DESC, order_amount ASC;
```

**解析**：`ORDER BY`指定排序字段，优先级按字段顺序排列（先按`create_time`降序，同时间再按`order_amount`升序）。  
**避坑**：排序字段若为`NULL`，MySQL中`NULL`默认排在最前（降序时排最后），我们需提前确认业务对`NULL`的排序要求。  
**优化**：建立`(user_id, create_time DESC, order_amount ASC)`的联合索引，避免排序时的“文件排序”（Filesort）。

##### 4、单表去重查询

**需求**：我们从`order`表中查询所有下单用户的去重ID（即有过下单行为的用户）。

**SQL实现**：

```sql
-- DISTINCT去重，作用于所有查询字段的组合
SELECT DISTINCT user_id 
FROM `order`;
```

**解析**：`DISTINCT`用于去除查询结果中的重复行，若查询多个字段，会对字段组合去重（而非单个字段）。  
**避坑**：`DISTINCT`与`LIMIT`连用时，先去重再限制条数，我们需确认业务逻辑是否允许。  
**优化**：若仅需统计去重数量，用`COUNT(DISTINCT user_id)`更高效；若数据量极大，我们可考虑用`GROUP BY user_id`替代（部分场景性能更优）。

##### 5、单表聚合查询（COUNT）

**需求**：统计`user`表中状态为“正常”且注册时间在2023年的用户总数。

**SQL实现**：

```sql
-- COUNT统计非NULL值数量，COUNT(*)统计所有行数（包括NULL）
SELECT COUNT(user_id) AS normal_user_count  -- AS起别名，方便结果读取
FROM `user` 
WHERE status = 'normal' 
  AND YEAR(register_time) = 2023;
```

**解析**：`COUNT(column)`统计指定字段非`NULL`的行数，`COUNT(*)`统计所有行数（无论字段是否为`NULL`）；`YEAR()`函数提取日期中的年份。  
**避坑**：避免用`COUNT(1)`替代`COUNT(*)`（性能无差异），更不要用`COUNT(字符串)`（会将字符串转为0统计，逻辑错误）。  
**优化**：若`register_time`有索引，`register_time BETWEEN '2023-01-01' AND '2023-12-31'`比`YEAR(register_time)=2023`更高效（可命中索引，避免函数对字段的“包装”）。

##### 6、单表聚合查询（SUM/AVG）

**需求**：统计`order`表中2024年1月的总订单金额、平均订单金额，以及订单总数。

**SQL实现**：

```sql
-- 多聚合函数联用，同时计算总和、平均值、计数
SELECT SUM(order_amount) AS total_amount,  -- 总和
       AVG(order_amount) AS avg_amount,    -- 平均值
       COUNT(order_id) AS order_count      -- 订单数
FROM `order` 
WHERE create_time BETWEEN '2024-01-01 00:00:00' AND '2024-01-31 23:59:59';
```

**解析**：`SUM`计算数值字段总和，`AVG`计算平均值，聚合函数会自动忽略`NULL`值。  
**避坑**：若`order_amount`存在`NULL`，`SUM`和`AVG`会跳过`NULL`（相当于不参与计算），我们需确认业务是否允许`NULL`（我们建议表设计时设置默认值0）。  
**优化**：在`create_time`和`order_amount`上建立联合索引，减少聚合时的表扫描。

##### 7、单表分组查询（GROUP BY）

**需求**：统计`order`表中每个用户的订单总数和总消费金额，只显示订单数>=2的用户。

**SQL实现**：

```sql
-- GROUP BY分组，HAVING过滤分组结果（区别于WHERE过滤行）
SELECT user_id, 
       COUNT(order_id) AS order_count, 
       SUM(order_amount) AS total_spend
FROM `order` 
GROUP BY user_id  -- 分组字段必须出现在SELECT中（非聚合字段）
HAVING order_count >= 2;  -- HAVING用于过滤分组后的结果
```

**解析**：`GROUP BY`按指定字段分组，对每组进行聚合计算；`HAVING`用于过滤分组结果（`WHERE`过滤原始数据，`HAVING`过滤分组后的数据）。  
**避坑**：`SELECT`中的非聚合字段必须全部出现在`GROUP BY`中（MySQL的`ONLY_FULL_GROUP_BY`模式下强制要求，避免逻辑歧义）。  
**优化**：建立`(user_id, order_amount)`的联合索引，实现“索引覆盖”（无需回表查询数据）。

##### 8、两表内连接查询（INNER JOIN）

**需求**：查询用户ID为1001的订单详情，需包含用户姓名和订单信息。

**SQL实现**：

```sql
-- INNER JOIN：只返回两表中匹配条件的行（交集）
SELECT u.user_id, u.user_name, o.order_id, o.order_amount
FROM `user` u  -- u是user表的别名，简化代码
INNER JOIN `order` o  -- o是order表的别名
  ON u.user_id = o.user_id  -- 连接条件（必须写，否则会产生笛卡尔积）
WHERE u.user_id = 1001;
```

**解析**：`INNER JOIN`（可简写为`JOIN`）只返回两表中满足连接条件的行，是常用的连接方式。  
**避坑**：如果我们忘记写`ON`条件会导致“笛卡尔积”（两表行数相乘，数据量暴增，严重影响性能）。  
**优化**：确保连接字段`user_id`在两表中均有索引（`user`表的主键索引，`order`表的外键索引）。

##### 9、两表左连接查询（LEFT JOIN）

**需求**：查询所有用户的姓名及对应的订单数（包括没有下单的用户，订单数显示0）。

**SQL实现**：

```sql
-- LEFT JOIN：返回左表所有行，右表匹配则显示，不匹配则显示NULL
SELECT u.user_id, u.user_name, 
       COUNT(o.order_id) AS order_count  -- 右表NULL时COUNT为0
FROM `user` u
LEFT JOIN `order` o
  ON u.user_id = o.user_id
GROUP BY u.user_id, u.user_name;  -- 左表字段分组
```

**解析**：`LEFT JOIN`以左表（`user`）为基准，右表（`order`）无匹配时返回`NULL`；`COUNT(o.order_id)`中，`NULL`会被忽略，因此无订单用户的计数为0。  
**避坑**：若在`WHERE`中添加右表的条件（如：`o.status='paid'`），会将左连接转为内连接（过滤掉右表`NULL`的行），我们需将右表条件移至`ON`中。  
**优化**：右表连接字段`user_id`建立索引，减少连接时的匹配时间。

##### 10、两表右连接查询（RIGHT JOIN）

**需求**：查询所有订单的信息及对应的用户姓名（包括用户已删除但未清理的订单，用户姓名显示NULL）。

**SQL实现**：

```sql
-- RIGHT JOIN：返回右表所有行，左表匹配则显示，不匹配则显示NULL
SELECT o.order_id, o.order_amount, u.user_name
FROM `user` u
RIGHT JOIN `order` o
  ON u.user_id = o.user_id;
```

**解析**：`RIGHT JOIN`以右表（`order`）为基准，左表（`user`）无匹配时返回`NULL`，适合需保留右表所有数据的场景。  
**避坑**：右连接逻辑可转换为左连接（交换表顺序），我们建议优先用左连接（更符合“基准表在前”的直观逻辑）。  
**优化**：同左连接，我们需确保连接字段有索引。

##### 11、多表连接查询

**需求**：查询用户1001的订单详情，包含用户姓名、商品名称、订单金额（涉及`user`、`order`、`order_item`、`product`4张表）。

**SQL实现**：

```sql
-- 多表连接（先连user和order，再连order_item和product）
SELECT u.user_name, p.product_name, o.order_amount, oi.quantity
FROM `user` u
INNER JOIN `order` o ON u.user_id = o.user_id
INNER JOIN `order_item` oi ON o.order_id = oi.order_id  -- 订单明细表
INNER JOIN `product` p ON oi.product_id = p.product_id  -- 商品表
WHERE u.user_id = 1001;
```

**解析**：多表连接需依次指定连接关系，通常按“主表→从表”的顺序（如：`user`→`order`→`order_item`→`product`）。  
**避坑**：多表连接时别名必须唯一，避免字段名冲突（如：两表都有`create_time`，需用`u.create_time`区分）。  
**优化**：所有连接字段（`user_id`、`order_id`、`product_id`）均建立索引，减少多表匹配的开销。

##### 12、子查询（WHERE子句中）

**需求**：查询购买过“iPhone 14”的用户姓名（先查商品ID，再查订单，最后查用户）。

**SQL实现**：

```sql
-- 子查询：WHERE中嵌套查询（返回单值或单列多值）
SELECT user_name
FROM `user`
WHERE user_id IN (  -- IN匹配子查询返回的多值
    SELECT user_id
    FROM `order`
    WHERE order_id IN (
        SELECT order_id
        FROM `order_item`
        WHERE product_id = (  -- =匹配子查询返回的单值
            SELECT product_id
            FROM `product`
            WHERE product_name = 'iPhone 14'
        )
    )
);
```

**解析**：子查询按层级嵌套，内层查询结果作为外层查询的条件；`=`要求子查询返回单值，`IN`允许返回多值。  
**避坑**：若内层`product_name = 'iPhone 14'`返回多个`product_id`，用`=`会报错，需改为`IN`；多层子查询性能较差，数据量大时慎用。  
**优化**：我们将子查询改为多表连接（如：前一条语句），性能通常更优。

##### 13、子查询（FROM子句中，派生表）

**需求**：统计每个用户的平均订单金额，并显示平均金额前5的用户ID和平均金额。

**SQL实现**：

```sql
-- 派生表：FROM中嵌套查询（将子查询结果作为临时表）
SELECT user_id, avg_amount
FROM (
    -- 内层查询：计算每个用户的平均订单金额
    SELECT user_id, AVG(order_amount) AS avg_amount
    FROM `order`
    GROUP BY user_id
) AS user_avg_order  -- 派生表必须起别名
ORDER BY avg_amount DESC
LIMIT 5;
```

**解析**：`FROM`中的子查询称为“派生表”，需用`AS`起别名，外层查询对派生表进行排序和限制。  
**避坑**：派生表必须有别名，否则SQL语法报错；内层聚合后的字段名需明确（如：`AS avg_amount`）。  
**优化**：若派生表数据量大，我们可考虑用临时表（`CREATE TEMPORARY TABLE`）缓存结果，避免重复计算。

##### 14、EXISTS子查询（判断存在性）

**需求**：查询存在“未支付”订单的用户姓名（只要有1条未支付订单即返回）。

**SQL实现**：

```sql
-- EXISTS：判断子查询是否有结果（有则返回TRUE，无则FALSE）
SELECT user_name
FROM `user` u
WHERE EXISTS (
    SELECT 1  -- 子查询中SELECT的内容不影响结果，用1比*更高效
    FROM `order` o
    WHERE o.user_id = u.user_id
      AND o.status = 'unpaid'
);
```

**解析**：`EXISTS`只关注子查询是否有返回行，不关心具体内容，因此内层用`SELECT 1`即可（避免`SELECT *`的无效字段读取）。  
**避坑**：`EXISTS`与`IN`的区别：当子查询结果集大时，`EXISTS`性能更优（短路判断，找到1条匹配即停止）；当结果集小时，`IN`更简洁。  
**优化**：子查询中`o.user_id`和`o.status`建立联合索引，提升匹配速度。

##### 15、INSERT基础插入

**需求**：我们向`user`表中插入一条新用户数据（ID、姓名、手机号、注册时间、状态）。

**SQL实现**：

```sql
-- 插入指定字段的数据（字段顺序需与值顺序一致）
INSERT INTO `user` (user_id, user_name, phone, register_time, status)
VALUES (10086, '张三', '13800138000', NOW(), 'normal');  -- NOW()获取当前时间
```

**解析**：`INSERT INTO`指定表和字段，`VALUES`指定对应的值；`NOW()`函数返回当前datetime（如：`2024-05-20 14:30:00`）。  
**避坑**：若字段设置了`NOT NULL`且无默认值，必须插入值；自增主键（如：`user_id`设为AUTO\_INCREMENT）无需手动插入，可省略字段或写`NULL`。  
**优化**：批量插入时用`INSERT INTO ... VALUES (...), (...), (...)`（一次插入多条，减少IO交互）。

##### 16、批量INSERT插入

**需求**：我们向`user`表中批量插入3条新用户数据。

**SQL实现**：

```sql
-- 批量插入（多条记录用逗号分隔）
INSERT INTO `user` (user_name, phone, register_time, status)
VALUES ('李四', '13900139000', NOW(), 'normal'),
       ('王五', '13700137000', NOW(), 'normal'),
       ('赵六', '13600136000', NOW(), 'normal');  -- 最后一条记录后无逗号
```

**解析**：批量插入通过一次SQL请求插入多条记录，大幅减少与数据库的网络交互次数。  
**避坑**：单条INSERT语句的长度有限制（受数据库参数`max_allowed_packet`控制），批量插入条数需根据单条记录大小调整（建议单次不超过1000条）。  
**优化**：关闭自动提交（`SET autocommit = 0`），插入后手动提交（`COMMIT`），减少事务提交开销；若插入数据来自另一张表，用`INSERT INTO ... SELECT`更高效。

##### 17、INSERT ... SELECT插入（从表查询插入）

**需求**：我们将`user`表中2023年注册的“正常”用户，复制到`user_backup`备份表中。

**SQL实现**：

```sql
-- 从查询结果中插入数据（无需写VALUES）
INSERT INTO user_backup (user_id, user_name, phone, register_time, status)
SELECT user_id, user_name, phone, register_time, status
FROM `user`
WHERE status = 'normal'
  AND register_time BETWEEN '2023-01-01' AND '2023-12-31';
```

**解析**：`INSERT ... SELECT`直接将查询结果插入目标表，适用于数据迁移、备份场景，避免中间数据落地。  
**避坑**：目标表`user_backup`的字段类型、长度必须与查询结果匹配，否则会报类型转换错误；若目标表有自增主键且无需插入，我们需忽略该字段。  
**优化**：若目标表为空，我们可先禁用索引（`ALTER TABLE user_backup DISABLE KEYS`），插入后启用（`ENABLE KEYS`），加速索引构建。

##### 18、UPDATE单字段更新

**需求**：我们将`user`表中用户ID为10086的手机号更新为“1380013800\*”。

**SQL实现**：

```sql
-- 更新单字段，WHERE指定条件（必写，否则全表更新）
UPDATE `user`
SET phone = '1380013800*'  -- 字段=新值
WHERE user_id = 10086;     -- 精确匹配条件，避免误更新
```

**解析**：`UPDATE`用于修改表数据，`SET`指定更新的字段和值，`WHERE`在C位（控制更新范围）。  
**避坑**：**绝对禁止无WHERE条件的UPDATE**，会导致全表数据被修改；更新前我们建议先执行SELECT验证条件（`SELECT * FROM user WHERE user_id=10086`）。  
**优化**：WHERE条件中的字段（`user_id`）需有索引，避免全表扫描；若更新频繁，我们应考虑批量更新而非单条更新。

##### 19、UPDATE多字段更新

**需求**：将`order`表中订单ID为2024001的状态改为“已支付”，支付时间设为当前时间。

**SQL实现**：

```sql
-- 更新多字段，用逗号分隔
UPDATE `order`
SET status = 'paid',
    pay_time = NOW()  -- 多字段更新，最后一个字段后无逗号
WHERE order_id = 2024001;
```

**解析**：多字段更新时，`SET`后用逗号分隔多个“字段=值”对，逻辑上同时更新（原子操作）。  
**避坑**：更新时若涉及计算（如：`amount = amount + 10`），我们需确认字段类型为数值型，避免字符串拼接错误；复杂更新建议开启事务（`BEGIN; UPDATE ...; COMMIT;`），出错可回滚。  
**优化**：若更新大量数据（如：万级以上），分批次更新（用`LIMIT`控制每次更新条数），避免长时间锁表。

##### 20、UPDATE关联更新（多表关联更新）

**需求**：我们将`order`表中“张三”（user\_name）的所有订单状态改为“已取消”（通过user表关联）。

**SQL实现**：

```sql
-- 多表关联更新（MySQL语法）
UPDATE `order` o
INNER JOIN `user` u ON o.user_id = u.user_id
SET o.status = 'cancelled'
WHERE u.user_name = '张三';
```

**解析**：关联更新通过JOIN将多表关联，根据关联表的条件更新目标表字段，适用于需跨表判断的场景。  
**避坑**：不同数据库关联更新语法不同（Oracle用`UPDATE ... SET ... WHERE EXISTS`，SQL Server用`UPDATE ... FROM ... JOIN`），需适配数据库类型；更新前用SELECT验证关联结果（`SELECT o.order_id FROM order o JOIN user u ON o.user_id=u.user_id WHERE u.user_name='张三'`）。  
**优化**：关联字段（`o.user_id`、`u.user_id`）必须有索引，减少关联开销。

##### 21、DELETE单条删除

**需求**：删除`user`表中用户ID为10086的记录。

**SQL实现**：

```sql
-- 删除单条记录，WHERE精确匹配
DELETE FROM `user`
WHERE user_id = 10086;
```

**解析**：`DELETE`用于删除表记录，`WHERE`指定删除条件，无条件则删除全表数据。  
**避坑**：**禁止无WHERE条件的DELETE**，误删后恢复难度大；生产环境我们建议用“逻辑删除”替代物理删除（如：增加`is_deleted`字段，更新为1表示删除）。  
**优化**：WHERE条件字段需有索引；若删除大量数据，用`TRUNCATE`（无法回滚，不写日志）更高效，但`TRUNCATE`会重置自增主键。

##### 22、DELETE批量删除

**需求**：删除`order`表中2022年之前的“已取消”订单。

**SQL实现**：

```sql
-- 批量删除符合条件的记录
DELETE FROM `order`
WHERE status = 'cancelled'
  AND create_time < '2022-01-01 00:00:00';
```

**解析**：批量删除通过WHERE条件筛选大量过期或无效数据，释放存储空间。  
**避坑**：批量删除会产生大量事务日志，可能导致日志文件暴涨；删除过程中会锁表，影响线上业务，我们建议在低峰期执行。  
**优化**：分批次删除（如：`WHERE ... AND order_id < 10000 LIMIT 1000`），每次删除少量数据，避免长时间锁表；删除后执行`OPTIMIZE TABLE` \`order\`优化表空间。

##### 23、DELETE关联删除（多表关联删除）

**需求**：删除`user`表中“李四”的所有订单（通过user表关联删除order表记录）。

**SQL实现**：

```sql
-- 多表关联删除（MySQL语法）
DELETE o  -- 指定要删除的表别名（只删order表，不删user表）
FROM `order` o
INNER JOIN `user` u ON o.user_id = u.user_id
WHERE u.user_name = '李四';
```

**解析**：关联删除需明确指定要删除的表（如：`DELETE o`表示删除order表记录），避免误删关联表数据。  
**避坑**：若写成`DELETE FROM o`会报错，必须按“`DELETE 表别名`”格式；删除前我们务必要验证关联结果，确认待删除记录正确。  
**优化**：同关联更新，确保关联字段有索引；若需删除用户及关联订单，我们可在表设计时设置外键级联删除（`ON DELETE CASCADE`），但需谨慎使用（可能导致连锁删除）。

##### 24、TRUNCATE清空表

**需求**：清空`user_test`测试表的所有数据，重置自增主键。

**SQL实现**：

```
-- 清空表数据，重置自增主键，不写事务日志
TRUNCATE TABLE user_test;
```

**解析**：`TRUNCATE`是DDL语句，用于快速清空表，比`DELETE FROM user_test`更高效（不逐行删除，不记录日志）。  
**避坑**：`TRUNCATE`无法回滚（DDL语句执行后立即提交），且会删除表的所有数据（包括自增主键序列）；不能用于有外键关联的表（需先删除外键或关联数据）。  
**优化**：仅用于测试表、临时表等非核心数据的清空，核心业务表建议用逻辑删除。

##### 25、条件判断函数（CASE WHEN）

**需求**：我们查询`user`表用户信息，将status字段转换为中文描述（normal→正常，frozen→冻结，deleted→已删除）。

**SQL实现**：

```sql
-- CASE WHEN实现条件判断，类似程序中的if-else
SELECT user_id,
       user_name,
       CASE status
           WHEN 'normal' THEN '正常'
           WHEN 'frozen' THEN '冻结'
           WHEN 'deleted' THEN '已删除'
           ELSE '未知状态'  -- 默认值，处理未匹配情况
       END AS status_cn  -- 别名显示中文状态
FROM `user`;
```

**解析**：`CASE WHEN`有两种用法：1、等值判断（`CASE 字段 WHEN 值1 THEN 结果1 ...`）；2、复杂条件（`CASE WHEN 条件1 THEN 结果1 ...`）。  
**避坑**：务必添加`ELSE`分支，避免未匹配时返回`NULL`；`CASE WHEN`的结果类型需统一（如：避免部分返回字符串，部分返回数值）。  
**优化**：若状态映射固定，我们可创建字典表（如：`status_dict`），通过JOIN替代`CASE WHEN`，便于维护。

##### 26、空值处理函数（IFNULL/COALESCE）

**需求**：查询`order`表订单信息，若支付时间为NULL，显示“未支付”。

**SQL实现**：

```sql
-- IFNULL(字段, 替代值)：若字段为NULL则返回替代值（MySQL特有）
SELECT order_id,
       order_amount,
       IFNULL(DATE_FORMAT(pay_time, '%Y-%m-%d %H:%i:%s'), '未支付') AS pay_time_cn
FROM `order`;

-- COALESCE(字段1, 字段2, 替代值)：返回第一个非NULL值（跨数据库兼容）
-- SELECT order_id, COALESCE(pay_time, '未支付') AS pay_time_cn FROM `order`;
```

**解析**：`IFNULL`用于处理单个字段的NULL值，`COALESCE`支持多个字段（返回第一个非NULL值），解决NULL值显示不友好的问题。  
**避坑**：`IFNULL`是MySQL特有函数，Oracle用`NVL`，SQL Server用`ISNULL`；`COALESCE`是SQL标准函数，跨数据库兼容。  
**优化**：表设计时尽量为字段设置默认值（如：`pay_time`默认NULL，`status`默认'pending'），减少空值处理开销。

##### 27、字符串拼接函数（CONCAT）

**需求**：我们查询`user`表，将用户姓名和手机号拼接为“张三-13800138000”的格式。

**SQL实现**：

```sql
-- CONCAT(字符串1, 字符串2, ...)：拼接多个字符串
SELECT user_id,
       CONCAT(user_name, '-', phone) AS user_info
FROM `user`;

-- 若有NULL值，CONCAT返回NULL，可结合IFNULL处理
-- SELECT CONCAT(IFNULL(user_name, '未知'), '-', IFNULL(phone, '无')) AS user_info FROM `user`;
```

**解析**：`CONCAT`将多个字符串参数拼接为一个字符串，若任意参数为NULL，结果为NULL。  
**避坑**：拼接时，我们需确保非字符串字段（如：数值型`user_id`）可隐式转换为字符串，否则会报错；Oracle用`||`拼接（如：`user_name || '-' || phone`）。  
**优化**：若拼接逻辑复杂（如：包含条件判断），可在应用层处理，减轻数据库压力。

##### 28、日期格式化函数（DATE\_FORMAT）

**需求**：我们查询`order`表，将下单时间（create\_time）格式化为“2024-05-20 14:30”。

**SQL实现**：

```sql
-- DATE_FORMAT(日期字段, 格式字符串)：格式化日期
SELECT order_id,
       DATE_FORMAT(create_time, '%Y-%m-%d %H:%i') AS create_time_str  -- %i表示分钟
FROM `order`;
```

**解析**：常用格式符：`%Y`（4位年份）、`%m`（2位月份）、`%d`（2位日期）、`%H`（24小时制）、`%i`（2位分钟）、`%s`（2位秒）。  
**避坑**：格式符区分大小写（`%m`是月份，`%M`是英文月份）；Oracle用`TO_CHAR(create_time, 'YYYY-MM-DD HH24:MI')`，SQL Server用`CONVERT(VARCHAR, create_time, 120)`。  
**优化**：日期格式化我们建议在应用层处理，数据库仅返回原始日期，减少计算开销。

##### 29、LIMIT分页查询

**需求**：实现`user`表的分页查询，每页显示10条，查询第3页数据（即第21-30条）。

**SQL实现**：

```sql
-- LIMIT 偏移量, 每页条数（偏移量=（页码-1）*每页条数）
SELECT user_id, user_name, register_time
FROM `user`
ORDER BY register_time DESC  -- 分页必须加ORDER BY，确保结果顺序一致
LIMIT 20, 10;  -- 第3页：(3-1)*10=20（偏移20条），取10条
```

**解析**：分页查询的核心是`LIMIT 偏移量, 条数`，必须配合`ORDER BY`（通常按主键或时间），否则每次分页结果可能不一致。  
**避坑**：偏移量过大时（如：`LIMIT 100000, 10`），性能极差（需扫描前100010条数据）；避免用`SELECT *`进行分页，只查所需字段。  
**优化**：用“主键分页”替代偏移量分页（如：`WHERE user_id > 10000 LIMIT 10`），利用主键索引快速定位，适合大数据量分页。

##### 30、聚合分组+TOP N查询

**需求**：统计2024年每个月的订单总金额，取总金额前3的月份。

**SQL实现**：

```sql
-- 先分组统计，再排序取TOP 3
SELECT DATE_FORMAT(create_time, '%Y-%m') AS month,
       SUM(order_amount) AS total_amount
FROM `order`
WHERE create_time BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY month
ORDER BY total_amount DESC
LIMIT 3;
```

**解析**：我们先按月份分组计算总金额，再按总金额降序排序，最后用`LIMIT 3`取前3名，适用于“Top N”分析场景。  
**避坑**：分组字段`month`是格式化后的字符串，需确保分组逻辑正确（如：`%Y-%m`不会混淆不同年份的同一月份）；若有并列第3的情况，`LIMIT 3`会只取其中一条，需根据业务需求处理。  
**优化**：在`create_time`上建立索引，加速日期筛选；若数据量极大，可先按月份分区表，再分区查询。

##### 31、范围查询（BETWEEN/IN）

**需求**：查询`order`表中2024年2月1日至2月15日的订单，且订单状态为“已支付”或“已完成”。

**SQL实现**：

```sql
-- BETWEEN用于连续范围，IN用于离散值列表
SELECT order_id, order_amount, status, create_time
FROM `order`
WHERE create_time BETWEEN '2024-02-01 00:00:00' AND '2024-02-15 23:59:59'
  AND status IN ('paid', 'completed');  -- IN中多个值用逗号分隔
```

**解析**：`BETWEEN`是闭区间查询（包含首尾值），适合日期、数值等连续范围；`IN`适合匹配固定的离散值集合，比多个`OR`更简洁。  
**避坑**：`BETWEEN`查询日期时，若结束时间只写`'2024-02-15'`，会默认截断为`'2024-02-15 00:00:00'`，漏查当天后续数据；`IN`的参数列表不宜过长（建议不超过1000个，否则性能下降）。  
**优化**：在`(create_time, status)`上建立联合索引，可同时命中范围和离散条件筛选。

##### 32、模糊查询（LIKE）

**需求**：我们查询`user`表中姓名包含“张”的用户信息。

**SQL实现**：

```sql
-- LIKE模糊查询，%匹配任意长度字符（包括0个），_匹配单个字符
SELECT user_id, user_name, phone
FROM `user`
WHERE user_name LIKE '%张%';  -- 包含“张”（前后都可匹配）
-- WHERE user_name LIKE '张%';  -- 以“张”开头
-- WHERE user_name LIKE '_张_';  -- 第二个字是“张”，且姓名共3个字
```

**解析**：`LIKE`用于字符串模糊匹配，`%`和`_`是通配符，满足“模糊搜索”场景（如：用户姓名、商品名称搜索）。  
**避坑**：`LIKE '%张%'`会导致索引失效（前缀模糊），无法利用`user_name`上的普通索引；避免在大数据量表中频繁使用前缀模糊查询。  
**优化**：若需频繁模糊搜索，我们可使用全文索引（如：MySQL的`FULLTEXT INDEX`），用`MATCH() AGAINST()`替代`LIKE`，如：`MATCH(user_name) AGAINST('张' IN BOOLEAN MODE)`。

##### 33、空值判断（IS NULL/IS NOT NULL）

**需求**：查询`order`表中未填写收货地址（`address`为NULL）的订单，以及已填写支付时间（`pay_time`不为NULL）的订单。

**SQL实现**：

```sql
-- 空值判断必须用IS NULL/IS NOT NULL，不能用=NULL/!=NULL
SELECT order_id, address, pay_time
FROM `order`
WHERE address IS NULL  -- 字段为NULL
  AND pay_time IS NOT NULL;  -- 字段不为NULL
```

**解析**：SQL中`NULL`表示“未知”，不与任何值相等（包括自身），因此必须用`IS NULL`/`IS NOT NULL`判断空值。  
**避坑**：误用`address = NULL`会返回空结果（因为`NULL = NULL`结果为`UNKNOWN`）；表设计时，若字段不允许空，我们建议设置`NOT NULL`并指定默认值（如：`address = ''`），减少空值判断。  
**优化**：在`address`和`pay_time`上建立索引，空值判断可命中索引（MySQL索引会存储NULL值）。

##### 34、数值计算查询

**需求**：我们查询`order_item`表中每个商品的“实际金额”（数量×单价），并筛选实际金额大于100的记录。

**SQL实现**：

```sql
-- 直接在SELECT/WHERE中进行数值计算（+、-、*、/）
SELECT order_item_id, product_id, quantity, unit_price,
       quantity * unit_price AS actual_amount  -- 计算实际金额
FROM `order_item`
WHERE quantity * unit_price > 100;  -- 计算结果作为筛选条件
```

**解析**：SQL支持对数值型字段进行算术运算，可在`SELECT`（计算结果作为字段）或`WHERE`（计算结果作为条件）中使用。  
**避坑**：除法运算需注意除数为0（会报错），可结合`IFNULL`处理，如：`quantity / IFNULL(unit_price, 1)`；计算结果可能超出字段类型范围，我们需提前确认数据精度。  
**优化**：若计算逻辑固定（如：`actual_amount = quantity * unit_price`），可在表中添加生成列（`GENERATED COLUMN`），将计算结果物理存储，避免每次查询重复计算。

##### 35、排序+去重（DISTINCT + ORDER BY）

**需求**：我们查询`order`表中所有下单用户的去重ID，并按用户ID升序排列。

**SQL实现**：

```sql
-- DISTINCT与ORDER BY联用，排序字段必须在去重字段中
SELECT DISTINCT user_id
FROM `order`
ORDER BY user_id ASC;
```

**解析**：`DISTINCT`去重后，可通过`ORDER BY`对去重结果排序，满足“去重且有序”的需求。  
**避坑**：`ORDER BY`的字段必须是`DISTINCT`查询的字段（或聚合字段），否则会出现逻辑歧义（如：`SELECT DISTINCT user_id FROM order ORDER BY create_time`会报错）。  
**优化**：`DISTINCT + ORDER BY`可替换为`GROUP BY user_id ORDER BY user_id`，部分场景下性能更优（尤其是有索引时）。

##### 36、外连接+空值筛选（LEFT JOIN + IS NULL）

**需求**：查询“没有下过单”的用户（即`user`表中存在，但`order`表中无对应记录的用户）。

**SQL实现**：

```sql
-- 左连接后筛选右表NULL值，即左表有但右表无的记录
SELECT u.user_id, u.user_name
FROM `user` u
LEFT JOIN `order` o ON u.user_id = o.user_id
WHERE o.user_id IS NULL;  -- 右表关联字段为NULL，说明无匹配订单
```

**解析**：这是“差集查询”的常用实现方式（左表减去与右表的交集），适用于“找不存在关联记录”的场景。  
**避坑**：筛选条件必须是右表的关联字段（如：`o.user_id`），而非其他字段（如：`o.order_id`，若订单表中`order_id`本身可能为NULL，会导致误判）。  
**优化**：右表关联字段`o.user_id`建立索引，加速左连接匹配；大数据量下可替换为`NOT EXISTS`（性能相近，语法不同）。

##### 37、多条件OR查询

**需求**：我们查询`user`表中“2023年注册”或“手机号以138开头”的用户。

**SQL实现**：

```sql
-- OR连接多个条件，满足其中一个即可
SELECT user_id, user_name, phone, register_time
FROM `user`
WHERE YEAR(register_time) = 2023
   OR phone LIKE '138%';
```

**解析**：`OR`用于逻辑“或”判断，只要满足多个条件中的一个，记录就会被选中。  
**避坑**：`OR`连接的条件若涉及不同字段，可能导致索引失效（如：同时用`register_time`和`phone`，无法同时命中两个索引）；复杂的`OR`条件可拆分为多个`UNION`查询，可能性能更优。  
**优化**：将`OR`查询改为`UNION`查询（适用于条件无重叠的场景），例如：

```sql
SELECT user_id 
FROM `order` 
WHERE create_time >= '2024-01-01' 
  AND create_time < '2025-01-01'
  AND order_amount > 1000
UNION
SELECT user_id 
FROM `order` 
WHERE create_time >= '2023-01-01' 
  AND create_time < '2024-01-01'
GROUP BY user_id 
HAVING COUNT(order_id) > 5;
```

##### 38、批量更新（LIMIT分批次）

**需求**：我们将`order`表中2022年之前的“未支付”订单状态改为“已取消”，分批次更新（每次1000条），避免长时间锁表或影响线上业务。

**SQL实现**：

```sql
-- 确保索引存在
CREATE INDEX idx_status_create_id ON `order` (status, create_time, order_id);

-- 示例单次更新语句（由脚本循环调用）
UPDATE `order`
SET status = 'cancelled'
WHERE status = 'unpaid'
  AND create_time < '2022-01-01'
  AND order_id > [LAST_PROCESSED_ID]  -- 上一批次最大order_id，首次设为0
ORDER BY order_id
LIMIT 1000;
```

> **说明**：该语句需由外部脚本（如：Python/Shell）循环执行，直到影响行数为0。每次执行后记录最后更新的`order_id`作为下一次的`[LAST_PROCESSED_ID]`，并可加入短暂休眠（如：`sleep(1)`）减轻数据库压力。

**解析**：对大量数据执行`UPDATE`时，单次操作可能引发长事务、行锁堆积、主从延迟等问题。通过**分批次更新**，每次只处理少量记录，可显著降低对数据库的冲击，提升系统稳定性。`ORDER BY order_id`确保扫描顺序一致，避免遗漏或重复。

**避坑**：

*   **避免无**`ORDER BY`**的**`LIMIT`：否则每次执行可能命中不同数据，导致部分记录未被更新或重复更新。
    
*   **避免在高峰期执行**：批量更新仍会占用IO、CPU和网络资源，我们建议在低峰期操作。
    
*   **不要依赖`WHILE`或`SLEEP`在普通SQL中实现循环**：`WHILE`和`LEAVE`是存储过程语法，不能在常规SQL客户端直接运行。
    

**优化**：

*   **建立高效索引**：添加联合索引`(status, create_time, order_id)`，覆盖查询条件并支持排序，避免全表扫描。
    
*   **使用主键控制分片**：基于`order_id > last_id`实现“游标式”推进，确保数据不重不漏。
    
*   **外部脚本控制节奏**：使用Python、Shell等语言编写控制逻辑，实现重试、监控、日志记录和自动退出。
    
*   **生产环境保留 binlog**：**禁止关闭二进制日志**（`sql_log_bin=0`），否则会导致主从不一致或无法恢复数据。
    
*   **避免使用**`LOW_PRIORITY`：InnoDB引擎不支持 `LOW_PRIORITY UPDATE`，该关键字无效。
    

**总结**：真正的“安全批量更新” = **索引优化 + 主键分片 + ORDER BY + 外部脚本控制 + 低峰执行**。

##### 39、批量删除（LIMIT分批次）

**需求**：删除`order_log`表中2021年之前的日志数据，分批次删除（每次5000条）。

**SQL实现**：

```sql
-- 分批次删除，避免大事务和长时间锁表
WHILE 1=1 DO
    DELETE FROM `order_log`
    WHERE create_time < '2021-01-01'
    ORDER BY log_id ASC  -- 按主键排序，确保删除顺序稳定
    LIMIT 5000;  -- 每次删除5000条
    IF ROW_COUNT() = 0 THEN
        LEAVE;
    END IF;
    SLEEP(2);  -- 日志表数据量大，休眠2秒
END WHILE;
```

**解析**：批量删除与批量更新逻辑类似，核心是用`LIMIT`控制单次删除量，避免一次性删除大量数据导致事务日志暴涨、表锁超时。  
**避坑**：删除日志类数据时，我们优先考虑“分区表+删除分区”（如：按年分区，直接`ALTER TABLE order_log DROP PARTITION p2020`），效率远高于逐条删除。  
**优化**：删除前禁用表索引，删除后重建索引，减少索引维护开销。

##### 40、联合查询（UNION/UNION ALL）

**需求**：我们查询“2024年订单金额>1000”的用户ID，以及“2023年订单数>5”的用户ID，合并结果并去重。

**SQL实现**：

```sql
-- UNION：合并结果并去重；UNION ALL：合并结果但不去重（性能更优）
SELECT user_id FROM `order`
WHERE YEAR(create_time) = 2024 AND order_amount > 1000
UNION  -- 去重合并
SELECT user_id FROM `order`
WHERE YEAR(create_time) = 2023 AND COUNT(order_id) > 5
GROUP BY user_id;

-- 若无需去重，用UNION ALL（效率更高）
-- SELECT ... UNION ALL SELECT ...
```

**解析**：`UNION`用于合并多个`SELECT`的结果集，要求各`SELECT`的字段数、字段类型一致；`UNION`会自动去重，`UNION ALL`不去重（性能更好，适合确定无重复的场景）。  
**避坑**：`UNION`的去重逻辑会消耗额外性能，非必要不使用；各`SELECT`的字段顺序必须一致，否则会导致数据错位。  
**优化**：若合并的查询涉及同一表，我们可尝试用`OR`或`CASE WHEN`替代`UNION`，减少表扫描次数。

##### 41、子查询（SELECT子句中）

**需求**：我们查询`user`表中每个用户的姓名，以及对应的“最近一次下单时间”（从`order`表中查询）。

**SQL实现**：

```sql
-- SELECT子句中嵌套子查询，返回单值（每个用户对应一个结果）
SELECT user_id,
       user_name,
       (SELECT MAX(create_time)  -- 子查询返回用户最近下单时间
        FROM `order` o
        WHERE o.user_id = u.user_id) AS last_order_time
FROM `user` u;
```

**解析**：`SELECT`中的子查询称为“标量子查询”，需返回单个值（一行一列），用于为主查询的每一行补充关联数据。  
**避坑**：若子查询返回多个值，会报错；若子查询无结果，返回`NULL`，需结合`IFNULL`处理（如：`IFNULL((SELECT ...), '无下单记录')`）。  
**优化**：标量子查询性能较差（主查询每一行都会执行一次子查询），大数据量下我们建议替换为`LEFT JOIN + GROUP BY`（如：`LEFT JOIN (SELECT user_id, MAX(create_time) FROM order GROUP BY user_id) o ON u.user_id = o.user_id`）。

##### 42、EXISTS与NOT EXISTS查询

**需求**：查询“购买过商品ID为1001且未购买过商品ID为1002”的用户ID。

**SQL实现**：

```sql
-- EXISTS判断存在，NOT EXISTS判断不存在，组合实现复杂条件
SELECT DISTINCT user_id
FROM `order` o1
WHERE o1.product_id = 1001  -- 购买过1001
  AND NOT EXISTS (  -- 未购买过1002
      SELECT 1
      FROM `order` o2
      WHERE o2.user_id = o1.user_id
        AND o2.product_id = 1002
  );
```

**解析**：`EXISTS`和`NOT EXISTS`组合使用，可实现“既满足A条件又不满足B条件”的复杂筛选，比`IN`和`NOT IN`更高效（尤其子查询结果集大时）。  
**避坑**：`NOT IN`若子查询返回`NULL`，会导致整个查询返回空结果（因为`NULL`的逻辑判断为`UNKNOWN`），而`NOT EXISTS`无此问题，优先使用`NOT EXISTS`。  
**优化**：子查询中的关联字段（`o2.user_id`、`o2.product_id`）建立联合索引，加速匹配速度。

##### 43、GROUP BY ROLLUP分组汇总

**需求**：统计`order`表中每个用户的订单总金额，同时汇总所有用户的总金额。

**SQL实现**：

```sql
-- GROUP BY ROLLUP：在分组基础上增加汇总行
SELECT user_id,
       SUM(order_amount) AS total_amount
FROM `order`
GROUP BY ROLLUP(user_id);  -- 增加一行user_id为NULL的汇总记录
```

**解析**：`ROLLUP`是`GROUP BY`的扩展，用于生成分组的“汇总行”（总计、小计），`GROUP BY ROLLUP(col1, col2)`会生成`(col1, col2)`、`(col1, NULL)`、`(NULL, NULL)`三级汇总。  
**避坑**：`ROLLUP`生成的汇总行中，分组字段为`NULL`，需用`IFNULL`标识（如：`IFNULL(user_id, '总计') AS user_id`）；不同数据库对`ROLLUP`的支持略有差异：MySQL、SQL Server直接支持`GROUP BY ROLLUP`；Oracle同样支持`ROLLUP`，若需更灵活的多维度汇总可使用`CUBE`（功能扩展，非替代）。。  
**优化**：若只需总计，我们可直接用`SUM(order_amount)`查询，无需`ROLLUP`；复杂汇总建议在应用层处理，减少数据库计算压力。

##### 44、条件更新（UPDATE + CASE WHEN）

**需求**：根据`order`表中订单金额更新优惠等级：金额>1000为“VIP”，500-1000为“普通”，<500为“新用户”。

**SQL实现**：

```sql
-- UPDATE中用CASE WHEN实现多条件更新
UPDATE `order`
SET discount_level = CASE
                       WHEN order_amount > 1000 THEN 'VIP'
                       WHEN order_amount BETWEEN 500 AND 1000 THEN '普通'
                       ELSE '新用户'
                     END;
```

**解析**：`UPDATE`结合`CASE WHEN`，我们可根据不同条件为同一字段设置不同值，避免多次执行单条件`UPDATE`。  
**避坑**：确保`CASE WHEN`的条件覆盖所有场景（或加`ELSE`），避免字段被更新为`NULL`；批量更新前务必备份数据，或先执行`SELECT`验证结果。  
**优化**：若更新条件基于另一表的数据，我们可结合`JOIN`和`CASE WHEN`实现关联+多条件更新。

##### 45、插入或更新（INSERT ... ON DUPLICATE KEY UPDATE）

**需求**：向`user`表插入用户数据，若用户ID（唯一键）已存在，则更新手机号和状态，避免重复插入报错。

**SQL实现**：

```sql
-- 唯一键冲突时执行更新（需保证user_id是唯一键/主键）
INSERT INTO `user` (user_id, user_name, phone, status)
VALUES (10086, '张三', '13800138002', 'normal')
ON DUPLICATE KEY UPDATE  -- 当user_id重复时触发更新
  phone = VALUES(phone),  -- VALUES(phone)表示插入语句中的phone值
  status = VALUES(status),
  update_time = NOW();  -- 同时更新修改时间
```

**解析**：`ON DUPLICATE KEY UPDATE`依赖表中的唯一键（主键或`UNIQUE`索引），当插入数据触发唯一键冲突时，执行后续`UPDATE`逻辑，实现“存在则更新，不存在则插入”（UPSERT）。  
**避坑**：必须确保表中有唯一键（如：`user_id`为主键），否则该语句会退化为普通插入，可能导致重复数据；更新的唯一键字段需确保新值不与其他记录冲突（如：`user_id`为主键时，更新后的值不能已存在），否则会再次触发唯一键冲突；非主键的唯一索引（如：`phone`），若新值唯一可正常更新。  
**优化**：避免在高并发场景下频繁使用该语句（可能导致主键冲突锁竞争），我们可通过应用层先查询再决定插入/更新，或使用`REPLACE INTO`（删除旧记录再插入，性能略差）。

##### 46、查看表结构（DESCRIBE）

**需求**：查看`user`表的字段名、类型、是否为空、默认值等结构信息（开发/调试常用）。

**SQL实现**：

```sql
-- 查看表结构（简写DESC）
DESCRIBE `user`;
-- 或更详细的信息
SHOW CREATE TABLE `user`;  -- 显示创建表的SQL语句，包含索引、引擎等
```

**解析**：`DESCRIBE`（简写`DESC`）返回表的基础结构信息，适合快速查看字段属性；`SHOW CREATE TABLE`返回完整的建表语句，包含引擎、字符集、索引等细节，便于复制表结构或排查问题。  
**避坑**：`DESCRIBE`显示的“Key”列中，`PRI`表示主键，`UNI`表示唯一索引，`MUL`表示普通索引，需注意区分；不同数据库查看表结构的语法不同（Oracle用`DESCRIBE user`，SQL Server用`SP_HELP user`）。  
**优化**：开发时，我们可将`SHOW CREATE TABLE`的结果保存，作为表结构文档的基础，避免频繁查询数据库。

##### 47、查看索引（SHOW INDEX）

**需求**：我们查看`order`表的所有索引信息，包括索引名、索引字段、索引类型等，用于性能优化。

**SQL实现**：

```
-- 查看指定表的索引信息
SHOW INDEX FROM `order`;
-- 简化查看（只显示关键列）
SHOW INDEX FROM `order`\G;  -- \G纵向显示，更易读（MySQL客户端支持）
```

**解析**：`SHOW INDEX`返回表的所有索引详情，主要字段包括：`Key_name`（索引名）、`Column_name`（索引字段）、`Index_type`（索引类型，如：`BTREE`）、`Non_unique`（是否非唯一索引，0为唯一，1为非唯一）。  
**避坑**：注意区分“联合索引”和“单列索引”，联合索引的`Seq_in_index`字段显示字段在索引中的顺序（1为第一个字段，以此类推）；避免创建冗余索引（如：同时创建`(user_id)`和`(user_id, create_time)`，前者冗余）。  
**优化**：我们定期用`SHOW INDEX`检查索引使用情况，结合`EXPLAIN`分析慢查询，删除未使用的冗余索引，减少写入开销。

##### 48、分析SQL执行计划（EXPLAIN）

**需求**：我们分析“查询2024年订单金额>1000的用户”的SQL执行计划，判断是否使用索引、是否有全表扫描，用于性能优化。

**SQL实现**：

```sql
-- 分析SQL执行计划
EXPLAIN
SELECT user_id, order_amount, create_time
FROM `order`
WHERE create_time >= '2024-01-01'
  AND order_amount > 1000;
```

**解析**：`EXPLAIN`是SQL性能优化的主要工具，返回SQL的执行计划，关键字段包括：

*   `type`：连接类型，`ALL`（全表扫描，最差）、`range`（范围扫描）、`ref`（索引查找）、`eq_ref`（主键/唯一索引查找，最优）。
    
*   `key`：实际使用的索引名（若为`NULL`，表示未使用索引）。
    
*   `rows`：预计扫描的行数（值越小越好）。
    
*   `Extra`：额外信息，如：`Using index`（索引覆盖，优秀）、`Using filesort`（文件排序，需优化）、`Using temporary`（临时表，需优化）。
    

**避坑**：`EXPLAIN`的`rows`是预计值，非实际值；若`type`为`ALL`且`key`为`NULL`，说明存在全表扫描，需添加索引；`Using filesort`和`Using temporary`通常伴随性能问题，我们需通过调整索引或SQL逻辑优化。

**优化**：我们根据`EXPLAIN`结果调整索引，如：上述SQL若`key`为`NULL`，可创建`(create_time, order_amount)`联合索引，使`type`变为`range`，并避免`Using filesort`。

##### 49、事务控制（BEGIN/COMMIT/ROLLBACK）

**需求**：实现“用户下单”的原子操作：插入订单记录，同时更新商品库存，若任一操作失败，全部回滚。

**SQL实现**：

```sql
-- 主要SQL语句（实际由应用层在事务中执行）
BEGIN;  -- 开启事务（通常由应用框架自动管理）

INSERT INTO `order` (order_id, user_id, order_amount, create_time)
VALUES (2024002, 10086, 1500, NOW());

UPDATE `product`
SET stock = stock - 1
WHERE product_id = 1001
  AND stock >= 1;  -- 确保库存充足

-- 应用层检查：若UPDATE影响行数为0或INSERT失败，则：
ROLLBACK;  -- 回滚事务

-- 否则：
COMMIT;    -- 提交事务
```

> **说明**：上述`BEGIN`/`COMMIT`/`ROLLBACK`通常由应用代码（如：Java Spring的`@Transactional`、Python的上下文管理器）自动管理。SQL本身不包含`IF`判断逻辑，事务控制流由程序实现。

**解析**：事务确保一组操作的 **原子性（Atomicity）**：要么全部成功，要么全部失败。主要命令有：

*   `BEGIN` 或 `START TRANSACTION`：显式开启事务。
    
*   `COMMIT`：提交事务，持久化所有更改。
    
*   `ROLLBACK`：回滚事务，撤销所有未提交的更改。
    

> 所有操作必须在同一个数据库连接中执行。

**避坑**：

*   **避免在事务中执行耗时操作**（如：网络请求、复杂计算），防止长时间锁表。
    
*   **事务不宜过大**：只包含必要操作，减少锁竞争和死锁概率。
    
*   **MyISAM 引擎不支持事务**：必须使用 `InnoDB` 引擎（`ENGINE=InnoDB`）。
    
*   **不要在普通SQL脚本中使用**`IF ... COMMIT/ROLLBACK`：此类控制流仅在存储过程中有效，生产环境我们推荐由应用层控制事务。
    

**优化**：

*   **缩短事务时长**：提前校验参数、用户权限等非数据库操作，减少事务内处理时间。
    
*   **选择合适的隔离级别**：高并发场景下可使用`READ COMMITTED`（MySQL 默认），避免`REPEATABLE READ`下的过度间隙锁。
    
*   **使用连接池 + 事务管理框架**：如：Spring、Sequelize、SQLAlchemy，简化事务控制。
    
*   **我们要为关键字段建立索引**：如：`product_id`，避免`UPDATE`时全表扫描加锁。
    

**总结**：事务的**SQL语句很简单**，但**正确的控制方式在应用层**。真正的“安全事务”=**InnoDB引擎 + 应用层异常捕获 + 精简事务范围 + 合理隔离级别**。

##### 50、临时表使用（CREATE TEMPORARY TABLE）

**需求**：统计“每个用户的月均订单金额”，我们需先计算每个用户的总金额和下单月份数，用临时表存储中间结果，再计算平均值。

**SQL实现**：

```sql
-- 创建临时表（会话结束后自动删除）
CREATE TEMPORARY TABLE temp_user_order (
    user_id INT PRIMARY KEY,
    total_amount DECIMAL(10,2),
    month_count INT
) ENGINE=InnoDB;

-- 向临时表插入中间结果
INSERT INTO temp_user_order (user_id, total_amount, month_count)
SELECT user_id,
       SUM(order_amount) AS total_amount,
       COUNT(DISTINCT DATE_FORMAT(create_time, '%Y-%m')) AS month_count
FROM `order`
GROUP BY user_id;

-- 基于临时表计算月均金额
SELECT user_id,
       total_amount / month_count AS avg_month_amount
FROM temp_user_order
WHERE month_count > 0;  -- 避免除数为0

-- 手动删除临时表（可选，会话结束自动删除）
DROP TEMPORARY TABLE IF EXISTS temp_user_order;
```

**解析**：临时表用于存储复杂查询的中间结果，仅当前会话可见，会话结束后自动删除，避免影响其他用户。`ENGINE=InnoDB`确保临时表支持事务和索引。  
**避坑**：临时表名不能与现有永久表重名；同一会话内可创建多个临时表，但名不能重复；临时表不支持`ALTER TABLE`添加主键（需创建时指定）。  
**优化**：临时表可添加索引（如：上述`user_id`为主键），加速后续查询；复杂场景下，临时表比多层子查询更易维护且性能更优（中间结果物理存储，避免重复计算）。

以上50个SQL实战场景，基本上覆盖了我们日常应用里查数据、改数据、做统计的需求，比如：别用`SELECT *`、关联表记得加索引，等等。实际应用的时候，我们结合`EXPLAIN`看执行计划，再配合事务保证数据安全，效率能提升一大截。赶紧存起来，下次遇到SQL问题时翻一翻，我们准能找到思路！