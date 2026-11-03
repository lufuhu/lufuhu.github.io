---
title: 树莓派设置Root密码
lastUpdated: 2024-01-11 14:34:30
---

树莓派 `Raspbian` 默认

- 账号：`pi`
- 密码：`raspberry`

> 可在raspi-config中修改

树莓派root用户默认是禁用状态，且没有密码，所以要先设置个密码，然后开启才能正常使用。

使用pi账户进行登陆命令行

- 设置root用户密码

```
sudo passwd root
```
- 开启root账户
```
sudo passwd --unlock root
```

- 切换root账号

```
su root
```

- 锁定root账号

```
sudo passwd --lock root
```
