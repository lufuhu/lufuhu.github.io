---
title: SQL条件表达式CASE WHEN优化解析，条件顺序与索引失效陷阱
lastUpdated: 2026-10-25 01:30:00
---


SQL中`CASE WHEN`是一种条件表达式。`CASE WHEN`按照我们的书写顺序进行条件判断，一旦某个条件满足，就返回对应的结果，后续条件不再评估。`CASE WHEN`的这种**短路**行为，在所有主流数据库(MySQL、PostgreSQL、SQL Server、Oracle)中均一致，是SQL的标准行为。

```sql
-- 基础语法示例
SELECT 
    employee_name,
    salary,
    CASE 
        WHEN salary >= 10000 THEN '高薪'
        WHEN salary >= 5000 THEN '中薪'  -- 只有当前面条件不满足时才判断
        ELSE '低薪'  -- 所有条件都不满足时的默认值
    END AS salary_level
FROM employees;
```

**语法特点**：

*   顺序敏感：从上到下依次判断；
    
*   短路评估：命中即停止；
    
*   必须返回统一数据类型；
    
*   `NULL`安全性：任何字段为`NULL`时，比较表达式(如：`>`,`BETWEEN`)返回`UNKNOWN`，不会触发`WHEN`分支。
    

⚠️ 我们**提醒**一下：如果参与判断的字段可能为`NULL`(如：`salary IS NULL`)，该行将跳过所有`WHEN`条件，直接进入`ELSE`(或返回`NULL`)。我们**建议**显式处理`NULL`，例如：

```
WHEN COALESCE(salary, 0) >= 5000 THEN ...
-- 或
WHEN salary IS NOT NULL AND salary >= 5000 THEN ...
```

根据**语法结构**，我们把`CASE WHEN`表达式分为两类：

1、**简单CASE表达式**(Simple CASE)

```
CASE column_name
    WHEN value1 THEN result1
    WHEN value2 THEN result2
    ELSE default_result
END
```

*   适用于等值比较(`column = value`)；
    
*   `WHEN`子句中的`value`可以是常量、列引用或函数调用结果(如：`UPPER(category)`)；
    
*   不支持比较运算符(如：`>`,`<`,`LIKE`,`BETWEEN`,`IN`)或复杂表达式；
    
*   语法简洁、性能较好，但灵活性较低、适用场景有限，通常可被`JOIN`或`IN`替代。
    

2、**搜索型CASE表达式**(Searched CASE)

```
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ELSE default_result
END
```

*   支持任意**布尔表达式**(如：`salary > 5000`、`category IN (...)`)；
    
*   应用广泛，但条件复杂、逻辑嵌套多，容易引发性能陷阱(如：索引失效、判断顺序低效)，也是我们性能优化的重点，尤其是`CASE WHEN`在`SELECT`、`WHERE`、`ORDER BY`中的使用方式。
    

#### 一、常见性能陷阱与优化方法

##### 陷阱1：条件顺序不合理导致的性能浪费

**错误示例**：低频条件前置

```sql
-- 问题：90%的员工薪资在5000-10000之间，但判断顺序不合理
SELECT 
    employee_name,
    CASE 
        WHEN salary < 3000 THEN '实习'      -- 只占5%，却先判断
        WHEN salary > 50000 THEN '高管'     -- 只占1%
        WHEN salary BETWEEN 5000 AND 10000 THEN '中级'  -- 90%的数据最后判断
        ELSE '其他'
    END AS level
FROM employees;
```

**问题剖析**：

*   每行数据都要经过前两个低频条件的判断；
    
*   90%的数据需要判断3次才能得到结果；
    
*   数据量越大，性能浪费越明显。
    

**优化方法**：高频条件前置

```sql
-- 优化：根据数据分布，我们调整判断顺序
SELECT 
    employee_name,
    CASE 
        WHEN salary BETWEEN 5000 AND 10000 THEN '中级'  -- 90%数据，首次判断即命中
        WHEN salary < 3000 THEN '实习'      -- 5%数据，第二次判断命中
        WHEN salary > 50000 THEN '高管'     -- 1%数据，第三次判断命中
        ELSE '其他'  -- 4%数据，走默认分支
    END AS level
FROM employees;
```

