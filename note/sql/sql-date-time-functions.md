---
title: SQL日期时间函数跨数据库对照，五大主流数据库差异与使用建议
lastUpdated: 2026-10-08 04:00:00
---


我们有没有想过，为什么一个简单的“现在几点？”在数据库里容易出大问题？在我们每天用的App等系统里，时间无处不在：我们下单的那一刻、银行转账的时间戳、共享单车开锁的瞬间、甚至医院打针的记录……背后都是靠数据库里的“时间”来记账。看起来是不是很简单？我们写个`NOW()`或`CURRENT_TIMESTAMP`就解决问题了。但现实是，我们中的很多人在这里踩了大坑，轻则数据对不上、报表出错，重则导致用户多买商品、系统崩溃等等。那么，时间的问题出在哪呢？  
首先，不同数据库对“现在”的理解不一样。有的数据库认为是这条SQL开始执行的时间，有的数据库认为是整个事务开始的时间，还有的数据库直接拿服务器当前时间，结果我们的程序换了一个数据库，时间就“漂移”了。

其次，时区是一个大坑！我们用的是北京时间，国外用的是当地时间，夏令时还会自动调钟，如果没处理好，凌晨1点的订单可能被记成昨天，我们的促销活动可能提前结束或延后开启。还有精度问题。我们是要精确到秒？毫秒？还是微秒？我们选错了，要么浪费存储，要么关键时刻查不到记录。更别提性能问题了：时间字段没加索引，我们查个最近订单都能卡住。  
这样看来，“时间”确实是数据库中最易被误解的数据类型。我们今天就来拆解这个最容易被误解的“时间”，拟了以下提纲，但由于时间所限，本文只码到（二-9），敬请谅解！  
一、日期/时间函数跨数据库对照表  
二、日期/时间计算与格式化函数跨数据库对照表  
1、日期/时间加减  
2、日期/时间格式化  
3、提取日期/时间部分  
4、常用占位符速查表  
5、获取当前周/季度/星期几  
6、时区转换函数  
7、时间差计算  

8、生日计算（年龄、下一个生日、星座等）  
9、工作日计算（排除周末、节假日）  
10、农历计算（Chinese Lunar Calendar）  
11、财年/财季计算（Fiscal Year & Quarter）  
12、时间段重叠判断（区间交集）  
13、时区夏令时处理（Daylight Saving Time, DST）  
14、周数计算（ISO周、自定义周起始日）  
15、重复事件生成（每日/每周/每月）  
16、时间桶分组（按5分钟、1小时聚合）  
17、时区地图可视化集成解决方案

#### 一、日期/时间函数跨数据库对照表

