---
title: SQL窗口函数20道电商场景实战题，从排名累计到留存率与报表脚本
lastUpdated: 2026-08-30 04:00:00
---


想把 SQL 窗口函数吃透？这 20 道题可别错过！从基础的排名、累计和，到复杂的会话划分、留存率计算，全是电商场景应用里的实用技能。不管是给订单排名、算用户生命周期，还是做滚动平均分析，只要跟着练下来，保准我们对 `ROW_NUMBER`、`LAG` 这些函数熟得不能再熟，写起分析报表（文末附有：自动化报表 SQL 脚本模板）也能得心应手。(所有代码块或表格均可左右滚动)

#### 一、窗口函数专项训练 20 题

**目标**：从基础到精通，帮助我们掌握 `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG/LEAD`, `SUM/OVER`, `FIRST/LAST_VALUE` 等窗口函数在电商应用场景下的语法技巧。

**基础（1-5）**

##### 1、为每个订单按金额降序排名（允许并列，跳过名次）。

**场景**：销售业绩分析，确定订单金额在所有订单中的排名。

```sql
-- 按订单金额从高到低排名，允许并列，名次会跳过
SELECT order_id, amount, RANK() OVER (ORDER BY amount DESC) AS rank
FROM orders;
```

**解析**：`RANK()`函数按金额降序对所有订单进行排名。当出现金额相同的订单时，会给予相同的排名，下一个不同金额的订单会跳过中间的名次（例如：1,2,2,4……）。`OVER (ORDER BY amount DESC)`定义了排名的范围（所有订单）和排序方式。

##### 2、为每个用户的订单按时间升序编号（1,2,3……）。

**场景**：用户行为分析，跟踪用户的订单顺序和购买频率。

```sql
-- 为每个用户的订单按时间顺序分配序号
SELECT user_id, order_id, order_date,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) AS seq
FROM orders;
```

**解析**：`PARTITION BY user_id`按用户分组，每个用户形成独立的窗口。`ROW_NUMBER()`在每个用户组内按订单日期升序排序，为订单分配唯一序号（1表示用户的第一个订单，2表示第二个，以此类推）。与`RANK()`不同，`ROW_NUMBER()`始终生成连续的唯一序号，即使日期相同也不会并列。

##### 3、计算“所有订单金额的累计和”。

**场景**：销售趋势分析，查看销售额随时间的累积增长情况。

```sql
-- 按时间顺序计算订单金额的累计总和
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date) AS cumulative_sum
FROM orders;
```

**解析**：`SUM(amount) OVER (ORDER BY order_date)`是一个累加窗口函数，按订单日期排序，计算从第一条记录到当前记录的金额总和。`cumulative_sum`列显示截至该订单日期的累计销售额，直观展示销售增长趋势。窗口范围默认为从第一条到当前行，无需额外指定。

##### 4、找出“每个城市最年轻的用户”。

**场景**：用户画像分析，了解各城市的年轻用户特征。

```sql
-- 查找每个城市中年龄最小的用户
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY city ORDER BY age) AS rn
    FROM users
) t WHERE rn = 1;
```

**解析**：子查询中，`PARTITION BY city`按城市分组，`ORDER BY age`按年龄升序排序，`ROW_NUMBER()`为每个城市的用户分配序号（1表示该城市最年轻的用户）。外部查询筛选出序号为1的记录，即为每个城市最年轻的用户。如果有多个同龄且最小的用户，`ROW_NUMBER()`会随机选择一个，此时可用`RANK()`替代以返回所有并列的最年轻用户。如果需要所有并列的最年轻用户，可以使用 `RANK()`或 `DENSE_RANK()`并筛选 `rnk = 1`，示例：

```sql
-- 查找每个城市中所有年龄最小的用户
SELECT * FROM (
    SELECT *, RANK() OVER (PARTITION BY city ORDER BY age) AS rnk
    FROM users
) t WHERE rnk = 1;
```

##### 5、显示“当前订单金额与上一笔订单金额的差”。

**场景**：销售波动分析，监控订单金额的变化情况。

```sql
-- 计算当前订单与上一笔订单的金额差值
SELECT order_id, amount,
       amount - LAG(amount, 1, 0) OVER (ORDER BY order_date) AS diff_vs_prev
FROM orders;
```

**解析**：`LAG(amount, 1, 0)`函数获取按日期排序的上一笔订单金额，参数1表示向前取1行，0表示当没有上一笔订单（第一行）时的默认值。当前订单金额减去上一笔订单金额，得到金额差值，正数表示增长，负数表示下降。该分析有助于我们识别销售趋势的突变点。

**进阶（6-10）**

##### 6、计算“7天滚动平均订单金额”。

**场景**：销售趋势分析，平滑短期波动以观察长期趋势。

```sql
-- 计算包括当天在内的过去7天订单金额的平均值
SELECT order_date, amount,
       AVG(amount) OVER (
           ORDER BY order_date 
           ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS rolling_avg_7day
FROM orders;
```

