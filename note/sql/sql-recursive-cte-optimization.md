---
title: SQL递归CTE深度控制与优化方法，防循环引用及层级限制写法
lastUpdated: 2026-10-26 03:00:00
---


#### 一、控制递归终止条件

##### 1、显式设置最大层级

在所有递归查询中，我们都加入`WHERE level < N`，防止无限循环：

```sql
WITH RECURSIVE cte AS (
  SELECT id, parent_id, 1 AS level
  FROM tree 
  WHERE parent_id IS NULL
  
  UNION ALL
  
  SELECT t.id, t.parent_id, c.level + 1
  FROM tree t
  JOIN cte c ON t.parent_id = c.id
  WHERE c.level < 100  -- 限制最大递归深度
)
SELECT * FROM cte;
```

##### 2、防止循环引用（如：A → B → A）

**PostgreSQL**：用数组记录路径

```sql
WITH RECURSIVE cte AS (
  SELECT id, parent_id, 1 AS level, ARRAY[id] AS path
  FROM tree 
  WHERE parent_id IS NULL

  UNION ALL

  SELECT t.id, t.parent_id, c.level + 1, c.path || t.id
  FROM tree t
  JOIN cte c ON t.parent_id = c.id
  WHERE c.level < 100 
    AND NOT t.id = ANY(c.path)  -- 跳过已访问节点
)
SELECT * FROM cte;
```

**MySQL替代方法**：用路径字符串 + `FIND_IN_SET()`（性能较差，而且需要注意类型匹配）；  
**SQL Server**：如果表使用`hierarchyid`字段存储层级（如：`h_id hierarchyid`），绝大多数层级操作（如：查祖先、后代、层级、排序）均可通过内置方法（如：`h_id.GetLevel()`、`h_id.IsDescendantOf()`）高效完成，**通常无需递归CTE**；仅在需要动态构建路径字符串或结合复杂业务逻辑时，才考虑辅助递归；如果使用普通ID，则可通过路径字符串模拟防循环。

**MySQL防循环正确写法**：显式类型转换 + 路径格式说明

```sql
WITH RECURSIVE cte AS (
  SELECT 
    id, parent_id, 1 AS level, 
    CAST(id AS CHAR(4000)) AS path
  FROM tree 
  WHERE parent_id IS NULL

  UNION ALL

  SELECT 
    t.id, t.parent_id, c.level + 1,
    CAST(CONCAT(c.path, ',', t.id) AS CHAR(4000)) AS path  -- 显式CAST确保类型一致
  FROM tree t
  JOIN cte c ON t.parent_id = c.id
  WHERE c.level < 100 
    AND FIND_IN_SET(CAST(t.id AS CHAR), c.path) = 0  -- t.id显式转为字符串
)
SELECT * FROM cte;
```

**说明**：

*   MySQL的`CAST`**不支持`VARCHAR`类型**，必须使用`CHAR(N)`。
    
*   `FIND_IN_SET(str, strlist)`要求`str`为字符串类型，必须将整型ID显式转为`CHAR`，否则在某些边界情况下（如：ID为`BIGINT`），可能行为异常。`FIND_IN_SET`要求`strlist`中的元素为非负整数字符串。若表中id可能为0或负数，该函数无法正确匹配（例如：`FIND_IN_SET('-1', '-1,2,3')`返回0）。此时应改用`LIKE`或正则匹配（如：`CONCAT(',', c.path, ',') NOT LIKE CONCAT('%,', t.id, ',%')`），但请注意，`LIKE`方式性能较差，且需确保id转换为字符串后无歧义（如：避免ID为`'1'`和`'11'`的混淆）。
    
*   **递归部分必须显式**`CAST(... AS CHAR(4000))`，否则MySQL会因类型不一致（`CHAR` vs `VARCHAR`）报错：  
    `ERROR 3575: Recursive CTE does not have a column of type 'char(4000)' in the recursive query block.`
    
*   路径长度需要**预估**（如：400层 × 11字符 ≈ 4400字节），我们建议根据`最大深度 × (max_id_length + 1)`设置`CHAR(N)`，例如：深度1000、ID最长10位 → `CHAR(11000)`。**此处`CHAR(4000)`仅适用于深度≤300的场景**。`实际支持深度 = N / (max_digits_in_id + 1)`，例如：`CHAR(4000) + 10位ID` → 最多约363层。
    
*   ⚠️ **注意**：MySQL递归CTE不允许`TEXT`/`BLOB`类型，因此路径字段必须使用`CHAR(N)`。超深层级，我们建议改用存储过程。
    

#### 二、精简递归逻辑

##### 避免在递归体中执行复杂计算

**不推荐**：

```sql
-- 每次递归都查外部表，性能极差
(SELECT COUNT(*) FROM other_table) AS ext_data
```

