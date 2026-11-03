---
title: Windows 安装 GO
lastUpdated: 2024-01-11 14:31:28
---

### 下载
```
https://studygolang.com/dl
```
按流程安装（安装路径：D:\Go）

### 配置环境变量
```
//工作目录：项目放置目录
GOPATH   E:\go

//go安装目录下的bin目录
Path     D:\Go\bin
```

### 验证是否安装成功
打开cmd
```
go version
```
输出版本号，安装成功
```
go version go1.17.3 windows/amd64
```

### 查看配置
```
go env
```

### 新建项目
进入工作目录GOPATH（E:\go）
```
mkdir first_go
cd first_go

go mod init first_go
```
输出，创建项目成功
```
go: creating new go.mod: module first_go
```
