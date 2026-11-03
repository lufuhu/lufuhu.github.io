---
title: SQL筛选条件基础语法详解，布尔表达式在WHERE、HAVING中的多场景应用
lastUpdated: 2026-09-14 04:00:00
---


SQL筛选条件是布尔表达式的具体应用，通过布尔表达式的真假判断来筛选数据。SQL布尔表达式是一种返回布尔值（`TRUE`、`FALSE`或`UNKNOWN`）的表达式，用在判断条件是否成立，通常由比较运算符（如：=、>、<、<>）、逻辑运算符（如：`AND`、`OR`、`NOT`）、函数或字段组合而成。

SQL筛选条件（的**定义**）是用于从数据库表中筛选出符合特定规则的数据行的条件表达式，主要用在`WHERE`、`ON`、`HAVING`等子句来筛选数据。SQL筛选条件本质上是使用布尔表达式来实现的。SQL的筛选条件（如：`WHERE`子句、`HAVING`子句中的条件）必须是一个布尔表达式，其结果只能是`TRUE`（真）、`FALSE`（假）或`UNKNOWN`（未知，通常由`NULL`参与运算导致），只有使布尔表达式结果为`TRUE`的记录才会被筛选出来。

SQL筛选条件的**作用**主要是缩小查询结果范围，从数据库表中精准提取符合特定要求的数据，避免返回无关信息，提高数据查询的效率和准确性。具体来说，其作用包括：

*   **精准定位数据**：通过设定条件（如：等于、大于、包含等），从大量数据中筛选出需要的记录。如：从“订单表”中筛选出“金额大于1000元”的订单。
    
*   **减少数据量**：过滤掉不需要的数据，降低查询返回的结果规模，减轻系统处理压力，加快查询速度。
    
*   **满足业务需求**：根据实际业务场景定制筛选规则，如：筛选“近30天内注册的用户”“状态为‘已完成’的任务”等，为数据分析、报表生成等提供支持。
    

### 一、SQL筛选条件的语法结构

SQL筛选条件的语法结构可统一表示为：

```
筛选条件 ::= [ NOT ] 条件单元 [ { AND |  OR } [ NOT ] 条件单元 ... ]
```

其中，**条件单元**可以是：

```
-- 字段名 比较运算符 (值 | 字段名 | 函数 | 子查询)
-- ( 筛选条件 ) （用在嵌套组合）
-- EXISTS ( 子查询 )
-- 字段名 [ NOT ] IN ( 值列表 | 子查询 )
-- 字段名 [ NOT ] BETWEEN 值1 AND 值2
-- 字段名 [ NOT ] LIKE 模式字符串
-- 字段名 IS [ NOT ] NULL
```

简单说明：

*   基础是通过比较运算符（=、>、<、<>等）连接字段与值/其他元素
    
*   用AND、OR、NOT进行逻辑组合，可嵌套括号改变优先级
    
*   包含IN、BETWEEN、LIKE、IS NULL等特殊筛选形式
    
*   支持通过EXISTS结合子查询进行关联筛选
    

这个结构用在`WHERE`、`HAVING`、`JOIN...ON`等所有需要筛选条件的场景。

我们来把SQL筛选条件的语法结构与**SQL中布尔表达式的语法结构**对比一下。

SQL中布尔表达式的语法结构可归纳为：

```
布尔表达式 ::= [ NOT ] 原子条件 [ { AND | OR } [ NOT ] 原子条件 ... ]
```

其中，**原子条件**（最基础的判断单元）包括：

```sql
-- 表达式 比较运算符 表达式
  -- 如：age > 18、name = 'Alice'、salary * 1.2 > 5000
-- 表达式 [ NOT ] IN ( 值列表 | 子查询 )
  -- 如：id IN (1,2,3)、dept IN (SELECT id FROM depts)
-- 表达式 [ NOT ] BETWEEN 表达式 AND 表达式
  -- 如：score BETWEEN 60 AND 100
-- 表达式 [ NOT ] LIKE 模式字符串 [ ESCAPE 字符 ]
  -- 如：name LIKE '张%'
-- 表达式 IS [ NOT ] NULL
  -- 如：email IS NULL
-- EXISTS ( 子查询 )
  -- 如：EXISTS (SELECT 1 FROM orders WHERE user_id = u.id)
-- ( 布尔表达式 )（嵌套的布尔表达式，用在改变优先级）
```

简单来说，布尔表达式通过**逻辑运算符（AND/OR/NOT）**组合多个**原子条件**，最终返回`TRUE`、`FALSE`或`UNKNOWN`，可用在筛选、判断等场景。

注：`::=`是**巴科斯-诺尔范式**(BNF)中的符号，用在表示“定义为”或“由……组成”，常用在描述语法规则。比如：`布尔表达式 ::= [ NOT ] 原子条件 ...` ，意思是“布尔表达式的语法结构定义为：可选的`NOT`加上原子条件，再加上后续可能的组合规则”。 简单说，它就是语法定义里的“等于”，用来明确某个语法元素是由哪些部分组成的。

### 二、SQL筛选条件的作用场景及位置

在SQL中，筛选条件（本质是布尔表达式）常用在以下子句，各自**作用场景**不同：