| 数据库 | 函数名 | 返回类型 | 行为说明 | 是否“可变”（每次调用可能不同） | 标准SQL兼容性 | 推荐替代/备注 |
| --- | --- | --- | --- | --- | --- | --- |
| **MySQL** | `NOW()` | `DATETIME` | 返回语句开始执行时的时间。在整个SQL语句执行期间，无论该语句中`NOW()`函数被调用多少次，其返回值始终保持不变，保证了语句执行过程中时间参考的一致性 | 否 | 非标准（常用别名） | 事务中恒定，适合日志记录。比如在记录用户操作日志时，使用`NOW()`可保证同一操作相关的多条日志时间戳一致，方便我们后续追溯操作流程。注意：在长事务中执行多个语句时，每个语句中的`NOW()`返回的是各自语句开始时间，而非事务开始时间。 |
|  | `CURRENT_TIMESTAMP` | `DATETIME` / `TIMESTAMP` | 功能等同于`NOW()` 。在设置列的默认值时，如果我们将`CURRENT_TIMESTAMP`作为默认值，当插入新记录时该列会自动填充为语句执行时刻的时间。并且在MySQL 5.6及以上版本中，对于`TIMESTAMP`类型的列，我们还可以设置该列在记录更新时自动更新为当前时间 | 否 | SQL标准（部分） | 可用于列默认值。例如在设计用户表时，我们可将记录创建时间列的默认值设为`CURRENT_TIMESTAMP`，方便记录数据插入时间。 |
|  | `SYSDATE()` | `DATETIME` | 每次调用该函数，都会实时获取调用时刻的系统时间，返回值会随着调用时间的不同而变化 | 是 | 非标准 | 用于需要实时性的场景。比如在实现实时监控系统时，通过`SYSDATE()`获取每次数据采集的精确时间，以便分析数据变化的时间序列。 |
|  | `UTC_TIMESTAMP()` | `DATETIME` | 返回协调世界时（UTC）的时间，和`NOW()`一样，在语句执行期间保持恒定，不受本地时区设置影响 | 否 | 非标准 | 跨时区应用推荐。在构建全球性的应用系统时，我们使用`UTC_TIMESTAMP()`可保证不同地区用户的数据时间记录统一标准，避免因时区差异导致的数据混乱。 |
| **PostgreSQL** | `NOW()` | `TIMESTAMP WITH TIME ZONE` | 返回事务开始时的时间。在一个事务中，无论何时调用`NOW()`，其返回值都是事务开始那一刻的时间戳 | 否（事务级） | SQL标准别名 | 返回事务开始时的时间。在整个事务中保持恒定。我们推荐使用标准的`CURRENT_TIMESTAMP`。 |
|  | `CURRENT_TIMESTAMP` | `TIMESTAMP WITH TIME ZONE` | 返回带时区的时间戳，表示一个全球唯一的、精确的绝对时间点（通常以UTC存储）。在标准SQL和PostgreSQL中，该函数默认返回`TIMESTAMP WITH TIME ZONE`类型。`AT TIME ZONE`会将结果类型从`TIMESTAMPTZ`转换为`TIMESTAMP`（无时区），但不影响其在事务内的恒定值。即使转换为`TIMESTAMP`，其值仍基于事务开始时的UTC时间进行时区转换，因此在事务内仍保持恒定。功能与`NOW()`一致，返回事务开始时的时间戳。 | 否（事务级） | SQL标准 | 首选标准写法。在编写遵循SQL标准的代码时，我们优先使用`CURRENT_TIMESTAMP`，有助于在不同数据库间迁移代码时减少兼容性问题。 |
|  | `CLOCK_TIMESTAMP()` | `TIMESTAMP WITH TIME ZONE` | 精确返回函数实际调用瞬间的系统时间，每次调用的返回值会因调用时刻不同而不同 | 是 | 非标准 | 替代MySQL的`SYSDATE()` 。在PostgreSQL环境下，如果需要获取类似MySQL中`SYSDATE()`那样的实时时间，我们可使用`CLOCK_TIMESTAMP()`。 |
|  | `TIMEOFDAY()` | `TEXT` | 返回一个人类可读格式的字符串，包含当前时间的时、分、秒以及微秒信息 | 是 | 非标准 | 调试用，我们不推荐实际应用。在开发过程中调试代码，需要直观查看时间细节时可使用，但因其返回值为文本类型，在实际应用中进行时间计算或存储等操作不太方便，故我们不推荐用于实际应用环境。 |
|  | `STATEMENT_TIMESTAMP()` | `TIMESTAMP WITH TIME ZONE` | 返回SQL语句开始执行时的时间戳，在语句执行期间保持不变 | 否（语句级） | 非标准 | 返回当前SQL语句开始执行时的时间戳，在语句执行期间保持不变。对于包含多个子查询的复杂语句，此值与`NOW()`可能不同。 |
| **Oracle** | `SYSDATE` | `DATE` | 获取数据库服务器当前的日期和时间，每次调用都会实时更新时间值 | 是 | 非标准 | Oracle最常用。在Oracle数据库开发中，`SYSDATE`是获取当前时间最常用的函数，例如在插入订单记录时，使用`SYSDATE`记录订单生成时间。 |
|  | `CURRENT_DATE` | `DATE` | 返回当前会话时区下的日期和时间（精确到秒）。**在单个SQL语句内保持不变（语句级恒定）**，但在同一事务的不同语句间可能变化。例如，在一个事务中先执行`SELECT CURRENT_DATE FROM DUAL;`，等待几秒后再执行一次，两次结果可能不同。 | 否（语句级） | SQL标准 | 仅需关注“日期”时使用。当只需要记录日期，不需要精确到时间时，可使用`TRUNC(CURRENT_DATE)`，比如记录用户注册日期。 |
|  | `CURRENT_TIMESTAMP` | `TIMESTAMP WITH TIME ZONE` | 返回带有时区信息的时间戳，并且在事务处理过程中，其返回值保持恒定 | 否 | SQL标准 | 推荐用于标准兼容。在需要遵循SQL标准且涉及到事务中时间一致性的场景下，我们优先使用`CURRENT_TIMESTAMP`。 |
|  | `LOCALTIMESTAMP` | `TIMESTAMP` | 返回不带时区信息的当前时间，在事务执行期间保持不变 | 否 | SQL标准 | 无时区需求时使用。如果应用场景对时区不敏感，仅关注本地时间，我们可使用`LOCALTIMESTAMP`，例如记录本地系统内部操作的时间。 |
|  | `SYSTIMESTAMP` | `TIMESTAMP WITH TIME ZONE` | 返回系统当前的时间戳，包含时区信息且精确到微秒级，每次调用实时更新 | 是 | 非标准 | 高精度实时时间。适用于对时间精度要求极高的场景，如金融交易系统记录交易时间，使用`SYSTIMESTAMP`可精确记录到微秒，保证交易时间的准确性。 |
| **SQL Server** | `GETDATE()` | `DATETIME` | 返回当前系统的日期和时间，在SQL语句执行过程中，其返回值保持不变 | 否 | 非标准 | 最常用。SQL Server保证查询的可重复执行性，因此所有内置时间函数在语句执行期间都保持恒定。在SQL Server数据库应用开发中，`GETDATE()`是获取当前时间的常用函数，例如在生成报表时，使用`GETDATE()`记录报表生成时间。 |
|  | `CURRENT_TIMESTAMP` | `DATETIME` | 是`GETDATE()`的同义词，采用SQL标准写法，功能和`GETDATE()`一致 | 否 | SQL标准 | 推荐标准写法。SQL Server保证查询的可重复执行性，因此所有内置时间函数在语句执行期间都保持恒定。为了提高代码的可移植性，在SQL Server中我们建议使用`CURRENT_TIMESTAMP`这种标准写法来获取当前时间。 |
|  | `SYSDATETIME()` | `DATETIME2(7)` | 相比`GETDATE()`，具有更高的时间精度，可达100纳秒（返回`DATETIME2(7)`类型），在语句执行期间返回值恒定 | 否 | 非标准 | 需要高精度时使用。在一些对时间精度要求较高的科学计算或性能分析场景中，我们可使用`SYSDATETIME()`获取更精确的时间。 |
|  | `SYSUTCDATETIME()` | `DATETIME2(7)` | 返回协调世界时（UTC）的时间，精度与`SYSDATETIME()`相同（返回`DATETIME2(7)`类型） | 否 | 非标准 | 跨时区推荐。在构建跨时区的应用系统时，`SYSUTCDATETIME()`可提供高精度的UTC时间，方便统一不同地区的数据时间标准。 |
|  | `GETUTCDATE()` | `DATETIME` | 返回UTC时间，其精度与`GETDATE()`一致，在语句执行期间返回值恒定 | 否 | 非标准 | 适用于对UTC时间精度要求不高，只需要获取大致UTC时间的场景，例如一些简单的跨时区日志记录。 |
| **SQLite** | `datetime('now')` | `TEXT` | 以ISO8601格式（`YYYY-MM-DD HH:MM:SS.SSS`，含毫秒）返回当前时间的文本字符串，每次调用函数时实时获取当前时间 | 是 | 非标准 | 用`strftime()`更灵活。`strftime()`函数可以根据不同的格式字符串对时间进行灵活格式化，相比`datetime('now')`功能更强大。 |
|  | `CURRENT_TIMESTAMP` | `TEXT` | 以`YYYY-MM-DD HH:MM:SS`格式（无毫秒）返回当前时间的文本字符串，在**语句执行期间返回值恒定**。但在触发器中，其值可能随触发器执行时间变化（取决于触发时机）。例如，在`BEFORE INSERT`触发器中，`CURRENT_TIMESTAMP`仍为语句开始时间；而在`AFTER INSERT`或跨语句触发器中，其值可能反映触发器实际执行时刻。 | 否（语句级） | SQL标准 | 推荐用于标准兼容。在需要遵循SQL标准获取当前时间的场景下，可使用`CURRENT_TIMESTAMP`，尽管其返回值为文本类型且精度较低，但在一些对时间格式要求不复杂且需要标准兼容性的场景中适用。 |
|  | `strftime('%Y-%m-%d %H:%M:%f', 'now')` | `TEXT` | 按照指定格式返回高精度格式化后的时间字符串，精确到微秒，每次调用实时更新 | 是 | 非标准 | 需要微秒时使用。在对时间精度要求较高且需要自定义格式的场景下，如记录高精度的操作日志，可使用该函数获取带微秒的时间字符串。 |

