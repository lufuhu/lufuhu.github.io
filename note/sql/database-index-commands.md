---
title: MySQL、PostgreSQL、SQL Server、Oracle四大数据库索引命令速查
lastUpdated: 2026-08-07 04:00:00
---


在SQL数据库中，索引就像书的目录。没有它，我们找数据就得一页一页地翻；有了它，我们光速定位不是梦！但是索引怎么建？何时用？如何优化？各数据库（如：MySQL、PostgreSQL、SQL Server、Oracle）语法略有不同。本文汇总四大主流数据库的索引命令大全，从创建、查看到维护、调优，一网打尽。无论我们是开发、DBA还是运维，都能快速上手！仅供参考。

#### 一、MySQL索引命令

##### 1、索引创建命令

**基本索引创建**：

```sql
-- 1.创建普通索引（单列索引）
-- 语法：CREATE INDEX index_name ON table_name (column_name)
CREATE INDEX idx_user_email ON users (email);
-- 输出示例：Query OK, 0 rows affected (0.45 sec)
-- 说明：在users表的email列上创建名为idx_user_email的索引

-- 2.创建唯一索引
-- 语法：CREATE UNIQUE INDEX index_name ON table_name (column_name)
CREATE UNIQUE INDEX uq_user_username ON users (username);
-- 输出示例：Query OK, 0 rows affected (0.38 sec)
-- 说明：创建唯一索引，确保username列值唯一

-- 3.创建复合索引（多列索引）
-- 语法：CREATE INDEX index_name ON table_name (col1, col2, ...)
CREATE INDEX idx_user_name_email ON users (last_name, first_name, email);
-- 输出示例：Query OK, 0 rows affected (0.52 sec)
-- 说明：在last_name、first_name、email三列上创建联合索引（复合索引）

-- 4.创建前缀索引（字符串列的部分索引）
-- 语法：CREATE INDEX index_name ON table_name (column_name(length))
CREATE INDEX idx_product_name_prefix ON products (product_name(50));
-- 输出示例：Query OK, 0 rows affected (0.31 sec)
-- 说明：只索引product_name列的前50个字符，适用于长文本字段

-- 5.创建降序索引（MySQL 8.0+）
-- 语法：CREATE INDEX index_name ON table_name (column_name DESC)
CREATE INDEX idx_orders_created_desc ON orders (created_at DESC);
-- 输出示例：Query OK, 0 rows affected (0.48 sec)
-- 说明：创建按created_at降序排列的索引，优化ORDER BY created_at DESC查询

-- 6.创建多列混合排序索引
CREATE INDEX idx_user_composite ON users (last_name ASC, first_name DESC, age ASC);
-- 输出示例：Query OK, 0 rows affected (0.67 sec)
-- 说明：创建混合排序方向的复合索引

-- 7.在创建表时定义索引
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    emp_no VARCHAR(20) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    -- 定义各种索引
    INDEX idx_emp_no (emp_no),
    UNIQUE INDEX uq_email (email),
    INDEX idx_name (last_name, first_name),
    INDEX idx_hire_date_desc (hire_date DESC),
    INDEX idx_email_prefix (email(20))
) ENGINE=InnoDB;
-- 输出示例：Query OK, 0 rows affected (0.89 sec)

-- 8.创建全文索引（支持文本搜索）
-- 语法：CREATE FULLTEXT INDEX index_name ON table_name (column_name)
CREATE FULLTEXT INDEX ft_idx_product_desc ON products (description);
-- 输出示例：Query OK, 0 rows affected (1.23 sec)
-- 说明：创建全文索引，支持MATCH AGAINST查询

-- 9.创建空间索引（地理空间数据）
-- 语法：CREATE SPATIAL INDEX index_name ON table_name (column_name)
CREATE TABLE locations (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    point POINT NOT NULL,
    SPATIAL INDEX idx_point (point)
) ENGINE=MyISAM;
-- 输出示例：Query OK, 0 rows affected (0.76 sec)
-- 注意：MySQL 5.7.5及以上版本的InnoDB引擎已支持空间索引；早期版本需要使用MyISAM。我们建议在新项目中优先使用InnoDB。InnoDB空间索引需要列定义为NOT NULL，且字段类型为GEOMETRY系列（POINT/LINESTRING等）

-- 10.创建函数索引（MySQL 8.0.13+）
-- 语法：CREATE INDEX index_name ON table_name ((expression))
CREATE INDEX idx_user_lower_email ON users ((LOWER(email)));
-- 输出示例：Query OK, 0 rows affected (0.58 sec)
-- 说明：创建基于LOWER(email)表达式的函数索引
-- 注意：MySQL 8.0.13+要求表达式必须用单层括号包裹，并作为索引列的一部分，因此语法为CREATE INDEX ... ON table ( (expr) )，即表达式本身加一对括号，再作为索引列
```

**高级索引创建选项**：

```
-- 1.指定索引算法
CREATE INDEX idx_user_name USING BTREE ON users (last_name, first_name);
-- 输出示例：Query OK, 0 rows affected (0.42 sec)
-- 说明：显式指定使用BTREE算法（默认）

-- 2.指定索引块大小
CREATE INDEX idx_orders_amount ON orders (amount) KEY_BLOCK_SIZE = 8;
-- 输出示例：Query OK, 0 rows affected (0.51 sec)
-- 说明：指定索引块大小为8KB

-- 3.设置索引可见性（MySQL 8.0+）
CREATE INDEX idx_user_status ON users (status) VISIBLE;
-- 或
CREATE INDEX idx_user_status_invisible ON users (status) INVISIBLE;
-- 输出示例：Query OK, 0 rows affected (0.39 sec)
-- 说明：创建可见或不可见索引，优化器会忽略不可见索引

-- 4.添加索引注释
CREATE INDEX idx_orders_composite ON orders (
    user_id,
    status,
    created_at DESC
) COMMENT '优化用户订单查询：按用户+状态过滤，按时间倒序排列';
-- 输出示例：Query OK, 0 rows affected (0.63 sec)

-- 5.指定索引排序规则
CREATE INDEX idx_product_name_collate ON products (product_name COLLATE utf8mb4_0900_ai_ci);
-- 输出示例：Query OK, 0 rows affected (0.47 sec)

-- 6.使用ALGORITHM和LOCK选项
CREATE INDEX idx_large_table ON large_table (category, created_at)
ALGORITHM = INPLACE
LOCK = NONE;
-- 输出示例：Query OK, 0 rows affected (12.45 sec)
-- 说明：在线创建索引，不影响表读写
```

