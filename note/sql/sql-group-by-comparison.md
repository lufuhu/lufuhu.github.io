---
title: 48条GROUP BY常用SQL语句对比，五大数据库语法差异与优化
lastUpdated: 2026-10-13 02:30:00
---


`GROUP BY`作为SQL中用于分组聚合的关键语句，在数据分析、报表生成等等场景中发挥着不可或缺的作用。不同的数据库在`GROUP BY`的实现和支持上存在着差异。对这些差异不求甚解的我们，谁没有被`GROUP BY`坑过？这玩意儿表面上人畜无害，背地里却藏着无数“坑队友”的骚操作。MySQL默认模式下随便给我们选个名字，PostgreSQL直接甩我们一脸报错，SQL Server连个别名都不让我们在`GROUP BY`里用，你说气不气人？更别说分布式数据库里那套“分片聚合再合并”的黑科技了。我们原以为写个分组统计很简单？不同数据库分分钟教我们重新做人。下面我们一起来拆解各大数据库在`GROUP BY`上的“性格差异”和“隐藏技能”，从基础语法到高阶优化，从单机索引到分布式预聚合，让我们写的每一条分组语句，都又快又稳又跨库兼容。

#### 一、创建模拟数据表及插入模拟数据

为了演示不同数据库在`GROUP BY`上的行为差异，我们首先创建一个模拟员工表`employees`：

```sql
-- 表结构：员工表
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    gender CHAR(1),      -- 'M' or 'F'
    salary DECIMAL(10,2),
    hire_date DATE
);
```

我们再插入一些模拟数据：

```sql
-- 插入模拟数据（共8条）
INSERT INTO employees VALUES
(1, 'Alice',   'IT',     'F', 75000.00, '2023-01-15'),
(2, 'Bob',     'IT',     'M', 65000.00, '2023-03-22'),
(3, 'Charlie', 'HR',     'M', 55000.00, '2023-02-10'),
(4, 'Diana',   'HR',     'F', 60000.00, '2023-05-05'),
(5, 'Eve',     'Finance', 'F', 80000.00, '2023-07-18'),
(6, 'Frank',   'Finance', 'M', 70000.00, '2023-08-30'),
(7, 'Grace',   'IT',     'F', 85000.00, '2023-04-12'),
(8, 'Henry',   'HR',     'M', 50000.00, '2023-06-25');
```

#### 二、`GROUP BY`差异解析

##### 1、`SELECT`列与`GROUP BY`列匹配要求

（1）**MySQL（默认模式）**

在MySQL的默认模式下，允许`SELECT`中出现未在`GROUP BY`中的非聚合列，但这种情况下结果是不确定的。我们看示例：

```sql
-- MySQL默认允许SELECT中出现未在GROUP BY中的非聚合列
-- 结果不确定：name是随机选的（MySQL 5.7+默认模式）
SELECT department, name 
FROM employees 
GROUP BY department;
```

**执行结果（MySQL默认模式）**：

```
department | name
-----------|--------
IT         | Alice   -- 可能是Alice、Bob或Grace，不确定
HR         | Charlie -- 可能是Charlie、Diana或Henry
Finance    | Eve     -- 可能是Eve或Frank
```

这种不确定性可能会导致数据的不一致性，在实际应用中存在较大风险。例如，若我们的业务依赖“部门对应的员工姓名”进行后续处理，可能因每次查询结果不同引发逻辑错误。

（2）**MySQL（启用`ONLY_FULL_GROUP_BY`模式）**

为了避免上述风险，MySQL提供了`ONLY_FULL_GROUP_BY`模式。在启用该模式后，若`SELECT`中的非聚合列未在`GROUP BY`中，将会报错。我们看示例：

```sql
-- 启用严格模式后报错：
-- "Expression #2 of SELECT list is not in GROUP BY clause..."
SET sql_mode = 'ONLY_FULL_GROUP_BY';

SELECT department, name 
FROM employees 
GROUP BY department;
```

**报错信息**：

```sql
ERROR 1055 (42000): Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'employees.name' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```

这一模式使得MySQL在`GROUP BY`操作时更加严格，符合SQL标准，有助于提高数据的准确性和一致性。我们**建议所有生产环境强制启用该模式**，避免因语法宽松导致的潜在问题。

（3）**PostgreSQL/SQL Server/Oracle**

PostgreSQL、SQL Server和Oracle在这方面都严格遵循SQL标准，若`SELECT`中的列未在`GROUP BY`中，将会报错。我们看示例：

```sql
-- 所有三者均报错：name未在GROUP BY中
SELECT department, name 
FROM employees 
GROUP BY department;
```

**报错信息（PostgreSQL示例）**：

```javascript
ERROR: column "employees.name" must appear in the GROUP BY clause or be used in an aggregate function
```

为了在这些数据库中正确执行查询，我们需要将非聚合列全部放入`GROUP BY`中。请看示例：

```sql
-- 所有数据库都支持：非聚合列全部放入GROUP BY
SELECT department, name 
FROM employees 
GROUP BY department, name;
```

**执行结果**：

```
department | name
-----------|--------
Finance    | Eve
Finance    | Frank
HR         | Charlie
HR         | Diana
HR         | Henry
IT         | Alice
IT         | Bob
IT         | Grace
```

返回了每个部门下的所有员工，这样确保了数据的完整性和确定性。

##### 2、`GROUP BY`中使用表达式与别名引用

（1）**PostgreSQL/Oracle（支持别名引用）**

在PostgreSQL和Oracle中，支持在`GROUP BY`中引用`SELECT`中的别名。我们看示例：

```sql
-- PostgreSQL和Oracle支持GROUP BY引用SELECT中的别名
SELECT 
    EXTRACT(QUARTER FROM hire_date) AS hire_quarter,  -- 别名
    COUNT(*) AS emp_count
FROM employees
GROUP BY hire_quarter;  -- 直接引用别名
```

**执行结果**：

