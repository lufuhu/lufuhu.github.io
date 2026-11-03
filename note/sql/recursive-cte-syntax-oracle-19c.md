---
title: 递归CTE语法详解与树形层级查询，Oracle 19c示例验证
lastUpdated: 2026-10-11 04:00:00
---


递归CTE就像搭积木：先放好第一块（初始状态），再按固定规则一块接一块往上搭（递推），直到拼出完整结构。递归CTE把复杂问题拆成“起点”和“规则”两部分，一步一步，自动展开，逻辑清晰又自然，与我们高中学的数学归纳法的思路差不多。下面，我们以Oracle 19c为验证示例，详细拆解递归CTE语法。仅供参考。

#### 一、递归CTE语法详解

Oracle从11gR2版本起，正式支持**递归公用表表达式（Recursive Common Table Expression, Recursive CTE）**。作为**SQL:1999标准**的一部分，递归CTE为处理**层级结构数据**（如：组织架构、商品分类、目录树）和**迭代计算**（如：生成日期序列、累加求和）提供了强大而标准的语法支持。  

在Oracle 19c中，递归CTE的实现完全遵循SQL标准，语法清晰、逻辑严谨，且性能优异。与Oracle 11g及更早版本依赖的`CONNECT BY`语法相比，递归CTE具有更强的**可读性**、**灵活性**和**跨数据库兼容性**。递归CTE不仅适用于Oracle，也广泛兼容PostgreSQL、SQL Server、MySQL 8.0+、DB2等现代数据库系统。

##### 1、递归CTE标准语法结构

递归CTE的完整语法结构如下：

```sql
WITH RECURSIVE cte_name (column1, column2, ..., level_column) AS (
    -- 锚点成员（Anchor Member）：定义递归的起点，仅执行一次
    SELECT 
        initial_value1 AS column1,
        initial_value2 AS column2,
        ...,
        1 AS level_column  -- 可选：手动定义层级深度，根节点为1
    FROM source_table
    WHERE anchor_condition  -- 定位根节点的条件，如：parent_id IS NULL

    UNION ALL

    -- 递归成员（Recursive Member）：引用自身CTE，重复执行直到无新行
    SELECT 
        child_table.column1,
        child_table.column2,
        ...,
        cte_name.level_column + 1 AS level_column  -- 层级+1
    FROM source_table child_table
    INNER JOIN cte_name  -- 自连接：将子节点与上一轮结果关联
        ON child_table.parent_id = cte_name.id  -- 父子关系映射
    WHERE cte_name.level_column < max_depth  -- 可选：防止无限递归
)
-- 最终查询：使用递归CTE的结果
SELECT * FROM cte_name
ORDER BY level_column, id;
```

我们要**注意**：`RECURSIVE`是SQL标准（如：PostgreSQL、SQL Server、MySQL 8.0+）的语法。Oracle从11gR2开始支持递归CTE，但语法是“`WITH`\+ 递归结构”，**不需要也不允许写`RECURSIVE`关键字**。我们在Oracle 19c中执行带`RECURSIVE`关键字的递归CTE会报错：

```sql
ORA-00900: invalid SQL statement
或
ORA-00928: missing SELECT keyword
```

Oracle会自动识别包含`UNION ALL`，且右侧引用了CTE名称的表达式为递归CTE。Oracle对递归CTE的解析非常严格：**必须使用**`UNION ALL`，不能使用`UNION`、`INTERSECT`或`EXCEPT`。这是因为`UNION`会隐式去重，可能意外丢弃有效递归路径，导致结果不完整，甚至逻辑错误。

##### 2、语法元素解析

| 语法元素 | 说明 |
| --- | --- |
| `WITH RECURSIVE` | 声明递归CTE的关键字。Oracle不需要也不允许写`RECURSIVE`关键字 |
| `cte_name (col1, col2, ...)` | 定义CTE的名称及列名列表。列数和类型必须与锚点和递归成员一致。如果没有显式声明列名，则需要在SELECT中使用别名保证一致性。 |
| 锚点成员（Anchor Member） | 查询递归的“起点”，如根节点（`parent_id IS NULL`）。仅执行一次，结果作为第一轮数据。可包含多个锚点（如：`WHERE dept_id IN (1,2)`），实现多根并行递归。 |
| 递归成员（Recursive Member） | 通过`INNER JOIN`引用CTE自身，查询“子节点”。每轮使用上一轮结果作为输入，重复执行直到无新行。不能包含聚合函数、窗口函数、DISTINCT、GROUP BY等破坏行粒度的操作。 |
| `UNION ALL` | 必须使用`UNION ALL`，不能使用`UNION`。因为`UNION`会去重，破坏递归逻辑。Oracle会在解析阶段校验此规则。 |
| `level_column` | 手动维护的层级深度字段（可选但推荐），用于控制递归深度或排序。通常从1开始，每轮+1。也可用于计算路径长度、迭代次数等。 |
| `WHERE cte_name.level_column < N` | 递归终止条件，防止因数据循环引用导致死循环。Oracle默认最大递归深度为100（可通过`_recursive_with_max_iterations`隐藏参数调整，但我们不建议）。 |
| 最终`SELECT` | 对递归结果进行筛选、排序或聚合。可在最终查询中使用窗口函数、GROUP BY等高级操作。 |

##### 3、递归CTE的语义约束与限制

Oracle对递归CTE施加了严格的语义约束，以保证执行的确定性和安全性：

1.  **单递归引用**：递归成员中，只能引用一次CTE自身，且必须出现在`FROM`子句中（通常通过`JOIN`）。
    
2.  **无聚合/窗口函数**：递归成员中，禁止使用`GROUP BY`、`HAVING`、`DISTINCT`、`ROW_NUMBER()`等操作，因为这些会改变行的粒度。
    
3.  **无子查询引用CTE**：不能在子查询中，引用递归CTE（如：`WHERE id IN (SELECT id FROM cte_name)`）。我们说**准确**一点：递归成员的约束应为“不能在子查询中引用CTE自身”，如果子查询仅涉及普通表（非CTE自身），则完全允许。
    
