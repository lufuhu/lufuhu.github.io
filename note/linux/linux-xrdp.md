---
title: linux 安装 xRDP
lastUpdated: 2023-12-21 09:33:09
---

- 安装xRDP及vncserver
```sh
sudo apt-get -y install xrdp
sudo apt-get -y install vnc4server tightvncserver
```
- 安装Xfce桌面环境
> 由于xRDP不支持最新的gnome桌面，因此可以安装更为轻便的Xfce桌面
```sh
sudo apt-get -y install xubuntu-desktop
```
- 设置xRDP
```sh
echo xfce4-session >~/.xsession
```
- 设置配置文件
```js
sudo vim /etc/xrdp/startwm.sh
```
在. /etc/X11/Xsession 前一行插入
```
xfce4-session
```
- 重启 xrdp
```sh
sudo service xrdp restart
```
- 做桌面共享权限设置
打开【桌面共享首选项】，选中所有 `共享权限`
