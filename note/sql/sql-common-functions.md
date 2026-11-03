---
title: SQL常用函数分类手册，14大类170余个函数含主流数据库差异标注
lastUpdated: 2026-09-12 04:00:00
---


SQL中的每个函数都是一个“现成的小工具”，14类170+函数就能帮我们解决170+种常见需求，帮我们快速完成特定操作，而不用我们自己写一堆代码。我们用的时候直接“喊”函数名，给它需要的参数，它就返回结果，省事又准确。从基础统计（如：求和、计数）到复杂分析（如：排名、滚动计算），都能帮我们高效地操作数据。下面介绍的SQL函数兼容MySQL、SQL Server、Oracle、PostgreSQL（差异已标注）等主流数据库，新手能快速上手，老手可随时查阅。无论清洗数据还是生成报表，记住这些函数就能帮我们省时省力。

#### 一、聚合函数（Aggregate Functions）

聚合函数用在对一组数据进行统计计算，返回单一结果，常与`GROUP BY`子句配合使用，适用于汇总分析场景。常用函数：

*   `COUNT(*)`：统计总行数，包含NULL值。
    
*   `COUNT(列名)`：统计指定列中非NULL值的数量。
    
*   `SUM(列名)`：对数值型列求和，自动忽略NULL值。
    
*   `AVG(列名)`：计算数值列的平均值，忽略NULL。NULL值处理公式：`SUM(col) / COUNT(col)`。
    
*   `MAX(列名)`和`MIN(列名)`：分别返回列中的最大值和最小值，支持数值、字符串和日期类型。
    
*   `COUNT(DISTINCT 列名)`：统计去重后的非NULL值数量，常用在唯一用户、商品等统计。
    
*   `GROUP_CONCAT(列名)`：MySQL特有，将分组中的列值连接成一个字符串（如：`GROUP_CONCAT(name SEPARATOR ',')`）。
    
*   `STRING_AGG(列名, '分隔符')`：SQL Server和PostgreSQL特有，功能类似`GROUP_CONCAT`。
    
*   `LISTAGG(列名, ',') WITHIN GROUP (ORDER BY ...)`：Oracle特有。（此处应该换行，搞忘记另起有行了）扩展函数（部分数据库支持）：
    
*   `VAR_POP()`或`VARIANCE()`：计算总体方差。
    
*   `VAR_SAMP()`：计算样本方差。
    
*   `STDDEV_POP()`：计算总体标准差。
    
*   `STDDEV_SAMP()`：计算样本标准差。
    
*   `PERCENTILE_CONT(0.5)`：计算连续百分位数（中位数）。
    
*   `PERCENTILE_DISC(0.5)`：计算离散百分位数。
    

性能优化：处理亿级数据时避免`COUNT(DISTINCT)`，改用：

*   `APPROX_COUNT_DISTINCT()`（SQL Server/Oracle）
    
*   HyperLogLog算法（PostgreSQL）
    

注意一下：除`COUNT(*)`外，所有聚合函数均自动忽略NULL值。我们可结合`DISTINCT`关键字实现去重聚合，如：`SUM(DISTINCT amount)`。在Oracle中，`WM_CONCAT()`是过时的聚合函数，我们建议使用`LISTAGG()`替代。

#### 二、字符串函数（String Functions）

字符串函数用在处理文本数据，包括拼接、截取、格式化、替换等操作。常用函数：

*   `CONCAT(str1, str2, ...)`：将多个字符串拼接成一个，是标准SQL写法。
    
*   `||`：在PostgreSQL和Oracle中作为拼接操作符使用，如：`'Hello' || ' ' || 'World'`。
    
*   `SUBSTRING(str, 起始位置, 长度)`：从字符串中截取子串，起始位置从1开始计数。MySQL和PostgreSQL支持此写法；Oracle和SQL Server使用`SUBSTR`。
    
*   `LENGTH(str)`：返回字符串的字符长度（MySQL、PostgreSQL）；SQL Server使用`LEN(str)`；Oracle使用`LENGTHB()`按字节计算。
    
*   `UPPER(str)`和`LOWER(str)`：将字符串转换为大写或小写。
    
*   `TRIM(str)`：去除字符串首尾空格；SQL Server 支持`LTRIM()`（去左空格）和`RTRIM()`（去右空格）。
    
*   `REPLACE(str, 旧子串, 新子串)`：将字符串中的指定子串替换为新内容，常用在清洗数据，如：去除电话中的`-`符号。
    
*   `CHARINDEX('子串', str)`：SQL Server中查找子串位置；PostgreSQL使用`POSITION('子串' IN str)`；MySQL支持两者。
    
*   `LEFT(str, n)`：取字符串左侧前n个字符。
    
*   `RIGHT(str, n)`：取右侧后n个字符。
    
*   `REPEAT(str, n)`：将字符串重复n次（MySQL、PostgreSQL）；SQL Server使用`REPLICATE(str, n)`。
    
