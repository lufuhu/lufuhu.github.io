---
title: Docker 构建多架构镜像1111
lastUpdated: 2024-01-11 14:32:32
---

## 构建方式

#### `Buildx` 构建1
- 可以在任意一台主机上直接构建多平台镜像
- 只能使用 `Dockerfile` 构建
- `FROM` 镜像需要支持多 `CPU` 架构

#### `Manifest` 构建
- 使用已构建完成的镜像，自行标记镜像架构，不能使用 `Dockerfile` 构建

## 使用Buildx构建

#### 下载或者自己编写Dockerfile文件
```
mkdir httpd

cd httpd

echo "FROM httpd:latest" >> Dockerfile
```
#### 创建用于构建的节点
```
docker buildx create --use --name build --node build --driver-opt network=host
```
#### 构建并提交
```
docker buildx build --push --platform linux/arm64,linux/amd64 --tag 192.168.10.122/library/httpd:latest .
```
#### 查看
```
docker manifest inspect 192.168.10.122/library/httpd:latest
```

## 使用Manifest构建

#### amd64 镜像
```
docker pull httpd

docker tag httpd 192.168.10.122/library/httpd:amd64

docker push 192.168.10.122/library/httpd:amd64
```

#### arm64 镜像
```
docker pull httpd

docker tag httpd 192.168.10.122/library/httpd:arm64

docker push 192.168.10.122/library/httpd:arm64
```

#### Manifest
```
docker manifest create 192.168.10.122/library/httpd:latest 192.168.33.239/library/httpd:amd64 192.168.33.239/library/httpd:arm64

docker manifest annotate 192.168.10.122/library/httpd:latest 192.168.33.239/library/httpd:amd64 --os linux --arch amd64

docker manifest annotate 192.168.10.122/library/httpd:latest 192.168.33.239/library/httpd:arm64 --os linux --arch arm64

docker manifest push 192.168.10.122/library/httpd:latest
```

#### 查看
```
docker manifest inspect 192.168.10.122/library/httpd:latest
```