**优化效果**：

*   90%的数据只需1次判断；
    
*   整体判断次数从平均2.8次降至1.2次；
    
*   在百万级数据表上，查询时间可减少30%-50%。
    

##### 陷阱2：WHERE条件中滥用CASE WHEN导致索引失效

**错误示例**：动态过滤条件(语法与性能双重问题)

```sql
-- 不推荐：试图根据不同类别，设置不同的价格阈值
SELECT product_name, price, category
FROM products
WHERE 
    CASE 
        WHEN category = '奢侈品' THEN price > 5000
        WHEN category = '电子产品' THEN price > 2000
        ELSE price > 100
    END;
```

**问题剖析**：  
1、语法兼容性差：PostgreSQL、SQL Server支持`CASE`返回布尔值，但MySQL、Oracle等“不支持”，会导致语法错误或隐式转换；  
2、索引失效：数据库优化器，无法将这一类复杂逻辑拆解为可索引的谓词；  
3、执行计划退化：无法使用`(category, price)`上的复合索引，被迫全表扫描；  
4、本质问题：`WHERE`子句应使用静态、可索引的布尔表达式，而非动态计算逻辑。

**关键澄清**：标准SQL中`CASE`是值表达式，不是谓词构造器。即使某些数据库允许`CASE`返回布尔值用于`WHERE`，我们也应避免这样，因为这样破坏了查询的可优化性。

以MySQL为例，我们具体说明：MySQL并没有原生的布尔(`BOOLEAN`)数据类型。MySQL的所谓布尔值，实际上是`TINYINT(1)`类型，用`1`表示真(`TRUE`)，`0`表示假(`FALSE`)。因此，`CASE`表达式在MySQL中无法返回严格意义上的“布尔类型”，但它完全可以返回`1`或`0`，并在`WHERE`、`HAVING`、`IF()`等布尔上下文中被正确解释为逻辑真或假。例如，以下语句是合法且有效的：

```sql
SELECT * FROM t WHERE CASE WHEN a > 10 THEN 1 ELSE 0 END;
```

这种SQL写法，在语法上是被允许的，但`CASE`表达式对列进行了封装，通常会导致无法使用索引，影响查询性能。因此，除非逻辑非常复杂，否则，我们应优先使用直接的布尔表达式(如：`WHERE a > 10`)以提升可读性和执行效率。这样说来，我们上面“MySQL不支持CASE返回布尔值”的说法并不严谨，更严谨的说法是：MySQL的`CASE`表达式不能返回原生布尔类型，但可以通过返回`1`/`0`在逻辑上实现布尔判断。

**优化方法**：拆解为静态条件组合

```sql
-- 正确：将动态逻辑拆解为明确的静态条件
SELECT product_name, price, category
FROM products
WHERE 
    (category = '奢侈品' AND price > 5000)
    OR (category = '电子产品' AND price > 2000)
    OR (category NOT IN ('奢侈品', '电子产品') AND price > 100);

-- 更严谨(处理NULL)：
WHERE 
    (category = '奢侈品' AND price > 5000)
    OR (category = '电子产品' AND price > 2000)
    OR ((category IS NULL OR category NOT IN ('奢侈品', '电子产品')) AND price > 100);
```

我们**注意**：`NOT IN (val1, val2)`在`val1`/`val2`无`NULL`时安全；如果列表可能含有`NULL`，我们应改用`NOT EXISTS`或`<> ALL (...)`。

**优化效果**：

*   我们可高效利用`(category, price)`复合索引；
    
*   执行计划从全表扫描变为索引范围扫描；
    
*   在千万级数据表上，查询时间从分钟级降至秒级。
    

**性能对比**示例：千万级表

*   `CASE WHEN`写法：全表扫描，耗时45秒+；
    
