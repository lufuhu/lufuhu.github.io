---
title: Go 交叉编译
lastUpdated: 2025-03-10 14:24:04
---

## Windows电脑上编译
- Linux
```sh
SET CGO_ENABLED=0
SET GOOS=linux
SET GOARCH=amd64
go build main.go
```
- Mac
```sh
SET CGO_ENABLED=0
SET GOOS=darwin
SET GOARCH=amd64
go build main.go
```
## Linux环境编译
- Windows
```sh
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build main.go
```
- Mac
```sh
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build main.go
```
## Mac电脑上编译
- Linux
```sh
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build main.go
```
- Windows
```sh
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build main.go
```