4.  **列类型一致性**：锚点与递归成员的对应列，必须具有兼容的数据类型。Oracle会进行隐式转换，但我们**建议**显式CAST以避免意外。
    
5.  **最大深度限制**：默认最多递归100层，超过将抛出`ORA-32044: cycle detected while executing recursive WITH query`或类似错误。
    

这些限制看似严格，实则保障了递归逻辑的清晰性和执行效率。我们应将复杂逻辑移至最终`SELECT`中处理。

虽然**SQL标准（SQL:1999及后续）定义了递归CTE的基本结构**，但不同数据库在**语法细节、关键字支持、默认行为、递归限制**等方面存在差异。我们一起看**对比**：

**共同点（标准部分）**：大多数现代关系型数据库（如：PostgreSQL、SQL Server、Oracle、IBM Db2、SQLite 3.8.3+、MySQL 8.0+），都支持递归CTE，且基本结构一致。

```sql
WITH RECURSIVE cte AS (
    -- 锚点（Anchor）
    SELECT ...
    UNION ALL
    -- 递归部分（Recursive）
    SELECT ... FROM ... JOIN cte ...
)
SELECT * FROM cte;
```

*   使用`UNION ALL`连接锚点和递归成员（`UNION`会去重，通常不用于递归）。
    
*   递归成员必须引用自身CTE名。
    
*   通过自连接实现层级展开（如：父子关系）。
    

**主要差异**：

| 数据库 | 是否需要`RECURSIVE`关键字 | 递归限制机制 | 特殊说明 |
| --- | --- | --- | --- |
| PostgreSQL | 必须写`WITH RECURSIVE` | 可用`max_depth`或`WHERE`控制；默认无硬限制（但受`max_stack_depth`等影响） | 支持`SEARCH`/`CYCLE`子句（SQL:2016）检测环路 |
| SQL Server | 不需要`RECURSIVE`（直接`WITH cte AS (...)`） | 使用`OPTION (MAXRECURSION n)`（默认100层） | 不支持`SEARCH`/`CYCLE`，需要手动防环 |
| Oracle | 不需要`RECURSIVE` | 使用`CONNECT BY`更常见，但也支持标准递归CTE；可用`NOCYCLE`防环 | 传统用`START WITH ... CONNECT BY`处理层次查询 |
| MySQL 8.0+ | 不需要`RECURSIVE`（但写了也不报错） | 默认最大递归深度为1000（由`cte_max_recursion_depth`系统变量控制） | 不支持`SEARCH`/`CYCLE` |
| SQLite | 推荐写`WITH RECURSIVE`（也可省略） | 默认最大递归1000次（可通过`PRAGMA recursive_triggers`等间接影响） | 简单场景支持良好 |
| BigQuery | 不需要`RECURSIVE` | 最多50层递归 | 支持但限制较严 |

**注意事项**：

1.  **`RECURSIVE`关键字不是通用的**：PostgreSQL要求显式写；其他多数数据库（如：SQL Server、MySQL），即使不写也能识别递归（只要结构符合）。
    
2.  **防无限递归，必须手动处理**：除PostgreSQL（可用`CYCLE`）等少数支持自动环路检测外，大多数数据库需要靠`level < N`或业务逻辑避免死循环。
    
3.  **`UNION ALL`是必须的**：用`UNION`会导致去重，可能中断递归链（因为重复行被过滤），通常不适用。
    
4.  **性能与优化差异大**：有些数据库对深层递归效率较低，我们建议结合索引（如：`parent_id`上建索引）。
    

#### 二、实战示例一：组织架构层级查询（部门树）

##### 1、创建模拟数据表

为真实模拟企业组织架构，我们设计了一个包含主键、外键、业务字段和默认值的完整表结构：

```sql
-- 创建部门表：dept
CREATE TABLE dept (
    dept_id          NUMBER PRIMARY KEY,      -- 部门ID，主键
    dept_name        VARCHAR2(100) NOT NULL,  -- 部门名称
    parent_dept_id   NUMBER,                  -- 父部门ID，根节点为NULL
    dept_manager     VARCHAR2(50) NOT NULL,   -- 部门经理
    created_date     DATE DEFAULT SYSDATE,    -- 创建时间
    dept_status      VARCHAR2(10) DEFAULT 'ACTIVE' CHECK (dept_status IN ('ACTIVE', 'INACTIVE'))
);

-- 添加外键约束（可选，增强数据完整性）
ALTER TABLE dept 
ADD CONSTRAINT fk_parent_dept 
FOREIGN KEY (parent_dept_id) REFERENCES dept(dept_id)
ON DELETE CASCADE;  -- 级联删除：删除父部门时自动删除子部门

-- 创建索引以优化递归查询性能
CREATE INDEX idx_dept_parent ON dept(parent_dept_id);
```

*   `dept_status`字段用于模拟部门状态，可在递归中加入`AND dept_status = 'ACTIVE'`，以实现“仅查询有效部门”。
    
*   外键约束保证数据完整性，避免孤儿节点。
    
*   索引`idx_dept_parent`是递归查询的关键优化点，可将`O(n)`查找优化为`O(log n)`。
    

##### 2、插入模拟数据

我们插入10条具有真实业务含义的模拟数据，构建4层部门树：

```sql
-- 插入10条模拟数据，构建4层部门树
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (1, '总部', NULL, '张三');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (2, '技术部', 1, '李四');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (3, '人事部', 1, '王五');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (4, '财务部', 1, '赵六');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (5, '前端开发组', 2, '孙七');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (6, '后端开发组', 2, '周八');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (7, '测试组', 2, '吴九');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (8, '招聘组', 3, '郑十');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (9, '薪酬组', 3, '钱十一');
INSERT INTO dept (dept_id, dept_name, parent_dept_id, dept_manager) VALUES (10, '前端架构组', 5, '冯十二');

COMMIT;
```

**数据层级结构可视化**：