*   逻辑拆分写法：走`(category, price)`复合索引，耗时**0.8秒**。
    

##### 陷阱3：多层嵌套导致的维护困难和性能下降

**错误示例**：嵌套地狱

```sql
-- 问题：多层嵌套，逻辑复杂难维护
SELECT 
    employee_id,
    CASE 
        WHEN department = '销售部' THEN
            CASE 
                WHEN sales > 100000 THEN 
                    CASE 
                        WHEN years > 5 THEN '金牌销售元老'
                        ELSE '金牌销售新秀'
                    END
                WHEN sales > 50000 THEN '优秀销售'
                ELSE '普通销售'
            END
        WHEN department = '技术部' THEN
            CASE 
                WHEN project_count > 10 THEN '资深工程师'
                WHEN project_count > 5 THEN '中级工程师'
                ELSE '初级工程师'
            END
        ELSE '其他部门'
    END AS employee_level
FROM employees;
```

**问题剖析**：

*   可读性差：逻辑层级过深，难以理解；
    
*   维护困难：修改任一条件都需要深入嵌套；
    
*   性能问题：每层嵌套都增加判断开销；
    
*   NULL风险：若`sales`或`project_count`为`NULL`，可能意外落入`ELSE`。
    

**优化方法1**：使用派生表预先计算

```sql
WITH employee_stats AS (
    SELECT 
        employee_id,
        department,
        sales,
        years,
        project_count,
        CASE 
            WHEN department = '销售部' AND sales > 100000 AND years > 5 THEN 1
            WHEN department = '销售部' AND sales > 100000 THEN 2
            WHEN department = '销售部' AND sales > 50000 THEN 3
            WHEN department = '销售部' THEN 4
            WHEN department = '技术部' AND project_count > 10 THEN 5
            WHEN department = '技术部' AND project_count > 5 THEN 6
            WHEN department = '技术部' THEN 7
            ELSE 8
        END AS level_code
    FROM employees
)
SELECT 
    employee_id,
    CASE level_code
        WHEN 1 THEN '金牌销售元老'
        WHEN 2 THEN '金牌销售新秀'
        WHEN 3 THEN '优秀销售'
        WHEN 4 THEN '普通销售'
        WHEN 5 THEN '资深工程师'
        WHEN 6 THEN '中级工程师'
        WHEN 7 THEN '初级工程师'
        ELSE '其他部门'
    END AS employee_level
FROM employee_stats;
```

**优化方法2**：使用映射表(我们推荐用在复杂业务规则)

```sql
-- 创建规则表(业务规则外置)
CREATE TABLE employee_level_rules (
    dept VARCHAR(20),
    min_sales DECIMAL(12,2),
    max_sales DECIMAL(12,2),
    min_projects INT,
    min_years INT,
    level_name VARCHAR(50)
);

-- 通过JOIN实现分类(支持NULL安全比较)
SELECT e.employee_id, r.level_name
FROM employees e
LEFT JOIN employee_level_rules r ON 
    e.department = r.dept
    AND (e.sales >= r.min_sales OR r.min_sales IS NULL)
    AND (e.sales <= r.max_sales OR r.max_sales IS NULL)
    AND (e.project_count >= r.min_projects OR r.min_projects IS NULL)
    AND (e.years >= r.min_years OR r.min_years IS NULL);
```

**优势**：规则可配置、无需改SQL、便于我们审计与A/B测试。

##### 陷阱4：忘记ELSE子句，导致的NULL值问题

**错误示例**：缺失ELSE的隐患

```sql
SELECT 
    order_id,
    CASE 
        WHEN status = 'completed' THEN '已完成'
        WHEN status = 'shipped' THEN '已发货'
        -- 忘记处理 'cancelled', 'pending', NULL 等
    END AS status_text
FROM orders;
```

**问题剖析**：

*   未覆盖状态返回`NULL`，影响下游展示或计算；
    
