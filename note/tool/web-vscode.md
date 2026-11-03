---
title: Web VSCode
lastUpdated: 2025-03-10 14:14:57
---

Visual Studio Code 网页版提供完全在浏览器中运行的免费零安装 Microsoft Visual Studio Code 体验.

GitHub: [https://github.com/coder/code-server](https://github.com/coder/code-server)

## 本地项目
访问: [https://vscode.dev/](https://vscode.dev/)，直接在 `web vscode` 中创建新的本地文件或项目、处理现有的本地项目（需要访问本地目录，有浏览器限制）.
## GitHub项目
直接拼接项目地址，访问可进入项目编辑.

[https://vscode.dev/github/{organization}/{repo}](https://vscode.dev/github/{organization}/{repo})

如: [https://vscode.dev/github/microsoft/vscode](https://vscode.dev/github/microsoft/vscode)
## 远程隧道
### 下载VSCodeCLI
[https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)


### 安装
```bash
tar -xvzf vscode_cli_alpine_x64_cli.tar.gz
```
### 使用
执行上一步解压目录中的 `code` 二进制文件
```
./code tunnel --accept-server-license-terms
```
根据提示进行注册.
### 访问
通过 `Tunnel名称` 进行访问
[https://vscode.dev/tunnel/{Tunnel名称}](https://vscode.dev/tunnel/{Tunnel名称})
