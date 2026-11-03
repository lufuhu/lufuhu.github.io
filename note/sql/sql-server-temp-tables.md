---
title: SQL Server局部与全局临时表详解，#与##的作用域及使用差异
lastUpdated: 2026-09-24 04:00:00
---


在 SQL Server 中，临时表是处理临时数据的好帮手，分为局部（本地）临时表和全局临时表两种。局部临时表用`#`开头，就像专属小本本，只有自己能看，用完会话结束就自动清掉，适合单个会话里存中间数据。全局临时表带`##`，相当于共享记事本，所有会话都能访问，得等最后一个用的人结束才消失，适合多会话协作。它俩都存在`tempdb`里，功能不少，但用法和适用场景大不同，搞懂它们能让数据处理更顺手。下面我们一起来看看：

#### 一、SQL Server中，局部临时表的创建和使用方法

在 SQL Server 中，局部临时表（以 `#` 开头）是会话隔离的临时数据存储结构，仅对当前会话可见，会话结束后会自动删除。局部临时表是 SQL Server 中处理会话内中间数据的高效工具，合理使用可减少对永久表的 IO 压力，同时通过自动回收机制简化资源管理。实际使用中我们需根据数据量大小和访问模式选择合适的索引策略。

##### 1、创建语法

局部临时表的创建与普通表类似，只需在表名前加 `#` 符号：

```sql
-- 基本创建方式
CREATE TABLE #EmployeeTemp (
    ID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Salary DECIMAL(10,2),
    HireDate DATE
);

-- 从查询结果创建（常用）
SELECT ID, Name, Department
INTO #DeptTemp
FROM Employees
WHERE Department = 'IT';
```

**注意**：

*   表名长度建议不超过 116 字符（因系统会自动附加会话标识）
    
*   支持所有约束（主键、外键、CHECK 等）和计算列
    

##### 2、数据操作

局部临时表支持所有 DML 操作（INSERT/UPDATE/DELETE/SELECT）：

```sql
-- 插入数据
INSERT INTO #EmployeeTemp (ID, Name, Salary, HireDate)
VALUES 
(1, '张三', 8000.00, '2023-01-15'),
(2, '李四', 9500.00, '2022-05-20');

-- 查询数据
SELECT * FROM #EmployeeTemp 
WHERE Salary > 8500;

-- 更新数据
UPDATE #EmployeeTemp 
SET Salary = Salary * 1.05 
WHERE HireDate < '2023-01-01';

-- 删除数据
DELETE FROM #EmployeeTemp 
WHERE ID = 1;
```

##### 3、索引与优化

为提升查询性能，可像普通表一样创建索引：

```sql
-- 创建非聚集索引
CREATE NONCLUSTERED INDEX IX_Salary 
ON #EmployeeTemp (Salary)
INCLUDE (Name); -- 覆盖索引优化

-- 查看临时表索引
SELECT * 
FROM tempdb.sys.indexes 
WHERE object_id = OBJECT_ID('tempdb..#EmployeeTemp');
```

**实践指南**：

*   对超过 1000 行的临时表建议创建索引
    
*   避免在高频更新的临时表上创建过多索引
    

##### 4、作用域与生命周期

##### （1）会话隔离性：  
同一服务器的不同会话可创建同名局部临时表（实际存储名不同），互不干扰。

（2）**批处理边界**：  
在存储过程中创建的局部临时表，在过程执行结束后仍可在当前会话中访问：

```sql
CREATE PROCEDURE CreateTempTable
AS
BEGIN
    CREATE TABLE #ProcTemp (ID INT);
    INSERT INTO #ProcTemp VALUES (1);
END;

EXEC CreateTempTable;
SELECT * FROM #ProcTemp; -- 仍可访问
```

> ⚠️ 如果是在**动态 SQL（EXEC 或 sp\_executesql）** 中创建的局部临时表，则**不能**在外部批处理中访问，因为动态 SQL 有自己的作用域。

```sql
-- 示例：动态 SQL 创建的临时表无法在外部访问
EXEC('CREATE TABLE #DynamicTemp (ID INT);');
SELECT * FROM #DynamicTemp; -- 错误！对象名无效
```

