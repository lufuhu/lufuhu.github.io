---
title: 使用 mysqldump 备份MySQL数据库
lastUpdated: 2024-03-25 16:05:44
---
MySQL提供了命令行导出数据库数据以及文件的一种方便的工具mysqldump，可以通过命令行直接实现数据库内容的导出dump.

## mysqldump
MySQL提供了命令行导出数据库数据以及文件的一种方便的工具 `mysqldump`，可以通过命令行直接实现数据库内容的导出dump
```sh
mysqldump -u root -p --databases 数据库 > backups.sql
```
## 常用命令
1. 备份全部数据库的数据和结构
```sh
mysqldump -uroot -p123456 -A > /mysql/backups/mydb.sql
```
2. 备份全部数据库的结构（加 -d 参数）
```sh
mysqldump -uroot -p123456 -A -d > /mysql/backups/mydb.sql
```
3. 备份全部数据库的数据(加 -t 参数)
```sh
mysqldump -uroot -p123456 -A -t > /mysql/backups/mydb.sql
```
4. 备份单个数据库的数据和结构(数据库名mydb)
```sh
mysqldump -uroot-p123456 mydb > /mysql/backups/mydb.sql
```
5. 备份单个数据库的结构
```sh
mysqldump -uroot -p123456 mydb -d > /mysql/backups/mydb.sql
```
6. 备份单个数据库的数据
```sh
mysqldump -uroot -p123456 mydb -t > /mysql/backups/mydb.sql
```
7. 备份多个表的数据和结构（数据，结构的单独备份方法与上同）
```sh
mysqldump -uroot -p123456 mydb t1 t2 > /mysql/backups/mydb.sql
```
8. 一次备份多个数据库
```sh
mysqldump -uroot -p123456 --databases db1 db2 > /mysql/backups/mydb.sql
```
## 还原mysql备份内容
- 使用主机命令直接还原
```sh
mysql -uroot -p123456 < /mysql/backups/mydb.sql
```
- 登录mysql后,通过source命令指定备份文件进行还原
```sh
mysql> source /mysql/backups/mydb.sql
```
