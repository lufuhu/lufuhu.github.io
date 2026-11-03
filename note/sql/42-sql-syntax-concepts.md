---
title: 42个SQL语法级概念详解，从关键字、标识符到表达式
lastUpdated: 2026-08-31 04:00:00
---


SQL 概念很多，但直接出现在 SQL 语句文本中的，可直接参与 SQL 语句编写的语法级概念并不多，也就 42 个（组），不知你能说出几个？下面按照使用频率与结构重要性从 `高频 → 低频` 的顺序来逐一介绍这些概念。介绍时，先介绍每一个概念在 SQL 语句中的具体位置及必要说明，再通过详细示例来具体介绍。（所有代码块或表格均可左右滚动）

##### 1、**关键字（Keyword）**

位置：所有语句开头及关键位置  
说明：SQL 中具有特殊语法意义的保留字，是语句结构的基础。  
核心用途与典型代表：

| 用途 | 典型关键字 |
| --- | --- |
| **数据查询（DQL）** | `SELECT`, `FROM`, `WHERE`, `HAVING`, `GROUP BY`, `ORDER BY` |
| **数据操作 (DML)** | `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `UPSERT` |
| **数据定义 (DDL)** | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| **数据控制 (DCL)** | `GRANT`, `REVOKE` |
| **事务控制 (TCL)** | `START TRANSACTION`, `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |
| **连接与锁定** | `JOIN`, `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`, `CROSS JOIN`, `FOR UPDATE`, `LOCK IN SHARE MODE` |
| **分页控制** | `LIMIT`, `OFFSET`, `FETCH`, `NEXT`, `ROWS ONLY`（标准 SQL：`OFFSET ... FETCH NEXT ... ROWS ONLY`） |
| **模式与对象** | `SCHEMA`, `DATABASE`, `TABLE`, `VIEW`, `INDEX`, `TEMPORARY`, `RECURSIVE` |
| **公共表表达式** | `WITH`, `WITH RECURSIVE` |

```sql
-- 示例：多种关键字协同工作
START TRANSACTION;
INSERT INTO orders (user_id, amount) VALUES (101, 99.99);
UPDATE accounts SET balance = balance - 99.99 WHERE user_id = 101;
COMMIT;

-- 查询示例（含标准分页）
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id, u.name
HAVING COUNT(o.id) >= 1
ORDER BY order_count DESC
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY; -- 标准 SQL 分页语法
```

##### 2、**标识符（Identifier）**

位置：紧随关键字后的命名对象  
分类：**表名**、**字段(列)名**、数据库名、视图名、索引名、模式名、别名等等。  
注意：可被引号（如：双引号或反引号）包围以支持特殊字符或保留字命名。

```sql
SELECT id, first_name AS "Name" FROM `user-info`; 
-- `user-info` (带连字符的表名), "Name" (列别名), id, first_name (字段名)
```

##### 3、**常量/字面量（Constant/Literal）**

位置：WHERE/SET/VALUES 子句  
分类：字符串、数字、日期时间、布尔值、`NULL`。

```sql
INSERT INTO products VALUES (101, 'Laptop', 999.99, '2025-08-23', TRUE);
-- 101 (整数), 'Laptop' (字符串), 999.99 (浮点数), '2025-08-23' (日期), TRUE (布尔)
```

##### 4、**子句（Clause）**

位置：语句功能模块  
说明：由关键字引导的语法模块，构成 SQL 语句的“积木”。

```sql
SELECT name, age                    -- SELECT 子句
FROM users                          -- FROM 子句
WHERE age >= 18                     -- WHERE 子句
GROUP BY age                        -- GROUP BY 子句
HAVING COUNT(*) > 5                 -- HAVING 子句
ORDER BY name ASC                   -- ORDER BY 子句
LIMIT 100;                          -- LIMIT 子句
```

##### 5、**操作符（Operator）**

位置：WHERE/SELECT/SET 子句  
说明：执行运算或比较的符号或保留字。  
核心子类：

