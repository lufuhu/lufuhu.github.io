---
title: 50道SQL基础练习题，覆盖用户分析与销售统计的连表及窗口函数
lastUpdated: 2026-09-28 04:00:00
---


前两天推送的 SQL 进阶内容，大家基本没有打开看！这两天我们从善如流，在码一些 SQL 基础资料，后续会陆陆续续推送给大家。今天这 50 个 SQL 示例超实用！从基础的查年龄、搜名字，到复杂的连表统计、窗口函数，覆盖了用户分析、销售统计等各种实用场景。每个例子都有清晰的参考代码和解析，不管是刚入门想练手，还是工作中要解决实际问题，跟着学准没错，我们小白也能快速上手！（所有代码块或表格均可左右滚动）

#### 一、基础查询（1-10）

##### 1、查询年龄在 20-30 岁之间的用户姓名和城市

**场景**：用户画像分析，筛选特定年龄段用户的地域分布

```sql
-- 从users表中筛选出年龄在20到30岁之间的用户，只返回姓名和城市字段
SELECT name, city FROM users WHERE age BETWEEN 20 AND 30;
```

**解析**：我们使用`BETWEEN...AND`操作符高效筛选年龄范围，相比`age >= 20 AND age <= 30`更简洁。只选择需要的字段（name, city）而非全部（\*）可以提高查询效率。

##### 2、找出名字包含 "Li" 的用户

**场景**：用户搜索功能，按姓名关键字查找用户

```sql
-- 查询所有名字中包含"Li"字符串的用户记录
SELECT * FROM users WHERE name LIKE '%Li%';
```

**解析**：`LIKE`用于模糊匹配，`%`是通配符，表示任意字符（包括零个字符）。`%Li%`表示"Li"可以出现在名字的任意位置。如果需要区分大小写，某些数据库需要使用特定的运算符（如：PostgreSQL的`ILIKE`）。

##### 3、查询所有不重复的城市

**场景**：统计平台覆盖的城市列表，用于地理位置分析

```sql
-- 从users表中获取所有不重复的城市名称
SELECT DISTINCT city FROM users;
```

**解析**：`DISTINCT`关键字用于去除查询结果中的重复记录，确保每个城市只出现一次。如果要对多个字段去重，`DISTINCT`会考虑所有字段的组合是否重复。

##### 4、按年龄降序列出用户

**场景**：用户数据分析，查看年龄分布的极端值

```sql
-- 按年龄从大到小排序所有用户记录
SELECT * FROM users ORDER BY age DESC;
```

**解析**：`ORDER BY`用于对结果集排序，`DESC`表示降序（从大到小），默认是`ASC`升序（从小到大）。可以指定多个排序字段，如：`ORDER BY age DESC, name ASC`。

##### 5、查询前 5 个注册的用户

**场景**：系统首批用户分析，查看早期注册用户特征

```sql
-- 按注册时间排序，取最早注册的5个用户
SELECT * FROM users ORDER BY created_at LIMIT 5;
```

**解析**：`LIMIT 5`用于限制返回结果的数量，只返回前5条记录。结合`ORDER BY created_at`（假设`created_at`是注册时间字段）可以获取按时间排序的前N条记录，常用于分页查询。

##### 6、查询 email 为空的用户

**场景**：用户信息补全提醒，找出未填写邮箱的用户

```sql
-- 查询所有email字段为空的用户
SELECT * FROM users WHERE email IS NULL;
```

**解析**：在SQL中，判断字段是否为空必须使用`IS NULL`，而不能使用`= NULL`。对应的非空判断是`IS NOT NULL`。这是因为`NULL`表示"未知"，不能用常规的比较运算符。

##### 7、计算用户总数

**场景**：平台运营数据统计，获取总用户规模

```sql
-- 计算users表中的记录总数，并将结果命名为total_users
SELECT COUNT(*) AS total_users FROM users;
```

**解析**：`COUNT(*)`用于统计记录行数，包括NULL值。`AS total_users`为结果列指定别名，使输出更易读。也可以使用`COUNT(1)`达到相同效果，某些情况下性能略优。

##### 8、查询最大年龄

**场景**：用户年龄分布分析，了解年龄上限

```sql
-- 查询users表中年龄的最大值，并命名为max_age
SELECT MAX(age) AS max_age FROM users;
```

**解析**：`MAX()`是聚合函数，用于计算指定列的最大值。类似的函数还有`MIN()`（最小值）、`SUM()`（总和）、`AVG()`（平均值）等。聚合函数会自动忽略NULL值。

##### 9、查询用户平均年龄（保留2位小数）

**场景**：用户画像分析，计算用户群体的平均年龄

```sql
-- 计算平均年龄并保留2位小数，结果命名为avg_age
SELECT ROUND(AVG(age), 2) AS avg_age FROM users;
```

**解析**：`AVG(age)`计算年龄的平均值，`ROUND(..., 2)`将结果四舍五入保留2位小数。聚合函数`AVG()`会忽略NULL值，只计算非空记录的平均值。

##### 10、查询名字最长的用户

**场景**：用户数据质量检查，发现异常长度的姓名

