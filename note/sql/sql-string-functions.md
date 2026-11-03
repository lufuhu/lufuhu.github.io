---
title: 45个SQL字符串处理函数详解，覆盖拼接截取替换与正则场景
lastUpdated: 2026-07-11 04:00:00
---


在数据处理与分析中，字符串操作是不可或缺的环节。无论是清洗繁杂的文本数据、提取关键信息，还是格式化输出结果，都离不开 SQL 字符串处理函数。SQL 字符串处理函数覆盖了拼接、截取、替换、查找等多种应用场景，适配 MySQL、Oracle、Hive 等主流数据库，却因SQL语法细节和功能差异常让我们混淆。下面整理了 45 个常用 SQL 字符串处理函数，从基础的大小写转换到复杂的正则匹配、JSON 解析，一一简单介绍其作用、语法结构及应用示例，仅供参考。

#### 一、字符串拼接函数

1、**CONCAT**()：将多个字符串拼接为一个字符串，任何参数为NULL则返回NULL。

*   语法：`CONCAT(str1, str2, ...)`
    
*   示例：`CONCAT('SQL', ' ', '字符串')` → `'SQL 字符串'`
    

2、**CONCAT\_WS**()：使用指定分隔符拼接字符串，忽略NULL值。

*   语法：`CONCAT_WS(separator, str1, str2, ...)`
    
*   示例：`CONCAT_WS('-', '2023', '10', NULL, '05')` → `'2023-10-05'`
    

3、|| 运算符：字符串拼接（部分数据库支持，如Oracle、PostgreSQL）。

*   语法：`str1 || str2 || ...`
    
*   示例：`'Hello' || ' ' || 'World'` → `'Hello World'`
    

#### 二、字符串长度与测量函数

4、**LENGTH**() / **LEN**()：返回字符串的字节数（LENGTH）或字符数（LEN，SQL Server）。

*   语法：`LENGTH(str)` / `LEN(str)`
    
*   示例：`LENGTH('中国')` → 2（GBK编码）；`LEN('abc')` → 3
    

5、**CHAR\_LENGTH**() / **CHARACTER\_LENGTH**()：返回字符串的字符数（忽略编码，按字符计数）。

*   语法：`CHAR_LENGTH(str)`
    
*   示例：`CHAR_LENGTH('中国abc')` → 5
    

6、**BIT\_LENGTH**()：返回字符串的比特数（1字节=8比特）。

*   语法：`BIT_LENGTH(str)`
    
*   示例：`BIT_LENGTH('a')` → 8
    

#### 三、字符串截取与提取函数

7、**SUBSTRING**() / **SUBSTR**()：从指定位置截取指定长度的子串（start为正数从左开始，负数从右开始）。

*   语法：`SUBSTRING(str, start, length)` / `SUBSTR(str, start, length)`
    
*   示例：`SUBSTRING('SQL字符串', 2, 3)` → `'QL字'`；`SUBSTR('数据库', -2)` → `'据库'`
    

8、**LEFT**()：返回字符串左侧指定长度的子串。

*   语法：`LEFT(str, length)`
    
*   示例：`LEFT('数据分析', 2)` → `'数据'`
    

9、**RIGHT**()：返回字符串右侧指定长度的子串。

*   语法：`RIGHT(str, length)`
    
*   示例：`RIGHT('Python', 3)` → `'hon'`
    

10、**SUBSTRING\_INDEX**()：按分隔符截取子串，count为正数取左侧第count个分隔符前的内容，负数取右侧。

*   语法：`SUBSTRING_INDEX(str, delimiter, count)`
    
*   示例：`SUBSTRING_INDEX('a.b.c.d', '.', 2)` → `'a.b'`；`SUBSTRING_INDEX('a.b.c.d', '.', -2)` → `'c.d'`
    

#### 四、字符串替换与修改函数

11、**REPLACE**()：将字符串中所有old\_str替换为new\_str。

*   语法：`REPLACE(str, old_str, new_str)`
    
*   示例：`REPLACE('abc123abc', 'abc', 'xyz')` → `'xyz123xyz'`
    

12、**INSERT**()：从start位置删除length长度的字符，替换为new\_str。

*   语法：`INSERT(str, start, length, new_str)`
    
*   示例：`INSERT('Hello World', 7, 5, 'SQL')` → `'Hello SQL'`
    

13、**TRANSLATE**()：按字符映射替换（from\_str和to\_str一一对应）。

*   语法：`TRANSLATE(str, from_str, to_str)`
    
*   示例：`TRANSLATE('123-abc', '1a', 'Xx')` → `'X23-xbc'`
    

14、**REGEXP\_REPLACE**()：用指定字符串替换匹配正则表达式的部分。

*   语法：`REGEXP_REPLACE(str, regex, replace_str)`
    
*   示例：`REGEXP_REPLACE('a1b2c3', '[0-9]', '*')` → `'a*b*c*'`；`REGEXP_REPLACE('hello_2023_world', '_(\\d+)_', '-')` → `'hello-2023-world'`
    

