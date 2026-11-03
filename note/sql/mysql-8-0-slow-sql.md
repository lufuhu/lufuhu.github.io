---
title: MySQL 8.0慢SQL排查方法，慢查询日志定位与执行计划分析
lastUpdated: 2026-10-14 03:00:00
---


不管是MySQL、Oracle还是我们还没有用过的其他什么数据库，慢SQL都是系统性能瓶颈的主要诱因。一条未优化的SQL语句就可能让数据库CPU跑满、连接池耗尽，甚至引发整个服务雪崩。下面，我们以常用的MySQL 8.0为例，先搞明白慢SQL的原理，再一步步仔细拆解怎么定位慢SQL？怎么看懂它的执行计划？如果我们把MySQL 8.0慢SQL排查方法搞清楚了，我们不仅能彻底解决眼下的MySQL 8.0慢SQL问题，以后我们碰到其他数据库的类似情况，也能照着这个思路搞定慢SQL。

#### 一、为什么会出现慢SQL？

我们先搞懂MySQL执行SQL的底层逻辑，知道SQL是怎么跑起来的？

##### 1、MySQL执行SQL的流程

MySQL架构主要包括Server层、存储引擎层等两层，一条SQL从发出到返回，大概需经历8步：

（1）**连接建立**：我们客户端通过TCP连接MySQL服务器，服务器通过连接池管理连接（默认端口3306）；

（2）**查询缓存**（MySQL 8.0已移除）：检查SQL是否在缓存中，若命中则直接返回结果；

（3）**语法解析**：词法分析（拆分SQL关键词，如：`select`、`from`、`where`）→语法分析（判断SQL语法是否正确，生成“语法树”）；

（4）**语义分析**：检查表、字段是否存在，用户是否有操作权限；

（5）**查询优化**：MySQL优化器（基于成本和规则）生成最优执行计划（如：选择全表扫描还是索引扫描）；

（6）**执行计划生成**：将优化后的执行计划传递给执行器；

（7）**执行器执行**：调用存储引擎接口（如：InnoDB），执行查询并获取数据；

（8）**结果返回**：将数据封装后返回给我们客户端，同时释放连接资源。

这8步中，某一步或几步执行耗时过长，主要是查询优化（生成差的执行计划）和执行器执行（全表扫描、索引失效等）这两步，就会出现慢SQL。

##### 2、如何通过资源监控快速定位慢SQL问题？

MySQL性能依赖“CPU、内存、磁盘IO、网络”这些资源，慢SQL出现必然伴随至少一种资源瓶颈，具体表现如表：

| 资源类型 | 瓶颈表现 | 典型场景 |
| --- | --- | --- |
| `CPU` | `CPU`使用率持续`>90%` | 复杂聚合查询（`group by`/`order by`无索引）、大量计算函数（`count(*)`/`sum()`） |
| 内存 | 内存使用率高，频繁发生页置换 | `InnoDB`缓存池（`buffer pool`）设置过小，大量数据需从磁盘加载 |
| 磁盘`IO` | 磁盘`IO`利用率`>80%`，读写延迟高 | 全表扫描、无序写入（如：未按主键插入）、频繁刷盘 |
| 网络 | 网络带宽占满，传输延迟高 | `select *` 查询返回大量数据、大字段（`text/blob`）传输 |

##### 3、慢SQL判定标准

慢由我们业务场景决定，没有固定阈值，只是相对来说：

*   **高并发场景**（如：秒杀、首页接口）：响应时间需<500ms，超过则视为慢SQL；
    
*   **普通业务场景**（如：用户中心、订单详情）：响应时间需<2s，超过则视为慢SQL；
    
*   **离线场景**（如：数据报表、批量导出）：响应时间可放宽至5-10s。
    

**通用做法**：我们通过`long_query_time`参数设置慢查询阈值（默认10s，我们建议设为2s），超过这个时间的SQL会被记录到慢查询日志中，作为备选优化对象。

#### 二、怎么定位慢SQL？

##### 1、慢查询日志：初步定位谁慢了

慢查询日志是MySQL默认提供的，记录执行时间超过指定阈值的SQL语句，包含：执行时间、锁等待时间、扫描行数等等信息，帮助我们识别执行效率低下的查询。

（1）**3步开启慢查询日志**