*   `WHERE`**子句**  
    最常用的筛选条件，用在**过滤FROM子句中指定的表或视图中的行**，在数据分组（GROUP BY）之前执行。  
    如：`SELECT * FROM students WHERE age > 18;`（筛选年龄大于18的学生）
    
*   `HAVING`**子句**  
    用在**过滤GROUP BY子句分组后的结果集**，筛选的是“组”而非单个行，通常与聚合函数配合使用。  
    如：`SELECT class, AVG(score) FROM students GROUP BY class HAVING AVG(score) > 80;`（筛选平均分大于80的班级）
    
*   `JOIN ... ON`**子句**  
    `ON`后的条件用在**指定多表连接时的关联规则**，筛选符合条件的连接记录（即确定两表行之间的匹配关系）。  
    如：`SELECT * FROM orders JOIN users ON orders.user_id = users.id;`（只连接用户ID匹配的订单和用户记录）
    
*   `CASE`**表达式**  
    虽然不是子句，但CASE中的条件（如：`WHEN`后的表达式）也是筛选逻辑，用在**根据条件返回不同结果**，常用在字段值的转换或分类。  
    如：`SELECT name, CASE WHEN score >= 60 THEN '及格' ELSE '不及格' END AS result FROM exams;`（根据分数判断是否及格）
    

此外，SQL筛选条件还可能出现在其他场景（如：`CHECK`约束，用在限制表中字段的取值范围）。

#### 1、`HAVING`子句中筛选条件的位置

`HAVING`子句用在对**聚合函数处理后的结果**进行筛选，必须跟在`GROUP BY`子句之后（若没有`GROUP BY`，则对整个结果集的聚合结果筛选）。

语法结构：

```sql
SELECT 列名, 聚合函数(列名)
FROM 表名
[WHERE 行级筛选条件]
GROUP BY 列名
HAVING 聚合结果筛选条件; -- 此处放置针对聚合结果的条件
```

注：这里可看到筛选条件在`WHERE`、`HAVING`子句中的位置。

示例：筛选订单总数大于100的用户

```sql
SELECT user_id, COUNT(order_id) AS total_orders
FROM orders
GROUP BY user_id
HAVING total_orders > 100; -- 对COUNT的结果筛选
```

#### 2、`JOIN...ON`子句中筛选条件的位置

`ON`子句用在**指定连接表时的匹配条件**，直接跟在`JOIN`关键字之后，用在过滤两个表之间的关联行。

语法结构：

```sql
SELECT 列名
FROM 表1
JOIN 表2 ON 表1.列 = 表2.列 [AND 额外连接条件]; -- 此处放置连接筛选条件
[WHERE 整体结果行级筛选条件];
```

注：这里可看到筛选条件在`ON`、`WHERE`子句中的位置。

示例：连接用户表和订单表，只匹配2023年的订单

```sql
SELECT u.name, o.order_id
FROM users u
JOIN orders o ON u.id = o.user_id AND o.create_time >= '2023-01-01'; -- 连接时筛选2023年订单
```

**区别**：`ON`跟的是在连接时过滤关联数据的筛选条件，`HAVING`跟的是在聚合后过滤结果的筛选条件，二者均独立于`WHERE`（`WHERE`跟的是在连接/分组前进行行级筛选条件）。

### 三、分类介绍SQL筛选条件及相关子句

#### 1、基础筛选子句：ON与WHERE

`ON`和`WHERE`是SQL中最基础也最常用的筛选子句，虽然功能相似但应用场景不同。

##### （1）WHERE子句

**语法**：`SELECT 字段列表 FROM 表名 WHERE 筛选条件`  
**解析**：`WHERE`子句用在**表数据被查询或关联前**筛选记录，作用于整个表或已关联的结果集。它不能直接引用聚合函数或`GROUP BY`中定义的别名，主要用在行级筛选。

**示例1**：从员工表中筛选部门为"研发部"的员工

```sql
SELECT id, name, department 
FROM employees 
WHERE department = '研发部';
```

**输出结果**：

| id | name | department |
| --- | --- | --- |
| 101 | 张三 | 研发部 |
| 103 | 王五 | 研发部 |
| 105 | 赵六 | 研发部 |

**示例2**：多表查询中使用WHERE筛选

```sql
SELECT e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.location = '北京';  -- 筛选位于北京的部门的员工
```

##### （2）ON子句

**语法**：`FROM 表1 JOIN 表2 ON 连接条件 [AND 额外筛选条件]`  
**解析**：`ON`子句专门用在**定义多表连接时的关联条件**，在表连接过程中就对数据进行筛选，只保留符合连接条件的记录。它可以包含除了连接条件外的额外筛选条件，这些条件仅影响当前连接的表。

**示例1**：两表连接时使用ON筛选

```sql
SELECT e.name, p.project_name
FROM employees e
LEFT JOIN projects p 
  ON e.id = p.leader_id 
  AND p.status = '进行中';  -- 只关联状态为"进行中"的项目
```

**示例2**：ON与WHERE的区别

```sql
-- 使用ON筛选：会保留所有员工，即使没有进行中的项目
SELECT e.name, p.project_name
FROM employees e
LEFT JOIN projects p ON e.id = p.leader_id AND p.status = '进行中';

-- 使用WHERE筛选：只会保留有进行中项目的员工
SELECT e.name, p.project_name
FROM employees e
LEFT JOIN projects p ON e.id = p.leader_id
WHERE p.status = '进行中';
```

