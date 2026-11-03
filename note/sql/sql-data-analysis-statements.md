---
title: SQL数据分析常用语句97条，从基础查询到统计分析示例
lastUpdated: 2026-10-17 04:00:00
---


#### 一、基础查询与数据操作

##### 1、简单查询

**需求**：从表中选择指定列的数据，避免使用`*`以提高性能和可读性。

```sql
SELECT 列名1, 列名2 FROM 表名;
```

**解析**：该语句用在从指定表中提取所需的特定列数据。相比`SELECT *`，它只获取必要信息，减少数据传输量，提高查询效率，同时使查询意图更清晰，增强代码可读性。

##### 2、查询所有列

**需求**：获取表中所有列的数据，我们仅建议在调试或明确需要所有列时使用。

```sql
SELECT * FROM 表名;
```

**解析**：此语句返回表中所有列的全部数据。虽然使用方便，但在实际应用中我们不推荐，因为它可能返回大量不必要的数据，影响性能，且当表结构变化时可能导致查询结果不符合预期。

##### 3、去重查询

**需求**：查询指定列的不重复值，可作用于多列进行组合去重。

```sql
SELECT DISTINCT 列名 FROM 表名;
-- 多列组合去重
SELECT DISTINCT 列1, 列2 FROM 表名;
```

**解析**：`DISTINCT`关键字用在去除查询结果中的重复记录。当作用于多列时，只有所有指定列的值都相同时才会被视为重复记录，适用于需要获取唯一组合数据的场景。

##### 4、条件查询

**需求**：根据指定条件筛选表中的数据，支持多种比较运算符。

```sql
SELECT 列名 FROM 表名 WHERE 条件;
```

**解析**：`WHERE`子句用在设置查询条件，筛选出符合条件的记录。条件中可使用`=`, `>`, `<`, `!=`, `<>`, `IS NULL`等运算符，使查询结果更精准，满足特定的数据筛选需求。

##### 5、带逻辑运算符的条件查询

**需求**：使用逻辑运算符组合多个条件进行更复杂的查询，我们建议使用括号明确优先级。

```sql
SELECT 列名 FROM 表名 WHERE 条件1 AND/OR 条件2;
-- 使用括号明确优先级
SELECT 列名 FROM 表名 WHERE (条件1) OR (条件2 AND 条件3);
```

**解析**：`AND`和`OR`逻辑运算符用在组合多个查询条件。`AND`表示所有条件都必须满足，`OR`表示至少满足一个条件。使用括号可以明确条件之间的逻辑关系，避免因运算符优先级导致的查询结果错误。

##### 6、范围查询(BETWEEN)

**需求**：我们要查询列值在指定范围内的数据，包含边界值。

```sql
SELECT 列名 FROM 表名 WHERE 列名 BETWEEN 值1 AND 值2;
```

**解析**：`BETWEEN`关键字用在筛选列值在`值1`和`值2`之间的记录，等价于`>= 值1 AND <= 值2`。它简化了范围查询的语法，使查询语句更简洁易懂，适用于数值、日期等类型的范围筛选。

##### 7、列表查询(IN)

**需求**：查询列值在指定列表中的数据，可用于子查询。

```sql
SELECT 列名 FROM 表名 WHERE 列名 IN (值1, 值2, ...);
-- 用在子查询
SELECT 列名 FROM 表名 WHERE 列名 IN (SELECT 列名 FROM 表2);
```

**解析**：`IN`关键字用在判断列值是否在指定的列表或子查询结果中。当列表值较多或需要动态获取比较值时非常有用，子查询的使用使其能根据其他表的数据进行筛选，增强了查询的灵活性。

##### 8、模糊查询(LIKE)

**需求**：根据模糊条件查询数据，注意性能问题，避免前导`%`。

```sql
SELECT 列名 FROM 表名 WHERE 列名 LIKE '模糊条件';
```

**解析**：`LIKE`用在进行模糊匹配查询，`%`匹配任意长度的字符(包括0个)，`_`匹配单个字符。使用时，我们要注意，前导`%`会导致索引失效，降低查询性能，应尽量避免，适用于需要根据部分字符匹配查询的场景。

##### 9、排序查询(ORDER BY)

**需求**：对查询结果按指定列进行排序，可多列排序。

```sql
SELECT 列名 FROM 表名 ORDER BY 列名1 ASC/DESC, 列名2 ASC/DESC;
```

**解析**：`ORDER BY`用在对查询结果进行排序，`ASC`表示升序(默认)，`DESC`表示降序。支持多列排序，先按第一列排序，当第一列值相同时再按第二列排序，使查询结果更有条理，方便数据查看和分析。

##### 10、限制结果行数(分页/Top N)

**需求**：限制查询返回的结果行数，用在分页或获取前N条数据，不同数据库语法略有差异。

```sql
-- MySQL/PostgreSQL
SELECT 列名 FROM 表名 LIMIT 行数;

-- SQL Server
SELECT TOP 行数 列名 FROM 表名;

-- Oracle
SELECT 列名 FROM 表名 WHERE ROWNUM <= 行数;
```

**解析**：该类语句用在控制返回的记录数量。在分页查询、获取排名靠前的数据等场景中非常有用。Oracle中若需排序后取前N行，我们必须使用子查询，因为`ROWNUM`在排序前分配，直接使用可能导致结果不符合预期。

##### 11、插入单行数据

**需求**：向表中插入一行数据，指定列名和对应的值。

```sql
INSERT INTO 表名 (列名1, 列名2, ...) VALUES (值1, 值2, ...);
```

**解析**：`INSERT INTO`语句用在向表中插入数据，指定列名可以明确数据对应的字段，即使表结构发生变化(如：新增列)，也不会影响插入操作。虽然列名可省略，但我们不推荐，因为必须与表结构顺序完全一致，容易出错。

##### 12、插入多行数据

**需求**：一次性向表中插入多行数据，不同数据库支持情况不同。

```sql
-- MySQL、PostgreSQL、SQL Server 2008+支持
INSERT INTO 表名 (列名1, 列名2, ...) VALUES (值1, 值2, ...), (值3, 值4, ...);
```

**解析**：此语句允许在一个`INSERT`操作中插入多条记录，相比多次执行单行插入，减少了与数据库的交互次数，提高了数据插入效率。Oracle不支持这种语法，需多次执行`INSERT`或使用`INSERT ALL`。

##### 13、更新数据

**需求**：修改表中符合条件的记录的字段值，务必添加`WHERE`子句，否则会更新全表。

```sql
UPDATE 表名 SET 列名1=值1, 列名2=值2 WHERE 条件;
```

**解析**：`UPDATE`语句用在更新表中的数据，`SET`子句指定要修改的列和对应的值，`WHERE`子句筛选出需要更新的记录。若省略`WHERE`，则会更新表中所有记录，可能造成灾难性后果，使用时，我们必须谨慎。

##### 14、删除数据

**需求**：删除表中符合条件的记录，务必添加`WHERE`子句，否则会删除全表数据，支持事务回滚。

```sql
DELETE FROM 表名 WHERE 条件;
```

**解析**：`DELETE`语句用在删除表中的记录，`WHERE`子句确定要删除的记录范围。与`UPDATE`类似，省略`WHERE`会删除所有数据。由于`DELETE`操作支持事务回滚，我们在操作失误时可恢复数据。

##### 15、清空表数据(保留结构)

**需求**：快速清空表中所有数据，但保留表结构，无法回滚，不触发触发器。

```
TRUNCATE TABLE 表名;
```

**解析**：`TRUNCATE`用在清空表数据，它直接删除表中的所有记录，而不是逐行删除，因此速度极快，适用于清空大表。但它无法回滚，也不会触发触发器，我们使用时需确认操作的必要性和安全性。

##### 16、条件赋值(CASE WHEN)

**需求**：根据不同条件对数据进行分组、打标签或创建衍生变量，是我们高频使用的功能。

```sql
SELECT 
    用户ID,
    CASE 
        WHEN 年龄 < 18 THEN '未成年'
        WHEN 年龄 BETWEEN 18 AND 60 THEN '成年'
        ELSE '老年'
    END AS 年龄分组,
    CASE WHEN 订单金额 > 1000 THEN '高价值' ELSE '普通' END AS 客户等级
FROM 用户表;
```

**解析**：`CASE WHEN`语句用在实现条件逻辑判断，根据不同的条件返回不同的值。在数据分组、分类标签化、创建衍生变量等场景中非常有用，它能将复杂的条件判断整合到查询中，直接得到经过处理的结果，方便数据分析。

##### 17、处理NULL值(COALESCE/IFNULL)

**需求**：处理查询结果中的NULL值，用默认值替代，避免计算错误，保证报表完整性。

```sql
-- MySQL/PostgreSQL
SELECT 用户名, COALESCE(最后登录时间, '从未登录') AS 登录状态 FROM 用户表;

-- MySQL特有
SELECT 用户名, IFNULL(邮箱, '未填写') AS 邮箱状态 FROM 用户表;
```

**解析**：`COALESCE`和`IFNULL`用在处理NULL值，`COALESCE`返回参数中第一个非NULL值，`IFNULL`是MySQL特有函数，当第一个参数为NULL时返回第二个参数。它们在数据清洗中很重要，能避免NULL值导致的计算错误，使我们的报表展示更完整、合理。

##### 18、日期区间计算(DATEDIFF/DATEADD)

**需求**：进行日期之间的计算，如：计算间隔天数、增加或减少日期，是用户行为分析的必备功能。

```sql
-- MySQL
SELECT 
    用户ID,
    DATEDIFF(NOW(), 注册日期) AS 注册天数,
    DATE_ADD(注册日期, INTERVAL 30 DAY) AS 预计首购日
FROM 用户表 WHERE 注册日期 > '2025-01-01';

-- SQL Server
SELECT DATEDIFF(day, 注册日期, GETDATE()) AS 注册天数 FROM 用户表;
```

**解析**：`DATEDIFF`用在计算两个日期之间的间隔，`DATE_ADD`(MySQL)或类似函数用在在日期上增加或减少指定的时间间隔。这些函数在计算用户生命周期、留存区间、活动有效期等用户行为分析场景中必不可少，能快速获取时间相关的衍生指标。