```sql
-- 按姓名长度降序排序，取最长姓名的用户
SELECT * FROM users ORDER BY CHAR_LENGTH(name) DESC LIMIT 1;
```

**解析**：`CHAR_LENGTH(name)`计算姓名的字符长度，`ORDER BY ... DESC`按长度从长到短排序，`LIMIT 1`取最长的那条记录。如果有多个用户姓名长度相同且都是最长，则只返回其中一条。

#### 二、JOIN 与子查询（11-20）

##### 11、列出每个用户的订单数量（包括无订单用户）

**场景**：用户活跃度分析，包括从未下单的用户

```sql
-- 统计每个用户的订单数量，包括没有订单的用户
SELECT u.name, COUNT(o.order_id) AS order_count
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.name;
```

**解析**：我们使用`LEFT JOIN`确保所有用户（包括没有订单的）都被包含在结果中。`COUNT(o.order_id)`统计订单数量，对于无订单的用户会返回0。`GROUP BY`子句按用户分组，确保每个用户只出现一次。

##### 12、找出下过订单的用户姓名

**场景**：筛选付费用户，用于精准营销

```sql
-- 方法1：使用子查询找出有订单的用户ID
SELECT name FROM users WHERE user_id IN (SELECT user_id FROM orders);

-- 方法2：使用JOIN并去重
SELECT DISTINCT u.name FROM users u JOIN orders o ON u.user_id = o.user_id;
```

**解析**：两种方法都能实现目标。子查询方法更直观，`IN`关键字判断`用户ID`是否存在于订单表中。`JOIN`方法通过连接两个表，再用`DISTINCT`去除重复的用户姓名。对于大数据量，`JOIN`方法通常性能更好。

##### 13、查询“订单金额大于平均值”的订单

**场景**：找出高价值订单，分析大额交易特征

```sql
-- 查询金额高于平均订单金额的所有订单
SELECT * FROM orders 
WHERE amount > (SELECT AVG(amount) FROM orders);
```

**解析**：这是一个标量子查询，内部查询`SELECT AVG(amount) FROM orders`计算所有订单的平均金额，外部查询筛选出金额高于这个平均值的订单。子查询只返回一个值，与外部查询的每条记录进行比较。

##### 14、找出“未下过订单”的用户

**场景**：针对未下单用户进行转化营销活动

```sql
-- 使用NOT EXISTS找出没有任何订单的用户
SELECT name FROM users u WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.user_id);
```

**解析**：`NOT EXISTS`用于判断子查询是否没有返回结果。对于每个用户，子查询检查是否存在对应的订单，如果不存在（`NOT EXISTS`），则该用户被选中。这种方法通常比`LEFT JOIN + IS NULL`性能更好。

##### 15、查询每个用户的最近一笔订单时间

**场景**：用户活跃度分析，了解用户最后一次购买时间

```sql
-- 查找每个用户的最近订单日期
SELECT u.name, MAX(o.order_date) AS last_order
FROM users u
JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.name;
```

**解析**：`MAX(o.order_date)`计算每个用户的最新订单日期，`GROUP BY u.user_id, u.name`按用户分组。这里使用`JOIN`而非`LEFT JOIN`，意味着只包含有订单的用户。如果要包含所有用户（包括无订单的），我们应使用`LEFT JOIN`，此时无订单用户的`last_order`会为NULL。

##### 16、找出“购买过 iPhone 和 Laptop”的用户

**场景**：交叉销售分析，找出同时购买两类产品的用户

```sql
-- 查找同时购买过iPhone和Laptop的用户
SELECT u.name
FROM users u
JOIN orders o ON u.user_id = o.user_id
JOIN products p ON o.product_id = p.product_id
WHERE p.product_name IN ('iPhone', 'Laptop')
GROUP BY u.user_id, u.name
HAVING COUNT(DISTINCT p.product_name) = 2;
```

**解析**：通过多表连接获取用户购买的产品信息，`WHERE`子句筛选出购买了iPhone或Laptop的记录。`GROUP BY`按用户分组后，`HAVING COUNT(DISTINCT p.product_name) = 2`确保用户同时购买了这两种产品（去重计数为2）。

##### 17、查询“每个订单对应的商品名称”

**场景**：订单详情展示，关联订单与商品信息

```sql
-- 获取每个订单包含的商品名称
SELECT o.order_id, p.product_name
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id;
```

**解析**：这是一个多表连接查询，`orders`表与`order_items`（订单项）表连接，再与`products`（商品）表连接，从而获取每个订单包含的具体商品名称。适用于一个订单包含多个商品的场景（订单-订单项-商品的经典关系）。

##### 18、找出“订单总额最高的商品”

**场景**：产品销售分析，确定带来最高收入的商品

```sql
-- 计算每个商品的销售总额并找出最高的
SELECT p.product_name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY revenue DESC
LIMIT 1;
```

**解析**：`SUM(oi.quantity * oi.unit_price)`计算每个商品的总销售额（数量×单价），`GROUP BY`按商品分组，`ORDER BY revenue DESC`按销售额降序排序，`LIMIT 1`取销售额最高的商品。

