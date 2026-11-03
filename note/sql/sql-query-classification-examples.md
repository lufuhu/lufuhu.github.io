---
title: 269条SQL查询语句分类示例，数据查询语言DQL多场景应用
lastUpdated: 2026-09-06 04:00:00
---


在SQL语句中，SQL查询语句站在“C”位，通过SELECT等子句从数据库表中检索所需数据，进行数据查询、分析和提取等数据操作。在数据处理的各类场景中，我们都是通过SQL查询语句与数据库交互。所以，我们有必要对常用SQL查询语句做一个分类介绍，由于篇幅所限，一些高阶的常用SQL查询语句就没有选入。

#### 一、基础查询

##### 1、查询所有列

返回表中所有行的所有字段

```sql
SELECT * FROM employees; -- 从employees表查询所有列，*代表所有字段，适合快速查看表数据，生产环境尽量指定列名避免冗余
```

##### 2、查询指定列

返回表中所有行的指定字段

```sql
SELECT id, name, salary FROM employees; -- 查询employees表中所有行的id、name、salary列，仅返回需要的字段，提高效率
```

##### 3、列别名（AS）

为查询结果的列指定别名，增强可读性

```sql
SELECT id AS 员工编号, name AS 姓名, salary 工资 FROM employees; -- AS可省略，为列指定中文别名，适合报表展示
```

##### 4、移除重复行（DISTINCT单列）

去除指定列的重复值，返回唯一值

```sql
SELECT DISTINCT department_id FROM employees; -- 查询所有不重复的部门ID，仅保留department_id列的唯一值
```

##### 5、移除多列重复行（DISTINCT多列）

当多列组合重复时去重，仅保留唯一组合

```sql
SELECT DISTINCT department_id, job_id FROM employees; -- 去除department_id和job_id组合重复的行，两列同时相同才视为重复
```

##### 6、常量列查询

在结果中添加固定值列，用来标识来源或分类

```sql
SELECT id, name, '正式员工' AS 员工类型 FROM employees; -- 新增"员工类型"列，所有行均为固定值"正式员工"
```

##### 7、计算列（算术运算）

对数值列进行算术计算并返回结果

```sql
SELECT id, name, salary, salary * 12 AS 年薪 FROM employees; -- 计算年薪（月薪*12），作为新列返回
```

##### 8、字符串拼接（CONCAT）

将多个字符串字段拼接为一个字段

```sql
SELECT CONCAT(first_name, ' ', last_name) AS 全名 FROM employees; -- 拼接名和姓，中间加空格，适合生成完整名称
```

##### 9、条件拼接（CONCAT\_WS）

使用指定分隔符拼接字符串，自动忽略NULL

```sql
SELECT CONCAT_WS('-', year, month, day) AS 日期 FROM orders; -- 用"-"拼接年、月、日，若某字段为NULL则跳过，避免结果为NULL
```

##### 10、字符串长度（LENGTH）

返回字符串的字节长度

```sql
SELECT name, LENGTH(name) AS 名称长度 FROM products; -- 计算商品名称的字节长度，适合校验名称长度是否符合规范
```

##### 11、字符长度（CHAR\_LENGTH）

返回字符串的字符数量（与编码无关）

```sql
SELECT name, CHAR_LENGTH(name) AS 字符数 FROM users; -- 计算用户名的字符个数，如："张三"返回2，适合限制字符数场景
```

##### 12、字符串截取（SUBSTRING）

从指定位置截取字符串的部分内容

```sql
SELECT SUBSTRING(phone, 1, 3) AS 区号 FROM customers; -- 从phone列第1位开始，截取3个字符（如：手机号前3位区号）
```

##### 13、字符串替换（REPLACE）

替换字符串中的指定子串

```sql
SELECT REPLACE(email, 'old.com', 'new.com') AS 新邮箱 FROM users; -- 将邮箱中的"old.com"替换为"new.com"
```

##### 14、大小写转换（UPPER/LOWER）

将字符串转换为全大写或全小写

```sql
SELECT UPPER(name) AS 大写名称, LOWER(email) AS 小写邮箱 FROM users; -- 名称转大写，邮箱转小写统一格式
```

##### 15、空值处理（IFNULL/COALESCE）

将NULL值替换为指定默认值

```sql
SELECT name, IFNULL(commission_pct, 0) AS 佣金比例 FROM employees; -- MySQL用IFNULL，将NULL佣金比例替换为0
SELECT name, COALESCE(commission_pct, 0) AS 佣金比例 FROM employees; -- 通用函数COALESCE，效果同上，支持多参数
```

#### 二、条件查询（WHERE）

##### 16、等于条件（=）

筛选字段值等于指定值的行

```sql
SELECT * FROM employees WHERE department_id = 30; -- 查询部门ID为30的所有员工
```

##### 17、不等于条件（!= 或 <>）

筛选字段值不等于指定值的行

```sql
SELECT * FROM employees WHERE department_id != 30; -- 查询部门ID不是30的员工，!=和<>功能相同
```

##### 18、大于条件（>）

筛选字段值大于指定值的行

```sql
SELECT * FROM employees WHERE salary > 5000; -- 查询薪资大于5000的员工
```

##### 19、小于条件（<）

筛选字段值小于指定值的行

```sql
SELECT * FROM products WHERE price < 100; -- 查询价格小于100的商品
```

##### 20、大于等于条件（>=）

筛选字段值大于或等于指定值的行

```sql
SELECT * FROM orders WHERE quantity >= 10; -- 查询订单数量大于等于10的订单
```

##### 21、小于等于条件（<=）

筛选字段值小于或等于指定值的行

```sql
SELECT * FROM users WHERE age <= 18; -- 查询年龄小于等于18的用户（未成年人）
```

##### 22、范围查询（BETWEEN...AND...）

筛选字段值在指定范围内（包含边界）的行

```sql
SELECT * FROM employees WHERE salary BETWEEN 5000 AND 10000; -- 查询薪资在5000到10000之间的员工（包含5000和10000）
```

##### 23、不在范围内（NOT BETWEEN...AND...）

筛选字段值不在指定范围内的行

```sql
SELECT * FROM products WHERE price NOT BETWEEN 100 AND 500; -- 查询价格不在100到500之间的商品
```

##### 24、枚举值查询（IN）

筛选字段值等于枚举列表中任意值的行

```sql
SELECT * FROM employees WHERE department_id IN (10, 20, 30); -- 查询部门ID为10、20或30的员工，等价于多个OR条件
```

##### 25、不在枚举值中（NOT IN）

筛选字段值不等于枚举列表中所有值的行

```sql
SELECT * FROM users WHERE country NOT IN ('USA', 'CN'); -- 查询国家不是美国或中国的用户
```

##### 26、空值查询（IS NULL）

筛选字段值为NULL的行（NULL不能用=判断）

```sql
SELECT * FROM employees WHERE manager_id IS NULL; -- 查询没有经理的员工（manager_id为NULL）
```

##### 27、非空值查询（IS NOT NULL）

筛选字段值不为NULL的行

```sql
SELECT * FROM customers WHERE email IS NOT NULL; -- 查询有邮箱的客户（email不为NULL）
```

##### 28、模糊查询（LIKE %）

按字符串模式匹配，%代表任意长度字符（包括0个）

```sql
SELECT * FROM products WHERE name LIKE '苹果%'; -- 查询名称以"苹果"开头的商品（如："苹果手机"、"苹果电脑"）
SELECT * FROM products WHERE name LIKE '%手机'; -- 查询名称以"手机"结尾的商品
SELECT * FROM products WHERE name LIKE '%智能%'; -- 查询名称包含"智能"的商品
```

##### 29、模糊查询（LIKE \_）

按字符串模式匹配，\_代表单个任意字符

```sql
SELECT * FROM users WHERE username LIKE '张_'; -- 查询用户名是"张"开头且长度为2的用户（如："张三"、"张四"）
SELECT * FROM users WHERE phone LIKE '138____5678'; -- 查询138开头、以5678结尾，中间4位任意的手机号
```

##### 30、不匹配模糊查询（NOT LIKE）

筛选不匹配指定模式的行

```sql
SELECT * FROM articles WHERE title NOT LIKE '%广告%'; -- 查询标题不包含"广告"的文章
```

##### 31、逻辑与（AND）

同时满足多个条件的行

```sql
SELECT * FROM employees WHERE department_id = 30 AND salary > 6000; -- 查询30部门中薪资大于6000的员工
```

##### 32、逻辑或（OR）

满足任意一个条件的行

```sql
SELECT * FROM employees WHERE department_id = 30 OR salary > 10000; -- 查询30部门员工或薪资大于10000的员工
```

##### 33、逻辑非（NOT）

取反条件的结果

```sql
SELECT * FROM employees WHERE NOT (salary > 5000); -- 查询薪资不大于5000的员工（等价于salary <= 5000）
```

##### 34、条件优先级（括号）

改变条件的执行顺序，括号内条件优先执行

```sql
SELECT * FROM employees WHERE (department_id = 30 OR department_id = 40) AND salary > 6000; -- 先筛选30或40部门，再筛选其中薪资>6000的员工
```

##### 35、正则匹配（REGEXP）

按正则表达式模式匹配字符串

```sql
SELECT * FROM users WHERE phone REGEXP '^1[3-9][0-9]{9}$'; -- 查询符合手机号规则的用户（1开头，第2位3-9，共11位）
SELECT * FROM articles WHERE content REGEXP 'Java|Python'; -- 查询内容包含Java或Python的文章
```

##### 36、不匹配正则（NOT REGEXP）

筛选不匹配正则表达式的行

```sql
SELECT * FROM comments WHERE content NOT REGEXP '[0-9]{6,}'; -- 查询内容不包含6位以上数字的评论（避免包含手机号等）
```

##### 37、日期等于（DATE）

筛选日期字段等于指定日期的行

```sql
SELECT * FROM orders WHERE DATE(order_date) = '2023-10-01'; -- 查询2023年10月1日的订单（忽略时间部分）
```

##### 38、日期范围（DATE BETWEEN）

筛选日期在指定范围内的行

```sql
SELECT * FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31'; -- 查询2023年全年的订单
```

##### 39、年份查询（YEAR）

筛选指定年份的行

```sql
SELECT * FROM employees WHERE YEAR(hire_date) = 2020; -- 查询2020年入职的员工
```

##### 40、月份查询（MONTH）

筛选指定月份的行

```sql
SELECT * FROM orders WHERE MONTH(order_date) = 12; -- 查询12月份的订单（所有年份）
```

##### 41、季度查询（QUARTER）

筛选指定季度的行（1-4季度）

```sql
SELECT * FROM sales WHERE QUARTER(sale_date) = 4; -- 查询第4季度（10-12月）的销售记录
```

##### 42、日期差（DATEDIFF）

按两个日期的差值筛选行

```sql
SELECT * FROM orders WHERE DATEDIFF(ship_date, order_date) > 3; -- 查询发货时间比下单时间晚3天以上的订单
```

#### 三、排序查询（ORDER BY）

##### 43、单列升序（ASC）

按指定列从小到大排序（默认升序）

```sql
SELECT * FROM employees ORDER BY salary ASC; -- 按薪资升序排列，ASC可省略，从低到高显示
```

##### 44、单列降序（DESC）

按指定列从大到小排序

```sql
SELECT * FROM employees ORDER BY salary DESC; -- 按薪资降序排列，从高到低显示
```

##### 45、多列排序（先升后降）

先按第一列排序，第一列相同则按第二列排序

```sql
SELECT * FROM employees ORDER BY department_id ASC, salary DESC; -- 先按部门ID升序，同部门内按薪资降序
```

