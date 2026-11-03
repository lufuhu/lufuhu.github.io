---
title: K3s 安装
lastUpdated: 2024-01-11 14:33:26
---

官网：[https://www.k3s.io/](https://www.k3s.io/)

GitHub：[https://github.com/k3s-io/k3s](https://github.com/k3s-io/k3s)

文档：[https://rancher.com/docs/k3s/latest/en/](https://rancher.com/docs/k3s/latest/en/)

## 在线安装
`K3s` 提供了一个安装脚本，可以方便地将其作为服务安装在基于 `systemd` 或 `openrc` 的系统上。该脚本可在 [https://get.k3s.io](https://get.k3s.io) 获得。要使用这种方法安装 `K3s`，只需运行：
```
curl -sfL https://get.k3s.io | sh -
```
运行此安装后：
- `K3s` 服务将被配置为在节点重启或进程崩溃或被杀死后自动重启
- 将安装其他实用程序，包括 `kubectl`、`crictl`、`ctr`、`k3s-killall.sh` 和 `k3s-uninstall.sh`
- `kubecconfig` 文件将被写入 `/etc/rancher/k3s/k3s`. `K3s` 安装的 `yaml` 和 `kubectl` 将自动使用它  

## 离线安装
#### 1. 下载二进制包
[https://github.com/rancher/k3s/releases/latest](https://github.com/rancher/k3s/releases/latest)

![https://www.lufuhu.com/storage/file/20220314/hDz75zroMjhoO0y2gkWpT4mMXatexKeyZTYkY8kX.png](https://www.lufuhu.com/storage/file/20220314/hDz75zroMjhoO0y2gkWpT4mMXatexKeyZTYkY8kX.png)

#### 2. 下载安装脚本
[https://raw.githubusercontent.com/rancher/k3s/master/install.sh](https://raw.githubusercontent.com/rancher/k3s/master/install.sh)

#### 3. 开始安装
给二进制文件 `k3s` 权限
```
chmod 755 k3s
cp k3s /usr/local/bin/k3s
```
```
which k3s

k3s --version
```
执行安装脚本
```
export INSTALL_K3S_SKIP_DOWNLOAD=true	// 设置环境变量指定离线安装
sh install.sh --docker					// --docker：基于docker安装
```

> 安装成功后，可以使用 `docker ps` 查看

## 使用
```
k3s server &

k3s kubectl get nodes
```

## 设置节点机
获取 `NODE_TOKEN`
```
cat /var/lib/rancher/k3s/server/node-token
```
节点机运行
```
k3s agent --server https://myserver:6443 --token ${NODE_TOKEN}
```
> myserver: master的IP或URL

## 获取Kubeconfig
```
cat /etc/rancher/k3s/k3s.yaml
```

## 卸载
```
/usr/local/bin/k3s-uninstall.sh

/usr/local/bin/k3s-agent-uninstall.sh
```
