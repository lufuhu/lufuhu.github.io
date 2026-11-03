---
title: Docker 从容器创建新镜像
lastUpdated: 2024-01-11 14:15:10
---

## 注册账号
[https://hub.docker.com/](https://hub.docker.com/)
```
Docker ID	：lufuhu
Email		: ***
Password	: ***
```

## 客户端登录

确保本机已安装 `Docker`

```
docker login hub.docker.com		// docker login <URL>
```

> URL：镜像库地址或IP，为空默认登录官方镜像库。

输入 `Username`（`Docker ID`） 和 `Password` 登录，输出以下类容表示登录成功

```
Login Succeeded
```

## 使用 `commit` 从容器创建新镜像

- 运行一个 `CentOS` 容器

```
docker run -dit centos
```

执行 `docker ps` 并复制容器ID

```
CONTAINER ID   IMAGE     COMMAND       CREATED         STATUS         PORTS     NAMES
46857b530882   centos    "/bin/bash"   4 seconds ago   Up 3 seconds             vibrant_euclid
```

- 生成新镜像

```
docker commit 46857b530882 centos:latest	//docker commit <容器ID> <新镜像名称>:<版本号，默认latest>

```
- 提交镜像

```
docker tag centos:latest hub.docker.com/lufuhu/centos:latest
docker push hub.docker.com/lufuhu/centos:latest
```
