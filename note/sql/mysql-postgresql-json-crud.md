---
title: MySQL与PostgreSQL的JSON数据增删改查语句，JSONB与GIN索引对比
lastUpdated: 2026-10-12 02:00:00
---


实际应用场景中，我们谁没有见过JSON数据？配置文件、用户属性、日志数据、API响应……JSON，因其灵活、易读、无需预定义结构，成了半结构化数据的首选格式。比如，MySQL和PostgreSQL都支持JSON，但用起来差别巨大，一个像给文本字段加了点魔法，另一个像内置了文档数据库。今天我们就以这两个数据库为例介绍JSON，同时对比它们在JSON的增删改查(CRUD)操作表现：怎么取值？怎么改嵌套字段？怎么建索引加速？谁写起来更顺手？谁跑起来更快？无论我们想存点简单配置，还是打算拿JSON当核心数据模型，等我们看完这篇，JSON就能为我们所用。(昨天我在群内发这篇文章的预览，有同学反馈说表格显示不完整，检查发现，是“?|”、“||”在Markdown表格中“|”被解析为列分隔符，现在对“|”进行了“\\|”转义，如果有遗漏，敬请指正！)

#### 一、数据类型对比

PostgreSQL `JSONB`是真正的文档型字段，适合复杂、动态、高性能JSON场景；MySQL `JSON`是增强型文本字段，适合静态、轻量、辅助型存储。它们的数据类型对比，我们看表：

| 功能 | `MySQL` | `PostgreSQL` | 说明 |
| --- | --- | --- | --- |
| **`JSON`类型** | `JSON`(文本优化存储) | `JSON`(文本) / `JSONB`(二进制，推荐) | `MySQL`无二进制`JSON`类型；`PostgreSQL`的`JSONB`性能更高，功能更强 |
| **存储优化** | 文本存储，内部优化结构以加速查找 | `JSONB`存储为二进制，去除空格/重复键并排序键值 | `JSONB`的存储更紧凑，查询更快；`MySQL`的`JSON`仍受限于文本处理 |
| **索引支持** | 仅支持生成列(`Generated Columns`)上的二级索引 | `JSONB`支持强大的`GIN` / `GIST`索引，可直接索引整个`JSON`文档 | 这是`PostgreSQL`在`JSON`查询性能上碾压`MySQL`的关键点；`MySQL`的索引方式繁琐且不灵活 |
| **空值处理** | `NULL`字段可存入`JSON`列 | 同左 | 两者均支持`NULL`值，且`JSON`文档内部也支持`null`值 |

##### 1、我们说明一下：存储机制差异

PostgreSQL `JSONB`在存储效率、查询灵活性、更新性能上都优于MySQL `JSON`。

*   **MySQL `JSON`(文本优化存储)**MySQL的JSON类型是一个具有约束和优化的特殊数据类型。虽以文本为基础存储，但内部维护了结构化元数据以加速访问，可视为结构化文本或半结构化字段，但其底层机制仍依赖文本解析，与PostgreSQL JSONB的二进制原生结构有本质区别。虽然MySQL会对JSON文本进行内部结构化优化(如：建立快速查找路径、键值映射表)，但其底层仍以文本形式存储。这意味着：
    

*   每次读取需解析文本结构，开销较大。
    
*   不支持直接对任意JSON路径建立索引(必须通过“虚拟列/生成列”间接实现)。
    
*   我们的更新操作可能导致整个JSON字段重写(尤其大文档)，影响性能。
    

*   **PostgreSQL `JSONB`(二进制存储)**  
    `JSONB`将JSON文档解析后以二进制格式存储，结构紧凑、无需重复解析：
    

*   自动去除空格、标准化键顺序、去重键名。
    
*   支持我们直接建立GIN索引，可高效查询任意嵌套路径、数组元素、存在性判断等。
    
*   我们的更新操作(如：`jsonb_set`)可局部修改，避免全字段重写。
    

##### 2、我们的建议

(1)**对PostgreSQL用户**：

*   **始终默认使用**`JSONB`，除非你需要保留原始JSON格式(如：调试、审计、与外部系统严格格式对齐)。
    
*   **为高频查询路径建立GIN索引**，我们看例子：
    
    ```
    CREATE INDEX idx_user_profile_tags ON users USING GIN ((profile->'tags'));
    CREATE INDEX idx_logs_metadata ON logs USING GIN (metadata jsonb_path_ops);
    ```
    
*   使用`jsonb_path_query`、`jsonb_array_elements`等函数处理复杂嵌套或数组。
    

(2)**对MySQL用户**：

*   我们要接受其JSON功能的局限性，仅用于**轻量级配置、用户偏好、非核心查询字段**。
    
*   **我们如需查询性能，必须创建“虚拟列+索引”**：
    
    ```
    ALTER TABLE users ADD COLUMN user_city VARCHAR(100) 
      GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(profile, '$.address.city'))) STORED;
    CREATE INDEX idx_user_city ON users(user_city);
    ```
    
*   我们要避免在JSON中存储高频更新或大体积数据(如：日志、商品规格数组)，否则性能下降明显。
    
*   我们要考虑将核心查询字段“扁平化”到关系列中，JSON仅作补充。
    

##### 3、示例对比

**场景**：存储用户配置，我们需按“所在城市”和“兴趣标签数组”查询用户。

**PostgreSQL(`JSONB`)实现**：

```sql
-- 表结构
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    profile JSONB
);

-- 插入数据
INSERT INTO users (name, profile) VALUES
('Alice', '{"address": {"city": "Beijing"}, "tags": ["music", "travel"]}'::jsonb),
('Bob', '{"address": {"city": "Shanghai"}, "tags": ["sports", "coding"]}'::jsonb);

-- 建立索引(直接对JSONB内部路径)
CREATE INDEX idx_profile_city ON users USING GIN ((profile->'address'));
CREATE INDEX idx_profile_tags ON users USING GIN ((profile->'tags'));

-- 查询：住在“北京”且标签含“travel”的用户
SELECT * FROM users 
WHERE profile @> '{"address": {"city": "Beijing"}}'
  AND profile->'tags' ? 'travel';
```

高效、简洁、索引直接命中。

**MySQL(`JSON`)实现**：

```sql
-- 表结构
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    profile JSON
);

-- 插入数据
INSERT INTO users (name, profile) VALUES
('Alice', '{"address": {"city": "Beijing"}, "tags": ["music", "travel"]}'),
('Bob', '{"address": {"city": "Shanghai"}, "tags": ["sports", "coding"]}');

-- 必须创建虚拟列+索引
ALTER TABLE users ADD COLUMN city VARCHAR(100) 
  GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(profile, '$.address.city'))) STORED;
ALTER TABLE users ADD COLUMN has_travel_tag BOOLEAN 
  GENERATED ALWAYS AS (JSON_CONTAINS(profile->'$.tags', '"travel"')) STORED;

CREATE INDEX idx_city ON users(city);
CREATE INDEX idx_has_travel ON users(has_travel_tag);

-- 查询(必须依赖虚拟列)
SELECT * FROM users 
WHERE city = 'Beijing' AND has_travel_tag = 1;
```

