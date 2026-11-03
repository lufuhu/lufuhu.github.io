---
title: SQL筛选重复数据与去重查询分清用法，多表去重写法实战示例
lastUpdated: 2026-09-10 04:00:00
---


SQL“筛选重复数据”和“去重查询”是SQL中两个不同的操作，区别在目标不同：SQL“筛选重复数据”是**找出重复的数据**，SQL“去重查询”是**保留唯一的数据**。下面我们一起来详细拆解：

### 一、创建模拟数据表及插入模拟数据

为了涵盖所有的SQL去重方法，下面创建2张表并插入模拟数据：

#### 1、`employees`表（员工信息表）

```sql
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    position VARCHAR(50),
    department VARCHAR(50),
    hire_date DATE,
    birth_date DATE,
    salary DECIMAL(10,2)
);

-- 插入模拟数据（含重复项）
INSERT INTO employees VALUES
(1, '张三', '开发工程师', '技术部', '2020-01-15', '1990-05-20', 8000),
(2, '李四', '产品经理', '产品部', '2019-03-20', '1988-11-05', 10000),
(3, '张三', '高级开发', '技术部', '2021-05-10', '1990-05-20', 12000),  -- 与1重复name
(4, '王五', '测试工程师', '测试部', '2020-07-01', '1992-08-15', 7500),
(5, '赵六', 'UI设计师', '设计部', '2018-10-25', '1993-03-30', 9000),
(6, '李四', '高级产品经理', '产品部', '2022-01-05', '1988-11-05', 15000),  -- 与2重复name
(7, '孙七', '开发工程师', '技术部', '2020-01-15', '1991-07-12', 8500),
(8, '张三', '架构师', '技术部', '2023-03-20', '1990-05-20', 18000);  -- 与1、3重复name
```

#### 2、`task`表（任务信息表）

```sql
CREATE TABLE task (
    task_id INT,
    task_name VARCHAR(100),
    start_time DATETIME,
    end_time DATETIME,
    status VARCHAR(20)
);

-- 插入模拟数据（含重复项）
INSERT INTO task VALUES
(101, '用户登录模块开发', '2023-05-01 09:00', '2023-05-05 18:00', '已完成'),
(101, '用户登录模块开发', '2023-05-01 10:30', '2023-05-06 12:00', '已取消'),  -- 重复task_id
(102, '订单支付接口', '2023-05-02 08:45', '2023-05-08 18:00', '进行中'),
(103, '商品列表优化', '2023-05-03 09:15', '2023-05-10 18:00', '已完成'),
(102, '订单支付接口', '2023-05-02 09:30', '2023-05-09 12:00', '已完成'),  -- 重复task_id
(104, '购物车逻辑开发', '2023-05-04 10:00', '2023-05-12 18:00', '进行中');
```

### 二、SQL筛选重复数据（找出重复项）

SQL筛选重复数据是查询出表中存在重复的记录，通常用在识别哪些数据存在重复，以便后续处理（如：后续删除重复项）。

#### 1、使用GROUP BY + HAVING（统计重复次数，最常用）组合

用在查询指定字段的重复值及重复次数，适合快速识别哪些数据存在重复。

##### （1）筛选`employees`表中`name`重复的数据

```sql
SELECT name, COUNT(*) AS 重复次数
FROM employees
GROUP BY name
HAVING COUNT(*) > 1;
```

**模拟结果：**

| name | 重复次数 |
| --- | --- |
| 张三 | 3 |
| 李四 | 2 |

##### （2）筛选`task`表中`task_id`重复的数据

```sql
SELECT task_id, task_name, COUNT(*) AS 重复次数
FROM task
GROUP BY task_id, task_name
HAVING COUNT(*) > 1;
```

**模拟结果：**

| task\_id | task\_name | 重复次数 |
| --- | --- | --- |
| 101 | 用户登录模块开发 | 2 |
| 102 | 订单支付接口 | 2 |

#### 2、使用窗口函数（ROW\_NUMBER()）

可查询出所有重复记录（包括重复组内的每条数据），便于查看重复数据的具体内容。

##### （1）筛选`employees`表中`name`重复的所有记录

```sql
SELECT * FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY name ORDER BY emp_id) AS rn
    FROM employees
) AS sub
WHERE name IN (
    SELECT name 
    FROM employees 
    GROUP BY name 
    HAVING COUNT(*) > 1
);
```

**模拟结果：**

