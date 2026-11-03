---
title: SQL英语术语手册，12大技术领域核心术语中英文对照与释义
lastUpdated: 2026-06-24 04:00:00
---


SQL英语术语手册，汇集SQL核心概念与现代数据库技术要点，覆盖SQL：基础术语、DDL、DML、DQL、函数、存储过程、事务、设计、高可用、优化、安全、跨库差异等12大技术领域的核心术语，可作为全栈工程师、DBA、数据分析师及SQL教学的参考指南。

* * *

#### **一、SQL基础术语**

| **英文术语** | **中文释义** | **技术细节** |
| --- | --- | --- |
| **SQL** | 结构化查询语言 | ISO标准数据库查询语言 |
| **Database** | 数据库 | 结构化数据存储容器 |
| **Table** | 表 | 行列组成的二维数据结构 |
| **Row/Record** | 行/记录 | 表示完整实体的数据单元 |
| **Column/Field** | 列/字段 | 数据属性描述 |
| **Schema** | 模式 | 数据库逻辑结构蓝图 |
| **Data Type** | 数据类型 | 定义字段存储格式（INT,DATE,JSON等） |
| **Primary Key** | 主键 | 唯一标识符（NOT NULL + UNIQUE） |
| **Foreign Key** | 外键 | 跨表引用完整性约束 |
| **Index** | 索引 | 加速查询的数据结构（B-tree/Bitmap） |
| **Constraint** | 约束 | 数据完整性规则集 |
| **View** | 视图 | 虚拟的动态结果集 |
| **Materialized View** | 物化视图 | 实体化的查询结果（定期刷新） |
| **Cursor** | 游标 | 结果集遍历指针 |
| **ACID Properties** | ACID特性 | 事务四大保障机制 |
| **NULL** | 空值 | 三值逻辑特殊状态 |
| **DBMS/RDBMS** | 数据库管理系统 | 如MySQL, Oracle, SQL Server |
| **Query** | 查询 | 数据检索指令 |
| **Statement** | 语句 | 完整SQL执行单元 |
| **Transaction** | 事务 | 原子操作序列 |
| **Tuple** | 元组 | 关系的数学表述 |
| **Attribute** | 属性 | 列的数学表述 |
| **Catalog** | 目录 | 数据库元数据容器 |
| **Domain** | 域 | 字段允许值集合 |
| **Data Dictionary** | 数据字典 | 系统元数据仓库 |
| **Instance** | 实例 | 数据库运行进程 |
| **Connection** | 连接 | 会话通道 |
| **Cursor Sensitivity** | 游标敏感性 | 感知底层数据变化（SENSITIVE/INSENSITIVE） |
| **Savepoint** | 保存点 | 事务部分回滚点 |
| **Relational Algebra** | 关系代数 | SQL数学基础（投影/选择/连接） |
| **Cardinality** | 基数 | 表行数估算值 |
| **Selectivity** | 选择性 | 谓词过滤效率指标 |
| **Predicate** | 谓词 | WHERE条件表达式 |
| **Projection** | 投影 | SELECT列选择操作 |
| **Cartesian Product** | 笛卡尔积 | 未连接表的全组合 |
| **Degree** | 度 | 表的列数 |

* * *

#### **二、数据定义语言（DDL）**

| **命令** | **功能** | **语法示例** |
| --- | --- | --- |
| **CREATE DATABASE** | 创库 | `CREATE DATABASE SalesDB CHARSET=utf8mb4;` |
| **CREATE TABLE** | 创表 | `CREATE TABLE Users (ID INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(50) NOT NULL);` |
| **CREATE INDEX** | 创索引 | `CREATE INDEX idx_email ON Users(Email) USING HASH;` |
| **CREATE VIEW** | 创视图 | `CREATE VIEW vw_active AS SELECT id,name FROM Users WHERE active=1;` |
| **ALTER TABLE** | 改结构 | `ALTER TABLE Users ADD COLUMN birthdate DATE AFTER name;` |
| **DROP TABLE** | 删表 | `DROP TABLE IF EXISTS TempData;` |
| **DROP DATABASE** | 删库 | `DROP DATABASE ArchiveDB CASCADE;` |
| **TRUNCATE TABLE** | 清表 | 原子操作且重置自增值 |
| **RENAME TABLE** | 表重命名 | MySQL：`RENAME TABLE old TO new;` |
| **COMMENT** | 注释 | PostgreSQL：`COMMENT ON COLUMN Users.name IS '用户全名';` |
| **CHECK Constraint** | 检查约束 | `CREATE TABLE Orders (Amount DECIMAL CHECK (Amount > 0));` |
| **DEFAULT** | 默认值 | `CREATE TABLE Logs (ctime DATETIME DEFAULT CURRENT_TIMESTAMP);` |
| **AUTO\_INCREMENT** | 自增列 | MySQL特有的序列实现 |
| **IDENTITY** | 自增列 | SQL Server标准实现 |
| **SEQUENCE** | 序列 | Oracle：`CREATE SEQUENCE user_seq START WITH 1000 INCREMENT BY 2;` |
| **CREATE TYPE** | 自定义类型 | PostgreSQL：`CREATE TYPE currency AS (amount DECIMAL, unit VARCHAR(3));` |
| **ALTER INDEX** | 索引维护 | SQL Server：`ALTER INDEX idx_name ON Users REORGANIZE;` |
| **PARTITION BY** | 表分区 | MySQL：`CREATE TABLE Logs (...) PARTITION BY RANGE(YEAR(log_date))(...);` |
| **TABLESPACE** | 表空间 | Oracle物理存储管理单元 |
| **CREATE SYNONYM** | 同义词 | Oracle：`CREATE SYNONYM emp FOR hr.employees;` |
| **STORAGE PARAMETER** | 存储参数 | PostgreSQL：`CREATE TABLE bigtable (...) WITH (fillfactor=70);` |
| **VIRTUAL COLUMN** | 虚拟列 | Oracle：`CREATE TABLE Orders (total DECIMAL GENERATED ALWAYS AS (qty*price));` |
| **GLOBAL TEMPORARY TABLE** | 全局临时表 | SQL Server会话间共享的临时表 |
| **EXTERNAL TABLE** | 外部表 | 访问文件系统数据（如Hadoop） |