##### 2、索引修改命令

```
-- 1.修改索引名称（MySQL不支持直接重命名索引，需要重建）
-- 先删除旧索引
DROP INDEX old_index_name ON table_name;
-- 再创建新索引
CREATE INDEX new_index_name ON table_name (column_name);

-- 2.修改索引可见性（MySQL 8.0+）
ALTER TABLE users ALTER INDEX idx_user_status VISIBLE;
-- 输出示例：Query OK, 0 rows affected (0.12 sec)

ALTER TABLE users ALTER INDEX idx_user_status_invisible INVISIBLE;
-- 输出示例：Query OK, 0 rows affected (0.11 sec)

-- 3.重建索引（MySQL没有直接重建索引命令，使用以下方法）
-- 方法1：删除并重新创建
DROP INDEX idx_name ON table_name;
CREATE INDEX idx_name ON table_name (column_name);

-- 方法2：使用OPTIMIZE TABLE（重建表，包括所有索引）
OPTIMIZE TABLE users;
-- 输出示例：
-- +------------+----------+----------+-------------------------------------------------------------------+
-- | Table      | Op       | Msg_type | Msg_text                                                          |
-- +------------+----------+----------+-------------------------------------------------------------------+
-- | test.users | optimize | note     | Table does not support optimize, doing recreate + analyze instead |
-- | test.users | optimize | status   | OK                                                                |
-- +------------+----------+----------+-------------------------------------------------------------------+

-- 方法3：使用ALTER TABLE重建
ALTER TABLE users ENGINE=InnoDB;
-- 输出示例：Query OK, 100000 rows affected (3.45 sec)

-- 4.为现有表添加索引
ALTER TABLE users ADD INDEX idx_user_birthdate (birth_date);
-- 输出示例：Query OK, 0 rows affected (0.87 sec)

ALTER TABLE users ADD UNIQUE INDEX uq_user_phone (phone_number);
-- 输出示例：Query OK, 0 rows affected (0.92 sec)

ALTER TABLE users ADD INDEX idx_user_composite (last_name(10), first_name(5));
-- 输出示例：Query OK, 0 rows affected (1.23 sec)

-- 5.添加全文索引
ALTER TABLE products ADD FULLTEXT INDEX ft_idx_product_tags (tags);
-- 输出示例：Query OK, 0 rows affected (2.34 sec)

-- 6.添加空间索引
ALTER TABLE locations ADD SPATIAL INDEX idx_location (coordinates);
-- 输出示例：Query OK, 0 rows affected (1.56 sec)
```

##### 3、索引删除命令

```sql
-- 1.删除普通索引
-- 语法：DROP INDEX index_name ON table_name
DROP INDEX idx_user_email ON users;
-- 输出示例：Query OK, 0 rows affected (0.23 sec)

-- 2.删除唯一索引
DROP INDEX uq_user_username ON users;
-- 输出示例：Query OK, 0 rows affected (0.19 sec)

-- 3.删除主键索引（需要先删除自增属性）
-- 查看表结构
SHOW CREATE TABLE users;
-- 如果有自增属性，先修改
ALTER TABLE users MODIFY id INT NOT NULL;
-- 删除主键
ALTER TABLE users DROP PRIMARY KEY;
-- 输出示例：Query OK, 100000 rows affected (1.45 sec)
-- ⚠️ 删除主键，在InnoDB中，我们需要谨慎一点，可能导致性能下降。如果需要删除，请确保有替代的主键或了解其后果。InnoDB表，如果无显式主键且无任何非空唯一索引，会自动生成一个6字节的隐藏聚簇索引（非用户可见）。这可能导致性能下降和复制问题，我们应尽量避免

-- 4.删除外键约束（同时删除关联的索引）
-- 先查看外键
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'orders'
  AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 删除外键
ALTER TABLE orders DROP FOREIGN KEY fk_orders_user_id;
-- 输出示例：Query OK, 0 rows affected (0.18 sec)

-- 5.删除多个索引
ALTER TABLE users 
DROP INDEX idx_user_email,
DROP INDEX idx_user_name,
DROP INDEX idx_user_birthdate;
-- 输出示例：Query OK, 0 rows affected (0.67 sec)

-- 6.使用ALTER TABLE删除索引
ALTER TABLE users DROP INDEX idx_user_status;
-- 输出示例：Query OK, 0 rows affected (0.21 sec)
```

##### 4、索引查看与分析命令

**查看索引信息**：