MySQL默认关闭慢查询日志（避免性能损耗），需我们手动开启，支持临时开启（重启失效）和永久开启（实际业务场景推荐）两种方式。

**第一步**：查看当前配置

我们登录MySQL客户端（命令行或`Navicat`），执行以下命令，了解当前慢查询日志的状态：

```
-- 查看慢查询日志是否开启（ON=开启，OFF=关闭）
show variables like '%slow_query_log%';
-- 查看慢查询阈值（单位：秒，默认10s）
show variables like 'long_query_time';
-- 查看日志输出方式（FILE=文件，TABLE=系统表）
show variables like '%log_output%';
-- 查看未走索引的SQL是否记录（ON=记录，OFF=不记录）
show variables like 'log_queries_not_using_indexes';
-- 查看慢查询日志存储路径
show variables like 'slow_query_log_file';
```

执行结果示例（默认未开启状态）：

| Variable\_name | Value |
| --- | --- |
| slow\_query\_log | OFF |
| slow\_query\_log\_file | /var/lib/mysql/localhost-slow.log |
| long\_query\_time | 10.000000 |
| log\_output | FILE |
| log\_queries\_not\_using\_indexes | OFF |

**第二步**：临时开启（应急排查）

若无需重启MySQL，我们可通过`set global`命令临时开启，适合线上应急排查：

```
-- 开启慢查询日志
set global slow_query_log = ON;
-- 设置阈值为2秒（新连接生效，旧连接需重新连接）
set global long_query_time = 2;
-- 记录未走索引的SQL（即使未超阈值）
set global log_queries_not_using_indexes = ON;
-- 设置日志输出方式为文件（优先选择，比表存储高效）
set global log_output = 'FILE';
```

**第三步**：永久开启（实际业务场景）

临时配置重启后失效，实际业务场景我们需修改MySQL配置文件（`my.cnf`或`my.ini`）：

*   **Linux系统**：配置文件路径通常为`/etc/my.cnf`或`/etc/mysql/my.cnf`；
    
*   **Windows系统**：配置文件路径通常为`MySQL安装目录/my.ini`。
    

在`[mysqld]`节点下，我们添加以下配置：

```javascript
[mysqld]
# 开启慢查询日志
slow_query_log = 1
# 慢查询日志文件路径（需确保MySQL有写入权限）
slow_query_log_file = /var/lib/mysql/mysql-slow.log
# 慢查询阈值（单位：秒）
long_query_time = 2
# 记录未使用索引的SQL（建议开启，提前发现无索引SQL）
log_queries_not_using_indexes = 1
# 记录慢查询的最小锁定时间（单位：秒，可选）
log_slow_admin_statements = 1
# 记录慢的优化器执行计划（可选）
log_slow_slave_statements = 1
# 日志输出方式（FILE=文件，TABLE=mysql.slow_log表，可同时设置）
log_output = FILE
```

配置完成后，我们重启MySQL，使配置生效：

*   Linux：`systemctl restart mysqld`或`service mysqld restart`；
    
*   Windows：在服务中，我们找到MySQL，右键重启。
    

（2）**慢查询日志解读**

慢查询日志的每条记录都包含执行时间、用户信息、SQL内容等字段，格式如下：

```sql
# Time: 2024-05-20T15:30:45.123456Z
# User@Host: app_user[app_user] @ 192.168.1.100 [192.168.1.100]  Id:  1234
# Query_time: 3.800000  Lock_time: 0.000200  Rows_sent: 150  Rows_examined: 120000
# Rows_affected: 0  Bytes_sent: 28500
SET timestamp=1684606245;
select * from order_info where user_id = 567 and create_time between '2024-01-01' and '2024-06-01';
```

**解读**：作为优化依据

*   `Time`：SQL执行的时间戳；
    
*   `User@Host`：执行SQL的用户和客户端IP（用于定位我们业务来源）；
    
*   `Query_time`：SQL实际执行时间（3.8秒，超过2秒阈值）；
    
*   `Lock_time`：SQL等待表锁/行锁的时间（0.0002秒，说明不是锁问题）；
    
*   `Rows_sent`：返回给我们客户端的行数（150行）；
    
*   `Rows_examined`：MySQL扫描的行数（12万行，**注：扫描行数远大于返回行数，估计未走索引或索引失效**）；
    