##### 19、查询“用户及其推荐人”（假设 users 表有 referrer\_id）

**场景**：推荐系统分析，查看用户推荐关系链

```sql
-- 查询每个用户及其推荐人姓名
SELECT u.name AS user, r.name AS referrer
FROM users u
LEFT JOIN users r ON u.referrer_id = r.user_id;
```

**解析**：这是一个自连接查询（同一张表连接自身），将用户表作为"用户"和"推荐人"两个角色进行连接。`LEFT JOIN`确保即使没有推荐人（`referrer_id`为`NULL`）的用户也会被包含在结果中，此时推荐人姓名为`NULL`。

##### 20、找出“互相关注”的用户对（A关注B，B也关注A）

**场景**：社交关系分析，识别双向好友关系

```sql
-- 查找互相关注的用户对
-- 假设关注表：follows(follower_id, followee_id)
SELECT f1.follower_id, f1.followee_id
FROM follows f1
JOIN follows f2 ON f1.follower_id = f2.followee_id AND f1.followee_id = f2.follower_id
WHERE f1.follower_id < f1.followee_id;  -- 避免重复对 (A,B) 和 (B,A)
```

**解析**：我们通过自连接查找双向关注关系：f1表中A关注B，f2表中B关注A。`WHERE f1.follower_id < f1.followee_id`条件用于避免重复的用户对（如：(A,B)和(B,A)被视为同一个关系对）。

#### 三、分组统计（21-30）

##### 21、按城市统计用户数和平均年龄

**场景**：用户地域分布分析，了解不同城市的用户特征

```sql
-- 按城市分组，统计每个城市的用户数量和平均年龄
SELECT city, COUNT(*) AS user_count, AVG(age) AS avg_age
FROM users
GROUP BY city;
```

**解析**：`GROUP BY city`按城市对用户进行分组，`COUNT(*)`计算每个城市的用户数量，`AVG(age)`计算每个城市用户的平均年龄。结果展示了用户在不同城市的分布及年龄特征。

##### 22、找出“订单数超过 2 的用户”

**场景**：识别活跃用户，定义为下单次数超过2次的用户

```sql
-- 查找订单数量超过2的用户
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 2;
```

**解析**：`GROUP BY user_id`按用户分组，`COUNT(*)`统计每个用户的订单数量。`HAVING`子句用于筛选分组后的结果，只保留订单数大于2的用户。注意`HAVING`用于过滤分组，而`WHERE`用于过滤行。

##### 23、统计每天的订单数

**场景**：销售趋势分析，查看订单量随时间的变化

```sql
-- 按日期统计每天的订单数量
SELECT DATE(order_date) AS day, COUNT(*) AS order_count
FROM orders
GROUP BY day
ORDER BY day;
```

**解析**：`DATE(order_date)`将订单时间（可能包含时分秒）转换为日期，`GROUP BY day`按日期分组，`COUNT(*)`统计每天的订单数。`ORDER BY day`确保结果按时间顺序排列，便于观察趋势。

##### 24、计算每个用户的消费总额

**场景**：用户价值分析，计算用户的累计消费金额

```sql
-- 计算每个用户的总消费金额
SELECT user_id, SUM(amount) AS total_spent
FROM orders
GROUP BY user_id;
```

**解析**：`SUM(amount)`计算每个用户的订单金额总和，`GROUP BY user_id`按用户分组。结果可以用于用户分群（如：高价值用户、低价值用户）和客户生命周期价值(CLV)分析。

##### 25、找出“平均订单金额 > 1000”的用户

**场景**：识别高客单价用户，针对他们设计高端产品策略

```sql
-- 查找平均订单金额超过1000的用户
SELECT user_id
FROM orders
GROUP BY user_id
HAVING AVG(amount) > 1000;
```

**解析**：`AVG(amount)`计算每个用户的平均订单金额，`HAVING AVG(amount) > 1000`筛选出平均订单金额超过1000的用户。这类用户通常对价格敏感度较低，是高端产品的目标客户。

##### 26、统计不同状态的订单数量

**场景**：订单流程分析，监控各状态订单的数量分布

```sql
-- 按订单状态统计数量
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status;
```

**解析**：`GROUP BY status`按订单状态（如："待支付"、"已发货"、"已完成"等）分组，`COUNT(*)`统计每个状态的订单数量。结果可用于订单流程优化和异常监控（如：大量"取消"状态可能表明存在问题）。

##### 27、找出“每月新增用户数”

**场景**：用户增长分析，跟踪每月新注册用户数量

```sql
-- 按月份统计新增用户数量
SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS new_users
FROM users
GROUP BY month
ORDER BY month;
```

**解析**：`DATE_FORMAT(created_at, '%Y-%m')`将注册时间格式化为"年-月"形式，`GROUP BY month`按月份分组，`COUNT(*)`统计每月新增用户数。`ORDER BY month`确保结果按时间顺序排列，便于观察增长趋势。

##### 28、计算“复购率”（购买 ≥2 次的用户占比）

**场景**：用户忠诚度分析，计算用户复购比例