繁琐、不灵活、无法动态查询任意标签(除非为每个标签建列)。

#### 二、查询操作(路径提取)

| 功能 | `MySQL` | `PostgreSQL` | 说明 |
| --- | --- | --- | --- |
| **提取标量值(结构化)** | `json_extract(col, '$.key')`或`col->'$.key'` | `col->'key'` | `MySQL`返回`JSON` 类型，客户端显示时字符串值保留双引号；`PostgreSQL`的`->`返回`jsonb`类型，按标准`JSON`格式输出(字符串带引号，数值/布尔值不带) |
| **提取文本(去引号)** | `col->>'$.key'` | `col->>'key'` | 两者均返回纯文本或数值(`text`类型)，适用于比较或展示。`MySQL`中我们建议用`->>` + 显式转换，避免隐式转换陷阱 |
| **提取数组元素** | `col->'$[0]'`或`json_extract(col, '$[0]')` | `col->0`(顶层为数组)或`col->'array_key'->0`(嵌套数组) | `MySQL`使用`$[0]`语法；`PostgreSQL`使用数字索引：仅当字段本身是数组时可用`->0`；若为对象内嵌数组，需先提取数组字段，如：`->'tags'->0` |
| **嵌套路径提取** | `col->'$.user.name'` | `col->'user'->>'name'`或`col #>> '{user,name}'` | `PostgreSQL`支持两种方式：① 链式操作符(`->` / `->>`)；② 完整路径数组语法(`#>`返回`jsonb`，`#>>`返回`text`)。`MySQL`仅支持`$`路径表达式，路径必须完整写出 |
| **条件查询 (`WHERE`)** | `WHERE col->'$.age' > 30`或`WHERE JSON_EXTRACT(col, '$.age') > 30` | `WHERE (col->>'age')::int > 30` | `PostgreSQL`中`->>`返回`text`，直接与数字比较会按字符串处理(如：`'5' > '30'` 结果为真)，**必须显式转换**(如：`::int`)避免逻辑错误；`MySQL`使用`->`返回`JSON`类型会尝试隐式转换，但行为不一致，我们推荐使用`->>`**获取文本后显式转换**，如：`(col->>'$.age') + 0 > 30`或`CAST(col->>'$.age' AS UNSIGNED)` |
| **判断键是否存在** | `JSON_CONTAINS_PATH(col, 'one', '$.key')`或`'all'`判断多个键 | `col ? 'key'`：`col ?| ARRAY['k1','k2']`(任一存在)；`col ?& ARRAY['k1','k2']`(全部存在)；`col ? 'user.name'`(嵌套键) | `PostgreSQL`语法简洁强大，支持单键、多键、嵌套键判断；`MySQL`依赖`JSON_CONTAINS_PATH`，语法冗长，支持`'one'`(任一)或`'all'`(全部)模式 |
| **判断数组包含值** | `JSON_CONTAINS(col->'$.tags', '"mysql"')` | `col->'tags' ? 'mysql'`(简单值)或`col->'tags' @> '[{"type":"db"}]'::jsonb`(复杂结构) | `PostgreSQL`对**简单标量值**可用`?`操作符；对**对象或嵌套结构**，需使用`@>`包含操作符；`MySQL`统一使用`JSON_CONTAINS`，但需手动构造`JSON`字符串(如：`'"mysql"'`或`'{"type":"db"}'`)，易出错 |

##### 1、我们说明一下：重要细节

(1)**PostgreSQL数组提取的上下文依赖性**：

*   `col->0`仅适用于`col`本身是JSON数组的情况。
    
*   若结构为`{"tags": ["a", "b"]}`，则必须写`col->'tags'->0`。
    
*   否则会报错：`ERROR: cannot extract element from an object`
    

(2)**PostgreSQL完整路径语法**(常被我们忽略，但非常有用)：

```
col #>  '{user, profile, preferences}'  -- 返回 jsonb
col #>> '{user, name}'                 -- 返回 text
```

支持任意深度嵌套，路径以文本数组形式传入，适合动态路径构建。

(3)**MySQL类型转换的推荐写法**：

```
-- 不可靠
WHERE col->'$.age' > 30

-- 我们的推荐写法
WHERE (col->>'$.age') + 0 > 30
-- 或
WHERE CAST(col->>'$.age' AS UNSIGNED) > 30
```

(4)**PostgreSQL嵌套键存在判断**：

```
-- 判断是否存在user.name(即使user存在，但name 不存在，也返回false)
WHERE col ? 'user.name'
```

这是PostgreSQL特有的“路径存在性”判断，MySQL无直接对应，我们需用`JSON_EXTRACT(col, '$.user.name') IS NOT NULL`

##### 2、JSON路径提取查询操作示例

**示例1**：我们要提取嵌套对象中的字段(用户地址信息)

```sql
-- MySQL
SELECT 
    name,
    profile->>'$.profile.address.city' AS city,
    profile->>'$.profile.address.zipcode' AS zipcode
FROM users;

-- PostgreSQL
SELECT 
    name,
    profile->'profile'->'address'->>'city' AS city,
    profile #>> '{profile,address,zipcode}' AS zipcode  -- 完整路径语法
FROM users;
```

PostgreSQL支持链式`->`和路径数组`#>>`；MySQL只能写完整`$`路径。

**示例2**：我们要提取数组中满足条件的第一个元素(第一个“编程”类爱好)

```sql
-- MySQL(仅提取第一个)
SELECT 
    name,
    hobbies->'$[0].name' AS first_hobby_name,
    hobbies->>'$[0].type' AS first_hobby_type
FROM users
WHERE JSON_EXTRACT(hobbies, '$[0].type') = 'tech';

-- PostgreSQL(提取第一个)
SELECT 
    name,
    hobbies->0->>'name' AS first_hobby_name,
    hobbies->0->>'type' AS first_hobby_type
FROM users
WHERE hobbies->0->>'type' = 'tech';
```

PostgreSQL条件提取任意匹配元素(PostgreSQL 12+)：

```sql
-- 提取第一个type = 'tech'的爱好名称
SELECT 
    name,
    jsonb_path_query_first(hobbies, '$[*] ? (@.type == "tech")')->>'name' AS tech_hobby_name
FROM users;
```

MySQL 8.0+条件提取(较繁琐)：