```
总部（1）
├─ 技术部（2）
│  ├─ 前端开发组（5）
│  │  └─ 前端架构组（10）
│  ├─ 后端开发组（6）
│  └─ 测试组（7）
├─ 人事部（3）
│  ├─ 招聘组（8）
│  └─ 薪酬组（9）
└─ 财务部（4）
```

该结构覆盖了典型的企业架构：单根、多分支、深度不均（技术部4层，财务部2层），非常适合测试递归逻辑的健壮性。

##### 3、递归CTE查询代码

```sql
-- 使用递归CTE查询部门层级结构
WITH RECURSIVE dept_hierarchy (
    dept_id,           -- 部门ID
    dept_name,         -- 部门名称
    parent_dept_id,    -- 父部门ID
    dept_manager,      -- 部门经理
    dept_level,        -- 部门层级（1=根）
    dept_path          -- 部门路径（如："总部→技术部"）
) AS (
    -- 锚点成员：查询根节点（parent_dept_id IS NULL）
    SELECT 
        dept_id,
        dept_name,
        parent_dept_id,
        dept_manager,
        1 AS dept_level,                     -- 根节点层级为1
        dept_name AS dept_path               -- 初始路径 = 部门名称
    FROM dept
    WHERE parent_dept_id IS NULL             -- 定位总部
      AND dept_status = 'ACTIVE'             -- 仅查询有效部门

    UNION ALL

    -- 递归成员：查询子部门
    SELECT 
        d.dept_id,                           -- 当前子部门ID
        d.dept_name,                         -- 当前子部门名称
        d.parent_dept_id,                    -- 当前子部门的父ID
        d.dept_manager,                      -- 当前子部门经理
        dh.dept_level + 1 AS dept_level,     -- 层级 = 上一层级 + 1
        dh.dept_path || '→' || d.dept_name   -- 路径拼接：父路径 + "→" + 当前名称
    FROM dept d
    INNER JOIN dept_hierarchy dh            -- 自连接：引用CTE自身
        ON d.parent_dept_id = dh.dept_id    -- 子部门的父ID = 上一轮的部门ID
    WHERE dh.dept_level < 10                -- 递归终止条件：最大10层（防死循环）
      AND d.dept_status = 'ACTIVE'          -- 仅查询有效子部门
)

-- 最终查询：输出完整层级结构
SELECT 
    dept_id,
    LPAD(' ', (dept_level - 1) * 4, ' ') || dept_name AS formatted_name,  -- 缩进显示层级
    dept_manager,
    dept_level,
    dept_path,
    -- 计算每个部门的直接子部门数量（需要额外JOIN）
    (SELECT COUNT(*) FROM dept d2 WHERE d2.parent_dept_id = dept_hierarchy.dept_id) AS child_count
FROM dept_hierarchy
ORDER BY dept_path;  -- 按路径排序，保证树形顺序
```

*   加入`dept_status = 'ACTIVE'`过滤，模拟真实业务场景。
    
*   在最终查询中，通过子查询计算`child_count`，展示如何在递归后补充聚合信息？
    
*   使用`LPAD`实现可视化缩进，每层4空格，清晰呈现树形结构。
    

我们特别要**注意**：因为考虑兼容，以上代码是含有`RECURSIVE`关键字的。如果你和我们一样，是在Oracle（19c）中模拟执行的，以上查询代码，只需删除`RECURSIVE`关键字即可模拟执行（下同），其余逻辑不变！我们要**记住**：“Oracle递归CTE语法 =`WITH`\+ 递归结构，不要写`RECURSIVE`！”

另外，我们还有两点**建议**：

1.  防止循环引用（生产环境，我们建议加）
    

Oracle支持`CYCLE`子句自动检测循环：

```sql
WITH dept_hierarchy (..., cycle_flag) AS (
    ...
)
CYCLE dept_id SET cycle_flag TO 'Y' DEFAULT 'N'
SELECT * FROM dept_hierarchy WHERE cycle_flag = 'N';
```

2.  控制遍历顺序（可选）
    

如果希望严格按深度优先（DFS）或广度优先（BFS）输出，我们可用：

```
SEARCH DEPTH FIRST BY dept_id SET order_col
-- 或
SEARCH BREADTH FIRST BY dept_id SET order_col
```

然后`ORDER BY order_col`。

##### 4、执行过程解析（逐轮详解）

递归CTE的执行是一个迭代过程，Oracle内部使用“工作表（Work Table）”机制管理中间结果：

1.  **第1轮（锚点执行）**：
    

*   执行`WHERE parent_dept_id IS NULL AND dept_status = 'ACTIVE'`
    
*   返回`dept_id=1`（总部）
    
*   **结果集**：`(1, '总部', NULL, '张三', 1, '总部')`
    
*   **工作表**：同上（用于下一轮输入）
    

3.  **第2轮（递归1）**：
    

*   用工作表中的`dept_id=1`关联`parent_dept_id=1`的子部门
    
*   返回`dept_id=2,3,4`（技术部、人事部、财务部）
    
*   **结果集追加**：3条新记录
    
*   **新工作表**：这3条记录
    

5.  **第3轮（递归2）**：
    

*   `dept_id=2`→ 5,6,7
    
*   `dept_id=3`→ 8,9
    
*   `dept_id=4`→ 无
    

*   用工作表中的`dept_id=2,3,4`分别关联子部门：
    
*   返回5条二级部门
    
*   **结果集追加**：5条
    
*   **新工作表**：这5条
    

8.  **第4轮（递归3）**：
    

*   `dept_id=5`→ 10
    
*   其余 → 无
    

*   用工作表中的`dept_id=5,6,7,8,9`关联子部门：
    
*   返回1条三级部门（前端架构组）
    
*   **结果集追加**：1条
    
*   **新工作表**：这1条
    

11.  **第5轮（递归4）**：
     

*   用`dept_id=10`关联子部门：无
    
*   递归成员返回空集
    
*   **终止条件满足**，递归结束
    

**总计执行5轮，返回10条记录**，与插入数据一致。

##### 5、结果输出与解读

