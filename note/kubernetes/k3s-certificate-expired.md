---
title: K3s 证书过期问题
lastUpdated: 2024-01-11 14:34:04
---

## 问题
```
Unable to connect to the server: x509: certificate has expired or is not yet valid: current time 2019-02-03T07:40:33+08:00 is before 2022-03-10T09:56:33Z
```
## 原因
报错提示很明显，证书已过期或尚未生效.

上面报错：主机时间 `2019-02-03`，证书时间 `2022-03-10`，主机时间与证书时间不匹配，导致证书不生效.
## 处理

1. 修改主机时间

```
date -s 20220316	// 修改日期
date -s 17:11:00	// 修改时间
clock --systohc		// 把系统时间回存到硬件时钟
```
2. 删除 `K3s` 证书

```
rm -fr /var/lib/rancher/k3s/server/tls
```

> `K3s` 会自动创建证书，删除所有的证书后，`K3s` 重启时会根据当前时间再次创建证书.

3. 重启 `K3s`

```
systemctl start k3s
```
4. 验证，查看 `K3s` 证书过期时间

```
for i in `ls /var/lib/rancher/k3s/server/tls/*.crt`; do echo $i; openssl x509 -enddate -noout -in $i; done
```