```sql
-- 1.查看表的所有索引
-- 语法：SHOW INDEX FROM table_name
SHOW INDEX FROM users;
-- 输出示例：
-- +-------+------------+------------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
-- | Table | Non_unique | Key_name         | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
-- +-------+------------+------------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
-- | users |          0 | PRIMARY          |            1 | id          | A         |      100000 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
-- | users |          0 | uq_user_username |            1 | username    | A         |      100000 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
-- | users |          1 | idx_user_email   |            1 | email       | A         |       98000 |     NULL |   NULL | YES  | BTREE      |         |               | YES     | NULL       |
-- | users |          1 | idx_user_name    |            1 | last_name   | A         |         500 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
-- | users |          1 | idx_user_name    |            2 | first_name  | A         |       15000 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
-- +-------+------------+------------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+

-- 2.查看建表语句（包含索引定义）
SHOW CREATE TABLE users\G
-- 输出示例：
-- *************************** 1.row ***************************
--        Table: users
-- Create Table: CREATE TABLE `users` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `username` varchar(50) NOT NULL,
--   `email` varchar(100) DEFAULT NULL,
--   `last_name` varchar(50) NOT NULL,
--   `first_name` varchar(50) NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `uq_user_username` (`username`),
--   KEY `idx_user_email` (`email`),
--   KEY `idx_user_name` (`last_name`,`first_name`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4

-- 3.从information_schema查看索引信息
SELECT 
    TABLE_NAME,
    INDEX_NAME,
    NON_UNIQUE,
    SEQ_IN_INDEX,
    COLUMN_NAME,
    COLLATION,
    CARDINALITY,
    SUB_PART,
    NULLABLE,
    INDEX_TYPE,
    COMMENT,
    INDEX_COMMENT
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'users'
ORDER BY INDEX_NAME, SEQ_IN_INDEX;
-- 输出示例：
-- +------------+------------------+------------+--------------+-------------+-----------+-------------+----------+----------+------------+---------+---------------+
-- | TABLE_NAME | INDEX_NAME       | NON_UNIQUE | SEQ_IN_INDEX | COLUMN_NAME | COLLATION | CARDINALITY | SUB_PART | NULLABLE | INDEX_TYPE | COMMENT | INDEX_COMMENT |
-- +------------+------------------+------------+--------------+-------------+-----------+-------------+----------+----------+------------+---------+---------------+
-- | users      | idx_user_email   |          1 |            1 | email       | A         |       98000 |     NULL | YES      | BTREE      |         |               |
-- | users      | idx_user_name    |          1 |            1 | last_name   | A         |         500 |     NULL |          | BTREE      |         |               |
-- | users      | idx_user_name    |          1 |            2 | first_name  | A         |       15000 |     NULL |          | BTREE      |         |               |
-- | users      | PRIMARY          |          0 |            1 | id          | A         |      100000 |     NULL |          | BTREE      |         |               |
-- | users      | uq_user_username |          0 |            1 | username    | A         |      100000 |     NULL |          | BTREE      |         |               |
-- +------------+------------------+------------+--------------+-------------+-----------+-------------+----------+----------+------------+---------+---------------+

-- 4.查看索引大小
-- 获取所有表的索引大小估算（基于叶子页数量）
SELECT 
    database_name,
    table_name,
    index_name,
    stat_name,
    stat_value as leaf_pages,
    ROUND(stat_value * @@innodb_page_size / 1024 / 1024, 2) as estimated_size_mb
FROM mysql.innodb_index_stats
WHERE stat_name = 'n_leaf_pages'
  AND database_name = DATABASE()
ORDER BY stat_value * @@innodb_page_size DESC;
-- 输出示例：
-- +---------------+------------+------------------+-----------+------------+---------+
-- | database_name | table_name | index_name       | stat_name | stat_value | size_mb |
-- +---------------+------------+------------------+-----------+------------+---------+
-- | test          | users      | PRIMARY          | size      |       2560 |   40.00 |
-- | test          | users      | uq_user_username | size      |       1280 |   20.00 |
-- | test          | users      | idx_user_email   | size      |       1920 |   30.00 |
-- | test          | users      | idx_user_name    | size      |       3200 |   50.00 |
-- +---------------+------------+------------------+-----------+------------+---------+

-- 5.查看索引碎片情况
SELECT 
    TABLE_SCHEMA,
    TABLE_NAME,
    INDEX_NAME,
    SUM(DATA_FREE) / 1024 / 1024 as frag_mb,
    ROUND(SUM(DATA_FREE) * 100.0 / SUM(DATA_LENGTH + INDEX_LENGTH), 2) as frag_pct
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND DATA_FREE > 0
GROUP BY TABLE_SCHEMA, TABLE_NAME, INDEX_NAME
ORDER BY frag_pct DESC;
```

**分析索引使用**：