*   在聚合中：`SUM(CASE WHEN ... THEN amount END)` → 未命中为`NULL`，`SUM`结果可能为`NULL`而非`0`。
    

**优化方法**：我们始终使用ELSE兜底

```sql
SELECT 
    order_id,
    CASE 
        WHEN status = 'completed' THEN '已完成'
        WHEN status = 'shipped' THEN '已发货'
        WHEN status = 'cancelled' THEN '已取消'
        WHEN status = 'pending' THEN '待处理'
        WHEN status IS NULL THEN '状态缺失'
        ELSE '未知状态'
    END AS status_text,
    amount
FROM orders;

-- 聚合中的正确用法
SELECT 
    SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as completed_amount,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count  -- COUNT忽略 NULL
FROM orders;
```

我们看**说明**：

*   `SUM(CASE WHEN ... THEN amount END)`→ 未命中为`NULL`，`SUM`忽略，结果可能为`NULL`；
    
*   `SUM(CASE WHEN ... THEN amount ELSE 0 END)`→ 未命中为`0`，结果更符合业务预期；
    
*   `COUNT(CASE WHEN ... THEN 1 END)`等价于`COUNT(CASE WHEN ... THEN 1 ELSE NULL END)`：`COUNT(CASE WHEN ... THEN 1 END)`之所以能实现条件计数，是因为`COUNT(表达式)`会忽略`NULL`值，而省略`ELSE`的`CASE`，在条件不满足时默认返回`NULL`。我们**注意**，`COUNT(*)`统计的是所有行的数量，与列是否为`NULL`无关；而`COUNT(列名)`或`COUNT(表达式)`仅统计该列或表达式结果非`NULL`的行。这一区别在我们使用`CASE`进行条件聚合时，是非常重要的。
    

##### 陷阱5：在ORDER BY中的错误使用

**错误示例**：复杂的排序逻辑

```sql
SELECT product_name, price, category, stock
FROM products
ORDER BY 
    CASE 
        WHEN category = '热门' AND stock > 0 THEN 1
        WHEN category = '热门' AND stock = 0 THEN 2
        WHEN category = '常规' AND price < 100 THEN 3
        ELSE 4
    END,
    price DESC;
```

**问题剖析**：

*   每行需动态计算排序键，无法利用索引；
    
*   排序性能随数据量线性下降；
    
*   逻辑隐藏，不利于我们维护。
    

**优化方法**：预先计算排序字段

```sql
WITH products_with_rank AS (
    SELECT 
        product_name, price, category, stock,
        CASE 
            WHEN category = '热门' AND stock > 0 THEN 1
            WHEN category = '热门' AND stock = 0 THEN 2
            WHEN category = '常规' AND price < 100 THEN 3
            ELSE 4
        END AS sort_rank
    FROM products
)
SELECT product_name, price, category, stock
FROM products_with_rank
ORDER BY sort_rank, price DESC;
```

**进阶优化**：创建表达式索引(数据库支持时)

PostgreSQL：

```sql
CREATE INDEX idx_sort_rank ON products (
    (CASE 
        WHEN category = '热门' AND stock > 0 THEN 1
        WHEN category = '热门' AND stock = 0 THEN 2
        WHEN category = '常规' AND price < 100 THEN 3
        ELSE 4
    END)
);

-- 我们查询，必须使用完全相同的表达式
SELECT product_name, price, category, stock
FROM products
ORDER BY 
    (CASE 
        WHEN category = '热门' AND stock > 0 THEN 1
        WHEN category = '热门' AND stock = 0 THEN 2
        WHEN category = '常规' AND price < 100 THEN 3
        ELSE 4
    END),
    price DESC;
```

⚠️ 我们**注意**一下：表达式索引要求查询中的`CASE`与建索引时**字节级**完全一致(包括常量类型、运算符、括号等等)，否则无法命中。即使是常量类型不同(如：`100`vs`100.0`)或括号位置不同，也会导致索引失效。我们一定要使用`pg_get_indexdef()`验证表达式一致性。

