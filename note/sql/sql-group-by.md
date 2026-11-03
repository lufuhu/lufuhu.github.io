---
title: SQL聚合函数多列分组GROUP BY详解，语法规则与统计实例
lastUpdated: 2026-09-16 04:00:00
---


#### 一、基础语法

##### 1\. 语法结构

多列分组允许根据多个列的组合对数据进行分组，每个唯一组合形成一个独立的分组。  
**语法**：

```sql
SELECT column1, column2, aggregate_function(column3)
FROM table
[WHERE conditions]
GROUP BY column1, column2  -- 多列分组
[HAVING conditions]
[ORDER BY column1, column2];
```

*   **核心规则**：
    

*   出现在`GROUP BY`子句中。
    
*   被聚合函数（如`SUM`、`COUNT`）包裹。
    

*   `SELECT`中的列必须满足以下条件之一：
    
*   `GROUP BY`后的列顺序会影响分组的逻辑层级，但不改变最终分组结果（仅影响排序）。
    

##### 2\. 与单列分组的区别

| 单列分组 | 多列分组 |
| --- | --- |
| `GROUP BY region` | `GROUP BY region, product` |
| 按“地区”划分组 | 按“地区+产品”的组合划分组 |
| 每组包含同一地区的所有记录 | 每组包含同一地区且同一产品的记录 |

##### 3\. 代码示例

假设有一张`sales`表：

```sql
CREATE TABLE sales (
    order_id INT,
    region VARCHAR(20),
    product VARCHAR(20),
    amount DECIMAL(10,2),
    order_date DATE
);
```

查询“每个地区每个产品的总销售额”：

```sql
SELECT region, product, SUM(amount) AS total_sales
FROM sales
GROUP BY region, product;  -- 按地区和产品分组
```

*   **输出逻辑**：  
    对每个唯一的`(region, product)`组合计算总销售额。例如，若数据中有`('North', 'Laptop')`和`('North', 'Phone')`，则分别生成两个分组。
    

* * *

#### 二、应用场景示例

##### 1\. 模拟数据

插入示例数据：

```sql
INSERT INTO sales VALUES
(1, 'North', 'Laptop', 500, '2023-01-01'),
(2, 'North', 'Phone', 300, '2023-01-02'),
(3, 'South', 'Laptop', 700, '2023-02-01'),
(4, 'South', 'Monitor', 400, '2023-02-05'),
(5, 'East', 'Phone', 600, '2023-03-10'),
(6, 'East', 'Tablet', 200, '2023-03-15'),
(7, 'West', 'Laptop', 800, '2023-04-20'),
(8, 'North', 'Laptop', 400, '2023-05-01');
```

##### 2\. 示例1：基本多列分组

**需求**：统计每个地区每个产品的总销售额，并按销售额降序排列。

```sql
SELECT region, product, SUM(amount) AS total_sales
FROM sales
GROUP BY region, product
ORDER BY total_sales DESC;
```

**输出**：

```
region | product | total_sales
-------|---------|------------
West   | Laptop  | 800.00
South  | Laptop  | 700.00
East   | Phone   | 600.00
North  | Laptop  | 900.00  -- 注意：North的Laptop有两笔订单（500+400）
South  | Monitor | 400.00
North  | Phone   | 300.00
East   | Tablet  | 200.00
```

##### 3\. 示例2：结合时间维度

**需求**：按年份和地区分组，统计年度销售额。

```sql
SELECT 
    YEAR(order_date) AS year,
    region,
    SUM(amount) AS annual_sales
FROM sales
GROUP BY YEAR(order_date), region
ORDER BY year, annual_sales DESC;
```

**输出**：

```
year | region | annual_sales
-----|--------|-------------
2023| North  | 1200.00     -- 2023年North的Laptop（500+400）和Phone（300）
2023| South  | 1100.00     -- Laptop 700 + Monitor 400
2023| East   | 800.00      -- Phone 600 + Tablet 200
2023| West   | 800.00
```

##### 4\. 示例3：多列分组与复杂聚合

**需求**：统计每个地区每个产品的总销售额、平均销售额及订单数量，筛选出订单数≥2的产品。

```sql
SELECT 
    region, 
    product,
    SUM(amount) AS total_sales,
    AVG(amount) AS avg_sales,
    COUNT(*) AS order_count
FROM sales
GROUP BY region, product
HAVING COUNT(*) >= 2;
```

