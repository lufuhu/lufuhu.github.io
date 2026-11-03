---
title: 按SQL逻辑执行顺序梳理的250余个常见陷阱与避坑方法
lastUpdated: 2026-10-22 02:30:00
---


SQL逻辑执行顺序：`1.FROM/JOIN → 2.WHERE → 3.GROUP BY → 4.HAVING → 5.SELECT → 6.ORDER BY → 7.LIMIT/OFFSET`，看着很简单，但每个环节都藏着不少“坑”。我们稍不注意，就会让SQL查询变慢、结果出错，甚至拖垮数据库！  
表连接(`FROM/JOIN`)是重灾区：表太多、连接条件写错（比如我们忘了写`ON`导致笛卡尔积爆炸）、用了函数让索引失效、字符集不统一、大表小表顺序不对、子查询没处理好……都可能让SQL查询慢如蜗牛。  
筛选(`WHERE`)讲究多：`NULL`值是个“捣蛋鬼”(`=`对它无效，我们得用`IS NULL`)，类型不匹配（字符串和数字比）会让索引罢工，`LIKE '%abc'`通配符打头也让索引无能为力，`OR`条件用不好也可能拖后腿。  

分组(`GROUP BY`)和分组后筛选(`HAVING`)易混淆：`WHERE`管的是原始数据行，`HAVING`管的是分组后的结果。我们把该在`WHERE`里过滤的条件错放到`HAVING`，会让数据库先做很多无用功（先分组再过滤，而不是先过滤再分组）。  
选列(`SELECT`)和排序(`ORDER BY`)也有门道：`SELECT *`虽然省事，但可能拉取不必要的大字段（如：图片、长文本），影响速度。排序时，如果我们没用对索引或者排序列类型有问题（如：浮点数精度），也会很慢。  
分页(`LIMIT/OFFSET`)的“大偏移”陷阱：我们想跳过前100万条取10条？数据库却可能在老老实实地扫描100万零10条记录！数据量一大，性能自然直线下降。  
下面这份清单，我们详细列出了SQL执行每个步骤中的常见陷阱、为什么会掉坑里，以及我们怎么避坑？理解这些“坑”，不仅能帮我们写出更快、更准的SQL，更能让我们在排查问题时有的放矢。我们用好SQL，就从避开这些陷阱开始！

#### 一、`FROM`/`JOIN`阶段(执行顺序第1步)

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| 不同字符集/校对规则列`JOIN` | 实时转换，索引失效 | 统一字符集与校对 |
| 过多表`JOIN`(如：>8表) | 优化器复杂度指数增长 | 拆查询，用临时表 |
| 多表`JOIN`，中间结果爆炸 | 中间结果未及时过滤 | 优先连接高选择性表，用`EXPLAIN`优化 |
| 循环`JOIN`(自关联条件错误) | 无限递归 | 加深度限制 |
| 大表`JOIN`小表，顺序错误 | 驱动表选择不当 | 小表驱动，大表被驱动(有索引) |
| 忽略`JOIN`索引 | 被驱动表无索引 | 确保关联列有索引 |
| 关联条件使用函数 | 索引失效 | 避免函数或建函数索引 |
| `FROM`表顺序影响执行计划 | 旧版优化器不重排 | 小表放前，慎用`STRAIGHT_JOIN` |
| `JOIN`未指定别名，导致列歧义 | 同名列解析失败 | 所有表强制别名 |
| `LEFT JOIN`右表为子查询，未加别名 | 语法错误(`Oracle`/`SQL Server`) | 子查询必须起别名 |
| `NATURAL JOIN`导致意外连接(隐式关联) | 自动按同名列连接(依赖列名，易出错) | 禁用(改用显式`ON`) |
| `JOIN`无`ON`误成`CROSS JOIN`(`JOIN`条件遗漏导致笛卡尔积) | 语法疏忽(无`ON`条件) | 检查所有`JOIN`始终加`ON` |
| 多表`JOIN`顺序致中间结果过大 | 优化器未选最优 | 用`EXPLAIN`调整 |
| `FULL OUTER JOIN`在`MySQL`不支持 | 语法不兼容 | 用`LEFT + RIGHT + UNION`模拟或用`LEFT JOIN + RIGHT JOIN`并通过`WHERE`过滤交集再`UNION ALL` |
| `JOIN`条件用非等值比较(如：`<`) | 无法用高效连接算法 | 评估必要性，确保驱动表小 |
| 使用视图，导致多层嵌套展开 | 优化器无法下推条件 | 避免深层视图，我们改用`CTE`或临时表 |
| `JOIN`使用`OR`条件 | 无法使用索引连接 | 拆为多个`UNION ALL` |
| 分区表跨分区`JOIN` | 无法分区裁剪 | 我们确保`JOIN`条件含分区键 |
| 外键未建索引(`InnoDB`) | `JOIN`或`DELETE`性能差 | 外键列必须建索引 |
| `JOIN`时使用`TEXT/BLOB`列 | 内存临时表溢出 | 避免用大字段关联，我们改用`ID` |
| `JOIN`子查询未物化 | 每行重复执行 | 用`CTE`或临时表，提前物化 |
| 多对多关联未去重 | 结果行数膨胀 | 用`DISTINCT`或先聚合再`JOIN` |
| 使用`USING`导致列名歧义 | 列在多表中存在但含义不同 | 我们改用显式`ON` |
| `JOIN`条件中混用常量与列 | 优化器误判选择性 | 分离常量条件至`WHERE` |
| `JOIN`表别名重复 | 解析错误或逻辑混乱 | 保证别名唯一 |
| 子查询在`FROM`中未加别名(派生表) | SQL标准要求派生表必须命名 | 所有`(SELECT ...)`必须起别名 |
| `JOIN`多个条件逻辑错误(如：`ON a=b AND c=d OR e=f`) | 逻辑优先级错误，`AND`优先级高于`OR`，导致意外连接 | 我们用括号明确分组：`ON (a=b AND c=d) OR e=f` |
| `LEFT JOIN`后右表字段为`NULL`，但误以为是业务空值 | `LEFT JOIN`无匹配行时右表字段补`NULL` | 明确区分“无关联 vs 业务空值” |
| `JOIN`条件写在`WHERE`中，逻辑等价于`INNER JOIN` | 失去`LEFT JOIN`保留左表全量的语义 | 关联条件放`ON`，过滤条件放`WHERE` |
| 多表`JOIN`未加括号，连接顺序不符合预期 | SQL 标准规定从左到右，但优化器可能重排 | 我们用括号显式分组，或`STRAIGHT_JOIN`(慎用) |
| `USING(col)`与`SELECT *`结合导致列重复或缺失 | 不同数据库对`USING`合并列行为不一致 | 避免`SELECT *`，显式列出字段 |
| 自连接未使用别名，字段引用歧义 | 同名字段无法区分来源(列引用混乱) | 所有表必须加别名(用不同别名(`e.g.`,`e1`,`e2`)) |
| `CROSS JOIN`误用，导致笛卡尔积爆炸 | 无关联条件(无条件交叉连接) | 仅在明确需要全组合时使用 |
| 子查询作为驱动表未加`LIMIT`，中间结果过大 | 优化器无法预估行数 | 我们提前在子查询中过滤 |
| `JOIN`表无索引或统计信息过期 | 优化器误判行数，选错算法 | 定期`ANALYZE TABLE`，确保索引存在 |
| 分区表`JOIN`未对齐分区策略 | 无法并行或分区裁剪 | 确保两表按相同键分区，或小表不分区 |
| 不同排序规则(`collation`)列`JOIN`报错或慢查 | `utf8mb4_general_ci` vs `utf8mb4_0900_as_cs`不兼容 | 统一`COLLATE`，或在`ON`中显式转换 |
| `STRAIGHT_JOIN`强制连接顺序导致次优计划 | 绕过优化器，可能选错驱动表 | 仅在`EXPLAIN`证明更优时使用 |
| 使用同义词(`Synonym`)或`DB Link`导致远程全表拉取 | 条件未下推到远程库 | 我们用`DRIVING_SITE`(`Oracle`)或改写为本地过滤 |
| `FROM`子查询未加`LIMIT`导致中间结果过大 | 优化器无法预估 | 在子查询中提前过滤或分页 |
| `JOIN`时两表字符集相同但排序规则不同(如：`_bin` vs `_ci`) | 无法使用索引，隐式转换 | 统一`COLLATE`，或建对应排序规则索引 |
| `JOIN`表在分区剪枝后，仍全扫描(因分区键未出现在`WHERE`) | 优化器无法推断分区有效性 | 我们确保`WHERE`包含分区键条件 |
| `FROM`子查询含`ORDER BY`但无`LIMIT`，被优化器丢弃 | SQL标准规定子查询无序 | 不要依赖子查询排序，除非有`LIMIT` |
| 使用`FEDERATED`引擎表`JOIN`本地表，条件未下推 | 远程表全拉取 | 避免跨库`JOIN`，或用`ETL`中转 |
| 向量相似度`JOIN`(如：`ORDER BY vec <-> query_vec LIMIT 10`)未用`ANN`索引 | 全表计算距离，性能灾难 | 使用专用向量索引(如：`PostgreSQL`的`ivfflat`、`MySQL`的`Vector Extension`(8.1+)) |
| 时序表`JOIN`未对齐时间窗口(如：滑动窗口关联) | 逻辑错误或性能差 | 我们使用`JOIN ... ON t1.ts BETWEEN t2.ts - INTERVAL '5m' AND t2.ts` + 时间分区裁剪 |
| `Polymorphic JOIN`(多态关联)用字符串类型存表名 | 无法索引、易拼错、难维护 | 改用枚举类型 + 外键映射表，或使用`GraphQL`\-`like`联合查询 |
| `JOIN`时使用生成列(`Generated Column`)但依赖非确定性函数 | `MySQL`不允许，`PG`允许但复制不一致 | 生成列必须基于确定性表达式(如：`VIRTUAL`列) |

