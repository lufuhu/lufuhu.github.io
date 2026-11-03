---
title: SQL多聚合函数从基础到高级，条件聚合与性能优化20+场景解析
lastUpdated: 2026-09-21 04:00:00
---


在SQL查询中，如果我们想一次性看多个指标，比如按地区统计的时候，既要看总销售额，又想知道订单数和平均客单价，我们总不能分开写好几个SQL查询吧？其实，此时，我们可以同时使用多个聚合函数（以下简称为“`多聚合函数`”，注意与“`多维聚合函数`”不是一个意思）。我们只需在`SELECT`子句中列出多个聚合函数（如：`COUNT()`、`SUM()`、`AVG()`等等），配合`GROUP BY`对数据分组后，每个聚合函数将独立计算每组的统计结果。我们通过组合多个聚合指标，便可以将零散的数据转化为具有业务价值的结论，例如：同时统计销售额总和、订单数量和平均客单价。这样，可以让我们的业务的全局表现一目了然。下面我们从基础用法讲到高级技巧，再到避坑和性能优化，一次把多聚合函数搞明白，重点通过20+场景拆解来了解多聚合函数的高效使用方法。

#### 一、基础用法：分组 + 多指标统计

我们心心念念的多聚合函数的最基础使用方式，就是在`GROUP BY`分组后，在`SELECT`中并列多个聚合函数，实现“一组数据，多个指标”的统计效果。

例如：按地区统计销售业绩时，我们可同时计算总销售额、订单数和平均客单价：

```sql
SELECT 
  region,
  SUM(sales) AS total_sales,     -- 总销售额
  COUNT(order_id) AS order_count,-- 订单总数
  AVG(sales) AS avg_order        -- 平均客单价
FROM orders
GROUP BY region;
```

**基本规则**：

1、**非聚合列必须出现在`GROUP BY`中**：`SELECT`中未使用聚合函数的字段（如：`region`）必须全部包含在`GROUP BY`子句中，否则我们查询时可能报错或返回不可靠结果（MySQL非严格模式下可能不报错，但数据逻辑错误）。

2、**为聚合结果设置别名（`AS ...`）**：别名不仅提升结果的可读性，而且方便后续排序或引用，例如：

```
ORDER BY total_sales DESC
```

#### 二、高级技巧：让统计更灵活、更强大

##### 1、条件聚合：按不同规则统计同一指标

有时我们需要在同一分组内，按条件拆分统计同一指标。例如：我们要分别计算各部门中男性与女性员工的平均工资：

```sql
SELECT 
  department,
  AVG(CASE WHEN gender = '男' THEN salary END) AS male_avg,
  AVG(CASE WHEN gender = '女' THEN salary END) AS female_avg
FROM employees
GROUP BY department;
```

**说明**：

*   使用`CASE WHEN ... THEN ... END`为聚合函数添加“过滤条件”，实现“分组内二次筛选”。
    
*   PostgreSQL等数据库支持更简洁的`FILTER`语法，例如：
    
    ```
    AVG(salary) FILTER (WHERE gender = '男') AS male_avg
    ```
    

##### 2、多维度交叉统计：一次查询搞定多个层级

在制作业务报表时，我们常常需要同时展示“部门+性别”明细、“部门汇总”、“性别汇总”及“全局总计”。我们使用`GROUPING SETS`可一次性完成上述所有需求，避免多次查询：

```sql
SELECT 
  department,
  gender,
  COUNT(*) AS emp_count
FROM employees
GROUP BY GROUPING SETS (
  (department, gender),  -- 部门+性别明细
  (department),          -- 部门汇总
  (gender),              -- 性别汇总
  ()                     -- 全公司总计
);
```

**优势**：

*   减少表扫描次数，提升大数据量下的查询性能。
    
*   结果中可通过`GROUPING(department)`等函数识别汇总行。
    

##### 3、嵌套聚合：聚合结果再聚合

有时我们需要“聚合的聚合”，例如：我们先计算各部门平均工资，再计算全公司的“平均部门工资”：

```sql
WITH dept_avg AS (
  SELECT department, AVG(salary) AS dept_avg_salary
  FROM employees
  GROUP BY department
)
SELECT AVG(dept_avg_salary) AS company_avg
FROM dept_avg;
```

**建议**：

*   我们使用CTE（公用表表达式）或子查询拆分逻辑，结构清晰，避免嵌套混乱。
    
*   适用于多层指标计算，如：“平均用户消费金额”、“部门平均绩效”等等。
    

#### 三、特殊场景处理：避坑指南与解决办法

##### 1、NULL值陷阱：为什么聚合统计结果“不对劲”？

除`COUNT(*)`外，大多数聚合函数（如：`AVG`、`SUM`、`COUNT(列)`）会**自动忽略NULL值**。例如：我们计算平均工资时，若部分员工工资为NULL，`AVG(salary)`会跳过这些记录，导致平均值失真。

**解决办法**：使用`COALESCE`或`IFNULL`将NULL替换为合理值：

```sql
SELECT AVG(COALESCE(salary, 0)) AS avg_salary
FROM employees;
```

##### 2、多表关联后数据翻倍？

订单表与订单明细表是“一对多”关系，直接`JOIN`后聚合会导致主表字段（如：订单金额）被重复计算。

**正确做法**：我们**先聚合子表，再关联主表**：

```sql
WITH item_count AS (
  SELECT order_id, COUNT(*) AS items
  FROM order_details
  GROUP BY order_id
)
SELECT o.order_id, o.amount, ic.items
FROM orders o
JOIN item_count ic ON o.order_id = ic.order_id;
```

