---
title: Puppeteer
description: 浏览器自动化工具集，支持网页截图、生成 PDF、表单自动填写、事件模拟等操作。
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  :styles="['/assets/iife/monaco-editor/index.css']"
  :scripts="['/assets/iife/monaco-editor/index.js', '/assets/iife/puppeteer/index.js']"
  :load="
    (scope) => {
      const elm = scope.window.document.getElementById('puppeteer-editor');
      const monaco = scope.window.MonacoEditor
      // register typescript
      monaco?.typescript?.typescriptDefaults.setDiagnosticsOptions({ noSyntaxValidation: false, noSemanticValidation: false })
      monaco?.typescript?.typescriptDefaults.addExtraLib(`declare type Browser = import('puppeteer-core').Browser;
declare module 'puppeteer-core' { ${scope.window.Puppeteer.PuppeteerRaw} }`,
        'file:///node_modules/puppeteer-core/index.d.ts',
      )
      scope.code = `// Execute script
export async function exec(browser: Browser) {
    const page = await browser.newPage()
    await page.goto('https://www.lufuhu.com/');
}`;
      // create editor
      const editor = monaco?.editor.create(elm, {
        value: scope.code,
        lineNumbers: 'off',
        theme: scope.isDark ? 'vs-dark' : 'vs',
        folding: false,
        automaticLayout: true,
        fixedOverflowWidgets: true,
        fontSize: 14,
        language: 'typescript',
        lineHeight: 22,
        extraEditorClassName: '',
        minimap: { enabled: false },
        overviewRulerBorder: false,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
        formatOnPaste: true,
        renderValidationDecorations: 'on',
      })
      editor.onDidChangeModelContent(() => {
        scope.code = editor?.getValue()
      })
      scope.changeTheme = (dark) => {
        monaco.editor.setTheme(dark ? 'vs-dark' : 'vs')
      }
      // connect puppeteer
      scope.webSocketDebuggerUrl = ''
      scope.running = false
      scope.connect = () => {
        scope.window.Puppeteer.connect(scope.webSocketDebuggerUrl)
        scope.running = true
      }
      scope.disconnect = () => {
        scope.window.Puppeteer.disconnect()
        scope.running = false
      }
      scope.exec = () => {
        scope.window.Puppeteer.exec(scope.code)
      }
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <div class="flex items-center gap-3">
        <Input v-model="scope.webSocketDebuggerUrl" placeholder="webSocketDebuggerUrl" class="w-80" />
        <a v-if="!scope.webSocketDebuggerUrl" href="#启用浏览器调试模式">
          <Button variant="outline">启用浏览器调试模式</Button>
        </a>
        <Button v-else-if="scope.running" variant="outline" @click="scope.disconnect">断开</Button>
        <Button v-else variant="outline" @click="scope.connect">链接</Button>
        <Button v-if="scope.running" variant="outline" @click="scope.exec">执行</Button>
      </div>
      <div id="puppeteer-editor" class="w-full h-[70vh] shadow-xs rounded-md" :class="{ 'h-[79vh]': scope.isMaximized }"></div>
    </Card>
  </template>
</IifeContainer>

[Puppeteer](https://pptr.dev/) 是 Google 官方维护的 Node.js 库，通过 [DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/) 控制基于 Chromium 内核的浏览器（Chrome、Edge 等），可用于：

- 网页自动化：表单提交、UI 测试、键盘输入等
- 爬虫：抓取 SPA（单页应用）渲染后的内容
- 生成页面截图和 PDF
- 性能分析与监控

- 官方文档：https://pptr.dev/
- API 参考：https://pptr.dev/api
- DevTools Protocol：https://chromedevtools.github.io/devtools-protocol/

本工具是通过 `puppeteer.connect` 连接到**已开启调试模式的本地浏览器**，在浏览器中执行 Puppeteer 代码。

### 启用浏览器调试模式

::: warning 注意
启动前必须**完全退出浏览器**（包括后台进程），否则新命令只会在已有实例中打开新标签页，调试参数会被忽略。可先执行 `taskkill /F /IM chrome.exe`（Edge 将进程名换成 `msedge.exe`）。
:::

返回格式 `ws://localhost:9222/devtools/browser/<id>` 的调试连接地址，填入上面的 `webSocketDebuggerUrl` 输入框，点击“链接”按钮即可连接浏览器。

#### Windows

::: code-group

```powershell [Chrome]
Start-Process chrome -ArgumentList '--remote-debugging-port=9222', "--user-data-dir=$PWD\chrome-user-data", '--remote-allow-origins=*'
(curl http://localhost:9222/json/version | ConvertFrom-Json).webSocketDebuggerUrl
```

```powershell [Edge]
Start-Process msedge -ArgumentList '--remote-debugging-port=9222', "--user-data-dir=$PWD\edge-user-data", '--remote-allow-origins=*'
(curl http://localhost:9222/json/version | ConvertFrom-Json).webSocketDebuggerUrl
```

:::

#### Mac

::: code-group

```sh [Chrome]
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir="$PWD/chrome-user-data" --remote-allow-origins="*"
curl -s http://localhost:9222/json/version | grep -o '"webSocketDebuggerUrl": *"[^"]*"'
```

```sh [Edge]
/Applications/Microsoft\ Edge.app/Contents/MacOS/Microsoft\ Edge --remote-debugging-port=9222 --user-data-dir="$PWD/edge-user-data" --remote-allow-origins="*"
curl -s http://localhost:9222/json/version | grep -o '"webSocketDebuggerUrl": *"[^"]*"'
```

:::

#### Linux

::: code-group

```sh [Chrome]
google-chrome --remote-debugging-port=9222 --user-data-dir="$PWD/chrome-user-data" --remote-allow-origins="*"
curl -s http://localhost:9222/json/version | grep -o '"webSocketDebuggerUrl": *"[^"]*"'
```

```sh [Edge]
microsoft-edge --remote-debugging-port=9222 --user-data-dir="$PWD/edge-user-data" --remote-allow-origins="*"
curl -s http://localhost:9222/json/version | grep -o '"webSocketDebuggerUrl": *"[^"]*"'
```

:::