```
hire_quarter | emp_count
-------------|----------
1            | 2         -- Jan（Alice）、Feb（Charlie）
2            | 3         -- Apr（Grace）、May（Diana）、Jun（Henry）
3            | 3         -- Mar（Bob）、Jul（Eve）、Aug（Frank）
```

这种语法简化了SQL编写，避免了重复书写复杂表达式（如：`EXTRACT(QUARTER FROM hire_date)`），提高了代码的可读性。

（2）**MySQL 8.0+（支持别名引用）**

MySQL 8.0+版本也支持在`GROUP BY`中引用别名，例如：

```sql
-- MySQL 8.0+支持GROUP BY引用别名
SELECT 
    QUARTER(hire_date) AS hire_quarter,
    COUNT(*) AS emp_count
FROM employees
GROUP BY hire_quarter;
```

但我们需注意，MySQL 5.7及以下版本不支持该特性，若需兼容旧版本，仍需重复表达式。

（3）**SQL Server（不支持别名引用）**

SQL Server则不支持在`GROUP BY`中引用别名。我们看示例：

```sql
-- SQL Server不支持GROUP BY引用别名
SELECT 
    DATEPART(QUARTER, hire_date) AS hire_quarter,
    COUNT(*) AS emp_count
FROM employees
GROUP BY hire_quarter;  -- Invalid column name 'hire_quarter'
```

在SQL Server中，必须重复表达式才能正确执行查询，看示例：

```sql
-- 必须重复表达式
SELECT 
    DATEPART(QUARTER, hire_date) AS hire_quarter,
    COUNT(*) AS emp_count
FROM employees
GROUP BY DATEPART(QUARTER, hire_date);  -- 重复表达式
```

这一限制会增加代码冗余，尤其当表达式复杂时（如：多字段拼接、函数嵌套），我们需特别注意语法正确性。

##### 3、隐式分组行为（无`GROUP BY`）

在某些情况下，我们可能会进行聚合查询而不使用`GROUP BY`（即“全局聚合”）。例如，我们查询一个空表的聚合信息：

```sql
-- 查询空表：模拟创建空表
CREATE TABLE empty_employees AS SELECT * FROM employees WHERE 1=0;

-- 执行聚合查询
SELECT 
    COUNT(*) AS total_count,
    AVG(salary) AS avg_salary
FROM empty_employees;
```

**执行结果（所有数据库一致）**：

```
total_count | avg_salary
------------|-----------
0           | NULL
```

在这种情况下，所有主流数据库的行为是一致的：

*   `COUNT(*)`会返回0（统计行数，空表行数为0）；
    
*   其他聚合函数（如：`AVG`、`SUM`、`MAX`）会返回 `NULL`（因无数据可计算）。
    

这一特性在判断表是否为空、统计全表基础指标时非常有用，且我们无需担心跨数据库兼容性问题。

#### 三、`HAVING`差异解析

`HAVING`用于筛选`GROUP BY`后的聚合结果，它的语法差异主要体现在别名引用、独立使用和子查询支持上。

##### 1、`HAVING`中使用`SELECT`别名

（1）**MySQL（支持别名）**

MySQL支持在`HAVING`中直接使用`SELECT`别名。例如：

```sql
-- MySQL支持HAVING中直接使用SELECT别名
SELECT 
    department,
    COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING emp_count > 2;  -- 直接使用别名
```

**执行结果**：

```
department | emp_count
-----------|----------
IT         | 3
HR         | 3
```

该语法简化了代码，避免我们重复书写聚合函数（如：`COUNT(*)`）。

（2）**PostgreSQL/SQL Server/Oracle（不支持别名）**

PostgreSQL、SQL Server和Oracle在`HAVING`中不支持使用`SELECT`别名。请看：

```sql
-- 报错：列"emp_count"不存在（PostgreSQL）
SELECT 
    department,
    COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING emp_count > 2;  -- 别名在HAVING中无效
```

为了在这些数据库中正确执行查询，我们必须重复聚合函数。例如：

```sql
-- 必须重复聚合函数
SELECT 
    department,
    COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;  -- 重复COUNT(*)
```

这一限制的主要原因是：SQL执行逻辑中，`HAVING`的计算早于`SELECT`别名的生成，因此无法识别别名。

##### 2、`HAVING`独立使用（无`GROUP BY`）

在一些场景下，我们可以独立使用`HAVING`进行“全局筛选”（即无`GROUP BY`的聚合查询）。例如，我们统计全公司人数，仅当人数大于5时返回：

```sql
-- 统计全公司人数，仅当>5时返回
SELECT COUNT(*) AS total_employees
FROM employees
HAVING COUNT(*) > 5;
```

**执行结果（所有数据库）**：

```
total_employees
---------------
8
```

所有数据库都支持这种语法，但在优化层面存在差异：

*   **SQL Server/Oracle**：优化器会预判全表行数，若行数明显小于阈值（如：5），可能直接返回空结果，避免全表扫描；
    
*   **MySQL/PostgreSQL**：通常会执行全表扫描后，再根据`HAVING`条件过滤结果。
    

例如：若表中仅有3条数据，SQL Server可能无需读取所有数据即可判断结果为空，而MySQL仍需扫描全部3条记录。

##### 3、`HAVING`中使用子查询

在`HAVING`中使用子查询也是常见的需求，例如，我们筛选“平均工资高于公司整体平均”的部门：

```sql
-- 筛选平均工资高于公司整体平均的部门
SELECT 
    department,
    AVG(salary) AS dept_avg
FROM employees
GROUP BY department
HAVING AVG(salary) > (
    SELECT AVG(salary) FROM employees  -- 子查询：公司平均工资
);
```

**执行结果**：

```
department | dept_avg
-----------|----------
Finance    | 75000.00
IT         | 75000.00
```

所有数据库都支持在`HAVING`中使用子查询，但在性能上存在差异：

*   **Oracle/SQL Server**：子查询结果通常会缓存一次，避免重复计算（如：公司平均工资只需计算1次）；
    