*   `Bytes_sent`：返回数据的字节数（28500字节≈28KB，不是网络瓶颈）；
    
*   最后一行：具体的慢SQL语句。
    

（3）**慢查询日志分析工具**：mysqldumpslow与pt-query-digest

当慢查询日志文件过大（如：几十MB以上），我们手动打开查找，效率极低，这时需借助工具进行筛选和聚合分析。

**工具1**：mysqldumpslow（MySQL自带，轻量）

`mysqldumpslow`是MySQL内置的慢查询日志分析工具，能从慢查询日志中筛选并呈现具有代表性、对性能影响较大的SQL语句。它支持按执行时间、扫描行数、执行次数等指标排序，帮助我们快速定位和优化有性能问题的查询。

常用命令示例：

```javascript
# 1.按执行时间排序，取前10条最慢的SQL
mysqldumpslow -s t -t 10 /var/lib/mysql/mysql-slow.log

# 2.按扫描行数排序，取前10条（扫描行数越多，效率越低）
mysqldumpslow -s r -t 10 /var/lib/mysql/mysql-slow.log

# 3.按执行次数排序，取前10条（高频慢SQL危害更大）
mysqldumpslow -s c -t 10 /var/lib/mysql/mysql-slow.log

# 4.筛选包含order_info表的慢SQL
mysqldumpslow -g 'order_info' /var/lib/mysql/mysql-slow.log

# 5.筛选用户app_user执行的慢SQL
mysqldumpslow -u app_user /var/lib/mysql/mysql-slow.log

# 6.输出详细信息（包括执行时间、扫描行数等）
mysqldumpslow -v /var/lib/mysql/mysql-slow.log
```

**工具2**：pt-query-digest（Percona Toolkit，功能强大）

`mysqldumpslow`支持基础筛选，复杂场景下，我们建议使用Percona Toolkit中的`pt-query-digest`。它能聚合相似SQL（如：`user_id=567`和`user_id=890`视为同一类SQL）、分析执行频率、计算平均耗时等。

**安装步骤**（Linux为例）：

```
# 安装Percona Toolkit
yum install percona-toolkit -y
# 验证安装
pt-query-digest --version
```

**常用命令示例**：

```javascript
# 1.分析慢查询日志，生成详细报告
pt-query-digest /var/lib/mysql/mysql-slow.log > slow_report.txt

# 2.分析最近1小时的慢SQL
pt-query-digest --since=1h /var/lib/mysql/mysql-slow.log > slow_report_1h.txt

# 3.只分析order_info表的慢SQL
pt-query-digest --filter '$event->{table} eq "order_info"' /var/lib/mysql/mysql-slow.log > slow_report_order.txt

# 4.分析MySQL的general log（全量日志）
pt-query-digest /var/lib/mysql/general.log > general_report.txt
```

**报告解读**：  
`pt-query-digest`生成的报告分为摘要和详细分析两部分，摘要部分我们要关注：

*   `Total`：总执行时间、总执行次数；
    
*   `Avg`：平均执行时间；
    
*   `95%`：95%的SQL执行时间（比平均时间更能反映真实性能）；
    
*   `RowsExam`：平均扫描行数；
    
*   `Query`：SQL模板（相似SQL聚合后的模板）。
    

##### 2、Performance Schema：深度监控执行流程（深入分析为什么慢？如：锁等待、IO瓶颈等）

慢查询日志只能记录执行完成且超过阈值的SQL（初步定位 谁慢了），无法监控执行中但未超时的SQL或SQL卡在哪个步骤。此时，我们需借助Performance Schema：MySQL 5.5+引入的性能监控引擎，它能实时追踪SQL执行的每个环节（如：连接建立、语法解析、执行计划生成）。

（1）**开启Performance Schema**

MySQL 5.6+默认开启Performance Schema，我们可通过以下命令确认：

```
show variables like 'performance_schema';
```

若值为`OFF`，我们需在`my.cnf`中开启并重启MySQL：

```
[mysqld]
performance_schema = ON
```

（2）**常用监控场景示例**

**场景1**：查看当前正在执行的慢SQL

当系统卡顿但慢查询日志未记录（SQL未执行完成），我们可通过以下SQL查看正在执行的SQL及状态：