| 类型 | 操作符 | 说明 |
| --- | --- | --- |
| **算术** | `+`, `-`, `*`, `/`, `%` | 数值计算 |
| **比较** | `=`, `<>`/`!=`, `>`, `<`, `>=`, `<=`, `BETWEEN`, `IN`, `LIKE` | 值比较 |
| **逻辑** | `AND`, `OR`, `NOT` | 条件组合 |
| **字符串连接** | \` |  |
| **集合操作符** | `UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`/`MINUS` | 合并多个 `SELECT` 结果集 |
| **集合比较操作符** | `ANY`, `SOME`, `ALL` | 与子查询结果进行量化比较 |
| **一元操作符** | `+`, `-` (正负号), `~` (位非) | 单操作数 |

> **通配符**（`%`, `_`）：虽为字符，但在 `LIKE` 操作中具有特殊语义，是其模式匹配的组成部分。

```sql
SELECT price * 1.1 AS new_price FROM products; -- * (算术)
SELECT * FROM users WHERE age BETWEEN 18 AND 65 AND status IN ('active', 'trial');
SELECT name FROM asia_customers
UNION ALL
SELECT name FROM europe_customers; -- UNION ALL (集合操作符)
SELECT * FROM logs WHERE message LIKE 'Error%'; -- LIKE + % (通配符)

-- 集合比较操作符示例
SELECT name, price FROM products 
WHERE price > ALL (SELECT price FROM products WHERE category = 'Budget Phone');
```

##### 6、**表达式（Expression）**

位置：SELECT/WHERE/HAVING/ORDER BY  
说明：由常量、变量、运算符、函数等组成的可求值结构。

```sql
SELECT price * quantity AS total, 
       (price * quantity) * (1 - discount) AS final_price
FROM order_items;

SELECT * FROM users 
WHERE age > 18 AND (country = 'US' OR country = 'CA');
-- age > 18 AND (country = 'US' OR country = 'CA') 是复合逻辑表达式
```

##### 7、**函数（Function）**

位置：SELECT/WHERE/GROUP BY/HAVING/ORDER BY  
说明：返回一个值的内置或用户定义程序。  
分类：

*   **标量函数**：`UPPER()`, `LOWER()`, `LENGTH()`, `ROUND()`, `COALESCE()`, `IFNULL()`, `CASE` 表达式
    
*   **聚合函数**：`COUNT()`, `SUM()`, `AVG()`, `MAX()`, `MIN()`, `GROUP_CONCAT()`, `STRING_AGG()`
    
*   **窗口函数**：`ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `SUM(...) OVER (...)`, `LAG()`, `LEAD()`
    
*   **类型转换**：`CAST()`, `CONVERT()`, `TRY_CAST()`
    

```sql
SELECT 
  UPPER(name) AS upper_name,
  CASE WHEN age < 20 THEN 'Young' ELSE 'Adult' END AS age_group,
  AVG(salary) OVER (PARTITION BY dept) AS dept_avg_salary
FROM employees;
```

##### 8、**谓词（Predicate）**

位置：WHERE/HAVING/ON 子句  
说明：返回 `TRUE`/`FALSE`/`UNKNOWN` 的条件表达式。  
常见谓词：

*   `IS NULL` / `IS NOT NULL`
    
*   `IN` / `NOT IN`
    
*   `EXISTS` / `NOT EXISTS`
    
*   `BETWEEN ... AND ...`（闭区间）
    
*   `LIKE` / `NOT LIKE`
    
*   `ANY` / `SOME` / `ALL`（配合子查询）
    

```sql
SELECT * FROM customers WHERE phone IS NULL;             -- IS NULL 谓词
SELECT * FROM orders WHERE status IN ('shipped', 'delivered'); -- IN 谓词
SELECT * FROM products p WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.product_id = p.id
); -- EXISTS 谓词

-- BETWEEN 谓词示例
SELECT * FROM sales 
WHERE sale_date BETWEEN '2025-01-01' AND '2025-01-31';
```

##### 9、**绑定变量（Bind Variable）**

位置：动态 SQL/预处理语句中的值占位符

```sql
PREPARE stmt FROM 'SELECT * FROM users WHERE id = ? AND status = ?';
EXECUTE stmt USING @user_id, 'active';
```

