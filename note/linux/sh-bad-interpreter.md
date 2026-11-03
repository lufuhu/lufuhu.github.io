---
title: Windows编写的sh脚本在Linux上运行失败
lastUpdated: 2023-11-23 18:19:23
---

### 问题
```
bin/sh^M: bad interpreter: No such file or directory
```

### 原因
`.sh`脚本在`windows`系统下用记事本文件编写的。不同系统的编码格式引起的。

### 解决
> 修改`.sh`文件格式
 
- 使用vi工具
```
vi test.sh
```
- 利用如下命令查看文件格式 
```
:set ff 或 :set fileformat
``` 
> 可以看到如下信息 
```
fileformat=dos 或 fileformat=unix 
```
- 利用如下命令修改文件格式 
```
:set ff=unix 或 :set fileformat=unix 
```
- 保存退出
```
:wq
```
> 注：其实，在windows下通过git bash可以直接编写unix格式.sh！