##### 46、按别名排序

按查询结果中的别名列排序

```sql
SELECT id, name, salary * 12 AS 年薪 FROM employees ORDER BY 年薪 DESC; -- 按计算后的"年薪"降序排列
```

##### 47、按列位置排序（不推荐）

按查询列的位置（从1开始）排序

```sql
SELECT name, salary FROM employees ORDER BY 2 DESC; -- 按第2列（salary）降序，不推荐，列顺序变化会出错
```

##### 48、按字符串长度排序

按字符串字段的长度排序

```sql
SELECT name FROM products ORDER BY CHAR_LENGTH(name) ASC; -- 按商品名称的字符长度升序（短名称在前）
```

##### 49、按日期排序

按日期字段的时间先后排序

```sql
SELECT * FROM orders ORDER BY order_date DESC; -- 按下单日期降序（最新订单在前）
```

##### 50、按NULL排序（NULLS FIRST）

将NULL值排在最前面

```sql
SELECT * FROM employees ORDER BY manager_id NULLS FIRST; -- PostgreSQL语法，manager_id为NULL的行排在前面
```

##### 51、按NULL排序（NULLS LAST）

将NULL值排在最后面

```sql
SELECT * FROM employees ORDER BY manager_id NULLS LAST; -- PostgreSQL语法，manager_id为NULL的行排在后面
```

##### 52、按大小写排序（区分大小写）

区分字符串大小写进行排序（依赖数据库 collation）

```sql
SELECT name FROM users ORDER BY name COLLATE 'utf8_bin'; -- MySQL中按二进制排序，区分大小写（A在a前）
```

##### 53、按中文拼音排序

按中文的拼音首字母排序

```sql
SELECT name FROM users ORDER BY name COLLATE 'zh_CN.utf8'; -- 按中文拼音排序（如："张三"在"李四"前）
```

##### 54、按计算结果排序

按字段计算后的结果排序

```sql
SELECT name, salary, commission_pct FROM employees ORDER BY salary * (1 + IFNULL(commission_pct, 0)) DESC; -- 按薪资加佣金的总和降序
```

##### 55、按枚举值排序

按枚举字段的预设顺序排序

```sql
SELECT * FROM orders ORDER BY FIELD(status, 'pending', 'processing', 'shipped', 'delivered'); -- MySQL用FIELD指定枚举顺序，按pending→processing→shipped→delivered排序
```

##### 56、按条件排序（CASE）

根据条件动态指定排序规则

```sql
SELECT * FROM employees ORDER BY CASE WHEN department_id = 30 THEN salary ELSE 0 END DESC; -- 30部门员工按薪资降序，其他部门排在后面（按0排序）
```

##### 57、随机排序（RAND）

随机返回表中的行（适合随机抽样）

```sql
SELECT * FROM products ORDER BY RAND() LIMIT 5; -- MySQL用RAND()随机排序，取前5条（随机推荐5个商品）
```

#### 四、聚合查询（GROUP BY & 聚合函数）

##### 58、计数（COUNT(\*)）

统计行数（包括NULL值）

```sql
SELECT COUNT(*) AS 总员工数 FROM employees; -- 统计employees表的总行数，包含所有字段为NULL的行
```

##### 59、非空计数（COUNT(列名)）

统计指定列非NULL值的行数

```sql
SELECT COUNT(email) AS 有邮箱的用户数 FROM users; -- 统计email列不为NULL的行数（即有邮箱的用户数量）
```

##### 60、去重计数（COUNT(DISTINCT 列名)）

统计指定列非重复且非NULL值的数量

```sql
SELECT COUNT(DISTINCT department_id) AS 部门数量 FROM employees; -- 统计不重复的部门ID数量（即公司有多少个部门）
```

##### 61、求和（SUM）

计算指定数值列的总和

```sql
SELECT SUM(sales_amount) AS 总销售额 FROM sales; -- 计算所有销售记录的金额总和
```

##### 62、平均值（AVG）

计算指定数值列的平均值（忽略NULL）

```sql
SELECT AVG(salary) AS 平均薪资 FROM employees; -- 计算员工的平均薪资，自动排除salary为NULL的行
```

##### 63、最大值（MAX）

查询指定列的最大值

```sql
SELECT MAX(price) AS 最高价格 FROM products; -- 查询商品中的最高价格
```

##### 64、最小值（MIN）

查询指定列的最小值

```sql
SELECT MIN(hire_date) AS 最早入职日期 FROM employees; -- 查询最早的员工入职日期
```

##### 65、单字段分组（GROUP BY）

按指定列分组，对每组进行聚合计算

```sql
SELECT department_id AS 部门ID, COUNT(*) AS 部门人数 FROM employees GROUP BY department_id; -- 按部门ID分组，统计每个部门的员工数量
```

##### 66、多字段分组（GROUP BY多列）

按多个列的组合分组，更细致地划分组

```sql
SELECT department_id, job_id, AVG(salary) AS 平均薪资 FROM employees GROUP BY department_id, job_id; -- 按部门和岗位分组，计算每个部门内各岗位的平均薪资
```

##### 67、分组筛选（HAVING）

对GROUP BY后的组结果进行筛选（类似WHERE但用于组）

```sql
SELECT department_id, COUNT(*) AS 人数 FROM employees GROUP BY department_id HAVING COUNT(*) > 10; -- 筛选出员工数大于10的部门
```

##### 68、分组+排序

对分组后的结果按指定规则排序

```sql
SELECT department_id, SUM(salary) AS 部门总薪资 FROM employees GROUP BY department_id ORDER BY 部门总薪资 DESC; -- 按部门分组计算总薪资，并按总薪资降序排列
```

##### 69、分组前筛选（WHERE + GROUP BY）

先筛选行，再对符合条件的行分组

```sql
SELECT department_id, AVG(salary) AS 平均薪资 FROM employees WHERE hire_date >= '2020-01-01' GROUP BY department_id; -- 先筛选2020年及以后入职的员工，再按部门计算平均薪资
```

##### 70、分组前后都筛选（WHERE + GROUP BY + HAVING）

先筛行，再分组，最后筛组

```sql
SELECT department_id, AVG(salary) AS 平均薪资 FROM employees WHERE salary > 3000 GROUP BY department_id HAVING AVG(salary) > 6000; -- 先筛薪资>3000的员工，分组后筛选平均薪资>6000的部门
```

##### 71、总和占比（SUM + 子查询）

计算每组总和占总体的比例

```sql
SELECT department_id, SUM(salary) AS 部门总薪资, SUM(salary)/(SELECT SUM(salary) FROM employees) AS 占比 FROM employees GROUP BY department_id; -- 计算各部门薪资占公司总薪资的比例
```

##### 72、分组后拼接字符串（GROUP\_CONCAT）

将分组内的字符串字段拼接为一个字符串（MySQL特有）

```sql
SELECT department_id, GROUP_CONCAT(name SEPARATOR ',') AS 员工姓名 FROM employees GROUP BY department_id; -- 按部门分组，将每个部门的员工姓名用逗号拼接
```

##### 73、分组统计非空值（COUNT + GROUP BY）

按组统计指定列的非空值数量

```sql
SELECT department_id, COUNT(phone) AS 有电话的员工数 FROM employees GROUP BY department_id; -- 按部门统计有电话号码的员工数量
```

##### 74、分组计算差异（MAX - MIN）

计算每组内指定列的最大值与最小值之差

```sql
SELECT department_id, MAX(salary) - MIN(salary) AS 薪资差距 FROM employees GROUP BY department_id; -- 计算每个部门内的最大薪资与最小薪资的差值
```

##### 75、分组条件计数（SUM + CASE）

按组统计满足特定条件的行数

```sql
SELECT department_id, SUM(CASE WHEN salary > 8000 THEN 1 ELSE 0 END) AS 高薪员工数 FROM employees GROUP BY department_id; -- 按部门统计薪资>8000的员工数量
```

##### 76、按年份分组

按日期字段的年份分组统计

```sql
SELECT YEAR(order_date) AS 年份, COUNT(*) AS 订单数 FROM orders GROUP BY YEAR(order_date); -- 按年份统计每年的订单数量
```

##### 77、按季度分组

按日期字段的季度分组统计

```sql
SELECT YEAR(order_date) AS 年份, QUARTER(order_date) AS 季度, SUM(amount) AS 季度销售额 FROM orders GROUP BY 年份, 季度; -- 按年份和季度统计销售额
```

##### 78、按月份分组

按日期字段的月份分组统计

```sql
SELECT MONTH(create_time) AS 月份, COUNT(*) AS 注册人数 FROM users GROUP BY 月份; -- 按月份统计每月的用户注册量（不区分年份）
```

##### 79、分组后取前N组

对分组结果排序后取前N个组

```sql
SELECT department_id, SUM(sales) AS 总销售额 FROM sales GROUP BY department_id ORDER BY 总销售额 DESC LIMIT 3; -- 按部门分组计算总销售额，取前三名的部门
```

##### 80、排除特定组（HAVING NOT）

在分组后排除符合特定条件的组

```sql
SELECT department_id, AVG(salary) AS 平均薪资 FROM employees GROUP BY department_id HAVING NOT AVG(salary) < 5000; -- 排除平均薪资<5000的部门（即保留≥5000的部门）
```

##### 81、分组统计NULL值（COUNT + IS NULL）

按组统计指定列中NULL值的数量

```sql
SELECT department_id, SUM(CASE WHEN manager_id IS NULL THEN 1 ELSE 0 END) AS 无经理人数 FROM employees GROUP BY department_id; -- 按部门统计没有经理的员工数量
```

##### 82、多聚合函数组合

在一次分组中计算多个聚合结果

```sql
SELECT department_id, COUNT(*) AS 人数, AVG(salary) AS 平均薪资, MAX(salary) AS 最高薪资, MIN(salary) AS 最低薪资 FROM employees GROUP BY department_id; -- 按部门同时计算人数、平均/最高/最低薪资
```

##### 83、按表达式分组

按字段计算后的结果分组

```sql
SELECT salary DIV 1000 AS 薪资等级（千）, COUNT(*) AS 人数 FROM employees GROUP BY 薪资等级（千）; -- 按薪资除以1000的整数部分分组（如：3000-3999为3级）
```

##### 84、按别名分组

按查询中的别名进行分组（部分数据库支持）

```sql
SELECT department_id AS dept_id, COUNT(*) AS 人数 FROM employees GROUP BY dept_id; -- 按别名dept_id分组（等价于按department_id分组，增强可读性）
```

##### 85、空组处理（COALESCE）

将NULL分组值替换为指定名称

```sql
SELECT COALESCE(department_id, '无部门') AS 部门ID, COUNT(*) AS 人数 FROM employees GROUP BY department_id; -- 把department_id为NULL的组显示为"无部门"
```

##### 86、分组统计比例（百分比）

计算每组数量占总体的百分比

```sql
SELECT gender, COUNT(*) AS 人数, COUNT(*)/(SELECT COUNT(*) FROM users) * 100 AS 占比(%) FROM users GROUP BY gender; -- 按性别统计人数及占比（保留两位小数可加ROUND函数）
```

#### 五、多表连接查询（JOIN）

##### 87、内连接（INNER JOIN）

返回两表中满足连接条件的交集数据

```sql
SELECT e.name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id; -- 关联员工表（e）和部门表（d），只返回有对应部门的员工及其部门名称
```

##### 88、内连接简化写法（逗号+WHERE）

用逗号分隔表，WHERE指定连接条件（等价于INNER JOIN）