```sql
-- 计算复购率：购买2次及以上的用户占总购买用户的比例
WITH user_orders AS (
    SELECT user_id, COUNT(*) AS cnt FROM orders GROUP BY user_id
)
SELECT 
    COUNT(CASE WHEN cnt >= 2 THEN 1 END) * 100.0 / COUNT(*) AS repurchase_rate
FROM user_orders;
```

**解析**：使用CTE（公用表表达式）`user_orders`计算每个用户的订单数量。主查询中，`COUNT(CASE WHEN cnt >= 2 THEN 1 END)`统计复购用户数，除以总用户数得到复购率，乘以100.0将结果转换为百分比。

##### 29、找出“最畅销商品”（按销量）

**场景**：库存管理和销售策略，确定销量最高的商品

```sql
-- 按销量找出最畅销的商品
SELECT p.product_name, SUM(oi.quantity) AS total_sold
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_sold DESC
LIMIT 1;
```

**解析**：`SUM(oi.quantity)`计算每个商品的总销量，`GROUP BY`按商品分组，`ORDER BY total_sold DESC`按销量降序排序，`LIMIT 1`取销量最高的商品。这一信息可用在库存管理和促销活动。

##### 30、统计“各年龄段用户分布”

**场景**：用户画像分析，了解不同年龄段的用户占比

```sql
-- 将用户按年龄分组并统计数量
SELECT 
    CASE 
        WHEN age < 18 THEN '未成年'
        WHEN age BETWEEN 18 AND 35 THEN '青年'
        WHEN age BETWEEN 36 AND 55 THEN '中年'
        ELSE '老年'
    END AS age_group,
    COUNT(*) AS count
FROM users
GROUP BY age_group;
```

**解析**：`CASE`语句将年龄划分为不同的年龄段（未成年、青年、中年、老年），`GROUP BY age_group`按年龄段分组，`COUNT(*)`统计每个年龄段的用户数量。这种分组方式使年龄分布更直观，便于针对性营销。

#### 四、窗口函数（31-40）

##### 31、为每个订单按金额排名（全局排名）

**场景**：销售分析，确定订单金额在所有订单中的排名

```sql
-- 为所有订单按金额从高到低排名
SELECT order_id, amount, RANK() OVER (ORDER BY amount DESC) AS rank
FROM orders;
```

**解析**：`RANK()`是窗口函数，用于计算每行在结果集中的排名。`OVER (ORDER BY amount DESC)`定义了排名的窗口范围（所有订单）和排序方式（按金额降序）。如果有金额相同的订单，会产生相同的排名，且下一个排名会跳过相应的位数（如：1,2,2,4...）。

##### 32、为每个用户的订单按时间排序（1,2,3...）

**场景**：用户行为分析，跟踪用户的订单顺序

```sql
-- 为每个用户的订单按时间分配序号
SELECT user_id, order_id, order_date,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) AS rn
FROM orders;
```

**解析**：`ROW_NUMBER()`为每行分配一个唯一的序号。`PARTITION BY user_id`将数据按用户分组，每个用户形成一个独立的窗口。`ORDER BY order_date`在每个用户组内按订单时间排序，`rn`列表示该用户的第几个订单（1表示第一个订单）。

##### 33、找出“每个用户金额最高的订单”

**场景**：用户价值分析，了解用户的最大单笔消费

```sql
-- 查找每个用户金额最高的订单
SELECT * FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC) AS rn
    FROM orders
) t WHERE rn = 1;
```

**解析**：子查询中，`ROW_NUMBER()`按用户分组（`PARTITION BY user_id`），并按订单金额降序排序，为每个用户的订单分配序号（1表示金额最高）。外部查询筛选出序号为1的记录，即每个用户金额最高的订单。如果有多个最高金额相同的订单，`ROW_NUMBER()`会随机选择一个，此时可用`RANK()`或`DENSE_RANK()`替代。

##### 34、计算“累计订单金额”（按时间顺序）

**场景**：销售趋势分析，查看累计销售额随时间的增长

```sql
-- 按时间顺序计算累计订单金额
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date) AS cumulative_amount
FROM orders;
```

**解析**：`SUM(amount) OVER (ORDER BY order_date)`是一个累加窗口函数，按订单时间排序，计算从第一条记录到当前记录的金额总和。`cumulative_amount`列显示截至该订单日期的累计销售额，直观展示销售增长趋势。

##### 35、计算“移动平均”（过去3天平均金额）

**场景**：销售波动分析，平滑短期波动以观察长期趋势

```sql
-- 计算过去3天（包括当天）的订单金额移动平均值
SELECT order_date, amount,
       AVG(amount) OVER (
           ORDER BY order_date 
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS moving_avg
FROM orders;
```

**解析**：`AVG(amount) OVER (...)`计算移动平均值，`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`定义窗口范围为当前行及之前的2行（共3行）。按订单日期排序后，每个日期的移动平均值基于包括当天在内的过去3天数据，有助于消除短期波动，更清晰地展示趋势。

##### 36、找出“每个城市年龄最大的用户”