#### 二、聚合函数与分组统计

##### 19、计数(COUNT)

**需求**：统计表中的记录数量，可统计所有行或非NULL值的行。

```sql
-- 统计所有行(含NULL)
SELECT COUNT(*) FROM 表名;
-- 仅统计非NULL值
SELECT COUNT(列名) FROM 表名;
```

**解析**：`COUNT(*)`统计表中所有记录的行数，包括含有NULL值的行；`COUNT(列名)`只统计指定列中非NULL值的行数。我们推荐使用`COUNT(*)`，除非明确需要排除NULL值，它能更全面地反映表中的记录数量。

##### 20、求和(SUM)

**需求**：计算指定数值列的总和，忽略NULL值。

```sql
SELECT SUM(列名) FROM 表名;
```

**解析**：`SUM`函数用在对指定的数值列进行求和运算，自动忽略NULL值。它在计算总销售额、总数量等累计指标时非常有用，是我们进行数据分析时常用的聚合函数之一。

##### 21、求平均值(AVG)

**需求**：计算指定数值列的平均值，忽略NULL值。

```sql
SELECT AVG(列名) FROM 表名;
```

**解析**：`AVG`函数计算指定列的平均值，等价于`SUM(列名) / COUNT(列名)`，自动忽略NULL值。适用于计算平均分数、平均价格等需要反映集中趋势的指标。

##### 22、求最大值(MAX)

**需求**：获取指定列的最大值，支持数值、日期、字符串等类型。

```sql
SELECT MAX(列名) FROM 表名;
```

**解析**：`MAX`函数用在获取指定列中的最大值，对于数值类型是最大的数值，日期类型是最新的日期，字符串类型是按字典序最大的字符串。在获取最高值、最近日期等场景中常用。

##### 23、求最小值(MIN)

**需求**：获取指定列的最小值，支持多种数据类型。

```sql
SELECT MIN(列名) FROM 表名;
```

**解析**：`MIN`函数与`MAX`函数相反，用在获取指定列中的最小值。无论是数值、日期还是字符串类型，都能正确返回对应类型的最小值，适用于获取最低值、最早日期等场景。

##### 24、分组查询(GROUP BY)

**需求**：按指定列对数据进行分组，然后对每个分组应用聚合函数。

```sql
SELECT 分组列, 聚合函数 FROM 表名 GROUP BY 分组列;
```

**解析**：`GROUP BY`用在将表中的数据按指定列进行分组，使聚合函数能分别应用于每个分组。根据SQL标准，`SELECT`子句中出现的非聚合列必须出现在`GROUP BY`子句中，保证每个分组的结果唯一。

##### 25、分组过滤(HAVING)

**需求**：对分组后的结果进行过滤，筛选出符合聚合条件的分组。

```sql
SELECT 分组列, 聚合函数 FROM 表名 GROUP BY 分组列 HAVING 聚合条件;
```

**解析**：`HAVING`子句用在在分组后对分组结果进行过滤，与`WHERE`子句不同，`WHERE`是在分组前过滤行，`HAVING`是在分组后过滤组。它通常与聚合函数一起使用，筛选出满足特定聚合条件的分组。

##### 26、聚合与排序结合

**需求**：对分组聚合后的结果按指定的聚合值进行排序。

```sql
SELECT 分组列, SUM(列名) FROM 表名 GROUP BY 分组列 ORDER BY SUM(列名) DESC;
-- 可用列别名排序
SELECT 分组列, SUM(列名) AS 总和 FROM 表名 GROUP BY 分组列 ORDER BY 总和 DESC;
```

**解析**：该语句先按指定列分组并计算聚合值，然后按聚合值进行排序。使用列别名排序可以使语句更简洁易懂，方便按聚合结果的大小对分组进行排序，如：按销售额从高到低排列各产品类别。

##### 27、百分比计算

**需求**：我们要计算各分组在总体中的占比百分比。

```sql
SELECT 
    产品类别,
    COUNT(*) AS 订单数,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() AS 占比百分比
FROM 订单表
GROUP BY 产品类别
ORDER BY 订单数 DESC;
```

**解析**：此语句先按产品类别分组统计订单数，然后使用窗口函数`SUM(COUNT(*)) OVER()`计算总订单数，进而求出每个产品类别的订单数占总订单数的百分比。常用在计算各维度占比，如：品类销售占比、渠道流量占比等业务指标。

##### 28、累计求和(窗口函数SUM() OVER())

**需求**：计算数据的累计求和，用在趋势分析，观察业务累积效应。

```sql
SELECT 
    月份,
    销售额,
    SUM(销售额) OVER (ORDER BY 月份 ROWS UNBOUNDED PRECEDING) AS 累计销售额
FROM 月度销售表
ORDER BY 月份;
```

**解析**：窗口函数`SUM(销售额) OVER (ORDER BY 月份 ROWS UNBOUNDED PRECEDING)`用在计算从第一行到当前行的销售额累计和。它能直观地展示业务的累积增长趋势，在分析销售额、用户数等指标的累积情况时非常有用。

##### 29、移动平均(窗口函数AVG() OVER())

**需求**：计算数据的移动平均值，平滑短期波动，识别长期趋势。

```sql
SELECT 
    日期,
    日活用户数,
    AVG(日活用户数) OVER (ORDER BY 日期 ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS 7日移动平均
FROM 用户活跃表
ORDER BY 日期;
```

**解析**：该语句使用窗口函数计算7日移动平均值，即当前日期及前6天的日活用户数的平均值。移动平均能消除数据的短期波动，更清晰地展示长期趋势，常用于DAU(日活跃用户数)、MAU(月活跃用户数)等指标的分析。

#### 三、表连接查询

##### 30、内连接(INNER JOIN)

**需求**：我们要获取两个表中关联列匹配的行。

```sql
SELECT 列名 FROM 表1 INNER JOIN 表2 ON 表1.关联列 = 表2.关联列;
```

**解析**：`INNER JOIN`(可省略`INNER`)用在连接两个表，只返回两个表中关联列值匹配的行。它是最常用的连接方式，用在获取两个表中相关联的数据，如：查询用户信息及其对应的订单信息。

##### 31、左外连接(LEFT JOIN)

**需求**：获取左表所有行，以及右表中与左表关联列匹配的行，右表无匹配则为NULL。

```sql
SELECT 列名 FROM 表1 LEFT JOIN 表2 ON 表1.关联列 = 表2.关联列;
```

**解析**：`LEFT JOIN`返回左表的所有记录，以及右表中与左表关联列匹配的记录。如果右表中没有匹配的记录，则右表的列值为NULL。适用于需要保留左表所有数据，并关联右表相关数据的场景，如：我们查询所有用户及其订单信息，包括没有订单的用户。

##### 32、右外连接(RIGHT JOIN)

**需求**：获取右表所有行，以及左表中与右表关联列匹配的行，左表无匹配则为NULL。

```sql
SELECT 列名 FROM 表1 RIGHT JOIN 表2 ON 表1.关联列 = 表2.关联列;
```

**解析**：`RIGHT JOIN`与`LEFT JOIN`相反，返回右表的所有记录，以及左表中与右表关联列匹配的记录。左表无匹配时，左表的列值为NULL。适用于需要保留右表所有数据，并关联左表相关数据的场景。

##### 33、全外连接(FULL JOIN)

**需求**：获取两个表中所有行，当某一表中无匹配行时，对应列值为NULL，MySQL不支持。

```sql
SELECT 列名 FROM 表1 FULL JOIN 表2 ON 表1.关联列 = 表2.关联列;

-- MySQL模拟全外连接写法
SELECT ... FROM 表1 LEFT JOIN 表2 ON ...
UNION
SELECT ... FROM 表1 RIGHT JOIN 表2 ON ... WHERE 表1.关联列 IS NULL;
```

**解析**：`FULL JOIN`返回两个表中的所有记录，当两个表中没有匹配的记录时，对应表的列值为NULL。由于MySQL不支持`FULL JOIN`，我们可以通过`LEFT JOIN`和`RIGHT JOIN`结合`UNION`来模拟实现，用在需要获取两个表所有数据并关联的场景。

**说明**：Oracle 9i(9.2)及以后版本原生支持标准的`FULL OUTER JOIN`语法（通常简写为`FULL JOIN`）；在Oracle 8i及更早版本中，`FULL OUTER JOIN`语法不被支持，此时，更通用的写法是`LEFT JOIN ... UNION ALL RIGHT JOIN ...`。

##### 34、自连接

**需求**：将表与自身进行连接，常用于处理层级结构、时间区间比较等。

```sql
SELECT a.列名, b.列名 FROM 表名 a JOIN 表名 b ON a.关联列 = b.关联列;
```

**解析**：自连接是指将一个表与自身进行连接，我们通过给表起不同的别名(如：`a`和`b`)来区分。常用于处理具有层级关系的数据，如：员工与经理的关系，或比较同一表中不同时间区间的数据等场景。

##### 35、多表连接

**需求**：连接多个表，获取关联的数据，我们建议显式使用别名避免歧义。

```sql
SELECT 列名 FROM 表1 JOIN 表2 ON 表1.id=表2.t1_id JOIN 表3 ON 表2.id=表3.t2_id;
```

**解析**：多表连接通过连续使用`JOIN`语句将多个表连接起来，每个`JOIN`指定与前一个表的关联条件。我们使用别名可以使语句更清晰，避免列名冲突，适用于需要从多个相关表中获取数据的复杂查询场景。

##### 36、连接加条件(注意语义)

**需求**：我们在连接查询中添加条件筛选数据，需注意条件位置对结果的影响。

```sql
-- 此写法实际效果=INNER JOIN
SELECT 列名 FROM 表1 LEFT JOIN 表2 ON 表1.id = 表2.t1_id WHERE 表2.列名 IS NOT NULL;

-- 保留左表并过滤右表，条件写在ON子句中
SELECT 列名 FROM 表1 LEFT JOIN 表2 ON 表1.id = 表2.t1_id AND 表2.列名 = 'xxx';
```

