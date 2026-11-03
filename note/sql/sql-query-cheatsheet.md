---
title: 130条常用SQL语句分类速查，从基础查询筛选到统计分析
lastUpdated: 2026-09-01 04:00:00
---


#### 一、基础查询与筛选（1-20条）

##### 1、查询表中所有数据及所有列

```sql
SELECT * FROM student; -- student为表名，*代表所有列
```

解析：最基础的查询语句，用于获取目标表的完整数据集，适用于快速查看表中全部信息。

##### 2、查询表中指定列的数据

```sql
SELECT id, name, age FROM student; -- 查询student表中的id、name、age三列
```

解析：仅提取需要的列，减少数据传输量，提高查询效率，是我们日常查询中最常用的方式之一。

##### 3、查询符合单一条件的数据

```sql
SELECT * FROM student WHERE age = 18; -- 查询student表中年龄为18岁的所有数据
```

解析：通过`WHERE`子句筛选数据，精准定位符合条件的记录，是条件查询的基础。

##### 4、查询符合多条件（AND）的数据

```sql
SELECT * FROM student WHERE age > 18 AND gender = '男'; -- 查询年龄大于18且性别为男的学生
```

解析：`AND`连接多个条件，仅返回同时满足所有条件的记录，适用于多维度筛选。

##### 5、查询符合多条件（OR）的数据

```sql
SELECT * FROM student WHERE class = '一班' OR score > 90; -- 查询一班学生或成绩大于90分的学生
```

解析：`OR`连接多个条件，返回满足任意一个条件的记录，用于扩大筛选范围。

##### 6、查询指定范围内的数据（BETWEEN）

```sql
SELECT * FROM student WHERE score BETWEEN 80 AND 90; -- 查询成绩在80到90分之间的学生（包含80和90）
```

解析：替代`score >=80 AND score <=90`，简化范围查询逻辑，适用于数值、日期等类型。

##### 7、查询指定集合内的数据（IN）

```sql
SELECT * FROM student WHERE class IN ('一班', '二班', '三班'); -- 查询一、二、三班的学生
```

解析：替代多个`OR`条件，高效筛选属于指定集合的记录，适用于固定枚举值查询。

##### 8、模糊查询（开头匹配）

```sql
SELECT * FROM student WHERE name LIKE '张%'; -- 查询姓“张”的学生（%代表任意长度字符）
```

解析：`LIKE`结合通配符`%`实现模糊匹配，`张%`表示以“张”开头的任意名字。

##### 9、模糊查询（中间匹配）

```sql
SELECT * FROM student WHERE name LIKE '%小%'; -- 查询名字中包含“小”的学生
```

解析：`%小%`表示任意位置包含“小”的字符串，适用于不确定字符位置的模糊查询。

##### 10、模糊查询（结尾匹配）

```sql
SELECT * FROM student WHERE name LIKE '%伟'; -- 查询名字以“伟”结尾的学生
```

解析：`%伟`表示以“伟”结尾的字符串，针对性匹配尾部固定的内容。

##### 11、查询非空数据

```sql
SELECT * FROM student WHERE address IS NOT NULL; -- 查询地址不为空的学生
```

解析：`IS NOT NULL`筛选非空字段，`IS NULL`则筛选空字段，用在处理字段空值场景。

##### 12、查询指定日期范围内的数据（含时间）

```sql
SELECT * FROM user_login 
WHERE login_time BETWEEN '2024-05-01 00:00:00' AND '2024-05-01 23:59:59';
```

解析：针对带时间戳的字段，用`BETWEEN`精准筛选“某一天”、“某一小时”等具体时间范围的数据，避免因只写日期漏查当天23:00-23:59的数据，是日志查询、行为分析的常用语句。

##### 13、查询本周数据

```sql
SELECT * FROM orders 
WHERE YEARWEEK(order_date, 1) = YEARWEEK(CURDATE(), 1); -- 获取本周所有订单
```

解析：`YEARWEEK(date, mode)`返回年份和周数组合，mode=1表示周从周一开始，适用于周期性统计。

##### 14、查询两表差异数据（左表有、右表无）

```sql
SELECT s.id, s.name 
FROM student s 
LEFT JOIN graduate g ON s.id = g.stu_id 
WHERE g.stu_id IS NULL;
```

解析：本质是“左连接+空值筛选”，精准定位“主表存在、关联表不存在”的记录（如：未毕业学生），用在数据对账（已注册未下单用户、已下单未付款订单）等高频场景，比`NOT IN`更高效且避免NULL值陷阱。

##### 15、查询字段值出现次数大于N的记录

```sql
SELECT phone, COUNT(*) AS repeat_count 
FROM user_register 
GROUP BY phone 
HAVING COUNT(*) > 2 
ORDER BY repeat_count DESC;
```

解析：按“手机号”等唯一标识分组，筛选重复出现超过2次的记录，用于检测“重复注册”、“恶意刷单”等异常数据，是我们进行数据清洗、风控排查的常用语句。

##### 16、去重查询指定列

```sql
SELECT DISTINCT class FROM student; -- 查询所有不重复的班级名称
```

解析：`DISTINCT`去除指定列的重复值，仅返回唯一记录，适用于获取枚举值列表。

##### 17、查询表的字段结构信息

```
DESCRIBE student;  -- 简写：DESC student
```

解析：快速查看表的字段名、数据类型、主键/NULL约束、默认值等结构信息，比`SHOW CREATE TABLE`更简洁，是我们“忘记表结构时快速确认字段”的高频语句。

##### 18、查询当前数据库所有表名

```sql
-- MySQL
SELECT TABLE_NAME 
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'your_database_name'  -- 替换为你的数据库名
  AND TABLE_TYPE = 'BASE TABLE';  -- 只查询基础表（排除视图等）

-- SQL Server
SELECT name AS TABLE_NAME 
FROM sys.tables;

-- Oracle
SELECT table_name 
FROM user_tables;
```

解析：通过系统表查询当前数据库的所有表名，用在“新接手项目了解结构”、“批量生成脚本”等场景，是我们在数据库管理、项目交接时的高频语句。

##### 19、JSON字段查询

```sql
SELECT profile->'$.contact.phone' AS phone FROM users; -- 提取JSON字段中的手机号
```

解析：`->`运算符（MySQL 5.7+）便捷查询JSON类型字段，适用于半结构化数据处理，但提取结果是带引号的字符串（如："138\*\*\*\*8000"）。若需获取“无引号的纯文本”，需使用`->>`运算符（JSON解引用），更符合日常使用场景：

```sql
-- 推荐：返回无引号的手机号（138****8000）
SELECT profile->>'$.contact.phone' AS phone FROM users;
```

说明：其他数据库语法差异较大，如：PostgreSQL用`profile->'contact.phone'`，返回的是`text`类型（无引号）；SQL Server用`JSON_VALUE(profile, '$.contact.phone')`，返回的可能是带引号的字符串（取决于数据类型）。

##### 20、跨数据库查询

```sql
SELECT * FROM db1.student s 
JOIN db2.scores sc ON s.id = sc.stu_id; -- 关联两个不同数据库的表
```

解析：通过`database.table`语法实现跨库操作，需用户有对应权限，适用于分布式数据库架构。

#### 二、排序与分页（21-25条）

##### 21、按指定列升序排序

```sql
SELECT * FROM student ORDER BY score ASC; -- 按成绩升序排序（ASC可省略，默认升序）
```

解析：`ORDER BY`指定排序字段，`ASC`表示从小到大排序，适用于按数值、日期等排序场景。

##### 22、按指定列降序排序

```sql
SELECT * FROM student ORDER BY score DESC; -- 按成绩降序排序
```

解析：`DESC`表示从大到小排序，常用于查询“top N”类数据（如：成绩最高的学生）。

##### 23、按多列排序

```sql
SELECT * FROM student ORDER BY class ASC, score DESC; -- 先按班级升序，再按成绩降序
```

解析：多列排序时，先按第一列排序，第一列相同则按第二列排序，实现更精细的排序逻辑。

##### 24、限制查询结果行数

```sql
SELECT * FROM student LIMIT 10; -- 只返回前10条查询结果
```