```sql
select
  p.id as process_id,
  u.user,
  p.host,
  p.db,
  p.command,
  p.time as execution_time, -- 已执行时间（秒）
  p.state, -- 执行状态（如："Sending data"、"Sorting result"）
  p.info as sql_text -- SQL内容
from information_schema.processlist p
left join mysql.user u on p.user = u.user
where p.time > 10 -- 筛选执行超过10秒的SQL
and p.command != 'Sleep'; -- 排除睡眠连接
```

**场景2**：分析SQL执行各阶段耗时

通过`performance_schema.events_statements_summary_by_digest`表，我们可查看SQL在解析、优化、执行等阶段的耗时：

```sql
select
  digest_text as sql_text, -- SQL模板
  count_star as execute_count, -- 执行次数
  sum_timer_parse as parse_time, -- 解析耗时（皮秒，需转换为秒）
  sum_timer_optimize as optimize_time, -- 优化耗时
  sum_timer_execute as execute_time, -- 执行耗时
  sum_rows_examined as total_rows_examined -- 总扫描行数
from performance_schema.events_statements_summary_by_digest
order by sum_timer_execute desc
limit 10;
```

**场景3**：查看索引使用情况

通过`performance_schema.table_io_waits_summary_by_index_usage`表，我们可查看哪些索引被使用、哪些索引未被使用（可删除无用索引）：

```sql
-- 查看索引使用次数（按使用次数升序，找出未使用的索引）
select
  table_schema,
  table_name,
  index_name,
  count_star as use_count -- 使用次数
from performance_schema.table_io_waits_summary_by_index_usage
where table_schema = 'test_db' -- 目标数据库
order by use_count asc;
```

##### 3、sys schema：Performance Schema的简化接口，降低性能分析的门槛

Performance Schema的表结构复杂（超过100张表），查询语句繁琐。MySQL 5.7+引入了`sys schema`：基于Performance Schema和Information Schema的视图集合，它为我们提供了简洁的查询接口，让性能分析更高效。

（1）**常用sys视图示例**

**场景1**：我们查看未使用的索引（无用索引）

```sql
-- 查看test_db数据库中未使用的索引
select * from sys.schema_unused_indexes where table_schema = 'test_db';
```

**场景2**：我们查看全表扫描的SQL

```sql
-- 查看最近执行过全表扫描的SQL
select * from sys.statements_with_full_table_scans order by exec_count desc;
```

**场景3**：我们查看锁等待情况

```sql
-- 查看当前的锁等待
select * from sys.innodb_lock_waits;
```

该视图会显示等待锁的事务ID、持有锁的事务ID、等待的锁类型、涉及的表和行等信息，帮助我们快速定位谁在锁表、锁了多久。

**场景4**：我们查看IO消耗最高的表

```sql
-- 按IO消耗排序，找出最耗IO的表
select * from sys.io_global_by_file_by_bytes order by total_bytes desc limit 10;
```

若某张表的`total_bytes`（总IO字节数）远高于其他表，可能是该表频繁被全表扫描，我们需优先优化它。

#### 三、怎么看懂执行计划？

抓到慢SQL后，我们还不能盲目优化（比如：随便加索引），我们必须先搞懂MySQL是怎么执行它的？这就需要执行计划。执行计划是MySQL优化器生成的执行路线图，包含扫描方式、索引使用、数据过滤逻辑等信息，我们诊断慢SQL时经常要用到。

##### 1、生成执行计划：EXPLAIN与EXPLAIN ANALYZE

MySQL提供两种生成执行计划的命令：`EXPLAIN`（预估执行计划）和`EXPLAIN ANALYZE`（MySQL 8.0.18+新增，实际执行并返回真实数据）。

（1）**EXPLAIN**：预估执行计划

针对慢SQL`select * from order_info where user_id = 567 and create_time between '2024-01-01' and '2024-06-01';`，我们在其前面加`EXPLAIN`即可生成预估执行计划：

```sql
EXPLAIN select * from order_info where user_id = 567 and create_time between '2024-01-01' and '2024-06-01';
```

执行后返回一张表格，包含12个字段，**我们新手需重点掌握这8个字段**：`id`、`select_type`、`table`、`type`、`possible_keys`、`key`、`rows`、`Extra`。

（2）**EXPLAIN ANALYZE**：真实执行计划