*   `INSTR(str, 子串)`：Oracle中查找子串位置，返回起始索引。
    
*   `LPAD(str, 长度, 填充字符)`：左填充字符串到指定长度。
    
*   `RPAD(str, 长度, 填充字符)`：右填充字符串到指定长度。
    
*   `REGEXP_LIKE(str, 正则)`：MySQL、Oracle、PostgreSQL支持正则匹配。
    
*   `REGEXP_REPLACE(str, 正则, 替换)`：正则替换函数（MySQL、PostgreSQL）。
    
*   `SPLIT_PART(str, 分隔符, 索引)`：PostgreSQL特有，按分隔符分割字符串并返回指定部分。
    

安全警示：防止SQL注入攻击：

```
-- MySQL安全写法
CONCAT('安全', QUOTE(用户输入))
-- SQL Server安全写法
CONCAT('安全', STRING_ESCAPE(用户输入, 'json'))
```

字符集转换：

```
-- MySQL字符集转换
CONVERT('中文', 'UTF8', 'GBK')
-- Oracle字符集转换
NLS_CHARSET_CONVERT(text, 'AL32UTF8')
```

正则高级应用：

```
-- 邮箱格式验证（MySQL 8.0+）
WHERE REGEXP_LIKE(email, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
-- 文本脱敏（Oracle）
REGEXP_REPLACE(phone, '(\d{3})\d{4}(\d{4})', '\1****\2')
```

提示一下：现代数据库支持正则表达式函数，如：`REGEXP_LIKE()`、`REGEXP_REPLACE()`，可用在复杂文本匹配与替换。Oracle中使用`REGEXP_SUBSTR()`进行正则提取。

#### 三、日期与时间函数（Date & Time Functions）

用在获取、提取、计算和格式化日期时间数据。常用函数：

*   `CURRENT_DATE`：获取当前日期（标准SQL）；MySQL使用`CURDATE()`。
    
*   `CURRENT_TIME`：获取当前时间；MySQL使用`CURTIME()`。
    
*   `CURRENT_TIMESTAMP`或`NOW()`：获取当前日期时间；`SYSDATE`在Oracle和MySQL中表示实时系统时间。
    
*   `YEAR(date)`、`MONTH(date)`、`DAY(date)`：分别提取年、月、日部分。
    
*   `EXTRACT(部分 FROM date)`：标准语法，推荐使用，如：`EXTRACT(HOUR FROM time)`。
    
*   `DATEPART(部分, date)`：SQL Server特有，功能类似`EXTRACT`。
    
*   `DATE_ADD(date, INTERVAL n 单位)`和`DATE_SUB(...)`：MySQL中用在加减时间，如：`DATE_ADD(NOW(), INTERVAL 7 DAY)`。
    
*   `DATEADD(单位, n, date)`：SQL Server对应函数。
    
*   `DATEDIFF(date1, date2)`：MySQL中计算两个日期之间的天数差；SQL Server写法为：`DATEDIFF(day, d1, d2)`。
    
*   `TIMESTAMPDIFF(单位, d1, d2)`：MySQL支持多种单位（如：month、year）的差值计算。
    
*   `DATE_TRUNC('单位', date)`：PostgreSQL特有，用在截断日期到指定精度，如：`DATE_TRUNC('month', now())`返回当月第一天。
    
*   `DATE_FORMAT(date, '格式')`：MySQL中格式化日期输出，如：`'%Y-%m-%d'`。
    
*   `TO_CHAR(date, '格式')`：Oracle和PostgreSQL中的格式化函数，如：`TO_CHAR(sysdate, 'YYYY-MM-DD HH24:MI')`。
    
*   `TO_DATE(字符串, '格式')`：Oracle和PostgreSQL中字符串转日期。
    
*   `LAST_DAY(date)`：MySQL和Oracle中返回指定日期所在月的最后一天。
    
*   `MONTHS_BETWEEN(date1, date2)`：Oracle中计算两个日期之间的月数差。
    
*   `ADD_MONTHS(date, n)`：Oracle中增加月份。
    
*   `NEXT_DAY(date, '星期')`：Oracle中返回下一个指定星期几的日期。
    
*   `EOMONTH(date)`：SQL Server中返回月末日期。
    

时区陷阱：

```
-- 安全写法（跨库兼容）
CONVERT_TZ(NOW(), 'SYSTEM', 'Asia/Shanghai')            /* MySQL */
(SYSDATE AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Shanghai' /* Oracle */
```

日期计算优化：避免索引失效

```
/* 错误示例（索引失效） */
WHERE DATE_ADD(date_col, INTERVAL 1 DAY) > NOW()

/* 正确写法 */
WHERE date_col > DATE_SUB(NOW(), INTERVAL 1 DAY)
```

时间序列生成：

```
-- PostgreSQL时间序列
GENERATE_SERIES('2025-01-01', '2025-01-31', INTERVAL '1 DAY')
```