* * *

#### **三、数据操作语言（DML）**

| **命令** | **功能** | **语法示例** |
| --- | --- | --- |
| **INSERT INTO** | 插入数据 | `INSERT INTO Users VALUES (DEFAULT, 'Alice', CURDATE());` |
| **UPDATE** | 更新数据 | `UPDATE Products SET price=price*0.9 WHERE stock>100;` |
| **DELETE** | 删除数据 | `DELETE FROM Logs WHERE create_time < '2023-01-01';` |
| **MERGE** | 合并操作 | Oracle： `MERGE INTO target t USING source s ON (t.id=s.id)` `WHEN MATCHED THEN UPDATE SET t.val=s.val` `WHEN NOT MATCHED THEN INSERT VALUES (s.id,s.val);` |
| **UPSERT** | 冲突更新 | PostgreSQL：`INSERT INTO Users(id,name) VALUES (1,'Bob') ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name;` |
| **OUTPUT Clause** | 操作返回 | SQL Server：`DELETE FROM Users OUTPUT deleted.id WHERE id=1;` |
| **BULK INSERT** | 批量导入 | SQL Server：`BULK INSERT Employees FROM 'data.csv' WITH (FIELDTERMINATOR=',');` |
| **INSERT IGNORE** | 忽略错误 | MySQL：`INSERT IGNORE INTO UniqueIDs VALUES (1001);` |
| **RETURNING** | 操作返回 | PostgreSQL：`UPDATE Tasks SET status='done' RETURNING task_id;` |
| **COPY FROM** | 高速导入 | PostgreSQL：`COPY users FROM '/data/users.csv' WITH CSV HEADER;` |
| **LOAD DATA INFILE** | 文件加载 | MySQL：`LOAD DATA LOCAL INFILE 'data.txt' INTO TABLE logs;` |
| **SELECT INTO** | 查询写入 | SQL Server：`SELECT * INTO NewTable FROM OldTable WHERE condition;` |
| **INSERT EXEC** | 存储过程结果插入 | SQL Server：`INSERT INTO Results EXEC spGetReport;` |
| **FOR UPDATE** | 锁定更新 | `SELECT * FROM Accounts WHERE id=100 FOR UPDATE;` |
| **WAIT** | 锁等待 | Oracle：`SELECT * FROM Inventory WHERE qty>0 FOR UPDATE WAIT 5;` |
| **SKIP LOCKED** | 跳过锁定行 | Oracle：`SELECT * FROM Jobs FOR UPDATE SKIP LOCKED;` |
| **OUTER APPLY** | 跨表函数 | SQL Server：`SELECT u.name, o.total FROM Users u OUTER APPLY dbo.GetOrders(u.id) o;` |
| **CONNECT BY** | 递归查询 | Oracle层次查询专用语法 |

* * *

#### **四、数据查询语言（DQL）**

##### **1\. 核心子句**