解析：`LIMIT`用于分页查询或获取部分数据，减少数据返回量，提升性能。

##### 25、分页查询（指定偏移量）

```sql
-- MySQL
SELECT * FROM student LIMIT 10 OFFSET 20; -- 跳过前20条，取第21-30条数据（等效于LIMIT 20, 10）
-- SQL Server
SELECT * FROM student
ORDER BY id
OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;
```

解析：`OFFSET`指定起始位置，`LIMIT/FETCH NEXT`限定行数，用在深度分页场景，不同数据库语法略有差异。

#### 三、聚合与分组（26-40条）

##### 26、统计表中总记录数

```sql
SELECT COUNT(*) FROM student; -- 统计student表的总学生数（*包含所有记录，包括NULL）
```

解析：最常用的聚合函数，用于统计行数，`COUNT(1)`功能相同，效率略高。

##### 27、统计指定列非空记录数

```sql
SELECT COUNT(phone) FROM student; -- 统计学生表中手机号非空的记录数
```

解析：`COUNT(列名)`仅统计该列非空的行数，适用于统计有效字段的数量。

##### 28、计算指定列的总和

```sql
SELECT SUM(score) FROM student; -- 计算所有学生的成绩总和
```

解析：`SUM`仅适用于数值类型，用于累加字段值，如：统计总销售额、总分数等。

##### 29、计算指定列的平均值

```sql
SELECT AVG(score) FROM student; -- 计算所有学生的平均成绩
```

解析：`AVG`自动忽略NULL值，计算数值列的平均值，是统计分析的常用函数。

##### 30、查询指定列的最大值

```sql
SELECT MAX(score) FROM student; -- 查询所有学生中的最高成绩
```

解析：`MAX`用于获取数值、日期等类型的最大值，如：最高分数、最近订单日期等。

##### 31、查询指定列的最小值

```sql
SELECT MIN(score) FROM student; -- 查询所有学生中的最低成绩
```

解析：`MIN`用于获取数值、日期等类型的最小值，如：最低分数、最早注册日期等。

##### 32、按指定列分组统计

```sql
SELECT class, COUNT(*) FROM student GROUP BY class; -- 按班级分组，统计每个班级的学生数
```

解析：`GROUP BY`将数据按指定列分组，结合聚合函数实现分组统计，是我们进行数据分析的主要语句。

##### 33、分组后筛选（HAVING）

```sql
SELECT class, COUNT(*) FROM student GROUP BY class HAVING COUNT(*) > 30; -- 筛选学生数大于30的班级
```

解析：`HAVING`用于筛选分组后的结果（针对聚合值），区别于`WHERE`（筛选原始数据）。

##### 34、分组后计算多聚合值

```sql
SELECT class, AVG(score), MAX(score), MIN(score) FROM student GROUP BY class; -- 统计每个班级的平均、最高、最低成绩
```

解析：同一分组中可同时使用多个聚合函数，一次性获取多维度统计结果。

##### 35、统计去重后的记录数

```sql
SELECT COUNT(DISTINCT class) FROM student; -- 统计不同班级的数量
```

解析：结合`COUNT`和`DISTINCT`，统计指定列的唯一值数量，如：不同客户数、不同商品数等。

##### 36、分组后按聚合值排序

```sql
SELECT class, AVG(score) FROM student GROUP BY class ORDER BY AVG(score) DESC; -- 按班级平均成绩降序排序
```

解析：分组统计后，可通过`ORDER BY`对聚合结果排序，便于对比分析。

##### 37、按日期分组统计每日数据

```sql
SELECT DATE(order_time) AS order_date, COUNT(*) AS order_count, SUM(amount) AS total_amount 
FROM orders 
GROUP BY DATE(order_time) 
ORDER BY order_date DESC;
```

解析：通过`DATE()`提取日期部分（忽略时分秒），按天聚合统计订单量、销售额等主要指标，是业务日报、运营分析的最基础语句。

##### 38、按字段非重复值分组并拼接详情

```sql
SELECT class_id, 
       GROUP_CONCAT(DISTINCT name SEPARATOR ', ') AS stu_list,  -- 去重拼接学生姓名
       GROUP_CONCAT(score ORDER BY score DESC SEPARATOR '; ') AS score_list  -- 按成绩降序拼接
FROM student 
GROUP BY class_id;
```

解析：增强版`GROUP_CONCAT`，通过`DISTINCT`避免重复值，`ORDER BY`让拼接结果更有序，用在“按班级汇总学生名单+成绩”等场景，直接生成可读汇总信息。

##### 39、连续范围分组

```sql
SELECT 
  CASE 
    WHEN age BETWEEN 0 AND 18 THEN '未成年'
    WHEN age BETWEEN 19 AND 35 THEN '青年'
    ELSE '中年+'
  END AS age_group,
  COUNT(*)
FROM users
GROUP BY age_group; -- 按年龄分段统计用户数
```

解析：`CASE+GROUP BY`实现数据分段聚合，比多个单查询更高效，常用于人口统计分析。

##### 40、分组后限制结果行数

```sql
SELECT class, COUNT(*) FROM student GROUP BY class LIMIT 5; -- 只返回前5个班级的统计结果
```

解析：`LIMIT`可结合分组统计使用，用于获取部分分组的结果。

#### 四、数据操作（插入/更新/删除）（41-55条）

##### 41、插入单条数据（指定列）

```sql
INSERT INTO student (id, name, age) VALUES (1, '张三', 18); -- 向student表的id、name、age列插入一条数据
```

解析：是我们最常用的插入语句，指定插入的列和对应值，列顺序需与值顺序一致。

##### 42、插入单条数据（所有列）

```sql
INSERT INTO student VALUES (2, '李四', 19, '男', '一班'); -- 向student表所有列插入数据（需按表结构列顺序）
```

解析：不指定列时，需按表定义的列顺序插入所有值，不推荐（表结构变更易出错）。

##### 43、批量插入数据

```sql
INSERT INTO student (id, name, age) VALUES (3, '王五', 18), (4, '赵六', 19), (5, '孙七', 17); -- 批量插入3条数据
```

解析：一次插入多条数据，比单条插入效率更高，用在批量导入场景。

##### 44、插入查询结果的数据

```sql
INSERT INTO student_bak (id, name, age) SELECT id, name, age FROM student WHERE class = '一班'; -- 将一班学生数据插入备份表
```

解析：将一个查询的结果集插入目标表，要求目标表列与查询结果列匹配，适用于数据迁移/备份。

##### 45、插入或更新数据（主键冲突时更新）

```sql
INSERT INTO student (id, name, age) VALUES (1, '张三', 19) ON DUPLICATE KEY UPDATE age = 19; -- 若id=1已存在，则更新age为19
```

解析：依赖主键/唯一索引，不存在则插入，存在则更新，用在“Upsert”场景。

##### 46、替换数据（主键冲突时删除再插入）

```
REPLACE INTO student (id, name, age) VALUES (1, '张三', 20); -- 若id=1已存在，先删除再插入新数据
```

解析：主键冲突时执行“删除旧记录+插入新记录”，区别于`ON DUPLICATE KEY`（仅更新）。

##### 47、更新指定条件的单条数据

```sql
UPDATE student SET score = 85 WHERE id = 1; -- 将id为1的学生成绩更新为85分
```

解析：`UPDATE`结合`WHERE`更新符合条件的记录，**必须加`WHERE`，否则更新全表**。

##### 48、更新指定条件的多条数据

```sql
UPDATE student SET class = '二班' WHERE age < 18; -- 将所有年龄小于18岁的学生班级改为二班
```

解析：批量更新符合条件的记录，需确保`WHERE`条件准确，避免误更新。

##### 49、同时更新多列数据

```sql
UPDATE student SET age = 20, gender = '女' WHERE id = 2; -- 同时更新id为2的学生的年龄和性别
```

解析：用逗号分隔多个“列=值”，一次性更新多字段，简化操作。

##### 50、根据另一表数据更新当前表

```sql
UPDATE student s JOIN score sc ON s.id = sc.stu_id SET s.score = sc.math WHERE sc.math > 90; -- 用score表的数学成绩更新student表（仅数学>90的学生）
```

