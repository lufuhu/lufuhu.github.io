---
title: 树莓派网络配置
lastUpdated: 2024-01-11 14:33:40
---

## 查看网络
ifconfig

## 配置网卡
```
sudo nano /etc/network/interface
或者
sudo nano /etc/networking/interface
```
```
auto eth0
iface eth0 inet static
address 192.168.33.210
gateway 192.168.33.1
netmask 255.255.255.0
```

```
sudo nano /etc/resolv.conf
```
```
nameserver 114.114.114.114
```

## 重启网卡
```
sudo service networking restart
```

## 验证
```
// 内网
ping 192.168.33.1
// 外网
ping www.baidu.com
```