| **关键字** | **用途** | **示例** |
| --- | --- | --- |
| **SELECT** | 字段选择 | `SELECT name, COUNT(*) FROM ...` |
| **FROM** | 数据源 | `FROM Employees e JOIN Departments d` |
| **WHERE** | 行过滤 | `WHERE salary > 5000 AND dept_id IN (10,20)` |
| **GROUP BY** | 分组 | `GROUP BY department HAVING SUM(sales)>100000` |
| **HAVING** | 分组过滤 | `HAVING AVG(score) >= 80` |
| **ORDER BY** | 排序 | `ORDER BY hire_date DESC, last_name ASC` |
| **LIMIT/OFFSET** | 分页 | MySQL：`LIMIT 10 OFFSET 20` |
| **FETCH FIRST** | 标准分页 | SQL:2011：`FETCH FIRST 10 ROWS ONLY` |
| **DISTINCT** | 去重 | `SELECT DISTINCT country FROM Customers` |
| **TOP** | 顶部行 | SQL Server：`SELECT TOP 10 PERCENT * FROM ...` |
| **TABLESAMPLE** | 采样 | `SELECT * FROM Sales TABLESAMPLE BERNOULLI (5)` |
| **WITH TIES** | 并列行 | SQL Server：`SELECT TOP 5 WITH TIES * ORDER BY price` |
| **PIVOT** | 行转列 | SQL Server：`SELECT * FROM (SELECT ...) src PIVOT (SUM(amount) FOR quarter IN ([Q1],[Q2])) pvt` |
| **UNPIVOT** | 列转行 | SQL Server：`UNPIVOT (sales FOR quarter IN (Q1,Q2,Q3)) unpvt` |
| **FOR JSON** | JSON输出 | SQL Server：`SELECT * FROM Products FOR JSON PATH` |

##### **2\. 连接操作**

| **连接类型** | **效果** | **语法** |
| --- | --- | --- |
| **INNER JOIN** | 内连接 | `FROM A INNER JOIN B ON A.id=B.ref_id` |
| **LEFT JOIN** | 左外连接 | `FROM Users LEFT JOIN Orders ON Users.id=Orders.user_id` |
| **RIGHT JOIN** | 右外连接 | `FROM Orders RIGHT JOIN Products ON Orders.pid=Products.id` |
| **FULL OUTER JOIN** | 全外连接 | Oracle：`SELECT * FROM A FULL JOIN B ON A.id=B.id` |
| **CROSS JOIN** | 笛卡尔积 | `FROM Colors CROSS JOIN Sizes` |
| **SELF JOIN** | 自连接 | `SELECT e1.name, e2.name FROM Employees e1 JOIN Employees e2 ON e1.manager=e2.id` |
| **NATURAL JOIN** | 自然连接 | 自动匹配同名字段 |
| **LATERAL JOIN** | 横向连接 | PostgreSQL：`SELECT u.name, o.total FROM Users u, LATERAL (SELECT ... WHERE user_id=u.id) o` |
| **NON-EQUI JOIN** | 非等值连接 | `FROM A JOIN B ON A.value BETWEEN B.start AND B.end` |
| **SEMI JOIN** | 半连接 | 使用EXISTS/IN实现的过滤 |
| **ANTI JOIN** | 反连接 | NOT EXISTS/NOT IN过滤 |
| **AS OF TIMESTAMP** | 闪回查询 | Oracle：`SELECT * FROM Orders AS OF TIMESTAMP SYSTIMESTAMP - INTERVAL '30' MINUTE` |
| **MATCH\_RECOGNIZE** | 模式匹配 | Oracle：`SELECT * FROM Logs MATCH_RECOGNIZE (...) PATTERN (A B+)` |
| **WITH ORDINALITY** | 行号生成 | PostgreSQL：`SELECT * FROM unnest(array['a','b']) WITH ORDINALITY` |
| **Temporal Table** | 时态表 | SQL Server：`FROM Orders FOR SYSTEM_TIME AS OF '2023-01-01'` |

##### **3\. 高级查询**

