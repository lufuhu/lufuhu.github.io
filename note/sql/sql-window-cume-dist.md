---
title: SQL窗口函数CUME_DIST详解，累积分布计算与绩效排名场景示例
lastUpdated: 2026-09-03 04:00:00
---


`CUME_DIST()` 函数是一个非常有用的 SQL 窗口函数，用于计算当前行在分区（或整个结果集）中的**累积分布**。说人话，它的意思是：在当前行的排序顺序下，有多少比例的行的值**小于或等于**当前行的值。

**`CUME_DIST()` 函数的计算公式**：  
CUME\_DIST = (小于或等于当前行的行数) / (分区中的总行数)

**`CUME_DIST()` 函数的基础语法**：

```
CUME_DIST() OVER (
    [PARTITION BY partition_expression, ... ]
    ORDER BY sort_expression [ASC | DESC], ...
)
```

*   `PARTITION BY` (可选)：将数据划分为不同的分区。`CUME_DIST()` 函数会在每个分区内独立计算。如果不指定，则将整个结果集视为一个分区。
    
*   `ORDER BY` (必需)：**必须指定**，因为 `CUME_DIST()` 依赖于行的排序顺序来确定“小于或等于”的关系。行的排序决定了累积分布的计算基础。不要让排序方向（ASC/DESC）改变了 “小于或等于” 的逻辑，进而影响 CUME\_DIST() 结果。
    

**`CUME_DIST()` 函数的基本特性**：

*   **返回值范围**：是一个介于 0 和 1 之间的 **浮点数**，严格来说，CUME\_DIST() 函数的返回值范围是 (0, 1\]（左开右闭），而非 “0 和 1 之间”，因为最小值是 1/分区总行数（必然大于 0），最大值是 1.0（必然等于 1）。
    
*   **最小值**：分区中排序最小的行的 `CUME_DIST()` 值为 `1 / (分区总行数)`。例如：如果分区有 10 行，最小值行的累积分布是 0.1。
    
*   **最大值**：分区中排序最大的行的 `CUME_DIST()` 值总是 **1.0**，因为所有行都小于或等于它。
    
*   **处理重复值**：如果多行具有相同的排序值（即并列），它们会获得**相同的**`CUME_DIST()` 值。这个值由‘小于或等于当前排序值的总行数’决定（包含所有并列行）
    

#### 一、模拟应用示例

假设我们有一个销售表 `sales`：

| employee | department | sales\_amount |
| --- | --- | --- |
| Alice | Sales | 5000 |
| Bob | Sales | 7000 |
| Charlie | Sales | 7000 |
| David | Sales | 3000 |
| Eve | Marketing | 6000 |
| Frank | Marketing | 8000 |
| Grace | Marketing | 4000 |

**示例 1：计算整个公司员工销售额的累积分布**

```sql
SELECT 
    employee,
    department,
    sales_amount,
    CUME_DIST() OVER (ORDER BY sales_amount) AS cume_dist_all
FROM sales
ORDER BY sales_amount;
```

**结果**：

| employee | department | sales\_amount | cume\_dist\_all |
| --- | --- | --- | --- |
| David | Sales | 3000 | 0.1429 (1/7) |
| Grace | Marketing | 4000 | 0.2857 (2/7) |
| Alice | Sales | 5000 | 0.4286 (3/7) |
| Eve | Marketing | 6000 | 0.5714 (4/7) |
| Bob | Sales | 7000 | 0.8571 (6/7) |
| Charlie | Sales | 7000 | 0.8571 (6/7) |
| Frank | Marketing | 8000 | 1.0000 (7/7) |

*   **David (3000)** ：只有他自己 ≤ 3000，所以是 1/7 ≈ 0.1429。
    
*   **Bob & Charlie (7000)** ：有 6 行（David, Grace, Alice, Eve, Bob, Charlie）的销售额 ≤ 7000，所以是 6/7 ≈ 0.8571。他们并列，所以获得相同的值。
    
*   **Frank (8000)** ：所有 7 行都 ≤ 8000，所以是 7/7 = 1.0。
    

**示例 2：按部门计算累积分布**

```sql
SELECT 
    employee,
    department,
    sales_amount,
    CUME_DIST() OVER (PARTITION BY department ORDER BY sales_amount) AS cume_dist_dept
FROM sales
ORDER BY department, sales_amount;
```

**结果 (Sales 部门)** ：