*   **MySQL** 5.7-：可能对每个分组重复执行子查询（如：3个部门则执行3次子查询），性能较差；
    
*   **MySQL** 8.0+：优化器改进，引入“子查询物化”技术，通常只执行一次子查询，性能接近主流数据库。
    

为验证性能差异，我们可通过`EXPLAIN`查看执行计划：MySQL 5.7会显示“Subquery executed 3 times”，而8.0+则显示“Subquery materialized once”。

#### 四、特殊语法支持示例

##### 1、`WITH ROLLUP`（`MySQL`） vs `ROLLUP()`（标准）

`ROLLUP`用于生成“分组小计”和“总计”，是多维度统计的常用功能，但不同数据库语法不同。

（1）**MySQL（`WITH ROLLUP`）**

MySQL提供了特有的`WITH ROLLUP`语法，需附加在`GROUP BY`后。请看示例：

```sql
-- MySQL特有语法：WITH ROLLUP
SELECT 
    department, 
    gender,
    COUNT(*) AS emp_count
FROM employees
GROUP BY department, gender WITH ROLLUP;
```

**执行结果**：

```
department | gender | emp_count
-----------|--------|----------
Finance    | F      | 1
Finance    | M      | 1
Finance    | NULL   | 2    ← 小计（Finance 部门总计）
HR         | F      | 1
HR         | M      | 2
HR         | NULL   | 3    ← 小计（HR部门总计）
IT         | F      | 2
IT         | M      | 1
IT         | NULL   | 3    ← 小计（IT部门总计）
NULL       | NULL   | 8    ← 总计（全公司）
```

结果中，`NULL`表示“该字段无分组（即小计/总计）”，我们需注意与真实`NULL`数据区分（可通过`GROUPING()` 函数判断）。

（2）**PostgreSQL（标准`ROLLUP`）**

PostgreSQL使用标准的`ROLLUP()`语法，将分组字段传入函数即可。我们看示例：

```sql
-- PostgreSQL使用标准语法
SELECT 
    department, 
    gender,
    COUNT(*) AS emp_count
FROM employees
GROUP BY ROLLUP(department, gender);  -- 标准语法
```

其结果与MySQL使用`WITH ROLLUP`时完全一致，但语法更通用，可直接在SQL Server、Oracle中复用。

（3）**SQL Server/Oracle**

SQL Server和Oracle同样支持标准的`ROLLUP`语法，请看例子：

```sql
-- 同样支持标准ROLLUP语法
SELECT 
    department, 
    gender,
    COUNT(*) AS emp_count
FROM employees
GROUP BY ROLLUP(department, gender);
```

此外，这些数据库还支持`GROUPING()`函数，用于区分“小计/总计的`NULL`”和“真实`NULL`”。我们看例子：

```sql
-- 使用GROUPING()区分NULL类型（PostgreSQL/SQL Server/Oracle）
SELECT 
    department,
    gender,
    COUNT(*) AS emp_count,
    GROUPING(department) AS is_dept_total,  -- 1=部门小计/总计行
    GROUPING(gender) AS is_gender_total     -- 1=性别小计/总计行
FROM employees
GROUP BY ROLLUP(department, gender);
```

**部分结果**：

```
department | gender | emp_count | is_dept_total | is_gender_total
-----------|--------|-----------|---------------|----------------
Finance    | F      | 1         | 0             | 0  -- 正常分组行
Finance    | NULL   | 2         | 0             | 1  -- Finance 部门小计行
NULL       | NULL   | 8         | 1             | 1  -- 全公司总计行
```

`GROUPING()`函数返回1表示“该字段是小计/总计的占位符”，0表示“该字段是真实分组值”，这在报表生成中非常有用（如：可将`NULL`替换为“总计”文字）。

##### 2、`DISTINCT ON`（PostgreSQL特有）

PostgreSQL提供了特有的`DISTINCT ON`语法，用于快速获取“每个分组中的首行数据”。例如，我们获取每个部门工资最高的员工：

```sql
-- PostgreSQL：每个部门工资最高的员工
SELECT DISTINCT ON (department)
    department,
    name,
    salary
FROM employees
ORDER BY department, salary DESC;  -- 每组按工资降序，取第一条
```

**执行结果**：

| department | name | salary |
| --- | --- | --- |
| Finance | Eve | 80000.00 |
| HR | Diana | 60000.00 |
| IT | Grace | 85000.00 |

`DISTINCT ON (column)` 的逻辑是：

（1）按`column`分组；  
（2）每组内按`ORDER BY`排序；  
（3）保留每组的第一行。

该语法简洁高效，但仅PostgreSQL支持。在其他数据库中，我们需用窗口函数实现等价功能：

```sql
-- MySQL/SQL Server/Oracle等价写法（使用窗口函数）
SELECT department, name, salary
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rn
    FROM employees
) ranked
WHERE rn = 1;
```

窗口函数的通用性更强，且支持更复杂的逻辑（如：并列排名`RANK()`、dense排名`DENSE_RANK()`），我们推荐优先使用以保证跨数据库兼容性。

##### 3、`GROUP BY`与`JSON`/数组字段的聚合（现代数据库新特性）

随着NoSQL思想融入关系型数据库，JSON和数组字段越来越常见，聚合这些字段的需求也在增长。

（1）**PostgreSQL示例**：

```sql
-- 假设employees表新增tags字段：JSONB类型['senior', 'backend']
SELECT 
    department,
    jsonb_agg(DISTINCT tag) AS all_tags  -- 聚合所有标签（去重）
FROM employees, jsonb_array_elements_text(tags) AS tag
GROUP BY department;
```

（2）**MySQL 8.0**+：

```sql
SELECT 
    department,
    JSON_ARRAYAGG(DISTINCT tag) AS all_tags
FROM employees, JSON_TABLE(tags, '$[*]' COLUMNS (tag VARCHAR(50) PATH '$')) AS jt
GROUP BY department;
```

（3）**ClickHouse**：