解析：通过`JOIN`关联两表，根据关联表的数据更新当前表，用在跨表更新场景。

##### 51、批量更新时关联子查询赋值

```sql
UPDATE products p
SET p.stock = p.stock - (
    SELECT SUM(quantity) 
    FROM order_details od 
    WHERE od.product_id = p.id AND od.order_status = 'paid'
)
WHERE EXISTS (
    SELECT 1 
    FROM order_details od 
    WHERE od.product_id = p.id AND od.order_status = 'paid'
);
```

解析：通过子查询计算“待扣减的库存总量”，批量更新商品库存，同时用`EXISTS`避免更新无订单的商品（减少无效操作），是我们电商、库存管理系统中的主要批量更新语句。优化后（将子查询包装为「临时派生表」）：

```sql
UPDATE products p
SET p.stock = p.stock - (
    -- 子查询包装为临时表，避免直接引用更新表
    SELECT sum_qty 
    FROM (
        SELECT SUM(quantity) AS sum_qty 
        FROM order_details od 
        WHERE od.product_id = p.id AND od.order_status = 'paid'
    ) AS temp
)
WHERE EXISTS (
    SELECT 1 
    FROM order_details od 
    WHERE od.product_id = p.id AND od.order_status = 'paid'
);
```

##### 52、数据存在性更新

```sql
UPDATE products
SET stock = IF(stock > 0, stock - 1, 0) 
WHERE id = 1001; -- 安全扣减库存（避免负值）
```

解析：`IF(condition, true_val, false_val)`函数实现条件更新，保证数据逻辑完整性。

##### 53、删除指定条件的单条数据

```sql
DELETE FROM student WHERE id = 3; -- 删除id为3的学生记录
```

解析：`DELETE`结合`WHERE`删除符合条件的记录，**必须加`WHERE`，否则删除全表**。

##### 54、删除指定条件的多条数据

```sql
DELETE FROM student WHERE class = '三班' AND age > 20; -- 删除三班中年龄大于20岁的学生
```

解析：批量删除符合多条件的记录，我们操作前需确认条件准确性，建议先查询再删除。

##### 55、删除关联表数据（JOIN删除）

```sql
DELETE s FROM student s JOIN class c ON s.class_id = c.id WHERE c.name = '四班'; -- 删除四班的所有学生（关联class表筛选）
```

解析：通过`JOIN`关联多表，根据关联条件删除目标表数据，适用于跨表筛选删除。

#### 五、表数据清空与结构操作（56-65条）

##### 56、删除表中所有数据（保留表结构）

```sql
DELETE FROM student; -- 删除student表所有数据，表结构不变（自增ID不会重置）
```

解析：删除全表数据但保留表结构，效率低于`TRUNCATE`，用在需要事务回滚的场景。

##### 57、清空表数据（重置自增ID）

```
TRUNCATE TABLE student; -- 清空student表所有数据，重置自增ID，表结构不变
```

解析：效率高于`DELETE`，但无法回滚，用在彻底清空表且无需保留ID序列的场景。

##### 58、批量删除重复记录

```sql
DELETE t1 FROM contacts t1
JOIN contacts t2 
WHERE t1.id < t2.id 
  AND t1.email = t2.email; -- 删除重复邮箱记录（保留ID最大的记录）
```

解析：自连接对比删除重复行，比用子查询性能更高，用在数据清洗场景。若 email 允许为 NULL，NULL = NULL 返回 UNKNOWN，会导致漏删，优化：

```sql
DELETE t1 FROM contacts t1
JOIN contacts t2 
  ON (t1.email = t2.email OR (t1.email IS NULL AND t2.email IS NULL))
  AND t1.id < t2.id;
```

##### 59、批量删除重复记录（保留最新一条）

```sql
DELETE t1
FROM user_login t1
JOIN user_login t2 
  ON t1.user_id = t2.user_id 
  AND (
    -- 条件1：t1的登录时间早于t2
    t1.login_time < t2.login_time 
    -- 条件2：如果时间相同，则t1的id小于t2（确保唯一标识最新记录）
    OR (t1.login_time = t2.login_time AND t1.id < t2.id)
  );
```

解析：通过自连接对比同一用户的不同登录记录，删除“时间较早的重复记录”，用在“清理重复日志”、“去重用户行为数据”等场景。  
建议：我们要在测试环境中先预览目标数据：

```sql
-- 预览将被删除的记录
SELECT t1.*
FROM user_login t1
JOIN user_login t2 
  ON t1.user_id = t2.user_id 
  AND (
    t1.login_time < t2.login_time 
    OR (t1.login_time = t2.login_time AND t1.id < t2.id)
  );
```

##### 60、创建表（基础结构）

```sql
CREATE TABLE student (
  id INT PRIMARY KEY, -- 主键列（唯一且非空）
  name VARCHAR(50) NOT NULL, -- 姓名（非空）
  age INT,
  gender VARCHAR(10),
  class VARCHAR(20)
); -- 创建student表，定义列名、数据类型及约束
```

解析：`CREATE TABLE`创建表，需指定列名、数据类型及约束（如：`PRIMARY KEY`、`NOT NULL`）。

##### 61、创建表（含自增主键）

```sql
CREATE TABLE student (
  id INT PRIMARY KEY AUTO_INCREMENT, -- 自增主键（插入时无需指定，自动递增）
  name VARCHAR(50) NOT NULL,
  age INT
);
```

解析：`AUTO_INCREMENT`（MySQL）实现主键自增，简化插入操作，避免主键冲突。

##### 62、创建表（含默认值/唯一约束/外键）

```sql
CREATE TABLE student (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  gender VARCHAR(10) DEFAULT '未知', -- 默认值
  phone VARCHAR(20) UNIQUE, -- 唯一约束
  class_id INT,
  FOREIGN KEY (class_id) REFERENCES class(id) -- 外键约束
);
```

解析：一次性添加默认值、唯一约束、外键，确保表结构的完整性和数据有效性。

##### 63、空表复制结构

```sql
CREATE TABLE student_new LIKE student; -- 创建与student结构相同的新空表
```

解析：`LIKE`完美复制源表结构（含索引/约束），比手动建表更高效，适用于表结构备份。

##### 64、删除表（含判断存在）

```
-- 直接删除
DROP TABLE student;
-- 存在则删除（避免报错）
DROP TABLE IF EXISTS student;
```

解析：`DROP TABLE`彻底删除表（结构+数据），`IF EXISTS`避免因表不存在导致的脚本执行失败。

##### 65、修改表结构（添加/修改/删除列、重命名表）

```
-- 添加列
ALTER TABLE student ADD COLUMN address VARCHAR(100) AFTER name;
-- 修改列类型
ALTER TABLE student MODIFY COLUMN age TINYINT;
-- 修改列名+类型
ALTER TABLE student CHANGE COLUMN phone tel VARCHAR(20);
-- 删除列
ALTER TABLE student DROP COLUMN address;
-- 重命名表
ALTER TABLE student RENAME TO student_info;
```

解析：`ALTER TABLE`是表结构修改的主要语句，支持列的增删改、表名修改，满足表结构迭代需求。

#### 六、多表连接查询（66-75条）

##### 66、内连接查询（取两表交集）

```sql
SELECT s.name, c.class_name 
FROM student s 
INNER JOIN class c ON s.class_id = c.id; -- 关联学生表和班级表，取匹配记录
```

解析：`INNER JOIN`只返回两表中满足关联条件的记录，是最常用的多表连接方式。

##### 67、左连接查询（保留左表所有记录）

```sql
SELECT s.name, sc.math 
FROM student s 
LEFT JOIN score sc ON s.id = sc.stu_id; -- 保留所有学生，无成绩则显示NULL
```

解析：`LEFT JOIN`保留左表（主表）全部记录，右表无匹配时补NULL，用在“需展示主表全量数据”的场景（如：所有学生的成绩，含无成绩学生）。

##### 68、右连接查询（保留右表所有记录）

```sql
SELECT c.class_name, s.name 
FROM student s 
RIGHT JOIN class c ON s.class_id = c.id; -- 保留所有班级，无学生则显示NULL
```

解析：`RIGHT JOIN`保留右表全部记录，左表无匹配时补NULL，与左连接逻辑相反（如：展示所有班级，含空班级）。