| employee | department | sales\_amount | cume\_dist\_dept |
| --- | --- | --- | --- |
| David | Sales | 3000 | 0.25 (1/4) |
| Alice | Sales | 5000 | 0.50 (2/4) |
| Bob | Sales | 7000 | 1.00 (4/4) |
| Charlie | Sales | 7000 | 1.00 (4/4) |

*   在 Sales 部门（共 4 人），Bob 和 Charlie 的销售额最高，所以他们的 `cume_dist_dept` 是 1.0。如果 Sales 部门新增 1 名员工（销售额 8000），则 Bob 和 Charlie 的 cume\_dist\_dept 会变为 4/5=0.8（4 行≤7000，总 5 行），因为 “重复值共享相同 CUME\_DIST” 值。
    
*   David 是最低的，所以是 1/4 = 0.25。
    

**结果 (Marketing 部门)** ：

| employee | department | sales\_amount | cume\_dist\_dept |
| --- | --- | --- | --- |
| Grace | Marketing | 4000 | 0.3333 (1/3) |
| Eve | Marketing | 6000 | 0.6667 (2/3) |
| Frank | Marketing | 8000 | 1.0000 (3/3) |

#### 二、实际应用场景

`CUME_DIST()` 函数是能告诉我们一个值在`数据集`中的“覆盖范围”或“超越比例”，非常适合进行相对位置和分布分析。记住！它**必须**与 `ORDER BY` 一起使用，且符合 “小于或等于” 的逻辑。基础应用场景有：

*   **绩效分析**: 确定某个员工的销售额或评分在团队或公司中的相对位置（如：“我的销售额超过了 85% 的同事”）。
    
*   **市场研究**: 分析产品价格或客户满意度的分布情况。
    
*   **数据分桶**: 结合 `CASE` 语句，根据累积分布将数据划分为不同的百分位区间（如：前 10%，前 25% 等）。
    

下面我们举例介绍：

##### 1、`CUME_DIST()` 函数在电商领域中的实际应用

**场景 1：分析用户订单金额分布，识别高价值客户**

假如我们希望了解用户的消费水平分布，识别出高价值客户（VIP），并为不同层级的用户提供个性化服务。

**数据表**：`user_orders`

| user\_id | total\_order\_value (历史总订单金额) | last\_order\_days\_ago (距离上次下单天数) |
| --- | --- | --- |
| U1001 | 15000 | 7 |
| U1002 | 800 | 180 |
| U1003 | 5000 | 45 |
| U1004 | 1200 | 90 |
| U1005 | 200 | 365 |
| U1006 | 3000 | 120 |

**目标**：计算每个用户总订单金额的累积分布，以确定其在所有用户中的消费排名位置。

**SQL 查询**：

```sql
SELECT 
    user_id,
    total_order_value,
    last_order_days_ago,
    -- 计算总订单金额的累积分布
    CUME_DIST() OVER (ORDER BY total_order_value) AS value_cume_dist
FROM user_orders
ORDER BY total_order_value DESC;
```

**结果**：

| user\_id | total\_order\_value | last\_order\_days\_ago | value\_cume\_dist |
| --- | --- | --- | --- |
| U1001 | 15000 | 7 | 1.0000 |
| U1003 | 5000 | 45 | 0.8333 |
| U1006 | 3000 | 120 | 0.6667 |
| U1004 | 1200 | 90 | 0.5000 |
| U1002 | 800 | 180 | 0.3333 |
| U1005 | 200 | 365 | 0.1667 |

**解读**：

*   **顶级VIP客户**：`U1001` 的 `value_cume_dist=1.0`，是消费最高的用户。`U1003` 的 `value_cume_dist=0.8333`，也属于高价值客户。可以为他们提供专属客服、优先发货、生日礼物等VIP服务。
    
*   **潜在流失客户**：`U1002` 和 `U1005` 的 `value_cume_dist` 较低，且 `last_order_days_ago` 很长。虽然 `U1002` 有一定消费基础，但已180天未下单，流失风险高。可以向他们发送“老客户专属优惠券”进行召回。
    
*   **分层营销**：我们可以将用户分为：
    

*   `value_cume_dist > 0.8`: 钻石会员
    
*   `0.5 < value_cume_dist <= 0.8`: 黄金会员
    
*   `value_cume_dist <= 0.5`: 普通会员 不同层级享受不同的权益和营销策略。
    