注意一下：`NOW()`在事务中可能保持不变，而`SYSDATE`实时更新，我们使用时要注意场景。Oracle中 `SYSDATE`和`SYSTIMESTAMP`区分是否包含时区信息。

#### 四、数学函数（Mathematical Functions）

用在执行数值计算，包括基本运算、取整、幂、对数、三角函数等。常用函数：

*   `ABS(n)`：返回数值的绝对值。
    
*   `MOD(n1, n2)`：取余运算，MySQL和PostgreSQL 使用；SQL Server使用`%`操作符；Oracle使用`MOD(n1, n2)`。
    
*   `ROUND(n, 小数位)`：四舍五入到指定小数位。
    
*   `CEIL(n)`或`CEILING(n)`：向上取整。
    
*   `FLOOR(n)`：向下取整。
    
*   `POWER(n, exp)`：计算n的exp次幂。
    
*   `EXP(n)`：计算自然指数`e^n`。
    
*   `LOG(n)`或`LN(n)`：自然对数。
    
*   `LOG10(n)`：以10为底的对数。
    
*   `SQRT(n)`：平方根。
    
*   `SIGN(n)`：返回数值的符号（1 正，0 零，-1 负）。
    
*   `RAND()`：MySQL中生成 \[0,1)的随机数；PostgreSQL使用`RANDOM()`；SQL Server使用`NEWID()`生成GUID；Oracle使用`DBMS_RANDOM.VALUE()`。
    
*   `ACOS(n)`、`ASIN(n)`、`ATAN(n)`：反三角函数。
    
*   `COS(n)`、`SIN(n)`、`TAN(n)`：三角函数。
    
*   `RADIANS(n)`：角度转弧度。
    
*   `DEGREES(n)`：弧度转角度。
    
*   `PI()`：返回圆周率 π。
    
*   `TRUNC(n, 小数位)`：Oracle和PostgreSQL中截断小数（不四舍五入）。
    

财务精度：

```sql
-- 安全除法
SELECT ROUND(amt1 / NULLIF(amt2,0), 2) AS safe_ratio
-- 随机采样优化
ORDER BY RAND() LIMIT 1000       /* MySQL */
TABLESAMPLE SYSTEM (10)          /* PostgreSQL */
```

科学计算：

```
LOG(2, col)        /* 以2为底对数（MySQL 8.0+）*/
CORR(x_col, y_col) /* 相关系数（Oracle/PostgreSQL） */
```

应用场景：`ROUND()`常用在财务计算；`FLOOR()`和`CEIL()`可用在分页逻辑。Oracle中`MOD()`函数支持负数运算，与MySQL行为一致。

#### 五、转换函数（Conversion Functions）

实现不同数据类型之间的转换，如：字符串转日期、数值转字符串等。常用函数：

*   `CAST(表达式 AS 类型)`：标准SQL转换方式，推荐优先使用，如：`CAST('2025-01-01' AS DATE)`。
    
*   `CONVERT(类型, 表达式)`：SQL Server和MySQL支持，功能类似`CAST`，部分支持格式化。
    
*   `TRY_CAST(表达式 AS 类型)`：SQL Server和PostgreSQL支持，转换失败返回`NULL`而非报错，提升代码健壮性。
    
*   `TRY_CONVERT(...)`：同上，SQL Server特有。
    
*   `TO_CHAR(数值或日期, '格式')`：Oracle和PostgreSQL中将数值或日期转为格式化字符串。
    
*   `TO_NUMBER(字符串, '格式')`：Oracle中字符串转数值。
    
*   `TO_DATE(字符串, '格式')`：Oracle和PostgreSQL中字符串转日期。
    
*   `FORMAT(值, '格式', '区域')`：SQL Server中用在格式化输出，如：货币、日期。
    
*   `PARSE(字符串 AS 类型, '格式')`：SQL Server中将格式化字符串转为日期/时间。
    
*   `TO_BINARY(字符串)`：MySQL中字符串转二进制。
    
*   `FROM_BASE64(字符串)`：MySQL中Base64解码。
    
*   `TO_BASE64(字符串)`：MySQL中Base64编码。
    

智能转换：

```
-- SQL Server错误抵御
TRY_CAST('2025-13-01' AS DATE)   /* 返回NULL替代报错 */
-- Oracle智能解析
TO_TIMESTAMP_TZ('2025-07-29 16:30 CST')  /* 带时区转换 */
```

数据脱敏：

```
CAST(credit_card AS CHAR(4)) || '****'  /* 卡号脱敏 */
TO_CHAR(salary, 'FM999,999.00')         /* 财务格式化 */
```

实践指南：我们要优先使用`CAST()`保证兼容性；涉及用户输入或不确定数据时，我们使用`TRY_CAST()`避免查询中断。Oracle中`TO_TIMESTAMP()`可将字符串转为时间戳类型。

#### 六、条件函数（Conditional Functions）

实现条件判断与空值处理，用在构建分支逻辑。常用函数：