##### 69、全连接查询（保留两表所有记录）

```sql
-- 标准语法（MySQL不直接支持，需用UNION模拟）
SELECT s.name, c.class_name 
FROM student s 
FULL OUTER JOIN class c ON s.class_id = c.id;

-- MySQL模拟全连接
SELECT s.name, c.class_name FROM student s LEFT JOIN class c ON s.class_id = c.id
UNION
SELECT s.name, c.class_name FROM student s RIGHT JOIN class c ON s.class_id = c.id;
```

解析：保留两表所有记录，无匹配则补NULL，用在需完整展示两表关联关系的场景。

##### 70、多表连接查询（三表及以上）

```sql
SELECT s.name, c.class_name, sc.math 
FROM student s 
INNER JOIN class c ON s.class_id = c.id 
INNER JOIN score sc ON s.id = sc.stu_id; -- 关联学生、班级、成绩三表
```

解析：通过多个`JOIN`关联多表，需确保每个连接有明确关联条件，适用于复杂业务数据查询（如：“学生-班级-成绩”关联）。

##### 71、自连接查询（同表关联）

```sql
SELECT e.name AS emp_name, m.name AS mgr_name 
FROM employee e 
LEFT JOIN employee m ON e.mgr_id = m.id; -- 查询员工及其直属领导（同表关联）
```

解析：将一张表视为两张表，用于查询表内层级关系（如：员工-领导、分类-子分类），是处理树形结构数据的基础。

##### 72、连接查询时筛选条件

```sql
SELECT s.name, sc.math 
FROM student s 
JOIN score sc ON s.id = sc.stu_id 
WHERE sc.math > 85; -- 关联后筛选数学成绩>85的学生
```

解析：`WHERE`子句在连接后对结果集筛选，精准定位符合条件的关联数据（如：“有高分成绩的学生”）。

##### 73、连接查询时排序与限制行数

```sql
SELECT s.name, sc.math 
FROM student s 
JOIN score sc ON s.id = sc.stu_id 
ORDER BY sc.math DESC 
LIMIT 10; -- 按数学成绩降序，取前10名学生
```

解析：连接查询结果可结合`ORDER BY`排序和`LIMIT`限制行数，快速获取“Top N”关联数据。

##### 74、连接查询时使用表别名

```sql
SELECT s.id, s.name 
FROM student s 
INNER JOIN score sc ON s.id = sc.stu_id; -- 表别名s（student）、sc（score）简化语法
```

解析：表别名缩短SQL长度，尤其在多表连接时提升可读性，`AS`可省略（直接写“表名 别名”）。

##### 75、连接查询时处理空值（COALESCE）

```sql
SELECT s.name, COALESCE(sc.math, 0) AS math_score 
FROM student s 
LEFT JOIN score sc ON s.id = sc.stu_id; -- 无成绩的学生显示0分（替代NULL）
```

解析：用`COALESCE`将NULL值替换为默认值（如：0），避免结果集中出现NULL，提升数据可读性（如：“无成绩学生按0分统计”）。

#### 七、子查询与集合操作（76-85条）

##### 76、子查询作为条件（IN/NOT IN）

```sql
-- IN：查询高一年级学生（子查询获取高一班级ID）
SELECT * FROM student 
WHERE class_id IN (SELECT id FROM class WHERE grade = '高一');

-- NOT IN：查询无成绩记录的学生
SELECT * FROM student 
WHERE id NOT IN (SELECT stu_id FROM score);
```

解析：`IN`判断主查询字段在子查询结果集中，`NOT IN`则相反，用在多值匹配或排除场景。

##### 77、子查询作为条件（EXISTS/NOT EXISTS）

```sql
-- EXISTS：查询有成绩记录的学生（存在即返回，效率优于IN）
SELECT * FROM student s 
WHERE EXISTS (SELECT 1 FROM score sc WHERE sc.stu_id = s.id);

-- NOT EXISTS：查询无成绩记录的学生
SELECT * FROM student s 
WHERE NOT EXISTS (SELECT 1 FROM score sc WHERE sc.stu_id = s.id);
```

解析：`EXISTS`仅判断子查询是否有结果（无需返回具体数据，用`SELECT 1`效率更高），避免`NOT IN`的NULL值陷阱，性能更优。

##### 78、子查询作为值（单行单列）

```sql
SELECT name, (SELECT class_name FROM class c WHERE c.id = s.class_id) AS class_name 
FROM student s; -- 子查询返回班级名称，作为主查询的一列（等效于左连接）
```

解析：子查询需返回唯一值（单行单列），又称“标量子查询”，用于为主查询补充字段数据（如：“学生-班级名称”关联）。

##### 79、子查询作为表（FROM子句）

```sql
SELECT avg_score, COUNT(*) 
FROM (SELECT class_id, AVG(score) AS avg_score FROM score GROUP BY class_id) AS class_avg 
WHERE avg_score > 80; -- 子查询作为临时表，统计平均成绩>80的班级数量
```

解析：子查询结果作为临时表（需设别名），主查询对临时表二次查询，适用于多步统计（如：“先算班级平均分，再筛选高分班级”）。

##### 80、相关子查询（依赖主查询字段）

```sql
SELECT name, (SELECT MAX(math) FROM score sc WHERE sc.stu_id = s.id) AS max_math 
FROM student s; -- 为每个学生查询其最高数学成绩（子查询依赖主查询s.id）
```

解析：相关子查询与主查询字段关联，逐行执行，用于获取与主查询记录一一对应的子查询结果（如：“每个学生的最高成绩”）。

##### 81、子查询作为条件（比较运算符）

```sql
SELECT * FROM student 
WHERE age > (SELECT AVG(age) FROM student); -- 查询年龄大于平均年龄的学生
```

解析：子查询返回单行单列值，主查询用`>`、`<`、`=`等比较运算符判断，用在“与聚合结果对比”的场景（如：“高于平均分的学生”）。

##### 82、联合查询（去重/保留重复）

```sql
-- UNION：合并结果并去重（需列数、类型一致）
SELECT name FROM student WHERE class_id = 1 
UNION 
SELECT name FROM student WHERE age > 20;

-- UNION ALL：合并结果保留重复（效率高于UNION）
SELECT name FROM student WHERE class_id = 1 
UNION ALL 
SELECT name FROM student WHERE age > 20;
```

解析：`UNION`适用于需去重的合并场景（如：“一班学生+20岁以上学生，去重”），`UNION ALL`用在无需去重的场景（效率更高）。

##### 83、分组后取每组前N条（子查询+窗口函数）

```sql
-- 子查询+ROW_NUMBER()（推荐，高效）
SELECT *
FROM (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY class ORDER BY score DESC) AS rn
  FROM student
) AS t
WHERE rn <= 3; -- 每个班级成绩前3名学生

-- 子查询+LIMIT（适用于低版本数据库）
SELECT * FROM student s
WHERE (SELECT COUNT(*) FROM student s2 WHERE s2.class = s.class AND s2.score >= s.score) <= 3;
```

解析：窗口函数`ROW_NUMBER()`是分组取Top N的高效方案，低版本数据库可通过子查询+`COUNT(*)`实现（性能略低）。

##### 84、递归查询树形结构（WITH RECURSIVE）

```sql
WITH RECURSIVE cte AS (
  SELECT id, name, parent_id FROM category WHERE parent_id IS NULL  -- 顶层节点（如：“家电”）
  UNION ALL
  SELECT c.id, c.name, c.parent_id 
  FROM category c
  JOIN cte ON c.parent_id = cte.id  -- 递归关联子节点（如：“家电-冰箱”）
)
SELECT * FROM cte; -- 查询完整分类树（顶层+所有子节点）
```

解析：`WITH RECURSIVE`（MySQL 8.0+/PostgreSQL）实现递归查询，适用于组织架构、多级分类等树形数据，效率远高于多次循环查询。Oracle适配版本为：

```sql
-- Oracle 递归查询（替代 WITH RECURSIVE）
SELECT id, name, parent_id
FROM category
START WITH parent_id IS NULL  -- 顶层节点条件
CONNECT BY PRIOR id = parent_id;  -- 递归关联（父节点id = 子节点parent_id）
```