```sql
-- 使用JSON_SEARCH + JSON_EXTRACT组合(仅适用于简单值)
SELECT 
    name,
    JSON_EXTRACT(
        hobbies,
        REPLACE(
            JSON_UNQUOTE(JSON_SEARCH(hobbies, 'one', 'tech', NULL, '$[*].type')),
            '.type',
            ''
        )
    )->>'$.name' AS tech_hobby_name
FROM users
WHERE JSON_SEARCH(hobbies, 'one', 'tech', NULL, '$[*].type') IS NOT NULL;
```

MySQL方案复杂、性能差、易出错，仅适用于简单场景。

**示例3**：判断键是否存在+数组是否包含特定值(筛选活跃开发者)

```sql
-- MySQL
SELECT name
FROM users
WHERE 
    JSON_CONTAINS_PATH(profile, 'one', '$.github') = 1
    AND JSON_CONTAINS(profile->'$.tags', '"developer"')
    AND (profile->>'$.age') + 0 > 25;

-- PostgreSQL
SELECT name
FROM users
WHERE 
    profile ? 'github'
    AND profile->'tags' ? 'developer'
    AND (profile->>'age')::int > 25;
```

PostgreSQL语法简洁，性能更好(尤其配合GIN索引)。

**示例4**：我们要提取嵌套数组中的特定字段(获取所有项目的第一个负责人)

```sql
-- MySQL
SELECT 
    name,
    projects->'$[0].lead' AS first_project_lead
FROM teams;

-- PostgreSQL
SELECT 
    name,
    projects->0->>'lead' AS first_project_lead
FROM teams;
```

**示例5**(进阶)：我们要展开JSON数组，提取所有元素字段(一对多展开)

```sql
-- MySQL 8.0+使用JSON_TABLE(我们推荐)
SELECT 
    u.name,
    h.name AS hobby_name,
    h.type AS hobby_type
FROM users u
JOIN JSON_TABLE(
    u.profile->'$.hobbies',
    '$[*]' COLUMNS (
        name VARCHAR(50) PATH '$.name',
        type VARCHAR(50) PATH '$.type'
    )
) AS h;

-- PostgreSQL使用jsonb_array_elements(更简洁高效)
SELECT 
    u.name,
    h_elem->>'name' AS hobby_name,
    h_elem->>'type' AS hobby_type
FROM users u,
LATERAL jsonb_array_elements(u.profile->'hobbies') AS h_elem;
```

PostgreSQL在处理JSON数组方面的巨大优势，即，语法简洁、性能高，可与其他表JOIN。

**示例6**：安全提取(路径不存在时返回默认值)

```sql
-- MySQL(路径不存在返回NULL，无需NULLIF)
SELECT 
    name,
    COALESCE(profile->>'$.nickname', 'N/A') AS nickname  -- 移除了NULLIF
FROM users;

-- PostgreSQL(路径不存在返回NULL)
SELECT 
    name,
    COALESCE(profile->>'nickname', 'N/A') AS nickname
FROM users;
```

两者对不存在路径均返回`NULL`，行为一致，`COALESCE`足够。

**示例7**：动态路径提取(根据列值构建路径)

```sql
-- MySQL(性能差，我们不推荐在实际业务场景使用)
SELECT 
    name,
    JSON_EXTRACT(profile, path) AS value
FROM users, configs;

-- PostgreSQL 12+(使用jsonpath类型)
SELECT 
    name,
    jsonb_path_query_first(profile, path::jsonpath) #>> '{}' AS value
FROM users, configs;
-- 要求path字段内容，如：'$.settings.theme'(符合JSONPath规范)
```

MySQL和PostgreSQL对“完全动态路径”支持都不理想。我们建议：重构为固定路径+应用层路由，或使用`CASE WHEN`枚举有限路径，避免在WHERE中使用动态路径(无法使用索引)。

**示例8**：复杂结构判断(数组中是否包含特定对象)

```sql
-- MySQL(字段顺序无关，自动标准化)
SELECT name
FROM users
WHERE JSON_CONTAINS(
    profile->'$.permissions',
    '{"action": "write", "resource": "user"}'  -- 字段顺序可与存储不同
);

-- PostgreSQL(使用@>包含操作符)
SELECT name
FROM users
WHERE profile->'permissions' @> '[{"resource": "user", "action": "write"}]'::jsonb;
```

MySQL和PostgreSQL均支持“结构包含”判断，字段顺序不影响结果。

码字到这儿，想到CRUD操作(增删改查)应该放在一块，所以我们总结一下：**JSON查询操作(路径提取)核心语法**：

| 功能 | MySQL | PostgreSQL |
| --- | --- | --- |
| 提取文本 | `col->>'$.key'` | `col->>'key'` |
| 提取结构 | `col->'$.key'` | `col->'key'` |
| 数组元素 | `col->'$[0]'` | `col->0`或`col->'arr'->0` |
| 嵌套路径 | `col->'$.a.b.c'` | `col->'a'->'b'->>'c'`或`col#>>'{a,b,c}'` |
| 条件判断 | `JSON_CONTAINS_PATH(...)` | `col ? 'key'` / `@>` |
| 展开数组 | `JSON_TABLE`(8.0+) | `jsonb_array_elements` + `LATERAL` |

#### 三、更新操作(修改/新增/删除)

| 功能 | `MySQL` | `PostgreSQL` | 说明 |
| --- | --- | --- | --- |
| **设置/新增键值** | `JSON_SET(col, '$.key', 'value')` / `JSON_INSERT(col, '$.key', 'value')` | `jsonb_set(col, '{key}', '"value"')` `col || '{"key": "value"}'::jsonb`
¹

 | `MySQL`: `JSON_SET`覆盖或新增，`JSON_INSERT`仅新增。`PostgreSQL`: `jsonb_set`覆盖或新增；`||`对顶层键仅新增，对嵌套对象则递归合并。 |
| **删除键** | `JSON_REMOVE(col, '$.key')` | `col - 'key'`，`col #- '{nested,path}'`，`col - 0`(删除数组元素) | `PostgreSQL`用`-`删除对象键或数组元素，`#-`删除嵌套路径；`MySQL`统一用`JSON_REMOVE`。 |
| **修改数组元素** | `JSON_SET(col, '$.tags[0]', 'new_value')` | `jsonb_set(col, '{tags,0}', '"new_value"')` | 两者语法思路一致，`PostgreSQL`使用数组路径，更统一。 |
| **高级更新(嵌套路径)** | `JSON_SET(col, '$.user.name', 'Alice')` | `jsonb_set(col, '{user,name}', '"Alice"')` | `PostgreSQL`的`jsonb_set` 语法统一；`MySQL`使用`$`路径语法。 |
| **赋值更新** | `UPDATE ... SET col = JSON_SET(col, ...)` | `UPDATE ... SET col = jsonb_set(col, ...)` | 两者均需重新赋值整个字段。底层实现为不可变结构，返回新对象，非**原地更新**。 |

