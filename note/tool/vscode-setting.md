---
title: VSCode 配置说明
lastUpdated: 2025-03-10 14:25:28
---

```json
{
    // 文件搜索的过滤
    "search.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/node_modules": true,
        "**/bower_components": true,
        "dist/": true,
        "build/": true,
        "temp/": true,
        "library/": true,
        "**/dist": true,
        "**/*.anim": true
    },
    // 文件搜索的过滤
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.DS_Store": true,
        "**/*.meta": true,
        "library/": true,
        "local/": true,
        "temp/": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/dist": true
    },
    // 缩略图是否显示
    "editor.minimap.enabled": true,
    // 缩略图是否比例
    "editor.minimap.scale": 1,
    // 缩略图大小
    "editor.minimap.size": "fit",
    // 缩略图渲染实际字体而不是色块
    "editor.minimap.renderCharacters": true,
    // 缩略图何时显示滑块
    "editor.minimap.showSlider": "always",
    // 缩略图宽度
    "editor.minimap.maxColumn": 46,
    // 缩略图在左或右：left | right
    "editor.minimap.side": "left",
    // 启用/禁用 JavaScript 验证。
    "javascript.validate.enable": true,
    "editor.fontFamily": "Courier New",
    // 关闭 vscode 默认的检查工具
    "html.validate.scripts": false,
    "scss.lint.duplicateProperties": "error",
    "css.lint.duplicateProperties": "error",
    "less.lint.zeroUnits": "error",
    /* prettier的配置 */
    "prettier.printWidth": 120, // 超过最大值换行
    "prettier.tabWidth": 2, // 缩进字节数
    "prettier.useTabs": true, // 缩进使用tab
    "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    "prettier.arrowParens": "avoid", // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
    "prettier.htmlWhitespaceSensitivity": "ignore",
    "prettier.ignorePath": ".prettierignore", // Require a "prettierconfig" to format prettier
    "prettier.trailingComma": "none", // 在对象或数组最后一个元素后面是否加逗号
    // 指定赋值操作符的对齐方式。  "left" | "right"
    "alignment.operatorPadding": "left",
    // 控制通过 Quick Open 打开的编辑器是否显示为预览编辑器
    "workbench.editor.enablePreviewFromQuickOpen": false,
    "workbench.startupEditor": "none",
    // 控制工作台底部状态栏的可见性。
    "workbench.statusBar.visible": true,
    // 控制为工作台项显示悬停之前的延迟时间(以毫秒为单位)
    "workbench.hover.delay": 100,
    // 控制在编辑器组中垂直或水平拆分编辑器时的布局。
    "workbench.editor.splitInGroupLayout": "vertical",
    // git是否启用自动拉取
    "git.autofetch": true,
    // 以下为stylus配置
    "path-intellisense.mappings": {
        "@": "${workspaceRoot}/src",
        "~": "${workspaceRoot}/src",
        "src": "${workspaceRoot}/src"
    },
    //path-intellisense插件(js路径感知插件)
    "path-intellisense.extensionOnImport": true,
    "editor.foldingMaximumRegions": 10000,
    "editor.unicodeHighlight.ambiguousCharacters": false,
    "editor.detectIndentation": false, // vscode默认启用了根据文件类型自动设置tabsize的选项
    "explorer.confirmUndo": "verbose",
    "security.workspace.trust.untrustedFiles": "open",
    "javascript.updateImportsOnFileMove.enabled": "always",
    "todo-tree.highlights.highlightDelay": 50,
    "testing.autoRun.delay": 500,
    "vsicons.dontShowNewVersionMessage": true,
    "editor.quickSuggestionsDelay": 50,
    "editor.hover.delay": 500,
    "explorer.confirmDelete": false,
    "editor.guides.indentation": false,
    "editor.guides.highlightActiveIndentation": false,
    "files.autoSaveDelay": 20,
    "workbench.localHistory.mergeWindow": 1,
    "editor.guides.bracketPairs": true,
    "explorer.confirmDragAndDrop": false,
    "window.doubleClickIconToClose": true,
    "html.format.templating": true,
    /* eslint的配置 */
    "eslint.enable": true,
    "eslint.run": "onSave",
    "settingsSync.ignoredSettings": ["editor.formatOnSave"],
    "scm.diffDecorationsGutterPattern": {
        "added": true
    },
    "files.trimTrailingWhitespace": true,
    "editor.fontSize": 15,
    "workbench.colorTheme": "GitHub Dark Default",
    "workbench.editor.scrollToSwitchTabs": true,
    "workbench.editor.highlightModifiedTabs": true,
    "workbench.editor.tabSizingFixedMaxWidth": 200,
    "workbench.editor.wrapTabs": true,
    // 自定义的颜色
    "editor.tokenColorCustomizations": {
        "comments": "#619549" // 注释
    },
    "debug.javascript.resourceRequestOptions": {},
    "workbench.preferredHighContrastColorTheme": "Red",
    "workbench.editor.tabCloseButton": "left",
    "terminal.integrated.tabs.defaultIcon": "symbol-folder",
    "editor.fontLigatures": false,
    "diffEditor.ignoreTrimWhitespace": false,
    "launch": {
        "configurations": [],
        "compounds": []
    },
    "go.formatTool": "goimports", //golang格式化工具
    "editor.defaultFormatter": "esbenp.prettier-vscode", //编辑器格式化工具
    "editor.insertSpaces": false,
    "workbench.editor.enablePreview": false, //打开文件不覆盖
    // "workbench.editor.enablePreview": true, // 是否显示为预览编辑器
    // "files.autoSave": "off", // 编辑自动保存afterDelay
    "files.autoSave": "onFocusChange", // 光标离开即保存代码
    "editor.lineNumbers": "on", //开启行数提示
    "editor.quickSuggestions": {
        //开启自动显示建议
        "other": true,
        "comments": true,
        "strings": true
    },
    "eslint.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "prettier.eslintIntegration": true, //让prettier使用eslint的代码格式进行校验
    "prettier.semi": true, // 是否去掉代码结尾的分号
    "prettier.singleQuote": true, // 使用单引号代替双引号
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true, //让函数(名)和后面的括号之间加个空格
    "vetur.format.defaultFormatter.html": "js-beautify-html", //格式化.vue中html
    "vetur.format.defaultFormatter.js": "vscode-typescript", //让vue中的js按编辑器自带的ts格式进行格式化
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "force-aligned" //属性强制折行对齐
        },
        "prettier": {
            "semi": false,
            "singleQuote": true
        },
        "vscode-typescript": {
            "semi": false,
            "singleQuote": true
        }
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true,
    "vetur.ignoreProjectWarning": true,
    "git.autorefresh": false,
    "typescript.preferences.quoteStyle": "single",
    "prettier.requireConfig": false,
    "vue.autoInsert.dotValue": true,
    "vue.format.script.initialIndent": true,
    "vue.format.style.initialIndent": true,
    "vue.inlayHints.inlineHandlerLeading": true,
    "vue.inlayHints.missingProps": true,
    "vue.inlayHints.optionsWrapper": true,
    "vue.inlayHints.vBindShorthand": true,
    "vue.server.petiteVue.supportHtmlFile": true,
    "vue.splitEditors.icon": true,
    "vue.server.vitePress.supportMdFile": true,
    "vue.updateImportsOnFileMove.enabled": true,
    "prettier.bracketSameLine": true,
    "prettier.enableDebugLogs": true,
    "prettier.insertPragma": true,
    "javascript.inlayHints.functionLikeReturnTypes.enabled": true,
    "javascript.inlayHints.parameterTypes.enabled": true,
    "javascript.inlayHints.propertyDeclarationTypes.enabled": true,
    "javascript.inlayHints.variableTypes.enabled": true,
    "git.enableSmartCommit": true,
    "[dotenv]": {
        "editor.defaultFormatter": "foxundermoon.shell-format"
    },
    "notebook.formatOnSave.enabled": true,
    "editor.fontVariations": false,
    /* 每种语言默认的格式化规则 */
    "[scss]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
        "editor.defaultFormatter": "Wscats.vue"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[php]": {
        "editor.defaultFormatter": "bmewburn.vscode-intelephense-client"
    },
    "[xml]": {
        "editor.defaultFormatter": "DotJoshJohnson.xml"
    },
    "[sql]": {
        "editor.defaultFormatter": "inferrinizzard.prettier-sql-vscode"
    },
    "[python]": {},
    "[oraclesql]": {
        "editor.defaultFormatter": "Oracle.oracledevtools"
    },
    "eslint.options": {
        "extensions": [".js", ".vue", ".ts", ".tsx"]
    },
    // 添加vue支持
    "eslint.validate": [
        "php",
        "vue",
        "html",
        "javascript",
        "graphql",
        "javascriptreact",
        "json",
        "typescript",
        "typescriptreact",
        "vue-html"
    ],
    "eslint.format.enable": true,
    // vscode保存就自动格式化的功能
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    /** 配置文件关联，指定文件的类型按体积样式格式化？ */
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript",
        "*.nvue": "vue"
    },
    "editor.formatOnSave": true, // 每次保存自动格式化
    "editor.tabSize": 2, //制表符符号eslint
    "editor.formatOnType": true,
    "javascript.format.enable": false,
    "workbench.iconTheme": "vscode-icons", //vscode文件图标主题
    "backgroundCover.imagePath": "d:\\360downloads\\upload.jpg",
    "search.followSymlinks": false, //关闭快速预览
    "backgroundCover.opacity": 0.5,
    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe", //默认终端shell
    // "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe", //默认终端shell
    "typescript.updateImportsOnFileMove.enabled": "always",
    "[markdown]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "markdownlint.config": {
        "default": true,
        "no-hard-tabs": false,
        "no-inline-html": false,
        "first-line-heading": false,
        "heading-increment": false,
        "no-bare-urls": false
    }
}
```