#### 2、基础比较筛选条件

基础比较筛选通过比较运算符对字段值进行判断，用在数值、字符串、日期等多种数据类型，通常在`WHERE`或`ON`子句中使用。

##### （1）等于（=）

**语法**：`WHERE/ON 字段名 = 值`  
**解析**：筛选出字段值与指定值完全相等的记录，字符串需用单引号包裹，日期格式需符合数据库要求。

**示例**：查询职位为"工程师"的员工

```sql
SELECT id, name, position 
FROM employees 
WHERE position = '工程师';
```

**输出结果**：

| id | name | position |
| --- | --- | --- |
| 101 | 张三 | 工程师 |
| 103 | 王五 | 工程师 |

##### （2）不等于（!= 或 <>）

**语法**：`WHERE/ON 字段名 != 值` 或 `WHERE/ON 字段名 <> 值`  
**解析**：筛选出字段值与指定值不相等的记录，两种运算符功能完全相同。

**示例**：查询工资不等于5000元的员工

```sql
SELECT id, name, salary 
FROM employees 
WHERE salary != 5000;
```

**输出结果**：

| id | name | salary |
| --- | --- | --- |
| 101 | 张三 | 6500 |
| 102 | 李四 | 4800 |
| 104 | 孙七 | 7200 |

##### （3）大于（>）与小于（<）

**语法**：`WHERE/ON 字段名 > 值` 和 `WHERE/ON 字段名 < 值`  
**解析**：分别筛选出字段值大于或小于指定值的记录，主要用在数值和日期类型。

**示例**：查询年龄大于30岁且入职时间在2023年之前的员工

```sql
SELECT id, name, age, hire_date 
FROM employees 
WHERE age > 30 AND hire_date < '2023-01-01';
```

**输出结果**：

| id | name | age | hire\_date |
| --- | --- | --- | --- |
| 103 | 王五 | 35 | 2021-11-30 |

##### （4）大于等于（>=）与小于等于（<=）

**语法**：`WHERE/ON 字段名 >= 值` 和 `WHERE/ON 字段名 <= 值`  
**解析**：分别筛选出字段值大于等于或小于等于指定值的记录，包含等于的情况。

**示例**：查询工资在4000到6000元之间的员工

```sql
SELECT id, name, salary 
FROM employees 
WHERE salary >= 4000 AND salary <= 6000;
```

**输出结果**：

| id | name | salary |
| --- | --- | --- |
| 102 | 李四 | 4800 |
| 103 | 王五 | 5200 |
| 105 | 赵六 | 4500 |

#### 3、范围筛选条件

范围筛选条件用在判断字段值是否在指定的区间内，用在需要提取某个范围内数据的场景。

##### （1）BETWEEN...AND...

**语法**：`WHERE/ON 字段名 BETWEEN 值1 AND 值2`  
**解析**：筛选出字段值在值1和值2之间（包含边界值）的记录，等价于`>= 值1 AND <= 值2`。注意值1必须小于等于值2，否则会返回空结果。

**示例1**：查询2023年入职的员工

```sql
SELECT id, name, hire_date 
FROM employees 
WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31';
```

**输出结果**：

| id | name | hire\_date |
| --- | --- | --- |
| 102 | 李四 | 2023-03-20 |
| 105 | 赵六 | 2023-09-05 |

**示例2**：在连接条件中使用范围筛选

```sql
SELECT o.order_id, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id
  AND o.order_date BETWEEN '2023-01-01' AND '2023-06-30';
```

##### （2）NOT BETWEEN...AND...

**语法**：`WHERE/ON 字段名 NOT BETWEEN 值1 AND 值2`  
**解析**：与`BETWEEN`相反，筛选出字段值不在值1和值2之间的记录，等价于`< 值1 OR > 值2`。

**示例**：查询工资不在3000到6000元之间的员工

```sql
SELECT id, name, salary 
FROM employees 
WHERE salary NOT BETWEEN 3000 AND 6000;
```

**输出结果**：

| id | name | salary |
| --- | --- | --- |
| 101 | 张三 | 6500 |
| 104 | 孙七 | 7200 |

#### 4、集合筛选条件

集合筛选条件用在判断字段值是否属于指定的离散值集合，用在需要匹配多个可能值的场景。

##### （1）IN

**语法**：`WHERE/ON 字段名 IN (值1, 值2, ..., 值n)`  
**解析**：筛选出字段值等于括号中任意一个值的记录，等价于多个`OR`条件的组合（`= 值1 OR = 值2 OR ...`）。括号中可以包含数值、字符串或子查询结果。

**示例1**：查询部门为研发部或市场部的员工

```sql
SELECT id, name, department 
FROM employees 
WHERE department IN ('研发部', '市场部');
```

**输出结果**：

| id | name | department |
| --- | --- | --- |
| 101 | 张三 | 研发部 |
| 103 | 王五 | 研发部 |
| 104 | 孙七 | 市场部 |
| 105 | 赵六 | 研发部 |

**示例2**：在连接条件中使用IN

```sql
SELECT e.name, p.project_name
FROM employees e
JOIN projects p ON e.id = p.leader_id
  AND p.priority IN ('高', '中');
```

##### （2）NOT IN