**推荐做法**：递归只负责层级展开，额外数据在最后一步加入

```sql
WITH RECURSIVE good_cte AS (
  SELECT id, parent_id, 1 AS level
  FROM tree
  UNION ALL
  SELECT t.id, t.parent_id, c.level + 1
  FROM tree t JOIN good_cte c ON t.parent_id = c.id
  WHERE c.level < 100
)
SELECT *, (SELECT COUNT(*) FROM other_table) AS ext_data
FROM good_cte;
```

**原则**：递归部分只做“父子关联 + 层级+1”，其他逻辑放到外面。

#### 三、合理调整数据库配置

| 数据库 | 配置方式 | 默认值 | 建议 |
| --- | --- | --- | --- |
| MySQL 8.0+ | `SET SESSION cte_max_recursion_depth = 1000;` | 1000 | 按需设置，避免过大（0表示无限制，慎用） |
| SQL Server | `OPTION (MAXRECURSION 1000)` | 100 | 最大32767；0表示不限（慎用） |
| PostgreSQL | 无直接参数 | 无硬性限制 | 依赖系统栈，超深可能栈溢出；需要在`postgresql.conf`中设置`max_stack_depth`（如：`'6MB'`），需要重启PostgreSQL服务才能生效 |

⚠️ **警告**：如果我们盲目调高递归上限，可能导致内存溢出或查询卡死。

PostgreSQL配置示例：我们需要修改`postgresql.conf`

```
# 查看内核栈限制：执行ulimit -s（默认单位KB，如：输出8192表示8MB）
# max_stack_depth必须小于内核限制，避免数据库启动失败
max_stack_depth = '6MB'  
```

对于超深树（>1000层），`ANY(array)`的线性查找可能成为瓶颈。实践中，我们可考虑使用PostgreSQL的`ltree`扩展，其`@>`、`<@`操作符和GIST索引能高效处理层级与路径包含关系。

#### 四、替代方法：不用递归也能查层级

##### 1、层级少（≤5 层）：多层`LEFT JOIN`

```sql
SELECT 
  t1.*,
  t2.name AS parent1,
  t3.name AS parent2
FROM tree t1
LEFT JOIN tree t2 ON t1.parent_id = t2.id
LEFT JOIN tree t3 ON t2.parent_id = t3.id;
```

##### 2、层级很深（>1000层）：用存储过程循环（MySQL示例）

⚠️ 注意：MySQL的`WHILE`循环只能在存储过程中使用（增加路径字段实现完整防环，避免循环引用）。

```sql
DELIMITER $$

CREATE PROCEDURE BuildTree()
BEGIN
  DECLARE current_level INT DEFAULT 1;
  DECLARE rows_affected INT DEFAULT 1;

  CREATE TEMPORARY TABLE temp_tree (
    id INT,
    parent_id INT,
    level INT,
    path TEXT,  -- TEXT无长度限制，适配超深层级
    PRIMARY KEY (id, level)
  );

  -- 插入根节点
  INSERT INTO temp_tree 
  SELECT id, parent_id, 1, CAST(id AS CHAR(4000))
  FROM tree WHERE parent_id IS NULL;

  WHILE rows_affected > 0 AND current_level < 1000 DO
    INSERT INTO temp_tree 
    SELECT 
      t.id, 
      t.parent_id, 
      current_level + 1,
      CONCAT(tt.path, ',', t.id)  -- TEXT字段无需CAST
    FROM tree t
    INNER JOIN temp_tree tt ON t.parent_id = tt.id
    WHERE tt.level = current_level
      AND FIND_IN_SET(CAST(t.id AS CHAR), tt.path) = 0;  -- 显式转字符串
    
    SET rows_affected = ROW_COUNT();
    SET current_level = current_level + 1;
  END WHILE;

  SELECT * FROM temp_tree ORDER BY level, id;
  DROP TEMPORARY TABLE temp_tree;
END$$

DELIMITER ;
```

**优势**：无栈溢出风险；内存可控；完整支持防环；适合超深树结构。

#### 五、索引与物化优化

##### 1、必须建立的索引

```
-- 原始表只需要基于parent_id的索引
CREATE INDEX idx_tree_parent_id ON tree(parent_id);

-- 如果我们将递归结果物化到临时表，并频繁按level过滤，可在临时表上创建索引，例如：
-- CREATE INDEX idx_tmp_level ON tmp_tree(level);
```

##### 2、物化结果到临时表

```sql
CREATE TEMPORARY TABLE tmp_tree AS
WITH RECURSIVE tree_cte AS (
  -- 锚点 + 递归体
)
SELECT * FROM tree_cte;

SELECT * FROM tmp_tree WHERE level > 3;
```

#### 六、监控与诊断

##### 1、查看执行计划