**解析**：`AVG(amount) OVER (...)`计算7天滚动平均值，`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`定义窗口范围为当前行及之前的6行（共7天）。按订单日期排序后，每个日期的平均值基于过去7天的数据，有助于消除单日波动的影响，更清晰地展示销售趋势。

如果“同一日期多笔订单” ，示例代码可优化为：

```sql
WITH daily_amount AS (
    -- 先按日期汇总每日订单金额（避免同一日期多笔订单导致的行级偏差）
    SELECT 
        order_date,
        SUM(amount) AS daily_total  -- 每日总金额
    FROM orders
    GROUP BY order_date
)
SELECT 
    order_date,
    daily_total,
    -- 按日期范围计算7天滚动平均（当前日期+前6天）
    AVG(daily_total) OVER (
        ORDER BY order_date 
        RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW  -- 关键：用RANGE而非ROWS
    ) AS rolling_avg_7day
FROM daily_amount;
```

##### 7、找出“每个用户第一笔订单的金额”。

**场景**：用户价值分析，让我们了解用户首次购买的金额特征。

```sql
-- 获取每个用户的第一笔订单金额
SELECT user_id, 
       FIRST_VALUE(amount) OVER (PARTITION BY user_id ORDER BY order_date) AS first_order_amount
FROM orders;
```

**解析**：`PARTITION BY user_id`按用户分组，`ORDER BY order_date`按订单日期排序，`FIRST_VALUE(amount)`返回每个用户组内的第一个订单金额（即用户的第一笔订单金额）。该指标可用于我们分析新用户的初始购买行为，与后续订单金额对比可评估用户价值的变化。

##### 8、计算“订单金额的百分位数”（0-1之间）。

**场景**：订单价值分布分析，确定订单金额在整体分布中的位置。

```sql
-- 计算每个订单金额在所有订单中的相对位置（0-1）
SELECT order_id, amount, PERCENT_RANK() OVER (ORDER BY amount) AS pct
FROM orders;
```

**解析**：`PERCENT_RANK()`计算每行在排序后的结果集中的相对位置，返回值范围为0到1。对于金额最小的订单，`pct`为0；对于金额最大的订单，`pct`为1。例如，某订单的`pct`为0.75表示其金额高于75%的订单。该指标有助于我们快速识别高价值订单和低价值订单。

##### 9、显示“下一个订单的金额”（按时间）。

**场景**：销售趋势分析，预测订单金额的变化方向。

```sql
-- 获取按时间排序的下一个订单金额
SELECT order_id, amount,
       LEAD(amount, 1, NULL) OVER (ORDER BY order_date) AS next_amount
FROM orders;
```

**解析**：`LEAD(amount, 1, NULL)`函数获取按日期排序的下一笔订单金额，参数1表示向后取1行，NULL表示当没有下一笔订单（最后一行）时的默认值。该分析有助于我们观察订单金额的连续变化，识别增长或下降趋势。

##### 10、为每个分组内的值分配“四分位”（1-4）。

**场景**：数据分布分析，将订单金额划分为均等的四个区间。

```sql
-- 将订单金额按大小分为4个等级（四分位）
SELECT user_id, amount,
       NTILE(4) OVER (ORDER BY amount) AS quartile
FROM orders;
```

**解析**：`NTILE(4)`将排序后的结果集平均分配到4个桶中，每个桶分配一个编号（1-4），即四分位。`ORDER BY amount`确保按金额大小排序后再分配。四分位分析有助于快速了解数据分布特征，如：Q1（1分位）表示最低的25%订单，Q4表示最高的25%订单。

**复杂（11-15）**

##### 11、找出“每个用户金额最高的订单”，并显示排名。

**场景**：用户价值分析，识别用户的最高消费订单。

```sql
-- 查找每个用户金额最高的订单，并显示其在该用户订单中的排名
SELECT * FROM (
    SELECT *,
           DENSE_RANK() OVER (PARTITION BY user_id ORDER BY amount DESC) AS dr
    FROM orders
) t WHERE dr = 1;
```

**解析**：子查询中，`PARTITION BY user_id`按用户分组，`DENSE_RANK()`按订单金额降序对每个用户的订单进行排名（允许并列，不跳过名次）。外部查询筛选出排名为1的记录，即为每个用户金额最高的订单。与`RANK()`不同，`DENSE_RANK()`在出现并列时不会跳过后续名次（例如：1,1,2,3……），确保我们正确识别所有最高金额的订单（可能有多个）。

##### 12、计算“同比去年同期增长率”（假设数据跨年）。

**场景**：年度销售对比分析，评估业务的同比增长情况。