```sql
SELECT 
    department,
    groupUniqArrayArray(tags) AS all_tags  -- 展开数组后去重聚合
FROM employees
GROUP BY department;
```

#### 五、窗口函数与`GROUP BY`的协同使用差异

窗口函数（如：`ROW_NUMBER()`、`SUM() OVER ()`）与`GROUP BY`虽功能不同，但常结合使用：`GROUP BY`用于“折叠行的聚合”，窗口函数用于“不折叠行的分组计算”。不同数据库在支持度上存在历史差异。

##### 1、模拟需求：每个部门中工资排名前2的员工

（1）**PostgreSQL/SQL Server/Oracle（原生支持窗口函数）**

这些数据库很早就支持窗口函数，语法完全符合SQL标准：

```sql
-- 使用ROW_NUMBER()窗口函数（标准SQL）
SELECT 
    department,
    name,
    salary,
    rn
FROM (
    SELECT 
        department,
        name,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department  -- 按部门分组（类似GROUP BY）
            ORDER BY salary DESC     -- 组内按工资降序
        ) as rn  -- 组内排名
    FROM employees
) ranked
WHERE rn <= 2  -- 取每组前2名
ORDER BY department, rn;
```

**执行结果**：

| department | name | salary | rn |
| --- | --- | --- | --- |
| Finance | Eve | 80000.00 | 1 |
| Finance | Frank | 70000.00 | 2 |
| HR | Diana | 60000.00 | 1 |
| HR | Charlie | 55000.00 | 2 |
| IT | Grace | 85000.00 | 1 |
| IT | Alice | 75000.00 | 2 |

窗口函数的`PARTITION BY`与`GROUP BY`的主要区别：

*   `GROUP BY`会将分组结果折叠为一行（如：每个部门一行）；
    
*   `PARTITION BY`会保留所有行，但在组内计算（如：每个员工都带排名）。
    

（2）**MySQL（5.7 vs 8.0+的代际差异）**

*   **MySQL 5.7及以下**：不支持窗口函数，我们需用变量模拟，逻辑复杂且性能差：
    

```sql
-- MySQL 5.7模拟排名（复杂且易错）
SET @rank = 0;
SET @dept = '';

SELECT 
    department,
    name,
    salary,
    rn
FROM (
    SELECT 
        department,
        name,
        salary,
        @rank := IF(@dept = department, @rank + 1, 1) AS rn,
        @dept := department  -- 重置部门变量
    FROM employees
    ORDER BY department, salary DESC
) ranked
WHERE rn <= 2;
```

*   **MySQL 8.0**+：完全支持窗口函数，语法与其他数据库一致：
    

```sql
-- MySQL 8.0+窗口函数语法（与标准一致）
SELECT 
    department,
    name,
    salary,
    rn
FROM (
    SELECT 
        department,
        name,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department 
            ORDER BY salary DESC
        ) as rn
    FROM employees
) ranked
WHERE rn <= 2
ORDER BY department, rn;
```

**建议**：若需使用窗口函数，MySQL应至少升级到8.0版本，避免兼容问题和性能损耗。

##### 2、递归聚合：GROUP BY在递归查询中的行为（WITH RECURSIVE）

虽然不常见，但在组织架构、树形结构统计中，`GROUP BY`与递归CTE结合使用时有特殊行为。

**示例（PostgreSQL）**：

```sql
WITH RECURSIVE org_tree AS (
    SELECT id, name, manager_id, 1 as level
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id, ot.level + 1
    FROM employees e JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT 
    level,
    COUNT(*) as emp_count,
    STRING_AGG(name, ', ') as names
FROM org_tree
GROUP BY level
ORDER BY level;
```

**注意**：递归部分不能直接包含`GROUP BY`，必须在外层聚合。

#### 六、`GROUP BY`与索引优化策略差异

索引是提升`GROUP BY`性能的主要手段，但不同数据库对索引的利用逻辑差异显著，这样直接影响查询效率。

##### 1、索引设计原则

为`GROUP BY`优化的索引需遵循“最左前缀匹配”原则，我们推荐：

*   将`GROUP BY`列作为索引前导列；
    
*   若有过滤条件（`WHERE`），过滤列应优先于分组列；
    
*   包含聚合列（如：`SUM(salary)`）形成“覆盖索引”，避免回表。
    

**示例**：

```
-- 为 department（分组列）和 salary（聚合列）创建复合索引
CREATE INDEX idx_dept_salary ON employees(department, salary);
```

##### 2、各数据库执行计划差异

我们以查询“按部门分组，计算平均工资”为例：

```sql
-- 基础分组查询
EXPLAIN  -- 查看执行计划（语法各数据库略有不同）
SELECT 
    department,
    AVG(salary) as avg_salary
FROM employees
GROUP BY department;
```

（1）**MySQL执行计划特点**

*   **理想情况**：使用`idx_dept_salary`索引，执行“索引扫描（Index Scan）”，无需读取表数据（覆盖索引）；
    
*   **最差情况**：无合适索引时，会创建“临时表（Using temporary）”存储分组结果，并可能触发“文件排序（Using filesort）”，性能极差。
    

执行计划中我们需关注的关键字：

*   `Using index`：使用覆盖索引，最优；
    
*   `Using temporary`：创建临时表，需优化；
    
*   `Using filesort`：文件排序，需优化。
    

（2）**PostgreSQL执行计划特点**

*   优化器会自动选择两种聚合策略：
    

*   **HashAggregate**：适合大数据量，在内存中构建哈希表分组；
    
*   **GroupAggregate**：适合小数据量或已排序数据，按顺序分组。
    

*   若索引`(department, salary)`存在，可能执行“Index Only Scan”，直接从索引获取数据。
    

**执行计划示例（HashAggregate）**：

```
HashAggregate  (cost=1.15..1.18 rows=3 width=36)
  Group Key: department
  ->  Index Only Scan using idx_dept_salary on employees  (cost=0.14..1.11 rows=8 width=10)
```

（3）**SQL Server执行计划特点**