##### 1、我们先做两点说明

(1)**关于**`||`**操作符的递归合并示例**

```sql
SELECT '{"a": {"b": 1}}'::jsonb || '{"a": {"c": 2}}'::jsonb;
-- 结果: {"a": {"b": 1, "c": 2}} (递归合并了a对象)
```

(2)**MySQL更新函数行为对比表**

| 函数 | 路径不存在时 | 路径存在时 |
| --- | --- | --- |
| `JSON_SET` | 创建路径并赋值 | **覆盖**原值 |
| `JSON_INSERT` | 创建路径并赋值 | **忽略**(不做任何改变) |
| `JSON_REPLACE` | 不创建路径(无操作) | **替换**原值 |

**MySQL更新函数行为对比示例**：

假设原始数据：`{"name": "Bob"}`

| 函数 | 操作 | 结果 | 说明 |
| --- | --- | --- | --- |
| `JSON_SET(@j, '$.age', 25)` | 新增 | `{"name": "Bob", "age": 25}` | 路径不存在 → 创建 |
| `JSON_SET(@j, '$.name', 'Alice')` | 覆盖 | `{"name": "Alice"}` | 路径存在 → 覆盖 |
| `JSON_INSERT(@j, '$.age', 25)` | 新增 | `{"name": "Bob", "age": 25}` | 路径不存在 → 创建 |
| `JSON_INSERT(@j, '$.name', 'Alice')` | 无变化 | `{"name": "Bob"}` | 路径存在 → 忽略 |
| `JSON_REPLACE(@j, '$.name', 'Alice')` | 替换 | `{"name": "Alice"}` | 路径存在 → 替换 |
| `JSON_REPLACE(@j, '$.age', 25)` | 无变化 | `{"name": "Bob"}` | 路径不存在 → 无操作 |

##### 2、更新操作(修改/新增/删除)示例

我们先为两个数据库准备相同的初始数据：

**MySQL示例表**：

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    profile JSON
);

INSERT INTO users VALUES
(1, '{"name": "Bob", "age": 30, "tags": ["dev", "js"], "address": {"city": "Beijing"}}');
```

**PostgreSQL示例表**：

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    profile JSONB
);

INSERT INTO users VALUES
(1, '{"name": "Bob", "age": 30, "tags": ["dev", "js"], "address": {"city": "Beijing"}}'::jsonb);
```

**场景1**：我们新增一个顶层键`email`

MySQL实现：

```sql
-- 使用JSON_SET(路径不存在则创建)
UPDATE users SET profile = JSON_SET(profile, '$.email', 'bob@example.com') WHERE id = 1;

-- 使用JSON_INSERT(仅当路径不存在时插入)
UPDATE users SET profile = JSON_INSERT(profile, '$.email', 'bob@example.com') WHERE id = 1;
```

两者效果相同，因为`email`原本不存在。

PostgreSQL实现：

```sql
-- 使用jsonb_set(路径不存在则创建)
UPDATE users SET profile = jsonb_set(profile, '{email}', '"bob@example.com"') WHERE id = 1;

-- 使用||合并(仅对顶层键有效)
UPDATE users SET profile = profile || '{"email": "bob@example.com"}'::jsonb WHERE id = 1;
```

`||`是顶层合并，不会递归修改嵌套对象(除非对象本身被替换)。

**场景2**：覆盖已存在的键`name`

MySQL实现：

```sql
-- JSON_SET → 覆盖
UPDATE users SET profile = JSON_SET(profile, '$.name', 'Alice') WHERE id = 1;

-- JSON_INSERT → 忽略(因为 name 已存在)
UPDATE users SET profile = JSON_INSERT(profile, '$.name', 'Charlie') WHERE id = 1;
-- name仍为'Alice'，不会变成'Charlie'
```

PostgreSQL实现：

```sql
-- jsonb_set → 覆盖
UPDATE users SET profile = jsonb_set(profile, '{name}', '"Alice"') WHERE id = 1;

-- ||合并 → 覆盖顶层键
UPDATE users SET profile = profile || '{"name": "Charlie"}'::jsonb WHERE id = 1;
-- name 会变成 'Charlie'
```

注意：PostgreSQL的`||`对顶层键是“覆盖”，不是“忽略”。

**场景3**：我们删除`age`字段

MySQL实现：

```sql
UPDATE users SET profile = JSON_REMOVE(profile, '$.age') WHERE id = 1;
```

PostgreSQL实现：

```sql
UPDATE users SET profile = profile - 'age' WHERE id = 1;
```

**场景4**：我们删除嵌套路径`address.city`

MySQL实现：

```sql
UPDATE users SET profile = JSON_REMOVE(profile, '$.address.city') WHERE id = 1;
```

PostgreSQL实现：

```sql
UPDATE users SET profile = profile #- '{address,city}' WHERE id = 1;
```

`-`用于顶层键或数组索引；`#-`用在嵌套路径。

**场景5**：删除数组元素(如：删除`tags[0]`)

MySQL实现：

```sql
UPDATE users SET profile = JSON_REMOVE(profile, '$.tags[0]') WHERE id = 1;
-- tags 从 ["dev", "js"] → ["js"]
```

PostgreSQL实现：

```sql
UPDATE users SET profile = profile - 0 WHERE id = 1;
-- 注意：这是对整个JSONB的顶层操作，不适用于嵌套数组！

-- 正确方式：使用#-删除嵌套数组元素
UPDATE users SET profile = profile #- '{tags,0}' WHERE id = 1;
-- tags从["dev", "js"] → ["js"]
```

PostgreSQL中`- 0`只能用于顶层是数组的情况，如：`'[1,2,3]'::jsonb - 0`。对于对象中的数组，必须用`#-`。

**场景6**：修改`tags[0]`为`"backend"`

MySQL实现：

```sql
UPDATE users SET profile = JSON_SET(profile, '$.tags[0]', 'backend') WHERE id = 1;
```

PostgreSQL实现：

```sql
UPDATE users SET profile = jsonb_set(profile, '{tags,0}', '"backend"') WHERE id = 1;
```

MySQL和PostgreSQL语法高度相似，PostgreSQL使用`{tags,0}`路径风格，更统一。

**场景7**：设置`address.country = "China"`

MySQL实现：

```sql
UPDATE users SET profile = JSON_SET(profile, '$.address.country', 'China') WHERE id = 1;
```

PostgreSQL实现：

```sql
UPDATE users SET profile = jsonb_set(profile, '{address,country}', '"China"') WHERE id = 1;
```

