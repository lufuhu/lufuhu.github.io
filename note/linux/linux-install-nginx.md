---
title: Linux 安装 Nginx
lastUpdated: 2024-01-11 14:32:57
---

## 地址

[https://nginx.org/download/](https://nginx.org/download/)

> 选择版本：`nginx-1.21.2.tar.gz`

## 下载解压
```
wget https://nginx.org/download/nginx-1.21.2.tar.gz

tar -zxvf nginx-1.21.2.tar.gz

cd nginx-1.21.2

```

## 执行安装
```
./configure --prefix=/usr/local/nginx

make

make install

// 查看安装目录
whereis nginx
```

## 运行
```
/usr/local/nginx/sbin/nginx
```