*   `CASE WHEN 条件 THEN 结果 ELSE 默认 END`：标准条件表达式，兼容性最好，推荐使用。示例：
    
    ```
    CASE WHEN score >= 60 THEN '及格' ELSE '不及格' END
    ```
    
*   `IF(条件, 真值, 假值)`：MySQL特有简写。
    
*   `IIF(条件, 真值, 假值)`：SQL Server特有。
    
*   `COALESCE(表达式1, 表达式2, ...)`：返回第一个非NULL的表达式，常用在空值替代，如：`COALESCE(email, phone, '未知')`。
    
*   `IFNULL(表达式, 替代值)`：MySQL中空值处理。
    
*   `ISNULL(表达式, 替代值)`：SQL Server中使用。
    
*   `NVL(表达式, 替代值)`：Oracle中使用。
    
*   `NVL2(表达式1, 表达式2, 表达式3)`：Oracle特有，若表达式1非NULL则返回表达式2，否则返回表达式3。
    
*   `NULLIF(表达式1, 表达式2)`：若两个表达式相等，则返回`NULL`，否则返回表达式1。常用在防止除零错误：
    
    ```
    100 / NULLIF(sales, 0)  -- 当sales为0时返回NULL，避免报错
    ```
    
*   `CHOOSE(索引, 值1, 值2, ...)`：SQL Server特有，类似数组索引，返回指定位置的值。
    
*   `SWITCH(条件1, 值1, 条件2, 值2, ...)`：SQL Server特有，类似多个`CASE WHEN`。
    

性能比较：`CASE WHEN`在OLAP系统中比嵌套IF快3-5倍

高级应用：

```
/* 保险理赔逻辑 */
CASE 
  WHEN damage_level >= 90 THEN '全额赔偿'
  WHEN damage_level BETWEEN 70 AND 89 THEN '赔偿70%'
  WHEN damage_level > 50 OR is_vip THEN '赔偿50%'
  ELSE '拒绝赔偿'
END AS claim_strategy

/* 动态默认值 */
COALESCE(user_input, system_default, 'N/A')
```

布尔聚合：

```
SIGN(SUM(CASE WHEN is_success THEN 1 ELSE 0 END)) /* 至少一例成功 */
```

#### 七、窗口函数（Window Functions）

窗口函数在不减少行数的前提下，对"窗口"内的数据进行计算，适用于排名、滚动平均、前后行比较等分析场景。常用函数：

*   `ROW_NUMBER() OVER(...)`：为每行分配唯一序号，常用在去重或分页。
    
*   `RANK() OVER(...)`：排名函数，相同值并列，后续名次跳号（如：1,1,3）。
    
*   `DENSE_RANK() OVER(...)`：相同值并列，后续不跳号（如：1,1,2）。
    
*   `SUM(列) OVER(...)`、`AVG(列) OVER(...)`：在窗口内进行聚合计算，结果重复到每一行。
    
*   `COUNT(列) OVER(...)`：窗口内计数。
    
*   `MAX(列) OVER(...)`、`MIN(列) OVER(...)`：窗口内最值。
    
*   `LAG(列, 偏移量)`：获取当前行之前第n行的值，常用在对比上期数据。
    
*   `LEAD(列, 偏移量)`：获取之后第n行的值。
    
*   `FIRST_VALUE(列) OVER(...)`：返回窗口内第一行的值。
    
*   `LAST_VALUE(列) OVER(...)`：返回最后一行的值，通常需配合`ROWS BETWEEN`使用。
    
*   `NTILE(n) OVER(...)`：将数据平均分为n个桶，返回每行所属桶编号，常用在四分位分析。
    
*   `CUME_DIST()`：返回累积分布比例。
    
*   `PERCENT_RANK()`：返回百分比排名。
    
*   `RATIO_TO_REPORT(列) OVER(...)`：计算行值占窗口总和的比例。
    

窗口定义语法示例：

```
OVER (
  PARTITION BY 部门       -- 分组
  ORDER BY 日期           -- 排序
  ROWS BETWEEN 3 PRECEDING AND CURRENT ROW  -- 滚动窗口
  RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW  -- 基于值的范围窗口
)
```

排序陷阱：`ORDER BY`缺失会导致未定义行为

金融风控应用：

```
-- 滚动30天销售额
SUM(amount) OVER (
  PARTITION BY user_id
  ORDER BY transaction_date 
  RANGE BETWEEN INTERVAL '29' DAY PRECEDING AND CURRENT ROW
)
```

高级导航（函数）：获取绝对位置与相对位置

```
NTH_VALUE(col, 5) OVER()     /* 窗口第5行值 */
LEAD(col, 1, 0) OVER()       /* 后一行值，默认0 */
```

分区优化：

```
/* PostgreSQL并行计算优化 */
CREATE INDEX trx_idx ON transactions USING brin(user_id, date)
```

注意一下：咱们的窗口函数不能直接嵌套在聚合函数中，但可以与聚合函数结合使用。Oracle中`LISTAGG()`是聚合函数，但可通过`OVER()`实现窗口化。