**场景**：用户地域特征分析，了解各城市的年龄分布极端值

```sql
-- 查找每个城市中年龄最大的用户
SELECT * FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY city ORDER BY age DESC) AS rn
    FROM users
) t WHERE rn = 1;
```

**解析**：子查询按城市分组（`PARTITION BY city`），并按年龄降序排序，为每个城市的用户分配序号（1表示年龄最大）。外部查询筛选出序号为1的记录，即每个城市年龄最大的用户。如果有多个同龄且最大的用户，`ROW_NUMBER()`会随机选择一个。

##### 37、计算“订单金额的百分位排名”

**场景**：订单价值分析，确定订单金额在整体分布中的位置

```sql
-- 计算每个订单金额的百分位排名
SELECT order_id, amount,
       PERCENT_RANK() OVER (ORDER BY amount) AS pct_rank
FROM orders;
```

**解析**：`PERCENT_RANK()`计算每行在排序后的结果集中的相对位置，返回值范围为0到1。对于金额最小的订单，`pct_rank`为0；对于金额最大的订单，`pct_rank`为1。这一指标有助于评估订单金额的相对大小（如：某订单的`pct_rank`为0.9表示其金额高于90%的订单）。

##### 38、找出“每个用户的第一笔和最后一笔订单时间”

**场景**：用户生命周期分析，计算用户的留存时间

```sql
-- 方法1：使用聚合函数
SELECT user_id,
       MIN(order_date) AS first_order,
       MAX(order_date) AS last_order
FROM orders
GROUP BY user_id;

-- 方法2：使用窗口函数
SELECT DISTINCT user_id,
       FIRST_VALUE(order_date) OVER w AS first_order,
       LAST_VALUE(order_date) OVER w AS last_order
FROM orders
WINDOW w AS (PARTITION BY user_id ORDER BY order_date 
             ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING);
```

**解析**：两种方法都能获取每个用户的首单和末单时间。聚合函数方法更简洁，`MIN(order_date)`和`MAX(order_date)`分别获取最早和最晚订单时间。窗口函数方法使用`FIRST_VALUE`和`LAST_VALUE`，`WINDOW`子句定义了窗口范围（每个用户的所有订单），`DISTINCT`确保每个用户只出现一次。

##### 39、计算“同比上月增长率”（假设每月一条记录）

**场景**：销售业绩分析，评估每月业绩的增长情况

```sql
-- 计算每月销售额及同比上月的增长率
WITH monthly_gmv AS (
    SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(amount) AS gmv
    FROM orders GROUP BY month
)
SELECT month, gmv,
       LAG(gmv, 1) OVER (ORDER BY month) AS prev_month_gmv,
       ROUND((gmv - LAG(gmv, 1) OVER (ORDER BY month)) * 100.0 / LAG(gmv, 1) OVER (ORDER BY month), 2) AS growth_rate
FROM monthly_gmv;
```

**解析**：CTE `monthly_gmv`计算每月的总销售额（GMV）。主查询中，`LAG(gmv, 1)`获取上一个月的销售额，通过计算当前月与上月销售额的差值并除以上月销售额，得到增长率，`ROUND(..., 2)`保留两位小数。这一指标用在评估业务增长趋势。

##### 40、找出“连续登录3天的用户”

**场景**：用户活跃度分析，识别连续3天及以上登录平台的忠实用户，用于我们制定用户留存策略或奖励机制

**方法1：使用日期差和窗口函数**

```sql
-- 步骤1：为每个用户的登录记录去重并按日期排序，分配行号
WITH user_login_rn AS (
    SELECT 
        user_id,
        login_date,
        -- 按用户分组，登录日期升序排序，为每条记录分配唯一行号
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn
    FROM user_login
    -- 去重处理：确保每个用户每天只保留一条登录记录
    GROUP BY user_id, login_date
),
-- 步骤2：计算登录日期与行号的差值，连续日期会形成相同的差值
date_diff AS (
    SELECT 
        user_id,
        login_date,
        -- 核心逻辑：用登录日期减去行号对应的天数，连续日期会得到相同的diff_date
        DATE_SUB(login_date, INTERVAL rn DAY) AS diff_date
    FROM user_login_rn
)
-- 步骤3：筛选出连续3天及以上登录的用户
SELECT DISTINCT user_id
FROM date_diff
-- 按用户和diff_date分组：相同diff_date表示同一组连续登录记录
GROUP BY user_id, diff_date
-- 统计每组记录数，筛选出记录数≥3的组（即连续≥3天）
HAVING COUNT(*) >= 3;
```

**解析**：该方法的核心逻辑是通过“日期 - 行号”的差值识别连续日期。对于同一用户，若登录日期连续，那么“登录日期减去行号天数”的结果（`diff_date`）会保持一致。例如：

*   第1天登录：日期 - 1天 = 基准日
    
*   第2天登录：日期（第1天+1） - 2天 = 基准日
    
*   第3天登录：日期（第1天+2） - 3天 = 基准日
    

通过分组统计`diff_date`相同的记录数，即可判断是否存在连续3天及以上的登录行为。