```sql
SELECT e.name, d.department_name FROM employees e, departments d WHERE e.department_id = d.id; -- 老式写法，功能同INNER JOIN，推荐用显式JOIN更清晰
```

##### 89、左连接（LEFT JOIN）

返回左表所有行，右表匹配不到则用NULL填充

```sql
SELECT e.name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id; -- 返回所有员工，有部门则显示部门名，无部门则部门名为NULL
```

##### 90、左连接筛选右表NULL

用左连接查询左表中无右表匹配的数据

```sql
SELECT e.name FROM employees e LEFT JOIN departments d ON e.department_id = d.id WHERE d.id IS NULL; -- 查询没有对应部门的员工（右表无匹配）
```

##### 91、右连接（RIGHT JOIN）

返回右表所有行，左表匹配不到则用NULL填充

```sql
SELECT d.department_name, e.name FROM employees e RIGHT JOIN departments d ON e.department_id = d.id; -- 返回所有部门，有员工则显示员工名，无员工则员工名为NULL
```

##### 92、右连接筛选左表NULL

用右连接查询右表中无左表匹配的数据

```sql
SELECT d.department_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.id WHERE e.id IS NULL; -- 查询没有员工的部门（左表无匹配）
```

##### 93、全外连接（FULL JOIN）

返回左右表所有行，无匹配则用NULL填充（MySQL不直接支持）

```sql
-- PostgreSQL/Oracle支持
SELECT e.name, d.department_name FROM employees e FULL JOIN departments d ON e.department_id = d.id; -- 返回所有员工和所有部门，无匹配则对应字段为NULL
```

##### 94、MySQL模拟全外连接（UNION）

在MySQL中用LEFT JOIN + RIGHT JOIN + UNION模拟全外连接

```sql
SELECT e.name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id
UNION
SELECT e.name, d.department_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.id; -- 合并左连接和右连接结果，去重后等价于全外连接
```

##### 95、三表连接（INNER JOIN）

关联三个表，返回满足所有连接条件的数据

```sql
SELECT e.name, d.department_name, l.city 
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
INNER JOIN locations l ON d.location_id = l.id; -- 关联员工表→部门表→地点表，查询员工姓名、部门名、部门所在城市
```

##### 96、混合连接（LEFT JOIN + INNER JOIN）

结合不同连接类型关联多表

```sql
SELECT e.name, d.department_name, l.city 
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
INNER JOIN locations l ON d.location_id = l.id; -- 员工左连接部门（保留所有员工），部门内连接地点（仅保留有地点的部门）
```

##### 97、交叉连接（CROSS JOIN）

返回两表的笛卡尔积（所有可能的行组合）

```sql
SELECT p.product_name, c.category_name FROM products p CROSS JOIN categories c; -- 返回所有商品与所有类别的组合（行数=商品数×类别数，慎用，数据量大时效率低）
```

##### 98、带条件的交叉连接

对交叉连接的结果进行筛选（等价于内连接）

```sql
SELECT p.product_name, c.category_name FROM products p CROSS JOIN categories c WHERE p.category_id = c.id; -- 等价于INNER JOIN，通过WHERE筛选出匹配的商品和类别
```

##### 99、自连接（同表连接）

将表与自身连接，查询表内关联数据（如：层级关系）

```sql
SELECT e.name AS 员工, m.name AS 经理 
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id; -- 员工表自连接，查询每个员工及其对应的经理（无经理则为NULL）
```

##### 100、自连接查询层级数据

通过自连接查询多层级关系（如：部门上下级）

```sql
SELECT d1.department_name AS 父部门, d2.department_name AS 子部门 
FROM departments d1
LEFT JOIN departments d2 ON d2.parent_id = d1.id; -- 部门表自连接，查询父部门和对应的子部门
```

##### 101、连接+筛选（ON后条件）

在连接时就筛选右表数据（区别于WHERE）

```sql
SELECT e.name, d.department_name 
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id AND d.location_id = 1; -- 左连接时仅关联location_id=1的部门，保留所有员工，部门名仅显示符合条件的
```

##### 102、连接+分组

连接多表后按指定字段分组统计

```sql
SELECT d.department_name, COUNT(e.id) AS 员工数
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.department_name; -- 按部门名分组，统计每个部门的员工数量（包括无员工的部门）
```

##### 103、连接+排序

对连接后的结果按指定字段排序

```sql
SELECT o.order_id, c.customer_name, o.order_date
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
ORDER BY o.order_date DESC, o.order_id ASC; -- 按订单日期降序、订单ID升序排列关联结果
```

##### 104、多条件连接（AND）

通过多个条件关联两表

```sql
SELECT e.name, p.project_name
FROM employees e
INNER JOIN employee_projects ep ON e.id = ep.employee_id
INNER JOIN projects p ON ep.project_id = p.id AND p.status = 'active'; -- 关联员工与项目，仅包含状态为"active"的项目
```

##### 105、连接+计算列

对连接后的结果进行字段计算

```sql
SELECT o.order_id, c.customer_name, (o.amount - o.discount) AS 实际支付金额
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id; -- 计算订单实际支付金额（金额-折扣）并关联客户信息
```

##### 106、左连接排除匹配项

查询左表中与右表无匹配的数据（反连接）

```sql
SELECT c.customer_id, c.customer_name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.order_id IS NULL; -- 查询没有下过订单的客户（左表有，右表无匹配）
```

##### 107、右连接排除匹配项

查询右表中与左表无匹配的数据

```sql
SELECT p.product_id, p.product_name
FROM orders o
RIGHT JOIN products p ON o.product_id = p.id
WHERE o.order_id IS NULL; -- 查询从未被订购过的商品（右表有，左表无匹配）
```

##### 108、连接使用别名简化

为表指定别名，简化多表连接的语法

```sql
SELECT u.username, o.order_id, p.product_name
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN order_products op ON o.id = op.order_id
INNER JOIN products p ON op.product_id = p.id; -- 多表连接时用短别名（u、o、op、p）简化代码
```

##### 109、自然连接（NATURAL JOIN）

自动按同名字段连接（不推荐，依赖字段名，易出错）

```sql
SELECT e.name, d.department_name
FROM employees e
NATURAL JOIN departments d; -- 自动按两表中同名的字段（如：id）连接，不建议使用，字段名变化会导致错误
```

##### 110、USING子句连接

指定连接的字段名（比NATURAL JOIN更明确）

```sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d USING (department_id); -- 明确指定按department_id字段连接，比ON更简洁（要求两表字段名相同）
```

##### 111、四表连接查询

关联四个表获取多层级数据

```sql
SELECT o.order_id, c.name, p.product_name, s.supplier_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
INNER JOIN suppliers s ON p.supplier_id = s.id; -- 关联订单→客户→订单项→商品→供应商，获取完整订单链信息
```

##### 112、左连接保留所有左表数据

确保左表所有行都被返回，无论右表是否有匹配

```sql
SELECT d.department_name, AVG(e.salary) AS 平均薪资
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.department_name; -- 计算所有部门的平均薪资，无员工的部门平均薪资为NULL
```

##### 113、连接后去重（DISTINCT）

去除连接后产生的重复行

```sql
SELECT DISTINCT c.customer_name, p.product_name
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id; -- 去重后返回客户购买过的商品（每个客户-商品组合只出现一次）
```

##### 114、条件连接（不同条件关联）

根据不同条件关联不同的表

```sql
SELECT t.transaction_id, t.amount, u.username AS 用户, m.merchant_name AS 商户
FROM transactions t
LEFT JOIN users u ON t.type = 'user' AND t.related_id = u.id
LEFT JOIN merchants m ON t.type = 'merchant' AND t.related_id = m.id; -- 按交易类型关联用户表或商户表
```

##### 115、连接查询聚合后过滤

连接多表后分组，再筛选组结果

```sql
SELECT c.country, COUNT(o.order_id) AS 订单数
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
GROUP BY c.country
HAVING COUNT(o.order_id) > 100; -- 按国家统计订单数，筛选订单数>100的国家
```

##### 116、连接时使用函数

在连接条件中使用函数处理字段

```sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON UPPER(e.department_code) = d.code; -- 忽略大小写匹配部门编码（e的编码转大写后与d的code连接）
```

#### 六、子查询（Subquery）

##### 117、标量子查询（SELECT子句中）

返回单个值，作为主查询的列使用

```sql
SELECT name, salary, (SELECT AVG(salary) FROM employees) AS 公司平均薪资
FROM employees; -- 子查询返回公司平均薪资，作为每个员工记录的对比列
```

##### 118、标量子查询（WHERE子句中）

返回单个值，用在WHERE条件判断

```sql
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees); -- 子查询计算平均薪资，主查询返回薪资高于平均值的员工
```

##### 119、列子查询（IN）

返回一列多行，主查询用IN判断是否在结果中

```sql
SELECT * FROM orders
WHERE customer_id IN (SELECT id FROM customers WHERE country = 'China'); -- 子查询返回中国客户ID，主查询返回这些客户的订单
```

##### 120、列子查询（NOT IN）

返回一列多行，主查询用NOT IN判断是否不在结果中

```sql
SELECT * FROM products
WHERE category_id NOT IN (SELECT id FROM categories WHERE status = 'disabled'); -- 子查询返回禁用的分类ID，主查询返回不在其中的商品
```

##### 121、列子查询（ANY）

主查询条件满足子查询结果中的任意一个

```sql
SELECT name, salary FROM employees
WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 30); -- 子查询返回30部门的所有薪资，主查询返回薪资高于其中任意一个的员工
```

##### 122、列子查询（ALL）

主查询条件满足子查询结果中的所有值

```sql
SELECT name, salary FROM employees
WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 30); -- 子查询返回30部门的所有薪资，主查询返回薪资高于其中所有值的员工（即高于30部门最高薪资）
```

##### 123、行子查询（=）

返回一行多列，主查询用多列匹配

```sql
SELECT * FROM employees
WHERE (department_id, salary) = (SELECT department_id, MAX(salary) FROM employees GROUP BY department_id HAVING department_id = 30); -- 子查询返回30部门的最高薪资行，主查询匹配该部门且薪资等于最高值的员工
```

##### 124、行子查询（IN）

返回多行多列，主查询用多列判断是否在结果中

```sql
SELECT * FROM employees
WHERE (department_id, job_id) IN (SELECT department_id, job_id FROM employees WHERE salary > 10000); -- 子查询返回薪资>10000的部门+岗位组合，主查询返回这些组合中的所有员工
```

##### 125、表子查询（FROM子句中）

返回一个结果集，作为主查询的数据源（派生表）

```sql
SELECT dept_id, avg_salary
FROM (SELECT department_id AS dept_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id) AS dept_avg
WHERE avg_salary > 6000; -- 子查询作为派生表（dept_avg），主查询筛选平均薪资>6000的部门
```

##### 126、表子查询+连接

将表子查询与其他表连接

```sql
SELECT e.name, dept_avg.avg_salary
FROM employees e
INNER JOIN (SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id) AS dept_avg
ON e.department_id = dept_avg.department_id; -- 子查询生成部门平均薪资表，与员工表连接，显示每个员工及其部门平均薪资
```

##### 127、 EXISTS子查询（存在）

判断子查询是否有结果，有则返回TRUE

```sql
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.amount > 1000); -- 子查询判断客户是否有金额>1000的订单，主查询返回满足条件的客户
```

##### 128、NOT EXISTS子查询（不存在）

判断子查询是否无结果，无则返回TRUE

```sql
SELECT * FROM products p
WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id); -- 子查询判断商品是否被订购过，主查询返回从未被订购的商品（等价于左连接筛选NULL）
```