PostgreSQL的`jsonb_set`支持自动创建中间路径(如：`address`对象不存在会自动创建)。

**场景8**(PostgreSQL`||`特性)：合并嵌套对象

```sql
SELECT '{"user": {"name": "Bob", "age": 30}}'::jsonb ||
       '{"user": {"city": "Shanghai"}, "extra": "data"}'::jsonb AS result;
```

**结果**：

```
{
  "user": {
    "name": "Bob",
    "age": 30,
    "city": "Shanghai"
  },
  "extra": "data"
}
```

`||`对同名对象会递归合并，而不是替换整个对象。这是**PostgreSQL特有的强大功能**。

#### 四、聚合与生成(行转JSON/JSON转行)

| 功能 | `MySQL` | `PostgreSQL` | 说明 |
| --- | --- | --- | --- |
| **行转`JSON`对象** | `JSON_OBJECT('key', col)` | `jsonb_build_object('key', col)` | 构建单个`JSON`对象，如：`{"name": "Alice"}` |
| **行转`JSON`数组** | `JSON_ARRAY(col1, col2)` | `jsonb_build_array(col1, col2)` | 构建`JSON`数组，如：`["Alice", 30]` |
| **聚合为`JSON`数组** | `JSON_ARRAYAGG(JSON_OBJECT('name', name))` | `jsonb_agg(jsonb_build_object('name', name))` | 常用在`GROUP BY`，如：“每个部门的员工列表” |
| **聚合为`JSON`对象(键值)** | `JSON_OBJECTAGG(name, age)` | `jsonb_object_agg(name, age)` | 构建键值对象，如：`{"Alice": 30, "Bob": 25}`。键名重复时：`MySQL`报错，`PostgreSQL`取最后一个值。 |
| **`JSON`数组转行(展开)** | `JSON_TABLE(col, '$[*]' COLUMNS (...))`(8.0+) | `jsonb_array_elements(col)` | `PostgreSQL`语法简洁；`MySQL`功能更强(支持路径过滤、列映射)。`jsonb_array_elements`需配合`LATERAL`(隐式或显式)。 |

##### 1、我们做几点补充说明

(1)**`jsonb_agg`类型**

PostgreSQL的`jsonb_agg`是`json_agg`的`jsonb`版本。如果聚合的元素是`jsonb`类型(如：`jsonb_build_object`的结果)，使用`jsonb_agg`性能更优，且结果为`jsonb`类型，支持后续操作符(如：`-`, `||`, `@>`)。

```sql
-- 我们推荐：聚合jsonb元素 → 用jsonb_agg
SELECT jsonb_agg(jsonb_build_object('name', name)) FROM users;

-- 不推荐：混合类型可能导致隐式转换开销
SELECT json_agg(jsonb_build_object('name', name)) FROM users;
```

(2)**键名冲突行为**

```sql
-- MySQL: 键名重复 → ERROR 3158 (42000)
SELECT JSON_OBJECTAGG('same_key', value) FROM (VALUES (1), (2)) t(value);
-- → ERROR: Duplicate key 'same_key' in JSON object

-- PostgreSQL: 键名重复 → 取最后一个值
SELECT jsonb_object_agg('same_key', value) FROM (VALUES (1), (2)) t(value);
-- → {"same_key": 2}
```

我们建议：确保聚合键唯一，或在应用层处理冲突。

(3)**`JSON_TABLE`路径过滤**：MySQL独有优势

```sql
-- MySQL 8.0+：只展开type = 'tech'的爱好
SELECT 
    u.name,
    h.name AS hobby_name
FROM users u
JOIN JSON_TABLE(
    u.profile->'$.hobbies',
    '$[*] ? (@.type == "tech")' COLUMNS (  -- 路径过滤！PostgreSQL无法在展开时直接过滤
        name VARCHAR(50) PATH '$.name'
    )
) AS h;
```

此功能可大幅减少中间结果集，提升性能。

(4)**`LATERAL`说明**：PostgreSQL展开原理

```sql
-- 显式写法(我们推荐用于复杂查询，语义清晰)
SELECT u.name, h_elem->>'name' AS hobby_name
FROM users u
CROSS JOIN LATERAL jsonb_array_elements(u.profile->'hobbies') AS h_elem;

-- 隐式写法(语法糖，等价于上面)
SELECT u.name, h_elem->>'name' AS hobby_name
FROM users u,
     jsonb_array_elements(u.profile->'hobbies') AS h_elem;  -- ← 这里隐含LATERAL
```

`LATERAL`表示右侧函数/子查询可引用左侧表的列，是“相关子查询”的集合化。

##### 2、聚合与生成(行转JSON/JSON转行)示例

我们先创建一个示例表`employees`：

MySQL：

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    department VARCHAR(50),
    skills JSON  -- 示例: ["Python", "SQL", "Go"]
);

INSERT INTO employees VALUES
(1, 'Alice', 30, 'Engineering', '["Python", "SQL"]'),
(2, 'Bob', 25, 'Engineering', '["Java", "SQL"]'),
(3, 'Carol', 28, 'Marketing', '["Photoshop", "Excel"]'),
(4, 'David', 32, 'Engineering', '["Python", "Go", "Docker"]');
```

PostgreSQL：

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INT,
    department TEXT,
    skills JSONB  -- 示例: ["Python", "SQL", "Go"]
);

INSERT INTO employees VALUES
(1, 'Alice', 30, 'Engineering', '["Python", "SQL"]'::jsonb),
(2, 'Bob', 25, 'Engineering', '["Java", "SQL"]'::jsonb),
(3, 'Carol', 28, 'Marketing', '["Photoshop", "Excel"]'::jsonb),
(4, 'David', 32, 'Engineering', '["Python", "Go", "Docker"]'::jsonb);
```

**示例1**：行转JSON对象

需求：我们为每位员工生成个人信息对象。

目标：生成如`{"name": "Alice", "age": 30}`这样的对象。

MySQL实现：

```sql
SELECT 
    id,
    JSON_OBJECT('name', name, 'age', age) AS profile
FROM employees;
```

**输出**：

```
{"name": "Alice", "age": 30}
{"name": "Bob", "age": 25}
...
```

PostgreSQL实现：

```sql
SELECT 
    id,
    jsonb_build_object('name', name, 'age', age) AS profile
FROM employees;
```

功能一致，PostgreSQL使用`jsonb_build_object`，结果为`jsonb`类型，更高效。

**示例2**：行转JSON数组

需求：生成每位员工的\[姓名, 年龄\]数组。

目标：生成如`["Alice", 30]`这样的数组。

MySQL实现：

```sql
SELECT 
    id,
    JSON_ARRAY(name, age) AS info
FROM employees;
```