**解析**：在`LEFT JOIN`中，若`WHERE`子句包含对右表列的非NULL判断，会过滤掉右表为NULL的行，实际效果等同于`INNER JOIN`。若要保留左表所有行并只过滤右表的匹配行，我们应将条件写在`ON`子句中，保证左表数据不被过滤。

##### 37、交叉连接(CROSS JOIN)

**需求**：生成两个表的笛卡尔积，用在创建维度组合矩阵。

```sql
SELECT 
    a.城市, 
    b.产品线, 
    0 AS 目标销售额 -- 初始化目标值
FROM (SELECT DISTINCT 城市 FROM 区域表) a
CROSS JOIN (SELECT DISTINCT 产品线 FROM 产品表) b;
```

**解析**：`CROSS JOIN`生成两个表的笛卡尔积，即左表的每一行与右表的每一行都组合成一行。此例中用在创建“城市×产品线”的矩阵，可用在设定销售目标或填充缺失的维度组合，保证分析维度的完整性。

##### 38、使用USING简化等值连接

**需求**：当两表关联字段同名时，简化连接语句，提高可读性。

```sql
SELECT 用户名, 订单金额
FROM 用户表
JOIN 订单表 USING (用户ID); -- 要求两表关联字段同名
```

**解析**：`USING`子句用在当两个表的关联字段名称相同时简化连接条件，无需重复书写关联字段。它使SQL语句更简洁，提高了可读性，适用于关联字段名称一致的等值连接场景。

#### 四、子查询

##### 39、单行子查询(=、>、<等)

**需求**：子查询返回单行单列结果，用在与主查询中的列进行比较。

```sql
SELECT 列名 FROM 表名 WHERE 列名 = (SELECT 列名 FROM 另一表 WHERE 条件);
```

**解析**：单行子查询返回一个单一的值，主查询使用`=`, `>`, `<`等比较运算符与该值进行比较。子查询必须保证只返回单行单列，否则会报错，适用于需要根据另一个表的单个值筛选数据的场景。

##### 40、多行子查询(IN)

**需求**：子查询返回多行单列结果，主查询判断列值是否在子查询结果中。

```sql
SELECT 列名 FROM 表名 WHERE 列名 IN (SELECT 列名 FROM 另一表 WHERE 条件);
```

**解析**：多行子查询返回多个值，主查询使用`IN`关键字判断列值是否在子查询结果集中。我们需要注意的是，子查询结果中的NULL值不会匹配任何结果，适用于需要根据另一个表的多个值筛选数据的场景。

##### 41、多行子查询(ANY/ALL)

**需求**：主查询与子查询的多个结果进行比较，`ANY`表示满足任一条件，`ALL`表示满足所有条件。

```sql
SELECT 列名 FROM 表名 WHERE 列名 > ANY (SELECT 列名 FROM 另一表);
```

**解析**：`ANY`和`ALL`用在主查询与子查询的多个结果进行比较。`> ANY`表示大于子查询结果中的最小值，`> ALL`表示大于子查询结果中的最大值。实际使用中较少，我们建议用`MAX`/`MIN`结合比较运算符替代，使语句更易理解。

##### 42、EXISTS子查询

**需求**：判断子查询是否返回结果，只关心是否存在，不关心返回值。

```sql
SELECT 列名 FROM 表名 WHERE EXISTS (SELECT 1 FROM 另一表 WHERE 关联条件);
```

**解析**：`EXISTS`用在判断子查询是否存在满足条件的记录，只要子查询返回至少一行记录，`EXISTS`就返回`TRUE`，否则返回`FALSE`。它的性能通常优于`IN`(尤其当右表数据量大时)，因为一旦找到匹配的记录就会停止查询。

##### 43、子查询作为列(标量子查询)

**需求**：子查询返回单行单列结果，作为主查询的一列。

```sql
SELECT 列名, (SELECT COUNT(*) FROM 订单表 WHERE 用户ID=用户表.ID) AS 订单数 FROM 用户表;
```

**解析**：标量子查询返回一个单一的值，作为主查询结果集中的一列。它必须返回单行单列，否则会报错。需要注意的是，标量子查询可能逐行执行，当主表数据量大时可能影响性能，适用于为每条记录添加一个基于其他表计算的衍生字段。

##### 44、子查询作为表(派生表/内联视图)

**需求**：子查询的结果作为一个临时表，与其他表进行连接或其他操作。

```sql
SELECT a.列名, b.别名 FROM 表名 a JOIN (SELECT 列名, COUNT(*) AS 别名 FROM 另一表 GROUP BY 列名) b ON a.关联列 = b.关联列;
```

**解析**：子查询作为表时，需要给子查询起一个别名(如：`b`)，然后可以像使用普通表一样与其他表进行连接、筛选等操作。子查询中可以包含`GROUP BY`、`WHERE`等子句，适用于需要先对数据进行汇总或筛选，再与其他表关联的场景。

##### 45、相关子查询(Correlated Subquery)

**需求**：子查询依赖于主查询中的列值，逐行进行计算。

```sql
SELECT 
    用户ID,
    订单金额,
    (SELECT AVG(订单金额) FROM 订单表 b WHERE b.用户ID = a.用户ID) AS 用户平均订单额
FROM 订单表 a
WHERE 订单金额 > (SELECT AVG(订单金额) FROM 订单表 b WHERE b.用户ID = a.用户ID);
```

**解析**：相关子查询与主查询相互关联，子查询的执行依赖于主查询中的每一行数据。此例中，对于订单表中的每一行，子查询都会根据当前行的`用户ID`计算该用户的平均订单金额，主查询则筛选出订单金额高于该用户平均订单金额的记录，常用在异常检测等场景。

##### 46、WITH子句(CTE - Common Table Expression)：结构化复杂查询

**需求**：我们将复杂查询分解为多个逻辑块，以提升可读性和可维护性。

```sql
WITH 高价值用户 AS (
    SELECT 用户ID, SUM(订单金额) AS 总消费
    FROM 订单表
    GROUP BY 用户ID
    HAVING SUM(订单金额) > 10000
),
用户最近订单 AS (
    SELECT 用户ID, MAX(订单日期) AS 最近下单日
    FROM 订单表
    GROUP BY 用户ID
)
SELECT 
    a.用户名, 
    b.总消费, 
    c.最近下单日
FROM 用户表 a
JOIN 高价值用户 b ON a.用户ID = b.用户ID
JOIN 用户最近订单 c ON a.用户ID = c.用户ID;
```

**解析**：`WITH`子句(CTE)用在创建临时的结果集，每个CTE可以像表一样被后续的查询引用。它将复杂的查询分解为多个简单的逻辑块，使查询结构更清晰，易于理解和维护，特别适合处理复杂的多步骤数据分析。

#### 五、表结构操作

##### 47、创建表(CREATE TABLE)

**需求**：创建一个新表，定义表的列、数据类型和约束。

```sql
CREATE TABLE 表名 (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**解析**：`CREATE TABLE`用在创建新表，括号内定义表的列，包括列名、数据类型和约束。常见的约束有`PRIMARY KEY`(主键)、`NOT NULL`(非空)、`UNIQUE`(唯一)、`DEFAULT`(默认值)等，它们用于保证数据的完整性和一致性。

##### 48、修改表名

**需求**：修改已存在表的名称，不同数据库语法不同。

```
-- MySQL
ALTER TABLE 旧表名 RENAME TO 新表名;

-- SQL Server
EXEC sp_rename '旧表名', '新表名';

-- Oracle
ALTER TABLE 旧表名 RENAME TO 新表名; -- 注意：TO是Oracle 10g+
```

**解析**：修改表名的语法因数据库而异，但目的都是更改表的标识名称。在修改表名前，我们要保证没有其他对象(如：视图、存储过程)依赖该表，否则可能导致依赖对象失效。

##### 49、添加列

**需求**：向已存在的表中添加新列，可指定数据类型和约束。

```
ALTER TABLE 表名 ADD 列名 数据类型 [约束];
-- 示例
ALTER TABLE 用户表 ADD email VARCHAR(100) UNIQUE;
```

**解析**：`ALTER TABLE ... ADD`用在为表添加新列，可指定列的数据类型和约束(如：`UNIQUE`)。添加列后，表中已有的记录在该列上的值通常为NULL(除非指定了`DEFAULT`约束)，适用于需要扩展表结构的场景。

##### 50、修改列

**需求**：修改表中已有列的数据类型或约束，不同数据库语法不同。

```
-- MySQL/Oracle
ALTER TABLE 表名 MODIFY 列名 新数据类型 [新约束];