| **操作符/函数** | **功能** | **示例** |
| --- | --- | --- |
| **UNION** | 并集去重 | `SELECT city FROM Customers UNION SELECT city FROM Suppliers` |
| **UNION ALL** | 并集不去重 | `SELECT ... UNION ALL SELECT ...` |
| **EXCEPT/MINUS** | 差集 | `SELECT id FROM A EXCEPT SELECT id FROM B` |
| **INTERSECT** | 交集 | `SELECT id FROM FullTime INTERSECT SELECT id FROM Active` |
| **EXISTS** | 存在检测 | `SELECT name FROM Customers c WHERE EXISTS (SELECT 1 FROM Orders o WHERE o.cust_id=c.id)` |
| **CASE WHEN** | 条件逻辑 | `SELECT name, CASE WHEN age<18 THEN 'Child' ELSE 'Adult' END` |
| **CTE (WITH)** | 公共表表达式 | `WITH RegionalSales AS (SELECT region, SUM(sales) total FROM ...)` |
| **Recursive CTE** | 递归查询 | `WITH RECURSIVE OrgTree AS (SELECT id,name FROM root UNION ALL ...)` |
| **Window Functions** | 窗口函数 | `SUM(revenue) OVER (PARTITION BY dept ORDER BY date)` |
| **LEAD/LAG** | 偏移分析 | `LEAD(price,1) OVER (ORDER BY date)` |
| **FIRST\_VALUE** | 首项值 | `FIRST_VALUE(name) OVER (PARTITION BY dept ORDER BY salary DESC)` |
| **RANK/DENSE\_RANK** | 排名 | `RANK() OVER (PARTITION BY class ORDER BY score DESC)` |
| **NTILE** | 分组分桶 | `NTILE(4) OVER (ORDER BY salary) AS quartile` |
| **ROW\_NUMBER** | 行号 | `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY id)` |
| **PERCENT\_RANK** | 百分比排名 | `PERCENT_RANK() OVER (ORDER BY sales)` |
| **CUME\_DIST** | 累积分布 | `CUME_DIST() OVER (ORDER BY price)` |
| **AGGREGATE FILTER** | 条件聚合 | PostgreSQL：`SUM(sales) FILTER (WHERE region='West')` |
| **GROUPING SETS** | 多维聚合 | `GROUP BY GROUPING SETS ((a,b), (a), ())` |
| **ROLLUP** | 上卷聚合 | `GROUP BY ROLLUP (year, quarter)` |
| **CUBE** | 多维度聚合 | `GROUP BY CUBE (country, product)` |
| **PIVOT/UNPIVOT** | 行列转换 | Oracle：`SELECT * FROM (SELECT ...) PIVOT (SUM(sales) FOR region IN ('East','West'))` |
| **MODEL** | 电子表格计算 | Oracle：`SELECT ... MODEL DIMENSION BY (...) MEASURES (...) RULES (...)`  |
| **FLASHBACK QUERY** | 历史查询 | Oracle：`SELECT * FROM table AS OF TIMESTAMP ...` |
| **XMLTABLE** | XML解析 | `SELECT * FROM XMLTABLE('//book' PASSING xml_doc COLUMNS title VARCHAR(100) PATH 'title')` |
| **JSON\_TABLE** | JSON解析 | `SELECT * FROM JSON_TABLE(json_doc, '$.items[*]' COLUMNS (id PATH '$.id', name PATH '$.name'))` |
| **FULLTEXT SEARCH** | 全文检索 | MySQL：`WHERE MATCH(title,content) AGAINST ('database' IN NATURAL LANGUAGE MODE)` |
| **SOUNDEX** | 语音匹配 | SQL Server：`WHERE SOUNDEX(name)=SOUNDEX('Smith')` |
| **SIMILAR TO** | 正则简化 | PostgreSQL：`WHERE name SIMILAR TO 'J(oh)?n'` |
| **REGEXP\_SUBSTR** | 正则提取 | Oracle：`REGEXP_SUBSTR(phone, '\d{3}-\d{4}')` |
| **GEOMETRY** | 空间查询 | PostGIS：`WHERE ST_Distance(point1, point2) < 1000` |
| **CONTAINS** | 空间包含 | SQL Server：`WHERE geometry_col.STContains(@point)=1` |
| **GEOGRAPHY** | 地理类型 | SQL Server：`geography::Point(47.6, -122.3, 4326)` |
| **TOP N per Group** | 分组TopN | `SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) rn FROM emp) WHERE rn<=3` |
| **Hierarchical Query** | 层次查询 | Oracle：`SELECT LEVEL, name FROM emp START WITH mgr_id IS NULL CONNECT BY PRIOR id=mgr_id` |
| **GENERATE\_SERIES** | 序列生成 | PostgreSQL：`SELECT * FROM generate_series(1,10)` |
| **MATCH\_RECOGNIZE** | 事件模式 | Oracle模式匹配（检测事件序列） |
| **TABLESAMPLE** | 表采样 | `SELECT * FROM large_table TABLESAMPLE SYSTEM(1)` |
| **WITH ORDINALITY** | 行号 | PostgreSQL：`SELECT * FROM json_array_elements('[1,2]') WITH ORDINALITY` |
| **INTERPOLATION** | 插值 | Oracle：`PERIOD FOR ... WITH INTERPOLATE` |
| **UNNEST** | 数组展开 | PostgreSQL：`SELECT * FROM unnest(ARRAY[1,2])` |
| **LATERAL Subquery** | 横向子查询 | `SELECT u.name, p.product FROM Users u, LATERAL (SELECT product FROM Purchases WHERE user_id=u.id LIMIT 3) p` |
| **ILIKE** | 大小写不敏感 | PostgreSQL：`WHERE name ILIKE 'john%'` |

* * *

#### **五、函数与操作符**

##### **1\. 聚合函数**