##### 3、`COUNT(*)`与`COUNT(列名)`别混淆！

*   `COUNT(*)`：统计所有行数（包括NULL），适合我们统计“总记录数”（如：注册用户总数）。
    
*   `COUNT(列名)`：仅统计该列非NULL值的数量，适合我们统计“有效数据量”（如：绑定手机号的用户数）。
    

**示例**：统计“有效订单数”，我们应使用：

```
COUNT(order_id)  -- 排除order_id为NULL的无效记录
```

而非：

```
COUNT(*)         -- 包含所有记录，可能包含无效订单
```

#### 四、性能优化：大数据量下更快出结果

##### 1、先筛选，后聚合（Filter First）

在聚合前，我们先通过`WHERE`过滤数据，大幅减少计算量：

```sql
-- 高效：只处理近30天数据
SELECT region, SUM(sales)
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY region;
```

⚠️ 避免在聚合后过滤（如：`HAVING`），尤其在大数据场景下性能差距甚至可达一个数量级以上。

##### 2、为分组列和聚合列建立联合索引

我们对`GROUP BY`字段（如：`region`）和聚合字段（如：`sales`）建立联合索引`(region, sales)`，可使数据库直接从索引中读取数据，避免回表，显著提升性能。

##### 3、超大表使用近似函数（牺牲精度换速度）

当数据量超千万时，`COUNT(DISTINCT user_id)`可能非常慢。我们可使用近似函数：

```sql
-- PostgreSQL 示例
SELECT approx_count_distinct(user_id) FROM logs;
```

误差率很小，但速度大幅提升，适用于监控大屏、趋势分析等非精确场景。

##### 4、避免“大宽表”全字段聚合

若表字段多达上百个，`SELECT *`后再聚合会浪费大量I/O和内存资源。

**优化写法**：我们只选取必要字段

```sql
SELECT region, SUM(sales)
FROM (SELECT region, sales FROM big_table) t
GROUP BY region;
```

或直接：

```sql
SELECT region, SUM(sales)
FROM big_table
GROUP BY region;
```

#### 五、实战经验：从业务出发设计聚合逻辑

##### 1、先明确指标清单，再选择聚合函数

不同业务场景，指标不同。例如我们的电商场景：

| 业务指标 | 对应聚合函数 |
| --- | --- |
| GMV | `SUM(amount)` |
| 订单数 | `COUNT(order_id)` |
| 客单价 | `AVG(amount)` |
| 复购率 | 二次计算（见下文） |

**建议**：我们先梳理业务目标，再反推所需聚合函数，避免“为聚合而聚合”。

##### 2、复杂指标拆解为基础聚合

如：“复购率” = “购买≥2次的用户数 / 总用户数”，我们可把它拆解为：

```sql
WITH user_buy AS (
  SELECT user_id, COUNT(*) AS buy_times
  FROM orders
  GROUP BY user_id
)
SELECT 
  SUM(CASE WHEN buy_times >= 2 THEN 1 ELSE 0 END) * 100.0
    / COUNT(*) AS repurchase_rate
FROM user_buy;
```

逻辑清晰，易于我们后期维护和验证。

##### 3、验证结果：小范围数据手动验证

当聚合结果异常时，我们可先抽取少量数据（如：10行），手动计算对比：

```sql
-- 抽样验证
SELECT * FROM orders WHERE region = '华东' LIMIT 10;
```

快速定位问题根源（如：重复关联、NULL处理不当等等）。

#### 六、实战场景示例：深度拆解20+业务场景

##### **1、单表多聚合函数**

需求：我们要求按部门分组，同时计算每个部门的员工数量、总工资、平均工资和最高工资。

**模拟数据**：（`employees`表）

| id | name | department | salary | hire\_year |
| --- | --- | --- | --- | --- |
| 1 | Alice | HR | 60000 | 2019 |
| 2 | Bob | HR | 65000 | 2020 |
| 3 | Charlie | Engineering | 80000 | 2020 |
| 4 | David | Engineering | 90000 | 2021 |
| 5 | Eve | Engineering | 95000 | 2022 |
| 6 | Frank | Sales | 70000 | 2021 |

**SQL查询**：

```sql
SELECT 
  department,  -- 分组列
  COUNT(*) AS emp_count,  -- 1. 统计人数
  SUM(salary) AS total_salary,  -- 2. 计算总工资
  AVG(salary) AS avg_salary,  -- 3. 计算平均工资
  MAX(salary) AS max_salary  -- 4. 找出最高工资
FROM employees
GROUP BY department;  -- 按部门分组
```

**执行结果**：

| department | emp\_count | total\_salary | avg\_salary | max\_salary |
| --- | --- | --- | --- | --- |
| HR | 2 | 125000 | 62500 | 65000 |
| Engineering | 3 | 265000 | 88333 | 95000 |
| Sales | 1 | 70000 | 70000 | 70000 |

##### **2、带筛选条件的多聚合函数**

结合`WHERE`（分组前筛选）和`HAVING`（分组后筛选），对多聚合结果进行过滤。

需求：我们要查询2020年及以后入职的员工，要求按部门分组，统计人数、平均工资和最低工资，且只保留平均工资大于70000的部门。

**SQL查询**：

```sql
SELECT 
  department,
  COUNT(*) AS emp_count,
  AVG(salary) AS avg_salary,
  MIN(salary) AS min_salary
FROM employees
WHERE hire_year >= 2020  -- 先筛选2020年后入职的员工
GROUP BY department
HAVING AVG(salary) > 70000;  -- 再筛选平均工资>70000的部门
```

**执行步骤**：