-- SQL Server
ALTER TABLE 表名 ALTER COLUMN 列名 新数据类型 [NULL/NOT NULL];
```

**解析**：修改列的语法因数据库而异，可用在更改列的数据类型或约束。我们需要注意的是，修改数据类型可能导致数据丢失或转换失败(如：将字符串类型改为数值类型)，我们操作前应谨慎并备份数据。

##### 51、删除列

**需求**：从表中删除指定列，会丢失该列的所有数据，需谨慎操作。

```
ALTER TABLE 表名 DROP COLUMN 列名;
```

**解析**：`ALTER TABLE ... DROP COLUMN`用在删除表中的列，该操作会永久删除该列的所有数据，且部分数据库要求该表不能被其他对象引用。在删除列前，我们应确认该列的数据不再需要，避免造成数据丢失。

##### 52、创建视图(CREATE VIEW)：封装常用查询

**需求**：创建视图，封装常用的查询逻辑，简化后续查询，便于权限控制和数据抽象。

```sql
CREATE VIEW 活跃用户视图 AS
SELECT 用户ID, 用户名, 最后登录时间
FROM 用户表
WHERE 最后登录时间 >= DATE_SUB(NOW(), INTERVAL 30 DAY);
-- 之后可直接查询：SELECT * FROM活跃用户视图;
```

**解析**：视图是一个虚拟表，其内容由查询定义。创建视图可以封装复杂的查询逻辑，后续查询时直接使用视图名即可，简化了查询操作。同时，视图还可用在权限控制(只授予用户查看视图的权限，而不授予查看基表的权限)和数据抽象，隐藏底层表结构的细节。

#### 六、索引与约束

##### 53、创建主键约束

**需求**：为表创建主键约束，保证表中每行数据的唯一性。

```sql
ALTER TABLE 表名 ADD CONSTRAINT pk_表名 PRIMARY KEY (列名);
-- 或建表时定义
CREATE TABLE 表名 (
    列名 INT PRIMARY KEY,
    ...
);
```

**解析**：主键约束用在唯一标识表中的每一行记录，主键列的值不能为NULL且必须唯一。我们可以在创建表时定义主键，也可以通过`ALTER TABLE`语句添加。主键有助于提高查询性能，并且是表与表之间建立关联的基础。

##### 54、创建唯一约束

**需求**：保证指定列的值唯一，允许NULL值(但只能有一个NULL)。

```
ALTER TABLE 表名 ADD CONSTRAINT uk_表名_列名 UNIQUE (列名);
```

**解析**：唯一约束用在保证指定列的值在表中是唯一的，与主键约束不同的是，唯一约束允许列值为NULL，但只能有一个NULL值。唯一约束可以在创建表时定义，也可以通过`ALTER TABLE`语句添加，常用于保证如：邮箱、手机号等字段的唯一性。

##### 55、创建普通索引

**需求**：创建索引以提升查询、连接和排序的性能，避免过度索引。

```
CREATE INDEX idx_表名_列名 ON 表名(列名1, 列名2);
```

**解析**：索引是一种数据结构，用在快速查找表中的数据。创建索引可以显著提高`WHERE`子句筛选、`JOIN`连接和`ORDER BY`排序的性能。但索引会增加数据插入、更新和删除的开销，因此我们应避免过度索引，只在常用的查询条件列上创建索引。

##### 56、创建包含列的索引(INCLUDE Index)

**需求**：优化高频查询，当查询需要返回多个列但筛选条件只用部分列时，使用`INCLUDE`索引避免回表，提升性能。

```sql
-- 场景：高频查询SELECT列，但WHERE条件只用部分列
-- 传统复合索引可能因列过多或顺序不当导致索引失效或臃肿

-- 创建带INCLUDE的非聚集索引
CREATE NONCLUSTERED INDEX idx_orders_userid_include
ON 订单表 (用户ID)
INCLUDE (订单日期, 订单金额, 订单状态);

-- 查询示例：完美命中“覆盖索引”，无需回表
SELECT 订单日期, 订单金额, 订单状态
FROM 订单表
WHERE 用户ID = 12345;
```

**解析**：`INCLUDE`索引允许在索引中包含非键列，这些列不参与索引树的排序，仅作为附加数据存储在索引叶子节点。当查询的筛选条件列是索引键列，且返回的列包含在`INCLUDE`子句中时，查询可以直接从索引中获取所需数据，无需回表查询基表，大幅提升性能。适用于“筛选条件少，返回列多”的报表类查询，我们需掌握其与复合索引的区别和适用场景。

**说明**：适用于SQL Server、PostgreSQL（部分版本）等；MySQL不支持`INCLUDE`，需使用复合索引模拟。

##### 57、删除索引

**需求**：删除不再需要的索引，不同数据库语法略有不同。

```
-- MySQL/SQL Server
DROP INDEX 索引名 ON 表名;

-- Oracle
DROP INDEX 索引名; -- 无需指定表名
```

**解析**：当索引不再被使用或影响了数据操作性能时，需要删除索引。删除索引前，我们应确认该索引没有被其他约束(如：唯一约束)使用，否则可能导致约束失效。删除无用的索引可以减少数据维护的开销。

##### 58、查看执行计划(EXPLAIN)：性能调优第一步

**需求**：分析SQL语句的执行路径，判断是否使用索引，预估性能瓶颈。

```sql
EXPLAIN SELECT * FROM 订单表 WHERE 用户ID = 123 AND 订单日期 > '2025-01-01';
```

**解析**：`EXPLAIN`语句用在显示SQL查询的执行计划，包括表的访问方式、连接顺序、是否使用索引等信息。通过分析执行计划，我们可以判断查询是否存在性能问题，如：是否进行了全表扫描、是否有效使用了索引等，是SQL性能调优的重要工具。

#### 七、数据库方言差异

##### 59、日期函数(获取当前日期)

**需求**：获取当前日期，不同数据库的函数不同。

```sql
-- MySQL
SELECT CURDATE();
SELECT DATE(NOW());

-- PostgreSQL
SELECT CURRENT_DATE;

-- SQL Server
SELECT CAST(GETDATE() AS DATE);

-- Oracle
SELECT TRUNC(SYSDATE) FROM DUAL;
```

**解析**：不同数据库提供了不同的函数来获取当前日期。这些函数都用于返回当前的日期(不包含时间部分或时间部分被截断)，在需要记录操作日期、筛选特定日期数据等场景中常用，使用时，我们需根据所使用的数据库选择正确的函数。

##### 60、字符串拼接

**需求**：将多个字符串或列拼接成一个字符串，不同数据库语法不同。

```sql
-- MySQL
SELECT CONCAT(列1, 列2, ...) FROM 表名;

-- PostgreSQL/Oracle
SELECT 列1 || 列2 FROM 表名;

-- SQL Server
SELECT 列1 + 列2 FROM 表名; -- 列需为字符串类型或显式转换
```

**解析**：字符串拼接用在将多个字符串组合成一个字符串。不同数据库使用不同的方式，MySQL使用`CONCAT`函数，PostgreSQL和Oracle使用`||`运算符，SQL Server使用`+`运算符。在SQL Server中，若拼接的列不是字符串类型，需要进行显式转换。

##### 61、自增列(主键自动增长)

**需求**：定义自增列，使主键值能够自动增长，不同数据库实现方式不同。

```sql
-- MySQL
CREATE TABLE 表名 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ...
);

-- SQL Server
CREATE TABLE 表名 (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ...
);

-- Oracle 11g及以前
-- 使用SEQUENCE+TRIGGER
CREATE SEQUENCE 表名_seq START WITH 1 INCREMENT BY 1;
CREATE TRIGGER 表名_trigger BEFORE INSERT ON 表名 FOR EACH ROW
BEGIN
    SELECT 表名_seq.NEXTVAL INTO :NEW.id FROM DUAL;
END;

-- Oracle 12c+
CREATE TABLE 表名 (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ...
);
```

**解析**：自增列用在自动为新插入的记录生成唯一的主键值，避免手动分配主键可能导致的重复。不同数据库的实现方式不同，MySQL使用`AUTO_INCREMENT`，SQL Server使用`IDENTITY`，Oracle 11g及以前需要通过序列(`SEQUENCE`)和触发器(`TRIGGER`)实现，Oracle 12c+支持`GENERATED ALWAYS AS IDENTITY`语法。

##### 62、分页查询(Oracle)

**需求**：实现分页查询，获取指定范围的记录，不同数据库语法不同。

```sql
-- MySQL
SELECT * FROM 表名 LIMIT 偏移量, 行数;

-- SQL Server
SELECT * FROM 表名 
ORDER BY 列名 
OFFSET 偏移量 ROWS 
FETCH NEXT 行数 ROWS ONLY;

-- Oracle(排序生效)
SELECT * FROM (
    SELECT 列名, ROWNUM rn FROM (
        SELECT 列名 FROM 表名 ORDER BY 排序列
    ) WHERE ROWNUM <= 结束行
) WHERE rn >= 起始行;
```

**解析**：分页查询用在在查询结果较多时，只返回指定范围的记录，提高查询效率和用户体验。不同数据库的分页语法不同，Oracle的分页相对复杂，由于`ROWNUM`在排序前分配，若要排序后分页，我们必须使用嵌套子查询，确保分页是在排序后的结果上进行的。

##### 63、TOP N查询

**需求**：获取查询结果中的前N条记录，不同数据库语法不同。

```sql
-- MySQL
SELECT * FROM 表名 LIMIT N;

-- SQL Server
SELECT TOP N * FROM 表名;

-- Oracle
SELECT * FROM 表名 WHERE ROWNUM <= N;
```

**解析**：`TOP N`查询用在获取结果集中的前N条记录，在需要获取排名靠前的数据(如：销售额最高的前10个产品)时常用。Oracle中若需要先排序再取前N条记录，必须使用子查询，因为`ROWNUM`在排序前生效，我们直接使用可能得到不正确的结果。

##### 64、日期格式化(DATE\_FORMAT/TO\_CHAR)：报表展示

**需求**：将日期格式化为指定的字符串形式，用在报表展示，不同数据库函数不同。

```sql
-- MySQL
SELECT DATE_FORMAT(订单日期, '%Y年%m月') AS 月份, SUM(金额) FROM 订单表 GROUP BY 月份;

-- Oracle/PostgreSQL
SELECT TO_CHAR(订单日期, 'YYYY"年"MM"月"') AS 月份, SUM(金额) FROM 订单表 GROUP BY 月份;
```

**解析**：日期格式化函数用在将日期类型转换为指定格式的字符串，使日期在报表中更易读。MySQL使用`DATE_FORMAT`函数，Oracle和PostgreSQL使用`TO_CHAR`函数，它们都通过格式字符串指定输出格式，如：`%Y`(四位年份)、`%m`(两位月份)等。

##### 65、字符串转日期(STR\_TO\_DATE/TO\_DATE)：数据清洗

**需求**：将字符串类型的日期转换为日期类型，用在数据清洗，不同数据库函数不同。

```sql
-- MySQL
UPDATE 用户表 SET 生日 = STR_TO_DATE(生日文本, '%Y-%m-%d') WHERE 生日文本 IS NOT NULL;

-- Oracle
UPDATE 用户表 SET 生日 = TO_DATE(生日文本, 'YYYY-MM-DD') WHERE 生日文本 IS NOT NULL;
```

**解析**：在数据清洗过程中，我们经常需要将存储为字符串的日期转换为日期类型，以便进行日期计算和筛选。MySQL使用`STR_TO_DATE`函数，Oracle使用`TO_DATE`函数，它们都需要指定字符串的日期格式，保证转换正确。

##### 66、随机抽样(RAND()/DBMS\_RANDOM)：A/B测试、数据探查

**需求**：从表中随机抽取一定数量的记录，用在A/B测试或数据探查，不同数据库函数不同。

```sql
-- MySQL
SELECT * FROM 用户表 ORDER BY RAND() LIMIT 1000;