```sql
-- 计算每月销售额与去年同期的增长率
WITH monthly_data AS (
    -- 按月汇总销售额
    SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(amount) AS amt
    FROM orders GROUP BY month
)
SELECT month, amt,
       -- 获取去年同期的销售额（向前取12行）
       LAG(amt, 12) OVER (ORDER BY month) AS amt_last_year,
       -- 计算同比增长率（保留两位小数）
       ROUND((amt - LAG(amt, 12) OVER (ORDER BY month)) * 100.0 / LAG(amt, 12) OVER (ORDER BY month), 2) AS yoy_growth
FROM monthly_data;
```

**解析**：CTE `monthly_data`按月汇总销售额。主查询中，`LAG(amt, 12)`获取12个月前（去年同期）的销售额，通过计算当前月与去年同期销售额的差值并除以上年销售额，得到同比增长率。该指标消除了季节性因素的影响，更准确地反映业务增长趋势。

##### 13、找出“连续3次订单金额递增”的用户。

**场景**：用户消费行为分析，识别消费能力持续提升的用户。

```sql
-- 找出有连续3次订单金额递增记录的用户
WITH trend AS (
    -- 判断当前订单是否比前1次和前2次金额都高
    SELECT user_id, order_date, amount,
           amount > LAG(amount, 1) OVER (PARTITION BY user_id ORDER BY order_date) AS inc1,
           amount > LAG(amount, 2) OVER (PARTITION BY user_id ORDER BY order_date) AS inc2
    FROM orders
),
streak AS (
    -- 统计每个用户连续3次递增的次数
    SELECT user_id,
           SUM(CASE WHEN inc1 AND inc2 THEN 1 ELSE 0 END) AS inc_streak
    FROM trend
    GROUP BY user_id
)
-- 筛选出至少有1次连续3次递增的用户
SELECT user_id FROM streak WHERE inc_streak >= 1;
```

**解析**：该查询通过多层CTE实现复杂逻辑：

（1）`trend` CTE：使用`LAG`函数获取前1次和前2次订单金额，判断当前订单是否比这两次都高（`inc1`和`inc2`为true）。  
（2）`streak` CTE：统计每个用户满足连续3次递增的次数。  
（3）主查询：筛选出至少有1次连续3次递增的用户。

该分析有助于我们识别消费能力上升的用户，可针对性地提供更高价值的产品或服务。

##### 14、计算“移动总和”（最近5笔订单金额和）。

**场景**：销售波动分析，观察短期内的销售总额变化。

```sql
-- 计算包括当前订单在内的最近5笔订单的金额总和
SELECT order_id, amount,
       SUM(amount) OVER (
           ORDER BY order_date 
           ROWS BETWEEN 4 PRECEDING AND CURRENT ROW
       ) AS moving_sum_5
FROM orders;
```

**解析**：`SUM(amount) OVER (...)`计算5笔订单的移动总和，`ROWS BETWEEN 4 PRECEDING AND CURRENT ROW`定义窗口范围为当前行及之前的4行（共5笔订单）。按订单日期排序后，每个订单的移动总和反映了最近5笔交易的总金额，有助于我们观察短期销售趋势。

##### 15、找出“每个分组内的中位数”（近似）。

**场景**：用户分布分析，让我们了解各城市用户年龄的中间水平（不受极端值影响）。

```sql
-- 计算每个城市用户年龄的中位数（近似值）
WITH ranked AS (
    -- 为每个城市的用户按年龄排序，并计算总人数
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY city ORDER BY age) AS rn,
           COUNT(*) OVER (PARTITION BY city) AS cnt
    FROM users
)
-- 取排序后中间位置的年龄作为中位数
SELECT city, age AS median_age
FROM ranked
WHERE rn IN (FLOOR((cnt+1)/2), CEIL((cnt+1)/2));
```

**解析**：该方法通过排序和位置计算近似中位数：

（1）`ranked` CTE：按城市分组，按年龄排序，为每个用户分配序号（`rn`），并计算每个城市的总人数（`cnt`）。  
（2）主查询：选择序号为`FLOOR((cnt+1)/2)`和`CEIL((cnt+1)/2)`的记录，分别对应奇数和偶数人数时的中位数位置。

对于奇数人数，返回中间位置的年龄；对于偶数人数，返回中间两个位置的年龄，实现了中位数的近似计算。如果某城市有偶数个用户时，取中间两个年龄的平均值作为中位数，示例如下：