*   主要使用两种聚合算子：
    

*   **Stream Aggregate**：输入数据已排序时使用，效率高；
    
*   **Hash Match Aggregate**：输入无序时使用，适合大数据量。
    

*   若索引`(department)`存在，可能执行“Index Seek + Stream Aggregate”，避免排序。
    

（4）**Oracle执行计划特点**

*   支持**HASH GROUP BY**（哈希分组）和**SORT GROUP BY**（排序分组）；
    
*   12c+引入**VECTOR GROUP BY**（向量化处理），利用CPU向量指令加速聚合，对大数据集提升显著；
    
*   若索引`(department)`选择性高，可能使用“INDEX FAST FULL SCAN”，高效扫描索引。
    

##### 3、优化建议

*   **MySQL**：避免`Using temporary`和`Using filesort`，我们要确保`GROUP BY`列是索引前导列；
    
*   **PostgreSQL**：通过`SET enable_hashagg = off;`测试不同聚合策略，选择最优解；
    
*   **SQL Server**：使用“包含列索引（INCLUDE）”添加聚合列，避免“键查找（Key Lookup）”；
    
*   **Oracle**：对大数据集，可通过`/*+ USE_HASH_AGGREGATION */`提示强制使用哈希分组。
    

##### 4、调试与监控技巧

（1）**如何知道GROUP BY是否走了索引？**

*   **MySQL**：`EXPLAIN FORMAT=JSON`查看`"using_index_for_group_by"`；
    
*   **PostgreSQL**：`EXPLAIN (ANALYZE, BUFFERS)`看是否`Index Only Scan`；
    
*   **SQL Server**：执行计划中看是否`Stream Aggregate` + `Index Seek`；
    
*   **Oracle**：`AUTOTRACE`或`DBMS_XPLAN`看是否`INDEX FAST FULL SCAN`。
    

（2）**如何监控慢GROUP BY？**

*   **慢查询日志**（所有数据库）
    
*   **Performance Schema**（MySQL）
    
*   **pg\_stat\_statements**（PostgreSQL）
    
*   **Query Store**（SQL Server）
    
*   **AWR Report**（Oracle）
    

#### 七、`GROUP BY`与`NULL`值处理差异

所有数据库都将`NULL`视为“相等”值进行分组，但在排序时存在差异，可能影响结果展示。

##### 1、`NULL`分组行为（所有数据库一致）

我们先插入一条`gender`为`NULL`的记录：

```sql
INSERT INTO employees VALUES
(9, 'Ivy', 'IT', NULL, 72000.00, '2023-09-01');
```

执行分组查询：

```sql
-- 按gender分组统计
SELECT 
    gender,
    COUNT(*) as count
FROM employees
GROUP BY gender;
```

**执行结果（所有数据库）**：

```
gender | count
-------|------
NULL   | 1     ← NULL被分到一组
F      | 4
M      | 4
```

所有数据库在`GROUP BY`中均将`NULL`视为相同值，归为同一组，这符合SQL标准。

##### 2、`NULL`排序差异（数据库特有）

当我们对分组结果排序时，`NULL`的位置因数据库而异：

```sql
-- 按 gender 排序
SELECT 
    gender,
    COUNT(*) as count
FROM employees
GROUP BY gender
ORDER BY gender;
```

*   **MySQL/PostgreSQL/SQL Server**：`NULL`默认排在最前；
    
*   **Oracle**：`NULL`默认排在最后（与其他数据库相反）。
    

**跨数据库兼容写法**：

```sql
-- 我们明确指定NULL排序位置（PostgreSQL/Oracle/SQL Server 2022+/MySQL 8.0+）
SELECT 
    gender,
    COUNT(*) as count
FROM employees
GROUP BY gender
ORDER BY gender NULLS LAST;  -- 强制NULL在最后
```

*   `NULLS FIRST`：`NULL` 排在最前；
    
*   `NULLS LAST`：`NULL` 排在最后。
    

**注意**：MySQL 8.0+和SQL Server 2022+才支持`NULLS FIRST/LAST`，旧版本需用`CASE`模拟：

```
-- 兼容旧版本：将NULL转换为特定值排序
ORDER BY CASE WHEN gender IS NULL THEN 1 ELSE 0 END, gender;
```

#### 八、`GROUP BY`与`TIME ZONE`时区处理的坑（全球化应用必备）

在跨时区系统中，我们按“日期”分组时若忽略时区，会导致数据错位。请看例子：

```sql
-- 错误：直接按DATE(hire_date)分组，忽略时区
SELECT DATE(hire_date), COUNT(*) FROM employees GROUP BY DATE(hire_date);

-- 正确：转换为业务时区后再分组（如：'America/New_York'）
SELECT 
    DATE(CONVERT_TZ(hire_date, '+00:00', 'America/New_York')) AS local_date,
    COUNT(*)
FROM employees
GROUP BY local_date;
```

**各数据库支持**：

*   **PostgreSQL**：`AT TIME ZONE`语法强大；
    
*   **MySQL**：`CONVERT_TZ()` + 时区表需初始化；
    
*   **SQL Server**：`AT TIME ZONE`（2016+）；
    
*   **Oracle**：`FROM_TZ()`, `AT TIME ZONE`；
    
*   **ClickHouse**：`toTimeZone()`函数。
    

#### 九、`HAVING`与`WHERE`的执行顺序与性能陷阱

`WHERE`和`HAVING`都用于过滤数据，但执行阶段不同：

*   `WHERE`：在`GROUP BY`之前过滤行，减少分组数据量；
    
*   `HAVING`：在`GROUP BY`之后过滤分组结果，仅能使用聚合函数。
    

错误使用可能导致严重性能问题。

##### 1、低效写法

```sql
-- 低效：在HAVING中过滤可提前筛选的条件
SELECT 
    department,
    COUNT(*) as emp_count,
    AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 2 
   AND AVG(salary) > 65000;
```

该写法会先对全表分组，再过滤结果。若表中大部分部门人数≤2，会浪费大量资源分组无效数据。