#### 五、大小写转换函数

15、**UPPER**() / **UCASE**()：将字符串转为大写。

*   语法：`UPPER(str)` / `UCASE(str)`
    
*   示例：`UPPER('Hello')` → `'HELLO'`
    

16、**LOWER**() / **LCASE**()：将字符串转为小写。

*   语法：`LOWER(str)` / `LCASE(str)`
    
*   示例：`LOWER('WORLD')` → `'world'`
    

17、**INITCAP**()：将每个单词的首字母转为大写，其余小写（Oracle、PostgreSQL支持）。

*   语法：`INITCAP(str)`
    
*   示例：`INITCAP('hello world')` → `'Hello World'`；`initcap('hello world sql')` → `'Hello World Sql'`
    

#### 六、空格处理函数

18、**LTRIM**()：去除字符串左侧空格。

*   语法：`LTRIM(str)`
    
*   示例：`LTRIM('  abc  ')` → `'abc  '`
    

19、**RTRIM**()：去除字符串右侧空格。

*   语法：`RTRIM(str)`
    
*   示例：`RTRIM('  abc  ')` → `'  abc'`
    

20、**TRIM**()：去除指定位置的指定字符（默认两侧空格）。

*   语法：`TRIM([BOTH/LEADING/TRAILING] trim_str FROM str)`（默认去除两侧空格）
    
*   示例：`TRIM('x' FROM 'xxabcxx')` → `'abc'`；`TRIM(LEADING ' ' FROM '  test')` → `'test'`
    

21、**SPACE**()：生成n个空格的字符串。

*   语法：`SPACE(n)`
    
*   示例：`CONCAT('a', SPACE(2), 'b')` → `'a  b'`
    

#### 七、字符串查找与定位函数

22、**LOCATE**() / **POSITION**()：返回子串在字符串中首次出现的位置（从1开始，未找到返回0）。

*   语法：`LOCATE(substr, str[, start])` / `POSITION(substr IN str)`
    
*   示例：`LOCATE('ab', 'aababc')` → 2；`POSITION('cd' IN 'abc')` → 0；`LOCATE('ab', 'aabab', 2)` → 4（从位置2开始查找）
    

23、**INSTR**()：返回子串在字符串中首次出现的位置（Oracle等数据库，与LOCATE参数顺序相反）。

*   语法：`INSTR(str, substr)`
    
*   示例：`INSTR('abcde', 'cd')` → 3；`INSTR('hello world', 'o')` → 5
    

24、**FIELD**()：返回str在后续字符串列表中的位置（未找到返回0）。

*   语法：`FIELD(str, str1, str2, ...)`
    
*   示例：`FIELD('b', 'a', 'b', 'c')` → 2
    

25、**FIND\_IN\_SET**()：返回str在逗号分隔的字符串列表中的位置（未找到返回0）。

*   语法：`FIND_IN_SET(str, str_list)`
    
*   示例：`FIND_IN_SET('b', 'a,b,c,d')` → 2；`FIND_IN_SET('mysql', 'hive,mysql,spark')` → 2
    

#### 八、字符串拆分与合并函数

26、**SPLIT\_STR**()：按分隔符拆分字符串，返回第pos个元素（MySQL支持）。

*   语法：`SPLIT_STR(str, delimiter, pos)`
    
*   示例：`SPLIT_STR('a,b,c,d', ',', 3)` → `'c'`
    

27、**STRING\_AGG**()：将多行字符串按分隔符合并（SQL Server、PostgreSQL等）。

*   语法：`STRING_AGG(expr, separator)`
    
*   示例：对表中`name`列`('a','b','c')`执行`STRING_AGG(name, ';')` → `'a;b;c'`
    

28、**REGEXP\_SPLIT\_TO\_TABLE**()：按正则表达式拆分字符串为多行（PostgreSQL支持）。

*   语法：`REGEXP_SPLIT_TO_TABLE(str, regex)`
    
*   示例：`REGEXP_SPLIT_TO_TABLE('a,b;c', '[;,]')` → 返回3行：`a`、`b`、`c`
    

29、**SPLIT**()（部分数据库支持，如Hive、PostgreSQL）：按分隔符将字符串拆分为数组。

*   语法：`SPLIT(str, separator)`
    
*   示例：`SPLIT('a,b,c,d', ',')` → `['a', 'b', 'c', 'd']`（数组格式）
    

30、**split\_part**()（Hive等支持）：按分隔符拆分字符串后，返回指定位置的子串（位置从1开始）。

*   语法：`split_part(str, delimiter, position)`
    
*   示例：`split_part('a,b,c,d', ',', 3)` → `'c'`
    

#### 九、正则表达式函数

31、**REGEXP\_LIKE**()：判断字符串是否匹配正则表达式（返回布尔值或1/0）。

*   语法：`REGEXP_LIKE(str, regex)`
    
*   示例：`REGEXP_LIKE('123abc', '^[0-9]+$')` → 0（不匹配纯数字）
    