（1）`WHERE`筛选后的数据（2020年及以后入职）：

| id | name | department | salary |
| --- | --- | --- | --- |
| 2 | Bob | HR | 65000 |
| 3 | Charlie | Engineering | 80000 |
| 4 | David | Engineering | 90000 |
| 5 | Eve | Engineering | 95000 |
| 6 | Frank | Sales | 70000 |

（2）分组聚合后，`HAVING`过滤结果（满足平均工资>70000）：

| department | emp\_count | avg\_salary | min\_salary |
| --- | --- | --- | --- |
| Engineering | 3 | 88333 | 80000 |

##### **3、多表关联中的多聚合函数**

当我们的查询涉及多表关联时，多个聚合函数可以分别针对不同表的字段进行计算。

需求：我们要求按订单ID分组，统计每个订单的商品总数、总金额和平均单价。

**模拟数据**：

`orders`表（订单）

| order\_id | order\_date | customer |
| --- | --- | --- |
| 101 | 2023-01-01 | Alice |
| 102 | 2023-01-02 | Bob |

`order_details`表（订单详情）

| detail\_id | order\_id | product | quantity | unit\_price |
| --- | --- | --- | --- | --- |
| 1 | 101 | 键盘 | 2 | 100 |
| 2 | 101 | 鼠标 | 3 | 50 |
| 3 | 102 | 显示器 | 1 | 1500 |

**SQL查询**：

```sql
SELECT 
  o.order_id,
  o.customer,
  SUM(od.quantity) AS total_quantity,  -- 总商品数量
  SUM(od.quantity * od.unit_price) AS total_amount,  -- 总金额
  AVG(od.unit_price) AS avg_unit_price  -- 平均单价
FROM orders o
JOIN order_details od ON o.order_id = od.order_id  -- 关联两表
GROUP BY o.order_id, o.customer;  -- 按订单ID和客户分组
```

**执行结果**：

| order\_id | customer | total\_quantity | total\_amount | avg\_unit\_price |
| --- | --- | --- | --- | --- |
| 101 | Alice | 5 | 350 | 75 |
| 102 | Bob | 1 | 1500 | 1500 |

##### **4、条件聚合（带CASE的多聚合函数）**

条件聚合是指在聚合函数中通过`CASE`语句对特定条件的数据进行统计，适用于需要按不同维度细分统计的场景（如：按性别统计不同部门的工资情况）。

需求：按部门分组，我们要求分别统计男性员工的平均工资、女性员工的平均工资，以及全部门的总人数。

**SQL查询**：

```sql
SELECT 
  department,
  COUNT(*) AS total_emp,  -- 总人数
  -- 男性平均工资（不满足条件的行视为NULL，AVG忽略NULL）
  AVG(CASE WHEN gender = 'M' THEN salary END) AS male_avg_salary,
  -- 女性平均工资
  AVG(CASE WHEN gender = 'F' THEN salary END) AS female_avg_salary
FROM employees
GROUP BY department;
```

**执行结果**（基于扩展数据）：

| department | total\_emp | male\_avg\_salary | female\_avg\_salary | 备注 |
| --- | --- | --- | --- | --- |
| HR | 2 | 67500 | 60000 | HR有1男1女 |
| Engineering | 4 | 85000 | 90000 | （Engineering有2男2女 |
| Sales | 2 | 65000 | 60000 | Sales有1男1女 |

##### **5、与窗口函数结合的多聚合**

当需要同时展示**分组聚合结果**和**原始数据**时，我们可以结合窗口函数（`OVER()`）实现。窗口函数不会压缩行数，而是为每行附加聚合结果。

需求：我们要求显示每个员工的信息，并同时展示其所在部门的平均工资和总人数。

**SQL查询**：

```sql
SELECT 
  id,
  name,
  department,
  salary,
  -- 窗口函数：当前行所在部门的平均工资
  AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary,
  -- 窗口函数：当前行所在部门的总人数
  COUNT(*) OVER (PARTITION BY department) AS dept_total_emp
FROM employees;
```

**执行结果**：

| id | name | department | salary | dept\_avg\_salary | dept\_total\_emp |
| --- | --- | --- | --- | --- | --- |
| 1 | Alice | HR | 60000 | 62500 | 2 |
| 2 | Bob | HR | 65000 | 62500 | 2 |
| 3 | Charlie | Engineering | 80000 | 88333 | 3 |
| 4 | David | Engineering | 90000 | 88333 | 3 |
| 5 | Eve | Engineering | 95000 | 88333 | 3 |
| 6 | Frank | Sales | 70000 | 70000 | 1 |

##### **6、聚合函数对NULL值的处理**

所有聚合函数都会**自动忽略NULL值**，但`COUNT(*)`例外（它统计所有行数，包括`NULL`）。在多聚合场景中需注意这种差异。

**示例**：含NULL值的工资统计，假设有员工工资为NULL

| id | name | department | salary |
| --- | --- | --- | --- |
| 7 | Grace | HR | NULL |

**SQL查询**：

```sql
SELECT 
  department,
  COUNT(*) AS total_rows,  -- 统计所有行数（包括NULL）
  COUNT(salary) AS salary_count,  -- 统计salary非NULL的行数
  AVG(salary) AS avg_salary  -- 忽略NULL计算平均值
FROM employees
GROUP BY department;
```

**执行结果**（HR部门）：

| department | total\_rows | salary\_count | avg\_salary |
| --- | --- | --- | --- |
| HR | 3 | 2 | 62500 |

说明：3行数据，1行salary为NULL，平均值基于2行计算。

##### **7、嵌套聚合（聚合函数的嵌套使用）**