**场景 2：评估商品销量排名与市场集中度**

假如我们想了解不同商品的销售表现，判断是否存在“爆款”或“长尾”效应。

**数据表**：`product_sales`

| product\_id | category | monthly\_sales (月销量) |
| --- | --- | --- |
| P001 | 手机 | 5000 |
| P002 | 手机 | 3000 |
| P003 | 耳机 | 8000 |
| P004 | 充电宝 | 1500 |
| P005 | 手机壳 | 20000 |
| P006 | 贴膜 | 18000 |

**目标**：计算每个商品月销量的累积分布，分析销量分布的集中度。

**SQL 查询**：

```sql
SELECT 
    product_id,
    category,
    monthly_sales,
    CUME_DIST() OVER (ORDER BY monthly_sales) AS sales_cume_dist
FROM product_sales
ORDER BY monthly_sales DESC;
```

**结果**：

| product\_id | category | monthly\_sales | sales\_cume\_dist |
| --- | --- | --- | --- |
| P005 | 手机壳 | 20000 | 1.0000 |
| P006 | 贴膜 | 18000 | 0.8333 |
| P003 | 耳机 | 8000 | 0.6667 |
| P001 | 手机 | 5000 | 0.5000 |
| P002 | 手机 | 3000 | 0.3333 |
| P004 | 充电宝 | 1500 | 0.1667 |

**解读**：

*   **销量巨头**：`P005` (`sales_cume_dist=1.0`) 和 `P006` (`sales_cume_dist=0.8333`) 是绝对的爆款，销量远超其他商品。
    
*   **市场集中度**：`sales_cume_dist=0.5` 对应的是销量5000（P001）。这意味着50%的商品月销量 ≤ 5000。而头部商品（手机壳、贴膜）的销量是这个数字的4-10倍。
    
*   **库存与推广策略**：
    

*   对 `sales_cume_dist > 0.8` 的商品，我们需要保证充足库存，并在首页重点推广。
    
*   对 `sales_cume_dist < 0.3` 的商品（如：充电宝），可能是滞销品，我们需要分析原因（价格？评价？），考虑促销清仓或下架。
    

*   **品类洞察**：我们发现配件类（手机壳、贴膜）销量远高于高价值的手机本身，这可能提示我们应加强配件品类的运营。
    

**场景 3：分析订单配送时效，优化物流体验**

假如我们希望评估物流配送效率，了解大部分订单的送达时间，并识别时效瓶颈。

**数据表**：`orders_delivery`

| order\_id | user\_tier (用户等级) | delivery\_days (下单到收货的天数) |
| --- | --- | --- |
| O001 | 普通 | 3 |
| O002 | VIP | 2 |
| O003 | 普通 | 5 |
| O004 | VIP | 1 |
| O005 | 普通 | 7 |
| O006 | VIP | 2 |

**目标**：计算订单配送天数的累积分布，评估整体时效表现。

**SQL 查询**：

```sql
SELECT 
    order_id,
    user_tier,
    delivery_days,
    CUME_DIST() OVER (ORDER BY delivery_days) AS delivery_cume_dist
FROM orders_delivery
ORDER BY delivery_days;
```

**结果**：

| order\_id | user\_tier | delivery\_days | delivery\_cume\_dist |
| --- | --- | --- | --- |
| O004 | VIP | 1 | 0.1667 |
| O002 | VIP | 2 | 0.5000 |
| O006 | VIP | 2 | 0.5000 |
| O001 | 普通 | 3 | 0.6667 |
| O003 | 普通 | 5 | 0.8333 |
| O005 | 普通 | 7 | 1.0000 |

**解读**：

*   **时效基准**：`delivery_cume_dist=0.5` 对应 `delivery_days=2`。这意味着50%的订单在2天或更短时间内送达，这是一个关键时效指标。
    
*   **VIP 服务验证**：查看VIP订单：`O004(1天)`, `O002(2天)`, `O006(2天)`。它们的 `delivery_cume_dist` 都 ≤ 0.5，说明VIP用户的订单确实享受了更快的配送服务，承诺得到了兑现。
    
*   **问题订单**：`O005` 耗时7天 (`delivery_cume_dist=1.0`)，是时效最差的订单。我们需要调查原因（偏远地区？物流异常？），并作为改进案例。
    
*   **服务承诺**：我们可以对外宣称“80%的订单在5天内送达”（因为 `delivery_cume_dist=0.8333` 对应5天），这比说“平均配送3.3天”更具说服力。
    

