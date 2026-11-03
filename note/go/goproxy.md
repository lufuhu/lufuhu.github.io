---
title: Go 代理
lastUpdated: 2025-03-10 14:24:57
---

## 查看代理
```bash
go env
```

>  `GOPROXY` 为代理地址

## goproxy
[https://goproxy.io/zh/](https://goproxy.io/zh/)
```sh
go env -w GOPROXY=https://proxy.golang.com.cn,direct
```

## 阿里云镜像
[https://developer.aliyun.com/mirror/goproxy](https://developer.aliyun.com/mirror/goproxy)
```sh
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/
```

## 七牛云镜像
[https://goproxy.cn/](https://goproxy.cn/)
```sh
go env -w GOPROXY=https://goproxy.cn,direct
```

## 取消代理
```sh
go env -u GOPROXY
```