##### 1、使用建议

（1）**优先使用标准函数**：如：`CURRENT_TIMESTAMP`，在多数数据库中行为一致（事务/语句级恒定），便于移植。在开发多数据库兼容的应用程序时，我们统一使用`CURRENT_TIMESTAMP`获取时间，可减少因数据库不同导致的时间函数差异问题，降低代码维护成本。例如，我们在使用Hibernate等ORM框架时，框架可以根据不同数据库自动适配`CURRENT_TIMESTAMP`的具体实现。

（2）**需要“实时”时间？**：

*   MySQL → `SYSDATE()`：在MySQL环境下，若我们的业务需求是获取精确到调用时刻的实时时间，例如，在实现一个限时抢购功能，需要精确记录用户抢购时间以判断是否在有效时间内，此时我们可使用`SYSDATE()`。
    
*   PostgreSQL → `CLOCK_TIMESTAMP()`：当我们在PostgreSQL数据库中开发实时监控系统，需要记录每次数据采集的实时时间，以便精确分析数据变化趋势时，`CLOCK_TIMESTAMP()`可满足需求。
    
*   Oracle → `SYSDATE`或`SYSTIMESTAMP`：在Oracle数据库中，如果只是简单获取当前时间，对精度要求不高，我们可使用常用的`SYSDATE`；若在金融交易等对时间精度要求极高的场景下，需精确到微秒级，我们应使用`SYSTIMESTAMP`。
    
*   SQL Server → **无语句内“可变”函数**，但我们可通过 `GETDATE()` + 应用层多次调用模拟，或使用CLR函数/外部程序。例如，在一个实时统计系统中，我们通过定时调用包含`GETDATE()`的查询，并在应用层记录每次调用时间，来模拟实时时间记录。即使在用户自定义函数（UDF）或标量函数中调用`GETDATE()`，其值仍为语句开始时间，不会在函数内重新计算。（注：`GETDATE()`本身在语句内恒定，但多次调用语句可得不同值。）
    
