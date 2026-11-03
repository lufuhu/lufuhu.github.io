---
title: Docker 私有仓库使用
lastUpdated: 2024-01-11 14:06:28
---

### Docker 私有仓库配置
#### Linux
> 配置文件：`/etc/docker/daemon.json`(如果没有就新建)，添加配置：`insecure-registries=私有库IP`。
```
{
  "insecure-registries": ["***.***.***.***"]
}
```

#### 重启Docker（重启才生效）
```
systemctl restart docker
```
