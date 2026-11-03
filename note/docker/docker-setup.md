---
title: Linux 安装 Docker
lastUpdated: 2024-01-11 13:59:05
---

## 文档
[https://docs.docker.com/](https://docs.docker.com/)
## 前置
- 安装依赖
```
yum install -y yum-utils
```
- 添加 `docker-ce` 镜像源
```
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
## 安装 `docker-ce` `docker-ce-cli` `containerd.io`
```
yum install docker-ce docker-ce-cli containerd.io
```
## 安装 `docker-compose`
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

## 验证安装
- 查看 `docker` 版本号
```
docker -v
```
- 查看 `docker-compose` 版本号
```
docker-compose -v
```

## 使用
```
systemctl status docker		//查看状态
systemctl start docker		//启动
systemctl restart docker	//重启
systemctl stop docker		//停止
```

## 配置
```
vim /etc/docker/daemon.json
```
> 配置修改完成需要重启：`systemctl restart docker`
