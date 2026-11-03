---
title: CTE临时表与子查询如何选，SQL中间结果三种写法优劣对比
lastUpdated: 2026-10-09 04:00:00
---


写SQL的时候，我们是不是经常遇到这种需求：

“我们要先找出活跃用户，再拿这批用户去查订单，再查商品，再算转化率，最后还要跟上个月对比……”

怎样用SQL实现？我们自然想到：

*   **子查询**：一层套一层，像俄罗斯套娃，我们写到最后自己都晕。
    
*   **CTE（公用表表达式）**：我们用`WITH xxx AS (...)`拆成几步，像搭积木，逻辑清晰。
    
*   **临时表**：先建个临时表存中间结果，我们后面想怎么用就怎么用。
    

我们先看一个简单例子：

```sql
-- 子查询写法（套娃式）
SELECT user_id, cnt, cnt * 100.0 / total AS pct
FROM (
    SELECT user_id, COUNT(*) as cnt
    FROM orders
    WHERE created_at >= '2025-01-01'
    GROUP BY user_id
) a
CROSS JOIN (
    SELECT COUNT(*) as total
    FROM orders
    WHERE created_at >= '2025-01-01'
) b;
```

```sql
-- CTE写法（分层式）
WITH active_users AS (
    SELECT user_id, COUNT(*) as cnt
    FROM orders
    WHERE created_at >= '2025-01-01'
    GROUP BY user_id
),
total_orders AS (
    SELECT COUNT(*) as total
    FROM orders
    WHERE created_at >= '2025-01-01'
)
SELECT a.user_id, a.cnt, a.cnt * 100.0 / t.total AS pct
FROM active_users a
CROSS JOIN total_orders t;
```

```sql
-- 临时表写法（稳如老狗）
CREATE TEMPORARY TABLE temp_active AS
SELECT user_id, COUNT(*) as cnt
FROM orders
WHERE created_at >= '2025-01-01'
GROUP BY user_id;

CREATE TEMPORARY TABLE temp_total AS
SELECT COUNT(*) as total
FROM orders
WHERE created_at >= '2025-01-01';

SELECT a.user_id, a.cnt, a.cnt * 100.0 / t.total AS pct
FROM temp_active a
CROSS JOIN temp_total t;
```

看起来CTE最清爽！但我们**别被表象骗了**！在某些数据库里，CTE可能会偷偷给我们“重复计算”，性能直接翻车！临时表看起来笨重，但在某些场景下，它却是最优解！

##### 一、多次复用同一结果集

这是我们最最最最最常踩的坑！我们看一个需求：我们要找“2025年Q1下单≥5次的用户”，然后用这个用户列表去关联订单表两次，分析他们买了哪些相同商品？如果复用CTE来实现，我们不要以为CTE肯定只算一次，有的数据库会默默地偷偷地给我们算两次……下面分数据库，我们仔细看：

1、**PostgreSQL**：

**v12之前**：CTE默认物化（Materialized），算一次，存起来，后面直接读。

**v12+**：默认**不物化**！除非我们手动加`MATERIALIZED`！

```sql
WITH active_users AS MATERIALIZED (  -- ← 必须加MATERIALIZED！
    SELECT ...
)
SELECT ...
FROM active_users a
JOIN active_users b ...;
```

**不加的后果？**

*   `EXPLAIN`里我们会看到`Index Scan on orders`出现两次。
    
*   执行时间翻倍。
    
*   缓冲区命中翻倍。
    
*   我们老项目升级到PG12+后性能暴跌，十有八九是这个锅！
    

**避坑建议**：在PG v12+里，所有复用CTE必须加`MATERIALIZED`，Code Review（代码审查）我们重点查！

2、**MySQL**：

MySQL 8.0虽然支持CTE，但默认是**内联展开**的！也就是说，我们写：

```sql
WITH cte AS (...)
SELECT * FROM cte a JOIN cte b ...;
```

MySQL会把它展开成：

```sql
SELECT * FROM (...) a JOIN (...) b ...;
```

这样，**orders表被扫描两次！**

我们**怎么验证？**

```
EXPLAIN FORMAT=JSON 我们的查询
```

我们看输出里有没有：

```
"select_id": 2和"select_id": 3 → 两个独立子查询
"rows_examined_per_scan": 500000 × 2 → 扫描行数翻倍
```

我们**怎么解决？**

（1）我们换用**临时表**（最稳）：

```sql
CREATE TEMPORARY TABLE temp_active AS
SELECT ...;

SELECT a.*, b.*
FROM temp_active a
JOIN temp_active b ...;
```

再执行计划，我们看到orders只扫一次，成本骤降。

（2）用**MATERIALIZED CTE**（MySQL 8.0.21+）

```sql
WITH cte AS MATERIALIZED (...)
SELECT ...
```

此时，我们看`EXPLAIN`里有没有`"using_temporary_table": true`，有的话，问题就解决了。

**避坑建议**：我们应**禁止MySQL在JOIN/UNION里用裸CTE！必须用临时表或MATERIALIZED！**

3、**SQL Server/Oracle**：放心用CTE

这两个数据库优化器比较聪明，看到我们复用CTE，会自动物化，用“表假脱机”（Table Spool）或“临时表转换”来缓存中间结果。

（1）**SQL Server验证方法**：

```
SET STATISTICS PROFILE ON;
-- 执行我们的查询
SET STATISTICS PROFILE OFF;
```

我们看执行计划里有没有：

```
Table Spool (Lazy Spool) → 出现两次，但指向同一个物化结果
Index Seek → 只执行一次
```