##### 129、子查询在HAVING中

在分组筛选条件中使用子查询

```sql
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > (SELECT AVG(salary) FROM employees); -- 子查询返回公司平均薪资，主查询筛选部门平均薪资高于公司平均值的部门
```

##### 130、多层子查询（嵌套）

子查询中包含另一个子查询（最多支持多层）

```sql
SELECT name FROM employees
WHERE department_id = (SELECT id FROM departments WHERE location_id = (SELECT id FROM locations WHERE city = 'Beijing')); -- 内层子查询返回北京的location_id，中层返回该地点的部门ID，外层返回该部门的员工
```

##### 131、子查询与JOIN等价转换

将子查询改写为JOIN（有时性能更优）

```sql
-- 子查询版本
SELECT name FROM employees WHERE department_id IN (SELECT id FROM departments WHERE name = 'Sales');
-- 等价JOIN版本
SELECT e.name FROM employees e INNER JOIN departments d ON e.department_id = d.id WHERE d.name = 'Sales'; -- 功能相同，JOIN在某些场景下效率更高
```

##### 132、子查询限制结果（LIMIT）

子查询中用LIMIT限制返回行数

```sql
SELECT * FROM orders
WHERE customer_id IN (SELECT id FROM customers ORDER BY register_date DESC LIMIT 10); -- 子查询返回最新注册的10个客户ID，主查询返回这些客户的订单
```

##### 133、子查询使用聚合函数

子查询中包含聚合计算

```sql
SELECT * FROM products
WHERE price > (SELECT MAX(price) FROM products WHERE category_id = 5); -- 子查询返回5类商品的最高价格，主查询返回价格高于该值的商品
```

##### 134、相关子查询（依赖主查询）

子查询引用主查询的字段，每行执行一次子查询

```sql
SELECT e1.name, e1.salary
FROM employees e1
WHERE e1.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = e1.department_id); -- 子查询依赖主查询的department_id，计算同部门平均薪资，主查询返回高于本部门平均的员工
```

##### 135、相关子查询（EXISTS）

相关子查询与EXISTS结合，每行判断一次

```sql
SELECT d.department_name
FROM departments d
WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id AND e.salary > 10000); -- 子查询依赖主查询的部门ID，判断部门是否有薪资>10000的员工，主查询返回满足条件的部门
```

##### 136、子查询作为计算字段

子查询结果作为主查询的计算列

```sql
SELECT o.order_id, o.amount, 
  (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) AS 商品数量
FROM orders o; -- 子查询依赖主查询的订单ID，计算每个订单包含的商品数量，作为订单记录的列
```

##### 137、子查询筛选最大/最小值对应行

查询某列最大/最小值所在的完整行

```sql
SELECT * FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees); -- 子查询返回最高薪资，主查询返回该薪资对应的员工（可能多个）
```

##### 138、子查询与日期函数

子查询中使用日期函数筛选数据

```sql
SELECT * FROM orders
WHERE order_date > (SELECT MAX(order_date) FROM orders WHERE customer_id = 100); -- 子查询返回客户100的最后下单日期，主查询返回所有晚于该日期的订单
```

##### 139、子查询返回多个字段

子查询返回多列，主查询引用多个字段

```sql
SELECT e.name, (SELECT CONCAT(d.name, '-', l.city) FROM departments d INNER JOIN locations l ON d.location_id = l.id WHERE d.id = e.department_id) AS 部门及城市
FROM employees e; -- 子查询返回部门名+城市的拼接值，作为员工记录的列
```

##### 140、子查询在ORDER BY中

在排序条件中使用子查询结果

```sql
SELECT name, department_id FROM employees
ORDER BY (SELECT location_id FROM departments WHERE id = employees.department_id) ASC; -- 按部门所在地点ID排序，子查询返回每个员工所属部门的location_id
```

##### 141、子查询排除特定数据

用子查询排除不需要的数据

```sql
SELECT * FROM users
WHERE id NOT IN (SELECT user_id FROM banned_users); -- 子查询返回被禁用户ID，主查询返回未被禁的用户
```

##### 142、子查询与DISTINCT

子查询中去重后供主查询使用

```sql
SELECT * FROM products
WHERE category_id IN (SELECT DISTINCT category_id FROM products WHERE price < 100); -- 子查询返回有低价商品的分类ID（去重），主查询返回这些分类的所有商品
```

##### 143、子查询与CASE

在子查询中使用条件逻辑

```sql
SELECT name, 
  (SELECT CASE WHEN AVG(salary) > 8000 THEN '高' ELSE '中' END FROM employees WHERE department_id = e.department_id) AS 部门薪资水平
FROM employees e; -- 子查询按部门平均薪资判断等级，作为员工记录的列
```

##### 144、子查询与字符串函数

子查询中使用字符串处理函数

```sql
SELECT * FROM customers
WHERE name LIKE (SELECT CONCAT('%', city, '%') FROM locations WHERE id = customers.location_id); -- 子查询返回客户所在城市并拼接为模糊匹配模式，主查询返回姓名包含城市名的客户
```

##### 145、子查询返回空集处理

处理子查询返回空集的情况（避免结果异常）

```sql
SELECT * FROM employees
WHERE salary > COALESCE((SELECT AVG(salary) FROM employees WHERE department_id = 99), 0); -- 若99部门不存在（子查询返回NULL），用COALESCE设为0，避免主查询无结果
```

#### 七、分页查询

##### 146、LIMIT基础分页（MySQL）

限制返回的行数（适合简单分页）

```sql
SELECT * FROM products LIMIT 10; -- 返回前10条商品记录（第1-10条），适合首页展示
```

##### 147、LIMIT + OFFSET分页（MySQL）

从指定位置开始返回指定行数（标准分页）

```sql
SELECT * FROM products ORDER BY id ASC LIMIT 10 OFFSET 20; -- 从第21条开始，返回10条记录（第21-30条），OFFSET为跳过的行数
```

##### 148、分页公式（页码计算）

根据页码和每页条数计算OFFSET

```sql
-- 页码page=3，每页10条：(3-1)*10=20 → OFFSET 20
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET (3-1)*10; -- 通用分页公式：OFFSET = (页码-1)*每页条数
```

##### 149、分页+排序（必选）

确保分页结果顺序稳定（无排序可能导致分页错乱）

```sql
SELECT * FROM orders ORDER BY create_time DESC LIMIT 15 OFFSET 30; -- 先按创建时间降序，再取第31-45条订单，排序是分页的前提
```

##### 150、分页查询指定列

仅返回需要的列，提高分页效率

```sql
SELECT id, title, price FROM products ORDER BY id LIMIT 20 OFFSET 100; -- 分页时只查询必要字段，减少数据传输
```

##### 151、分页+条件筛选

对筛选后的结果进行分页

```sql
SELECT * FROM employees WHERE department_id = 30 ORDER BY salary DESC LIMIT 10 OFFSET 10; -- 先筛选30部门员工，排序后取第11-20条
```

##### 152、分页查询总条数（计算总页数）

查询符合条件的总记录数，计算总页数

```sql
-- 查数据
SELECT * FROM products WHERE price > 100 ORDER BY id LIMIT 10 OFFSET 0;
-- 查总条数（计算总页数：CEIL(总条数/每页条数)）
SELECT COUNT(*) AS total FROM products WHERE price > 100; -- 通常与分页查询配合使用，返回总记录数
```

##### 153、子查询分页

对派生表的结果进行分页

```sql
SELECT * FROM (SELECT id, name, salary*12 AS 年薪 FROM employees WHERE department_id = 30) AS dept30_emp ORDER BY 年薪 DESC LIMIT 5 OFFSET 0; -- 先子查询计算年薪，再对结果分页
```

##### 154、连接查询分页

对多表连接的结果进行分页

```sql
SELECT e.name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id ORDER BY e.id LIMIT 10 OFFSET 50; -- 连接查询后分页，避免返回过多数据
```

##### 155、偏移量过大优化（WHERE + 主键）

解决OFFSET过大导致的性能问题（适用于自增主键）

```sql
-- 传统方式（OFFSET大时慢）
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 100000;
-- 优化方式（用主键过滤代替OFFSET）
SELECT * FROM products WHERE id > 100000 ORDER BY id LIMIT 10; -- 假设id是自增主键，直接定位到上次分页的最后一个id，性能更优
```

##### 156、FETCH分页（SQL标准）

按SQL标准语法分页（PostgreSQL、SQL Server支持）

```sql
SELECT * FROM employees ORDER BY hire_date OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY; -- 跳过20行，取接下来的10行，与LIMIT OFFSET功能相同
```

##### 157、分页+去重

对去重后的结果进行分页

```sql
SELECT DISTINCT category_id, category_name FROM products WHERE price < 500 ORDER BY category_id LIMIT 5 OFFSET 0; -- 先去重，再分页返回不重复的分类
```

##### 158、分页+聚合查询

对分组聚合后的结果进行分页

```sql
SELECT department_id, AVG(salary) AS 平均薪资 FROM employees GROUP BY department_id ORDER BY 平均薪资 DESC LIMIT 3 OFFSET 0; -- 分组计算后分页，取平均薪资最高的3个部门
```

##### 159、分页查询最后N条

查询最后N条记录（如：最新数据）

```sql
SELECT * FROM (SELECT * FROM orders ORDER BY create_time DESC LIMIT 100) AS last_100 ORDER BY create_time ASC; -- 先取最新100条，再按时间升序排列（ oldest first ）
```

##### 160、分页查询随机数据

分页返回随机抽样数据

```sql
SELECT * FROM products ORDER BY RAND() LIMIT 5 OFFSET 0; -- 随机排序后取前5条，适合随机推荐（大数据量时性能差）
```

#### 八、条件逻辑（CASE）

##### 161、简单CASE表达式

按字段值匹配返回对应结果（类似switch-case）

```sql
SELECT name, 
  CASE department_id 
    WHEN 10 THEN '行政部' 
    WHEN 20 THEN '财务部' 
    WHEN 30 THEN '销售部' 
    ELSE '其他部门' 
  END AS 部门名称
FROM employees; -- 按department_id的值匹配对应的部门名称，不匹配则返回"其他部门"
```

##### 162、搜索CASE表达式

按条件判断返回对应结果（类似if-else if-else）

```sql
SELECT name, salary,
  CASE 
    WHEN salary > 10000 THEN '高薪' 
    WHEN salary > 5000 THEN '中等' 
    ELSE '基础' 
  END AS 薪资等级
FROM employees; -- 按薪资范围判断等级，条件按顺序执行，满足即返回
```

##### 163、CASE在WHERE中

根据条件动态调整筛选逻辑

```sql
SELECT * FROM products
WHERE price > CASE 
  WHEN category_id = 1 THEN 500 
  WHEN category_id = 2 THEN 1000 
  ELSE 300 
END; -- 不同分类的价格筛选阈值不同（分类1>500，分类2>1000，其他>300）
```

##### 164、CASE在GROUP BY中

按CASE结果分组统计

```sql
SELECT 
  CASE WHEN salary > 8000 THEN '高薪群体' ELSE '普通群体' END AS 群体,
  COUNT(*) AS 人数
FROM employees
GROUP BY 群体; -- 按薪资等级分组，统计两个群体的人数
```

##### 165、CASE在ORDER BY中

按CASE结果自定义排序

```sql
SELECT name, status FROM orders
ORDER BY CASE status 
  WHEN 'processing' THEN 1 
  WHEN 'shipped' THEN 2 
  WHEN 'delivered' THEN 3 
  ELSE 4 
END; -- 按订单状态自定义排序：processing→shipped→delivered→其他
```