#### 二、高级优化技巧

##### 技巧1：利用索引优化CASE WHEN查询

```sql
-- 优化：我们先用WHERE过滤减少数据量，再分类
WITH price_groups AS (
    SELECT 
        category,
        status,
        CASE 
            WHEN price > 1000 THEN '高端'
            WHEN price > 100 THEN '中端'
            ELSE '低端'
        END as price_group
    FROM products
    WHERE price > 1000  -- 我们利用price索引，快速过滤
)
SELECT 
    category,
    COUNT(*) as total,
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_count
FROM price_groups
WHERE price_group = '高端'
GROUP BY category;
```

##### 技巧2：使用虚拟列/表达式索引

MySQL 8.0+：

```sql
ALTER TABLE products 
ADD COLUMN price_level VARCHAR(10) 
GENERATED ALWAYS AS (
    CASE 
        WHEN price > 1000 THEN 'high'
        WHEN price > 100 THEN 'medium' 
        ELSE 'low'
    END
) VIRTUAL;

CREATE INDEX idx_price_level ON products(price_level);

SELECT * FROM products WHERE price_level = 'high';  -- 走索引
```

PostgreSQL：

```
CREATE INDEX idx_price_level ON products (
    CASE 
        WHEN price > 1000 THEN 'high'
        WHEN price > 100 THEN 'medium' 
        ELSE 'low'
    END
);
```

##### 技巧3：分区表与CASE WHEN结合

**步骤1**：表结构

```sql
-- PostgreSQL分区表示例
CREATE TABLE products_partitioned (
    id SERIAL,
    name VARCHAR(100),
    price DECIMAL(10,2),
    category VARCHAR(50)
) PARTITION BY RANGE (price);

CREATE TABLE products_low    PARTITION OF products_partitioned FOR VALUES FROM (0)      TO (100);
CREATE TABLE products_medium PARTITION OF products_partitioned FOR VALUES FROM (100)    TO (1000);
CREATE TABLE products_high   PARTITION OF products_partitioned FOR VALUES FROM (1000)   TO (MAXVALUE);
```

**步骤2**：插入示例数据

```sql
INSERT INTO products_partitioned (name, price, category)
VALUES 
    ('Pen', 10.5, 'stationery'),
    ('Laptop', 1500.0, 'electronics'),
    ('Book', 45.99, 'education'),
    ('Phone', 800, 'electronics');
-- 数据会自动路由到对应分区
```

**步骤3**：我们展示两种查询对比

✗ **查询A**：无`WHERE`条件 → **全分区扫描**

```sql
-- 我们注意：这个查询无法触发分区裁剪，会扫描所有分区
-- CASE WHEN仅用在结果分组，不影响执行计划
EXPLAIN (ANALYZE, BUFFERS)
SELECT 
    CASE 
        WHEN price < 100 THEN 'low'
        WHEN price < 1000 THEN 'medium'
        ELSE 'high'
    END AS price_level,
    COUNT(*)
FROM products_partitioned
GROUP BY price_level;
```

✓ **查询B**：带`WHERE`条件 → **分区裁剪生效**

```sql
-- 此查询只访问products_low分区
EXPLAIN (ANALYZE, BUFFERS)
SELECT * 
FROM products_partitioned 
WHERE price < 50;
-- 执行计划中，只会显示products_low
```

✓ **查询C**：结合分区裁剪+`CASE`(更贴近实际)

```sql
-- 我们先通过WHERE触发分区裁剪，再用CASE分组
EXPLAIN (ANALYZE, BUFFERS)
SELECT 
    CASE 
        WHEN price < 100 THEN 'low'
        ELSE 'medium_or_high'  -- 我们注意：这里只涉及low分区数据
    END AS price_level,
    COUNT(*)
FROM products_partitioned
WHERE price < 100   -- ← 我们看这里：触发分区裁剪
GROUP BY price_level;
```