-- Oracle
SELECT * FROM (SELECT * FROM 用户表 ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM <= 1000;
```

**解析**：随机抽样用在从大量数据中随机选取部分样本，适用于A/B测试分组、数据质量探查等场景。MySQL使用`RAND()`函数生成随机数并排序，然后取前N条记录；Oracle使用`DBMS_RANDOM.VALUE`生成随机数，同样通过排序和`ROWNUM`来获取随机样本。

#### 八、数据分析师实战必备语句

##### 67、计算留存率(次日/7日/30日留存)

**需求**：我们要计算用户的次日、7日或30日留存率，分析用户粘性。

```sql
WITH 首日用户 AS (
    SELECT 用户ID, MIN(登录日期) AS 首登日
    FROM 用户登录日志
    GROUP BY 用户ID
),
次日留存 AS (
    SELECT 
        a.首登日,
        COUNT(DISTINCT a.用户ID) AS 新增用户数,
        COUNT(DISTINCT b.用户ID) AS 次日留存用户数
    FROM 首日用户 a
    LEFT JOIN 用户登录日志 b 
        ON a.用户ID = b.用户ID AND b.登录日期 = DATE_ADD(a.首登日, INTERVAL 1 DAY)
    GROUP BY a.首登日
)
SELECT 
    首登日,
    新增用户数,
    次日留存用户数,
    ROUND(次日留存用户数 * 100.0 / 新增用户数, 2) AS 次日留存率
FROM 次日留存
ORDER BY 首登日 DESC;
```

**解析**：该语句通过CTE先确定每个用户的首次登录日期(首登日)，然后关联用户登录日志，找出在首登日次日也登录的用户(次日留存用户)。最后计算次日留存用户数占新增用户数的比例，得到次日留存率。我们通过修改日期间隔(如：`INTERVAL 7 DAY`)，可计算7日留存率等，用于分析用户粘性和产品吸引力。

##### 68、计算复购率(购买2次及以上用户占比)

**需求**：我们要计算购买2次及以上的用户在总购买用户中的占比，评估用户忠诚度。

```sql
SELECT 
    COUNT(CASE WHEN 订单次数 >= 2 THEN 1 END) * 100.0 / COUNT(*) AS 复购率
FROM (
    SELECT 用户ID, COUNT(*) AS 订单次数
    FROM 订单表
    GROUP BY 用户ID
) t;
```

**解析**：首先通过子查询统计每个用户的订单次数，然后在主查询中使用`CASE`语句判断用户订单次数是否大于等于2，计数此类用户的数量，并除以总用户数得到复购率。复购率反映了用户的忠诚度和产品的吸引力。

##### 69、RFM用户分层(Recency, Frequency, Monetary)

**需求**：根据用户的最近购买时间(Recency)、购买频次(Frequency)和消费金额(Monetary)对用户进行分层。

```sql
WITH rfm_raw AS (
    SELECT 
        用户ID,
        DATEDIFF('2025-09-21', MAX(订单日期)) AS R, -- 最近购买天数
        COUNT(*) AS F, -- 购买频次
        SUM(订单金额) AS M -- 总金额
    FROM 订单表
    WHERE 订单日期 >= DATE_SUB('2025-09-21', INTERVAL 2 YEAR) -- 近2年
    GROUP BY 用户ID
),
rfm_score AS (
    SELECT 
        用户ID,
        R,
        F,
        M,
        NTILE(5) OVER (ORDER BY R DESC) AS R_Score, -- R越小(越近)越好，高分在后，故DESC
        NTILE(5) OVER (ORDER BY F ASC) AS F_Score,  -- F越大(频次高)越好，高分在后，故ASC
        NTILE(5) OVER (ORDER BY M ASC) AS M_Score   -- M越大(金额高)越好，高分在后，故ASC
    FROM rfm_raw
)
SELECT 
    用户ID,
    CONCAT(R_Score, F_Score, M_Score) AS RFM分层,
    CASE 
        WHEN R_Score >= 4 AND F_Score >= 4 AND M_Score >= 4 THEN '高价值用户'
        WHEN R_Score <= 2 AND F_Score >= 4 THEN '流失风险用户'
        ELSE '一般用户'
    END AS 用户标签
FROM rfm_score;
```

**解析**：RFM模型是客户分群的常用方法。我们首先计算每个用户的R(最近购买天数)、F(购买频次)、M(总消费金额)指标，然后使用`NTILE`函数将这三个指标分别分为5个等级(1-5分)。最后根据RFM得分的组合对用户进行分层和打标签(如：高价值用户、流失风险用户等)，为精准营销和客户关系管理提供依据。

##### 70、同比/环比增长率计算

**需求**：我们计算数据的同比和环比增长率，用于分析业务的增长趋势。

```sql
WITH 月度数据 AS (
    SELECT 
        DATE_FORMAT(订单日期, '%Y-%m') AS 月份,
        SUM(订单金额) AS 销售额
    FROM 订单表
    GROUP BY DATE_FORMAT(订单日期, '%Y-%m')
)
SELECT 
    月份,
    销售额,
    LAG(销售额, 1) OVER (ORDER BY 月份) AS 上月销售额,
    LAG(销售额, 12) OVER (ORDER BY 月份) AS 去年同月销售额,
    ROUND((销售额 - LAG(销售额, 1) OVER (ORDER BY 月份)) * 100.0 / NULLIF(LAG(销售额, 1) OVER (ORDER BY 月份), 0), 2) AS 环比增长率,
    ROUND((销售额 - LAG(销售额, 12) OVER (ORDER BY 月份)) * 100.0 / LAG(销售额, 12) OVER (ORDER BY 月份), 2) AS 同比增长率
FROM 月度数据
ORDER BY 月份;
```

**解析**：我们首先通过CTE按月份统计销售额，得到月度销售数据。然后使用窗口函数`LAG`获取上月销售额(`LAG(销售额, 1)`)和去年同月销售额(`LAG(销售额, 12)`)，进而计算环比增长率(与上月相比)和同比增长率(与去年同月相比)。这些增长率指标用于分析业务的短期和长期增长趋势。

##### 71、Top N问题(每个分组取前3名)

**需求**：在每个分组中获取排名前3的数据，如：每个部门销售额前3的员工。

```sql
WITH 排名 AS (
    SELECT 
        部门,
        员工姓名,
        销售额,
        ROW_NUMBER() OVER (PARTITION BY 部门 ORDER BY 销售额 DESC) AS rn
    FROM 销售业绩表
)
SELECT 部门, 员工姓名, 销售额
FROM 排名
WHERE rn <= 3; -- 每个部门取前三名
```

**解析**：我们使用CTE和窗口函数`ROW_NUMBER()`，按部门分组(`PARTITION BY 部门`)，并按销售额降序排序(`ORDER BY 销售额 DESC`)，为每个部门的员工分配排名(`rn`)。然后在主查询中筛选出排名小于等于3的记录，得到每个部门销售额前3的员工。这种方法可用于各种需要在分组中获取前几名数据的场景。

##### 72、数据透视表(行转列)：静态写法

**需求**：我们将行数据转换为列数据，生成数据透视表，便于数据汇总和分析。

```sql
SELECT 
    产品类别,
    SUM(CASE WHEN QUARTER(订单日期) = 1 THEN 订单金额 ELSE 0 END) AS Q1销售额,
    SUM(CASE WHEN QUARTER(订单日期) = 2 THEN 订单金额 ELSE 0 END) AS Q2销售额,
    SUM(CASE WHEN QUARTER(订单日期) = 3 THEN 订单金额 ELSE 0 END) AS Q3销售额,
    SUM(CASE WHEN QUARTER(订单日期) = 4 THEN 订单金额 ELSE 0 END) AS Q4销售额
FROM 订单表
WHERE YEAR(订单日期) = 2025
GROUP BY 产品类别;
```

**解析**：该语句使用`CASE`函数结合`SUM`聚合函数，将按季度(行)分布的销售额转换为按季度(列)展示的透视表。对于每个产品类别，分别计算每个季度的销售额，使数据以更直观的方式呈现，便于我们比较不同产品类别在各季度的销售情况。

##### 73、会话分析(Sessionization)：用户行为路径

**需求**：我们对用户的访问日志进行会话划分，分析用户的行为路径和会话特征。

```sql
-- 假设：30分钟无操作视为新会话
WITH 带间隔 AS (
    SELECT 
        用户ID,
        访问时间,
        LAG(访问时间) OVER (PARTITION BY 用户ID ORDER BY 访问时间) AS 上次访问时间,
        TIMESTAMPDIFF(MINUTE, LAG(访问时间) OVER (PARTITION BY 用户ID ORDER BY 访问时间), 访问时间) AS 间隔分钟
    FROM 用户访问日志
),
会话标记 AS (
    SELECT 
        用户ID,
        访问时间,
        SUM(CASE WHEN 间隔分钟 > 30 OR 间隔分钟 IS NULL THEN 1 ELSE 0 END) 
            OVER (PARTITION BY 用户ID ORDER BY 访问时间 ROWS UNBOUNDED PRECEDING) AS 会话ID
    FROM 带间隔
)
SELECT 
    用户ID,
    会话ID,
    MIN(访问时间) AS 会话开始,
    MAX(访问时间) AS 会话结束,
    COUNT(*) AS 页面浏览数
FROM 会话标记
GROUP BY 用户ID, 会话ID
ORDER BY 用户ID, 会话开始;
```

**解析**：会话分析是用户行为分析的重要内容，通常将30分钟无操作视为新会话。我们首先计算每个用户每次访问与上次访问的时间间隔，然后通过累加间隔大于30分钟或首次访问的标记，为每个会话分配唯一的`会话ID`。最后统计每个会话的开始时间、结束时间和页面浏览数等特征，用于我们分析用户的行为路径和会话习惯。

##### 74、漏斗转化率计算

**需求**：我们计算业务漏斗中各环节的转化率，分析用户在各环节的流失情况。

```sql
WITH funnel AS (
    SELECT 
        COUNT(DISTINCT CASE WHEN event = 'view_homepage' THEN user_id END) AS pv,
        COUNT(DISTINCT CASE WHEN event = 'add_to_cart' THEN user_id END) AS 加购,
        COUNT(DISTINCT CASE WHEN event = 'checkout' THEN user_id END) AS 下单,
        COUNT(DISTINCT CASE WHEN event = 'payment_success' THEN user_id END) AS 支付
    FROM user_events
    WHERE event_date = '2025-09-20'
)
SELECT 
    pv AS '首页访问',
    加购,
    ROUND(加购 * 100.0 / pv, 2) AS '加购转化率',
    下单,
    ROUND(下单 * 100.0 / 加购, 2) AS '下单转化率',
    支付,
    ROUND(支付 * 100.0 / 下单, 2) AS '支付转化率'
FROM funnel;
```

**解析**：漏斗分析用在跟踪用户在业务流程中从一个环节到下一个环节的转化情况。该语句通过`CASE`函数和`COUNT(DISTINCT)`分别统计漏斗各环节(首页访问、加购、下单、支付)的用户数，然后计算每个环节与上一环节的转化率。通过分析转化率，可以识别出用户流失严重的环节。我们要**注意**：在某些数据库或数据量极大的情况下，`COUNT(DISTINCT ...)`可能是性能瓶颈。我们要注意其性能开销，或者在数据量极大时考虑近似算法(如：`APPROX_COUNT_DISTINCT`)。

##### 75、用户路径分析(简单版)：统计常见路径

**需求**：分析用户在网站或应用中的行为路径，统计常见的路径及其出现次数。

```sql
SELECT 
    CONCAT_WS(' -> ', event1, event2, event3) AS 路径,
    COUNT(*) AS 路径次数
FROM (
    SELECT 
        user_id,
        NTH_VALUE(event, 1) OVER w AS event1,
        NTH_VALUE(event, 2) OVER w AS event2,
        NTH_VALUE(event, 3) OVER w AS event3
    FROM user_events
    WHERE event_date = '2025-09-20'
    WINDOW w AS (PARTITION BY user_id ORDER BY event_time ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)
) t
WHERE event1 IS NOT NULL AND event2 IS NOT NULL AND event3 IS NOT NULL
GROUP BY 路径
ORDER BY 路径次数 DESC
LIMIT 10;
```

**解析**：用户路径分析用在了解用户在产品中的行为序列。该语句使用窗口函数`NTH_VALUE`获取每个用户的前三个行为事件(`event1`、`event2`、`event3`)，然后将这些事件拼接成路径，并统计每条路径的出现次数。我们通过分析常见路径，可以了解用户的典型行为模式。

##### 76、异常值检测(IQR方法)

**需求**：使用四分位距(IQR)方法检测数据中的异常值，如：异常的订单金额。

```sql
WITH stats AS (
    SELECT 
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY 订单金额) AS Q1,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY 订单金额) AS Q3
    FROM 订单表
    WHERE 订单日期 >= '2025-01-01'
),
iqr_calc AS (
    SELECT 
        Q1,
        Q3,
        (Q3 - Q1) * 1.5 AS IQR_Threshold
    FROM stats
)
SELECT 
    订单ID,
    用户ID,
    订单金额