##### 166、CASE实现条件计数

统计满足特定条件的行数（类似SUM+条件）

```sql
SELECT department_id,
  COUNT(CASE WHEN gender = '男' THEN 1 END) AS 男性人数,
  COUNT(CASE WHEN gender = '女' THEN 1 END) AS 女性人数
FROM employees
GROUP BY department_id; -- 按部门统计男女员工数量（COUNT忽略NULL，不满足条件时CASE返回NULL）
```

##### 167、CASE实现条件求和

对满足特定条件的字段求和

```sql
SELECT department_id,
  SUM(CASE WHEN gender = '男' THEN salary END) AS 男性总薪资,
  SUM(CASE WHEN gender = '女' THEN salary END) AS 女性总薪资
FROM employees
GROUP BY department_id; -- 按部门计算男女员工的薪资总和
```

##### 168、CASE嵌套

在CASE表达式中嵌套另一个CASE

```sql
SELECT name, salary,
  CASE 
    WHEN salary > 10000 THEN '高薪'
    ELSE CASE 
      WHEN salary > 5000 THEN '中等'
      ELSE '基础'
    END
  END AS 薪资等级
FROM employees; -- 嵌套CASE实现多层条件判断（等价于单层多条件）
```

##### 169、CASE处理NULL值

用CASE将NULL值转换为指定内容

```sql
SELECT name,
  CASE WHEN manager_id IS NULL THEN '无经理' ELSE '有经理' END AS 经理状态
FROM employees; -- 将manager_id为NULL的记录标记为"无经理"，否则为"有经理"
```

##### 170、CASE与日期函数结合

按日期条件分类

```sql
SELECT order_id, order_date,
  CASE 
    WHEN order_date >= '2023-10-01' THEN 'Q4'
    WHEN order_date >= '2023-07-01' THEN 'Q3'
    WHEN order_date >= '2023-04-01' THEN 'Q2'
    ELSE 'Q1'
  END AS 季度
FROM orders WHERE YEAR(order_date) = 2023; -- 按订单日期划分2023年的季度
```

##### 171、CASE返回计算值

根据条件返回不同的计算结果

```sql
SELECT name, salary,
  CASE 
    WHEN department_id = 30 THEN salary * 1.2 -- 销售部加薪20%
    WHEN department_id = 20 THEN salary * 1.1 -- 财务部加薪10%
    ELSE salary -- 其他部门薪资不变
  END AS 调整后薪资
FROM employees; -- 按部门计算调整后的薪资
```

##### 172、CASE在HAVING中

在分组筛选中使用CASE结果

```sql
SELECT department_id, AVG(salary) AS 平均薪资
FROM employees
GROUP BY department_id
HAVING CASE 
  WHEN department_id IN (10, 20) THEN AVG(salary) > 6000 -- 部门10、20要求平均>6000
  ELSE AVG(salary) > 5000 -- 其他部门要求平均>5000
END; -- 不同部门的分组筛选条件不同
```

##### 173、CASE与聚合函数结合

对聚合结果进行条件判断

```sql
SELECT 
  CASE 
    WHEN AVG(salary) > 8000 THEN '高薪资部门'
    ELSE '普通薪资部门'
  END AS 部门类型,
  COUNT(*) AS 部门数量
FROM employees
GROUP BY department_id; -- 按部门平均薪资判断部门类型，统计各类型的部门数量
```

##### 174、CASE实现行转列

将行数据转换为列（交叉表）

```sql
SELECT 
  department_id,
  SUM(CASE WHEN gender = '男' THEN 1 ELSE 0 END) AS 男,
  SUM(CASE WHEN gender = '女' THEN 1 ELSE 0 END) AS 女
FROM employees
GROUP BY department_id; -- 将性别行数据转为列，显示每个部门的男女数量
```

##### 175、CASE与字符串函数结合

按条件处理字符串

```sql
SELECT name,
  CASE 
    WHEN LENGTH(name) > 4 THEN CONCAT(SUBSTRING(name, 1, 2), '***') -- 长名字脱敏
    ELSE name -- 短名字不处理
  END AS 脱敏姓名
FROM users; -- 对长度>4的姓名进行脱敏处理（如："张三丰"→"张***"）
```

#### 九、组合查询（UNION, INTERSECT, EXCEPT）

##### 176、UNION合并结果（去重）

合并两个查询结果，自动去除重复行

```sql
SELECT name, '员工' AS 类型 FROM employees
UNION
SELECT name, '客户' AS 类型 FROM customers; -- 合并员工和客户的姓名，去重后返回，两查询列数和类型需一致
```

##### 177、UNION ALL合并结果（保留重复）

合并两个查询结果，保留所有重复行（性能优于UNION）

```sql
SELECT product_id FROM order_items WHERE order_id = 100
UNION ALL
SELECT product_id FROM order_items WHERE order_id = 101; -- 合并两个订单的商品ID，保留重复项（如：两订单都包含的商品）
```

##### 178、多表UNION（3个及以上）

合并多个查询结果

```sql
SELECT id, name FROM table1
UNION ALL
SELECT id, name FROM table2
UNION ALL
SELECT id, name FROM table3; -- 合并3个表的id和name字段，保留所有行
```

##### 179、UNION与条件筛选

合并不同条件的查询结果

```sql
SELECT * FROM products WHERE price < 100 AND category_id = 1
UNION
SELECT * FROM products WHERE price > 1000 AND category_id = 2; -- 合并1类低价商品和2类高价商品的结果
```

##### 180、UNION与排序

对合并后的结果进行排序（需加括号）

```sql
(SELECT name, salary FROM employees WHERE department_id = 30)
UNION
(SELECT name, salary FROM employees WHERE salary > 10000)
ORDER BY salary DESC; -- 合并30部门员工和高薪员工，整体按薪资降序（排序对合并后结果生效）
```

##### 181、UNION模拟全外连接（MySQL）

在不支持FULL JOIN的数据库中模拟全外连接

```sql
SELECT e.name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id
UNION
SELECT e.name, d.department_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.id; -- 左连接+右连接+UNION，等价于全外连接
```

##### 182、INTERSECT取交集（PostgreSQL/Oracle）

返回两个查询结果的共同行（交集）

```sql
SELECT product_id FROM products WHERE price > 500
INTERSECT
SELECT product_id FROM order_items; -- 返回价格>500且被订购过的商品ID（两结果的交集）
```

##### 183、MySQL模拟INTERSECT（INNER JOIN）

在MySQL中用内连接模拟交集查询

```sql
-- 等价于INTERSECT
SELECT p.product_id 
FROM (SELECT product_id FROM products WHERE price > 500) p
INNER JOIN (SELECT product_id FROM order_items) oi ON p.product_id = oi.product_id; -- 两子查询结果内连接，得到交集
```

##### 184、INTERSECT ALL（保留重复交集）

返回交集并保留重复行（重复次数取两结果中的最小值）

```sql
SELECT product_id FROM order_items WHERE order_id = 100
INTERSECT ALL
SELECT product_id FROM order_items WHERE order_id = 101; -- 返回两订单都包含的商品ID，重复次数为两订单中较少的出现次数
```

##### 185、EXCEPT取差集（PostgreSQL）

返回第一个查询有而第二个查询没有的行（差集）

```sql
SELECT product_id FROM products
EXCEPT
SELECT product_id FROM order_items; -- 返回所有商品中未被订购的商品ID（商品表有，订单项表无）
```

##### 186、MINUS取差集（Oracle）

Oracle中实现差集查询（等价于EXCEPT）

```sql
SELECT product_id FROM products
MINUS
SELECT product_id FROM order_items; -- Oracle专用，功能同EXCEPT，返回未被订购的商品ID
```

##### 187、MySQL模拟EXCEPT（LEFT JOIN + IS NULL）

在MySQL中用左连接模拟差集查询

```sql
-- 等价于EXCEPT
SELECT p.product_id 
FROM (SELECT product_id FROM products) p
LEFT JOIN (SELECT product_id FROM order_items) oi ON p.product_id = oi.product_id
WHERE oi.product_id IS NULL; -- 左连接后筛选右表为NULL的行，即差集
```

##### 188、EXCEPT ALL（保留重复差集）

返回差集并保留重复行（重复次数为第一个查询减去第二个查询的次数）

```sql
SELECT tag FROM article_tags WHERE article_id = 1
EXCEPT ALL
SELECT tag FROM article_tags WHERE article_id = 2; -- 返回文章1有而文章2没有的标签，保留重复次数
```

##### 189、组合查询+排序（统一排序）

对多个查询的合并结果进行统一排序

```sql
(SELECT '员工' AS 类型, name, hire_date AS 日期 FROM employees)
UNION ALL
(SELECT '客户' AS 类型, name, register_date AS 日期 FROM customers)
ORDER BY 日期 DESC; -- 合并员工和客户数据，按日期统一降序（最新记录在前）
```

##### 190、组合查询+限制行数

对合并结果限制总返回行数

```sql
(SELECT name FROM employees WHERE department_id = 30)
UNION ALL
(SELECT name FROM customers WHERE country = 'China')
LIMIT 20; -- 合并结果后只返回前20行
```

##### 191、组合查询中的NULL处理

UNION中NULL视为相同值（去重时会合并）

```sql
SELECT NULL AS col FROM dual
UNION
SELECT NULL AS col FROM dual; -- 结果只返回1行NULL（UNION去重，视NULL为相同）
```

##### 192、组合查询与列别名

为组合查询的列统一指定别名（以第一个查询为准）

```sql
SELECT id, name AS 名称 FROM employees
UNION
SELECT customer_id, customer_name FROM customers; -- 第一个查询指定别名为"名称"，合并结果列名为"名称"
```

#### 十、窗口函数（Window Functions）

##### 193、排名函数（ROW\_NUMBER）

为每行分配唯一序号（同组内不重复，即使值相同）

```sql
SELECT name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS 薪资排名
FROM employees; -- 按薪资降序排序，为每个员工分配唯一排名（1,2,3...，相同薪资也按顺序排）
```

##### 194、排名函数（RANK）

排名相同则序号相同，后续序号跳过（如：1,2,2,4...）

```sql
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS 薪资排名
FROM employees; -- 薪资相同则排名相同，下一名次跳过（如：两个第2名，接下来是第4名）
```

##### 195、排名函数（DENSE\_RANK）

排名相同则序号相同，后续序号连续（如：1,2,2,3...）

```sql
SELECT name, salary,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS 薪资排名
FROM employees; -- 薪资相同则排名相同，下一名次连续（如：两个第2名，接下来是第3名）
```

##### 196、分区排名（PARTITION BY）

按指定列分区，在每个分区内单独排名

```sql
SELECT name, department_id, salary,
  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS 部门内薪资排名
FROM employees; -- 按部门分区，每个部门内按薪资降序排名（每个部门的排名从1开始）
```

##### 197、聚合窗口函数（SUM OVER）

计算窗口内的累计和（不聚合行，保留每行记录）

```sql
SELECT order_id, amount,
  SUM(amount) OVER (ORDER BY order_date) AS 累计销售额
FROM orders; -- 按订单日期排序，计算到当前行为止的累计销售额（每行都显示累计值）
```

##### 198、分区聚合（SUM OVER PARTITION）

按分区计算聚合值（每个分区内的总和）

```sql
SELECT name, department_id, salary,
  SUM(salary) OVER (PARTITION BY department_id) AS 部门总薪资
FROM employees; -- 按部门分区，显示每个员工所属部门的总薪资（同部门员工显示相同值）
```