**输出**：

```
region | product | total_sales | avg_sales | order_count
-------|---------|-------------|-----------|------------
North  | Laptop  | 900.00      | 450.00    | 2
```

* * *

#### 三、常见错误与避坑方法

##### 1\. 错误1：SELECT包含未分组的列

*   **错误代码**：
    
    ```sql
    SELECT region, product, order_date  -- order_date未分组或聚合
    FROM sales
    GROUP BY region, product;
    ```
    
*   **报错信息**：`Column 'sales.order_date' is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause.`
    
*   **修正方法**：移除`order_date`或将其加入`GROUP BY`。
    

##### 2\. 错误2：HAVING误用非聚合列

*   **错误代码**：
    
    ```sql
    SELECT region, product, SUM(amount)
    FROM sales
    GROUP BY region, product
    HAVING order_date > '2023-03-01';  -- order_date未分组或聚合
    ```
    
*   **修正方法**：将条件移至`WHERE`（如果过滤原始数据）或改用聚合条件：
    
    ```sql
    -- 正确写法：筛选2023年3月后的订单
    SELECT region, product, SUM(amount)
    FROM sales
    WHERE order_date > '2023-03-01'
    GROUP BY region, product;
    ```
    

##### 3\. 错误3：忽略NULL值的影响

*   **问题**：如果分组列中存在NULL值，所有NULL会被视为同一组。
    
*   **示例**：
    
    ```sql
    INSERT INTO sales VALUES (9, NULL, 'Laptop', 300, '2023-06-01');
    SELECT region, SUM(amount)
    FROM sales
    GROUP BY region;
    ```
    
    **输出**：
    
    ```
    region | total_sales
    -------|-------------
    NULL   | 300.00      -- NULL地区单独成组
    ```
    

##### 4\. 错误4：分组顺序误解

*   **误解**：认为`GROUP BY region, product`和`GROUP BY product, region`的结果不同。
    
*   **真相**：分组结果相同，但输出排序可能不同（除非使用`ORDER BY`）。
    

* * *

#### 四、性能优化方法

##### 1\. 创建复合索引

*   **场景**：频繁按`region, product`分组。
    
*   **优化**：为分组列创建索引。
    
    ```
    CREATE INDEX idx_region_product ON sales(region, product);
    ```
    

##### 2\. 减少分组前数据量

*   **优化前**：
    
    ```sql
    SELECT region, product, SUM(amount)
    FROM sales
    GROUP BY region, product
    HAVING YEAR(order_date) = 2023;  -- 先分组后过滤
    ```
    
*   **优化后**：
    
    ```sql
    SELECT region, product, SUM(amount)
    FROM sales
    WHERE YEAR(order_date) = 2023     -- 先过滤再分组
    GROUP BY region, product;
    ```
    

##### 3\. 使用覆盖索引

*   **策略**：若查询只需分组列和聚合列，可创建包含这些列的索引。
    
    ```
    CREATE INDEX idx_covering ON sales(region, product, amount);
    ```
    

##### 4\. 分阶段聚合

*   **场景**：复杂聚合计算（如多层分组）。
    
*   **优化**：使用子查询或CTE分步计算。
    
    ```sql
    WITH region_product_sales AS (
        SELECT region, product, SUM(amount) AS total
        FROM sales
        GROUP BY region, product
    )
    SELECT region, AVG(total) AS avg_per_product
    FROM region_product_sales
    GROUP BY region;
    ```
    

##### 5\. 执行计划分析

使用`EXPLAIN`检查查询是否利用索引：

```sql
EXPLAIN 
SELECT region, product, SUM(amount)
FROM sales
GROUP BY region, product;
```

*   **关键指标**：
    

*   `Using index`：表示使用覆盖索引。
    
*   `Using temporary`：表示需要临时表，可能需优化。
    

* * *

#### 五、总结

多列分组是分析多维数据的核心操作，需掌握以下要点：

1.  **语法规则**：确保`SELECT`列合法，理解分组逻辑。
    
2.  **场景应用**：灵活应对时间、区域、产品等多维度分析。
    
3.  **避坑指南**：警惕未分组列、NULL值及执行顺序。
    
4.  **性能优化**：善用索引、减少数据量、分阶段聚合。
    

通过合理设计查询，多列分组可高效支持复杂业务分析需求，如销售多维报表、用户行为分析等。