---
title: Harbor安装
lastUpdated: 2023-11-23 18:15:29
---

官网：[https://goharbor.io/](https://goharbor.io/)
GitHub：[https://github.com/goharbor/harbor](https://github.com/goharbor/harbor)
### 环境
- Linux
- Docker

### 安装
- 下载安装包
- 
GitHub下载地址：[https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases)

> 下载的压缩包 `harbor-offline-installer-v2.3.4.tgz`
- 下载完成后，解压
```
tar xzvf harbor-offline-installer-v2.3.4.tgz
```
- 进入解压后的文件夹 `harbor`
```
cd harbor
ll
```
> 查看 `harbor` 文件夹
```
-rw-r--r--. 1 root root      3361 Nov  9 06:01 common.sh
-rw-r--r--. 1 root root 610560420 Nov  9 06:01 harbor.v2.3.4.tar.gz
-rw-r--r--. 1 root root      7840 Nov  9 06:01 harbor.yml.tmpl
-rwxr-xr-x. 1 root root      2500 Nov  9 06:01 install.sh
-rw-r--r--. 1 root root     11347 Nov  9 06:01 LICENSE
-rwxr-xr-x. 1 root root      1881 Nov  9 06:01 prepare
```

- 复制配置文件 `harbor.yml` 并修改配置
```
cp harbor.yml.tmpl harbor.yml
vi harbor.yml
```
`harbor.yml`
> `hostname`需要修改成自己的，否则会报错：`ERROR:root:Please specify hostname`
```
# Harbor的IP/地址，不能使用 `localhost`或者`127.0.0.1`
hostname: www.harbor.local

# `https` 配置，如果不使用 `https` 就把这四行注释掉
https:
  port: 443
  certificate: /your/certificate/path
  private_key: /your/private/key/path

# Admin账号的密码：Harbor12345
harbor_admin_password: Harbor12345

...其他配置
```
- 执行安装脚本
```
./install.sh
```
输出以下表示成功
```
Creating network "harbor_harbor" with the default driver
Creating harbor-log ... done
Creating redis         ... done
Creating registry      ... done
Creating registryctl   ... done
Creating harbor-portal ... done
Creating harbor-db     ... done
Creating harbor-core   ... done
Creating nginx             ... done
Creating harbor-jobservice ... done
✔ ----Harbor has been installed and started successfully.----
```