| DEPT\_ID | FORMATTED\_NAME | DEPT\_MANAGER | DEPT\_LEVEL | DEPT\_PATH | CHILD\_COUNT |
| --- | --- | --- | --- | --- | --- |
| 1 | 总部 | 张三 | 1 | 总部 | 3 |
| 2 | 技术部 | 李四 | 2 | 总部→技术部 | 3 |
| 5 | 前端开发组 | 孙七 | 3 | 总部→技术部→前端开发组 | 1 |
| 10 | 前端架构组 | 冯十二 | 4 | 总部→技术部→前端开发组→前端架构组 | 0 |
| 6 | 后端开发组 | 周八 | 3 | 总部→技术部→后端开发组 | 0 |
| 7 | 测试组 | 吴九 | 3 | 总部→技术部→测试组 | 0 |
| 3 | 人事部 | 王五 | 2 | 总部→人事部 | 2 |
| 8 | 招聘组 | 郑十 | 3 | 总部→人事部→招聘组 | 0 |
| 9 | 薪酬组 | 钱十一 | 3 | 总部→人事部→薪酬组 | 0 |
| 4 | 财务部 | 赵六 | 2 | 总部→财务部 | 0 |

*   `dept_path`可用于权限系统中的路径匹配（如：“用户属于总部→技术部”）。
    
*   `dept_level`可用于限制审批层级（如：“报销需要3级以上审批”）。
    
*   `child_count`可用于前端树形控件的展开/折叠逻辑。
    

再啰嗦一下：上面查询代码，我们使用了`ORDER BY dept_path`，而`dept_path`是字符串，排序是按字典序（lexicographical order）进行的，不是按树的深度优先遍历（DFS）或广度优先遍历（BFS）逻辑。`dept_path`值如下：

```
总部
总部→人事部
总部→人事部→招聘组
总部→人事部→薪酬组
总部→技术部
总部→技术部→前端开发组
总部→技术部→前端开发组→前端架构组
总部→技术部→后端开发组
总部→技术部→测试组
总部→财务部
```

所以，我们的模拟执行结果，看起来“按部门名称的字母/拼音”顺序，与上面的输出结果顺序不同。那么，如何实现预期的“树形顺序”？常见的树形展示顺序有两种：

| 类型 | 说明 | Oracle实现方式 |
| --- | --- | --- |
| **深度优先（DFS）** | 先遍历完一个分支（如：总部 → 技术部 → 前端 → 前端架构），再回溯 | 使用`SEARCH DEPTH FIRST BY dept_id SET order_col` |
| **广度优先（BFS）** | 按层级展开（总部 → 技术/人事/财务 → 各子组） | 使用`SEARCH BREADTH FIRST BY dept_id SET order_col` |

如果我们需要稳定、可重现的树形顺序，应该用`SEARCH DEPTH FIRST BY (parent_dept_id, dept_id)`或`BY dept_name`。我们的**推荐做法**是：在BOM或部门表中增加`sort_order`字段，用于控制同级节点的展示顺序。

示例：深度优先 + 按`dept_id`排序（稳定可重现）

```sql
WITH dept_hierarchy (
    dept_id, dept_name, parent_dept_id, dept_manager, dept_level, dept_path
) AS (
    SELECT 
        dept_id, dept_name, parent_dept_id, dept_manager,
        1 AS dept_level,
        dept_name AS dept_path
    FROM dept
    WHERE parent_dept_id IS NULL AND dept_status = 'ACTIVE'

    UNION ALL

    SELECT 
        d.dept_id, d.dept_name, d.parent_dept_id, d.dept_manager,
        dh.dept_level + 1,
        dh.dept_path || '→' || d.dept_name
    FROM dept d
    INNER JOIN dept_hierarchy dh ON d.parent_dept_id = dh.dept_id
    WHERE dh.dept_level < 10 AND d.dept_status = 'ACTIVE'
)
SEARCH DEPTH FIRST BY dept_id SET sort_order  -- ← 关键：定义遍历顺序
SELECT 
    dept_id,
    LPAD(' ', (dept_level - 1) * 4, ' ') || dept_name AS formatted_name,
    dept_manager,
    dept_level,
    dept_path,
    (SELECT COUNT(*) FROM dept d2 WHERE d2.parent_dept_id = dept_hierarchy.dept_id) AS child_count
FROM dept_hierarchy
ORDER BY sort_order;  -- ← 按遍历序输出
```

![](/images/c3d24a1fa42d2b31833ca9481bbf978e.png)

#### 三、实战示例二：生成连续日期序列

##### 1、场景需求

在报表开发、数据仓库ETL、日历应用中，我们经常需要生成连续日期序列。生成**细节**：生成**2024年10月1日至2024年10月31日**的连续日期；包含：日期、格式化字符串、星期几（中文）、是否为周末、当月第几天、季度信息等。传统方法是依赖日历表或程序循环，而递归CTE为我们提供了纯SQL解法。

##### 2、递归CTE实现