嵌套聚合通常用在对分组后的聚合结果再进行聚合（如：我们要计算"各部门平均工资的最大值"）。

需求：我们先按部门计算平均工资，再找出所有部门平均工资中的最大值和最小值。

**SQL查询**：

```sql
SELECT 
  MAX(dept_avg) AS max_dept_avg,  -- 嵌套聚合：部门平均工资的最大值
  MIN(dept_avg) AS min_dept_avg   -- 嵌套聚合：部门平均工资的最小值
FROM (
  -- 内层查询：按部门计算平均工资
  SELECT 
    department,
    AVG(salary) AS dept_avg
  FROM employees
  GROUP BY department
) AS dept_salary;  -- 子查询结果作为外层聚合的数据源
```

**执行步骤**：

（1）内层子查询按部门计算平均工资：

| department | dept\_avg |
| --- | --- |
| HR | 62500 |
| Engineering | 88333 |
| Sales | 70000 |

（2）外层查询对上述结果再次聚合：

| max\_dept\_avg | min\_dept\_avg |
| --- | --- |
| 88333 | 62500 |

##### **8、多聚合函数与CTE（公用表表达式）**

当查询逻辑复杂时，我们可用CTE（`WITH`子句）拆分步骤，使多聚合查询更易读。

需求：我们要求按部门和入职年份分组，统计人数和总工资，再筛选出总工资超过10万的组，并计算这些组的平均人数。

**SQL查询**：

```sql
-- 步骤1：定义CTE，按部门和年份分组聚合
WITH dept_year_stats AS (
  SELECT 
    department,
    hire_year,
    COUNT(*) AS emp_count,
    SUM(salary) AS total_salary
  FROM employees
  GROUP BY department, hire_year
)
-- 步骤2：筛选总工资>10万的组，再计算平均人数
SELECT 
  AVG(emp_count) AS avg_emp_count  -- 对筛选后的组计算平均人数
FROM dept_year_stats
WHERE total_salary > 100000;
```

**执行结果**：假设符合条件的组有2个，人数分别为3和2，则结果为：

| avg\_emp\_count |
| --- |
| 2.5 |

##### **9、数据库特定的聚合增强功能**

不同数据库提供了一些特有聚合函数或语法，可用来简化多聚合场景的实现。

（1）**PostgreSQL的`FILTER`子句（条件聚合简化）**：PostgreSQL支持`FILTER`子句，比`CASE`更简洁地实现条件聚合

```sql
-- 统计每个部门男性和女性的平均工资（PostgreSQL特有）
SELECT 
  department,
  AVG(salary) FILTER (WHERE gender = 'M') AS male_avg_salary,
  AVG(salary) FILTER (WHERE gender = 'F') AS female_avg_salary
FROM employees
GROUP BY department;
```

等价于`CASE`实现的条件聚合，但语法更清晰。

（2）**MySQL的`GROUP_CONCAT`（聚合字符串）**：MySQL的`GROUP_CONCAT`可将分组中的字符串连接成一个字段，常用在多值聚合

```sql
-- 按部门分组，拼接所有员工姓名（MySQL特有）
SELECT 
  department,
  GROUP_CONCAT(name SEPARATOR ', ') AS emp_names,  -- 聚合字符串
  COUNT(*) AS emp_count
FROM employees
GROUP BY department;
```

**结果示例**：

| department | emp\_names | emp\_count |
| --- | --- | --- |
| HR | Alice, Bob | 2 |
| Engineering | Charlie, David, Eve | 3 |

（3）**Oracle的`LISTAGG`（类似`GROUP_CONCAT`）**：Oracle使用`LISTAGG`实现字符串聚合

```sql
-- 按部门拼接员工姓名（Oracle特有）
SELECT 
  department,
  LISTAGG(name, ', ') WITHIN GROUP (ORDER BY name) AS emp_names
FROM employees
GROUP BY department;
```

##### **10、动态聚合（根据条件切换聚合逻辑）**

在实际业务中，有时我们需要根据参数或条件动态选择聚合方式（如：按日/周/月统计）。我们可以通过`CASE`语句结合聚合函数来实现。

需求：根据输入的时间粒度（day/week/month），动态统计不同周期的订单总金额。

**模拟数据（orders表）**：

| order\_id | order\_date | amount |
| --- | --- | --- |
| 1 | 2023-10-01 | 100 |
| 2 | 2023-10-02 | 200 |
| 3 | 2023-10-08 | 150 |
| 4 | 2023-10-15 | 300 |

**SQL查询**（以MySQL为例）：

```sql
SET @granularity = 'week'; -- 动态参数：可改为'day'或'month'

SELECT 
  CASE 
    WHEN @granularity = 'day' THEN DATE_FORMAT(order_date, '%Y-%m-%d')
    WHEN @granularity = 'week' THEN DATE_FORMAT(order_date, '%Y-%u') -- 周粒度
    WHEN @granularity = 'month' THEN DATE_FORMAT(order_date, '%Y-%m')
  END AS period,
  SUM(amount) AS total_amount
FROM orders
GROUP BY period;
```

**执行结果**（当`@granularity = 'week'`时）：

| period | total\_amount |
| --- | --- |
| 2023-40 | 300 |
| 2023-41 | 150 |
| 2023-42 | 300 |

##### **11、聚合结果的二次计算（派生指标）**

在多聚合基础上，我们可以进一步计算派生指标（如："人均工资占比"、"销售额环比"），使统计结果更具分析价值。

需求：我们要求按部门统计总工资、人数、平均工资，并计算每个部门平均工资占公司总平均工资的比例。

**SQL查询**：