> 💡 原因：`EXEC` 在子作用域中运行，临时表在其结束后自动销毁。

（3）**手动删除**：  
可提前用 `DROP TABLE` 删除以释放资源：

```
IF OBJECT_ID('tempdb..#EmployeeTemp') IS NOT NULL
    DROP TABLE #EmployeeTemp;
```

##### 5、特殊使用场景

（1）**嵌套批处理**：  
内层批处理创建的临时表可被外层访问：

```sql
EXEC ('CREATE TABLE #NestedTemp (Col1 INT); INSERT INTO #NestedTemp VALUES (100);');
SELECT * FROM #NestedTemp; -- 可访问
```

（2）**与表变量结合**：  
小数据集用表变量，大数据集用临时表：

*   **表变量**不生成日志、无统计信息、不重用执行计划，适合 < 100 行
    
*   **局部临时表**有统计信息、可建索引、执行计划可重用，适合 > 1K 行
    
*   **重要区别**：表变量在 **内存中优先分配**（实际仍可能写入 tempdb），而临时表始终在 tempdb
    

```sql
DECLARE @SmallData TABLE (ID INT);
INSERT INTO @SmallData VALUES (1), (2);

-- 超过100行时转换为临时表
SELECT * INTO #LargeData FROM @SmallData;

-- 表变量示例（推荐小数据）
DECLARE @UserList TABLE (ID INT PRIMARY KEY, Name NVARCHAR(50));

-- 临时表示例（推荐大数据）
CREATE TABLE #LargeData (ID INT, LogTime DATETIME);
CREATE INDEX IX_LogTime ON #LargeData (LogTime);
```

（3）**事务中的行为**：  
事务回滚只会影响临时表中的数据，不会删除表结构：

```sql
BEGIN TRAN
    INSERT INTO #EmployeeTemp VALUES (3, '王五', 7500, '2023-03-10');
    ROLLBACK;

SELECT * FROM #EmployeeTemp; -- 表结构存在，无新增数据
```

##### 6、查看与管理

通过系统视图监控临时表：

```sql
-- 查看当前会话的临时表
SELECT 
    name AS TempTableName,
    create_date AS CreateTime
FROM tempdb.sys.tables
WHERE name LIKE '#%'
  AND session_id = @@SPID; -- 当前会话ID

-- 查看临时表占用空间
SELECT 
    OBJECT_NAME(object_id) AS TempTableName,
    reserved_page_count * 8 AS ReservedKB
FROM tempdb.sys.dm_db_partition_stats
WHERE object_id = OBJECT_ID('tempdb..#EmployeeTemp');

-- 建议定期监控 tempdb 空间使用情况，避免因临时表过大导致性能下降：
-- 查看 tempdb 总体空间使用
SELECT 
    name AS FileName,
    size * 8 / 1024 AS SizeMB,
    CAST(FILEPROPERTY(name, 'SpaceUsed') AS INT) * 8 / 1024 AS UsedMB
FROM tempdb.sys.database_files;
```

#### 二、SQL Server中，全局临时表的创建和使用方法

在 SQL Server 中，全局临时表（以 `##` 开头）是一种可跨会话共享的临时数据存储结构，适用于需要在多个会话间传递中间结果的场景，但因其全局可见性和并发风险，需谨慎使用。实际场景中，我们应优先考虑永久表+权限控制或应用层缓存（如：Redis），仅在临时共享且数据生命周期短的场景下选用全局临时表。

##### 1、创建语法

全局临时表的创建与普通表类似，只需在表名前加 `##` 符号，且名称必须全局唯一（避免与其他会话的全局表冲突）：

```sql
-- 基本创建方式
CREATE TABLE ##GlobalSales (
    SaleID INT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    SaleAmount DECIMAL(12,2),
    SaleDate DATETIME DEFAULT GETDATE()
);

-- 从查询结果创建
SELECT Region, SUM(Amount) AS TotalSales
INTO ##RegionSales
FROM Sales
GROUP BY Region;
```