#### 八、系统与元数据函数

用在获取数据库环境信息、用户、版本、对象元数据等。常用函数：

*   `CURRENT_USER`：当前登录用户（标准SQL）；MySQL使用`USER()`。
    
*   `SESSION_USER`：当前会话用户。
    
*   `DATABASE()`：MySQL中返回当前数据库名；标准SQL使用`CURRENT_SCHEMA`。
    
*   `SCHEMA_NAME()`：SQL Server中返回当前模式名。
    
*   `VERSION()`：返回数据库版本信息。
    
*   `HOST_NAME()`：SQL Server中返回客户端主机名。
    
*   `APP_NAME()`：SQL Server中返回连接的应用程序名称。
    
*   `DB_NAME()`：SQL Server中返回当前数据库名。
    
*   `OBJECT_ID('表名')`：获取表或视图的对象ID。
    
*   `COL_LENGTH('表名', '列名')`：获取列的定义长度。
    
*   `COL_NAME(表ID, 列ID)`：SQL Server中通过ID获取列名。
    
*   `TYPE_ID(类型名)`：SQL Server中获取数据类型ID。
    
*   `IIF(条件, 真值, 假值)`：SQL Server条件函数。
    
*   `SESSION_ID()`：SQL Server中返回当前会话ID。
    
*   `@@SPID`：SQL Server中返回会话进程ID。
    
*   `PG_BACKEND_PID()`：PostgreSQL中返回后端进程ID。
    
*   `SHOW VARIABLES LIKE '变量名'`：MySQL中查看系统变量。
    

元编程应用：动态SQL生成器

```sql
/* 自动化表分析（SQL Server） */
DECLARE @sql NVARCHAR(MAX) = N''
SELECT @sql += N'UPDATE STATISTICS ' + name + '; '
FROM sys.tables WHERE is_ms_shipped = 0
EXEC sp_executesql @sql
```

实时诊断：

```
PG_STAT_ACTIVITY()        /* PostgreSQL连接监控 */
DBMS_SESSION.UNIQUE_ID()  /* Oracle会话跟踪 */
```

元数据查询建议：使用系统视图（如：`INFORMATION_SCHEMA.COLUMNS`、`sys.tables`(SQL Server)、`pg_catalog`(PostgreSQL)、`USER_TAB_COLUMNS`（Oracle））进行更灵活的元数据查询。

#### 九、自定义函数（User-Defined Functions, UDF）

用户可根据业务需求创建自定义函数，封装重复逻辑。分类为：

*   **标量函数**：返回单个值，如：计算用户等级、税费等等。
    
*   **表值函数**：返回一个结果表，可用在替代复杂查询。
    
*   **聚合函数**：自定义聚合计算（SQL Server、PostgreSQL支持）。
    

应用禁忌：

1.  禁止在UDF内执行DML语句
    
2.  避免在WHERE子句调用标量UDF（全表扫描）
    
3.  分页场景禁用自定义排序UDF
    

实践指南：

```sql
/* PostgreSQL向量计算函数 */
CREATE FUNCTION vector_distance(float8[], float8[]) RETURNS float8 AS $$
  SELECT SQRT(SUM((v1[i] - v2[i])^2)) 
  FROM generate_subscripts($1,1) AS i
$$ LANGUAGE SQL IMMUTABLE;
```

限制说明：

*   UDF不能包含数据修改语句（如：`INSERT`、`UPDATE`）。
    
*   不能调用某些非确定性函数（如：`NEWID()`）在所有上下文中。
    
*   标量函数在循环中调用可能严重影响性能，应谨慎使用。
    
*   Oracle中UDF需在包（PACKAGE）中定义。
    
*   PostgreSQL中支持多种语言编写的UDF（如：PL/pgSQL、Python）。
    

#### 十、JSON函数（现代数据库必备）

随着半结构化数据普及，JSON函数成为现代数据库的重要能力。常用函数：

*   `JSON_VALUE(json, '$.键')`：从JSON中提取标量值（SQL Server、MySQL）。
    
*   `JSON_QUERY(json, '$.数组')`：提取JSON对象或数组。
    
*   `JSON_EXTRACT(json, '$.键')`：MySQL特有写法。
    
*   `JSON_OBJECT(k1,v1, k2,v2, ...)`：构建JSON对象。
    
*   `JSON_ARRAY(v1, v2, ...)`：构建JSON数组。
    
*   `ISJSON(json)`：SQL Server中验证字符串是否为合法 JSON。
    
*   `JSON_MODIFY(json, '$.键', 值)`：SQL Server中修改JSON属性。
    
*   `JSON_TABLE(json, 路径 COLUMNS(...))`：SQL Server和Oracle中将JSON扁平化为表。
    
*   `jsonb_populate_record(记录, jsonb)`：PostgreSQL中将JSONB填充到记录类型。
    
*   `jsonb_each()`和`jsonb_object_keys()`：PostgreSQL中展开JSONB对象。
    