| **函数** | **功能** | **示例** |
| --- | --- | --- |
| **COUNT()** | 计数 | `COUNT(*)` 或 `COUNT(DISTINCT city)` |
| **SUM()** | 求和 | `SUM(quantity * price)` |
| **AVG()** | 平均值 | `AVG(DISTINCT score)` |
| **MIN()** | 最小值 | `MIN(create_time)` |
| **MAX()** | 最大值 | `MAX(temperature)` |
| **GROUP\_CONCAT()** | 字符串聚合 | MySQL：`GROUP_CONCAT(name ORDER BY id SEPARATOR ',')` |
| **STRING\_AGG()** | 字符串聚合 | SQL Server：`STRING_AGG(name, ',') WITHIN GROUP (ORDER BY id)` |
| **ARRAY\_AGG()** | 数组聚合 | PostgreSQL：`ARRAY_AGG(email)` |
| **JSON\_ARRAYAGG()** | JSON数组 | MySQL：`JSON_ARRAYAGG(JSON_OBJECT('id',id,'name',name))` |
| **JSON\_OBJECTAGG()** | JSON对象 | MySQL：`JSON_OBJECTAGG(dept_name: COUNT(*))` |
| **CORR()** | 相关系数 | `CORR(x, y)` |
| **STDDEV()** | 标准差 | `STDDEV_POP(salary)` |
| **VAR()** | 方差 | `VAR_SAMP(price)` |
| **BIT\_AND()** | 位与 | MySQL：`BIT_AND(permissions)` |
| **APPROX\_COUNT\_DISTINCT()** | 近似去重 | SQL Server：`APPROX_COUNT_DISTINCT(user_id)` |

##### **2\. 标量函数**

| **类型** | **函数** | **功能** |
| --- | --- | --- |
| **字符串** | `CONCAT()` | 连接：`CONCAT(first, ' ', last)` |
|  | `SUBSTRING()` | 子串：`SUBSTRING(name, 1, 3)` |
|  | `LEFT()/RIGHT()` | 左右截取 |
|  | `UPPER()/LOWER()` | 大小写转换 |
|  | `TRIM()` | 去除空格：`TRIM(LEADING '0' FROM phone)` |
|  | `LENGTH()/CHAR_LENGTH()` | 长度计算 |
|  | `REPLACE()` | 替换：`REPLACE(title, 'Old', 'New')` |
|  | `REVERSE()` | 字符串反转 |
|  | `LPAD()/RPAD()` | 填充：`LPAD(account, 10, '0')` |
|  | `INSTR()` | 查找位置：`INSTR(name, '@')` |
|  | `FORMAT()` | 格式化：`FORMAT(12345.678, 'C')` |
|  | `SOUNDEX()` | 语音编码 |
| **数值** | `ROUND()` | 四舍五入：`ROUND(price, 2)` |
|  | `TRUNCATE()` | 截断：`TRUNCATE(price, 0)` |
|  | `ABS()` | 绝对值 |
|  | `CEIL()/FLOOR()` | 取整 |
|  | `MOD()` | 取模：`MOD(id, 10)` |
|  | `POWER()/SQRT()` | 幂与平方根 |
|  | `EXP()/LOG()` | 指数与对数 |
|  | `RAND()` | 随机数生成 |
|  | `PI()` | 圆周率常量 |
|  | `GREATEST()/LEAST()` | 最大最小值 |
| **日期** | `NOW()/CURRENT_TIMESTAMP` | 当前时间 |
|  | `CURDATE()/CURTIME()` | 当前日期时间 |
|  | `DATE_ADD()/DATE_SUB()` | 日期加减：`DATE_ADD(hire_date, INTERVAL 1 YEAR)` |
|  | `DATEDIFF()` | 日期差：`DATEDIFF(day, start, end)` |
|  | `DATEPART()/EXTRACT()` | 提取部分：`EXTRACT(YEAR FROM birthdate)` |
|  | `DATE_FORMAT()/TO_CHAR()` | 日期格式化 |
|  | `STR_TO_DATE()` | 字符串转日期 |
|  | `LAST_DAY()` | 月末日期 |
|  | `TIMESTAMPDIFF()` | 时间差 |
| **条件** | `COALESCE()` | 首非空值：`COALESCE(middle_name, '')` |
|  | `NULLIF()` | 相等返空：`NULLIF(col, 0)` |
|  | `IFNULL()/ISNULL()` | 空值转换 |
|  | `IF()` | 简单逻辑：`IF(qty>100, 'High', 'Low')` |
|  | `DECODE()` | Oracle条件分支 |
| **JSON** | `JSON_EXTRACT()` | 提取值：`JSON_EXTRACT(doc, '$.address.city')` |
|  | `JSON_SET()` | 设置值：`JSON_SET(doc, '$.email', 'new@mail.com')` |
|  | `JSON_VALID()` | 验证格式 |
|  | `JSON_ARRAY()` | 创建JSON数组 |
|  | `JSON_OBJECT()` | 创建JSON对象 |
| **分析** | `FIRST_VALUE()` | 窗口首值 |
|  | `PERCENT_RANK()` | 百分比排名 |
| **转换** | `CAST()` | 类型转换：`CAST(price AS DECIMAL(10,2))` |
|  | `CONVERT()` | SQL Server转换 |
|  | `TO_DATE()/TO_NUMBER()` | 类型转换 |