**语法**：`WHERE/ON 字段名 NOT IN (值1, 值2, ..., 值n)`  
**解析**：与`IN`相反，筛选出字段值不等于括号中任何一个值的记录，等价于`NOT (字段名 IN (...))`。

**示例**：查询既不在研发部也不在市场部的员工

```sql
SELECT id, name, department 
FROM employees 
WHERE department NOT IN ('研发部', '市场部');
```

**输出结果**：

| id | name | department |
| --- | --- | --- |
| 102 | 李四 | 人事部 |

#### 5、模糊匹配筛选条件

模糊匹配用在对字符串类型字段进行模式匹配，用在需要根据部分字符查找记录的场景。

##### （1）LIKE

**语法**：`WHERE/ON 字段名 LIKE '模式字符串'`  
**解析**：通过通配符匹配字符串的部分内容，常用通配符包括：

*   `%`：匹配任意长度的字符串（包括空字符串）
    
*   `_`：匹配单个字符
    

**示例1**：查询姓"张"的员工

```sql
SELECT id, name 
FROM employees 
WHERE name LIKE '张%';
```

**输出结果**：

| id | name |
| --- | --- |
| 101 | 张三 |

**示例2**：查询邮箱为gmail邮箱的员工

```sql
SELECT id, name, email 
FROM employees 
WHERE email LIKE '%@gmail.com';
```

**输出结果**：

| id | name | email |
| --- | --- | --- |
| 101 | 张三 | zhangsan@gmail.com |
| 105 | 赵六 | zhaoliu@gmail.com |

##### （2）NOT LIKE

**语法**：`WHERE/ON 字段名 NOT LIKE '模式字符串'`  
**解析**：与`LIKE`相反，筛选出不匹配指定模式的记录。

**示例**：查询不是qq邮箱的员工

```sql
SELECT id, name, email 
FROM employees 
WHERE email NOT LIKE '%@qq.com';
```

##### （3）REGEXP/RLIKE（正则表达式匹配）

**语法**：`WHERE/ON 字段名 REGEXP '正则表达式'`  
**解析**：通过正则表达式进行复杂的模式匹配，功能比`LIKE`更强大。不同数据库对正则表达式的支持略有差异。

**示例**：查询手机号以138开头的员工（MySQL）

```sql
SELECT id, name, phone 
FROM employees 
WHERE phone REGEXP '^138[0-9]{8}$';
```

#### 6、空值筛选条件

空值（NULL）在SQL中表示未知或缺失的值，与空字符串不同，需要使用专门的运算符进行判断。

##### （1）IS NULL

**语法**：`WHERE/ON 字段名 IS NULL`  
**解析**：筛选出字段值为NULL的记录，不能使用`= NULL`进行判断，因为NULL不等于任何值（包括自身）。

**示例**：查询没有填写手机号的员工

```sql
SELECT id, name, phone 
FROM employees 
WHERE phone IS NULL;
```

**输出结果**：

| id | name | phone |
| --- | --- | --- |
| 103 | 王五 | NULL |

##### （2）IS NOT NULL

**语法**：`WHERE/ON 字段名 IS NOT NULL`  
**解析**：筛选出字段值不为NULL的记录，即存在有效数据的记录。

**示例**：查询填写了邮箱地址的员工

```sql
SELECT id, name, email 
FROM employees 
WHERE email IS NOT NULL;
```

#### 7、逻辑组合筛选条件

逻辑运算符用在组合多个筛选条件，实现复杂的筛选逻辑，可在`WHERE`或`ON`子句中使用。

##### （1）AND

**语法**：`WHERE/ON 条件1 AND 条件2 [AND 条件3 ...]`  
**解析**：当所有条件都为真时，记录才会被选中，相当于"并且"的逻辑关系。

**示例**：查询研发部且工资大于6000元的员工

```sql
SELECT id, name, department, salary 
FROM employees 
WHERE department = '研发部' AND salary > 6000;
```

**输出结果**：

| id | name | department | salary |
| --- | --- | --- | --- |
| 101 | 张三 | 研发部 | 6500 |

##### （2）OR

**语法**：`WHERE/ON 条件1 OR 条件2 [OR 条件3 ...]`  
**解析**：只要有一个条件为真，记录就会被选中，相当于"或者"的逻辑关系。

**示例**：查询工资大于7000元或年龄小于25岁的员工

```sql
SELECT id, name, age, salary 
FROM employees 
WHERE salary > 7000 OR age < 25;
```

##### （3）NOT

**语法**：`WHERE/ON NOT 条件`  
**解析**：对条件的结果取反，即条件为假时记录被选中。

**示例**：查询不在人事部的员工

```sql
SELECT id, name, department 
FROM employees 
WHERE NOT department = '人事部';
```

##### （4）括号改变优先级

当组合多个逻辑运算符时，使用括号`()`可以改变运算优先级，明确执行顺序。

**示例**：查询研发部中年龄大于30岁或工资大于6000元的员工

```sql
SELECT id, name, department, age, salary 
FROM employees 
WHERE department = '研发部' AND (age > 30 OR salary > 6000);
```

#### 8、子查询相关筛选条件

子查询相关筛选条件用在根据子查询的结果进行筛选，用在需要关联多个表数据的复杂查询。

##### （1）EXISTS