**关键特性**：

*   全局可见性：所有连接到 SQL Server 的会话都能访问
    
*   命名约束：同一实例中不能有两个同名全局临时表
    
*   支持完整表结构定义（约束、默认值、计算列等）
    

##### 2、数据操作与跨会话访问

全局临时表支持所有标准 DML 操作，且允许不同会话进行读写：

（1）**数据操作**

```sql
-- 会话1：插入数据
INSERT INTO ##GlobalSales (SaleID, ProductName, SaleAmount)
VALUES 
(1, '笔记本电脑', 5999.99),
(2, '无线鼠标', 129.99);

-- 会话1：查询数据
SELECT * FROM ##GlobalSales WHERE SaleAmount > 1000;
```

（2）**跨会话访问示例**

```sql
-- 会话2：读取会话1创建的全局表
SELECT ProductName, SaleAmount 
FROM ##GlobalSales 
ORDER BY SaleAmount DESC;

-- 会话2：更新数据（需注意并发控制）
UPDATE ##GlobalSales 
SET SaleAmount = SaleAmount * 1.03 
WHERE ProductName LIKE '%电脑%';
```

**注意**：多会话并发操作时需加锁控制（如：`WITH (UPDLOCK)`），避免数据不一致。

##### 3、生命周期与自动清理机制

全局临时表的生命周期与引用它的会话密切相关：

（1）**存活条件**：  
只要有一个会话保持连接并引用该表，全局临时表就会存在；  
所有引用它的会话断开连接后，SQL Server 会自动删除该表。

注：“引用”指的是“曾经创建或访问过该表”的会话，更准确的说法是：全局临时表的生命周期由创建它的会话和其他正在使用它的会话共同决定。只要至少一个会话仍然连接并持有对该表的引用（如：打开的游标、未完成的查询），表就不会被删除。即使创建会话断开，只要其他会话仍在使用（如：持有打开的事务锁、游标），表就仍存在。若所有会话都断开或不再引用，SQL Server 的 后台清理任务（每 5 分钟运行一次）才会真正删除表。

（2）**手动删除**：  
可主动删除以释放资源（需有删除权限）：

```
-- 检查是否存在并删除
IF OBJECT_ID('tempdb..##GlobalSales') IS NOT NULL
    DROP TABLE ##GlobalSales;
```

（3）**特殊场景**：  
会话创建全局表后，即使不操作表，只要会话保持连接，表就不会被删除；  
若创建表的会话断开，其他正在使用该表的会话仍可继续操作，直到这些会话也断开。

##### 4、索引与性能优化

全局临时表支持索引创建，以提升跨会话查询效率：

```sql
-- 创建非聚集索引
CREATE NONCLUSTERED INDEX IX_SaleDate 
ON ##GlobalSales (SaleDate)
INCLUDE (ProductName, SaleAmount);

-- 查看全局表的索引信息
SELECT 
    i.name AS IndexName,
    c.name AS ColumnName
FROM tempdb.sys.indexes i
JOIN tempdb.sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
JOIN tempdb.sys.columns c ON ic.object_id = c.object_id AND ic.column_id = c.column_id
WHERE i.object_id = OBJECT_ID('tempdb..##GlobalSales');
```

**优化建议**：

*   仅对高频查询的字段创建索引（避免维护成本过高）
    
*   全局表数据量不宜过大（推荐不超过 10 万行，避免 tempdb 压力）
    

##### 5、使用场景与限制

（1）**典型应用场景**  
① **跨会话数据共享**：  
例如：ETL 过程中，会话 A 抽取数据到全局表，会话 B 负责清洗，会话 C 负责加载。

② **临时报表数据**：  
生成复杂报表时，先计算中间结果到全局表，供多个用户会话查询。

③ **会话间通信**：  
不同服务进程（如：多个应用服务器实例）通过全局表传递临时参数或状态。

（2）**主要限制**  
**权限控制弱**：所有会话可见，无法针对特定用户授权；  
注：全局临时表虽不能通过 `GRANT/DENY` 控制权限，但可通过 **应用程序层控制访问逻辑**，或改用：