```sql
-- 生成2024年10月的连续日期序列
WITH RECURSIVE date_series (
    current_date,      -- 当前日期
    day_of_month,      -- 当月第几天
    day_of_week_num,   -- 星期几数字（1=周日, 2=周一, ..., 7=周六）
    is_weekend,        -- 是否为周末（Y/N）
    quarter,           -- 所属季度
    month_name         -- 月份名称
) AS (
    -- 锚点成员：起始日期
    SELECT 
        DATE '2024-10-01' AS current_date,           -- Oracle日期字面量
        EXTRACT(DAY FROM DATE '2024-10-01') AS day_of_month,
        TO_CHAR(DATE '2024-10-01', 'D') AS day_of_week_num,  -- 'D'返回1-7
        CASE 
            WHEN TO_CHAR(DATE '2024-10-01', 'D') IN ('1', '7') THEN 'Y'
            ELSE 'N'
        END AS is_weekend,
        TO_CHAR(DATE '2024-10-01', 'Q') AS quarter,
        TO_CHAR(DATE '2024-10-01', 'Month') AS month_name
    FROM dual  -- Oracle虚拟表

    UNION ALL

    -- 递归成员：日期+1
    SELECT 
        ds.current_date + INTERVAL '1' DAY AS current_date,  -- 显式使用INTERVAL更安全
        EXTRACT(DAY FROM ds.current_date + 1) AS day_of_month,
        TO_CHAR(ds.current_date + 1, 'D') AS day_of_week_num,
        CASE 
            WHEN TO_CHAR(ds.current_date + 1, 'D') IN ('1', '7') THEN 'Y'
            ELSE 'N'
        END AS is_weekend,
        TO_CHAR(ds.current_date + 1, 'Q') AS quarter,
        TO_CHAR(ds.current_date + 1, 'Month') AS month_name
    FROM date_series ds
    WHERE ds.current_date < DATE '2024-10-31'        -- 终止条件：小于结束日期
)

-- 最终查询：格式化输出
SELECT 
    current_date AS "日期",
    TO_CHAR(current_date, 'YYYY-MM-DD') AS "格式化日期",
    TO_CHAR(current_date, 'YYYY"年"MM"月"DD"日"') AS "中文日期",
    CASE day_of_week_num
        WHEN '1' THEN '星期日'
        WHEN '2' THEN '星期一'
        WHEN '3' THEN '星期二'
        WHEN '4' THEN '星期三'
        WHEN '5' THEN '星期四'
        WHEN '6' THEN '星期五'
        WHEN '7' THEN '星期六'
    END AS "星期几",
    is_weekend AS "是否周末",
    day_of_month AS "当月第几天",
    quarter AS "季度",
    month_name AS "月份名称",
    -- 计算距离月末的天数
    LAST_DAY(current_date) - current_date AS "距月末天数"
FROM date_series
ORDER BY current_date;
```

*   `INTERVAL '1' DAY`与`DATE +1`均为Oracle支持的日期累加方式，前者语义更直观，后者写法更简洁。二者之间没有优劣区别，我们可根据代码风格选择。
    
*   在最终查询中使用`LAST_DAY()`计算距月末天数，展示递归后计算能力。
    
*   包含中文日期格式，满足本地化需求。
    

我们再详细**说明**一下：`TO_CHAR(date, 'D')`的返回值，它依赖于`NLS_TERRITORY`设置。在某些区域（如：美国），1=Sunday；在其他区域（如：德国），1=Monday。这会导致`is_weekend`判断错误，例如：在`NLS_TERRITORY='GERMANY'`时，'1' 是周一，不是周末。

**修正**：

我们使用“区域无关”的方式判断周末：

```
CASE 
  WHEN TRIM(TO_CHAR(current_date, 'Day', 'NLS_DATE_LANGUAGE=AMERICAN')) 
       IN ('Saturday', 'Sunday') 
  THEN 'Y' ELSE 'N'
END
```

或使用`MOD(current_date - DATE '1970-01-04', 7)`等数学方法。

##### 3、执行过程解析

1.  **锚点**：生成`2024-10-01`。
    
2.  **递归1**：`2024-10-01 + 1 = 2024-10-02`
    
3.  **递归2**：`2024-10-02 + 1 = 2024-10-03`
    
4.  ...
    
5.  **递归30**：`2024-10-30 + 1 = 2024-10-31`
    
6.  **递归31**：尝试生成`2024-11-01`，但`WHERE`条件`current_date < '2024-10-31'`不满足，终止。
    

共执行31轮，生成31条记录，覆盖整月。

##### 4、部分结果输出

| 日期 | 格式化日期 | 中文日期 | 星期几 | 是否周末 | 当月第几天 | 季度 | 月份名称 | 距月末天数 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2024-10-01 | 2024-10-01 | 2024年10月01日 | 星期二 | N | 1 | 4 | 十月 | 30 |
| 2024-10-02 | 2024-10-02 | 2024年10月02日 | 星期三 | N | 2 | 4 | 十月 | 29 |
| 2024-10-03 | 2024-10-03 | 2024年10月03日 | 星期四 | N | 3 | 4 | 十月 | 28 |
| 2024-10-04 | 2024-10-04 | 2024年10月04日 | 星期五 | N | 4 | 4 | 十月 | 27 |
| 2024-10-05 | 2024-10-05 | 2024年10月05日 | 星期六 | Y | 5 | 4 | 十月 | 26 |
| 2024-10-06 | 2024-10-06 | 2024年10月06日 | 星期日 | Y | 6 | 4 | 十月 | 25 |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |
| 2024-10-31 | 2024-10-31 | 2024年10月31日 | 星期四 | N | 31 | 4 | 十月 | 0 |

**应用场景**：作为日历表的基础数据；用于填充缺失日期的报表（`LEFT JOIN`业务表）；计算工作日、节假日等衍生字段。

#### 四、实战示例三：带循环引用检测的安全递归

##### 1、问题背景

在真实系统中，由于数据录入错误或业务逻辑缺陷，**循环引用**（如：A→B→C→A）时有发生。如果我们不加处理，递归CTE会陷入死循环，直至达到最大深度报错，严重影响系统稳定性。Oracle的`CONNECT BY`语法提供`NOCYCLE`关键字自动检测循环，但递归CTE需要**手动实现循环检测**。我们的常用方法是维护一个**访问路径（Path）**，在每次递归前，检查当前节点是否已在路径中。

##### 2、创建含循环引用的模拟数据

```sql
-- 创建测试表
CREATE TABLE cyclic_dept (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(50),
    parent_id NUMBER
);

-- 正常数据
INSERT INTO cyclic_dept VALUES (1, 'A', NULL);
INSERT INTO cyclic_dept VALUES (2, 'B', 1);
INSERT INTO cyclic_dept VALUES (3, 'C', 2);

-- 制造循环引用：C → A（形成A←C←B←A的环）
UPDATE cyclic_dept SET parent_id = 1 WHERE id = 3;  -- 现在 C.parent_id = 1 (A)

COMMIT;
```

**数据关系图**：

```
A (id=1, parent=NULL)
↑               ↓
C (id=3) ← B (id=2)
```

这是一个典型的3节点循环。