*   SQLite → `datetime('now')`：在SQLite数据库中，当开发一个简单的计时应用，需要实时获取当前时间来记录用户操作时长等场景时，我们可使用`datetime('now')`获取实时时间。
    

（3）**跨时区应用**：优先使用UTC时间函数，如：

*   MySQL: `UTC_TIMESTAMP()`：在我们构建一个全球性的电商平台，不同地区用户下单时间需要统一标准记录时，使用`UTC_TIMESTAMP()`记录订单时间，可避免因时区差异导致的时间混乱，方便我们后续进行订单统计和分析。
    
*   PostgreSQL: `CURRENT_TIMESTAMP AT TIME ZONE 'UTC'`：PostgreSQL通过这种方式将事务开始时间转换为UTC时间。例如，在开发一个跨国公司的项目管理系统，不同地区的团队成员创建任务时，我们将任务创建时间转换为UTC时间记录，便于统一管理和协调项目进度。
    
*   SQL Server: `SYSUTCDATETIME()`：在开发一个跨时区的在线会议系统时，我们使用`SYSUTCDATETIME()`记录会议开始和结束时间，可保证各个地区的参会人员对会议时间有统一的认知，避免因时区换算错误导致的会议冲突。
    
*   Oracle: `SYS_EXTRACT_UTC(SYSTIMESTAMP)`：在Oracle数据库的全球化应用开发中，例如，跨国银行系统，我们通过该函数将包含时区信息的高精度系统时间转换为UTC时间，用于记录全球范围内的交易时间，保证交易时间记录的一致性和准确性。
    

（4）**ORM/框架适配**：我们建议封装数据库方言层，根据数据库类型动态选择函数。以Spring Data JPA为例，在配置文件中定义不同数据库的时间函数映射关系，在代码中通过统一接口调用获取时间函数，框架会根据实际使用的数据库类型，自动选择对应的时间函数进行执行，提高代码的可维护性和可扩展性。

（5）**避免在WHERE/JOIN中使用可变函数**：可能导致执行计划不稳定或性能问题。例如，在MySQL中，如果在`WHERE`条件中使用`SYSDATE()`，数据库优化器难以提前生成稳定的执行计划，因为每次执行查询时`SYSDATE()`的值可能不同，这可能导致查询性能下降。在进行复杂查询优化时，我们应尽量避免此类情况，可将可变时间函数的结果赋值给变量，然后在`WHERE`或`JOIN`中使用变量进行条件判断。

##### 2、说明：是否“可变”的含义

*   **不可变（语句/事务级恒定）**：在同一个SQL语句或事务中，多次调用返回相同值。适合用在审计、日志一致性。例如，在财务审计系统中，记录每笔财务操作的时间，使用不可变时间函数可保证在同一事务中所有相关操作时间记录一致，方便我们后续追溯和核对数据，保证数据的完整性和准确性。
    
*   **可变**：每次调用都重新计算当前时间。适合用在精确计时、性能监控等。比如，在一个性能测试工具中，需要精确记录每次函数调用的时间间隔，以评估系统性能，此时，我们使用可变时间函数能够准确获取每次调用的实时时间，从而得到精确的时间间隔数据，为性能优化提供可靠依据。
    

#### 二、日期/时间计算与格式化函数跨数据库对照表

##### 1、日期/时间加减

| 操作目标 | MySQL | PostgreSQL | Oracle | SQL Server | SQLite |
| --- | --- | --- | --- | --- | --- |
| **加1天** | `DATE_ADD(NOW(), INTERVAL 1 DAY)` | `NOW() + INTERVAL '1 day'` | `SYSDATE + 1` | `DATEADD(day, 1, GETDATE())` | `datetime('now', '+1 day')` |
| **减1小时** | `DATE_SUB(NOW(), INTERVAL 1 HOUR)` | `NOW() - INTERVAL '1 hour'` | `SYSDATE - INTERVAL '1' HOUR` | `DATEADD(hour, -1, GETDATE())` | `datetime('now', '-1 hour')` |
| **加30分钟** | `DATE_ADD(NOW(), INTERVAL 30 MINUTE)` | `NOW() + INTERVAL '30 minute'` | `SYSDATE + INTERVAL '30' MINUTE` | `DATEADD(minute, 30, GETDATE())` | `datetime('now', '+30 minute')` |
| **加1年** | `DATE_ADD(NOW(), INTERVAL 1 YEAR)` | `NOW() + INTERVAL '1 year'` | `ADD_MONTHS(SYSDATE, 12) -- 推荐：避免闰年问题` | `DATEADD(year, 1, GETDATE())` | `datetime('now', '+1 year')` |

**说明**：PostgreSQL，我们建议统一使用单数形式（如：`minute`, `day`, `year`）以符合标准习惯。

##### 2、日期/时间格式化