**场景 4：优化“猜你喜欢”推荐算法的效果评估**

我们的推荐系统“猜你喜欢”会为每个用户展示一系列商品。假如我们想知道，在推荐的商品中，有多少比例是用户真正会点击或购买的“高相关性”商品。

**数据表**：`recommendation_log`

| user\_id | product\_id | recommendation\_rank (在推荐列表中的位置) | user\_click (用户是否点击) | user\_purchase (用户是否购买) |
| --- | --- | --- | --- | --- |
| U2001 | P101 | 1 | 是 | 否 |
| U2001 | P102 | 2 | 否 | 否 |
| U2001 | P103 | 3 | 是 | 是 |
| U2002 | P201 | 1 | 是 | 是 |
| U2002 | P202 | 2 | 是 | 否 |
| U2002 | P203 | 3 | 否 | 否 |

**目标**：评估推荐列表中，用户产生正向行为（点击或购买）的商品在推荐排序中的**累积分布**。这能反映推荐算法是否将最相关的商品排在了前面。

**SQL 查询** (分析用户产生正向行为的商品在推荐列表中的位置分布)：

```sql
WITH user_positive_actions AS (
    SELECT 
        user_id,
        recommendation_rank
    FROM recommendation_log
    WHERE user_click = '是' OR user_purchase = '是' -- 定义“正向行为”
)
SELECT 
    user_id,
    recommendation_rank,
    -- 计算产生正向行为的商品，其推荐位置的累积分布
    CUME_DIST() OVER (ORDER BY recommendation_rank) AS relevance_cume_dist
FROM user_positive_actions
ORDER BY recommendation_rank;
```

**说明**：若需按用户去重（仅统计每个用户是否有正向行为），可在 `CTE` 中增加 `DISTINCT user_id`；若需统计所有正向行为的分布（不考虑用户重复），当前逻辑即可。

**结果**：

| user\_id | recommendation\_rank | relevance\_cume\_dist |
| --- | --- | --- |
| U2002 | 1 | 0.2500 |
| U2001 | 1 | 0.5000 |
| U2002 | 2 | 0.7500 |
| U2001 | 3 | 1.0000 |

**解读**：

*   `relevance_cume_dist=0.5` at `recommendation_rank=1`: 这意味着有 50% 的“正向行为”发生在推荐列表的**第一位**。这是一个非常好的指标，说明算法倾向于将最可能被用户点击或购买的商品放在首位。
    
*   `relevance_cume_dist=0.75` at `recommendation_rank=2`: 75% 的正向行为发生在前两位。
    
*   **算法优化**：如果 `relevance_cume_dist` 在 `rank=1` 时很低（例如：只有 0.2），说明算法效果差，用户需要“翻页”才能找到感兴趣的商品，体验不佳。目标是让 `relevance_cume_dist` 在 `rank=1` 和 `rank=2` 时尽可能高。
    
*   **A/B 测试**：比较新旧推荐算法的 `relevance_cume_dist` 分布，哪个算法能让正向行为更集中在列表前列，哪个就更优。
    

**场景 5：评估促销活动的折扣力度分布与效果**

进行“618大促”，我们提供了不同力度的折扣券（如：满300减30、满500减80、满1000减200），需要分析不同折扣力度的使用情况。

**数据表**：`promotion_usage`

| user\_id | coupon\_type | discount\_amount (优惠金额) | order\_value\_after\_discount (优惠后订单金额) |
| --- | --- | --- | --- |
| U4001 | 满300减30 | 30 | 270 |
| U4002 | 满500减80 | 80 | 420 |
| U4003 | 满1000减200 | 200 | 800 |
| U4004 | 满300减30 | 30 | 290 |
| U4005 | 满500减80 | 80 | 480 |

**目标**：分析用户实际享受到的优惠金额的分布，判断促销活动是否有效激励了大额消费。

**SQL 查询**：

```sql
SELECT 
    user_id,
    coupon_type,
    discount_amount,
    order_value_after_discount,
    CUME_DIST() OVER (ORDER BY discount_amount) AS discount_cume_dist
FROM promotion_usage
ORDER BY discount_amount;
```

**结果**：