##### 2、优化写法

```sql
-- 高效：用WHERE提前过滤非聚合条件
SELECT 
    department,
    COUNT(*) as emp_count,
    AVG(salary) as avg_salary
FROM employees
WHERE salary > 65000  -- 提前过滤低工资员工，减少分组数据
GROUP BY department
HAVING COUNT(*) > 2;  -- 过滤分组后结果
```

**优势**：

*   `WHERE salary > 65000`可利用`salary`索引，直接过滤掉低工资员工（如：HR部门的Henry工资50000会被提前排除）；
    
*   分组数据量减少，聚合计算更快。
    

##### 3、数据库优化器差异

*   **Oracle/SQL Server**：优化器可能自动将`HAVING`中可下推的条件转换为`WHERE`（谓词下推）；
    
*   **MySQL/PostgreSQL**：优化器对复杂条件的下推能力较弱，需我们手动调整。
    

**建议**：显式区分`WHERE`和`HAVING`，将非聚合条件放在`WHERE`中，避免依赖优化器自动优化。

#### 十、`GROUP BY` + `JOIN`的性能陷阱与优化

**场景**：很多开发者会在`GROUP BY`之前先`JOIN`多张表，导致中间结果集爆炸，再分组聚合，性能极差。

**原示例**：

```sql
-- 先JOIN再GROUP BY，中间结果可能巨大
SELECT 
    d.dept_name,
    COUNT(e.id) AS emp_count
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.dept_name;
```

**优化写法**：

```sql
-- 先GROUP BY再JOIN（子查询/CTE），减少JOIN数据量
WITH dept_counts AS (
    SELECT 
        department_id,
        COUNT(*) AS emp_count
    FROM employees
    GROUP BY department_id
)
SELECT 
    d.dept_name,
    dc.emp_count
FROM dept_counts dc
JOIN departments d ON dc.department_id = d.id;
```

**各数据库优化器行为**：

*   **PostgreSQL/Oracle**：可能自动下推`GROUP BY`到JOIN前（取决于统计信息）；
    
*   **MySQL**：优化器能力较弱，通常不会自动优化，需我们手动改写；
    
*   **SQL Server**：使用“Group By Push Down”提示可强制优化：`OPTION (GROUPBY_PUSH_DOWN)`。
    

#### 十一、复杂分组：`GROUPING SETS`, `CUBE`, `ROLLUP`标准语法对比

对于多维度统计（如：同时查看“部门+性别”、“部门”、“性别”、“总计”的聚合结果），标准SQL提供了`GROUPING SETS`、`CUBE`、`ROLLUP`语法，不同数据库支持度基本一致。

##### 1、`GROUPING SETS`：自定义分组组合

按需指定多个分组维度，灵活性最高：

```sql
-- 使用GROUPING SETS：自定义分组组合
SELECT 
    department,
    gender,
    COUNT(*) as emp_count,
    GROUPING(department) as is_dept_total,  -- 1=部门汇总行
    GROUPING(gender) as is_gender_total     -- 1=性别汇总行
FROM employees
GROUP BY GROUPING SETS (
    (department, gender),  -- 正常分组：部门+性别
    (department),          -- 部门汇总（忽略性别）
    (gender),              -- 性别汇总（忽略部门）
    ()                     -- 总计（忽略所有）
)
ORDER BY department NULLS LAST, gender NULLS LAST;
```

**部分结果**：

```
department | gender | emp_count | is_dept_total | is_gender_total
-----------|--------|-----------|---------------|----------------
Finance    | F      | 1         | 0             | 0  -- 正常行
Finance    | M      | 1         | 0             | 0
Finance    | NULL   | 2         | 0             | 1  -- 部门汇总
HR         | F      | 1         | 0             | 0
...
NULL       | F      | 4         | 1             | 0  -- 性别汇总
NULL       | M      | 4         | 1             | 0
NULL       | NULL   | 9         | 1             | 1  -- 总计
```

`GROUPING(column)`函数用于标记汇总行，解决“汇总占位符`NULL`与真实`NULL`混淆”的问题。

##### 2、`ROLLUP`：层级分组（上卷）

适合有层级关系的分组（如：“地区→城市→门店”），自动生成从细到粗的汇总：

```sql
-- ROLLUP：“部门→性别”层级汇总
SELECT 
    department,
    gender,
    COUNT(*) as emp_count
FROM employees
GROUP BY ROLLUP(department, gender);
```

结果等价于`GROUPING SETS ((department, gender), (department), ())`，即：

*   先按`(department, gender)`分组；
    
*   再按`(department)`汇总；
    
*   最后生成总计。
    

##### 3、`CUBE`：全维度组合（立方体）

生成所有可能的分组组合，适合无层级关系的多维度分析：

```sql
-- CUBE：部门和性别的所有组合
SELECT 
    department,
    gender,
    COUNT(*) as emp_count
FROM employees
GROUP BY CUBE(department, gender);
```

结果等价于`GROUPING SETS ((department, gender), (department), (gender), ())`，即包含所有维度的组合及总计。

##### 4、数据库支持情况

*   **MySQL 8.0+、PostgreSQL、SQL Server、Oracle**：完全支持`GROUPING SETS`、`CUBE`、`ROLLUP`；
    
*   **MySQL 5.7及以下**：仅支持`WITH ROLLUP`（非标准语法），不支持`GROUPING SETS`和`CUBE`。
    

#### 十二、分布式数据库中的`GROUP BY`行为差异

当数据量达到TB/PB级，单机数据库无法胜任，分布式数据库（如：ClickHouse、Doris、Snowflake）成为主流。它们的`GROUP BY`实现基于“分片计算+全局聚合”，与单机数据库差异显著。

##### 1、ClickHouse（列式存储，MPP架构）

（1）**基本特性**：

*   按列存储，适合聚合查询；
    
*   `GROUP BY` 默认采用“两阶段聚合”：分片本地聚合 → 全局合并；
    