```sql
-- 1.使用EXPLAIN分析查询执行计划
-- 语法：EXPLAIN SELECT ...
EXPLAIN SELECT * FROM users WHERE last_name = 'Smith' AND first_name = 'John';
-- 输出示例：
-- +----+-------------+-------+------------+------+---------------+--------------+---------+-------------+------+----------+-------+
-- | id | select_type | table | partitions | type | possible_keys | key          | key_len | ref         | rows | filtered | Extra |
-- +----+-------------+-------+------------+------+---------------+--------------+---------+-------------+------+----------+-------+
-- |  1 | SIMPLE      | users | NULL       | ref  | idx_user_name | idx_user_name | 202     | const,const |    1 |   100.00 | NULL  |
-- +----+-------------+-------+------------+------+---------------+--------------+---------+-------------+------+----------+-------+

-- 2.EXPLAIN FORMAT=JSON（更详细的执行计划）
EXPLAIN FORMAT=JSON 
SELECT * FROM users WHERE email LIKE 'john%@example.com';
-- 输出示例（部分）：
-- {
--   "query_block": {
--     "select_id": 1,
--     "cost_info": {
--       "query_cost": "45.21"
--     },
--     "table": {
--       "table_name": "users",
--       "access_type": "range",
--       "possible_keys": ["idx_user_email"],
--       "key": "idx_user_email",
--       "used_key_parts": ["email"],
--       "key_length": "403",
--       "rows_examined_per_scan": 245,
--       "rows_produced_per_join": 245,
--       "filtered": "100.00",
--       "index_condition": "(`test`.`users`.`email` like 'john%@example.com')"
--     }
--   }
-- }

-- 3.EXPLAIN ANALYZE（MySQL 8.0.18+，实际执行并分析）
EXPLAIN ANALYZE 
SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC LIMIT 10;
-- 输出示例：
-- -> Limit: 10 row(s)  (cost=234.56 rows=10) (actual time=0.345..0.456 rows=10 loops=1)
--     -> Index scan on users using idx_status_created (cost=234.56 rows=2456) (actual time=0.343..0.452 rows=10 loops=1)

-- 4.查看索引使用统计（performance_schema）
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME,
    COUNT_FETCH,
    COUNT_INSERT,
    COUNT_UPDATE,
    COUNT_DELETE,
    COUNT_STAR,
    SUM_TIMER_WAIT/1000000000 as total_time_sec
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = DATABASE()
  AND OBJECT_NAME = 'users'
ORDER BY COUNT_STAR DESC;
-- 输出示例：
-- +---------------+-------------+------------------+-------------+--------------+--------------+--------------+------------+----------------+
-- | OBJECT_SCHEMA | OBJECT_NAME | INDEX_NAME       | COUNT_FETCH | COUNT_INSERT | COUNT_UPDATE | COUNT_DELETE | COUNT_STAR | total_time_sec |
-- +---------------+-------------+------------------+-------------+--------------+--------------+--------------+------------+----------------+
-- | test          | users       | PRIMARY          |     1256890 |        23456 |        56789 |         1234 |    1323369 |       123.456  |
-- | test          | users       | idx_user_name    |      456789 |            0 |            0 |            0 |     456789 |        45.678  |
-- | test          | users       | idx_user_email   |      234567 |            0 |            0 |            0 |     234567 |        23.456  |
-- | test          | users       | uq_user_username |       56789 |        12345 |         6789 |          234 |      76557 |         7.655  |
-- +---------------+-------------+------------------+-------------+--------------+--------------+--------------+------------+----------------+

-- 5.查看未使用的索引
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE INDEX_NAME IS NOT NULL
  AND COUNT_STAR = 0
  AND OBJECT_SCHEMA NOT IN ('mysql', 'performance_schema', 'information_schema')
  AND INDEX_NAME != 'PRIMARY'
ORDER BY OBJECT_SCHEMA, OBJECT_NAME;
```

##### 5、索引维护与优化命令

```sql
-- 1.分析表（更新索引统计信息）
-- 语法：ANALYZE TABLE table_name
ANALYZE TABLE users;
-- 输出示例：
-- +------------+---------+----------+----------+
-- | Table      | Op      | Msg_type | Msg_text |
-- +------------+---------+----------+----------+
-- | test.users | analyze | status   | OK       |
-- +------------+---------+----------+----------+

-- 2.分析表并立即使用
ANALYZE TABLE users UPDATE HISTOGRAM ON last_name, first_name WITH 10 BUCKETS;
-- 输出示例：
-- +------------+---------+----------+----------+
-- | Table      | Op      | Msg_type | Msg_text |
-- +------------+---------+----------+----------+
-- | test.users | analyze | status   | OK       |
-- +------------+---------+----------+----------+

-- 3.检查表（检查索引一致性）
CHECK TABLE users;
-- 输出示例：
-- +------------+-------+----------+----------+
-- | Table      | Op    | Msg_type | Msg_text |
-- +------------+-------+----------+----------+
-- | test.users | check | status   | OK       |
-- +------------+-------+----------+----------+

-- 4.修复表（修复损坏的索引）
REPAIR TABLE users;
-- 输出示例：
-- +------------+--------+----------+----------+
-- | Table      | Op     | Msg_type | Msg_text |
-- +------------+--------+----------+----------+
-- | test.users | repair | status   | OK       |
-- +------------+--------+----------+----------+
-- 注意：仅适用于MyISAM引擎，InnoDB通常不需要

-- 5.优化表（重建表，整理索引碎片）
-- 语法：OPTIMIZE TABLE table_name
OPTIMIZE TABLE users;
-- 输出示例：
-- +------------+----------+----------+-------------------------------------------------------------------+
-- | Table      | Op       | Msg_type | Msg_text                                                          |
-- +------------+----------+----------+-------------------------------------------------------------------+
-- | test.users | optimize | note     | Table does not support optimize, doing recreate + analyze instead |
-- | test.users | optimize | status   | OK                                                                |
-- +------------+----------+----------+-------------------------------------------------------------------+

-- 6.重建表（重建所有索引）
ALTER TABLE users ENGINE=InnoDB;
-- 输出示例：Query OK, 100000 rows affected (4.56 sec)

-- 7.在线重建索引（通过pt-online-schema-change等工具）
-- 需要安装Percona Toolkit
-- pt-online-schema-change --alter="DROP INDEX idx_old, ADD INDEX idx_new (col1, col2)" D=test,t=users

-- 8.强制使用/忽略索引
-- 强制使用特定索引
SELECT * FROM users FORCE INDEX (idx_user_name) WHERE last_name = 'Smith';

-- 忽略特定索引
SELECT * FROM users IGNORE INDEX (idx_user_email) WHERE email LIKE '%@example.com';

-- 使用索引提示
SELECT * FROM users USE INDEX (idx_user_name, idx_user_email) 
WHERE last_name = 'Smith' OR email LIKE '%@example.com';

-- 9.查看索引选择性
SELECT 
    COUNT(DISTINCT last_name) / COUNT(*) as last_name_selectivity,
    COUNT(DISTINCT first_name) / COUNT(*) as first_name_selectivity,
    COUNT(DISTINCT CONCAT(last_name, first_name)) / COUNT(*) as composite_selectivity
FROM users;
-- 输出示例：
-- +-------------------------+--------------------------+---------------------------+
-- | last_name_selectivity   | first_name_selectivity   | composite_selectivity     |
-- +-------------------------+--------------------------+---------------------------+
-- | 0.0050                  | 0.1500                   | 0.8000                    |
-- +-------------------------+--------------------------+---------------------------+

-- 10.查看索引推荐
-- 使用sys schema（MySQL 5.7+）
SELECT * FROM sys.schema_unused_indexes;
-- 输出示例：
-- +---------------+-------------+------------------+
-- | object_schema | object_name | index_name       |
-- +---------------+-------------+------------------+
-- | test          | users       | idx_user_birth   |
-- | test          | users       | idx_user_status  |
-- +---------------+-------------+------------------+

-- 11.索引大小和统计信息
SELECT 
    table_schema,
    table_name,
    index_name,
    stat_value * @@innodb_page_size as index_size_bytes,
    stat_value * @@innodb_page_size / 1024 / 1024 as index_size_mb,
    stat_description
FROM mysql.innodb_index_stats
WHERE database_name = DATABASE()
  AND table_name = 'users'
  AND stat_name = 'size';
```