#### 二、`WHERE`阶段(执行顺序第2步)

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| `=`与`IS NULL`混用 | 三值逻辑(`NULL = NULL → UNKNOWN`) | 用`IS NULL` |
| `NOT IN`子查询含`NULL` | `col ≠ NULL → UNKNOWN`，结果为空 | 用`NOT EXISTS`或加`IS NOT NULL` |
| 隐式转换导致索引失效 | 类型不一致(如：`varchar = 123`) | 保持类型一致 |
| `OR`中`NULL`逻辑错误 | `col = 1 OR NULL → UNKNOWN` | 显式写`col = 1 OR col IS NULL` |
| 索引列使用函数 | 破坏索引有序性 | 函数放常量侧，或建函数索引 |
| `LIKE '%abc'`前缀通配符 | 无法用索引 | 避免前缀通配，用全文索引 |
| `OR`连接不同索引列 | 无法合并索引 | 拆为`UNION ALL` |
| 多表列名歧义 | 未用别名限定 | 我们用`u.name`形式 |
| 子查询返回多行(`WHERE col = (sub)`) | 语义错误 | 我们改用`IN`或`LIMIT 1` |
| `INSERT`未指定列名(虽非`WHERE`，但属`DML`基础) | 依赖表结构顺序 | 显式列名 |
| `SQL`注入风险 | 拼接`SQL`字符串 | 用参数化查询 |
| `WHERE`中使用聚合函数 | 聚合尚未计算 | 移至`HAVING` |
| `WHERE`过滤`SELECT`别名列 | 别名尚未生成 | 重复表达式或用子查询 |
| `WHERE`条件顺序影响短路(部分库) | 优化器可能不重排 | 高选择性条件放前(仅提示) |
| `WHERE`中`CASE`返回布尔值 | `CASE`返回值，非条件 | 改为`CASE...END = 1` |
| `WHERE col = NULL`永不成立 | 三值逻辑 | 改为`IS NULL` |
| `NOT (col = 1)` vs `col != 1`不等价 | `NULL`处理不同 | 明确是否含`NULL` |
| `WHERE`子查询未加括号 | 语法歧义 | 我们要始终加括号 |
| `WHERE`含函数致索引失效 | 破坏索引有序性 | 函数放常量侧，或建函数索引 |
| `OR`条件未覆盖索引 | 无法合并索引 | 拆为`UNION ALL` |
| `WHERE`过滤写在`JOIN ON`(`INNER JOIN`) | 语义等价但可读性差 | `INNER JOIN`可任选；`LEFT JOIN`必须放`ON` |
| `WHERE`条件含非确定性函数(如：`NOW()`) | 每次执行结果不同 | 评估是否需固定值 |
| 使用`!=`或`<>`导致全表扫描 | 无法有效使用索引 | 改为范围查询或枚举 |
| `WHERE`中`IN`列表过大 | 解析开销大 | 我们改用临时表`JOIN` |
| `WHERE`条件写反(如：`1 = col`) | 可读性差，易错 | 统一写为`col = 1` |
| 多条件未用括号分组 | 逻辑优先级错误 | 我们用括号明确逻辑 |
| `WHERE`过滤分区键未用常量 | 无法分区裁剪 | 使用确定值或绑定变量 |
| `WHERE`中使用`COALESCE(col,0) = 0` | 索引失效 | 拆为`col = 0 OR col IS NULL` |
| `WHERE`条件含子查询未相关 | 重复执行 | 我们改为`JOIN` |
| `WHERE`使用`REGEXP`无索引 | 全表扫描 | 用全文索引或预过滤 |
| `WHERE`中`IN (空列表)`行为差异 | 某些数据库返回空，某些报错 | 应用层避免传空列表，或用`FALSE`替代 |
| `WHERE`条件中时间范围未考虑时区 | `DATETIME` vs `TIMESTAMP`时区处理不同 | 统一用`UTC`或明确时区转换 |
| 对`NULL`使用`=`,`!=`,`<>`永远返回`UNKNOWN` | 三值逻辑(`TRUE/FALSE/UNKNOWN`) | 用`IS NULL`/`IS NOT NULL` |
| `col != 'value'`无法查出`col IS NULL`的行 | `NULL != 'value'`→`UNKNOWN` | 改为`col != 'value' OR col IS NULL` |
| 函数包裹列(如：`YEAR(create_time) = 2023`)导致索引失效 | 无法使用`B-Tree`索引 | 我们改用范围：`create_time >= '2023-01-01' AND create_time < '2024-01-01'` |
| 隐式类型转换(如：字符串 vs 数字)导致全表扫描 | 优化器放弃索引 | 保持类型一致，避免混合比较 |
| `OR`条件未用括号，逻辑优先级错误 | `AND`优先级高于`OR` | 用括号显式分组：`(A OR B) AND C` |
| `IN (NULL)`永远返回空结果 | `col IN (NULL)`等价于`col = NULL`→`UNKNOWN` | 我们避免`IN`中含`NULL`，或用`OR col IS NULL` |
| `LIKE '%value%'`无法使用索引前缀 | 通配符在开头 | 考虑全文索引、倒排索引或`ngram` |
| `BETWEEN`包含边界，导致重复或遗漏 | `BETWEEN '2024-01-01' AND '2024-01-31'`包含31日23:59:59？ | 我们用`>= start AND < next_start`更安全 |
| `DATE(col)`在`WHERE`中导致索引失效 | 函数包裹列 | 我们改用范围：`col >= '2024-01-01' AND col < '2024-02-01'` |
| 布尔字段用`= 'true'`字符串比较 | 类型不匹配 | 用`= 1`或`IS TRUE`(若支持) |
| `WHERE JSON_CONTAINS(col, '...')`无虚拟列索引 | 全表扫描 | 我们为`JSON`路径建生成列 + 索引 |
| `WHERE col = ''`与`col IS NULL`混淆 | 空字符串 ≠ NULL | 明确业务语义，分开处理 |
| `WHERE col NOT LIKE 'abc%'`无法用索引 | 否定通配符不走索引 | 我们改用正向条件 + `NOT`，或评估必要性 |
| `WHERE JSON_EXTRACT(col, '$.key') = 'val'`无虚拟列索引 | 全表扫描 | 为路径建生成列 + 索引 |
| `WHERE`条件中使用用户变量(如：`@row := @row + 1`) | 执行顺序不确定，结果不可靠 | 我们改用窗口函数 |
| `WHERE`使用`ENUM`类型值未加引号 | 某些库允许`col = 1`，但可读性差且易错 | 始终用字符串形式：`col = 'active'` |
| 夏令时切换日时间范围查询漏数据 | 如：`2024-03-10 02:30`不存在(北美) | 用`UTC`时间存储和查询 |
| `WHERE col = '١٢٣'`(阿拉伯数字) vs `'123'`(`ASCII`)不等 | `Unicode`数字 ≠ `ASCII`数字 | 入库前标准化为`ASCII`数字 |
| `WHERE col REGEXP '^[0-9]+$'`无法匹配全角数字(如：`０`) | 全角字符不在`[0-9]`范围 | 用`\p{Nd}`(若支持)或预清洗 |
| `WHERE`条件中`col = 123`但`col`是`VARCHAR`，隐式转换慢 | 逐行转换，无法用索引 | 保持类型一致，或`col = '123'` |
| `WHERE JSON_OVERLAPS(col, '[1,2]')`(`MySQL` 8.0.17+)未索引 | 无专用索引支持 | 我们改用多值索引(`Multi-Valued Index`) |
| `JSON`路径查询未用多值索引(`MySQL`8.0.17+`Multi-Valued Index`) | `JSON_CONTAINS(tags, '["admin"]')`全表扫描 | 为`JSON`数组字段创建多值索引：`CREATE INDEX idx_tags ON t ((CAST(tags AS CHAR(20) ARRAY)))` |
| `IP`地址范围查询用字符串比较(如：`'192.168.1.100' > '192.168.1.2'`) | 字典序 ≠ 数值序 | 转为整数：`INET_ATON(ip) BETWEEN ...`或用`INET6`类型 |
| 地理围栏查询(`ST_Within`)未建空间索引 | 全表扫描几何对象 | 使用`R-Tree`索引(如：`PostGIS`的`GIST`、`MySQL`的`SPATIAL`) |
| `WHERE`条件中使用加密字段(如：`AES_ENCRYPT(col) = ?)` | 无法索引，且每次加密结果不同(`IV`随机) | 我们改用确定性加密(如：`AES_ENCRYPT(col, key, 'CBC', '', iv_fixed)`)或使用`TDE`/列加密透明处理 |

#### 三、`GROUP BY`阶段(执行顺序第3步)

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| `COUNT(列名)` vs `COUNT(*)`混淆 | `COUNT(col)`忽略`NULL` | 按需选择 |
| `DISTINCT`与聚合函数位置错误 | 跨库兼容性差 | 用`GROUP BY`+`COUNT(*)` |
| `GROUP BY`与`SELECT`列不匹配 | 关闭`ONLY_FULL_GROUP_BY`时返回随机值 | 我们启用严格模式或用`ANY_VALUE()` |
| 大表不分区 | 查询慢 | 我们按时间/业务分区 |
| 分区表使用不当 | 分区键非查询条件 | 我们按高频查询列分区 |
| `GROUP BY`后`SELECT *` | 违反标准 | 我们只选分组列或聚合函数 |
| `GROUP BY`用别名(非`MySQL`) | `PostgreSQL/Oracle`不支持 | 我们直接写表达式 |
| `GROUP BY`未处理`NULL`分组 | `NULL`视为同一组 | 我们用`COALESCE`显式处理 |
| `GROUP BY`隐式排序(`MySQL`5.7以前) | 行为非标准 | 我们显式加`ORDER BY` |
| `GROUP BY`表达式与`SELECT`不一致 | 逻辑错误 | 保持一致 |
| 高基数列`GROUP BY`内存溢出 | 哈希表过大 | 我们加`WHERE`限制范围 |
| `GROUP BY`与窗口函数混淆 | 阶段不同 | 聚合用`GROUP BY`，排名用窗口函数 |
| `GROUP BY`后无法取明细 | 分组丢失行信息 | 我们用`ARRAY_AGG()`或子查询 |
| `ROLLUP/CUBE`产生多余汇总 | 自动多维汇总 | 仅需时使用 |
| `GROUP BY`函数索引未命中 | 无对应索引 | 我们建函数索引 |
| `GROUP BY`多列顺序与索引不匹配 | 无法使用索引 | 调整列顺序或建新索引 |
| `GROUP BY`后结果未去重(误以为自动去重) | `GROUP BY`本身已去重 | 无需额外`DISTINCT` |
| 使用`GROUP BY`处理非聚合需求 | 逻辑冗余 | 改用`DISTINCT` |
| `GROUP BY`列含表达式未加括号 | 语法歧义 | 明确表达式边界 |
| `GROUP BY`在无聚合时等价于`DISTINCT` | 语义重复 | 我们用`DISTINCT`更清晰 |
| `GROUP BY`使用浮点数列 | 精度误差导致分组错误 | 避免用`FLOAT/DOUBLE`分组，改用整数或`DECIMAL` |
| `GROUP BY`与`ORDER BY`列顺序不一致导致额外排序 | 优化器无法复用索引 | 保持`GROUP BY`和`ORDER BY`列顺序一致 |
| `GROUP BY`后`COUNT(col)`与`COUNT(*)`混淆 | `COUNT(col)`忽略`NULL`，`COUNT(*)`计所有行 | 明确业务意图，选择合适函数 |
| 对高基数列`GROUP BY`导致内存溢出 | 哈希表过大 | 避免对`UUID`、手机号等高基数列分组 |
| `GROUP BY`时间字段未截断到目标粒度 | `DATETIME`精确到秒，无法按天聚合 | 用`DATE(dt)`或`DATE_TRUNC('day', dt)` |
| `GROUP BY`后`COUNT(*)`与`SUM(1)`混用无意义 | 语义相同但风格混乱 | 统一用`COUNT(*)`表示行数 |
| `GROUP BY`多列但其中一列为高基数`UUID` | 哈希表爆炸，`OOM` | 避免对`UUID`分组，或先映射为`ID` |
| `GROUP BY`使用`DATE_FORMAT(ts, '%Y-%m')`未建函数索引 | 无法索引加速 | 我们建表达式索引或预计算字段 |
| `GROUP BY`后`ROLLUP`生成的`NULL`与真实`NULL`无法区分 | 汇总行用`NULL`占位 | 用`GROUPING(col)`函数识别汇总行 |
| `GROUP BY`高基数列 +`WITH ROLLUP`导致组合爆炸 | 2ⁿ行输出 | 避免对>3列用`ROLLUP` |
| `GROUPING SETS/CUBE`在大数据集上内存爆炸 | 组合爆炸(2ⁿ组) | 限制维度数量(≤3)，或预聚合物化视图 |
| `GROUP BY`时间窗口未对齐时区(如：按天聚合但服务器时区 ≠ 业务时区) | 聚合边界错位 | 统一转换为业务时区后再截断：`DATE(CONVERT_TZ(ts, 'UTC', 'Asia/Shanghai'))` |
| `GROUP BY`后使用`ARRAY_AGG()`超过`group_concat_max_len`(`MySQL`) | 结果被截断 | 增大系统变量或分页聚合 |

#### 四、`HAVING`阶段(执行顺序第4步)

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| `HAVING`与`WHERE`混淆 | 行过滤 vs 分组过滤 | 行级 →`WHERE`；聚合 →`HAVING` |
| `HAVING`用非聚合列(未在`GROUP BY`) | 违反标准 | 列必须在`GROUP BY`或为聚合 |
| `HAVING`与`WHERE`位置互换 | 性能差 | 能放`WHERE`的绝不放`HAVING` |
| `HAVING COUNT(*) > 0`在非空输入或标准`GROUP BY`下冗余 | 每组至少一行 | 删除 |
| `HAVING`用`SELECT`别名 | 非标准(仅`MySQL`支持) | 重写为完整表达式 |
| `HAVING`条件可提前至`WHERE` | 延迟过滤 | 移至`WHERE` |
| `HAVING`后未排序结果不稳定 | 分组无序 | 加`ORDER BY` |
| `HAVING`与`LIMIT`顺序误解 | `LIMIT`最后执行 | 理解执行顺序即可 |
| `HAVING`子查询引用外层分组列 | 支持有限 | 我们改用`JOIN`或`CTE` |
| `HAVING`复杂条件无法用索引 | 聚合后过滤 | 优化`WHERE`减少输入 |
| `HAVING`用于非聚合查询 | 作用于单组 | 我们改用`WHERE` |
| `HAVING`条件含非确定性函数 | 结果不可复现 | 避免或固定值 |
| `HAVING`与`GROUP BY`列不一致 | 逻辑错误 | 保持一致性 |
| `HAVING`过滤后结果为空但未处理 | 应用层报错 | 增加空结果检查 |
| `HAVING`中使用`LIKE` | 无索引支持 | 提前在`WHERE`过滤 |
| `HAVING`与`GROUP BY`列别名冲突 | 别名在`HAVING`中不可见(非`MySQL`) | 用原始表达式而非别名 |
| `HAVING`误用于非聚合条件(应放`WHERE`) | 性能差(先分组再过滤) | 非聚合条件放`WHERE` |
| `HAVING MAX(ts) < NOW()`每次执行结果不同 | 非确定性函数在分组后计算 | 若需固定快照，用绑定变量传入时间 |
| `HAVING`中使用`AVG(col)`但`col`全为`NULL` | `AVG(NULL)`\= NULL，条件失效 | 加`AND COUNT(col) > 0`显式处理 |
| `HAVING COUNT(*) > 9999999999999999999`超出`BIGINT`范围 | 常量被截断或报错 | 我们用字符串比较或避免超大阈值 |
| `HAVING`中使用窗口函数(如：`HAVING ROW_NUMBER() = 1`) | 窗口函数在`SELECT`阶段计算，`HAVING`无法引用 | 改用子查询或`CTE`包裹窗口函数后再过滤 |

#### 五、`SELECT`阶段(执行顺序第5步)

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| `CASE`表达式类型不一致 | 隐式转换失败 | 统一`CAST`类型 |
| `SELECT *`滥用 | 读取不必要字段 | 只选需要列 |
| `UNION`代替`UNION ALL` | 不必要去重 | 无重复用`UNION ALL` |
| 字段类型选择不当 | 性能/存储浪费 | 选最适类型(如：`CHAR(11)`存手机号) |
| `JSON`字段低效查询 | 未用原生操作符 | 用`col->>'$.key'` |
| 过度使用`JSON` | 不适合频繁查询 | 结构化数据用普通列 |
| 存储过程过度复杂 | 难维护 | 逻辑放应用层 |
| `SELECT`用未分组非聚合列 | 关闭严格模式时结果随机 | 启用`ONLY_FULL_GROUP_BY` |
| `DISTINCT`与`ORDER BY`列不一致 | 违反标准 | `ORDER BY`列必须在`SELECT` |
| `SELECT`别名在同层`WHERE/GROUP BY`不可用 | 执行顺序决定 | 用子查询或`CTE` |
| `SELECT`计算字段未覆盖索引 | 回表 | 加入覆盖索引 |
| `SELECT *`导致列顺序依赖 | 表变更后出错 | 显式列名 |
| `CASE`分支类型不一致 | 隐式转换失败 | 统一`CAST`类型 |
| `SELECT`调用非确定性函数(如：`RAND()`) | 每行不同，不可缓存 | 评估必要性 |
| `JSON`提取未用原生操作符 | 未用原生操作符 | 用`col->>'$.key'` |
| `SELECT`含大字段影响性能 | 即使不用也可能加载 | 只选必要列 |
| 窗口函数与聚合函数混用不当 | 窗口在聚合后计算 | 理解阶段顺序 |
| `SELECT`中子查询未相关但误用外层列 | 作用域错误 | 明确相关性 |
| `SELECT`使用`*`与别名冲突 | 列名重复 | 避免`SELECT t1.*, t2.*` |
| `SELECT`表达式未命名(如：`a+b`) | 应用层无法引用 | 加别名 |
| `SELECT`中`DISTINCT`与`ORDER BY`列不兼容 | 某些数据库要求`ORDER BY`列必须在`SELECT DISTINCT`中 | 确保排序列出现在`SELECT`列表 |
| `SELECT`使用`ROW_NUMBER()`但未`ORDER BY` | 窗口内顺序不确定 | 窗口函数中必须指定`ORDER BY` |
| `SELECT col1/col2`未处理除零或`NULL` | 返回 NULL 或报错(取决于`DB`) | 用`NULLIF(col2, 0)`避免除零 |
| `CONCAT(col1, col2)`遇`NULL`返回`NULL` | 多数数据库中`CONCAT('a', NULL) = NULL` | 用`CONCAT(COALESCE(col1,''), ...)` |
| 窗口函数未指定`PARTITION BY`导致全表计算 | 性能灾难 | 明确分区逻辑，避免无意义全窗 |
| `RANK()` vs `ROW_NUMBER()`语义混淆 | 相同值排名处理不同 | 根据业务选择：需跳过用`RANK`，需连续用`ROW_NUMBER` |
| `JSON`构造函数(如：`JSON_OBJECT`)字段顺序不保 | `JSON`无序 | 不要依赖顺序，应用层解析 |
| `SELECT`中使用`NOW()`导致主从不一致(`binlog`) | 语句级复制下时间不同 | 用`SYSDATE()`或应用层传入时间 |
| `SELECT ROUND(2.5, 0)`结果因数据库而异(四舍五入 vs 银行家舍入)(银行家舍入，你还记得吗？) | `PostgreSQL`/`Oracle`用银行家舍入 | 我们要明确业务规则，必要时自定义函数 |
| `SELECT CURRENT_DATE` vs `CURDATE()` vs `GETDATE()`跨库不兼容 | 方言差异 | 我们用标准`CURRENT_DATE`(`SQL`:2003) |
| `SELECT`中调用存储函数含副作用(如：写日志表) | 违反查询无副作用原则 | 我们避免在`SELECT`中调用有副作用函数 |
| `SELECT *`在视图变更后导致下游应用崩溃 | 列顺序/数量变化 | 我们永远不要在实际场景代码中用`SELECT *` |
| `SELECT`使用`IFNULL(col, 0) + 1`但`col`是字符串 | 隐式转换错误 | 显式`CAST(col AS SIGNED)` |
| 窗口函数中`ORDER BY`列含`NULL`导致排名异常 | NULL 排最前或最后，依`DB`而定 | 我们用`COALESCE(ts, '9999-12-31')`控制顺序 |
| `LAG(col, 1) OVER (...)`返回`NULL`被误认为业务空值 | 边界行无前值 | 用`LAG(col, 1, 'default')`指定默认值 |
| `SELECT POW(2, 1024)`溢出返回`inf`(`IEEE 754`) | 浮点数上限 | 检查`IS_FINITE()`或用`DECIMAL` |
| `SELECT FORMAT(1234.5, 2, 'de_DE')`返回`'1.234,50'` | 本地化格式不可用于计算 | 存储原始数值，格式化交由应用层 |
| `SELECT`中`UUID_TO_BIN()`未指定`swap_flag=1`，时间局部性差 | 默认`UUID`无序 | 我们用`UUID_TO_BIN(uuid, 1)`提升索引效率 |
| `SELECT`使用`GENERATED ALWAYS AS`列，但表达式含非确定函数 | `MySQL`不允许，`PG`允许但危险 | 生成列必须用确定性表达式 |
| `SELECT`中`INET6_ATON('::1')`返回二进制，应用层误当字符串 | 类型混淆 | 我们明确字段类型，或用`HEX()`转换 |
| `SELECT`调用`COMPRESS()`后结果含不可打印字符，日志泄露风险 | 二进制数据误当文本 | 避免在查询中压缩，或`Base64`编码 |
| SELECT 中使用`JSON_TABLE`展开数组但未限制行数 | 一行变多行，结果膨胀 | 在`JSON_TABLE`的`LIMIT`子句中控制(如：`MySQL`8.0.4+)或外层加`WHERE` |
| 窗口函数中`ORDER BY`使用非唯一列导致结果不稳定 | 相同行顺序随机 | 补充唯一列(如：主键)到`ORDER BY`：`ORDER BY ts, id` |
| 使用`FETCH FIRST n ROWS WITH TIES`但未理解`ties`语义 | 返回超过n行(所有并列最后一名) | 明确业务是否允许超限，否则用`LIMIT` |

#### 六、`ORDER BY`阶段(执行顺序第6步)

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| `ORDER BY`与索引方向不匹配 | 导致文件排序 | 建匹配方向索引(如：`(a ASC, b DESC)`) |
| `LIMIT`大偏移分页 | 扫描大量行 | 游标分页(`WHERE id > last_id`) |
| 大表`COUNT(*)`性能差 | `InnoDB`无持久化行数 | 用计数表或缓存 |
| `ORDER BY`用别名(`Oracle`不支持) | 跨库兼容性 | 用表达式代替 |
| `ORDER BY`列不在`SELECT DISTINCT` | 违反标准，多数数据库实现要求`ORDER BY`列出现在`SELECT DISTINCT`列表中，即使标准允许依赖推导 | 加入`SELECT` |
| `ORDER BY`与`GROUP BY`隐式排序混淆 | `MySQL`历史行为 | 显式`ORDER BY` |
| `ORDER BY`用函数致文件排序 | 索引失效 | 我们建函数索引 |
| 多列排序方向与索引不匹配 | 导致文件排序 | 我们建匹配方向索引(如：`(a ASC, b DESC)`) |
| `ORDER BY RAND()`性能极差 | 全表扫描+排序 | 改用应用层随机 |
| `ORDER BY`在`UNION`中作用范围误解 | 仅作用于单个`SELECT` | 外层加括号再`ORDER BY` |
| `ORDER BY`对`NULL`位置不一致 | `MySQL vs Oracle`不同 | 用`NULLS FIRST/LAST`或`COALESCE` |
| `ORDER BY`对`TEXT`类型 | 某些库不支持 | 转`VARCHAR(n)` |
| `ORDER BY`无`LIMIT`全排序 | 大结果集慢 | 评估是否真的需要 |
| `ORDER BY`列含表达式未索引 | 排序慢 | 我们建函数索引 |
| `ORDER BY`与`DISTINCT`冲突 | 语义矛盾 | 确保`ORDER BY`列在`SELECT` |
| `ORDER BY`多列但索引仅前缀匹配 | 无法避免排序 | 我们建完整覆盖索引 |
| `ORDER BY`使用非确定性表达式(如：`UUID()`) | 结果不可复现 | 避免在`ORDER BY`中使用非确定性函数 |
| `ORDER BY`多列但其中一列为`TEXT`且无前缀索引 | 无法使用索引排序 | 建前缀索引或改用`VARCHAR(n)` |
| `ORDER BY`使用`ENUM`类型按字典序而非定义序 | 某些版本按字符串排序 | 显式`CAST`为整数或用`FIELD()` |
| `ORDER BY`多列但排序规则冲突(如：一列`_ci`，一列`_bin`) | 无法使用复合索引 | 统一排序规则或建表达式索引 |
| `ORDER BY`对`ENUM`按定义顺序排序，但开发误以为字母序 | `ENUM('low','medium','high')`按 1,2,3 排 | 明确文档，或转为整数/字符串排序 |
| `ORDER BY`使用`RAND()`但未加`LIMIT`导致全排序 | 资源耗尽 | 必须配合`LIMIT`使用 |
| `ORDER BY col COLLATE utf8mb4_0900_as_cs`但索引是`_ci` | 无法使用索引排序 | 建对应排序规则的索引 |
| `ORDER BY`对泰语/越南语等复杂脚本排序不符合本地习惯 | 默认`Unicode`排序不支持语言规则 | 用`ICU`排序规则(如：`MySQL`8.0+的`utf8mb4_thai_520_w2`) |
| `ORDER BY`向量距离但未用`ANN`索引 | 全表计算欧氏距离 | 使用`HNSW/IVF`等近似最近邻索引加速 |
| `ORDER BY`多列但其中一列为表达式且未建函数索引 | `filesort` | 我们为`(expr1, col2)`建联合函数索引 |

#### 七、`LIMIT`/`OFFSET`阶段(执行顺序第7步)

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| 自增`ID`依赖连续性 | 回滚/删除导致空洞 | 我们用`UUID`/雪花`ID` |
| `LIMIT`无`ORDER BY`结果不稳定 | 行顺序不确定 | 必须加`ORDER BY` |
| 大`OFFSET`分页性能差 | 扫描大量行 | 游标分页(`WHERE id > last_id`) |
| `LIMIT`在子查询中被忽略(旧`MySQL`，`MySQL`8.0+已支持子查询中使用`LIMIT`(需配合`ORDER BY`)) | 语法限制 | 我们用派生表包裹 |
| `LIMIT`与`DISTINCT`顺序误解 | `DISTINCT`先执行 | 理解即可 |
| `LIMIT`在`UNION`中作用范围错误 | 需明确作用对象 | 按需加在子查询或外层 |
| `LIMIT`值为表达式(`SQL Server`不支持) | 语法差异 | 改用`TOP (@n)` |
| `LIMIT 0`获取结构 | `ORM`依赖 | 可接受，注意兼容性 |
| `LIMIT`与聚合函数结合冗余 | 聚合结果仅一行 | 删除`LIMIT` |
| `OFFSET`负数或超范围 | 行为未定义 | 应用层校验 |
| `LIMIT`在`DELETE/UPDATE`中非标准 | `MySQL`支持，`PG`不支持 | 跨库避免，改用子查询 |
| `LIMIT`用于分页但未锁定排序列 | 数据变动导致跳页 | 我们使用稳定排序键(如：`ID`) |
| `LIMIT`与`GROUP BY`结合误解 | 限制分组数而非行数 | 理解语义 |
| `OFFSET`未配合`ORDER BY` | 结果不可预测 | 必须加排序 |
| `LIMIT`在窗口函数后无效 | 窗口函数不改变行数 | 理解执行顺序 |
| `LIMIT`与`UNION ALL`结合时未加括号 | `LIMIT`仅作用于最后一个`SELECT` | 外层包裹`(SELECT ...) UNION ALL (...)`再`LIMIT` |
| `LIMIT`值为0时某些驱动返回错误 | `ODBC`/`JDBC`兼容性问题 | 应用层特殊处理或避免 |
| `LIMIT`在分布式数据库中结果不一致 | 各分片取`top N`后合并 ≠ 全局`top N` | 避免`LIMIT`下推，或用全局排序中间件 |
| `LIMIT`在`INSERT ... SELECT`中非标准 | `MySQL`支持，`PG`不支持 | 跨库避免，或用子查询包裹 |
| `OFFSET 1000000`在高并发下拖垮数据库 | 大量中间行扫描 | 强制使用游标分页(`seek method`) |
| `LIMIT`值由用户输入且未校验，`LIMIT 18446744073709551615`拖垮`DB` | 超大`LIMIT`等价于无限制 | 应用层强制上限(如：≤10000) |
| `LIMIT`在窗口函数后无法限制最终行数(因窗口不减少行) | 误解`LIMIT`作用 | 我们用外层`SELECT * FROM (...) t LIMIT n`包裹 |
| 游标分页(`seek pagination`)使用非唯一排序键导致漏数据 | 相同排序值跳过部分行 | 排序键必须包含唯一列(如：`(ts DESC, id DESC)`) |

#### 八、跨阶段陷阱

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| `WHERE`过滤右表(`LEFT JOIN`) | 转为`INNER JOIN` | 放`ON`子句 |
| `HAVING`条件本可放`WHERE` | 性能差 | 提前至`WHERE` |
| `SELECT`别名在`ORDER BY`可用但`WHERE`不可用 | 阶段可见性不同 | 理解执行顺序 |
| `GROUP BY`后`SELECT *`在宽松模式“成功” | 返回随机行 | 我们启用严格模式 |
| `DISTINCT`与`GROUP BY`重复 | 冗余操作 | 删除其一 |
| `ORDER BY`在`GROUP BY`后无索引 | 额外排序 | 我们建联合索引 |
| `LIMIT`在聚合后应用但期望限制输入 | 误解作用对象 | 用子查询先`LIMIT` |
| `WHERE IN (子查询)`子查询含`ORDER BY` | 无意义 | 删除 |
| 窗口函数未指定`ORDER BY` | 默认表顺序，不稳定 | 显式`ORDER BY` |
| `HAVING`后`ORDER BY`未索引 | 小结果集可接受 | 我们评估是否建索引 |
| `SELECT`中使用聚合函数但无`GROUP BY` | 隐式全表聚合(单行) | 明确是否需要聚合，避免意外 |
| `ORDER BY`列与`GROUP BY`列类型不一致 | 隐式转换导致排序错误 | 确保类型一致或显式`CAST` |
| 事务隔离级别影响`SELECT`结果(如：幻读) | `RR` vs `RC`下`COUNT`可能不同 | 明确业务所需隔离级别，必要时加锁 |
| `SELECT ... FOR UPDATE`未加`ORDER BY`导致死锁概率升高 | 加锁顺序不确定 | 始终按固定顺序(如：主键)加锁 |
| `GROUP BY`+`ORDER BY NULL`被误用为“取消排序” | `MySQL`特有，其他库不支持 | 我们仅在`MySQL`且明确需要时使用 |
| `DISTINCT`对含`TEXT`/`BLOB`列报错 | 某些数据库不支持大对象去重 | 改用`GROUP BY`或避免选大字段 |
| `UNION`自动去重时比较`TEXT`列性能极差 | 逐字节比较大对象 | 避免`UNION`，或先转`ID`再关联 |
| `SELECT`中表达式溢出(如：`BIGINT * BIGINT`) | 中间结果超类型范围 | 显式`CAST`到更大类型(如：`DECIMAL`) |
| `VARCHAR`长度按字节 vs 字符(如：`utf8mb4`) | `VARCHAR(255)`最多存255字符，但索引可能超767字节 | 建索引时指定前缀长度，或启用`innodb_large_prefix` |
| `TIMESTAMP`自动时区转换导致显示异常 | `MySQL`中`TIMESTAMP`存`UTC`，读时转会话时区 | 统一用`DATETIME`或明确时区设置 |
| `DECIMAL(10,2)`与`FLOAT`比较精度丢失 | 浮点数二进制表示误差 | 金额等场景禁用`FLOAT/DOUBLE` |
| `ILIKE`(`PostgreSQL`)在`MySQL`中不存在 | 跨库迁移失败 | 用`LOWER(col) = LOWER(val)`通用写法 |
| `TOP N`(`SQL Server`) vs `LIMIT`(`MySQL`/`PG`) | 语法不兼容 | `ORM`层抽象，或用标准`FETCH FIRST`(`SQL`:2008) |
| `DUAL`表在非`Oracle`数据库中多余 | `SELECT 1 FROM DUAL`在`PG/MySQL`可简写为`SELECT 1` | 避免写`FROM DUAL`，提升可移植性 |
| `SELECT COUNT(*) FROM t WHERE ...`在`MVCC`下快照读 vs 当前读差异 | `RR`隔离级别下可能看不到刚插入的行 | 理解隔离级别，必要时用`SELECT ... FOR SHARE` |
| `GROUP BY`+`ORDER BY`无索引导致磁盘临时表 + `filesort` | 内存不足写磁盘，性能骤降 | 监控`Created_tmp_disk_tables`，优化索引 |
| `DISTINCT`对含浮点数列去重失败(因精度误差) | `0.1 + 0.2 ≠ 0.3` | 避免对`FLOAT/DOUBLE`使用`DISTINCT`，改用`ROUND`后分组 |
| `UNION`自动去重时比较`BLOB`列触发`max_sort_length`截断 | `MySQL`默认只比较前1024字节 | 增大`max_sort_length`或避免对`BLOB`去重 |
| `SELECT`中使用`UUID()`导致主从复制不一致(`SBR`模式) | 语句复制下各节点生成不同`UUID` | 我们用`ROW`模式复制，或应用层生成 |
| `INSERT INTO ... SELECT`未指定列，表结构变更后静默错位 | 列顺序依赖 | 我们始终显式指定列名 |
| `CREATE VIEW`包含`SELECT *`，基表变更后视图“冻结”旧结构 | 视图定义快照化 | 我们要避免`SELECT *`，或定期`ALTER VIEW`刷新 |
| `EXPLAIN`显示走索引，但实际执行慢(因回表多) | 索引选择性低，回表成本高 | 用覆盖索引或评估是否真需索引 |
| `WHERE`条件中`col = '123 '`(尾空格)在`CHAR` vs `VARCHAR`行为不同 | `CHAR(10)`会填充空格，比较时忽略尾空格 | 统一用`VARCHAR`，或`TRIM(col) = '123'` |
| `GROUP BY`后`HAVING`过滤，但结果集为空时应用层未处理 | 返回0行，非`NULL` | 应用层检查`rowCount == 0` |
| `ORDER BY`列为表达式，但`LIMIT`后应用层分页跳变 | 数据更新导致排序键变化 | 使用稳定排序键(如：`(ts DESC, id DESC)`) |
| `SELECT`中`CASE WHEN col = 'Y' THEN 1 ELSE 0 END`但`col`有尾空格 | `'Y '`≠`'Y'` | 我们用`TRIM(col)`或存储时清洗 |
| `JSON`字段查询未用`JSON_VALID()`校验，脏数据导致报错 | 非法`JSON`使函数崩溃 | 入库校验，或查询时`WHERE JSON_VALID(col)` |
| `FULLTEXT`索引搜索词为停用词(如：`the`)返回空 | 被索引忽略 | 检查停用词列表，或改用`ngram` |
| `REGEXP`正则表达式未转义用户输入，导致语法错误或`DoS` | 正则注入 | 转义特殊字符，或限制复杂度 |
| `SELECT`中调用`SLEEP(1)`用于调试，上线后拖垮服务 | 人为注入延迟 | 严禁在实际场景`SQL`中使用时间函数做调试 |
| `INFORMATION_SCHEMA`查询在大实例上极慢 | 元数据锁或全扫描 | 我们避免频繁查`TABLES`/`COLUMNS`，缓存结果 |
| `SHOW CREATE TABLE`与实际`CREATE`语句不一致(如：默认字符集) | 会话变量影响 | 用`SELECT`查`information_schema`获取真实定义 |
| `AUTO_INCREMENT`在批量插入后跳跃(如：`INSERT IGNORE`) | 预分配`ID`被丢弃 | 接受`ID`不连续，勿依赖连续性 |
| `ON DUPLICATE KEY UPDATE`在并发下产生幻行 | 非原子性 | 评估是否需用`INSERT ... SELECT`\+ 唯一键 |
| `REPLACE INTO`先删后插，破坏外键或触发器逻辑 | 非真正“更新” | 优先用`INSERT ... ON DUPLICATE KEY UPDATE` |
| `SELECT ... LOCK IN SHARE MODE`在`RR`下仍可能幻读 | 间隙锁未覆盖所有范围 | 理解锁机制，必要时用`FOR UPDATE` |
| `SELECT`查询触发触发器(如：`PostgreSQL`的`RETURNING`) | 误以为只读 | 确认无`RETURNING`或触发器副作用 |
| `SELECT`查询在只读副本上因`NOW()`与主库时间漂移不一致 | 系统时钟未同步 | 用主库写入的时间戳字段，而非`NOW()` |
| `INSERT ... SELECT`在`Galera Cluster`中因认证冲突回滚 | 写集冲突检测失败 | 避免大事务，或用单点写入 |
| `ALTER TABLE ... ADD COLUMN default NOW()`对大表加列极慢 | `InnoDB`需重写全表 | `MySQL`8.0+支持即时加列(`Instant ADD COLUMN`) |
| `SELECT`触发`Buffer Pool`污染，挤掉热点数据 | 全表扫描加载冷数据 | 用`SQL_NO_CACHE`(`MySQL`)或限制扫描量 |
| `WHERE`条件中`col = 'NaN'`但`col`是`DOUBLE`，比较结果未定义 | `NaN != NaN` | 我们用`IS NOT DISTINCT FROM`(`PG`)或特殊标记 |
| `GROUP BY`后`SUM(col)`因浮点误差不等于预期(如：0.1+0.2≠0.3) | `IEEE`754二进制表示 | 金额用`DECIMAL`，科学计算用误差容忍 |
| `SELECT`中`CONVERT_TZ(ts, 'SYSTEM', '+00:00')`依赖系统时区 | 容器/云环境时区不确定 | 始终用明确时区名(如：`'Asia/Shanghai'`) |
| `JSON`字段存储`true`/`false`，但`WHERE col = 'true'`不匹配 | 布尔 vs 字符串 | 我们用`JSON_EXTRACT(col, '$') = TRUE` |
| `SELECT`查询在`Aurora Serverless v2` 中因突发负载触发扩缩容延迟 | 冷启动延迟 | 预热或设置最小容量 |
| `EXPLAIN ANALYZE`在生产库执行导致锁或高负载 | 实际执行查询 | 仅在测试环境使用 |
| `SELECT`中`RAND()`在并行查询下(如：`PG`11+)返回多值 | 每个 worker 生成独立随机数 | 我们避免在并行查询中用`RAND()` |
| `INSERT`时`DEFAULT (NOW())`与`ON UPDATE NOW()`冲突 | `MySQL`中`ON UPDATE`优先 | 明确业务意图，避免混用 |
| `SELECT`查询触发`Adaptive Hash Index`争用(`InnoDB`) | 高并发点查热点 | 监控`AHI`争用，必要时关闭 |
| `WHERE`使用`LIKE '%中文%'`但全文索引不支持中文分词 | 按字匹配，非按词 | 集成外部分词器(如：`ngram、MeCab`) |
| `SELECT`中`MD5(col)`对`NULL`返回`NULL`，下游误判 | 哈希函数传播`NULL` | 我们用`MD5(COALESCE(col, ''))` |
| `UNION`两查询列类型不同，隐式转换导致精度丢失 | 如：`INT` vs `DECIMAL`→ 升级为`DECIMAL` | 显式`CAST`统一类型 |
| 超长`Unicode`标识符(>64 字符)在多数数据库中被静默截断 | 内部标识符长度限制(如：`Oracle`30字节，`MySQL`64字节) | 主动限制对象名长度≤30字符；使用代码生成时做校验 |
| 含空格或特殊符号的列名(如：`"user id"`)在`SELECT *`+应用层解析时丢失引号 | `ORM`或`CSV`导出未转义，导致字段名解析错误 | 永远使用无空格、无符号的`snake_case`命名 |
| `JSON`字段修改后未更新生成列索引(`MySQL`) | 生成列自动更新，但索引可能失效 | 监控`information_schema.STATISTICS`，必要时`ANALYZE TABLE` |
| 使用`RETURNING`(`PostgreSQL/Oracle`)在只读事务中报错 | `RETURNING`视为写操作 | 只读事务中避免`INSERT/UPDATE ... RETURNING` |
| `SQL`注入通过`JSON`路径注入(如：`col->>'$' || user_input`) | 动态拼接`JSON`路径 | 我们永远不要拼接路径，用参数化或白名单校验 |
| 向量搜索 + 标量过滤(`hybrid search`)未下推过滤条件 | 先`ANN`检索再过滤，召回率低 | 使用支持混合查询的引擎(如：`pgvector + HNSW + WHERE`下推) |
| `CTE`在`Snowflake/BigQuery`中默认物化，多次引用成本高 | 云数仓行为不同 | 我们改用临时表或`MATERIALIZED CTE`(若支持) |
| 使用`EXPLAIN (ANALYZE, BUFFERS)`泄露敏感数据(如：实际值) | 执行计划含运行时数据 | 仅在测试环境使用，实际场景禁用`ANALYZE`选项 |

#### 九、子查询及`CTE`专项

| 陷阱描述 | 陷阱原因 | 避坑方法 |
| --- | --- | --- |
| 相关子查询在`SELECT`中每行执行 | `N+1`问题 | 改为`JOIN` |
| 子查询返回多行用`=` | 运行时报错 | 我们改用`IN`/`EXISTS` |
| `CTE`多次引用被重复执行 | 内联展开 | 我们手动物化到临时表 |
| 递归`CTE`无终止条件 | 无限循环 | 加深度限制 |
| 子查询`ORDER BY`无`LIMIT`被忽略 | 无意义 | 删除 |
| `EXISTS`子查询用`SELECT *` | 虽只检查存在性 | 可接受，但我们建议用`SELECT 1`提升可读性 |
| `CTE`中使用非确定性函数导致多次结果不同 | 每次引用重新计算 | 我们要避免在`CTE`中使用`RAND()`、`NOW()`等 |
| 子查询在`WHERE NOT EXISTS`中未关联外层表 | 变成常量子查询，逻辑错误 | 我们要确保相关子查询正确引用外层列 |
| 相关子查询未加索引，导致`N+1`查询 | 每行都执行子查询 | 我们要确保子查询关联列有索引 |
| `IN (subquery)`子查询返回多列 | 语法错误 | 我们要确保子查询只返回单列 |
| `EXISTS`子查询中`SELECT NULL`被误解为“空” | `EXISTS`只看行是否存在 | 可写`SELECT 1`提升可读性，但`NULL`也正确 |
| `CTE`引用外层变量(如：`PostgreSQL`)不支持 | `CTE`是独立作用域 | 我们改用`LATERAL JOIN`或子查询 |
| 递归`CTE`中聚合函数导致无限循环 | 聚合改变终止条件判断 | 我们要避免在递归成员中使用聚合 |
| `WHERE col > (SELECT AVG(col) FROM t)`但子查询返回 NULL | `col > NULL → UNKNOWN` | 加`COALESCE((SELECT ...), 0)` |
| `WITH RECURSIVE`中初始成员与递归成员列类型不一致 | 类型推断失败 | 显式`CAST`所有列 |
| `LATERAL JOIN`(或`CROSS APPLY`)未限制右表行数 | `N+1`放大为`N×M` | 右表子查询必须有高选择性过滤 |
| `EXISTS`子查询中`SELECT 1/0`不报错(因不执行) | 存在性检查不求值 | 可用在“常真”测试，但要慎用 |
| `WITH CTE`在`Oracle`中默认物化，多次引用重复计算 | 非内联 | 加`INLINE`提示或改用子查询 |
| `EXISTS (SELECT 1 FROM t WHERE t.id = outer.id AND ROWNUM = 1)`(`Oracle`) | `ROWNUM`在`WHERE`中生效 | 正确，但其他库无`ROWNUM` |
| `LATERAL JOIN`中右表依赖左表多列但未索引 | 嵌套循环性能差 | 我们为右表创建复合索引，覆盖左表关联列 |
| 递归`CTE`中使用`UNION`而非`UNION ALL` | 隐式去重导致性能下降且可能中断递归 | 递归`CTE`，我们必须用`UNION ALL` |