##### 3、安全递归CTE（路径检测，防止循环）

```sql
WITH RECURSIVE safe_hierarchy (
    id,
    name,
    parent_id,
    level,
    path,               -- 记录已访问的ID路径，如：'1,2,3'
    is_cycle            -- 是否检测到循环
) AS (
    -- 锚点：根节点
    SELECT 
        id,
        name,
        parent_id,
        1 AS level,
        TO_CHAR(id) AS path,      -- 初始路径 = '1'
        'N' AS is_cycle
    FROM cyclic_dept
    WHERE parent_id IS NULL

    UNION ALL

    -- 递归成员：检测循环
    SELECT 
        cd.id,
        cd.name,
        cd.parent_id,
        sh.level + 1,
        sh.path || ',' || cd.id,  -- 扩展路径：'1,2'
        CASE 
            -- 检查当前ID是否已在路径中：在路径前后加逗号，避免部分匹配（如：'1'匹配'10'）
            WHEN INSTR(',' || sh.path || ',', ',' || cd.id || ',') > 0 
            THEN 'Y'
            ELSE 'N'
        END AS is_cycle
    FROM cyclic_dept cd
    INNER JOIN safe_hierarchy sh
        ON cd.parent_id = sh.id
    WHERE sh.is_cycle = 'N'       -- 一旦检测到循环，停止递归
      AND sh.level < 10           -- 额外深度限制
)

SELECT 
    id,
    name,
    parent_id,
    level,
    path,
    is_cycle,
    -- 可视化标记循环节点
    CASE WHEN is_cycle = 'Y' THEN '⚠️ 循环!' ELSE '' END AS warning
FROM safe_hierarchy
ORDER BY level, id;
```

我们特别要**注意**：以上代码要想在Oracle中模拟执行。一是要与前面一样，去掉`RECURSIVE`关键字，仅用`WITH`。二是要改掉列别名`level`，因为`level`是Oracle的保留关键字。

```
level,  -- 这是Oracle的伪列（用于CONNECT BY），不能直接用作列别名！
```

在Oracle中，`LEVEL`是一个内置伪列（pseudo-column），用于`CONNECT BY`层级查询。

**修正后**的完整可执行版本（Oracle 19c）：

```sql
-- 假设表cyclic_dept已存在，结构如下：
-- CREATE TABLE cyclic_dept (id NUMBER PRIMARY KEY, name VARCHAR2(100), parent_id NUMBER);

WITH safe_hierarchy (
    id,
    name,
    parent_id,
    lvl,          -- 改为lvl，避免关键字冲突
    path,
    is_cycle
) AS (
    -- 锚点：根节点
    SELECT 
        id,
        name,
        parent_id,
        1 AS lvl,          -- 使用lvl
        TO_CHAR(id) AS path,
        'N' AS is_cycle
    FROM cyclic_dept
    WHERE parent_id IS NULL

    UNION ALL

    -- 递归成员：检测循环
    SELECT 
        cd.id,
        cd.name,
        cd.parent_id,
        sh.lvl + 1,          -- 使用lvl
        sh.path || ',' || cd.id,
        CASE 
            WHEN INSTR(',' || sh.path || ',', ',' || cd.id || ',') > 0 
            THEN 'Y'
            ELSE 'N'
        END AS is_cycle
    FROM cyclic_dept cd
    INNER JOIN safe_hierarchy sh
        ON cd.parent_id = sh.id
    WHERE sh.is_cycle = 'N'
      AND sh.lvl < 10          -- 使用lvl
)
SELECT 
    id,
    name,
    parent_id,
    lvl,          -- 输出lvl
    path,
    is_cycle,
    CASE WHEN is_cycle = 'Y' THEN '⚠️ 循环!' ELSE '' END AS warning
FROM safe_hierarchy
ORDER BY lvl, id;          -- 这里还有lvl
```

手动用`path + INSTR`检测循环的方式，但Oracle原生支持自动循环检测，我们的推荐写法：使用`CYCLE`子句（Oracle 12c+），更简洁。

```sql
WITH safe_hierarchy (
    id, name, parent_id, lvl, path
) AS (
    SELECT id, name, parent_id, 1 AS lvl, TO_CHAR(id) AS path
    FROM cyclic_dept
    WHERE parent_id IS NULL

    UNION ALL

    SELECT cd.id, cd.name, cd.parent_id, sh.lvl + 1, sh.path || ',' || cd.id
    FROM cyclic_dept cd
    JOIN safe_hierarchy sh ON cd.parent_id = sh.id
    WHERE sh.lvl < 10
)
-- 自动检测循环：如果id出现重复，则标记cycle_flag = 'Y'
CYCLE id SET is_cycle TO 'Y' DEFAULT 'N'   -- ← 关键：自动处理循环

SELECT 
    id, name, parent_id, lvl, path,
    is_cycle,
    CASE WHEN is_cycle = 'Y' THEN '⚠️ 循环!' ELSE '' END AS warning
FROM safe_hierarchy
ORDER BY lvl, id;
```

**循环检测原理**：路径格式为`'1,2,3'`，检查时转换为`',1,2,3,'`；目标ID：`1`转换为`',1,'`；`INSTR(',1,2,3,', ',1,') = 1 > 0`，检测成功。此方法避免了`'1'`误匹配`'10'`的问题。

##### 4、执行过程与结果

*   **第1轮**：`id=1, path='1', is_cycle='N'`
    
*   **第2轮**：`id=2, path='1,2', is_cycle='N'`
    
*   **第3轮**：`id=3, path='1,2,3', is_cycle='N'`
    
*   **第4轮**：尝试用`id=3`查子节点 →`parent_id=1`，发现`1`已在`path='1,2,3'`中 →`is_cycle='Y'`
    
*   **第5轮**：因`is_cycle='Y'`，不再递归。
    

**输出结果**：

| ID | NAME | PARENT\_ID | LEVEL | PATH | IS\_CYCLE | WARNING |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | A | NULL | 1 | 1 | N |  |
| 2 | B | 1 | 2 | 1,2 | N |  |
| 3 | C | 1 | 3 | 1,2,3 | N |  |
| 1 | A | NULL | 4 | 1,2,3,1 | Y | ⚠️ 循环! |