PostgreSQL实现：

```sql
SELECT 
    id,
    jsonb_build_array(name, age) AS info
FROM employees;
```

MySQL和PostgreSQL功能一致，PostgreSQL使用`jsonb_build_array`。

**示例3**：聚合为JSON数组

需求：我们按部门聚合员工列表。

目标：每个部门输出员工对象数组，如：

```
[
  {"name": "Alice", "age": 30},
  {"name": "Bob", "age": 25}
]
```

MySQL实现：

```sql
SELECT 
    department,
    JSON_ARRAYAGG(
        JSON_OBJECT('name', name, 'age', age)
    ) AS employees
FROM employees
GROUP BY department;
```

PostgreSQL实现：

```sql
SELECT 
    department,
    jsonb_agg(
        jsonb_build_object('name', name, 'age', age)
    ) AS employees
FROM employees
GROUP BY department;
```

PostgreSQL的`jsonb_agg`性能更优，且支持`ORDER BY`内部排序：

```
jsonb_agg(...) WITHIN GROUP (ORDER BY age DESC)
```

**示例4**：聚合为JSON对象(键值对)

目标：生成如`{"Alice": 30, "Bob": 25}`这样的对象(员工名 → 年龄)。

MySQL实现：

```sql
SELECT 
    JSON_OBJECTAGG(name, age) AS name_age_map
FROM employees;
```

我们**注意**：如果`name`有重复，MySQL会报错：`ERROR 3158 (42000): JSON documents may not contain duplicate member names.`

PostgreSQL实现：

```sql
SELECT 
    jsonb_object_agg(name, age) AS name_age_map
FROM employees;
```

PostgreSQL不报错，遇到重复键时**保留最后一个值**。

实用技巧：我们可加`DISTINCT`或`ORDER BY`控制保留哪个值：

```
jsonb_object_agg(name, age ORDER BY id DESC)  -- 保留最新插入的
```

**示例5**：JSON数组转行(展开)

需求：我们要展开每位员工的技能列表。

目标：将`skills`数组展开成多行，统计每项技能被多少人掌握。

MySQL(8.0+)实现：

```sql
SELECT 
    s.skill,
    COUNT(*) AS user_count
FROM employees e
JOIN JSON_TABLE(
    e.skills,
    '$[*]' COLUMNS (
        skill VARCHAR(50) PATH '$'
    )
) AS s
GROUP BY s.skill
ORDER BY user_count DESC;
```

`JSON_TABLE`功能强大，支持复杂路径、多列映射、嵌套结构。

PostgreSQL实现：

```sql
SELECT 
    s.skill,
    COUNT(*) AS user_count
FROM employees e,
LATERAL jsonb_array_elements_text(e.skills) AS s(skill)
GROUP BY s.skill
ORDER BY user_count DESC;
```

语法更简洁，`jsonb_array_elements_text`返回 `text`，适合字符串数组；

若需保留原始类型(如数字、对象)，用`jsonb_array_elements`。

##### 3、扩展：PostgreSQL中处理JSON对象数组

假设数据是对象数组：

```
[
  {"type": "lang", "name": "Python"},
  {"type": "tool", "name": "Docker"}
]
```

PostgreSQL展开对象数组：

```sql
SELECT 
    s.elem->>'type' AS type,
    s.elem->>'name' AS name
FROM employees e,
LATERAL jsonb_array_elements(e.skills_detail) AS s(elem);
```

`->>`提取文本，`->`提取jsonb片段。

#### 五、索引优化

| 功能 | `MySQL` | `PostgreSQL` | 说明 |
| --- | --- | --- | --- |
| **直接索引整个`JSON`字段** | 仅支持对**JSON数组中的标量值**创建多值索引 | `USING GIN (col)`或`USING GIN (col jsonb_path_ops)` | `MySQL`多值索引仅用于`MEMBER OF`、`JSON_CONTAINS`等操作；`PostgreSQL GIN`索引支持`?`, `@>`, `?|`等丰富操作符。 |
| **虚拟列/表达式索引** | `ALTER TABLE t ADD vcol T AS (JSON_EXTRACT(col, '$.key')) [STORED]` + `CREATE INDEX idx ON t(vcol)` | `CREATE INDEX idx ON t ((col->>'key'))` `CREATE INDEX idx_partial ON t ((col->>'key')) WHERE (col->>'key') IS NOT NULL` | 两者均支持。`PostgreSQL`支持**部分索引**(带`WHERE`条件)，对稀疏字段更高效。提取后字段类型影响索引效率(如：int > text)。 |
| **索引键存在性/包含查询** | 多值索引 + `JSON_CONTAINS(col, '"value"', '$.array')`或虚拟列索引 + `vcol = 'value'` | `GIN`索引 + `col ? 'key'`或`col @> '{"key": "value"}'` | `PostgreSQL GIN`索引原生支持；`MySQL`需依赖多值索引或虚拟列。 |

##### 1、MySQL多值索引的说明

我们推荐使用`JSON_EXTRACT`专用语法

```sql
-- 推荐写法：明确表达对JSON数组的索引意图
CREATE TABLE users (
    id INT PRIMARY KEY,
    tags JSON,
    INDEX idx_tags ((JSON_EXTRACT(tags, '$'))) -- 专用语法，更清晰
);

-- 查询：查找tags包含"premium"的用户
SELECT * FROM users 
WHERE JSON_CONTAINS(tags, '"premium"');

-- 或使用 MEMBER OF
SELECT * FROM users 
WHERE 'premium' MEMBER OF (tags);
```

对比旧写法：

```
INDEX idx_tags ((CAST(tags AS CHAR(50) ARRAY))) -- 功能等价，但语义模糊
```

##### 2、索引优化的对比示例

示例数据准备(我们复用employees表)：

MySQL：

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    profile JSON
);

INSERT INTO employees (name, profile) VALUES
('Alice', '{"age": 30, "city": "Beijing", "tags": ["dev", "python"], "skills": {"Python": 5, "SQL": 4}}'),
('Bob', '{"age": 25, "city": "Shanghai", "tags": ["dev", "java"], "skills": {"Java": 4, "SQL": 3}}'),
('Carol', '{"age": 28, "city": "Beijing", "tags": ["design", "photoshop"], "skills": {"Photoshop": 5}}'),
('David', '{"age": 32, "city": "Guangzhou", "tags": ["dev", "go", "docker"], "skills": {"Go": 5, "Docker": 4}}');
```

PostgreSQL：

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT,
    profile JSONB
);

INSERT INTO employees (name, profile) VALUES
('Alice', '{"age": 30, "city": "Beijing", "tags": ["dev", "python"], "skills": {"Python": 5, "SQL": 4}}'::jsonb),
('Bob', '{"age": 25, "city": "Shanghai", "tags": ["dev", "java"], "skills": {"Java": 4, "SQL": 3}}'::jsonb),
('Carol', '{"age": 28, "city": "Beijing", "tags": ["design", "photoshop"], "skills": {"Photoshop": 5}}'::jsonb),
('David', '{"age": 32, "city": "Guangzhou", "tags": ["dev", "go", "docker"], "skills": {"Go": 5, "Docker": 4}}'::jsonb);
```