##### 85、子查询中使用聚合函数

```sql
SELECT class, 
       (SELECT MAX(score) FROM student s2 WHERE s2.class = s1.class) AS max_score,
       (SELECT MIN(score) FROM student s2 WHERE s2.class = s1.class) AS min_score
FROM student s1
GROUP BY class; -- 按班级查询最高/最低分（子查询用聚合函数）
```

解析：子查询中嵌套聚合函数，为每个分组（如：班级）计算对应的聚合值（最高/最低分），实现“分组+多维度聚合”的灵活查询，用在需要精细化统计的场景。

#### 八、日期与字符串处理（86-95条）

##### 86、获取当前日期/时间

```sql
-- 当前日期时间（如：2024-05-20 15:30:45）
SELECT NOW();
-- 当前日期（如：2024-05-20）
SELECT CURDATE();
-- 当前时间（如：15:32:10）
SELECT CURTIME();
```

解析：日常开发中高频用于记录“创建时间”、“操作时间”，如：插入数据时自动填充当前时间（`INSERT INTO table (create_time) VALUES (NOW())`）。

##### 87、日期格式化

```sql
SELECT DATE_FORMAT(create_time, '%Y年%m月%d日 %H:%i:%s') AS create_date 
FROM student; -- 格式化为“2024年05月20日 15:30:45”
```

解析：`DATE_FORMAT`按指定格式转换日期，常用格式符：`%Y`（4位年）、`%m`（2位月）、`%d`（2位日）、`%H`（24小时）、`%i`（分钟）、`%s`（秒），用在报表展示、日志输出等场景。

##### 88、日期增减计算

```sql
-- 日期加7天（下周今天）
SELECT DATE_ADD(CURDATE(), INTERVAL 7 DAY) AS next_week;
-- 日期减1个月（上月今天）
SELECT DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AS last_month;
-- 时间加2小时（如：订单超时时间计算）
SELECT DATE_ADD(NOW(), INTERVAL 2 HOUR) AS expire_time;
```

解析：`DATE_ADD`（加）和`DATE_SUB`（减）支持多种时间单位（DAY、MONTH、YEAR、HOUR等），是我们计算“有效期”、“到期时间”、“周期数据”的主要语句。

##### 89、计算时间差

```sql
-- 计算任务耗时（小时）
SELECT TIMESTAMPDIFF(HOUR, start_time, end_time) AS hours_diff FROM tasks;
-- 计算两个日期相差天数（如：用户注册天数）
SELECT DATEDIFF(CURDATE(), register_time) AS register_days FROM users;
```

解析：`TIMESTAMPDIFF`支持秒、分、时、天等多单位，精准计算时间差；`DATEDIFF`专门计算日期差（仅日期部分，忽略时间），用在“注册天数”、“订单间隔”等场景。

##### 90、字符串连接

```sql
-- 连接姓名和性别（如：“张三（男）”）
SELECT CONCAT(name, '（', gender, '）') AS stu_info FROM student;
-- 连接多字段并处理NULL（NULL时显示空字符串）
SELECT CONCAT_WS('', name, '-', COALESCE(phone, '未填写')) AS user_info FROM users;
```

解析：`CONCAT`连接多个字符串（有NULL则结果为NULL）；`CONCAT_WS`（带分隔符）可指定分隔符，且自动忽略NULL，适用于“组合展示多字段”（如：姓名+联系方式）。

##### 91、字符串截取与替换

```sql
-- 截取姓名第一个字符（如：“张”）
SELECT SUBSTRING(name, 1, 1) AS first_char FROM student;
-- 截取手机号后4位（如：“1234”）
SELECT RIGHT(phone, 4) AS phone_suffix FROM users;
-- 替换字符串（将“一班”改为“1班”）
SELECT REPLACE(class, '一班', '1班') AS new_class FROM student;
```

解析：`SUBSTRING`（指定起始位置和长度）、`RIGHT`（从右侧截取）适用于提取部分字符；`REPLACE`用于批量替换字符串，是我们进行数据清洗、格式统一的常用语句。

##### 92、字符串大小写转换

```sql
-- 姓名转大写
SELECT UPPER(name) FROM student;
-- 邮箱转小写（统一邮箱格式）
SELECT LOWER(email) FROM users;
```

解析：`UPPER`（转大写）和`LOWER`（转小写）用于统一字符串格式，避免因大小写不一致导致的查询错误（如：邮箱登录时“张三@xxx.com”和“ZHANG@xxx.com”视为同一账号）。

##### 93、去除字符串空格

```sql
-- 去除姓名前后空格（清理脏数据）
SELECT TRIM(name) FROM student;
-- 去除左侧空格
SELECT LTRIM(remark) FROM orders;
-- 去除右侧空格
SELECT RTRIM(address) FROM users;
```

解析：`TRIM`（首尾）、`LTRIM`（左侧）、`RTRIM`（右侧）用于清理数据中的多余空格，避免因空格导致的“匹配失败”（如：查询“张三 ”时无法匹配“张三”）。

##### 94、字符串长度计算

```sql
-- 计算姓名长度（用于验证姓名长度是否符合要求）
SELECT name, LENGTH(name) AS name_length FROM student WHERE LENGTH(name) > 10;
```

解析：`LENGTH`计算字符串字节数（中文占3字节，英文占1字节），`CHAR_LENGTH`计算字符数，适用于“字段长度校验”（如：姓名不超过10字符）。

##### 95、日期与字符串转换

```sql
-- 字符串转日期（需匹配格式，如：“2024-05-20”转日期类型）
SELECT STR_TO_DATE('2024-05-20', '%Y-%m-%d') AS date_val;
-- 日期转字符串（如：日期类型转“20240520”格式）
SELECT DATE_FORMAT(CURDATE(), '%Y%m%d') AS date_str;
```

解析：`STR_TO_DATE`将字符串按指定格式转为日期类型（用于导入数据时格式统一）；`DATE_FORMAT`将日期转为字符串（用于拼接或特定格式输出）。

#### 九、事务与约束（96-105条）

##### 96、事务基础操作（开启/提交/回滚）

```sql
-- 开启事务
BEGIN; -- 或 START TRANSACTION
-- 执行操作（如：转账：A减100，B加100）
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
-- 提交事务（操作永久生效）
COMMIT;
-- 若出错，回滚事务（撤销所有操作）
-- ROLLBACK;
```

解析：事务确保“多步操作同时成功或同时失败”，避免数据不一致（如：转账时只扣钱未加钱），是金融、支付等核心业务的必备机制。

##### 97、设置事务隔离级别