*   最后一行标记为循环，且后续不再递归，避免无限循环。
    
*   在实际应用中，我们可将`is_cycle='Y'`的记录单独处理（如：告警、修复）。
    

#### 五、实战示例四：物料清单（BOM）展开与成本累计

##### 1、业务背景

在制造业中，**物料清单**（Bill of Materials, BOM）描述了产品由哪些零部件组成，以及各零部件的数量。BOM通常具有多层嵌套结构（成品 → 子组件 → 原材料），属于典型的树形数据。具体**需求**如下：

*   展开指定成品的所有子物料（递归展开）；
    
*   计算每个子物料在成品中的**总用量**（考虑多层嵌套的乘积）；
    
*   如果子物料本身也是半成品，继续展开其组成；
    
*   最终汇总原材料的总成本。
    

此场景，比我们的简单部门树更复杂，涉及**数值累积**和**类型判断**。

##### 2、创建模拟数据表

```sql
-- 物料主数据表
CREATE TABLE material (
    mat_id        VARCHAR2(20) PRIMARY KEY,  -- 物料编码
    mat_name      VARCHAR2(100) NOT NULL,    -- 物料名称
    mat_type      VARCHAR2(10) CHECK (mat_type IN ('成品', '半成品', '原材料')), -- 类型
    unit_cost     NUMBER(10,2) DEFAULT 0     -- 单位成本（仅原材料有值）
);

-- BOM结构表：描述父物料由哪些子物料组成
CREATE TABLE bom (
    parent_mat_id   VARCHAR2(20) NOT NULL,   -- 父物料ID
    child_mat_id    VARCHAR2(20) NOT NULL,   -- 子物料ID
    qty_per_parent  NUMBER(10,4) NOT NULL,   -- 每单位父物料所需子物料数量
    PRIMARY KEY (parent_mat_id, child_mat_id),
    FOREIGN KEY (parent_mat_id) REFERENCES material(mat_id),
    FOREIGN KEY (child_mat_id) REFERENCES material(mat_id)
);

-- 创建索引优化BOM查询
CREATE INDEX idx_bom_child ON bom(child_mat_id);
```

*   `mat_type`用于区分物料类型，决定是否继续展开。
    
*   `unit_cost`仅原材料有值，半成品/成品成本需要计算。
    
*   BOM表的主键，保证无重复父子关系。
    

##### 3、插入模拟数据

```sql
-- 插入物料主数据
INSERT INTO material VALUES ('P001', '智能手机', '成品', 0);
INSERT INTO material VALUES ('S001', '主板组件', '半成品', 0);
INSERT INTO material VALUES ('S002', '电池组件', '半成品', 0);
INSERT INTO material VALUES ('R001', 'CPU芯片', '原材料', 120.00);
INSERT INTO material VALUES ('R002', '内存条', '原材料', 80.00);
INSERT INTO material VALUES ('R003', 'PCB板', '原材料', 25.00);
INSERT INTO material VALUES ('R004', '锂电池', '原材料', 60.00);
INSERT INTO material VALUES ('R005', '保护电路', '原材料', 15.00);

-- 插入BOM结构
-- 智能手机(P001)由1个主板组件(S001)和1个电池组件(S002)组成
INSERT INTO bom VALUES ('P001', 'S001', 1);
INSERT INTO bom VALUES ('P001', 'S002', 1);

-- 主板组件(S001)由1个CPU(R001)、2个内存条(R002)、1个PCB板(R003)组成
INSERT INTO bom VALUES ('S001', 'R001', 1);
INSERT INTO bom VALUES ('S001', 'R002', 2);
INSERT INTO bom VALUES ('S001', 'R003', 1);

-- 电池组件(S002)由1个锂电池(R004)和1个保护电路(R005)组成
INSERT INTO bom VALUES ('S002', 'R004', 1);
INSERT INTO bom VALUES ('S002', 'R005', 1);

COMMIT;
```

**BOM结构图**：

```
P001 (智能手机)
├─ S001 (主板组件) ×1
│  ├─ R001 (CPU芯片) ×1 → 总用量=1×1=1
│  ├─ R002 (内存条) ×2 → 总用量=1×2=2
│  └─ R003 (PCB板) ×1 → 总用量=1×1=1
└─ S002 (电池组件) ×1
   ├─ R004 (锂电池) ×1 → 总用量=1×1=1
   └─ R005 (保护电路) ×1 → 总用量=1×1=1
```

##### 4、递归CTE展开BOM，并计算总用量

```sql
-- 递归展开BOM，计算每个原材料在成品P001中的总用量
WITH RECURSIVE bom_exploded (
    top_mat_id,         -- 顶层成品ID（固定为P001）
    parent_mat_id,      -- 当前父物料ID
    child_mat_id,       -- 当前子物料ID
    child_name,         -- 子物料名称
    child_type,         -- 子物料类型
    unit_qty,           -- 本层用量（每单位父物料所需数量）
    total_qty,          -- 累计用量（从顶层到当前的乘积）
    bom_level,          -- BOM层级
    is_leaf             -- 是否为叶子节点（原材料）
) AS (
    -- 锚点成员：从顶层成品P001开始
    SELECT 
        'P001' AS top_mat_id,
        b.parent_mat_id,
        b.child_mat_id,
        m.mat_name AS child_name,
        m.mat_type AS child_type,
        b.qty_per_parent AS unit_qty,
        b.qty_per_parent AS total_qty,  -- 初始累计用量 = 本层用量
        1 AS bom_level,
        CASE WHEN m.mat_type = '原材料' THEN 'Y' ELSE 'N' END AS is_leaf
    FROM bom b
    JOIN material m ON b.child_mat_id = m.mat_id
    WHERE b.parent_mat_id = 'P001'  -- 指定顶层成品

    UNION ALL

    -- 递归成员：展开半成品
    SELECT 
        be.top_mat_id,
        b.parent_mat_id,
        b.child_mat_id,
        m.mat_name AS child_name,
        m.mat_type AS child_type,
        b.qty_per_parent AS unit_qty,
        be.total_qty * b.qty_per_parent AS total_qty, -- 累计用量 = 上层累计 * 本层用量
        be.bom_level + 1 AS bom_level,
        CASE WHEN m.mat_type = '原材料' THEN 'Y' ELSE 'N' END AS is_leaf
    FROM bom b
    JOIN material m ON b.child_mat_id = m.mat_id
    JOIN bom_exploded be ON b.parent_mat_id = be.child_mat_id  -- 关键：父=上一轮子
    WHERE be.is_leaf = 'N'  -- 只展开非叶子节点（即半成品）
      AND be.bom_level < 10
)

-- 最终查询：仅显示原材料及其总用量和成本
SELECT 
    top_mat_id AS "成品编码",
    child_mat_id AS "原材料编码",
    child_name AS "原材料名称",
    total_qty AS "总用量",
    m.unit_cost AS "单位成本",
    ROUND(total_qty * m.unit_cost, 2) AS "总成本"
FROM bom_exploded be
JOIN material m ON be.child_mat_id = m.mat_id
WHERE be.is_leaf = 'Y'  -- 只取原材料
ORDER BY child_mat_id;
```

