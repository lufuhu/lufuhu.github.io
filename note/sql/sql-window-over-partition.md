---
title: SQL窗口函数OVER子句逐层解析，PARTITION BY与窗口框架用法
lastUpdated: 2026-09-17 04:00:00
---


#### **1\. OVER子句的基本概念与核心作用**

`OVER` 子句是SQL窗口函数的核心组成部分，用于定义函数计算的数据窗口范围，支持动态、灵活的数据分析逻辑。其核心作用包括：

1.  **指定计算范围**：确定窗口函数作用的行集合（如分组、排序、滑动窗口）。
    
2.  **支持复杂分析**：实现累计计算、排名、移动平均等高级分析需求。
    
3.  **与聚合函数结合**：在保留明细数据的同时，完成分组统计（不同于 `GROUP BY`）。
    

* * *

#### **2\. OVER子句的基本语法结构**

```
窗口函数名([参数]) OVER (
    [PARTITION BY 分组字段]
    [ORDER BY 排序字段 [ASC|DESC]]
    [窗口框架(Rows/Range)]
)
```

*   **窗口函数名**：如 `SUM`、`ROW_NUMBER`、`RANK` 等。
    
*   **PARTITION BY**：将数据划分为多个独立窗口（类似 `GROUP BY`）。
    
*   **ORDER BY**：定义窗口内的数据排序规则。
    
*   **窗口框架**：进一步限制计算范围（如“前3行到当前行”）。
    

* * *

#### **3\. 逐层解析OVER子句的组成部分**

##### **层级1：窗口函数类型**

*   **聚合函数**：`SUM()`、`AVG()`、`COUNT()` 等，需结合窗口框架计算动态统计值。
    
*   **排名函数**：`ROW_NUMBER()`、`RANK()`、`DENSE_RANK()` 等，依赖 `ORDER BY` 生成序号。
    
*   **取值函数**：`LAG()`、`LEAD()`、`FIRST_VALUE()` 等，用于跨行数据访问。
    

* * *

##### **层级2：PARTITION BY子句**

*   **语法**：`PARTITION BY column1, column2, ...`
    
*   **作用**：将数据按指定列分组，每个分组独立计算窗口函数。
    
*   **示例**：
    
    ```sql
    SELECT 
        department,
        employee_id,
        salary,
        SUM(salary) OVER (PARTITION BY department) AS dept_total_salary
    FROM employees;
    ```
    

*   按部门分组，计算每个部门的总薪资（明细数据保留）。
    

* * *

##### **层级3：ORDER BY子句**

*   **语法**：`ORDER BY column [ASC|DESC]`
    
*   **作用**：定义窗口内数据的排序规则，影响排名函数和累计计算。
    
*   **与窗口框架的关联**：
    

*   当 `ORDER BY` 存在且未指定窗口框架时，默认使用 `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`（从第一行到当前行）。
    
*   当 `ORDER BY` 不存在时，窗口框架不可用（除非显式指定 `ROWS`）。
    

* * *

##### **层级4：窗口框架（Window Frame）**

窗口框架用于在 `PARTITION` 和 `ORDER` 的基础上，进一步限制计算范围。

**4.1 语法结构**

```
ROWS|RANGE BETWEEN <起始边界> AND <结束边界>
```

*   **ROWS**：按物理行偏移（如“前2行”）。
    
*   **RANGE**：按逻辑值偏移（如“比当前值小100的所有行”）。
    

**4.2 边界定义**

| 边界选项 | 描述 |
| --- | --- |
| `UNBOUNDED PRECEDING` | 窗口从分区的第一行开始 |
| `n PRECEDING` | 当前行之前的第n行（ROWS）或值范围（RANGE） |
| `CURRENT ROW` | 当前行 |
| `n FOLLOWING` | 当前行之后的第n行（ROWS）或值范围（RANGE） |
| `UNBOUNDED FOLLOWING` | 窗口到分区的最后一行结束 |

**4.3 常用窗口框架示例**

```
-- 计算累计到当前行的总和（默认行为）
SUM(salary) OVER (ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)

-- 计算最近3行的移动平均
AVG(salary) OVER (ORDER BY hire_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)

-- 计算当前行前后各1行的范围平均值
AVG(salary) OVER (ORDER BY hire_date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)
```

* * *

#### **4\. 模拟数据与实战示例**

##### **4.1 数据表 `sales_records`**

| sale\_id | salesperson | sale\_date | amount |
| --- | --- | --- | --- |
| 1 | Alice | 2023-01-05 | 200 |
| 2 | Alice | 2023-01-12 | 150 |
| 3 | Alice | 2023-01-20 | 300 |
| 4 | Bob | 2023-01-08 | 250 |
| 5 | Bob | 2023-01-15 | 180 |
| 6 | Bob | 2023-01-22 | 220 |
| 7 | Carol | 2023-01-10 | 190 |

* * *

##### **4.2 基础示例：PARTITION BY与ORDER BY**

**查询需求**：按销售员分组，按日期排序，计算每位销售员的累计销售额。

```sql
SELECT 
    salesperson,
    sale_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY salesperson
        ORDER BY sale_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_amount
FROM sales_records;
```

**输出结果**

| salesperson | sale\_date | amount | cumulative\_amount |
| --- | --- | --- | --- |
| Alice | 2023-01-05 | 200 | 200 |
| Alice | 2023-01-12 | 150 | 350 |
| Alice | 2023-01-20 | 300 | 650 |
| Bob | 2023-01-08 | 250 | 250 |
| Bob | 2023-01-15 | 180 | 430 |
| Bob | 2023-01-22 | 220 | 650 |
| Carol | 2023-01-10 | 190 | 190 |

**关键点**：