* * *

#### **六、存储过程与触发器**

| **术语** | **功能** | **语法示例** |
| --- | --- | --- |
| **Stored Procedure** | 存储过程 | `` CREATE PROCEDURE TransferFunds(IN from_acc INT, IN to_acc INT, IN amt DECIMAL) `BEGIN`   `START TRANSACTION;`   `UPDATE Accounts SET bal=bal-amt WHERE id=from_acc;`   `UPDATE Accounts SET bal=bal+amt WHERE id=to_acc;`   `COMMIT;` `END` `` |
| **Function** | 自定义函数 | PostgreSQL： `CREATE FUNCTION area(r float) RETURNS float AS $$ BEGIN RETURN 3.14*r*r; END; $$ LANGUAGE plpgsql;` |
| **Trigger** | 触发器 | `` CREATE TRIGGER update_balance `AFTER INSERT ON Transactions` `FOR EACH ROW` `BEGIN`   `UPDATE Accounts SET bal=bal+NEW.amount WHERE id=NEW.acc_id;` `END` `` |
| **Parameter** | 参数 | `IN/OUT/INOUT` 三种模式 |
| **CALL** | 调用 | MySQL：`CALL CalculateBonus(@total);` |
| **DECLARE** | 变量声明 | `DECLARE total_sales DECIMAL(10,2) DEFAULT 0.0;` |
| **Cursor** | 过程游标 | `DECLARE cur CURSOR FOR SELECT ...; OPEN cur; FETCH cur INTO ...; CLOSE cur;` |
| **Condition Handler** | 异常处理 | `DECLARE CONTINUE HANDLER FOR SQLEXCEPTION ...` |
| **RETURN** | 返回值 | `RETURN total_bonus;`（函数中） |
| **LOOP/WHILE** | 循环控制 | `WHILE counter < 100 DO ... END WHILE;` |
| **IF-THEN-ELSE** | 条件逻辑 | `IF credit > 5000 THEN ... ELSE ... END IF;` |
| **BEFORE Trigger** | 前触发器 | 操作执行前触发 |
| **AFTER Trigger** | 后触发器 | 操作执行后触发 |
| **INSTEAD OF Trigger** | 替代触发器 | 用于视图的DML操作 |
| **ROW vs STATEMENT** | 行/语句级 | 触发粒度控制 |
| **SIGNAL/RESIGNAL** | 错误信号 | `SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Error';` |
| **RAISE** | 抛出异常 | PostgreSQL：`RAISE EXCEPTION 'Invalid value: %', user_input;` |
| **DYNAMIC SQL** | 动态SQL | SQL Server：`EXEC sp_executesql @sql;` |

* * *

#### **七、事务与锁**

| **术语** | **功能** | **命令示例** |
| --- | --- | --- |
| **BEGIN TRANSACTION** | 开始事务 | `START TRANSACTION;`（标准SQL） |
| **COMMIT** | 提交 | `COMMIT;` |
| **ROLLBACK** | 回滚 | `ROLLBACK TO SAVEPOINT sp1;` |
| **SAVEPOINT** | 保存点 | `SAVEPOINT checkpoint;` |
| **Isolation Level** | 隔离级别 | `SET TRANSACTION ISOLATION LEVEL READ COMMITTED;` |
| **READ UNCOMMITTED** | 最低隔离 | 允许脏读 |
| **READ COMMITTED** | 默认级别 | 避免脏读 |
| **REPEATABLE READ** | 可重复读 | 避免不可重复读 |
| **SERIALIZABLE** | 最高隔离 | 避免幻读 |
| **Shared Lock (S)** | 共享锁 | 读锁 |
| **Exclusive Lock (X)** | 排他锁 | 写锁 |
| **Intent Lock** | 意向锁 | IS/IX锁（表级） |
| **Key-Range Lock** | 键范围锁 | 防止幻读 |
| **Deadlock** | 死锁 | 事务相互等待 |
| **Lock Timeout** | 锁等待超时 | SQL Server：`SET LOCK_TIMEOUT 3000;`（毫秒） |
| **Deadlock Priority** | 死锁优先级 | `SET DEADLOCK_PRIORITY HIGH;` |
| **Lock Escalation** | 锁升级 | 行锁->表锁 |
| **Row Versioning** | 行版本控制 | 乐观并发基础 |
| **Snapshot Isolation** | 快照隔离 | SQL Server快照级别 |
| **Two-Phase Locking** | 两阶段锁 | 增长/收缩阶段 |

* * *

#### **八、数据库设计与架构**