*   支持近似聚合函数（如：`uniqCombined`），牺牲精度换性能。
    

（2）**我们看示例**：部门员工数统计

```sql
-- 基础分组查询（兼容标准）
SELECT 
    department,
    COUNT(*) AS emp_count
FROM employees
GROUP BY department
ORDER BY emp_count DESC;
```

（3）**优化技巧**：

```sql
-- ① 近似去重（大数据场景）
SELECT 
    department,
    uniqCombined(name) AS approx_unique_names  -- 误差<1%，速度快10x+
FROM employees
GROUP BY department;

-- ② 带总计的分组（类似ROLLUP）
SELECT 
    department,
    COUNT(*) AS emp_count
FROM employees
GROUP BY department
WITH TOTALS  -- 末尾添加总计行
ORDER BY emp_count DESC;
```

（4）**执行特点**：

*   若`department`是分片键，本地聚合后可直接合并，无数据传输（最优）；
    
*   若`department`非分片键，需跨节点传输数据（Shuffle），性能下降；
    
*   避免`GROUP BY`高基数列（如：`id`），可能导致内存溢出。
    

##### 2、Apache Doris（MPP架构，实时分析）

（1）**主要特性**：

*   支持“单阶段聚合”和“两阶段聚合”，自动选择最优策略；
    
*   按分桶键（Bucket Key）分布数据，`GROUP BY`分桶键可避免Shuffle。
    

（2）**示例：我们先建表再查询**：

```sql
-- 按department分桶（数据分散在不同节点）
CREATE TABLE employees_doris (
    id INT,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10,2)
) DISTRIBUTED BY HASH(department) BUCKETS 10;  -- 分10个桶

-- GROUP BY分桶键 → 单阶段聚合（无Shuffle）
SELECT 
    department,
    COUNT(*) AS emp_count
FROM employees_doris
GROUP BY department;  -- 高效：每个节点计算本地部门，直接汇总
```

（3）**性能提示**：

*   `GROUP BY`列 = 分桶键 → 性能最优（无Shuffle）；
    
*   `GROUP BY`列 ≠ 分桶键 → 触发Shuffle，性能下降5-10倍；
    
*   启用新优化器：`/*+ SET_VAR(enable_nereids_planner=true) */`提升复杂查询性能。
    

##### 3、Snowflake（云原生数仓）

（1）**主要特性**：

*   自动微分区（Micro-partition），数据按列存储且物理有序；
    
*   `GROUP BY`自动利用分区裁剪和结果缓存；
    
*   完全托管，无需手动优化索引或分片。
    

（2）**查询示例**：

```sql
-- 标准语法，Snowflake自动优化
SELECT 
    department,
    DATE_TRUNC('month', hire_date) AS hire_month,
    COUNT(*) AS emp_count
FROM employees
WHERE hire_date >= '2023-01-01'
GROUP BY department, hire_month;
```

（3）**执行特点**：

*   自动识别`hire_date`过滤条件，仅扫描相关微分区（IO最小化）；
    
*   相同查询（参数不变）直接返回缓存结果（秒级响应）；
    
*   计算资源弹性扩展，大表分组也能快速完成。
    

#### 十三、`GROUP BY`在OLAP场景的极致优化（物化视图、预聚合）

在实时分析场景，重复的`GROUP BY`查询（如：报表统计），我们可通过预计算（物化视图、预聚合表）加速，不同数据库实现方式不同。

##### 1、物化视图（Materialized View）

存储`GROUP BY`结果的物理表，定期刷新，我们查询时直接读取预计算结果。

（1）**PostgreSQL（13+原生支持）**

```sql
-- 创建物化视图（预存部门统计结果）
CREATE MATERIALIZED VIEW mv_dept_stats AS
SELECT 
    department,
    COUNT(*) AS emp_count,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY department;

-- 查询物化视图（无需实时计算，秒级响应）
SELECT * FROM mv_dept_stats WHERE avg_salary > 70000;

-- 数据更新后刷新（手动）
REFRESH MATERIALIZED VIEW mv_dept_stats;
```

（2）**Oracle（成熟的自动刷新机制）**

```sql
-- 创建物化视图（支持自动刷新）
CREATE MATERIALIZED VIEW mv_dept_stats
BUILD IMMEDIATE
REFRESH FAST ON COMMIT  -- 源表提交时自动刷新（需创建物化视图日志）
AS
SELECT 
    department,
    COUNT(*) AS emp_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
```

Oracle的`FAST REFRESH`仅刷新变更数据（而非全量重算），适合高频更新场景。

（3）**MySQL（无原生物化视图，我们需模拟）**

```sql
-- 用普通表模拟物化视图
CREATE TABLE mv_dept_stats AS
SELECT 
    department,
    COUNT(*) AS emp_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- 定时刷新（通过事件或外部脚本）
REPLACE INTO mv_dept_stats
SELECT 
    department,
    COUNT(*) AS emp_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
```

##### 2、预聚合表（Rollup Table）

在分布式数据库中，预聚合表（如：Doris的Rollup、ClickHouse的AggregatingMergeTree）是更高效的方法。

（1）**Doris Rollup示例**：

```sql
-- 在原表上创建Rollup（预聚合）
ALTER TABLE employees_doris 
ADD ROLLUP rollup_dept_salary (department, salary) 
FROM employees_doris;

-- 查询自动路由到Rollup
SELECT 
    department, 
    AVG(salary) 
FROM employees_doris 
GROUP BY department;  -- 直接读取预聚合结果，性能提升10x+
```

Rollup与原表共享存储，仅保存聚合后的数据，空间开销小，且查询无需手动指定，自动匹配最优Rollup。

#### 十四、`GROUP BY`的未来：SQL标准演进与AI优化

随着数据量爆炸式增长，`GROUP BY`正朝着“自动化”、“智能化”方向发展，减少人工优化成本。

##### 1、SQL:2023新标准特性

