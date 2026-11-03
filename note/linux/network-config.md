---
title: 虚拟机配置网络
lastUpdated: 2024-01-11 14:13:23
---

## 查看网络
```
ip addr
```

## 配置网卡
```
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```
```
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.11.106
NETMASK=255.255.255.0
GATEWAY=192.168.11.1
```

```
vi /etc/resolv.conf
```
```
nameserver 114.114.114.114
```

## 重启网卡

```
systemctl restart network
```

## 验证

- 内网

```
ping 192.168.11.1
```

- 外网

```
ping www.baidu.com
```