*   永久表 + 用户权限控制
    
*   Service Broker 实现安全的会话间通信
    
*   内存数据库（如 In-Memory OLTP）临时结构
    

**并发风险高**：多会话读写易产生锁冲突，需额外控制；  
**依赖 tempdb**：全局表存储在 tempdb 中，若 tempdb 故障会直接影响其可用性；  
**命名冲突**：同名表无法创建，需在程序中设计动态命名规则（如：加时间戳）。

##### 6、监控与管理

通过系统视图监控全局临时表的状态：

```sql
-- 查看所有全局临时表
SELECT 
    name AS GlobalTempName,
    create_date AS CreateTime,
    modify_date AS LastModifyTime
FROM tempdb.sys.tables
WHERE name LIKE '##%';

-- 查看引用全局表的会话
SELECT 
    t.name AS TempTableName,
    s.session_id,
    s.host_name,
    s.program_name
FROM tempdb.sys.tables t
JOIN sys.dm_exec_sessions s ON t.create_date <= s.login_time
WHERE t.name LIKE '##%';
```

注：仅通过 `create_date <= login_time` 判断“引用”会话，**可能误判**，因为很多会话的登录时间早于表创建时间。此处只是示例。目前 SQL Server 无直接系统视图可精确追踪哪些会话正在引用全局临时表。可通过以下方式间接监控：

*   查询 `sys.dm_exec_requests` 和 `sys.dm_exec_sql_text` 查看当前执行语句中是否包含表名
    
*   使用 SQL Server Profiler 或 Extended Events 捕获相关操作”
    

##### 7、实践指南

（1）**命名规范**：  
使用前缀+业务标识+时间戳的命名方式，如：`##RegionSales_20240815_1430`，避免冲突。

推荐使用 `NEWID()` 或 `SESSION_ID()` + 时间戳 避免冲突：

```sql
DECLARE @TableName NVARCHAR(128) = '##Temp_' + REPLACE(CONVERT(VARCHAR(36), NEWID()), '-', '_');
EXEC('CREATE TABLE ' + @TableName + ' (ID INT)');
```

> 💡 这样可确保命名唯一性，尤其适用于并发高或自动化调度场景。

（2）**使用前检查**：  
创建前先检查是否存在，存在则删除或复用：

```sql
IF OBJECT_ID('tempdb..##RegionSales') IS NOT NULL
    TRUNCATE TABLE ##RegionSales -- 复用表结构
ELSE
    CREATE TABLE ##RegionSales (...) -- 新建表
```

（3）**及时清理**：  
在程序逻辑中显式删除不再使用的全局表，而非依赖自动清理：

```
-- 处理完成后删除
DROP TABLE IF EXISTS ##RegionSales;
```

（4）**避免事务长时间占用**：  
对全局表的操作尽量缩短事务时长，减少锁争用：

```sql
BEGIN TRAN
    -- 仅包含必要操作
    INSERT INTO ##RegionSales (...) VALUES (...);
COMMIT TRAN; -- 快速提交
```

#### 三、对比SQL Server中全局临时表和局部临时表的异同

SQL Server 中的全局临时表（`##`）和局部临时表（`#`）均用于临时数据存储，但在作用域、生命周期和使用场景上有显著差异。

##### **1、核心特性对比**

| **特性** | **局部临时表（#）** | **全局临时表（##）** |
| --- | --- | --- |
| **作用域** | 仅当前会话可见（会话隔离） | 所有会话可见（全局共享） |
| **命名冲突** | 不同会话可创建同名表（系统自动附加会话标识） | 全实例唯一，同名表无法创建 |
| **生命周期** | 会话结束后自动删除 | 所有引用会话断开后自动删除 |
| **存储位置** | 均存储在 `tempdb` 系统数据库中 | 均存储在 `tempdb` 系统数据库中 |
| **权限控制** | 仅创建者可访问 | 所有会话均可访问，无精细化权限控制 |
| **适用场景** | 会话内中间数据处理（如：ETL 清洗、分页查询） | 跨会话数据共享（如：多进程协作、临时报表） |