```sql
-- 查看当前隔离级别（MySQL）
SELECT @@tx_isolation;
-- 设置隔离级别（读已提交，常用）
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

解析：事务隔离级别解决“脏读、不可重复读、幻读”问题，常用级别：`READ COMMITTED`（读已提交，避免脏读）、`REPEATABLE READ`（可重复读，MySQL默认，避免不可重复读）。

##### 98、添加主键约束

```sql
-- 创建表时添加主键
CREATE TABLE student (id INT PRIMARY KEY, name VARCHAR(50));
-- 已有表添加主键
ALTER TABLE student ADD PRIMARY KEY (id);
```

解析：主键确保字段唯一且非空，是表的主要标识（如：学生ID、订单ID），一张表只能有一个主键。

##### 99、添加唯一约束

```sql
-- 创建表时添加唯一约束（手机号唯一）
CREATE TABLE student (id INT PRIMARY KEY, phone VARCHAR(20) UNIQUE);
-- 已有表添加唯一约束
ALTER TABLE student ADD UNIQUE (phone);
```

解析：唯一约束确保字段值不重复（可多个，区别于主键），适用于手机号、邮箱等需唯一的字段，允许NULL（但NULL只允许一个）。

##### 100、添加非空约束

```sql
-- 创建表时添加非空约束（姓名必填）
CREATE TABLE student (id INT PRIMARY KEY, name VARCHAR(50) NOT NULL);
-- 已有表添加非空约束
ALTER TABLE student MODIFY COLUMN name VARCHAR(50) NOT NULL;
```

解析：非空约束确保字段必须有值，避免关键信息缺失（如：姓名、订单金额），是数据完整性的基础约束。

##### 101、添加默认值约束

```sql
-- 创建表时添加默认值（性别默认“未知”，创建时间默认当前时间）
CREATE TABLE student (
  id INT PRIMARY KEY,
  gender VARCHAR(10) DEFAULT '未知',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
-- 已有表添加默认值
ALTER TABLE student MODIFY COLUMN gender VARCHAR(10) DEFAULT '未知';
```

解析：默认值约束在插入数据未指定该字段时自动填充（如：创建时间自动填当前时间），减少重复代码。

##### 102、添加外键约束

```sql
-- 创建表时添加外键（score表的stu_id关联student表的id）
CREATE TABLE score (
  id INT PRIMARY KEY,
  stu_id INT,
  math INT,
  FOREIGN KEY (stu_id) REFERENCES student(id)
    ON DELETE CASCADE -- 主表记录删除时，子表关联记录也删除
    ON UPDATE CASCADE -- 主表外键关联的字段（主键/唯一键）更新时，子表关联字段也更新
);
-- 已有表添加外键
ALTER TABLE score ADD FOREIGN KEY (stu_id) REFERENCES student(id);
```

解析：外键确保子表关联字段在主表中存在（如：成绩表的学生ID必须在学生表中），`ON DELETE/UPDATE CASCADE`实现主从表数据同步更新/删除，避免数据孤儿（子表有主表不存在的ID）。

##### 103、添加检查约束

```sql
-- 创建表时添加检查约束（年龄1-100岁）
CREATE TABLE student (
  id INT PRIMARY KEY,
  age INT CHECK (age BETWEEN 1 AND 100)
);
-- 已有表添加检查约束
ALTER TABLE student ADD CONSTRAINT chk_age CHECK (age BETWEEN 1 AND 100);
```

解析：检查约束限制字段值范围（如：年龄≥1、价格＞0），从数据库层确保数据有效性，比应用层校验更可靠（避免绕过应用直接操作数据库的非法数据）。

##### 104、删除约束

```
-- 删除主键
ALTER TABLE student DROP PRIMARY KEY;
-- 删除唯一约束（需指定约束名，可通过DESC表查看）
ALTER TABLE student DROP INDEX phone;
-- 删除外键（需指定约束名）
ALTER TABLE score DROP FOREIGN KEY score_ibfk_1;
-- 删除检查约束
ALTER TABLE student DROP CONSTRAINT chk_age;
```

解析：约束可按需删除，需注意：删除主键前需先删除依赖它的外键；删除唯一约束需指定索引名（唯一约束会自动创建索引）。

##### 105、设置自增主键起始值

```sql
-- 创建表时设置自增起始值（从100开始）
CREATE TABLE student (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50)) AUTO_INCREMENT = 100;
-- 已有表修改自增起始值
ALTER TABLE student AUTO_INCREMENT = 200;
```

解析：自增主键默认从1开始，可通过`AUTO_INCREMENT`修改起始值（如：从100、1000开始，避免与历史数据冲突），用在数据迁移、分表等场景。

#### 十、索引与性能优化（106-115条）

##### 106、创建单列索引

```
-- 普通索引（用于查询条件）
CREATE INDEX idx_student_name ON student(name);
-- 唯一索引（字段唯一，同时加速查询）
CREATE UNIQUE INDEX idx_student_phone ON student(phone);
```

解析：单列索引适用于“经常作为查询条件的单个字段”（如：按姓名查学生、按手机号查用户），唯一索引兼具“唯一约束”和“查询加速”功能。

##### 107、创建复合索引

```
-- 复合索引（按class+score查询，遵循“最左前缀原则”）
CREATE INDEX idx_student_class_score ON student(class, score);
```

解析：复合索引适用于“查询条件中经常同时出现的多个字段”（如：“按班级+成绩查询学生”），需遵循“最左前缀原则”（如：`WHERE class = '一班'`可命中索引，`WHERE score > 80`无法命中），比单建多个单列索引更高效。

##### 108、创建前缀索引

```
-- 前缀索引（对长字符串字段，只索引前10个字符，节省空间）
CREATE INDEX idx_user_email ON user(email(10));
```

解析：前缀索引适用于长字符串字段（如：邮箱、地址），只索引前N个字符（需确保前N个字符区分度足够），平衡查询效率和存储空间（避免全字段索引占用过大空间）。

##### 109、创建函数索引（函数索引）

```
-- 函数索引（用在“按日期的年月查询”场景，如：WHERE DATE_FORMAT(create_time, '%Y%m') = '202405'）
CREATE INDEX idx_order_create_month ON orders(DATE_FORMAT(create_time, '%Y%m'));
```

解析：普通索引无法命中“字段使用函数的查询”（如：`WHERE UPPER(name) = 'ZHANG'`），函数索引专门解决此类场景，需注意：函数逻辑需与查询完全一致（如：索引是`DATE_FORMAT(create_time, '%Y%m')`，查询也必须用相同格式）。

##### 110、删除索引

```
-- 删除普通索引/唯一索引（需指定索引名，可通过SHOW INDEX FROM表查看）
DROP INDEX idx_student_name ON student;
```

解析：索引并非越多越好（会减慢插入/更新/删除速度），当字段不再作为查询条件、表数据量极小时，可删除无用索引；删除前需确认索引无查询依赖。

##### 111、查看表的索引信息

```sql
-- 查看student表的所有索引
SHOW INDEX FROM student;
-- 或通过information_schema查询（更详细）
SELECT * FROM information_schema.STATISTICS WHERE TABLE_NAME = 'student';
```

解析：查看索引信息可确认“索引是否存在、索引类型、关联字段、是否唯一”等，用于排查“查询未命中索引”、“重复索引”等问题。

##### 112、分析查询执行计划（EXPLAIN）

```sql
-- 分析“按姓名查学生”的执行计划
EXPLAIN SELECT * FROM student WHERE name = '张三';
```

解析：`EXPLAIN`展示SQL执行过程的关键信息，重点关注：

*   `type`：查询类型（`ALL`为全表扫描，`ref`/`range`为索引扫描，`const`为常量查询，性能从差到好）；
    
*   `key`：实际使用的索引（为NULL表示未命中索引）；
    
*   `rows`：预计扫描的行数（越少越好）；
    
*   `Extra`：额外信息（如：`Using index`表示覆盖索引，`Using filesort`表示文件排序，需优化）。
    

##### 113、优化分组排序（避免Using filesort）

```sql
-- 优化前（可能触发文件排序，效率低）
SELECT class, AVG(score) FROM student GROUP BY class ORDER BY AVG(score);

-- 优化后（创建复合索引，利用索引排序，避免文件排序）
CREATE INDEX idx_student_class_score ON student(class, score);
SELECT class, AVG(score) FROM student GROUP BY class ORDER BY AVG(score);
```

解析：`GROUP BY`和`ORDER BY`同时使用时，若未命中索引，会触发`Using filesort`（内存/磁盘排序，效率低）；通过创建“分组字段+排序字段”的复合索引，可利用索引天然有序性，避免文件排序。

##### 114、优化分页查询（避免Offset过大）

```sql
-- 优化前（Offset=10000，需扫描10010行，效率低）
SELECT * FROM student ORDER BY id LIMIT 10 OFFSET 10000;

-- 优化后（用主键过滤，直接定位起始位置，扫描10行）
SELECT * FROM student WHERE id > 10000 ORDER BY id LIMIT 10;
```

解析：当`Offset`过大时（如：分页第1001页，`Offset=10000`），`LIMIT Offset, Size`需扫描`Offset+Size`行后丢弃前`Offset`行，效率极低；通过“主键/唯一索引过滤”（如：`id > 10000`），直接定位到起始位置，仅扫描`Size`行，可大幅提升性能。  
说明：该优化方案（“用主键过滤替代大 Offset”）仅适用于“按主键/唯一索引排序”的场景（不要误解为“所有分页场景都适用”）：

*   若排序字段不是主键/唯一索引（如：`ORDER BY score DESC`），无法直接用`score > 某个值`定位（因为分数可能重复，导致漏查/多查）；
    
*   若必须按非唯一字段排序，需结合“覆盖索引 + 主键”实现，如：
    

```sql
-- 创建索引: CREATE INDEX idx_score_id ON student(score DESC, id);
SELECT * FROM student
WHERE (score, id) < (85, 10000)  -- 上一页最后一条记录的score和id
ORDER BY score DESC, id DESC
LIMIT 10;
```

##### 115、使用覆盖索引（避免回表）

```sql
-- 优化前（查询所有列，需先查索引再回表取数据，效率低）
SELECT * FROM student WHERE class = '一班';