| emp\_id | name | position | department | hire\_date | birth\_date | salary | rn |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 张三 | 开发工程师 | 技术部 | 2020-01-15 | 1990-05-20 | 8000.00 | 1 |
| 3 | 张三 | 高级开发 | 技术部 | 2021-05-10 | 1990-05-20 | 12000.00 | 2 |
| 8 | 张三 | 架构师 | 技术部 | 2023-03-20 | 1990-05-20 | 18000.00 | 3 |
| 2 | 李四 | 产品经理 | 产品部 | 2019-03-20 | 1988-11-05 | 10000.00 | 1 |
| 6 | 李四 | 高级产品经理 | 产品部 | 2022-01-05 | 1988-11-05 | 15000.00 | 2 |

##### （2）筛选`task`表中`task_id`重复的所有记录

```sql
SELECT * FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY task_id ORDER BY start_time) AS rn
    FROM task
) AS sub
WHERE task_id IN (
    SELECT task_id 
    FROM task 
    GROUP BY task_id 
    HAVING COUNT(*) > 1
);
```

**模拟结果：**

| task\_id | task\_name | start\_time | end\_time | status | rn |
| --- | --- | --- | --- | --- | --- |
| 101 | 用户登录模块开发 | 2023-05-01 09:00:00 | 2023-05-05 18:00:00 | 已完成 | 1 |
| 101 | 用户登录模块开发 | 2023-05-01 10:30:00 | 2023-05-06 12:00:00 | 已取消 | 2 |
| 102 | 订单支付接口 | 2023-05-02 08:45:00 | 2023-05-08 18:00:00 | 进行中 | 1 |
| 102 | 订单支付接口 | 2023-05-02 09:30:00 | 2023-05-09 12:00:00 | 已完成 | 2 |

#### 3、使用自连接

通过表与自身连接，找出指定字段值完全相同的重复记录，适合精准定位重复数据。

##### （1）筛选`employees`表中`name`和`birth_date`都重复的记录

```sql
SELECT t1.*
FROM employees t1
JOIN employees t2
  ON t1.name = t2.name 
     AND t1.birth_date = t2.birth_date 
     AND t1.emp_id < t2.emp_id; -- 避免重复匹配（如t1=1与t2=3、t1=3与t2=1视为同一组）
```

**模拟结果：**

| emp\_id | name | position | department | hire\_date | birth\_date | salary |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 张三 | 开发工程师 | 技术部 | 2020-01-15 | 1990-05-20 | 8000.00 |
| 1 | 张三 | 开发工程师 | 技术部 | 2020-01-15 | 1990-05-20 | 8000.00 |
| 3 | 张三 | 高级开发 | 技术部 | 2021-05-10 | 1990-05-20 | 12000.00 |
| 2 | 李四 | 产品经理 | 产品部 | 2019-03-20 | 1988-11-05 | 10000.00 |

##### （2）筛选`task`表中`task_id`和`task_name`都重复的记录

```sql
SELECT t1.*
FROM task t1
JOIN task t2
  ON t1.task_id = t2.task_id 
     AND t1.task_name = t2.task_name 
     AND t1.start_time < t2.start_time; -- 按开始时间区分重复项
```

**模拟结果：**

| task\_id | task\_name | start\_time | end\_time | status |
| --- | --- | --- | --- | --- |
| 101 | 用户登录模块开发 | 2023-05-01 09:00:00 | 2023-05-05 18:00:00 | 已完成 |
| 102 | 订单支付接口 | 2023-05-02 08:45:00 | 2023-05-08 18:00:00 | 进行中 |

#### SQL筛选重复数据方法小结

以上三种SQL筛选重复数据方法的适用场景：

*   `GROUP BY + HAVING`：快速统计重复值及次数，适合初步排查；
    
*   窗口函数：查看重复组内的所有记录，便于分析重复数据的差异；
    
*   自连接：精准定位完全重复的记录，适合需要详细对比重复项的场景。
    

我们根据实际需求选择合适的方法，可高效识别并处理表中的重复数据。

### 三、SQL去重查询（保留唯一数据）

SQL去重查询是从重复数据中筛选出唯一的记录，即：**去除重复项后保留需要的结果**。

#### 1、使用DISTINCT关键字

直接返回指定列的唯一值（单列或多列组合）。

##### （1）单列去重（查询唯一部门）

```sql
SELECT DISTINCT department FROM employees;
```

**模拟结果：**

| department |
| --- |
| 技术部 |
| 产品部 |
| 测试部 |
| 设计部 |

##### （2）多列去重（查询唯一姓名+职位组合）

```sql
SELECT DISTINCT name, position FROM employees;
```

**模拟结果：**

| name | position |
| --- | --- |
| 张三 | 开发工程师 |
| 李四 | 产品经理 |
| 张三 | 高级开发 |
| 王五 | 测试工程师 |
| 赵六 | UI设计师 |
| 李四 | 高级产品经理 |
| 孙七 | 开发工程师 |
| 张三 | 架构师 |

#### 2、使用GROUP BY子句