| 操作目标 | MySQL | PostgreSQL | Oracle | SQL Server | SQLite |
| --- | --- | --- | --- | --- | --- |
| **标准格式** | `DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')` | `TO_CHAR(NOW(), 'YYYY-MM-DD HH24:MI:SS')` | `TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS')` | `CONVERT(varchar, GETDATE(), 20) -- 格式: yyyy-mm-dd hh:mi:ss（不包含毫秒）；如需毫秒，请使用21或121` | `strftime('%Y-%m-%d %H:%M:%S', 'now')` |
| **仅日期** | `DATE_FORMAT(NOW(), '%Y-%m-%d')` | `TO_CHAR(NOW(), 'YYYY-MM-DD')` | `TO_CHAR(SYSDATE, 'YYYY-MM-DD')` | `CONVERT(varchar, GETDATE(), 23) -- yyyy-mm-dd` | `strftime('%Y-%m-%d', 'now')` |
| **仅时间** | `DATE_FORMAT(NOW(), '%H:%i:%s')` | `TO_CHAR(NOW(), 'HH24:MI:SS')` | `TO_CHAR(SYSDATE, 'HH24:MI:SS')` | `CONVERT(varchar, GETDATE(), 108) -- hh:mi:ss` | `strftime('%H:%M:%S', 'now')` |

##### 3、提取日期/时间部分

| 操作目标 | MySQL | PostgreSQL | Oracle | SQL Server | SQLite |
| --- | --- | --- | --- | --- | --- |
| **提取年份** | `YEAR(NOW())` | `EXTRACT(YEAR FROM NOW())` | `EXTRACT(YEAR FROM SYSDATE)` | `YEAR(GETDATE())` | `strftime('%Y', 'now')` |
| **提取月份** | `MONTH(NOW())` | `EXTRACT(MONTH FROM NOW())` | `EXTRACT(MONTH FROM SYSDATE)` | `MONTH(GETDATE())` | `strftime('%m', 'now')` |
| **提取天数** | `DAY(NOW())` | `EXTRACT(DAY FROM NOW())` | `EXTRACT(DAY FROM SYSDATE)` | `DAY(GETDATE())` | `strftime('%d', 'now')` |
| **提取小时** | `HOUR(NOW())` | `EXTRACT(HOUR FROM NOW())` | `EXTRACT(HOUR FROM SYSDATE) -- 与前列保持一致` | `DATEPART(hour, GETDATE())` | `strftime('%H', 'now')` |
| **提取分钟** | `MINUTE(NOW())` | `EXTRACT(MINUTE FROM NOW())` | `EXTRACT(MINUTE FROM SYSDATE) -- 与前列保持一致` | `DATEPART(minute, GETDATE())` | `strftime('%M', 'now')` |

⚠️ **注意**：Oracle中`SYSDATE`已足够用于提取，我们无需强制使用`SYSTIMESTAMP`，除非需要微秒精度。

##### 4、常用占位符速查表

| 含义 | MySQL | PostgreSQL/Oracle | SQL Server(CONVERT style) | SQLite |
| --- | --- | --- | --- | --- |
| **四位年份** | `%Y` | `YYYY` | `yyyy` | `%Y` |
| **月份(01-12)** | `%m` | `MM` | `mm` | `%m` |
| **日期(01-31)** | `%d` | `DD` | `dd` | `%d` |
| **24小时制** | `%H` | `HH24` | `HH` | `%H` |
| **分钟** | `%i` | `MI` | `mi` | `%M` ← ⚠️ **注意**：与MySQL不同 |
| **秒** | `%s` | `SS` | `ss` | `%S` |

**说明**：

*   SQL Server的代码用在`CONVERT`函数的第三个参数（style）。
    
*   SQLite与MySQL在“分钟”上不同：SQLite用`%M`，MySQL用`%i`，极易混淆，我们需特别注意！
    

##### 5、获取当前周/季度/星期几

| 操作目标 | MySQL | PostgreSQL | Oracle | SQL Server | SQLite |
| --- | --- | --- | --- | --- | --- |
| **星期几（数字，1=周一，7=周日）** | `WEEKDAY(NOW()) + 1`
（`WEEKDAY()`返回0=周一）

 | `EXTRACT(ISODOW FROM NOW())`

（1=周一，7=周日）

 | `TO_NUMBER(TO_CHAR(SYSDATE, 'D'))`

（注意：1=周日或周一，取决于`NLS_TERRITORY`）

 | `DATEPART(WEEKDAY, GETDATE())`

（默认1=周日，可通过`SET DATEFIRST 1`设为周一）

 | `(strftime('%w', 'now') + 6) % 7 + 1`

（`%w`：0=周日→6=周六 → 转换为1=周一）

 |
| **星期几（中文/英文名）** | `DAYNAME(NOW())` | `TO_CHAR(NOW(), 'Day')` | `TO_CHAR(SYSDATE, 'Day', 'NLS_DATE_LANGUAGE=AMERICAN')` | `DATENAME(WEEKDAY, GETDATE())` | —（我们需用`CASE`或应用层转换） |
| **当前周数（一年第几周）** | `WEEK(NOW(), 1)`

（模式1：周一为周首）

 | `EXTRACT(WEEK FROM NOW())` | `TO_NUMBER(TO_CHAR(SYSDATE, 'IW'))`

（ISO周，周一为周首）

 | `DATEPART(ISO_WEEK, GETDATE())`

（SQL Server 2008+）

 | `strftime('%W', 'now')`

