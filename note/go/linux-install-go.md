---
title: Linux 安装 Go
lastUpdated: 2024-02-22 14:20:01
---

## 官网
[https://go.dev/](https://go.dev/)
## 下载
[https://go.dev/dl/](https://go.dev/dl/)

选择需要安装的版本，复制下载链接 `https://go.dev/dl/go1.17.7.linux-amd64.tar.gz`.

1.下载安装包

```
wget https://go.dev/dl/go1.17.7.linux-amd64.tar.gz
```
2. 解压

```
tar -C /usr/local -zxvf go1.17.7.linux-amd64.tar.gz
```
3. 添加 `/usr/loacl/go/bin` 目录到PATH变量中, 添加到 `/etc/profile` 或 `$HOME/.profile` 都可以

```
vim /etc/profile
// 在最后一行添加
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
```

保存退出后执行source

```
source /etc/profile
```
4. 验证

```
go version
```
输出版本号表示安装成功

```
go version go1.17.7 linux/amd64
```
## 代理
```sh
go env -w GOPROXY=https://goproxy.io,direct
```