```sql
WITH ranked AS (
    SELECT 
        city,
        age,
        -- 按城市分组，年龄升序排序（明确排序方向）
        ROW_NUMBER() OVER (PARTITION BY city ORDER BY age ASC) AS rn,
        -- 计算每个城市的用户总数（去重，避免重复用户影响中位数）
        COUNT(DISTINCT user_id) OVER (PARTITION BY city) AS cnt  -- 假设users表有user_id字段
    FROM users
),
median_candidates AS (
    SELECT 
        city,
        age,
        cnt
    FROM ranked
    -- 筛选中间位置的记录（奇数取中间1条，偶数取中间2条）
    WHERE rn IN (FLOOR((cnt + 1)/2), CEIL((cnt + 1)/2))
)
-- 按城市聚合，得到最终中位数（偶数个用户时取平均）
SELECT 
    city,
    -- 处理整数年龄：若为偶数个用户，取平均后保留1位小数；奇数则直接取整
    CASE WHEN cnt % 2 = 1 THEN MAX(age)  -- 奇数个用户，中间1条记录的年龄即为中位数
         ELSE ROUND(AVG(age), 1)        -- 偶数个用户，取中间2条记录的平均年龄
    END AS median_age
FROM median_candidates
GROUP BY city, cnt;  -- 必须按cnt分组，否则CASE判断会出错
```

**挑战（16-20）**

##### 16、实现“会话划分”（30分钟无活动视为新会话）。

**场景**：用户行为分析，将用户的连续操作划分为独立会话，评估用户参与度。

```sql
-- 将用户行为按30分钟间隔划分为不同会话
WITH time_diff AS (
    -- 计算当前行为与上一次行为的时间间隔（分钟）
    SELECT user_id, timestamp,
           TIMESTAMPDIFF(MINUTE, LAG(timestamp) OVER (PARTITION BY user_id ORDER BY timestamp), timestamp) AS gap
    FROM user_actions
),
session_start AS (
    -- 标记是否为新会话（首次行为或间隔>30分钟）
    SELECT user_id, timestamp,
           CASE WHEN gap IS NULL OR gap > 30 THEN 1 ELSE 0 END AS is_new_session
    FROM time_diff
),
session_id AS (
    -- 累加新会话标记，生成会话ID
    SELECT user_id, timestamp,
           SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY timestamp) AS session_id
    FROM session_start
)
SELECT * FROM session_id;
```

**解析**：该查询通过多层CTE实现会话划分：

（1）`time_diff` CTE：计算当前行为与上一次行为的时间间隔（分钟）。  
（2）`session_start` CTE：标记新会话起点（首次行为或与上次间隔>30分钟）。  
（3）`session_id` CTE：累加新会话标记，生成唯一的会话ID（同一会话内的行为具有相同ID）。

会话划分是用户行为分析的基础，可用于计算会话时长、会话深度等指标。

##### 17、计算“用户生命周期”（首末次登录间隔）。

**场景**：用户留存分析，评估用户在平台的活跃周期。

```sql
-- 计算每个用户的生命周期（首次登录到最后一次登录的天数）
SELECT user_id,
       MIN(login_time) AS first_login,  -- 首次登录时间
       MAX(login_time) AS last_login,   -- 最后一次登录时间
       DATEDIFF(MAX(login_time), MIN(login_time)) AS lifespan_days  -- 生命周期（天）
FROM user_logins
GROUP BY user_id;
```

**解析**：`MIN(login_time)`获取用户的首次登录时间，`MAX(login_time)`获取最后一次登录时间，`DATEDIFF`计算两者之间的天数差，即为用户的生命周期。该指标反映了用户从注册到流失（或当前）的活跃时长，有助于我们评估平台对用户的长期吸引力。

如果 `login_time` 是精确到秒的时间戳（如：2025-08-24 09:00:00），`MAX(login_time)` 会返回当天最后一次登录时间，而用户生命周期应按 “日期” 计算（而非精确时间），否则会导致 “同一用户两天内的登录，因时间差 1 秒被误算为 2 天生命周期”。此时，示例应为：

```sql
SELECT 
    user_id,
    -- 按日期去重后，取首次登录日期（而非精确时间）
    MIN(DATE(login_time)) AS first_login_date,
    -- 按日期去重后，取末次登录日期
    MAX(DATE(login_time)) AS last_login_date,
    -- 计算日期差（按天），若首末次为同一天则生命周期为0天
    DATEDIFF(MAX(DATE(login_time)), MIN(DATE(login_time))) AS lifespan_days
FROM user_logins
-- 先按用户+日期去重，避免重复登录记录影响首末次判断
GROUP BY user_id, DATE(login_time)  -- 先按日期去重
GROUP BY user_id;  -- 再按用户聚合，计算首末次日期
```

##### 18、找出“每个产品类别的销售额 Top 3”。

**场景**：产品销售分析，识别每个类别中的畅销产品。

```sql
-- 找出每个产品类别中销售额排名前三的产品
SELECT * FROM (
    SELECT 
        p.category, p.product_name, SUM(oi.quantity * oi.unit_price) AS revenue,
        RANK() OVER (PARTITION BY p.category ORDER BY SUM(oi.quantity * oi.unit_price) DESC) AS rk
    FROM products p
    JOIN order_items oi ON p.product_id = oi.product_id
    GROUP BY p.category, p.product_name
) t WHERE rk <= 3;
```