（%W：周一为周首，00-53）

 |
| **当前季度（1-4）** | `QUARTER(NOW())` | `EXTRACT(QUARTER FROM NOW())` | `TO_NUMBER(TO_CHAR(SYSDATE, 'Q'))` | `DATEPART(QUARTER, GETDATE())` | `(strftime('%m', 'now') - 1) / 3 + 1` |
| **当前年份的第几天（1-366）** | `DAYOFYEAR(NOW())` | `EXTRACT(DOY FROM NOW())` | `TO_NUMBER(TO_CHAR(SYSDATE, 'DDD'))` | `DATEPART(DAYOFYEAR, GETDATE())` | `strftime('%j', 'now')` |

**说明**：

*   Oracle的`TO_CHAR(..., 'D')`：返回值依赖`NLS_TERRITORY`。例如，美国地区1=周日，德国地区1=周一。我们推荐使用`IW`或`TO_CHAR(..., 'DY')`避免歧义。
    
*   SQL Server的`DATEPART(WEEKDAY, ...)`：默认1=周日。如需1=周一，请在会话中执行：`SET DATEFIRST 1;`
    
*   SQLite无内置星期名函数，我们需用`strftime('%w')` + 应用层`CASE`映射，例如：
    

```sql
SELECT CASE strftime('%w', 'now')
    WHEN '0' THEN 'Sunday'
    WHEN '1' THEN 'Monday'
    ...
END AS day_name;
```

##### 6、时区转换函数

| 操作目标 | MySQL | PostgreSQL | Oracle | SQL Server | SQLite |
| --- | --- | --- | --- | --- | --- |
| **获取当前会话时区** | `@@session.time_zone` | `CURRENT_SETTING('TIMEZONE')` | `SESSIONTIMEZONE` | `SYSDATETIMEOFFSET()`（返回带时区偏移的时间） | —（无内置时区支持） |
| **转换为UTC时间** | `UTC_TIMESTAMP()`
或 `CONVERT_TZ(NOW(), @@session.time_zone, '+00:00')`

 | `NOW() AT TIME ZONE 'UTC'` | `SYS_EXTRACT_UTC(SYSTIMESTAMP)` | `GETUTCDATE()`

或`SYSUTCDATETIME()`（高精度）

 | `datetime('now', 'utc')` |
| **从UTC转本地时区** | `CONVERT_TZ(utc_time, '+00:00', @@session.time_zone)` | `utc_time AT TIME ZONE 'UTC' AT TIME ZONE '本地时区名'`

例如：`AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Shanghai'`

 | `FROM_TZ(CAST(utc_time AS TIMESTAMP), 'UTC') AT TIME ZONE 'Asia/Shanghai'` | `SWITCHOFFSET(utc_time_with_offset, '+08:00')`

或使用`TODATETIMEOFFSET` + `SWITCHOFFSET`

 | `datetime('now', 'localtime')`

或 `datetime(utc_str, 'utc', 'localtime')`

 |
| **列出支持的时区名** | `SELECT * FROM mysql.time_zone_name;`（需先加载时区表） | `SELECT * FROM pg_timezone_names;` | `SELECT * FROM V$TIMEZONE_NAMES;` | —（使用Windows时区ID，如: `'China Standard Time'`） | —（不支持命名时区） |
| **设置会话时区** | `SET time_zone = '+08:00';`

或 `SET time_zone = 'Asia/Shanghai';`

 | `SET TIMEZONE = 'Asia/Shanghai';` | `ALTER SESSION SET TIME_ZONE = '+08:00';` | —（通过操作系统或登录配置） | —（不支持） |

**说明**：

*   **MySQL时区表**：默认未加载。我们需运行`mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root mysql`初始化。
    
*   **PostgreSQL时区名**：支持IANA时区（如：`'America/New_York'`, `'Asia/Tokyo'`），我们推荐使用。
    
*   **Oracle时区转换**：我们需注意`TIMESTAMP`与`TIMESTAMP WITH TIME ZONE`类型差异。`FROM_TZ`用在给无时区时间附加时区。
    
*   **SQL Server时区**：2016+支持`AT TIME ZONE`函数（我们推荐）：
    

```sql
SELECT GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'China Standard Time';
```

*   **SQLite时区能力有限**：仅支持`'utc'`和`'localtime'`修饰符，无法处理任意命名时区。
    

**示例**：我们跨库“获取当前北京时间”

| 数据库 | 语句 |
| --- | --- |
| **MySQL** | `CONVERT_TZ(NOW(), @@session.time_zone, '+08:00')`
或设时区后直接`NOW()`

 |
| **PostgreSQL** | `NOW() AT TIME ZONE 'Asia/Shanghai'` |
| **Oracle** | `SYSTIMESTAMP AT TIME ZONE 'Asia/Shanghai'` |
| **SQL Server** | `GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'China Standard Time'`

（SQL Server 2016+）

 |
| **SQLite** | `datetime('now', 'localtime')`（假设服务器在东八区） |

**附录**：推荐时区名称（IANA标准）