FROM 订单表, iqr_calc
WHERE 订单日期 >= '2025-01-01'
    AND (订单金额 < Q1 - IQR_Threshold OR 订单金额 > Q3 + IQR_Threshold);
```

**解析**：IQR(四分位距)方法是一种常用的异常值检测方法。我们首先计算数据的下四分位数(Q1，25%分位数)和上四分位数(Q3，75%分位数)，然后计算IQR = Q3 - Q1，异常值的判断标准是小于Q1 - 1.5_IQR或大于Q3 + 1.5_IQR。该语句用于检测异常的订单金额，有助于我们识别数据错误或异常的业务行为。

#### 九、进阶必学语句

##### 77、递归CTE(Recursive CTE)：处理层级结构

**需求**：处理具有层级结构的数据，如：员工-经理层级、组织架构、评论回复树等。

```sql
-- 场景：员工-经理层级、组织架构、评论回复树
WITH RECURSIVE 组织架构 AS (
    -- 锚点：CEO
    SELECT 员工ID, 姓名, 上级ID, 1 AS 层级
    FROM 员工表
    WHERE 上级ID IS NULL
    UNION ALL
    -- 递归：查找下级
    SELECT e.员工ID, e.姓名, e.上级ID, o.层级 + 1
    FROM 员工表 e
    JOIN 组织架构 o ON e.上级ID = o.员工ID
)
SELECT * FROM 组织架构 ORDER BY 层级;
```

**解析**：递归CTE由锚点部分和递归部分组成，用在处理具有递归关系的数据。锚点部分选择层级结构的根节点(如：无上级的CEO)，递归部分通过与锚点结果集连接，不断获取下一级节点，直到没有更多节点为止。此例用于展示组织架构的层级关系，可扩展到任何具有层级结构的数据处理场景，我们需理解递归终止条件、防止无限循环和层级控制。

**说明**：`WITH RECURSIVE`语法是PostgreSQL和MySQL的写法。在SQL Server和Oracle中，我们直接使用`WITH`即可。

##### 78、JSON字段解析(现代数仓必备)

**需求**：解析存储在JSON字段中的数据，提取所需的信息，适用于现代数据仓库中JSON数据的处理。

```sql
-- MySQL/PostgreSQL
SELECT 
    订单ID,
    JSON_EXTRACT(商品详情, '$.product_name') AS 商品名,
    JSON_EXTRACT(商品详情, '$.price') AS 价格
FROM 订单表;

-- PostgreSQL更简洁写法
SELECT 
    订单ID,
    商品详情->>'product_name' AS 商品名,
    (商品详情->>'price')::NUMERIC AS 价格
FROM 订单表;
```

**解析**：随着JSON数据格式的广泛使用，解析JSON字段成为现代数据处理的必备技能。`JSON_EXTRACT`函数用在从JSON字段中提取指定路径的值，PostgreSQL还提供了`->>`运算符简化JSON字段的提取。提取后的数据可能需要进行类型转换(如：将价格转换为数值类型)，我们需掌握JSON结构、路径语法、类型转换和索引优化。

##### 79、近似计算函数(海量数据性能优化)

**需求**：在处理海量数据时，使用近似计算函数快速获取估算结果，牺牲一定精度换取性能提升。

```sql
-- BigQuery/Presto/SparkSQL
SELECT 
    APPROX_COUNT_DISTINCT(用户ID) AS 近似去重用户数,
    APPROX_PERCENTILE(订单金额, 0.5) AS 近似中位数
FROM 订单表
WHERE 订单日期 >= '2025-01-01';
```

**解析**：在处理亿级以上海量数据时，精确计算可能耗时过长。近似计算函数(如：`APPROX_COUNT_DISTINCT`、`APPROX_PERCENTILE`)通过算法估算结果，大幅提升计算速度，同时保证一定的精度。适用于不需要精确结果的快速数据分析场景，我们要理解其在精度和性能之间的权衡。

##### 80、动态透视(PIVOT/动态SQL)：灵活报表

**需求**：生成动态的数据透视表，根据数据自动调整列，用于灵活的报表生成。

```sql
-- SQL Server PIVOT(静态)
SELECT *
FROM (
    SELECT 产品类别, QUARTER(订单日期) AS 季度, 订单金额
    FROM 订单表
) src
PIVOT (
    SUM(订单金额)
    FOR 季度 IN ([1], [2], [3], [4])
) pvt;

-- MySQL 动态SQL(需存储过程或应用层拼接)
SET @sql = NULL;
SELECT GROUP_CONCAT(
    DISTINCT CONCAT('SUM(CASE WHEN QUARTER(订单日期) = ', 季度, ' THEN 订单金额 ELSE 0 END) AS Q', 季度)
) INTO @sql
FROM (SELECT DISTINCT QUARTER(订单日期) AS 季度 FROM 订单表) t;

SET @sql = CONCAT('SELECT 产品类别, ', @sql, ' FROM 订单表 GROUP BY 产品类别');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
```

**解析**：静态PIVOT需要预先指定转换后的列，而动态透视可以根据数据自动生成列，更灵活。SQL Server提供了`PIVOT`关键字实现静态透视，MySQL则需要通过动态SQL拼接实现。我们需掌握静态PIVOT语法和动态SQL生成方法，理解列转行的逻辑，适用于需要根据不同数据动态生成报表的场景。

**说明**：此动态SQL需在支持变量和预处理语句的环境中执行(如：MySQL命令行、存储过程或应用层)。

##### 81、MERGE语句(数仓增量更新神器)

**需求**：在数据仓库中实现增量更新，根据匹配条件对目标表进行插入、更新操作。

```sql
-- Oracle/SQL Server/PostgreSQL 15+
MERGE INTO 目标表 t
USING 源表 s
ON t.主键 = s.主键
WHEN MATCHED THEN
    UPDATE SET t.列1 = s.列1, t.更新时间 = NOW()
WHEN NOT MATCHED THEN
    INSERT (主键, 列1, 创建时间) VALUES (s.主键, s.列1, NOW());
```

**解析**：`MERGE`语句用在将源表的数据合并到目标表中，根据`ON`子句的匹配条件，当匹配时更新目标表的记录，不匹配时插入新记录。它替代了传统的“DELETE+INSERT”方式，高效实现数据的增量同步，特别适用于数据仓库中维度表和缓慢变化维的更新。

##### 82、采样查询(SAMPLE/TABLESAMPLE)：数据探查加速

**需求**：从大量数据中抽取样本进行快速探查，加速数据理解和SQL调试。

```sql
-- PostgreSQL
SELECT * FROM 用户表 TABLESAMPLE SYSTEM (1); -- 约1%数据

-- BigQuery
SELECT * FROM 用户表 WHERE RAND() < 0.01 LIMIT 10000;