**方法2：使用LAG窗口函数直接比较相邻日期**

```sql
-- 步骤1：标记当前日期与前一天是否连续
WITH consecutive_days AS (
    SELECT 
        user_id,
        login_date,
        -- 用LAG函数获取前一天的登录日期，判断是否连续（差值为1天）
        CASE WHEN DATEDIFF(login_date, LAG(login_date, 1) OVER (PARTITION BY user_id ORDER BY login_date)) = 1 
             THEN 1  -- 连续：标记为1
             ELSE 0  -- 不连续：标记为0（包括第一条记录，因无前一天数据）
        END AS is_consecutive
    FROM user_login
    -- 去重处理：确保每个用户每天只保留一条登录记录
    GROUP BY user_id, login_date
),
-- 步骤2：累加不连续标记，形成连续登录的分组ID
consecutive_groups AS (
    SELECT 
        user_id,
        login_date,
        -- 核心逻辑：累加is_consecutive=0的标记，相同组ID表示同一连续登录周期
        SUM(is_consecutive = 0) OVER (PARTITION BY user_id ORDER BY login_date) AS group_id
    FROM consecutive_days
)
-- 步骤3：筛选出连续3天及以上登录的用户
SELECT DISTINCT user_id
FROM consecutive_groups
-- 按用户和group_id分组：相同group_id表示同一组连续登录记录
GROUP BY user_id, group_id
-- 统计每组记录数，筛选出记录数≥3的组（即连续≥3天）
HAVING COUNT(*) >= 3;
```

**解析**：该方法通过直接比较相邻日期判断连续性：  
（1）用`LAG`函数获取前一天的登录日期，计算日期差，若为1则标记为连续（`is_consecutive=1`），否则标记为不连续（`is_consecutive=0`）。  
（2）对`is_consecutive=0`的标记进行累加（`SUM(...)`），每当出现不连续记录时，累加值+1，形成新的`group_id`。因此，同一`group_id`对应的记录属于同一连续登录周期。  
（3）统计每个`group_id`的记录数，即可判断是否存在连续3天及以上的登录行为。

**方法2改进**：针对第一条记录因无前序日期导致的 `is_consecutive` 标记逻辑不够直观的问题，我们可通过调整 `CASE` 语句的判断条件进行改进，使连续登录的分组逻辑更清晰，**让用户的第一条登录记录也能正确融入连续登录周期的分组**，同时确保后续连续/非连续的判断逻辑准确。具体调整：

*   对于用户的第一条登录记录（无前序日期），强制标记为“连续起始点”（不触发分组ID的增加）。
    
*   仅当后续登录记录与前一天不连续时，才标记为“非连续”，触发分组ID的增加。
    

**改进后的代码**：

```sql
-- 步骤1：修正相邻日期的连续性判断（优化第一条记录的标记）
WITH consecutive_days AS (
    SELECT 
        user_id,
        login_date,
        -- 关键改进：第一条记录（LAG返回NULL）视为连续起始点，标记为1（不触发分组ID增加）
        CASE 
            WHEN LAG(login_date, 1) OVER (PARTITION BY user_id ORDER BY login_date) IS NULL 
                THEN 1  -- 第一条记录：标记为"连续"（作为连续周期的起点）
            WHEN DATEDIFF(login_date, LAG(login_date, 1) OVER (PARTITION BY user_id ORDER BY login_date)) = 1 
                THEN 1  -- 与前一天连续：标记为1
            ELSE 0  -- 与前一天不连续：标记为0（触发分组ID增加）
        END AS is_consecutive
    FROM user_login
    GROUP BY user_id, login_date  -- 去重：每个用户每天保留一条记录
),
-- 步骤2：累加不连续标记，形成连续登录的分组ID
consecutive_groups AS (
    SELECT 
        user_id,
        login_date,
        -- 累加"非连续"标记（is_consecutive=0），相同group_id属于同一连续周期
        SUM(CASE WHEN is_consecutive = 0 THEN 1 ELSE 0 END) OVER (
            PARTITION BY user_id 
            ORDER BY login_date
        ) AS group_id
    FROM consecutive_days
)
-- 步骤3：筛选连续登录≥3天的用户
SELECT DISTINCT user_id
FROM consecutive_groups
GROUP BY user_id, group_id
HAVING COUNT(*) >= 3;
```

**改进点解析**：  
（1）**修正第一条记录的标记逻辑**  
原逻辑中，第一条记录因 `LAG(login_date)` 返回 NULL，`DATEDIFF` 结果为 NULL，被 `CASE` 语句标记为 `0`（非连续），导致分组ID从1开始。  
改进后，我们通过 `LAG(login_date) IS NULL` 直接判断第一条记录，强制标记为 `1`（连续），避免其被误判为“非连续”，确保连续登录的起点不会触发分组ID增加。

（2）**分组ID计算更精准**  
在 `consecutive_groups` 中，仅当 `is_consecutive=0`（非连续）时才累加1，因此：

*   连续登录的记录会保持相同的 `group_id`；
    
*   一旦出现非连续记录（如中断1天），`group_id` 会+1，形成新的连续周期。
    