| 地区 | 推荐时区名 |
| --- | --- |
| 中国 | `Asia/Shanghai` |
| 美国东部 | `America/New_York` |
| 美国西部 | `America/Los_Angeles` |
| 英国 | `Europe/London` |
| 日本 | `Asia/Tokyo` |
| 澳大利亚 | `Australia/Sydney` |

**说明**：我们建议跨平台使用IANA时区名（如：`Asia/Shanghai`），避免使用缩写（如：`CST`, `PST`），因其存在歧义。

##### 7、时间差计算

计算两个时间点之间的差值（天、小时、分钟、秒、毫秒）

| 操作目标 | MySQL | PostgreSQL | Oracle | SQL Server | SQLite |
| --- | --- | --- | --- | --- | --- |
| **相差天数** | `DATEDIFF(end, start)` | `DATE_PART('day', end - start)`
或 `(end - start)`（返回浮点天数）

 | `TRUNC(end) - TRUNC(start)`

或 `end - start`（返回天数小数）

 | `DATEDIFF(day, start, end)` | `julianday(end) - julianday(start)` |
| **相差小时数** | `TIMESTAMPDIFF(HOUR, start, end)` | `EXTRACT(EPOCH FROM (end - start)) / 3600` | `(end - start) * 24` | `DATEDIFF(hour, start, end)` | `(julianday(end) - julianday(start)) * 24` |
| **相差分钟数** | `TIMESTAMPDIFF(MINUTE, start, end)` | `EXTRACT(EPOCH FROM (end - start)) / 60` | `(end - start) * 24 * 60` | `DATEDIFF(minute, start, end)` | `(julianday(end) - julianday(start)) * 24 * 60` |
| **相差秒数** | `TIMESTAMPDIFF(SECOND, start, end)` | `EXTRACT(EPOCH FROM (end - start))` | `(end - start) * 24 * 60 * 60` | `DATEDIFF(second, start, end)`

或`DATEDIFF_BIG`（大范围）

 | `(julianday(end) - julianday(start)) * 86400` |
| **相差毫秒数** | `TIMESTAMPDIFF(MICROSECOND, start, end) / 1000` | `EXTRACT(EPOCH FROM (end - start)) * 1000` | `(end - start) * 24 * 60 * 60 * 1000` | `DATEDIFF(millisecond, start, end)`

或`DATEDIFF_BIG`

 | `(julianday(end) - julianday(start)) * 86400000` |

**示例**（计算当前与1小时前差值）：

```sql
-- MySQL
SELECT TIMESTAMPDIFF(MINUTE, DATE_SUB(NOW(), INTERVAL 1 HOUR), NOW());

-- PostgreSQL
SELECT EXTRACT(EPOCH FROM (NOW() - (NOW() - INTERVAL '1 hour'))) / 60;

-- Oracle
SELECT (SYSDATE - (SYSDATE - 1/24)) * 24 * 60 FROM DUAL;

-- SQL Server
SELECT DATEDIFF(minute, DATEADD(hour, -1, GETDATE()), GETDATE());

-- SQLite
SELECT (julianday('now') - julianday(datetime('now', '-1 hour'))) * 24 * 60;
```

##### 8、生日计算（年龄、下一个生日、星座等）

| 操作目标 | MySQL | PostgreSQL | Oracle | SQL Server | SQLite |
| --- | --- | --- | --- | --- | --- |
| **计算年龄（周岁）** | `TIMESTAMPDIFF(YEAR, birth_date, CURDATE())` | `DATE_PART('year', AGE(birth_date))` | `FLOOR(MONTHS_BETWEEN(SYSDATE, birth_date) / 12)` | `DATEDIFF(YEAR, birth_date, GETDATE()) -<br>CASE WHEN DATEADD(YEAR, DATEDIFF(YEAR, birth_date, GETDATE()), birth_date) > GETDATE() THEN 1 ELSE 0 END` | `(strftime('%Y', 'now') - strftime('%Y', birth_date)) -<br>(strftime('%m-%d', 'now') < strftime('%m-%d', birth_date))` |
| **下一个生日** | `DATE_ADD(birth_date, INTERVAL IF(DATE_FORMAT(birth_date, '%m-%d') >= DATE_FORMAT(NOW(), '%m-%d'), YEAR(NOW()) - YEAR(birth_date), YEAR(NOW()) - YEAR(birth_date) + 1) YEAR)` | `CASE WHEN (birth_date + (EXTRACT(YEAR FROM AGE(birth_date)) + 1) * INTERVAL '1 year') < NOW()<br>THEN birth_date + (EXTRACT(YEAR FROM AGE(birth_date)) + 1) * INTERVAL '1 year'<br>ELSE birth_date + EXTRACT(YEAR FROM AGE(birth_date)) * INTERVAL '1 year' END` | `ADD_MONTHS(birth_date, FLOOR(MONTHS_BETWEEN(SYSDATE, birth_date) / 12) * 12 + 12)`
需再判断是否已过

 | `DATEADD(YEAR, DATEDIFF(YEAR, birth_date, GETDATE()) + CASE WHEN DATEFROMPARTS(YEAR(GETDATE()), MONTH(birth_date), DAY(birth_date)) <= GETDATE() THEN 1 ELSE 0 END, birth_date)` | `date(birth_date, (strftime('%Y', 'now') - strftime('%Y', birth_date) + (strftime('%m-%d', 'now') >= strftime('%m-%d', birth_date))) || ' years')` |