**示例1**：直接索引整个JSON字段

目标：对`tags`数组字段建立索引，加速`JSON_CONTAINS` / `?`查询。

MySQL实现：多值索引(仅支持数组标量)

```sql
-- 创建多值索引(MySQL 8.0.17+)
CREATE INDEX idx_tags ON employees ((CAST(profile->'$.tags' AS CHAR(50) ARRAY)));

-- 查询：查找包含"python"标签的用户
EXPLAIN FORMAT=JSON
SELECT * FROM employees 
WHERE JSON_CONTAINS(profile->'$.tags', '"python"');

-- 或使用MEMBER OF(语法更简洁)
SELECT * FROM employees 
WHERE 'python' MEMBER OF(profile->'$.tags');
```

**说明**：

*   仅支持**数组中的标量值**(字符串、数字等)，不支持对象。
    
*   索引仅对`JSON_CONTAINS`, `MEMBER OF`, `JSON_OVERLAPS`等操作有效。
    
*   `CAST(... AS ... ARRAY)`是必须语法。
    

PostgreSQL实现：GIN索引(功能强大)

```sql
-- 创建GIN索引(默认操作符类)
CREATE INDEX idx_profile_gin ON employees USING GIN (profile);

-- 查询：查找包含"python"标签的用户
EXPLAIN ANALYZE
SELECT * FROM employees 
WHERE profile->'tags' ? 'python';

-- 或更精确：整个文档包含 {"tags": [..., "python", ...]}
SELECT * FROM employees 
WHERE profile @> '{"tags": ["python"]}';
```

**说明**：

*   `GIN` 索引支持：
    

*   `?` — 键或数组元素存在
    
*   `@>` — 包含(文档子集)
    
*   `?|` — 任意一个元素存在
    
*   `?&` — 所有元素存在
    

*   性能极佳，适合复杂嵌套查询。
    

进阶：我们使用`jsonb_path_ops`减小索引体积(仅支持`@>`)：

```
CREATE INDEX idx_profile_path_ops ON employees USING GIN (profile jsonb_path_ops);
```

**示例2**：虚拟列/表达式索引

需求：我们要加速按城市查询。

目标：加速`WHERE profile->>'$.city' = 'Beijing'`类查询

MySQL实现：虚拟列 + 索引

```sql
-- 添加虚拟列(STORED可被索引)
ALTER TABLE employees 
ADD COLUMN city_virtual VARCHAR(50) 
GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(profile, '$.city'))) STORED;

-- 创建索引
CREATE INDEX idx_city_virtual ON employees(city_virtual);

-- 查询(走索引！)
EXPLAIN FORMAT=JSON
SELECT * FROM employees WHERE city_virtual = 'Beijing';
```

**说明**：

*   `STORED`虚拟列物理存储，可被索引。
    
*   `JSON_UNQUOTE`去掉引号，转为纯字符串。
    
*   不支持部分索引(WHERE条件过滤)。
    

PostgreSQL实现：表达式索引 + 部分索引

```sql
-- 我们创建表达式索引(直接索引提取路径)
CREATE INDEX idx_city_expr ON employees ((profile->>'city'));

-- 查询(走索引！)
EXPLAIN ANALYZE
SELECT * FROM employees WHERE profile->>'city' = 'Beijing';

-- 更高效：部分索引(只索引非空城市)
CREATE INDEX idx_city_partial ON employees ((profile->>'city')) 
WHERE profile ? 'city' AND profile->>'city' != '';

-- 查询仍可命中
SELECT * FROM employees WHERE profile->>'city' = 'Beijing';
```

**说明**：

*   `profile->>'city'`提取文本，自动推导类型。
    
*   **部分索引**对稀疏字段(如：可选字段)节省空间并提升效率。
    
*   类型明确(如：`->>`是`text`，`->`是`jsonb`)影响索引选择。
    

如果字段是数字，我们建议转为`int`建索引：

```
CREATE INDEX idx_age ON employees (((profile->>'age')::int));
```

**示例3**：索引键存在性/包含查询优化

目标：加速“是否存在city字段”或“是否包含特定技能”。

MySQL实现：依赖虚拟列或多值索引

```sql
-- 方案1：虚拟列判断存在性(低效)
ALTER TABLE employees ADD COLUMN has_city TINYINT AS (JSON_CONTAINS_PATH(profile, 'one', '$.city')) STORED;
CREATE INDEX idx_has_city ON employees(has_city);

SELECT * FROM employees WHERE has_city = 1;

-- 方案2：多值索引不支持键存在性 → 无法直接优化 `JSON_CONTAINS_PATH`
-- 只能靠虚拟列或全表扫描
```

**说明**：

*   MySQL**无原生JSON键存在性索引支持**。
    
*   `JSON_CONTAINS_PATH`无法使用多值索引 → 通常全表扫描。
    
*   我们推荐用虚拟列 + 索引模拟。
    

PostgreSQL实现：GIN索引原生支持键存在性

```sql
-- 确保有 GIN索引(前面已创建)
-- CREATE INDEX idx_profile_gin ON employees USING GIN (profile);

-- 查询：哪些用户有city字段？
EXPLAIN ANALYZE
SELECT * FROM employees WHERE profile ? 'city';

-- 查询：哪些用户技能包含"Python"？
SELECT * FROM employees WHERE profile->'skills' ? 'Python';

-- 查询：哪些用户profile包含 {"city": "Beijing"}？
SELECT * FROM employees WHERE profile @> '{"city": "Beijing"}';
```

**说明**：

*   `?`、`@>`等操作符**原生被GIN索引支持**，性能极佳。
    
*   无需额外虚拟列，语法简洁，功能强大。
    

##### 3、索引策略对比总结表

| 场景 | `MySQL`推荐 | `PostgreSQL`推荐 | 优势对比 |
| --- | --- | --- | --- |
| 数组元素查询 | 多值索引 + `MEMBER OF` | `GIN`索引 + `?` / `@>` | `PostgreSQL`更灵活强大 |
| 标量字段查询(如：`city`) | 虚拟列 + `B`树索引 | 表达式索引 + 可选部分索引 | `PostgreSQL`支持部分索引，更省空间 |
| 键存在性判断 | 虚拟列模拟 | `GIN`索引 + `?`原生支持 | `PostgreSQL`原生高效 |
| 嵌套对象包含查询 | 虚拟列或全表扫描 | `GIN`索引 + `@>` | `PostgreSQL`完胜 |
| 稀疏字段优化 | 不支持部分索引 | 部分索引 `WHERE` ... | `PostgreSQL`更省资源 |