**语法**：`WHERE EXISTS (子查询)`  
**解析**：如果子查询返回至少一行记录，则条件为真，记录被选中。`EXISTS`只关注子查询是否有结果，不关心具体内容。

**示例**：查询有订单记录的客户

```sql
SELECT id, name 
FROM customers c 
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
```

##### （2）NOT EXISTS

**语法**：`WHERE NOT EXISTS (子查询)`  
**解析**：与`EXISTS`相反，如果子查询没有返回任何记录，则条件为真。

**示例**：查询没有订单记录的客户

```sql
SELECT id, name 
FROM customers c 
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
```

##### （3）ALL

**语法**：`WHERE 字段名 比较运算符 ALL (子查询)`  
**解析**：字段值与子查询返回的所有值比较，当所有比较都为真时，条件为真。

**示例**：查询工资高于所有实习生工资的正式员工

```sql
SELECT id, name, salary 
FROM employees 
WHERE position = '正式员工' 
  AND salary > ALL (SELECT salary FROM employees WHERE position = '实习生');
```

##### （4）ANY/SOME

**语法**：`WHERE 字段名 比较运算符 ANY (子查询)`  
**解析**：字段值与子查询返回的任何一个值比较，只要有一个比较为真，条件就为真。

**示例**：查询工资高于至少一个实习生工资的正式员工

```sql
SELECT id, name, salary 
FROM employees 
WHERE position = '正式员工' 
  AND salary > ANY (SELECT salary FROM employees WHERE position = '实习生');
```

#### 9、分组筛选条件

分组筛选条件用在对分组后的结果进行筛选，与`GROUP BY`子句配合使用。

##### HAVING

**语法**：`GROUP BY 字段名 HAVING 分组条件`  
**解析**：`HAVING`子句用在筛选分组后的结果，类似于`WHERE`但作用于分组。`WHERE`在分组前筛选记录，`HAVING`在分组后筛选组。

**示例1**：查询员工人数超过2人的部门

```sql
SELECT department, COUNT(*) AS employee_count 
FROM employees 
GROUP BY department 
HAVING COUNT(*) > 2;
```

**输出结果**：

| department | employee\_count |
| --- | --- |
| 研发部 | 3 |

**示例2**：查询平均工资大于5000元的部门

```sql
SELECT department, AVG(salary) AS avg_salary 
FROM employees 
GROUP BY department 
HAVING AVG(salary) > 5000;
```

#### 10、条件表达式筛选

条件表达式允许在筛选中使用复杂的条件判断逻辑，实现动态的筛选规则。

##### CASE WHEN

**语法**：

```
WHERE CASE
    WHEN 条件1 THEN 结果1
    WHEN 条件2 THEN 结果2
    ...
    ELSE 结果N
  END 比较运算符 值
```

**解析**：`CASE WHEN`用在创建条件表达式，根据不同条件返回不同结果，然后可以与其他值进行比较。

**示例**：查询成年员工（18-60岁）

```sql
SELECT id, name, age 
FROM employees 
WHERE CASE 
    WHEN age >= 18 AND age <= 60 THEN '成年'
    ELSE '非成年'
  END = '成年';
```

#### 11、特殊筛选函数

SQL提供了一些特殊函数，可用在实现特定的筛选需求。

##### （1）GREATEST

**语法**：`WHERE 字段名 > GREATEST(值1, 值2, ...)`  
**解析**：`GREATEST`返回参数中的最大值，可用在比较字段值是否大于多个值中的最大值。

**示例**：查询工资高于3000、4000、5000中最大值的员工

```sql
SELECT id, name, salary 
FROM employees 
WHERE salary > GREATEST(3000, 4000, 5000);
```

##### （2）LEAST

**语法**：`WHERE 字段名 < LEAST(值1, 值2, ...)`  
**解析**：`LEAST`返回参数中的最小值，可用在比较字段值是否小于多个值中的最小值。

**示例**：查询工资低于5000、6000、7000中最小值的员工

```sql
SELECT id, name, salary 
FROM employees 
WHERE salary < LEAST(5000, 6000, 7000);
```

#### SQL筛选条件及其应用场景总结

| 筛选类型 | 关键字/函数 | 应用场景 |
| --- | --- | --- |
| 基础筛选子句 | `WHERE`, `ON` | `WHERE`用在行级筛选，`ON`用在连接条件 |
| 基础比较 | `=`, `>`, `<`, `>=`, `<=` | 数值、日期、字符串的直接比较 |
| 范围筛选 | `BETWEEN...AND...` | 年龄范围、日期区间、价格区间筛选 |
| 集合筛选 | `IN`, `NOT IN` | 多值匹配、状态筛选、类型筛选 |
| 模糊匹配 | `LIKE`, `REGEXP` | 关键词搜索、格式校验、部分匹配 |
| 空值处理 | `IS NULL`, `IS NOT NULL` | 缺失数据识别、必填项验证 |
| 逻辑组合 | `AND`, `OR`, `NOT` | 多条件联合筛选、复杂逻辑判断 |
| 子查询关联 | `EXISTS`, `ALL`, `ANY` | 关联表数据筛选、集合比较 |
| 分组筛选 | `HAVING` | 统计结果过滤、聚合条件筛选 |
| 条件表达式 | `CASE WHEN` | 动态规则筛选、多场景适配 |
| 特殊函数 | `GREATEST`, `LEAST` | 多值比较、边界判断 |