```sql
WITH 
-- 步骤1：计算各部门聚合数据
dept_stats AS (
  SELECT 
    department,
    SUM(salary) AS total_salary,
    COUNT(*) AS emp_count,
    AVG(salary) AS dept_avg
  FROM employees
  GROUP BY department
),
-- 步骤2：计算公司整体平均工资
company_avg AS (
  SELECT AVG(salary) AS total_avg FROM employees
)
-- 步骤3：计算派生指标（占比）
SELECT 
  d.department,
  d.total_salary,
  d.emp_count,
  d.dept_avg,
  -- 部门平均工资 / 公司平均工资 * 100%
  ROUND(d.dept_avg / c.total_avg * 100, 2) AS avg_ratio_percent
FROM dept_stats d, company_avg c;
```

**执行结果**：假设公司整体平均工资为76667，则：

| department | total\_salary | emp\_count | dept\_avg | avg\_ratio\_percent |
| --- | --- | --- | --- | --- |
| HR | 125000 | 2 | 62500 | 81.52 |
| Engineering | 265000 | 3 | 88333 | 115.22 |
| Sales | 70000 | 1 | 70000 | 91.30 |

##### **12、分布式数据库中的聚合处理**

在分布式数据库（如：Hive、Spark SQL）中，多聚合函数的执行逻辑与单机数据库不同，涉及分片计算和结果合并。

（1）**MapReduce式聚合流程**：

*   **Map阶段**：每个数据分片独立计算局部聚合（如：各分片内的部门工资总和）。
    
*   **Reduce阶段**：合并所有分片的局部结果，计算全局聚合（如：全表的部门工资总和）。
    

（2）**分布式聚合优化**：

*   **部分聚合下推**：将可在分片内完成的聚合（如：`COUNT`、`SUM`）下推到每个节点，减少传输数据量。
    
*   \*\*使用`GROUPING SETS`替代多次`GROUP BY`\*\*：一次性完成多维度聚合，避免重复计算。
    
    ```sql
    -- Spark SQL/Hive中高效计算多维度聚合
    SELECT 
      department,
      gender,
      COUNT(*) AS emp_count
    FROM employees
    GROUP BY department, gender
    GROUPING SETS (
      (department, gender),  -- 明细维度
      (department),          -- 部门维度
      (gender),              -- 性别维度
      ()                     -- 总维度
    );
    ```
    

##### **13、时间序列中的多聚合函数**

在时间序列数据（如：日志、监控指标）中，我们常需要按时间粒度（分钟、小时、天）进行多维度聚合，分析数据趋势。

需求：我们要求按小时统计网站访问量、平均响应时间、最大响应时间，并筛选出访问量超过100的时段。

**模拟数据**（access\_log表）：

| log\_id | access\_time | response\_time | user\_id |
| --- | --- | --- | --- |
| 1 | 2023-10-01 08:05:12 | 0.3 | u1 |
| 2 | 2023-10-01 08:10:23 | 0.5 | u2 |
| 3 | 2023-10-01 09:01:05 | 0.4 | u3 |
| ... | ... | ... | ... |

**SQL查询**：

```sql
SELECT 
  -- 提取小时作为时间粒度
  DATE_TRUNC('hour', access_time) AS access_hour,
  COUNT(*) AS visit_count,  -- 访问量
  AVG(response_time) AS avg_response,  -- 平均响应时间
  MAX(response_time) AS max_response   -- 最大响应时间
FROM access_log
GROUP BY access_hour
HAVING COUNT(*) > 100  -- 筛选访问量超100的时段
ORDER BY access_hour;
```

**执行结果**：

| access\_hour | visit\_count | avg\_response | max\_response |
| --- | --- | --- | --- |
| 2023-10-01 08:00:00 | 156 | 0.42 | 1.2 |
| 2023-10-01 12:00:00 | 210 | 0.58 | 1.8 |

##### **14、JSON数据的聚合处理**

现代数据库（如：PostgreSQL、MySQL 8.0+）支持JSON类型，我们可对JSON字段中的数据进行聚合统计。

需求：我们要统计每个用户的订单中，不同商品类别的总购买数量和总金额（商品信息存储在JSON字段中）。

**模拟数据**（`user_orders`表）：

| order\_id | user\_id | items JSON |
| --- | --- | --- |
| 101 | u1 | \[{"category":"电子","quantity":2,"price":500},{"category":"图书","quantity":3,"price":50}\] |
| 102 | u1 | \[{"category":"电子","quantity":1,"price":800}\] |
| 103 | u2 | \[{"category":"图书","quantity":1,"price":30}\] |

**SQL查询**（我们以PostgreSQL为例）：

```sql
-- 先将JSON数组拆分为行，再聚合
SELECT 
  user_id,
  item ->> 'category' AS category,  -- 提取商品类别
  SUM((item ->> 'quantity')::INT) AS total_quantity,  -- 总数量
  SUM((item ->> 'quantity')::INT * (item ->> 'price')::NUMERIC) AS total_amount  -- 总金额
FROM user_orders,
     jsonb_array_elements(items) AS item  -- 拆分JSON数组为行
GROUP BY user_id, category
ORDER BY user_id, total_amount DESC;
```

**执行结果**：

| user\_id | category | total\_quantity | total\_amount |
| --- | --- | --- | --- |
| u1 | 电子 | 3 | 1800 |
| u1 | 图书 | 3 | 150 |
| u2 | 图书 | 1 | 30 |

##### **15、聚合函数与窗口函数的高级组合**

我们将聚合函数嵌套在窗口函数中，可实现"分组内的累计聚合"或"滑动窗口聚合"，适用于趋势分析。