*   `JSON_ARRAYAGG(值)`：MySQL和Oracle中将值聚合成JSON数组。
    
*   `JSON_OBJECTAGG(键, 值)`：MySQL和Oracle中将键值对聚合成JSON对象。
    

路径表达式：

```
$..price       /* 深层扫描所有price */
$.items[?(@.stock > 0)]  /* 库存大于0的项 */
```

混合查询：

```
/* MySQL 8.0混合搜索 */
WHERE category_id = 5 
  AND JSON_EXTRACT(specs, '$.weight') > 10
```

JSON Schema：

```sql
-- PostgreSQL 14+数据验证
CREATE TABLE products (
  specs JSONB CHECK (
    specs @> '{"ver":1}' 
    AND specs @@ '$.price >= 0'
  ) 
)
```

支持情况：

*   MySQL 5.7+（原生JSON支持）
    
*   SQL Server 2016+
    
*   Oracle 12c+
    
*   PostgreSQL（原生支持JSON/JSONB，功能最强大）
    
*   SQLite 3.9+（支持JSON函数）
    

#### 十一、XML函数（遗留系统支持）

部分数据库仍支持XML数据处理，主要用在遗留系统集成。常用函数：

*   `XMLTYPE(字符串)`：Oracle中将字符串转为XML类型。
    
*   `EXTRACT(xml, XPath)`：从XML中提取节点。
    
*   `XMLAGG(xml)`：Oracle中将多个XML聚合为一个。
    
*   `VALUE(xml, XPath, 类型)`：SQL Server中提取XML值并转换类型。
    
*   `nodes(XPath)`：SQL Server中将XML拆分为多行。
    

索引优化：

```
/* SQL Server XML索引 */
CREATE PRIMARY XML INDEX idx_xml ON docs(xml_col)
FOR (VALUE)  /* XPath加速 */
```

现代替代：JSON优先，XML仅用在旧系统集成

#### 十二、加密与哈希函数

用在数据加密、密码存储、数字签名等安全场景。常用函数：

*   `MD5(字符串)`：计算MD5哈希值（MySQL、PostgreSQL），不推荐用在安全场景。
    
*   `SHA1(字符串)`、`SHA2(字符串, 长度)`：计算SHA哈希（MySQL、PostgreSQL、SQL Server）。
    
*   `ENCRYPT(字符串, 密钥)`：MySQL中使用DES加密。
    
*   `AES_DECRYPT(加密数据, 密钥)`、`AES_ENCRYPT(字符串, 密钥)`：MySQL中AES加密。
    
*   `DECRYPTBYKEY(加密数据)`、`ENCRYPTBYKEY(密钥, 数据)`：SQL Server中对称加密。
    
*   `HASHBYTES('算法', 字符串)`：SQL Server中计算哈希（支持：MD2、MD4、MD5、SHA、SHA1等）。
    
*   `DBMS_CRYPTO.HASH()`：Oracle中计算哈希。
    
*   `PASSWORD(字符串)`：MySQL中密码哈希（用于认证）。
    
*   `BCRYPT(字符串)`：PostgreSQL中使用bcrypt加密（需扩展）。
    
*   `RANDOM_BYTES(n)`：MySQL中生成随机字节。
    
*   `GEN_RANDOM_UUID()`：PostgreSQL 15+中生成随机UUID。
    

密码存储规范：

```sql
-- PostgreSQL安全方案
CREATE EXTENSION pgcrypto;
INSERT INTO users 
  VALUES (crypt('password', gen_salt('bf', 12)) 

-- SQL Server 2022+实践指南
PWDCOMPARE('input', hash)       /* 恒定时间比较 */
```

国密支持：

```
SM3('message')   /* 国产SM3算法（OceanBase）*/
```

安全建议：我们永远不要使用MD5或SHA1存储密码，要优先使用bcrypt、Argon2等慢哈希算法。加密密钥要妥善管理，在SQL中避免硬编码。

#### 十三、地理空间函数（GIS）

处理地理空间数据，如：经纬度、距离计算、空间关系判断等。常用函数：

*   `ST_GeometryFromText(WKT)`：SQL Server中从Well-Known Text创建几何对象。
    
*   `ST_Point(经度, 纬度)`：PostgreSQL和MySQL中创建点对象。
    
*   `ST_Distance(geom1, geom2)`：计算两个几何对象的距离。
    
*   `ST_Within(geom1, geom2)`：判断geom1是否在geom2内部。
    
*   `ST_Intersects(geom1, geom2)`：判断两个对象是否相交。
    
*   `ST_Buffer(geom, 距离)`：创建缓冲区。
    
*   `ST_AsText(geom)`：将几何对象转为WKT字符串。
    
*   `ST_AsGeoJSON(geom)`：PostgreSQL中转为GeoJSON格式。
    
*   `ST_SRID(geom)`：获取空间参考系统ID。
    
*   `ST_Transform(geom, SRID)`：转换坐标系。
    

索引策略：