#### 二、PostgreSQL索引命令

##### 1、创建索引

```
-- 1.创建B-tree索引（默认）
CREATE INDEX idx_users_email ON users (email);

-- 2.创建唯一索引
CREATE UNIQUE INDEX uq_users_username ON users (username);

-- 3.创建复合索引
CREATE INDEX idx_users_name ON users (last_name, first_name);

-- 4.创建函数索引
CREATE INDEX idx_users_lower_email ON users (LOWER(email));

-- 5.创建部分索引（条件索引）
CREATE INDEX idx_users_active ON users (status) WHERE status = 'active';

-- 6.创建并发索引（不阻塞写操作）
CREATE INDEX CONCURRENTLY idx_users_created ON users (created_at);
-- CREATE INDEX CONCURRENTLY关键注意点：不能在事务中执行；执行期间会生成临时索引，我们需要保证有足够磁盘空间（约为索引大小的2倍）

-- 7.创建GIN索引（全文搜索、数组）
CREATE INDEX idx_products_tags_gin ON products USING gin (tags);

-- 8.创建GiST索引（地理空间、范围）
CREATE INDEX idx_locations_geom_gist ON locations USING gist (geom);

-- 9.创建BRIN索引（大表范围）
CREATE INDEX idx_logs_created_brin ON logs USING brin (created_at);

-- 10.创建哈希索引
CREATE INDEX idx_users_id_hash ON users USING hash (id);
-- 注意：PostgreSQL 10起哈希索引已生产可用，支持WAL和并发构建，但是仍仅适用于等值查询（=），不支持范围、排序、UNIQUE约束或部分索引。除非明确需要且了解其限制，否则我们优先使用B-tree

-- 11.创建SP-GiST索引
CREATE INDEX idx_points_spgist ON points USING spgist (point);
```

##### 2、管理索引

```
-- 1.重命名索引
ALTER INDEX idx_old_name RENAME TO idx_new_name;

-- 2.修改索引表空间
ALTER INDEX idx_users_email SET TABLESPACE fast_tablespace;

-- 3.重建索引
REINDEX INDEX idx_users_email;
REINDEX TABLE users;
REINDEX DATABASE dbname;

-- 4.并行重建索引
REINDEX INDEX CONCURRENTLY idx_users_email;

-- 5.设置索引存储参数
ALTER INDEX idx_users_email SET (fillfactor = 80);

-- 6.重置索引统计
ALTER INDEX idx_users_email RESET STATISTICS;
```

##### 3、查看索引信息

```sql
-- 1.查看所有索引
SELECT * FROM pg_indexes WHERE tablename = 'users';

-- 2.查看索引使用统计
SELECT * FROM pg_stat_user_indexes WHERE relname = 'users';

-- 3.查看索引大小
SELECT 
    schemaname,
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) as index_size
FROM pg_indexes
WHERE tablename = 'users';

-- 4.查看索引定义
SELECT pg_get_indexdef(indexrelid) 
FROM pg_index 
WHERE indrelid = 'users'::regclass;

-- 5.分析索引使用
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

#### 三、SQL Server索引命令

##### 1、创建索引

```
-- 1.创建聚集索引
CREATE CLUSTERED INDEX idx_users_id ON users (id);

-- 2.创建非聚集索引
CREATE NONCLUSTERED INDEX idx_users_email ON users (email);

-- 3.创建唯一索引
CREATE UNIQUE NONCLUSTERED INDEX uq_users_username ON users (username);

-- 4.创建复合索引
CREATE NONCLUSTERED INDEX idx_users_name ON users (last_name, first_name);

-- 5.创建包含列索引
CREATE NONCLUSTERED INDEX idx_users_covering ON users (last_name, first_name)
INCLUDE (email, phone);

-- 6.创建筛选索引
CREATE NONCLUSTERED INDEX idx_users_active ON users (status)
WHERE status = 'active';

-- 7.创建列存储索引
-- 创建非聚集列存储索引（通常用于分析型查询）
CREATE NONCLUSTERED COLUMNSTORE INDEX idx_orders_cs ON orders;
-- ⚠️ 列存储索引适用于分析型负载。如果表包含VARCHAR(MAX)、NVARCHAR(MAX)、TEXT等LOB列，我们需要在创建时明确指定非LOB列，或使用SQL Server 2016+的支持。
-- 或指定常用分析列（SQL Server 2016+）
CREATE NONCLUSTERED COLUMNSTORE INDEX idx_orders_cs ON orders (quantity, price, created_at);

