---
sidebar: false
aside: false
pageClass: container-page container-columns
---

::: masonry
## 框架无关的插件
- [`@storybook/builder-vite`](https://github.com/storybookjs/storybook/tree/next/code/builders/builder-vite/) - Storybook 构建器。
- [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) - 旧版浏览器支持。
- [`vitest`](https://github.com/vitest-dev/vitest) - 一个 Vite 原生的测试框架。
- [@builder.io/partytown](https://github.com/BuilderIO/partytown) - 将资源密集型的第三方脚本从主线程迁移到 Web Worker 中。
- [unplugin-icons](https://github.com/antfu/unplugin-icons) - 以组件形式访问数千个图标。
- [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) - 零配置 PWA。
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - 按需自动导入 API。
- [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation) - 支持模块联邦，灵感来自 Webpack 模块联邦特性。
- [vite-plugin-inspect](https://github.com/antfu/vite-plugin-inspect) - 检查 Vite 插件的中间状态。
- [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) - 支持 TypeScript 的路径映射。
- [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts) - 从 `.ts` 或 `.vue` 源文件为库生成声明文件。
- [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker) - 在 worker 线程中快速运行检查器（TypeScript/VLS/vue-tsc 等），并提供覆盖层和终端提示。
- [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) - 将所有 JavaScript 和 CSS 资源直接内联到最终的 `dist/index.html` 文件中。
- [vite-imagetools](https://github.com/JonasKruckenberg/vite-imagetools) - 使用 URL 查询参数加载和转换图像。
- [vite-plugin-node](https://github.com/axe-me/vite-plugin-node) - 与 Node.js 后端服务器集成。
- [remix-development-tools](https://github.com/forge42dev/Remix-Dev-Tools) - 用于 Remix.run 开发工具的插件。
- [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron) - 集成 Vite 和 Electron。
- [`module-federation/vite`](https://github.com/module-federation/vite) - 官方 Module Federation 集成，支持动态远程模块加载。
- [vite-plugin-windicss](https://github.com/windicss/vite-plugin-windicss) - Windi CSS 集成。
- [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert) - 提供 https 开发服务器证书。
- [vite-plugin-turbo-console](https://github.com/yuyinws/vite-plugin-turbo-console) - 增强 `console.log()` 的可读性。
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - 在 `index.html` 中最小化并使用 ejs 模板语法的插件。
- [vite-plugin-web-update-notification](https://github.com/GreatAuk/plugin-web-update-notification) - 检测网页更新并通知用户重新加载，支持 Vite 和 umijs。
- [vite-plugin-image-optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer) - 在构建时使用 Sharp.js 和 SVGO 优化（压缩）图片资源。
- [vite-plugin-css-injected-by-js](https://github.com/marco-prontera/vite-plugin-css-injected-by-js) - 获取 CSS 并通过 JS 将其添加到页面中。
- [vite-bundle-analyzer](https://github.com/nonzzz/vite-bundle-analyzer) - 将包表示为交互式树图的工具。
- [vite-plugin-watch-and-run](https://github.com/jycouet/kitql/tree/main/packages/vite-plugin-watch-and-run) - 监听某些文件（glob）并触发命令，使任何工具都能拥有监听模式。
- [vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy) - 复制文件和文件夹。
- [unplugin-fonts](https://github.com/cssninjaStudio/unplugin-fonts) - 从 Typekit、Google Fonts、Fontsource 或自定义字体加载字体。
- [vite-plugin-glsl](https://github.com/UstymUkhman/vite-plugin-glsl) - 导入着色器文件块。
- [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) - 为浏览器环境填充 Node 的核心模块。
- [vite-plugin-chunk-split](https://github.com/sanyuan0704/vite-plugin-chunk-split) - 自动代码分割，支持生产环境下的 unbundle。
- [vite-plugin-webfont-dl](https://github.com/feat-agency/vite-plugin-webfont-dl) - 下载并注入 Web 字体（Google Fonts）以提升网站性能。
- [vite-compression-plugin](https://github.com/XeryYue/vite-compression-plugin) - 使用 Node.js 流将文件压缩为 gzip 或更多格式。
- [vite-plugin-bundle-obfuscator](https://github.com/z0ffy/vite-plugin-bundle-obfuscator) - JavaScript 混淆器。
- [vite-plugin-tauri](https://github.com/amrbashir/vite-plugin-tauri) - 在 Vite 项目中集成 Tauri，以构建跨平台应用。
- [vite-plugin-cesium](https://github.com/nshen/vite-plugin-cesium) - 与 Cesium 库集成。
- [@import-meta-env/unplugin](https://github.com/runtime-env/import-meta-env) - 在构建应用后将环境变量注入 `import.meta.env` 对象，而不是在生产期间静态替换。
- [vite-plugin-wasm-pack](https://github.com/nshen/vite-plugin-wasm-pack) - 以简单方式集成 Rust [wasm-pack](https://github.com/rustwasm/wasm-pack)。
- [vitest-mock-extended](https://github.com/eratio08/vitest-mock-extended) - Vitest 的类型安全模拟扩展。
- [unplugin-imagemin](https://github.com/ErKeLost/unplugin-imagemin) - 基于 squoosh 和 sharp 的高性能压缩图片。
- [vite-plugin-mock-dev-server](https://github.com/pengzhanbo/vite-plugin-mock-dev-server) - 用于开发的 Mock 服务器，支持 CJS/ESM/JSON，自动导入文件并支持 HMR。
- [vite-plugin-comlink](https://github.com/mathe42/vite-plugin-comlink) - 使用 WebWorkers 并借助 [Comlink](https://github.com/GoogleChromeLabs/comlink) 的力量，让它们更易用。
- [vite-plugin-validate-env](https://github.com/Julien-R44/vite-plugin-validate-env) - 在构建时验证环境变量，再也不遗漏环境变量。
- [vite-plugin-qrcode](https://github.com/svitejs/vite-plugin-qrcode) - 服务器启动时显示二维码。
- [vite-plugin-restart](https://github.com/antfu/vite-plugin-restart) - 文件变化时重启 Vite 服务器。
- [vite-aliases](https://github.com/subwaytime/vite-aliases) - 基于项目结构自动生成别名。
- [vite-plugin-handlebars](https://github.com/alexlafroscia/vite-plugin-handlebars) - 使用 Handlebars 处理 HTML 文件。
- [@responsive-image/vite-plugin](https://github.com/simonihmig/responsive-image) - 转换并生成优化的响应式图片（WebP、AVIF）及 LQIP 占位符，供图片组件使用。
- [vite-plugin-remove-console](https://github.com/xiaoxian521/vite-plugin-remove-console) - 一个在生产环境中删除 console.log 的 Vite 插件。
- [vite-plugin-radar](https://github.com/stafyniaksacha/vite-plugin-radar) - 一体化分析加载器（支持 7+ 提供商）。
- [vite-plugin-icons-spritesheet](https://github.com/forge42dev/vite-plugin-icons-spritesheet) - 通过监听图标文件夹变化，从 SVG 图标生成精灵图和 TypeScript 类型。
- [vite-plugin-full-reload](https://github.com/ElMassimo/vite-plugin-full-reload) - 文件变化时重新加载浏览器。
- [vitawind](https://github.com/huibizhang/vitawind) - 自动安装和配置 Tailwind CSS。
- [vite-plugin-entry-shaking](https://github.com/Dschungelabenteuer/vite-plugin-entry-shaking) - 在开发模式下从入口文件导入代码时模拟 tree-shaking 行为。
- [vite-plugin-virtual-mpa](https://github.com/emosheeep/vite-plugin-virtual-mpa) - 开箱即用的 MPA 插件，支持 HTML 模板引擎和虚拟文件，仅用一个模板生成多个文件。
- [vite-plugin-commonjs](https://github.com/vite-plugin/vite-plugin-commonjs) - CommonJs 的纯 JavaScript 实现。
- [@laynezh/vite-plugin-lib-assets](https://github.com/laynezh/vite-plugin-lib-assets) - 提取 `library mode` 中引用的资源文件，而不是将其作为 base64 嵌入。
- [vite-plugin-sass-dts](https://github.com/activeguild/vite-plugin-sass-dts) - 这是一个插件，在使用 CSS 模块类型安全时自动创建类型文件。
- [rollup-plugin-critical](https://github.com/nystudio107/rollup-plugin-critical) - 生成关键 CSS。
- [vite-plugin-content](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-content) - 将 `yaml`、`xml`、`ini`、`toml`、`csv`、`plist` 和 `properties` 文件转换为 ES6 模块。
- [vite-plugin-global-style](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-global-style) - 处理 CSS、SASS、LESS 和 Stylus 的全局样式。
- [vite-plugin-vitepress-auto-sidebar](https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar) - 基于 vitepress，通过扫描目录自动生成侧边栏数据。
- [@spiriit/vite-plugin-svg-spritemap](https://github.com/SpiriitLabs/vite-plugin-svg-spritemap) - 将 SVG 文件打包到一个雪碧图文件中，并通过 `<svg>`/`<img>` 及 CSS 直接使用。
- [unplugin-info](https://github.com/yjl9903/unplugin-info) - 将构建信息导出为虚拟模块。
- [cypress-vite](https://github.com/mammadataei/cypress-vite) - 使用 Vite 运行 Cypress 规范。
- [vite-plugin-csp-guard](https://github.com/RockiRider/csp/tree/main/packages/vite-plugin-csp-guard) - 允许为你的项目配置内容安全策略，支持所有指令和哈希。
- [vite-plugin-cp](https://github.com/fengxinming/vite-plugins/tree/main/packages/vite-plugin-cp) - 在构建 bundle 后复制文件。
- [vite-plugin-external](https://github.com/fengxinming/vite-plugins/tree/main/packages/vite-plugin-external) - 提供一种将依赖从运行时代码和输出包中排除的方式。
- [vite-plugin-mock-data](https://github.com/fengxinming/vite-plugins/tree/main/packages/vite-plugin-mock-data) - 提供一种简单的 mock 数据方式。
- [vite-plugin-reverse-proxy](https://github.com/fengxinming/vite-plugins/tree/main/packages/vite-plugin-reverse-proxy) - 有时我们需要在生产环境重定向脚本以调试和解决问题，该插件会将脚本从 `text/javascript` MIME 类型转换为 `module` MIME 类型。
- [vite-plugin-live-reload](https://github.com/arnoson/vite-plugin-live-reload) - 实时重新加载。
- [@tomjs/vite-plugin-vscode](https://github.com/tomjs/vite-plugin-vscode) - 轻松使用 Web 框架开发 `VSCode Extension` 的 `Webview`，并支持 `HMR` 和 `Debug`。
- [vite-plugin-browser-sync](https://github.com/Applelo/vite-plugin-browser-sync) - BrowserSync。
- [vite-plugin-version-mark](https://github.com/ZhongxuYang/vite-plugin-version-mark) - 自动使用 `package version` / `git commit` / `custom` 作为项目版本唯一标识符插入到项目中。
- [vite-plugin-lqip](https://github.com/drwpow/vite-plugin-lqip) - 生成低质量图像占位符（LQIP）。
- [vite-plugin-mpa-plus](https://github.com/yzydeveloper/vite-plugin-mpa-plus) - 更灵活的 MPA（多页应用）支持 HTML 模板、路径重写。
- [vite-plugin-html-inject](https://github.com/donnikitos/vite-plugin-html-inject) - 将 `index.html` 拆分为更小的可复用片段。
- [vite-plugin-vconsole](https://github.com/vadxq/vite-plugin-vconsole) - 帮助开发者使用 vconsole 便捷地进行移动端开发与调试。
- [vite-plugin-require](https://github.com/wangzongming/vite-plugin-require) - 一个通过代码转换支持 `require` 的 Vite 插件。
- [vite-plugin-conditional-compile](https://github.com/KeJunMao/vite-plugin-conditional-compile) - 基于环境变量的条件编译语法。
- [unplugin-detect-duplicated-deps](https://github.com/tjx666/unplugin-detect-duplicated-deps) - 检测重复的打包依赖。
- [vite-plugin-cdn2](https://github.com/nonzzz/vite-plugin-cdn) - 将模块替换为 CDN。
- [vite-plugin-php](https://github.com/donnikitos/vite-plugin-php) - 加载并处理 PHP 入口文件，而非默认的 index.html。
- [vite-plugin-dynamic-base](https://github.com/chenxch/vite-plugin-dynamic-base) - 解析所有资源文件的动态 publicPath。
- [vite-plugin-doctest](https://github.com/ssssota/doc-vitest) - Vitest 的文档测试。
- [vite-plugin-jspm](https://github.com/jspm/vite-plugin-jspm) - 使用 import maps 和 es-module-shims 从 CDN 提供商独立解析依赖。
- [vite-plugin-biome](https://github.com/skrulling/vite-plugin-biome) - Biome 代码检查器。
- [vite-plugin-virtual-html](https://github.com/Windson1806/vite-plugin-virtual-html) - 使 Vite MPA 与 `@vue/cli` 保持一致。
- [vite-plugin-legacy-swc](https://github.com/CyanSalt/vite-plugin-legacy-swc) - 通过 SWC 支持旧版浏览器。
- [vite-plugin-no-bundle](https://github.com/ManBearTM/vite-plugin-no-bundle) - 生成 unbundled 代码，用于原生 ESM 或其他打包器。
- [vite-plugin-babel](https://github.com/owlsdepartment/vite-plugin-babel) - 为构建和服务器提供 Babel 集成，以支持纯 JS/JSX 文件中的装饰器或类字段等特性。
- [vite-preload](https://github.com/wille/vite-preload) - 使用 103 Early Hints、Link 头或 link 标签预加载服务器渲染的懒加载模块和样式表。
- [vite-plugin-mock-server](https://github.com/enjoycoding/vite-plugin-mock-server) - Mock 服务器插件，支持使用 TS 和 JS 编写 Mock API 并支持 HMR。
- [vite-plugin-cloudflare-functions](https://github.com/yjl9903/vite-plugin-cloudflare-functions) - Cloudflare Pages 函数集成。
- [vite-plugin-minipic](https://github.com/60late/vite-plugin-minipic) - 高效的图片压缩工具。
- [vite-plugin-tips](https://github.com/yingpengsha/vite-plugin-tips) - 在页面上提供更好的开发服务器状态提示。
- [vite-plugin-svg-spritemap](https://github.com/g-makarov/vite-plugin-svg-spritemap) - 从多个 .svg 文件生成 SVG 雪碧图。
- [vite-plugin-oxlint](https://github.com/52-entertainment/vite-plugin-oxlint) - Oxlint 代码检查器。
- [vite-plugin-eslint2](https://github.com/ModyQyW/vite-plugin-eslint2) - 同步/异步运行 ESLint。
- [vite-plugin-optimize-css-modules](https://github.com/Simonwep/vite-plugin-optimize-css-modules) - 使用 CSS-Modules 时生成尽可能小的 CSS 类名。
- [@froxz/vite-plugin-s3](https://github.com/Froxz/vite-plugin-s3) - 允许你将文件上传到 S3。
- [vite-plugin-deadfile](https://github.com/stauren/vite-plugin-deadfile) - 查找项目中未使用的源文件。
- [genaicode/vite-plugin](https://github.com/gtanczyk/genaicode/tree/master/src/vite-genaicode/) - 将 AI 编码助手嵌入应用 UI 的插件。
- [vite-plugin-ali-oss](https://github.com/xiaweiss/vite-plugin-ali-oss) - 将项目中打包的生产文件上传到阿里 OSS，但 HTML 除外。
- [vite-plugin-optimizer](https://github.com/vite-plugin/vite-plugin-optimizer) - 手动预打包。
- [vite-plugin-pug-transformer](https://github.com/TheSeally/vite-plugin-pug-transformer) - 支持 Pug 模板引擎。
- [css-media-splitter/vite-plugin](https://github.com/levchak0910/css-media-splitter) - 将所有 `@media` At-rules 提取到专门的 `.css` 文件中，并仅在匹配媒体查询时下载。
- [vite-plugin-api](https://github.com/yracnet/vite-plugin-api) - 从目录树生成 API 路由服务的路由映射。
- [vite-plugin-api-routes](https://github.com/yracnet/vite-plugin-api-routes) - 从目录树生成 API 路由服务的路由映射。
- [vite-plugin-zip-pack](https://github.com/7th-Cyborg/vite-plugin-zip-pack) - 将分发/构建文件夹打包为 zip 文件。
- [vite-plugin-html-injection](https://github.com/altrusl/vite-plugin-html-injection) - 将 HTML、JavaScript 和 CSS 代码片段注入到 `index.html` 中。
- [vite-plugin-magic-preloader](https://github.com/cszhjh/vite-plugin-magic-preloader) - 通过魔法注释生成 `<link rel="prefetch" />` 或 `<link rel="preload" />` 标签，并将其注入到 `index.html` 中。
- [`@poyro/vitest`](https://github.com/poyro/poyro) - 使用 Vitest 测试 LLM 集成。
- [unplugin-inject-preload](https://github.com/Applelo/unplugin-inject-preload) - 根据构建资源向 `index.html` 注入 `<link rel="preload">`。
- [vite-plugin-pagefind](https://github.com/Hugos68/vite-plugin-pagefind) - 集成 `pagefind` 搜索。
- [vite-plugin-svgo](https://github.com/r3dDoX/vite-plugin-svgo) - 将 SVG 作为纯字符串加载，并使用 SVGO 库进行转换。
- [vite-plugin-imagemin](https://github.com/vHeemstra/vite-plugin-imagemin) - 优化并压缩图片资源，并可选择生成 WebP/AVIF。
- [vite-plugin-ngrok](https://github.com/aphex/vite-plugin-ngrok) - 与 Ngrok 集成，轻松共享本地开发服务器。
- [unplugin-auto-export](https://github.com/coderhyh/unplugin-auto-export) - 自动维护 index.ts 文件中的导出语句。
- [vite-plugin-multi-pages](https://github.com/Miofly/vite-plugin-multi-pages) - 多页面支持，可构建 src/pages 任意页面，可设置前缀名。
- [vite-plugin-llms](https://github.com/saschaseniuk/vite-plugin-llms) - 集成 llms.txt 规范，支持在应用路由旁提供 AI 优化内容。
- [vite-plugin-cem](https://github.com/Kamiapp-fr/vite-plugin-cem) - 生成 `custom-elements.json` 清单以描述自定义元素。
- [vite-plugin-shared-modules](https://github.com/zheeeng/vite-plugin-shared-modules) - 在 monorepo 中共享 node_modules。
- [vite-plugin-stylelint](https://github.com/ModyQyW/vite-plugin-stylelint) - 同步/异步运行 Stylelint。
- [vite-multiple-assets](https://github.com/nguyenbatranvan/vite-multiple-assets) - 添加对多个公共资源目录的支持。
- [vite-plugin-vitest-cache](https://github.com/raegen/vite-plugin-vitest-cache) - 通过缓存优化 `Vitest` 执行时间。
- [vite-plugin-html-template-mpa](https://github.com/Miofly/vite-plugin-html-template-mpa) - 多页面通用模板支持。
- [unplugin-config](https://github.com/kirklin/unplugin-config) - Web 应用配置文件生成器，允许外部自定义全局变量而无需重新打包。
- [vite-plugin-css-export](https://github.com/shixuanhong/vite-plugin-css-export) - 将 CSS 变量导出到 JavaScript，并支持嵌套规则。
- [vite-plugin-dev-manifest](https://github.com/owlsdepartment/vite-plugin-dev-manifest) - 在开发服务器期间生成 `manifest.dev.json`，用于与任何语言/框架的后端集成。
- [vite-plugin-vitepress-auto-nav](https://github.com/Xaviw/vite-plugin-vitepress-auto-nav) - 基于 VitePress，通过扫描目录自动生成 `sidebar` 和 `nav` 配置。
- [vite-plugin-babel-compiler](https://github.com/yzydeveloper/vite-plugin-babel-compiler) - 该插件与 Babel 编译器配合使用。
- [vite-plugin-i18n-detector](https://github.com/hemengke1997/vite-plugin-i18n-detector) - 懒加载 i18n 语言资源。
- [vite-awesome-svg-loader](https://github.com/matafokka/vite-awesome-svg-loader) - 将 SVG 作为源代码、base64 和数据 URI 导入。保留描边宽度，将颜色替换为 currentColor。使用 SVGO 优化 SVG。创建 SVG 雪碧图。
- [vite-plugin-ts-nameof](https://github.com/Shinigami92/vite-plugin-ts-nameof) - 能够在 TypeScript 中解析 [nameof](https://github.com/dsherret/ts-nameof)。
- [@mistjs/vite-plugin-px2viewport](https://github.com/aibayanyu20/vite-plugins/tree/main/packages/px2viewport) - 自动将内联样式和样式文件中的 px 单位转换为 vw 单位的插件。
- [@vituum/vite-plugin-twig](https://github.com/vituum/vite-plugin-twig) - 支持 Twig 模板引擎，将 `.twig` 模板转换为 `.html`。
- [unplugin-generate-component-name](https://github.com/CCherry07/unplugin-generate-component-name) - 自动生成组件名称。
- [vite-plugin-native](https://github.com/vite-plugin/vite-plugin-native) - 支持 Node/Electron C/C++ 原生插件。
- [vite-plugin-zip-file](https://github.com/Ssis53/vite-plugin-zip) - 将文件或文件夹压缩为 zip。
- [vite-plugin-bundle-prefetch](https://github.com/dreambo8563/vite-plugin-bundle-prefetch) - 将预取资源注入 `index.html`。
- [vite-plugin-robots](https://github.com/kolirt/vite-plugin-robots) - 生成 `robots.txt`。
- [vite-plugin-typescript-transform](https://github.com/herberttn/vite-plugin-typescript-transform) - 在 Vite 的 transform 构建阶段应用 TypeScript 编译器。
- [vite-plugin-dir2json](https://github.com/buddywang/vite-plugin-dir2json) - 将目录结构转换为包含受支持文件路径的 JSON 数据。
- [@cyco130/vite-plugin-mdx](https://github.com/cyco130/vite-plugin-mdx) - 导入 MDX。
- [vite-plugin-dynamic-chunk](https://github.com/MrQinYQ/vite-plugin-dynamic-chunk) - 在入口和动态入口之间拆分依赖，并合并小块。
- [vite-plugin-browserslist-useragent](https://github.com/kingyue737/vite-plugin-browserslist-useragent) - 将 browserslist 查询编译为正则表达式，以测试浏览器 useragent。
- [@vituum/vite-plugin-liquid](https://github.com/vituum/vite-plugin-liquid) - 支持 Liquid 模板引擎，将 `.liquid` 模板转换为 `.html`。
- [@vituum/vite-plugin-pug](https://github.com/vituum/vite-plugin-pug) - 支持 Pug 模板引擎，将 `.pug` 模板转换为 `.html`。
- [@vituum/vite-plugin-nunjucks](https://github.com/vituum/vite-plugin-nunjucks) - 支持 Nunjucks 模板引擎，将 `.njk` 模板转换为 `.html`。
- [vite-plugin-env-switch](https://github.com/PengBoUESTC/vite-plugin-env-switch) - 无需命令行操作即可切换项目环境并重启 Vite 服务器。
- [vite-plugin-dynamic-proxy](https://github.com/zjpzjp/vite-plugin-debug-proxy) - 根据 URL 参数自动配置反向代理。
- [@tomjs/vite-plugin-electron](https://github.com/tomjs/vite-plugin-electron) - 轻松开发 `Electron` 应用。
- [vite-plugin-singlefile-compression](https://github.com/bddjr/vite-plugin-singlefile-compression) - 压缩所有资源并将其嵌入 `dist/index.html`，方便作为单个 HTML 文件共享。
- [@vituum/vite-plugin-posthtml](https://github.com/vituum/vite-plugin-posthtml) - 支持 PostHTML，将语法转换为 `.html`。
- [vite-plugin-public-typescript](https://github.com/hemengke1997/vite-plugin-public-typescript) - 将 TypeScript 注入 `index.html`。
- [vite-plugin-auto-alias](https://github.com/jwyGithub/vite-plugin-auto-alias) - 根据路径自动生成别名。
- [vite-plugin-image-placeholder](https://github.com/pengzhanbo/vite-plugin-image-placeholder) - 通过路径匹配生成占位图片。
- [vite-plugin-csp](https://github.com/maccuaa/vite-plugin-csp) - 适用于 SPA 的内容安全策略（CSP）。自动计算资源哈希（SRI），检测 Google Fonts。支持 `Bun` 和 `Node.js` 运行时。
- [vite-plugin-auto-mpa-html](https://github.com/iamspark1e/vite-plugin-auto-mpa-html) - 基于文件目录的自动化多页面构建插件，支持使用 EJS 的 HTML 模板。
- [vite-plugin-page-html](https://github.com/Marinerer/vite-plugins/tree/main/packages/page-html) - 多页面通用模板插件，支持 `ejs` 模板语法。类似于 `vue-cli` 的 pages 配置。
- [vite-plugin-vanilla](https://github.com/Marinerer/vite-plugins/tree/main/packages/vanilla) - 原生多页面 Web 开发模式。
- [vite-plugin-global-const](https://github.com/censujiang/vite-plugin-global-const) - 定义常量以复用代码。
- [vite-plugin-graphql-server](https://github.com/mammadataei/vite-plugin-graphql-server) - 启动本地 GraphQL 服务器用于测试和文档。
- [vite-plugin-generate-html](https://github.com/gedouu/vite-plugin-generate-html) - 为 JavaScript 和 CSS 包定义独立的输出文件。
- [vite-plugin-shortcuts](https://github.com/kinfuy/vite-plugin-shortcuts) - 添加额外的自定义快捷键集合。
- [vite-plugin-serve-static](https://github.com/reifiedbeans/vite-plugin-serve-static) - 允许提供不在 `public/` 目录中的任意静态文件。
- [vite-plugin-static-filehash](https://github.com/MrQinYQ/vite-plugin-static-filehash) - 它可以帮助程序提高缓存命中率。
- [@tomjs/vite-plugin-iconify](https://github.com/tomjs/vite-plugin-iconify) - 为 `iconify` 将全局变量 `IconifyProviders` 注入 `index.html`，并支持局域网和自定义 URL。
- [vite-plugin-auto-origin](https://github.com/s2b/vite-plugin-auto-origin) - 根据传入开发服务器的请求自动检测源配置。
- [vite-font-extractor-plugin](https://github.com/a3mitskevich/vite-font-extractor-plugin) - 按字形压缩打包字体的工具。
- [vite-plugin-valibot-env](https://github.com/idleberg/vite-plugin-valibot-env) - 根据 Valibot 模式验证环境变量。
- [Vite-plugin-graphiql](https://github.com/mammadataei/vite-plugin-graphiql) - GraphiQL IDE 集成。
- [@vituum/vite-plugin-handlebars](https://github.com/vituum/vite-plugin-handlebars) - 支持 Handlebars 模板引擎，将 `.hbs` 模板转换为 `.html`。
- [@yoichiro/vite-plugin-handlebars](https://github.com/yoichiro/vite-plugin-handlebars) - 将 Handlebars 模板 `.hbs` 作为 ES 模块导入。
- [vite-plugin-material-symbols](https://github.com/RobinTail/vite-plugin-material-symbols) - 基于源代码分析选择性加载 Material Symbols 字体图标。
- [vite-plugin-simple-vconsole](https://github.com/venojs/vite-plugin-simple-vconsole) - 应用内的调试控制台视图，使移动端调试更简单，支持 SPA 和 MPA。
- [vite-plugin-px-rem-vw](https://github.com/zscumt123/vite-plugin-px-rem-vw) - 集成 PostCSS 插件 pxTorem 和 pxTovw。
- [vite-plugin-lib-types](https://github.com/keuby/vite-plugin-lib-types) - 构建库时生成 DTS 文件。
- [@vituum/vite-plugin-juice](https://github.com/vituum/vite-plugin-juice) - 支持 Juice，将 `.css` 转换为 `.html` 中的内联样式。
- [vite-plugin-find-image-duplicates](https://github.com/wChenonly/vite-plugin-find-image-duplicates) - 构建时查找项目中是否有重复图片。
- [vite-plugin-vconsole-mpa](https://github.com/Miofly/vite-plugin-vconsole-mpa) - 多页面 Vconsole 支持，配置简单。
- [unplugin-zip-pack](https://github.com/iamspark1e/unplugin-zip-pack) - 支持过滤函数的 zip 压缩 dist 目录。
- [vite-plugin-docker](https://github.com/yracnet/vite-plugin-docker) - 基于 Dockerode 的 Docker 工具。
- [vite-plugin-dc](https://github.com/dvgis/vite-plugin-dc) - 与 @dvgis/dc-sdk 库集成。
- [vite-plugin-year](https://github.com/8hobbies/vite-plugin-year) - 构建时将当前年份插入 HTML 文件。可用于为 HTML 文件添加版权年份。
- [vite-plugin-builder](https://github.com/yracnet/vite-plugin-builder) - 为服务端渲染（SSR）和客户端渲染（CSR）启用双重编译。
- [vite-plugin-replace-lodash](https://github.com/mingtianyihou33/vite-plugin-replace-lodash) - 将 `lodash` 的导入替换为 `lodash-es`，更有利于 tree-shaking。
- [vite-plugin-dynamic-prefetch](https://github.com/Linh-Tran-0312/vite-plugin-dynamic-prefetch) - 在运行时为动态模块向 HTML 文件注入 `<link rel="prefetch" />` 标签。
- [vite-plugin-envtype-patch](https://github.com/PengBoUESTC/vite-plugin-envtype-patch) - 为 `import.meta.env` 生成 `type` 信息。
- [vite-plugin-ms-clarity](https://github.com/KermanX/vite-plugin-ms-clarity) - 将 Microsoft Clarity 脚本注入到 `index.html`。
- [@goodforyou/vite-plugin-markdown-import](https://github.com/good-for-you-web-services/vite-plugin-import-markdown) - 直接将 Markdown 文件作为字符串导入，支持将 front-matter 属性作为对象。
- [@yuanjianming/unplugin-compress-svga](https://github.com/yuan66-hub/unplugin-compress-svga) - 压缩 SVGA。
- [@yuanjianming/unplugin-font-spider](https://github.com/yuan66-hub/unplugin-font-spider) - 一个 webfont 压缩插件。
- [@tomjs/vite-plugin-html](https://github.com/tomjs/vite-plugin-html) - 支持 `index.html` 的压缩、加载、CDN 等。
- [vite-plugin-cli-copy](https://github.com/wChenonly/vite-plugin-cli-copy) - 启动项目并自动复制终端的网络 URL。
- [vite-plugin-module-list](https://github.com/davidbonnet/vite-plugin-module-list) - 自动导入指定文件夹中的模块。
- [@yuanjianming/unplugin-image-convert](https://github.com/yuan66-hub/unplugin-image-convert) - 基于 sharp.js 的图片多格式转换插件。
- [@vituum/vite-plugin-latte](https://github.com/vituum/vite-plugin-latte) - 支持 Latte 模板引擎，将 `.latte` 模板转换为 `.html`。
- [vite-plugin-abbrlink](https://github.com/tangerball/abbrlink/tree/master/packages/vite-plugin-abbrlink#readme) - 为指定目录中的 `markdown` 文件添加 abbrlink 属性。
- [vite-plugin-linter](https://bitbucket.org/unimorphic/vite-plugin-linter) - 可扩展的 linter 框架，在 Vite 输出和浏览器控制台中显示 lint 结果，内置 ESLint 和 TypeScript。
- [vite-plugin-mpg](https://github.com/just-ads/vite-plugin-multi-page) - 多页面应用的简单配置。
- [vite-create-production-server-plugin](https://github.com/jrtderonde/vite-create-production-server-plugin) - 构建后启动生产 HTTP 服务。
- [vite-plugin-remark-rehype](https://github.com/y-nk/vite-plugin-remark-rehype) - 使用 unified 生态加载和转换 Markdown 文件。
- [@modyfi/vite-plugin-yaml](https://github.com/Modyfi/vite-plugin-yaml) - 将 YAML 文件转换为 ESM，并带有 schema 验证和错误报告。
- [vite-plugin-pretty-module-classnames](https://github.com/teplostanski/vite-plugin-pretty-module-classnames) - 将不带 `-module` 后缀的文件名添加到 CSS 模块的类名中。
:::

::: masonry
## 官方资源
- [GitHub Repo](https://github.com/vitejs/vite)
- [Release Notes](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md)
- [Awesome Vue](https://github.com/vuejs/awesome-vue)
- [Documentation](https://vitejs.dev/)
- [Vue 3 Docs](https://vuejs.org/)
- [Migration from v4](https://vitejs.dev/guide/migration.html)
:::

::: masonry
## 开始使用
- [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) - 搭建你的第一个 Vite 项目。
- [create-nx-workspace](https://github.com/nrwl/nx) - 搭建一个 Nx + React + Vite + Vitest 项目。
- [bati](https://github.com/batijs/bati) - 搭建一个 Vike 项目。
- [create-vite-app](https://github.com/ErKeLost/create-vite-app) - 搭建你的开箱即用的 Vite 项目。
- [create-electron-vite](https://github.com/electron-vite/create-electron-vite) - 搭建你的 Electron + Vite 项目。
- [create-vitawind](https://github.com/huibizhang/vitawind/tree/package/create-vitawind) - 搭建 Tailwind CSS 项目。
- [create-awesome-node-app](https://github.com/Create-Node-App/create-node-app) - 在不同模板之间选择来搭建你的项目。
- [create-nitro-app](https://github.com/nitrojs/create-nitro-app) - 使用 Nitro 搭建你的全栈 Vite 项目。
:::

::: masonry
## Open Source
- [Astro](https://github.com/withastro/astro) - 现代静态站点构建器。
- [Slidev](https://github.com/slidevjs/slidev) - 面向开发者的演示文稿。
- [VitePress](https://github.com/vuejs/vitepress) - 由 Vite 和 Vue 驱动的静态站点生成器。
- [WXT](https://github.com/wxt-dev/wxt) - 用于构建 Web 扩展的框架，具有与 Nuxt 相同的开发者体验。
- [Nhost](https://github.com/nhost/nhost) - 带 GraphQL 的开源 Firebase 替代方案。
- [Ladle](https://github.com/tajo/ladle) - 由 Vite 和 React 驱动的组件故事开发与测试工具。
- [IslandJS](https://github.com/sanyuan0704/island.js) - 基于 islands 架构的静态站点生成器。
- [@lazarv/react-server](https://github.com/lazarv/react-server) - 一个 React 元框架。
- [Vituum](https://github.com/vituum/vituum) - Vite 的封装，包含预定义配置、集成和模板引擎。
- [Compiiile](https://github.com/AlbanCrepel/compiiile) - 预览或托管包含 Markdown 文件的文件夹，支持全文搜索和演示文稿。
- [Gracile](https://github.com/gracile-web/gracile) - 由 Lit SSR 驱动的元框架。
- [Revili](https://github.com/revilijs/revili) - 一个命令行和 GUI 集成工具。
- [Hathora](https://github.com/hathora/hathora) - 多人游戏框架。
:::

::: masonry
## 模板
- [vue-vben-admin](https://github.com/anncwb/vue-vben-admin) - 基于 Vue3、Ant-Design-Vue、TypeScript 的后台管理模板。
- [React Starter Kit](https://github.com/kriasoft/react-starter-kit) - Jamstack、React、React Router、Material UI、Firebase Auth、TypeScript、ESLint、Prettier、Jest、GitHub Actions。
- [SvelteKit](https://github.com/sveltejs/kit) - 构建 Svelte 应用的最快方式。
- [vue-pure-admin](https://github.com/xiaoxian521/vue-pure-admin) - 基于 Vue3、TypeScript、Tailwind CSS、element-plus 的后台管理模板。
- [Vitesse](https://github.com/antfu/vitesse) - 有主见的起始模板。
- [chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite) - React + TypeScript + SASS + Prettier + ESLint + GitHub Actions + HMR（热模块替换）+ Turborepo + Chrome 扩展 Manifest v3。
- [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue) - Electron + Vite + Vue 模板。
- [Vue Naive](https://github.com/zclzone/vue-naive-admin) - 基于 Vue 3 + Pinia + Naive UI 的管理后台模板。
- [vitesse-webext](https://github.com/antfu/vitesse-webext) - WebExtension Vite 起始模板。
- [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder/) - 使用 Vite 同时驱动前后端的 Electron 应用，支持自动发布。
- [electron-vite-react](https://github.com/electron-vite/electron-vite-react) - Electron + Vite + React 模板。
- [vue3-vant-mobile](https://github.com/easy-temps/vue3-vant-mobile) - Vite5 + Vue3 + Vant4 + Pinia + Vue-Router4 + TypeScript 移动端模板。
- [vue-admin-box](https://github.com/cmdparkour/vue-admin-box) - 基于 Vue 3 + Element-plus 的管理后台模板。
- [vitesse-lite](https://github.com/antfu/vitesse-lite) - Vitesse 的轻量版本。
- [fast-crud](https://github.com/fast-crud/fast-crud) - 面向选项的 CRUD 框架，以闪电般的速度开发 CRUD。
- [antdv-pro](https://github.com/antdv-pro/antdv-pro) - AntdvPro 是一套基于 Vue3、Vite4、ant-design-vue4、Pinia、UnoCSS 和 TypeScript 的企业级中后台前端/设计完整解决方案。
- [reactjs-vite-tailwindcss-boilerplate](https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate) - React 18、TypeScript、Vitest、Testing Library、Tailwind CSS 3、Eslint 和 Prettier。
- [React-PWA](https://github.com/suren-atoyan/react-pwa) - React v18、TypeScript、Vite、React Router v6、MUI v5、Recoil、PWA、Eslint、Prettier、Husky、lint-staged、https 本地环境等。
- [electron-vue-template](https://github.com/Deluze/electron-vue-template) - 包含 Electron Builder 的 TypeScript Electron 模板。
- [Vitamin](https://github.com/wtchnm/Vitamin) - React TypeScript、Tailwind CSS、SPA + PWA、Cypress 和 CI。
- [electron-vite-template](https://github.com/umbrella22/electron-vite-template) - Electron 13、Vue 3 和 TypeScript，让桌面开发更简单。
- [celeris-web](https://github.com/kirklin/celeris-web) - 基于 `Vite` + `Vue3` + `TypeScript` + `Vue-Router` + `Pinia` + `Unocss` + `Naive UI` + `pnpm Monorepo` 的模板。
- [vite-ts-tailwind-starter](https://github.com/Uninen/vite-ts-tailwind-starter) - TypeScript、Tailwind CSS、Cypress.io e2e 测试 + CI。
- [fast-vite-nestjs-electron](https://github.com/ArcherGu/fast-vite-nestjs-electron) - 使用 esbuild 的 Vue3 + Vite + Electron + Nestjs。
- [vite-reactts-electron-starter](https://github.com/maxstue/vite-reactts-electron-starter) - React、Tailwind CSS、TypeScript 和 Electron。
- [vite-vanilla-ts-lib-starter](https://github.com/kbysiec/vite-vanilla-ts-lib-starter) - 用于库的起始模板（CJS、ESM、IIFE），包含 TypeScript、ESLint、Stylelint、Prettier、Jest、Husky + lint-staged。
- [Vutron](https://github.com/jooy2/vutron) - Electron + Vite + Vue 3 + Pinia（TypeScript）模板。
- [vite-react-ts-tailwind-firebase-starter](https://github.com/TeXmeijin/vite-react-ts-tailwind-firebase-starter) - 使用 Vite + React + TypeScript + Tailwind CSS (daisyUI) + Firebase (v9) + Prettier + ESLint 的起始模板。
- [boot-vue](https://github.com/kirklin/boot-vue) - 使用 TypeScript + UnoCSS + DaisyUI + Vue Router + Pinia 的起始模板。
- [fast-vite-electron](https://github.com/ArcherGu/fast-vite-electron) - 使用 esbuild 的 Vue3 + Vite + Electron。
- [vite-plugin-electron-quick-start](https://github.com/electron-vite/vite-plugin-electron-quick-start) - Electron 项目模板。
- [electron-vite-boilerplate](https://github.com/electron-vite/electron-vite-boilerplate) - 支持 SerialPort、SQLite3 和 node C/C++ 插件。
- [vite-plugin-doubleshot](https://github.com/Doubleshotjs/doubleshot/tree/main/packages/plugin-vite) - 用于构建 Node.js 后端或 Electron 主进程。
- [vite-vue2-windicss-starter](https://github.com/lstoeferle/vite-vue2-windicss-starter) - Vue 2、Vue Router、Composition API、VueUse、Windi CSS 和 TypeScript。
- [template-vite-react](https://github.com/lzm0x219/template-vite-react) - 一个极简的 React Vite 入门模板。
- [template-vite-ts](https://github.com/phaserjs/template-vite-ts) - 官方 Phaser 和 TypeScript 快速入门模板。
- [arco-admin](https://github.com/LIjiAngChen8/arco-admin) - `Vite` + `ArcoDesign` + `TypeScript` 遵循 `ESM` 标准，为中后台管理系统提供开箱即用、标准化、功能丰富的模板。
- [vite-vue-js-starter-template](https://github.com/ElanYoung/vite-vue-js-starter-template) - Vite + Vue3 + JavaScript + Vue Router + Pinia + TDesign + ESLint + Stylelint + Prettier 简单模板。
- [vitify-admin](https://github.com/kingyue737/vitify-admin) - 完全支持 TypeScript 和 Vuetify 组件智能提示的 Vuetify 管理后台入门模板。
- [create-react-app-vite](https://github.com/laststance/create-react-app-vite) - React、TypeScript、Tailwind CSS、MSW、Vitest、React Testing Library、ESLint、Prettier、GitHub Actions。
- [vite-ts-starter](https://github.com/pdsuwwz/vite-ts-starter) - Vue `I18n` 动态路由本地化模板，使用 `UnoCSS` + `Unplugin` + `Element-Plus` + `Vitest` + `TypeScript` + `Vue-Router` + `Vuex` + `Scss` + `ESLint` + `Stylelint` + `Husky` + `lint-staged` 实现国际化应用。
- [vite-rtk-query](https://github.com/laststance/vite-rtk-query) - React、TypeScript、Redux Toolkit、RTK Query、Tailwind CSS、MSW、Jest、React Testing Library、ESLint、Prettier。
- [template-vite](https://github.com/phaserjs/template-vite) - 官方 Phaser 快速入门模板。
- [vitejs-template-react-rescript](https://github.com/jihchi/vitejs-template-react-rescript) - React + ReScript。
- [react-vite-ts-boilerplate](https://github.com/choisohyun/react-vite-ts-boilerplate) - React 18、TypeScript、SCSS、ESLint、Prettier、Vitest。
- [vite-react-ts-shadcn-starter](https://github.com/Quilljou/vite-react-ts-tailwind-starter) - 用于创建 `React 18` SPA 应用的模板，包含 `TypeScript`、`React Router`、`Tailwind CSS`、`Shadcn UI`、`React Query`、`ESLint`、`Prettier`、`Stylelint`、`Husky`、`React-i18next`、`Transmart`。
- [vite-react-ts-template](https://github.com/bartstc/vite-ts-react-template) - React 18、TypeScript、ESlint、Prettier、Dev Container、Vitest、Storybook、Playwright、MSW、React Router 6、React Query、Chakra UI、Zustand。
- [vite-react-chakra-starter](https://github.com/sozonome/vite-react-chakra-starter) - 使用 TypeScript 和 Chakra UI 创建 React App 的起始模板。已配置 ESLint、Prettier 和 Husky。
- [vite-template-react](https://github.com/SafdarJamal/vite-template-react) - 类似 Create React App 的模板。
- [vite-react-flow-template](https://github.com/xyflow/vite-react-flow-template) - React Flow 起始模板。
- [vite-mern-template](https://github.com/apicgg/vite-mern-template) - React 18 + TypeScript + Vite + Redux Toolkit + ESLint + React Router DOM + Axios + React Icons + React Toastify + Express + Mongoose。
- [template-vite-react-ts-tailwind](https://github.com/RoyRao2333/template-vite-react-ts-tailwind) - React + TypeScript + Tailwind CSS + Eslint + Prettier。
- [monorepo-template-react](https://github.com/stormkit-io/monorepo-template-react) - 用于 SSR、SPG、SPA 和 API 提供的 React + TypeScript 模板。
- [vite-vue2-ts-vuetify-starter](https://github.com/logue/vite-vue2-vuetify-ts-starter) - 这是上述 vite-vue2-ts-starter 的 Vuetify 版本，并带有优化设置。包含基础模板。
- [vite-react-tailwind-starter](https://github.com/sozonome/vite-react-tailwind-starter) - 使用 TypeScript 和 Tailwind CSS 及 Shadcn UI 创建 React 应用的入门模板。已配置 ESLint、Prettier 和 Husky。
- [materio-free-vuetify-nuxtjs-admin-template](https://github.com/themeselection/materio-vuetify-nuxtjs-admin-template-free) - Vue.js 3、Vite 5、Vuetify 3 和 Nuxt.js 3。
- [create-domco](https://github.com/rossrobino/domco/tree/main/packages/create-domco) - 用于 domco 的起始模板。
- [vite-react-universal-template](https://github.com/laoer536/vite3.0-react18-TypeScript-router-dom6-mobx6-Eslint-prettier-template) - React18 + TypeScript + `react-router-dom` + Zustand + ESlint + Prettier + Stylelint + Husky + Docker，以及 API 自动导入。
- [vite-tailwind-nojs-starter](https://github.com/kometolabs/vite-tailwind-nojs-starter) - NoJS Tailwind CSS 起始模板。
- [vite-vanilla-js-template](https://github.com/Barata-Ribeiro/vite-vanilla-js-template) - 包含 ESLint、Prettier、PostCSS、Nesting、Autoprefixer、CSS Nano、CSS Reset 的起始模板。
- [vite-starter-markup-template](https://github.com/Grinch3214/vite-starter-markup-template) - 用于 Markup 的起始模板。
- [vite-react-component-library-starter](https://github.com/rayyamhk/vite-react-component-library-starter) - 使用 `TypeScript`、`Tailwind CSS`、`Storybook`、`Vitest`、`ESLint`、`Prettier`、`Husky` 和 `GitHub Action` 创建 React 组件库的入门模板。
- [vite-express-ssr-ts](https://github.com/gihanrangana/vite-express-ssr-ts) - React + TypeScript + Express.js + Vite SSR 模板，内置 API 功能。
- [vite-mui-ts](https://github.com/emre-cil/vite-mui-ts) - React + TypeScript + Redux + Material UI + RRD + ESLint + Prettier。
- [vitesse-solid](https://github.com/xbmlz/vitesse-solid) - 高度定制的 Vite + SolidJS 入门模板，包含 TypeScript、ESLint、Prettier、UnoCSS、HopeUI 等。
- [ViteRC](https://github.com/potreco/viterc) - React 18 + TypeScript + ESLint (Airbnb) + Prettier + Husky + Jest + 绝对导入 + 提交检查。
- [svelte-vite-ssr](https://github.com/jiangfengming/svelte-vite-ssr) - 支持 SSR 的 Svelte。
- [vite-vanilla-library-template](https://github.com/hywax/vite-vanilla-library-template) - 包含 TypeScript、ESLint、Vitest、Husky、Conventional Commits、GitHub actions 的起始模板。
- [naive-ui-dashboard-template](https://github.com/Innei/naive-ui-dashboard-template) - UI 友好，Vue 3 + TSX + Tailwind CSS 2 JIT + PostCSS + Naive UI。
- [vite-electron-plugin](https://github.com/electron-vite/vite-electron-plugin) - 基于 esbuild 的高性能 Vite Electron 插件。
- [vite-vue3-tailwind4-daisyui5-starter-template](https://github.com/martinille/starter-template-vite-vue3-sass-tailwind4-daisyui5) - 使用 Vue 3 + Vite + Tailwind CSS 4 + DaisyUI 5 + Sass 的入门模板。
- [react-xs-admin](https://github.com/jsxiaosi/react-xs-admin) - 基于 React18 + ReactRouteV6 + Vite + And Design + ReactIntl + ReactRedux + Emulation 开发的后台管理系统模板。
- [viterjs-template](https://github.com/emre-cil/viterjs-template) - React + JavaScript + Redux + Material UI + Axios + ESLint + Prettier。
- [react-admin-dashboard](https://github.com/larry-xue/react-admin-dashboard) - 使用 `TypeScript`、`Vite`、`Ant Design`、`React Router`、`Zustand`、`Ant Design Charts` 的仪表盘模板。
- [vue-file-upload](https://github.com/canopas/vue-file-upload) - 使用 `Vue3` 和 `TypeScript` 构建的文件管理系统，支持单文件和多文件上传，并带有预览功能。
- [vite-react-ssr-boost-template](https://github.com/Lomray-Software/vite-template) - 用于创建 `React 18` SSR/SPA 应用的模板，包含 `TypeScript`、`Mobx`、`React Router`、`Head Manager`、Suspense、Streaming。同时包含 CI/CD、`ESLint`、`Prettier`、`Stylelint`、`Husky`、`Semantic Release`。
- [Viterts](https://github.com/erdoganbulut/viterts/) - React + TypeScript + Redux + React Router + Jest + ESLint + Airbnb + Prettier + SASS。
- [vite-vue2-ts-starter](https://github.com/logue/vite-vue2-ts-starter) - 使用 vue-property-decorator、vue-router、Vuex 的 Vue2 TypeScript 起始模板。
- [vite-svelte-flow-template](https://github.com/xyflow/vite-svelte-flow-template) - Svelte Flow 入门模板。
- [react-vite-template](https://github.com/985563349/react-vite-template) - 一个 React 项目模板。
- [ReTail](https://github.com/nikolailehbrink/retail) - 使用 `Remix` 和 `TypeScript`、`Tailwind CSS`、`Prettier`、`ESLint` 构建全栈 Web 应用的入门模板。
- [Varsarr](https://github.com/altmshfkgudtjr/varsarr) - React、TypeScript、Styled-Components、Recoil、React-Query、Axios、绝对导入。
- [vue-vite-ssr](https://github.com/EverSeenTOTOTO/browser-app-boilerplate/tree/vue-vite-ssr) - TypeScript、Eslint、Stylelint、Husky、Lint-staged 和 Commitlint。
- [react-vite-ssr](https://github.com/EverSeenTOTOTO/browser-app-boilerplate/tree/react-vite-ssr) - Mobx、TypeScript、Eslint、Stylelint、Husky、Lint-staged 和 Commitlint。
- [vue3-quick-start](https://github.com/wforguo/vue3-quick-start) - 构建工程化 Vue 3 项目，集成 `Vite` + `Vue3` + `TypeScript` + `ESLint` + `Prettier` + `Commitizen` + `Husky` + `LintStaged` + `CommitLint` + `AutoImport` + `ReleaseIt`。
- [antd-vue3-admin](https://github.com/Zuojiangtao/antd-vue3-admin) - 基于 Vue3、Vite4、TS5 和 Ant-Design-Vue4 的起始模板。
- [vite-complete-react-app](https://github.com/ChrisUser/vite-complete-react-app) - 使用 `React`、`TypeScript`、`Redux Toolkit`、`React Router`、`Axios`、`Sass`、`Moment`、`ESLint`、`Prettier` 和 `React Testing Library` 构建 Web 应用的起始模板。
- [vite-phaser-ts](https://github.com/iwantantra/vite-phaser-ts) - 包含 Phaser 和 TypeScript 的起始模板。
- [vite-ts-lib-starter](https://github.com/matronator/vite-ts-lib-starter) - 用于库的起始模板，包含 TypeScript、Bun、Vitest、Prettier、Renovate 和 np。
- [react-vite-tailwindcss-template](https://github.com/quavedev/react-vite-tailwindcss-template) - React、JavaScript、Tailwind CSS、ESlint、Prettier、Pre-commit。
- [vite-react-framer-starter](https://github.com/matozz/vite-react-framer-starter) - 使用 `React`、`TypeScript`、`Framer Motion`、`Tailwind CSS`、`ESLint` 和 `Prettier` 的入门模板。
- [vulcan](https://github.com/pengzhanbo/vulcan) - 移动应用模板。Vite、Vue 3、TypeScript、Sass、i18n、Vitest 和 Cypress、Pinia、API 和 Mock、ESLint、Prettier、自动导入。
- [vite-tailwind-stimulus-starter](https://github.com/jeremyfrank/vite-tailwind-stimulus-starter) - 用于 Tailwind CSS 和 Stimulus 控制器的起始模板。
- [React Dapp Starter](https://github.com/Manta-Network/react-dapp-starter) - 面向企业级可扩展去中心化应用的 Web3 DApp 起始模板，包含 `TypeScript`、`Tailwind CSS`、`Web3Modal`、`Wagmi`、`Shadcn UI`、`Zustand` 和 `TanStack Query`。
- [Vitron](https://github.com/tada5hi/vitron) - 使用 Vite 和 Electron 为现代 Web 项目构建美观的（Windows、Linux、macOS）桌面应用。
- [template-tauri-vite-react-ts-tailwind](https://github.com/RoyRao2333/template-tauri-vite-react-ts-tailwind) - 内置 Tauri + React + TypeScript + Tailwind CSS + Prettier + ESLint 的模板。
- [vite-react-proste](https://github.com/xyhxx/vite-react-proste) - React + TypeScript + `react-router-dom` + Recoil + SASS + Testing Library + `react-query` + ESLint + Stylelint + Prettier。
- [vite-vue-proste](https://github.com/xyhxx/vite-vue-proste) - Pinia + TypeScript + Vue-Router4 + Vitest + Vue-Test-Utils + Vue-Query + Sass + ESLint + Stylelint + Prettier + `项目预设`。
- [react-vite-template](https://github.com/Mirazex/react-vite-template) - React、TypeScript、Vite、Mantine、Million、Husky、Prettier、Import Sorter、Lint-staged。
- [vue-vite-tw-ts](https://github.com/ChronosMasterOfAllTime/vue-vite-tw-ts) - Vue 3 + Vite + Vitest + Cypress E2E + Naive UI + Pinia + Vue Router。
- [vite-react-dapp-template](https://github.com/huseyindeniz/vite-react-dapp-template) - 用于去中心化应用前端开发的起始模板，预配置了钱包认证、i18n 和 UI 功能。
- [Reactive](https://github.com/ws-rush/reactive) - `React` 入门模板，采用 `Remix` 文件路由约定，适用于 `react-router`、`UnoCSS`、`LinguiJs`、`zustand` 以及众多功能。
- [vite-tinybase-ts](https://github.com/tinyplex/vite-tinybase-ts) - 用于 TinyBase 和 TypeScript 的起始模板。
- [vite-tinybase-ts-react](https://github.com/tinyplex/vite-tinybase-ts-react) - TinyBase、TypeScript 和 React 的起始模板。
- [vite-amplify](https://github.com/bebeal/vite-amplify) - 包含 SSR + Express APIs + AWS Amplify Hosting 的模板。
- [vite-swagger-ui](https://github.com/lukefernandez/vite-swagger-ui) - 内置多 API 支持的 Swagger UI。
- [vite-jsx-remove-attributes](https://github.com/jacobbogers/rollup-plugin-jsx-remove-attributes) - 从生产构建中移除 `data-testid`（可配置）。
- [vue-xs-admin](https://github.com/jsxiaosi/vue-xs-admin) - 基于 Vue3、Vite3、ElementPlus、TypeScript、Pinia、VueRouter。
- [template-vite-svelte-ts-tailwind](https://github.com/RoyRao2333/template-vite-svelte-ts-tailwind) - Svelte + TypeScript + Tailwind CSS + Prettier。
- [vite-tinybase](https://github.com/tinyplex/vite-tinybase) - 用于 TinyBase 的起始模板。
- [React Tanning](https://github.com/padunk/react-tanning) - 使用 `React + Vite + TypeScript + TanStack + Tailwind` 的入门模板。
- [vite-tinybase-react](https://github.com/tinyplex/vite-tinybase-react) - TinyBase 和 React 的起始模板。
- [vite-biome-tailwind-template](https://github.com/not-first/vite-biome-tailwind-template) - React、TypeScript、Biome、Tailwind CSS。
- [vitesse-lite-solid](https://github.com/Nauxscript/vitesse-lite-solid) - 适用于 SolidJS 的轻量级 Vite 入门模板。
- [vite-alpine-template](https://github.com/dvd101x/vite-alpine) - 用于 Alpine 的起始模板。
- [vite-plugin-vue-style-bundler](https://github.com/zhangfisher/vite-plugin-vue-style-bundler) - 自动将 Vue/sfc 样式打包到 JavaScript 中。
- [gravity-ui-vite-template](https://github.com/gravity-ui/gravity-ui-vite-example) - 使用 Gravity UI 生态的模板（React、TypeScript、Gravity UI、Vite、Husky、ESLint、Prettier、Lint-staged）。
- [react-component-library-vite](https://github.com/gsharath/react-component-library-vite) - 使用 `React`、`Javascript`、`Styled-Components`、`Vitest`、`React Testing Library`、`Storybook` 的库模板。
- [vite-plugin-ssr-config](https://github.com/yracnet/vite-plugin-ssr-config) - 使用 `React`、`React-Query`、`React-Router` 配置服务端渲染（SSR）。
- [vite-ts-bulma-sass-template](https://github.com/naoki-00-ito/vite-ts-bulma-sass-template) - 起始模板 `TypeScript`、`Bulma`、`Sass`、`Stylelint`、`Biome`。
- [RVTGB](https://github.com/up2dul/rvtgb) - `React` + `TypeScript` 入门模板，使用 `Generouted` 和 `Biome` 实现文件路由。
- [portfolio-vite-manifest](https://github.com/SebConejo/portfolio-vite-manifest) - 使用 `Vite`、`React`、`TypeScript`、`Manifest` 的全栈作品集模板。
- [vite-template-awesome-soho](https://github.com/comnori/vite-template-awesome-soho) - 用于创建 `React 18`、`Javascript + JSDoc`、`React Router`、`Ant Design`、`ESLint`、`EditorConfig`、`.env`、`SonarLint`、`Vitest` 的 `DevContainer` 模板。
- [vite-react-redux-saga-typescript](https://github.com/Dulajdeshan/vite-react-redux-saga-typescript) - 使用 `React`、`TypeScript`、`Redux (Redux Toolkit)`、`Saga`、`React Testing Library`、`ESLint`、`Prettier` 和 `Husky` 的入门模板。
- [vite-template-react-ts-jest](https://github.com/ivanzusko/vite-template-react-ts-jest) - `React` + `TypeScript` + `Jest`。
- [vite-svelte-docker-template](https://github.com/tony-stark-eth/vite-svelte-docker-template) - `Docker` + `Svelte` + `Vitest`。
- [Vitawind Creator](https://vitawind.vercel.app/scaffolding/creator/) - 快速创建 Tailwind CSS 项目。
- [vue3-tailwind3-website-starter](https://github.com/feitian124/vue3-tailwind3-website-starter.git) - Vue3 / Vite / Tailwind CSS 网站起始模板，每页都有指南。
- [react-component-library-template](https://github.com/xxhls/react-component-library-template) - 一个用于 `React`、`TypeScript`、`Vitest`、`React Testing Library`、`Storybook`、`Biome`、`Stylelint` 的库模板。
- [react-boilerplate](https://github.com/Aubergine-Community/react-basic-template) - 使用 `Eslint` + `Husky` + `Prettier` 进行初始化的模板。
:::

::: masonry
## Tauri
- [HuLa](https://github.com/HuLaSpark/HuLa) - 是一款基于 `Vite 5` + `Vue 3` + `TypeScript` + `Tauri` 构建的桌面即时通讯应用（不仅仅是即时通讯）。
- [vite-vue3-chrome-extension-v3](https://github.com/mubaidr/vite-vue3-chrome-extension-v3) - 适用于 Chrome、Firefox 和 Edge 的 Web 扩展起始模板。
- [vite-elm-template](https://github.com/lindsaykwardell/vite-elm-template) - 用于构建 Elm 应用的默认模板。
- [chrome-ext-template-preact-windi-vite](https://github.com/fell-lucas/chrome-ext-template-preact-windi-vite) - Preact、Windi CSS、TypeScript、Prettier、ESLint、GitHub Actions 和 Chrome 扩展 Manifest v3。
- [vite-plugin-fable](https://github.com/nojaf/vite-plugin-fable) - 包含 `.fs` 和 `.fsproj` 文件以及 F# 编译器的模板。
- [github-action-template](https://github.com/hywax/github-action-template) - 用于 GitHub Actions、TypeScript、ESLint、Vitest、Husky、Conventional Commits 的入门模板。
- [vite-react-neutralino-template](https://github.com/Bonnev/vite-react-neutralino-template) - Neutralino + Vite + React 模板。
- [elm_vite_tailwind_template](https://github.com/gacallea/elm_vite_tailwind_template) - 使用 Tailwind CSS 和 Daisy UI 构建 Elm Web 应用的高度定制模板。
- [vit-singlefile-gzip](https://github.com/MillerRen/vite-singlefile-gzip.git) - 嵌入式项目起始模板。
- [11st-Starter-Kit](https://github.com/stefanfrede/11st-starter-kit) - 11ty，由 Vite 驱动，集成 Tailwind CSS 和 Alpine.js。
:::

::: masonry
## Apps/Websites
- [Icônes](https://github.com/antfu/icones) - 带即时搜索的图标浏览器。
- [macOS in Svelte](https://github.com/PuruVJ/macos-web/) - 基于 Svelte 的 Web 版 macOS 桌面体验。
- [vue3-realworld-example-app](https://github.com/mutoe/vue3-realworld-example-app) - 使用 Vue 3 + TypeScript + Composition API 实现的 Realworld 应用。
- [react-device-frameset](https://github.com/zheeeng/react-device-frameset) - 这是另一个用于 React 的设备框架组件。
- [Awesome CN Café](https://github.com/antfu/awesome-cn-cafe-web) - Awesome CN Café 的 Web 应用。
- [vite-run](https://github.com/biggerstar/vite-run) - 支持 Vite 多配置执行，像堆叠积木一样自由组合配置。
- [Todo Example](https://github.com/beary/vite-example) - 带路由和状态管理的待办事项应用。
- [Dataviz Explorer](https://github.com/fehmisener/dataviz-explorer) - 一个用于大型 CSV、数据库和实时可视化的工具，使用 `Highcharts`、`Chart.js`、`React`、`JavaScript`、`Material UI` 和 `GitHub Actions with Coverage Report` 实现交互式绘图。
- [pointer-lock-movement](https://github.com/zheeeng/pointer-lock-movement) - 用于自定义创意 UI 的指针锁定移动管理器。
- [aitrack.work](https://aitrack.work) - 用于日常使用的基于任务的时间追踪器。
- [Preview.js](https://previewjs.com) - 一个 IDE 扩展，用于即时预览 React、Vue 2 和 Vue 3 组件。
:::

::: masonry
## 库
- [Vike](https://github.com/vikejs/vike) - 像 Nuxt/Next.js，但作为一款专一而精的插件。 ![react] ![vue3] ![vue2] ![svelte]
- [Vinxi](https://github.com/nksaraf/vinxi) - 全栈 JavaScript SDK。允许为 Vite 应用添加 SSR。
- [ssr](https://github.com/zhangyuang/ssr) - 结合 Webpack/Vite 的服务器端渲染框架。 ![react] ![vue3] ![vue2]
- [vavite](https://github.com/cyco130/vavite) - 用于开发与构建服务端应用的工具，支持实时重载。
- [SSRx](https://github.com/marbemac/ssrx) - Vite 之上的一层薄封装，以出色的开发体验构建现代 SSR 应用。
- [vite-ssr-boost](https://github.com/Lomray-Software/vite-ssr-boost) - 基于 `react-router` 构建出色应用的服务器端渲染库。 ![react]
- [domco](https://github.com/rossrobino/domco) - 极简全栈 JavaScript。以最小依赖将 Vite 应用转变为全栈应用。
- [vue-ssr](https://github.com/bistroo/vue-ssr) - 用于开发并运行 SSR 驱动的 Vue 应用的极简封装。 ![vue3]
:::

::: masonry
## Electron
- [electron-vite](https://github.com/alex8088/electron-vite) - 集成 Vite 的 Electron CLI。
:::

::: masonry
## Rollup 插件
- [`@rollup/plugin-alias`](https://github.com/rollup/plugins/blob/master/packages/alias) - 为打包依赖定义和解析别名。
- [`@rollup/plugin-commonjs`](https://github.com/rollup/plugins/blob/master/packages/commonjs) - 将 CommonJS 模块转换为 ES6。
- [`@rollup/plugin-dynamic-import-vars`](https://github.com/rollup/plugins/blob/master/packages/dynamic-import-vars) - 解析包含变量的动态导入。
- [`@rollup/plugin-json`](https://github.com/rollup/plugins/blob/master/packages/json) - 将 `.json` 文件转换为 ES6 模块。
- [`@rollup/plugin-babel`](https://github.com/rollup/plugins/tree/master/packages/babel) - 使用 Babel 编译你的文件。
- [`@rollup/plugin-buble`](https://github.com/rollup/plugins/tree/master/packages/buble) - 使用 buble 编译 ES2015。
- [`@rollup/plugin-data-uri`](https://github.com/rollup/plugins/tree/master/packages/data-uri) - 从 Data URI 导入模块。
- [`@rollup/plugin-html`](https://github.com/rollup/plugins/tree/master/packages/html) - 创建 HTML 文件以提供 Rollup 打包产物。
- [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve) - 定位并打包 node_modules 中的第三方依赖。
- [`@rollup/plugin-sucrase`](https://github.com/rollup/plugins/tree/master/packages/sucrase) - 使用 Sucrase 编译 TypeScript、Flow、JSX 等。
- [`@rollup/plugin-typescript`](https://github.com/rollup/plugins/tree/master/packages/typescript) - Rollup 与 TypeScript 之间的集成。
- [`@rollup/plugin-wasm`](https://github.com/rollup/plugins/tree/master/packages/wasm) - 使用 Rollup 导入 WebAssembly 代码。
- [`@rollup/plugin-url`](https://github.com/rollup/plugins/tree/master/packages/url) - 将文件作为 data-URI 或 ES 模块导入。
- [`@rollup/plugin-beep`](https://github.com/rollup/plugins/tree/master/packages/beep) - 出错和警告时系统发出蜂鸣声。
- [`@rollup/plugin-dsv`](https://github.com/rollup/plugins/blob/master/packages/dsv) - 使用 d3-dsv 将 `.csv` 和 `.tsv` 文件转换为 JavaScript 模块。
- [`@rollup/plugin-eslint`](https://github.com/rollup/plugins/blob/master/packages/eslint) - 使用 ESLint 验证入口点和所有导入的文件。
- [`@rollup/plugin-graphql`](https://github.com/rollup/plugins/blob/master/packages/graphql) - 将 .gql/.graphql 文件转换为 ES6 模块。
- [`@rollup/plugin-image`](https://github.com/rollup/plugins/blob/master/packages/image) - 导入 JPG、PNG、GIF、SVG 和 WebP 文件（需要 `enforce: 'pre'`）。
- [`@rollup/plugin-inject`](https://github.com/rollup/plugins/blob/master/packages/inject) - 扫描模块中的全局变量，并在必要时注入导入语句。
- [`@rollup/plugin-legacy`](https://github.com/rollup/plugins/tree/master/packages/legacy) - 为旧的非模块脚本添加导出声明。
- [`@rollup/plugin-replace`](https://github.com/rollup/plugins/tree/master/packages/replace) - 在打包时替换文件中的字符串。
- [`@rollup/plugin-strip`](https://github.com/rollup/plugins/tree/master/packages/strip) - 从代码中移除 debugger 语句和函数。
- [`@rollup/plugin-virtual`](https://github.com/rollup/plugins/blob/master/packages/virtual) - 一个从内存加载虚拟模块的 Rollup 插件。
- [`@rollup/plugin-yaml`](https://github.com/rollup/plugins/blob/master/packages/yaml) - 将 YAML 文件转换为 ES6 模块。
- [rollup-plugin-graphql-codegen](https://github.com/rxliuli/liuli-tools/tree/master/libs/rollup-plugin-graphql-codegen) - 在 worker_threads 中为 GraphQL 标签模板字符串生成类型定义。
- [rollup-plugin-i18next-dts-gen](https://github.com/rxliuli/liuli-tools/tree/master/libs/rollup-plugin-i18next-dts-gen) - 从 i18n JSON 文件生成类型定义，用于代码提示和验证。
- [Vite Rollup Plugins](https://vite-rollup-plugins.patak.dev/) - 官方 Rollup 插件的兼容性列表。
:::

::: masonry
## WordPress
- [WordPlate](https://github.com/vinkla/wordplate) - 带 Composer 的起始应用。
- [wordpress-vite-assets](https://github.com/idleberg/php-wordpress-vite-assets) - WordPress 主题集成。
- [Kima](https://github.com/axelilali/kima) - 带 Twig 的起始主题。
:::

::: masonry
## Rust
- [create-rust-app](https://github.com/Wulf/create-rust-app) - 用于 Rust Web 应用的集成。
- [vite-rs](https://github.com/Wulf/vite-rs) - 将资源嵌入 Rust 二进制文件中。
:::

::: masonry
## Ruby on Rails
- [vite-plugin-ruby](https://github.com/ElMassimo/vite_ruby/tree/main/vite-plugin-ruby) - Ruby 后端的配置。
- [Vite Ruby](https://github.com/ElMassimo/vite_ruby) - Rails、Hanami、Padrino 和 Rack 应用的集成。
:::

::: masonry
## React
- [generouted](https://github.com/oedotme/generouted) - 客户端类型安全的基于文件的路由和全局模态框——支持布局、加载器、代码分割等。
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react) - 使用 Babel 的官方 React 支持。
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - 使用 SWC 的官方 React 支持。
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) - 将 SVG 转换为 React 组件。
- [vite-plugin-react-pages](https://github.com/vitejs/vite-plugin-react-pages) - 一个用于构建 React 应用的 Vite 框架。
- [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) - React 的静态站点生成。
- [@stylin/vite-plugin](https://github.com/sultan99/stylin/tree/main/packages/vite-plugin) - 将 CSS 和 SCSS 模块转换为 React 组件。
- [vite-plugin-react-click-to-component](https://github.com/ArnaudBarre/vite-plugin-react-click-to-component) - 使用 Vite 的启动中间件，支持 alt+click 跳转到组件。
- [vite-plugin-react-rich-svg](https://github.com/iGoodie/vite-plugin-react-rich-svg) - 无缝 SVG 加载器，提供多种导入选项，如 DataURI、SVGR 组件和原始 HTML 代码。
- [unplugin-remix-router](https://github.com/ws-rush/unplugin-remix-router) - 生成一个 React Router 文件，该文件依赖于 Remix v2 基于文件的路由约定。
- [vite-plugin-remix-flat-routes](https://github.com/hemengke1997/vite-plugin-remix-flat-routes) - 基于 Remix-flat-routes 约定的路由，兼容 react-router 数据 API 路由。
:::

::: masonry
## Solid
- [generouted](https://github.com/oedotme/generouted/tree/main/packages/solid-router) - 客户端类型安全的基于文件的路由和全局模态框——支持布局、加载器、代码分割等。
- [vite-plugin-solid](https://github.com/amoutonbrady/vite-plugin-solid) - 为 Solid 提供 JSX 转换。
- [vite-plugin-solid-svg](https://github.com/jfgodoy/vite-plugin-solid-svg) - 将 SVG 文件导入为 Solid.js 组件。
:::

::: masonry
## 框架
- [Rakkas](https://github.com/rakkasjs/rakkasjs) - 受 Next.js 和 SvelteKit 启发的 React 框架。 ![react]
- [`@fastify/fastify-dx`](https://github.com/fastify/fastify-dx) - 允许提供静态或实时（SSR）服务。
- [vite-plugin-vercel](https://github.com/magne4000/vite-plugin-vercel) - Vercel 适配器。
- [Vise](https://github.com/stauren/vise-ssr) - 带服务器钩子的 SSR 框架。 ![react] ![vue3]
- [vite-vlugin-vercel-skew-protection](https://github.com/bitttttten/vite-vlugin-vercel-skew-protection) - 帮助配置 Vercel Skew Protection。
:::

::: masonry
## Svelte
- [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) - 添加 Svelte 支持。Svelte 团队的官方插件。
- [vite-plugin-kit-routes](https://github.com/jycouet/kitql/tree/main/packages/vite-plugin-kit-routes) - 生成包含 SvelteKit 应用所有路由、参数和操作的文件。
:::

::: masonry
## Laravel
- [Laravel Vite Plugin](https://github.com/laravel/vite-plugin) - Laravel 官方 Vite 插件。
- [Laravel Vite](https://github.com/innocenzi/laravel-vite) - Laravel 框架集成。
:::

::: masonry
## Django
- [django-vite](https://github.com/MrBin99/django-vite) - Django 应用集成。
- [django-vite-plugin](https://github.com/protibimbok/django-vite-plugin) - Django 应用集成，包括 Vite 插件。
:::

::: masonry
## Node.js
- [vite-express](https://github.com/szymmis/vite-express) - 用于 Express Web 应用的集成。
- [vite-manifest-parser](https://github.com/sullay/vite-manifest-parser) - 解析 manifest.json 以生成 HTML script 和 link 标签。
:::

::: masonry
## Shopify
- [vite-plugin-shopify](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify) - 用于 Shopify 主题的集成。
:::

::: masonry
## ASP.NET Core
- [Vite.AspNetCore](https://github.com/Eptagone/Vite.AspNetCore) - 与 ASP.NET Core 项目的集成。
:::

::: masonry
## Preact
- [@preact/preset-vite](https://github.com/preactjs/preset-vite) - Preact 预设。HMR、自动 Preact 注入、生产环境移除 DevTools。
:::

::: masonry
## Symfony
- [Vite Bundle](https://github.com/lhapaipai/vite-bundle) - 用于 Symfony 的集成。
:::

::: masonry
## React
- [Viject](https://github.com/bhbs/viject) - 从 Create React App 的一次性迁移工具。
:::

::: masonry
## Elm
- [vite-plugin-elm](https://github.com/hmsk/vite-plugin-elm) - 一个用于编译 Elm 模块的插件。
:::

::: masonry
## Go
- [`vite`](https://github.com/olivere/vite) - 与 Go 的集成。
:::

::: masonry
## PHP
- [PHP-Vite](https://github.com/mindplay-dk/php-vite) - 用于 PHP 的集成，Composer 包，无框架依赖。
- [PHP-Vite Starter Repo](https://github.com/nititech/php-vite-starter) - 起始仓库，支持 TypeScript/JavaScript、Tailwind CSS、SASS/SCSS、EJS、SVG 和图片。
- [php-vitelinker](https://github.com/Osteoporosis/php-vitelinker) - 一个 CLI 工具，在构建 bundle 后生成可包含的 PHP 文件。
:::

::: masonry
## TYPO3 CMS
- [vite-asset-collector for TYPO3](https://github.com/s2b/vite-asset-collector) - TYPO3 CMS 后端集成。
- [vite-plugin-typo3](https://github.com/s2b/vite-plugin-typo3) - TYPO3 CMS 前端集成。
:::

::: masonry
## Craft CMS
- [Craft Vite](https://github.com/nystudio107/craft-vite) - 用于集成 Craft CMS 的插件。
:::

::: masonry
## Drupal
- [vite-plugin-twig-drupal](https://github.com/larowlan/vite-plugin-twig-drupal) - 支持 Twig 的 includes/embeds 以及 Drupal 特有的 Twig 特性。
- [Vite module](https://git.drupalcode.org/project/vite) - 用于 Drupal 的后端集成。
:::

::: masonry
## CakePHP
- [cakephp-vite](https://github.com/passchn/cakephp-vite) - CakePHP 集成。
:::

::: masonry
## Fastify
- [vite-plugin-fastify](https://github.com/Vanilla-IceCream/vite-plugin-fastify) - 用于 Vite 的 Fastify 插件，支持热模块替换。
- [vite-plugin-fastify-routes](https://github.com/Vanilla-IceCream/vite-plugin-fastify-routes) - 基于文件的路由，类似于 SvelteKit 和 Next.js App Router。
:::

::: masonry
## Flask
- [Flask-Vite](https://pypi.org/project/flask-vite/) - 与 Flask 的集成。
:::

