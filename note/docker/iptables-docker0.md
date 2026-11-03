---
title: iptables规则限制docker访问外网
lastUpdated: 2023-11-23 18:12:55
---

- 查看所有规则
```
iptables -t nat -S
```
> 规则 `-A POSTROUTING -s 172.17.0.0/16 ! -o docker0 -j MASQUERADE`：来自 172.17.0.0/16 网段的包，目标地址是外网（! -o docker0），就把它交给 MASQUERADE 处理。而 MASQUERADE 的处理方式是将包的源地址替换成 host 的地址发送出去，即做了一次网络地址转换（NAT）

- 查看POSTROUTING
```
iptables -t nat -vnL POSTROUTING --line-number
```
- 删除
```
iptables -t nat -A POSTROUTING -s 172.17.0.0/16 ! -o docker0 -j MASQUERADE
```
- 添加
```
iptables -t nat -D POSTROUTING -s 172.17.0.0/16 ! -o docker0 -j MASQUERADE
```
