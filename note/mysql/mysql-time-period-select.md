---
title: MySQL 分时间段查询数据
lastUpdated: 2024-01-17 14:30:13
---

### 查询当天数据

第一种：数量小的时候用，数据量稍微起来巨慢

```sql
select 字段 from 表名 where to_days(时间字段) = to_days(now());
```

第二种：速度快

```sql
select 字段 from 表名 where 时间字段 BETWEEN CONCAT(CURDATE(),' 00:00:00') AND CONCAT(CURDATE(),' 23:59:59');
```

最好配合复合索引来查，避免全表扫描

### 查询昨天的数据

```sql
SELECT * FROM `table_name` WHERE TO_DAYS(NOW()) - TO_DAYS(created_time) <= 1
```

### 查询最近7天的（包含7天总计7天）

#7天的数据

```sql
SELECT * FROM `table_name` WHERE DATE_SUB(CURDATE(),INTERVAL 7 DAY) < DATE(created_time);
```

### 查询本月的数据

```sql
SELECT * FROM `table_name` WHERE DATE_FORMAT(created_time,'%Y-%m')= DATE_FORMAT(CURDATE(),'%Y-%m')
```

### 查询上个月的数据

```sql
SELECT * FROM table_name WHERE PERIOD_DIFF(DATE_FORMAT(NOW(),'%Y%m'),DATE_FORMAT(created_time,'%Y%m')) = 1;
```

### 查询上季度

```sql
SELECT * FROM table_name WHERE QUARTER(created_time) = QUARTER(DATE_SUB(NOW(),INTERVAL 1 QUARTER));
```

### 查询本季度

```sql
SELECT * FROM `table_name` WHERE QUARTER(created_time) = QUARTER(NOW())
```

### 查询今年的数据

```sql
SELECT * FROM `table_name` WHERE YEAR(created_time) = YEAR(NOW())
```

### 计算两个时间间隔-天

```sql
SELECT DATEDIFF('2020-10-29','2020-10-28') AS days;
```

### 按周统计

```sql
SELECT DATE_FORMAT(created_time,'%Y%u') weeks,COUNT(created_time) COUNT FROM `table_name` GROUP BY weeks;
```

### 按天统计

```sql
SELECT DATE_FORMAT(created_time,'%Y%m%d') days,COUNT(created_time) COUNT FROM table_name GROUP BY days;
```

### 按月统计

```sql
SELECT DATE_FORMAT(created_time,'%Y%m') months,COUNT(created_time) COUNT FROM table_name GROUP BY months;
```

### 查询去年

```sql
SELECT * FROM table_name WHERE YEAR(created_time) = YEAR(DATE_SUB(NOW(),INTERVAL 1 YEAR));
```

### 查询近6个月的数据

```sql
SELECT * FROM table_name WHERE created_time BETWEEN DATE_SUB(NOW(),INTERVAL 6 MONTH) AND NOW();
```