我们看**说明**：  
1、PostgreSQL的分区裁剪(Partition Pruning)，仅由`WHERE`子句中的分区键条件触发。  
2、`SELECT`中的`CASE WHEN`，仅用在结果表达，不会影响分区访问。  
3、如果查询无`WHERE`条件(我们看上面的`GROUP BY`查询)，将扫描所有分区。  
4、插入数据时，PostgreSQL会自动根据`price`值路由到对应分区。

**进阶建议**：

*   使用`EXPLAIN`是验证分区裁剪是否生效的**唯一**可靠方式，我们建议在示例中包含。
    
*   如果想实现“按分区统计”，我们可直接查各子表：
    

```sql
 SELECT 'low' AS price_level, COUNT(*) FROM products_low
 UNION ALL
 SELECT 'medium', COUNT(*) FROM products_medium
 UNION ALL
 SELECT 'high', COUNT(*) FROM products_high;
```

但通常不如带`WHERE`的主表查询灵活。

**误区**：`WHERE CASE WHEN ... END = 'high'`能触发分区裁剪。

**正解**：只有我们直接对分区键使用简单谓词(如：`price > 1000`)才能触发裁剪。`CASE`封装后优化器无法识别。

#### 三、实战示例：电商订单分析系统优化

##### 1、初始实现(性能低下)

```sql
-- 我们要避免：在WHERE中使用CASE实现动态过滤
SELECT 
    DATE(create_time) as order_date,
    COUNT(*) as total_orders,
    SUM(CASE WHEN status = 'completed' AND amount > 1000 THEN amount ELSE 0 END) as large_completed_amount,
    AVG(CASE WHEN status IN ('completed', 'shipped') THEN amount END) as avg_active_amount
FROM orders
WHERE 
    CASE 
        WHEN :filter_type = 'vip' THEN customer_level = 'VIP'
        WHEN :filter_type = 'new' THEN create_time >= NOW() - INTERVAL 30 DAY
        ELSE 1=1  -- ⚠️ 不跨数据库兼容，我们应避免
    END
    AND create_time BETWEEN :start_date AND :end_date
GROUP BY DATE(create_time);
```

##### 2、优化后实现

```sql
WITH filtered_orders AS (
    SELECT 
        order_id, create_time, amount, status
    FROM orders
    WHERE create_time BETWEEN :start_date AND :end_date
        AND (
            (:filter_type = 'vip' AND customer_level = 'VIP') OR
            (:filter_type = 'new' AND create_time >= NOW() - INTERVAL 30 DAY) OR
            (:filter_type NOT IN ('vip', 'new') OR :filter_type IS NULL)
        )
),
order_metrics AS (
    SELECT 
        DATE(create_time) as order_date,
        CASE WHEN status = 'completed' AND amount > 1000 THEN amount ELSE 0 END as large_completed,
        CASE WHEN status IN ('completed', 'shipped') THEN amount END as active_amount
    FROM filtered_orders
)
SELECT 
    order_date,
    COUNT(*) as total_orders,
    SUM(large_completed) as large_completed_amount,
    AVG(active_amount) as avg_active_amount
FROM order_metrics
GROUP BY order_date
ORDER BY order_date DESC;
```

示例使用命名参数语法(如：PostgreSQL的`:var`或应用层绑定)，实际SQL中，我们应根据数据库和驱动调整参数占位符。

##### 3、优化效果对比示例

| 指标 | 优化前 | 优化后 | 提升 |
| --- | --- | --- | --- |
| 执行时间 | `12.3`秒 | `1.8`秒 | `85%` |
| 扫描行数 | 全表扫描 | 索引扫描 | `90%` |
| `CPU`占用 | 高 | 低 | `70%` |
| 内存使用 | `1.2GB` | `280MB` | `77%` |

#### 四、数据库特定优化建议

##### 1、MySQL优化要点