### 四、常用SQL高级筛选技巧

#### 1、窗口函数与排序筛选（Top N/组内筛选）

窗口函数（Window Function）能在不聚合数据的前提下，对“组内数据”进行排序、排名或计算，结合筛选条件可实现“组内Top N”、“前后对比”等高级需求。

##### （1）组内Top N筛选（ROW\_NUMBER/RANK）

用`ROW_NUMBER()`给每组数据编号，再筛选编号≤N的记录（用在按类别取前几名）。

**语法**：

```sql
WITH 临时表名 AS (
  SELECT 
    字段列表,
    ROW_NUMBER() OVER (PARTITION BY 分组字段 ORDER BY 排序字段 DESC) AS 组内序号
  FROM 表名
)
SELECT * FROM 临时表名 WHERE 组内序号 <= N;
```

**解析**：

*   `PARTITION BY`：按指定字段分组（如按“部门”分组）
    
*   `ORDER BY`：组内排序（如按“工资”降序）
    
*   `ROW_NUMBER()`：每组内生成唯一序号（1,2,3...，相同值也会按顺序编号）
    
*   若需要“并列排名”，可替换为`RANK()`（相同值同序号，后续序号跳跃）或`DENSE_RANK()`（相同值同序号，后续序号连续）
    

**示例**：查询每个部门工资最高的2名员工

```sql
WITH dept_salary AS (
  SELECT 
    id, name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
  FROM employees
)
SELECT id, name, department, salary 
FROM dept_salary 
WHERE rn <= 2; -- 取每组前2名
```

**输出结果**（示例）：

| id | name | department | salary |
| --- | --- | --- | --- |
| 101 | 张三 | 研发部 | 6500 |
| 103 | 王五 | 研发部 | 5200 |
| 104 | 孙七 | 市场部 | 7200 |
| 102 | 李四 | 人事部 | 4800 |

##### （2）前后数据对比筛选（LAG/LEAD）

用`LAG()`（取前N行数据）或`LEAD()`（取后N行数据）获取“相邻记录”，再通过对比实现“连续增长/下降”、“前后差异”等筛选。

**语法**：

```sql
WITH 临时表名 AS (
  SELECT 
    字段列表,
    LAG(对比字段, N) OVER (ORDER BY 排序字段) AS 前N行值,  -- N默认为1
    LEAD(对比字段, N) OVER (ORDER BY 排序字段) AS 后N行值
  FROM 表名
)
SELECT * FROM 临时表名 WHERE 对比条件; -- 如：当前值 > 前1行值（连续增长）
```

**示例**：查询连续两个月销售额增长的月份（假设`sales`表有`month`、`amount`字段）

```sql
WITH sales_trend AS (
  SELECT 
    month,
    amount,
    LAG(amount) OVER (ORDER BY month) AS last_month_amount  -- 取上月销售额
  FROM sales
)
SELECT month, amount, last_month_amount
FROM sales_trend
WHERE amount > last_month_amount; -- 本月 > 上月（增长）
```

**输出结果**：

| month | amount | last\_month\_amount |
| --- | --- | --- |
| 2023-02 | 12000 | 10000 |
| 2023-03 | 15000 | 12000 |

#### 2、递归CTE与层级数据筛选（树形结构）

递归CTE（Common Table Expression，公用表表达式）用在处理“层级数据”（如：部门树、评论回复、地区层级），可实现“查询某节点的所有子节点”、“查询某节点的所有父节点”等筛选。

##### （1）筛选某节点的所有子节点（向下递归）

通过“初始条件（根节点）+ 递归条件（子节点关联父节点）”遍历所有子节点。

**语法**：

```sql
WITH RECURSIVE 递归表名 AS (
  -- 1. 初始查询：定位根节点（需要筛选的起始节点）
  SELECT * FROM 表名 WHERE 根节点条件
  UNION ALL
  -- 2. 递归查询：关联子节点（子节点的父ID = 上一层的ID）
  SELECT 子.* FROM 表名 子
  INNER JOIN 递归表名 父 ON 子.父ID字段 = 父.ID字段
)
SELECT * FROM 递归表名; -- 结果包含根节点及所有子节点
```

**示例**：查询“研发部”（ID=1）的所有下属部门（假设`departments`表有`id`、`name`、`parent_id`字段）

```sql
WITH RECURSIVE dept_tree AS (
  -- 初始：找到研发部（根节点）
  SELECT id, name, parent_id 
  FROM departments 
  WHERE id = 1  -- 研发部ID=1
  UNION ALL
  -- 递归：找到所有子部门（parent_id = 上一层的id）
  SELECT d.id, d.name, d.parent_id 
  FROM departments d
  INNER JOIN dept_tree dt ON d.parent_id = dt.id
)
SELECT * FROM dept_tree;
```

**输出结果**（示例）：

| id | name | parent\_id |
| --- | --- | --- |
| 1 | 研发部 | NULL |
| 2 | 后端组 | 1 |
| 3 | 前端组 | 1 |
| 4 | 测试小组 | 2 |

##### （2）筛选某节点的所有父节点（向上递归）

从子节点出发，递归查询父节点，直到根节点（parent\_id为NULL）。

**示例**：查询“测试小组”（ID=4）的所有上级部门