| **星座（按阳历）** | `CASE WHEN DATE_FORMAT(birth_date, '%m-%d') BETWEEN '03-21' AND '04-19' THEN '白羊座' ... END` | `CASE WHEN TO_CHAR(birth_date, 'MM-DD') BETWEEN '03-21' AND '04-19' THEN '白羊座' ... END` | `CASE WHEN TO_CHAR(birth_date, 'MM-DD') BETWEEN '03-21' AND '04-19' THEN '白羊座' ... END` | `CASE WHEN FORMAT(birth_date, 'MM-dd') BETWEEN '03-21' AND '04-19' THEN N'白羊座' ... END` | `CASE WHEN strftime('%m-%d', birth_date) BETWEEN '03-21' AND '04-19' THEN '白羊座' ... END` |

**SQLite年龄计算详解**：

```sql
SELECT (strftime('%Y', 'now') - strftime('%Y', birth_date)) 
       - (strftime('%m-%d', 'now') < strftime('%m-%d', birth_date)) AS age
FROM users;
```

*   先按年相减
    
*   如果我们今年生日还没到（当前月日 < 生日月日），减1
    

**星座区间参考（阳历）**：

```
白羊座: 03-21 ~ 04-19
金牛座: 04-20 ~ 05-20
双子座: 05-21 ~ 06-21
巨蟹座: 06-22 ~ 07-22
狮子座: 07-23 ~ 08-22
处女座: 08-23 ~ 09-22
天秤座: 09-23 ~ 10-23
天蝎座: 10-24 ~ 11-22
射手座: 11-23 ~ 12-21
摩羯座: 12-22 ~ 01-19
水瓶座: 01-20 ~ 02-18
双鱼座: 02-19 ~ 03-20
```

##### 9、工作日计算（排除周末、节假日）

⚠️ **注意**：节假日我们需自定义表，以下仅处理周末（周六、周日）

| 操作目标 | MySQL | PostgreSQL | Oracle | SQL Server | SQLite |
| --- | --- | --- | --- | --- | --- |
| **两个日期间工作日数（不含周末）** | 自定义函数或递归CTE | `GENERATE_SERIES(start::date, end::date, '1 day')` + 过滤 | `CONNECT BY`生成日期 + 过滤 | `GENERATE_SERIES`（2022+）或递归CTE | 递归CTE或应用层计算 |
| **示例（PostgreSQL）** | — | SELECT COUNT(\*) FROM GENERATE\_SERIES('2025-01-01'::date, '2025-01-31'::date, '1 day') AS d WHERE EXTRACT(DOW FROM d) NOT IN (0, 6); -- 0=周日,6=周六 | SELECT COUNT(\*) FROM (   SELECT TRUNC(:start\_date) + LEVEL - 1 AS d   FROM DUAL   CONNECT BY LEVEL <= (:end\_date - :start\_date) + 1 ) WHERE TO\_CHAR(d, 'D') NOT IN ('1', '7'); -- 依赖NLS | WITH RECURSIVE dates AS (   SELECT CAST('2025-01-01' AS DATE) AS d   UNION ALL   SELECT DATEADD(day, 1, d)   FROM dates WHERE d < '2025-01-31' ) SELECT COUNT(\*) FROM dates WHERE DATEPART(WEEKDAY, d) NOT IN (1, 7); -- 1=周日,7=周六 OPTION (MAXRECURSION 0); | WITH RECURSIVE dates(d) AS (   VALUES('2025-01-01')   UNION ALL   SELECT date(d, '+1 day') FROM dates WHERE d < '2025-01-31' ) SELECT COUNT(\*) FROM dates WHERE strftime('%w', d) NOT IN ('0', '6'); -- 0=周日,6=周六 |

**我们推荐做法**：  
（1）创建`holidays`表存储法定节假日。  
（2）创建视图或函数`is_workday(date)`返回1/0。  
（3）计算时排除`is_workday = 0`的日期。

**通用逻辑（伪代码）**：

```sql
SELECT COUNT(*) 
FROM 日期序列 
WHERE 是工作日（周一到周五）AND 不在节假日表中
```

**示例**：我们计算2025年1月工作日数（排除周末）

PostgreSQL（最简洁）：

```sql
SELECT COUNT(*) AS workdays
FROM generate_series('2025-01-01'::date, '2025-01-31'::date, '1 day') AS d
WHERE EXTRACT(ISODOW FROM d) BETWEEN 1 AND 5; -- 周一到周五
```

SQLite：

```sql
WITH RECURSIVE dates(d) AS (
  VALUES('2025-01-01')
  UNION ALL
  SELECT date(d, '+1 day') FROM dates WHERE d < '2025-01-31'
)
SELECT COUNT(*) AS workdays
FROM dates
WHERE strftime('%w', d) NOT IN ('0', '6'); -- 我们排除周日和周六
```