| user\_id | coupon\_type | discount\_amount | order\_value\_after\_discount | discount\_cume\_dist |
| --- | --- | --- | --- | --- |
| U4001 | 满300减30 | 30 | 270 | 0.4000 |
| U4004 | 满300减30 | 30 | 290 | 0.4000 |
| U4002 | 满500减80 | 80 | 420 | 0.8000 |
| U4005 | 满500减80 | 80 | 480 | 0.8000 |
| U4003 | 满1000减200 | 200 | 800 | 1.0000 |

**解读**：

*   `discount_cume_dist=0.4` at `discount_amount=30`: 40% 的优惠使用是最低档的“满300减30”。
    
*   `discount_cume_dist=0.8` at `discount_amount=80`: 80% 的优惠使用力度 ≤ 80元。
    
*   `discount_cume_dist=1.0` at `discount_amount=200`: 只有 1 位用户使用了最高档优惠。
    
*   **活动效果评估**：
    

*   大部分用户（80%）享受的优惠在80元及以下，说明活动成功吸引了中等消费用户。
    
*   但高价值优惠（200元）使用率低，可能门槛（满1000）过高，或者高价值商品吸引力不足。
    

*   **未来优化**：我们可以考虑增加“满800减150”这样的中间档位，或者对使用高价值优惠券的用户提供额外赠品，以提升大额订单的转化率。
    

##### 2、`CUME_DIST()` 函数在用户行为分析中的实际应用

**场景 1：识别高价值与流失风险用户**

我们希望识别出最有价值的客户（以便进行VIP服务或精准营销），同时也要找出有流失风险的用户（以便进行挽留）。

**数据表**：`user_behavior`

| user\_id | total\_spent (历史总消费) | last\_purchase\_days\_ago (距离上次购买天数) |
| --- | --- | --- |
| U001 | 5000 | 30 |
| U002 | 200 | 180 |
| U003 | 1500 | 45 |
| U004 | 800 | 90 |
| U005 | 100 | 365 |
| U006 | 300 | 120 |

**目标**：  
（1）计算每个用户在**总消费金额**上的累积分布。  
（2）计算每个用户在**购买间隔**上的累积分布（注意：对于流失风险，间隔越长，风险越高）。

**SQL 查询**：

```sql
SELECT 
    user_id,
    total_spent,
    last_purchase_days_ago,
    -- 消费金额越高，累积分布越高（价值越高）
    CUME_DIST() OVER (ORDER BY total_spent) AS spend_cume_dist,
    -- 购买间隔越长，累积分布越高（流失风险越高）
    CUME_DIST() OVER (ORDER BY last_purchase_days_ago ASC) AS churn_risk_cume_dist
FROM user_behavior
ORDER BY total_spent DESC;
```

**结果**：

| user\_id | total\_spent | last\_purchase\_days\_ago | spend\_cume\_dist | churn\_risk\_cume\_dist |
| --- | --- | --- | --- | --- |
| U001 | 5000 | 30 | 1.0000 | 0.3333 |
| U003 | 1500 | 45 | 0.8333 | 0.5000 |
| U004 | 800 | 90 | 0.6667 | 0.6667 |
| U006 | 300 | 120 | 0.5000 | 0.8333 |
| U002 | 200 | 180 | 0.3333 | 0.9167 |
| U005 | 100 | 365 | 0.1667 | 1.0000 |

**解读**：

*   **高价值用户 (High-Value)**: `U001` 和 `U003` 的 `spend_cume_dist` 分别为 1.0 和 0.8333，他们是消费最高的用户。我们可以对他们进行个性化推荐、提供专属折扣或邀请参加新品体验。
    
*   **高流失风险用户 (High-Churn-Risk)**: `U005` 的 `churn_risk_cume_dist=1.0`，`U002` 的 `churn_risk_cume_dist=0.9167`，他们距离上次购买时间最长，流失风险极高。我们可以向他们发送“我们想念您”的优惠券或进行用户调研。
    
*   **高价值但潜在流失用户**: `U001` 消费最高，但 `churn_risk_cume_dist=0.3333`，相对安全。但如果某个用户的 `spend_cume_dist` 很高（如：> 0.8）而 `churn_risk_cume_dist` 也很高（如：> 0.8），这将是**最需要优先挽留的黄金用户**，因为他们的流失会造成巨大损失。
    

**场景 2：分析应用内用户活跃度分布**

一款移动应用（如：健身App或新闻App）想要了解用户的日常活跃情况，判断用户粘性。

**数据表**：`daily_user_activity`