| **术语** | **描述** | **设计原则** |
| --- | --- | --- |
| **ER Diagram** | 实体关系图 | Crow's Foot/IDEF1X建模标准 |
| **Normalization** | 规范化 | 减少冗余（1NF→2NF→3NF→BCNF） |
| **Denormalization** | 反规范化 | 优化读性能 |
| **Entity** | 实体 | 独立存在对象（如Customer） |
| **Relationship** | 关系 | 1:1, 1:N, M:N关系 |
| **Attribute** | 属性 | 简单/复合属性 |
| **Composite Key** | 复合键 | 多字段联合主键 |
| **Surrogate Key** | 代理键 | 无意义自增ID |
| **Natural Key** | 自然键 | 业务唯一标识符 |
| **Referential Integrity** | 参照完整性 | 外键约束保证 |
| **Clustered Index** | 聚集索引 | 数据物理排序 |
| **Non-clustered Index** | 非聚集索引 | 独立数据结构 |
| **Covering Index** | 覆盖索引 | 包含SELECT所有字段 |
| **Full-Text Index** | 全文索引 | 支持语义搜索 |
| **Functional Dependency** | 函数依赖 | 决定关系基础 |
| **Star Schema** | 星型模型 | 事实表+维度表 |
| **Snowflake Schema** | 雪花模型 | 维度表规范化 |
| **Fact Table** | 事实表 | 度量值为中心 |
| **Dimension Table** | 维度表 | 描述性属性 |
| **Slowly Changing Dimension** | 渐变维度 | Type 1/2/3处理策略 |
| **Surrogate Key Pipeline** | 代理键流水 | 数仓ETL流程 |
| **Hierarchical Data Model** | 层次模型 | 父/子递归结构 |
| **Materialized Path** | 物化路径 | 路径枚举法存储树 |
| **In-Memory OLTP** | 内存优化 | SQL Server Hekaton引擎 |

* * *

#### **九、高可用与扩展**

| **技术** | **作用** | **架构示例** |
| --- | --- | --- |
| **Replication** | 复制 | 主从异步/半同步复制 |
| **Master-Slave** | 主从结构 | 读写分离基础 |
| **Multi-Master** | 多主 | Galera Cluster实现 |
| **Log Shipping** | 日志传送 | 连续恢复模式 |
| **Failover** | 故障转移 | AlwaysOn可用性组 |
| **Sharding** | 分片 | 按用户ID哈希分片 |
| **Partitioning** | 分区 | 时间范围分区(Range) |
| **Hot Standby** | 热备 | PostgreSQL流复制备机 |
| **CDC** | 变更捕获 | Debezium/Kafka实现 |
| **Table Partitioning** | 表分区 | Oracle: 按范围/列表/哈希分区 |
| **Query Router** | 查询路由 | Vitess/ProxySQL中间件 |
| **In-Memory Database** | 内存数据库 | Redis/MemSQL集成 |
| **Connection Pooling** | 连接池 | pgbouncer/c3p0工具 |
| **Read Replica** | 读副本 | 横向扩展查询能力 |
| **Write-Ahead Log (WAL)** | 预写日志 | ACID持久性保证 |
| **Logical Replication** | 逻辑复制 | PostgreSQL发布/订阅 |
| **GoldenGate** | 异构复制 | Oracle跨数据库同步 |
| **Delayed Replication** | 延迟复制 | 防止人为失误 |

* * *

#### **十、执行计划与优化**

| **术语** | **功能** | **操作命令** |
| --- | --- | --- |
| **EXPLAIN** | 执行计划 | MySQL：`EXPLAIN FORMAT=JSON SELECT ...` |
| **Execution Plan** | 计划视图 | SQL Server图形化计划 |
| **Query Optimizer** | 优化器 | 基于成本/规则的决策器 |
| **Cost-Based Optimizer** | 成本优化器 | 估算CPU/IO开销 |
| **Full Table Scan** | 全表扫描 | 未命中索引时的操作 |
| **Index Scan** | 索引扫描 | 索引覆盖查询 |
| **Index Seek** | 索引查找 | 最优访问路径 |
| **Key Lookup** | 键查找 | 非聚集索引回表 |
| **Filter/Predicate Pushdown** | 谓词下推 | 提前过滤数据 |
| **Nested Loop Join** | 嵌套循环 | 小表驱动大表 |
| **Hash Join** | 哈希连接 | 大表等值连接 |
| **Merge Join** | 归并连接 | 有序数据集合并 |
| **Statistics** | 统计信息 | 直方图/密度向量 |
| **Query Hint** | 查询提示 | SQL Server：`OPTION (HASH JOIN)` |
| **Covering Index** | 覆盖索引 | 避免回表操作 |
| **Parallel Query** | 并行查询 | SQL Server MAXDOP设置 |
| **In-Memory OLAP** | 内存分析 | Columnstore索引加速 |
| **Materialized View** | 物化视图 | 预计算优化查询 |

* * *

#### **十一、安全与权限**