按指定列分组，默认返回每组的第一条记录（可结合聚合函数保留特定值）。

##### （1）单列去重（查询唯一姓名）

```sql
SELECT name FROM employees GROUP BY name;
```

**模拟结果：**

| name |
| --- |
| 张三 |
| 李四 |
| 王五 |
| 赵六 |
| 孙七 |

##### （2）多列去重（查询唯一姓名+部门+入职日期组合）

```sql
SELECT name, department, hire_date FROM employees 
GROUP BY name, department, hire_date;
```

**模拟结果：**

| name | department | hire\_date |
| --- | --- | --- |
| 张三 | 技术部 | 2020-01-15 |
| 李四 | 产品部 | 2019-03-20 |
| 张三 | 技术部 | 2021-05-10 |
| 王五 | 测试部 | 2020-07-01 |
| 赵六 | 设计部 | 2018-10-25 |
| 李四 | 产品部 | 2022-01-05 |
| 孙七 | 技术部 | 2020-01-15 |
| 张三 | 技术部 | 2023-03-20 |

##### （3）结合聚合函数（查询每个姓名的最小入职日期）

```sql
SELECT name, MIN(hire_date) AS first_hire_date FROM employees GROUP BY name;
```

**模拟结果：**

| name | first\_hire\_date |
| --- | --- |
| 张三 | 2020-01-15 |
| 李四 | 2019-03-20 |
| 王五 | 2020-07-01 |
| 赵六 | 2018-10-25 |
| 孙七 | 2020-01-15 |

#### 3、使用窗口函数（ROW\_NUMBER()）

为重复组内的记录编号，保留编号为1的记录（即每组的第一条）。

##### 按task\_id分组，取每组中start\_time最小的记录

```sql
SELECT task_id, task_name, start_time FROM (
    SELECT task_id, task_name, start_time,
           ROW_NUMBER() OVER (PARTITION BY task_id ORDER BY start_time) AS rn
    FROM task
) AS tmp WHERE rn = 1;
```

**模拟结果：**

| task\_id | task\_name | start\_time |
| --- | --- | --- |
| 101 | 用户登录模块开发 | 2023-05-01 09:00:00 |
| 102 | 订单支付接口 | 2023-05-02 08:45:00 |
| 103 | 商品列表优化 | 2023-05-03 09:15:00 |
| 104 | 购物车逻辑开发 | 2023-05-04 10:00:00 |

#### 4、使用子查询

##### （1）NOT EXISTS子查询（取重复姓名中emp\_id最小的记录）

```sql
SELECT emp_id, name, position FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM employees WHERE name = e.name AND emp_id < e.emp_id
);
```

**模拟结果：**

| emp\_id | name | position |
| --- | --- | --- |
| 1 | 张三 | 开发工程师 |
| 2 | 李四 | 产品经理 |
| 4 | 王五 | 测试工程师 |
| 5 | 赵六 | UI设计师 |
| 7 | 孙七 | 开发工程师 |

##### （2）IN子查询（取重复姓名中emp\_id最大的记录）

```sql
SELECT emp_id, name, salary FROM employees e
WHERE emp_id IN (SELECT MAX(emp_id) FROM employees GROUP BY name);
```

**模拟结果：**

| emp\_id | name | salary |
| --- | --- | --- |
| 8 | 张三 | 18000.00 |
| 6 | 李四 | 15000.00 |
| 4 | 王五 | 7500.00 |
| 5 | 赵六 | 9000.00 |
| 7 | 孙七 | 8500.00 |

#### 5、使用UNION操作符（合并两表姓名并去重）

合并多个查询结果时自动去重（UNION ALL不会去重）。

```sql
-- 先创建临时表salaries用于演示
CREATE TABLE salaries (name VARCHAR(50), salary DECIMAL(10,2));
INSERT INTO salaries VALUES
('张三', 9000), ('周八', 12000), ('王五', 8000);

-- 执行UNION去重
SELECT name FROM employees
UNION
SELECT name FROM salaries;
```

**模拟结果：**

| name |
| --- |
| 张三 |
| 李四 |
| 王五 |
| 赵六 |
| 孙七 |
| 周八 |

#### SQL去重查询方法小结

以上SQL去重方法，实际使用时需根据场景选择：

*   简单去重优先用`DISTINCT`或`GROUP BY`；
    
*   需要保留特定行（如最新/最早记录）时用窗口函数或子查询；
    
*   多表合并去重用`UNION`。
    

### 总结

**SQL筛选重复数据**：关注“哪些数据重复了”，结果包含重复的记录或重复组信息。  
**SQL去重查询**：关注“如何保留唯一数据”，结果是去除重复后的唯一记录。

两者操作方向相反，但我们要常结合使用（先筛选重复数据，再根据需求去重）。