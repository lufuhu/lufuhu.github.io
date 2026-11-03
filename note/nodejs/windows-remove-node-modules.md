---
title: Windows 删除文件夹内所有 node_modules
lastUpdated: 2024-01-11 14:30:22
---

项目太多需要清理 `node_modules` 文件，使用下面命令，自动清理所有 `node_modules` 文件。
```
FOR /d /r . %d in (node_modules) DO @IF EXIST "%d" rd /s /q "%d"
```