##### 199、移动平均（AVG OVER 窗口帧）

计算指定窗口范围内的平均值（如：前N行到当前行）

```sql
SELECT order_date, amount,
  AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS 近3天平均
FROM daily_sales; -- 按日期排序，计算当前行及前2行（共3行）的平均销售额（移动平均）
```

##### 200、前后行取值（LAG）

获取当前行之前第N行的字段值

```sql
SELECT order_id, order_date,
  LAG(order_date, 1) OVER (ORDER BY order_date) AS 上一订单日期
FROM orders; -- 按日期排序，获取当前订单的上一个订单日期（第一行返回NULL）
```

##### 201、前后行取值（LEAD）

获取当前行之后第N行的字段值

```sql
SELECT order_id, order_date,
  LEAD(order_date, 1) OVER (ORDER BY order_date) AS 下一订单日期
FROM orders; -- 按日期排序，获取当前订单的下一个订单日期（最后一行返回NULL）
```

##### 202、首行/末行取值（FIRST\_VALUE/LAST\_VALUE）

获取窗口内的第一行或最后一行的字段值

```sql
SELECT name, salary,
  FIRST_VALUE(name) OVER (ORDER BY salary DESC) AS 最高薪员工,
  LAST_VALUE(name) OVER (ORDER BY salary DESC RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS 最低薪员工
FROM employees; -- 第一列显示最高薪员工（全表），第二列显示最低薪员工（需指定完整窗口范围）
```

##### 203、分箱函数（NTILE）

将数据按指定数量分组（分箱），返回组编号

```sql
SELECT name, salary,
  NTILE(4) OVER (ORDER BY salary DESC) AS 薪资等级
FROM employees; -- 按薪资降序排序，将员工分为4组（等级1-4），每组数量尽量平均
```

##### 204、窗口函数+筛选（子查询）

对窗口函数的结果进行筛选（窗口函数不能直接用在WHERE中）

```sql
SELECT * FROM (
  SELECT name, department_id, salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS 部门排名
  FROM employees
) t
WHERE 部门排名 = 1; -- 子查询计算部门内排名，主查询筛选出每个部门的第一名
```

##### 205、多窗口函数组合

在同一查询中使用多个窗口函数

```sql
SELECT name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS 全局序号,
  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS 部门排名,
  AVG(salary) OVER (PARTITION BY department_id) AS 部门平均薪资
FROM employees; -- 同时显示全局序号、部门排名和部门平均薪资
```

##### 206、窗口帧范围（ROWS）

按行数定义窗口范围（物理行）

```sql
SELECT date, sales,
  SUM(sales) OVER (ORDER BY date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS 三天总和
FROM daily_sales; -- 窗口范围为当前行、前1行和后1行（共3行），计算销售额总和
```

##### 207、窗口帧范围（RANGE）

按值范围定义窗口范围（逻辑范围，适用于数值/日期）

```sql
SELECT salary, COUNT(*) OVER (ORDER BY salary RANGE BETWEEN 1000 PRECEDING AND 1000 FOLLOWING) AS 相近薪资人数
FROM employees; -- 统计与当前薪资相差±1000范围内的员工数量
```

##### 208、窗口帧起点（UNBOUNDED PRECEDING）

窗口范围从第一行到当前行

```sql
SELECT month, sales,
  SUM(sales) OVER (ORDER BY month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS 累计销售额
FROM monthly_sales; -- 计算从第一行到当前行的累计销售额（按月份递增）
```

##### 209、百分比排名（PERCENT\_RANK）

计算当前行的相对排名百分比（(排名-1)/(总行数-1)）

```sql
SELECT name, salary,
  PERCENT_RANK() OVER (ORDER BY salary DESC) AS 薪资百分比排名
FROM employees; -- 返回0-1之间的百分比，值越小排名越靠前（最高薪为0，最低薪为1）
```

##### 210、累积分布（CUME\_DIST）

计算当前行及之前行的行数占总行数的比例

```sql
SELECT name, salary,
  CUME_DIST() OVER (ORDER BY salary DESC) AS 累积分布
FROM employees; -- 表示薪资大于等于当前行的员工占比（如：0.3表示30%的员工薪资≥当前值）
```

##### 211、NTH\_VALUE函数

返回窗口内第N行的指定字段值

```sql
SELECT name, salary,
  NTH_VALUE(name, 3) OVER (ORDER BY salary DESC) AS 第三名薪资员工
FROM employees; -- 按薪资降序，显示第三名员工的姓名（所有行都显示该值）
```

##### 212、窗口函数与CASE结合

在窗口函数中使用条件逻辑

```sql
SELECT name, department_id, salary,
  SUM(CASE WHEN gender = '男' THEN 1 ELSE 0 END) OVER (PARTITION BY department_id) AS 部门男性人数
FROM employees; -- 按部门分区，计算每个部门的男性员工数量
```

##### 213、窗口函数排序方向

指定窗口函数的排序方向（升序/降序）

```sql
SELECT name, hire_date,
  ROW_NUMBER() OVER (ORDER BY hire_date ASC) AS 入职顺序
FROM employees; -- 按入职日期升序（最早入职在前），分配入职顺序号
```

##### 214、多字段分区

按多个字段组合分区

```sql
SELECT name, department_id, job_id, salary,
  RANK() OVER (PARTITION BY department_id, job_id ORDER BY salary DESC) AS 岗位内排名
FROM employees; -- 按部门和岗位组合分区，每个分区内按薪资排名
```

##### 215、窗口函数与聚合函数区别

对比窗口函数与普通聚合函数（窗口函数不合并行）

```sql
-- 普通聚合（合并行）
SELECT department_id, AVG(salary) AS 部门平均 FROM employees GROUP BY department_id;
-- 窗口函数（保留所有行）
SELECT name, department_id, salary,
  AVG(salary) OVER (PARTITION BY department_id) AS 部门平均
FROM employees; -- 每行都显示部门平均薪资，不合并行
```

##### 216、窗口函数计算差异

计算当前行与某行的差值（如：与首行/前一行）

```sql
SELECT month, sales,
  sales - FIRST_VALUE(sales) OVER (ORDER BY month) AS 与首月差异,
  sales - LAG(sales, 1) OVER (ORDER BY month) AS 与上月差异
FROM monthly_sales; -- 计算每月销售额与首月、上月的差值
```

##### 217、窗口函数实现分页

用ROW\_NUMBER()实现分页查询

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (ORDER BY id) AS rn
  FROM products
) t
WHERE rn BETWEEN 21 AND 30; -- 子查询生成行号，主查询筛选21-30行（分页）
```

##### 218、窗口函数去重

按分区取每组的第一条记录（去重）

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY hire_date) AS rn
  FROM employees
) t
WHERE rn = 1; -- 按部门分区，取每个部门最早入职的员工（每组第一条）
```

##### 219、窗口函数计算占比

计算当前行值占分区总和的比例

```sql
SELECT name, department_id, salary,
  salary / SUM(salary) OVER (PARTITION BY department_id) AS 薪资占比
FROM employees; -- 计算每个员工薪资占其部门总薪资的比例
```

##### 220、窗口函数嵌套

窗口函数结果作为其他函数的参数

```sql
SELECT name, salary,
  ROUND(AVG(salary) OVER (ORDER BY salary), 2) AS 平均薪资（保留两位）
FROM employees; -- 对窗口函数计算的平均薪资取两位小数
```

#### 十一、公用表表达式（CTE）

##### 221、基础CTE（WITH子句）

定义临时结果集，增强查询可读性

```sql
WITH dept_avg AS (
  SELECT department_id, AVG(salary) AS avg_salary 
  FROM employees 
  GROUP BY department_id
)
SELECT e.name, e.salary, da.avg_salary
FROM employees e
INNER JOIN dept_avg da ON e.department_id = da.department_id; -- 定义CTE计算部门平均薪资，主查询关联使用
```

##### 222、多CTE定义

同时定义多个CTE，用逗号分隔

```sql
WITH 
  dept_avg AS (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id),
  dept_max AS (SELECT department_id, MAX(salary) AS max_sal FROM employees GROUP BY department_id)
SELECT da.department_id, da.avg_sal, dm.max_sal
FROM dept_avg da
INNER JOIN dept_max dm ON da.department_id = dm.department_id; -- 定义两个CTE（部门平均和最高薪资），主查询关联获取结果
```

##### 223、CTE嵌套

在CTE中引用另一个CTE

```sql
WITH 
  dept_total AS (SELECT department_id, SUM(salary) AS total_sal FROM employees GROUP BY department_id),
  company_total AS (SELECT SUM(total_sal) AS company_sal FROM dept_total) -- 引用dept_total
SELECT dt.department_id, dt.total_sal / ct.company_sal AS 部门薪资占比
FROM dept_total dt, company_total ct; -- 内层CTE依赖外层CTE，计算部门薪资占公司总薪资比例
```

##### 224、CTE与窗口函数结合

用CTE简化窗口函数查询

```sql
WITH ranked_emp AS (
  SELECT name, department_id, salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
  FROM employees
)
SELECT * FROM ranked_emp WHERE dept_rank <= 3; -- CTE计算部门内排名，主查询筛选前三名
```

##### 225、递归CTE（层级数据）

处理树形/层级结构数据（如：组织结构）

```sql
WITH RECURSIVE org_tree AS (
  -- 初始查询（根节点）
  SELECT id, name, parent_id, 1 AS level 
  FROM departments 
  WHERE parent_id IS NULL
  UNION ALL
  -- 递归查询（子节点）
  SELECT d.id, d.name, d.parent_id, ot.level + 1 AS level 
  FROM departments d
  INNER JOIN org_tree ot ON d.parent_id = ot.id
)
SELECT * FROM org_tree ORDER BY level, id; -- 递归查询部门层级结构，level表示层级深度
```

##### 226、递归CTE计算累积和

用递归CTE实现累积求和（替代窗口函数）

```sql
WITH RECURSIVE sales_cte AS (
  -- 初始查询（第一行）
  SELECT date, amount, amount AS cumulative_sum, ROW_NUMBER() OVER (ORDER BY date) AS rn
  FROM daily_sales
  WHERE rn = 1
  UNION ALL
  -- 递归查询（后续行）
  SELECT ds.date, ds.amount, sc.cumulative_sum + ds.amount, ds.rn
  FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY date) AS rn FROM daily_sales) ds
  INNER JOIN sales_cte sc ON ds.rn = sc.rn + 1
)
SELECT date, amount, cumulative_sum FROM sales_cte; -- 递归计算每日销售额的累积和
```

##### 227、CTE与分页结合

用CTE简化分页查询

```sql
WITH cte AS (
  SELECT *, ROW_NUMBER() OVER (ORDER BY id) AS rn
  FROM products
)
SELECT * FROM cte WHERE rn BETWEEN 11 AND 20; -- CTE生成行号，主查询筛选第11-20行（分页）
```

##### 228、CTE与UPDATE结合

用CTE更新表数据（部分数据库支持）

```sql
WITH dept_avg AS (
  SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id
)
UPDATE employees e
SET salary = e.salary * 1.1
WHERE e.salary < (SELECT avg_sal FROM dept_avg da WHERE da.department_id = e.department_id); -- 用CTE结果更新低于部门平均薪资的员工（涨10%）
```

##### 229、CTE与DELETE结合

用CTE删除表数据

```sql
WITH old_orders AS (
  SELECT id FROM orders WHERE order_date < '2020-01-01'
)
DELETE FROM orders WHERE id IN (SELECT id FROM old_orders); -- 删除2020年以前的订单，用CTE筛选目标ID
```