```sql
WITH RECURSIVE dept_parents AS (
  -- 初始：找到测试小组（子节点）
  SELECT id, name, parent_id 
  FROM departments 
  WHERE id = 4
  UNION ALL
  -- 递归：找到父部门（父部门的id = 上一层的parent_id）
  SELECT d.id, d.name, d.parent_id 
  FROM departments d
  INNER JOIN dept_parents dp ON d.id = dp.parent_id
)
SELECT * FROM dept_parents;
```

**输出结果**：

| id | name | parent\_id |
| --- | --- | --- |
| 4 | 测试小组 | 2 |
| 2 | 后端组 | 1 |
| 1 | 研发部 | NULL |

#### 3、正则表达式高级匹配（复杂格式筛选）

基础`LIKE`只能处理简单模糊匹配，而正则表达式（`REGEXP`/`RLIKE`）支持“捕获组”、“零宽断言”、“重复模式”等高级语法，可筛选符合复杂格式的数据（如手机号、邮箱、身份证号的严格校验）。

##### （1）复杂格式校验（如身份证号）

**语法**：`WHERE 字段名 REGEXP '正则模式'`  
（注：不同数据库正则语法略有差异，以下以MySQL为例）

**示例**：筛选18位身份证号（前6位地址码，8位生日，3位顺序码，1位校验码）

```sql
SELECT id, name, id_card 
FROM users 
WHERE id_card REGEXP '^[1-9]\\d{5}(19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[0-9Xx]$';
```

**正则解析**：

*   `^[1-9]\\d{5}`：前6位（非0开头，共6位）
    
*   `(19|20)\\d{2}`：年份（19xx或20xx）
    
*   `(0[1-9]|1[0-2])`：月份（01-12）
    
*   `(0[1-9]|[12]\\d|3[01])`：日期（01-31）
    
*   `\\d{3}[0-9Xx]`：最后4位（3位顺序码+1位校验码，校验码可为X/x）
    

##### （2）提取匹配内容并筛选

结合`REGEXP_SUBSTR`（提取匹配的子串），可先从字段中提取特定内容，再筛选。

**示例**：从日志中筛选“ERROR”级别的记录，并提取错误时间

```sql
SELECT 
  log_id,
  -- 从日志内容中提取时间（格式：[2023-10-01 12:30:00]）
  REGEXP_SUBSTR(log_content, '\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\]') AS error_time
FROM logs 
WHERE log_content REGEXP 'ERROR'; -- 先筛选包含ERROR的日志
```

#### 4、JSON数据筛选（非结构化数据）

现代数据库（如MySQL 5.7+、PostgreSQL、SQL Server）支持JSON类型字段，可通过JSON函数直接筛选JSON中的数据，无需解析为结构化字段。

##### （1）筛选JSON对象中的特定值

**语法**（以MySQL为例）：

*   `JSON_EXTRACT(json字段, '$.键名')`：提取JSON中指定键的值
    
*   简化写法：`json字段->'$.键名'`（提取为字符串）、`json字段->>'$.键名'`（提取为原生类型）
    

**示例**：筛选“用户标签”中包含“VIP”的用户（假设`users`表有`tags`字段，存储JSON：`{"level":"VIP", "interest":["sports","music"]}`）

```sql
SELECT id, name, tags 
FROM users 
WHERE tags->>'$.level' = 'VIP'; -- 提取level字段，筛选值为VIP的用户
```

##### （2）筛选JSON数组中的元素

**示例**：筛选“兴趣标签”包含“music”的用户（JSON数组匹配）

```sql
SELECT id, name, tags 
FROM users 
WHERE JSON_CONTAINS(tags->'$.interest', '"music"'); -- 检查数组是否包含"music"
```

**解析**：`JSON_CONTAINS(json数组, 目标值)`：判断JSON数组是否包含指定元素（注意目标值需用双引号包裹，如`"music"`）

#### 5、地理空间筛选（空间数据）

支持空间数据的数据库（如PostgreSQL+PostGIS、MySQL 8.0+）可通过空间函数筛选“地理位置相关”的数据（如“某区域内的店铺”“距离某点5公里内的用户”）。

##### （1）筛选指定区域内的点（如：圆形区域）

**语法**（以PostgreSQL+PostGIS为例）：

*   `ST_DWithin(点1, 点2, 距离)`：判断两点距离是否小于等于指定值（单位：米）
    

**示例**：筛选“东方明珠（经纬度：121.499588, 31.239752）”周边3公里内的店铺

```sql
SELECT id, name, address 
FROM shops 
WHERE ST_DWithin(
  shops.location,  -- 店铺位置（geometry类型）
  ST_SetSRID(ST_MakePoint(121.499588, 31.239752), 4326),  -- 东方明珠坐标（转换为地理坐标）
  3000  -- 距离3000米（3公里）
);
```

**解析**：

*   `ST_MakePoint(经度, 纬度)`：创建点坐标
    
*   `ST_SetSRID(..., 4326)`：指定坐标系（4326为WGS84，即GPS坐标系）
    
*   `ST_DWithin`：判断两点距离是否在指定范围内
    

##### （2）筛选多边形区域内的点

**示例**：筛选“某商圈多边形范围内”的店铺