```
-- (1)覆盖索引
ALTER TABLE orders ADD INDEX idx_status_amount (status, amount);

-- (2)虚拟列+索引
ALTER TABLE orders 
ADD COLUMN amount_category VARCHAR(10) AS (
    CASE 
        WHEN amount > 1000 THEN 'high'
        WHEN amount > 100 THEN 'medium'
        ELSE 'low'
    END
) VIRTUAL;

CREATE INDEX idx_amount_cat ON orders(amount_category);
```

##### 2、PostgreSQL优化要点

```sql
-- (1)部分索引(Partial Index)
CREATE INDEX idx_large_completed ON orders (order_id) 
WHERE status = 'completed' AND amount > 1000;

-- (2)表达式索引(必须完全匹配)
CREATE INDEX idx_amount_level ON orders (
    CASE 
        WHEN amount > 1000 THEN 'high'
        WHEN amount > 100 THEN 'medium'
        ELSE 'low'
    END
);

-- (3)强制CTE物化(PostgreSQL 12+需要我们显式指定MATERIALIZED)
-- PostgreSQL 12+默认行为：CTE被内联(不物化)
WITH large_orders AS (
    SELECT * FROM orders WHERE amount > 1000
)
SELECT status, COUNT(*) FROM large_orders GROUP BY status;

-- 只有我们使用MATERIALIZED关键字，才会强制物化中间结果。
WITH large_orders AS MATERIALIZED (
    SELECT * FROM orders WHERE amount > 1000
)
SELECT status, COUNT(*) FROM large_orders GROUP BY status;
```

##### 3、Oracle优化要点

```sql
-- (1)函数索引
CREATE INDEX idx_price_level ON orders (
    CASE 
        WHEN amount > 1000 THEN 'A'
        WHEN amount > 500 THEN 'B'
        ELSE 'C'
    END
);

-- (2)物化视图(预聚合)
-- 我们注意：以下定义仅支持手动刷新(ON DEMAND)
-- 如果我们需要自动定时刷新，请添加START WITH和NEXT子句
CREATE MATERIALIZED VIEW order_stats_mv
BUILD IMMEDIATE
REFRESH COMPLETE ON DEMAND
AS
SELECT 
    TRUNC(create_time, 'DD') as order_day,
    CASE WHEN amount > 1000 THEN 'high' ELSE 'normal' END as amount_level,
    COUNT(*) as cnt,
    SUM(amount) as total
FROM orders
GROUP BY TRUNC(create_time, 'DD'), 
         CASE WHEN amount > 1000 THEN 'high' ELSE 'normal' END;

-- 自动每小时刷新的物化视图示例
CREATE MATERIALIZED VIEW order_stats_mv
BUILD IMMEDIATE
REFRESH COMPLETE
START WITH SYSDATE
NEXT SYSDATE + INTERVAL '1' HOUR
AS
SELECT 
    TRUNC(create_time, 'DD') as order_day,
    CASE WHEN amount > 1000 THEN 'high' ELSE 'normal' END as amount_level,
    COUNT(*) as cnt,
    SUM(amount) as total
FROM orders
GROUP BY TRUNC(create_time, 'DD'), 
         CASE WHEN amount > 1000 THEN 'high' ELSE 'normal' END;
```

#### 五、我们总结一下推荐做法

| 场景 | 推荐做法 | 禁忌 |
| --- | --- | --- |
| 条件顺序 | 高频条件前置 | 低频条件放前面 |
| `WHERE`过滤 | 拆解为`OR`/`AND`静态条件 | 使用`CASE`实现动态过滤 |
| 复杂逻辑 | 用`CTE`、映射表、函数封装 | 多层嵌套`CASE` |
| 聚合计算 | `ELSE 0`或`ELSE NULL`显式指定 | 省略`ELSE` |
| 排序 | 预计算排序键 | 在`ORDER BY`中写复杂`CASE` |
| `NULL`处理 | 显式判断`IS NULL`或用`COALESCE` | 假设字段非空 |

最后，我们一句话**总结**一下：`CASE WHEN`是表达式，不是控制流。`CASE WHEN`适合在`SELECT`中做值映射，不适合在`WHERE`中做逻辑控制。