-- 8.创建空间索引
CREATE SPATIAL INDEX idx_locations_geom ON locations (geom);

-- 9.创建全文索引
CREATE FULLTEXT INDEX ON products (description)
KEY INDEX pk_products;

-- 10.创建XML索引
CREATE PRIMARY XML INDEX idx_products_xml ON products (xml_data);
```

##### 2、管理索引

```
-- 1.禁用索引
ALTER INDEX idx_users_email ON users DISABLE;

-- 2.重建索引
ALTER INDEX idx_users_email ON users REBUILD;

-- 3.重新组织索引
ALTER INDEX idx_users_email ON users REORGANIZE;

-- 4.设置索引选项
ALTER INDEX idx_users_email ON users 
SET (ALLOW_PAGE_LOCKS = ON, ALLOW_ROW_LOCKS = ON);

-- 5.重命名索引
EXEC sp_rename 'users.idx_old_name', 'idx_new_name', 'INDEX';
```

##### 3、查看索引信息

```sql
-- 1.查看索引信息
EXEC sp_helpindex 'users';

-- 2.查看索引使用统计
SELECT * FROM sys.dm_db_index_usage_stats
WHERE object_id = OBJECT_ID('users');

-- 3.查看索引碎片
SELECT * FROM sys.dm_db_index_physical_stats(
    DB_ID(), OBJECT_ID('users'), NULL, NULL, 'DETAILED');

-- 4.查看缺失索引
SELECT * FROM sys.dm_db_missing_index_details
WHERE object_id = OBJECT_ID('users');

-- 5.分析执行计划
SET SHOWPLAN_ALL ON;
SELECT * FROM users WHERE email = 'test@example.com';
SET SHOWPLAN_ALL OFF;
```

#### 四、Oracle索引命令

##### 1、创建索引

```
-- 1.创建B-tree索引
CREATE INDEX idx_users_email ON users (email);

-- 2.创建唯一索引
CREATE UNIQUE INDEX uq_users_username ON users (username);

-- 3.创建复合索引
CREATE INDEX idx_users_name ON users (last_name, first_name);

-- 4.创建函数索引
CREATE INDEX idx_users_lower_email ON users (LOWER(email));

-- 5.创建位图索引
CREATE BITMAP INDEX idx_users_status ON users (status);
-- ⚠️ 位图索引仅适用于只读或批量加载的数据仓库环境。在OLTP系统中使用位图索引会导致严重的行级锁升级（整个位图段被锁），极易引发死锁和性能雪崩，严禁在高并发事务表中使用

-- 6.创建反向键索引
CREATE INDEX idx_users_id_reverse ON users (id) REVERSE;

-- 7.创建压缩索引
CREATE INDEX idx_users_name_comp ON users (last_name, first_name) COMPRESS;

-- 8.创建不可见索引
CREATE INDEX idx_users_email_invisible ON users (email) INVISIBLE;

-- 9.创建基于函数的域索引（需要自定义）
CREATE INDEX idx_products_spatial ON products (location)
INDEXTYPE IS MDSYS.SPATIAL_INDEX;
```

##### 2、管理索引

```
-- 1.重命名索引
ALTER INDEX idx_old_name RENAME TO idx_new_name;

-- 2.重建索引
ALTER INDEX idx_users_email REBUILD;

-- 3.在线重建索引
ALTER INDEX idx_users_email REBUILD ONLINE;

-- 4.合并索引
ALTER INDEX idx_users_email COALESCE;

-- 5.监控索引使用
ALTER INDEX idx_users_email MONITORING USAGE;

-- 6.修改索引可见性
ALTER INDEX idx_users_email INVISIBLE;
ALTER INDEX idx_users_email VISIBLE;

-- 7.修改索引存储参数
ALTER INDEX idx_users_email STORAGE (NEXT 1M);
```

##### 3、查看索引信息

```sql
-- 1.查看索引信息
SELECT * FROM user_indexes WHERE table_name = 'USERS';

-- 2.查看索引列
SELECT * FROM user_ind_columns WHERE table_name = 'USERS';

-- 3.查看索引统计
SELECT * FROM user_ind_statistics WHERE table_name = 'USERS';

-- 4.查看索引使用监控
SELECT * FROM v$object_usage WHERE table_name = 'USERS';

-- 5.分析执行计划
EXPLAIN PLAN FOR SELECT * FROM users WHERE email = 'test@example.com';
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

#### 五、数据库方言差异对比表

##### 1、索引类型支持对比

| 索引类型 | MySQL | PostgreSQL | SQL Server | Oracle |
| --- | --- | --- | --- | --- |
| **B-tree** | 默认支持 | 默认支持 | 支持 | 支持 |
| **Hash** | InnoDB不支持用户创建HASH索引（MySQL的InnoDB引擎不支持用户创建的持久化HASH索引（USING HASH会被忽略），仅Memory引擎支持。InnoDB的自适应哈希索引（AHI）是内部自动构建的内存结构，不可控） | 支持 | 不支持 | 支持 |
| **全文索引** | MyISAM/InnoDB | GIN/GiST | 支持 | Oracle Text |
| **空间索引** | MyISAM/InnoDB | GiST/SP-GiST | 支持 | Spatial |
| **位图索引** | 不支持 | 不支持 | 不支持 | 支持 |
| **反向键索引** | 不支持 | 不支持 | 不支持 | 支持 |
| **函数索引** | 8.0.13+ | 支持 | 支持（有限） | 支持 |
| **部分索引** | 不支持 | 支持 | 筛选索引 | 不支持 |
| **包含列索引** | 不支持 | 不支持 | 支持 | 不支持 |
| **列存储索引** | 不支持 | 扩展支持 | 支持 | 支持 |
| **压缩索引** | 支持 | 支持 | 支持 | 支持 |