`EXPLAIN`仅提供预估信息，与实际执行情况可能存在偏差。MySQL 8.0.18+引入的`EXPLAIN ANALYZE`会**实际执行SQL语句**，并输出执行过程中各操作符的真实性能数据（如：耗时、实际行数），与优化器预估数据对比，帮助我们精准定位执行计划偏差。

```sql
EXPLAIN ANALYZE select * from order_info where user_id = 567 and create_time between '2024-01-01' and '2024-06-01';
```

执行结果示例：

```
-> Filter: ((order_info.user_id = 567) and (order_info.create_time between '2024-01-01 00:00:00' and '2024-06-01 23:59:59'))  (cost=1200.00 rows=150) (actual time=0.02..3.80 rows=150 loops=1)
    -> Table scan on order_info  (cost=1200.00 rows=120000) (actual time=0.01..2.50 rows=120000 loops=1)
```

通过`actual time`（真实时间）和`rows`（真实扫描行数），我们可直接判断SQL的瓶颈。

##### 2、执行计划主要字段解读

以“未建索引”和“建索引后”的执行计划对比，我们逐字段解读：

（1）**id**：查询序号

表示查询的层级（单表查询为1；多表联查或子查询时，序号越大优先级越高，先执行）。我们看示例：

*   单表查询：`id=1`；
    
*   子查询：`select * from user where order_count > (select count(*) from order_info where user_id = user.id)`，子查询`id=2`，主查询`id=1`，先执行子查询。
    

（2）**select\_type**：查询类型

表示查询的复杂程度（如：简单查询、子查询、联合查询等），常见类型如下：

*   `SIMPLE`：简单查询（无子查询、无联合查询）；
    
*   `SUBQUERY`：子查询（select子句中的子查询）；
    
*   `DERIVED`：派生表（from子句中的子查询，会生成临时表）；
    
*   `UNION`：联合查询（union后的查询）；
    
*   `UNION RESULT`：联合查询的结果集。
    

**优化提示**：`DERIVED`和`UNION`可能产生临时表，若数据量大需优化（如：拆分子查询）。

（3）**table**：查询的表

表示当前行对应的表名（若为派生表，会显示`derivedN`，N为子查询的`id`）。

（4）**type**：连接类型（**核心指标**！）

表示MySQL访问表的方式（即：如何获取数据）。

*   从优到劣排序：
    

1.  **system**：表中只有1条记录（如：系统表），效率最高；
    
2.  **const**：通过主键或唯一索引查询，匹配1条记录（如：`where id=1`）；
    
3.  **eq\_ref**：多表联查时，通过主键或唯一索引匹配，每行只返回1条记录（如：`user join order on user.id=order.user_id`）；
    
4.  **ref**：通过非唯一索引查询，可能返回多条记录（如：`where name='张三'`）；
    
5.  **range**：索引范围查询（如：`between`、`>`、`<`、`in`）；
    
6.  **index**：扫描整个索引（比全表扫描快，因为索引文件比数据文件小）；
    
7.  **ALL**：全表扫描（效率最低，必须优化）。
    

*   **优化标准**：在我们的实际业务场景中，`type`应至少达到`range`级别，最好是`ref`或`const`；若为`ALL`，我们需立即优化。
    
*   **示例对比**：
    

*   未建索引：`type=ALL`（全表扫描）；
    
*   建索引后：`type=range`（范围查询）。
    

（5）**possible\_keys**：可能使用的索引

MySQL优化器认为“可能适用”的索引列表（但不一定实际使用）。我们看示例：若表有`idx_user_id`和`idx_create_time`两个索引，`possible_keys`可能显示`idx_user_id,idx_create_time`。

（6）**key**：实际使用的索引

MySQL实际执行时使用的索引（若为`NULL`，表示未使用任何索引）。

*   **优化提示**：若`possible_keys`有值，但`key`为`NULL`，说明索引失效或优化器选择了更差的执行计划（我们需分析原因）。
    
*   **示例对比**：
    

*   未建索引：`key=NULL`；
    
*   建索引后：`key=idx_user_create`（联合索引）。
    

（7）**key\_len**：使用的索引长度

表示MySQL使用的索引字节数（可判断索引使用的完整性）。

*   **计算规则**：
    