例如：用户登录日期为 `2023-01-01`、`2023-01-02`、`2023-01-03`：

*   三条记录的 `is_consecutive` 均为1（第一条是起点，后两条与前一天连续），第一条记录的`is_consecutive=1`仅表示它是一个连续周期的开始，后续记录的`is_consecutive=1`表示与前一天连续；
    
*   `group_id` 均为0（因无 `is_consecutive=0` 的记录），属于同一连续周期，`COUNT(*)=3` 会被正确筛选。
    

通过上述调整，连续登录的分组逻辑更符合直觉，尤其是第一条记录的处理更合理，避免了因“无前置日期”导致的误判，使结果更准确。

以上两种方法均能高效解决连续登录问题，方法1：更侧重日期差值的数学逻辑，方法2：更直观地体现了连续登录的分组思想。

#### 五、复杂逻辑与优化（41-50）

##### 41、找出“第二高薪水的员工”

**场景**：薪酬结构分析，了解薪资等级分布

```sql
-- 方法1：使用子查询
SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);

-- 方法2：使用LIMIT OFFSET
SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- 方法3：使用窗口函数
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk
    FROM employees
) t WHERE rk = 2;
```

**解析**：三种方法各有特点：

*   方法1：先找到最高薪水，再找到低于最高薪水的最大值，即第二高薪水
    
*   方法2：按薪水降序排序，跳过第一条（OFFSET 1），取一条记录（LIMIT 1）
    
*   方法3：使用`DENSE_RANK()`排名，取排名为2的薪水，能正确处理并列情况
    

方法3在存在多个相同最高薪水时（如：两个员工都是最高薪）仍能正确返回第二高薪水，是最健壮的方法。

##### 42、删除重复邮箱（保留 user\_id 最小的）

**场景**：数据清洗，去除用户表中的重复邮箱记录

```sql
-- 删除重复邮箱，只保留user_id最小的记录
DELETE e1 FROM employees e1
JOIN employees e2 ON e1.email = e2.email
WHERE e1.user_id > e2.user_id;
```

**解析**：自连接查询将邮箱相同的记录连接起来，`WHERE e1.user_id > e2.user_id`确保只删除`user_id`较大的记录，保留`user_id`较小的记录。这种方法高效地删除重复项，同时保持每条邮箱只保留一条记录。

##### 43、交换性别（male ↔ female）

**场景**：数据处理，批量交换性别字段的值

```sql
-- 方法1：使用CASE语句
UPDATE salary SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;

-- 方法2：使用ASCII码运算
UPDATE salary SET sex = CHAR(ASCII('m') + ASCII('f') - ASCII(sex));
```

**解析**：两种方法都能实现性别互换：

*   方法1：`CASE`语句判断当前性别，男性('m')转为女性('f')，反之亦然
    
*   方法2：利用ASCII码运算，'m'的ASCII码是109，'f'是102，109+102=211，用211减去当前字符的ASCII码，实现互换
    

方法1：更直观易懂，方法2：是一种巧妙的数学运算实现方式。

##### 44、找出“部门工资最高的员工”

**场景**：人力资源分析，了解各部门的最高薪资水平

```sql
-- 查找每个部门中工资最高的员工
SELECT d.name AS dept, e.name AS emp, e.salary
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE (e.dept_id, e.salary) IN (
    SELECT dept_id, MAX(salary) FROM employees GROUP BY dept_id
);
```

**解析**：子查询`SELECT dept_id, MAX(salary) FROM employees GROUP BY dept_id`找出每个部门的最高工资。主查询中，`(e.dept_id, e.salary) IN (...)`条件筛选出各部门中工资等于该部门最高工资的员工，实现了"每个部门工资最高的员工"这一需求。

##### 45、计算“好友申请通过率”（发送数 / 接收数）

**场景**：社交平台分析，评估用户互动活跃度

```sql
-- 计算好友申请的通过率
-- 假设表 friend_requests(sender, receiver, action: 'sent', 'accepted')
SELECT 
    COUNT(CASE WHEN action = 'accepted' THEN 1 END) * 100.0 / COUNT(*) AS acceptance_rate
FROM friend_requests;
```

**解析**：`COUNT(CASE WHEN action = 'accepted' THEN 1 END)`统计被接受的好友申请数量，`COUNT(*)`统计总申请数量，两者之比乘以100.0得到通过率（百分比）。这一指标反映了用户之间建立连接的意愿强度。

以上查询中 `COUNT(*)` 统计的是所有好友申请记录（包括 `sent` 和 `accepted`），但实际上 `accepted` 是 `sent` 之后的一种状态，可能存在重复统计的问题。比如一条申请先处于 `sent` 状态，后变为 `accepted`，若表中保留了这两条记录，`COUNT(*)` 会将其算作两条，而实际有效的申请数应为 `sent` 的数量（不重复计算）;若表中仅保留最终状态（如：`accepted`覆盖`sent`），该逻辑依然有效，因为`accepted`本身代表申请已发送且通过。更合理的做法是先去重获取唯一的好友申请（按 `sender` 和 `receiver` 分组），再统计其中 `accepted` 的数量。例如：