32、**REGEXP\_SUBSTR**()：返回字符串中匹配正则表达式的子串。

*   语法：`REGEXP_SUBSTR(str, regex)`
    
*   示例：`REGEXP_SUBSTR('abc123def', '[0-9]+')` → `'123'`；`REGEXP_SUBSTR('a1b2c3d4', '[a-z]', 1, 3)` → `'c'`（从位置1开始，提取第3个小写字母）
    

33、**regexp\_extract**()（Hive支持）：通过正则表达式提取指定分组的内容（group\_index=0返回整个匹配，1返回第一个分组）。

*   语法：`regexp_extract(str, regex, group_index)`
    
*   示例：`regexp_extract('user_123_name', 'user_(\\d+)_name', 1)` → `'123'`
    

#### 十、字符编码与转换函数

34、**ASCII**()：返回字符串首字符的 ASCII 码值（仅对单字节字符有效，多字节字符返回首字节的编码值，非完整字符编码）。

*   语法：`ASCII(str)`
    
*   示例：ASCII('A') → 65（单字节字符，直接返回 ASCII 码）；ASCII('中') → 178（GBK 编码下首字节值，编码不同结果不同）；若需获取中文的 Unicode 编码，应使用UNICODE('中') → 20013
    

35、**CHAR**()：将ASCII码转为对应字符。

*   语法：`CHAR(n1, n2, ...)`
    
*   示例：`CHAR(65, 66)` → `'AB'`；`CHAR(72, 101, 108, 108, 111)` → `'Hello'`
    

36、**CONVERT**() / **CAST**()：转换字符串编码（CONVERT）或数据类型（CAST）。

*   语法：`CONVERT(str USING charset)` / `CAST(str AS type)`
    
*   示例：`CONVERT('测试' USING utf8)` → 按utf8编码转换；`CAST('123' AS UNSIGNED)` → 123
    

#### 十一、字符串填充函数

37、**LPAD**()：在字符串左侧用指定字符填充，直到达到指定长度（若原字符串长度超过指定长度，则截断）。

*   语法：`LPAD(str, length, pad_str)`
    
*   示例：`LPAD('123', 5, '0')` → `'00123'`；`LPAD('abcdef', 4, 'x')` → `'abcd'`
    

38、**RPAD**()：在字符串右侧用指定字符填充，规则同LPAD。

*   语法：`RPAD(str, length, pad_str)`
    
*   示例：`RPAD('ID', 5, '0')` → `'ID000'`
    

#### 十二、其他字符串函数

39、**REPEAT**()：将字符串重复n次。

*   语法：`REPEAT(str, n)`
    
*   示例：`REPEAT('ab', 3)` → `'ababab'`
    

40、**REVERSE**()：反转字符串。

*   语法：`REVERSE(str)`
    
*   示例：`REVERSE('abc')` → `'cba'`；`REVERSE('reverse')` → `'esrever'`
    

41、**STRCMP**()：比较两个字符串（相等返回0，str1>str2返回1，否则返回-1）。

*   语法：`STRCMP(str1, str2)`
    
*   示例：`STRCMP('abc', 'abd')` → -1
    

42、**FORMAT**()：将数字格式化为带千分位的字符串，并保留指定小数位数。

*   语法：`FORMAT(number, decimal_places)`
    
*   示例：`FORMAT(1234567.89, 2)` → `'1,234,567.89'`
    

43、**UNHEX**()：将十六进制字符串转换为二进制字符串（反向为HEX函数）。

*   语法：`UNHEX(str)`
    
*   示例：`UNHEX('48656C6C6F')` → `'Hello'`
    

44、**GET\_JSON\_OBJECT**()（Hive支持）：从JSON字符串中提取指定路径的值。

*   语法：`GET_JSON_OBJECT(json_str, '$.path')`
    
*   示例：`GET_JSON_OBJECT('{"name":"Alice", "age":25}', '$.name')` → `'Alice'`
    

45、**COLLECT\_SET + CONCAT\_WS**()（Hive聚合拼接）：将分组内的列值去重后，用sep拼接成字符串（常用于“列转行”）。

*   语法：`CONCAT_WS(sep, COLLECT_SET(column))`
    
*   示例：若表`student`有数据`(1, 'math'), (1, 'english'), (2, 'math')`，则`SELECT id, CONCAT_WS(';', COLLECT_SET(subject)) AS subjects FROM student GROUP BY id` → 结果：`(1, 'math;english'), (2, 'math')`
    

以上 SQL 字符串处理函数，从简单的空格清理到复杂的正则提取、JSON 解析，每一类函数都有其独特价值。不同数据库对函数的支持存在细微差异（如 Hive 的GET\_JSON\_OBJECT、PostgreSQL 的REGEXP\_SPLIT\_TO\_TABLE），实际使用时需结合具体场景和数据库特性选择。掌握这些函数不仅能简化数据清洗流程，更能解锁复杂文本分析的可能性。