（2）**Oracle验证方法**：

```sql
EXPLAIN PLAN FOR 我们的查询;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

我们找：

```sql
TEMP TABLE TRANSFORMATION → 用了临时表
LOAD AS SELECT → 数据加载到临时表
TABLE ACCESS FULL | ORDERS → 只出现一次
```

**避坑建议**：SQL Server/Oracle里，我们可以放心用CTE，但Oracle建议加`/*+ MATERIALIZE */` Hint更保险。

4、**SQLite**：CTE默认内联，临时表才是最优解

SQLite默认会把CTE内联展开，导致重复计算：

```sql
EXPLAIN QUERY PLAN
WITH cte AS (...)
SELECT * FROM cte a JOIN cte b ...;
```

输出：

```
SCAN TABLE users AS cte
SCAN TABLE users AS cte → 扫了两次！
```

我们怎么解决？

（1）我们推荐**临时表**:

```sql
CREATE TEMP TABLE temp_high AS SELECT ...;
SELECT * FROM temp_high a JOIN temp_high b ...;
```

（2）**MATERIALIZED**（SQLite 3.35.0+）:

```sql
WITH cte AS MATERIALIZED (...)
SELECT ...
```

我们看输出是不是：

```
SCAN SUBQUERY 1 AS a
SCAN SUBQUERY 1 AS b → 同一个子查询编号，说明物化成功
```

**避坑建议**：在SQLite里，生产环境中，我们无脑用临时表；轻量场景，我们才用CTE。

##### 二、单次引用：性能差不多，选CTE就对了！

如果我们的中间结果**只用一次**，这时，CTE、子查询、临时表性能基本一样。

但**CTE可读性吊打子查询**！

我们看这个需求：计算销售员2025年Q1业绩，对比2024年Q1，算增长率，再排名前10。

我们用CTE写：

```sql
WITH current_qtr AS (...),
     prev_qtr AS (...),
     ranked_sales AS (...)
SELECT ... FROM ranked_sales WHERE rk <= 10;
```

我们中的新人一看就懂：哦！先算今年，再算去年，再合并排名。

如果我们用子查询写：

```sql
SELECT ... FROM (
    SELECT ... FROM (
        SELECT ... FROM sales WHERE ...
    ) c LEFT JOIN (
        SELECT ... FROM sales WHERE ...
    ) p ...
) ranked_sales WHERE rk <= 10;
```

我们中的新人：这啥？我眼睛花了。

**EXPLAIN验证**：以上两者执行计划几乎一模一样，性能无差别。

**建议**：只要逻辑稍微复杂点，我们无脑选CTE。Code Review时会被夸“结构清晰”！

##### 三、递归查询：CTE是唯一解！

有些场景，比如：

*   组织架构（找某个员工的所有上级）
    
*   数据血缘（列A是从列B、列C、列D一步步算来的）
    
*   商品分类树（一级分类→二级→三级）
    

这些**层级、树形、链式结构**，**只有CTE能搞定**：

```sql
WITH RECURSIVE org_path AS (
    SELECT ... WHERE manager_id IS NULL  -- 根节点
    UNION ALL
    SELECT ... JOIN org_path ...         -- 递归找下级
)
SELECT ...;
```

子查询？临时表？还有JOIN？统统做不到！

我们用**执行计划**时，主要看：

*   `Recursive Union`
    
*   `WorkTable Scan`（递归工作表）
    
*   `depth < 10`（防死循环）
    

**建议**：建立递归查询模板库，我们统一加深度限制，防止无限循环把数据库搞挂。

##### 四、临时表：不是备胎，有时是唯一正确答案！

到此，我们是不是觉得“用临时表=水平低”，这是大错特错！

临时表在以下场景是**唯一正确答案**：

**场景1**：MySQL/SQLite里复用中间结果

前面我们说过了，这两个数据库的CTE默认不物化，复用就翻车。临时表是唯一最优解。

**场景2**：中间结果特别大，要加索引优化后续查询

CTE不能加索引，临时表可以！

```sql
CREATE TEMPORARY TABLE temp_active AS
SELECT user_id, COUNT(*) as cnt
FROM huge_orders
GROUP BY user_id;

CREATE INDEX idx_temp_active_user ON temp_active(user_id);

-- 后续JOIN飞快
SELECT ... FROM temp_active a JOIN users u ON a.user_id = u.id;
```

**场景3**：中间结果要被多个查询复用

比如：我们算完活跃用户，要分别给“订单分析”、“商品推荐”、“客服工单”三个模块用。

CTE作用域只限当前语句，临时表可以跨语句、跨过程复用！

```
CALL analyze_orders();
CALL recommend_products();
CALL generate_tickets();
-- 三个存储过程都能访问temp_active
```

**建议**：临时表不是“笨办法”，我们该用就用，别扭捏！

##### 五、子查询：不是垃圾，是“轻量级刺客”！

最后，我们别把子查询一棍子打死！在以下场景，子查询反而更优：

*   **超简单逻辑**：`SELECT * FROM users WHERE id IN (SELECT user_id FROM orders)` —— 没必要上CTE。
    
*   **标量子查询**：`SELECT name, (SELECT COUNT(*) FROM orders WHERE user_id = u.id) as cnt FROM users u` —— 优化器能很好处理。
    
*   **数据库不支持CTE**：比如老版本MySQL、某些嵌入式数据库。
    

**建议**：子查询是“轻骑兵”，适合小规模、单点突击，我们别让它干重活。