```
-- MySQL空间索引
CREATE SPATIAL INDEX idx_location ON sites(location)
WHERE MBRContains(
  ST_GeomFromText('Polygon(...)'), 
  location
)
```

空间计算：

```
ST_Area(polygon)          /* 面积计算 */
ST_ClosestPoint(line, point) /* 最近点 */
```

支持情况：

*   PostgreSQL + PostGIS扩展（功能最强大）
    
*   SQL Server 2008+
    
*   MySQL 5.7+（需启用空间扩展）
    
*   Oracle Spatial（企业级功能）
    

#### 十四、AI函数（2025扩展）

主流数据库AI集成方案：

```sql
/* Oracle Machine Learning */
PREDICTION(
  MODEL my_model USING col1, col2
) OVER() AS anomaly_score

/* PostgreSQL pg_vector */
SELECT * FROM products
ORDER BY description_embedding <=> text_to_vector('query') 
LIMIT 10

/* SQL Server ONNX集成 */
SELECT ONNX_PREDICT(@model, @input) 
FROM sys.dm_onnx_runtime_sessions
```

以上14大类170+SQL函数覆盖了从基础数据处理到复杂数据分析的绝大部分应用场景，无论是基础的数据统计、清洗及转换等等，还是进阶的排名分析、时空计算、JSON处理等等，我们都能在这些SQL函数中找到对应的函数。我们记住这些SQL常用函数，再根据实际需求，灵活搭配使用，如：用聚合函数做汇总、窗口函数算排名、日期函数处理时间序列，我们就能让SQL查询效率飞起，执行逻辑超清晰。学习ing……只要我们多练多实践，熟练掌握这些函数的用法，复杂数据问题我们会能轻松化解，会真正做到事半功倍。

最后，我们先对我们自己的学习与实践给4点具体建议，再用附录的形式给一个SQL常用函数分类速查表，让我们自己留存备用。

1、**索引安全原则**：

*   WHERE列禁止函数包装：`YEAR(date_col) = 2025` → `date_col BETWEEN '2025-01-01' AND '2025-12-31'`
    
*   计算列方案：MySQL 8.0+可创建函数索引`(YEAR(date_col))`
    

2、**跨库迁移检查清单**：

| 函数类型 | MySQL→Oracle | SQL Server→PostgreSQL |
| --- | --- | --- |
| 随机数 | `RAND()` → `DBMS_RANDOM.VALUE()` | `NEWID()` → `GEN_RANDOM_UUID()` |
| 分页 | `LIMIT` → `ROWNUM` | `OFFSET FETCH` → `LIMIT` |

3、**灾难恢复函数**：

```sql
/* Oracle闪回查询 */
SELECT * FROM employees 
  AS OF TIMESTAMP SYSTIMESTAMP - INTERVAL '10' MINUTE
WHERE ...

/* MySQL Binlog救援 */
SHOW BINLOG EVENTS IN 'binlog.000001' FROM 12345 LIMIT 10
```

4、**实时监控模板**：

```sql
/* PostgreSQL性能分析 */
SELECT query, calls, total_time
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10
```

#### 附录：SQL常用函数分类速查表