-- Hive
SELECT * FROM 用户表 TABLESAMPLE (1 PERCENT);
```

**解析**：采样查询用于从海量数据中抽取部分样本，快速了解数据分布、验证数据质量或调试SQL语句，避免全表扫描带来的性能开销。不同数据库提供了不同的采样方法，如：`TABLESAMPLE`关键字或使用随机函数。我们需掌握不同数据库的采样语法，理解采样在数据探查和SQL调试中的应用价值。

##### 83、执行计划深度调优(EXPLAIN+索引策略)

**需求**：我们通过分析执行计划，结合索引策略，对SQL查询进行深度性能调优。

```sql
-- MySQL
EXPLAIN FORMAT=JSON 
SELECT * FROM 订单表 
WHERE 用户ID = 123 AND 订单日期 > '2025-01-01';

-- 关键看：
-- "type": "ref"(好) vs "ALL"(全表扫描，差)
-- "key": "idx_user_date"(是否命中复合索引)
-- "rows": 预估扫描行数(越小越好)

-- 创建复合索引
CREATE INDEX idx_user_date ON 订单表(用户ID, 订单日期);
```

**解析**：`EXPLAIN`语句用在生成SQL查询的执行计划，我们通过分析执行计划中的关键信息(如：访问类型`type`、使用的索引`key`、预估扫描行数`rows`)，可以识别查询的性能瓶颈。创建合适的索引(如：复合索引`idx_user_date`)可以显著提升查询性能。如何读懂执行计划，了解索引失效的场景和复合索引的最左前缀原则，这是SQL性能调优的主要技能。

**说明**：其他数据库，如：PostgreSQL使用`EXPLAIN ANALYZE`，SQL Server使用`SET STATISTICS IO, TIME ON`或图形化执行计划。

##### 84、窗口函数RANGE vs ROWS：精确控制窗口边界

**需求**：在窗口函数中精确控制窗口的边界，根据行数或值范围定义窗口。

```sql
-- ROWS：按“行数”定义窗口(默认)
SELECT 
    日期,
    销售额,
    SUM(销售额) OVER (
        ORDER BY 日期 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS 最近3天滚动和
FROM 日销售表;

-- RANGE：按“值范围”定义窗口(适合时间/数值连续场景)
SELECT 
    日期,
    销售额,
    AVG(销售额) OVER (
        ORDER BY 日期 
        RANGE BETWEEN INTERVAL 2 DAY PRECEDING AND CURRENT ROW
    ) AS 最近3天(含当天)移动平均
FROM 日销售表;
```

**解析**：窗口函数中的`ROWS`和`RANGE`用在定义窗口的边界。`ROWS`按物理行数偏移定义窗口(如：“前2行到当前行”)，`RANGE`按逻辑值范围偏移定义窗口(如：“过去2天内到当前日期”)。`RANGE`更适合时间序列或数值连续的场景，能准确按值范围计算滚动指标。我们理解了两者的区别，就能根据数据特点选择合适的窗口定义方式。

##### 85、临时表 vs CTE vs 子查询：性能与复用权衡

**需求**：根据查询的复杂度、数据量和复用需求，我们选择合适的临时数据处理方式。

```sql
-- 方式1：CTE(逻辑清晰，但可能重复计算)
WITH 月度汇总 AS (
    SELECT 用户ID, SUM(金额) AS 月消费
    FROM 订单表 
    WHERE 月份 = '2025-09'
    GROUP BY 用户ID
)
SELECT * FROM 月度汇总 WHERE 月消费 > 1000
UNION ALL
SELECT * FROM 月度汇总 WHERE 月消费 < 100;

-- 方式2：临时表(物化存储，适合多次引用或大数据)
CREATE TEMPORARY TABLE tmp_月度汇总 AS
SELECT 用户ID, SUM(金额) AS 月消费
FROM 订单表 
WHERE 月份 = '2025-09'
GROUP BY 用户ID;

SELECT * FROM tmp_月度汇总 WHERE 月消费 > 1000;
SELECT * FROM tmp_月度汇总 WHERE 月消费 < 100;
DROP TEMPORARY TABLE tmp_月度汇总;

-- 方式3：子查询(一次性，优化器可能内联)
SELECT * FROM (
    SELECT 用户ID, SUM(金额) AS 月消费
    FROM 订单表 
    WHERE 月份 = '2025-09'
    GROUP BY 用户ID
) t WHERE 月消费 > 1000;
```

**解析**：CTE(公用表表达式)逻辑清晰，支持递归，但多次引用可能重复执行；临时表物化存储结果，适合大数据量和多次复用的场景，但需要显式管理生命周期；子查询轻量级，优化器可能内联优化，但嵌套过深难以维护。我们需根据查询的具体情况(如：复杂度、数据量、复用次数)权衡性能和可读性，选择合适的方式。

**说明**：`CREATE TEMPORARY TABLE ... AS SELECT ...`，SQL Server不支持直接以上语法，SQL Server使用`SELECT ... INTO #TempTable FROM ...`。

##### 86、权限控制基础(GRANT/REVOKE)：数据安全必备

**需求**：管理数据库用户的权限，保证数据安全，我们要遵循最小权限原则。

```sql
-- 授予用户查询权限(最小权限原则)
GRANT SELECT ON 数据库.订单表 TO '分析师'@'localhost';

-- 授予视图查询权限(封装敏感字段)
GRANT SELECT ON 数据库.活跃用户视图 TO '实习生'@'%';

-- 撤销更新权限
REVOKE UPDATE ON 数据库.用户表 FROM '运营'@'%';

-- 查看用户权限
SHOW GRANTS FOR '分析师'@'localhost';
```

**解析**：`GRANT`用在授予用户权限，`REVOKE`用在撤销用户权限。在实际应用中，我们必须遵循最小权限原则，只授予用户完成工作所必需的权限。通过授予视图权限而非基表权限，可以封装敏感字段，增强数据安全性。我们定期使用`SHOW GRANTS`查看用户权限并进行审计。

##### 87、动态数据脱敏(Dynamic Data Masking)：SQL Server/Oracle专属

**需求**：对敏感数据进行动态脱敏，不同角色看到不同的数据，满足合规要求。

```
-- SQL Server示例：对邮箱列自动脱敏
ALTER TABLE 用户表
ALTER COLUMN 邮箱 ADD MASKED WITH (FUNCTION = 'email()');

-- 或自定义脱敏规则
ALTER TABLE 用户表
ALTER COLUMN 手机号 ADD MASKED WITH (FUNCTION = 'partial(1,"XXX",2)');

-- 效果：普通用户查询 → 'aXXX@b.com'或'1XXX89'
-- 权限用户(UNMASK)可查看原文：
GRANT UNMASK TO 管理员;
```

**解析**：动态数据脱敏在数据库层自动对敏感数据进行脱敏处理，无需修改应用代码。不同角色的用户看到不同的数据，普通用户看到脱敏后的数据(如：邮箱显示为`aXXX@b.com`)，具有`UNMASK`权限的管理员可以查看原始数据。适用于开发/测试环境使用数据副本、报表系统隐藏敏感信息等场景。我们需了解其实现方式和适用场景，注意脱敏不等同于加密，数据存储仍是明文。

##### 88、物化视图(Materialized View)：预计算加速复杂查询

**需求**：对复杂的聚合查询进行预计算并存储结果，加速后续查询，适用于大数据报表。

```sql
-- PostgreSQL示例
CREATE MATERIALIZED VIEW mv_月度销售汇总 AS
SELECT 
    DATE_TRUNC('month', 订单日期) AS 月份,
    产品类别,
    SUM(订单金额) AS 总销售额,
    COUNT(*) AS 订单数
FROM 订单表
GROUP BY 1, 2;

-- 查询物化视图(秒级响应)
SELECT * FROM mv_月度销售汇总 WHERE 月份 = '2025-09-01';

-- 定期刷新(手动或定时任务)
REFRESH MATERIALIZED VIEW mv_月度销售汇总;
```

**解析**：物化视图存储查询结果的物理数据，不同于普通视图只保存SQL逻辑。查询物化视图时直接读取预计算的结果，响应速度极快，适用于复杂聚合查询和大数据报表场景。但物化视图的数据不是实时的，需要我们手动或定时刷新。

**说明**：`DATE_TRUNC('month', ...)`，这是PostgreSQL的语法；MySQL中可使用`DATE_FORMAT(日期, '%Y-%m-01')`来实现类似效果。

##### 89、查询提示(Query Hints)：强制优化器走指定路径

**需求**：在特定情况下，我们可强制数据库优化器使用指定的索引或执行路径，临时解决性能问题。

```sql
-- SQL Server：强制使用索引
SELECT * FROM 订单表 WITH (INDEX(idx_user_date))
WHERE 用户ID = 123 AND 订单日期 > '2025-01-01';

-- MySQL：强制使用索引(USE INDEX)
SELECT * FROM 订单表 USE INDEX (idx_user_date)
WHERE 用户ID = 123 AND 订单日期 > '2025-01-01';

-- Oracle：提示走全表扫描(FULL)或索引(INDEX)
SELECT /*+ FULL(订单表) */ * FROM 订单表 WHERE ...;
SELECT /*+ INDEX(订单表 idx_user_date) */ * FROM 订单表 WHERE ...;
```

**解析**：查询提示(Hint)用在强制优化器使用指定的执行路径，如：特定的索引或全表扫描。在优化器做出错误决策(如：未使用合适的索引)时，可临时使用Hint解决性能问题。但我们需谨慎使用，因为优化器通常能做出更优的决策，长期使用Hint可能导致性能随数据增长而恶化。我们需了解常见的Hint类型，结合`EXPLAIN`验证Hint是否生效，实际应用应优先优化索引和统计信息。

##### 90、表分区(Partitioning)：亿级数据查询性能基石

**需求**：对亿级大表进行分区，将数据分散存储，提高查询性能，便于数据管理。

```sql
-- MySQL RANGE分区示例(按年月)；MySQL 5.7+支持RANGE COLUMNS和更直接的日期分区(虽然底层还是转为整数)。
CREATE TABLE 用户行为日志 (
    id BIGINT,
    user_id INT,
    event_type VARCHAR(50),
    event_time DATETIME,
    data JSON
)
PARTITION BY RANGE (YEAR(event_time) * 100 + MONTH(event_time)) (
    PARTITION p202501 VALUES LESS THAN (202502),
    PARTITION p202502 VALUES LESS THAN (202503),
    PARTITION p202503 VALUES LESS THAN (202504),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- 查询2025年1月数据 → 只扫描p202501分区
SELECT COUNT(*) FROM 用户行为日志 
WHERE event_time >= '2025-01-01' AND event_time < '2025-02-01';
```

**解析**：表分区将大表按指定规则(如：RANGE、LIST)拆分为多个小分区，每个分区可独立存储和管理。我们查询时，数据库通过分区裁剪(Partition Pruning)只扫描符合条件的分区，大幅减少IO操作，提高查询性能。适用于日志表、订单表等时间序列或大表，我们需掌握分区键的选择(高频过滤字段)，避免跨分区JOIN，定期维护分区(新增、归档)。

##### 91、分桶(Bucketing/Clustering)：数据预排序加速JOIN与聚合

**需求**：将数据按指定列分桶，使相同值的数据物理存储在一起，加速JOIN和聚合操作。

```sql
-- BigQuery CLUSTERED BY(类似分桶)
CREATE TABLE 订单表_clustered
CLUSTER BY 用户ID, DATE(订单日期)
AS SELECT * FROM 原始订单表;

-- Hive分桶示例
CREATE TABLE 订单表_bucketed (
    订单ID STRING,
    用户ID INT,
    金额 DECIMAL(10,2)
)
CLUSTERED BY (用户ID) INTO 32 BUCKETS;

-- 效果：相同用户ID的数据物理存储在一起 → JOIN用户表时大幅减少Shuffle
```

**解析**：分桶(Bucketing)或聚类(Clustering)将数据按指定列的哈希值分散到固定数量的桶中，使相同值的数据物理存储在一起。这在JOIN操作(如：按用户ID关联订单表和用户表)时可大幅减少数据洗牌(Shuffle)，在聚合和排序操作中也能提升性能。与分区不同，分桶适用于高基数的JOIN键，我们需注意分桶数的选择(通常为2的幂)，BigQuery的`CLUSTER BY`是更灵活的“软分桶”，我们推荐优先使用。

##### 92、事务隔离级别与锁机制：避免脏读、幻读、死锁

**需求**：理解并设置合适的事务隔离级别，使用锁机制，避免并发操作导致的脏读、幻读和死锁问题。

```sql
-- MySQL查看/设置隔离级别
SELECT @@transaction_isolation;
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 显式加锁(悲观锁)
SELECT * FROM 库存表 WHERE 商品ID = 1001 FOR UPDATE; -- 排他锁
SELECT * FROM 用户表 WHERE ID = 123 LOCK IN SHARE MODE; -- 共享锁

-- 乐观锁实现(无锁，用版本号)
UPDATE 订单表 
SET 状态 = '已支付', version = version + 1 
WHERE 订单ID = 'ORD2025' AND version = 5; -- version为当前版本
-- 检查影响行数：若=0，说明并发修改，需重试
```

**解析**：事务隔离级别控制并发事务之间的相互影响，从低到高有`READ UNCOMMITTED`、`READ COMMITTED`、`REPEATABLE READ`、`SERIALIZABLE`，分别解决脏读、不可重复读、幻读等问题。锁机制包括悲观锁(如：`FOR UPDATE`)和乐观锁(如：版本号控制)，用于保证数据一致性。OLTP系统常用`READ COMMITTED`+乐观锁，报表系统常用`REPEATABLE READ`。我们需理解不同隔离级别的特点和锁机制的使用场景，掌握死锁检测和处理方法。

##### 93、系统表与元数据查询：自动化管理的基石

**需求**：查询数据库系统表和元数据，获取表结构、大小、索引使用情况等信息，用在自动化管理和监控。

```sql
-- MySQL：查询所有表及行数(近似值)
SELECT 
    table_name, 
    table_rows 
FROM information_schema.tables 
WHERE table_schema = 'your_db';

-- PostgreSQL：查询表大小
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(tablename)) AS total_size
FROM pg_tables 
WHERE schemaname = 'public';

-- SQL Server：查询索引使用情况
SELECT 
    OBJECT_NAME(i.object_id) AS table_name,
    i.name AS index_name,
    s.user_seeks,
    s.user_scans
FROM sys.indexes i
JOIN sys.dm_db_index_usage_stats s ON i.object_id = s.object_id AND i.index_id = s.index_id
WHERE OBJECT_NAME(i.object_id) = '订单表';

-- Oracle：查询表注释
SELECT table_name, comments FROM all_tab_comments WHERE owner = 'SCOTT';
```

**解析**：数据库系统表存储了元数据信息，如：表结构、索引、权限等。查询这些信息可以实现自动化管理任务，如：定期扫描无用索引、监控大表增长、检查未注释字段等。我们通过分析索引使用率，可以识别低效索引并进行优化。熟悉不同数据库的系统表结构，我们可利用元数据构建自动化管理工具和监控系统。

##### 94、跨库联邦查询(Federated Query)：打破数据孤岛

**需求**：查询分布在不同数据库或数据存储中的数据，打破数据孤岛，实现跨数据源分析。

```sql
-- BigQuery：跨项目/跨云查询
SELECT *
FROM `project_a.dataset.table_a` a
JOIN `project_b.dataset.table_b` b ON a.user_id = b.user_id;

-- PostgreSQL+postgres_fdw(访问远程PG表)
CREATE EXTENSION postgres_fdw;
CREATE SERVER remote_server FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host '192.168.1.100');
CREATE USER MAPPING FOR current_user SERVER remote_server OPTIONS (user 'remote_user', password 'xxx');
CREATE FOREIGN TABLE remote_orders (...) SERVER remote_server OPTIONS (table_name 'orders');

-- Trino(原PrestoSQL)统一查询
SELECT *
FROM mysql.sales.orders a
JOIN hive.dw.user_profile b ON a.user_id = b.user_id
JOIN postgresql.reporting.sales_target c ON a.product_id = c.product_id;
```

**解析**：跨库联邦查询允许在一个查询中访问多个不同的数据源(如：不同数据库、不同项目、不同云平台)，打破数据孤岛。BigQuery支持跨项目查询，PostgreSQL通过`postgres_fdw`扩展访问远程表，Trino等工具则提供了统一的查询入口，支持多种数据源。适用于数据湖架构、多云环境和实时+离线数据联合分析。

##### 95、SQL自动化生成与模板引擎：解放重复劳动

**需求**：使用模板引擎动态生成SQL语句，减少重复劳动，提高我们的SQL编写效率。

```sql
# Python + Jinja2动态生成SQL
from jinja2 import Template

sql_template = """
SELECT 
    {{ group_col }},
    COUNT(*) AS cnt,
    SUM({{ metric_col }}) AS total
FROM {{ table_name }}
WHERE {{ date_col }} BETWEEN '{{ start_date }}' AND '{{ end_date }}'
GROUP BY {{ group_col }}
ORDER BY total DESC
LIMIT {{ limit }};
"""

template = Template(sql_template)
sql = template.render(
    group_col='产品类别',
    metric_col='订单金额',
    table_name='订单表',
    date_col='订单日期',
    start_date='2025-01-01',
    end_date='2025-12-31',
    limit=10
)
print(sql) # 生成最终SQL，可执行
```

**解析**：使用模板引擎(如：Jinja2)可以定义SQL模板，通过参数替换生成具体的SQL语句，避免重复编写相似的SQL代码。这在需要生成大量类似查询(如：按不同维度、不同时间范围的报表)时非常有用，提高了代码复用性和维护性。进阶玩法包括配置驱动(通过YAML/JSON定义指标生成SQL)、结合dbt等工具管理数据模型。我们需注意避免SQL注入，保证模板的可读性和版本控制。

##### 96、AI辅助SQL编写(LLM+SQL)

**需求**：利用大语言模型(LLM)辅助编写SQL语句，提高我们的SQL编写效率。

```sql
用户自然语言提问：
“帮我查一下2025年9月复购率最高的前10个用户，显示他们的总消费和订单数”

LLM(如：GPT-4、Claude等)输出SQL：

WITH 复购用户 AS (
    SELECT 
        用户ID,
        COUNT(*) AS 订单数,
        SUM(订单金额) AS 总消费
    FROM 订单表
    WHERE 订单日期 >= '2025-09-01' AND 订单日期 < '2025-10-01'
    GROUP BY 用户ID
    HAVING COUNT(*) >= 2
)
SELECT 
    用户ID,
    订单数,
    总消费
FROM 复购用户
ORDER BY 订单数 DESC, 总消费 DESC
LIMIT 10;
```

**解析**：大语言模型(LLM)可以将自然语言描述转换为SQL语句，辅助数据分析师快速编写查询。使用时，我们通过明确表结构、字段含义和业务逻辑来优化提示词(Prompt)，生成SQL后需人工审核和使用`EXPLAIN`验证，确保正确性和性能。目前LLM只是辅助工具，我们仍需掌握SQL逻辑和性能优化，同时注意数据安全，避免敏感信息泄露。

##### 97、SQL代码质量与规范

**需求**：遵循SQL代码质量和规范，提高代码可读性、可维护性和安全性，便于团队协作。

```sql
-- 反面教材
select * from orders where userid=123;

-- 正面示范(符合规范)
SELECT
    order_id,
    user_id,
    order_amount,
    order_date
FROM dwd.fact_order -- 使用分层命名
WHERE user_id = 123
    AND order_date >= '2025-01-01' -- 明确时间范围
ORDER BY order_date DESC
LIMIT 1000; -- 防止误操作返回海量数据
```

**解析**：良好的SQL代码规范包括命名规范(如：使用`snake_case`、分层命名)、格式规范(关键字大写、适当缩进)、安全规范(禁止`SELECT *`、必须带`LIMIT`)、性能规范(避免不必要的`DISTINCT`、合理使用索引)和注释规范(复杂逻辑添加注释)。遵循这些规范，可以提高代码的可读性和可维护性，减少错误，便于我们团队协作。