##### 230、CTE中的DISTINCT

在CTE中去重

```sql
WITH unique_categories AS (
  SELECT DISTINCT category_id, category_name FROM products WHERE price > 1000
)
SELECT * FROM unique_categories ORDER BY category_id; -- CTE筛选价格>1000的商品的不重复分类
```

##### 231、CTE中的条件逻辑

在CTE中使用CASE表达式

```sql
WITH salary_level AS (
  SELECT name, salary,
    CASE 
      WHEN salary > 10000 THEN 'A'
      WHEN salary > 5000 THEN 'B'
      ELSE 'C'
    END AS level
  FROM employees
)
SELECT level, COUNT(*) AS 人数 FROM salary_level GROUP BY level; -- CTE按薪资分级，主查询统计各级人数
```

##### 232、CTE与JOIN结合

多表连接结果作为CTE

```sql
WITH emp_dept AS (
  SELECT e.name, d.department_name, e.salary
  FROM employees e
  INNER JOIN departments d ON e.department_id = d.id
)
SELECT department_name, AVG(salary) AS 平均薪资 FROM emp_dept GROUP BY department_name; -- CTE存储连接结果，主查询计算平均薪资
```

##### 233、CTE的多次引用

在主查询中多次引用同一CTE

```sql
WITH dept_stats AS (
  SELECT department_id, AVG(salary) AS avg_sal, MAX(salary) AS max_sal FROM employees GROUP BY department_id
)
SELECT 
  (SELECT COUNT(*) FROM dept_stats WHERE avg_sal > 8000) AS 高平均部门数,
  (SELECT COUNT(*) FROM dept_stats WHERE max_sal > 15000) AS 有高薪部门数; -- 两次引用CTE，统计不同条件的部门数
```

##### 234、CTE中的聚合与筛选

在CTE中先聚合再筛选

```sql
WITH high_depts AS (
  SELECT department_id, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department_id
  HAVING AVG(salary) > 7000
)
SELECT e.name, e.salary, hd.avg_sal
FROM employees e
INNER JOIN high_depts hd ON e.department_id = hd.department_id; -- CTE筛选平均薪资>7000的部门，主查询关联员工
```

##### 235、CTE与日期处理

在CTE中处理日期数据

```sql
WITH monthly_sales AS (
  SELECT 
    YEAR(order_date) AS 年,
    MONTH(order_date) AS 月,
    SUM(amount) AS 销售额
  FROM orders
  GROUP BY 年, 月
)
SELECT 年, 月, 销售额 FROM monthly_sales WHERE 年 = 2023 ORDER BY 月; -- CTE按年月统计销售额，主查询筛选2023年数据
```

#### 十二、元数据查询

##### 236、查询表结构（DESCRIBE）

查看表的字段信息（MySQL简洁方式）

```
DESCRIBE employees; -- 显示employees表的字段名、类型、是否为NULL、键信息等
-- 简写
DESC employees; -- 与DESCRIBE功能相同
```

##### 237、查询表结构（INFORMATION\_SCHEMA）

通过系统表查询表结构（标准方式，支持多数据库）

```sql
SELECT 
  COLUMN_NAME AS 列名,
  DATA_TYPE AS 数据类型,
  IS_NULLABLE AS 是否允许NULL,
  COLUMN_KEY AS 键类型
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'employees' AND TABLE_SCHEMA = 'company_db'; -- 查询指定库（company_db）中表（employees）的字段详情
```

##### 238、查询数据库中的表（SHOW TABLES）

列出当前数据库中的所有表（MySQL）

```
SHOW TABLES; -- 显示当前数据库的所有表名
```

##### 239、查询数据库中的表（INFORMATION\_SCHEMA）

通过系统表查询数据库中的表（标准方式）

```sql
SELECT TABLE_NAME AS 表名
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'company_db' AND TABLE_TYPE = 'BASE TABLE'; -- 列出company_db库中的所有基表（排除视图）
```

##### 240、查询表的索引（SHOW INDEX）

查看表的所有索引信息（MySQL）

```
SHOW INDEX FROM employees; -- 显示employees表的所有索引，包括索引名、列名、索引类型等
```

##### 241、查询表的索引（INFORMATION\_SCHEMA）

通过系统表查询索引信息（标准方式）

```sql
SELECT 
  INDEX_NAME AS 索引名,
  COLUMN_NAME AS 索引列,
  INDEX_TYPE AS 索引类型
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_NAME = 'employees' AND TABLE_SCHEMA = 'company_db'; -- 查询employees表的索引详情
```

##### 242、查询视图定义（SHOW CREATE VIEW）

查看视图的创建语句（MySQL）

```
SHOW CREATE VIEW employee_view; -- 显示employee_view视图的完整创建SQL语句
```

##### 243、查询视图定义（INFORMATION\_SCHEMA）

通过系统表查询视图定义（标准方式）

```sql
SELECT VIEW_DEFINITION AS 视图定义
FROM INFORMATION_SCHEMA.VIEWS
WHERE TABLE_NAME = 'employee_view' AND TABLE_SCHEMA = 'company_db'; -- 查询employee_view视图的定义SQL
```

##### 244、查询外键关系（INFORMATION\_SCHEMA）

查询表的外键约束信息

```sql
SELECT 
  COLUMN_NAME AS 外键列,
  REFERENCED_TABLE_NAME AS 参考表,
  REFERENCED_COLUMN_NAME AS 参考列
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'employees' 
  AND TABLE_SCHEMA = 'company_db' 
  AND REFERENCED_TABLE_NAME IS NOT NULL; -- 查询employees表的外键关联（关联的表和列）
```

##### 245、查询存储过程列表（SHOW PROCEDURE STATUS）

查看数据库中的存储过程（MySQL）

```
SHOW PROCEDURE STATUS WHERE Db = 'company_db'; -- 显示company_db库中的所有存储过程信息
```

##### 246、查询存储过程定义（SHOW CREATE PROCEDURE）

查看存储过程的创建语句（MySQL）

```
SHOW CREATE PROCEDURE update_salary; -- 显示update_salary存储过程的完整创建代码
```

##### 247、查询触发器列表（SHOW TRIGGERS）

查看数据库中的触发器（MySQL）

```
SHOW TRIGGERS FROM company_db; -- 显示company_db库中的所有触发器信息
```

##### 248、查询表的大小（MySQL）

查看表的存储空间大小（数据+索引）

```sql
SELECT 
  TABLE_NAME AS 表名,
  ROUND(DATA_LENGTH / 1024 / 1024, 2) AS 数据大小(MB),
  ROUND(INDEX_LENGTH / 1024 / 1024, 2) AS 索引大小(MB)
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'company_db' AND TABLE_NAME = 'employees'; -- 查询employees表的数据和索引大小（MB）
```

##### 249、查询数据库大小（MySQL）

计算整个数据库的存储空间大小

```sql
SELECT 
  TABLE_SCHEMA AS 数据库名,
  ROUND(SUM(DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS 总大小(MB)
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'company_db'
GROUP BY TABLE_SCHEMA; -- 计算company_db库的总大小（数据+索引，单位MB）
```

##### 250、查询当前数据库连接（MySQL）

查看当前数据库的活跃连接

```
SHOW PROCESSLIST; -- 显示当前所有数据库连接的进程信息，包括ID、用户、状态等
```

##### 251、查询表的行数（近似值，MySQL）

快速获取表的行数（非精确值，来自统计信息）

```sql
SELECT TABLE_ROWS AS 近似行数
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'employees' AND TABLE_SCHEMA = 'company_db'; -- 快速获取employees表的近似行数（比COUNT(*)快）
```

##### 252、查询自增ID当前值（MySQL）

查看表的自增主键当前值

```sql
SELECT AUTO_INCREMENT AS 下一个自增值
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'employees' AND TABLE_SCHEMA = 'company_db'; -- 查看employees表下一个自增ID的值
```

#### 十三、现代数据库查询中的一些进阶场景

##### 253、获取当前时间（带时区）

查询当前系统时间及不同时区的时间，用于时间戳记录或跨时区业务。

```sql
-- MySQL：获取当前系统时间（含日期和时间）及UTC标准时间
SELECT 
  NOW() AS 当前系统时间, -- 格式：YYYY-MM-DD HH:MM:SS，受数据库时区影响
  UTC_TIMESTAMP() AS UTC时间; -- 世界协调时间，不受时区影响

-- PostgreSQL：获取指定时区（如：上海）的当前时间
SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Shanghai' AS 上海时间; -- 显式指定时区，适用于跨国业务
```

##### 254、日期加减（INTERVAL）

对日期进行加减运算，计算未来或过去的时间点，常用在有效期、到期日计算。

```sql
-- 对当前日期进行加减操作（支持day、month、year、hour等单位）
SELECT 
  CURRENT_DATE + INTERVAL '3 days' AS 三天后日期, -- 当前日期加3天
  CURRENT_DATE - INTERVAL '1 month' AS 一个月前日期, -- 当前日期减1个月
  NOW() + INTERVAL '2 hours' AS 两小时后时间; -- 当前时间加2小时
-- 注：INTERVAL是标准SQL语法，MySQL、PostgreSQL、Oracle均支持
```

##### 255、获取当月第一天和最后一天

快速定位当月时间范围，用于月度数据统计（如：“本月销售额”）。

```sql
-- MySQL：获取当月第一天和最后一天
SELECT 
  DATE_FORMAT(CURRENT_DATE, '%Y-%m-01') AS 当月第一天, -- 格式化当前日期为"年-月-01"（如：2023-10-01）
  LAST_DAY(CURRENT_DATE) AS 当月最后一天; -- 内置函数直接返回当月最后一天（如：2023-10-31）

-- PostgreSQL：获取当月第一天
SELECT (DATE_TRUNC('MONTH', CURRENT_DATE))::DATE AS 当月第一天; -- 截断到月份的第一天
```

##### 256、按周统计（周一为周首）

按自然周（周一至周日）分组统计数据，符合国内业务习惯（区别于周日为周首的国际标准）。

```sql
-- 按周一为每周起点，统计每周订单数
SELECT 
  -- 将订单日期转换为当周周一的日期（如：2023-10-12是周四，转换为2023-10-09）
  DATE_FORMAT(DATE_SUB(order_date, INTERVAL WEEKDAY(order_date) DAY), '%Y-%m-%d') AS 周一日期,
  COUNT(*) AS 周订单总数 -- 统计该周的订单数量
FROM orders
GROUP BY 周一日期 -- 按周一日期分组
ORDER BY 周一日期; -- 按时间排序
-- 注：WEEKDAY函数返回0（周一）到6（周日）的数字，DATE_SUB减去对应天数得到周一
```

##### 257、字符串拆分（按分隔符转多行）

将单行中的分隔符字符串（如：逗号分隔的标签）拆分为多行，便于按标签统计或关联查询。

```sql
-- MySQL 8.0+：将文章表的标签字段（逗号分隔）拆分为多行
SELECT 
  a.id AS 文章ID,
  -- 提取JSON数组中第n个元素并去除引号
  JSON_UNQUOTE(JSON_EXTRACT(a.tags, CONCAT('$[', n, ']'))) AS 标签
FROM 
  articles a,
  -- 生成数字序列（0、1、2），支持最多3个标签（可扩展更多行）
  (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2) AS nums
-- 只提取数组中存在的元素（避免空值）
WHERE JSON_LENGTH(a.tags) > n; 
-- 前提：tags字段需存储为JSON数组格式，如：["科技","教育","健康"]
-- 若为普通字符串（如："科技,教育,健康"），可先通过JSON_ARRAYAGG转换
```