*   字符类型：`varchar(20)` utf8mb4编码，`key_len=20*4 + 2=82`（4字节/字符，2字节存储长度）；
    
*   数值类型：`int`占4字节，`bigint`占8字节；
    
*   可为空：需额外加1字节。
    

*   **优化提示**：若`key_len`小于索引总长度，说明索引未被完全使用（如：联合索引只用到了前几个字段）。
    

（8）**rows**：预估扫描行数

MySQL优化器预估需要扫描的行数（值越小越好）。我们看示例对比：

*   未建索引：`rows=120000`（预估扫描12万行）；
    
*   建索引后：`rows=150`（预估扫描150行）。
    

（9）**Extra**：额外信息（**重要**！）

表示MySQL执行过程中的额外操作（很多时候是**慢查询的直接原因**）。

*   常见类型：
    

*   **Using where**：使用`where`条件过滤数据（但未使用索引，需全表扫描后过滤）；
    
*   **Using index**：使用“覆盖索引”（无需回表，直接从索引获取数据，效率高）；
    
*   **Using filesort**：无法通过索引排序，需在内存/磁盘中排序（耗时，需优化）；
    
*   **Using temporary**：使用临时表存储中间结果（如：`group by`/`distinct`，耗时，需优化）；
    
*   **Using join buffer**：多表联查时使用连接缓冲区（说明未使用索引，需优化）；
    
*   **Using index condition**：使用“索引下推”（MySQL 5.6+新增，在存储引擎层过滤数据，效率高）。
    

*   **优化提示**：`Using filesort`和`Using temporary`是两大“性能瓶颈”，需优先优化。
    

##### 3、执行计划里常见的异常情况

结合我们的实际业务场景，我们来分析以下6种典型的执行计划异常情况及原因：

（1）**type=ALL（全表扫描）**

*   **现象**：`type=ALL`，`key=NULL`，`rows`很大。
    
*   **原因**：
    

1.  表太小（数据量<1000行），MySQL认为全表扫描更快；
    
2.  未建索引；
    
3.  索引失效（如：左模糊、函数操作字段）。
    

*   **优化**：我们建合适的索引，避免索引失效。
    

（2）**possible\_keys有值，但key=NULL（索引未使用）**

*   **现象**：`possible_keys=idx_user_id`，`key=NULL`。
    
*   **原因**：
    

1.  索引选择性差（如：“性别”字段，只有“男/女”，索引过滤效果差）；
    
2.  数据量太小，MySQL认为全表扫描更快；
    
3.  统计信息过时，优化器判断错误。
    

*   **优化**：
    

1.  我们删除选择性差的索引；
    
2.  更新统计信息（`analyze table order_info;`）；
    
3.  我们用`force index`强制使用索引（**谨慎使用**）。
    

（3）**Extra=Using filesort（文件排序）**

*   **现象**：`Extra=Using filesort`，执行时间长。
    
*   **示例SQL**：`select * from user where age>30 order by name;`
    
*   **原因**：排序字段`name`未加入索引，MySQL需先全表扫描过滤`age>30`，再对结果排序。
    
*   **优化**：我们建联合索引`(age, name)`，让排序通过索引完成。
    

（4）**Extra=Using temporary（临时表）**

*   **现象**：`Extra=Using temporary`，执行时间长。
    
*   **示例SQL**：`select count(*) from user group by age;`
    
*   **原因**：`group by`字段`age`未建索引，MySQL需创建临时表存储分组结果。
    
*   **优化**：我们建索引`(age)`，避免临时表。
    

（5）**key\_len小于索引长度（索引未完全使用）**

*   **现象**：联合索引`(a,b,c)`，`key_len`只对应`a`的长度。
    
*   **示例SQL**：`select * from user where b=1 and c>10;`
    
*   **原因**：违反“最左前缀原则”，联合索引需从左到右使用，跳过`a`直接查`b`会导致索引失效。
    
*   **优化**：我们调整查询条件，或建索引`(b,c)`。
    

（6）**type=ref但rows很大（索引选择性差）**

*   **现象**：`type=ref`，但`rows=10000`（扫描行数多）。
    
*   **原因**：索引字段选择性差（如：“性别”、“状态”等低基数字段）。
    
*   **优化**：我们删除该索引，或与其他字段组合成联合索引（提升选择性）。