| 分类 | 功能 | 函数名 |
| --- | --- | --- |
| **聚合函数** | 基础统计 | COUNT, SUM, AVG, MAX, MIN |
|  | 去重分析 | COUNT(DISTINCT) |
|  | 字符串聚合 | GROUP\_CONCAT(MySQL), STRING\_AGG(SQL Server/PostgreSQL), LISTAGG(Oracle) |
|  | 高级统计 | VAR\_POP, VAR\_SAMP, STDDEV\_POP, STDDEV\_SAMP |
|  | 分位数计算 | PERCENTILE\_CONT, PERCENTILE\_DISC |
| **字符串函数** | 拼接处理 | CONCAT, \` |
|  | 截取操作 | SUBSTRING, SUBSTR, LEFT, RIGHT |
|  | 大小写转换 | UPPER, LOWER |
|  | 空白处理 | TRIM, LTRIM, RTRIM |
|  | 替换操作 | REPLACE, REGEXP\_REPLACE |
|  | 查找定位 | CHARINDEX, POSITION, INSTR |
|  | 填充格式化 | LPAD, RPAD |
|  | 正则匹配 | REGEXP\_LIKE |
|  | 分割提取 | SPLIT\_PART(PostgreSQL) |
|  | 字符集转换 | CONVERT(MySQL), NLS\_CHARSET\_CONVERT(Oracle) |
| **日期与时间函数** | 当前时间获取 | CURRENT\_DATE, CURRENT\_TIME, CURRENT\_TIMESTAMP, NOW, SYSDATE |
|  | 时间成分提取 | YEAR, MONTH, DAY, EXTRACT, DATEPART(SQL Server) |
|  | 日期计算 | DATE\_ADD, DATE\_SUB, DATEADD(SQL Server), DATEDIFF, TIMESTAMPDIFF |
|  | 日期截断 | DATE\_TRUNC(PostgreSQL) |
|  | 格式化输出 | DATE\_FORMAT(MySQL), TO\_CHAR(Oracle/PostgreSQL) |
|  | 月末/星期处理 | LAST\_DAY, NEXT\_DAY(Oracle), EOMONTH(SQL Server) |
|  | 时区转换 | CONVERT\_TZ(MySQL), AT TIME ZONE(Oracle) |
|  | 时间序列生成 | GENERATE\_SERIES(PostgreSQL) |
| **数学函数** | 基础运算 | ABS, MOD, SIGN |
|  | 取整操作 | ROUND, CEIL/CEILING, FLOOR, TRUNC(Oracle/PostgreSQL) |
|  | 幂对数计算 | POWER, EXP, LOG/LN, LOG10 |
|  | 三角计算 | SIN, COS, TAN, ASIN, ACOS, ATAN |
|  | 角度弧度转换 | RADIANS, DEGREES |
|  | 常数/随机数 | PI, RAND, RANDOM(PostgreSQL) |
| **转换函数** | 类型转换 | CAST, CONVERT |
|  | 安全转换 | TRY\_CAST, TRY\_CONVERT(SQL Server) |
|  | 格式化输出 | TO\_CHAR(Oracle/PostgreSQL), FORMAT(SQL Server) |
|  | 日期转换 | TO\_DATE(Oracle/PostgreSQL) |
|  | 二进制处理 | TO\_BINARY(MySQL), FROM\_BASE64, TO\_BASE64 |
|  | 数据脱敏 | NULLIF（防止除零错误） |
| **条件函数** | 条件分支 | CASE, IF(MySQL), IIF(SQL Server) |
|  | 空值处理 | COALESCE, IFNULL(MySQL), ISNULL(SQL Server), NVL(Oracle) |
|  | 高级逻辑 | NVL2(Oracle), CHOOSE(SQL Server), SWITCH(SQL Server) |
| **窗口函数** | 排名计算 | ROW\_NUMBER, RANK, DENSE\_RANK |
|  | 窗口聚合 | SUM() OVER, AVG() OVER, COUNT() OVER |
|  | 前后取值 | LAG, LEAD |
|  | 首尾取值 | FIRST\_VALUE, LAST\_VALUE |
|  | 分桶分析 | NTILE |
|  | 分布分析 | CUME\_DIST, PERCENT\_RANK |
| **系统与元数据函数** | 系统信息 | VERSION, CURRENT\_USER, SESSION\_USER |
|  | 元数据查询 | DATABASE(), CURRENT\_SCHEMA, DB\_NAME(SQL Server) |
|  | 对象信息 | OBJECT\_ID(SQL Server), COL\_LENGTH(SQL Server) |
|  | 动态SQL | sp\_executesql(SQL Server) |
|  | 会话监控 | @@SPID(SQL Server), PG\_BACKEND\_PID(PostgreSQL) |
| **自定义函数** | 功能实现 | 标量函数, 表值函数, 聚合函数（部分DB） |
| **JSON函数** | 数据提取 | JSON\_VALUE, JSON\_QUERY, JSON\_EXTRACT(MySQL) |
|  | JSON构建 | JSON\_OBJECT, JSON\_ARRAY |
|  | 聚合处理 | JSON\_ARRAYAGG, JSON\_OBJECTAGG |
|  | 数据验证/修改 | ISJSON(SQL Server), JSON\_MODIFY(SQL Server) |
|  | JSON转表 | JSON\_TABLE, jsonb\_populate\_record(PostgreSQL) |
|  | 路径查询 | `$..key` (深层扫描，路径语法，非函数), `$.items[?()]` (过滤) |
| **XML函数** | XML处理 | XMLTYPE(Oracle), nodes(SQL Server), EXTRACT |
|  | XML聚合 | XMLAGG(Oracle) |
| **加密与哈希函数** | 哈希算法 | MD5, SHA1, SHA2 |
|  | 加密解密 | AES\_ENCRYPT/AES\_DECRYPT(MySQL), ENCRYPTBYKEY/DECRYPTBYKEY(SQL Server) |
|  | 密码安全 | PASSWORD(MySQL), BCRYPT(PostgreSQL), SM3(国密) |
|  | 随机生成 | RANDOM\_BYTES(MySQL), GEN\_RANDOM\_UUID(PostgreSQL) |
| **地理空间函数** | 几何对象 | ST\_GeometryFromText(SQL Server), ST\_Point(PostgreSQL/MySQL) |
|  | 空间关系 | ST\_Within, ST\_Intersects |
|  | 空间计算 | ST\_Distance, ST\_Area, ST\_Length |
|  | 转换输出 | ST\_AsText, ST\_AsGeoJSON(PostgreSQL) |
|  | 坐标系处理 | ST\_SRID, ST\_Transform |
| **AI函数** | 机器学习预测 | PREDICTION(Oracle), ONNX\_PREDICT(SQL Server) |
|  | 向量计算 | vector\_distance(PostgreSQL) |