##### 4、性能优化建议

(1)对**PostgreSQL**：

```
-- 1、对高频查询路径建表达式索引
CREATE INDEX idx_user_age ON users (((profile->>'age')::int));

-- 2、对稀疏字段用部分索引
CREATE INDEX idx_user_city_partial ON users ((profile->>'city')) 
WHERE profile ? 'city';

-- 3、对复杂包含查询用GIN
CREATE INDEX idx_profile_gin ON users USING GIN (profile jsonb_path_ops);

-- 4、组合索引应对多条件
CREATE INDEX idx_city_age ON users ((profile->>'city'), ((profile->>'age')::int));
```

(2)对**MySQL**：

```
-- 1、为常用提取字段建虚拟列 + 索引
ALTER TABLE users ADD COLUMN user_city VARCHAR(50) 
    GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(profile, '$.city'))) STORED;
CREATE INDEX idx_user_city ON users(user_city);

-- 2、数组字段用多值索引
CREATE INDEX idx_tags ON users ((CAST(profile->'$.tags' AS CHAR(50) ARRAY)));

-- 3、我们避免在WHERE/GROUP BY中直接使用JSON提取(无索引时极慢)
```

##### 5、技术选型建议

| 你想要... | 选`MySQL` | 选`PostgreSQL` | 一句话总结 |
| --- | --- | --- | --- |
| **简单标量字段加速** | 虚拟列+索引 | 表达式索引 + 部分索引 | 两者都能做，`MySQL`更直接，`PostgreSQL`更灵活。 |
| **数组元素查询** | 多值索引(语法繁琐) | `GIN` + `?`(简洁高效) | `PostgreSQL`胜出。查询数组元素是它的强项。 |
| **键存在性/嵌套包含** | 需虚拟列模拟 | `GIN`原生支持 | `PostgreSQL`胜出。原生支持`JSON`/嵌套结构的高效查询。 |
| **灵活索引+高性能复杂查询** | 有限 | 我们强烈推荐 | `PostgreSQL`胜出。在复杂查询和数据类型支持上更全面。 |

*   **选MySQL**：我们的应用主要是传统的OLTP业务(如：用户、订单管理)，数据结构相对简单，追求极致的部署和维护简便性。
    
*   **选PostgreSQL**：我们的应用需要处理大量非结构化或半结构化数据(如：用户画像、日志、配置文件)，经常需要对JSON或数组内部的数据进行复杂查询。
    

**一句话总结**：**PostgreSQL的**`jsonb`+`GIN`+**表达式/部分索引**组合，是目前JSON索引优化领域的“王者”；MySQL 8.0+虽有进步(多值索引、虚拟列)，但在灵活性、功能完整性上仍有差距。

#### 六、MySQL vs PostgreSQL JSON操作速查表

通用说明：

*   **MySQL**: 使用`JSON_EXTRACT(col, '$.path')`或简写`col->'$.path'`；字符串提取用`col->>'$.path'`
    
*   **PostgreSQL**: 使用`col->'key'`(返回jsonb)或`col->>'key'`(返回text)；路径用`{}`表示，如：`col#>'{a,b}'`
    

##### 1、查询与提取

| 功能 | `MySQL` | `PostgreSQL` |
| --- | --- | --- |
| 提取对象字段 | `col->'$.name'`或`JSON_EXTRACT(col, '$.name')` | `col->'name'` |
| 提取并转为文本 | `col->>'$.name'` | `col->>'name'` |
| 提取嵌套路径 | `col->'$.profile.age'` | `col#>'{profile,age}'` |
| 判断键是否存在 | `JSON_CONTAINS_PATH(col, 'one', '$.name')` | `col ? 'name'` |
| 判断包含子对象 | `JSON_CONTAINS(col, '{"status": "active"}')` | `col @> '{"status": "active"}'` |

##### 2、更新与修改

| 功能 | `MySQL` | `PostgreSQL` |
| --- | --- | --- |
| 设置/新增字段 | `JSON_SET(col, '$.name', 'Alice')` | `col || '{"name": "Alice"}'` |
| 替换字段(必须存在) | `JSON_REPLACE(col, '$.name', 'Bob')` | `jsonb_set(col, '{name}', '"Bob"')` |
| 删除字段 | `JSON_REMOVE(col, '$.name')` | `col - 'name'` |
| 追加数组元素 | `JSON_ARRAY_APPEND(col, '$.hobbies', 'swim')` | `col || '{"hobbies": ["swim"]}'`(需合并)或`jsonb_insert` |

PostgreSQL追加数组示例：

```sql
-- 将"swim"追加到hobbies数组末尾
UPDATE users SET profile = jsonb_set(
    profile,
    '{hobbies}',
    (profile->'hobbies') || '"swim"'
) WHERE id = 1;
```

##### 3、聚合与生成

| 功能 | `MySQL` | `PostgreSQL` |
| --- | --- | --- |
| 行转`JSON`对象 | `JSON_OBJECT('name', name, 'age', age)` | `jsonb_build_object('name', name, 'age', age)` |
| 行转`JSON`数组 | `JSON_ARRAY(name, age)` | `jsonb_build_array(name, age)` |
| 聚合为`JSON`数组 | `JSON_ARRAYAGG(JSON_OBJECT('name', name))` | `jsonb_agg(jsonb_build_object('name', name))` |
| 聚合为键值对象 | `JSON_OBJECTAGG(name, age)` | `jsonb_object_agg(name, age)` |
| `JSON`数组转行 | `JSON_TABLE(col, '$[*]' COLUMNS (name VARCHAR(50) PATH '$.name'))` | `jsonb_array_elements(col)` |

##### 4、索引与优化

| 功能 | `MySQL` | `PostgreSQL` |
| --- | --- | --- |
| 索引JSON数组 | `INDEX idx ((JSON_EXTRACT(tags, '$')))` | `USING GIN (tags)` |
| 索引特定路径 | `ALTER TABLE t ADD vcol AS (JSON_EXTRACT(col, '$.age')) STORED; CREATE INDEX idx ON t(vcol)` | `CREATE INDEX idx ON t ((col->>'age'))` |
| 条件索引(部分索引) | 不支持 | `CREATE INDEX idx ON t ((col->>'age')) WHERE (col->>'age') IS NOT NULL` |
| 优化包含查询 | 多值索引 + `JSON_CONTAINS` | `USING GIN (col jsonb_path_ops)` + `@>` |