##### 258、正则提取（REGEXP\_SUBSTR）

从字符串中提取符合正则规则的子串（如：手机号、邮箱），用于数据清洗或信息提取。

```sql
-- 从用户评论的备注中提取11位手机号
SELECT 
  id AS 评论ID,
  remark AS 原始备注,
  -- 正则匹配手机号：1开头，第2位3-9，后续9位数字（共11位）
  REGEXP_SUBSTR(remark, '1[3-9][0-9]{9}') AS 提取的手机号
FROM user_comments;

-- 提取邮箱地址（简单匹配）
SELECT REGEXP_SUBSTR(contact, '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}') AS 提取的邮箱
FROM customer_info;
```

##### 259、去除字符串前后空格（TRIM）

清洗字符串前后的空格或指定特殊字符（如：下划线、短横线），避免因格式问题导致的查询异常。

```sql
-- 去除姓名前后的空格
SELECT 
  name AS 原始姓名,
  TRIM(BOTH ' ' FROM name) AS 清洗后姓名 -- BOTH表示同时去除前后空格（默认行为）
FROM users 
WHERE name LIKE ' %' OR name LIKE '% '; -- 筛选明显有空格的记录

-- 去除前后的多种特殊字符（空格、下划线、短横线）
SELECT 
  TRIM(BOTH ' _-' FROM product_code) AS 清洗后编码
FROM products 
WHERE product_code LIKE '_%' OR product_code LIKE '%_'; -- 筛选带前缀/后缀特殊字符的记录
```

##### 260、分组内 Top N（每个部门薪资前三的员工）

在每个分组（如：部门）中筛选出排名前N的记录，用于业务中的“部门尖子生”、“区域Top3产品”等分析。

```sql
-- 用窗口函数实现每个部门薪资前三的员工查询
WITH ranked_emp AS (
  SELECT 
    name AS 员工姓名,
    department_id AS 部门ID,
    salary AS 薪资,
    -- 按部门分区，薪资降序排名（相同薪资不跳号）
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS 部门内排名
  FROM employees
)
-- 筛选排名前三的员工
SELECT 员工姓名, 部门ID, 薪资, 部门内排名
FROM ranked_emp 
WHERE 部门内排名 <= 3
ORDER BY 部门ID, 部门内排名;
-- 注：若需严格唯一排名（相同薪资按顺序排），可替换为ROW_NUMBER()
```

##### 261、累计占比（帕累托分析）

计算数据按某维度排序后的累计占比，用于帕累托分析（如：“20%的商品贡献80%的销售额”）。

```sql
-- 分析商品销售额的累计占比，识别核心商品
WITH product_sales AS (
  -- 计算每个商品的总销售额
  SELECT product_id AS 商品ID, SUM(amount) AS 销售额 FROM sales GROUP BY product_id
), sorted_sales AS (
  SELECT 
    商品ID,
    销售额,
    -- 按销售额降序计算累计销售额占比
    SUM(销售额) OVER (ORDER BY 销售额 DESC) / SUM(销售额) OVER () AS 累计占比
  FROM product_sales
)
-- 筛选贡献80%销售额的核心商品
SELECT 商品ID, 销售额, ROUND(累计占比 * 100, 2) AS 累计占比(%)
FROM sorted_sales 
WHERE 累计占比 <= 0.8
ORDER BY 销售额 DESC;
```

##### 262、同比/环比计算

计算时间序列数据的同比（与去年同期比）和环比（与上一期比）增长率，用于业务趋势分析。

```sql
-- 按月统计销售额，并计算同比和环比增长率
WITH monthly_sales AS (
  -- 按月聚合销售额
  SELECT 
    YEAR(order_date) AS 年,
    MONTH(order_date) AS 月,
    SUM(amount) AS 销售额
  FROM orders
  GROUP BY 年, 月
)
SELECT 
  年, 
  月, 
  销售额,
  -- 同比：(今年当月 - 去年同月) / 去年同月 * 100%
  ROUND(
    (销售额 - LAG(销售额, 12) OVER (ORDER BY 年, 月)) 
    / NULLIF(LAG(销售额, 12) OVER (ORDER BY 年, 月), 0) * 100, 2
  ) AS 同比增长率(%),
  -- 环比：(本月 - 上月) / 上月 * 100%
  ROUND(
    (销售额 - LAG(销售额, 1) OVER (ORDER BY 年, 月)) 
    / NULLIF(LAG(销售额, 1) OVER (ORDER BY 年, 月), 0) * 100, 2
  ) AS 环比增长率(%)
FROM monthly_sales
ORDER BY 年, 月;
-- 注：NULLIF避免除数为0，LAG(...,12)取12行前的数据（去年同月）
```

##### 263、查询JSON字段中的值

从JSON类型字段中提取指定键的值，适用于存储灵活结构数据（如：用户画像、商品属性）的场景。

```sql
-- MySQL：查询用户信息JSON字段中的详细信息
SELECT 
  id AS 用户ID,
  user_info->'$.phone' AS 手机号_raw, -- 直接提取（带引号）
  JSON_UNQUOTE(user_info->'$.phone') AS 手机号, -- 去引号
  user_info->'$.address.city' AS 城市_raw, -- 提取嵌套JSON的键
  JSON_UNQUOTE(user_info->'$.address.city') AS 城市 -- 嵌套提取并去引号
FROM users;
-- 前提：user_info字段为JSON类型，格式如：{"phone":"138****8000","address":{"city":"北京"}}

-- PostgreSQL：更简洁的JSON提取语法
SELECT 
  id AS 用户ID,
  user_info->>'phone' AS 手机号, -- ->>直接返回去引号的字符串
  user_info->'address'->>'city' AS 城市 -- 链式提取嵌套键
FROM users;
```

##### 264、JSON数组查询（判断包含元素）

查询JSON数组中包含指定元素的记录，适用于标签、权限等多值场景。

```sql
-- MySQL：查询标签包含“促销”的文章
SELECT id AS 文章ID, title AS 标题, tags AS 标签列表
FROM articles
-- JSON_CONTAINS判断JSON数组是否包含指定元素
WHERE JSON_CONTAINS(tags, JSON_ARRAY('促销'));
-- 前提：tags字段为JSON数组格式，如：["促销","新品","限时折扣"]

-- PostgreSQL：使用@>运算符判断数组包含关系
SELECT id AS 文章ID, title AS 标题, tags AS 标签列表
FROM articles
WHERE tags @> '["促销"]'::JSONB; -- JSONB类型支持高效的包含判断
```

##### 265、查看SQL执行计划

分析SQL语句的执行计划，判断是否使用索引、表连接方式等，用于优化查询性能。

```sql
-- MySQL：查看查询执行计划（不实际执行查询）
EXPLAIN 
SELECT * FROM employees 
WHERE department_id = 30 AND salary > 5000;
-- 关键字段说明：
-- type：连接类型（const > eq_ref > ref > range > ALL，ALL表示全表扫描，需优化）
-- key：实际使用的索引（NULL表示未使用索引）
-- rows：预计扫描的行数（值越小越好）

-- PostgreSQL：查看执行计划并包含实际执行统计（会执行查询）
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE order_date > '2023-01-01';
-- 可查看实际扫描行数、执行时间等，更精准地定位性能瓶颈
```

##### 266、查询表中重复数据（并去重）

识别表中重复记录（如：重复的用户信息），并删除冗余数据，保证数据唯一性。

```sql
-- 1. 查找name和email都重复的用户（复合重复）
SELECT 
  name AS 姓名, 
  email AS 邮箱, 
  COUNT(*) AS 重复次数
FROM users
GROUP BY name, email
HAVING COUNT(*) > 1; -- 筛选重复次数大于1的记录

-- 2. 删除重复数据（保留ID最小的记录）
DELETE FROM users
WHERE id NOT IN (
  -- 子查询获取每组重复记录中ID最小的记录
  SELECT MIN(id) FROM users GROUP BY name, email
);
-- 执行前建议备份数据，或先执行SELECT确认待删除的记录
```

##### 267、生成连续日期序列

生成指定范围内的连续日期，用于填充报表中缺失的日期（如：“某天无订单仍显示0”）。

```sql
-- MySQL：生成2023年10月1日至2023年10月31日的所有日期
WITH RECURSIVE date_series AS (
  SELECT '2023-10-01' AS dt -- 起始日期
  UNION ALL
  -- 递归加1天，直到结束日期
  SELECT DATE_ADD(dt, INTERVAL 1 DAY) 
  FROM date_series 
  WHERE dt < '2023-10-31' -- 结束日期
)
SELECT dt AS 连续日期 FROM date_series;

-- 应用：统计每天订单数（含无订单的日期）
SELECT 
  ds.dt AS 日期,
  COALESCE(COUNT(o.id), 0) AS 订单数 -- 无订单时显示0
FROM date_series ds
LEFT JOIN orders o ON DATE(o.order_date) = ds.dt
GROUP BY ds.dt
ORDER BY ds.dt;
```

##### 268、行转列（动态列名，适用于报表）

将按行存储的时间序列数据（如：每月销售额）转换为列（如：1月、2月...），便于生成矩阵式报表。

```sql
-- 将2023年各商品的月度销售额转为列（1月至12月）
SELECT 
  product_id AS 商品ID,
  -- 用MAX+CASE将月份行转为列（SUM适用于多记录，MAX适用于单记录）
  MAX(CASE WHEN 月 = 1 THEN 销售额 END) AS 1月销售额,
  MAX(CASE WHEN 月 = 2 THEN 销售额 END) AS 2月销售额,
  MAX(CASE WHEN 月 = 3 THEN 销售额 END) AS 3月销售额,
  -- 省略4-11月...
  MAX(CASE WHEN 月 = 12 THEN 销售额 END) AS 12月销售额
FROM (
  -- 子查询按月聚合销售额
  SELECT 
    product_id,
    MONTH(order_date) AS 月,
    SUM(amount) AS 销售额
  FROM orders
  WHERE YEAR(order_date) = 2023 -- 限定年份
  GROUP BY product_id, 月
) AS monthly_data
GROUP BY product_id
ORDER BY product_id;
```

##### 269、查询树状结构的所有子节点（递归CTE）

查询树形结构中某节点的所有子节点（含多级子节点），适用于部门层级、分类目录等场景。

```sql
-- 查询部门ID=1的所有子部门（含一级、二级、三级...子部门）
WITH RECURSIVE dept_tree AS (
  -- 起始查询：根节点（部门ID=1）
  SELECT id AS 部门ID, name AS 部门名称, parent_id AS 父部门ID
  FROM departments 
  WHERE id = 1
  UNION ALL
  -- 递归查询：通过父部门ID关联子部门
  SELECT 
    d.id AS 部门ID,
    d.name AS 部门名称,
    d.parent_id AS 父部门ID
  FROM departments d
  -- 关联CTE中的已有节点，获取其子节点
  INNER JOIN dept_tree dt ON d.parent_id = dt.部门ID
)
-- 输出所有子节点（含根节点）
SELECT * FROM dept_tree ORDER BY 父部门ID, 部门ID;
-- 若需排除根节点，可在最后加WHERE 部门ID != 1
```

以上269条常用SQL查询语句涵盖了数据查询语言(DQL)的大部分场景，包括基础查询、条件筛选、排序、聚合、连接、子查询、分页、条件逻辑、组合查询、窗口函数、CTE及元数据查询等等，我们日常干活能用到的场景基本都覆盖到了，可满足我们日常SQL查询需求。我们平时查数据、做统计，有了这些“模板”在手，基本不用愁了。