*   `GROUP BY DISTINCT`：明确指定去重分组，语义更清晰：
    
    ```sql
    -- SQL:2023（尚未广泛支持）
    SELECT 
        department,
        COUNT(DISTINCT name) AS unique_names
    FROM employees
    GROUP BY DISTINCT department;  -- 强调按唯一部门分组
    ```
    
*   **`GROUPING`函数增强**：支持多列同时判断，简化汇总行识别。
    

##### 2、AI驱动的自动优化

*   **Oracle 23c AI优化器**：自动学习查询模式，推荐索引和物化视图，甚至改写`GROUP BY`逻辑：
    
    ```sql
    -- 自动优化分组查询
    SELECT /*+ AI_OPTIMIZE */ 
        department, 
        AVG(salary)
    FROM employees
    GROUP BY department;
    ```
    
*   **Snowflake自动聚类**：根据`GROUP BY`等查询模式，后台自动重组织数据，使分组列物理连续，减少IO：
    
    ```sql
    -- 按department自动聚类存储
    CREATE TABLE employees (
        ...
    ) CLUSTER BY (department);
    ```
    
*   **SQL Server自动索引建议**：执行计划中直接提示缺失的分组索引，一键创建：
    
    ```
    缺失索引建议：
    CREATE INDEX IX_Employees_Department ON employees(department)
    ```
    

#### 十五、实战示例：电商平台销售分析

我们以电商销售表`sales`为例，演示不同场景下`GROUP BY`的优化方法。

##### 1、表结构与数据

```sql
CREATE TABLE sales (
    order_id BIGINT,
    user_id INT,
    product_category VARCHAR(50),
    amount DECIMAL(10,2),
    order_date DATE
);
```

\-- 插入100万行模拟数据（略）

##### 2、需求1：各品类销售额统计（基础分组）

```sql
-- 标准写法
SELECT 
    product_category,
    COUNT(*) AS order_count,
    SUM(amount) AS total_sales
FROM sales
WHERE order_date >= '2025-01-01'
GROUP BY product_category
HAVING SUM(amount) > 100000
ORDER BY total_sales DESC;
```

**优化策略**：

*   **单机数据库**：创建索引`(order_date, product_category, amount)`（过滤列+分组列+聚合列）；
    
*   **ClickHouse**：按`product_category`分片，使用`SUM(amount)`预聚合；
    
*   **Snowflake**：依赖自动微分区，无需手动索引。
    

##### 3、需求2：Top3品类的用户购买排名（嵌套分组+窗口函数）

```sql
WITH top_categories AS (
    -- 第一步：筛选销售额Top3品类
    SELECT 
        product_category,
        SUM(amount) as category_sales
    FROM sales
    GROUP BY product_category
    ORDER BY category_sales DESC
    LIMIT 3
)
-- 第二步：计算Top品类中用户的购买次数排名
SELECT 
    s.product_category,
    s.user_id,
    COUNT(*) as purchase_count,
    RANK() OVER (
        PARTITION BY s.product_category 
        ORDER BY COUNT(*) DESC
    ) as user_rank
FROM sales s
JOIN top_categories tc ON s.product_category = tc.product_category
GROUP BY s.product_category, s.user_id
ORDER BY s.product_category, user_rank;
```

**优化策略**：

*   **PostgreSQL**：为`(product_category, user_id)`创建索引，加速分组和连接；
    
*   **Doris**：将`product_category`设为分桶键，避免Shuffle；
    
*   **大表优化**：先创建Top3品类的临时表，再关联分析，减少数据量。
    

#### 十六、GROUP BY的“确定性”与“稳定性”问题（尤其在复制/分片环境）

在分布式或主从复制环境中，若`GROUP BY`不包含所有非聚合列，或排序不明确，可能导致不同节点返回结果顺序不一致，引发业务逻辑错误。我们看示例：

```sql
-- 危险：未指定ORDER BY，结果顺序不确定
SELECT department, MAX(salary) FROM employees GROUP BY department;

-- 安全：明确排序，保证结果稳定
SELECT department, MAX(salary) FROM employees GROUP BY department ORDER BY department;
```

#### 十七、“`GROUP BY`分组聚合”语法总结

##### 1、跨数据库，语法差异总结

| 特性 | MySQL | PostgreSQL | SQL Server | Oracle | 分布式数据库（ClickHouse/Doris） |
| --- | --- | --- | --- | --- | --- |
| `SELECT`列超出`GROUP BY` | 默认允许（非标准） | 不允许 | 不允许 | 不允许 | 遵循标准，不允许 |
| `GROUP BY`引用别名 | 8.0+支持 | 支持 | 不支持 | 支持 | 支持 |
| `HAVING`使用别名 | 支持 | 不支持 | 不支持 | 不支持 | 不支持 |
| 窗口函数支持 | 8.0+支持 | 支持 | 支持 | 支持 | 支持 |
| 高级分组（`GROUPING SETS`） | 8.0+支持 | 支持 | 支持 | 支持 | 支持 |
| 聚合优化策略 | 临时表/文件排序 | HashAggregate/GroupAggregate | Stream/Hash Aggregate | HASH/SORT/VECTOR GROUP BY | 两阶段聚合/预聚合 |

##### 2、正确、高效、不容易出错的语句写法总结

*   **语法兼容**：我们以PostgreSQL/Oracle严格模式为基准，避免MySQL非标准特性（如：`SELECT`列超出`GROUP BY`）；
    
*   **索引设计**：`GROUP BY`列作为索引前导列，结合过滤列和聚合列形成覆盖索引；
    
*   **性能优化**：我们用`WHERE`提前过滤数据，避免`HAVING`处理大量无效分组；
    
*   **分布式场景**：确保`GROUP BY`列与分片/分桶键一致，减少Shuffle；
    
*   **大数据加速**：我们使用物化视图、预聚合表或近似函数，平衡精度与性能。
    

`GROUP BY`看似简单，其实是数据库性能优化的“试金石”。从单机到分布式，从手动优化到AI自动优化，只有掌握其底层原理和数据库特性，我们才能在SQL查询中左右逢源。