##### **2、关键行为差异**

（1）**可见性与访问控制**  
① **局部临时表**：  
仅创建它的会话（或会话内的嵌套批处理、存储过程）可访问，其他会话即使知道表名也无法读取。  
示例：

```sql
-- 会话1创建局部表
CREATE TABLE #LocalTemp (ID INT);

-- 会话2尝试访问（失败）
SELECT * FROM #LocalTemp; -- 报错：对象名 '#LocalTemp' 无效
```

② **全局临时表**：  
所有连接到 SQL Server 的会话均可访问，只要表存在。  
示例：

```sql
-- 会话1创建全局表
CREATE TABLE ##GlobalTemp (ID INT);

-- 会话2可直接访问（成功）
INSERT INTO ##GlobalTemp VALUES (100);
SELECT * FROM ##GlobalTemp; -- 结果：100
```

（2）**生命周期管理**  
① **局部临时表**：

*   会话断开连接后自动删除。
    
*   若在存储过程中创建，过程执行结束后仍可在当前会话中访问（除非手动删除）。
    

② **全局临时表**：

*   需满足“所有引用它的会话均断开连接”才会删除。
    
*   即使创建表的会话断开，只要其他会话仍在使用，表就会保留。
    

示例：

```sql
-- 会话1创建全局表并插入数据
CREATE TABLE ##Test (Col INT);
INSERT INTO ##Test VALUES (1);

-- 会话1断开连接（此时会话2仍在访问）
-- 会话2继续操作（仍可访问）
SELECT * FROM ##Test; -- 结果：1

-- 会话2也断开连接后，##Test 自动删除
```

（3）**命名与存储细节**  
① **局部临时表**：  
实际存储在 `tempdb` 中的名称会被系统修改，格式为 `#表名______会话ID`（如：`#LocalTemp______123`），因此不同会话可创建同名表而不冲突。

② **全局临时表**：  
存储名称与创建时一致（如：`##GlobalTemp`），因此全实例中必须唯一，否则创建时会报错：

```sql
-- 会话1已创建 ##GlobalTemp 后
-- 会话2再次创建（失败）
CREATE TABLE ##GlobalTemp (ID INT); -- 报错：已有同名对象
```

##### **3、相同点**

(1)**存储基础**：  
均存储在 `tempdb` 中，依赖 `tempdb` 的配置（如：文件大小、增长策略），性能受 `tempdb` 性能影响。

(2)**功能支持**：  
均支持完整的表功能，包括约束（主键、外键等）、索引、触发器和 DML 操作（INSERT/UPDATE/DELETE）。

(3)**自动回收**：  
无需手动删除即可自动清理（局部表随会话结束，全局表随最后一个引用会话结束），避免永久占用资源。

(4)**统计信息**：  
SQL Server 会自动为两者创建统计信息，优化查询计划，也支持手动创建索引提升性能。

##### **4、使用场景选择建议**

| **场景** | 推荐使用 | 原因分析 |
| --- | --- | --- |
| 单会话内的中间数据处理 | 局部临时表（#） | 会话隔离，避免命名冲突，资源回收简单 |
| 多会话协作共享临时数据 | 全局临时表（##） | 跨会话可见，适合多进程数据传递 |
| 高频并发、数据量小的场景 | 局部临时表（#） | 无并发冲突风险，性能更稳定 |
| 临时报表、多用户查询中间结果 | 全局临时表（##） | 一次计算，多会话复用，减少重复计算开销 |
| 需严格权限控制的临时数据 | 局部临时表（#） | 全局表无权限控制，易引发数据安全问题 |

##### **总结**:

**局部临时表**是“会话私有”的临时存储，适合独立会话内的中间数据处理，安全且无并发风险。  
**全局临时表**是“全实例共享”的临时存储，适合跨会话数据协作，但需注意命名冲突和并发控制。

实际使用中，我们应优先选择局部临时表，仅在确需跨会话共享时使用全局临时表，并严格遵循命名规范和清理机制，避免 `tempdb` 资源耗尽或数据冲突。