##### 2、索引创建语法差异

| 功能 | MySQL | PostgreSQL | SQL Server | Oracle |
| --- | --- | --- | --- | --- |
| **创建索引** | `CREATE INDEX` | `CREATE INDEX` | `CREATE INDEX` | `CREATE INDEX` |
| **唯一索引** | `CREATE UNIQUE INDEX` | `CREATE UNIQUE INDEX` | `CREATE UNIQUE INDEX` | `CREATE UNIQUE INDEX` |
| **指定索引类型** | `USING BTREE/HASH` | `USING btree/gin/gist` | 在CREATE语句中指定 | 在CREATE语句中指定 |
| **并发创建** | `ALGORITHM=INPLACE` | `CONCURRENTLY` | 在线操作选项 | `ONLINE` |
| **包含列** | 不支持 | 不支持 | `INCLUDE (col1, col2)` | 不支持 |
| **条件索引** | 不支持 | `WHERE condition` | `WHERE condition` | 不支持 |
| **函数索引** | `CREATE INDEX ON ((expr))` | `CREATE INDEX ON (func(col))` | 通过计算列实现 | `CREATE INDEX ON (func(col))` |
| **注释** | `COMMENT 'text'` | 不支持 | 不支持 | 不支持 |

##### 3、索引管理命令对比

| 操作 | MySQL | PostgreSQL | SQL Server | Oracle |
| --- | --- | --- | --- | --- |
| **删除索引** | `DROP INDEX` | `DROP INDEX` | `DROP INDEX` | `DROP INDEX` |
| **重命名索引** | 不支持（需要重建） | `ALTER INDEX RENAME` | `sp_rename` | `ALTER INDEX RENAME` |
| **重建索引** | `OPTIMIZE TABLE`或`ALTER TABLE` | `REINDEX INDEX` | `ALTER INDEX REBUILD` | `ALTER INDEX REBUILD` |
| **禁用索引** | 不支持 | 不支持 | `ALTER INDEX DISABLE` | `ALTER INDEX UNUSABLE` |
| **启用索引** | 不支持 | 不支持 | `ALTER INDEX REBUILD` | `ALTER INDEX REBUILD` |
| **修改可见性** | `ALTER INDEX VISIBLE/INVISIBLE` | 不支持 | 不支持 | `ALTER INDEX VISIBLE/INVISIBLE` |
| **分析索引** | `ANALYZE TABLE` | `ANALYZE` | `UPDATE STATISTICS` | `ANALYZE INDEX` |

##### 4、索引信息查看对比

| 信息类型 | MySQL | PostgreSQL | SQL Server | Oracle |
| --- | --- | --- | --- | --- |
| **查看索引定义** | `SHOW INDEX` | `pg_indexes` | `sp_helpindex` | `user_indexes` |
| **查看索引大小** | `INNODB_INDEX_STATS` | `pg_relation_size` | `sys.dm_db_index_physical_stats` | `user_segments` |
| **查看索引使用** | `performance_schema` | `pg_stat_user_indexes` | `sys.dm_db_index_usage_stats` | `v$object_usage` |
| **查看索引碎片** | `INFORMATION_SCHEMA.TABLES` | `pg_stat_user_tables` | `sys.dm_db_index_physical_stats` | 多种视图 |
| **执行计划分析** | `EXPLAIN` | `EXPLAIN` | `SET SHOWPLAN` | `EXPLAIN PLAN` |

##### 5、特殊功能对比

| 功能 | MySQL | PostgreSQL | SQL Server | Oracle |
| --- | --- | --- | --- | --- |
| **在线创建索引** | 8.0+支持 | 支持 | 企业版支持 | 支持 |
| **并行创建索引** | 不支持 | 支持 | 支持 | 支持 |
| **索引分区** | 支持 | 支持 | 支持 | 支持 |
| **全局/本地索引** | 不支持 | 不支持 | 不支持 | 支持 |
| **索引压缩** | 支持 | 支持 | 支持 | 支持 |
| **索引监控** | 不支持 | 不支持 | 扩展事件 | 支持 |
| **自动索引** | 不支持 | 不支持 | 2019+支持 | 支持 |

#### 六、跨数据库通用索引推荐做法

##### 1、创建索引的通用原则

```sql
-- 1.为WHERE子句中的列创建索引
-- 查询：SELECT * FROM orders WHERE user_id = 100 AND status = 'paid'
-- 索引：CREATE INDEX idx_orders_user_status ON orders (user_id, status)

-- 2.为JOIN条件中的列创建索引
-- 查询：SELECT * FROM users u JOIN orders o ON u.id = o.user_id
-- 索引：CREATE INDEX idx_orders_user_id ON orders (user_id)

-- 3.为ORDER BY/GROUP BY中的列创建索引
-- 查询：SELECT * FROM products ORDER BY category, price DESC
-- 索引：CREATE INDEX idx_products_category_price ON products (category, price DESC)

-- 4.为覆盖查询创建包含所有需要的列的索引
-- 查询：SELECT user_id, status, created_at FROM orders WHERE user_id = 100
-- 索引：CREATE INDEX idx_orders_covering ON orders (user_id, status, created_at)
```

##### 2、索引维护通用脚本