需求：我们按部门统计员工工资，并计算每个员工的工资占部门总工资的比例，以及部门内的工资累计占比。

**SQL查询**：

```sql
SELECT 
  department,
  name,
  salary,
  -- 部门总工资（窗口聚合）
  SUM(salary) OVER (PARTITION BY department) AS dept_total_salary,
  -- 工资占部门总工资的比例
  ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department), 2) AS salary_ratio,
  -- 部门内按工资排序的累计占比（滑动聚合）
  ROUND(SUM(salary) OVER (PARTITION BY department ORDER BY salary 
                          ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) 
        * 100.0 / SUM(salary) OVER (PARTITION BY department), 2) AS cumulative_ratio
FROM employees
ORDER BY department, salary DESC;
```

**执行结果**（HR部门）：

| department | name | salary | dept\_total\_salary | salary\_ratio | cumulative\_ratio |
| --- | --- | --- | --- | --- | --- |
| HR | Bob | 65000 | 125000 | 52.00 | 52.00 |
| HR | Alice | 60000 | 125000 | 48.00 | 100.00 |

##### **16、数据倾斜下的多聚合处理**

在大数据场景中，数据倾斜（某分组数据量远大于其他分组）会导致聚合计算效率低下。我们需通过特殊技巧优化多聚合查询。

**示例**：假设我们有1000万条订单数据，其中"其他"类别占900万条，除"其他"之外的所有类别各占少量。按类别聚合时，"其他"分组的计算会成为瓶颈。

**优化方法**：

*   **拆分倾斜分组**：我们将大分组拆分为多个子分组，分别聚合后再合并。
    
    ```sql
    -- 以Hive SQL为例，拆分"其他"分组
    SELECT 
      CASE WHEN category = '其他' AND id % 10 = 0 THEN '其他_0'
           WHEN category = '其他' AND id % 10 = 1 THEN '其他_1'
           ...
           ELSE category END AS split_category,
      SUM(amount) AS total_amount
    FROM orders
    GROUP BY split_category;
    
    -- 后续合并"其他_0"至"其他_9"的结果
    ```
    
*   **局部聚合+全局聚合**：我们先按"分组键+随机数"局部聚合，再按分组键全局聚合。
    
    ```sql
    -- 两步聚合避免倾斜
    SELECT category, SUM(partial_sum) AS total_amount
    FROM (
      -- 第一步：局部聚合（加随机数打散）
      SELECT 
        category, 
        rand() % 10 AS rand_num,  -- 生成0-9随机数
        SUM(amount) AS partial_sum
      FROM orders
      GROUP BY category, rand_num
    ) t
    GROUP BY category;
    ```
    

##### **17、实时数据的多聚合计算**

在实时数据分析场景（如：监控面板、实时报表）中，多聚合函数需要低延迟计算，通常依赖流处理引擎或内存数据库。

（1）**流处理中的聚合（我们以Flink SQL为例）**：

```sql
-- 实时统计每分钟的订单量、总金额、平均客单价
SELECT 
  TUMBLE_START(event_time, INTERVAL '1' MINUTE) AS window_start,
  COUNT(*) AS order_count,
  SUM(amount) AS total_amount,
  AVG(amount) AS avg_amount
FROM orders_stream  -- 实时订单流
GROUP BY TUMBLE(event_time, INTERVAL '1' MINUTE);  -- 1分钟滚动窗口
```

（2）**内存数据库中的实时聚合（我们以Redis为例）**：

通过Redis的哈希结构存储聚合结果，配合定时更新或触发式更新：

```python
# 伪代码：实时更新部门工资聚合结果
def update_dept_aggregation(emp_id, dept, old_salary, new_salary):
    # 更新总工资
    redis.hincrby(f"dept_stats:{dept}", "total_salary", new_salary - old_salary)
    # 更新人数（若员工新增/删除时）
    # redis.hincrby(f"dept_stats:{dept}", "emp_count", 1)
    # 平均工资可实时计算：total_salary / emp_count
```

##### **18、聚合函数与机器学习特征工程**

在机器学习中，多聚合函数常用于生成特征（如：用户行为统计特征），为模型训练提供输入。

需求：我们要求为用户分类模型生成特征，包括用户的订单总数、总消费金额、最大单笔金额、订单间隔天数等。

**SQL查询**（生成用户特征）：

```sql
WITH user_orders AS (
  SELECT 
    user_id,
    order_id,
    amount,
    order_time,
    -- 上一次订单时间（用于计算间隔）
    LAG(order_time) OVER (PARTITION BY user_id ORDER BY order_time) AS last_order_time
  FROM orders
)
SELECT 
  user_id,
  COUNT(order_id) AS total_orders,  -- 订单总数
  SUM(amount) AS total_amount,      -- 总消费
  MAX(amount) AS max_amount,        -- 最大单笔金额
  AVG(amount) AS avg_amount,        -- 平均单笔金额
  -- 平均订单间隔（天）
  AVG(DATEDIFF(order_time, last_order_time)) AS avg_interval_days
FROM user_orders
GROUP BY user_id;
```

**生成的特征示例**：

| user\_id | total\_orders | total\_amount | max\_amount | avg\_amount | avg\_interval\_days |
| --- | --- | --- | --- | --- | --- |
| u100 | 15 | 3200 | 800 | 213.33 | 4.2 |
| u101 | 8 | 1500 | 500 | 187.5 | 7.8 |

##### **19、多聚合函数的可视化应用**

多聚合结果常作为可视化图表的数据源（如：柱状图、折线图、热力图），我们需按可视化需求调整其聚合粒度和维度。