##### 10、**别名（Alias）**

位置：SELECT/FROM 后  
分类：列别名（`AS`）、表别名（`AS` 或空格）。

```sql
SELECT u.name AS user_name, p.title AS product_title
FROM users u
JOIN purchases pu ON u.id = pu.user_id
JOIN products p ON pu.product_id = p.id;
```

##### 11、**空值（NULL）**

位置：WHERE/HAVING 条件，或查询结果中

```sql
SELECT * FROM employees WHERE manager_id IS NULL;
INSERT INTO temp_table (id, name, salary) VALUES (1, 'Alice', NULL);
```

##### 12、**子查询（Subquery）**

位置：WHERE/FROM/SELECT 子句中

```sql
-- WHERE 子句中的子查询
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);

-- FROM 子句中的子查询（派生表）
SELECT dept, AVG(salary) FROM (
  SELECT dept, salary FROM employees WHERE hire_date > '2020-01-01'
) AS recent_employees GROUP BY dept;
```

##### 13、**注释（Comment）**

位置：任意位置（不影响执行）

```sql
-- 单行注释
/* 多行注释
   可以跨行 */
SELECT /* 内联注释 */ * FROM users;
```

##### 14、**事务（Transaction）**

位置：多操作封装

```sql
START TRANSACTION;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT; -- 或 ROLLBACK;
```

##### 15、**参数（Parameter）**

位置：存储过程/函数调用

```
CALL get_user_orders(101, '2025-01-01'); -- 101, '2025-01-01' 为传入参数
```

##### 16、**连接类型（Join Type）**

位置：FROM/JOIN 子句  
说明：属于“关键字”子类，但因其重要性常单独强调。

```sql
SELECT * FROM orders o INNER JOIN customers c ON o.cust_id = c.id;
SELECT * FROM users u LEFT JOIN profiles p ON u.id = p.user_id;
```

##### 17、**视图（View）**

位置：FROM 子句（作为表的逻辑替代）

```sql
CREATE VIEW active_users_view AS SELECT * FROM users WHERE status = 'active';
SELECT * FROM active_users_view; -- 使用视图
```

##### 18、**锁（Lock）**

位置：SELECT ... FOR UPDATE / SHARE 等语句中  
说明：属于“关键字”子类。

```sql
SELECT * FROM inventory WHERE item_id = 1001 FOR UPDATE;
```

##### 19、**执行计划（Execution Plan）**

位置：EXPLAIN / EXPLAIN ANALYZE 语句后

```sql
EXPLAIN SELECT * FROM large_table WHERE indexed_col = 'value';
```

##### 20、**索引（Index）**

位置：CREATE/DROP 语句

```
CREATE INDEX idx_users_email ON users(email);
DROP INDEX idx_users_email ON users;
```

##### 21、**数据类型转换（Data Type Conversion）**

位置：SELECT/WHERE/SET  
说明：通过 `CAST()`、`CONVERT()` 等函数实现，已归入“函数”条目。

```sql
SELECT CAST('2025-08-23' AS DATE);
```

##### 22、**CASE 表达式**

位置：SELECT/WHERE/ORDER BY 等  
说明：属于“表达式”和“函数”范畴，常用于条件逻辑。

```sql
SELECT name,
       CASE WHEN score >= 90 THEN 'A'
            WHEN score >= 80 THEN 'B'
            ELSE 'C'
       END AS grade
FROM students;
```

##### 23、**分区（Partitioning）**

位置：表定义/查询条件（`PARTITION`）

```sql
SELECT * FROM sales PARTITION (p2025_q3);
```

##### 24、**公共表表达式（CTE）**

位置：WITH 子句

```sql
WITH high_value_customers AS (
  SELECT id, name FROM customers WHERE total_spent > 10000
)
SELECT * FROM high_value_customers;
```

##### 25、**窗口函数（Window Function）**

位置：SELECT 子句  
说明：属于“函数”子类。

```sql
SELECT name, salary,
       RANK() OVER (ORDER BY salary DESC) AS overall_rank,
       ROW_NUMBER() OVER (PARTITION BY dept ORDER BY hire_date) AS dept_hire_order
FROM employees;
```