| **命令** | **功能** | **示例** |
| --- | --- | --- |
| **GRANT** | 授权 | `GRANT SELECT, UPDATE ON Customers TO sales_role;` |
| **REVOKE** | 撤销权限 | `REVOKE DELETE ON Logs FROM auditor;` |
| **CREATE USER** | 创建用户 | `CREATE USER analyst IDENTIFIED BY 'S3cur3P@ss';` |
| **ALTER USER** | 修改用户 | `ALTER USER scott PASSWORD EXPIRE;` |
| **CREATE ROLE** | 创建角色 | `CREATE ROLE finance;` |
| **SET ROLE** | 激活角色 | Oracle：`SET ROLE finance;` |
| **ROW LEVEL SECURITY** | 行级安全 | PostgreSQL策略控制 |
| **COLUMN ENCRYPTION** | 列加密 | SQL Server Always Encrypted |
| **DATA MASKING** | 数据脱敏 | `CREATE MASKING POLICY email_mask AS (val string) RETURN CASE WHEN ...` |
| **AUDIT** | 审计 | Oracle：`AUDIT INSERT ANY TABLE BY ACCESS;` |
| **TDE** | 透明加密 | SQL Server透明数据加密 |
| **FIREWALL** | 防火墙 | 云数据库IP白名单 |
| **SQL INJECTION** | SQL注入 | 参数化查询防御 |
| **RBAC** | 角色授权 | 用户->角色->权限体系 |
| **OWASP TOP 10** | 安全威胁 | SQL相关安全防护 |
| **VIRTUAL PRIVATE DB** | 虚拟专库 | Oracle VPD策略 |
| **FEDERATED AUTH** | 联合认证 | Active Directory集成 |
| **PASSWORD POLICY** | 密码策略 | 复杂度/过期周期控制 |

* * *

#### **十二、跨数据库差异速查**

| **功能** | **MySQL** | **SQL Server** | **PostgreSQL** | **Oracle** |
| --- | --- | --- | --- | --- |
| **字符串连接** | `CONCAT()` | `+` | `||` | `CONCAT()`或`||` |
| **当前时间** | `NOW()` | `GETDATE()` | `CURRENT_TIMESTAMP` | `SYSDATE` |
| **分页查询** | `LIMIT 10 OFFSET 20` | `OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY` | 同SQL标准 | `FETCH FIRST 10 ROWS ONLY` |
| **正则表达式** | `REGEXP '^A'` | `LIKE '[A-Z]%'` | `~ '^A'` | `REGEXP_LIKE(name, '^A')` |
| **随机行** | `ORDER BY RAND() LIMIT 1` | `SELECT TOP 1 * FROM Table ORDER BY NEWID()` | `ORDER BY RANDOM() LIMIT 1` | `SELECT * FROM (SELECT * FROM Table ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM=1` |
| **序列生成** | `AUTO_INCREMENT` | `IDENTITY` | `CREATE SEQUENCE` + `NEXTVAL` | `SEQUENCE.NEXTVAL` |
| **日期差** | `DATEDIFF(day, d1, d2)` | `DATEDIFF(DAY, d1, d2)` | `d2 - d1` | `d2 - d1` |
| **正则提取** | `REGEXP_SUBSTR()` | `SUBSTRING() WITH PATINDEX` | `SUBSTRING() FROM 'pattern'` | `REGEXP_SUBSTR()` |
| **JSON解析** | `JSON_EXTRACT()` | `JSON_VALUE()` | `json_column->>'key'` | `JSON_TABLE()` |
| **递归查询** | `WITH RECURSIVE` | `WITH ... UNION ALL` | `WITH RECURSIVE` | `CONNECT BY` |
| **时区处理** | `CONVERT_TZ()` | `AT TIME ZONE` | `AT TIME ZONE` | `FROM_TZ()` |
| **分区表** | `PARTITION BY RANGE` | `PARTITION FUNCTION` | 继承表+触发器 | `PARTITION BY RANGE` |
| **列转行** | `UNION ALL`模拟 | `UNPIVOT` | `UNNEST()` | `UNPIVOT` |
| **错误处理** | `DECLARE HANDLER` | `TRY/CATCH` | `EXCEPTION` | `EXCEPTION` |
| **窗口函数** | 8.0+支持 | 完全支持 | 完全支持 | 完全支持 |
| **表空间** | TABLESPACE配置 | 文件组管理 | TABLESPACE | TABLESPACE |
| **XML处理** | `EXTRACTVALUE()` | `.nodes()`方法 | `xpath()`函数 | `XMLTABLE()` |
| **Spatial索引** | R-tree | GEOMETRY索引 | GiST索引 | Spatial R-tree |

(表格可左右滚动)

* * *

**说明**：

*   **技术完整性**：包含SQL92/SQL:2011标准及主流数据库扩展
    
*   **跨平台对比**：覆盖MySQL、SQL Server、PostgreSQL、Oracle四大RDBMS差异
    

> 建议配合具体数据库官方文档使用，并定期关注SQL标准演进。