**解析**：子查询中，`PARTITION BY p.category`按产品类别分组，`SUM(oi.quantity * oi.unit_price)`计算每个产品的销售额，`RANK()`按销售额降序排名。外部查询筛选出排名前三的产品，即为每个类别的Top 3畅销产品。该分析有助于我们管理库存和营销策略制定。

##### 19、计算“滚动留存率”（第1,3,7天留存）。

**场景**：这是用户增长分析和产品健康度评估的主要指标，用于衡量用户对产品的粘性。我们通过追踪用户在首次使用（新增）后的第1、3、7天是否继续活跃，可评估产品价值、用户体验和留存策略的有效性，广泛应用在互联网产品的日常运营监控、版本迭代效果分析和市场推广ROI计算。

**模拟表结构**：

```
-- 用户首次登录表（新增用户）
user_install (
    user_id BIGINT PRIMARY KEY,  -- 用户唯一标识，确保每个用户只记录一次
    install_date DATE  -- 首次登录日期，即用户"新增"日期
)

-- 用户每日活跃表
user_active (
    user_id BIGINT,  -- 用户唯一标识
    active_date DATE,  -- 用户活跃日期（登录、操作等行为）
    PRIMARY KEY (user_id, active_date)  -- 主键约束确保每个用户每天只保留一条记录（去重）
)
```

**SQL 实现：滚动留存率（第1,3,7天）**：

```sql
-- 计算每日新增用户的第1、3、7天留存率
WITH new_users AS (
    -- 获取近30天的新增用户（可根据业务需求调整时间范围）
    SELECT 
        user_id,
        install_date
    FROM user_install
    WHERE install_date >= CURRENT_DATE - INTERVAL 30 DAY  -- 起始时间：当前日期往前推30天
      AND install_date < CURRENT_DATE  -- 结束时间：当前日期（不含当天，确保数据完整性）
),

retention_flags AS (
    -- 关联活跃数据，标记每个用户在 +1, +3, +7 天是否活跃
    SELECT 
        nu.install_date,  -- 保留新增日期，用于后续分组统计
        nu.user_id,  -- 保留用户ID，确保每个用户只统计一次
        -- 第1天留存标记：如果用户在新增日+1天有活跃，标记为1，否则为0
        MAX(CASE WHEN ua.active_date = DATE_ADD(nu.install_date, INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS retained_d1,
        -- 第3天留存标记：如果用户在新增日+3天有活跃，标记为1，否则为0
        MAX(CASE WHEN ua.active_date = DATE_ADD(nu.install_date, INTERVAL 3 DAY) THEN 1 ELSE 0 END) AS retained_d3,
        -- 第7天留存标记：如果用户在新增日+7天有活跃，标记为1，否则为0
        MAX(CASE WHEN ua.active_date = DATE_ADD(nu.install_date, INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS retained_d7
    FROM new_users nu
    -- 左连接活跃表，只关联目标留存日的记录（减少数据处理量）
    LEFT JOIN user_active ua 
        ON nu.user_id = ua.user_id 
        AND ua.active_date IN (
            DATE_ADD(nu.install_date, INTERVAL 1 DAY),  -- 目标留存日：新增后第1天
            DATE_ADD(nu.install_date, INTERVAL 3 DAY),  -- 目标留存日：新增后第3天
            DATE_ADD(nu.install_date, INTERVAL 7 DAY)   -- 目标留存日：新增后第7天
        )
    -- 按新增日期和用户ID分组，确保每个用户在每个新增日只产生一条记录
    GROUP BY nu.install_date, nu.user_id
),

retention_summary AS (
    -- 按新增日期汇总留存率
    SELECT 
        install_date AS cohort_date,  -- 新增日期，也称为"同期群日期"
        COUNT(*) AS new_users,  -- 该日期的新增用户总数（去重）
        -- 第1天留存率 = 第1天留存用户数 ÷ 新增用户总数 × 100%
        SUM(retained_d1) * 100.0 / COUNT(*) AS retention_d1_pct,
        -- 第3天留存率 = 第3天留存用户数 ÷ 新增用户总数 × 100%
        SUM(retained_d3) * 100.0 / COUNT(*) AS retention_d3_pct,
        -- 第7天留存率 = 第7天留存用户数 ÷ 新增用户总数 × 100%
        SUM(retained_d7) * 100.0 / COUNT(*) AS retention_d7_pct
    FROM retention_flags
    GROUP BY install_date  -- 按新增日期分组汇总
)

-- 最终结果：按新增日期倒序展示，保留两位小数便于阅读
SELECT 
    cohort_date,
    new_users,
    ROUND(retention_d1_pct, 2) AS d1_retention,
    ROUND(retention_d3_pct, 2) AS d3_retention,
    ROUND(retention_d7_pct, 2) AS d7_retention
FROM retention_summary
ORDER BY cohort_date DESC;
```

**模拟输出**：