-- 优化后（只查索引包含的列，无需回表，效率高）
CREATE INDEX idx_student_class_name_score ON student(class, name, score); -- 复合索引包含class、name、score
SELECT name, score FROM student WHERE class = '一班';
```

解析：覆盖索引指“查询的列全部包含在索引中”，无需通过索引回到表中获取其他字段数据（避免“回表”操作），`EXPLAIN`中会显示`Using index`，是我们提升查询效率的重要优化手段，用在“只需要部分字段”的查询场景（如：列表展示、统计汇总）。

#### 十一、高级特性（116-125条）

##### 116、窗口函数（分组排名）

```sql
-- RANK()：并列跳号（如：1,1,3）
SELECT name, class, score,
       RANK() OVER (PARTITION BY class ORDER BY score DESC) AS rank
FROM student;

-- DENSE_RANK()：并列不跳号（如：1,1,2）
SELECT name, class, score,
       DENSE_RANK() OVER (PARTITION BY class ORDER BY score DESC) AS dense_rank
FROM student;

-- ROW_NUMBER()：无并列（如：1,2,3）
SELECT name, class, score,
       ROW_NUMBER() OVER (PARTITION BY class ORDER BY score DESC) AS row_num
FROM student;
```

解析：窗口函数（MySQL 8.0+/PostgreSQL/SQL Server）无需`GROUP BY`即可实现分组统计，`PARTITION BY`指定分组字段（如：班级），`ORDER BY`指定分组内排序字段（如：成绩），用在“分组排名”、“Top N”、“分组内累计值”等场景，比子查询方案更简洁、高效。

##### 117、窗口函数（分组内累计/占比）

```sql
-- 分组内累计成绩（如：每个班级按成绩降序，累计当前及之前学生的成绩和）
SELECT name, class, score,
       SUM(score) OVER (PARTITION BY class ORDER BY score DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS total_score
FROM student;

-- 分组内成绩占比（如：每个学生成绩占班级总成绩的百分比）
SELECT name, class, score,
       CONCAT(ROUND(score / SUM(score) OVER (PARTITION BY class) * 100, 2), '%') AS score_ratio
FROM student;
```

解析：窗口函数支持复杂的“窗口范围”定义（如：`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`表示“从分组起始到当前行”），可实现累计值、平均值、占比等高级统计，用在财务分析（累计销售额）、运营分析（用户贡献占比）等场景。

##### 118、创建视图（简化查询）

```sql
-- 创建普通视图（学生+班级+成绩关联结果）
CREATE VIEW stu_class_score AS
SELECT s.id, s.name, c.class_name, sc.math, sc.english
FROM student s
LEFT JOIN class c ON s.class_id = c.id
LEFT JOIN score sc ON s.id = sc.stu_id;

-- 查询视图（无需重复写关联逻辑）
SELECT * FROM stu_class_score WHERE class_name = '一班';
```

解析：视图是“虚拟表”，存储的是查询逻辑而非实际数据，适用于：

*   简化复杂查询（如：多表关联、子查询，后续查询直接用视图）；
    
*   权限控制（只给用户视图访问权限，隐藏原始表结构和敏感字段）；
    
*   统一数据口径（多业务场景复用同一视图，避免查询逻辑不一致）。
    

##### 119、创建可更新视图（带检查约束）

```sql
-- 创建可更新视图（只包含“active”状态的学生，且更新时不能修改状态为非active）
CREATE VIEW active_students AS
SELECT id, name, class, status
FROM student
WHERE status = 'active'
WITH CHECK OPTION; -- 确保通过视图的更新/插入不违反WHERE条件

-- 通过视图更新（允许，状态仍为active）
UPDATE active_students SET class = '二班' WHERE id = 1;
-- 通过视图更新（禁止，会导致状态不符合视图条件，报错）
UPDATE active_students SET status = 'inactive' WHERE id = 1;
```

解析：普通视图默认可更新（需满足“单表来源、无聚合函数/DISTINCT”等条件），`WITH CHECK OPTION`确保“通过视图修改的数据仍满足视图的筛选条件”，避免出现“视图中看不到但实际存在的异常数据”，用在业务规则严格的场景（如：只允许操作活跃用户）。

##### 120、创建存储过程（封装业务逻辑）

```sql
-- 创建存储过程（根据班级和Top N，查询成绩前N的学生）
DELIMITER // -- 临时修改语句结束符（避免与存储过程中的;冲突）
CREATE PROCEDURE GetTopStuByClass(
  IN in_class_name VARCHAR(20), -- 输入参数：班级名称
  IN in_top_num INT, -- 输入参数：Top N
  OUT out_total INT -- 输出参数：该班级总人数
)
BEGIN
  -- 查询Top N学生
  SELECT * FROM student 
  WHERE class = in_class_name
  ORDER BY score DESC
  LIMIT in_top_num;

  -- 计算班级总人数，赋值给输出参数
  SELECT COUNT(*) INTO out_total FROM student WHERE class = in_class_name;
END //
DELIMITER ; -- 恢复语句结束符

-- 调用存储过程（查询一班前5名学生，获取总人数）
CALL GetTopStuByClass('一班', 5, @total);
-- 查看输出参数结果
SELECT @total AS class_total;
```

解析：存储过程是“预编译的SQL集合”，存储在数据库中，适用于：

*   封装复杂业务逻辑（如：多步插入、更新、查询，减少应用层与数据库的交互次数）；
    
*   隐藏SQL细节（应用层只需调用过程，无需关注内部实现）；
    
*   支持参数传递（`IN`输入参数、`OUT`输出参数、`INOUT`双向参数），灵活性高，常用在报表生成、批量处理、业务规则执行等场景。
    

##### 121、创建函数（返回计算结果）

```sql
-- 创建函数（根据学生ID，返回其“姓名+班级”的拼接字符串）
DELIMITER //
-- 创建一个名为GetStuInfo的函数，用于根据学生ID查询并返回班级信息
-- 函数作用：输入学生ID，返回"姓名-班级"格式的字符串（如："张三-一班"）
CREATE FUNCTION GetStuInfo(
  in_stu_id INT  -- 输入参数：学生ID（整数类型），用于定位具体学生
) 
RETURNS VARCHAR(100)  -- 函数返回值类型：字符串（最大长度100字符）
NOT DETERMINISTIC  -- 非确定性函数标识：相同输入可能返回不同结果（因student表数据可能变化）
-- 注意：若函数结果不依赖外部表数据（如纯计算逻辑），可使用DETERMINISTIC（确定性）
BEGIN
  -- 声明局部变量：用于存储查询到的学生信息（姓名+班级拼接结果）
  DECLARE out_info VARCHAR(100);

  -- 核心逻辑：根据输入的学生ID查询对应记录，将"姓名-班级"拼接后存入变量
  -- （1）从student表中查询id等于输入参数in_stu_id的记录
  -- （2）使用CONCAT函数拼接name（姓名）和class（班级），中间用"-"分隔
  -- （3）通过INTO关键字将拼接结果赋值给局部变量out_info
  SELECT CONCAT(name, '-', class) INTO out_info 
  FROM student 
  WHERE id = in_stu_id;  -- 条件：仅匹配ID等于输入参数的学生

  -- 将拼接好的学生信息返回（若学生ID不存在，out_info为NULL）
  RETURN out_info;
END //
DELIMITER ;

-- 调用函数（查询ID=1的学生信息）
SELECT GetStuInfo(1) AS stu_info;
```

解析：函数与存储过程类似，但主要区别是“函数必须返回值，且只能用于查询语句中”，用在“基于输入参数计算并返回单一结果”的场景（如：数据格式化、值转换、简单统计），不能用于执行插入/更新/删除操作（存储过程可以）。

##### 122、创建触发器（自动执行操作）

```sql
-- 创建触发器（学生表插入数据后，自动向日志表插入记录）
DELIMITER //
CREATE TRIGGER trg_stu_after_insert
AFTER INSERT ON student -- 触发时机：插入后；触发表：student
FOR EACH ROW -- 行级触发器（每插入一行触发一次）
BEGIN
  -- 插入日志：操作类型、学生ID、操作时间
  INSERT INTO operate_log (operate_type, target_id, operate_time)
  VALUES ('INSERT_STU', NEW.id, NOW()); -- NEW代表插入的新记录
END //
DELIMITER ;

-- 创建触发器（学生表更新成绩前，记录旧成绩到日志）
DELIMITER //
CREATE TRIGGER trg_stu_before_update
BEFORE UPDATE ON student -- 触发时机：更新前
FOR EACH ROW
BEGIN
  -- 若成绩有变化，记录旧值
  IF OLD.score != NEW.score THEN
    INSERT INTO score_log (stu_id, old_score, new_score, update_time)
    VALUES (OLD.id, OLD.score, NEW.score, NOW()); -- OLD代表更新前的旧记录
  END IF;
END //
DELIMITER ;
```

解析：触发器是“自动执行的SQL逻辑”，无需手动调用，当满足“触发时机（BEFORE/AFTER）+触发事件（INSERT/UPDATE/DELETE）”时自动执行，适用于：

*   数据审计（记录数据变更日志，如：谁修改了成绩、修改前后的值）；
    
*   数据同步（如：学生表插入后，自动同步到备份表）；
    
*   业务规则校验（如：更新成绩前，检查新成绩是否在0-100之间，不满足则报错），是我们确保数据完整性和一致性的重要工具。
    

##### 123、使用变量（会话变量/局部变量）

```sql
-- （1）会话变量（当前连接生效，用@标识）
-- 定义会话变量（赋值当前日期）
SET @current_date = CURDATE();
-- 使用会话变量（查询当天注册的用户）
SELECT * FROM users WHERE DATE(register_time) = @current_date;

-- （2）局部变量（仅在存储过程/函数中生效，需DECLARE声明）
DELIMITER //
CREATE PROCEDURE CalcAvgScore()
BEGIN
  DECLARE avg_sc FLOAT; -- 声明局部变量
  -- 计算平均成绩赋值给变量
  SELECT AVG(score) INTO avg_sc FROM student;
  -- 使用局部变量（查询高于平均分的学生）
  SELECT * FROM student WHERE score > avg_sc;
END //
DELIMITER ;
```

解析：变量用于存储临时数据，分为：

*   会话变量（`@var`）：当前数据库连接生效，可跨SQL语句使用，适用于临时存储查询条件、中间结果；
    
*   局部变量（`DECLARE var`）：仅在存储过程/函数内部生效，作用域有限，适用于封装逻辑中的临时计算。
    

##### 124、条件判断（IF/CASE）

```sql
-- （1）IF函数（简单二分支）
SELECT name, age,
       IF(age >= 18, '成年', '未成年') AS age_type -- 年龄≥18显示成年，否则未成年
FROM student;

-- （2）IF语句（多分支，用于存储过程/函数）
DELIMITER //
CREATE PROCEDURE JudgeScore(in_score INT)
BEGIN
  IF in_score >= 90 THEN
    SELECT '优秀' AS score_level;
  ELSEIF in_score >= 80 THEN
    SELECT '良好' AS score_level;
  ELSE
    SELECT '及格' AS score_level;
  END IF;
END //
DELIMITER ;

-- （3）CASE表达式（多分支，支持复杂条件）
SELECT name, score,
       CASE 
           WHEN score >= 90 THEN '优秀'
           WHEN score >= 80 THEN '良好'
           WHEN score >= 60 THEN '及格'
           ELSE '不及格'
       END AS score_level,
       CASE class
           WHEN '一班' THEN '重点班'
           WHEN '二班' THEN '普通班'
           ELSE '其他'
       END AS class_type
FROM student;
```

解析：条件判断是SQL逻辑控制的核心，`IF`适用于简单二分支，`CASE`适用于多分支（支持“等值匹配”和“范围条件”），可用于查询结果格式化（如：成绩分级、状态转换）、存储过程/函数中的业务逻辑分支，是实现动态数据处理的基础。

##### 125、处理NULL值（COALESCE/IFNULL）

```sql
-- （1）IFNULL（二值判断，NULL则替换为指定值）
SELECT name, IFNULL(phone, '未填写') AS phone -- 手机号为NULL时显示“未填写”
FROM student;

-- （2）COALESCE（多值判断，返回第一个非NULL值）
SELECT name, 
       COALESCE(phone, email, '无联系方式') AS contact -- 优先取手机号，无则取邮箱，都无则显示“无联系方式”
FROM student;

-- （3）NULLIF（两值相等则返回NULL，否则返回第一个值）
SELECT NULLIF(score, 0) AS real_score -- 成绩为0时返回NULL，否则返回实际成绩
FROM student;
```

解析：NULL值是数据库中常见的“缺失数据”，直接使用会导致`SUM`/`AVG`等聚合函数忽略该值、`CONCAT`返回NULL等问题，`IFNULL`/`COALESCE`/`NULLIF`用于将NULL值替换为合理内容或过滤无效NULL，确保查询结果的可读性和准确性，是我们进行数据清洗和结果展示的必备语句。

#### 十二、数据库管理与维护（126-130条）

##### 126、查看数据库列表

```sql
-- MySQL
SHOW DATABASES;
-- SQL Server
SELECT name FROM sys.databases;
-- Oracle
SELECT name FROM v$database;
```

解析：查看当前数据库实例下的所有数据库，用在“确认目标数据库是否存在”、“切换数据库前的准备”等场景，是数据库管理的基础操作。

##### 127、切换数据库

```
-- MySQL/SQL Server
USE school_db; -- 切换到school_db数据库
-- Oracle（通过用户切换，需先创建用户并授权）
ALTER SESSION SET CURRENT_SCHEMA = school_user;
```

解析：切换数据库后，后续SQL语句默认操作当前数据库中的表，无需每次写“数据库.表”的完整路径，简化操作。

##### 128、备份表数据（CREATE TABLE ... SELECT）

```sql
-- 备份student表的“一班”学生数据到student_bak（含数据和结构）
CREATE TABLE student_bak AS
SELECT * FROM student WHERE class = '一班';

-- 只备份表结构（不含数据）
CREATE TABLE student_struct_bak AS
SELECT * FROM student WHERE 1 = 2; -- WHERE条件恒假，无数据
```

解析：快速备份表的结构或部分数据，用在“数据迁移前备份”、“临时测试数据准备”、“历史数据归档”等场景，比`INSERT INTO ..、SELECT`更简洁（无需提前创建目标表）。

##### 129、查看表的创建语句（SHOW CREATE TABLE）

```sql
SHOW CREATE TABLE student;
```

解析：查看表的完整创建语句，包含字段名、数据类型、约束（主键/外键/唯一）、索引、表注释等所有结构信息，用在“复制表结构到其他数据库”、“排查表结构差异”、“备份表结构脚本”等场景，比`DESCRIBE`更详细。

##### 130、优化表（碎片整理/统计信息更新）

```sql
-- MySQL InnoDB 表优化（整理碎片、更新统计信息）
ALTER TABLE student ENGINE=InnoDB;

-- MySQL（InnoDB表，优化碎片、更新统计信息）
OPTIMIZE TABLE student;

-- PostgreSQL（更新统计信息，帮助优化器生成更好的执行计划）
ANALYZE student;

-- SQL Server（更新统计信息）
UPDATE STATISTICS student;
```

解析：数据库表长期执行插入/更新/删除操作后，会产生“数据碎片”（导致查询变慢）、“统计信息过时”（导致优化器生成低效执行计划），`OPTIMIZE`/`ANALYZE`/`UPDATE STATISTICS`用于整理碎片、更新表统计信息，提升查询性能，是我们进行数据库日常维护的重要操作，建议定期执行（如：每周一次）。