```
-- MySQL
EXPLAIN ANALYZE WITH RECURSIVE ...;

-- PostgreSQL  
EXPLAIN (ANALYZE, BUFFERS) WITH RECURSIVE ...;

-- SQL Server
SET STATISTICS IO ON;
SET STATISTICS TIME ON;
```

##### 2、关键监控指标

*   每层返回行数（防止“指数爆炸”）
    
*   每层耗时
    
*   内存/临时空间使用量
    
*   实际递归深度
    

#### 七、主流数据库模拟示例

##### 1、MySQL 8.0+：部门层级查询（深度≤100）

```sql
CREATE TABLE dept (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL,
    parent_id INT NULL
);

INSERT INTO dept VALUES
(1, '总部', NULL),
(2, '技术部', 1),
(3, '后端组', 2),
(4, 'SQL组', 3),
(5, '初级SQL组', 4),
(6, '产品部', 1),
(7, '设计组', 6);

CREATE INDEX idx_dept_parent_id ON dept(parent_id);

WITH RECURSIVE dept_hierarchy AS (
    SELECT 
        dept_id, dept_name, parent_id, 1 AS level, 
        CAST(dept_id AS CHAR(4000)) AS path
    FROM dept WHERE parent_id IS NULL
    UNION ALL
    SELECT 
        d.dept_id, d.dept_name, d.parent_id, dh.level + 1,
        CAST(CONCAT(dh.path, ',', d.dept_id) AS CHAR(4000)) AS path
    FROM dept d
    JOIN dept_hierarchy dh ON d.parent_id = dh.dept_id
    WHERE dh.level < 100
      AND FIND_IN_SET(CAST(d.dept_id AS CHAR), dh.path) = 0
)
SELECT dept_id, dept_name, parent_id, level 
FROM dept_hierarchy 
ORDER BY level, dept_id;
```

**输出**：7行，层级1~5。

⚠️ `CAST(dept_id AS CHAR(4000))`：如果`dept_id`是`BIGINT`，我们建议写成`CAST(dept_id AS CHAR(20))`再拼接，避免隐式截断。

##### 2、PostgreSQL：员工汇报链（带完整路径）

```sql
CREATE TABLE emp (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    manager_id INT
);

INSERT INTO emp VALUES
(1, '张三（CEO）', NULL),
(2, '李四（CTO）', 1),
(3, '王五（技术总监）', 2),
(4, '赵六（部门经理）', 3),
(5, '孙七（主管）', 4),
(6, '周八（员工）', 5),
(7, '吴九（产品总监）', 1);

CREATE INDEX idx_emp_manager_id ON emp(manager_id);

WITH RECURSIVE emp_hierarchy AS (
    SELECT emp_id, emp_name, manager_id, 1 AS level, emp_name::TEXT AS report_chain, ARRAY[emp_id] AS path
    FROM emp WHERE manager_id IS NULL
    UNION ALL
    SELECT e.emp_id, e.emp_name, e.manager_id, eh.level + 1,
           eh.report_chain || ' → ' || e.emp_name,
           eh.path || e.emp_id
    FROM emp e
    JOIN emp_hierarchy eh ON e.manager_id = eh.emp_id
    WHERE eh.level < 2000
      AND NOT e.emp_id = ANY(eh.path)
)
SELECT emp_id, emp_name, level, report_chain
FROM emp_hierarchy
ORDER BY level, emp_id;
```

**输出**：7行，最长路径6层。

##### 3、SQL Server：菜单层级（我们用OPTION控制深度）

```sql
CREATE TABLE menu (
    menu_id INT PRIMARY KEY,
    menu_name VARCHAR(50),
    parent_menu_id INT
);

INSERT INTO menu VALUES
(1, '首页', NULL),
(2, '系统管理', 1),
(3, '用户管理', 2),
(4, '新增用户', 3),
(5, '角色管理', 2),
(6, '数据统计', 1);

CREATE INDEX idx_menu_parent_id ON menu(parent_menu_id);

WITH menu_hierarchy AS (
    SELECT menu_id, menu_name, parent_menu_id, 1 AS level
    FROM menu WHERE parent_menu_id IS NULL
    UNION ALL
    SELECT m.menu_id, m.menu_name, m.parent_menu_id, mh.level + 1
    FROM menu m
    JOIN menu_hierarchy mh ON m.parent_menu_id = mh.menu_id
)
SELECT menu_id, menu_name, parent_menu_id, level
FROM menu_hierarchy
ORDER BY level, menu_id
OPTION (MAXRECURSION 500);
```

⚠️ **注意**：此示例假设数据无环。如果存在循环引用风险，我们应额外维护一个“路径字符串”（例如，使用`VARCHAR(MAX)`类型），记录当前递归路径上的所有节点。在每次递归时，通过`CHARINDEX`检查新节点是否已存在于路径字符串中：如果存在，则说明出现循环引用，应立即终止该分支的递归。俄国不处理循环引用，递归查询将达到`MAXRECURSION`限制后强制退出，可能导致结果不完整或执行错误。