##### 26、**数据类型（Data Type）**

位置：CREATE/ALTER TABLE

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

##### 27、**约束（Constraint）**

位置：表定义中

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) CHECK (amount > 0),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

##### 28、**临时表（Temporary Table）**

位置：CREATE TEMPORARY TABLE / 临时结果集

```sql
CREATE TEMPORARY TABLE temp_results AS SELECT * FROM large_table WHERE condition = 'temp';
```

##### 29、**批量操作（Bulk Operation）**

位置：INSERT/UPDATE/DELETE

```sql
INSERT INTO products (id, name) VALUES (1,'A'), (2,'B'), (3,'C'); -- 批量插入
```

##### 30、**递归查询（Recursive Query）**

位置：WITH RECURSIVE

```sql
WITH RECURSIVE employee_tree AS (
  SELECT id, name, manager_id FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id FROM employees e
  JOIN employee_tree et ON e.manager_id = et.id
)
SELECT * FROM employee_tree;
```

##### 31、**存储过程（Stored Procedure）**

位置：CALL 语句

```
CALL calculate_bonus(2025, 'sales');
```

##### 32、**模式（Schema）**

位置：对象名前缀

```sql
SELECT * FROM finance.budgets; -- finance 为模式名
```

##### 33、**外键关联动作（Foreign Key Action）**

位置：外键约束定义

```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE SET NULL
```

##### 34、**触发器（Trigger）**

位置：CREATE TRIGGER

```sql
CREATE TRIGGER log_user_update
AFTER UPDATE ON users
FOR EACH ROW
INSERT INTO user_logs (user_id, action) VALUES (OLD.id, 'UPDATE');
```

##### 35、**同义词（Synonym）**

位置：对象访问（Oracle 等）

```sql
SELECT * FROM emp_syn; -- emp_syn 是 employees 表的同义词
```

##### 36、**自增（Auto-increment）**

位置：表定义

```sql
CREATE TABLE items (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50));
```

##### 37、**元数据（Metadata）**

位置：信息模式查询

```sql
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users';
```

##### 38、**字符集（Charset & Collation）**

位置：库/表/列定义

```sql
CREATE TABLE messages (
  content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);
```

##### 39、**游标（Cursor）**

位置：存储过程内

```sql
DECLARE cur CURSOR FOR SELECT id FROM users;
OPEN cur;
FETCH cur INTO @user_id;
CLOSE cur;
```

##### 40、**权限（Permission）**

位置：GRANT/REVOKE

```sql
GRANT SELECT, INSERT ON mydb.users TO 'analyst'@'%';
```

##### 41、**事务隔离级别（Isolation Level）**

位置：事务设置

```
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

##### 42、**递归 CTE（Recursive CTE）**

位置：`WITH RECURSIVE` 子句  
说明：一种特殊的公共表表达式，用于处理层级或图结构数据（如：组织架构、评论树、BOM）。必须包含**锚点查询**和**递归查询**，并通过 `UNION [ALL]` 连接。

```sql
-- 示例：查询评论树中某条评论的所有后代
WITH RECURSIVE comment_tree AS (
  -- 锚点：起始评论
  SELECT id, parent_id, content, 0 AS level
  FROM comments
  WHERE id = 1001

  UNION ALL

  -- 递归：查找子评论
  SELECT c.id, c.parent_id, c.content, ct.level + 1
  FROM comments c
  INNER JOIN comment_tree ct ON c.parent_id = ct.id
)
SELECT * FROM comment_tree ORDER BY level;
```

> **关键语法元素**：`WITH RECURSIVE`, `UNION [ALL]`, 自引用 JOIN。

好啦！这 42 组 SQL 语句中的语法级概念都枚举完啦！以后有机会一一展开（详细拆解）。其实我们日常写 SQL 语句时，涉及到的高频概念也就前十几组，像关键字、标识符、函数这些天天用，后面像游标、递归 CTE 这些，遇到复杂需求再翻出来用就行。

记住这些“语法积木”，不管是查数据、建表，还是写复杂逻辑，我们都能搭出想要的 SQL 语句。多练几次，慢慢就熟啦！