需求：我们要生成“部门-性别交叉热力图”数据，展示平均工资。

**SQL查询**：

```sql
SELECT 
  department,
  gender,
  AVG(salary) AS avg_salary,
  COUNT(*) AS emp_count  -- 辅助判断数据显著性
FROM employees
GROUP BY department, gender
ORDER BY department, gender;
```

**可视化数据源结果**：

| department | gender | avg\_salary | emp\_count |
| --- | --- | --- | --- |
| HR | F | 60000 | 1 |
| HR | M | 65000 | 1 |
| Engineering | F | 95000 | 1 |
| Engineering | M | 85000 | 2 |

##### **20、财务场景中的多聚合分析**

财务分析中，多聚合函数常用在我们计算关键指标（如：营收、成本、利润）的多维度统计中，支持财务报表生成和异常监控。

需求：我们要求按季度统计各产品线的营收、成本、利润、利润率，并筛选出利润率低于10%的季度数据。

**模拟数据**（`financials`表）：

| product\_line | quarter | revenue | cost |
| --- | --- | --- | --- |
| 产品线A | Q1 2023 | 500000 | 420000 |
| 产品线A | Q2 2023 | 550000 | 450000 |
| 产品线B | Q1 2023 | 300000 | 280000 |
| 产品线B | Q2 2023 | 320000 | 260000 |

**SQL查询**：

```sql
SELECT 
  product_line,
  quarter,
  SUM(revenue) AS total_revenue,  -- 总营收
  SUM(cost) AS total_cost,        -- 总成本
  SUM(revenue - cost) AS profit,  -- 利润
  -- 利润率 = (利润/营收)*100%
  ROUND(SUM(revenue - cost) * 100.0 / SUM(revenue), 2) AS profit_margin
FROM financials
GROUP BY product_line, quarter
HAVING ROUND(SUM(revenue - cost) * 100.0 / SUM(revenue), 2) < 10  -- 筛选低利润率
ORDER BY quarter, product_line;
```

**执行结果**：

| product\_line | quarter | total\_revenue | total\_cost | profit | profit\_margin |
| --- | --- | --- | --- | --- | --- |
| 产品线B | Q1 2023 | 300000 | 280000 | 20000 | 6.67 |

##### **21、用户行为路径的多聚合分析**

在用户行为分析中，多聚合函数可用于我们统计用户在不同页面的停留时间、访问次数，分析用户路径转化效率。

需求：我们要求统计用户从"首页"到"支付页"的转化过程中，各中间页面的平均停留时间、访问次数及转化到下一页的比例。

**模拟数据**（`user_behavior`表）：

| user\_id | page | stay\_time | next\_page |
| --- | --- | --- | --- |
| u1 | 首页 | 60 | 商品列表页 |
| u1 | 商品列表页 | 180 | 详情页 |
| u1 | 详情页 | 240 | 支付页 |
| u2 | 首页 | 45 | 商品列表页 |
| u2 | 商品列表页 | 120 | 退出 |
| u3 | 首页 | 90 | 商品列表页 |
| u3 | 商品列表页 | 210 | 详情页 |
| u3 | 详情页 | 180 | 支付页 |

**SQL查询**：

```sql
WITH page_stats AS (
  SELECT 
    page,
    COUNT(*) AS visit_count,  -- 页面访问次数
    AVG(stay_time) AS avg_stay_time,  -- 平均停留时间
    -- 转化到下一页的次数（排除退出的情况）
    SUM(CASE WHEN next_page != '退出' THEN 1 ELSE 0 END) AS convert_count
  FROM user_behavior
  WHERE page IN ('首页', '商品列表页', '详情页')  -- 关注核心路径页面
  GROUP BY page
)
SELECT 
  page,
  visit_count,
  avg_stay_time,
  convert_count,
  -- 转化率 = 转化次数 / 访问次数
  ROUND(convert_count * 100.0 / visit_count, 2) AS conversion_rate
FROM page_stats
ORDER BY 
  CASE page  -- 按用户路径顺序排序
    WHEN '首页' THEN 1
    WHEN '商品列表页' THEN 2
    WHEN '详情页' THEN 3
  END;
```

**执行结果**：

| page | visit\_count | avg\_stay\_time | convert\_count | conversion\_rate |
| --- | --- | --- | --- | --- |
| 首页 | 3 | 65 | 3 | 100.00 |
| 商品列表页 | 3 | 170 | 2 | 66.67 |
| 详情页 | 2 | 210 | 2 | 100.00 |

##### **22、跨表复杂关联的多聚合**

当聚合需求涉及多张表的关联时，我们需通过`JOIN`将数据整合后，再应用多聚合函数，常见在多业务系统数据融合分析。

需求：我们要求统计每个区域的客户数量、总订单金额、平均订单金额，以及订单中包含"促销商品"的比例。

**表结构**：

*   **customers表**：`customer_id, region, register_time`
    
*   **orders表**：`order_id, customer_id, order_amount, order_time`
    
*   **order\_items表**：`item_id, order_id, product_name, is_promotion`（`is_promotion`为1表示促销商品）
    

**SQL查询**：