*   `total_qty = be.total_qty * b.qty_per_parent`实现用量累积。
    
*   `is_leaf = 'N'`保证只展开半成品，避免对原材料重复展开。
    
*   最终`JOIN material`获取单位成本，计算总成本。
    

##### 5、执行过程解析

1.  **锚点**：查询`P001`的直接子件 →`S001`（qty=1）、`S002`（qty=1）
    
2.  **递归1**：
    

*   用`S001`查子件 →`R001`(1),`R002`(2),`R003`(1) →`total_qty = 1*1, 1*2, 1*1`
    
*   用`S002`查子件 →`R004`(1),`R005`(1) →`total_qty = 1*1, 1*1`
    

4.  **递归2**：所有子件均为原材料（`is_leaf='Y'`），停止递归。
    

##### 6、输出结果

| 成品编码 | 原材料编码 | 原材料名称 | 总用量 | 单位成本 | 总成本 |
| --- | --- | --- | --- | --- | --- |
| P001 | R001 | CPU芯片 | 1 | 120.00 | 120.00 |
| P001 | R002 | 内存条 | 2 | 80.00 | 160.00 |
| P001 | R003 | PCB板 | 1 | 25.00 | 25.00 |
| P001 | R004 | 锂电池 | 1 | 60.00 | 60.00 |
| P001 | R005 | 保护电路 | 1 | 15.00 | 15.00 |

*   **总成本=380.00**，用于成本核算、定价策略。
    
*   **总用量**用于采购计划、库存预警。
    
*   可扩展支持多成品、多工厂等复杂场景。
    

#### 六、实战示例五：路径聚合与反向追溯（祖先查询）

##### 1、场景需求

*   **正向查询**：给定一个节点，查询其所有后代（我们已掌握）。
    
*   **反向查询**：给定一个节点，查询其所有祖先（父、祖父、曾祖父...）。
    

这在以下场景中，很重要：

*   **权限系统**：用户所属的所有上级部门（用于权限继承）；
    
*   **血缘分析**：数据字段的上游来源追溯；
    
*   **故障排查**：错误日志的调用链路回溯。
    

##### 2、使用递归CTE查询祖先

```sql
-- 查询部门ID=10（前端架构组）的所有祖先
WITH RECURSIVE ancestor_path (
    dept_id,
    dept_name,
    parent_dept_id,
    dept_level,        -- 距离目标节点的层级（0=自身，1=父，2=祖父...）
    path_to_root       -- 从目标到根的路径
) AS (
    -- 锚点：从目标节点开始
    SELECT 
        dept_id,
        dept_name,
        parent_dept_id,
        0 AS dept_level,
        dept_name AS path_to_root
    FROM dept
    WHERE dept_id = 10  -- 目标节点

    UNION ALL

    -- 递归：向上查找父节点
    SELECT 
        d.dept_id,
        d.dept_name,
        d.parent_dept_id,
        ap.dept_level + 1,
        d.dept_name || ' → ' || ap.path_to_root  -- 路径反向拼接
    FROM dept d
    JOIN ancestor_path ap ON d.dept_id = ap.parent_dept_id  -- 关键：d.id = ap.parent_id
    WHERE ap.parent_dept_id IS NOT NULL  -- 根节点无父，停止
)

SELECT 
    dept_id,
    dept_name,
    dept_level,
    path_to_root,
    -- 计算从根到目标的正向路径（反转）
    REVERSE(REGEXP_REPLACE(REVERSE(path_to_root), ' → ', ' ← ')) AS root_to_target
FROM ancestor_path
ORDER BY dept_level;  -- 0=自身, 1=父, 2=祖父...
```

**反向递归关键**：锚点是**目标节点**而非根节点；JOIN条件是`d.dept_id = ap.parent_dept_id`（向上找父）；终止条件是`ap.parent_dept_id IS NOT NULL`（根节点停止）。

##### 3、输出结果

| DEPT\_ID | DEPT\_NAME | DEPT\_LEVEL | PATH\_TO\_ROOT | ROOT\_TO\_TARGET |
| --- | --- | --- | --- | --- |
| 10 | 前端架构组 | 0 | 前端架构组 | 前端架构组 |
| 5 | 前端开发组 | 1 | 前端开发组 → 前端架构组 | 前端开发组 ← 前端架构组 |
| 2 | 技术部 | 2 | 技术部 → 前端开发组 → 前端架构组 | 技术部 ← 前端开发组 ← 前端架构组 |
| 1 | 总部 | 3 | 总部 → 技术部 → 前端开发组 → 前端架构组 | 总部 ← 技术部 ← 前端开发组 ← 前端架构组 |

**应用场景**：`dept_level`可用于计算汇报层级（如：“距CEO 3级”）；`root_to_target`可用于生成面包屑导航。