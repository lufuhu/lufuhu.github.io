---
title: MySQL 主从同步
lastUpdated: 2023-11-23 18:12:25
---

### Docker容器
- Master(主)
```
docker run -d --name mysql-master -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```
- Slave(从)：
```
docker run -d --name mysql-slave -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```
> `docker ps` 查看容器
```
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                                  NAMES
be93bbd53052   mysql     "docker-entrypoint.s…"   6 seconds ago    Up 5 seconds    33060/tcp, 0.0.0.0:3307->3306/tcp, :::3307->3306/tcp   mysql-slave
029572d3cd75   mysql     "docker-entrypoint.s…"   13 seconds ago   Up 10 seconds   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql-master
```

### Master主数据库配置
- 进入容器
```
docker exec -it mysql-master /bin/bash
```
- 更新 `apt-get` 安装 `vim` ( `mysql` 镜像默认没有 `vim`,需要自己安装)
```
apt-get update
apt-get install -y vim 
```
- 添加以下配置 `/etc/mysql/my.cnf`
```
vim /etc/mysql/my.cnf
```
```
[mysqld]

// 同一局域网内注意要唯一
server-id=100

// 开启二进制日志功能，可以随便取
log-bin=mysql-bin
```
> 修改配置后需要重启 `mysql`, 因为使用的 `docker`，后面直接重启容器
- 进入数据库
```
mysql -u root  -p

输入密码：123456
```
- 创建 `Mysql` 用户
```
// 创建用户
CREATE USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

// 添加 REPLICATION SLAVE 和 REPLICATION CLIENT 权限
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';

// 更新
FLUSH PRIVILEGES;
```
- 获取主库信息
```
show master status;
```
> 结果如下，其中的 `File`、`Position`需要记录下来，在从库配置是需要用到
```
+---------------+----------+--------------+------------------+-------------------+
| File          | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+---------------+----------+--------------+------------------+-------------------+
| binlog.000001 |      1516 |              |                  |                   |
+---------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)
```
- `exit;` 退出数据库，`exit;` 退出容器，重启容器
```
docker restart mysql-master
```

### Slave从数据库配置
- 进入容器
```
docker exec -it mysql-slave /bin/bash
```
- 更新 `apt-get` 安装 `vim` ( `mysql` 镜像默认没有 `vim`,需要自己安装)
```
apt-get update
apt-get install -y vim 
```
- 添加配置 `/etc/mysql/my.cnf`

```
[mysqld]

// 设置server_id,注意要唯一
server-id=101

// 开启二进制日志功能，以备Slave作为其它Slave的Master时使用
log-bin=mysql-slave-bin

// relay_log配置中继日志
relay_log=mysql-relay-bin
```
> 修改配置后需要重启 `mysql`, 因为使用的 `docker`，后面直接重启容器
- 进入数据库
```
mysql -u root  -p

输入密码：123456
```
- 链接Master(主)和Slave(从)
```
change master to master_host='192.168.33.141', master_user='slave', master_password='123456', master_port=3306, master_log_file='mysql-bin.000001', master_log_pos= 1516, master_connect_retry=30;
```
> 命令说明：
```
master_host        		Master的IP地址,这里我直接使用docker宿主机IP，也可以使用容器IP
master_port   			Master的端口号
master_user				用于数据同步的用户
master_password			用于同步的用户的密码
master_log_file			指定 Slave 从哪个日志文件开始复制数据，即上文中提到的 File 字段的值
master_log_pos			从哪个 Position 开始读，即上文中提到的 Position 字段的值
master_connect_retry	如果连接失败，重试的时间间隔，单位是秒，默认是60秒
```
- 开启主从同步
```
start slave;
```
- 查看状态

```
show slave status \G;
```

```
Slave_IO_Running: Yes
Slave_SQL_Running: Yes

Last_IO_Errno: 
Last_SQL_Errno: 
```

> `Slave_IO_Running` 和 `Slave_SQL_Running` 默认 `No`，如果都为 `Yes`，表示主从同步配置成功，否则失败，可以查看 `Last_IO_Errno` 和 `Last_SQL_Errno` 报错内容。