*   `PARTITION BY salesperson` 使每个销售员的计算独立。
    
*   `ORDER BY sale_date` 确保按日期顺序累计。
    

* * *

##### **4.3 窗口框架实战：移动平均**

**查询需求**：按销售员分组，按日期排序，计算每位销售员的3日移动平均销售额。

```sql
SELECT 
    salesperson,
    sale_date,
    amount,
    AVG(amount) OVER (
        PARTITION BY salesperson
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg_3d
FROM sales_records;
```

**输出结果**

| salesperson | sale\_date | amount | moving\_avg\_3d |
| --- | --- | --- | --- |
| Alice | 2023-01-05 | 200 | 200.00 |
| Alice | 2023-01-12 | 150 | 175.00 |
| Alice | 2023-01-20 | 300 | 216.67 |
| Bob | 2023-01-08 | 250 | 250.00 |
| Bob | 2023-01-15 | 180 | 215.00 |
| Bob | 2023-01-22 | 220 | 216.67 |
| Carol | 2023-01-10 | 190 | 190.00 |

**计算逻辑**：

*   对于Alice的第三行（2023-01-20）：  
    `(200 + 150 + 300) / 3 = 216.67`
    
*   当窗口不足3行时（如第一行），仅计算已有行的平均值。
    

* * *

##### **4.4 窗口框架对比：ROWS vs RANGE**

**场景需求**：按销售额排序，计算累计到当前行的销售额总和（使用 `ROWS` 和 `RANGE` 对比）。

**数据调整**：插入重复销售额数据。

| sale\_id | salesperson | sale\_date | amount |
| --- | --- | --- | --- |
| 8 | Alice | 2023-01-25 | 150 |

**查询语句**：

```sql
SELECT 
    salesperson,
    amount,
    SUM(amount) OVER (ORDER BY amount ROWS UNBOUNDED PRECEDING) AS sum_rows,
    SUM(amount) OVER (ORDER BY amount RANGE UNBOUNDED PRECEDING) AS sum_range
FROM sales_records
WHERE salesperson = 'Alice';
```

**输出结果**

| salesperson | amount | sum\_rows | sum\_range |
| --- | --- | --- | --- |
| Alice | 150 | 150 | 300 |
| Alice | 150 | 300 | 300 |
| Alice | 200 | 500 | 500 |
| Alice | 300 | 800 | 800 |

**关键区别**：

*   **ROWS模式**：严格按行顺序累加，两行150分别计算为150和300。
    
*   **RANGE模式**：将相同值的行视为同一逻辑组，两行150的总和300一次性累加。
    

* * *

#### **5\. OVER子句的高级用法与对比总结**

##### **5.1 聚合函数 vs 排名函数**

| 函数类型 | 典型函数 | PARTITION BY | ORDER BY | 窗口框架 |
| --- | --- | --- | --- | --- |
| 聚合函数 | `SUM`、`AVG` | 可选 | 可选 | 可用 |
| 排名函数 | `ROW_NUMBER` | 可选 | 必选 | 不可用 |
| 取值函数 | `LAG`、`LEAD` | 可选 | 必选 | 不可用 |

* * *

##### **5.2 窗口框架模式对比（ROWS vs RANGE）**

| 对比维度 | ROWS | RANGE |
| --- | --- | --- |
| **计算逻辑** | 按物理行偏移 | 按逻辑值偏移 |
| **性能** | 高效（直接定位行） | 较低效（需计算值范围） |
| **适用场景** | 移动平均、累计行数 | 处理重复值的累计（如金额相同） |
| **示例** | `ROWS BETWEEN 2 PRECEDING...` | `RANGE BETWEEN 100 PRECEDING...` |

* * *

##### **5.3 OVER子句与GROUP BY的对比**

| 特性 | OVER子句 | GROUP BY |
| --- | --- | --- |
| **输出明细** | 保留原始行 | 折叠为分组行 |
| **计算粒度** | 支持行级动态窗口 | 仅支持固定分组 |
| **聚合灵活性** | 可同时计算多个不同窗口的聚合 | 每组仅计算一次聚合 |
| **典型场景** | 累计值、排名、移动平均 | 总计、分组统计 |

* * *

#### **6\. 实战避坑指南**

1.  **忽略ORDER BY的影响**：
    

*   若窗口函数需要动态计算（如累计和），必须指定 `ORDER BY`，否则结果可能不符合预期。
    

3.  **误用窗口框架**：
    

*   错误示例：对排名函数使用 `ROWS BETWEEN ...`（如 `ROW_NUMBER` 不支持窗口框架）。
    

5.  **性能陷阱**：
    

*   在大数据量下避免使用 `RANGE`，优先使用 `ROWS`。
    
*   为 `PARTITION BY` 和 `ORDER BY` 的字段创建索引。
    

7.  **NULL值处理**：
    

*   使用 `NULLS FIRST` 或 `NULLS LAST` 明确排序，避免默认行为导致混乱。
    

* * *

#### **7\. 总结与最佳实践**

*   **基础原则**：
    

*   明确业务需求：是否需要保留明细数据？是否需要动态窗口？
    
*   按需选择 `PARTITION BY` 和 `ORDER BY`，优先测试简单场景。
    

*   **性能优化**：
    

*   对分区和排序字段建立索引。
    
*   避免在窗口函数中嵌套复杂计算。
    

*   **扩展应用**：
    

*   结合 `CASE WHEN` 实现条件累计（如仅累计特定状态的数据）。
    
*   使用 `LAG`/`LEAD` 分析时间序列数据（如环比、同比计算）。
    

* * *

通过掌握 `OVER` 子句的分层语法、窗口框架的灵活配置，以及不同函数的适用场景，可高效实现复杂数据分析需求，同时避免常见错误与性能瓶颈。