```sql
-- 1.查找重复索引（所有数据库通用思路）
-- MySQL示例：
SELECT 
    s1.TABLE_SCHEMA,
    s1.TABLE_NAME,
    GROUP_CONCAT(s1.COLUMN_NAME ORDER BY s1.SEQ_IN_INDEX) as columns,
    COUNT(*) as index_count,
    GROUP_CONCAT(s1.INDEX_NAME) as index_names
FROM INFORMATION_SCHEMA.STATISTICS s1
JOIN INFORMATION_SCHEMA.STATISTICS s2 
    ON s1.TABLE_SCHEMA = s2.TABLE_SCHEMA 
    AND s1.TABLE_NAME = s2.TABLE_NAME 
    AND s1.COLUMN_NAME = s2.COLUMN_NAME 
    AND s1.SEQ_IN_INDEX = s2.SEQ_IN_INDEX
WHERE s1.INDEX_NAME != s2.INDEX_NAME
GROUP BY s1.TABLE_SCHEMA, s1.TABLE_NAME, s1.INDEX_NAME
HAVING COUNT(*) = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.STATISTICS s3 
    WHERE s3.TABLE_SCHEMA = s1.TABLE_SCHEMA 
      AND s3.TABLE_NAME = s1.TABLE_NAME 
      AND s3.INDEX_NAME = s1.INDEX_NAME
);

-- 2.查找未使用的索引
-- 通用方法：监控索引使用统计一段时间，然后分析
-- MySQL：performance_schema.table_io_waits_summary_by_index_usage
-- PostgreSQL：pg_stat_user_indexes
-- SQL Server：sys.dm_db_index_usage_stats
-- Oracle：v$object_usage

-- 3.索引碎片检查
-- 通用方法：定期检查并重建碎片率高的索引
-- 建议阈值：>30%碎片率考虑重建

-- 4.索引统计信息更新
-- 通用原则：数据变化超过10-20%时更新统计信息
```

##### 3、性能测试脚本模板

```sql
-- 索引创建前后性能对比测试模板
-- 1.记录测试前状态
SELECT NOW() as test_start_time;

-- 2.执行测试查询（无索引）
-- 注意：可能需要禁用查询缓存
SELECT SQL_NO_CACHE * FROM users WHERE email = 'test@example.com';

-- 3.创建索引
CREATE INDEX idx_users_email ON users (email);

-- 4.执行测试查询（有索引）
SELECT SQL_NO_CACHE * FROM users WHERE email = 'test@example.com';

-- 5.分析执行计划
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- 6.清理测试索引
DROP INDEX idx_users_email ON users;

-- 7.记录测试结束时间
SELECT NOW() as test_end_time;
```

##### 4、监控脚本示例

```sql
-- 每日索引监控报告
SELECT 
    DATE(NOW()) as report_date,
    TABLE_SCHEMA,
    TABLE_NAME,
    INDEX_NAME,
    INDEX_TYPE,
    CARDINALITY,
    TABLE_ROWS,
    ROUND(CARDINALITY * 100.0 / NULLIF(TABLE_ROWS, 0), 2) as selectivity_pct,
    ROUND(INDEX_LENGTH / 1024 / 1024, 2) as index_size_mb,
    CASE 
        WHEN ROUND(CARDINALITY * 100.0 / NULLIF(TABLE_ROWS, 0), 2) < 1 THEN '低选择性'
        WHEN ROUND(CARDINALITY * 100.0 / NULLIF(TABLE_ROWS, 0), 2) > 50 THEN '高选择性'
        ELSE '中等选择性'
    END as selectivity_level,
    CASE 
        WHEN ROUND(INDEX_LENGTH / 1024 / 1024, 2) > 100 THEN '大索引'
        WHEN ROUND(INDEX_LENGTH / 1024 / 1024, 2) > 10 THEN '中等索引'
        ELSE '小索引'
    END as size_category
FROM INFORMATION_SCHEMA.STATISTICS s
JOIN INFORMATION_SCHEMA.TABLES t 
    ON s.TABLE_SCHEMA = t.TABLE_SCHEMA 
    AND s.TABLE_NAME = t.TABLE_NAME
WHERE s.TABLE_SCHEMA NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys')
  AND t.TABLE_TYPE = 'BASE TABLE'
ORDER BY INDEX_LENGTH DESC, selectivity_pct ASC;
```

#### 七、常见问题解决办法

##### 1、索引创建失败处理

```
-- 1.索引名已存在
-- 错误：Error 1061: Duplicate key name 'idx_name'
-- 解决：使用不同的索引名或先删除旧索引
DROP INDEX IF EXISTS idx_name ON table_name;
CREATE INDEX idx_name_new ON table_name (column_name);

-- 2.表被锁
-- 错误：Error 1205: Lock wait timeout exceeded
-- 解决：等待或杀死阻塞进程
SHOW PROCESSLIST;
KILL process_id;

-- 3.磁盘空间不足
-- 错误：Error 1114: The table is full
-- 解决：清理磁盘空间或增加表空间

-- 4.索引长度超限
-- 错误：Error 1071: Specified key was too long
-- 解决：使用前缀索引或减少索引列长度
CREATE INDEX idx_name ON table_name (column_name(100));

-- 5.数据不一致
-- 错误：Error 1062: Duplicate entry for key
-- 解决：清理重复数据或创建非唯一索引
```

##### 2、索引性能问题诊断

```sql
-- 1.索引未被使用
-- 诊断：使用EXPLAIN查看执行计划
EXPLAIN SELECT * FROM table WHERE condition;
-- 可能原因：数据类型不匹配、函数包装、OR条件等

-- 2.索引选择错误
-- 诊断：查看多个可能的索引
SHOW INDEX FROM table_name;
-- 解决：使用FORCE INDEX或优化查询

-- 3.索引碎片严重
-- 诊断：检查索引碎片率
-- 解决：重建索引
OPTIMIZE TABLE table_name;

-- 4.统计信息过期
-- 诊断：对比实际数据量和统计信息
-- 解决：更新统计信息
ANALYZE TABLE table_name;

-- 5.索引过多影响写性能
-- 诊断：监控INSERT/UPDATE/DELETE性能
-- 解决：删除不必要的索引
```