**输出**：6行，最大层级4。

#### 八、超深层级通用模板（MySQL存储过程，含防环）

适用于1000+层的单链或稀疏树结构。

```sql
-- 创建10层单链数据
CREATE TABLE org (org_id INT PRIMARY KEY, org_name VARCHAR(50), parent_id INT);
INSERT INTO org VALUES 
(1, '组织顶层', NULL),
(2, '组织层级2', 1),
(3, '组织层级3', 2),
(4, '组织层级4', 3),
(5, '组织层级5', 4),
(6, '组织层级6', 5),
(7, '组织层级7', 6),
(8, '组织层级8', 7),
(9, '组织层级9', 8),
(10, '组织层级10', 9);

DELIMITER $$
CREATE PROCEDURE BuildOrgHierarchy()
BEGIN
  DECLARE current_level INT DEFAULT 1;
  DECLARE rows_affected INT DEFAULT 1;

  CREATE TEMPORARY TABLE org_hierarchy (
    org_id INT,
    org_name VARCHAR(50),
    parent_id INT,
    level INT,
    path TEXT,
    PRIMARY KEY (org_id, level)
  );

  INSERT INTO org_hierarchy 
  SELECT org_id, org_name, parent_id, 1, CAST(org_id AS CHAR(4000))
  FROM org WHERE parent_id IS NULL;

  WHILE rows_affected > 0 AND current_level < 1000 DO
    INSERT INTO org_hierarchy
    SELECT 
      o.org_id, o.org_name, o.parent_id, current_level + 1,
      CONCAT(oh.path, ',', o.org_id)
    FROM org o
    INNER JOIN org_hierarchy oh ON o.parent_id = oh.org_id
    WHERE oh.level = current_level
      AND FIND_IN_SET(CAST(o.org_id AS CHAR), oh.path) = 0;
    
    SET rows_affected = ROW_COUNT();
    SET current_level = current_level + 1;
  END WHILE;

  SELECT org_id, org_name, parent_id, level FROM org_hierarchy ORDER BY level;
  DROP TEMPORARY TABLE org_hierarchy;
END$$
DELIMITER ;

CALL BuildOrgHierarchy();
```

**输出**：10行，层级1~10。

#### 九、多子节点 + 条件过滤（MySQL）

**需求**：我们要查询「层级≤5且子节点数≥3」的部门。

**SQL实现**：基于递归CTE构建层级表，再统计子节点数

```sql
-- 模拟部门表（含多子节点）
CREATE TABLE org (
    org_id INT PRIMARY KEY,
    org_name VARCHAR(50),
    parent_id INT
);

INSERT INTO org VALUES
(1, '总部', NULL),
(2, '技术中心', 1),
(3, '产品中心', 1),
(4, '后端研发部', 2),
(5, '前端研发部', 2),
(6, '测试部', 2),
(7, '运维部', 2),
(8, 'UI设计', 3),
(9, '产品规划', 3),
(10, '数据分析', 3),
(11, 'Java组', 4),
(12, 'Go组', 4),
(13, 'Python组', 4);

-- 完整查询（含递归CTE定义）
WITH RECURSIVE org_hierarchy AS (
    SELECT 
        org_id, org_name, parent_id, 1 AS level, 
        CAST(org_id AS CHAR(4000)) AS path
    FROM org WHERE parent_id IS NULL
    UNION ALL
    SELECT 
        o.org_id, o.org_name, o.parent_id, oh.level + 1,
        CAST(CONCAT(oh.path, ',', o.org_id) AS CHAR(4000))
    FROM org o
    JOIN org_hierarchy oh ON o.parent_id = oh.org_id
    WHERE oh.level < 100
      AND FIND_IN_SET(CAST(o.org_id AS CHAR), oh.path) = 0
),
child_counts AS (
  SELECT parent_id, COUNT(*) AS child_count
  FROM org_hierarchy
  WHERE parent_id IS NOT NULL
  GROUP BY parent_id
)
SELECT 
  oh.org_id, 
  oh.org_name, 
  oh.level,
  COALESCE(cc.child_count, 0) AS child_count
FROM org_hierarchy oh
LEFT JOIN child_counts cc ON oh.org_id = cc.parent_id
WHERE oh.level <= 5 AND COALESCE(cc.child_count, 0) >= 3
ORDER BY oh.level, oh.org_id;
```

**输出示例**：

| org\_id | org\_name | level | child\_count |
| --- | --- | --- | --- |
| 2 | 技术中心 | 2 | 4 |
| 3 | 产品中心 | 2 | 3 |
| 4 | 后端研发部 | 3 | 3 |