```sql
WITH unique_requests AS (
    SELECT sender, receiver, MAX(CASE WHEN action = 'accepted' THEN 1 ELSE 0 END) AS is_accepted
    FROM friend_requests
    GROUP BY sender, receiver
)
SELECT 
    SUM(is_accepted) * 100.0 / COUNT(*) AS acceptance_rate
FROM unique_requests;
```

##### 46、找出“未分配部门的员工”

**场景**：人力资源管理，识别未分配部门的员工进行组织调整

```sql
-- 查找没有分配部门的员工
SELECT e.name FROM employees e LEFT JOIN departments d ON e.dept_id = d.dept_id WHERE d.dept_id IS NULL;
```

**解析**：`LEFT JOIN`确保所有员工都被包含在结果中，即使没有对应的部门记录。`WHERE d.dept_id IS NULL`筛选出那些在`departments`表中没有匹配记录的员工，即未分配部门的员工。

##### 47、计算“活跃用户占比”（近30天登录）

**场景**：用户活跃度分析，评估平台的用户粘性

```sql
-- 计算近30天内登录的活跃用户占比
SELECT 
    COUNT(CASE WHEN last_login >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) * 100.0 / COUNT(*) AS active_ratio
FROM users;
```

**解析**：`DATE_SUB(CURDATE(), INTERVAL 30 DAY)`计算30天前的日期，`CASE`语句标记出近30天内登录的用户（`last_login`在该日期之后）。活跃用户数除以总用户数得到活跃用户占比，反映平台的用户活跃度。

##### 48、找出“销售额波动最大的产品”（标准差）

**场景**：销售稳定性分析，识别销售额波动较大的产品

```sql
-- 计算每个产品销售额的标准差，找出波动最大的
SELECT product_id, STDDEV(amount) AS std_dev
FROM sales
GROUP BY product_id
ORDER BY std_dev DESC
LIMIT 1;
```

**解析**：`STDDEV(amount)`计算每个产品销售额的标准差（衡量数据离散程度的指标），标准差越大表示销售额波动越大。`GROUP BY product_id`按产品分组，`ORDER BY std_dev DESC`按波动程度降序排序，`LIMIT 1`取波动最大的产品。这一分析有助于我们的库存管理和供应链调整。

##### 49、修复：SELECT name, COUNT(\*) FROM users GROUP BY city;

**场景**：SQL语法纠错，修复分组查询中的常见错误

```sql
-- 错误：name 不在 GROUP BY 中
-- 修正1：只查询分组字段和聚合结果
SELECT city, COUNT(*) FROM users GROUP BY city;

-- 修正2：使用ANY_VALUE()函数（MySQL特有）
SELECT ANY_VALUE(name), COUNT(*) FROM users GROUP BY city;
```

**解析**：原查询错误在于`GROUP BY city`分组后，`name`字段不是聚合函数也不在`GROUP BY`子句中，不符合SQL标准。修正方法有两种：

*   修正1：只查询分组字段（city）和聚合结果，避免不确定的非分组字段
    
*   修正2：我们使用`ANY_VALUE(name)`（MySQL特有函数）表示从每个分组中任意选择一个name值。**注意**：在其他数据库（如：PostgreSQL、SQL Server 等）中没有该函数。在 PostgreSQL、SQL Server 等严格遵循 SQL 标准的数据库中，需将非聚合字段`name`加入`GROUP BY`（如：GROUP BY city, name），或使用`MIN(name)`/`MAX(name)`取分组内的最值作为代表。
    

不同数据库对这类问题有不同处理方式，严格模式下会直接报错，宽松模式可能返回不确定结果。

##### 50、优化：WHERE YEAR(create\_time) = 2025

**场景**：SQL性能优化，提高时间条件查询的效率

```
-- ❌ 不推荐：WHERE YEAR(create_time) = 2025  -- 会导致全表扫描，无法使用索引
-- ✅ 推荐：使用范围查询，可利用索引
WHERE create_time >= '2025-01-01' AND create_time < '2026-01-01'
```

**解析**：原来查询`YEAR(create_time) = 2025`对每个记录的`create_time`字段应用了函数，导致数据库无法使用该字段上的索引，必须进行全表扫描。优化后的查询使用范围条件`>= '2025-01-01' AND < '2026-01-01'`，可以有效利用`create_time`字段上的索引，大幅提高查询效率，尤其是在大数据量情况下。

**注意**：文中部分日期函数（如：`DATE_FORMAT`、`DATE_SUB`）、特有函数（如：`ANY_VALUE`）的语法可能因数据库（MySQL/PostgreSQL/SQL Server 等）不同而有差异，实际使用时需根据具体数据库调整。

看完这 50 个 SQL 示例，大家是不是感觉思路清晰多啦？从简单查询到复杂分析，其实都是这些基础逻辑的组合。平时多多练手，遇到问题时再翻一翻，我们慢慢就会发现 SQL 没有那么难。请记住！多结合实际场景思考，我们很快就能熟练运用，轻松搞定数据查询和分析啦！