```sql
SELECT id, name 
FROM shops 
WHERE ST_Within(
  shops.location,
  -- 多边形坐标（按顺序定义顶点，闭合多边形）
  ST_PolygonFromText('POLYGON((116.3 39.9, 116.4 39.9, 116.4 40.0, 116.3 40.0, 116.3 39.9))', 4326)
);
```

**解析**：`ST_Within(点, 多边形)`：判断点是否在多边形内部

#### 6、动态条件筛选（参数化/条件拼接）

当筛选条件不固定（如用户可动态选择筛选维度），可通过“参数化查询”或“条件拼接”实现动态逻辑，避免硬编码。

##### （1）基于变量的动态筛选（用在存储过程/脚本）

**示例**（MySQL存储过程）：根据输入参数动态筛选员工

```sql
CREATE PROCEDURE get_employees(
  IN p_department VARCHAR(50),  -- 部门参数（可为NULL，表示不筛选）
  IN p_min_salary DECIMAL(10,2)  -- 最低薪资参数（可为NULL，表示不筛选）
)
BEGIN
  SELECT id, name, department, salary 
  FROM employees 
  WHERE 
    (p_department IS NULL OR department = p_department)  -- 若参数为NULL，则忽略该条件
    AND (p_min_salary IS NULL OR salary >= p_min_salary);
END;
```

**调用示例**：

*   筛选“研发部”且薪资≥5000的员工：`CALL get_employees('研发部', 5000);`
    
*   仅筛选薪资≥6000的员工：`CALL get_employees(NULL, 6000);`
    

##### （2）复杂动态条件（结合CASE WHEN）

**示例**：根据“用户类型”动态切换筛选规则（VIP用户查近30天数据，普通用户查近7天）

```sql
SELECT id, user_id, order_time 
FROM orders 
WHERE order_time >= CASE 
  WHEN (SELECT user_type FROM users WHERE id = orders.user_id) = 'VIP' 
  THEN DATE_SUB(CURDATE(), INTERVAL 30 DAY)  -- VIP：近30天
  ELSE DATE_SUB(CURDATE(), INTERVAL 7 DAY)   -- 普通用户：近7天
END;
```

#### 7、聚合函数嵌套与累计筛选

通过“聚合函数+窗口函数”的嵌套，可实现“累计值筛选”、“占比筛选”等高级统计筛选（如：“累计销售额达100万的日期”“某产品销量占比超20%的区域”）。

##### （1）累计值达标筛选

**示例**：查询2023年累计销售额首次突破100万的日期

```sql
WITH sales_cumulative AS (
  SELECT 
    sale_date,
    amount,
    -- 累计销售额（按日期排序，累加金额）
    SUM(amount) OVER (ORDER BY sale_date) AS cum_amount 
  FROM sales 
  WHERE YEAR(sale_date) = 2023
)
SELECT sale_date, cum_amount 
FROM sales_cumulative 
WHERE cum_amount >= 1000000  -- 累计达标
ORDER BY sale_date 
LIMIT 1;  -- 取首次达标的日期
```

##### （2）占比筛选（某分组占总体比例）

**示例**：筛选“销量占比超过20%”的产品类别

```sql
WITH category_sales AS (
  SELECT 
    category,
    SUM(amount) AS cat_amount,
    -- 总销售额（所有类别的总和）
    SUM(SUM(amount)) OVER () AS total_amount 
  FROM products 
  GROUP BY category
)
SELECT category, cat_amount, (cat_amount/total_amount)*100 AS ratio 
FROM category_sales 
WHERE (cat_amount/total_amount) > 0.2; -- 占比超20%
```

#### 8、子查询优化与筛选改写

复杂筛选场景中，直接使用子查询可能效率较低，通过“子查询改写为JOIN”“提前过滤”等技巧可提升性能，同时实现同等筛选效果。

##### （1）关联子查询改写为JOIN（提升效率）

**原查询**（关联子查询，可能多次执行）：

```sql
-- 筛选有订单的用户（关联子查询）
SELECT id, name 
FROM users u 
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'paid');
```

**改写为JOIN（更高效）**：

```sql
SELECT DISTINCT u.id, u.name  -- DISTINCT去重（避免用户多条订单导致重复）
FROM users u 
INNER JOIN orders o ON u.id = o.user_id 
WHERE o.status = 'paid';  -- 提前筛选已支付订单，减少关联数据量
```

##### （2）提前过滤（减少参与计算的数据量）

在子查询或JOIN前先筛选数据，减少后续处理的数据量（尤其用在大表）。

**示例**：查询“2023年销售额最高的部门”（先筛选2023年数据，再聚合）

```sql
-- 先筛选2023年数据，再计算部门销售额（比全表聚合更高效）
WITH 2023_sales AS (
  SELECT department, amount 
  FROM sales 
  WHERE sale_date BETWEEN '2023-01-01' AND '2023-12-31'
)
SELECT department, SUM(amount) AS total 
FROM 2023_sales 
GROUP BY department 
ORDER BY total DESC 
LIMIT 1;
```

到这儿，SQL筛选条件拆解结束。懂了这知识，我们就可以运用SQL筛选条件帮我们从一堆数据里挑出我们想要的。不管是简单找个符合条件的行，还是复杂的分组筛选、多表关联挑数据，都是用布尔表达式判断 “要不要这条”。掌握好这些SQL筛选条件，查数据就能又快又准，不用在一堆无关数据里翻哈。