| user\_id | date | session\_duration\_minutes (当日使用时长) |
| --- | --- | --- |
| U101 | 2023-10-01 | 45 |
| U102 | 2023-10-01 | 15 |
| U103 | 2023-10-01 | 60 |
| U104 | 2023-10-01 | 5 |
| U105 | 2023-10-01 | 30 |
| U106 | 2023-10-01 | 120 |

**目标**：计算当天所有用户使用时长的累积分布，以评估整体活跃度水平。

**SQL 查询**：

```sql
SELECT 
    user_id,
    session_duration_minutes,
    CUME_DIST() OVER (ORDER BY session_duration_minutes) AS duration_cume_dist
FROM daily_user_activity
WHERE date = '2023-10-01'
ORDER BY session_duration_minutes;
```

**结果**：

| user\_id | session\_duration\_minutes | duration\_cume\_dist |
| --- | --- | --- |
| U104 | 5 | 0.1667 |
| U102 | 15 | 0.3333 |
| U105 | 30 | 0.5000 |
| U101 | 45 | 0.6667 |
| U103 | 60 | 0.8333 |
| U106 | 120 | 1.0000 |

**解读**：

*   **中位数活跃用户**: `duration_cume_dist=0.5` 的用户（U105, 30分钟）代表了当天的“典型”或中等活跃用户。
    
*   **核心活跃用户**: `duration_cume_dist > 0.8` 的用户（U103, U106）是深度用户。我们可以研究他们的行为模式，看看是什么功能吸引了他们，并尝试将这些体验推广给其他用户。
    
*   **低活跃用户**: `duration_cume_dist < 0.3` 的用户（U104, U102）可能只是简单浏览或遇到了使用障碍。我们可以对他们进行新手引导优化或推送吸引他们深入使用的内容。
    
*   **产品迭代评估**: 如果在新功能上线后，`duration_cume_dist=0.8` 对应的时长从 40分钟提升到了 60分钟，说明新功能成功提升了核心用户的活跃度。
    

**场景 3：用户生命周期价值 (LTV) 分布分析**

一家订阅制服务公司计算了每个用户的预测生命周期价值 (Predicted LTV)。

**数据表**：`user_ltv`

| user\_id | predicted\_ltv |
| --- | --- |
| U201 | 1200 |
| U202 | 800 |
| U203 | 50 |
| U204 | 1500 |
| U205 | 300 |
| U206 | 2000 |

**目标**：分析用户 LTV 的分布，理解价值集中度。

**SQL 查询**：

```sql
SELECT 
    user_id,
    predicted_ltv,
    CUME_DIST() OVER (ORDER BY predicted_ltv) AS ltv_cume_dist
FROM user_ltv
ORDER BY predicted_ltv;
```

**结果**：

| user\_id | predicted\_ltv | ltv\_cume\_dist |
| --- | --- | --- |
| U203 | 50 | 0.1667 |
| U205 | 300 | 0.3333 |
| U202 | 800 | 0.5000 |
| U201 | 1200 | 0.6667 |
| U204 | 1500 | 0.8333 |
| U206 | 2000 | 1.0000 |

**解读**：

*   **价值集中度**: 可以看到，LTV 最高的少数用户（U204, U206）的 `ltv_cume_dist` 接近 1.0。这表明我们的大部分价值可能集中在少数“鲸鱼用户”身上。
    
*   **获客成本 (CAC) 回报分析**: 如果平均 CAC 是 200 元，那么 `ltv_cume_dist` 小于某个值（例如：`predicted_ltv < 200`）的用户群体（这里只有 U203）是亏损的，需要优化获客渠道。
    
*   **分层运营**: 我们可以根据 `ltv_cume_dist` 将用户分为不同层级：
    

*   `ltv_cume_dist > 0.8`: VIP 用户，我们提供最高级别服务。
    
*   `0.5 < ltv_cume_dist <= 0.8`: 高价值用户，我们重点维护。
    
*   `ltv_cume_dist <= 0.5`: 普通或低价值用户，我们采用自动化、低成本的运营策略。
    

总之，CUME\_DIST () 这个 SQL 窗口函数真的很实用，不管是分客户层级、看商品销量集中度，还是分析用户活跃度、生命周期价值，我们都能用它轻松算出数据的累积分布。只要我们记住按需求分区、选对排序字段，就能快速掌握数据里各值的相对位置，从而在我们做运营决策、优化策略时为我们提供依据！