```sql
WITH 
-- 步骤1：统计每个订单是否包含促销商品
promotion_orders AS (
  SELECT 
    order_id,
    MAX(is_promotion) AS has_promotion  -- 只要有一个促销商品，订单标记为1
  FROM order_items
  GROUP BY order_id
),
-- 步骤2：关联订单与客户，按区域聚合订单数据
region_order_stats AS (
  SELECT 
    c.region,
    o.customer_id,
    COUNT(o.order_id) AS customer_order_count,  -- 客户的订单数
    SUM(o.order_amount) AS customer_total_amount,  -- 客户的总订单金额
    -- 客户包含促销商品的订单数
    SUM(CASE WHEN p.has_promotion = 1 THEN 1 ELSE 0 END) AS customer_promo_orders
  FROM customers c
  JOIN orders o ON c.customer_id = o.customer_id
  JOIN promotion_orders p ON o.order_id = p.order_id
  GROUP BY c.region, c.customer_id
)
-- 步骤3：按区域聚合最终结果
SELECT 
  region,
  COUNT(DISTINCT customer_id) AS total_customers,  -- 区域客户总数
  SUM(customer_order_count) AS total_orders,  -- 区域总订单数
  SUM(customer_total_amount) AS total_amount,  -- 区域总订单金额
  AVG(customer_total_amount / customer_order_count) AS avg_order_amount,  -- 平均订单金额
  -- 促销订单比例
  ROUND(SUM(customer_promo_orders) * 100.0 / SUM(customer_order_count), 2) AS promo_order_ratio
FROM region_order_stats
GROUP BY region
ORDER BY total_amount DESC;
```

**执行结果**（示例）：

| region | total\_customers | total\_orders | total\_amount | avg\_order\_amount | promo\_order\_ratio |
| --- | --- | --- | --- | --- | --- |
| 华东 | 120 | 350 | 895000 | 2557.14 | 32.57 |
| 华北 | 95 | 280 | 650000 | 2321.43 | 28.21 |

##### **23、特殊数据类型的多聚合处理**

现代数据库支持多种特殊数据类型，多聚合函数可针对这些类型进行针对性统计。

（1）**数组类型的聚合（我们以PostgreSQL为例）**

PostgreSQL支持数组类型，我们可通过专用聚合函数对数组元素进行统计。

需求：我们要求统计每个用户标签数组中，各标签出现的总次数和平均出现次数。

**模拟数据**（`user_tags`表）：

| user\_id | tags text\[\] |
| --- | --- |
| u1 | {'活跃','付费','新用户'} |
| u2 | {'活跃','新用户'} |
| u3 | {'付费','流失'} |

**SQL查询**：

```sql
-- 先将数组拆分为行，再聚合标签
SELECT 
  unnest(tags) AS tag,  -- 拆分数组元素
  COUNT(*) AS total_occurrences,  -- 标签总出现次数
  -- 平均每个用户的标签数（总次数/用户数）
  COUNT(*) * 1.0 / (SELECT COUNT(DISTINCT user_id) FROM user_tags) AS avg_per_user
FROM user_tags
GROUP BY tag
ORDER BY total_occurrences DESC;
```

**执行结果**：

| tag | total\_occurrences | avg\_per\_user |
| --- | --- | --- |
| 活跃 | 2 | 0.67 |
| 新用户 | 2 | 0.67 |
| 付费 | 2 | 0.67 |
| 流失 | 1 | 0.33 |

（2）**地理信息的聚合（我们以PostGIS为例）**

在空间数据库中，我们可对地理坐标进行聚合，计算区域中心点、覆盖范围等。

需求：我们要求按城市分组，计算每个城市所有用户位置的平均坐标（中心点）和位置数量。

**SQL查询**：

```sql
SELECT 
  city,
  COUNT(*) AS location_count,  -- 位置数量
  ST_Centroid(ST_Collect(location)) AS center_point  -- 聚合计算中心点
FROM user_locations
GROUP BY city;
```

**执行结果**（简化）：

| city | location\_count | center\_point |
| --- | --- | --- |
| 北京 | 1500 | POINT(116.39 39.90) |
| 上海 | 2200 | POINT(121.47 31.23) |

##### **24、聚合中的异常值处理**

聚合结果易受异常值（如：极高/极低的工资）影响，我们需在聚合前通过条件排除或修正异常值。

需求：我们要求按部门计算平均工资时，排除工资高于部门中位数3倍的异常值。

**SQL查询**：

```sql
WITH 
-- 步骤1：计算每个部门的工资中位数
dept_median AS (
  SELECT 
    department,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary
  FROM employees
  GROUP BY department
),
-- 步骤2：筛选出非异常值（工资 ≤ 3*中位数）
filtered_emp AS (
  SELECT e.*
  FROM employees e
  JOIN dept_median m ON e.department = m.department
  WHERE e.salary <= 3 * m.median_salary
)
-- 步骤3：基于筛选后的数据计算平均工资
SELECT 
  department,
  COUNT(*) AS valid_emp_count,  -- 有效人数（排除异常值后）
  AVG(salary) AS avg_salary,    -- 排除异常值后的平均工资
  -- 对比：包含异常值的平均工资
  (SELECT AVG(salary) FROM employees e2 WHERE e2.department = filtered_emp.department) AS original_avg
FROM filtered_emp
GROUP BY department;
```

**执行结果**（假设HR部门有一个异常高工资100万）：

| department | valid\_emp\_count | avg\_salary | original\_avg |
| --- | --- | --- | --- |
| HR | 2 | 62500 | 532500 |

说明：排除异常值后，平均工资更合理。

看完这些场景示例，我们是不是发现`多聚合函数`没有那么复杂？从基础的分组统计，到条件聚合、嵌套聚合，再到应对数据倾斜、处理异常值，其实就是我们要根据业务需求选对方法，避开常见的坑。日常工作里，我们用好多聚合函数，既能减少表扫描、提升效率，又能让我们的统计结果全面一些。我们多练几遍这些场景，下次面对报表统计、指标分析，我们就能快速写出高效又准确的SQL，让数据真正能帮我们出结论、做决策。