| cohort\_date | new\_users | d1\_retention | d3\_retention | d7\_retention |
| --- | --- | --- | --- | --- |
| 2025-08-18 | 1250 | 68.20 | 45.60 | 32.10 |
| 2025-08-17 | 1180 | 69.50 | 47.20 | 33.80 |
| 2025-08-16 | 1320 | 67.80 | 44.10 | 30.50 |
| ... | ... | ... | ... | ... |

**解析**：

| 技术细节 | 作用 |
| --- | --- |
| `WITH 子句（CTE）` | 将复杂查询分解为三个逻辑清晰的步骤（获取新增用户→标记留存→汇总计算），提高可读性和可维护性 |
| `CURRENT_DATE - INTERVAL 30 DAY` | 动态获取时间范围，无需手动修改日期，适合集成到调度系统（如：Airflow）实现每日自动计算 |
| `LEFT JOIN + IN (日期列表)` | 只关联目标留存日（+1、+3、+7天）的活跃记录，避免全表扫描，大幅提升查询效率 |
| `CASE WHEN + MAX()` | ① 将用户在目标日的活跃状态转为0/1标记（1=留存，0=未留存） ② `MAX()`确保即使用户在同一天有多次活跃（如：登录5次），也只会被标记为1次留存，避免重复计数 |
| `DATE_ADD(..., INTERVAL N DAY)` | 动态计算目标留存日期，无需硬编码，适配不同留存天数的需求（如：改为2天、14天留存只需修改数字） |
| `GROUP BY install_date, user_id` | 确保每个用户在每个新增日期只产生一条记录，为后续准确计算留存率奠定基础 |
| `SUM(flag) / COUNT(*)` | 留存率计算公式：分子是留存用户数（flag=1的总和），分母是新增用户总数，结果×100转为百分比 |
| `ROUND(..., 2)` | 将留存率保留两位小数，便于阅读和报表展示 |
| `ORDER BY cohort_date DESC` | 按日期倒序排列，优先展示最新数据，符合日常查看习惯 |

**性能优化**：

（1）**索引优化**

```
-- 加速新增用户筛选
ALTER TABLE user_install ADD INDEX idx_install_date (install_date);
-- 加速活跃记录关联
ALTER TABLE user_active ADD INDEX idx_user_date (user_id, active_date);
```

（2）**数据分区**

*   对`user_active`表按`active_date`进行分区，将历史数据和近期数据分开存储，提升查询效率。
    

（3）**结果预计算**

*   将每日计算结果写入`report_retention_daily`表，供BI工具直接查询，减少重复计算。
    
*   可添加`etl_time`字段记录计算时间，便于数据追溯。
    

（4）**异常处理**

*   当某天新增用户为0时，`COUNT(*)`为0，可能导致除数为0错误，可优化为：
    
    ```
    SUM(retained_d1) * 100.0 / NULLIF(COUNT(*), 0) AS retention_d1_pct
    ```
    

（5）**扩展性增强**

*   如需计算更多天的留存（如：14天、30天），只需在`retention_flags`中增加对应标记即可。
    
*   可增加筛选条件（如：渠道、地区），分析不同维度的留存差异。
    

**常见问题**：

（1）**如何处理用户在目标日的多次登录？**  
通过`MAX(CASE ...)`实现：即使一个用户在第1天登录10次，`MAX()`函数也会将其标记为1（留存），避免重复计数，确保我们统计的是“用户是否留存”而非“登录次数”。

（2）**为什么使用`LEFT JOIN`而非`INNER JOIN`？**  
`LEFT JOIN`会保留所有新增用户，包括那些在目标日未活跃的用户（这些用户会被标记为0），确保分母（新增用户总数）的准确性。若使用`INNER JOIN`，未留存用户会被过滤，会导致计算结果错误。

（3）**为什么限定`install_date < CURRENT_DATE`？**  
确保我们统计的新增用户有完整的留存观察期：例如，8月20日的新增用户，需要到8月21日才能计算第1天留存，若包含当天数据可能导致结果不准确。

（4）**如何处理 “用户重复新增” 的异常数据？**  
`user_install` 表假设 `user_id` 是主键，但实际业务中可能因数据同步错误导致 “同一用户多次插入安装记录”（如：用户卸载后重装），此时 `MIN(install_date)` 会取最早日期，但留存率计算应基于 “最近一次安装”（否则会将老用户误判为新用户）。此时，示例部分修正为：

```sql
WITH latest_install AS (
    -- 先获取每个用户的最新安装日期（排除重复安装记录）
    SELECT 
        user_id,
        MAX(install_date) AS install_date  -- 取最新一次安装日期作为“新增日期”
    FROM user_install
    GROUP BY user_id
),
new_users AS (
    SELECT 
        user_id,
        install_date
    FROM latest_install
    WHERE install_date >= CURRENT_DATE - INTERVAL 30 DAY 
      AND install_date < CURRENT_DATE
)
-- 后续retention_flags、retention_summary逻辑不变，仅将new_users的数据源改为latest_install
```

##### 20、实现“加权移动平均”（近期权重更高）。

**场景**：销售预测分析，对近期数据赋予更高权重，更准确地反映最新趋势。

```sql
-- 计算加权移动平均，近期数据权重更高（当前*3, 前1*2, 前2*1）
SELECT order_date, amount,
       (3*amount + 2*LAG(amount,1,0) OVER w + 1*LAG(amount,2,0) OVER w) / 6.0 AS wma
FROM orders
WINDOW w AS (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW);
```

**解析**：加权移动平均相比普通移动平均，对近期数据赋予更高权重，更能反映最新趋势。该查询中，当前订单金额权重为3，前1笔为2，前2笔为1，总和为6（权重之和）。`WINDOW w`定义了窗口范围并重复使用，简化了查询。加权移动平均常用于销售预测和趋势分析。

对于“前 1 行 / 前 2 行不存在” 的边界情况，例如第 1 条记录（无前 1、前 2 行），`LAG(amount,1,0)` 和 `LAG(amount,2,0)` 会返回 0，此时加权平均为 `(3*amount + 0 + 0)/6`，但实际应只计算 “当前行”（权重为 3，分母为 3），否则会导致前 2 条记录的加权平均被低估。此时，示例应为：

```sql
SELECT 
    order_date,
    amount,
    -- 动态计算权重总和：根据当前行的位置，避免分母固定为6导致的误差
    (3*amount + 2*LAG(amount,1,0) OVER w + 1*LAG(amount,2,0) OVER w) 
    / 
    -- 权重总和：当前行必存在（3），前1行存在则加2，前2行存在则加1
    (3 + CASE WHEN LAG(amount,1) OVER w IS NOT NULL THEN 2 ELSE 0 END + CASE WHEN LAG(amount,2) OVER w IS NOT NULL THEN 1 ELSE 0 END) 
    AS wma
FROM orders
-- 窗口范围不变，但需确保按日期排序（若有重复日期，建议加order_id确保顺序唯一）
WINDOW w AS (ORDER BY order_date, order_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW);
```

#### 二、自动化报表 SQL 脚本模板

**场景**：日报、周报、月报自动生成（可集成到调度系统，如：Airflow），用于我们定期监控业务指标、用户增长和系统健康状态，支持数据驱动决策。

##### 1、用户增长日报

```sql
-- 文件名：daily_user_growth.sql
-- 调度：每天 00:10 执行（统计昨日数据）

-- 向用户增长日报表插入昨日数据
INSERT INTO report_daily_user_growth (report_date, new_users, active_users, retention_rate)
SELECT 
    CURRENT_DATE - INTERVAL 1 DAY AS report_date,  -- 报表日期为昨天
    -- 统计昨日新增用户数（创建时间为昨天）
    COUNT(CASE WHEN DATE(created_at) = CURRENT_DATE - INTERVAL 1 DAY THEN 1 END) AS new_users,
    -- 统计昨日活跃用户数（最后登录时间为昨天）
    COUNT(CASE WHEN DATE(last_login) = CURRENT_DATE - INTERVAL 1 DAY THEN 1 END) AS active_users,
    -- 计算次日留存率：前天新增用户中昨天仍登录的比例
    (SELECT COUNT(*) FROM users 
     WHERE DATE(created_at) = CURRENT_DATE - INTERVAL 2 DAY  -- 前天新增的用户
       AND DATE(last_login) = CURRENT_DATE - INTERVAL 1 DAY   -- 昨天仍登录
    ) * 100.0 / NULLIF(  -- NULLIF避免除以0
        COUNT(CASE WHEN DATE(created_at) = CURRENT_DATE - INTERVAL 2 DAY THEN 1 END), 0
    ) AS retention_rate
FROM users
WHERE created_at >= CURRENT_DATE - INTERVAL 3 DAY;  -- 限定日期范围，提升查询性能
```

**解析**：该脚本用于我们每日自动统计用户增长的主要指标，包括：新增用户数、活跃用户数和次日留存率。通过`CURRENT_DATE - INTERVAL`动态计算日期，确保每天执行时自动获取前一天的数据。`NULLIF`函数处理了除数为0的特殊情况（当某天没有新增用户时）。限定查询范围（最近3天）避免全表扫描，提高执行效率。该报表可帮助我们监控每日用户动态和产品留存情况。

##### 2、订单交易周报

```sql
-- 文件名：weekly_order_report.sql
-- 调度：每周一 01:00 执行（统计上周数据）

-- 向上周订单报表插入数据
INSERT INTO report_weekly_order (week_start, week_end, total_orders, gmv, avg_order_value, top_product)
SELECT 
    -- 计算上周起始日期（上周一）
    DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 7 DAY) AS week_start,
    -- 计算上周结束日期（上周日）
    DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY) AS week_end,
    COUNT(*) AS total_orders,  -- 订单总数
    SUM(amount) AS gmv,  -- 销售总额
    AVG(amount) AS avg_order_value,  -- 平均订单金额
    -- 子查询：找出上周销量最高的商品
    (SELECT p.product_name 
     FROM products p 
     JOIN order_items oi ON p.product_id = oi.product_id 
     JOIN orders o ON oi.order_id = o.order_id 
     WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 7 DAY)
       AND o.order_date < DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY)
     GROUP BY p.product_id 
     ORDER BY SUM(oi.quantity) DESC 
     LIMIT 1
    ) AS top_product
FROM orders
-- 筛选上周已完成的订单
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 7 DAY)
  AND order_date < DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY)
  AND status = 'completed';
```

**解析**：该脚本每周一自动生成上周的订单交易报告，主要指标包括订单总数、销售总额(GMV)、平均订单金额和最畅销商品。通过`WEEKDAY(CURDATE())`动态计算上周的起止日期（周一至周日），确保无论周几执行都能正确获取上周数据。子查询通过关联订单、订单项和商品表，计算并返回上周销量最高的商品。报表仅统计状态为"completed"的订单，确保数据准确性。该报表可帮助我们分析每周业绩和产品销售情况。

##### 3、月度财务报表

```sql
-- 文件名：monthly_finance_report.sql
-- 调度：每月1日 02:00 执行（统计上月数据）

-- 向上月财务报表插入数据
INSERT INTO report_monthly_finance (month, revenue, cost, profit, profit_margin)
SELECT 
    -- 格式化上月为"年-月"形式
    DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m') AS month,
    -- 子查询：计算上月营收（已完成订单总金额）
    (SELECT SUM(amount) FROM orders WHERE status = 'completed'
     AND order_date >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
     AND order_date < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    ) AS revenue,
    -- 子查询：获取上月成本
    (SELECT SUM(cost) FROM product_costs 
     WHERE month = DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m')
    ) AS cost,
    revenue - cost AS profit,  -- 计算利润
    -- 计算利润率，处理营收为0的特殊情况
    CASE WHEN revenue > 0 THEN (revenue - cost) * 100.0 / revenue ELSE 0 END AS profit_margin
FROM DUAL;  -- MySQL中使用DUAL表获取单行结果；在其它数据库（如：PostgreSQL、SQL Server）中，可能只需要SELECT ...而无需FROM DUAL
```

**解析**：该脚本每月1日自动生成上月财务报表，主要指标包括营收、成本、利润和利润率。通过`DATE_FORMAT`和`DATE_SUB`函数动态计算上月的起止日期，确保准确筛选上月数据。营收通过统计上月已完成订单的总金额得出，成本从产品成本表获取，利润为营收减去成本，利润率为利润占营收的百分比。`CASE`语句处理了营收为0的特殊情况，避免出现错误。该报表为我们提供了月度经营状况数据。

##### 4、错误日志监控日报

```sql
-- 文件名：daily_error_monitor.sql
-- 调度：每天 00:15 执行（统计昨日数据）

-- 向错误监控日报表插入昨日数据
INSERT INTO report_error_monitor (report_date, error_count, top_error_url, warning_count)
SELECT 
    CURRENT_DATE - INTERVAL 1 DAY,  -- 报表日期为昨天
    COUNT(*) AS error_count,  -- 错误总数（5xx状态码）
    -- 子查询：找出错误最多的URL
    (SELECT url FROM web_logs 
     WHERE DATE(timestamp) = CURRENT_DATE - INTERVAL 1 DAY 
       AND status >= 500  -- 服务器错误
     GROUP BY url 
     ORDER BY COUNT(*) DESC 
     LIMIT 1
    ) AS top_error_url,
    -- 统计警告数（4xx状态码）
    COUNT(CASE WHEN status BETWEEN 400 AND 499 THEN 1 END) AS warning_count
FROM web_logs
-- 筛选昨日的错误和警告日志
WHERE DATE(timestamp) = CURRENT_DATE - INTERVAL 1 DAY
  AND status >= 400;  -- 4xx警告和5xx错误
```

**解析**：该脚本每日自动监控系统错误日志，统计错误总数、警告总数和错误最多的URL。HTTP状态码中，4xx表示客户端错误（警告），5xx表示服务器错误（错误）。通过子查询找出错误最多的URL，帮助我们快速定位问题。报表数据来自web日志表，筛选条件确保只统计昨天的记录。该报表为我们提供了系统健康状态的每日快照，便于我们及时发现问题并加以解决。

搞定这 20 道题，SQL 窗口函数这块，我们基本就拿下了！从简单的排名到复杂的留存率计算，这些都是实际业务中常用的分析手段。把这些技巧用到日常报表里，不管是用户增长、销售趋势还是系统监控，我们都能轻松搞定。以后再遇到类似的分析需求，我们也能快速写出高效又准确的 SQL 啦！