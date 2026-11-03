---
sidebar: false
aside: false
pageClass: container-page container-columns
---

::: masonry
## 人工智能
> 用于构建利用 AI 的程序的库。
- [Ollama](https://github.com/jmorganca/ollama) - 在本地运行大型语言模型。
- [LocalAI](https://github.com/mudler/LocalAI) - 开源 OpenAI 替代品，自托管 AI 模型。
- [langchaingo](https://github.com/tmc/langchaingo) - LangChainGo 是一个用于开发由语言模型驱动的应用程序的框架。
- [mcp-go](https://github.com/mark3labs/mcp-go) - Go 实现的模型上下文协议，用于在 Go 中构建 MCP 服务器和客户端。
- [Genkit](https://github.com/firebase/genkit) - 由 Google 创建的框架，用于使用惯用 Go 构建 AI 驱动和 agentic 应用程序。
- [trpc-agent-go](https://github.com/trpc-group/trpc-agent-go) - 用于构建基于 LLM 的多智能体系统的框架。
- [GoModel](https://github.com/ENTERPILOT/GoModel) - AI 网关，在 OpenAI、Anthropic、Gemini、Groq、xAI、Ollama 和其他提供商之间提供统一的 OpenAI 兼容 API，具备路由、使用跟踪、速率限制和护栏。
- [chromem-go](https://github.com/philippgille/chromem-go) - 适用于 Go 的可嵌入向量数据库，具有类似 Chroma 的接口和零第三方依赖。内存模式，可选持久化。
- [snip](https://github.com/edouard-claude/snip) - CLI 代理，通过声明式 YAML 过滤器将 LLM 令牌使用量减少 60-90%。可无缝替代 Claude Code、Cursor、Copilot 和 Gemini。Go 语言实现的 rtk 替代品。
- [langgraphgo](https://github.com/smallnest/langgraphgo) - 一个用于使用 LLM 构建有状态、多 Actor 应用程序的 Go 库，基于 LangGraph 的概念构建，内置多种 Agent 架构。
- [ai-gateway](https://github.com/ferro-labs/ai-gateway) - 兼容 OpenAI 的 LLM 网关，可在 30 个提供商之间路由请求，具备回退、速率限制、预算、护栏和可观测性。
- [goai](https://github.com/zendev-sh/goai) - 用于构建 AI 应用程序的 Go SDK。一个 SDK，20+ 提供商。灵感来自 Vercel AI SDK。
- [Cynative](https://github.com/cynative/cynative) - 用于在 Go 中构建安全工程 AI Agent 的框架。构造上只读，内置沙箱，提供 45 个针对 AWS、GCP、Azure、K8s、GitHub 和 GitLab 深度研究的 Agent 蓝图。
- [clai](https://github.com/baalimago/clai) - 专注于终端工作流的 Agentic 框架，遵循 UNIX 原则。无外部依赖，非常适合脚本编写/原型设计 agentic 应用，引擎也作为包提供。
- [OllamaFarm](https://github.com/presbrey/ollamafarm) - 管理、负载均衡和故障转移 Ollama 集群。
- [jargo](https://github.com/gojargo/jargo) - 用于通过 WebRTC 构建实时语音 AI Agent 的框架，将语音转文本、LLM 和文本转语音接入流式管道。
- [keen-code](https://github.com/mochow13/keen-code) - 一个上下文高效的终端 AI 编码 Agent。与提供商无关，支持 MCP、Agent Skills、Subagents 等。附带简单直观的 TUI。
- [web-researcher-mcp](https://github.com/zoharbabin/web-researcher-mcp) - MCP 服务器，为 AI 助手提供网络搜索、内容提取和多来源研究能力。单一二进制文件，5 个搜索提供商支持熔断故障转移，4 层抓取管道。
- [skillreaper](https://github.com/thousandflowers/skillreaper) - CLI，用于扫描 AI Agent 会话记录，识别并安全隔离未使用的技能、MCP 服务器和 Agent，支持 Claude Code、Codex CLI、Hermes、OpenCode、Cursor 和 OpenClaw。
- [agent-sdk-go](https://github.com/agenticenv/agent-sdk-go) - 用于在 Go 中构建有状态 AI Agent 的框架。
- [zenflow](https://github.com/zendev-sh/zenflow) - 多智能体编排与工作流引擎。声明式 YAML 工作流，带中心辐射式邮箱的 LLM 协调器，竞态安全投递。一个 YAML 文件，一个 Go 二进制文件。可在任何支持 goai 的提供商上运行。
- [claude-code-go](https://github.com/lancekrogers/claude-code-go) - 用于从 Go 程序驱动 Claude Code CLI 非交互式提示面的 Go 库。
- [hotplex](https://github.com/hrygo/hotplex) - AI Agent 运行时引擎，为 Claude Code、OpenCode、pi-mono 和其他 CLI AI 工具提供长期会话。支持全双工流式传输、多平台集成和安全沙箱。
- [ai](https://github.com/joakimcarlsson/ai) - 一个 Go 工具包，用于跨多个提供商构建 AI Agent 和应用程序，统一 LLM、嵌入、工具调用和 MCP 集成。
- [otellix](https://github.com/oluwajubelo1/otellix) - 面向成本受限生产环境的 OpenTelemetry 原生 LLM 可观测性和预算护栏。
- [AegisFlow](https://github.com/saivedant169/AegisFlow) - AI 网关，用于在 10+ 提供商之间路由、保护和监控 LLM 流量。兼容 OpenAI API、WASM 策略插件、金丝雀发布、实时仪表板。
- [routex](https://github.com/Ad3bay0c/routex) - 适用于 Go 的 YAML 驱动多 Agent AI 运行时，具有 Erlang 风格监督、MCP 工具服务器支持和 CLI。
- [Aetheris](https://github.com/Colin4k1024/Aetheris) - AI Agent 执行运行时，具有事件溯源、检查点恢复和至多一次执行保证。使用 Go 编写。
- [agy-mcp](https://github.com/tphakala/agy-mcp) - 模型上下文协议（MCP）服务器，封装 Antigravity CLI 以运行提示和同行评审。
- [localaik](https://github.com/harshaneel/localaik) - LocalStack 风格的 OpenAI 和 Gemini API 本地模拟；单个 Docker 容器，llama.cpp + Gemma 3 后端。
- [llm-box](https://github.com/alib8b8/llm-box) - 基于终端的 AI 工作流引擎，具有 YAML 驱动的管道、20+ LLM 提供商（DeepSeek、Qwen、GLM、Mistral 等）以及用于工作流管理的 TUI。
- [crewai-go](https://github.com/rhgs/crewai-go) - CrewAI（多 Agent 编排）的惯用 Go 移植版。零依赖，仅使用标准库。
- [semantic-search](https://github.com/DavidBelicza/semantic-search) - 基于语义的搜索，支持 PDF、Markdown、DOCX、源代码和其他文件类型，使用生成式 AI 嵌入模型将文件向量化到向量数据库。
- [Smeldr](https://github.com/Smeldr/core) - AI 原生内容后端，具备类型化生命周期管理、针对每种内容类型的原生 MCP 工具，以及零运行时依赖。
- [dakera-go](https://github.com/dakera-ai/dakera-go) - Dakera 自托管 Agent 内存服务器的官方 Go 客户端 SDK，提供内存存储/召回、会话管理、命名空间操作和衰减配置的类型化接口。
- [golem](https://github.com/abubakarsiddik31/golem) - 用于构建可靠 AI Agent 的框架，具有类型化依赖、零外部依赖和原生 MCP 支持。
- [thermal](https://github.com/jadmadi/thermal) - 面向 AI 编码助手的终端贡献热力图、连续打卡追踪器和令牌排行榜。
:::

::: masonry
## 网站
- [Go Projects](https://github.com/golang/go/wiki/Projects) - Go 社区维基上的项目列表。
- [Awesome Remote Job](https://github.com/lukasz-madon/awesome-remote-job) - 精选的远程工作列表，其中许多在招聘 Go 开发者。
- [Build web application with Golang](https://github.com/astaxie/build-web-application-with-golang) - Golang 电子书，介绍如何用 golang 构建 Web 应用。
- [awesome-awesomeness](https://github.com/bayandin/awesome-awesomeness) - 其他超棒列表的列表。
- [go-patterns](https://github.com/tmrts/go-patterns) - 精选的 Go 设计模式、配方和惯用法列表。
- [Learn Go with TDD](https://github.com/quii/learn-go-with-tests) - 通过测试驱动开发学习 Go。
- [Learn Go with 1000+ Exercises](https://github.com/inancgumus/learngo) - 通过数千个示例、练习和测验学习 Go。
- [Go Cheat Sheet](https://github.com/a8m/go-lang-cheat-sheet) - Go 参考卡片。
- [go-clean-template](https://github.com/evrone/go-clean-template) - Golang 服务的整洁架构模板。
- [Golang for Node.js Developers](https://github.com/miguelmota/golang-for-nodejs-developers) - 用于学习的 Golang 与 Node.js 对比示例。
- [The Go Interview Practice](https://github.com/RezaSi/go-interview-practice) - 一个 GitHub 仓库，提供用于 Go 技术面试准备的编码挑战。
- [ReadyToTouch](https://github.com/readytotouch/readytotouch) - 使用 Go 生产环境的[公司](https://readytotouch.com/golang/companies)和[职位](https://readytotouch.com/golang/jobs)开源列表。
- [golang-examples](https://github.com/SimonWaldherr/golang-examples) - 大量学习 Golang 的示例。
- [Awesome Golang Workshops](https://github.com/amit-davidson/awesome-golang-workshops) - 精选的 Go 工作坊列表。
- [Go in 7 days](https://github.com/harrytran103/7_days_of_go) - 7 天内学完 Go 的一切（来自 Node.js 开发者的视角）。
- [Design Patterns in Go](https://github.com/shubhamzanwar/design-patterns) - 用 Go 实现的编程设计模式集合。
- [Hex Monscape](https://github.com/Haraj-backend/hex-monscape) - 使用六边形架构编写可维护代码的入门指南。
- [gocryforhelp](https://github.com/ninedraft/gocryforhelp) - 需要帮助的 Go 项目集合，是开启 Go 开源之路的好地方。
- [awesome-go-extra](https://github.com/xwjdsh/awesome-go-extra) - 解析 awesome-go README 文件并生成包含仓库信息的新 README 文件。
- [Awesome Go @LibHunt](https://go.libhunt.com) - 你的 Go 工具箱首选。
- [Code with Mukesh](https://codewithmukesh.com/categories/golang) - 软件工程师与博客 @ codewithmukesh.com。
- [Coding Mystery](https://codingmystery.com) - 使用 Go 解决激动人心的密室逃脱风格编程挑战。
- [CodinGame](https://www.codingame.com/) - 通过小游戏作为实践示例，以交互式任务学习 Go。
- [Go Blog](https://blog.golang.org) - 官方 Go 博客。
- [Go Code Club](https://www.youtube.com/watch?v=nvoIPQYdx9g&list=PLEcwzBXTPUE_YQR7R0BRtHBYJ0LN3Y0i3) - 一群 Gopher 每周阅读并讨论一个不同的 Go 项目。
- [Go Community on Hashnode](https://hashnode.com/n/go) - Hashnode 上的 Gopher 社区。
- [Go Forum](https://forum.golangbridge.org) - 讨论 Go 的论坛。
- [Go Proverbs](https://go-proverbs.github.io/) - Rob Pike 的 Go 箴言。
- [Go Report Card](https://goreportcard.com) - 你的 Go 包的成绩单。
- [go.dev](https://go.dev/) - Go 开发者的中心。
- [Golang Developer Jobs](https://golangjob.xyz) - 仅面向 Golang 相关职位的开发者招聘。
- [Golang News](https://golangnews.com) - 关于 Go 编程的链接和新闻。
- [Golang Nugget](https://golangnugget.com) - 每周精选最佳 Go 内容，每周一发送到你的邮箱。
- [Golang Weekly](https://discu.eu/weekly/golang/) - 每周一推送关于 Go 的项目、教程和文章。
- [golang-nuts](https://groups.google.com/forum/#!forum/golang-nuts) - Go 邮件列表。
- [Gopher Community Chat](https://invite.slack.golangbridge.org) - 加入我们新的 Gopher Slack 社区（[了解其由来](https://blog.gopheracademy.com/gophers-slack-community/)）。
- [Gophercises](https://gophercises.com/) - 为初学 Gopher 准备的免费编程练习。
- [json2go](https://m-zajac.github.io/json2go) - 高级 JSON 到 Go 结构体转换——在线工具。
- [justforfunc](https://www.youtube.com/c/justforfunc) - 专注于 Go 编程语言技巧的 YouTube 频道，由 Francesc Campoy [@francesc](https://twitter.com/francesc) 主持。
- [Learn Go Programming](https://blog.learngoprogramming.com) - 通过插图学习 Go 概念。
- [Libs.tech](https://libs.tech/go) - – 精选的 Go 库和隐藏宝藏
- [Made with Golang](https://madewithgolang.com/?ref=awesome-go)
- [pkg.go.dev](https://pkg.go.dev/) - 开源 Go 包的文档。
- [studygolang](https://studygolang.com) - 中国 studygolang 社区。
- [Trending Go repositories on GitHub today](https://github.com/trending?l=go) - 寻找新 Go 库的好地方。
- [TutorialEdge - Golang](https://tutorialedge.net/course/golang/)
- [50 Shades of Go](https://golang50shades.github.io/) - 新 Golang 开发者的陷阱、坑和常见错误。
- [A Comprehensive Guide to Structured Logging in Go](https://betterstack.com/community/guides/logging/logging-in-go/) - 深入探索 Go 中的结构化日志，重点关注最近被接受的 slog 提案，该提案旨在将带级别的高性能结构化日志引入标准库。
- [A Guide to Golang E-Commerce](https://snipcart.com/blog/golang-ecommerce-ponzu-cms-demo?utm_term=golang-ecommerce-ponzu-cms-demo) - 构建一个 Golang 电商网站（包含演示）。
- [A Tour of Go](https://tour.golang.org/) - Go 交互式教程。
- [Build a Database in 1000 lines of code](https://link.medium.com/O9YQlx89Htb) - 用 1000 行代码从零构建 NoSQL 数据库。
- [Building and Testing a REST API in Go with Gorilla Mux and PostgreSQL](https://semaphoreci.com/community/tutorials/building-and-testing-a-rest-api-in-go-with-gorilla-mux-and-postgresql) - 我们将借助强大的 Gorilla Mux 编写一个 API。
- [Building Go Web Applications and Microservices Using Gin](https://semaphoreci.com/community/tutorials/building-go-web-applications-and-microservices-using-gin) - 熟悉 Gin，了解它如何帮助你减少样板代码并构建请求处理管道。
- [Caching Slow Database Queries](https://medium.com/@rocketlaunchr.cloud/caching-slow-database-queries-1085d308a0c9) - 如何缓存慢速数据库查询。
- [Canceling MySQL](https://medium.com/@rocketlaunchr.cloud/canceling-mysql-in-go-827ed8f83b30) - 如何取消 MySQL 查询。
- [CodeCrafters Golang Track](https://app.codecrafters.io/tracks/go) - 通过构建自己的 Redis、Docker、Git 和 SQLite 来精通高级 Go。涵盖 goroutine、系统编程、文件 I/O 等。
- [Games With Go](https://www.youtube.com/watch?v=9D4yH7e_ea8&list=PLDZujg-VgQlZUy1iCqBbe5faZLMkA3g2x) - 一个教授编程和游戏开发的视频系列。
- [Go By Example](https://gobyexample.com/) - 使用带注释的示例程序进行 Go 实践入门。
- [Go database/sql tutorial](http://go-database-sql.org/) - database/sql 入门。
- [Go Language Tutorial](https://www.tpointtech.com/go-tutorial) - 学习 Go 语言教程。
- [Go Tutorial](https://www.tutorialspoint.com/go/index.htm) - 学习 Go 编程。
- [Go WebAssembly Tutorial - Building a Simple Calculator](https://tutorialedge.net/golang/go-webassembly-tutorial/)
- [Golang Tutorial Guide](https://www.freecodecamp.org/news/golang-tutorial-list-free-courses-learn-go-programming-language/) - 学习 Go 编程语言的免费课程列表。
- [Golangbot](https://golangbot.com/learn-golang-series/) - Go 编程入门教程。
- [GopherCoding](https://gophercoding.com/) - 帮助解决日常问题的代码片段和教程集合。
- [GopherSnippets](https://gophersnippets.com/) - Go 编程语言的带测试和可测试示例的代码片段。
- [Gosamples](https://gosamples.dev/) - 解决日常代码问题的代码片段集合。
- [GraphQL with Go](https://hasura.io/learn/graphql/backend-stack/languages/go/) - 学习如何创建带代码生成的 Go GraphQL 服务器和客户端。还包括创建 REST 端点。
- [Hackr.io](https://hackr.io/tutorials/learn-golang) - 从 golang 编程社区提交和投票的最佳在线 golang 教程中学习 Go。
- [How to Benchmark: dbq vs sqlx vs GORM](https://medium.com/@rocketlaunchr.cloud/how-to-benchmark-dbq-vs-sqlx-vs-gorm-e814caacecb5) - 学习如何在 Go 中进行基准测试。作为案例研究，我们将对 dbq、sqlx 和 GORM 进行基准测试。
- [How To Deploy a Go Web Application with Docker](https://semaphoreci.com/community/tutorials/how-to-deploy-a-go-web-application-with-docker) - 学习如何将 Docker 用于 Go 开发，以及如何构建生产级 Docker 镜像。
- [How to Implement Role-Based Access Control (RBAC) Authorization in Golang](https://www.permit.io/blog/role-based-access-control-rbac-authorization-in-golang) - 在 Golang 中实现基于角色的访问控制（RBAC）的指南，包括代码示例，涵盖使用基于角色的授权保护应用端点的各种方法。
- [How to Use Godog for Behavior-driven Development in Go](https://semaphoreci.com/community/tutorials/how-to-use-godog-for-behavior-driven-development-in-go) - 开始使用 Godog——一个用于构建和测试 Go 应用程序的行为驱动开发框架。
- [Learning Go by examples](https://dev.to/aurelievache/learning-go-by-examples-introduction-448n) - 一系列文章，通过具体应用示例来学习 Golang 语言。
- [Microservices with Go](https://www.youtube.com/playlist?list=PLmD8u-IFdreyh6EUfevBcbiuCKzFk0EW_) - 深入使用 Go 构建微服务，包括 gRPC。
- [package main](https://www.youtube.com/packagemain) - 关于 Go 编程的 YouTube 频道。
- [Programming for Lovers](https://programmingforlovers.com) - 免费入门编程课程，围绕科学应用进行 Go 代码实操。
- [Programming with Google Go](https://www.coursera.org/specializations/google-golang) - Coursera 专项课程，从零开始学习 Go。
- [Scaling Go Applications](https://betterstack.com/community/guides/scaling-go/) - 关于在生产环境中构建、部署和扩展 Go 应用的一切。
- [The world’s easiest introduction to WebAssembly with Golang](https://medium.com/@martinolsansky/webassembly-with-golang-is-fun-b243c0e34f02)
- [Understanding Go in a visual way](https://dev.to/aurelievache/series/26234) - 可视化学习 Go
- [W3basic Go Tutorials](https://www.w3basic.com/golang/) - W3Basic 提供深入教程和条理清晰的内容，帮助学习 Golang 编程。
- [Your basic Go](https://yourbasic.org/golang) - 大量教程和操作指南合集。
- [The Go Developer Roadmap](https://roadmap.sh/golang) - 一份可视化路线图，新的 Go 开发者可以跟随它来学习 Go。
- [The Go Learning Path](https://tutorialedge.net/paths/golang/) - 一条引导式学习路径，包含免费和付费资源。
- [The Go Skill Tree](https://labex.io/skilltrees/go) - 一条结构化学习路径，结合了免费和付费资源。
:::

::: masonry
## 软件包
> 用 Go 编写的软件。
- [kubernetes](https://github.com/kubernetes/kubernetes) - 来自 Google 的容器集群管理器。
- [Moby](https://github.com/moby/moby) - 容器生态系统的协作项目，用于组装基于容器的系统。
- [traefik](https://github.com/containous/traefik) - 支持多个后端的反向代理和负载均衡器。
- [Gitea](https://github.com/go-gitea/gitea) - Gogs 的分支，完全由社区驱动。
- [croc](https://github.com/schollz/croc) - 轻松安全地将文件或文件夹从一台计算机发送到另一台。
- [restic](https://github.com/restic/restic) - 去重备份程序。
- [k9s](https://github.com/derailed/k9s) - Kubernetes CLI，以时尚方式管理你的集群。
- [k3s](https://github.com/k3s-io/k3s) - 轻量级 Kubernetes。
- [minikube](https://github.com/kubernetes/minikube) - 在本地运行 Kubernetes。
- [k6](https://github.com/grafana/k6) - 一个现代的负载测试工具，使用 Go 和 JavaScript。
- [colima](https://github.com/abiosoft/colima) - macOS（和 Linux）上的容器运行时，设置极简。
- [Vegeta](https://github.com/tsenart/vegeta) - HTTP 负载测试工具和库。它超过 9000！
- [lima](https://github.com/lima-vm/lima) - 专注于运行容器和本地虚拟机工作负载的 Linux 虚拟机。
- [Hey](https://github.com/rakyll/hey) - Hey 是一个向 Web 应用发送负载的小程序。
- [Gor](https://github.com/buger/gor) - HTTP 流量复制工具，用于将生产环境流量实时重放到预发布/开发环境。
- [chaosmonkey](https://github.com/Netflix/chaosmonkey) - 一个弹性工具，帮助应用容忍随机的实例故障。
- [Packer](https://github.com/mitchellh/packer) - Packer 是一个从单一源配置为多个平台创建相同机器镜像的工具。
- [kind](https://github.com/kubernetes-sigs/kind) - Kubernetes IN Docker - 用于测试 Kubernetes 的本地集群。
- [JuiceFS](https://github.com/juicedata/juicefs) - 基于 Redis 和 AWS S3 构建的分布式 POSIX 文件系统。
- [toxiproxy](https://github.com/shopify/toxiproxy) - 用于模拟网络和系统条件的代理，以进行自动化测试。
- [kubeshark](https://github.com/kubeshark/kubeshark) - Kubernetes 的 API 流量分析器，灵感来自 Wireshark，专为 Kubernetes 构建。
- [GVM](https://github.com/moovweb/gvm) - GVM 提供了管理 Go 版本的接口。
- [Comcast](https://github.com/tylertreat/Comcast) - 模拟不良网络连接。
- [Flannel](https://github.com/flannel-io/flannel) - Flannel 是用于容器的网络结构，专为 Kubernetes 设计。
- [scc](https://github.com/boyter/scc) - Sloc Cloc and Code，一个非常快速准确的代码计数器，包含复杂度计算和 COCOMO 估算。
- [ko](https://github.com/google/ko) - 用于在 Kubernetes 上构建和部署 Go 应用的命令行工具。
- [Ddosify](https://github.com/ddosify/ddosify) - 用 Golang 编写的高性能负载测试工具。
- [confd](https://github.com/kelseyhightower/confd) - 使用模板以及 etcd 或 consul 中的数据管理本地应用程序配置文件。
- [KubeVela](https://github.com/kubevela/kubevela) - 云原生应用交付。
- [LiteIDE](https://github.com/visualfc/liteide) - LiteIDE 是一款简单、开源、跨平台的 Go IDE。
- [Backrest](https://github.com/garethgeorge/backrest) - 基于 Web 的 restic 备份 UI 和编排器。
- [script](https://github.com/bitfield/script) - 让在 Go 中编写类似 shell 的脚本变得容易，用于 DevOps 和系统管理任务。
- [blocky](https://github.com/0xERR0R/blocky) - 快速轻量的 DNS 代理，作为本地网络的广告拦截器，功能丰富。
- [Fleet device management](https://github.com/fleetdm/fleet) - 轻量级、可编程的服务器和工作站遥测。
- [bombardier](https://github.com/codesenberg/bombardier) - 快速的跨平台 HTTP 基准测试工具。
- [drive](https://github.com/odeke-em/drive) - 命令行 Google Drive 客户端。
- [k3d](https://github.com/k3d-io/k3d) - 在 Docker 中运行 CNCF 的 k3s 的小助手。
- [k0s](https://github.com/k0sproject/k0s) - 零摩擦 Kubernetes 发行版。
- [podinfo](https://github.com/stefanprodan/podinfo) - Podinfo 是一个用 Go 制作的小型 Web 应用，展示了在 Kubernetes 中运行微服务的最佳实践。Podinfo 被 Flux 和 Flagger 等 CNCF 项目用于端到端测试和研讨会。
- [Duplicacy](https://github.com/gilbertchen/duplicacy) - 基于无锁去重思想的跨平台网络和云备份工具。
- [nes](https://github.com/fogleman/nes) - 用 Go 编写的任天堂娱乐系统（NES）模拟器。
- [gaia](https://github.com/gaia-pipeline/gaia) - 用任何编程语言构建强大的流水线。
- [tau](https://github.com/taubyte/tau) - 轻松构建云计算平台，具备无服务器 WebAssembly 函数、前端托管、CI/CD、对象存储、K/V 数据库和发布-订阅消息等功能。
- [Pomerium](https://github.com/pomerium/pomerium) - Pomerium 是一个身份感知的访问代理。
- [s5cmd](https://github.com/peak/s5cmd) - 极速的 S3 和本地文件系统执行工具。
- [kubefwd](https://github.com/txn2/kubefwd) - 批量 Kubernetes 端口转发，每个服务具有独立 IP，用于本地开发。
- [docker-volume-backup](https://github.com/offen/docker-volume-backup) - 将 Docker 卷备份到本地或任何 S3、WebDAV、Azure Blob Storage、Dropbox 或 SSH 兼容存储。
- [kubeblocks](https://github.com/apecloud/kubeblocks) - KubeBlocks 是一个开源控制平面，用于在 K8s 上运行和管理数据库、消息队列及其他数据基础设施。
- [Gokapi](https://github.com/Forceu/gokapi) - 轻量级文件共享服务器，文件在设定的下载次数或天数后过期。类似于 Firefox Send，但不支持公开上传。
- [aptly](https://github.com/aptly-dev/aptly) - aptly 是一个 Debian 仓库管理工具。
- [myLG](https://github.com/mehrdadrad/mylg) - 用 Go 编写的命令行网络诊断工具。
- [GoBoy](https://github.com/Humpheh/goboy) - 用 Go 编写的任天堂 Game Boy Color 模拟器。
- [Stack Up](https://github.com/pressly/sup) - Stack Up，一个超级简单的部署工具——仅基于 Unix——可以将其视为服务器网络的“make”。
- [lgo](https://github.com/yunabe/lgo) - 使用 Jupyter 进行交互式 Go 编程。支持代码补全、代码检查，并 100% 兼容 Go。
- [Documize](https://github.com/documize/community) - 现代 wiki 软件，集成来自 SaaS 工具的数据。
- [ghorg](https://github.com/gabrie30/ghorg) - 快速将整个组织或用户的仓库克隆到一个目录——支持 GitHub、GitLab、Gitea 和 Bitbucket。
- [kala](https://github.com/ajvb/kala) - 简约、现代、高性能的作业调度器。
- [sonic](https://github.com/go-sonic/sonic) - Sonic 是一个 Go 博客平台。简单而强大。
- [Plakar](https://github.com/PlakarKorp/plakar) - 一个加密、去重、可验证且可扩展的备份引擎，无供应商锁定。
- [Circuit](https://github.com/gocircuit/circuit) - Circuit 是一个可编程的平台即服务（PaaS）和/或基础设施即服务（IaaS），用于管理、发现、同步和编排构成云应用的服务和主机。
- [tldx](https://github.com/brandonyoungdev/tldx) - 使用 RDAP、DNS 和 WHOIS 回退的批量域名可用性检查器，支持关键字排列生成。
- [fac](https://github.com/mkchoi212/fac) - 修复 git 合并冲突的命令行用户界面。
- [Plik](https://github.com/root-gg/plik) - Plik 是一个用 Go 编写的临时文件上传系统（类似 Wetransfer）。
- [portal](https://github.com/SpatiumPortae/portal) - Portal 是一款快速简便的命令行文件传输工具，可在任意两台计算机之间传输文件。
- [go-selfupdate](https://github.com/sanbornm/go-selfupdate) - 让你的 Go 应用能够自更新。
- [StatusOK](https://github.com/sanathp/statusok) - 监控您的网站和 REST API。当服务器宕机或响应时间超出预期时，通过 Slack、电子邮件通知您。
- [borg](https://github.com/crufter/borg) - 基于终端的 bash 代码片段搜索引擎。
- [shell2http](https://github.com/msoap/shell2http) - 通过 HTTP 服务器执行 shell 命令（用于原型设计或远程控制）。
- [tlm](https://github.com/yusufcanb/tlm) - 由 CodeLLaMa 驱动的本地 CLI 副驾驶。
- [bluetuith](https://github.com/bluetuith-org/bluetuith) - Linux 的 TUI 蓝牙管理器。
- [uTask](https://github.com/ovh/utask) - 自动化引擎，用于建模和执行以 yaml 声明的业务流程。
- [KubeVPN](https://github.com/kubenetworks/kubevpn) - KubeVPN 提供云原生开发环境，无缝连接你的 Kubernetes 集群网络。
- [PipeCD](https://github.com/pipe-cd/pipecd) - GitOps 风格的持续交付平台，为任何应用提供一致的部署和运维体验。
- [KusionStack](https://github.com/KusionStack/kusion) - 统一的可编程配置技术栈，以“平台即代码”和“基础设施即代码”方式交付现代应用。
- [podman-tui](https://github.com/containers/podman-tui) - 用于 Podman 管理的终端 UI。
- [vFlow](https://github.com/VerizonDigital/vflow) - 高性能、可扩展且可靠的 IPFIX、sFlow 和 Netflow 收集器。
- [s3gof3r](https://github.com/rlmcpherson/s3gof3r) - 针对高速传输大对象进出 Amazon S3 优化的小型工具/库。
- [peg](https://github.com/pointlander/peg) - Peg，解析表达式文法，是 Packrat 解析器生成器的一种实现。
- [skm](https://github.com/TimothyYe/skm) - SKM 是一个简单而强大的 SSH 密钥管理器，帮助你轻松管理多个 SSH 密钥！
- [GoNB](https://github.com/janpfeifer/gonb) - 使用 Jupyter Notebook 进行交互式 Go 编程（也适用于 VSCode、Binder 和 Google Colab）。
- [kwatch](https://github.com/abahmed/kwatch) - 即时监控并检测 Kubernetes(K8s) 集群中的崩溃。
- [Scaleway-cli](https://github.com/scaleway/scaleway-cli) - 从命令行管理裸金属服务器（像使用 Docker 一样简单）。
- [Updatecli](https://github.com/updatecli/updatecli) - 通用声明式更新策略引擎。
- [Go Package Store](https://github.com/shurcooL/Go-Package-Store) - 显示 GOPATH 中 Go 包更新的应用。
- [yai](https://github.com/ekkinox/yai) - AI 驱动的终端助手。
- [cassowary](https://github.com/rogerwelin/cassowary) - 用 Go 编写的现代跨平台 HTTP 负载测试工具。
- [gfile](https://github.com/Antonito/gfile) - 通过 WebRTC 在两台计算机之间安全传输文件，无需任何第三方。
- [Leaps](https://github.com/jeffail/leaps) - 使用操作转换的结对编程服务。
- [sake](https://github.com/alajmo/sake) - sake 是一个用于本地和远程主机的命令运行器。
- [onWatch](https://github.com/onllm-dev/onWatch) - 在本地监控各提供商的 AI API 配额，具有历史跟踪、警报和 Web 仪表板，以避免意外的限流和预算超支。
- [kool](https://github.com/kool-dev/kool) - 以简单方式管理 Docker 环境的命令行工具。
- [Chapar](https://github.com/chapar-rest/chapar) - Chapar 是使用 go 构建的跨平台 Postman 替代品，旨在帮助开发者测试其 API 端点。它支持 http 和 grpc 协议。
- [alaz](https://github.com/ddosify/alaz) - 轻松、低开销、基于 eBPF 的 Kubernetes 监控。
- [Guora](https://github.com/meloalright/guora) - 用 Go 编写的自托管类 Quora 网络应用。
- [gocc](https://github.com/goccmack/gocc) - Gocc 是一个用 Go 编写的 Go 编译器工具包。
- [Gebug](https://github.com/moshebe/gebug) - 通过无缝启用调试器和热重载功能，使调试 Dockerized Go 应用程序变得非常容易的工具。
- [aurora](https://github.com/xuri/aurora) - 跨平台的基于 Web 的 Beanstalkd 队列服务器控制台。
- [mockingjay](https://github.com/quii/mockingjay-server) - 从一个配置文件生成假 HTTP 服务器和消费者驱动契约。您还可以让服务器随机出错，以帮助进行更真实的性能测试。
- [govvv](https://github.com/ahmetalpbalkan/govvv) - “go build” 包装器，轻松将版本信息添加到 Go 二进制文件中。
- [woke](https://github.com/get-woke/woke) - 检测源代码中的非包容性语言。
- [s3-proxy](https://github.com/oxyno-zeta/s3-proxy) - S3 代理，支持 GET、PUT 和 DELETE 方法以及认证（OpenID Connect 和 Basic Auth）。
- [go-peerflix](https://github.com/Sioro-Neoku/go-peerflix) - 视频流媒体种子客户端。
- [mac-cleanup-go](https://github.com/2ykwang/mac-cleanup-go) - 预览优先的 TUI，用于清理 macOS 缓存、日志和临时文件。
- [Pewpew](https://github.com/bengadbois/pewpew) - 灵活的 HTTP 命令行压力测试工具。
- [aws-doctor](https://github.com/elC0mpa/aws-doctor) - 直接从终端诊断 AWS 成本、检测空闲资源并优化云支出 🩺 ☁️。
- [jcli](https://github.com/jenkins-zh/jenkins-cli) - Jenkins CLI 让你轻松管理 Jenkins。
- [gobrew](https://github.com/kevincobain2000/gobrew) - Go 版本管理器。超级简单的工具，用于安装和管理 Go 版本。无需 root 即可安装 Go。Gobrew 不需要 shell rehash。
- [hotswap](https://github.com/edwingeng/hotswap) - 无需重启服务器、中断或阻塞任何正在进行的进程即可重新加载 Go 代码的完整解决方案。
- [ide](https://github.com/thestrukture/ide) - 浏览器可访问的 IDE。专为 Go 设计，用 Go 编写。
- [Spinifex](https://github.com/mulgadc/spinifex) - 自托管的、兼容 AWS 的云平台，为裸机、边缘和本地基础设施提供 EC2、EBS、S3、VPC 和 IAM API。
- [stew](https://github.com/marwanhawari/stew) - 一个独立的编译二进制包管理器。
- [easyssh-proxy](https://github.com/appleboy/easyssh-proxy) - Golang 包，通过 `ProxyCommand` 轻松实现 SSH 远程执行和 SCP 下载。
- [Neo-cowsay](https://github.com/Code-Hex/Neo-cowsay) - 🐮 cowsay 重生。迎接新时代。
- [lstags](https://github.com/ivanilves/lstags) - 用于在不同注册表之间同步 Docker 镜像的工具和 API。
- [crawley](https://github.com/s0rg/crawley) - 用于 CLI 的 Web 爬虫/爬取器。
- [gonative](https://github.com/inconshreveable/gonative) - 创建 Go 构建的工具，可交叉编译到所有平台，同时仍使用启用 Cgo 的 stdlib 包。
- [trubka](https://github.com/xitonix/trubka) - 用于管理和排查 Apache Kafka 集群的 CLI 工具，能够通用地发布/消费协议缓冲区和纯文本事件到 Kafka 或从 Kafka 接收。
- [Mora](https://github.com/emicklei/mora) - 用于访问 MongoDB 文档和元数据的 REST 服务器。
- [Balerter](https://github.com/balerter/balerter) - 一个自托管的基于脚本的告警管理器。
- [manssh](https://github.com/xwjdsh/manssh) - manssh 是一个用于轻松管理 ssh 别名配置的命令行工具。
- [wellington](https://github.com/wellington/wellington) - Sass 项目管理工具，通过精灵图函数扩展语言（如 Compass）。
- [Cherry](https://github.com/rafael-santiago/cherry) - Go 编写的微型 Web 聊天服务器。
- [terraform-provider-openapi](https://github.com/dikhan/terraform-provider-openapi) - Terraform 提供程序插件，根据包含 API 定义的 OpenAPI 文档（原称 swagger 文件）在运行时动态配置自身。
- [dish](https://github.com/thevxn/dish) - 一个轻量级、可远程配置的监控服务。
- [dogo](https://github.com/liudng/dogo) - 监控源文件变化并自动编译和运行（重启）。
- [fjira](https://github.com/mk-5/fjira) - 基于模糊搜索的 Attlasian Jira 终端 UI 应用程序。
- [tcpdog](https://github.com/mehrdadrad/tcpdog) - 基于 eBPF 的 TCP 可观测性。
- [godbg](https://github.com/sirnewton01/godbg) - 基于 Web 的 gdb 前端应用。
- [kcli](https://github.com/cswank/kcli) - 用于检查 Kafka 主题/分区/消息的命令行工具。
- [abbreviate](https://github.com/dnnrly/abbreviate) - abbreviate 是一个工具，可将长字符串转换为较短的字符串，并支持可配置的分隔符，例如将分支名嵌入部署栈 ID 中。
- [Blast](https://github.com/dave/blast) - 一个用于 API 负载测试和批处理作业的简单工具。
- [joincap](https://github.com/assafmo/joincap) - 用于合并多个 pcap 文件的命令行工具。
- [sortie](https://github.com/sortie-ai/sortie) - 将 tracker 工单转化为自主编码代理会话。
- [gobrew](https://github.com/cryptojuice/gobrew) - gobrew 让你轻松在多个 Go 版本之间切换。
- [Orbit](https://github.com/gulien/orbit) - 用于运行命令和从模板生成文件的简单工具。
- [Dockerfile-Generator](https://github.com/ozankasikci/dockerfile-generator) - 一个 Go 库和一个可执行文件，可通过各种输入通道生成有效的 Dockerfile。
- [goma-gateway](https://github.com/jkaninda/goma-gateway) - 轻量级 API 网关和反向代理，具有声明式配置、健壮的中间件，并支持 REST、GraphQL、TCP、UDP 和 gRPC。
- [sigma](https://github.com/go-sigma/sigma) - OCI 原生容器镜像仓库，支持 OCI 原生制品、扫描制品、镜像构建等。
- [ostent](https://github.com/ostrost/ostent) - 收集并显示系统指标，可选地转发到 Graphite 和/或 InfluxDB。
- [drone-scp](https://github.com/appleboy/drone-scp) - 使用二进制、Docker 或 Drone CI 通过 SSH 复制文件和工件。
- [grapes](https://github.com/yaronsumel/grapes) - 轻量级工具，旨在轻松通过 SSH 分发命令。
- [winrm-cli](https://github.com/masterzen/winrm-cli) - 用于在 Windows 机器上远程执行命令的 CLI 工具。
- [tf-profile](https://github.com/datarootsio/tf-profile) - Terraform 运行分析器。生成全局统计、资源级统计或可视化。
- [vaku](https://github.com/lingrino/vaku) - 用于 Vault 中基于文件夹的函数（如复制、移动和搜索）的 CLI 和 API。
- [CrunchyCleaner](https://github.com/Knuspii/CrunchyCleaner) - 适用于 Windows 和 Linux 的轻量级软件缓存清理工具。
- [GooseForum](https://github.com/leancodebox/GooseForum) - 使用 Go、Vue 和 Tailwind CSS 构建的自托管论坛平台。
- [decompose](https://github.com/s0rg/decompose) - 用于生成和处理 Docker 容器连接图的工具。
- [go-rocket-update](https://github.com/mouuff/go-rocket-update) - 让 Go 应用自更新的简单方法——支持 Github 和 Gitlab。
- [Mantil](https://github.com/mantil-io/mantil) - 用于在 AWS 上构建无服务器应用的 Go 专用框架，让你专注于纯 Go 代码，而 Mantil 负责基础设施。
- [go-furnace](https://github.com/go-furnace/go-furnace) - 用 Go 编写的托管解决方案。轻松在 AWS、GCP 或 DigitalOcean 上部署你的应用。
- [mq-studio](https://github.com/amigoer/mq-studio) - 跨平台桌面客户端，用于管理和监控 RocketMQ、RabbitMQ、Kafka、Pulsar、Redis Stream、MQTT、NATS 和 ActiveMQ 集群。
- [boxed](https://github.com/tejo/boxed) - 基于 Dropbox 的博客引擎。
- [dp](https://github.com/scryinfo/dp) - 通过用于区块链数据交换的 SDK，开发者可以轻松访问 DAPP 开发。
- [Dropship](https://github.com/chrismckenzie/dropship) - 通过 CDN 部署代码的工具。
- [KeibiDrop](https://github.com/KeibiSoft/KeibiDrop) - 按需点对点文件系统，挂载远程文件夹并通过预读隐藏链路延迟，使用 X25519 和 ML-KEM-1024 混合端到端加密。
- [docker-go-mingw](https://github.com/x1unix/docker-go-mingw) - 使用 MinGW 工具链为 Windows 构建 Go 二进制的 Docker 镜像。
- [httpref](https://github.com/dnnrly/httpref) - httpref 是一个方便的 CLI 参考，涵盖 HTTP 方法、状态码、标头以及 TCP 和 UDP 端口。
- [drone-jenkins](https://github.com/appleboy/drone-jenkins) - 使用二进制、docker 或 Drone CI 触发下游 Jenkins 作业。
- [Seaweed File System](https://github.com/chrislusf/seaweedfs) - 快速、简单且可扩展的分布式文件系统，具有 O(1) 磁盘寻道。
- [awsenv](https://github.com/soniah/awsenv) - 为某个配置文件加载 Amazon（AWS）环境变量的小型二进制文件。
- [lwc](https://github.com/timdp/lwc) - UNIX wc 命令的实时更新版本。
- [Rodent](https://github.com/alouche/rodent) - Rodent 帮助你管理 Go 版本、项目并跟踪依赖。
- [LightCMS](https://github.com/jonradoff/lightcms) - 自托管内容管理系统，具备静态页面生成、基于角色的访问控制，以及用于代理驱动内容操作的 MCP 服务器。
- [DepCharge](https://github.com/centerorbit/depcharge) - 帮助编排大型项目中众多依赖之间的命令执行。
- [naclpipe](https://github.com/unix4fun/naclpipe) - 用 Go 编写的基于 NaCL EC25519 的简单加密管道工具。
- [tinycare-tui](https://github.com/DMcP89/tinycare-tui) - 小型终端应用，显示过去 24 小时和一周的 git 提交、当前天气、一些自我关怀建议、一个笑话以及你当前的待办任务。
- [wait-for](https://github.com/dnnrly/wait-for) - 在继续之前等待某事发生（从命令行）。轻松编排 Docker 服务和其他事物。
- [Snitch](https://github.com/lucasgomide/snitch) - 当有人通过 Tsuru 部署任何应用时，以简单方式通知你的团队和许多工具。
- [chicha-isotope-map](https://github.com/matveynator/chicha-isotope-map) - 自托管的公共辐射地图，用于导入、分析和可视化测量轨迹。
- [gotermfx](https://github.com/mohamedation/gotermfx) - 零依赖终端动画 CLI，内置效果，并提供小型 API 用于自定义动画。
- [dispositio](https://github.com/tsraveling/dispositio) - 用于以简单 markdown 规划大型项目的终端工具。
- [GoDocTooltip](https://github.com/diankong/GoDocTooltip) - Go Doc 网站的 Chrome 扩展，在函数列表中以工具提示显示函数描述。
- [hoofli](https://github.com/dnnrly/hoofli) - 从 Chrome 或 Firefox 网络检查生成 PlantUML 图。
- [pingtower](https://github.com/crleonard/pingtower) - 轻量级自托管网站和 API 正常运行时间监控器。
- [sg](https://github.com/ChristopherRabotin/sg) - 对一组 HTTP 端点进行基准测试（如 ab），可根据前一次响应使用响应代码和数据对特定服务器进行压力测试。
- [GURL](https://github.com/matveynator/gurl) - 当 CURL 提示 SSL 库太旧时——使用 GURL。单文件，零 SSL 依赖。
- [mdv](https://github.com/Allra-Fintech/mdv) - 在浏览器中渲染 Markdown 文件的 CLI 工具，支持实时重载、GFM、语法高亮、Mermaid 图表和 PDF 导出。
- [metricsd](https://github.com/0x524A/metricsd) - 轻量级指标收集器，带插件系统，可发送到 Prometheus、Splunk HEC 和 HTTP JSON 端点。
- [tickstem/uptime](https://github.com/tickstem/uptime) - 用于 HTTP 正常运行时间监控的 Go 客户端，支持 SSL 过期警报和可配置的响应断言。
- [claude-grep](https://github.com/evoleinik/claude-grep) - 使用正则表达式和语义（向量）搜索搜索 Claude Code 会话历史。
- [ScheduleGate](https://github.com/gjunqueira-sys/ScheduleGate) - DCMA 14 点进度评估 CLI，用于 MS Project Excel/CSV 导出。
- [gitl](https://github.com/akomyagin/gitl) - 对 git 提交范围进行 AI 审查，带有风险评分（低/中/高）、变更日志生成和多仓库活动摘要。包含 GitHub Action。
- [zerohand](https://github.com/nilpoona/zerohand) - 简单高效的 Web API 负载测试工具。
- [docklite](https://github.com/benzjeremy/docklite) - 轻量级 Portainer 替代方案，用于 Docker 容器管理，支持实时 SSE 指标。
- [SiteBrush](https://github.com/matveynator/sitebrush) - 保留网站。淘汰 WordPress。将现有网站转换为可编辑的静态 HTML，无需重新设计。
- [spotify-screensaver](https://github.com/benzjeremy/spotify-screensaver) - Spotify 桌面屏保，带有数字 OLED 时钟、画布音频可视化器和 MPRIS 控制。
- [untis-go](https://github.com/benzjeremy/untis-go) - 面向学生和教师的快速、原生 WebUntis 桌面客户端。侧边栏导航、课程表、作业、缺勤和消息。AES-256-GCM 加密凭据，SQLite 缓存优先，随机端口安全。
- [Den](https://github.com/us/den) - 面向 AI 代理的自托管沙箱运行时。开源的 E2B 替代方案。
- [Docker](https://www.docker.com/) - 面向开发者和系统管理员的分布式应用开放平台。
- [gitea-github-migrator](https://git.jonasfranz.software/JonasFranzDEV/gitea-github-migrator) - 将所有 GitHub 仓库、问题、里程碑和标签迁移到你的 Gitea 实例。
- [Gogs](https://gogs.io/) - 用 Go 编程语言编写的自托管 Git 服务。
- [Wide](https://wide.b3log.org/login) - 基于 Web 的团队 IDE，使用 Golang。
- [Better Go Playground](https://goplay.tools) - 具有语法高亮、代码补全和其他功能的 Go playground。
- [goblin](https://goblin.run) - 用 Go 语言编写的 CLI 云构建器。
- [GoLand](https://jetbrains.com/go) - 功能齐全的跨平台 Go IDE。
- [hugo](https://gohugo.io/) - 快速且现代的静态网站引擎。
- [Juju](https://jujucharms.com/) - 云无关的服务部署与编排——支持 EC2、Azure、Openstack、MAAS 等。
- [Layli](https://layli.app) - 以代码形式绘制漂亮的布局图。
- [limetext](https://limetext.github.io) - Lime Text 是一款主要用 Go 开发的强大而优雅的文本编辑器，旨在成为 Sublime Text 的自由开源软件继任者。
- [syncthing](https://syncthing.net/) - 开放、去中心化的文件同步工具和协议。
- [tsuru](https://tsuru.io/) - 可扩展且开源的平台即服务软件。
- [Wave Terminal](https://waveterm.dev) - Wave 是一个开源的、AI 原生的终端，专为无缝开发者工作流而设计，具有内联渲染、现代 UI 和持久会话。
- [zs](https://git.mills.io/prologic/zs) - 一个极其简约的静态站点生成器。
:::

::: masonry
## Web 框架
> 全栈 Web 框架。
- [Gin](https://github.com/gin-gonic/gin) - Gin 是一个用 Go 编写的 Web 框架！它拥有类似 Martini 的 API，但性能更佳，最高可快 40 倍。如果你需要高性能和良好的生产力。
- [Fiber](https://github.com/gofiber/fiber) - 受 Express.js 启发、基于 Fasthttp 构建的 Web 框架。
- [Echo](https://github.com/labstack/echo) - 高性能、极简的 Go Web 框架。
- [Beego](https://github.com/beego/beego) - beego 是一个开源的、高性能的 Go 编程语言 Web 框架。
- [chi](https://github.com/go-chi/chi) - 基于 net/context 构建的小巧、快速且富有表现力的 HTTP 路由器。
- [mux](https://github.com/gorilla/mux) - golang 的强大 URL 路由器和分发器。
- [GoFr](https://github.com/gofr-dev/gofr) - Gofr 是一个固执己见的微服务开发框架。
- [httprouter](https://github.com/julienschmidt/httprouter) - 高性能路由器。使用它和标准 http 处理器可构建高性能 Web 框架。
- [GoFrame](https://github.com/gogf/gf) - GoFrame 是一个模块化、功能强大、高性能且企业级的 Golang 应用开发框架。
- [Revel](https://github.com/revel/revel) - Go 语言的高生产力 Web 框架。
- [negroni](https://github.com/urfave/negroni) - Golang 的惯用 HTTP 中间件。
- [Hertz](https://github.com/cloudwego/hertz) - 一个高性能、强扩展性的 Go HTTP 框架，帮助开发者构建微服务。
- [Goa](https://github.com/goadesign/goa) - Goa 为使用 Go 开发远程 API 和微服务提供了一种整体方法。
- [goravel](https://github.com/goravel/goravel) - 一个受 Laravel 启发的 Web 框架，内置 ORM、认证、队列、任务调度等特性。
- [Huma](https://github.com/danielgtaylor/huma/) - 面向现代 REST/GraphQL API 的框架，内置 OpenAPI 3、生成的文档和 CLI。
- [alice](https://github.com/justinas/alice) - Go 的无痛中间件链。
- [CORS](https://github.com/rs/cors) - 轻松为你的 API 添加 CORS 功能。
- [Tollbooth](https://github.com/didip/tollbooth) - HTTP 请求处理器限流。
- [Limiter](https://github.com/ulule/limiter) - Go 的极简速率限制中间件。
- [render](https://github.com/unrolled/render) - 用于轻松渲染 JSON、XML 和 HTML 模板响应的 Go 包。
- [Goyave](https://github.com/go-goyave/goyave) - 功能完备的 REST API 框架，旨在实现简洁代码和快速开发，内置强大功能。
- [Fuego](https://github.com/go-fuego/fuego) - 为忙碌的 Go 开发者打造的框架！从源代码生成 OpenAPI 3 规范的 Web 框架。
- [shadcn-templ](https://github.com/axadrn/shadcn-templ) - 非官方的 shadcn/ui 移植版，适用于 Go 和 templ：提供可访问的 UI 组件，并带有 CLI 和注册表。
- [gocraft/web](https://github.com/gocraft/web) - Go 的 Mux 和中间件包。
- [Atreugo](https://github.com/savsgio/atreugo) - 高性能、可扩展的微 Web 框架，热路径零内存分配。
- [Bone](https://github.com/go-zoo/bone) - 极速 HTTP 多路复用器。
- [Goji](https://github.com/goji/goji) - Goji 是一个极简且灵活的 HTTP 请求多路复用器，支持 `net/context`。
- [fasthttprouter](https://github.com/buaazp/fasthttprouter) - 从 `httprouter` 派生出的高性能路由器，是第一个适用于 `fasthttp` 的路由器。
- [Yokai](https://github.com/ankorstore/yokai) - 简单、模块化且可观测的 Go 后端应用框架。
- [iWF](https://github.com/indeedeng/iwf) - iWF 是一个用于开发长期运行业务流程的一体化平台。它提供了利用数据库、ElasticSearch、消息队列、持久定时器等服务的便捷抽象，并具有简洁、简单且用户友好的界面。
- [httptreemux](https://github.com/dimfeld/httptreemux) - Go 的高速、灵活、基于树的 HTTP 路由器，灵感来自 httprouter。
- [Flamingo Commerce](https://github.com/i-love-flamingo/flamingo-commerce) - 使用 DDD 和端口与适配器等整洁架构提供电子商务功能，可用于构建灵活的电子商务应用。
- [stats](https://github.com/thoas/stats) - 存储 Web 应用各种信息的 Go 中间件。
- [Fastschema](https://github.com/fastschema/fastschema) - 一个灵活的 Go Web 框架和 Headless CMS。
- [rk-boot](https://github.com/rookie-ninja/rk-boot) - 一个引导库，用于快速轻松地使用 Gin 和 gRPC 构建企业级 Go 微服务。
- [Flamingo](https://github.com/i-love-flamingo/flamingo) - 用于可插拔 Web 项目的框架。包括模块概念，并提供 DI、配置区域、i18n、模板引擎、graphql、可观测性、安全性、事件、路由和反向路由等功能。
- [go-fault](https://github.com/github/go-fault) - Go 的故障注入中间件。
- [xujiajun/gorouter](https://github.com/xujiajun/gorouter) - 一个简单快速的 Go HTTP 路由器。
- [ozzo-routing](https://github.com/go-ozzo/ozzo-routing) - 极快的 Go HTTP 路由器，支持正则表达式路由匹配，并完整支持构建 RESTful API。
- [lars](https://github.com/go-playground/lars) - 用于 Go 的轻量、快速、可扩展的零分配 HTTP 路由器，可用于创建可定制框架。
- [uAdmin](https://github.com/uadmin/uadmin) - 功能完备的 Golang Web 框架，受 Django 启发。
- [Siesta](https://github.com/VividCortex/siesta) - 用于编写中间件和处理器的可组合框架。
- [WebGo](https://github.com/naughtygopher/webgo) - 一个用于构建 Web 应用的微框架，支持处理程序链、中间件和上下文注入。使用符合标准库的 HTTP 处理程序（即 `http.HandlerFunc`）。
- [Ginrpc](https://github.com/xxjwxc/ginrpc) - Gin 参数自动绑定工具，Gin RPC 工具。
- [interpose](https://github.com/carbocation/interpose) - golang 的极简 net/http 中间件。
- [vestigo](https://github.com/husobee/vestigo) - 高性能、独立、符合 HTTP 规范的 URL 路由器，适用于 go Web 应用。
- [renderer](https://github.com/thedevsaddam/renderer) - Go 的简单、轻量且更快的响应（JSON、JSONP、XML、YAML、HTML、File）渲染包。
- [Andurel](https://github.com/mbvlabs/andurel) - 受 Rails 启发的全栈 Go Web 框架，提供脚手架、数据库工具以及服务端渲染或 Inertia 前端。
- [muxchain](https://github.com/stephens2424/muxchain) - 轻量级 net/http 中间件。
- [gowww/router](https://github.com/gowww/router) - 闪电般快速的 HTTP 路由器，完全兼容 net/http.Handler 接口。
- [hiboot](https://github.com/hidevopsio/hiboot) - hiboot 是一个支持自动配置和依赖注入的高性能 Web 应用框架。
- [ln-paywall](https://github.com/philippgille/ln-paywall) - 用于通过闪电网络（比特币）按请求实现 API 货币化的 Go 中间件。
- [GoRouter](https://github.com/vardius/gorouter) - GoRouter 是一个 Server/API 微框架、HTTP 请求路由器、多路复用器，提供支持 `net/context` 的中间件请求路由器。
- [pure](https://github.com/go-playground/pure) - 一个坚持标准 "net/http" 实现的轻量级 HTTP 路由器。
- [alien](https://github.com/gernest/alien) - 来自外太空的轻量快速 HTTP 路由器。
- [Gone](https://github.com/gone-io/gone) - 一个受 Spring 启发的轻量级依赖注入和 Web 框架。
- [patron](https://github.com/beatlabs/patron) - Patron 是一个遵循最佳云实践、注重生产力的微服务框架。
- [Microservice](https://github.com/claygod/microservice) - 用于创建微服务的框架，使用 Golang 编写。
- [doors](https://github.com/doors-dev/doors) - 服务端驱动的框架，完全用 Go 构建有状态、响应式的 Web 应用。
- [violetear](https://github.com/nbari/violetear) - Go HTTP 路由器。
- [gores](https://github.com/alioygur/gores) - 处理 HTML、JSON、XML 等响应的 Go 包，适用于 RESTful API。
- [Bxog](https://github.com/claygod/Bxog) - Go 的简单快速 HTTP 路由器，支持不同难度、长度和嵌套的路由，并能根据接收的参数创建 URL。
- [Barf](https://github.com/opensaucerer/barf) - 基本上，这是一个用于构建基于 JSON 的 Web API 的卓越框架。它完全不突兀，不重复造轮子。它设计得既易于快速上手，又足够灵活以应对更复杂的用例。
- [rux](https://github.com/gookit/rux) - 用于构建 Golang HTTP 应用的简单快速 Web 框架。
- [xmux](https://github.com/rs/xmux) - 基于 `httprouter` 的高性能多路复用器，支持 `net/context`。
- [XFF](https://github.com/sebest/xff) - 处理 `X-Forwarded-For` 头及相关头。
- [Xun](https://github.com/yaitoo/xun) - 基于 Go 内置的 html/template 和 net/http 包的路由器构建的 Web 框架。它设计为轻量、快速且易于使用，同时提供简单直观的 API，用于构建具有中间件、路由和模板渲染等高级功能的 Web 应用。
- [mediary](https://github.com/HereMobilityDevelopers/mediary) - 为 `http.Client` 添加拦截器，以支持请求/响应的转储、整形、追踪等。
- [rk-grpc](https://github.com/rookie-ninja/rk-grpc) - 用于 gRPC 的中间件，支持日志、指标、认证、追踪等。
- [goblin](https://github.com/bmf-san/goblin) - 基于字典树的 golang HTTP 路由器。
- [ngamux](https://github.com/ngamux/ngamux) - Go 的简单 HTTP 路由器。
- [chain](https://github.com/codemodus/chain) - 带作用域数据的处理器包装链（基于 net/context 的 "middleware"）。
- [Don](https://github.com/abemedia/go-don) - 一个高性能且易于使用的 API 框架。
- [bellt](https://github.com/GuilhermeCaruso/bellt) - 一个简单的 Go HTTP 路由器。
- [rk-gin](https://github.com/rookie-ninja/rk-gin) - 用于 Gin 框架的中间件，提供日志、指标、认证、追踪等功能。
- [httpsuite](https://github.com/rluders/httpsuite) - 用于 Go 的 HTTP 请求解析和 RFC 9457 问题响应，仅依赖标准库核心，并提供可选验证。
- [Ronykit](https://github.com/clubpay/ronykit) - 具有可插拔架构且性能极高的 Web 框架。
- [formjson](https://github.com/rs/formjson) - 透明地将 JSON 输入作为标准表单 POST 处理。
- [go-api-boot](https://github.com/SaiNageswarS/go-api-boot) - 一个以 gRpc 优先的微服务框架。特性包括对 Mongo 的 ODM 支持、云资源支持（AWS/Azure/Google），以及为 gRpc 定制的流畅依赖注入。此外，直接支持 grpc-web，使浏览器无需代理即可访问所有 gRpc API。
- [Lit](https://github.com/jvcoutinho/lit) - 面向 Golang 的高性能声明式 Web 框架，追求简洁和生活质量。
- [client-timing](https://github.com/posener/client-timing) - 用于 Server-Timing 头的 HTTP 客户端。
- [FastRouter](https://github.com/razonyang/fastrouter) - 用 Go 编写的快速、灵活的 HTTP 路由器。
- [Goshtoso](https://github.com/araihu/goshtoso) - 用于 Go 应用的服务器渲染 UI 组件，基于 templ、Tailwind CSS、HTMX 和 Alpine.js 构建。
- [GoLobby/Router](https://github.com/golobby/router) - GoLobby Router 是 Go 编程语言的轻量级但功能强大的 HTTP 路由器。
- [nchi](https://github.com/muir/nchi) - 基于 httprouter 构建的 chi 风格路由器，带有依赖注入的中间件包装器。
- [echo-middleware](https://github.com/faabiosr/echo-middleware) - 用于 Echo 框架的中间件，提供日志和指标。
- [Fox](https://github.com/fox-toolkit/fox) - 用于构建反向代理和 API 网关的高性能 HTTP 路由器，支持运行时动态修改路由。
- [fursy](https://github.com/coregx/fursy) - HTTP 路由器，具有类型安全的泛型处理器、从代码自动生成 OpenAPI 3.1 以及 RFC 9457 错误响应。
- [mid](https://github.com/bobg/mid) - 杂项 HTTP 中间件功能：从处理器返回惯用错误；接收/响应 JSON 数据；请求追踪等。
- [catena](https://github.com/codemodus/catena) - http.Handler 包装器串联（与 "chain" 相同的 API）。
- [goroute](https://github.com/goroute/route) - 简单而强大的 HTTP 请求多路复用器。
- [NotNet](https://github.com/nottechdm/notnet) - 一个轻量级 Go 框架，用于构建快速、符合人体工学的 RESTful API，支持中间件和灵活路由。
- [apitally](https://github.com/apitally/apitally-go) - API 监控和分析中间件，提供指标、日志和警报。适用于 Chi、Echo、Fiber 和 Gin。
- [togo](https://github.com/togo-framework/togo) - 全栈框架，将 Go 后端和 React 前端打包为单个二进制文件；提供 Laravel-artisan 级别的 CLI。
- [aichteeteapee](https://github.com/psyb0t/aichteeteapee) - 功能齐全的 HTTP 服务器库，包含路由器、中间件栈、WebSocket 中心、文件上传和 OpenAPI 验证。
- [Confetti Framework](https://confetti-framework.github.io/docs/) - Confetti 是一个具有表达力、优雅语法的 Go Web 应用框架。Confetti 结合了 Laravel 的优雅和 Go 的简洁。
- [Pnutmux](https://gitlab.com/fruitygo/pnutmux) - Pnutmux 是一个强大的 Go Web 框架，使用正则表达式匹配和处理 HTTP 请求。它提供 CORS 处理、结构化日志、URL 参数提取、中间件和并发限制等功能。
:::

::: masonry
## 实用工具
> 通用工具和工具集，让您的生活更轻松。
- [fzf](https://github.com/junegunn/fzf) - 用 Go 编写的命令行模糊查找器。
- [dive](https://github.com/wagoodman/dive) - 用于探索 Docker 镜像中每一层的工具。
- [hub](https://github.com/github/hub) - 包装 git 命令，添加额外功能，从终端与 GitHub 交互。
- [lo](https://github.com/samber/lo) - 一个类似 Lodash 的 Go 库，基于 Go 1.18+ 泛型（map、filter、contains、find...）。
- [ctop](https://github.com/bcicen/ctop) - 用于容器指标的 [Top-like](https://ctop.sh) 界面（例如 htop）。
- [sqlx](https://github.com/jmoiron/sqlx) - 在优秀的 built-in database/sql 包之上提供一组扩展。
- [goreleaser](https://github.com/goreleaser/goreleaser) - 尽可能快速且轻松地交付 Go 二进制文件。
- [wuzz](https://github.com/asciimoo/wuzz) - 用于 HTTP 检查的交互式 CLI 工具。
- [usql](https://github.com/knq/usql) - usql 是 SQL 数据库的通用命令行界面。
- [peco](https://github.com/peco/peco) - 简单的交互式过滤工具。
- [go-funk](https://github.com/thoas/go-funk) - 现代 Go 工具库，提供辅助函数（map、find、contains、filter、chunk、reverse 等）。
- [godropbox](https://github.com/dropbox/godropbox) - 来自 Dropbox 的用于编写 Go 服务/应用程序的通用库。
- [minify](https://github.com/tdewolff/minify) - 用于 HTML、CSS、JS、XML、JSON 和 SVG 文件格式的快速压缩器。
- [panicparse](https://github.com/maruel/panicparse) - 对相似的 goroutine 进行分组并为堆栈转储着色。
- [mc](https://github.com/minio/mc) - Minio Client 提供与 Amazon S3 兼容的云存储和文件系统交互的最小工具。
- [goreporter](https://github.com/wgliang/goreporter) - 执行静态分析、单元测试、代码审查并生成代码质量报告的 Go 工具。
- [mergo](https://github.com/imdario/mergo) - 用于合并 Golang 中结构体和映射的辅助工具。适用于配置默认值，避免杂乱的 if 语句。
- [retry-go](https://github.com/avast/retry-go) - 用于重试机制的简单库。
- [sesh](https://github.com/joshmedeski/sesh) - Sesh 是一个 CLI，利用 zoxide 帮助您快速轻松地创建和管理 tmux 会话。
- [create-go-app](https://github.com/create-go-app/cli) - 一个强大的 CLI，通过运行一条命令即可创建包含后端（Golang）、前端（JavaScript、TypeScript）和部署自动化（Ansible、Docker）的生产就绪项目。
- [filetype](https://github.com/h2non/filetype) - 通过检查魔数签名来推断文件类型的小型包。
- [EaseProbe](https://github.com/megaease/easeprobe) - 一个简单、独立且轻量的工具，可执行健康/状态检查守护进程，支持 HTTP/TCP/SSH/Shell/Client... 探测，以及 Slack/Discord/Telegram/SMS... 通知。
- [Failsafe-go](https://github.com/failsafe-go/failsafe-go) - 用于 Go 的容错与韧性模式。
- [Storm](https://github.com/asdine/storm) - 简单而强大的 BoltDB 工具包。
- [mimetype](https://github.com/gabriel-vasile/mimetype) - 基于魔数进行 MIME 类型检测的包。
- [jump](https://github.com/gsamokovarov/jump) - Jump 通过学习你的习惯帮助你更快导航。
- [boilr](https://github.com/tmrts/boilr) - 极速 CLI 工具，用于从样板模板创建项目。
- [mole](https://github.com/davrodpin/mole) - 用于轻松创建 SSH 隧道的 CLI 应用。
- [boring](https://github.com/alebeck/boring) - 简单的命令行 SSH 隧道管理器。
- [gitbatch](https://github.com/isacikgoz/gitbatch) - 在一个地方管理你的 git 仓库。
- [scany](https://github.com/georgysavva/scany) - 用于将数据库中的数据扫描到 Go 结构体等的库。
- [bed](https://github.com/itchyny/bed) - 用 Go 编写的类 Vim 二进制编辑器。
- [upterm](https://github.com/owenthereal/upterm) - 供开发人员通过 Web 安全共享终端/tmux 会话的工具。非常适合远程结对编程、访问 NAT/防火墙后的计算机、远程调试等。
- [hostctl](https://github.com/guumaster/hostctl) - 一个 CLI 工具，通过简单命令管理 /etc/hosts。
- [circuitbreaker](https://github.com/rubyist/circuitbreaker) - Go 中的熔断器。
- [LAN Orangutan](https://github.com/291-Group/LAN-Orangutan) - 网络设备发现和清单，支持持久标签、多网络扫描和 Tailscale 集成。
- [git-time-metric](https://github.com/git-time-metric/gtm) - 简单、无缝、轻量的 Git 时间跟踪工具。
- [changie](https://github.com/miniscruff/changie) - 自动化变更日志工具，用于准备发布，具有大量自定义选项。
- [clipboard](https://github.com/golang-design/clipboard) - 📋 跨平台剪贴板 Go 包。
- [immortal](https://github.com/immortal/immortal) - \*nix 跨平台（与操作系统无关）的监督器。
- [circuit](https://github.com/cep21/circuit) - 高效且功能完整的 Hystrix 风格 Go 实现，用于熔断器模式。
- [mani](https://github.com/alajmo/mani) - 帮助你管理多个仓库的 CLI 工具。
- [clockwork](https://github.com/jonboulle/clockwork) - 一个简单的 Go 假时钟。
- [remote-touchpad](https://github.com/Unrud/remote-touchpad) - 从智能手机控制鼠标和键盘。
- [delve](https://github.com/derekparker/delve) - Go 调试器。
- [limiters](https://github.com/mennanov/limiters) - 用于 Golang 分布式应用的限流器，支持可配置后端和分布式锁。
- [ergo](https://github.com/cristianoliveira/ergo) - 轻松管理运行在不同端口上的多个本地服务。
- [scan](https://github.com/blockloop/scan) - 将 golang `sql.Rows` 直接扫描到结构体、切片或基本类型。
- [htcat](https://github.com/htcat/htcat) - 并行和流水线 HTTP GET 工具。
- [koazee](https://github.com/wesovilabs/koazee) - 受惰性求值和函数式编程启发的库，简化了数组操作。
- [countries](https://github.com/biter777/countries) - ISO-3166-1、ISO-4217、ITU-T E.164、Unicode CLDR 和 IANA ccTLD 标准的完整实现。
- [stacktower](https://github.com/stacktower-io/stacktower) - 将依赖图可视化为物理塔式结构，灵感来自 XKCD #2347。
- [config-file-validator](https://github.com/Boeing/config-file-validator) - 跨平台工具，用于验证配置文件。
- [gubrak](https://github.com/novalagung/gubrak) - 带语法糖的 Go 工具库。类似 lodash，但用于 Go。
- [godaemon](https://github.com/VividCortex/godaemon) - 用于编写守护进程的工具。
- [go-dry](https://github.com/ungerik/go-dry) - Go 的 DRY（不要重复自己）包。
- [gopencils](https://github.com/bndr/gopencils) - 小巧简单的包，用于轻松消费 REST API。
- [request](https://github.com/mozillazg/request) - Go HTTP 请求，为人类设计™。
- [go-rate](https://github.com/beefsack/go-rate) - Go 的定时速率限制器。
- [rospo](https://github.com/ferama/rospo) - 使用 Golang 内嵌 SSH 服务器实现简单可靠的 SSH 隧道。
- [grofer](https://github.com/pesos/grofer) - 用 Golang 编写的系统和资源监控工具！
- [serve](https://github.com/syntaqx/serve) - 随时随地可用的静态 HTTP 服务器。
- [retry](https://github.com/kamilsk/retry) - 最先进的功能机制，可重复执行操作直至成功。
- [gotenv](https://github.com/subosito/gotenv) - 在 Go 中从 `.env` 或任何 `io.Reader` 加载环境变量。
- [util](https://github.com/shomali11/util) - 实用工具函数集合。（字符串、并发、操作等）。
- [wifiqr](https://github.com/reugn/wifiqr) - Wi-Fi 二维码生成器。
- [gh-image](https://github.com/drogers0/gh-image) - 一个 gh CLI 扩展，可从命令行将图片上传到 GitHub issues、PR 和 README，生成尊重仓库可见性的 user-attachments URL。
- [pattern-match](https://github.com/alexpantyukhin/go-pattern-match) - 模式匹配库。
- [go-trigger](https://github.com/sadlil/go-trigger) - Go 全局事件触发器，使用 id 注册事件，并从项目中的任何位置触发事件。
- [json-log-viewer](https://github.com/hedhyw/json-log-viewer) - JSON 日志的交互式查看器。
- [go-sitemap-generator](https://github.com/ikeikeikeike/go-sitemap-generator) - 用 Go 编写的 XML 站点地图生成器。
- [toolbox](https://github.com/viant/toolbox) - 切片、映射、多映射、结构体、函数、数据转换工具。服务路由器、宏求值器、分词器。
- [Death](https://github.com/vrecan/death) - 使用信号管理 Go 应用的关闭。
- [go-bind-plugin](https://github.com/wendigo/go-bind-plugin) - 用于包装 golang 插件导出符号的 go:generate 工具（仅限 1.8）。
- [goval](https://github.com/maja42/goval) - 在 Go 中计算任意表达式。
- [go-bsdiff](https://github.com/gabstv/go-bsdiff) - 纯 Go 的 bsdiff 和 bspatch 库及 CLI 工具。
- [rate](https://github.com/webriots/rate) - 高性能限流库，支持令牌桶和 AIMD 策略。
- [moldova](https://github.com/StabbyCutyou/moldova) - 根据输入模板生成随机数据的工具。
- [apm](https://github.com/topfreegames/apm) - 带 HTTP API 的 Golang 应用进程管理器。
- [chyle](https://github.com/antham/chyle) - 使用 git 仓库生成变更日志，支持多种配置选项。
- [cryptgo](https://github.com/Gituser143/cryptgo) - Crytpgo 是一个纯 Go 编写的基于 TUI 的应用，用于实时监控和观察加密货币价格！
- [rerun](https://github.com/ivpusic/rerun) - 当源代码变化时重新编译并重新运行 Go 应用。
- [cmd](https://github.com/SimonBaeumer/cmd) - 在 osx、windows 和 linux 上执行 shell 命令的库。
- [robustly](https://github.com/VividCortex/robustly) - 可靠地运行函数，捕获并重启 panic。
- [filter](https://github.com/gookit/filter) - 提供 Go 数据的过滤、清理和转换功能。
- [nostromo](https://github.com/pokanop/nostromo) - 用于构建强大别名的 CLI。
- [sorty](https://github.com/jfcg/sorty) - 快速并发/并行排序。
- [gitcs](https://github.com/knbr13/gitcs/) - Git 提交可视化工具，用于在本地机器上可视化 Git 提交的 CLI 工具。
- [onecache](https://github.com/adelowo/onecache) - 支持多种后端存储（Redis、Memcached、文件系统等）的缓存库。
- [mongo-go-pagination](https://github.com/gobeam/mongo-go-pagination) - 针对官方 mongodb/mongo-go-driver 包的 MongoDB 分页，支持普通查询和聚合管道。
- [lrserver](https://github.com/jaschaephraim/lrserver) - Go 的 LiveReload 服务器。
- [go-lock](https://github.com/viney-shih/go-lock) - go-lock 是一个锁库，实现了无饥饿的读写互斥锁和读写 trylock。
- [goseaweedfs](https://github.com/linxGnu/goseaweedfs) - 几乎全功能的 SeaweedFS 客户端库。
- [cookie](https://github.com/syntaqx/cookie) - Cookie 结构解析和辅助包。
- [godoclive](https://github.com/syst3mctl/godoclive) - 通过静态分析 chi、gin 和 net/http 路由器，从 Go HTTP 处理器生成交互式 API 文档。
- [mssqlx](https://github.com/linxGnu/mssqlx) - 数据库客户端库，适用于任何主从、主主结构的代理。轻量且注重自动负载均衡。
- [go-pattern-match](https://github.com/PhakornKiong/go-pattern-match) - 受 ts-pattern 启发的模式匹配库。
- [countries](https://github.com/pioz/countries) - 在 Go 中处理国家相关数据时所需的一切。
- [mimemagic](https://github.com/zRedShift/mimemagic) - 纯 Go 编写的超高性能 MIME 嗅探库/工具。
- [xferspdy](https://github.com/monmohan/xferspdy) - Xferspdy 提供 Go 语言的二进制差异和补丁库。
- [go-lambda-cleanup](https://github.com/karl-cardenas-coding/go-lambda-cleanup) - 用于删除未使用或旧版本 AWS Lambda 的 CLI。
- [go-health](https://github.com/Talento90/go-health) - Health 包简化了为服务添加健康检查的方式。
- [equalizer](https://github.com/reugn/equalizer) - Go 的配额管理和限流器集合。
- [go-safecast](https://github.com/ccoVeille/go-safecast) - 安全的数字类型转换库，防止整数溢出和下溢（解决 gosec G115 和 CWE-190）。
- [pgo](https://github.com/arthurkushman/pgo) - 为 PHP 社区提供的便捷函数。
- [handy](https://github.com/miguelpragier/handy) - 许多工具和辅助函数，如字符串处理/格式化器和验证器。
- [repeat](https://github.com/ssgreg/repeat) - Go 实现的不同退避策略，适用于重试操作和心跳。
- [pm](https://github.com/VividCortex/pm) - 带 HTTP API 的进程（即 goroutine）管理器。
- [netbug](https://github.com/e-dard/netbug) - 轻松对服务进行远程性能分析。
- [multitick](https://github.com/VividCortex/multitick) - 对齐定时器的多路复用器。
- [backscanner](https://github.com/icza/backscanner) - 类似于 bufio.Scanner 的扫描器，但它从给定位置开始向后读取并返回行。
- [dbt](https://github.com/nikogura/dbt) - 一个用于从中央可信仓库运行自更新签名二进制的框架。
- [UNIS](https://github.com/esemplastic/unis) - Go 字符串工具的通用架构™。
- [goreadability](https://github.com/philipjkim/goreadability) - 使用 Facebook Open Graph 和 arc90 的可读性提取网页摘要。
- [scan](https://github.com/wroge/scan) - 基于泛型将 SQL 行扫描为任意类型。
- [retry](https://github.com/thedevsaddam/retry) - 简单易用的 Go 重试机制包。
- [go-astitodo](https://github.com/asticode/go-astitodo) - 解析 GO 代码中的 TODO。
- [go-qr](https://github.com/piglig/go-qr) - 一个原生、高质量且极简的二维码生成器。
- [golog](https://github.com/mlimaloureiro/golog) - 简单轻量的 CLI 工具，用于跟踪任务时间。
- [go-utils](https://github.com/Goldziher/go-utils) - 受 JavaScript 和 Python 启发的简单、高性能 Go 泛型工具（map、filter、reduce 等）。
- [minquery](https://github.com/icza/minquery) - 支持高效分页的 MongoDB / mgo.v2 查询（使用游标从上次位置继续列出文档）。
- [shutdown](https://github.com/ztrue/shutdown) - 用于处理 `os.Signal` 的应用关闭钩子。
- [ghokin](https://github.com/antham/ghokin) - 用于 gherkin（cucumber、behat 等）的并行化格式化器，无外部依赖。
- [sshman](https://github.com/shoobyban/sshman) - 用于管理多台远程服务器上 authorized_keys 文件的 SSH 管理器。
- [copy-pasta](https://github.com/jutkko/copy-pasta) - 通用多工作站剪贴板，使用类似 S3 的后端进行存储。
- [gofn](https://github.com/tiendc/gofn) - 使用 Go 1.18+ 泛型编写的高性能实用函数。
- [golarm](https://github.com/msempere/golarm) - 用系统事件触发警报。
- [cvt](https://github.com/shockerli/cvt) - 轻松安全地将任何值转换为另一种类型。
- [sqlex](https://github.com/go-sqlex/sqlex) - 对 jmoiron/sqlx 的现代化改造，修复了 SQL 词法分析器错误、自动 IN 子句展开、可插拔钩子以及统一的 DB/Tx/Conn 接口。
- [slice](https://github.com/psampaz/slice) - 常见 Go 切片操作的类型安全函数。
- [goback](https://github.com/carlescere/goback) - Go 简单指数退避包。
- [retry-go](https://github.com/rafaeljesus/retry-go) - 让 Go 的重试变得简单易用。
- [pointer](https://github.com/xorcare/pointer) - Package pointer 包含简化基本类型可选字段创建的辅助例程。
- [yogo](https://github.com/antham/yogo) - 从命令行检查 yopmail 邮件。
- [go-httpheader](https://github.com/mozillazg/go-httpheader) - 用于将结构体编码为 Header 字段的 Go 库。
- [gostrutils](https://github.com/ik5/gostrutils) - 字符串操作和转换函数的集合。
- [set](https://github.com/nofeaturesonlybugs/set) - 高性能且灵活的结构体映射和松散类型转换。
- [slicer](https://github.com/leaanthony/slicer) - 让切片操作更简单。
- [evaluator](https://github.com/nullne/evaluator) - 基于 s-expression 动态计算表达式。它简单且易于扩展。
- [throttle](https://github.com/yudppp/throttle) - Throttle 是一个对象，每个时间段内恰好执行一个操作。
- [just](https://github.com/kazhuravlev/just) - 只是一些用于处理通用数据结构的实用函数集合。
- [debounce](https://github.com/floatdrop/debounce) - 用 Go 编写的零分配防抖器。
- [rclient](https://github.com/zpatrick/rclient) - 可读、灵活、易用的 REST API 客户端。
- [tome](https://github.com/cyruzin/tome) - Tome 专为分页简单的 RESTful API 而设计。
- [watchhttp](https://github.com/nikolaydubina/watchhttp) - 定期运行命令并将最新 STDOUT 或其丰富增量作为 HTTP 端点暴露。
- [git-tools](https://github.com/kazhuravlev/git-tools) - 用于管理 git 标签的工具。
- [generate](https://github.com/go-playground/generate) - 在指定路径或环境变量上递归运行 go generate，并可通过正则表达式过滤。
- [graterm](https://github.com/skovtunenko/graterm) - 提供原语以在 Go 应用程序中执行有序（顺序/并发）的优雅终止（即关闭）。
- [ptr](https://github.com/gotidy/ptr) - 提供从基本类型常量简化创建指针的函数的包。
- [goplaceholder](https://github.com/michiwend/goplaceholder) - 一个用于生成占位图片的小型 Go 库。
- [ctxutil](https://github.com/posener/ctxutil) - 用于上下文的工具函数集合。
- [healthcheck](https://github.com/kazhuravlev/healthcheck) - 一个简单但强大的 Kubernetes 就绪测试。
- [go-convert](https://github.com/Eun/go-convert) - go-convert 包使你可以将值转换为另一种类型。
- [go-type](https://github.com/mikekonan/go-types) - 提供用于存储、验证和传输 ISO-4217、ISO-3166 及其他类型的 Go 类型的库。
- [structs](https://github.com/PumpkinSeed/structs) - 实现简单的函数来操作结构体。
- [jsend](https://github.com/clevergo/jsend) - 用 Go 实现的 JSend。
- [filler](https://github.com/yaronsumel/filler) - 使用 "fill" 标签填充结构体的小工具。
- [go-problemdetails](https://github.com/mvmaasakkers/go-problemdetails) - 用于处理 Problem Details 的 Go 包。
- [dlog](https://github.com/kirillDanshin/dlog) - 编译时控制的日志器，在不移除调试调用的情况下使发布包更小。
- [go-countries](https://github.com/mikekonan/go-countries) - 对 ISO-3166 码的轻量查询。
- [go-tripper](https://github.com/rajnandan1/go-tripper) - Tripper 是一个 Go 的断路器包，允许你断路并控制电路状态。
- [okrun](https://github.com/xta/okrun) - go run 错误压路机。
- [release](https://github.com/tomodian/release) - 用于 Keep-a-changelog 格式变更日志的 CLI。
- [go-clip](https://github.com/prashantgupta24/go-clip) - 适用于 Mac 的极简剪贴板管理器。
- [rest-go](https://github.com/edermanoel94/rest-go) - 提供许多处理 REST API 的有用方法的包。
- [blank](https://github.com/Henry-Sarabia/blank) - 验证或移除字符串中的空白和空格。
- [jet](https://github.com/NicoNex/jet) - Just Edit Text：一个快速强大的工具，使用正则表达式查找和替换文件内容与名称。
- [silk](https://github.com/chrispassas/silk) - 读取 silk netflow 文件。
- [relimpact](https://github.com/hashmap-kz/relimpact) - Go 项目的快速 API 兼容性报告。
- [retry](https://github.com/shafreeck/retry) - 一个非常简单的库，确保你的工作完成。
- [sqlz](https://github.com/rfberaldo/sqlz) - database/sql 包的扩展，添加了命名查询、结构体扫描和批量操作。
- [optional](https://github.com/kazhuravlev/optional) - 可选结构体字段和变量。
- [statiks](https://github.com/janiltonmaciel/statiks) - 快速、零配置的静态 HTTP 文件服务器。
- [bleep](https://github.com/sinhashubham95/bleep) - 在 Go 中对任意一组操作系统信号执行任意数量的操作。
- [goctx](https://github.com/zerosnake0/goctx) - 以高性能获取你的上下文值。
- [loncha](https://github.com/kazu/loncha) - 一个高性能的切片工具。
- [nfdump](https://github.com/chrispassas/nfdump) - 读取 nfdump netflow 文件。
- [retry](https://github.com/percolate/retry) - 一个简单但高度可配置的 Go 重试包。
- [go-events](https://github.com/deatil/go-events) - 一个 Go 事件和事件订阅包，类似 WordPress 的钩子函数。
- [abstract](https://github.com/maxbolgarin/abstract) - 用于消除业务逻辑中样板代码的抽象和工具。
- [sliceconv](https://github.com/Henry-Sarabia/sliceconv) - 基本类型之间的切片转换。
- [go-pkg](https://github.com/chenquan/go-pkg) - 一个 Go 工具包。
- [xpool](https://github.com/peczenyj/xpool) - 又一个使用泛型的 Go 类型安全对象池。
- [lang](https://github.com/maxbolgarin/lang) - 处理变量、切片和映射的通用一行代码，无需样板代码。
- [lets-go](https://github.com/aplescia-chwy/lets-go) - Go 模块，提供云原生 REST API 开发的通用工具。也包含 AWS 特定工具。
- [contem](https://github.com/maxbolgarin/contem) - 用于优雅关闭 Go 应用的 context.Context 即插即用替代品。
- [go-snk](https://github.com/SharkByteSoftware/go-snk) - 针对切片、映射、字符串、错误、JSON、HTTP 和容器的类型安全泛型辅助函数，组织为可独立采用的小包。
- [olaf](https://github.com/btnguyen2k/olaf) - 用 Go 实现的 Twitter Snowflake。
- [tik](https://github.com/andy2046/tik) - 简单易用的 Go 时间轮包。
- [go-actuator](https://github.com/sinhashubham95/go-actuator) - 为基于 Go 的 Web 框架提供生产级特性。
- [retro](https://github.com/goioc/retro) - 方便的出错重试库，具有极大的灵活性（退避策略、上限等）。
- [Go-Constant](https://github.com/sajjadrabiee/go-constant) - 为 Go 缺失的枚举类型提供带安全字符串解析的泛型类型化常量集合。
:::

::: masonry
## 服务器应用
- [Caddy](https://github.com/caddyserver/caddy) - Caddy 是一个易于配置和使用的替代性 HTTP/2 Web 服务器。
- [pocketbase](https://github.com/pocketbase/pocketbase) - PocketBase 是一个实时后端，单文件包含嵌入式数据库（SQLite），支持实时订阅、内置认证管理等更多功能。
- [etcd](https://github.com/etcd-io/etcd) - 用于共享配置和服务发现的高可用键值存储。
- [Casdoor](https://github.com/casdoor/casdoor) - 身份和访问管理（IAM）及单点登录（SSO）服务器，带有 Web UI，支持 OAuth 2.0、OIDC、SAML、CAS 和 LDAP。
- [SFTPGo](https://github.com/drakkan/sftpgo) - 功能齐全且高度可配置的 SFTP 服务器，可选支持 FTP/S 和 WebDAV。它可以服务本地文件系统和云存储后端，如 S3 和 Google Cloud Storage。
- [RoadRunner](https://github.com/spiral/roadrunner) - 高性能 PHP 应用服务器、负载均衡器和进程管理器。
- [Easegress](https://github.com/megaease/easegress) - 云原生高可用/高性能流量编排系统，具有可观测性和可扩展性。
- [Wish](https://github.com/charmbracelet/wish) - 轻松创建 SSH 应用，就像那样！
- [flipt](https://github.com/markphelps/flipt) - 用 Go 和 Vue.js 编写的自包含功能开关解决方案
- [Fider](https://github.com/getfider/fider) - Fider 是一个收集和组织客户反馈的开放平台。
- [minio](https://github.com/pgsty/minio) - 社区维护的 minio（对象存储服务）分支。
- [devd](https://github.com/cortesi/devd) - 面向开发者的本地 Web 服务器。
- [algernon](https://github.com/xyproto/algernon) - 内置 Lua、Markdown、GCSS 和 Amber 支持的 HTTP/2 Web 服务器。
- [Flagr](https://github.com/checkr/flagr) - Flagr 是一个开源的功能开关和 A/B 测试服务。
- [go-feature-flag](https://github.com/thomaspoignant/go-feature-flag) - 一个简单、完整且轻量级的自托管功能开关解决方案，100% 开源。
- [Trickster](https://github.com/tricksterproxy/trickster) - HTTP 反向代理缓存和时间序列加速器。
- [discovery](https://github.com/Bilibili/discovery) - 用于弹性中间层负载均衡和故障转移的注册表。
- [goshs](https://github.com/patrickhener/goshs) - SimpleHTTPServer 的替代品，支持文件上传/下载、WebDAV、SFTP、SMB、TLS、认证和分享链接。
- [OpenRun](https://github.com/openrundev/openrun) - Google Cloud Run 和 AWS App Runner 的开源替代品。轻松在团队中部署内部工具。
- [Euterpe](https://github.com/ironsmile/euterpe) - 自托管音乐流媒体服务器，内置 Web UI 和 REST API。
- [wd-41](https://github.com/baalimago/wd-41) - 一个 Web 开发服务器，文件更改时自动实时重载。
- [go-proxy-cache](https://github.com/fabiocicerchia/go-proxy-cache) - 用 Go 编写、使用 Redis 的带缓存的简单反向代理。
- [dudeldu](https://github.com/krotik/dudeldu) - 一个简单的 SHOUTcast 服务器。
- [cortex-tenant](https://github.com/blind-oracle/cortex-tenant) - Prometheus 远程写入代理，根据指标标签添加 Cortex 租户 ID 头。
- [lets-proxy2](https://github.com/rekby/lets-proxy2) - 反向代理，用于处理 HTTPS，并即时从 Let's Encrypt 签发证书。
- [whois](https://github.com/KincaidYang/whois) - 自托管的 WHOIS/RDAP 查询服务和 MCP 服务器，用于域名、IPv4/IPv6 地址、CIDR 和 ASN。
- [psql-streamer](https://github.com/blind-oracle/psql-streamer) - 将数据库事件从 PostgreSQL 流式传输到 Kafka。
- [nginx-prometheus](https://github.com/blind-oracle/nginx-prometheus) - Nginx 日志解析器并导出到 Prometheus。
- [protoxy](https://github.com/camgraff/protoxy) - 将 JSON 请求体转换为 Protocol Buffers 的代理服务器。
- [Kono](https://github.com/starwalkn/kono) - 用 Go 编写的轻量级可扩展 API 网关——并行扇出、灵活聚合、零配置魔法。
- [Moxy](https://github.com/sinhashubham95/moxy) - Moxy 是一个简单的模拟器和代理应用服务器，你可以创建模拟端点，也可以在端点没有模拟时代理请求。
- [relay](https://github.com/valtors/relay) - MCP 服务器，为 AI 代理提供 40 多个工具。文件操作、网络搜索、截图、多代理协调。单个 Go 二进制文件。
- [flue](https://github.com/karnstack/flue) - 自托管守护进程，将终端会话提供给浏览器标签页。关闭标签页后会话仍继续运行。
- [gondola](https://github.com/bmf-san/gondola) - 基于 YAML 的 Go 反向代理。
- [riemann-relay](https://github.com/blind-oracle/riemann-relay) - 用于负载均衡 Riemann 事件或将其转换为 Carbon 的中继。
- [simpleconf](https://github.com/shaunlee/simpleconf) - 配置服务器，保存一个 JSON 文档，通过 HTTP 和 TCP 按键路径读写，可选 Raft 集群。
- [consul](https://www.consul.io/) - Consul 是用于服务发现、监控和配置的工具。
- [Engity's Bifröst](https://bifroest.engity.org/) - 高度可定制的 SSH 服务器，支持多种方式授权用户如何执行其会话（本地或容器内）。
- [nsq](https://nsq.io/) - 实时分布式消息平台。
:::

::: masonry
## 数据库
> 具有过期记录的数据存储、内存分布式数据存储或基于文件数据库的内存子集。
- [prometheus](https://github.com/prometheus/prometheus) - 监控系统和时间序列数据库。
- [Milvus](https://github.com/milvus-io/milvus) - Milvus 是一个用于嵌入管理、分析和搜索的向量数据库。
- [tidb](https://github.com/pingcap/tidb) - TiDB 是一个分布式 SQL 数据库，灵感来自 Google F1 的设计。
- [cockroach](https://github.com/cockroachdb/cockroach) - 可扩展、地理复制、事务性数据存储。
- [influxdb](https://github.com/influxdb/influxdb) - 用于指标、事件和实时分析的可扩展数据存储。
- [dolt](https://github.com/dolthub/dolt) - Dolt——它是数据的 Git。
- [dgraph](https://github.com/dgraph-io/dgraph) - 可扩展、分布式、低延迟、高吞吐量的图数据库。
- [vitess](https://github.com/youtube/vitess) - vitess提供服务器和工具，帮助大规模Web服务扩展MySQL数据库。
- [migrate](https://github.com/golang-migrate/migrate) - 数据库迁移。CLI 和 Golang 库。
- [sqlc](https://github.com/kyleconroy/sqlc) - 从 SQL 生成类型安全的代码。
- [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) - 快速、资源高效且可扩展的开源时间序列数据库。可用作 Prometheus 的长期远程存储。支持 PromQL。
- [rqlite](https://github.com/rqlite/rqlite) - 基于 SQLite 构建的轻量级分布式关系数据库。
- [badger](https://github.com/dgraph-io/badger) - Go 中的快速键值存储。
- [bytebase](https://github.com/bytebase/bytebase) - 面向 DevOps 团队的安全数据库模式变更和版本控制。
- [groupcache](https://github.com/golang/groupcache) - Groupcache 是一个缓存和缓存填充库，在许多情况下旨在替代 memcached。
- [goose](https://github.com/pressly/goose) - 数据库迁移工具。您可以通过创建增量 SQL 或 Go 脚本来管理数据库的演进。
- [DiceDB](https://github.com/DiceDB/dice) - 一个开源、快速、响应式的内存数据库，针对现代硬件优化。更高的吞吐量和更低的中位延迟，非常适合现代工作负载。
- [bbolt](https://github.com/etcd-io/bbolt) - 一个 Go 的嵌入式键值数据库。
- [pgweb](https://github.com/sosedoff/pgweb) - 基于 Web 的 PostgreSQL 数据库浏览器。
- [immudb](https://github.com/codenotary/immudb) - immudb 是一个用 Go 编写的轻量级、高速不可变数据库，适用于系统和应用程序。
- [atlas](https://github.com/ariga/atlas) - 一个数据库工具包。一个旨在帮助公司更好地处理数据的 CLI。
- [BigCache](https://github.com/allegro/bigcache) - 适用于 GB 级数据的高效键/值缓存。
- [Squirrel](https://github.com/Masterminds/squirrel) - 帮助您构建 SQL 查询的 Go 库。
- [dbmate](https://github.com/amacneil/dbmate) - 一个轻量级、与框架无关的数据库迁移工具。
- [ristretto](https://github.com/dgraph-io/ristretto) - 一个高性能、内存受限的 Go 缓存。
- [goleveldb](https://github.com/syndtr/goleveldb) - Go 中 [LevelDB](https://github.com/google/leveldb) 键值数据库的实现。
- [pebble](https://github.com/cockroachdb/pebble) - 受 RocksDB/LevelDB 启发的 Go 键值数据库。
- [go-mysql](https://github.com/siddontang/go-mysql) - 处理MySQL协议和复制的Go工具集。
- [rosedb](https://github.com/roseduan/rosedb) - 基于 LSM+WAL 的嵌入式 k-v 数据库，支持字符串、列表、哈希、集合、有序集合。
- [buntdb](https://github.com/tidwall/buntdb) - 一个快速、可嵌入、内存型的 Go 键/值数据库，支持自定义索引和空间功能。
- [pREST](https://github.com/prest/prest) - 简化并加速开发，⚡ 即时、实时、高性能，适用于任何现有或新的 Postgres 应用。
- [redka](https://github.com/nalgeon/redka) - 用 SQLite 重新实现的 Redis。
- [ledisdb](https://github.com/siddontang/ledisdb) - Ledisdb 是一个基于 LevelDB 的高性能 NoSQL，类似 Redis。
- [xo](https://github.com/knq/xo) - 根据现有模式定义或自定义查询生成地道的 Go 数据库代码，支持 PostgreSQL、MySQL、SQLite、Oracle 和 Microsoft SQL Server。
- [godis](https://github.com/hdt3213/godis) - 一个用 Golang 实现的高性能 Redis 服务器和集群。
- [jet](https://github.com/go-jet/jet) - 用于在 Go 中编写类型安全 SQL 查询的框架，能够轻松将数据库查询结果转换为所需的任意对象结构。
- [nutsdb](https://github.com/xujiajun/nutsdb) - Nutsdb 是一个用纯 Go 编写的简单、快速、可嵌入、持久化的键值存储。它支持完全可序列化的事务以及多种数据结构，如列表、集合、有序集合。
- [sql-migrate](https://github.com/rubenv/sql-migrate) - 数据库迁移工具。允许使用 go-bindata 将迁移嵌入到应用程序中。
- [LinDB](https://github.com/lindb/lindb) - LinDB 是一个可扩展、高性能、高可用的分布式时序数据库。
- [gocache](https://github.com/eko/gocache) - 完整的 Go 缓存库，支持多种存储（内存、memcache、redis 等），可链式调用、可加载、指标缓存等。
- [GCache](https://github.com/bluele/gcache) - 支持可过期缓存、LFU、LRU 和 ARC 的缓存库。
- [tiedot](https://github.com/HouzuoGuo/tiedot) - 由 Golang 驱动的 NoSQL 数据库。
- [otter](https://github.com/maypok86/otter) - 一个高性能的无锁 Go 缓存，比 Ristretto 等快很多倍。
- [goqu](https://github.com/doug-martin/goqu) - 地道的 SQL 构建器和查询库。
- [fastcache](https://github.com/VictoriaMetrics/fastcache) - 快速线程安全的内存缓存，适用于大量条目，最小化 GC 开销。
- [lotusdb](https://github.com/flower-corp/lotusdb) - 兼容 lsm 和 b+tree 的快速 k/v 数据库。
- [cache2go](https://github.com/muesli/cache2go) - 支持基于超时自动失效的内存键值缓存。
- [gendry](https://github.com/didi/gendry) - 非侵入式 SQL 构建器和强大的数据绑定器。
- [CovenantSQL](https://github.com/CovenantSQL/CovenantSQL) - CovenantSQL 是一个基于区块链的 SQL 数据库。
- [soda](https://github.com/gobuffalo/pop/tree/master/soda) - 适用于 MySQL、PostgreSQL 和 SQLite 的数据库迁移、创建、ORM 等。
- [column](https://github.com/kelindar/column) - 高性能、列式、可嵌入的内存存储，支持位图索引和事务。
- [Databunker](https://github.com/paranoidguy/databunker) - 个人身份信息（PII）存储服务，符合 GDPR 和 CCPA 要求。
- [chproxy](https://github.com/Vertamedia/chproxy) - ClickHouse 数据库的 HTTP 代理。
- [diskv](https://github.com/peterbourgon/diskv) - 自研的磁盘支持键值存储。
- [pg_timetable](https://github.com/cybertec-postgresql/pg_timetable) - PostgreSQL 的高级调度。
- [skeema](https://github.com/skeema/skeema) - 面向 MySQL 的纯 SQL schema 管理系统，支持分片和外部在线 schema 变更工具。
- [pogreb](https://github.com/akrylysov/pogreb) - 面向读密集型工作负载的嵌入式键值存储。
- [ttlcache](https://github.com/jellydator/ttlcache) - 一个支持条目过期和泛型的内存缓存。
- [sturdyc](https://github.com/viccon/sturdyc) - 一个具有高级并发特性的缓存库，旨在使 I/O 密集型应用健壮且高性能。
- [objectbox-go](https://github.com/objectbox/objectbox-go) - 具有 Go API 的高性能嵌入式对象数据库（NoSQL）。
- [gormigrate](https://github.com/go-gormigrate/gormigrate) - Gorm ORM 的数据库模式迁移助手。
- [goavro](https://github.com/linkedin/goavro) - 一个编码和解码 Avro 数据的 Go 包。
- [eliasdb](https://github.com/krotik/eliasdb) - 无依赖、事务性图数据库，具有 REST API、短语搜索和类似 SQL 的查询语言。
- [moss](https://github.com/couchbase/moss) - Moss 是一个用 100% Go 编写的简单 LSM 键值存储引擎。
- [onedump](https://github.com/liweiyi88/onedump) - 通过一条命令和配置，将数据库从不同驱动备份到不同目标。
- [NornicDB](https://github.com/orneryd/NornicDB) - 高性能图 + 向量数据库（兼容 Neo4j 和 qDrant），专注于为 AI 系统提供低延迟的图检索（graph-rag）。
- [go-sqlite](https://github.com/glebarez/go-sqlite) - 一个纯 Golang 实现的 SQLite 驱动，无需 CGO。
- [clover](https://github.com/ostafen/clover) - 一个用纯 Golang 编写的轻量级面向文档的 NoSQL 数据库。
- [Dotsql](https://github.com/gchaincl/dotsql) - 帮助你将 SQL 文件集中管理并轻松使用的 Go 库。
- [ozzo-dbx](https://github.com/go-ozzo/ozzo-dbx) - 强大的数据检索方法以及数据库无关的查询构建能力。
- [rdb](https://github.com/HDT3213/rdb) - 用于二次开发和内存分析的 Redis RDB 文件解析器。
- [EchoVault](https://github.com/EchoVault/EchoVault) - 可嵌入的分布式内存数据存储，兼容 Redis 客户端。
- [clickhouse-bulk](https://github.com/nikepan/clickhouse-bulk) - 收集小插入并发送大请求到ClickHouse服务器。
- [jetcache-go](https://github.com/mgtv-tech/jetcache-go) - 统一的 Go 缓存库，支持多级缓存。
- [sqlingo](https://github.com/lqs/sqlingo) - 用于在 Go 中构建 SQL 的轻量级 DSL。
- [levigo](https://github.com/jmhodges/levigo) - Levigo 是 LevelDB 的 Go 封装。
- [dbq](https://github.com/rocketlaunchr/dbq) - Go 的零样板数据库操作。
- [filesql](https://github.com/nao1215/filesql) - 通过database/sql API使用SQL查询CSV、TSV、LTSV、JSON、JSONL、Parquet、Excel、ACH和Fedwire文件，由内存SQLite支持。
- [theine](https://github.com/Yiling-J/theine-go) - 高性能、近乎最优的内存缓存，具有主动 TTL 过期和泛型支持。
- [cachego](https://github.com/faabiosr/cachego) - 支持多种驱动器的 Golang 缓存组件。
- [pudge](https://github.com/recoilme/pudge) - 使用 Go 标准库编写的快速简单的键值存储。
- [wescale](https://github.com/wesql/wescale) - WeScale 是一个数据库代理，旨在增强应用程序的可扩展性、性能、安全性和韧性。
- [gatewayd](https://github.com/gatewayd-io/gatewayd) - 云原生数据库网关和框架，用于构建数据驱动应用。类似API网关，但针对数据库。
- [sqrl](https://github.com/elgris/sqrl) - SQL 查询构建器，Squirrel 的分支，性能更优。
- [lynxdb](https://github.com/lynxbase/lynxdb) - 轻量级列式日志分析数据库，具有受 SPL 启发的管道式查询语言。
- [go-freelru](https://github.com/elastic/go-freelru) - 无 GC、快速且通用的 LRU 哈希映射库，支持可选锁定、分片、逐出和过期。
- [Vasto](https://github.com/chrislusf/vasto) - 一个分布式高性能键值存储。基于磁盘。最终一致。高可用。无需中断服务即可扩容或缩容。
- [clickhouse-sql-parser](https://github.com/AfterShip/clickhouse-sql-parser) - ClickHouse方言SQL解析器，生成带类型的AST，提供遍历辅助、往返格式化和CLI。
- [pocache](https://github.com/naughtygopher/pocache) - Pocache 是一个极简缓存包，专注于抢占式乐观缓存策略。
- [piladb](https://github.com/fern4lvarez/piladb) - 基于栈数据结构的轻量级 RESTful 数据库引擎。
- [libradb](https://github.com/amit-davidson/LibraDB) - LibraDB 是一个不到 1000 行代码的简单数据库，用于学习。
- [octillery](https://github.com/knocknote/octillery) - 用于数据库分片的 Go 包（支持任何 ORM 或原生 SQL）。
- [sq](https://github.com/bokwoon95/go-structured-query) - 用于 Go 的类型安全 SQL 构建器和结构体映射器。
- [bqb](https://github.com/nullism/bqb) - 轻量且易于学习的查询构建器。
- [sqly](https://github.com/nao1215/sqly) - 在交互式shell中对CSV、TSV、LTSV、JSON、Parquet和Excel文件执行SQL，由内存SQLite支持。
- [sqlf](https://github.com/leporo/sqlf) - 快速 SQL 查询构建器。
- [buildsqlx](https://github.com/arthurkushman/buildsqlx) - 用于 PostgreSQL 的 Go 数据库查询构建器库。
- [pgrwl](https://github.com/pgrwl/pgrwl) - PostgreSQL 的云原生持续备份。
- [migrator](https://github.com/lopezator/migrator) - 极简单的 Go 数据库迁移库。
- [bcache](https://github.com/iwanbk/bcache) - 最终一致性的分布式内存缓存 Go 库。
- [go-cache](https://github.com/viney-shih/go-cache) - 灵活的 Go 多层缓存库，通过采用 Cache-Aside 模式处理内存和共享缓存。
- [darwin](https://github.com/GuiaBolso/darwin) - Go 的数据库模式演进库。
- [nanotdb](https://github.com/aymanhs/nanotdb) - 一个轻量级、零依赖、仅追加的时间序列数据库和仪表板，专为低功耗硬件优化。
- [igor](https://github.com/galeone/igor) - PostgreSQL 抽象层，支持高级功能并使用类似 gorm 的语法。
- [sqlize](https://github.com/sunary/sqlize) - 数据库迁移生成器。通过对比模型和现有SQL来生成SQL迁移。
- [imcache](https://github.com/erni27/imcache) - 通用的内存缓存 Go 库。支持过期、滑动过期、最大条目限制、逐出回调和分片。
- [unitdb](https://github.com/unit-io/unitdb) - 面向物联网、实时消息应用的快速时间序列数据库。使用 github.com/unit-io/unitd 应用通过 TCP 或 WebSocket 的 pubsub 访问 unitdb。
- [easycache](https://github.com/hugocarreira/easycache) - 在 Golang 中使用内存缓存的简单方式（TTL/FIFO/LRU/LFU）。
- [GoSQLX](https://github.com/ajitpratap0/GoSQLX) - 高性能SQL解析器、格式化器、linter和安全扫描器，支持多方言和WASM游乐场。
- [dbbench](https://github.com/sj14/dbbench) - 支持多种数据库和脚本的数据库基准测试工具。
- [go-mcache](https://github.com/OrlovEvgeny/go-mcache) - 快速的内存键值存储/缓存库。指针缓存。
- [builq](https://github.com/cristalhq/builq) - 在 Go 中轻松构建 SQL 查询。
- [hare](https://github.com/jameycribbs/hare) - 一个简单的数据库管理系统，将每个表存储为行分隔 JSON 的文本文件。
- [go-pg-migrations](https://github.com/robinjoseph08/go-pg-migrations) - 一个帮助使用 go-pg/pg 编写迁移的 Go 包。
- [gorm-multitenancy](https://github.com/bartventer/gorm-multitenancy) - 对GORM管理的数据库提供多租户支持。
- [pgxcli](https://github.com/Balaji01-4D/pgxcli) - 用 Go 编写的 PostgreSQL CLI 客户端，灵感来自 pgcli。
- [timedmap](https://github.com/zekroTJA/timedmap) - 带过期键值对的映射。
- [couchcache](https://github.com/codingsince1985/couchcache) - 由 Couchbase 服务器支持的 RESTful 缓存微服务。
- [godbal](https://github.com/xujiajun/godbal) - Go 的数据库抽象层（dbal），支持 SQL 构建器并轻松获取结果。
- [qrafter](https://github.com/SennovE/qrafter) - 类型安全的 SQL 查询构建器，支持方言感知渲染、模式内省和迁移生成。
- [minisql](https://github.com/RichardKnop/minisql) - 嵌入式单文件 SQL 数据库。
- [avro](https://github.com/khezen/avro) - 发现 SQL 模式并将其转换为 AVRO 模式。将 SQL 记录查询为 AVRO 字节。
- [dg](https://github.com/codingconcepts/dg) - 快速数据生成器，从生成的关系数据生成CSV文件。
- [clusteredBigCache](https://github.com/oaStuff/clusteredBigCache) - 支持集群和单项过期的 BigCache。
- [schema](https://github.com/adlio/schema) - 用于将 database/sql 兼容数据库的 schema 迁移嵌入到 Go 二进制文件中的库。
- [rotom](https://github.com/xgzlucario/rotom) - 一个用 Golang 构建的微型 Redis 服务器，兼容 RESP 协议。
- [Coffer](https://github.com/claygod/coffer) - 支持事务的简单 ACID 键值数据库。
- [database-gateway](https://github.com/kazhuravlev/database-gateway) - 在生产环境中运行SQL，支持ACL、日志和共享链接。
- [gosql](https://github.com/twharmon/gosql) - SQL 查询构建器，更好地支持空值。
- [prep](https://github.com/hexdigest/prep) - 无需修改代码即可使用预编译 SQL 语句。
- [qry](https://github.com/HnH/qry) - 从包含原始 SQL 查询的文件生成常量的工具。
- [go-fixtures](https://github.com/RichardKnop/go-fixtures) - Golang 出色的内置 database/sql 库的 Django 风格 fixtures。
- [relica](https://github.com/coregx/relica) - 类型安全的数据库查询构建器，零生产依赖，支持 LRU 语句缓存、批量操作以及 JOIN、子查询、CTE 和窗口函数。
- [gedb](https://github.com/vinicius-lino-figueiredo/gedb) - 类似 MongoDB 的嵌入式数据库，用纯 Go 编写。支持索引和复杂查询。
- [gocache](https://github.com/yuseferi/gocache) - 无数据竞争的 Go 缓存库，具有高性能和自动清理功能。
- [MemHop](https://github.com/qyiun666/MemHop) - 面向 AI 代理的嵌入式认知内存数据库。六层架构（L0-L5）、Dream 整合管道、三通道 RRF 检索（BM25 + f16 向量 + 实体）、单个 .meh 文件、纯 Go、零基础设施。
- [icache](https://github.com/mdaliyan/icache) - 高性能、通用、线程安全、零依赖的缓存包。
- [migrator](https://github.com/larapulse/migrator) - MySQL 数据库迁移器，旨在将迁移运行到您的功能中，并通过直观的 Go 代码管理数据库模式更新。
- [Hotcoal](https://github.com/motrboat/hotcoal) - 保护手写 SQL 免受注入攻击。
- [db-migrator.go](https://github.com/raoptimus/db-migrator.go) - 用于版本化数据库模式迁移的 CLI，支持 PostgreSQL、MySQL、ClickHouse、Tarantool 和 Apache Iceberg。
- [rwdb](https://github.com/andizzle/rwdb) - rwdb为多数据库服务器设置提供只读副本能力。
- [tempdb](https://github.com/rafaeljesus/tempdb) - 用于临时项的键值存储。
- [libschema](https://github.com/muir/libschema) - 在每个库中单独定义迁移。面向开源库的迁移。MySQL 和 PostgreSQL。
- [gorm-seeder](https://github.com/Kachit/gorm-seeder) - Gorm ORM 的简单数据库种子填充器。
- [coherence-go-client](https://github.com/oracle/coherence-go-client) - 使用 gRPC 作为网络传输的 Go 应用程序 Oracle Coherence 缓存 API 的完整实现。
- [nscache](https://github.com/no-src/nscache) - 一个支持多种数据源驱动的 Go 缓存框架。
- [ormlite](https://github.com/pupizoid/ormlite) - 轻量级包，包含一些类似 ORM 的功能和 sqlite 数据库的辅助工具。
- [sqlh](https://github.com/kirill-scherba/sqlh) - 零样板 SQL 辅助工具，支持结构体标签和 Go 泛型（CRUD、UPSERT、JOIN、基准测试）。
- [gdcache](https://github.com/ulovecode/gdcache) - 一个由 golang 实现的纯非侵入式缓存库，可用于实现自己的分布式缓存。
- [godfish](https://github.com/rafaelespinoza/godfish) - 数据库迁移管理器，使用原生查询语言。支持 Cassandra、MySQL、PostgreSQL、SQLite3。
- [obreron](https://github.com/profe-ajedrez/obreron) - 快速且廉价的 SQL 构建器，只做一件事：SQL 构建。
- [go-gcache](https://github.com/szyhf/go-gcache) - `GCache` 的通用版本，支持可过期缓存、LFU、LRU 和 ARC。
- [go-pg-migrate](https://github.com/lawzava/go-pg-migrate) - 面向 go-pg 迁移管理的 CLI 友好包。
- [ttlcache](https://github.com/cheshir/ttlcache) - 每条记录带 TTL 的内存键值存储。
- [patcher](https://github.com/Jacobbrewer1/patcher) - 强大的 SQL 查询构建器，可从结构体自动生成 SQL 查询。
- [NoKV](https://github.com/feichai0017/NoKV) - 面向分布式文件系统、对象存储和 AI 数据集工作负载的原生元数据服务。
- [go-postgres-s3-backup](https://github.com/nicobistolfi/go-postgres-s3-backup) - 使用 AWS Lambda 将 PostgreSQL 备份到 S3 的无服务器方案，支持每日、每月和每年轮换。
- [pgwd](https://github.com/hrodrig/pgwd) - 监控PostgreSQL连接数（总数、活动、空闲、陈旧）的CLI，当超过阈值时通过Slack和/或Loki通知。支持Kubernetes（kubectl port-forward）和通知中的可选运行上下文。
- [xsql](https://github.com/zx06/xsql) - AI优先的跨数据库CLI工具，具有只读保护和结构化JSON输出。
- [sg](https://github.com/go-the-way/sg) - 用 Go 编写的 SQL 生成器，用于生成标准 SQL（支持：CRUD）。
- [sqlcredo](https://github.com/Klojer/sqlcredo) - 用于类型安全通用 SQL CRUD 操作的包，支持分页、事务、调试和自定义原始 SQL 扩展。
- [dba](https://github.com/kran/dba) - 用于手写SQL的SQL查询构建器，添加动态条件、方言感知占位符和不可变链式调用。
- [Bitcask](https://git.mills.io/prologic/bitcask) - Bitcask 是一个用纯 Go 编写的可嵌入、持久且快速的键值（KV）数据库，得益于 bitcask 磁盘布局（LSM+WAL），具有可预测的读写性能、低延迟和高吞吐量。
- [hasql](https://golang.yandex/hasql) - 用于访问多主机 SQL 数据库安装的库。
- [Squalus](https://gitlab.com/qosenergy/squalus) - Go SQL 包之上的薄层，使执行查询更容易。
:::

::: masonry
## 杂项
> 用于依赖注入的库。
- [golang-standards/project-layout](https://github.com/golang-standards/project-layout) - Go 生态系统中常见的历史和新兴项目布局模式集合。注意：尽管组织名称如此，它们并不代表官方 Go 标准，请参阅[此问题](https://github.com/golang-standards/project-layout/issues/117)了解更多信息。尽管如此，某些布局可能仍然有用。
- [gatus](https://github.com/TwinProduction/gatus) - 自动化服务健康仪表盘。
- [gopsutil](https://github.com/shirou/gopsutil) - 跨平台库，用于获取进程和系统利用率（CPU、内存、磁盘等）。
- [go-blueprint](https://github.com/Melkeydev/go-blueprint) - 允许用户使用流行框架快速搭建 Go 项目。
- [fx](https://github.com/uber-go/fx) - 基于 dig 构建的 Go 依赖注入应用框架。
- [gofakeit](https://github.com/brianvoe/gofakeit) - 用 Go 编写的随机数据生成器。
- [dig](https://github.com/uber-go/dig) - Go 的基于反射的依赖注入工具包。
- [ardanlabs/service](https://github.com/ardanlabs/service) - 用于构建生产级可扩展 Web 服务应用的[入门套件](https://github.com/ardanlabs/service/wiki)。
- [purego](https://github.com/ebitengine/purego) - 一个无需 Cgo 即可从 Go 调用 C 函数的库。
- [goxygen](https://github.com/shpota/goxygen) - 在几秒钟内使用 Go 和 Angular、React 或 Vue 生成现代 Web 项目。
- [pagoda](https://github.com/mikestefanello/pagoda) - 快速、简单的全栈 Web 开发入门套件，使用 Go 构建。
- [do](https://github.com/samber/do) - 基于泛型的依赖注入框架。
- [nunu](https://github.com/go-nunu/nunu) - Nunu 是一个用于构建 Go 应用的脚手架工具。
- [base64Captcha](https://github.com/mojocn/base64Captcha) - Base64captch 支持数字、数字、字母、算术、音频和数字字母验证码。
- [go-resiliency](https://github.com/eapache/go-resiliency) - Golang 的弹性模式。
- [modern-go-application](https://github.com/sagikazarmark/modern-go-application) - 应用现代实践的 Go 应用样板和示例。
- [shoutrrr](https://github.com/containrrr/shoutrrr) - 通知库，提供对各种消息服务的轻松访问，如 Slack、Mattermost、Gotify 和 SMTP 等。
- [gosms](https://github.com/haxpax/gosms) - 用 Go 编写的本地短信网关，可用于发送短信。
- [xstrings](https://github.com/huandu/xstrings) - 从其他语言移植的有用字符串函数集合。
- [stateless](https://github.com/qmuntal/stateless) - 一个用于创建状态机的流畅库。
- [sttr](https://github.com/abhimanyu003/sttr) - 跨平台命令行应用，用于对字符串执行各种操作。
- [llvm](https://github.com/llir/llvm) - 纯 Go 编写的与 LLVM IR 交互的库。
- [go-commons-pool](https://github.com/jolestar/go-commons-pool) - Golang 的通用对象池。
- [goapp](https://github.com/naughtygopher/goapp) - 关于构建和开发 Go Web 应用/服务的指导性指南。
- [shortid](https://github.com/teris-io/shortid) - 分布式生成超短、唯一、非顺序、URL 友好的 ID。
- [health](https://github.com/alexliesenfeld/health) - 一个简单灵活的 Go 健康检查库。
- [go-ddd](https://github.com/sklinkert/go-ddd) - 领域驱动设计模板，包含 CQRS、值对象、幂等命令和事务性发件箱。
- [cookiecutter-golang](https://github.com/lacion/cookiecutter-golang) - 遵循生产最佳实践的 Go 应用样板模板，用于快速启动项目。
- [go-starter](https://github.com/allaboutapps/go-starter) - 一个固执己见的生产就绪 RESTful JSON 后端模板，与 VSCode DevContainers 高度集成。
- [GoLobby/Container](https://github.com/golobby/container) - GoLobby Container 是一个轻量但强大的 Go 语言 IoC 依赖注入容器。
- [golang-templates/seed](https://github.com/golang-templates/seed) - Go 应用 GitHub 仓库模板。
- [xz](https://github.com/ulikunitz/xz) - 纯 Go 包，用于读写 xz 压缩文件。
- [banner](https://github.com/dimiro1/banner) - 为你的 Go 应用添加漂亮的横幅。
- [health](https://github.com/dimiro1/health) - 易于使用、可扩展的健康检查库。
- [archives](https://github.com/mholt/archives) - 一个跨平台、多格式的 Go 库，用于处理归档和压缩格式，提供统一 API，并可作为兼容 io/fs 的虚拟文件系统。
- [gountries](https://github.com/pariz/gountries) - 提供国家和细分数据的数据包。
- [lk](https://github.com/hyperboloide/lk) - 一个简单的 Go 许可库。
- [goioc/di](https://github.com/goioc/di) - 受 Spring 启发的依赖注入容器。
- [conv](https://github.com/cstockton/go-conv) - conv 包提供跨 Go 类型的快速直观转换。
- [gtree](https://github.com/ddddddO/gtree) - 提供 CLI、包和 Web 界面，用于从 Markdown 或编程方式生成树状输出和创建目录。
- [go-todo-backend](https://github.com/Fs02/go-todo-backend) - 使用模块化项目布局的 Go Todo 后端示例，适用于产品微服务。
- [ffmt](https://github.com/go-ffmt/ffmt) - 美化数据展示，面向人类。
- [go-unarr](https://github.com/gen2brain/go-unarr) - 用于 RAR、TAR、ZIP 和 7z 归档的解压缩库。
- [battery](https://github.com/distatus/battery) - 跨平台、标准化的电池信息库。
- [healthcheck](https://github.com/etherlabsio/healthcheck) - 一个为 RESTful 服务设计的、基于观点且并发的健康检查 HTTP 处理器。
- [antch](https://github.com/antchfx/antch) - 一个快速、强大且可扩展的网页爬取与抓取框架。
- [bitio](https://github.com/icza/bitio) - 高度优化的 Go 位级 Reader 和 Writer。
- [gobeam/Stringy](https://github.com/gobeam/Stringy) - 字符串操作库，用于将字符串转换为驼峰式、蛇形式、烤肉串式/生成 slug 等。
- [strutil](https://github.com/ozgio/strutil) - 字符串工具集。
- [kod](https://github.com/go-kod/kod) - 基于泛型的 Go 依赖注入框架。
- [dingo](https://github.com/i-love-flamingo/dingo) - 基于 Guice 的 Go 依赖注入工具包。
- [stats](https://github.com/go-playground/stats) - 监控 Go MemStats 和系统统计信息（如内存、交换和 CPU），并通过 UDP 发送到任何你想记录的地方等。
- [turtle](https://github.com/hackebrot/turtle) - Go 的表情符号。
- [stringFormatter](https://github.com/Wissance/stringFormatter) - 类似 Python 或 C# 的字符串格式化方式，并附带额外的文本格式化功能。
- [captcha](https://github.com/steambap/captcha) - captcha 包为验证码生成提供了易于使用、无偏见的 API。
- [gontainer](https://github.com/NVIDIA/gontainer) - 面向 Go 项目的依赖注入服务容器。
- [scaffold](https://github.com/catchplay/scaffold) - Scaffold 生成一个起始 Go 项目布局，让您专注于业务逻辑的实现。
- [go-sample](https://github.com/zitryss/go-sample) - 包含真实代码的 Go 应用项目示例布局。
- [gommit](https://github.com/antham/gommit) - 分析 git 提交消息，确保它们符合定义的模式。
- [kickstart.go](https://github.com/raeperd/kickstart.go) - 极简的单文件 Go HTTP 服务器模板，无第三方依赖。
- [indigo](https://github.com/osamingo/indigo) - 使用 Sonyflake 并基于 Base58 编码的分布式唯一 ID 生成器。
- [gotoprom](https://github.com/cabify/gotoprom) - 针对官方 Prometheus 客户端的类型安全指标构建器包装库。
- [faker](https://github.com/pioz/faker) - Go 的随机假数据和结构体生成器。
- [goffi](https://github.com/go-webgpu/goffi) - 纯 Go FFI，具有 libffi 风格的类型化调用接口和结构化错误处理，无需 CGO 即可调用 C 库。
- [persian](https://github.com/mavihq/persian) - 一些用于波斯语的 Go 实用工具。
- [morse](https://github.com/alwindoss/morse) - 用于摩尔斯电码转换的库。
- [Go-Spring](https://github.com/go-spring/spring-core) - 受 Spring Boot 启发的高性能 Go 框架，提供 DI、自动配置和生命周期管理，同时保持 Go 的简洁与高效。
- [godi](https://github.com/junioryono/godi) - 微软风格的 Go 依赖注入，支持作用域生命周期和泛型。
- [pdfgen](https://github.com/hyperboloide/pdfgen) - 从 JSON 请求生成 PDF 的 HTTP 服务。
- [go-rest-api-boilerplate](https://github.com/vahiiiid/go-rest-api-boilerplate) - AI 友好、生产就绪的 Go REST API 样板，采用整洁架构、JWT 认证、RBAC、PostgreSQL、Docker 热重载和 Swagger 文档。
- [gobase](https://github.com/wajox/gobase) - 用于真实 Go 应用的基本设置的简单骨架。
- [caps](https://github.com/chanced/caps) - 一个大小写转换库。
- [xkg](https://github.com/go-xkg/xkg) - X 键盘抓取器。
- [alice](https://github.com/magic003/alice) - Golang 的加法依赖注入容器。
- [url-shortener](https://github.com/pantrif/url-shortener) - 一个现代、强大且健壮的 URL 缩短器微服务，支持 MySQL。
- [datacounter](https://github.com/miolini/datacounter) - 用于 reader/writer/http.ResponseWriter 的 Go 计数器。
- [xdg](https://github.com/rkoesters/xdg) - 用 Go 实现的 FreeDesktop.org (xdg) 规范。
- [browscap_go](https://github.com/digitalcrab/browscap_go) - GoLang 库，用于 [浏览器能力项目](https://browscap.org/)。
- [sandid](https://github.com/aofei/sandid) - 地球上的每一粒沙子都有自己的 ID。
- [autoflags](https://github.com/artyom/autoflags) - Go 包，用于从结构体字段自动定义命令行标志。
- [wire](https://github.com/Fs02/wire) - Golang 的严格运行时依赖注入。
- [go-module](https://github.com/octomation/go-module) - 典型 Go 模块的模板。
- [numa](https://github.com/lrita/numa) - NUMA 是一个用 Go 编写的实用工具库，帮助我们编写 NUMA 感知的代码。
- [boot-go](http://github.com/boot-go/boot) - 面向 Go 开发者的基于反射的组件化依赖注入开发。
- [parsley](https://github.com/matzefriedrich/parsley) - 灵活且模块化的基于反射的 DI 库，具有作用域上下文和代理生成等高级特性，专为大型 Go 应用设计。
- [gosh](https://github.com/osamingo/gosh) - 提供 Go 统计处理器、结构体、测量方法。
- [linker](https://github.com/logrange/linker) - 基于反射的依赖注入与控制反转库，支持组件生命周期管理。
- [nject](https://github.com/muir/nject) - 类型安全、基于反射的框架，适用于库、测试、HTTP 端点和服务启动。
- [componego](https://github.com/componego/componego) - 基于组件的依赖注入框架，允许在测试中无需重复代码即可动态替换依赖。
- [ore](https://github.com/firasdarwish/ore) - 轻量、通用且简单的依赖注入（DI）容器。
- [metrics](https://github.com/pascaldekloe/metrics) - 用于指标仪器化和 Prometheus 暴露的库。
- [shellwords](https://github.com/Wing924/shellwords) - 一个根据 UNIX Bourne shell 的词法解析规则操作字符串的 Go 库。
- [wangyoucao577/go-project-layout](https://github.com/wangyoucao577/go-project-layout) - 关于如何组织 Go 项目布局的实践与讨论集合。
- [bexp](https://github.com/happy-sdk/happy/tree/main/pkg/strings/bexp) - Go 实现的花括号展开机制，用于生成任意字符串。
- [gocontainer](https://github.com/vardius/gocontainer) - 简单的依赖注入容器。
- [insidieux/inizio](https://github.com/insidieux/inizio) - 带插件的 Golang 项目布局生成器。
- [fake-useragent](https://github.com/lib4u/fake-useragent) - 使用真实世界数据库的 Golang 最新简单 useragent 伪造器。
- [gontainer/gontainer](https://github.com/gontainer/gontainer) - 基于 YAML 的 Go 依赖注入容器。支持依赖作用域和循环依赖自动检测。Gontainer 是并发安全的。
- [avgRating](https://github.com/kirillDanshin/avgRating) - 基于 Wilson 得分方程计算平均分数和评级。
- [strcase](https://github.com/charlievieth/strcase) - 标准库 strings/bytes 包的不区分大小写实现。
- [anagent](https://github.com/mudler/anagent) - 极简、可插拔的 Go 事件循环/定时器处理器，支持依赖注入。
- [go-commandbus](https://github.com/lana/go-commandbus) - 一个轻量且可插拔的 Go 命令总线。
- [varint](https://github.com/chmike/varint) - 比标准库提供的变长整数编码器/解码器更快的实现。
- [hostutils](https://github.com/Wing924/hostutils) - 一个用于打包和解包 FQDN 列表的 Go 库。
- [autowire](https://github.com/tiendc/autowire) - 使用泛型和反射的依赖注入。
- [floatdrop/di](https://github.com/floatdrop/di) - 基于泛型方法构建的依赖注入容器，支持子作用域、生命周期钩子，并在构建任何内容之前进行图验证。
- [kinit](https://github.com/go-kata/kinit) - 可定制的依赖注入容器，支持全局模式、级联初始化和 panic 安全终结。
- [str](https://github.com/schigh/str) - 以管道为先的字符串工具包，用于组合转换操作。
- [HnH/di](https://github.com/HnH/di) - 专注于简洁 API 和灵活性的 DI 容器库。
- [VarHandler](https://github.com/azr/generators/tree/master/varhandler) - 生成样板 HTTP 输入和输出处理。
- [basexx](https://github.com/bobg/basexx) - 在各种数字进制之间进行转换，支持从、到以及之间的数字字符串转换。
- [sitemap-format](https://github.com/mingard/sitemap-format) - 一个简单的站点地图生成器，带有一点语法糖。
- [common](https://github.com/kubeservice-stack/common) - 一个用于服务器框架的库。
- [go-beans](https://github.com/go-beans/go) - 受 Spring 启发的 Go 依赖注入与应用生命周期框架。
- [go-grpc-bazel-example](https://github.com/esurdam/go-grpc-bazel-example) - 使用 Bazel、grpc-gateway、OpenAPI 和 Kubernetes 的 Go gRPC 微服务示例单体仓库。
- [yama](https://github.com/livetribe/yama) - 编译时依赖注入和生命周期框架，为 Google Wire 图生成启动、静默和停止代码。
- [cosban/di](https://gitlab.com/cosban/di) - 基于代码生成的依赖注入装配工具。
- [go-formatter](https://gitlab.com/tymonx/go-formatter) - 实现由花括号 `{}` 包围的**替换字段**格式字符串。
- [go-openapi](https://github.com/go-openapi) - 用于解析和利用 open-api 模式的包集合。
:::

::: masonry
## 区块链
> 用于构建区块链的工具。
- [go-ethereum](https://github.com/ethereum/go-ethereum) - 以太坊协议的官方 Go 实现。
- [kubo](https://github.com/ipfs/kubo) - 一个用 Go 实现的 IPFS。它提供内容寻址存储，可用于 DApp 中的去中心化存储。它基于 IPFS 协议。
- [lnd](https://github.com/lightningnetwork/lnd) - 一个完整的闪电网络节点实现。
- [cosmos-sdk](https://github.com/cosmos/cosmos-sdk) - 在 Cosmos 生态系统中构建公共区块链的框架。
- [tendermint](https://github.com/tendermint/tendermint) - 高性能中间件，可将用任何编程语言编写的状态机转换为使用 Tendermint 共识和区块链协议的拜占庭容错复制状态机。
- [solana-go](https://github.com/gagliardetto/solana-go) - 用于与 Solana JSON RPC 和 WebSocket 接口交互的 Go 库。
- [gno](https://github.com/gnolang/gno) - 使用 Golang 和 Gnolang（一种为区块链设计的确定性、专用 Go 变体）构建的全面智能合约套件。
- [cometbft](https://github.com/cometbft/cometbft) - 一个分布式、拜占庭容错、确定性的状态机复制引擎。它是 Tendermint Core 的一个分支，并实现了 Tendermint 共识算法。
- [gossamer](https://github.com/ChainSafe/gossamer) - Polkadot Host 的 Go 实现。
- [pactus](https://github.com/pactus-project/pactus) - Pactus 区块链的 Go 全节点实现。
- [nview](https://github.com/blinklabs-io/nview) - Cardano 节点的本地监控工具。它是一个 TUI（终端用户界面），设计适配大多数屏幕。
- [gosemble](https://github.com/LimeChain/gosemble) - 基于 Go 的框架，用于构建 Polkadot/Substrate 兼容的运行时。
- [tronlib](https://github.com/kslamph/tronlib) - 一个全面、生产就绪的 Go SDK，用于与 TRON 区块链交互，支持 TRC20 代币。
:::

::: masonry
## 命令行
> 用于构建控制台应用程序和控制台用户界面的库。
- [bubbletea](https://github.com/charmbracelet/bubbletea) - 基于 Elm 架构的 Go 框架，用于构建终端应用。
- [cobra](https://github.com/spf13/cobra) - 面向现代 Go CLI 交互的 Commander。
- [urfave/cli](https://github.com/urfave/cli) - 用于在 Go 中构建命令行应用的简单、快速且有趣的包（原 codegangsta/cli）。
- [vhs](https://github.com/charmbracelet/vhs) - 你的 CLI 家庭录像机——从代码生成终端 GIF，用于文档和教程。
- [fx](https://github.com/antonmedv/fx) - 终端 JSON 查看器与处理器。
- [termui](https://github.com/gizak/termui) - 基于 **termbox-go** 的 Go 终端仪表盘，灵感来自 [blessed-contrib](https://github.com/yaronn/blessed-contrib)。
- [lipgloss](https://github.com/charmbracelet/lipgloss) - 在终端中声明式地定义颜色、格式和布局的样式。
- [gocui](https://github.com/jroimartin/gocui) - 极简 Go 库，旨在创建控制台用户界面。
- [bubbles](https://github.com/charmbracelet/bubbles) - 用于 bubbletea 的 TUI 组件。
- [huh](https://github.com/charmbracelet/huh) - 用于在终端中构建交互式表单和提示符的轻量级库。
- [elvish](https://github.com/elves/elvish) - 一种富有表现力的编程语言和一个多功能的交互式 shell。
- [pterm](https://github.com/pterm/pterm) - 一个可在每个平台上美化控制台输出的库，包含许多可组合组件。
- [go-prompt](https://github.com/c-bata/go-prompt) - 用于构建强大交互式提示符的库，灵感来自 [python-prompt-toolkit](https://github.com/jonathanslenders/python-prompt-toolkit)。
- [termbox-go](https://github.com/nsf/termbox-go) - Termbox 是一个用于创建跨平台文本界面的库。
- [progressbar](https://github.com/schollz/progressbar) - 适用于所有操作系统的基本线程安全进度条。
- [glamour](https://github.com/charmbracelet/glamour) - 基于样式表的终端应用 Markdown 渲染。
- [kingpin](https://github.com/alecthomas/kingpin) - 支持子命令的命令行和标志解析器（已被 `kong` 取代；见下文）。
- [asciigraph](https://github.com/guptarohit/asciigraph) - Go 包，用于在命令行应用中绘制轻量级 ASCII 折线图 ╭┈╯，无其他依赖。
- [Dnote](https://github.com/dnote/dnote) - 一个支持多设备同步的简单命令行笔记本。
- [termdash](https://github.com/mum4k/termdash) - 基于 **termbox-go** 的 Go 终端仪表盘，灵感来自 [termui](https://github.com/gizak/termui)。
- [pflag](https://github.com/spf13/pflag) - Go flag 包的即插即用替代品，实现 POSIX/GNU 风格的 --flags。
- [go-flags](https://github.com/jessevdk/go-flags) - go 命令行选项解析器。
- [spinner](https://github.com/briandowns/spinner) - Go 包，可轻松提供带选项的终端 spinner。
- [mpb](https://github.com/vbauerster/mpb) - 终端应用的多进度条。
- [go-arg](https://github.com/alexflint/go-arg) - Go 中基于结构体的参数解析。
- [uiprogress](https://github.com/gosuri/uiprogress) - 用于在终端应用中渲染进度条的灵活库。
- [termenv](https://github.com/muesli/termenv) - 为你的终端应用提供高级 ANSI 样式与颜色支持。
- [carapace-bin](https://github.com/rsteube/carapace-bin) - 多 shell 多命令参数补全器。
- [uilive](https://github.com/gosuri/uilive) - 用于实时更新终端输出的库。
- [gookit/color](https://github.com/gookit/color) - 终端颜色渲染工具库，支持 16 色、256 色、RGB 颜色渲染输出，兼容 Windows。
- [ops](https://github.com/nanovms/ops) - Unikernel 构建器/编排器。
- [aurora](https://github.com/logrusorgru/aurora) - 支持 fmt.Printf/Sprintf 的 ANSI 终端颜色。
- [carapace](https://github.com/rsteube/carapace) - 为 spf13/cobra 生成命令参数补全。
- [liner](https://github.com/peterh/liner) - 类似 Go readline 的命令行界面库。
- [complete](https://github.com/posener/complete) - 用 Go 编写 bash 补全 + Go 命令的 bash 补全。
- [flaggy](https://github.com/integrii/flaggy) - 一个健壮且惯用的标志包，具有出色的子命令支持。
- [go-isatty](https://github.com/mattn/go-isatty) - Go 语言的 isatty。
- [mow.cli](https://github.com/jawher/mow.cli) - 用于构建具有复杂标志和参数解析及验证的 CLI 应用程序的 Go 库。
- [go-colorable](https://github.com/mattn/go-colorable) - 适用于 Windows 的可着色写入器。
- [uitable](https://github.com/gosuri/uitable) - 使用表格数据提高终端应用可读性的库。
- [mkideal/cli](https://github.com/mkideal/cli) - 基于 Go 结构体标签的功能丰富且易于使用的命令行包。
- [box-cli-maker](https://github.com/box-cli-maker/box-cli-maker) - 在终端中渲染高度可定制的框。
- [argparse](https://github.com/akamensky/argparse) - 受 Python 的 argparse 模块启发的命令行参数解析器。
- [gommon/color](https://github.com/labstack/gommon/tree/master/color) - 为终端文本设置样式。
- [bubble-table](https://github.com/Evertras/bubble-table) - 用于 bubbletea 的交互式表格组件。
- [simpletable](https://github.com/alexeyco/simpletable) - 使用 Go 在终端中创建简单表格。
- [yacspin](https://github.com/theckman/yacspin) - 又一个 CLI Spinner 包，用于处理终端 spinner。
- [go-tui](https://github.com/grindlemire/go-tui) - 声明式终端 UI 框架，具有类似 templ 的模板、flexbox 布局，以及用于编辑器支持的语言服务器。
- [tabby](https://github.com/cheynewallace/tabby) - 一个用于超级简单 Golang 表格的微型库。
- [wmenu](https://github.com/dixonwille/wmenu) - 易于使用的 CLI 应用程序菜单结构，提示用户做出选择。
- [go-colortext](https://github.com/daviddengcn/go-colortext) - 用于终端颜色输出的 Go 库。
- [climax](https://github.com/tucnak/climax) - 具有“人性化界面”的替代 CLI，秉承 Go 命令的精神。
- [vibecheck](https://github.com/rshdhere/vibecheck) - 跨平台 CLI，可根据代码更改自动生成 Git 提交消息。
- [clîr](https://github.com/leaanthony/clir) - 一个简单清晰的 CLI 库。无依赖。
- [hiboot cli](https://github.com/hidevopsio/hiboot/tree/master/pkg/app/cli) - 具有自动配置和依赖注入的 CLI 应用程序框架。
- [commandeer](https://github.com/jaffee/commandeer) - 开发者友好的 CLI 应用：基于结构体字段和标签设置标志、默认值和用法。
- [sflags](https://github.com/octago/sflags) - 基于结构体的标志生成器，适用于 flag、urfave/cli、pflag、cobra、kingpin 等库。
- [acmd](https://github.com/cristalhq/acmd) - Go 中简单、实用且固执己见的 CLI 包。
- [job](https://github.com/liujianping/job) - JOB，将你的短期命令变成长期任务。
- [readline](https://github.com/reeflective/readline) - 具有现代且易用 UI 功能的 Shell 库。
- [cmdr](https://github.com/hedzr/cmdr) - 一个 POSIX/GNU 风格、类似 getopt 的命令行界面 Go 库。
- [teris-io/cli](https://github.com/teris-io/cli) - 用于在 Go 中构建命令行界面的简单而完整的 API。
- [loom](https://github.com/loom-go/loom) - 基于信号的反应式组件框架，用于构建 TUI。
- [env](https://github.com/codingconcepts/env) - 基于标签的结构体环境配置。
- [console](https://github.com/reeflective/console) - 面向 Cobra 命令的闭环应用库，带有 oh-my-posh 提示等。
- [version](https://github.com/mszostok/version) - 以多种格式收集并显示 CLI 版本信息，同时提供升级通知。
- [command-chain](https://github.com/rainu/go-command-chain) - 用于配置和运行命令链的 Go 库——例如 Unix shell 中的管道。
- [gocmd](https://github.com/devfacet/gocmd) - 用于构建命令行应用程序的 Go 库。
- [wlog](https://github.com/dixonwille/wlog) - 支持跨平台颜色和并发的简单日志接口。
- [lazyenv](https://github.com/lazynop/lazyenv) - 用于浏览、比较和编辑 .env 文件的 TUI。
- [strumt](https://github.com/antham/strumt) - 用于创建提示链的库。
- [go-getoptions](https://github.com/DavidGamba/go-getoptions) - 受 Perl 的 GetOpt::Long 灵活性启发的 Go 选项解析器。
- [ctc](https://github.com/wzshiming/ctc) - 非侵入式跨平台终端颜色库，无需修改 Print 方法。
- [marker](https://github.com/cyucelen/marker) - 匹配和标记字符串以实现彩色终端输出的最简单方法。
- [table](https://github.com/tomlazar/table) - 用于终端彩色表格的小型库。
- [boa](https://github.com/GiGurra/boa) - 基于结构体标签的声明式标志、环境变量、验证和配置文件。基于 cobra 构建。
- [flagvar](https://github.com/sgreben/flagvar) - Go 标准 `flag` 包的标志参数类型集合。
- [cmd](https://github.com/posener/cmd) - 以惯用方式扩展标准 `flag` 包以支持子命令等。
- [mcli](https://github.com/jxskiss/mcli) - 一个极简但非常强大的 Go CLI 库。
- [phoenix](https://github.com/phoenix-tui/phoenix) - 高性能 TUI 框架，采用 Elm 风格架构，完美的 Unicode 渲染，以及零分配事件系统。
- [OpenCLI](https://github.com/bcdxn/opencli) - 面向 CLI 的 OpenAPI 风格规范；用语言无关的文档定义接口，以生成文档和框架样板代码。
- [argv](https://github.com/cosiner/argv) - 使用 bash 语法将命令行字符串拆分为参数数组的 Go 库。
- [hashicorp/cli](https://github.com/hashicorp/cli) - 用于实现命令行界面的 Go 库。
- [go-readline-ny](https://github.com/nyaosorg/go-readline-ny) - 一个可定制的行编辑库，支持 Emacs 键绑定、Unicode、补全和语法高亮。用于 NYAGOS shell。
- [carapace-spec](https://github.com/rsteube/carapace-spec) - 使用规范文件定义简单补全。
- [orpheus](https://github.com/agilira/orpheus) - 具有安全加固、插件存储系统和生产可观测性功能的 CLI 框架。
- [goscaf](https://github.com/iyashjayesh/goscaf) - goscaf 通过交互式 CLI 生成有主见、生产级的 Go 项目脚手架。无需在项目间复制粘贴骨架代码。
- [go-ataman](https://github.com/workanator/go-ataman) - 用于在终端中渲染 ANSI 彩色文本模板的 Go 库。
- [go-palette](https://github.com/abusomani/go-palette) - Go 库，使用 ANSI 颜色提供优雅便捷的样式定义。完全兼容并封装了 [fmt 库](https://pkg.go.dev/fmt)，以实现良好的终端布局。
- [structcli](https://github.com/leodido/structcli) - 消除 Cobra 样板代码：从 Go 结构体以声明方式构建功能强大的 CLI。
- [memsh](https://github.com/amjadjibon/memsh) - Go 中的虚拟 bash shell：针对内存文件系统（afero）执行 shell 命令，支持 WASM 插件和可嵌入的 HTTP 服务器。
- [subcmd](https://github.com/bobg/subcmd) - 解析和运行子命令的另一种方法。与标准 `flag` 包协同工作。
- [flash-flags](https://github.com/agilira/flash-flags) - 超快、零依赖、符合 POSIX 的标志解析库，可作为 stdlib 的即插即用替代品，并具有安全加固。
- [getopt](https://github.com/jon-codes/getopt) - 一个精确的 Go `getopt`，已针对 GNU libc 实现进行验证。
- [GoPOSIX](https://github.com/ramayac/GoPOSIX) - 一个 Go 原生的单二进制多调用工具，包含 77 个 POSIX 工具，与 BusyBox 测试兼容性超过 97%。
- [crab-config-files-templating](https://github.com/alfiankan/crab-config-files-templating) - 用于 Kubernetes 清单或通用配置文件的动态配置文件模板化工具。
- [neuron-cli](https://github.com/steevin/neuron-cli) - 一个本地优先、兼容 Obsidian 的终端知识管理器。
- [goopt](https://github.com/napalu/goopt) - 一个基于结构体标签的声明式 Go CLI 框架，功能广泛，包括层级命令/标志、国际化、Shell 补全和验证。
- [go-arch](https://github.com/SalvucciFacundo/go-arch) - 用于搭建 Go 应用的 CLI 工具，支持极简、标准和六边形架构模式。
- [gozen](https://github.com/tech-thinker/gozen) - gozen 是一个简化的 Golang MVC 框架，用于生成项目和组件，支持 REST、gRPC 等。高度可定制，易于添加任何 API 层或 worker。
- [lazyteams](https://github.com/agmonetti/lazyteams) - 面向 Microsoft Teams 的键盘驱动终端用户界面。
- [eyez](https://github.com/tech-thinker/eyez) - eyez 是一个便捷的 CLI 工具，可直接在终端中查看图像，支持大多数终端模拟器。
- [Fling-CLI](https://github.com/SatyamKumarCS/Fling-CLI) - 基于自定义可靠 UDP 的终端点对点文件和消息传输工具。
- [chroma16](https://github.com/arceus-7/chroma16) - 从单一种子颜色或字符串生成和谐的 16 色终端调色板。
:::

::: masonry
## ORM
> 实现对象关系映射或数据映射技术的库。
- [GORM](https://github.com/go-gorm/gorm) - 优秀的 Golang ORM 库，旨在对开发者友好。
- [ent](https://github.com/facebook/ent) - Go 的实体框架。简单而强大的 ORM，用于数据建模和查询。
- [SQLBoiler](https://github.com/volatiletech/sqlboiler) - ORM 生成器。为你的数据库 schema 生成功能丰富且极速的 ORM。
- [bun](https://github.com/uptrace/bun) - SQL 优先的 Golang ORM。go-pg 的继任者。
- [gorp](https://github.com/go-gorp/gorp) - Go 的关系持久化，类似 ORM 的库。
- [upper.io/db](https://github.com/upper/db) - 通过封装成熟数据库驱动程序的适配器，用单一接口与不同数据源交互。
- [gormt](https://github.com/xxjwxc/gormt) - MySQL 数据库转 golang gorm 结构体。
- [Prisma](https://github.com/prisma/prisma-client-go) - Prisma Client Go，Go 的类型安全数据库访问。
- [bob](https://github.com/stephenafamo/bob) - Go 的 SQL 查询构建器及 ORM/工厂生成器。SQLBoiler 的继任者。
- [go-sqlbuilder](https://github.com/huandu/go-sqlbuilder) - 灵活强大的 SQL 字符串构建器库，外加零配置 ORM。
- [pop/soda](https://github.com/gobuffalo/pop) - 适用于 MySQL、PostgreSQL 和 SQLite 的数据库迁移、创建、ORM 等。
- [reform](https://github.com/go-reform/reform) - 更好的 Go ORM，基于非空接口和代码生成。
- [rel](https://github.com/go-rel/rel) - 现代 Golang 数据库访问层——可测试、可扩展，并打造为干净优雅的 API。
- [Zoom](https://github.com/albrow/zoom) - 基于 Redis 构建的极速数据存储和查询引擎。
- [go-sql](https://github.com/rushteam/gosql) - MySQL 的简易 ORM。
- [GoooQo](https://github.com/doytowin/goooqo) - 基于声明式查询模型的数据库访问框架。
- [golobby/orm](https://github.com/golobby/orm) - 简单、快速、类型安全、泛型的 ORM，旨在提升开发者幸福感。
- [grimoire](https://github.com/Fs02/grimoire) - Grimoire 是 golang 的数据库访问层和验证库。（支持：MySQL、PostgreSQL 和 SQLite3）。
- [go-store](https://github.com/gosuri/go-store) - Go 的简单快速 Redis 后端键值存储库。
- [go-firestorm](https://github.com/jschoedt/go-firestorm) - Google/Firebase Cloud Firestore 的简单 ORM。
- [cacheme](https://github.com/Yiling-J/cacheme-go) - 基于 schema 的 Go 类型化 Redis 缓存/记忆化框架。
- [go-dbw](https://github.com/hashicorp/go-dbw) - 封装数据库操作的简单包。
- [CQL](https://github.com/FrancoLiberali/cql) - 构建于 GORM 之上，基于自动生成的代码提供编译时验证的查询。
- [lore](https://github.com/abrahambotros/lore) - Go 的简单轻量级伪 ORM/伪结构映射环境。
- [marlow](https://github.com/marlow/marlow) - 从项目结构体生成的 ORM，确保编译时安全。
- [XORM](https://gitea.com/xorm/xorm) - Go 的简单而强大的 ORM。（支持：MySQL、MyMysql、PostgreSQL、Tidb、SQLite3、MsSql 和 Oracle）。
:::

::: masonry
## 持续集成
> 用于辅助持续集成的工具。
- [drone](https://github.com/drone/drone) - Drone 是一个基于 Docker 构建的持续集成平台，使用 Go 编写。
- [woodpecker](https://github.com/woodpecker-ci/woodpecker) - Woodpecker 是 Drone CI 系统的社区分支。
- [CDS](https://github.com/ovh/cds) - 企业级 CI/CD 和 DevOps 自动化开源平台。
- [muffet](https://github.com/raviqqe/muffet) - 用 Go 编写的快速网站链接检查器，参见[替代方案](https://github.com/lycheeverse/lychee#features)。
- [abstruse](https://github.com/bleenco/abstruse) - Abstruse 是一个分布式 CI 平台。
- [goveralls](https://github.com/mattn/goveralls) - Go 对 Coveralls.io 持续代码覆盖率跟踪系统的集成。
- [gotestfmt](https://github.com/GoTestTools/gotestfmt) - 面向人类的 go test 输出。
- [PikoCI](https://github.com/pikoci/pikoci) - 受 Concourse 启发的自托管 CI/CD。单个二进制，任意数据库，任意队列。HCL 管道，可插拔的资源类型和运行器。
- [overalls](https://github.com/go-playground/overalls) - 多包 Go 项目的 coverprofile，适用于 goveralls 等工具。
- [gomason](https://github.com/nikogura/gomason) - 从干净的工作区测试、构建、签名和发布你的 Go 二进制文件。
- [dot](https://github.com/opnlabs/dot) - 一个极简、本地优先的持续集成系统，使用 Docker 分阶段并发运行任务。
- [go-semver-release](https://github.com/s0ders/go-semver-release) - 自动化 Git 仓库的语义化版本管理。
- [go-beautiful-html-coverage](https://github.com/gha-common/go-beautiful-html-coverage) - 一个 GitHub Action，用于跟踪拉取请求中的代码覆盖率，并提供漂亮的 HTML 预览，完全免费。
- [roveralls](https://github.com/LawrenceWoodman/roveralls) - 递归覆盖率测试工具。
- [go-fuzz-action](https://github.com/jidicula/go-fuzz-action) - 在 GitHub Actions 中使用 Go 1.18 的内置模糊测试。
- [Bencher](https://bencher.dev/) - 一套持续基准测试工具，旨在捕获 CI 中的性能回退。
- [go-test-coverage](https://github.com/marketplace/actions/go-test-coverage) - 一个 GitHub Action，当测试覆盖率低于设定阈值时报告问题。
:::

::: masonry
## 分布式系统
> 有助于构建分布式系统的包。
- [go-zero](https://github.com/tal-tech/go-zero) - 一个 Web 和 RPC 框架。其设计旨在通过弹性设计确保繁忙站点的稳定性。内置 goctl 大幅提升开发效率。
- [go-kit](https://github.com/go-kit/kit) - 微服务工具包，支持服务发现、负载均衡、可插拔传输、请求追踪等。
- [Kratos](https://github.com/go-kratos/kratos) - 一个模块化设计、易于使用的 Go 微服务框架。
- [grpc-go](https://github.com/grpc/grpc-go) - gRPC 的 Go 语言实现。基于 HTTP/2 的 RPC。
- [go-micro](https://github.com/micro/go-micro) - 一个分布式系统开发框架。
- [NATS](https://github.com/nats-io/nats-server) - NATS 是一个简单、安全且高性能的通信系统，适用于数字系统、服务和设备。
- [raft](https://github.com/hashicorp/raft) - HashiCorp 的 Raft 共识协议的 Golang 实现。
- [rpcx](https://github.com/smallnest/rpcx) - 分布式可插拔 RPC 服务框架，类似阿里巴巴 Dubbo。
- [Kitex](https://github.com/cloudwego/kitex) - 一个高性能、强扩展性的 Golang RPC 框架，帮助开发者构建微服务。如果在开发微服务时主要关注性能和扩展性，Kitex 是一个不错的选择。
- [lura](https://github.com/luraproject/lura) - 超高性能的 API 网关框架，支持中间件。
- [torrent](https://github.com/anacrolix/torrent) - BitTorrent 客户端包。
- [dragonboat](https://github.com/lni/dragonboat) - Go 中功能完备且高性能的多组 Raft 库。
- [evans](https://github.com/ktr0731/evans) - Evans：更具表现力的通用 gRPC 客户端。
- [emitter-io](https://github.com/emitter-io/emitter) - 基于 MQTT、Websockets 与热爱构建的高性能、分布式、安全且低延迟的发布-订阅平台。
- [gleam](https://github.com/chrislusf/gleam) - 纯 Go 与 Luajit 编写的高性能可扩展分布式 map/reduce 系统，结合 Go 的高并发与 Luajit 的高性能，可独立运行或分布式运行。
- [Dragonfly](https://github.com/dragonflyoss/Dragonfly2) - 基于 p2p 技术提供高效、稳定、安全的文件分发与镜像加速，成为云原生架构中的最佳实践与标准解决方案。
- [glow](https://github.com/chrislusf/glow) - 易用的可扩展分布式大数据处理、Map-Reduce、DAG 执行，全部使用纯 Go。
- [sponge](https://github.com/zhufuyi/sponge) - 一个集成了自动代码生成、gin 和 grpc 框架以及基础开发框架的分布式开发框架。
- [liftbridge](https://github.com/liftbridge-io/liftbridge) - 轻量级、容错的消息流，用于 NATS。
- [oras](https://github.com/oras-project/oras) - 用于容器仓库中 OCI 制品的 CLI 和库。
- [go-eagle](https://github.com/go-eagle/eagle) - 用于 API 或微服务的 Go 框架，附带便捷的脚手架工具。
- [mochi mqtt](https://github.com/mochi-co/mqtt) - 完全符合规范、可嵌入的高性能 MQTT v5/v3 代理，适用于物联网、智能家居和发布订阅。
- [redis-lock](https://github.com/bsm/redislock) - 使用 Redis 的简化分布式锁实现。
- [K8gb](https://github.com/k8gb-io/k8gb) - 一个云原生 Kubernetes 全局负载均衡器。
- [hprose](https://github.com/hprose/hprose-golang) - 非常新颖的 RPC 库，现已支持 25+ 种语言。
- [trpc-go](https://github.com/trpc-group/trpc-go) - tRPC 的 Go 语言实现，一个可插拔的高性能 RPC 框架。
- [go-doudou](https://github.com/unionj-cloud/go-doudou) - 基于 gossip 协议与 OpenAPI 3.0 规范的去中心化微服务框架。内置 go-doudou cli，专注于低代码与快速开发，可提升生产力。
- [rain](https://github.com/cenkalti/rain) - BitTorrent 客户端和库。
- [raft](https://github.com/etcd-io/raft) - CoreOS 的 Raft 共识协议的 Go 实现。
- [arpc](https://github.com/lesismal/arpc) - 更高效的网络通信，支持双向调用、通知与广播。
- [Temporal](https://github.com/temporalio/sdk-go) - 持久执行系统，使代码容错且简单。
- [opentelemetry-go-auto-instrumentation](https://github.com/alibaba/opentelemetry-go-auto-instrumentation) - Golang 的 OpenTelemetry 编译时插桩。
- [consistent](https://github.com/buraksezer/consistent) - 带负载上限的一致性哈希。
- [gorpc](https://github.com/valyala/gorpc) - 面向高负载的简单、快速、可扩展的 RPC 库。
- [go-sundheit](https://github.com/AppsFlyer/go-sundheit) - 为 Go 服务提供异步健康检查定义的库。
- [digota](https://github.com/digota/digota) - gRPC 电商微服务。
- [go-jump](https://github.com/dgryski/go-jump) - Google "Jump" 一致性哈希函数的移植。
- [sleuth](https://github.com/ursiform/sleuth) - 用于 HTTP 服务之间无主 P2P 自动发现和 RPC 的库（使用 [ZeroMQ](https://github.com/zeromq/libzmq)）。
- [jsonrpc](https://github.com/ybbus/jsonrpc) - JSON-RPC 2.0 HTTP 客户端实现。
- [dht](https://github.com/anacrolix/dht) - BitTorrent Kademlia DHT 实现。
- [Tarmac](https://github.com/tarmac-project/tarmac) - 用于编写函数、微服务或单体应用的 WebAssembly 框架。
- [jsonrpc](https://github.com/osamingo/jsonrpc) - jsonrpc 包帮助实现 JSON-RPC 2.0。
- [outboxer](https://github.com/italolelis/outboxer) - Outboxer 是一个实现发件箱模式的 Go 库。
- [outbox](https://github.com/oagudo/outbox) - Go 中事务性发件箱模式的轻量级库，不绑定任何特定关系数据库或代理。
- [doublejump](https://github.com/edwingeng/doublejump) - 改进版 Google Jump 一致性哈希。
- [Semaphore](https://github.com/jexia/semaphore) - 一个简单的（微）服务编排器。
- [cmd-stream-go](https://github.com/cmd-stream/cmd-stream-go) - 面向 Go 的高性能分布式命令模式库。
- [dot](https://github.com/dotchain/dot/) - 基于操作转换（OT）的分布式同步。
- [capillaries](https://github.com/capillariesio/capillaries) - 分布式批处理数据框架。
- [flowgraph](https://github.com/vectaport/flowgraph) - 流式编程包。
- [go-mysql-lock](https://github.com/sanketplus/go-mysql-lock) - 基于 MySQL 的分布式锁。
- [drmaa](https://github.com/dgruber/drmaa) - 基于 DRMAA 标准的集群调度器作业提交库。
- [go-pdu](https://github.com/pdupub/go-pdu) - 一个去中心化的基于身份识别的社交网络。
- [committer](https://github.com/vadiminshakov/committer) - 分布式事务管理系统（2PC/3PC 实现）。
- [consistenthash](https://github.com/mbrostami/consistenthash) - 可配置副本数的一致性哈希。
- [gmsec](https://github.com/gmsec/micro) - 一个 Go 分布式系统开发框架。
- [bedrock](https://github.com/z5labs/bedrock) - 为在 Go 中快速开发服务及更多特定用例框架提供极简、模块化且可组合的基础。
- [dynatomic](https://github.com/tylfin/dynatomic) - 用于将 DynamoDB 用作原子计数器的库。
- [failured](https://github.com/andy2046/failured) - 面向分布式系统的自适应累积故障检测器。
- [health](https://github.com/schigh/health) - 支持 Kubernetes 探针的 Go 服务健康检查器。
- [circuit](https://github.com/schigh/circuit) - 通过概率限流实现渐进恢复的熔断器。
- [lock](https://github.com/ubgo/lock) - 分布式锁家族，一个 Go 接口，五种后端（filelock、flock、Redis、Postgres、etcd）——跨所有后端支持 fencing token、信号量模式和可观测性钩子。
- [servicepack](https://github.com/psyb0t/servicepack) - 在单个二进制中并发运行多个服务的框架，可本地运行或跨机器分布式运行。
- [rpcplatform](https://github.com/nexcode/rpcplatform) - 微服务框架，提供服务发现、负载均衡及相关功能。
- [dynamolock](https://cirello.io/dynamolock) - 基于 DynamoDB 的分布式锁实现。
- [pglock](https://cirello.io/pglock) - 基于 PostgreSQL 的分布式锁实现。
- [pjrpc](https://gitlab.com/pjrpc/pjrpc) - Golang JSON-RPC 服务器-客户端，使用 Protobuf 规范。
- [resgate](https://resgate.io/) - 用于构建 REST、实时和 RPC API 的实时 API 网关，所有客户端无缝同步。
:::

::: masonry
## 风格指南
- [CockroachDB](https://github.com/cockroachdb/cockroach/blob/master/docs/style.md)
- [Uber](https://github.com/uber-go/guide/blob/master/style.md)
- [Hyperledger](https://github.com/hyperledger/fabric/blob/release-1.4/docs/source/style-guides/go-style.rst)
- [Trybe](https://github.com/betrybe/playbook-go/blob/main/README_EN.md)
- [enra/go-styleguide](https://codeberg.org/enra/go-styleguide)
- [GitLab](https://docs.gitlab.com/ee/development/go_guide/)
- [Google](https://google.github.io/styleguide/go/)
- [Thanos](https://thanos.io/tip/contributing/coding-style-guide.md/)
:::

::: masonry
## 配置
> 用于配置解析的库。
- [viper](https://github.com/spf13/viper) - 带尖牙的 Go 配置。
- [godotenv](https://github.com/joho/godotenv) - Ruby 的 dotenv 库的 Go 移植版（从 `.env` 加载环境变量）。
- [sonic](https://github.com/bytedance/sonic) - 一个极快的 JSON 序列化和反序列化库。
- [env](https://github.com/caarlos0/env) - 将环境变量解析为 Go 结构体（支持默认值）。
- [kelseyhightower/envconfig](https://github.com/kelseyhightower/envconfig) - 用于从环境变量管理配置数据的 Go 库。
- [koanf](https://github.com/knadh/koanf) - 轻量、可扩展的 Go 应用配置读取库，内置支持 JSON、TOML、YAML、env、命令行。
- [ini](https://github.com/go-ini/ini) - 用于读写 INI 文件的 Go 包。
- [kong](https://github.com/alecthomas/kong) - 命令行解析器，支持任意复杂的命令行结构以及 YAML、JSON、TOML 等其他配置来源（`kingpin` 的继任者）。
- [cleanenv](https://github.com/ilyakaznacheev/cleanenv) - 极简配置读取器（从文件、ENV 以及任何你想要的地方）。
- [xdg](https://github.com/adrg/xdg) - Go 实现的 [XDG 基础目录规范](https://specifications.freedesktop.org/basedir-spec/latest/) 和 [XDG 用户目录](https://wiki.archlinux.org/index.php/XDG_user_directories)。
- [aconfig](https://github.com/cristalhq/aconfig) - 简单、实用且固执己见的配置加载器。
- [konfig](https://github.com/lalamove/konfig) - 面向分布式处理时代的 Go 可组合、可观察且高性能的配置处理。
- [gookit/config](https://github.com/gookit/config) - 应用配置管理（加载、获取、设置）。支持 JSON、YAML、TOML、INI、HCL。多文件加载，数据覆盖合并。
- [confita](https://github.com/heetch/confita) - 从多个后端级联加载配置到结构体中。
- [konf](https://github.com/nil-go/konf) - 用于从文件、环境变量、标志和云（如 AWS、Azure、GCP）读取/监视配置的最简单 API。
- [fig](https://github.com/kkyr/fig) - 用于从文件和环境变量读取配置的小型库（支持校验和默认值）。
- [GoLobby/Config](https://github.com/golobby/config) - GoLobby Config 是一个轻量级但功能强大的 Go 编程语言配置管理器。
- [hjson](https://github.com/hjson/hjson-go) - Human JSON，一种面向人类的配置文件格式。语法宽松，错误更少，注释更多。
- [config](https://github.com/JeremyLoy/config) - 云原生应用配置。仅用两行代码将 ENV 绑定到结构体。
- [envconfig](https://github.com/vrischmann/envconfig) - 从环境变量读取配置。
- [zerocfg](https://github.com/chaindead/zerocfg) - 零成本、简洁的配置管理，避免样板和重复代码，支持多来源优先级覆盖。
- [argus](https://github.com/agilira/argus) - 文件监视和配置管理，支持 MPSC 环形缓冲区、自适应批处理策略和通用格式解析（JSON、YAML、TOML、INI、HCL、Properties）。
- [harvester](https://github.com/beatlabs/harvester) - Harvester，一个易于使用的静态和动态配置包，支持种子、环境变量和Consul集成。
- [onion](https://github.com/goraz/onion) - 基于层的 Go 配置，支持 JSON、TOML、YAML、properties、etcd、env，以及使用 PGP 加密。
- [configuration](https://github.com/BoRuDar/configuration) - 用于从环境变量、文件、标志和 'default' 标签初始化配置结构体的库。
- [envh](https://github.com/antham/envh) - 用于管理环境变量的辅助工具。
- [configuro](https://github.com/sherifabdlnaby/configuro) - 面向12-Factor应用的、基于环境变量和文件的、有主见的配置加载与校验框架。
- [hocon](https://github.com/gurkankaymak/hocon) - 用于处理 HOCON（一种人类友好的 JSON 超集）格式的配置库，支持环境变量、引用其他值、注释和多文件等特性。
- [env](https://github.com/junk1tm/env) - 一个轻量级包，用于将环境变量加载到结构体中。
- [uConfig](https://github.com/omeid/uconfig) - 轻量、零依赖、可扩展的配置管理。
- [go-aws-ssm](https://github.com/PaddleHQ/go-aws-ssm) - 从 AWS System Manager - Parameter Store 获取参数的 Go 包。
- [config](https://github.com/num30/config) - 用两行代码通过文件、环境变量或标志配置你的应用。
- [gone/jconf](https://github.com/One-com/gone/tree/master/jconf) - 模块化JSON配置。将配置结构体与它们所配置的代码放在一起，并将解析委托给子模块，同时不牺牲完整的配置序列化。
- [go-cfg](https://github.com/dsbasko/go-cfg) - 该库提供了一种统一的方式，从各种来源（如环境变量、标志和配置文件（.json、.yaml、.toml、.env））将配置数据读取到结构中。
- [goconfig](https://github.com/fulldump/goconfig) - 从标志、环境变量、config.json和默认值以确定性优先级填充Go结构体。无额外依赖。
- [genv](https://github.com/sakirsensoy/genv) - 轻松读取环境变量，支持 dotenv。
- [go-up](https://github.com/ufoscout/go-up) - 一个简单的配置库，支持递归占位符解析，无魔法。
- [confiq](https://github.com/greencoda/confiq) - 用于Go的结构化数据格式到配置结构体解码器库，支持多种数据格式。
- [enflag](https://github.com/atelpis/enflag) - 面向容器、零依赖的配置库，统一了环境变量和标志解析。使用泛型保证类型安全，无需反射或结构体标签。
- [conflate](https://github.com/the4thamigo-uk/conflate) - 用于从任意URL合并多个JSON/YAML/TOML文件的库/工具，支持针对JSON Schema进行校验，并应用Schema中定义的默认值。
- [bcl](https://github.com/wkhere/bcl) - BCL 是一种类似于 HCL 的配置语言。
- [go-array](https://github.com/deatil/go-array) - 一个从 map、slice 或 json 读取或设置数据的 Go 包。
- [go-ssm-config](https://github.com/ianlopshire/go-ssm-config) - 用于从AWS SSM（Parameter Store）加载配置参数的Go工具。
- [envyaml](https://github.com/yuseferi/envyaml) - 支持环境变量的YAML读取器。它有助于将机密作为环境变量，但将配置加载为结构化的YAML。
- [nasermirzaei89/env](https://github.com/nasermirzaei89/env) - 用于读取环境变量的简单实用包。
- [yamagiconf](https://github.com/romshark/yamagiconf) - 用于 Go 配置的 YAML“安全子集”。
- [go-ini](https://github.com/subpop/go-ini) - 一个用于编组和解组 INI 文件的 Go 包。
- [ini](https://github.com/wlevene/ini) - INI 解析与写入库，支持解组到结构体、编组为 JSON、写入文件、监听文件。
- [go-conf](https://github.com/ThomasObenaus/go-conf) - 基于注解结构体的简单应用配置库。支持从环境变量、配置文件和命令行参数读取配置。
- [nfigure](https://github.com/muir/nfigure) - 基于结构体标签的配置库，支持命令行（Posix 和 Go 风格）、环境变量、JSON、YAML。
- [typenv](https://github.com/diegomarangoni/typenv) - 极简、零依赖、类型化的环境变量库。
- [piper](https://github.com/Yiling-J/piper) - Viper 包装器，支持配置继承和密钥生成。
- [go-yamlvalidator](https://github.com/Yakwilik/go-yamlvalidator) - 支持原生Go模式和JSON Schema的源感知YAML校验。
- [gonfig](https://github.com/milad-abbasi/gonfig) - 基于标签的配置解析器，从不同提供者加载值到类型安全的结构体。
- [env](https://github.com/syntaqx/env) - 一个环境工具包，支持解组到结构体。
- [hedzr/store](https://github.com/hedzr/store) - 可扩展、高性能的配置管理库，针对分层数据优化。
- [swap](https://github.com/oblq/swap) - 基于构建环境递归实例化/配置结构体（YAML、TOML、JSON 和 env）。
- [azureappconfiguration](https://github.com/Azure/AppConfiguration-GoProvider) - 用于从 Go 应用程序消费 Azure App Configuration 数据的配置提供程序。
- [go-config](https://github.com/MordaTeam/go-config) - 用于处理应用配置的简单便捷库。
- [GoCfg](https://github.com/Jagerente/gocfg) - 基于结构体标签契约的配置管理器，支持自定义值提供者、解析器和文档生成。可定制且简单。
- [go-external-config](https://github.com/go-external-config/go) - 受 Spring 启发的 Go 配置管理库。
- [go-external-config/aws](https://github.com/go-external-config/aws) - go-external-config 的 AWS 属性源支持。
- [go-external-config/consul](https://github.com/go-external-config/consul) - go-external-config 的 Consul 属性源支持。
- [go-external-config/vault](https://github.com/go-external-config/vault) - go-external-config 的 Vault 属性源支持。
- [config](https://github.com/andreiavrammsd/config) - 基于结构体的配置加载器，带有专用配置文件解析器，支持环境变量、标志、默认值和验证。
- [goenv](https://github.com/psyb0t/goenv) - 读取ENV环境变量，报告进程是否在生产或开发环境中运行。
- [gonfiguration](https://github.com/psyb0t/gonfiguration) - 通过反射从环境变量加载配置到结构体，支持结构体标签默认值和必填字段。
:::

::: masonry
## GUI
> 用于构建 GUI 应用程序的库。
- [fyne](https://github.com/fyne-io/fyne) - 基于 Material Design 的跨平台原生 GUI，专为 Go 设计。支持：Linux、macOS、Windows、BSD、iOS 和 Android。
- [webview](https://github.com/zserge/webview) - 跨平台 webview 窗口，支持简单的双向 JavaScript 绑定（Windows / macOS / Linux）。
- [robotgo](https://github.com/go-vgo/robotgo) - Go 原生跨平台 GUI 系统自动化。控制鼠标、键盘等。
- [qt](https://github.com/therecipe/qt) - Go 的 Qt 绑定（支持 Windows / macOS / Linux / Android / iOS / Sailfish OS / Raspberry Pi）。
- [app](https://github.com/murlokswarm/app) - 使用 GO、HTML 和 CSS 创建应用的包。支持：macOS、Windows（开发中）。
- [ui](https://github.com/andlabs/ui) - Go 的平台原生 GUI 库。跨平台。
- [walk](https://github.com/lxn/walk) - Go 的 Windows 应用程序库套件。
- [DarwinKit](https://github.com/progrium/darwinkit) - 使用 Go 构建原生 macOS 应用程序。
- [systray](https://github.com/getlantern/systray) - 跨平台 Go 库，用于在通知区域放置图标和菜单。
- [go-sciter](https://github.com/sciter-sdk/go-sciter) - Sciter 的 Go 绑定：用于现代桌面 UI 开发的可嵌入 HTML/CSS/脚本引擎。跨平台。
- [Cogent Core](https://github.com/cogentcore/core) - 一个用于构建 2D 和 3D 应用的框架，支持 macOS、Windows、Linux、iOS、Android 和 Web。
- [gotk3](https://github.com/gotk3/gotk3) - GTK3 的 Go 绑定。
- [Spot](https://github.com/roblillack/spot) - 响应式、跨平台桌面 GUI 工具包。
- [zenity](https://github.com/ncruces/zenity) - 跨平台 Go 库和 CLI，用于创建与用户进行图形交互的简单对话框。
- [energy](https://github.com/energye/energy) - 基于 LCL（原生系统 UI 控件库）和 CEF（Chromium 嵌入式框架）的跨平台（Windows/macOS/Linux）
- [gosx-notifier](https://github.com/deckarep/gosx-notifier) - Go 的 OSX 桌面通知库。
- [cimgui-go](https://github.com/AllenDang/cimgui-go) - 通过 [cimgui](https://github.com/cimgui/cimgui) 为 [Dear ImGui](https://github.com/ocornut/imgui) 自动生成的 Go 包装器。
- [gogpu/ui](https://github.com/gogpu/ui) - GPU 加速的 GUI 工具包，包含 22 个控件、3 种设计系统（Material、Fluent、Cupertino）、响应式信号，且零 CGO（属于 [GoGPU](https://github.com/gogpu) 生态系统）。
- [gowd](https://github.com/dtylman/gowd) - 使用 GO、HTML、CSS 和 NW.js 进行快速简单的桌面 UI 开发。跨平台。
- [unison](https://github.com/richardwilkes/unison) - 面向 Go 桌面应用的统一图形用户体验工具包。支持 macOS、Windows 和 Linux。
- [trayhost](https://github.com/shurcooL/trayhost) - 跨平台 Go 库，用于在宿主操作系统的任务栏中放置图标。
- [gogpu/systray](https://github.com/gogpu/systray) - 纯 Go 系统托盘库，支持 Windows、macOS 和 Linux，零 CGO（属于 [GoGPU](https://github.com/gogpu) 生态系统的一部分）。
- [proton](https://github.com/CzaxStudio/proton) - 纯 Go 即时模式 GUI 框架，基于 Gio 构建，零 Cgo 依赖。
- [mac-sleep-notifier](https://github.com/prashantgupta24/mac-sleep-notifier) - Go 中的 OSX 睡眠/唤醒通知。
- [mac-activity-tracker](https://github.com/prashantgupta24/activity-tracker) - OSX 库，用于通知机器上的任何（可插拔）活动。
- [goradd/html5tag](https://github.com/goradd/html5tag) - 用于输出 HTML5 标签的库。
- [AppIndicator Go](https://github.com/gopherlibs/appindicator) - libappindicator3 C 库的 Go 绑定。
- [gio](https://gioui.org) - Gio 是一个用 Go 编写跨平台即时模式 GUI 的库。Gio 支持所有主要平台：Linux、macOS、Windows、Android、iOS、FreeBSD、OpenBSD 和 WebAssembly。
- [go-gtk](https://mattn.github.io/go-gtk/) - GTK 的 Go 绑定。
- [Goey](https://bitbucket.org/rj/goey/src/master/) - 面向 Windows/Linux/Mac 的跨平台 UI 工具包聚合器。GTK、Cocoa、Windows API
- [Wails](https://wails.io) - 使用内置操作系统 HTML 渲染器，以 HTML UI 构建 Mac、Windows、Linux 桌面应用。
:::

::: masonry
## 测试
> 用于测试代码库和生成测试数据的库。
- [Testify](https://github.com/stretchr/testify) - 标准 Go 测试包的扩展。
- [keploy](https://github.com/keploy/keploy) - 自动从 API 调用生成测试用例和数据 Mock。
- [chromedp](https://github.com/knq/chromedp) - 一种驱动/测试 Chrome、Safari、Edge、Android WebView 及其他支持 Chrome 调试协议的浏览器的方式。
- [GoConvey](https://github.com/smartystreets/goconvey/) - BDD 风格框架，带 Web UI 和实时重载。
- [mockery](https://github.com/vektra/mockery) - 用于生成 Go 接口的工具。
- [rod](https://github.com/go-rod/rod) - 一个 Devtools 驱动程序，让 Web 自动化和爬取变得简单。
- [go-sqlmock](https://github.com/DATA-DOG/go-sqlmock) - 用于测试数据库交互的模拟 SQL 驱动。
- [testcontainers-go](https://github.com/testcontainers/testcontainers-go) - 一个 Go 包，可轻松创建和清理基于容器的依赖，用于自动化集成/冒烟测试。简洁易用的 API 使开发人员能够以编程方式定义应在测试中运行的容器，并在测试完成后清理这些资源。
- [go-fuzz](https://github.com/dvyukov/go-fuzz) - 随机化测试系统。
- [go-cmp](https://github.com/google/go-cmp) - 用于在测试中比较 Go 值的包。
- [playwright-go](https://github.com/mxschmitt/playwright-go) - 通过单一 API 控制 Chromium、Firefox 和 WebKit 的浏览器自动化库。
- [gomock](https://github.com/uber-go/mock) - Go 编程语言的模拟框架。
- [httpexpect](https://github.com/gavv/httpexpect) - 简洁、声明式且易于使用的端到端 HTTP 和 REST API 测试。
- [godog](https://github.com/cucumber/godog) - Go 的 Cucumber BDD 框架。
- [hoverfly](https://github.com/SpectoLabs/hoverfly) - 用于记录和模拟 REST/SOAP API 的 HTTP(S) 代理，具有可扩展的中间件和易于使用的 CLI。
- [moq](https://github.com/matryer/moq) - 从任何接口生成结构体的工具。该结构体可在测试代码中用作接口的模拟。
- [httpmock](https://github.com/jarcoal/httpmock) - 轻松模拟来自外部资源的 HTTP 响应。
- [is](https://github.com/matryer/is) - 专业的轻量级 Go 测试迷你框架。
- [gnomock](https://github.com/orlangure/gnomock) - 使用真实依赖（数据库、缓存，甚至 Kubernetes 或 AWS）在 Docker 中运行的集成测试，无需模拟。
- [go-vcr](https://github.com/dnaeon/go-vcr) - 录制并重放你的 HTTP 交互，以实现快速、确定且准确的测试。
- [tparse](https://github.com/mfridman/tparse) - 用于汇总 go test 输出的 CLI 工具。支持管道。兼容 go test 标志。
- [embedded-postgres](https://github.com/fergusstrange/embedded-postgres) - 在 Linux、OSX 或 Windows 上本地运行真实的 Postgres 数据库，作为另一个 Go 应用或测试的一部分。
- [testfixtures](https://github.com/go-testfixtures/testfixtures) - 类似 Rails 测试夹具的辅助工具，用于测试数据库应用程序。
- [counterfeiter](https://github.com/maxbrunsfeld/counterfeiter) - 用于生成自包含模拟对象的工具。
- [failpoint](https://github.com/pingcap/failpoint) - Golang 的 [failpoints](https://www.freebsd.org/cgi/man.cgi?query=fail) 实现。
- [goblin](https://github.com/franela/goblin) - 类似 Mocha 的 Go 测试框架。
- [go-httpbin](https://github.com/mccutchen/go-httpbin) - HTTP 测试与调试工具，提供多种端点用于客户端测试。
- [goc](https://github.com/qiniu/goc) - Goc 是 Go 编程语言的全面覆盖率测试系统。
- [cdp](https://github.com/mafredri/cdp) - Chrome 调试协议的类型安全绑定，可用于浏览器或其他实现该协议的调试目标。
- [baloo](https://github.com/h2non/baloo) - 表达力强且多功能的端到端 HTTP API 测试，让测试变得简单。
- [minimock](https://github.com/gojuno/minimock) - Go 接口的模拟生成器。
- [go-txdb](https://github.com/DATA-DOG/go-txdb) - 主要用于测试目的的单事务数据库驱动。
- [pgxmock](https://github.com/pashagolub/pgxmock) - 实现 [pgx - PostgreSQL 驱动和工具包](https://github.com/jackc/pgx/) 的模拟库。
- [gotest.tools](https://github.com/gotestyourself/gotest.tools) - 一组用于增强 go testing 包并支持常见模式的包。
- [go-testdeep](https://github.com/maxatome/go-testdeep) - 极其灵活的 Go 深度比较，扩展了 go testing 包。
- [gofight](https://github.com/appleboy/gofight) - Golang 路由框架的 API 处理器测试。
- [xgo](https://github.com/xhd2015/xgo) - 一个通用的函数模拟库。
- [testza](https://github.com/MarvinJWendt/testza) - 功能齐全的测试框架，带有漂亮的彩色输出。
- [cupaloy](https://github.com/bradleyjkemp/cupaloy) - 为你的测试框架提供的简单快照测试插件。
- [arch-go](https://github.com/arch-go/arch-go) - Go 项目的架构测试工具。
- [frisby](https://github.com/verdverm/frisby) - REST API 测试框架。
- [go-snaps](http://github.com/gkampitakis/go-snaps) - Golang 中类似 Jest 的快照测试。
- [endly](https://github.com/viant/endly) - 声明式端到端功能测试。
- [got](https://github.com/ysmood/got) - 一个令人愉悦的 Go 测试框架。
- [go-hit](https://github.com/Eun/go-hit) - Hit 是一个用 Go 编写的 HTTP 集成测试框架。
- [go-carpet](https://github.com/msoap/go-carpet) - 在终端中查看测试覆盖率的工具。
- [Tavor](https://github.com/zimmski/tavor) - 通用模糊测试和增量调试框架。
- [go-test-coverage](https://github.com/vladopajic/go-test-coverage) - 报告低于设定阈值的文件覆盖率的工具。
- [commander](https://github.com/SimonBaeumer/commander) - 用于在 Windows、Linux 和 OSX 上测试 CLI 应用程序的工具。
- [charlatan](https://github.com/percolate/charlatan) - 用于生成测试用假接口实现的工具。
- [govcr](https://github.com/seborama/govcr) - Golang 的 HTTP 模拟：记录和重放 HTTP 交互以进行离线测试。
- [Testo](https://github.com/ozontech/testo) - 基于插件的测试框架，支持测试套件、并行测试、钩子和参数化。灵感来自 Pytest。
- [dbcleaner](https://github.com/khaiql/dbcleaner) - 用于测试目的的干净数据库，灵感来自 Ruby 中的 `database_cleaner`。
- [jsonassert](https://github.com/kinbiko/jsonassert) - 用于验证 JSON 负载是否正确序列化的包。
- [be](https://github.com/carlmjohnson/be) - 极简的通用测试断言库。
- [testcase](https://github.com/adamluzsi/testcase) - 符合行为驱动开发习惯的测试框架。
- [gocrest](https://github.com/corbym/gocrest) - Go 断言的可组合的类似 hamcrest 的匹配器。
- [wstest](https://github.com/posener/wstest) - 用于单元测试 websocket http.Handler 的 Websocket 客户端。
- [gherkingen](https://github.com/hedhyw/gherkingen) - BDD 样板生成器和框架。
- [selenosis](https://github.com/alcounit/selenosis) - 无状态、Kubernetes 原生的中心，通过自定义资源将 Selenium、Playwright 和 MCP 会话路由到按需浏览器 Pod。
- [go-localstack](https://github.com/elgohr/go-localstack) - 用于在 AWS 测试中使用 localstack 的工具。
- [testcerts](https://github.com/madflojo/testcerts) - 在测试函数中动态生成自签名证书和证书颁发机构。
- [timex](https://github.com/cabify/timex) - 原生 `time` 包的测试友好替代品。
- [assert](https://github.com/go-playground/assert) - 与原生 Go 测试一起使用的基础断言库，提供自定义断言的构建块。
- [restit](https://github.com/yookoala/restit) - Go 微框架，用于帮助编写 RESTful API 集成测试。
- [gospecify](https://github.com/stesla/gospecify) - 这为测试你的 Go 代码提供了 BDD 语法。任何使用过 rspec 等库的人都应该熟悉它。
- [should](https://github.com/Kairum-Labs/should) - 零依赖的测试库，提供详细的结构差异和人类可读的错误信息。
- [dsunit](https://github.com/viant/dsunit) - 针对 SQL、NoSQL、结构化文件的数据存储测试。
- [gomatch](https://github.com/jfilipczyk/gomatch) - 用于针对模式测试 JSON 的库。
- [fixenv](https://github.com/rekby/fixenv) - 夹具管理引擎，灵感来自 pytest 夹具。
- [axiom](https://github.com/Nikita-Filonov/axiom) - 可组合的 Go 测试框架，支持夹具、钩子、重试、元数据、插件和并行执行。
- [Hamcrest](https://github.com/rdrdr/hamcrest) - 流畅的声明式 Matcher 对象框架，应用于输入值时会产生自描述结果。
- [fabricator](https://github.com/Goldziher/fabricator) - 类型安全的工厂，用于在 Go 中生成模拟和假数据，灵感来自 factory_boy 和 interface-forge。
- [flute](https://github.com/suzuki-shunsuke/flute) - HTTP 客户端测试框架。
- [mockhttp](https://github.com/tv42/mockhttp) - Go http.ResponseWriter 的模拟对象。
- [schema](https://github.com/jgroeneveld/schema) - 用于请求和响应中 JSON schema 的快速简便表达式匹配。
- [dft](https://github.com/abecodes/dft) - 轻量级、零依赖的 Docker 容器，用于测试（或更多）。
- [mooncake](https://github.com/GuilhermeCaruso/mooncake) - 为多种目的生成模拟的简单方法。
- [gogiven](https://github.com/corbym/gogiven) - 类似 YATSPEC 的 Go BDD 测试框架。
- [testsql](https://github.com/zhulongcheng/testsql) - 在测试前从 SQL 文件生成测试数据，并在测试完成后清除。
- [bonk](https://github.com/joakimcarlsson/bonk) - 基于 WebSocket 的 Chrome DevTools 协议、无外部依赖的快速隐身优先浏览器自动化库。
- [biff](https://github.com/fulldump/biff) - 分支测试框架，兼容 BDD。
- [stop-and-go](https://github.com/elgohr/stop-and-go) - 用于并发测试的辅助工具。
- [gosuite](https://github.com/pavlo/gosuite) - 通过利用 Go1.7 的子测试，为 `testing` 带来轻量级测试套件，并具备 setup/teardown 功能。
- [Tt](https://github.com/vcaesar/tt) - 简单且多彩的测试工具。
- [mockfs](https://github.com/balinomad/go-mockfs) - 用于 Go 测试的模拟文件系统，支持错误注入和延迟模拟，基于 `testing/fstest.MapFS` 构建。
- [go-testpredicate](https://github.com/maargenton/go-testpredicate) - 测试谓词风格断言库，具有丰富的诊断输出。
- [gomock](https://github.com/vibridi/gomock) - 用于生成类型化且与框架无关的接口模拟的 CLI 工具，支持泛型。
- [go-mutesting](https://github.com/jonbaldie/go-mutesting) - Go 的变异测试，具备 CI 质量门禁、覆盖率感知的 MSI、基线跟踪和 git-diff 过滤。
- [go-testing](https://github.com/tkrop/go-testing) - Go 测试扩展，支持简单搭建强隔离的单元、组件和集成测试，提供扩展 gomock 和 gock 的高级 mock 支持。
- [trial](https://github.com/jgroeneveld/trial) - 快速简便的可扩展断言，无需引入大量样板代码。
- [envite](https://github.com/PerimeterX/envite) - 开发与测试环境管理框架。
- [assay](https://github.com/tushariitr-19/assay) - 与框架无关的评估库，用于测试 Go 代理和 MCP 服务器，支持确定性检查、CI 就绪的退出码和零代码的基于 YAML 的测试。
- [go-mysql-test-container](https://github.com/arikama/go-mysql-test-container) - Golang MySQL 测试容器，用于辅助 MySQL 集成测试。
- [prettycov](https://github.com/screwyprof/prettycov) - 将 Go 覆盖率概况绘制为包树，每行显示总计。
- [coverage](https://github.com/jbunds/coverage) - 一个简单的 Go 测试覆盖率 Web UI，以及可复用的 GitHub Action [go-test-coverage-html-report](https://github.com/marketplace/actions/go-test-coverage-html-report)。
- [httper](https://github.com/gustofarbi/httper) - 用于 JetBrains .http 文件的 CLI 运行器，支持脚本、断言、gRPC 和负载测试。
- [omg.testingtools](https://github.com/dedalqq/omg.testingtools) - 用于测试时修改私有字段值的简单库。
- [gomocker](https://github.com/zhongjie-cai/gomocker) - 一个用于 Golang 单元测试的函数和方法实时模拟库，具有流畅的语法，无需代码生成。
- [wsmock](https://github.com/sing198/wsmock) - 富有表现力、零样板代码的 WebSocket 模拟服务器，用于测试，支持故障注入和断言。
- [apitest](https://apitest.dev) - 简单且可扩展的行为测试库，用于基于 REST 的服务或 HTTP 处理器，支持模拟外部 HTTP 调用和渲染序列图。
- [ginkgo](https://onsi.github.io/ginkgo/) - Go 的 BDD 测试框架。
- [gocheck](https://labix.org/gocheck) - 比 gotest 更高级的测试框架替代方案。
- [gomega](https://onsi.github.io/gomega/) - 类似 Rspec 的匹配器/断言库。
- [genmock](https://gitlab.com/so_literate/genmock) - 带有代码生成器的 Go 模拟系统，用于构建接口方法的调用。
- [moxie](https://lesiw.io/moxie) - 在嵌入结构体上生成模拟方法。
:::

::: masonry
## 日志记录
> 用于生成和处理日志文件的库。
- [logrus](https://github.com/Sirupsen/logrus) - Go 的结构化日志记录器。
- [zap](https://github.com/uber-go/zap) - Go 中快速、结构化、分级的日志记录。
- [zerolog](https://github.com/rs/zerolog) - 零分配 JSON 日志器。
- [spew](https://github.com/davecgh/go-spew) - 为 Go 数据结构实现深度美化打印器，以辅助调试。
- [lumberjack](https://github.com/natefinch/lumberjack) - 简单的滚动日志记录器，实现 io.WriteCloser。
- [glog](https://github.com/golang/glog) - Go 的分级执行日志。
- [tail](https://github.com/hpcloud/tail) - Go 包，致力于模拟 BSD tail 程序的功能。
- [pp](https://github.com/k0kubun/pp) - Go 语言的彩色美化打印器。
- [seelog](https://github.com/cihub/seelog) - 日志记录功能，支持灵活的调度、过滤和格式化。
- [lazyjournal](https://github.com/Lifailon/lazyjournal) - 一个 TUI，用于读取和过滤来自 journalctl、文件系统、Docker 和 Podman 容器以及 Kubernetes pod 的日志。
- [log](https://github.com/apex/log) - Go 的结构化日志记录包。
- [tint](https://github.com/lmittmann/tint) - 一个写入着色日志的 slog.Handler。
- [sentry-go](https://github.com/getsentry/sentry-go) - Go 的 Sentry SDK，帮助监控和追踪错误，提供实时告警和性能监控。
- [log15](https://github.com/inconshreveable/log15) - Go 的简单而强大的日志记录。
- [phuslu/log](https://github.com/phuslu/log) - 高性能结构化日志记录。
- [slog-multi](https://github.com/samber/slog-multi) - slog.Handler 链（管道、扇出等）。
- [slog](https://github.com/gookit/slog) - 轻量、可配置、可扩展的 Go 日志器。
- [httpretty](https://github.com/henvic/httpretty) - 在终端上美化打印常规 HTTP 请求以进行调试（类似于 http.DumpRequest）。
- [onelog](https://github.com/francoispqt/onelog) - Onelog 是一个极其简单但高效的 JSON 日志器，在所有场景下都是最快的 JSON 日志器，同时也是分配内存最少的日志器之一。
- [sqldb-logger](https://github.com/simukti/sqldb-logger) - Go SQL 数据库驱动日志器，无需修改现有的 \*sql.DB 标准库用法。
- [logutils](https://github.com/hashicorp/logutils) - 用于在 Go（Golang）中略微改进日志记录的工具，扩展了标准日志记录器。
- [logxi](https://github.com/mgutz/logxi) - 12 要素应用日志记录器，快速且令人愉悦。
- [log](https://github.com/go-playground/log) - Go 的简单、可配置且可扩展的结构化日志记录。
- [rollingwriter](https://github.com/arthurkiller/rollingWriter) - RollingWriter 是一个自动轮转的 `io.Writer` 实现，提供多种策略以实现日志文件轮转。
- [go-logger](https://github.com/apsdehal/go-logger) - Go 程序的简单日志记录器，支持级别处理器。
- [slog-formatter](https://github.com/samber/slog-formatter) - slog 的通用格式化器以及构建自定义格式化器的辅助工具。
- [glg](https://github.com/kpango/glg) - glg 是 Go 的简单快速分级日志库。
- [timberjack](https://github.com/DeRuina/timberjack) - 基于大小、时间和计划时钟轮转的滚动日志器，支持压缩和清理。
- [logger](https://github.com/azer/logger) - Go 的极简日志记录库。
- [xlog](https://github.com/rs/xlog) - 面向 `net/context` 感知 HTTP 处理器的结构化日志器，支持灵活调度。
- [ozzo-log](https://github.com/go-ozzo/ozzo-log) - 高性能日志记录，支持日志级别、分类和过滤。可将过滤后的日志消息发送到各种目标（如控制台、网络、邮件）。
- [slog-loki](https://github.com/samber/slog-loki) - 用于 Grafana Loki 的 slog 处理器。
- [slog-zerolog](https://github.com/samber/slog-zerolog) - 用于 Zerolog 的 slog 处理器。
- [caarlos0/log](https://github.com/caarlos0/log) - 多彩的 CLI 日志记录器。
- [go-cronowriter](https://github.com/utahta/go-cronowriter) - 简单的写入器，根据当前日期和时间自动轮转日志文件，类似 cronolog。
- [slog-zap](https://github.com/samber/slog-zap) - 用于 Zap 的 slog 处理器。
- [slog-sentry](https://github.com/samber/slog-sentry) - 用于 Sentry 的 slog 处理器。
- [gone/log](https://github.com/One-com/gone/tree/master/log) - 快速、可扩展、功能齐全、与标准库兼容的日志库。
- [stdlog](https://github.com/alexcesaro/log) - Stdlog 是一个提供分级日志的面向对象库。它对于定时任务非常有用。
- [journald](https://github.com/ssgreg/journald) - systemd Journal 原生 API 的 Go 实现，用于日志记录。
- [noodlog](https://github.com/gyozatech/noodlog) - 参数化 JSON 日志库，可混淆敏感数据并编组任何类型的内容。不再打印指针而非值，也不再为 JSON 字符串添加转义字符。
- [go-log](https://github.com/ian-kent/go-log) - Go 中的 Log4j 实现。
- [logex](https://github.com/chzyer/logex) - Golang 日志库，支持跟踪和级别，由标准日志库包装。
- [go-log](https://github.com/siddontang/go-log) - Log lib 支持级别和多处理器。
- [zax](https://github.com/yuseferi/zax) - 将 Context 与 Zap 日志器集成，使 Go 日志记录更加灵活。
- [mlog](https://github.com/jbrodriguez/mlog) - Go 的简单日志模块，具有 5 个级别、可选轮转日志文件功能以及 stdout/stderr 输出。
- [slog-logrus](https://github.com/samber/slog-logrus) - 用于 Logrus 的 slog 处理器。
- [distillog](https://github.com/amoghe/distillog) - 精炼的分级日志记录（可视为标准库 + 日志级别）。
- [logrusly](https://github.com/sebest/logrusly) - [logrus](https://github.com/sirupsen/logrus) 插件，用于将错误发送到 [Loggly](https://www.loggly.com/)。
- [zkits-logger](https://github.com/edoger/zkits-logger) - 一个强大的零依赖 JSON 日志器。
- [log](https://github.com/teris-io/log) - Go 的结构化日志接口，将日志门面与其实现清晰分离。
- [slog-slack](https://github.com/samber/slog-slack) - 用于 Slack 的 slog 处理器。
- [kemba](https://github.com/clok/kemba) - 一个受 [debug](https://github.com/visionmedia/debug) 启发的微型调试日志工具，非常适合 CLI 工具和应用程序。
- [log](https://github.com/heartwilltell/log) - 围绕标准 log 包的简单分级日志包装器。
- [xylog](https://github.com/xybor-x/xylog) - 分级和结构化日志、动态字段、高性能、区域管理、简单配置和可读语法。
- [glo](https://github.com/lajosbencz/glo) - 受 PHP Monolog 启发的日志记录工具，具有相同的严重性级别。
- [slog-datadog](https://github.com/samber/slog-datadog) - 用于 Datadog 的 slog 处理器。
- [logrusiowriter](https://github.com/cabify/logrusiowriter) - 使用 [logrus](https://github.com/sirupsen/logrus) 日志记录器实现的 `io.Writer`。
- [go-log](https://github.com/subchen/go-log) - Go 中简单可配置的日志记录，支持级别、格式器和写入器。
- [logo](https://github.com/mbndr/logo) - Golang 日志记录器，可写入不同的可配置写入器。
- [go-log](https://github.com/pieterclaerhout/go-log) - 一个带有堆栈跟踪、对象转储和可选时间戳的日志记录库。
- [zl](https://github.com/nkmr-jp/zl) - 高开发者体验，基于 Zap 的日志器。功能丰富但易于配置。
- [log](https://github.com/aerogo/log) - 一个 O(1) 日志系统，允许将一个日志连接到多个写入器（例如 stdout、文件和 TCP 连接）。
- [logdump](https://github.com/ewwwwwqm/logdump) - 用于多级日志记录的包。
- [GoLogX](https://github.com/AyoubTadlaoui/GoLogX) - 仅追加、哈希链、可选 Ed25519 签名的 slog 处理器，支持离线篡改验证。
- [xlog](https://github.com/xfxdev/xlog) - Go 的插件架构和灵活日志系统，支持级别控制、多日志目标和自定义日志格式。
- [slf4g](https://github.com/echocat/slf4g) - Golang 的简单日志门面：简单的结构化日志；但功能强大、可扩展且可定制，汲取了数十年日志框架的大量经验。
- [structy/log](https://github.com/structy/log) - 一个简单易用的日志系统，极简但具备调试和消息区分的功能。
- [log](https://github.com/no-src/log) - 一个开箱即用的简单日志框架。
- [gslog](https://github.com/maguro/gslog) - 用于 log/slog 的 Google Cloud Logging 处理器，支持 OpenTelemetry 追踪和 baggage，以及 Kubernetes podinfo 标签。
- [go-log4g](https://github.com/go-log4g/core) - Log4g 为 Go 的标准 log/slog 日志门面提供 Log4j 风格的配置和模式布局。
- [yell](https://github.com/jfcg/yell) - 又一个极简日志库。
- [slog-configurator](https://github.com/psyb0t/slog-configurator) - 通过环境变量配置标准库 log/slog 日志器：级别、格式、源码位置以及 stdout/stderr 分流。
- [slogor](https://gitlab.com/greyxor/slogor) - 一个多彩的 slog 处理器。
:::

::: masonry
## 文本处理
> 用于解析和操作文本的库。
- [colly](https://github.com/asciimoo/colly) - 面向 Gophers 的快速优雅的爬虫框架。
- [GoQuery](https://github.com/PuerkitoBio/goquery) - GoQuery 为 Go 语言带来了类似 jQuery 的语法和一系列功能。
- [sh](https://github.com/mvdan/sh) - Shell 解析器和格式化器。
- [blackfriday](https://github.com/russross/blackfriday) - Go 中的 Markdown 处理器。
- [lancet](https://github.com/duke-git/lancet) - 一个全面的、类似 Lodash 的 Go 实用工具库
- [goldmark](https://github.com/yuin/goldmark) - 用 Go 编写的 Markdown 解析器。易于扩展、符合标准（CommonMark）、结构良好。
- [toml](https://github.com/BurntSushi/toml) - TOML 配置格式（带反射的编码器/解码器）。
- [go-humanize](https://github.com/dustin/go-humanize) - 将时间、数字和内存大小格式化为人类可读格式的格式化器。
- [html-to-markdown](https://github.com/JohannesKaufmann/html-to-markdown) - 将 HTML 转换为 Markdown。甚至适用于整个网站，并可通过规则进行扩展。
- [bluemonday](https://github.com/microcosm-cc/bluemonday) - HTML 净化器。
- [gofeed](https://github.com/mmcdole/gofeed) - 在 Go 中解析 RSS 和 Atom 订阅源。
- [sq](https://github.com/neilotoole/sq) - 将 SQL 数据库或 CSV、Excel 等文档格式的数据转换为 JSON、Excel、CSV、HTML、Markdown、XML 和 YAML 等格式。
- [go-querystring](https://github.com/google/go-querystring) - 用于将结构体编码为 URL 查询参数的 Go 库。
- [go-toml](https://github.com/pelletier/go-toml) - 支持查询和便捷 CLI 工具的 TOML 格式 Go 库。
- [godump (goforj)](https://github.com/goforj/godump) - 以 Laravel/Symfony 风格的转储美化打印 Go 结构体，包含完整类型信息、彩色 CLI 输出、循环检测和私有字段访问。
- [when](https://github.com/olebedev/when) - 支持可插拔规则的自然英文和俄文日期/时间解析器。
- [xurls](https://github.com/mvdan/xurls) - 从文本中提取 URL。
- [w2vgrep](https://github.com/arunsupe/semantic-grep) - 一种语义 grep 工具，使用词嵌入查找语义相似的匹配项。例如，搜索 "death" 会找到 "dead"、"killing"、"murder"。
- [commonregex](https://github.com/mingrammer/commonregex) - Go 常用正则表达式集合。
- [htmlquery](https://github.com/antchfx/htmlquery) - 用于 HTML 的 XPath 查询包，可通过 XPath 表达式从 HTML 文档中提取数据或求值。
- [go-runewidth](https://github.com/mattn/go-runewidth) - 获取字符或字符串固定宽度的函数。
- [dataflowkit](https://github.com/slotix/dataflowkit) - 将网站转换为结构化数据的网页爬虫框架。
- [mxj](https://github.com/clbanning/mxj) - 将 XML 编码/解码为 JSON 或 map[string]interface{}；使用点路径和通配符提取值。替代 x2j 和 j2x 包。
- [bytes](https://github.com/labstack/gommon/tree/master/bytes) - 格式化并解析数字字节值（10K、2M、3G 等）。
- [gographviz](https://github.com/awalterschulze/gographviz) - 解析 Graphviz DOT 语言。
- [gotabulate](https://github.com/bndr/gotabulate) - 使用 Go 轻松美化打印表格数据。
- [goq](https://github.com/andrewstuart/goq) - 使用 jQuery 语法的结构标签声明式解组 HTML（使用 GoQuery）。
- [go-nmea](https://github.com/adrianmo/go-nmea) - Go 语言的 NMEA 解析库。
- [coregex](https://github.com/coregx/coregex) - 采用 Rust regex-crate 架构的生产级正则引擎：多引擎 DFA/NFA、SIMD 预过滤、可直接替代标准库。
- [godump](https://github.com/yassinebenaid/godump) - 轻松美化打印任意 Go 变量，是 Go 的 `fmt.Printf("%#v")` 的替代方案。
- [rex](https://github.com/hedhyw/rex) - 正则表达式构建器。
- [radix](https://github.com/yourbasic/radix) - 快速字符串排序算法。
- [editorconfig-core-go](https://github.com/editorconfig/editorconfig-core-go) - Go 的 Editorconfig 文件解析器和操作器。
- [regroup](https://github.com/oriser/regroup) - 使用结构体标签和自动解析将正则表达式命名分组匹配到 Go 结构体。
- [markdown](https://github.com/nao1215/markdown) - 通过方法链生成 GitHub 风格 Markdown 和 mermaid 图的 Markdown 构建器。
- [tokenizer](https://github.com/bzick/tokenizer) - 将任意字符串、切片或无限缓冲区解析为任意标记。
- [podcast](https://github.com/eduncan911/podcast) - 用 Golang 编写的符合 iTunes 和 RSS 2.0 规范的播客生成器。
- [go-vcard](https://github.com/emersion/go-vcard) - 解析和格式化 vCard。
- [bafi](https://github.com/mmalcek/bafi) - 使用模板将通用 JSON、BSON、YAML、XML 转换为任意格式。
- [pagser](https://github.com/foolin/pagser) - Pagser 是一个简单、可扩展、可配置的解析器，基于 goquery 和结构体标签，用于将 HTML 页面反序列化为结构体，适用于 golang 爬虫。
- [doc-scraper](https://github.com/Sriram-PR/doc-scraper) - 将文档网站转换为干净的 Markdown 和 JSONL 以供 LLM 摄取（RAG、训练数据）的网络爬虫。
- [go-wildcard](https://github.com/IGLOU-EU/go-wildcard) - 简单轻量的通配符模式匹配。
- [did](https://github.com/ockam-network/did) - Go 中的 DID（去中心化标识符）解析器和字符串器。
- [goregen](https://github.com/zach-klippenstein/goregen) - 用于从正则表达式生成随机字符串的库。
- [go-fixedwidth](https://github.com/ianlopshire/go-fixedwidth) - 固定宽度文本格式化（带反射的编码器/解码器）。
- [picoloom](https://github.com/alnah/picoloom) - 带有 CLI 和 Go 库 API 的 Markdown 转 PDF 转换器。
- [address](https://github.com/bojanz/address) - 处理地址表示、验证和格式化。
- [align](https://github.com/Guitarbum722/align) - 一个用于文本对齐的通用应用程序。
- [genex](https://github.com/alixaxel/genex) - 将正则表达式计数并展开为所有匹配的字符串。
- [gofuckyourself](https://github.com/JoshuaDoes/gofuckyourself) - 基于清洗的 Go 脏话过滤器。
- [vdf](https://github.com/andygrunwald/vdf) - 用 Go 编写的 Valve 数据格式（vdf）的词法分析器和解析器。
- [allot](https://github.com/sbstjn/allot) - 用于 CLI 工具和机器人的占位符和通配符文本解析。
- [normalize](https://github.com/avito-tech/normalize) - 清洗、规范化和比较模糊文本。
- [petrovich](https://github.com/striker2000/petrovich) - Petrovich 是一个将俄语姓名变格为指定语法格的库。
- [gonameparts](https://github.com/polera/gonameparts) - 将人名解析为各个组成部分。
- [go-fasttld](https://github.com/elliotwutingfeng/go-fasttld) - 高性能有效顶级域名（eTLD）提取模块。
- [Tagify](https://github.com/zoomio/tagify) - 从给定源生成一组标签。
- [xj2go](https://github.com/stackerzzq/xj2go) - 将 XML 或 JSON 转换为 Go 结构体。
- [go-recipe](https://github.com/kkyr/go-recipe) - 用于从网站抓取食谱的包。
- [ahocorasick](https://github.com/coregx/ahocorasick) - 高性能 Aho-Corasick 多模式字符串匹配，支持 DFA 编译和 SIMD 预过滤，吞吐量高达 7 GB/s（属于 [coregx](https://github.com/coregx) 生态系统）。
- [codetree](https://github.com/aerogo/codetree) - 解析缩进代码（python、pixy、scarlet 等）并返回树结构。
- [kace](https://github.com/codemodus/kace) - 涵盖常见首字母缩略词的常见大小写转换。
- [mdsmith](https://github.com/jeduden/mdsmith) - 快速、自动修复的 Markdown 检查器和格式化器。检查风格、可读性、结构和跨文件完整性。
- [TySug](https://github.com/Dynom/TySug) - 针对键盘布局的替代建议。
- [go-output-format](https://github.com/drewstinnett/go-output-format) - 在命令行应用中输出 Go 结构为多种格式（YAML/JSON 等）。
- [walker](https://github.com/cyucelen/walker) - 无缝地从任何来源获取分页数据。包含简单高性能的 API 抓取。
- [bbConvert](https://github.com/CalebQ42/bbConvert) - 将 bbCode 转换为 HTML，允许您添加自定义 bbCode 标签的支持。
- [doi](https://github.com/hscells/doi) - Go 中的文档对象标识符（doi）解析器。
- [parseargs-go](https://github.com/nproc/parseargs-go) - 支持引号和反斜杠的字符串参数解析器。
- [prattle](https://github.com/askeladdk/prattle) - 简单高效地扫描和解析 LL(1) 文法。
- [ltsv](https://github.com/Wing924/ltsv) - 高性能的 Go [LTSV（制表符分隔标签值）](http://ltsv.org/) 读取器。
- [go-sitemap-parser](https://github.com/aafeher/go-sitemap-parser) - 用于解析 Sitemap 的 Go 语言库。
- [uniwidth](https://github.com/unilibs/uniwidth) - 高性能 Unicode 字符宽度计算，采用 SWAR 优化、O(1) 查找表，并支持 ZWJ 表情符号。
- [textwrap](https://github.com/isbm/textwrap) - 在行尾换行文本。实现 Python 的 `textwrap` 模块。
- [htmlyaml](https://github.com/nikolaydubina/htmlyaml) - 在 Go 中将 YAML 丰富渲染为 HTML。
- [htree](https://github.com/bobg/htree) - 遍历、导航、过滤和处理 [html.Node](https://pkg.go.dev/golang.org/x/net/html#Node) 对象树。
:::

::: masonry
## 构建自动化
> 帮助实现构建自动化的库和工具。
- [air](https://github.com/cosmtrek/air) - Air - Go 应用的热重载工具。
- [Task](https://github.com/go-task/task) - 简单的“Make”替代品。
- [mage](https://github.com/magefile/mage) - Mage 是一个使用 Go 的类似 make/rake 的构建工具。
- [realize](https://github.com/tockins/realize) - Go 构建系统，带有文件监视器和热重载。运行、构建并监视自定义路径的文件变化。
- [mmake](https://github.com/tj/mmake) - 现代 Make。
- [xc](https://github.com/joerdav/xc) - 任务运行器，支持通过 README.md 定义任务，可执行的 Markdown。
- [goyek](https://github.com/goyek/goyek) - 在 Go 中创建构建流水线。
- [taskctl](https://github.com/taskctl/taskctl) - 并发任务运行器。
- [1build](https://github.com/gopinath-langote/1build) - 命令行工具，用于无摩擦地管理项目特定命令。
- [gaper](https://github.com/maxclaus/gaper) - 当 Go 项目崩溃或某些被监视的文件发生变化时，构建并重启它。
- [anko](https://github.com/GuilhermeCaruso/anko) - 适用于多种编程语言的简单应用监视器。
- [rex](https://github.com/rexrun-dev/rex) - 零配置的通用项目运行器。检测你的技术栈（Go、Node、Python、Rust、PHP、Zig、Elixir）并运行正确的命令。
- [gilbert](https://go-gilbert.github.io) - Go 项目的构建系统和任务运行器。
- [gob](https://github.com/kcmvp/gob) - 类似 [Gradle](https://docs.gradle.org/)/[Maven](https://maven.apache.org/) 的 Go 项目构建工具。
:::

::: masonry
## 安全
> 用于帮助使应用程序更加安全的库。
- [age](https://github.com/FiloSottile/age) - 简单、现代且安全的加密工具（及 Go 库），具有小型显式密钥、无配置选项，并支持 UNIX 风格组合。
- [osv-scanner](https://github.com/google/osv-scanner) - 使用 Go 编写的漏洞扫描器，利用 OSV 提供的数据。
- [lego](https://github.com/go-acme/lego) - 纯 Go ACME 客户端库和 CLI 工具（用于 Let's Encrypt）。
- [CertMagic](https://github.com/caddyserver/certmagic) - 成熟、健壮且强大的 ACME 客户端集成，用于完全托管的 TLS 证书签发和续期。
- [Cameradar](https://github.com/Ullaakut/cameradar) - 用于远程入侵监控摄像头 RTSP 流的工具和库。
- [Coraza](https://github.com/corazawaf/coraza) - 企业级、兼容 modsecurity 和 OWASP CRS 的 WAF 库。
- [memguard](https://github.com/awnumar/memguard) - 纯 Go 库，用于处理内存中的敏感值。
- [secure](https://github.com/unrolled/secure) - Go 的 HTTP 中间件，可快速实现一些安全改进。
- [beelzebub](https://github.com/mariocandela/beelzebub) - 安全低代码蜜罐框架，利用 AI 进行系统虚拟化。
- [acmetool](https://github.com/hlandau/acme) - 支持自动续期的 ACME（Let's Encrypt）客户端工具。
- [themis](https://github.com/cossacklabs/themis) - 高级加密库，用于解决典型的数据安全任务（安全数据存储、安全消息传递、零知识证明认证），支持 14 种语言，最适合多平台应用。
- [acra](https://github.com/cossacklabs/acra) - 网络加密代理，保护基于数据库的应用程序免受数据泄露：强选择性加密、SQL 注入防护、入侵检测系统。
- [SafeDep/vet](https://github.com/safedep/vet) - 防范恶意开源软件包。
- [dongle](https://github.com/golang-module/dongle) - 简单、语义化且对开发者友好的 golang 包，用于编码/解码和加密/解密。
- [caddy-waf](https://github.com/fabriziosalmi/caddy-waf) - Caddy 服务器的 Web 应用防火墙中间件，具有正则规则引擎、异常评分、IP/DNS/ASN/国家黑名单和速率限制。
- [booster](https://github.com/anatol/booster) - 支持全盘加密的快速 initramfs 生成器。
- [go-password-validator](https://github.com/lane-c-wagner/go-password-validator) - 基于原始密码学熵值的密码验证器。
- [nacl](https://github.com/kevinburke/nacl) - NaCL API 集合的 Go 实现。
- [ssh-vault](https://github.com/ssh-vault/ssh-vault) - 使用 SSH 密钥进行加密/解密。
- [teler-waf](https://github.com/kitabisa/teler-waf) - teler-waf 是一个 Go HTTP 中间件，提供 teler IDS 功能以防御基于 Web 的攻击并提高基于 Go 的 Web 应用程序的安全性。它高度可配置，易于集成到现有 Go 应用程序中。
- [go-yara](https://github.com/hillu/go-yara) - Go 绑定 [YARA](https://github.com/plusvic/yara)，即“恶意软件研究人员（及其他所有人）的模式匹配瑞士军刀”。
- [optimus-go](https://github.com/pjebs/optimus-go) - 使用 Knuth 算法进行 ID 哈希和混淆。
- [firewalld-rest](https://github.com/prashantgupta24/firewalld-rest) - 用于动态更新 Linux 服务器上 firewalld 规则的 REST 应用程序。
- [BadActor](https://github.com/jaredfolkins/badactor) - 内存中、应用驱动的 jailer，秉承 fail2ban 的精神。
- [go-peer](https://github.com/number571/go-peer) - 用于创建安全且匿名的去中心化系统的软件库。
- [passlib](https://github.com/hlandau/passlib) - 面向未来的密码哈希库。
- [FCaptcha](https://github.com/WebDecoy/FCaptcha) - 自托管 CAPTCHA 服务器和 Go 客户端，通过行为分析和工作量证明检测机器人、AI 代理和无头浏览器。
- [simple-scrypt](https://github.com/elithrar/simple-scrypt) - Scrypt 包，具有简单明了的 API 和内置的自动成本校准。
- [urusai](https://github.com/calpa/urusai) - Urusai（日语中意为“嘈杂”）是一个 Go 实现的随机 HTTP/DNS 流量噪声生成器，通过创建数字烟幕来帮助保护浏览时的隐私。
- [pii-shield](https://github.com/pii-shield/pii-shield) - Kubernetes 的零代码日志净化边车，可从日志中删除个人身份信息。
- [luks.go](https://github.com/anatol/luks.go) - 纯 Golang 库，用于管理 LUKS 分区。
- [fort](https://github.com/djadmin/fort) - 审计 macOS 安全设置，涵盖 16 项检查，报告分数，并在安全的情况下修复问题。单一二进制文件，可通过 Homebrew 安装。
- [passwap](https://github.com/zitadel/passwap) - 在不同密码哈希算法之间提供统一实现。
- [acme-proxy](https://github.com/esnet/acme-proxy) - 无需向互联网开放 80 端口即可解决 ACME http-01 挑战，从外部证书颁发机构获取证书。
- [goSecretBoxPassword](https://github.com/dwin/goSecretBoxPassword) - 一个可能偏执的包，用于安全地哈希和加密密码。
- [go-generate-password](https://github.com/m1/go-generate-password) - 可用于 CLI 或作为库的密码生成器。
- [go-htpasswd](https://github.com/tg123/go-htpasswd) - 用于 Go 的 Apache htpasswd 解析器。
- [deidentify](https://github.com/aliengiraffe/deidentify) - 确定性的、保留格式的文本和结构化数据中个人身份信息移除。
- [certificates](https://github.com/mvmaasakkers/certificates) - 用于生成 TLS 证书的固执己见的工具。
- [y509](https://github.com/kanywst/y509) - 用于 X.509 证书链的 TUI，报告链是否验证通过，以及服务器是否正确提供该链。
- [procscope](https://github.com/Mutasem-mk4/procscope) - 使用 eBPF 的进程级运行时调查器，用于跟踪进程生命周期、文件活动和网络连接。
- [secret](https://github.com/rsjethani/secret) - 防止你的机密泄露到日志、std\* 等中。
- [secureio](https://github.com/xaionaro-go/secureio) - 基于 XChaCha20-poly1305、ECDH 和 ED25519 的 `io.ReadWriteCloser` 密钥交换+认证+加密包装器和多路复用器。
- [sslmgr](https://github.com/adrianosela/sslmgr) - 通过 acme/autocert 的高级包装器轻松实现 SSL 证书。
- [Crenox](https://github.com/crenoxhq/crenox) - 零依赖的预提交密钥扫描器，使用 Aho-Corasick 实现高性能凭据泄漏检测。
- [nurago/pkg/redact](https://github.com/tecnickcom/nurago/tree/main/pkg/redact) - 单次遍历从日志行和 HTTP 转储中移除机密，涵盖标头、JSON、XML、URL 编码数据、JWT、PEM 密钥和供应商令牌。
- [argon2-hashing](https://github.com/andskur/argon2-hashing) - Go argon2 包的轻量封装，与 Go 标准库 Bcrypt 和 simple-scrypt 包高度相似。
- [goArgonPass](https://github.com/dwin/goArgonPass) - Argon2 密码哈希与验证，设计为与现有 Python 和 PHP 实现兼容。
- [Razify](https://github.com/Hossiy21/razify) - 用于扫描、验证和审计 .env 文件以发现泄露机密和环境漂移的 CLI。
- [qrand](https://github.com/bitfield/qrand) - ANU 量子数（AQN）API 的客户端，提供量子力学安全的随机数据。
- [leakhound](https://github.com/nilpoona/leakhound) - 静态分析工具，用于检测敏感结构体字段的意外日志记录，防止日志中的数据泄露。
- [multikey](https://github.com/adrianosela/multikey) - 基于 Shamir 秘密共享算法的 n-out-of-N 密钥加密/解密框架。
- [aes-ctr-drbg](https://github.com/sixafter/aes-ctr-drbg) - 基于 AES 计数器模式（AES-CTR-DRBG）的确定性随机位生成器，符合 NIST SP 800-90A 规范。
- [secretgenerator](https://github.com/rafaelperoco/secretgenerator) - 基于 CSPRNG 的凭据生成器，具有版本化 JSON 模式，用于密码、口令、机密、API 密钥和 PIN。
- [veil](https://github.com/getveil/veil) - 本地 HTTPS 代理，向 AI 编码代理隐藏 API 凭据。集成操作系统钥匙串、格式感知占位符、SQLite 审计日志。
- [canery](https://github.com/rluders/canery) - 极简、无状态的授权引擎，具有可插拔的评估模型。
- [encid](https://github.com/bobg/encid) - 编码和解码加密的整数 ID。
- [entpassgen](https://github.com/andreimerlescu/entpassgen) - 熵密码生成器，具有大量命令行参数，可安全生成随机字符串，包括数字、密码，以及由生僻字典单词与符号和数字混合构成的密码。
- [Interpol](https://github.com/avahidi/interpol) - 用于模糊测试和渗透测试的基于规则的数据生成器。
- [dotlock](https://github.com/ahmadraza100/dotlock) - 加密的 .env 保险库管理器，具有交互式 TUI，用于跨多个环境和配置文件管理密钥。
- [PwnedCheck](https://github.com/mohamedation/PwnedCheck) - 命令行工具，用于检查密码是否在 Have I Been Pwned 泄露事件中出现，支持 Bitwarden 导出。
- [gost-crypto](https://github.com/rekurt/gost-crypto) - Go 库，支持俄罗斯 GOST 密码标准（数字签名、Streebog 哈希、Kuznechik 密码、MGM AEAD），基于 OpenSSL gost-engine。
- [mcprobe](https://github.com/tamish560/mcprobe) - MCP 服务器安全扫描器，支持提示注入检测、工具影子攻击和 SARIF 输出。
- [pm](https://github.com/nicola-strappazzon/password-manager) - 用 Go 编写的 Unix 风格密码管理器，使用 OpenPGP 加密保存数据。
- [redact](https://github.com/alesr/redact) - 使用可配置管道从基于 slog 的日志中编辑敏感信息。
- [certifier](https://github.com/0x524a/certifier) - 用于生成和验证 X.509 证书、证书颁发机构、CRL 和 OCSP 响应的库和 CLI。
- [grim](https://github.com/ijin82/grim) - 快速且安全的 CLI 工具，用于在易失性内存中管理加密的 Markdown 笔记库。
- [gspy](https://github.com/Mutasem-mk4/gspy) - 用于实时 Go 进程的取证级 goroutine 到系统调用检查器。
- [mist](https://github.com/iSerganov/mist) - 非对称密钥音频隐写库，使用 X25519 和 ChaCha20-Poly1305 将加密消息隐藏在压缩音频中。
- [coraza-rule-validator](https://github.com/stardothosting/coraza-rule-validator) - 独立 CLI 工具，用于在生产部署前验证 ModSecurity 和 Coraza SecLang WAF 规则。
- [acopw-go](https://sr.ht/~jamesponddotco/acopw-go/) - Go 的小型加密安全密码生成器包。
- [autocert](https://pkg.go.dev/golang.org/x/crypto/acme/autocert) - 自动配置 Let's Encrypt 证书并启动 TLS 服务器。
:::

::: masonry
## 网络
> 用于处理网络各层的库。
- [fasthttp](https://github.com/valyala/fasthttp) - 包 fasthttp 是 Go 的快速 HTTP 实现，比 net/http 快 10 倍。
- [webrtc](https://github.com/pions/webrtc) - 纯 Go 实现的 WebRTC API。
- [cloudflared](https://github.com/cloudflare/cloudflared) - Cloudflare Tunnel 客户端（原 Argo Tunnel）。
- [resty](https://github.com/go-resty/resty) - 受 Ruby rest-client 启发的简单 HTTP 和 REST 客户端。
- [quic-go](https://github.com/lucas-clemente/quic-go) - 纯 Go 实现的 QUIC 协议。
- [gnet](https://github.com/panjf2000/gnet) - `gnet` 是一个用纯 Go 编写的高性能、轻量级、非阻塞、事件驱动的网络框架。
- [dns](https://github.com/miekg/dns) - 用于处理 DNS 的 Go 库。
- [gopacket](https://github.com/google/gopacket) - 用于数据包处理的 Go 库，绑定 libpcap。
- [GoProxy](https://github.com/elazarl/goproxy) - 一个使用 Go 创建自定义 HTTP/HTTPS 代理服务器的库。
- [tun2socks](https://github.com/xjasonlyu/tun2socks) - 基于 [gVisor](https://gvisor.dev/) TCP/IP 栈的纯 Go 实现 tun2socks。
- [req](https://github.com/imroc/req) - 简单的 Go HTTP 客户端，具有黑魔法（更少的代码和更高的效率）。
- [netpoll](https://github.com/cloudwego/netpoll) - 一个高性能非阻塞 I/O 网络框架，专注于 RPC 场景，由字节跳动开发。
- [kcp-go](https://github.com/xtaci/kcp-go) - KCP - 快速可靠的 ARQ 协议。
- [ssh](https://github.com/gliderlabs/ssh) - 用于构建 SSH 服务器的高级 API（封装 crypto/ssh）。
- [HTTPLab](https://github.com/gchaincl/httplab) - HTTPLabs 允许你检查 HTTP 请求并伪造响应。
- [gobgp](https://github.com/osrg/gobgp) - 使用 Go 语言实现的 BGP。
- [fortio](https://github.com/fortio/fortio) - 负载测试库和命令行工具，高级回显服务器和 Web UI。允许指定每秒查询负载，记录延迟直方图和其他有用统计信息并绘制图表。支持 TCP、HTTP、gRPC。
- [heimdall](https://github.com/gojektech/heimdall) - 一个带有重试和 hystrix 能力的增强型 HTTP 客户端。
- [nbio](https://github.com/lesismal/nbio) - 纯 Go 实现 1000k+ 连接解决方案，支持 tls/http1.x/websocket，基本兼容 net/http，高性能、低内存占用，非阻塞、事件驱动、易于使用。
- [go-retryablehttp](https://github.com/hashicorp/go-retryablehttp) - Go 中的可重试 HTTP 客户端。
- [grequests](https://github.com/levigross/grequests) - 著名 Requests 库的 Go "克隆"。
- [water](https://github.com/songgao/water) - 简单的 TUN/TAP 库。
- [tls-client](https://github.com/bogdanfinn/tls-client) - 类似 net/http.Client 的 HTTP 客户端，可选择用于请求的特定客户端 TLS 指纹。
- [surf](https://github.com/enetx/surf) - 高级 HTTP 客户端，支持 HTTP/1.1、HTTP/2、HTTP/3（QUIC）、SOCKS5 代理和浏览器级 TLS 指纹。
- [go-getter](https://github.com/hashicorp/go-getter) - Go 库，用于从各种来源通过 URL 下载文件或目录。
- [gws](https://github.com/lxzan/gws) - 高性能 WebSocket 服务器与客户端，支持 AsyncIO。
- [gev](https://github.com/Allenxuxu/gev) - gev 是一个基于 Reactor 模式的轻量级、快速的非阻塞 TCP 网络库。
- [sling](https://github.com/dghubble/sling) - Sling 是一个用于创建和发送 API 请求的 Go HTTP 客户端库。
- [requests](https://github.com/carlmjohnson/requests) - 面向 Gophers 的 HTTP 请求。使用 context.Context，不隐藏底层的 net/http.Client，与标准 Go API 兼容。还包含测试工具。
- [sftp](https://github.com/pkg/sftp) - sftp 包实现了 SSH 文件传输协议，详见 <https://filezilla-project.org/specs/draft-ietf-secsh-filexfer-02.txt>。
- [grab](https://github.com/cavaliercoder/grab) - 用于管理文件下载的 Go 包。
- [NFF-Go](https://github.com/intel-go/nff-go) - 用于快速开发云和裸机高性能网络功能的框架（前身为 YANFF）。
- [ftp](https://github.com/jlaffaye/ftp) - 包 ftp 实现了 [RFC 959](https://tools.ietf.org/html/rfc959) 中描述的 FTP 客户端。
- [mdns](https://github.com/hashicorp/mdns) - Golang 中的简单 mDNS（多播 DNS）客户端/服务器库。
- [gentleman](https://github.com/h2non/gentleman) - 功能齐全、插件驱动的 HTTP 客户端库。
- [sdns](https://github.com/semihalev/sdns) - 一个高性能、递归 DNS 解析服务器，支持 DNSSEC，注重隐私保护。
- [gmqtt](https://github.com/DrmagicE/gmqtt) - Gmqtt 是一个灵活、高性能的 MQTT 代理库，完全实现了 MQTT 协议 V3.1.1。
- [vssh](https://github.com/yahoo/vssh) - 用于通过 SSH 协议构建网络和服务器自动化的 Go 库。
- [cidranger](https://github.com/yl2chen/cidranger) - 用于 Go 的快速 IP 到 CIDR 查找。
- [gaio](https://github.com/xtaci/gaio) - Golang 的高性能异步 I/O 网络，采用 proactor 模式。
- [easytcp](https://github.com/DarthPestilane/easytcp) - 用 Go（Golang）编写的轻量级 TCP 框架，内置消息路由器。EasyTCP 帮助你轻松、快速且更少痛苦地构建 TCP 服务器。
- [go-stun](https://github.com/ccding/go-stun) - Go 实现的 STUN 客户端（RFC 3489 和 RFC 5389）。
- [lhttp](https://github.com/fanux/lhttp) - 强大的 websocket 框架，更轻松地构建你的 IM 服务器。
- [peerdiscovery](https://github.com/schollz/peerdiscovery) - 纯 Go 库，使用 UDP 多播进行跨平台本地对等发现。
- [pester](https://github.com/sethgrid/pester) - Go HTTP 客户端调用，支持重试、退避和并发。
- [gotcp](https://github.com/gansidui/gotcp) - 用于快速编写 TCP 应用的 Go 包。
- [stun](https://github.com/go-rtc/stun) - RFC 5389 STUN 协议的 Go 实现。
- [gopcap](https://github.com/akrennmair/gopcap) - libpcap 的 Go 封装。
- [ftpserverlib](https://github.com/fclairamb/ftpserverlib) - 功能齐全的 FTP 服务器库。
- [winrm](https://github.com/masterzen/winrm) - Go WinRM 客户端，用于在 Windows 机器上远程执行命令。
- [azuretls-client](https://github.com/Noooste/azuretls-client) - 一个 100% 使用 Go 编写的易用 HTTP 客户端，用于伪造 TLS/JA3 和 HTTP2 指纹。
- [go-cleanhttp](https://github.com/hashicorp/go-cleanhttp) - 轻松获取标准库 HTTP 客户端，不与其他客户端共享任何状态。
- [arp](https://github.com/mdlayher/arp) - 包 arp 实现了 RFC 826 中描述的 ARP 协议。
- [dnsmonster](https://github.com/mosajjal/dnsmonster) - 被动 DNS 捕获/监控框架。
- [request](https://github.com/monaco-io/request) - Golang 的 HTTP 客户端。如果你有 axios 或 requests 的经验，你会喜欢它。无第三方依赖。
- [nodepass](https://github.com/NodePassProject/nodepass) - 一个安全高效的 TCP/UDP 隧道解决方案，通过预先建立的 TCP/QUIC/WebSocket 或 HTTP/2 连接，在网络限制下提供快速可靠的访问。
- [ethernet](https://github.com/mdlayher/ethernet) - 包 ethernet 实现了 IEEE 802.3 以太网 II 帧和 IEEE 802.1Q VLAN 标签的编组和解组。
- [gNxI](https://github.com/google/gnxi) - 使用 gNMI 和 gNOI 协议的网络管理工具集。
- [hedge](https://github.com/bhope/hedge) - Go 的自适应对冲请求。基于 Google 的 "The Tail at Scale" 论文，零配置即可降低 p99 延迟。
- [buffstreams](https://github.com/stabbycutyou/buffstreams) - 通过 TCP 流式传输 protocolbuffer 数据变得简单。
- [psql-wire](https://github.com/jeroenrinzema/psql-wire) - PostgreSQL 服务器线协议。构建你自己的服务器并开始处理连接。
- [jazigo](https://github.com/udhos/jazigo) - Jazigo 是一个用 Go 编写的工具，用于检索多个网络设备的配置。
- [utp](https://github.com/anacrolix/utp) - Go uTP 微传输协议实现。
- [bart](https://github.com/gaissmai/bart) - 包 bart 提供了一个平衡路由表（BART），用于极速的 IP 到 CIDR 查找等。
- [tcpack](https://github.com/lim-yoona/tcpack) - tcpack 是一个基于 TCP 的应用协议，用于在 Go 程序中打包和解包字节流。
- [xtcp](https://github.com/xfxdev/xtcp) - TCP 服务器框架，支持全双工通信、优雅关闭和自定义协议。
- [canopus](https://github.com/zubairhamed/canopus) - CoAP 客户端/服务器实现（RFC 7252）。
- [sslb](https://github.com/eduardonunesp/sslb) - 这是一个超级简单的负载均衡器，只是一个小项目，用于实现某种性能。
- [iplib](https://github.com/c-robinson/iplib) - 用于处理 IP 地址（net.IP、net.IPNet）的库，灵感来自 Python 的 [ipaddress](https://docs.python.org/3/library/ipaddress.html) 和 Ruby 的 [ipaddr](https://ruby-doc.org/stdlib-2.5.1/libdoc/ipaddr/rdoc/IPAddr.html)。
- [fast-shot](https://github.com/opus-domini/fast-shot) - 使用 Go 最快且简单的 HTTP 客户端，以快速精准的方式命中你的 API 目标。
- [gldap](https://github.com/jimlambrt/gldap) - gldap 提供了 LDAP 服务器实现，您为其 LDAP 操作提供处理程序。
- [event](https://github.com/cheng-zhongliang/event) - 用 Golang 编写的简单 I/O 事件通知库。
- [natiu-mqtt](https://github.com/soypat/natiu-mqtt) - 一个极其简单、无分配、低级别的 MQTT 实现，非常适合嵌入式系统。
- [go-powerdns](https://github.com/joeig/go-powerdns) - Golang 的 PowerDNS API 绑定。
- [go-zoox/fetch](https://github.com/go-zoox/fetch) - 一个强大、轻量、易用的 HTTP 客户端，灵感来自 Web Fetch API。
- [go-otelroundtripper](https://github.com/NdoleStudio/go-otelroundtripper) - Go http.RoundTripper，为 HTTP 请求发出开放遥测指标。
- [go-http-client](https://github.com/bozd4g/go-http-client) - 简单轻松地发起 HTTP 调用。
- [ether](https://github.com/songgao/ether) - 跨平台 Go 包，用于发送和接收以太网帧。
- [dhcp6](https://github.com/mdlayher/dhcp6) - 包 dhcp6 实现了 RFC 3315 中描述的 DHCPv6 服务器。
- [fullproxy](https://github.com/shoriwe/fullproxy) - 功能齐全、可脚本化且可守护进程配置的代理和跳板工具包，支持 SOCKS5、HTTP、原始端口和反向代理协议。
- [fwdctl](https://github.com/alegrey91/fwdctl) - 简单直观的 CLI，用于管理 Linux 服务器中的 IPTables 转发。
- [portproxy](https://github.com/aybabtme/portproxy) - 简单的 TCP 代理，为不支持 CORS 的 API 添加 CORS 支持。
- [httpretry](https://github.com/ybbus/httpretry) - 为默认 Go HTTP 客户端增加重试功能。
- [linkio](https://github.com/ian-kent/linkio) - 用于 Reader/Writer 接口的网络链路速度模拟。
- [rq](https://github.com/ddo/rq) - Go 标准库 HTTP 客户端的更友好接口。
- [axios4go](https://github.com/rezmoss/axios4go) - 受 Axios 启发的 Go HTTP 客户端库，提供简单直观的 API 用于发起 HTTP 请求。
- [httpproxy](https://github.com/wzshiming/httpproxy) - HTTP 代理处理器和拨号器。
- [go-multiproxy](https://github.com/presbrey/go-multiproxy) - 通过代理池发出 HTTP 请求的库，提供容错、负载均衡、自动重试、Cookie 管理等，可通过 http.Get/Post 替换或 http.Client RoundTripper 直接使用。
- [publicip](https://github.com/polera/publicip) - publicip 包返回你的公网 IPv4 地址（互联网出口）。
- [graval](https://github.com/koofr/graval) - 实验性 FTP 服务器框架。
- [go-ipmux](https://github.com/optimus-hft/go-ipmux) - 基于多个源 IP 复用 HTTP 请求的库。
- [gnet](https://github.com/fish-tennis/gnet) - `gnet` 是一个高性能网络框架，特别适用于游戏服务器。
- [go-req](https://github.com/wenerme/go-req) - 声明式 Go HTTP 客户端。
- [expose](https://github.com/kernelshard/expose) - 轻量级、开源的安全隧道工具，用于将本地服务器暴露到互联网。
- [goshark](https://github.com/sunwxg/goshark) - goshark 包使用 tshark 解码 IP 数据包并创建数据结构以分析数据包。
- [llb](https://github.com/kirillDanshin/llb) - 这是一个非常简单但快速的代理服务器后端。可用于快速重定向到预定义域名，零内存分配且响应迅速。
- [go-sse](https://github.com/lampctl/go-sse) - HTML 服务器发送事件的 Go 客户端和服务器实现。
- [nethawk](https://github.com/Flowtriq/nethawk) - 用于实时网络流量捕获、分析和攻击检测的终端 UI，支持 JSON 输出模式。
- [tspool](https://github.com/two/tspool) - 一个使用工作池来提高性能并保护服务器的 TCP 库。
- [go-pcaplite](https://github.com/alexcfv/go-pcaplite) - 轻量级实时数据包捕获库，支持 HTTPS SNI 提取。
- [netchan](https://github.com/matveynator/netchan) - Golang 的网络通道（netchan）：安全、支持集群、支持嵌套通道和任意数据类型。灵感来自 Rob Pike。
- [Grequest](https://github.com/lib4u/grequest) - 简单轻量的 golang HTTP 请求包，基于强大的 net/http。
- [macwifi](https://github.com/jaisonerick/macwifi) - 适用于 macOS 13+ 的 Wi-Fi 扫描和钥匙串密码检索。
- [roamr](https://github.com/sourabh-khot65/roamr) - CLI 工具，对附近已保存的 WiFi 网络进行评分，并告诉你使用哪个以及原因。
- [cdns](https://github.com/junevm/cdns) - 通过终端轻松更改 DNS 服务器。
- [chicha-ip-proxy](https://github.com/matveynator/chicha-ip-proxy) - 零配置 TCP/UDP 端口代理，支持自动启动、基于 IP 的访问控制以及操作系统级网络栈调优。
- [impersonate-http](https://github.com/North-web-dev/impersonate-http) - 可直接替换的 net/http.Client，具有字节级精确的浏览器 TLS（JA3/JA4）和 HTTP/2（Akamai）指纹。
- [telepath](https://github.com/tech-thinker/telepath) - telepath 是一个强大的 CLI 工具，用于安全端口转发，支持多个跳板主机和灵活的身份验证。
- [fibersse](https://github.com/vinod-morya/fibersse) - 面向 Fiber v3 的生产级服务器发送事件（SSE），支持事件合并、优先级通道、主题通配符、自适应节流和内置认证。
- [corsproxy](https://github.com/melihbirim/corsproxy) - CORS 代理服务器，具有 SSRF 保护、主机允许/阻止列表以及可选的 API 密钥认证。
- [gosnmp](https://github.com/soniah/gosnmp) - 用于执行 SNMP 操作的纯 Go 库。
- [proxq](https://github.com/psyb0t/docker-proxq) - 异步反向代理，将每个请求排队到 Redis 并返回作业 ID 以轮询响应，支持路径前缀路由、重试和缓存。
- [drainwatch](https://github.com/jaynirmal15/drainwatch) - 测量 Kubernetes  Pod 终止时已建立的 TCP 和 UDP 连接实际发生的情况。
- [ws-reconnect](https://github.com/sing198/ws-reconnect) - 弹性 WebSocket 客户端，支持自动重连、指数退避和心跳管理。
- [mqttPaho](https://eclipse.org/paho/clients/golang/) - Paho Go 客户端提供了一个 MQTT 客户端库，可通过 TCP、TLS 或 WebSockets 连接到 MQTT 代理。
- [net](https://golang.org/x/net) - 此仓库包含补充的 Go 网络库。
:::

::: masonry
## 性能
- [jaeger](https://github.com/jaegertracing/jaeger) - 分布式追踪系统。
- [ebpf-go](https://github.com/cilium/ebpf) - 提供加载、编译和调试 eBPF 程序的实用工具。
- [pixie](https://github.com/pixie-labs/pixie) - 通过 eBPF 对 Go 应用进行无插桩追踪。
- [statsviz](https://github.com/arl/statsviz) - Go 应用运行时统计信息的实时可视化。
- [profile](https://github.com/pkg/profile) - Go 的简单性能分析支持包。
- [go-instrument](https://github.com/nikolaydubina/go-instrument) - 自动为所有方法和函数添加 span。
- [mm-go](https://github.com/joetifa2003/mm-go) - Go 的通用手动内存管理。
- [tracer](https://github.com/kamilsk/tracer) - 简单、轻量级的追踪。
- [otelinji](https://github.com/hedhyw/otelinji) - 用于为函数添加 span 的 OpenTelemetry 自动插桩工具。
- [go-perfstat](https://github.com/go-perfstat/go) - 面向 Go 的轻量级性能统计与执行时间聚合。
:::

::: masonry
## 数据库驱动
- [redis](https://github.com/redis/go-redis) - Golang 的 Redis 客户端。
- [go-sql-driver/mysql](https://github.com/go-sql-driver/mysql) - 用于 Go 的 MySQL 驱动。
- [cayley](https://github.com/google/cayley) - 支持多种后端的图数据库。
- [pgx](https://github.com/jackc/pgx) - PostgreSQL 驱动，支持 database/sql 之外的功能。
- [pq](https://github.com/lib/pq) - 用于 database/sql 的纯 Go Postgres 驱动。
- [redigo](https://github.com/gomodule/redigo) - Redigo 是 Redis 数据库的 Go 客户端。
- [go-sqlite3](https://github.com/mattn/go-sqlite3) - 用于 Go 的 SQLite3 驱动，基于 database/sql。
- [mongo-go-driver](https://github.com/mongodb/mongo-go-driver) - Go 语言的官方 MongoDB 驱动。
- [elastic](https://github.com/olivere/elastic) - 用于 Go 的 Elasticsearch 客户端。
- [go-elasticsearch](https://github.com/elastic/go-elasticsearch) - 用于 Go 的官方 Elasticsearch 客户端。
- [clickhouse-go](https://github.com/ClickHouse/clickhouse-go/) - 用于 Go 的 ClickHouse SQL 客户端，兼容 `database/sql`。
- [rueidis](http://github.com/rueian/rueidis) - 支持自动管道和服务器辅助客户端缓存的快速 Redis RESP3 客户端。
- [mgo](https://github.com/globalsign/mgo) - （已停止维护）Go 语言的 MongoDB 驱动，在遵循标准 Go 习惯用法的非常简单的 API 下实现了丰富且经过充分测试的功能。
- [zoekt](https://github.com/sourcegraph/zoekt) - 基于三元组的高速代码搜索。
- [gomemcache](https://github.com/bradfitz/gomemcache/) - Go 编程语言的 memcache 客户端库。
- [go-mssqldb](https://github.com/denisenkom/go-mssqldb) - 用于 Go 的 Microsoft MSSQL 驱动。
- [gorethink](https://github.com/dancannon/gorethink) - RethinkDB 的 Go 语言驱动。
- [qmgo](https://github.com/qiniu/qmgo) - Go 的 MongoDB 驱动。它基于官方 MongoDB 驱动，但更易于使用，类似 Mgo。
- [elasticsql](https://github.com/cch123/elasticsql) - 在 Go 中将 SQL 转换为 Elasticsearch DSL。
- [go-sqlite3](https://github.com/ncruces/go-sqlite3) - 此 Go 模块与 database/sql 驱动兼容。它允许将 SQLite 嵌入到应用程序中，提供对其 C API 的直接访问，支持 SQLite VFS，并且还包含一个 GORM 驱动。
- [elastigo](https://github.com/mattbaird/elastigo) - Elasticsearch 客户端库。
- [gokv](https://github.com/philippgille/gokv) - 用于 Go 的简单键值存储抽象和实现（Redis、Consul、etcd、bbolt、BadgerDB、LevelDB、Memcached、DynamoDB、S3、PostgreSQL、MongoDB、CockroachDB 等）。
- [skizze](https://github.com/skizzehq/skizze) - 一个概率数据结构服务和存储。
- [mgm](https://github.com/kamva/mgm) - 基于模型的 MongoDB ODM for Go（基于官方 MongoDB 驱动）。
- [sqlhooks](https://github.com/qustavo/sqlhooks) - 为任何 database/sql 驱动附加钩子。
- [go-oci8](https://github.com/mattn/go-oci8) - 用于 Go 的 Oracle 驱动，使用 database/sql。
- [godror](https://github.com/godror/godror) - 用于 Go 的 Oracle 驱动，使用 ODPI-C 驱动。
- [Sqinn-Go](https://github.com/cvilsmeier/sqinn-go) - 纯 Go 实现的 SQLite。
- [aerospike-client-go](https://github.com/aerospike/aerospike-client-go) - Go 语言编写的 Aerospike 客户端。
- [redeo](https://github.com/bsm/redeo) - 兼容 Redis 协议的 TCP 服务器/服务。
- [go-transaction-manager](https://github.com/avito-tech/go-transaction-manager) - 具有多种适配器（sql、sqlx、gorm、mongo 等）的事务管理器，控制事务边界。
- [go-mssqldb](https://github.com/microsoft/go-mssqldb) - Microsoft 官方 Go 驱动，用于 SQL Server、Azure SQL、Azure Synapse、Fabric 中的 SQL 数据库和 Fabric 数据仓库。支持 Azure AD、Always Encrypted、批量操作。
- [neoism](https://github.com/jmcvetta/neoism) - Neo4j 的 Golang 客户端。
- [gocb](https://github.com/couchbase/gocb) - 官方 Couchbase Go SDK。
- [KSQL](https://github.com/VinGarcia/ksql) - 一个简单而强大的 Golang SQL 库。
- [Kivik](https://github.com/go-kivik/kivik) - Kivik 为 CouchDB、PouchDB 及类似数据库提供通用的 Go 和 GopherJS 客户端库。
- [go-rejson](https://github.com/nitishm/go-rejson) - 使用 Redigo golang 客户端的 redislabs ReJSON 模块的 Golang 客户端。轻松将结构体作为 JSON 对象存储和操作于 redis 中。
- [go-couchbase](https://github.com/couchbase/go-couchbase) - Go 语言编写的 Couchbase 客户端。
- [surrealdb.go](https://github.com/surrealdb/surrealdb.go) - SurrealDB 的 Go 驱动。
- [firebirdsql](https://github.com/nakagami/firebirdsql) - 用于 Go 的 Firebird RDBMS SQL 驱动。
- [go-mongox](https://github.com/chenmingyong0423/go-mongox) - 基于官方驱动的 Go Mongo 库，具有简化的文档操作、结构体与集合的泛型绑定、内置 CRUD、聚合、自动字段更新、结构体验证、钩子和基于插件的编程。
- [go-rqlite](https://github.com/rqlite/gorqlite) - rqlite 的 Go 客户端，提供易于使用的抽象以处理 rqlite API。
- [ydb-go-sdk](https://github.com/ydb-platform/ydb-go-sdk) - YDB（Yandex Database）的原生和 database/sql 驱动。
- [go-adodb](https://github.com/mattn/go-adodb) - 用于 Go 的 Microsoft ActiveX 对象数据库驱动，使用 database/sql。
- [avatica](https://github.com/apache/calcite-avatica-go) - 用于 database/sql 的 Apache Avatica/Phoenix SQL 驱动。
- [gofreetds](https://github.com/minus5/gofreetds) - Microsoft MSSQL 驱动。Go 对 [FreeTDS](https://www.freetds.org) 的封装。
- [godis](https://github.com/piaohao/godis) - 受 jedis 启发的 golang 实现的 redis 客户端。
- [arangolite](https://github.com/solher/arangolite) - 用于 ArangoDB 的轻量级 Golang 驱动。
- [go-pilosa](https://github.com/pilosa/go-pilosa) - Pilosa 的 Go 客户端库。
- [dsc](https://github.com/viant/dsc) - SQL、NoSQL、结构化文件的数据存储连接。
- [forestdb](https://github.com/couchbase/goforestdb) - ForestDB 的 Go 绑定。
- [effdsl](https://github.com/sdqri/effdsl) - 用于 Go 的 Elasticsearch 查询构建器。
- [goriak](https://github.com/zegl/goriak) - Riak KV 的 Go 语言驱动。
- [goes](https://github.com/OwnLocal/goes) - 用于与 Elasticsearch 交互的库。
- [neo4j](https://github.com/cihangir/neo4j) - Neo4j Rest API 的 Golang 绑定。
- [dynamo](https://github.com/fogfish/dynamo) - 简单的键值抽象，用于在 AWS 存储服务（AWS DynamoDB 和 AWS S3）中存储代数和关联数据数据类型。
- [gomemcached](https://github.com/aliexpressru/gomemcached) - 用于 Go 的二进制 Memcached 客户端，支持使用一致性哈希进行分片，并支持 SASL。
- [gocosmos](https://github.com/btnguyen2k/gocosmos) - 用于 Azure Cosmos DB 的 REST 客户端和标准 `database/sql` 驱动。
- [bgc](https://github.com/viant/bgc) - 用于 Go 的 BigQuery 数据存储连接。
- [xredis](https://github.com/shomali11/xredis) - 类型安全、可定制、简洁易用的 Redis 客户端。
- [pig](https://github.com/alexeyco/pig) - 简单的 [pgx](https://github.com/jackc/pgx) 封装，可轻松执行查询并 [扫描](https://github.com/georgysavva/scany) 结果。
- [asc](https://github.com/viant/asc) - 用于 Go 的 Aerospike 数据存储连接。
- [godscache](https://github.com/defcronyke/godscache) - Google Cloud Platform Go Datastore 包的封装，使用 memcached 添加缓存。
- [transactor](https://github.com/metalfm/transactor) - 类型安全的事务边界抽象，支持 database/sql、sqlx 和 pgx 适配器。
- [sqlite](https://pkg.go.dev/modernc.org/sqlite) - sqlite 包是一个使用 C SQLite3 库的无 CGo 移植版的 sql/database 驱动。
- [gocql](https://gocql.github.io) - Apache Cassandra 的 Go 语言驱动。
:::

::: masonry
## Microsoft Office
- [excelize](https://github.com/xuri/excelize) - 用于读写 Microsoft Excel&trade; (XLSX) 文件的 Golang 库。
- [xlsx](https://github.com/tealeg/xlsx) - 简化在 Go 程序中读取新版 Microsoft Excel 使用的 XML 格式的库。
- [unioffice](https://github.com/unidoc/unioffice) - 用于创建和处理 Office Word (.docx)、Excel (.xlsx) 和 Powerpoint (.pptx) 文档的纯 Go 库。
- [godocx](https://github.com/gomutex/godocx) - 用于读写 Microsoft Word (Docx) 文件的库。
- [go-excel](https://github.com/szyhf/go-excel) - 一个简单轻量的读取器，将类似关系数据库的 Excel 作为表格读取。
- [xlsx](https://github.com/plandem/xlsx) - 在 Go 程序中快速安全地读取/更新现有 Microsoft Excel 文件。
- [exl](https://github.com/go-the-way/exl) - 用 Go 编写的 Excel 绑定到结构体。（仅支持 Go1.18+）
- [cellwalker](https://github.com/chonla/cellwalker) - 按单元格名称虚拟遍历 Excel。
:::

::: masonry
## 认证与授权
> 用于实现认证和授权的库。
- [casbin](https://github.com/hsluoyz/casbin) - 支持 ACL、RBAC 和 ABAC 等访问控制模型的授权库。
- [jwt-go](https://github.com/golang-jwt/jwt) - JSON Web Tokens（JWT）的完整功能实现。该库支持 JWT 的解析和验证以及生成和签名。
- [spicedb](https://github.com/authzed/spicedb) - 受 Zanzibar 启发的数据库，支持细粒度授权。
- [goth](https://github.com/markbates/goth) - 提供一种简单、干净且惯用的方式来使用 OAuth 和 OAuth2。开箱即用地处理多个提供商。
- [openfga](https://github.com/openfga/openfga) - 基于“Zanzibar：Google 的一致全局授权系统”论文实现的细粒度授权。由 [CNCF](https://www.cncf.io/) 支持。
- [oauth2](https://github.com/golang/oauth2) - goauth2 的后继者。通用 OAuth 2.0 包，支持 JWT、Google API、Compute Engine 和 App Engine。
- [keto](https://github.com/ory/keto) - “Zanzibar：Google 的一致全局授权系统”的开源（Go）实现。提供 gRPC、REST API、newSQL 以及简单且细粒度的权限语言。支持 ACL、RBAC 和其他访问模型。
- [authboss](https://github.com/volatiletech/authboss) - 模块化 Web 身份验证系统。它尽可能移除样板代码和“困难部分”，以便每次在 Go 中启动新 Web 项目时，你可以直接插入、配置并开始构建应用，而无需每次都构建身份验证系统。
- [scs](https://github.com/alexedwards/scs) - HTTP 服务器的会话管理器。
- [jwx](https://github.com/lestrrat-go/jwx) - 实现各种 JWx（JWA/JWE/JWK/JWS/JWT，也称为 JOSE）技术的 Go 模块。
- [gologin](https://github.com/dghubble/gologin) - 用于通过 OAuth1 和 OAuth2 认证提供商登录的可链式处理器。
- [osin](https://github.com/openshift/osin) - Golang OAuth2 服务器库。
- [loginsrv](https://github.com/tarent/loginsrv) - JWT 登录微服务，支持可插拔后端，如 OAuth2（Github）、htpasswd、osiam。
- [oidc](https://github.com/zitadel/oidc) - 为 Go 编写的易于使用的 OpenID Connect 客户端和服务器库，已通过 OpenID 基金会认证。
- [gorbac](https://github.com/mikespook/gorbac) - 在 Golang 中提供轻量级的基于角色的访问控制（RBAC）实现。
- [paseto](https://github.com/o1egl/paseto) - 平台无关安全令牌（PASETO）的 Golang 实现。
- [jwt](https://github.com/cristalhq/jwt) - 用于 Go 的安全、简单且快速的 JSON Web Tokens。
- [go-guardian](https://github.com/shaj13/go-guardian) - Go-Guardian 是一个 golang 库，提供简单、干净、惯用的方式创建强大的现代 API 和 Web 认证，支持 LDAP、Basic、Bearer 令牌和基于证书的认证。
- [go-jose](https://github.com/go-jose/go-jose) - JOSE 工作组 JSON Web Token、JSON Web Signatures 和 JSON Web Encryption 规范的相当完整实现。
- [jwt](https://github.com/pascaldekloe/jwt) - 轻量级 JSON Web Token（JWT）库。
- [jeff](https://github.com/abraithwaite/jeff) - 简单、灵活、安全且惯用的 Web 会话管理，支持可插拔后端。
- [gosession](https://github.com/Kwynto/gosession) - 这是 GoLang 中 net/http 的快速会话包。该包可能是会话机制的最佳实现，或者至少它试图成为这样。
- [jwt-auth](https://github.com/adam-hanna/jwt-auth) - 用于 Golang HTTP 服务器的 JWT 中间件，具有许多配置选项。
- [goiabada](https://github.com/leodip/goiabada) - 一个支持 OAuth2 和 OpenID Connect 的开源认证与授权服务器。
- [otpgen](https://github.com/grijul/otpgen) - 生成 TOTP/HOTP 码的库。
- [sessionup](https://github.com/swithek/sessionup) - 简单而有效的 HTTP 会话管理和识别包。
- [sjwt](https://github.com/brianvoe/sjwt) - 简单的 JWT 生成器和解析器。
- [session](https://github.com/icza/session) - Go 的 Web 服务器会话管理（包括对 Google App Engine - GAE 的支持）。
- [branca](https://github.com/essentialkaos/branca) - Golang 1.15+ 的 branca 令牌[规范实现](https://github.com/tuupola/branca-spec)。
- [melange](https://github.com/pthm/melange) - 将 OpenFGA 授权模式编译为 PL/pgSQL 函数，在 PostgreSQL 内部执行细粒度的基于关系的访问控制检查。
- [securecookie](https://github.com/chmike/securecookie) - 高效的安全 cookie 编码/解码。
- [sessions](https://github.com/adam-hanna/sessions) - 用于 Go HTTP 服务器的极其简单、高性能、高度可定制的会话服务。
- [otpgo](https://github.com/jltorresm/otpgo) - 用于 Go 的基于时间的一次性密码（TOTP）和基于 HMAC 的一次性密码（HOTP）库。
- [go-iam](https://github.com/melvinodsa/go-iam) - 开发者优先的身份与访问管理系统，具有简单的 UI。
- [scope](https://github.com/SonicRoshan/scope) - 在 Go 中轻松管理 OAuth2 作用域。
- [go-githubauth](https://github.com/jferrl/go-githubauth) - GitHub 身份验证工具：生成和使用 GitHub 应用及安装令牌。
- [cookiestxt](https://github.com/mengzhuo/cookiestxt) - 提供 cookies.txt 文件格式的解析器。
- [go-jwt](https://github.com/pardnchiu/go-jwt) - 提供访问令牌和刷新令牌的 JWT 认证包，支持指纹识别、Redis 存储和自动刷新功能。
- [permissions](https://github.com/xyproto/permissions) - 用于跟踪用户、登录状态和权限的库。使用安全 cookie 和 bcrypt。
- [x509proxy](https://github.com/vkuznet/x509proxy) - 处理 X509 代理证书的库。
- [go-jwt](https://github.com/deatil/go-jwt) - Go 的 JWT（JSON Web Token）库。
- [authgate](https://github.com/go-authgate/authgate) - 轻量级 OAuth 2.0 授权服务器，支持设备授权授予（[RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628)）、带 PKCE 的授权码流程（[RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749) + [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)），以及用于机器对机器身份验证的客户端凭证授予。
:::

::: masonry
## 验证
> 用于验证的库。
- [validator](https://github.com/go-playground/validator) - Go 结构体和字段验证，包括跨字段、跨结构体、映射、切片和数组的深度验证。
- [govalidator](https://github.com/asaskevich/govalidator) - 用于字符串、数字、切片和结构体的验证器和清理器。
- [ozzo-validation](https://github.com/go-ozzo/ozzo-validation) - 支持验证各种数据类型（结构体、字符串、映射、切片等），验证规则可在常规代码结构中配置和扩展，而非使用结构体标签。
- [govalidator](https://github.com/thedevsaddam/govalidator) - 使用简单规则验证 Golang 请求数据。深受 Laravel 请求验证的启发。
- [Zog](https://github.com/Oudwins/zog) - 一个受 [Zod](https://github.com/colinhacks/zod) 启发的模式构建器，用于运行时值解析和验证。
- [validate](https://github.com/gookit/validate) - 用于数据验证和过滤的 Go 包。支持验证 Map、Struct、Request（Form、JSON、url.Values、上传文件）等数据及更多功能。
- [gody](https://github.com/guiferpa/gody) - balloon：一个轻量级的 Go 结构体验证器。
- [jio](https://github.com/faceair/jio) - jio 是一个类似于 [joi](https://github.com/hapijs/joi) 的 JSON Schema 验证器。
- [govalid](https://github.com/twharmon/govalid) - 基于标签的快速结构体验证。
- [checkdigit](https://github.com/osamingo/checkdigit) - 提供校验位算法（Luhn、Verhoeff、Damm）和计算器（ISBN、EAN、JAN、UPC 等）。
- [validate](https://github.com/gobuffalo/validate) - 该包为编写 Go 应用程序的验证提供了框架。
- [govy](https://github.com/nobl9/govy) - 基于函数式接口的强类型验证规则，由泛型驱动且无反射，重点在于构建清晰且信息丰富的错误消息。
- [checker](https://github.com/cinar/checker) - 零依赖的输入验证和就地规范化，支持结构体标签、23 种语言环境和 JSON Schema 生成。
- [go-validator](https://github.com/tiendc/go-validator) - 使用泛型的验证库。
- [valix](https://github.com/marrow16/valix) - 用于验证请求的 Go 包。
- [hvalid](https://github.com/lyonnee/hvalid) - hvalid 是一个用 Go 语言编写的轻量级验证库。它提供了自定义验证器接口和一系列常用验证函数，帮助开发者快速实现数据验证。
- [Validator](https://github.com/go-the-way/validator) - 一个用 Go 编写的轻量级模型验证器。包含 VF：Min、Max、MinLength、MaxLength、Length、Enum、Regex。
- [vx](https://github.com/sevlyar/vx) - 验证由小型、可组合的检查构建，零依赖且具有可重建的错误路径。
:::

::: masonry
## 电子书
- [GoBooks](https://github.com/dariubs/GoBooks) - 精选 Go 书籍列表。
- [The Golang Standard Library by Example (Chinese)](https://github.com/polaris1119/The-Golang-Standard-Library-by-Example)
- [Go AST Book (Chinese)](https://github.com/chai2010/go-ast-book) - 专注于 Go `go/*` 包的书籍。
- [Web Application with Go the Anti-Textbook](https://github.com/thewhitetulip/web-dev-golang-anti-textbook/)
- [The Little Go Book](https://github.com/karlseguin/the-little-go-book)
- [Build a blockchain from scratch in Go with gRPC](https://github.com/volodymyrprokopyuk/go-blockchain) - 从零开始使用 Go 和 gRPC 逐步构建区块链的基础实用指南。
- [Go Succinctly](https://github.com/thedevsir/gosuccinctly) - 波斯语版。
- [100 Go Mistakes: How to Avoid Them](https://www.manning.com/books/100-go-mistakes-how-to-avoid-them)
- [Black Hat Go](https://nostarch.com/blackhatgo) - 面向黑客和渗透测试人员的 Go 编程。
- [Build an Orchestrator in Go](https://www.manning.com/books/build-an-orchestrator-in-go)
- [Continuous Delivery in Go](https://www.manning.com/books/continuous-delivery-in-go) - 这本持续交付实用指南将向您展示如何快速建立自动化流水线，以改进测试、代码质量和最终产品。
- [Creative DIY Microcontroller Project With TinyGo and WebAssembly](https://www.packtpub.com/product/creative-diy-microcontroller-projects-with-tinygo-and-webassembly/9781800560208) - 通过 Arduino 和 WebAssembly 项目介绍 TinyGo 编译器。
- [Effective Go: Elegant, efficient, and testable code](https://www.manning.com/books/effective-go) - 解锁 Go 在程序设计上的独特视角，开始编写简单、可维护且可测试的 Go 代码。
- [For the Love of Go](https://bitfieldconsulting.com/books/love) - 面向 Go 初学者的入门书籍。
- [Go in Practice, Second Edition](https://www.manning.com/books/go-in-practice-second-edition) - 关于 Go 开发细节的实用指南，涵盖标准库和 Go 强大生态中最重要的工具。
- [Know Go: Generics](https://bitfieldconsulting.com/books/generics) - 理解并在 Go 中使用泛型的指南。
- [Lets-Go](https://lets-go.alexedwards.net) - 使用 Go 创建快速、安全且可维护的 Web 应用的分步指南。
- [Lets-Go-Further](https://lets-go-further.alexedwards.net) - 在 Go 中构建 API 和 Web 应用的高级模式。
- [The Power of Go: Tests](https://bitfieldconsulting.com/books/tests) - Go 测试指南。
- [The Power of Go: Tools](https://bitfieldconsulting.com/books/tools) - 使用 Go 编写命令行工具的指南。
- [Writing A Compiler In Go](https://compilerbook.com)
- [Writing An Interpreter In Go](https://interpreterbook.com) - 本书介绍了数十种编写地道、富有表现力且高效的 Go 代码的技巧，帮助避免常见陷阱。
- [A Go Developer's Notebook](https://leanpub.com/GoNotebook/read)
- [An Introduction to Programming in Go](https://web.archive.org/web/20231228173204/https://www.golang-book.com/books/intro)
- [Build Web Application with Golang](https://astaxie.gitbooks.io/build-web-application-with-golang/content/en/)
- [Building Web Apps With Go](https://codegangsta.gitbooks.io/building-web-apps-with-go/content/)
- [Go 101](https://go101.org) - 专注于 Go 语法/语义及各种细节的书籍。
- [Go Faster](https://leanpub.com/gofaster) - 本书旨在缩短您的学习曲线，帮助您更快地成为熟练的 Go 程序员。
- [Go with the domain](https://threedots.tech/go-with-the-domain/) - 展示如何通过实际重构应用 DDD、Clean Architecture 和 CQRS 的书籍。
- [How To Code in Go eBook](https://www.digitalocean.com/community/books/how-to-code-in-go-ebook) - 一本面向首次开发者的 600 页 Go 入门书。
- [Learning Go](https://www.miek.nl/downloads/Go/Learning-Go-latest.pdf)
- [Network Programming With Go](https://jan.newmarch.name/golang/)
- [Practical Go Lessons](https://www.practical-go-lessons.com/)
- [Spaceship Go A Journey to the Standard Library](https://blasrodri.github.io/spaceship-go-gh-pages/)
- [The Go Programming Language](https://www.gopl.io/)
:::

::: masonry
## 代码分析
> 源代码分析工具，也称为静态应用程序安全测试（SAST）工具。
- [golangci-lint](https://github.com/golangci/golangci-lint) - – 一个快速的 Go linters 运行器。它并行运行 linters，使用缓存，支持 `yaml` 配置，与所有主要 IDE 集成，并包含数十个 linters。
- [staticcheck](https://github.com/dominikh/go-tools/tree/master/cmd/staticcheck) - staticcheck 是增强版的 `go vet`，应用了大量静态分析检查，您可能习惯于使用类似 C# 的 ReSharper 等工具。
- [revive](https://github.com/mgechev/revive) - – 比 `golint` 快约 6 倍、更严格、可配置、可扩展且美观的替代品。
- [errcheck](https://github.com/kisielk/errcheck) - Errcheck 是一个用于检查 Go 程序中未检查错误的程序。
- [GoPlantUML](https://github.com/jfeliu007/goplantuml) - 库和 CLI，生成包含结构体、接口及其关系的文本 plantump 类图。
- [go-critic](https://github.com/go-critic/go-critic) - 源代码 linter，提供其他 linter 目前未实现的检查。
- [vacuum](https://github.com/daveshanley/vacuum) - 一个超高速、轻量级的 OpenAPI linter 和质量检查工具。
- [golines](https://github.com/segmentio/golines) - 自动缩短 Go 代码中长行的格式化程序。
- [go-cleanarch](https://github.com/roblaszczak/go-cleanarch) - go-cleanarch 旨在验证 Clean Architecture 规则，例如依赖规则以及 Go 项目中包之间的交互。
- [php-parser](https://github.com/z7zmey/php-parser) - 用 Go 编写的 PHP 解析器。
- [goast-viewer](https://github.com/yuroyoro/goast-viewer) - 基于 Web 的 Golang AST 可视化工具。
- [go-mod-outdated](https://github.com/psampaz/go-mod-outdated) - 一种轻松查找 Go 项目中过时依赖的方法。
- [goreturns](https://github.com/sqs/goreturns) - 添加零值返回语句以匹配函数返回类型。
- [todocheck](https://github.com/preslavmihaylov/todocheck) - 静态代码分析器，将代码中的 TODO 注释与问题跟踪器中的问题关联起来。
- [Chronos](https://github.com/amit-davidson/Chronos) - 静态检测竞态条件。
- [unconvert](https://github.com/mdempsky/unconvert) - 从 Go 源码中移除不必要的类型转换。
- [wrapcheck](https://github.com/tomarrell/wrapcheck) - 一个检查外部包的错误是否被包装的 linter。
- [dupl](https://github.com/mibk/dupl) - 用于代码克隆检测的工具。
- [tickgit](https://github.com/augmentable-dev/tickgit) - 用于发现代码注释中 TODO（任何语言）并应用 `git blame` 识别作者的 CLI 和 Go 包。
- [gostatus](https://github.com/shurcooL/gostatus) - 命令行工具，显示包含 Go 包的仓库状态。
- [apicompat](https://github.com/bradleyfalzon/apicompat) - 检查 Go 项目的近期更改是否存在向后不兼容的变更。
- [testifylint](https://github.com/Antonboom/testifylint) - – 检查 [github.com/stretchr/testify](https://github.com/stretchr/testify) 使用情况的 linter。
- [ast-metrics](https://github.com/ast-metrics/ast-metrics) - 用于 Go 和其他语言的静态代码分析器：复杂度、耦合度、内聚性和可维护性指标，支持 HTML、JSON、Markdown 和 SARIF 报告。
- [go-checkstyle](https://github.com/qiniu/checkstyle) - checkstyle 是一个类似 Java checkstyle 的样式检查工具。该工具受 Java checkstyle 和 golint 启发。样式参考了 Go Code Review Comments 中的一些要点。
- [asty](https://github.com/asty-org/asty) - 将 Golang AST 转换为 JSON，并将 JSON 转换为 AST。
- [fatcontext](https://github.com/Crocmagnon/fatcontext) - Fatcontext 检测循环或函数字面量中的嵌套上下文。
- [lint](https://github.com/surullabs/lint) - 在 go test 中运行 linters。
- [ChainJacking](https://github.com/Checkmarx/chainjacking) - 找出您的 Go 语言直接 GitHub 依赖中哪些容易受到 ChainJacking 攻击。
- [validate](https://github.com/mccoyst/validate) - 自动使用标签验证结构体字段。
- [usestdlibvars](https://github.com/sashamelentyev/usestdlibvars) - 一个检测是否可以使用 Go 标准库中的变量/常量的 linter。
- [stto](https://github.com/mainak55512/stto) - 一个用纯 Go 编写的轻量级超快速代码行计数器。
- [gocondense](https://github.com/abemedia/gocondense) - 一个兼容 gofmt 的格式化程序，可将多行结构压缩到适合的单行中。
- [gomarklint](https://github.com/shinagawa-web/gomarklint) - Markdown linter，内置 HTTP 链接验证，单一二进制文件，无需 Node.js。
- [golang-ifood-sdk](https://github.com/arxdsilva/golang-ifood-sdk) - iFood API SDK。
- [structalign](https://github.com/peczenyj/structalign) - 显示结构体字段如何重新排序以减少内存使用，打印差异而不是重写文件。
- [deadmono](https://github.com/arxeiss/deadmono) - 围绕 deadcode 的包装器，用于检测 Go 单体仓库中的死代码。
- [blanket](https://gitlab.com/verygoodsoftwarenotvirus/blanket) - blanket 是一个帮助您捕获 Go 包中没有直接单元测试的函数的工具。
- [goimports](https://pkg.go.dev/golang.org/x/tools/cmd/goimports) - 自动修复（添加、删除）Go 导入的工具。
:::

::: masonry
## WebAssembly
- [tinygo](https://github.com/tinygo-org/tinygo) - 面向小型环境的 Go 编译器。微控制器、WebAssembly 和命令行工具。基于 LLVM。
- [wasmtime-go](https://github.com/bytecodealliance/wasmtime-go) - Wasmtime WebAssembly 运行时的 Go 绑定（支持 WASI、JIT/AOT，安全且快速的嵌入）。
- [dom](https://github.com/dennwc/dom) - DOM 库。
- [go-canvas](https://github.com/markfarnan/go-canvas) - 使用 HTML5 Canvas 的库，所有绘制均在 Go 代码中完成。
- [wasmbrowsertest](https://github.com/agnivade/wasmbrowsertest) - 在浏览器中运行 Go WASM 测试。
- [Extism Go SDK](https://github.com/extism/go-sdk) - 通用、跨语言的 WebAssembly 框架，用于构建插件系统和多语言应用。
- [webapi](https://github.com/gowebapi/webapi) - 由 WebIDL 生成的 DOM 和 HTML 绑定。
- [vert](https://github.com/norunners/vert) - Go 与 JS 值之间的互操作。
:::

::: masonry
## 数据结构与算法
- [gods](https://github.com/emirpasic/gods) - Go 数据结构。容器、集合、列表、栈、映射、双向映射、树、哈希集等。
- [bleve](https://github.com/blevesearch/bleve) - Go 的现代文本索引库。
- [hatchet](https://github.com/hatchet-dev/hatchet) - 分布式、容错的任务队列。
- [go-datastructures](https://github.com/Workiva/go-datastructures) - 一组有用、高性能且线程安全的数据结构。
- [golang-set](https://github.com/deckarep/golang-set) - Go 的线程安全和非线程安全高性能集合。
- [gota](https://github.com/kniren/gota) - Go 的数据帧、序列和数据整理方法实现。
- [roaring](https://github.com/RoaringBitmap/roaring) - Go 包，实现压缩位集。
- [bloom](https://github.com/bits-and-blooms/bloom) - Go 包，实现布隆过滤器。
- [xsync](https://github.com/puzpuzpuz/xsync) - 并发可扩展数据结构，如 `xsync.Map`，一种并发泛型哈希表。
- [boomfilters](https://github.com/tylertreat/BoomFilters) - 用于处理连续、无界流的概率数据结构。
- [bitset](https://github.com/bits-and-blooms/bitset) - Go 包，实现位集。
- [cuckoofilter](https://github.com/seiflotfy/cuckoofilter) - 布谷鸟过滤器：Go 中实现的计数布隆过滤器的良好替代品。
- [gostl](https://github.com/liyue201/gostl) - Go 的数据结构和算法库，旨在提供类似于 C++ STL 的功能。
- [hyperloglog](https://github.com/axiomhq/hyperloglog) - HyperLogLog 实现，包含 Sparse、LogLog-Beta 偏差校正和 TailCut 空间缩减。
- [algorithms](https://github.com/shady831213/algorithms) - 算法与数据结构。CLRS 学习。
- [trie](https://github.com/derekparker/trie) - Go 中的 Trie 实现。
- [deque](https://github.com/gammazero/deque) - 快速环形缓冲区双端队列。
- [go-edlib](https://github.com/hbollon/go-edlib) - Go 字符串比较和编辑距离算法库（Levenshtein、LCS、Hamming、Damerau Levenshtein、Jaro-Winkler 等），兼容 Unicode。
- [levenshtein](https://github.com/agnivade/levenshtein) - 用于计算 Levenshtein 距离的 Go 实现。
- [goconcurrentqueue](https://github.com/enriquebris/goconcurrentqueue) - 并发 FIFO 队列。
- [skiplist](https://github.com/huandu/skiplist) - 快速且易于使用的 Go 跳表。
- [go-adaptive-radix-tree](https://github.com/plar/go-adaptive-radix-tree) - Go 实现的自适应基数树。
- [bitmap](https://github.com/kelindar/bitmap) - Go 中密集、零分配、支持 SIMD 的位图/位集。
- [queue](https://github.com/adrianbrad/queue) - Go 的多个线程安全通用队列实现。
- [go-geoindex](https://github.com/hailocab/go-geoindex) - 内存中的地理索引。
- [cuckoo-filter](https://github.com/linvon/cuckoo-filter) - 布谷鸟过滤器：一个全面的布谷鸟过滤器，与其他实现相比可配置且空间优化，原始论文中提到的所有功能均可用。
- [skiplist](https://github.com/MauriceGit/skiplist) - 非常快的 Go Skiplist 实现。
- [concurrent-swiss-map](https://github.com/mhmtszr/concurrent-swiss-map) - 一个高性能、线程安全的泛型并发哈希映射实现，使用 Swiss Map。
- [binpacker](https://github.com/zhuangsirui/binpacker) - 二进制打包与解包器，帮助用户构建自定义二进制流。
- [deque](https://github.com/edwingeng/deque) - 一个高度优化的双端队列。
- [iter](https://github.com/disksing/iter) - Go 实现的 C++ STL 迭代器和算法。
- [bit](https://github.com/yourbasic/bit) - Golang 集合数据结构，附带位操作函数。
- [bloom](https://github.com/zhenjl/bloom) - 用 Go 实现的布隆过滤器。
- [ring](https://github.com/TheTannerRyan/ring) - Go 实现的高性能、线程安全的布隆过滤器。
- [memlog](https://github.com/embano1/memlog) - 一个易用、轻量、线程安全且仅追加的内存数据结构，灵感来自 Apache Kafka。
- [go-rquad](https://github.com/aurelien-rainone/go-rquad) - 区域四叉树，支持高效的点定位和邻居查找。
- [gogu](https://github.com/esimov/gogu) - 一个全面、可复用、高效的并发安全泛型工具函数和数据结构库。
- [go-rampart](https://github.com/francesconi/go-rampart) - 确定区间之间的相互关系。
- [cmap](https://github.com/lrita/cmap) - 一个线程安全的并发映射，支持使用 `interface{}` 作为键，并自动扩展分片。
- [go-tuple](https://github.com/barweiss/go-tuple) - Go 1.18+ 的通用元组实现。
- [crunch](https://github.com/superwhiskers/crunch) - Go 包，实现缓冲区以轻松处理各种数据类型。
- [levenshtein](https://github.com/agext/levenshtein) - Levenshtein 距离和相似度度量，支持自定义编辑成本，并具有类似 Winkler 的公共前缀奖励。
- [bloom](https://github.com/yourbasic/bloom) - Golang 布隆过滤器实现。
- [fsm](https://github.com/cocoonspace/fsm) - 有限状态机包。
- [nan](https://github.com/kak-tus/nan) - 一个库中的零分配可空结构，附带便捷转换函数、编组器和解编组器。
- [go-generics](https://github.com/bobg/go-generics) - 通用的切片、映射、集合、迭代器和 goroutine 工具。
- [skiplist](https://github.com/gansidui/skiplist) - Go 中的 Skiplist 实现。
- [hide](https://github.com/emvi/hide) - ID 类型，支持哈希的编组/解组，防止向客户端发送 ID。
- [count-min-log](https://github.com/seiflotfy/count-min-log) - Go 实现的 Count-Min-Log 草图：使用近似计数器进行近似计数（类似 Count-Min 草图，但占用更少内存）。
- [treemap](https://github.com/igrmk/treemap) - 基于红黑树的通用键排序映射。
- [concurrent-writer](https://github.com/free/concurrent-writer) - `bufio.Writer` 的高并发即插即用替代品。
- [pipeline](https://github.com/hyfather/pipeline) - 具有扇入和扇出功能的管道实现。
- [goradd/maps](https://github.com/goradd/maps) - Go 1.18+ 的泛型映射接口，用于映射；安全映射；有序映射；有序安全映射等。
- [bingo](https://github.com/iancmcc/bingo) - 快速、零分配、保持字典序的原生类型到字节的打包。
- [goset](https://github.com/zoumo/goset) - Go 的一个有用的集合实现。
- [genfuncs](https://github.com/nwillc/genfuncs) - 受 Kotlin 的 Sequence 和 Map 启发的 Go 1.18+ 泛型包。
- [dict](https://github.com/srfrog/dict) - Go 的类似 Python 的字典（dict）。
- [go18ds](https://github.com/daichi-m/go18ds) - 使用 Go 1.18 泛型实现的 Go 数据结构。
- [ordered-concurrently](https://github.com/tejzpr/ordered-concurrently) - Go 模块，并发处理工作并按输入顺序通过通道返回输出。
- [typ](https://github.com/gurukami/typ) - 空类型、安全的原始类型转换以及从复杂结构中获取值。
- [ptrie](https://github.com/viant/ptrie) - 前缀树的一种实现。
- [go-ef](https://github.com/amallia/go-ef) - Elias-Fano 编码的 Go 实现。
- [quadtree](https://github.com/s0rg/quadtree) - 通用、零分配、100% 测试覆盖的四叉树。
- [radixtree](https://github.com/gammazero/radixtree) - 自适应基数树（前缀树或紧凑 trie）。
- [null](https://github.com/emvi/null) - 可编组/解组为 JSON 的可空 Go 类型。
- [parapipe](https://github.com/nazar256/parapipe) - FIFO 管道，在每个阶段并行执行，同时保持消息和结果的顺序。
- [hashsplit](http://github.com/bobg/hashsplit) - 将字节流分块，并将块组织成树，边界由内容决定，而非位置。
- [set](https://github.com/StudioSol/set) - 使用 LinkedHashMap 实现的 Go 简单集合数据结构。
- [mspm](https://github.com/BlackRabbitt/mspm) - 用于信息检索的多字符串模式匹配算法。
- [gloop](https://github.com/alvii147/gloop) - 使用 Go 的 range-over-func 特性实现便捷循环。
- [FSM](https://github.com/enetx/fsm) - Go 的 FSM。
- [merkle](https://github.com/bobg/merkle) - 高效计算 Merkle 根哈希和包含证明。
- [slices](https://github.com/twharmon/slices) - 纯泛型切片函数。
- [bloomfilter](https://github.com/OldPanda/bloomfilter) - 另一个 Go 布隆过滤器实现，兼容 Java 的 Guava 库。
- [goterator](https://github.com/yaa110/goterator) - 提供 map 和 reduce 功能的迭代器实现。
- [gofal](https://github.com/xxjwxc/gofal) - Go 的分数 API。
- [pipelines](https://github.com/nxdir-s/pipelines) - 用于并发处理的通用管道函数。
- [glinq](https://github.com/CreateLab/glinq) - 类似 LINQ 的惰性求值库，具有类型安全的泛型、性能优化和零依赖。
- [deheap](https://github.com/aalpar/deheap) - 双端堆（最小-最大堆），对最小和最大元素均具有 O(log n) 访问时间。
- [dsu](https://github.com/ihebu/dsu) - Go 中的不相交集合数据结构实现。
- [ribbonGo](https://github.com/RibbonFilter/ribbonGo) - 首个纯 Go 实现的 Ribbon 过滤器（实际上比 Bloom 和 Xor 更小），用于空间高效的近似集合成员查询。
- [go-shelve](https://github.com/lucmq/go-shelve) - Go 编程语言的持久化、类似映射的对象。支持多种嵌入式键值存储。
- [list](https://github.com/koss-null/list) - 一个通用的线程安全双向链表，支持完整迭代器，以及用于嵌入式环境的侵入式单向链表；是 container/list 的功能丰富的替代品。
- [parsefields](https://github.com/MonaxGT/parsefields) - 解析类 JSON 日志以收集唯一字段和事件的工具。
- [genericsyncmap](https://github.com/donomii/genericsyncmap) - `sync.Map` 的类型安全泛型包装，具有完整的方法对等和零依赖。
- [dqueue](https://github.com/vodolaz095/dqueue) - 简单、内存中、零依赖且经过实战检验的线程安全延迟队列。
- [graphlib](https://github.com/aio-arch/graphlib) - 拓扑排序库，用于 DAG 图的排序和剪枝。
- [combo](https://github.com/bobg/combo) - 组合操作，包括排列、组合和带替换的组合。
- [hmap](https://github.com/lyonnee/hmap) - HMap 是一个并发且安全的泛型 Map 实现，旨在提供易于使用的 API。
:::

::: masonry
## 编辑器插件
> 用于文本编辑器和 IDE 的插件。
- [vim-go](https://github.com/fatih/vim-go) - Vim 的 Go 开发插件。
- [gocode](https://github.com/nsf/gocode) - Go 编程语言的自动补全守护进程。
- [vscode-go](https://github.com/golang/vscode-go) - Visual Studio Code（VS Code）扩展，提供对 Go 语言的支持。
- [GoSublime](https://github.com/DisposaBoy/GoSublime) - 为文本编辑器 SublimeText 3 提供的 Golang 插件集合，提供代码补全和其他类似 IDE 的功能。
- [go-mode](https://github.com/dominikh/go-mode.el) - GNU/Emacs 的 Go 模式。
- [goimports-reviser](https://github.com/incu6us/goimports-reviser) - 用于导入的格式化工具。
- [coc-go language server extension for Vim/Neovim](https://github.com/josa42/coc-go) - 此插件为 Vim/Neovim 添加了 [gopls](https://github.com/golang/tools/blob/master/gopls/README.md) 功能。
- [Watch](https://github.com/eaburns/Watch) - 文件更改时在 acme win 中运行命令。
- [vim-compiler-go](https://github.com/rjohnsondev/vim-compiler-go) - Vim 插件，在保存时高亮语法错误。
- [gounit-vim](https://github.com/hexdigest/gounit-vim) - Vim 插件，根据函数或方法的签名生成 Go 测试。
- [Go Doc](https://github.com/msyrus/vscode-go-doc) - 一个 Visual Studio Code 扩展，用于在输出中显示定义并生成 go doc。
- [Go plugin for JetBrains IDEs](https://plugins.jetbrains.com/plugin/9568-go) - JetBrains IDE 的 Go 插件。
- [goprofiling](https://marketplace.visualstudio.com/items?itemName=MaxMedia.go-prof) - 此扩展为 VS Code 添加了 Go 语言的基准测试分析支持。
:::

::: masonry
## 电子邮件
> 实现电子邮件创建和发送的库和工具。
- [MailHog](https://github.com/mailhog/MailHog) - 带 Web 和 API 界面的电子邮件和 SMTP 测试。
- [Mailpit](https://github.com/axllent/mailpit) - 面向开发者的电子邮件和 SMTP 测试工具。
- [Maddy](https://github.com/foxcpp/maddy) - 一体化（SMTP、IMAP、DKIM、DMARC、MTA-STS、DANE）邮件服务器。
- [mox](https://github.com/mjl-/mox) - 现代功能齐全的安全邮件服务器，适合低维护、自托管的电子邮件。
- [hermes](https://github.com/matcornic/hermes) - 生成简洁、响应式 HTML 电子邮件的 Golang 包。
- [email](https://github.com/jordan-wright/email) - 一个健壮且灵活的 Go 电子邮件库。
- [go-imap](https://github.com/emersion/go-imap) - 用于客户端和服务器的 IMAP 库。
- [email-verifier](https://github.com/AfterShip/email-verifier) - 一个 Go 库，用于电子邮件验证，无需发送任何邮件。
- [go-mail](https://github.com/wneessen/go-mail) - 一个用 Go 发送邮件的简单库。
- [SendGrid](https://github.com/sendgrid/sendgrid-go) - SendGrid 的 Go 邮件发送库。
- [mailgun-go](https://github.com/mailgun/mailgun-go) - 使用 Mailgun API 发送邮件的 Go 库。
- [go-simple-mail](https://github.com/xhit/go-simple-mail) - 非常简单的邮件发送包，支持 SMTP 保持连接和两个超时：连接和发送。
- [go-message](https://github.com/emersion/go-message) - 面向互联网消息格式和邮件消息的流式库。
- [douceur](https://github.com/aymerick/douceur) - 用于 HTML 邮件的 CSS 内联器。
- [Hectane](https://github.com/hectane/hectane) - 提供 HTTP API 的轻量级 SMTP 客户端。
- [go-premailer](https://github.com/vanng822/go-premailer) - Go 中 HTML 邮件的内联样式。
- [smtpmock](https://github.com/mocktools/go-smtp-mock) - 轻量级可配置的多线程假 SMTP 服务器，可为测试环境模拟任意 SMTP 行为。
- [mailchain](https://github.com/mailchain/mailchain) - 用 Go 编写，向区块链地址发送加密电子邮件。
- [truemail-go](https://github.com/truemail-rb/truemail-go) - 可配置的 Golang 电子邮件验证器/校验器，可通过正则表达式、DNS、SMTP 等方式验证电子邮件。
- [go-imap](https://github.com/BrianLeishman/go-imap) - 功能齐全的 IMAP 客户端，支持自动重连、OAuth2、IDLE 和内置 MIME 解析。
- [go-dkim](https://github.com/toorop/go-dkim) - DKIM 库，用于签名和验证电子邮件。
- [go-email-normalizer](https://github.com/dimuska139/go-email-normalizer) - 用于提供电子邮件地址规范表示的 Golang 库。
- [smtp](https://github.com/mailhog/smtp) - SMTP 服务器协议状态机。
- [mailx](https://github.com/valord577/mailx) - Mailx 是一个通过 SMTP 发送电子邮件的库，是对 Go 标准库 `net/smtp` 的增强。
- [tickstem/verify](https://github.com/tickstem/verify) - 在电子邮件进入数据库之前进行验证：语法、MX 查找、一次性域名和基于角色的收件箱。
- [go-spamcheck](https://github.com/psyb0t/go-spamcheck) - Postmark 的 SpamCheck API 客户端，可根据 SpamAssassin 规则对原始邮件进行评分。
- [chasquid](https://blitiri.com.ar/p/chasquid) - 用 Go 编写的 SMTP 服务器。
:::

::: masonry
## JSON
> 用于处理 JSON 的库。
- [GJSON](https://github.com/tidwall/gjson) - 一行代码获取 JSON 值。
- [gabs](https://github.com/Jeffail/gabs) - 用于在 Go 中解析、创建和编辑未知或动态 JSON。
- [SJSON](https://github.com/tidwall/sjson) - 一行代码设置 JSON 值。
- [gojson](https://github.com/ChimeraCoder/gojson) - 根据示例JSON自动生成Go（golang）结构体定义。
- [fastjson](https://github.com/valyala/fastjson) - 用于Go的快速JSON解析器和验证器。无需自定义结构体、无需代码生成、无需反射。
- [OjG](https://github.com/ohler55/ojg) - Optimized JSON for Go是一个高性能解析器，包含多种附加JSON工具，包括JSONPath。
- [jsondiff](https://github.com/wI2L/jsondiff) - 基于 RFC6902（JSON Patch）的 Go JSON 差异库。
- [marshmallow](https://github.com/PerimeterX/marshmallow) - 高性能JSON解组，适用于灵活用例。
- [kazaam](https://github.com/Qntfy/kazaam) - 用于任意转换 JSON 文档的 API。
- [ajson](https://github.com/spyzhov/ajson) - 支持 JSONPath 的 Go 抽象 JSON 库。
- [jsonvalue](https://github.com/Andrew-M-C/go.jsonvalue) - 用于非结构化 JSON 数据的快速便捷库，替代 `encoding/json`。
- [gojq](https://github.com/elgs/gojq) - Golang 中的 JSON 查询。
- [jettison](https://github.com/wI2L/jettison) - 用于Go的快速灵活的JSON编码器。
- [json2go](https://github.com/m-zajac/json2go) - 高级JSON到Go结构体转换。提供可解析多个JSON文档并创建适合所有文档的结构体的包。
- [gjo](https://github.com/skanehira/gjo) - 创建 JSON 对象的小工具。
- [JayDiff](https://github.com/yazgazan/jaydiff) - 用 Go 编写的 JSON 差异工具。
- [jsongo](https://github.com/ricardolonga/jsongo) - 流畅的API，使创建JSON对象更简单。
- [jscan](https://github.com/romshark/jscan) - 高性能零分配 JSON 迭代器。
- [ujson](https://github.com/olvrng/ujson) - 快速且极简的 JSON 解析器和转换器，适用于非结构化 JSON。
- [jsonf](https://github.com/miolini/jsonf) - 用于高亮格式化和结构体查询获取 JSON 的控制台工具。
- [silentjson](https://github.com/GenshIv/silentjson) - 利用 AVX2 SIMD 指令的零分配 JSON 边界扫描器和分割器。
- [ask](https://github.com/simonnilsson/ask) - 轻松访问映射和切片中的嵌套值。可与 encoding/json 及其他将任意数据“反序列化”为 Go 数据类型的包配合使用。
- [go-respond](https://github.com/nicklaw5/go-respond) - 用于处理常见 HTTP JSON 响应的 Go 包。
- [jsoncolor](https://github.com/neilotoole/jsoncolor) - `encoding/json`的直接替代品，输出彩色JSON。
- [mp](https://github.com/sanbornm/mp) - 简单的CLI电子邮件解析器。目前从标准输入读取并输出JSON。
- [vjson](https://github.com/miladibra10/vjson) - 用于通过流畅API声明JSON模式来验证JSON对象的Go包。
- [gojmapr](https://github.com/limiu82214/gojmapr) - 通过 JSON 路径从复杂 JSON 中获取简单结构体。
- [mapslice-json](https://github.com/mickep76/mapslice-json) - Go MapSlice，用于JSON中映射的有序编组/解组。
- [epoch](https://github.com/vtopc/epoch) - 包含将Unix时间戳/纪元与内置time.Time类型在JSON中相互编解码的原语。
- [dynjson](https://github.com/cocoonspace/dynjson) - 客户端可自定义的JSON格式，适用于动态API。
- [go-jsonerror](https://github.com/ddymko/go-jsonerror) - Go-JsonError 旨在让我们轻松创建符合 JsonApi 规范的 JSON 响应错误。
- [jsonapi-errors](https://github.com/AmuzaTkts/jsonapi-errors) - 基于 JSON API 错误参考的 Go 绑定。
- [jsonhal](https://github.com/RichardKnop/jsonhal) - 简单的 Go 包，使自定义结构体编组为符合 HAL 的 JSON 响应。
- [jsonic](https://github.com/sinhashubham95/jsonic) - 以类型安全的方式处理并查询JSON而无需定义结构体的工具。
- [jzon](https://github.com/zerosnake0/jzon) - 具有标准兼容 API/行为的 JSON 库。
- [ej](https://github.com/lucassscaravelli/ej) - 简洁地从不同来源读写JSON。
- [htmljson](https://github.com/nikolaydubina/htmljson) - 在Go中将JSON富渲染为HTML。
- [omg.jsonparser](https://github.com/dedalqq/omg.jsonparser) - 通过 golang 结构体字段标签进行条件验证的简单 JSON 解析器。
- [jsonhandlers](https://github.com/abusomani/jsonhandlers) - JSON库，提供简单处理器，让您轻松从各种来源读写JSON。
- [jseq](https://github.com/bobg/jseq) - 流式 JSON 解析器。
- [JSON-to-Go](https://mholt.github.io/json-to-go/) - 将 JSON 转换为 Go 结构体。
- [JSON-to-Proto](https://json-to-proto.github.io/) - 在线将 JSON 转换为 Protobuf。
:::

::: masonry
## Goroutines
> 用于管理和操作 Goroutines 的工具。
- [ants](https://github.com/panjf2000/ants) - Go 中高性能、低成本的 goroutine 池。
- [conc](https://github.com/sourcegraph/conc) - `conc` 是 Go 中结构化并发的工具带，使常见任务更简单、更安全。
- [tunny](https://github.com/Jeffail/tunny) - Golang 的 goroutine 池。
- [goworker](https://github.com/benmanns/goworker) - goworker 是一个基于 Go 的后台 worker。
- [pond](https://github.com/alitto/pond) - 用 Go 编写的极简且高性能的 goroutine worker 池。
- [rill](https://github.com/destel/rill) - 用于干净、可组合、基于通道的并发的 Go 工具包。
- [workerpool](https://github.com/gammazero/workerpool) - 限制任务执行并发数（而非排队任务数）的 goroutine 池。
- [grpool](https://github.com/ivpusic/grpool) - 轻量级 goroutine 池。
- [pool](https://github.com/go-playground/pool) - 有限的消费者 goroutine 或无限的 goroutine 池，便于 goroutine 处理和取消。
- [gowp](https://github.com/xxjwxc/gowp) - gowp 是一个并发限制的 goroutine 池。
- [flowmatic](https://github.com/carlmjohnson/flowmatic) - 结构化并发变得简单。
- [async](https://github.com/reugn/async) - Go 的替代同步库（Future、Promise、Locks）。
- [go-actor](https://github.com/vladopajic/go-actor) - 使用 actor 模型编写并发程序的小型库。
- [routine](https://github.com/timandy/routine) - `routine` 是 Go 库的 `ThreadLocal`。它封装并提供了一些易用、无竞争、高性能的 `goroutine` 上下文访问接口，可帮助你更优雅地访问协程上下文信息。
- [go-floc](https://github.com/workanator/go-floc) - 轻松编排 goroutines。
- [go-flow](https://github.com/kamildrazkiewicz/go-flow) - 控制 goroutine 的执行顺序。
- [artifex](https://github.com/borderstech/artifex) - 基于 worker 调度的 Golang 简单内存任务队列。
- [semaphore](https://github.com/marusama/semaphore) - 基于 CAS 的快速可调整大小信号量实现（比基于通道的信号量实现更快）。
- [neilotoole/errgroup](https://github.com/neilotoole/errgroup) - 可直接替代 `sync/errgroup`，限制为 N 个 worker goroutine 的池。
- [cyclicbarrier](https://github.com/marusama/cyclicbarrier) - Golang 的 CyclicBarrier。
- [async](https://github.com/studiosol/async) - 安全地异步执行函数，并在 panic 时恢复它们。
- [gollback](https://github.com/vardius/gollback) - 异步简单函数工具，用于管理闭包和回调的执行。
- [go-future](https://github.com/jizhuozhi/go-future) - 一个具有通用组合器和 DAG 执行引擎的 Future/Promise 库。
- [Hunch](https://github.com/AaronJan/Hunch) - Hunch 提供了诸如 `All`、`First`、`Retry`、`Waterfall` 等函数，使异步流程控制更直观。
- [threadpool](https://github.com/shettyh/threadpool) - Golang 线程池实现。
- [semaphore](https://github.com/kamilsk/semaphore) - 基于通道和上下文的信号量模式实现，支持锁/解锁操作的超时。
- [worker-pool](https://github.com/vardius/worker-pool) - goworker 是一个 Go 简单的异步 worker 池。
- [gpool](https://github.com/Sherifabdlnaby/gpool) - 管理一个可调整大小的、上下文感知的 goroutine 池，以限制并发。
- [goccm](https://github.com/zenthangplus/goccm) - Go Concurrency Manager 包限制了允许并发运行的 goroutine 数量。
- [gowl](https://github.com/hamed-yousefi/gowl) - Gowl 同时是一个进程管理和进程监控工具。无限 worker 池使您能够控制池和进程并监控其状态。
- [nursery](https://github.com/arunsworld/nursery) - Go 中的结构化并发。
- [routine](https://github.com/x-mod/routine) - 带上下文的 goroutine 控制，支持：Main、Go、Pool 和一些有用的 Executors。
- [gohive](https://github.com/loveleshsharma/gohive) - 一个高性能且易于使用的 Go goroutine 池。
- [kyoo](https://github.com/dirkaholic/kyoo) - 提供无限任务队列和并发 worker 池。
- [go-waitgroup](https://github.com/pieterclaerhout/go-waitgroup) - 类似 `sync.WaitGroup`，但带有错误处理和并发控制。
- [parallel-fn](https://github.com/rafaeljesus/parallel-fn) - 并行运行函数。
- [go-trylock](https://github.com/subchen/go-trylock) - Golang 读写锁的 TryLock 支持。
- [channelify](https://github.com/ddelizia/channelify) - 将函数转换为返回通道，以便轻松进行强大的并行处理。
- [stl](https://github.com/ssgreg/stl) - 基于软件事务内存（STM）并发控制机制的软件事务锁。
- [execpool](https://github.com/hexdigest/execpool) - 围绕 exec.Cmd 构建的池，预先启动指定数量的进程，并在需要时附加 stdin 和 stdout。与 FastCGI 或 Apache Prefork MPM 非常相似，但适用于任何命令。
- [goscade](https://github.com/ognick/goscade) - 极简的 Go 组件生命周期编排器，支持依赖图、启动顺序、就绪协调和优雅关闭。
- [breaker](https://github.com/kamilsk/breaker) - 使执行流可中断的灵活机制。
- [concurrency-limiter](https://github.com/vivek-ng/concurrency-limiter) - 并发限制器，支持超时、动态优先级和 goroutine 的上下文取消。
- [conexec](https://github.com/ITcathyh/conexec) - 一个并发工具包，帮助高效且安全地并发执行函数。它支持指定整体超时以避免阻塞，并使用 goroutine 池来提高效率。
- [async](https://github.com/yaitoo/async) - Go 的异步任务包，采用 async/await 风格。
- [go-tools/multithreading](https://github.com/nikhilsaraf/go-tools) - 使用这个轻量级库和简单 API 管理 goroutine 池。
- [go-workerpool](https://github.com/zenthangplus/go-workerpool) - 受 Java 线程池启发，Go WorkerPool 旨在控制繁重的 Go Routines。
- [async-job](https://github.com/lab210-dev/async-job) - AsyncJob 是一个异步队列任务管理器，代码轻量、清晰且快速。
- [go-accumulator](https://github.com/nar10z/go-accumulator) - 事件累积及其后续处理的解决方案。
- [hands](https://github.com/duanckham/hands) - 一个进程控制器，用于控制多个 goroutine 的执行和返回策略。
- [anchor](https://github.com/kyuff/anchor) - 用于微服务架构中组件生命周期管理的库。
- [autopool](https://github.com/AshvinBambhaniya/autopool) - Go 的零配置、自动扩展 worker 池，支持优先级感知调度。
- [powerlock](https://github.com/donomii/powerlock) - 具有上下文取消的命名 FIFO 互斥锁、有界等待队列、看门狗诊断、pprof 分析和 Prometheus 指标。
- [oversight](https://pkg.go.dev/cirello.io/oversight) - Oversight 是 Erlang 监督树的完整实现。
:::

::: masonry
## 序列化
> 用于二进制序列化的库和工具。
- [jsoniter](https://github.com/json-iterator/go) - 高性能、100% 兼容的 "encoding/json" 即插即用替代品。
- [goprotobuf](https://github.com/golang/protobuf) - 以库和协议编译器插件的形式为 Google 的 protocol buffers 提供 Go 支持。
- [go-codec](https://github.com/ugorji/go) - 高性能、功能丰富、惯用的 msgpack、cbor 和 json 编码、解码及 rpc 库，支持基于运行时或代码生成。
- [cbor](https://github.com/fxamacker/cbor) - 小巧、安全且易用的 CBOR 编码和解码库。
- [csvutil](https://github.com/jszwec/csvutil) - 高性能、惯用的 CSV 记录编码和解码，映射到原生 Go 结构体。
- [colfer](https://github.com/pascaldekloe/colfer) - Colfer 二进制格式的代码生成。
- [proto](https://github.com/emicklei/proto) - 用于 Google ProtocolBuffers .proto 文件的解析器和写入器。
- [go-capnproto](https://github.com/glycerine/go-capnproto) - 用于 Go 的 Cap'n Proto 库和解析器。
- [php_session_decoder](https://github.com/yvasiyarov/php_session_decoder) - 用于处理 PHP 会话格式和 PHP Serialize/Unserialize 函数的 GoLang 库。
- [mus-go](https://github.com/mus-format/mus-go) - 用于 Go 的 MUS 格式序列化器。
- [structomap](https://github.com/tuvistavie/structomap) - 轻松从静态结构动态生成映射的库。
- [binstruct](https://github.com/ghostiam/binstruct) - 用于将数据映射到结构体中的 Golang 二进制解码器。
- [bambam](https://github.com/glycerine/bambam) - 从 Go 生成 Cap'n Proto 模式的生成器。
- [bel](https://github.com/32leaves/bel) - 从 Go 结构体/接口生成 TypeScript 接口。适用于 JSON RPC。
- [fwencoder](https://github.com/o1egl/fwencoder) - 用于 Go 的固定宽度文件解析器（编码和解码库）。
- [elastic](https://github.com/epiclabs-io/elastic) - 在运行时将切片、映射或任何其他未知值在不同类型之间转换，无论什么情况。
- [gotiny](https://github.com/raszia/gotiny) - 高效的 Go 序列化库，gotiny 几乎与生成代码的序列化库一样快。
- [pletter](https://github.com/vimeda/pletter) - 为消息代理包装 proto 消息的标准方式。
- [go-csvlib](https://github.com/tiendc/go-csvlib) - 功能丰富的高层 CSV 序列化/反序列化库。
- [fixedwidth](https://github.com/huydang284/fixedwidth) - 固定宽度文本格式化（支持 UTF-8）。
- [unitpacking](https://github.com/recolude/unitpacking) - 将单位向量打包为尽可能少字节的库。
:::

::: masonry
## 消息
> 实现消息系统的库。
- [Asynq](https://github.com/hibiken/asynq) - 基于 Redis 构建的简单、可靠、高效的 Go 分布式任务队列。
- [sarama](https://github.com/Shopify/sarama) - Apache Kafka 的 Go 库。
- [Centrifugo](https://github.com/centrifugal/centrifugo) - 用 Go 编写的实时消息（Websockets 或 SockJS）服务器。
- [Watermill](https://github.com/ThreeDotsLabs/watermill) - 高效处理消息流。构建事件驱动应用，支持事件溯源、基于消息的 RPC、Saga。可以使用传统的 pub/sub 实现如 Kafka 或 RabbitMQ，也可以使用 HTTP 或 MySQL binlog。
- [gorush](https://github.com/appleboy/gorush) - 使用 [APNs2](https://github.com/sideshow/apns2) 和 google [GCM](https://github.com/google/go-gcm) 的推送通知服务器。
- [machinery](https://github.com/RichardKnop/machinery) - 基于分布式消息传递的异步任务队列/作业队列。
- [NATS Go Client](https://github.com/nats-io/nats.go) - NATS 的 Go 客户端。
- [Mercure](https://github.com/dunglas/mercure) - 使用 Mercure 协议（基于服务器发送事件）分发服务器推送更新的服务器和库。
- [Confluent Kafka Golang Client](https://github.com/confluentinc/confluent-kafka-go) - confluent-kafka-go 是 Confluent 的 Apache Kafka 和 Confluent Platform 的 Golang 客户端。
- [melody](https://github.com/olahol/melody) - 用于处理 WebSocket 会话的极简框架，包含广播和自动 ping/pong 处理。
- [APNs2](https://github.com/sideshow/apns2) - 用于 Go 的 HTTP/2 Apple Push Notification 提供程序 - 向 iOS、tvOS、Safari 和 OSX 应用发送推送通知。
- [go-nsq](https://github.com/nsqio/go-nsq) - NSQ 的官方 Go 包。
- [gopush-cluster](https://github.com/Terry-Mao/gopush-cluster) - gopush-cluster 是一个 Go 推送服务器集群。
- [amqp](https://github.com/rabbitmq/amqp091-go) - Go RabbitMQ 客户端库。
- [EventBus](https://github.com/asaskevich/EventBus) - 支持异步兼容的轻量级事件总线。
- [Beaver](https://github.com/Clivern/Beaver) - 实时消息服务器，用于在 Web 和移动应用中构建可扩展的应用内通知、多人游戏、聊天应用。
- [Uniqush-Push](https://github.com/uniqush/uniqush-push) - 基于 Redis 的统一推送服务，用于向移动设备发送服务器端通知。
- [Chanify](https://github.com/chanify/chanify) - 向 iOS 设备发送消息的推送通知服务器。
- [zmq4](https://github.com/pebbe/zmq4) - ZeroMQ 版本 4 的 Go 接口。也可用于[版本 3](https://github.com/pebbe/zmq3)和[版本 2](https://github.com/pebbe/zmq2)。
- [dbus](https://github.com/godbus/dbus) - D-Bus 的原生 Go 绑定。
- [Gollum](https://github.com/trivago/gollum) - 一个 n:m 多路复用器，从不同来源收集消息并广播到一组目标。
- [mangos](https://github.com/nanomsg/mangos) - Nanomsg（“可扩展协议”）的纯 Go 实现，支持传输互操作。
- [golongpoll](https://github.com/jcuga/golongpoll) - HTTP 长轮询服务器库，使 Web 发布-订阅变得简单。
- [emitter](https://github.com/olebedev/emitter) - 以 Go 方式发出事件，支持通配符、谓词、取消功能等众多优点。
- [Quamina](https://github.com/timbray/quamina) - 用于过滤消息和事件的快速模式匹配。
- [pubsub](https://github.com/tuxychandru/pubsub) - Go 的简单 pubsub 包。
- [Glue](https://github.com/desertbit/glue) - 健壮的 Go 和 Javascript Socket 库（Socket.io 的替代品）。
- [Bus](https://github.com/mustafaturan/bus) - 用于内部通信的极简消息总线实现。
- [rabtap](https://github.com/jandelgado/rabtap) - RabbitMQ 瑞士军刀 CLI 应用。
- [messagebus](https://github.com/vardius/message-bus) - messagebus 是一个 Go 简单的异步消息总线，非常适合在事件溯源、CQRS、DDD 中用作事件总线。
- [Go-MediatR](https://github.com/mehdihadeli/Go-MediatR) - 受 csharp MediatR 库启发，用于在事件驱动架构中处理中介者模式和简化 CQRS 模式的库。
- [varmq](https://github.com/goptics/varmq) - 面向并发 Go 程序的存储无关消息队列和工作池。
- [guble](https://github.com/smancke/guble) - 使用推送通知（Google Firebase Cloud Messaging、Apple Push Notification services、SMS）以及 websockets、REST API 的消息服务器，支持分布式操作和消息持久化。
- [backlite](https://github.com/mikestefanello/backlite) - 类型安全、持久化、嵌入式任务队列和后台任务运行器，使用 SQLite。
- [hub](https://github.com/leandro-lugaresi/hub) - 用于 Go 应用的消息/事件中心，使用发布/订阅模式，支持类似 rabbitMQ 交换器的别名。
- [redisqueue](https://github.com/robinjoseph08/redisqueue) - redisqueue 提供使用 Redis 流的队列的生产者和消费者。
- [Ratus](https://github.com/hyperonym/ratus) - Ratus 是一个 RESTful 异步任务队列服务器。
- [rabbitroutine](https://github.com/furdarius/rabbitroutine) - 轻量级库，处理 RabbitMQ 自动重连和发布重试。该库考虑了重连后需要在 RabbitMQ 中重新声明实体。
- [oplog](https://github.com/dailymotion/oplog) - 用于 REST API 的通用 oplog/复制系统。
- [rabbus](https://github.com/rafaeljesus/rabbus) - amqp 交换器和队列的轻量封装。
- [go-mq](https://github.com/cheshir/go-mq) - 具有声明式配置的 RabbitMQ 客户端。
- [drone-line](https://github.com/appleboy/drone-line) - 使用二进制、docker 或 Drone CI 发送 [Line](https://at.line.me/en) 通知。
- [nsq-event-bus](https://github.com/rafaeljesus/nsq-event-bus) - NSQ 主题和通道的轻量封装。
- [GoEventBus](https://github.com/Raezil/GoEventBus) - 一个极快、内存中、无锁的事件总线库。
- [go-notify](https://github.com/TheCreeper/go-notify) - freedesktop 通知规范的原生实现。
- [RapidMQ](https://github.com/sybrexsys/RapidMQ) - RapidMQ 是一个轻量且可靠的库，用于管理本地消息队列。
- [go-res](https://github.com/jirenius/go-res) - 用于构建 REST/实时服务的包，使用 NATS 和 Resgate 实现客户端无缝同步。
- [Commander](https://github.com/jeroenrinzema/commander) - 支持 Apache Kafka 等各种“方言”的高级事件驱动消费者/生产者。
- [event](https://github.com/agoalofalife/event) - 观察者模式的实现。
- [hare](https://github.com/leozz37/hare) - 一个用户友好的库，用于发送消息和监听 TCP 套接字。
- [hypermatch](https://github.com/SchwarzDigits/hypermatch) - 将事件与大量规则匹配，规则可用 Go 或 JSON 编写。
- [ami](https://github.com/kak-tus/ami) - 基于 Redis Cluster Streams 的可靠队列的 Go 客户端。
- [gosd](https://github.com/alexsniffin/gosd) - 用于调度何时向通道发送消息的库。
- [go-vitotrol](https://github.com/maxatome/go-vitotrol) - Viessmann Vitotrol Web 服务的客户端库。
- [rmqconn](https://github.com/sbabiv/rmqconn) - RabbitMQ 重连。amqp.Connection 和 amqp.Dial 的封装。允许在连接断开时进行重连，然后强制调用 Close() 方法关闭。
- [jazz](https://github.com/socifi/jazz) - 一个简单的 RabbitMQ 抽象层，用于队列管理以及消息的发布和消费。
- [broker](https://github.com/qvcloud/broker) - 生产级消息抽象，为各种代理提供统一 API，并内置 OpenTelemetry 集成。
- [gaurun-client](https://github.com/osamingo/gaurun-client) - 用 Go 编写的 Gaurun 客户端。
- [go-eventbus](https://github.com/stanipetrosyan/go-eventbus) - Go 的简单事件总线包。
- [kiln](https://github.com/rafaelaugustos/kiln) - PostgreSQL、MySQL 或 SQLite 中的持久化后台任务，支持重试、工作流、定期任务和仪表板。
:::

::: masonry
## 游戏开发
> 出色的游戏开发库。
- [Ebitengine](https://github.com/hajimehoshi/ebiten) - Go 中极简的 2D 游戏引擎。
- [Leaf](https://github.com/name5566/leaf) - 轻量级游戏服务器框架。
- [nano](https://github.com/lonng/nano) - 轻量、便捷、高性能的基于 golang 的游戏服务器框架。
- [g3n](https://github.com/g3n/engine) - Go 3D 游戏引擎。
- [Pitaya](https://github.com/topfreegames/pitaya) - 可扩展的游戏服务器框架，支持集群，并通过 C SDK 提供 iOS、Android、Unity 等客户端库。
- [goworld](https://github.com/xiaonanln/goworld) - 可扩展的游戏服务器引擎，具有空间实体框架和热交换功能。
- [raylib-go](https://github.com/gen2brain/raylib-go) - [raylib](https://www.raylib.com/) 的 Go 绑定，这是一个简单易用的视频游戏编程学习库。
- [go-sdl2](https://github.com/veandco/go-sdl2) - [Simple DirectMedia Layer](https://www.libsdl.org/) 的 Go 绑定。
- [engo](https://github.com/EngoEngine/engo) - Engo 是一个用 Go 编写的开源 2D 游戏引擎，遵循实体-组件-系统范式。
- [Oak](https://github.com/oakmound/oak) - 纯 Go 游戏引擎。
- [termloop](https://github.com/JoelOtter/termloop) - 基于 Termbox 的 Go 终端游戏引擎。
- [gonet](https://github.com/xtaci/gonet) - 使用 golang 实现的游戏服务器骨架。
- [due](https://github.com/dobyte/due) - 分布式游戏服务器框架，采用模块化组件设计，提供 tcp、kcp、ws 和 quic 网关。
- [go-astar](https://github.com/beefsack/go-astar) - A* 寻路算法的 Go 实现。
- [gogpu](https://github.com/gogpu/gogpu) - 基于 WebGPU 的 GPU 应用框架，提供窗口、输入和渲染功能——将 480 多行 GPU 代码缩减至约 20 行，零 CGO（GoGPU 生态：[gg](https://github.com/gogpu/gg)、[ui](https://github.com/gogpu/ui)、[wgpu](https://github.com/gogpu/wgpu)、[naga](https://github.com/gogpu/naga)）。
- [Pixel](https://github.com/gopxl/pixel) - 手工打造的 Go 2D 游戏库。
- [go3d](https://github.com/ungerik/go3d) - 面向性能的 Go 2D/3D 数学包。
- [Ark](https://github.com/mlange-42/ark) - 基于 Archetype 的 Go 实体组件系统（ECS）。
- [tile](https://github.com/kelindar/tile) - 面向数据且缓存友好的 2D 网格库（TileMap），包含寻路、观察者以及导入/导出功能。
- [gogpu/wgpu](https://github.com/gogpu/wgpu) - 纯 Go 实现的 WebGPU，支持 Vulkan、DX12 和 Metal 后端，零 CGO（属于 [GoGPU](https://github.com/gogpu) 生态的一部分）。
- [ecs](https://github.com/andygeiss/ecs) - 在 Golang 中基于实体组件系统概念构建你自己的游戏引擎。
- [prototype](https://github.com/gonutz/prototype) - 跨平台（Windows/Linux/Mac）库，使用极简 API 创建桌面游戏。
- [GOKe](https://github.com/kjkrol/goke) - 面向数据（DOD）、基于 archetype 的 ECS 引擎，利用 L1 缓存对齐的分块 SoA 布局，实现可预测、无阶跃的内存增长和零分配执行路径。
- [Pi](https://github.com/elgopher/pi) - 用于在现代计算机上创建复古游戏的游戏引擎，灵感来自 Pico-8，由 Ebitengine 驱动。
- [fantasyname](https://github.com/s0rg/fantasyname) - 幻想名称生成器。
- [grid](https://github.com/s0rg/grid) - 通用 2D 网格，支持射线投射、阴影投射和寻路。
- [sceneCamera](https://github.com/donomii/sceneCamera) - 用于博物馆、FPS、RTS 和立体渲染模式的相机移动和视图/投影矩阵。
:::

::: masonry
## Go 编译器
> 用于将 Go 编译为其他语言以及反向编译的工具。
- [gopherjs](https://github.com/gopherjs/gopherjs) - 从 Go 到 JavaScript 的编译器。
- [bunster](https://github.com/yassinebenaid/bunster) - 将 shell 脚本编译为 Go。
- [cxgo](https://github.com/gotranspile/cxgo) - 将 C 代码转译为 Go 代码。
- [c4go](https://github.com/Konstantin8105/c4go) - 将 C 代码转译为 Go 代码。
- [go2hx](https://github.com/go2hx/go2hx) - 从 Go 到 Haxe 再到 JavaScript/C++/Java/C# 的编译器。
- [esp32](https://github.com/andygeiss/esp32-transpiler) - 将 Go 转译为 Arduino 代码。
- [f4go](https://github.com/Konstantin8105/f4go) - 将 FORTRAN 77 代码转译为 Go 代码。
:::

::: masonry
## Webhooks 服务器
- [webhook](https://github.com/adnanh/webhook) - 允许用户创建在服务器上执行命令的 HTTP 端点（hooks）的工具。
- [WebhookX](https://github.com/webhookx-io/webhookx) - 一个用于消息接收、处理和可靠投递的 webhooks 网关。
- [webhooked](https://github.com/42Atomys/webhooked) - 一个增强版 webhook 接收器：处理、安全、格式化并存储 Webhook 负载从未如此简单。
- [HookRun](https://github.com/bluvenr/hookrun) - 轻量级 webhook 动作引擎（约 3MB 单二进制，零依赖），通过 YAML 规则执行命令和脚本，支持 token/HMAC/IP 认证和热重载。
:::

::: masonry
## 可嵌入的脚本语言。
> 在 Go 代码中嵌入其他语言。
- [FrankenPHP](https://github.com/dunglas/frankenphp) - 嵌入 Go 中的 PHP，带 `net/http` 处理器。
- [expr](https://github.com/antonmedv/expr) - Go 的表达式求值引擎：快速、非图灵完备、动态类型、静态类型。
- [goja](https://github.com/dop251/goja) - Go 中的 ECMAScript 5.1(+) 实现。
- [gopher-lua](https://github.com/yuin/gopher-lua) - 用 Go 编写的 Lua 5.1 虚拟机和编译器。
- [tengo](https://github.com/d5/tengo) - 面向 Go 的字节码编译脚本语言。
- [go-lua](https://github.com/Shopify/go-lua) - 将 Lua 5.2 虚拟机移植到纯 Go。
- [starlark-go](https://github.com/google/starlark-go) - Starlark 的 Go 实现：具有确定性求值和封闭执行的类 Python 语言。
- [metacall](https://github.com/metacall/core) - 跨平台多语言运行时，支持 NodeJS、JavaScript、TypeScript、Python、Ruby、C#、WebAssembly、Java、Cobol 等。
- [Wa/凹语言](https://github.com/wa-lang/wa) - 嵌入到 Go 中的 Wa 编程语言。
- [anko](https://github.com/mattn/anko) - 用 Go 编写的可脚本化解释器。
- [go-php](https://github.com/deuill/go-php) - Go 的 PHP 绑定。
- [gval](https://github.com/PaesslerAG/gval) - 用 Go 编写的高度可定制的表达式语言。
- [prolog](https://github.com/ichiban/prolog) - 可嵌入的 Prolog。
- [golua](https://github.com/aarzilli/golua) - Lua C API 的 Go 绑定。
- [gisp](https://github.com/jcla1/gisp) - Go 中的简单 LISP。
- [gentee](https://github.com/gentee/gentee) - 可嵌入的脚本编程语言。
- [binder](https://github.com/alexeyco/binder) - 基于 [gopher-lua](https://github.com/yuin/gopher-lua) 的 Go 到 Lua 绑定库。
- [starlet](https://github.com/1set/starlet) - [starlark-go](https://github.com/google/starlark-go) 的 Go 封装，简化脚本执行，提供数据转换以及实用的 Starlark 库和扩展。
- [ecal](https://github.com/krotik/ecal) - 一种简单的可嵌入脚本语言，支持并发事件处理。
- [purl](https://github.com/ian-kent/purl) - 嵌入到 Go 中的 Perl 5.18.2。
- [ngaro](https://github.com/db47h/ngaro) - 可嵌入的 Ngaro VM 实现，支持在 Retro 中编写脚本。
- [go-lua](https://github.com/speedata/go-lua) - 用纯 Go 实现的 Lua 5.4 虚拟机。
- [cel-go](https://github.com/google/cel-go) - 快速、可移植、非图灵完备的表达式求值，支持渐进类型。
- [goal](https://codeberg.org/anaseto/goal) - 一种可嵌入的脚本数组语言。
:::

::: masonry
## 第三方 API
> 用于访问第三方 API 的库。
- [github](https://github.com/google/go-github) - 用于访问 GitHub REST API v3 的 Go 库。
- [go-openai](https://github.com/sashabaranov/go-openai) - OpenAI ChatGPT、DALL·E、Whisper API 的 Go 库。
- [discordgo](https://github.com/bwmarrin/discordgo) - Discord 聊天 API 的 Go 绑定。
- [slack](https://github.com/slack-go/slack) - Go 中的 Slack API。
- [google-cloud](https://github.com/GoogleCloudPlatform/gcloud-golang) - Google Cloud APIs Go 客户端库。
- [google](https://github.com/google/google-api-go-client) - 自动生成的 Google APIs Go 代码。
- [aws-sdk-go](https://github.com/aws/aws-sdk-go-v2) - Go 编程语言的官方 AWS SDK。
- [minio-go](https://github.com/minio/minio-go) - Minio Go 库，用于兼容 Amazon S3 的云存储。
- [stripe](https://github.com/stripe/stripe-go) - Stripe API 的 Go 客户端。
- [go-jira](https://github.com/andygrunwald/go-jira) - [Atlassian JIRA](https://www.atlassian.com/software/jira) 的 Go 客户端库。
- [facebook](https://github.com/huandu/facebook) - 支持 Facebook Graph API 的 Go 库。
- [githubql](https://github.com/shurcooL/githubql) - 用于访问 GitHub GraphQL API v4 的 Go 库。
- [anaconda](https://github.com/ChimeraCoder/anaconda) - 用于 Twitter 1.1 API 的 Go 客户端库。
- [webhooks](https://github.com/go-playground/webhooks) - 用于 GitHub 和 Bitbucket 的 Webhook 接收器。
- [libopenapi](https://github.com/pb33f/libopenapi) - 解析、验证并处理 OpenAPI、Swagger、Overlays 与 Arazzo 规范。
- [paypal](https://github.com/logpacker/PayPal-Go-SDK) - PayPal 支付 API 的封装库。
- [geo-golang](https://github.com/codingsince1985/geo-golang) - 用于访问 [Google Maps](https://developers.google.com/maps/documentation/geocoding/intro)、[MapQuest](https://developer.mapquest.com/documentation/api/geocoding/)、[Nominatim](https://nominatim.org/release-docs/latest/api/Overview/)、[OpenCage](https://opencagedata.com/api)、[Bing](https://msdn.microsoft.com/en-us/library/ff701715.aspx)、[Mapbox](https://www.mapbox.com/developers/api/geocoding/) 和 [OpenStreetMap](https://wiki.openstreetmap.org/wiki/Nominatim) 地理编码/逆地理编码 API 的 Go 库。
- [lark](https://github.com/chyroc/lark) - [飞书](https://open.feishu.cn/)/[Lark](https://open.larksuite.com/) 开放 API 的 Go SDK，支持所有开放 API 和事件回调。
- [openaigo](https://github.com/otiai10/openaigo) - OpenAI GPT3/GPT3.5 ChatGPT API 的 Go 客户端库。
- [openapi](https://github.com/speakeasy-api/openapi) - 解析、验证并操作 OpenAPI、Swagger、Arazzo 与 OpenAPI Overlay 文档。
- [ethrpc](https://github.com/onrik/ethrpc) - Ethereum JSON RPC API 的 Go 绑定。
- [go-lark](https://github.com/go-lark/lark) - [飞书](https://open.feishu.cn/) 和 [Lark](https://open.larksuite.com/) 开放平台的易用非官方 SDK。
- [Trello](https://github.com/adlio/trello) - Trello API 的 Go 封装库。
- [go-atlassian](https://github.com/ctreminiom/go-atlassian) - 用于访问 [Atlassian Cloud](https://www.atlassian.com/enterprise/cloud) 服务（Jira、Jira Service Management、Jira Agile、Confluence、Admin Cloud）的 Go 库。
- [simples3](https://github.com/rhnvrm/simples3) - 使用 Go 编写的基于 REST 和 V4 签名的简单无冗余 AWS S3 库。
- [go-marathon](https://github.com/gambol99/go-marathon) - 用于与 Mesosphere 的 Marathon PAAS 交互的 Go 库。
- [gosip](https://github.com/koltyakov/gosip) - SharePoint 的客户端库。
- [golang-tmdb](https://github.com/cyruzin/golang-tmdb) - The Movie Database API v3 的 Golang 封装。
- [wit-go](https://github.com/wit-ai/wit-go) - wit.ai HTTP API 的 Go 客户端。
- [pushover](https://github.com/gregdel/pushover) - Pushover API 的 Go 封装库。
- [go-trending](https://github.com/andygrunwald/go-trending) - 用于访问 Github 上[热门仓库](https://github.com/trending)和[开发者](https://github.com/trending/developers)的 Go 库。
- [Medium](https://github.com/Medium/medium-sdk-go) - Medium OAuth2 API 的 Golang SDK。
- [gostorm](https://github.com/jsgilmore/gostorm) - GoStorm 是一个 Go 库，实现了用 Go 编写 Storm spouts 和 Bolts 并与 Storm shells 通信所需的通信协议。
- [spec](https://github.com/oaswrap/spec) - 轻量级 OpenAPI 3.x 构建器，支持静态生成以及 chi、echo、gin、fiber、mux 等流行框架。
- [disgo](https://github.com/switchupcb/disgo) - Discord API 的 Go API 封装。
- [hipchat (xmpp)](https://github.com/daneharrigan/hipchat) - 一个通过 XMPP 与 HipChat 通信的 golang 包。
- [go-gerrit](https://github.com/andygrunwald/go-gerrit) - 用于 [Gerrit Code Review](https://www.gerritcodereview.com/) 的 Go 客户端库。
- [hipchat](https://github.com/andybons/hipchat) - 该项目实现了 Hipchat API 的 golang 客户端库。
- [go-redoc](https://github.com/mvrilo/go-redoc) - 使用 [ReDoc](https://redocly.com/) 的 Go 嵌入式 OpenAPI/Swagger 文档界面。
- [lemonsqueezy-go](https://github.com/NdoleStudio/lemonsqueezy-go) - Lemon Squeezy API 的 Go 客户端。
- [cachet](https://github.com/andygrunwald/cachet) - 用于 [Cachet（开源状态页系统）](https://cachethq.io/) 的 Go 客户端库。
- [GoFreeDB](https://github.com/FreeLeh/GoFreeDB) - 在 Google Sheets 之上提供通用且简单数据库抽象的 Golang 库。
- [gogtrends](https://github.com/groovili/gogtrends) - Google Trends 非官方 API。
- [airtable](https://github.com/mehanizm/airtable) - 用于 [Airtable API](https://airtable.com/api) 的 Go 客户端库。
- [igdb](https://github.com/Henry-Sarabia/igdb) - [Internet Game Database API](https://api.igdb.com/) 的 Go 客户端。
- [go-postman-collection](https://github.com/rbretecher/go-postman-collection) - 用于处理 [Postman Collections](https://learning.getpostman.com/docs/postman/collections/creating-collections/) 的 Go 模块（兼容 Insomnia）。
- [go-unsplash](https://github.com/hbagdi/go-unsplash) - [Unsplash.com](https://unsplash.com) API 的 Go 客户端库。
- [ynab](https://github.com/brunomvsouza/ynab.go) - YNAB API 的 Go 封装。
- [circleci](https://github.com/jszwedko/go-circleci) - 用于与 CircleCI API 交互的 Go 客户端库。
- [GoMusicBrainz](https://github.com/michiwend/gomusicbrainz) - Go MusicBrainz WS2 客户端库。
- [mixpanel](https://github.com/dukex/mixpanel) - Mixpanel 是一个用于从 Go 应用中跟踪事件并向 Mixpanel 发送个人资料更新的库。
- [uptimerobot](https://github.com/bitfield/uptimerobot) - Uptime Robot v2 API 的 Go 封装库和命令行客户端。
- [go-salesforce](https://github.com/k-capehart/go-salesforce) - 用于与 [Salesforce REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_list.htm) 交互的 Go 客户端库。
- [megos](https://github.com/andygrunwald/megos) - 用于访问 [Apache Mesos](https://mesos.apache.org/) 集群的客户端库。
- [spotify](https://github.com/rapito/go-spotify) - 访问 Spotify WEB API 的 Go 库。
- [fcm](https://github.com/maddevsio/fcm) - 用于 Firebase Cloud Messaging 的 Go 库。
- [gads](https://github.com/emiddleton/gads) - Google Adwords 非官方 API。
- [go-xkcd](https://github.com/nishanths/go-xkcd) - xkcd API 的 Go 客户端。
- [swag](https://github.com/zc2638/swag) - 无注释、简单的 Go 封装库，用于创建兼容 Swagger 2.0 的 API。支持大多数路由框架，如内置、gin、chi、mux、echo、httprouter、fasthttp 等。
- [go-myanimelist](https://github.com/nstratos/go-myanimelist) - 用于访问 [MyAnimeList API](https://myanimelist.net/apiconfig/references/api/v2) 的 Go 客户端库。
- [patreon-go](https://github.com/mxpv/patreon-go) - Patreon API 的 Go 库。
- [golyrics](https://github.com/mamal72/golyrics) - Golyrics 是一个从 Wikia 网站获取音乐歌词数据的 Go 库。
- [coinpaprika-go](https://github.com/coinpaprika/coinpaprika-api-go-client) - 用于与 Coinpaprika API 交互的 Go 客户端库。
- [steam](https://github.com/sostronk/go-steam) - 与 Steam 游戏服务器交互的 Go 库。
- [lastpass-go](https://github.com/ansd/lastpass-go) - [LastPass](https://www.lastpass.com/) API 的 Go 客户端库。
- [gcm](https://github.com/Aorioli/gcm) - 用于 Google Cloud Messaging 的 Go 库。
- [jokeapi-go](https://github.com/icelain/jokeapi) - [JokeAPI](https://sv443.net/jokeapi/v2/) 的 Go 客户端。
- [device-check-go](https://github.com/rinchsan/device-check-go) - 用于与 [iOS DeviceCheck API](https://developer.apple.com/documentation/devicecheck) v1 交互的 Go 客户端库。
- [shopify](https://github.com/rapito/go-shopify) - 用于向 Shopify API 发起 CRUD 请求的 Go 库。
- [aws-encryption-sdk-go](https://github.com/chainifynet/aws-encryption-sdk-go) - [AWS Encryption SDK](https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/index.html) 的非官方 Go SDK 实现。
- [go-imgur](https://github.com/koffeinsource/go-imgur) - [imgur](https://imgur.com) 的 Go 客户端库。
- [goami2](https://github.com/staskobzar/goami2) - Asterisk PBX 的 AMI v2 库。
- [manus-ai-go](https://github.com/tigusigalpa/manus-ai-go) - Manus AI API v2 的 Go 客户端，支持任务自动化、文件管理、Webhooks 与类型安全模型。
- [httpsms-go](https://github.com/NdoleStudio/httpsms-go) - httpSMS API 的 Go 客户端。
- [textbelt](https://github.com/dietsche/textbelt) - textbelt.com 短信 API 的 Go 客户端。
- [brewerydb](https://github.com/naegelejd/brewerydb) - 用于访问 BreweryDB API 的 Go 库。
- [coinglass-go](https://github.com/tigusigalpa/coinglass-go) - Coinglass API v4 的 Go 客户端，零依赖，支持 WebSocket 流，并为期货、现货、期权、ETF 和指标提供类型化端点。
- [go-aws-news](https://github.com/circa10a/go-aws-news) - 用于从 AWS 获取新内容的 Go 应用程序和库。
- [go-openproject](https://github.com/manuelbcd/go-openproject) - 用于与 [OpenProject](https://www.openproject.org/docs/api/) API 交互的 Go 客户端库。
- [codeship-go](https://github.com/codeship/codeship-go) - 用于与 Codeship API v2 交互的 Go 客户端库。
- [nansen-go](https://github.com/tigusigalpa/nansen-go) - Nansen AI API 的 Go 客户端，提供 Smart Money 分析、代币筛选器、分析器，且零依赖。
- [birdeye-go](https://github.com/tigusigalpa/birdeye-go) - Birdeye DeFi API 的 Go 客户端，提供类型化的现货价格、OHLCV 蜡烛图、历史数据以及原始请求逃生舱口。
- [bqwriter](https://github.com/OTA-Insight/bqwriter) - 用于以高吞吐量向 [Google BigQuery](https://cloud.google.com/bigquery) 写入数据的高级 Go 库。
- [go-hacknews](https://github.com/PaulRosset/go-hacknews) - HackerNews API 的微型 Go 客户端。
- [gopaapi5](https://github.com/utekaravinash/gopaapi5) - [Amazon Product Advertising API 5.0](https://webservices.amazon.com/paapi5/documentation/) 的 Go 客户端库。
- [google-analytics](https://github.com/chonthu/go-google-analytics) - 用于轻松进行 Google Analytics 报告的简单封装。
- [ip2location-io-go](https://github.com/ip2location/ip2location-io-go) - IP2Location.io API 的 Go 封装库 [IP2Location.io](https://www.ip2location.io/)。
- [go-here](https://github.com/abdullahselek/go-here) - 围绕 HERE 位置服务的 Go 客户端库。
- [go-hibp](https://github.com/wneessen/go-hibp) - “Have I Been Pwned” API 的简单 Go 绑定。
- [gomalshare](https://github.com/MonaxGT/gomalshare) - MalShare API [malshare.com](https://www.malshare.com/) 的 Go 库。
- [go-sophos](https://github.com/esurdam/go-sophos) - 零依赖的 [Sophos UTM REST API](https://www.sophos.com/en-us/medialibrary/PDFs/documentation/UTMonAWS/Sophos-UTM-RESTful-API.pdf?la=en) Go 客户端库。
- [goagi](https://github.com/staskobzar/goagi) - 用于构建 Asterisk PBX agi/fastagi 应用的 Go 库。
- [rawg-sdk-go](https://github.com/dimuska139/rawg-sdk-go) - [RAWG 视频游戏数据库](https://rawg.io/) API 的 Go 库。
- [go-swagger-ui](https://github.com/esurdam/go-swagger-ui) - 包含预编译 [Swagger UI](https://swagger.io/tools/swagger-ui/) 的 Go 库，用于提供 swagger json 服务。
- [smite](https://github.com/sergiotapia/smitego) - 用于封装 Smite 游戏 API 访问的 Go 包。
- [libgoffi](https://github.com/clevabit/libgoffi) - 用于原生 [libffi](https://sourceware.org/libffi/) 集成的库适配器工具箱。
- [threads-go](https://github.com/tirthpatell/threads-go) - Meta Threads API 的 Go 客户端库，支持 OAuth 2.0、速率限制与类型安全错误处理。
- [go-chronos](https://github.com/axelspringer/go-chronos) - 用于与 [Chronos](https://mesos.github.io/chronos/) 作业调度器交互的 Go 库。
- [tumblr](https://github.com/mattcunningham/gumblr) - Tumblr v2 API 的 Go 封装库。
- [newsapi-go](https://github.com/jellydator/newsapi-go) - [NewsAPI](https://newsapi.org/) 的 Go 客户端。
- [zooz](https://github.com/gojuno/go-zooz) - Zooz API 的 Go 客户端。
- [appstore-sdk-go](https://github.com/Kachit/appstore-sdk-go) - 非官方的 AppStore Connect API Golang SDK。
- [gghstats](https://github.com/hrodrig/gghstats) - 自托管的 GitHub 流量仪表板，将克隆和浏览数据存储在 SQLite 中，超出 14 天 API 窗口。
- [sonarqube-client-go](https://github.com/BoxBoxJason/sonarqube-client-go) - SonarQube Web API 的 Go 客户端库与命令行客户端。
- [dusupay-sdk-go](https://github.com/Kachit/dusupay-sdk-go) - 非官方的 Dusupay 支付网关 API Go 客户端。
- [gopensky](https://github.com/navidys/gopensky) - [OpenSKY Network](https://opensky-network.org/) 实时 API（空域 ADS-B 和 Mode S 数据）的 Go 客户端实现。
- [go-restcountries](https://github.com/chriscross0/go-restcountries) - [REST Countries API](https://countrylayer.com/) 的 Go 库。
- [fasapay-sdk-go](https://github.com/Kachit/fasapay-sdk-go) - 非官方的 Fasapay 支付网关 XML API Golang 客户端。
- [playlyfe](https://github.com/playlyfe/playlyfe-go-sdk) - Playlyfe REST API 的 Go SDK。
- [TripAdvisor](https://github.com/mrbenosborne/tripadvisor-golang) - TripAdvisor API 的 Go 封装库。
- [vl-go](https://github.com/verifid/vl-go) - VerifID 身份验证层 API 的 Go 客户端库。
- [colony-sdk-go](https://github.com/TheColonyCC/colony-sdk-go) - 用于 [The Colony](https://thecolony.cc) 的 Go 客户端库——这是一个用户为 AI 代理的公共社交网络。
- [featureflip-go](https://github.com/canopy-labs/featureflip-go) - 用于 [Featureflip](https://featureflip.io/) 功能标志的 Go SDK，支持本地评估和流式更新。
- [go-telegraph](https://gitlab.com/toby3d/telegraph) - Telegraph 发布平台 API 客户端。
- [go-yapla](https://gitlab.com/adrienK/go-yapla) - Yapla v2.0 API 的 Go 客户端库。
:::

::: masonry
## 查询语言
- [gqlgen](https://github.com/99designs/gqlgen) - 基于 go generate 的 GraphQL 服务器库。
- [graphql-go](https://github.com/graphql-go/graphql) - Go 的 GraphQL 实现。
- [dasel](https://github.com/tomwright/dasel) - 使用选择器从命令行查询和更新数据结构。与 jq/yq 类似，但支持 JSON、YAML、TOML 和 XML，且零运行时依赖。
- [graphql](https://github.com/neelance/graphql-go) - 专注于易用性的 GraphQL 服务器。
- [gojsonq](https://github.com/thedevsaddam/gojsonq) - 一个用于查询 JSON 数据的简单 Go 包。
- [play](https://github.com/paololazzari/play) - 一个 TUI 游乐场，用于试验你喜欢的程序，如 grep、sed、awk、jq 和 yq。
- [rql](https://github.com/a8m/rql) - REST API 的资源查询语言。
- [jsonql](https://github.com/elgs/jsonql) - Golang 中的 JSON 查询表达式库。
- [gnata](https://github.com/RecoLabs/gnata) - JSONata 2.x 查询与转换语言的纯 Go 实现。
- [jsonslice](https://github.com/bhmj/jsonslice) - 支持高级过滤的 JSONPath 查询。
- [rqp](https://github.com/timsolov/rest-query-parser) - REST API 的查询解析器。直接在查询中支持过滤、验证以及 `AND`、`OR` 操作。
- [mql](https://github.com/hashicorp/mql) - 模型查询语言（mql）是用于数据库模型的查询语言。
- [goven](https://github.com/SeldonIO/goven) - 适用于任何数据库模式的即插即用查询语言。
- [api-fu](https://github.com/ccbrown/api-fu) - 全面的 GraphQL 实现。
- [straf](https://github.com/SonicRoshan/straf) - 轻松将 Golang 结构体转换为 GraphQL 对象。
- [jsonpath](https://github.com/AsaiYusuke/jsonpath) - 基于 JSONPath 语法检索 JSON 部分的查询库。
- [gws](https://github.com/Zaba505/gws) - Apollo 的“基于 WebSocket 的 GraphQL”客户端与服务器实现。
- [grapher](https://github.com/reaganiwadha/grapher) - 利用 Go 泛型构建 GraphQL 字段，并提供额外实用工具和功能。
:::

::: masonry
## 模板引擎
> 用于模板化和词法分析的库和工具。
- [templ](https://github.com/a-h/templ) - 一种具有出色开发者工具的 HTML 模板语言。
- [quicktemplate](https://github.com/valyala/quicktemplate) - 快速、强大且易于使用的模板引擎。将模板转换为 Go 代码，然后编译。
- [pongo2](https://github.com/flosch/pongo2) - 类似 Django 的 Go 模板引擎。
- [maroto](https://github.com/johnfercher/maroto) - 一种创建 PDF 的 maroto 方式。Maroto 受 Bootstrap 启发，并使用 gofpdf。快速且简单。
- [jet](https://github.com/CloudyKit/jet) - Jet 模板引擎。
- [fasttemplate](https://github.com/valyala/fasttemplate) - 简单快速的模板引擎。替换模板占位符的速度比 [text/template](https://golang.org/pkg/text/template/) 快 10 倍。
- [Razor](https://github.com/sipin/gorazor) - Golang 的 Razor 视图引擎。
- [ego](https://github.com/benbjohnson/ego) - 轻量级模板语言，让你用 Go 编写模板。模板会被转换为 Go 代码并编译。
- [goview](https://github.com/foolin/goview) - Goview 是一个基于 golang html/template 的轻量级、极简且地道的模板库，用于构建 Go Web 应用。
- [liquid](https://github.com/osteele/liquid) - Shopify Liquid 模板的 Go 实现。
- [sprout](https://github.com/go-sprout/sprout) - Go 模板的有用模板函数。
- [Soy](https://github.com/robfig/soy) - 遵循[官方规范](https://developers.google.com/closure/templates/)的 Go 闭包模板（即 Soy 模板）。
- [bagme](https://github.com/boxesandglue/bagme) - 纯 Go 实现 HTML/CSS 到 PDF 渲染，具有 TeX 质量的排版。
- [gox](https://github.com/doors-dev/gox) - HTML 模板作为 Go 的一等表达式，并支持无缝的编辑器支持。
- [got](https://github.com/goradd/got) - 受 Hero 和 Fasttemplate 启发的 Go 代码生成器。支持包含文件、自定义标签定义、注入 Go 代码、语言翻译等功能。
- [tbd](https://github.com/lucasepe/tbd) - 一种使用占位符创建文本模板的非常简单的方法——暴露额外的内置 Git 仓库元数据。
- [liquidgo](https://github.com/Notifuse/liquidgo) - Shopify Liquid 模板引擎的完整 Go 实现。
- [templator](https://github.com/alesr/templator) - Go 的类型安全 HTML 模板渲染引擎。
- [gomponents](https://www.gomponents.com) - 纯 Go 编写的 HTML 5 组件，看起来像这样：`func(name string) g.Node { return Div(Class("headline"), g.Textf("Hi %v!", name)) }`。
- [htmgo](https://htmgo.dev) - 使用 go + htmx 构建简单且可扩展的系统。
:::

::: masonry
## Go 工具
- [go-swagger](https://github.com/go-swagger/go-swagger) - Go 语言的 Swagger 2.0 实现。Swagger 是 RESTful API 的一种简单而强大的表示方式。
- [go-callvis](https://github.com/TrueFurby/go-callvis) - 使用 dot 格式可视化你的 Go 程序调用图。
- [OctoLinker](https://github.com/OctoLinker/browser-extension) - 使用 GitHub 的 OctoLinker 浏览器扩展高效浏览 go 文件。
- [lensm](https://github.com/loov/lensm) - Go 汇编与源码查看器。
- [go-size-analyzer](https://github.com/Zxilly/go-size-analyzer) - 分析并可视化编译后的 Golang 二进制文件中依赖的大小，深入了解它们对最终构建的影响。
- [richgo](https://github.com/kyoh86/richgo) - 用文本装饰丰富 `go test` 的输出。
- [govisual](https://github.com/doganarif/govisual) - 零配置、纯 Go 的 HTTP 请求可视化与调试器，用于本地 Go Web 开发。
- [MoniGO](https://github.com/iyashjayesh/monigo) - 一个面向 Go 应用的性能监控库。它提供应用性能的实时洞察！🚀
- [rts](https://github.com/galeone/rts) - RTS：响应转结构体。从服务器响应生成 Go 结构体。
- [roumon](https://github.com/becheran/roumon) - 通过命令行界面监控所有活跃 goroutine 的当前状态。
- [godbg](https://github.com/tylerwince/godbg) - 实现 Rust 的 `dbg!` 宏，用于开发期间快速便捷的调试。
- [typex](https://github.com/dtgorski/typex) - 检查 Go 类型及其传递依赖，或者将结果导出为 TypeScript 值对象（或类型）声明。
- [gotestdox](https://github.com/bitfield/gotestdox) - 将 Go 测试结果以可读的句子形式展示。
- [gothanks](https://github.com/psampaz/gothanks) - GoThanks 自动为你的 go.mod GitHub 依赖项加星标，以此向维护者表达感谢。
- [gotutor](https://github.com/ahmedakef/gotutor) - 在线 Go 调试器与可视化工具。
- [igo](https://github.com/rocketlaunchr/igo) - 一个 igo 到 go 的转译器（为 Go 语言带来新语言特性！）
- [docs](https://github.com/go-oas/docs) - 为 GO 项目自动生成 RESTful API 文档——符合 Open API 规范标准。
- [gomodrun](https://github.com/dustinblackman/gomodrun/) - Go 工具，用于执行并缓存 go.mod 文件中包含的二进制文件。
- [decouple](https://github.com/bobg/decouple) - 查找可以用接口类型泛化的“过度指定”函数参数。
- [modver](https://github.com/bobg/modver) - 比较两个版本的 Go 模块，根据 [semver](https://semver.org/) 规则检查所需的版本号变更（主版本、次版本或补丁级别）。
- [textra](https://github.com/ravsii/textra) - 提取 Go 结构体字段名、类型和标签，用于过滤和导出。
- [gofindimpl](https://github.com/psyb0t/gofindimpl) - 在代码库中查找实现给定 Go 接口的所有结构体。
- [go-template-playground](https://bartventer.github.io/go-template-playground/) - 用于创建和测试 Go 模板的交互式环境。
- [gotemplate.io](https://gotemplate.io/) - 在线工具，实时预览 `text/template` 模板。
:::

::: masonry
## 机器学习
> 机器学习库。
- [gorse](https://github.com/gorse-io/gorse) - 用 Go 编写的基于协同过滤的离线推荐系统后端。
- [GoLearn](https://github.com/sjwhitworth/golearn) - Go 通用机器学习库。
- [gorgonia](https://github.com/gorgonia/gorgonia) - 基于图的计算库，类似 Theano，为 Go 提供构建各种机器学习和神经网络算法的原语。
- [gosseract](https://github.com/otiai10/gosseract) - Go 的 OCR（光学字符识别）包，使用 Tesseract C++ 库。
- [m2cgen](https://github.com/BayesWitnesses/m2cgen) - 一个 CLI 工具，将训练好的经典机器学习模型转换为零依赖的原生 Go 代码，用 Python 编写并支持 Go 语言。
- [tfgo](https://github.com/galeone/tfgo) - 易于使用的 Tensorflow 绑定：简化官方 Tensorflow Go 绑定的使用。在 Go 中定义计算图，加载并执行 Python 训练的模型。
- [GoMLX](https://github.com/gomlx/gomlx) - Go 加速机器学习框架。
- [goml](https://github.com/cdipaolo/goml) - Go 中的在线机器学习。
- [onnx-go](https://github.com/owulveryck/onnx-go) - Go 对开放神经网络交换（ONNX）的接口。
- [eaopt](https://github.com/MaxHalford/eaopt) - 一个进化优化库。
- [bayesian](https://github.com/jbrukh/bayesian) - Golang 的朴素贝叶斯分类。
- [ocrserver](https://github.com/otiai10/ocrserver) - 一个简单的 OCR API 服务器，可通过 Docker 和 Heroku 轻松部署。
- [CloudForest](https://github.com/ryanbressler/CloudForest) - 纯 Go 编写的快速、灵活、多线程决策树集成机器学习库。
- [hugot](https://github.com/knights-analytics/hugot) - 基于 onnxruntime 的 golang Huggingface transformer 流水线。
- [gobrain](https://github.com/goml/gobrain) - 用 Go 编写的神经网络。
- [go-deep](https://github.com/patrikeh/go-deep) - 功能丰富的 Go 神经网络库。
- [regommend](https://github.com/muesli/regommend) - 推荐与协同过滤引擎。
- [Goptuna](https://github.com/c-bata/goptuna) - 用 Go 编写的黑盒函数贝叶斯优化框架。一切将被优化。
- [goga](https://github.com/tomcraven/goga) - Go 遗传算法库。
- [goRecommend](https://github.com/timkaye11/goRecommend) - 用 Go 编写的推荐算法库。
- [go-galib](https://github.com/thoj/go-galib) - 用 Go / golang 编写的遗传算法库。
- [shield](https://github.com/eaigner/shield) - Go 的贝叶斯文本分类器，支持灵活的分词器和存储后端。
- [born](https://github.com/born-ml/born) - 受 Burn（Rust）启发的深度学习框架，支持自动求导、类型安全张量以及零 CGO GPU 加速。
- [go-fann](https://github.com/white-pony/go-fann) - Go 对快速人工神经网络（FANN）库的绑定。
- [goscore](https://github.com/asafschers/goscore) - Go 的 PMML 评分 API。
- [GoMind](https://github.com/surenderthakran/gomind) - Go 中的简化神经网络库。
- [fonet](https://github.com/Fontinalis/fonet) - 用 Go 编写的深度神经网络库。
- [gonet](https://github.com/dathoangnd/gonet) - Go 神经网络。
- [libsvm](https://github.com/datastream/libsvm) - libsvm golang 版本，基于 LIBSVM 3.14 的衍生作品。
- [neural-go](https://github.com/schuyler/neural-go) - Go 实现的多层感知机网络，通过反向传播进行训练。
- [go-pr](https://github.com/daviddengcn/go-pr) - Go 语言模式识别包。
- [randomforest](https://github.com/malaschitz/randomForest) - 易于使用的 Go 随机森林库。
- [Varis](https://github.com/Xamber/Varis) - Golang 神经网络。
- [go-cluster](https://github.com/e-XpertSolutions/go-cluster) - Go 实现的 k-modes 和 k-prototypes 聚类算法。
- [godist](https://github.com/e-dard/godist) - 各种概率分布及相关方法。
- [ddt](https://github.com/sgrodriguez/ddt) - 动态决策树，可创建自定义规则树。
- [Anneal](https://github.com/georgebuilds/anneal) - Go 中的机器学习编译器，从零移植 tinygrad，带有 WebGPU 后端。
- [evoli](https://github.com/khezen/evoli) - 遗传算法与粒子群优化库。
- [catboost-cgo](https://github.com/mirecl/catboost-cgo) - 快速、可扩展、高性能的决策树梯度提升库。使用 Cgo 实现 Golang 对 CatBoost 模型的极速推理。
- [probab](https://github.com/ThePaw/probab) - 概率分布函数。贝叶斯推断。纯 Go 编写。
- [datatrax](https://github.com/rbmuller/datatrax) - 纯 Go 实现的数据工程与经典机器学习工具包，支持批处理、类型转换及 7 种算法，零依赖。
:::

::: masonry
## 地理
> 地理工具和服务器
- [Tile38](https://github.com/tidwall/tile38) - 具有空间索引和实时地理围栏的地理位置数据库。
- [S2 geometry](https://github.com/golang/geo) - Go 中的 S2 几何库。
- [mbtileserver](https://github.com/consbio/mbtileserver) - 一个基于 Go 的简单服务器，用于存储为 mbtiles 格式的地图瓦片。
- [geoos](https://github.com/spatial-go/geoos) - 提供空间数据和几何算法的库。
- [osm](https://github.com/paulmach/osm) - 用于读取、写入和处理 OpenStreetMap 数据及 API 的库。
- [H3](https://github.com/uber/h3-go) - H3 的 Go 绑定，H3 是一种分层六边形地理空间索引系统。
- [godal](https://github.com/airbusgeo/godal) - GDAL 的 Go 封装。
- [simplefeatures](https://github.com/peterstace/simplefeatures) - simplesfeatures 是一个 2D 几何库，提供模拟几何的 Go 类型以及对其进行操作的算法。
- [WGS84](https://github.com/wroge/wgs84) - 坐标转换和变换库（ETRS89、OSGB36、NAD83、RGF93、Web Mercator、UTM）。
- [geoserver](https://github.com/hishamkaram/geoserver) - geoserver 是一个 Go 包，用于通过 GeoServer REST API 操作 GeoServer 实例。
- [pbf](https://github.com/maguro/pbf) - OpenStreetMap PBF golang 编码器/解码器。
- [gismanager](https://github.com/hishamkaram/gismanager) - 将您的 GIS 数据（矢量数据）发布到 PostGIS 和 Geoserver。
- [S2 geojson](https://github.com/pantrif/s2-geojson) - 将 geojson 转换为 s2 单元，并在地图上演示一些 S2 几何特性。
- [Web-Mercator-Projection](https://github.com/jorelosorio/web-mercator-projection) - 一个项目，可轻松使用和转换 LonLat、Point 和 Tile，以使用 Web Mercator 投影在地图上显示信息、标记等。
- [H3 GeoJSON](https://github.com/mmadfox/go-geojson2h3) - H3 索引与 GeoJSON 之间的转换工具。
- [H3GeoDist](https://github.com/mmadfox/go-h3geo-dist) - 通过虚拟节点分发 Uber H3geo 单元。
- [borders](https://github.com/kpfaulkner/borders) - 检测图像边界并转换为 GeoJSON 以用于 GIS 操作。
- [geo-engine-go](https://github.com/AlexG695/geo-engine-go) - GeoEngine 的官方 Go SDK，提供高性能地理空间数据摄取，延迟低至个位数毫秒。
:::

::: masonry
## 包管理
> 依赖和包管理的官方工具
- [syft](https://github.com/anchore/syft) - 用于从容器镜像和文件系统生成软件物料清单（SBOM）的 CLI 工具和 Go 库。
- [gup](https://github.com/nao1215/gup) - 更新由 "go install" 安装的二进制文件。
- [modup](https://github.com/chaindead/modup) - Go 依赖更新的终端 UI，具有过时模块检测和选择性升级功能。
- [go modules](https://golang.org/cmd/go/#hdr-Modules__module_versions__and_more) - 模块是源代码交换和版本控制的单位。go 命令直接支持模块操作，包括记录和解析对其他模块的依赖。
:::

::: masonry
## 物联网（IoT）
> 用于 IoT 设备编程的库。
- [gobot](https://github.com/hybridgroup/gobot/) - Gobot 是一个用于机器人、物理计算和物联网的框架。
- [flogo](https://github.com/tibcosoftware/flogo) - Project Flogo 是一个面向物联网边缘应用与集成的开源框架。
- [ekuiper](https://github.com/lf-edge/ekuiper) - 面向物联网边缘的轻量级数据流处理引擎。
- [rulego](https://github.com/rulego/rulego) - RuleGo 是一个轻量级、高性能、可嵌入、可编排的组件化规则引擎，专为物联网边缘设计。
- [shifu](https://github.com/Edgenesis/shifu) - 基于 Kubernetes 原生的物联网开发框架。
- [gatt](https://github.com/paypal/gatt) - Gatt 是一个用于构建低功耗蓝牙外设的 Go 包。
- [connectordb](https://github.com/connectordb/connectordb) - 用于量化自我与物联网的开源平台。
- [devices](https://github.com/goiot/devices) - 面向 IoT 设备的库套件，实验性，基于 x/exp/io。
- [huego](https://github.com/amimof/huego) - 一个功能全面的 Philips Hue 客户端库，使用 Go 编写。
- [sensorbee](https://github.com/sensorbee/sensorbee) - 面向物联网的轻量级流处理引擎。
- [smart-home](https://github.com/e154/smart-home) - 用于物联网自动化的软件包。
- [iot](https://github.com/vaelen/iot/) - IoT 是一个用于实现 Google IoT Core 设备的简单框架。
- [eywa](https://github.com/xcodersun/eywa) - Project Eywa 本质上是一个连接管理器，用于跟踪已连接的设备。
- [periph](https://periph.io/) - 外设 I/O 接口，用于与底层板级设施交互。
:::

::: masonry
## 文件处理
> 用于处理文件和文件系统的库。
- [pdfcpu](https://github.com/pdfcpu/pdfcpu) - PDF 处理器。
- [afero](https://github.com/spf13/afero) - 面向 Go 的文件系统抽象系统。
- [gdu](https://github.com/dundee/gdu) - 带控制台界面的磁盘用量分析工具。
- [go-wkhtmltopdf](https://github.com/SebastiaanKlippert/go-wkhtmltopdf) - 一个将 HTML 模板转换为 PDF 文件的包。
- [notify](https://github.com/rjeczalik/notify) - 具有简单 API 的文件系统事件通知库，类似于 os/signal。
- [copy](https://github.com/otiai10/copy) - 递归复制目录。
- [gofs](https://github.com/no-src/gofs) - 开箱即用的跨平台实时文件同步工具。
- [afs](https://github.com/viant/afs) - Go 的抽象文件存储（mem、scp、zip、tar、云：s3、gs）。
- [vfs](https://github.com/C2FO/vfs) - 一个可插拔、可扩展且固执己见的 Go 文件系统功能集，支持多种文件系统类型，如 os、S3 和 GCS。
- [go-exiftool](https://github.com/barasher/go-exiftool) - ExifTool 的 Go 绑定，ExifTool 是用于从文件（图片、PDF、Office 等）中提取尽可能多元数据（EXIF、IPTC 等）的知名库。
- [iso9660](https://github.com/kdomanski/iso9660) - 用于读取和创建 ISO9660 磁盘映像的包。
- [fastwalk](https://github.com/charlievieth/fastwalk) - 快速并行目录遍历库（由 [fzf](https://github.com/junegunn/fzf) 使用）。
- [go-csv-tag](https://github.com/artonge/go-csv-tag) - 使用标签加载 CSV 文件。
- [parquet](https://github.com/parsyl/parquet) - 读写 [parquet](https://parquet.apache.org) 文件。
- [checksum](https://github.com/codingsince1985/checksum) - 计算大文件的消息摘要，如 MD5、SHA256、SHA1、CRC 或 BLAKE2s。
- [skywalker](https://github.com/dixonwille/skywalker) - 允许轻松并发遍历文件系统的包。
- [opc](https://github.com/qmuntal/opc) - 用于 Go 加载开放打包约定（OPC）文件。
- [gulter](https://github.com/adelowo/gulter) - 一个简单的 HTTP 中间件，自动处理所有文件上传需求。
- [baraka](https://github.com/xis/baraka) - 一个轻松处理 HTTP 文件上传的库。
- [gxpdf](https://github.com/coregx/gxpdf) - 用于 Go 的现代全生命周期 PDF 库——解析、提取表格、生成和签署文档，零 CGO 依赖。
- [go-gtfs](https://github.com/artonge/go-gtfs) - 在 Go 中加载 GTFS 文件。
- [flop](https://github.com/homedepot/flop) - 旨在与 [GNU cp](https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html) 功能对等的文件操作库。
- [gut/yos](https://github.com/1set/gut) - 用于文件操作（如复制、移动、比较、列出文件、目录和符号链接）的简单可靠包。
- [higgs](https://github.com/dastoori/higgs) - 一个微小的跨平台 Go 库，用于隐藏/取消隐藏文件和目录。
- [todotxt](https://github.com/1set/todotxt) - 用于 Gina Trapani 的 [_todo.txt_](http://todotxt.org/) 文件的 Go 库，支持解析和操作 [_todo.txt 格式_](https://github.com/todotxt/todo.txt) 的任务列表。
- [go-decent-copy](https://github.com/hugocarreira/go-decent-copy) - 为人类设计的文件复制工具。
- [pathtype](https://github.com/jonchun/pathtype) - 将路径视为独立类型，而不是使用字符串。
- [goflat](https://github.com/lzambarda/goflat) - 上下文感知的通用平面文件编组器/解编组器。
- [gopdfrab](https://github.com/voidrab/gopdfrab) - 用于 Go 的 PDF/A 处理。
:::

::: masonry
## 数据集成框架
> 用于执行 ELT / ETL 的框架
- [Benthos](https://github.com/benthosdev/benthos) - 多种协议之间的消息流桥接。
- [CloudQuery](http://github.com/cloudquery/cloudquery) - 一个具有可插拔架构的高性能 ELT 数据集成框架。
- [omniparser](https://github.com/jf-tech/omniparser) - 一个多功能的 ETL 库，以流式方式解析文本输入（CSV/txt/JSON/XML/EDI/X12/EDIFACT 等），并使用数据驱动的模式将数据转换为 JSON 输出。
- [confluence2md](https://github.com/gkoos/confluence2md) - Confluence 到 Markdown 的爬虫与转换器。
:::

::: masonry
## 生成器
> 用于生成 Go 代码的工具。
- [oapi-codegen](https://github.com/deepmap/oapi-codegen) - 该包包含一组工具，用于基于 OpenAPI 3.0 API 定义生成 Go 服务样板代码。
- [go-linq](https://github.com/ahmetalpbalkan/go-linq) - Go 的 .NET LINQ 风格查询方法。
- [jennifer](https://github.com/dave/jennifer) - 无需模板生成任意 Go 代码。
- [GoWrap](https://github.com/hexdigest/gowrap) - 使用简单模板为 Go 接口生成装饰器。
- [goderive](https://github.com/awalterschulze/goderive) - 从输入类型派生函数。
- [go-enum](https://github.com/abice/go-enum) - 根据代码注释生成枚举代码。
- [goverter](https://github.com/jmattheis/goverter) - 通过定义接口生成转换器。
- [interfaces](https://github.com/rjeczalik/interfaces) - 用于生成接口定义的命令行工具。
- [copygen](https://github.com/switchupcb/copygen) - 基于 Go 类型生成任意代码，包括默认无反射的类型到类型转换器（复制代码）。
- [apispec](https://github.com/ehabterra/apispec) - 无需注解即可从 Go 代码生成 OpenAPI 3.1 规范，并提供浏览器 UI 用于配置、预览和探索调用图。
- [convergen](https://github.com/reedom/convergen) - 功能丰富的类型到类型复制代码生成器。
- [generis](https://github.com/senselogic/GENERIS) - 提供泛型、自由形式宏、条件编译和 HTML 模板的代码生成工具。
- [go-apispec](https://github.com/antst/go-apispec) - 通过静态分析从 Go 源代码生成 OpenAPI 3.1 规范，并自动检测框架。
- [protoc-gen-httpgo](https://github.com/MUlt1mate/protoc-gen-httpgo) - 从 protobuf 生成 HTTP 服务器和客户端。
- [typeregistry](https://github.com/xiaoxin01/typeregistry) - 用于动态创建类型的库。
- [go-enum-encoding](https://github.com/nikolaydubina/go-enum-encoding) - 根据代码注释生成枚举编码代码。
- [protoc-gen-mcp](https://github.com/easyp-tech/protoc-gen-mcp) - 从 Protocol Buffers 生成类型化的 MCP 工具、提示和资源。
:::

::: masonry
## 科学与数据分析
> 用于科学计算和数据分析的库。
- [gonum](https://github.com/gonum/gonum) - Gonum 是一组用于 Go 编程语言的数值库，包含矩阵、统计、优化等库。
- [stats](https://github.com/montanaflynn/stats) - 提供 Golang 标准库所缺失的常用函数的统计包。
- [gonum/plot](https://github.com/gonum/plot) - gonum/plot 提供了在 Go 中构建和绘制图形的 API。
- [gosl](https://github.com/cpmech/gosl) - Go 科学库，涵盖线性代数、FFT、几何、NURBS、数值方法、概率、优化、微分方程等。
- [streamtools](https://github.com/nytlabs/streamtools) - 用于处理数据流的通用图形化工具。
- [dataframe-go](https://github.com/rocketlaunchr/dataframe-go) - 用于机器学习和统计的数据框（类似于 pandas）。
- [orb](https://github.com/paulmach/orb) - 二维几何类型，支持裁剪、GeoJSON 和 Mapbox Vector Tile。
- [go-dsp](https://github.com/mjibson/go-dsp) - 用于 Go 的数字信号处理。
- [chart](https://github.com/vdobler/chart) - 用于 Go 的简单图表绘制库，支持多种图形类型。
- [graph](https://github.com/yourbasic/graph) - 基础图算法库。
- [goraph](https://github.com/gyuho/goraph) - 纯 Go 图论库（数据结构、算法可视化）。
- [Poly](https://github.com/bebop/poly) - 一个用于工程生物学的 Go 包。
- [taxonkit](https://github.com/shenwei356/taxonkit) - 实用高效的 NCBI 分类学工具包；支持查询谱系、重新格式化、过滤以及创建自定义 taxdump 文件。
- [ewma](https://github.com/VividCortex/ewma) - 指数加权移动平均。
- [calendarheatmap](https://github.com/nikolaydubina/calendarheatmap) - 受 Github 贡献活动启发的纯 Go 日历热图。
- [go-hep](https://github.com/go-hep/hep) - 一组用于轻松执行高能物理分析的库和工具。
- [TextRank](https://github.com/DavidBelicza/TextRank) - Golang 实现的 TextRank，具有可扩展特性（摘要、加权、短语提取）并支持多线程（goroutine）。
- [sparse](https://github.com/james-bowman/sparse) - 用于线性代数的 Go 稀疏矩阵格式，支持科学与机器学习应用，与 gonum 矩阵库兼容。
- [gograph](https://github.com/hmdsefi/gograph) - 一个 golang 泛型图库，提供数学图论和算法。
- [go-estimate](https://github.com/milosgajdos/go-estimate) - Go 中的状态估计和滤波算法。
- [pagerank](https://github.com/alixaxel/pagerank) - 用 Go 实现的加权 PageRank 算法。
- [jsonl-graph](https://github.com/nikolaydubina/jsonl-graph) - 支持 graphviz 的 JSONL 图操作工具。
- [insyra](https://github.com/HazelnutParadise/insyra) - 数据分析库，支持统计、可视化、Parquet 和 Python 集成。
- [geom](https://github.com/skelterjohn/geom) - Golang 的二维几何。
- [evaler](https://github.com/soniah/evaler) - 简单的浮点算术表达式求值器。
- [decimal](https://github.com/db47h/decimal) - decimal 包实现了任意精度的十进制浮点运算。
- [triangolatte](https://github.com/tchayen/triangolatte) - 二维三角剖分库。允许将线和多边形（均基于点）转换为 GPU 语言。
- [goent](https://github.com/kzahedi/goent) - 熵度量的 Go 实现。
- [hdf5](https://github.com/scigolib/hdf5) - 用于科学数据存储和交换的 HDF5 文件格式的纯 Go 实现。
- [piecewiselinear](https://github.com/sgreben/piecewiselinear) - 微型线性插值库。
- [simd](https://github.com/tphakala/simd) - 原生 Go 向量与 SIMD 切片操作，支持多架构汇编加速。
- [godesim](https://github.com/soypat/godesim) - 用于基于事件的模拟的扩展/多变量 ODE 求解器框架，具有简单的 API。
- [GoStats](https://github.com/OGFris/GoStats) - GoStats 是一个开源的 GoLang 数学统计库，主要用于机器学习领域，覆盖了大多数统计度量函数。
- [ode](https://github.com/ChristopherRabotin/ode) - 常微分方程（ODE）求解器，支持扩展状态和基于通道的迭代停止条件。
- [PiHex](https://github.com/claygod/PiHex) - 实现十六进制数 Pi 的 "Bailey-Borwein-Plouffe" 算法。
- [topk](https://github.com/keilerkonzept/topk) - 基于 HeavyKeeper 算法的滑动窗口和常规 Top-K 草图。
- [bradleyterry](https://github.com/seanhagen/bradleyterry) - 提供用于成对比较的 Bradley-Terry 模型。
- [matlab](https://github.com/scigolib/matlab) - 纯 Go 库，无需 CGO 即可读写 MATLAB .mat 文件（v5-v7.3）。
- [rootfinding](https://github.com/khezen/rootfinding) - 用于求解二次函数根的求根算法库。
- [go-gt](https://github.com/ThePaw/go-gt) - 用 Go 语言编写的图论算法。
- [MatProInterface.go](https://github.com/MatProGo-dev/MatProInterface.go) - MatProInterface.go 是一个开源包，用于在 Go 中定义数学规划（例如凸优化问题）。
- [entitydebs](https://github.com/ndabAP/entitydebs) - 一个社会科学工具，通过内置的依赖解析器以编程方式分析非虚构文本中的实体。
- [matrix](https://github.com/Arceus-7/matrix) - 一个干净、通用、零依赖的 Go 矩阵数学包，支持算术、分解和线性系统求解。
:::

::: masonry
## 版本控制
> 用于版本控制的库。
- [go-git](https://github.com/go-git/go-git) - 纯 Go 编写的高度可扩展 Git 实现。
- [hercules](https://github.com/src-d/hercules) - 从 Git 仓库历史中获取高级洞察。
- [git2go](https://github.com/libgit2/git2go) - libgit2 的 Go 绑定。
- [ggc](https://github.com/bmf-san/ggc) - 一个 Git CLI 工具，具有传统命令行和交互式增量搜索界面、工作流支持以及可配置的键绑定。
- [githooks](https://github.com/gabyx/githooks) - 支持版本控制与自动更新的仓库级和共享 Git 钩子。
- [go-vcs](https://github.com/sourcegraph/go-vcs) - 在 Go 中操作和检查 VCS 仓库。
- [froggit-go](https://github.com/jfrog/froggit-go) - Froggit-Go 是一个 Go 库，允许对 VCS 提供商执行操作。
- [git-courer](https://github.com/Alejandro-M-P/git-courer) - 用于 Git 操作的本地 MCP 服务器，使用 Ollama 节省令牌并防止秘密泄露。
- [gitty](https://github.com/Omibranch/gitty) - 单二进制 Git/GitHub CLI，用一条命令替代 add→commit→push；语法可读，无外部依赖。
- [hgo](https://github.com/beyang/hgo) - Hgo 是一组 Go 包，提供对本地 Mercurial 仓库的读取访问。
- [cli](https://gitlab.com/gitlab-org/cli) - 一个开源的 GitLab 命令行工具，将 GitLab 的酷炫功能带到你的命令行中。
:::

::: masonry
## 图像
> 用于操作图像的库。
- [gocv](https://github.com/hybridgroup/gocv) - 基于 OpenCV 3.3+ 的计算机视觉 Go 包。
- [imaginary](https://github.com/h2non/imaginary) - 用于图像缩放的高速简单 HTTP 微服务。
- [imaging](https://github.com/disintegration/imaging) - 简单的 Go 图像处理包。
- [gg](https://github.com/fogleman/gg) - 纯 Go 中的 2D 渲染。
- [gowitness](https://github.com/sensepost/gowitness) - 通过命令行使用 Go 和 headless Chrome 对网页截图。
- [bild](https://github.com/anthonynsimon/bild) - 纯 Go 中的图像处理算法集合。
- [imagor](https://github.com/cshum/imagor) - 使用 libvips 的快速、安全图像处理服务器和 Go 库。
- [ln](https://github.com/fogleman/ln) - Go 中的 3D 线条艺术渲染。
- [bimg](https://github.com/h2non/bimg) - 使用 libvips 进行快速高效图像处理的小型包。
- [picfit](https://github.com/thoas/picfit) - 用 Go 编写的图像缩放服务器。
- [svgo](https://github.com/ajstarks/svgo) - 用于 SVG 生成的 Go 语言库。
- [pt](https://github.com/fogleman/pt) - 用 Go 编写的路径追踪引擎。
- [imagick](https://github.com/gographics/imagick) - ImageMagick 的 MagickWand C API 的 Go 绑定。
- [smartcrop](https://github.com/muesli/smartcrop) - 为任意图像和裁剪尺寸寻找最佳裁剪区域。
- [canvas](https://github.com/tdewolff/canvas) - 矢量图形转 PDF、SVG 或光栅化图像。
- [gift](https://github.com/disintegration/gift) - 图像处理滤镜包。
- [govips](https://github.com/davidbyttow/govips) - Go 的极速图像处理与缩放库。
- [geopattern](https://github.com/pravj/geopattern) - 从字符串创建美丽的生成式图像图案。
- [stegify](https://github.com/DimitarPetrov/stegify) - Go 的 LSB 隐写工具，能够将任意文件隐藏在图像中。
- [image2ascii](https://github.com/qeesung/image2ascii) - 将图像转换为 ASCII。
- [go-qrcode](https://github.com/yeqown/go-qrcode) - 生成个性化样式的二维码，可调整颜色、块大小、形状和图标。
- [goimagehash](https://github.com/corona10/goimagehash) - Go 感知图像哈希包。
- [govatar](https://github.com/o1egl/govatar) - 用于生成趣味头像的库和命令行工具。
- [mort](https://github.com/aldor007/mort) - 用 Go 编写的存储和图像处理服务器。
- [nativewebp](https://github.com/HugoSmits86/nativewebp) - 零外部依赖的 Go 原生 WebP 编码器。
- [go-nude](https://github.com/koyachi/go-nude) - 使用 Go 进行裸体检测。
- [steganography](https://github.com/auyer/steganography) - 用于 LSB 隐写术的纯 Go 库。
- [go-webp](https://github.com/kolesa-team/go-webp) - 使用 libwebp 对 WebP 图片进行编码和解码的库。
- [transformimgs](https://github.com/Pixboost/transformimgs) - Transformimgs 使用下一代格式为 Web 调整和优化图像。
- [gltf](https://github.com/qmuntal/gltf) - 高效且健壮的 glTF 2.0 读取器、写入器和验证器。
- [mergi](https://github.com/noelyahan/mergi) - 用于图像操作（合并、裁剪、缩放、水印、动画）的工具和 Go 库。
- [darkroom](https://github.com/gojek/darkroom) - 具有可更改存储后端和图像处理引擎的图像代理，注重速度和弹性。
- [gogpu/gg](https://github.com/gogpu/gg) - GPU 加速的 2D 渲染，提供类似 Canvas 的 API，零 CGO（属于 [GoGPU](https://github.com/gogpu) 纯 Go 图形生态系统的一部分）。
- [img](https://github.com/hawx/img) - 图像处理工具集。
- [go-cairo](https://github.com/ungerik/go-cairo) - cairo 图形库的 Go 绑定。
- [cameron](https://github.com/aofei/cameron) - Go 的头像生成器。
- [color-extractor](https://github.com/marekm4/color-extractor) - 无外部依赖的主色提取器。
- [webp-server](https://github.com/mehdipourfar/webp-server) - 简单且极简的图像服务器，能够存储、缩放、转换和缓存图像。
- [gridder](https://github.com/shomali11/gridder) - 基于网格的 2D 图形库。
- [go-gd](https://github.com/bolknote/go-gd) - GD 库的 Go 绑定。
- [goimghdr](https://github.com/corona10/goimghdr) - Go 的 imghdr 模块，用于确定文件中的图像类型。
- [eagle-image-api](https://github.com/nicobistolfi/eagle-image-api) - 使用 libvips 的图像优化和转换 API，可部署到 AWS Lambda 和 CloudFront。
- [scout](https://github.com/jonoton/scout) - Scout 是一个独立的开源软件解决方案，用于 DIY 视频安全。
- [go-webcolors](https://github.com/jyotiska/go-webcolors) - 将 Python 的 webcolors 库移植到 Go。
- [mpo](https://github.com/donatj/mpo) - MPO 3D 照片的解码和转换工具。
:::

::: masonry
## 金融
> 会计和财务包。
- [decimal](https://github.com/shopspring/decimal) - 任意精度定点十进制数。
- [ticker](https://github.com/achannarasappa/ticker) - 终端股票监视器和持仓跟踪器。
- [go-money](https://github.com/rhymond/go-money) - Fowler 货币模式的实现。
- [indicator](https://github.com/cinar/indicator) - 技术分析库，提供金融指标、策略和回测框架。
- [bbgo](https://github.com/c9s/bbgo) - 用 Go 编写的加密货币交易机器人框架。包括常见加密货币交易所 API、标准指标、回测和许多内置策略。
- [ledger](https://github.com/formancehq/ledger) - 可编程金融账本，为资金流转应用提供基础。
- [accounting](https://github.com/leekchan/accounting) - 用于 Go 的货币和货币格式。
- [techan](https://github.com/sdcoffey/techan) - 技术分析库，提供高级市场分析和交易策略。
- [currency](https://github.com/bojanz/currency) - 处理货币金额，提供货币信息和格式化。
- [ach](https://github.com/moov-io/ach) - 用于自动清算所（ACH）文件的读取器、写入器和验证器。
- [orderbook](https://github.com/i25959341/orderbook) - Golang 实现的限价订单簿撮合引擎。
- [gobl](https://github.com/invopop/gobl) - 发票和账单文档框架。基于 JSON Schema。自动化税务计算和验证，并提供转换为全球格式的工具。
- [decimal](https://github.com/govalues/decimal) - 不可变十进制数，具有无 panic 的算术运算。
- [udecimal](https://github.com/quagmt/udecimal) - 面向金融应用的高性能、高精度、零分配定点十进制库。
- [go-finance](https://github.com/alpeb/go-finance) - 金融函数库，涵盖货币时间价值（年金）、现金流、利率转换、债券和折旧计算。
- [ofxgo](https://github.com/aclindsa/ofxgo) - 查询 OFX 服务器和/或解析响应（附命令行客户端示例）。
- [transaction](https://github.com/claygod/transaction) - 嵌入式事务性账户数据库，以多线程模式运行。
- [vat](https://github.com/dannyvankooten/vat) - 增值税号验证和欧盟增值税税率。
- [payme](https://github.com/jovandeginste/payme) - SEPA 支付的二维码生成器（ASCII 和 PNG 格式）。
- [currency](https://github.com/naughtygopher/currency) - 高性能且精确的货币计算包。
- [money](https://github.com/govalues/money) - 不可变的货币金额和汇率，支持无 panic 的算术运算。
- [dec128](https://github.com/jokruger/dec128) - 高性能 128 位定点十进制数。
- [fpmoney](https://github.com/nikolaydubina/fpmoney) - 快速且简单的 ISO4217 定点十进制货币库。
- [fpdecimal](https://github.com/nikolaydubina/fpdecimal) - 用于小型定点十进制数的快速精确序列化和算术
- [go-finance](https://github.com/pieterclaerhout/go-finance) - 用于获取汇率、通过 VIES 验证增值税号以及检查 IBAN 银行账号的模块。
- [okx-go](https://github.com/tigusigalpa/okx-go) - OKX v5 API 的 Go 客户端，包含 335 个 REST 端点、53 个 WebSocket 通道，支持泛型和自动重连。
- [bingx-go](https://github.com/tigusigalpa/bingx-go) - BingX API v3 的 Go 客户端，包含 260 多个方法、USDT-M/Coin-M 期货、现货、TradFi、WebSocket 流和跟单交易。
- [orderbook](https://github.com/intrepidkarthi/orderbook) - 可嵌入的限价订单簿和撮合引擎，具有整数精确价格、单写者核心和预写日志崩溃恢复功能。
- [telegram-wallet-go](https://github.com/tigusigalpa/telegram-wallet-go) - Telegram Wallet Pay API 的 Go 客户端，支持 HMAC-SHA256 webhook 验证，以及 net/http、Gin 和 Echo 的中间件。
- [bybit-go](https://github.com/tigusigalpa/bybit-go) - Bybit V5 API 的 Go 客户端，支持 HMAC/RSA 认证、WebSocket 流、模拟交易和 TradFi 工具。
- [glassnode-go](https://github.com/tigusigalpa/glassnode-go) - Glassnode 基础 API 的 Go 客户端，提供 25 个指标类别、类型化结构体、批量端点、时点数据，且零依赖。
- [bitget-go](https://github.com/tigusigalpa/bitget-go) - Bitget UTA API v3 的 Go 客户端，具有类型化模型、基于字符串的价格、自动重连的 WebSocket 和模拟交易。
- [kucoin-go](https://github.com/tigusigalpa/kucoin-go) - KuCoin UTA 和经典 REST 与 WebSocket API 的 Go 客户端，支持 HMAC-SHA256 认证、字符串类型价格和类型化错误层级。
- [go-nowpayments](https://github.com/matm/go-nowpayments) - 加密货币 NOWPayments API 的库。
- [paystack-sdk-go](https://github.com/samaasi/paystack-sdk-go) - Paystack API 的全面、零依赖、完全类型化的 Go SDK。
- [cnn-fear-and-greed-parse](https://github.com/wildsurfer/cnn-fear-and-greed-parse) - CNN 恐惧与贪婪指数的客户端，包含七个成分指标和约一年的每日历史数据。
- [decimal](https://github.com/aytechnet/decimal) - 高性能 64 位十进制，部分兼容 [shopspring/decimal](https://github.com/shopspring/decimal) 和 int64，包括 Weight 和 Length。
- [eu-vat-rates-data-go](https://github.com/vatnode/eu-vat-rates-data-go) - 45 个欧洲国家的增值税税率和增值税号格式，编译时嵌入，每日从欧盟委员会 TEDB 刷新。
- [decimal](https://github.com/klokare/decimal) - 固定大小、无分配的十进制类型，适用于不需要任意精度的场景。
- [swift](https://code.pfad.fr/swift/) - IBAN（国际银行账号）的离线有效性检查以及 BIC（部分国家）的检索。
:::

::: masonry
## 任务调度器
> 用于调度任务的库。
- [gocron](https://github.com/go-co-op/gocron) - 简单流畅的 Go 任务调度。这是 [jasonlvhit/gocron](https://github.com/jasonlvhit/gocron) 的积极维护分支。
- [go-quartz](https://github.com/reugn/go-quartz) - 简单、零依赖的 Go 调度库。
- [JobRunner](https://github.com/bamzi/jobrunner) - 智能且功能丰富的 cron 任务调度器，内置任务队列和实时监控。
- [gron](https://github.com/roylee0704/gron) - 使用简单的 Go API 定义基于时间的任务，Gron 的调度器将相应地运行它们。
- [gronx](https://github.com/adhocore/gronx) - Cron 表达式解析器、任务运行器和守护进程，消费类似 crontab 的任务列表。
- [goflow](https://github.com/fieldryand/goflow) - 一个简单但功能强大的 DAG 调度器和仪表盘。
- [scheduler](https://github.com/carlescere/scheduler) - Cron 任务调度变得简单。
- [tasks](https://github.com/madflojo/tasks) - 一个易于使用的 Go 进程内调度器，用于重复任务。
- [go-cron](https://github.com/rk/go-cron) - 适用于 Go 的简单 Cron 库，可以以不同间隔执行闭包或函数，从每秒一次到特定日期时间的每年一次。主要用于 Web 应用和长时间运行的守护进程。
- [cheek](https://github.com/bart6114/cheek) - 一个类似 crontab 的简单调度器，旨在以 KISS 原则处理任务调度。
- [clockwerk](https://github.com/onatm/clockwerk) - 使用简单流畅的语法调度周期性任务的 Go 包。
- [leprechaun](https://github.com/kilgaloon/leprechaun) - 支持 webhooks、cron 和经典调度的任务调度器。
- [RunWisp](https://github.com/runwisp/runwisp) - 替代 cron 和 supervisord 的单二进制程序，保留每次运行的退出码和输出，并带有 Web UI 和 TUI。
- [ofelia](https://github.com/netresearch/ofelia) - Docker 任务调度器（Docker 的 crontab）；是 mcuadros/ofelia 的分支，增加了 Web UI、任务依赖、重试和任务持久化。
- [go-cron](https://github.com/netresearch/go-cron) - Cron 任务调度器，支持运行时调度更新、每个条目的上下文、弹性中间件（重试、熔断、限流）以及可观测性钩子；是 robfig/cron 的继任者。
- [cdule](https://github.com/deepaksinghvi/cdule) - 支持数据库的任务调度库。
- [go-scheduler](https://github.com/pardnchiu/go-scheduler) - 任务调度器，支持标准 cron 表达式、自定义描述符、间隔和任务依赖。
- [sched](https://github.com/romshark/sched) - 一个能够快进时间的任务调度器。
- [cronticker](https://github.com/krayzpipes/cronticker) - 一个支持 cron 调度的 ticker 实现。
- [pending](https://github.com/kahoon/pending) - 基于 ID 的去抖任务调度器，用于延迟任务，支持取消、优雅关闭和可选并发限制。
- [scheduler](https://github.com/yuseferi/scheduler) - Go 原生分布式任务调度器，支持延迟任务、基于 Redis 的批量协调、重试、基于租约的恢复和版本化队列分区。
- [go-job](https://github.com/cybergarage/go-job) - 一个灵活且可扩展的 Go 任务调度与执行库。
- [tickstem/cron](https://github.com/tickstem/cron) - 用于调度 HTTP cron 任务的 Go 客户端，具有执行历史、失败告警，以及用于在无真实凭据情况下测试处理程序的 tsk-local。
- [tickstem/heartbeat](https://github.com/tickstem/heartbeat) - Go 客户端，用于死机开关心跳监控：每次任务运行后 ping 一个 URL，如果 ping 停止到达，则通过电子邮件收到警报。
:::

::: masonry
## 机器人构建
> 用于构建和处理机器人的库。
- [telegram-bot-api](https://github.com/go-telegram-bot-api/telegram-bot-api) - 简单干净的 Telegram 机器人客户端。
- [telebot](https://github.com/tucnak/telebot) - Telegram 机器人框架，用 Go 编写。
- [wayback](https://github.com/wabarc/wayback) - 一个用于 Telegram、Mastodon、Slack 和其他消息平台的机器人，可归档网页。
- [bot](https://github.com/go-telegram/bot) - 零依赖的 Telegram 机器人库，附带额外的 UI 组件。
- [telego](https://github.com/mymmrac/telego) - Golang 的 Telegram Bot API 库，完整实现了一对一的 API。
- [arikawa](https://github.com/diamondburned/arikawa) - Discord API 的库和框架。
- [echotron](https://github.com/NicoNex/echotron) - 一个优雅且并发的 Go Telegram 机器人库。
- [go-twitch-irc](https://github.com/gempir/go-twitch-irc) - 用于编写 twitch.tv 聊天机器人的库。
- [go-sarah](https://github.com/oklahomer/go-sarah) - 用于构建面向所需聊天服务（包括 LINE、Slack、Gitter 等）的机器人的框架。
- [slack-bot](https://github.com/innogames/slack-bot) - 为懒惰开发者准备的即用型 Slack 机器人：自定义命令、Jenkins、Jira、Bitbucket、Github...
- [go-tg](https://github.com/mr-linch/go-tg) - 根据官方文档生成的 Go 客户端库，用于访问 Telegram Bot API，包含构建复杂机器人的内置功能。
- [slacker](https://github.com/slack-io/slacker) - 易于使用的框架，用于创建 Slack 机器人。
- [TG](https://github.com/enetx/tg) - Go 的 Telegram 机器人框架。
- [micha](https://github.com/onrik/micha) - Telegram Bot API 的 Go 库。
- [Wisp](https://github.com/wisp-trading/wisp) - Go 的事件驱动交易框架。支持现货、永续合约、预测市场。多交易所（Bybit、Hyperliquid、Polymarket）。
- [ymsdk](https://github.com/rekurt/ymsdk) - Yandex Messenger Bot API 的 Go SDK，具有类型安全模型、自动重试和速率限制处理。
- [teleflow](https://github.com/kslamph/teleflow) - 简单、类型安全的 Telegram 机器人框架，具有流畅的流程和自动状态管理。
- [go-joe](https://joe-bot.net) - 一个通用机器人库，灵感来自 Hubot，但用 Go 编写。
:::

::: masonry
## 零信任
> 用于实现零信任架构的库和工具。
- [Cosign](https://github.com/sigstore/cosign) - 在 OCI 注册表中进行容器签名、验证和存储。
- [OpenZiti](https://github.com/openziti/ziti) - 一个完整的开源零信任覆盖网络。包括多种语言的众多 SDK，例如 [golang](https://github.com/openziti/sdk-golang)，允许您将零信任原则直接嵌入到您的应用程序中。[OpenZiti Test Kitchen](https://github.com/openziti-test-kitchen) 提供了许多示例供参考，包括一个零信任 SSH 客户端 - [zssh](https://github.com/openziti-test-kitchen/zssh)。
- [Spire](https://github.com/spiffe/spire) - SPIRE（SPIFFE 运行时环境）是一组 API 工具链，用于在各种托管平台上的软件系统之间建立信任。
- [in-toto](https://github.com/in-toto/in-toto-golang) - in-toto 的 Go 实现（提供了一个保护软件供应链完整性的框架）的 Python 参考实现。
- [Spiffe-Vault](https://github.com/philips-labs/spiffe-vault) - 利用 Spiffe JWT 认证与 Hashicorp Vault 实现无密钥认证。
:::

::: masonry
## UUID
> 用于处理 UUID 的库。
- [uuid](https://github.com/google/uuid) - 基于 RFC 4122 和 DCE 1.1 的 Go UUID 包：认证与安全服务。
- [ulid](https://github.com/oklog/ulid) - ULID（通用唯一字典序可排序标识符）的 Go 实现。
- [xid](https://github.com/rs/xid) - Xid 是一个全局唯一 ID 生成器库，可直接安全地用于服务器代码。
- [uuid](https://github.com/gofrs/uuid) - 通用唯一标识符（UUID）的实现。支持 UUID 的创建和解析。satori uuid 的积极维护分支。
- [wuid](https://github.com/edwingeng/wuid) - 一个极快的全局唯一数字生成器。
- [sno](https://github.com/muyo/sno) - 紧凑、可排序且快速的唯一 ID，并嵌入元数据。
- [guid](https://github.com/sdrapkin/guid) - 用于 Go 的快速加密安全 Guid 生成器（比 `uuid` 快约 10 倍）。
- [nanoid](https://github.com/aidarkhanov/nanoid) - 一个小巧高效的 Go 唯一字符串 ID 生成器。
- [goid](https://github.com/jakehl/goid) - 生成并解析符合 RFC4122 的 V4 UUID。
- [nanoid](https://github.com/sixafter/nanoid) - 高效、加密安全的生成器，用于快速并发创建 NanoID 和 UUID。
- [gouid](https://github.com/twharmon/gouid) - 仅需一次分配即可生成加密安全的随机字符串 ID。
- [uuid](https://github.com/agext/uuid) - 使用快速或加密质量的随机节点标识符生成、编码和解码 UUID v1。
- [uuidcheck](https://github.com/ashwingopalsamy/uuidcheck) - 一个轻量、无依赖的 Go 库，用于根据标准 RFC 4122 格式验证 UUID，并将 UUIDv7() 转换为 UTC 时间戳。
- [fastuuid](https://github.com/rekby/fastuuid) - 快速生成字符串或字节形式的 UUIDv4。
- [uniq](https://gitlab.com/skilstak/code/go/uniq) - 通过命令轻松生成安全、快速的唯一标识符。
:::

::: masonry
## Actor 模型
> 用于构建基于 Actor 的程序的库。
- [ProtoActor](https://github.com/asynkron/protoactor-go) - 用于 Go、C# 和 Java/Kotlin 的分布式 Actor。
- [Ergo](https://github.com/ergo-services/ergo) - 基于 Actor 的框架，具有网络透明性，用于在 Golang 中创建事件驱动架构。灵感来自 Erlang。
- [Hollywood](https://github.com/anthdm/hollywood) - 用 Golang 编写的极速轻量级 Actor 引擎。
- [Goakt](https://github.com/Tochemey/goakt) - 使用 protocol buffers 作为消息的快速分布式 Actor 框架，适用于 Golang。
- [asyncmachine-go/pkg/machine](https://github.com/pancsta/asyncmachine-go/tree/main/pkg/machine) - 图控制流库（AOP、Actor、状态机）。
:::

::: masonry
## Go 生成工具
- [gotests](https://github.com/cweill/gotests) - 从源代码生成 Go 测试。
- [xgen](https://github.com/xuri/xgen) - XSD（XML Schema Definition）解析器和 Go/C/Java/Rust/TypeScript 代码生成器。
- [hasgo](https://github.com/DylanMeeus/hasgo) - 为你的切片生成受 Haskell 启发的函数。
- [gocontracts](https://github.com/Parquery/gocontracts) - 通过将代码与文档同步，为 Go 带来设计契约。
- [gonerics](https://github.com/bouk/gonerics) - Go 中的惯用泛型。
- [options-gen](https://github.com/kazhuravlev/options-gen) - Dave Cheney 的文章“友好 API 的函数式选项”中描述的函数式选项。
- [envdoc](https://github.com/g4s8/envdoc) - 从 Go 源文件生成环境变量的文档。
- [gounit](https://github.com/hexdigest/gounit) - 使用你自己的模板生成 Go 测试。
- [sqlgen](https://github.com/anqiansong/sqlgen) - 从 SQL 文件或 DSN 生成 gorm、xorm、sqlx、bun、sql 代码。
- [generic](https://github.com/usk81/generic) - 灵活的 Go 数据类型。
- [godal](https://github.com/mafulong/godal) - 通过指定 SQL DDL 文件生成对应的 golang ORM 模型，可用于 gorm。
- [oapixconstgen](https://github.com/psyb0t/oapixconstgen) - 从 OpenAPI 规范的 x-constants 扩展生成类型化的 Go 常量。
- [re2dfa](https://gitlab.com/opennota/re2dfa) - 将正则表达式转换为有限状态机并输出 Go 源代码。
- [TOML-to-Go](https://xuri.me/toml-to-go) - 在浏览器中即时将 TOML 转换为 Go 类型。
:::

::: masonry
## 日期与时间
> 用于处理日期和时间的库。
- [carbon](https://github.com/dromara/carbon) - 一个简单、语义化且对开发者友好的 Go 时间包。
- [now](https://github.com/jinzhu/now) - Now 是 Go 的时间工具包。
- [dateparse](https://github.com/araddon/dateparse) - 无需预先知道格式即可解析日期。
- [carbon](https://github.com/uniplaces/carbon) - 简单的 Time 扩展，包含大量实用方法，移植自 PHP Carbon 库。
- [durafmt](https://github.com/hako/durafmt) - 用于 Go 的时间时长格式化库。
- [go-persian-calendar](https://github.com/yaa110/go-persian-calendar) - Go（golang）中波斯（Solar Hijri）日历的实现。
- [gostradamus](https://github.com/bykof/gostradamus) - 用于处理日期的 Go 包。
- [timeutil](https://github.com/leekchan/timeutil) - golang 的 time 包的有用扩展（Timedelta、Strftime 等）。
- [go-sunrise](https://github.com/nathan-osman/go-sunrise) - 计算给定位置的日出和日落时间。
- [iso8601](https://github.com/relvacode/iso8601) - 无需正则表达式即可高效解析 ISO8601 日期时间。
- [date](https://github.com/rickb777/date) - 增强 Time 以处理日期、日期范围、时间跨度、时间段和时刻。
- [go-str2duration](https://github.com/xhit/go-str2duration) - 将字符串转换为时长。支持 time.Duration 返回的字符串等。
- [timespan](https://github.com/SaidinWoT/timespan) - 用于处理时间间隔，定义为开始时间和时长。
- [feiertage](https://github.com/wlbr/feiertage) - 计算德国公共假日的函数集，包括针对德国各州（Bundesländer）的专门化。如复活节、圣灵降临节、感恩节等。
- [go-anytime](https://github.com/ijt/go-anytime) - 无需预先知道格式即可解析类似“next dec 22nd at 3pm”的日期/时间和类似“from today until next thursday”的范围。
- [kair](https://github.com/GuilhermeCaruso/kair) - 日期和时间 - Golang 格式化库。
- [timex](https://github.com/invzhi/timex) - 一个扩展标准库 time 的 Go 包，提供专门的日期和时间类型。
- [approx](https://github.com/goschtalt/approx) - 支持解析和打印天、周、年时长的 Duration 扩展。
- [cronrange](https://github.com/1set/cronrange) - 解析 Cron 风格的时间范围表达式，检查给定时间是否在任一范围内。
- [strftime](https://github.com/awoodbeck/strftime) - 兼容 C99 的 strftime 格式化器。
- [tuesday](https://github.com/osteele/tuesday) - 兼容 Ruby 的 Strftime 函数。
- [go-week](https://github.com/stoewer/go-week) - 处理 ISO8601 周日期的高效包。
- [go-date-fns](https://github.com/chmenegatti/go-date-fns) - 受 date-fns 启发的 Go 综合日期工具库，包含 140 多个纯函数和不可变函数。
- [go-datebin](https://github.com/deatil/go-datebin) - 一个简单的日期时间解析包。
- [go-faketime](https://github.com/harkaitz/go-faketime) - 一个简单的 `time.Now()`，支持 faketime(1) 工具。
:::

::: masonry
## 硬件
> 用于与硬件交互的库、工具和教程。
- [arduino-cli](https://github.com/arduino/arduino-cli) - 官方 Arduino CLI 和库。可独立运行，也可集成到更大的 Go 项目中。
- [go-rpio](https://github.com/stianeikeland/go-rpio) - Go 的 GPIO，不需要 cgo。
- [ghw](https://github.com/jaypipes/ghw) - Golang 硬件发现/检查库。
- [emgo](https://github.com/ziutek/emgo) - 用于嵌入式系统（如 STM32 MCU）编程的类 Go 语言。
- [sysinfo](https://github.com/zcalusic/sysinfo) - 纯 Go 库，提供 Linux 操作系统 / 内核 / 硬件系统信息。
- [goroslib](https://github.com/aler9/goroslib) - Go 的 Robot Operating System（ROS）库。
- [go-osc](https://github.com/hypebeast/go-osc) - Go 的 Open Sound Control（OSC）绑定。
- [joystick](https://github.com/0xcafed00d/joystick) - 用于读取所连接操纵杆状态的轮询 API。
- [moody](https://github.com/dinakars777/moody) - macOS 的硬件事件个性守护进程。监控 USB、充电器、盖子和其他硬件事件，并以可定制的个性进行响应。
:::

::: masonry
## 工作流框架
> 用于创建工作流的库。
- [Dagu](https://github.com/dagu-go/dagu) - 无代码工作流执行器。它执行以简单 YAML 格式定义的 DAG。
- [go-taskflow](https://github.com/noneback/go-taskflow) - 类似 taskflow 的通用任务并行编程框架，内置可视化器和分析器。
- [Cadence-client](https://github.com/uber-go/cadence-client) - 一个用于编写工作流和活动的框架，运行在 Uber 制作的 Cadence 编排引擎之上。
- [workflow](https://github.com/luno/workflow) - 与技术栈无关的事件驱动工作流框架。
- [Flowbaker](https://github.com/flowbaker/flowbaker) - 自托管执行引擎，用于构建、连接和自动化无代码工作流。
- [go-dag](https://github.com/rhosocial/go-dag) - 一个用 Go 开发的框架，管理由有向无环图描述的工作流的执行。
- [GopherFlow](https://github.com/RealZimboGuy/gopherflow) - 持久工作流引擎，内置 Web 控制台，支持 Postgres、MySQL 或 SQLite。
- [durable-go](https://github.com/agenticenv/durable-go) - 适用于单进程 Go 应用和 AI 代理的持久执行引擎，零依赖。
:::

::: masonry
## Gophers
- [Free Gophers Pack](https://github.com/MariaLetta/free-gophers-pack) - 由 Maria Letta 制作的 Gopher 图形包，包含矢量图和位图形式的插图和情感角色。
- [gophers](https://github.com/egonelbre/gophers) - 免费的 Gopher 素材。
- [gophers](https://github.com/ashleymcnamara/gophers) - Ashley McNamara 创作的 Gopher 艺术作品。
- [gopherize.me](https://github.com/matryer/gopherize.me) - 打造你自己的 Gopher。
- [gophericons](https://github.com/shalakhin/gophericons)
- [gopher-stickers](https://github.com/tenntenn/gopher-stickers)
- [gophers](https://github.com/sillecelik/go-gopher) - Gopher 毛绒玩具编织图案。
- [gopher-logos](https://github.com/GolangUA/gopher-logos) - 可爱的 Go 吉祥物标志。
- [Go-gopher-Vector](https://github.com/keygx/Go-gopher-Vector) - Go 吉祥物矢量数据 [.ai, .svg]。
- [gophers](https://github.com/rogeralsing/gophers) - 随机 Gopher 图形。
- [gophers](https://github.com/scraly/gophers) - Aurélie Vache 创作的 Gopher 作品。
:::

::: masonry
## 自然语言处理
> 用于处理人类语言的库。
- [go-i18n](https://github.com/nicksnyder/go-i18n/) - 用于处理本地化文本的包及配套工具。
- [gse](https://github.com/go-ego/gse) - Go 高效文本分词，支持英文、中文、日文等。
- [gojieba](https://github.com/yanyiwu/gojieba) - 这是 [jieba](https://github.com/fxsjy/jieba) 的 Go 实现，一种中文分词算法。
- [spaGO](https://github.com/nlpodyssey/spago) - Go 中自包含的机器学习和自然语言处理库。
- [go-pinyin](https://github.com/mozillazg/go-pinyin) - 中文汉字转汉语拼音转换器。
- [lingua-go](https://github.com/pemistahl/lingua-go) - 一个准确的自然语言检测库，适用于长文本和短文本。支持检测混合语言文本中的多种语言。
- [slug](https://github.com/gosimple/slug) - 支持多语言的 URL 友好 slugify。
- [kagome](https://github.com/ikawaha/kagome) - 纯 Go 编写的日语形态分析器。
- [whatlanggo](https://github.com/abadojack/whatlanggo) - Go 的自然语言检测包。支持 84 种语言和 24 种文字（书写系统，如拉丁、西里尔等）。
- [gotext](https://github.com/leonelquinteros/gotext) - Go 的 GNU gettext 工具。
- [nlp](https://github.com/james-bowman/nlp) - 支持 LSA（潜在语义分析）的 Go 自然语言处理库。
- [sentences](https://github.com/neurosnap/sentences) - 句子分词器：将文本转换为句子列表。
- [getlang](https://github.com/rylans/getlang) - 快速自然语言检测包。
- [go-unidecode](https://github.com/mozillazg/go-unidecode) - Unicode 文本的 ASCII 转写。
- [RAKE.go](https://github.com/afjoseph/RAKE.Go) - 快速自动关键词提取算法（RAKE）的 Go 移植。
- [go-slugify](https://github.com/mozillazg/go-slugify) - 生成支持多种语言的漂亮 slug。
- [ctxi18n](https://github.com/invopop/ctxi18n/) - 上下文感知的 i18n，具有简短简洁的 API、复数化、插值和 `fs.FS` 支持。YAML 区域设置定义基于 [Rails i18n](https://guides.rubyonrails.org/i18n.html)。
- [spreak](https://github.com/vorlif/spreak) - Go 的灵活翻译和人性化库，基于 gettext 背后的概念。
- [segment](https://github.com/blevesearch/segment) - 按照 [Unicode 标准附录 #29](https://www.unicode.org/reports/tr29/) 执行 Unicode 文本分割的 Go 库。
- [go-stem](https://github.com/agonopol/go-stem) - Porter 词干提取算法的实现。
- [gounidecode](https://github.com/fiam/gounidecode) - Go 的 Unicode 转写器（也称为 unidecode）。
- [textcat](https://github.com/pebbe/textcat) - Go 包，用于基于 n-gram 的文本分类，支持 utf-8 和原始文本。
- [MMSEGO](https://github.com/awsong/MMSEGO) - 这是 [MMSEG](http://technology.chtsai.org/mmseg/) 的 GO 实现，一种中文分词算法。
- [guesslanguage](https://github.com/endeveit/guesslanguage) - 确定 Unicode 文本自然语言的函数。
- [go2vec](https://github.com/danieldk/go2vec) - 用于 word2vec 嵌入的读取与实用函数。
- [stemmer](https://github.com/dchest/stemmer) - Go 编程语言的词干提取包，包含英语和德语词干提取器。
- [iuliia-go](https://github.com/mehanizm/iuliia-go) - 以所有可能的方式将西里尔字母转写为拉丁字母。
- [govader](https://github.com/jonreiter/govader) - [VADER 情感分析](https://github.com/cjhutto/vaderSentiment) 的 Go 实现。
- [porter2](https://github.com/zhenjl/porter2) - 极快的 Porter 2 词干提取器。
- [transliterator](https://github.com/alexsergivan/transliterator) - 提供单向字符串转写，支持特定语言的转写规则。
- [snowball](https://github.com/goodsign/snowball) - Go 的 Snowball 词干提取器移植（cgo 封装），提供词干提取功能 [Snowball 原生](http://snowball.tartarus.org/)。
- [go-mystem](https://github.com/dveselov/mystem) - Yandex.Mystem（俄语形态分析器）的 CGo 绑定。
- [Slugify](https://github.com/avelino/slugify) - 处理字符串的 Go slugify 应用。
- [paicehusk](https://github.com/rookii/paicehusk) - Paice/Husk 词干提取算法的 Golang 实现。
- [detectlanguage](https://github.com/detectlanguage/detectlanguage-go) - 语言检测 API Go 客户端。支持批量请求、短短语或单词的语言检测。
- [t](https://github.com/youthlin/t) - 另一个 golang 的 i18n 包，遵循 GNU gettext 风格并支持 .po/.mo 文件：`t.T (gettext)`、`t.N (ngettext)` 等。它还包含一个命令行工具 [xtemplate](https://github.com/youthlin/t/blob/main/cmd/xtemplate)，可以从文本/html 模板中提取消息为 pot 文件。
- [golibstemmer](https://github.com/rjohnsondev/golibstemmer) - snowball libstemmer 库的 Go 绑定，包括 porter 2。
- [gotokenizer](https://github.com/xujiajun/gotokenizer) - 基于词典和 Bigram 语言模型的 Golang 分词器。（目前仅支持中文分词）
- [enca](https://github.com/endeveit/enca) - 用于 [libenca](https://cihar.com/software/enca/) 的最小 cgo 绑定，用于检测字符编码。
- [porter](https://github.com/a2800276/porter) - 这是 Martin Porter 的 Porter 词干提取算法 C 实现的相当直接的移植。
- [libtextcat](https://github.com/goodsign/libtextcat) - libtextcat C 库的 Cgo 绑定，保证与 2.2 版本兼容。
- [shamoji](https://github.com/osamingo/shamoji) - shamoji 是用 Go 编写的单词过滤包。
- [gosentiwordnet](https://github.com/dinopuguh/gosentiwordnet) - 使用 Go 中的 sentiwordnet 词典进行情感分析。
- [go-words](https://github.com/saleh-rahimzadeh/go-words) - Golang 项目的单词表和文本资源库。
- [govader-backend](https://github.com/PIMPfiction/govader_backend) - [GoVader](https://github.com/jonreiter/govader) 的微服务实现。
- [go-propisyu](https://github.com/rekurt/go-propisyu) - 将数字转换为俄语单词，并正确处理语法性别和名词变格。
- [spelling-corrector](https://github.com/jorelosorio/spellingcorrector) - 西班牙语拼写纠正器，或创建你自己的。
:::

::: masonry
## 函数式
> 支持 Go 函数式编程的包。
- [mo](https://github.com/samber/mo) - 基于 Go 1.18+ 泛型的 Monad 与流行 FP 抽象（Option、Result、Either 等）。
- [go-underscore](https://github.com/tobyhede/go-underscore) - 实用的 Go 集合工具函数集合。
- [go-functional](https://github.com/BooleanCat/go-functional) - 使用泛型在 Go 中进行函数式编程。
- [fpGo](https://github.com/TeaEntityLab/fpGo) - 适用于 Golang 的 Monad 与函数式编程特性。
- [fp-go](https://github.com/repeale/fp-go) - 基于 Golang 1.18+ 泛型的函数式编程辅助工具集合。
- [FuncFrog](https://github.com/koss-null/FuncFrog) - 函数式辅助库，为 Go1.18+ 的泛型切片提供 Map、Filter、Reduce 及其他流操作，支持惰性求值和错误处理机制。
- [gofp](https://github.com/rbrahul/gofp) - 类似 lodash 的 Golang 强大工具库。
- [fuego](https://github.com/seborama/fuego) - Go 中的函数式实验。
- [underscore](https://github.com/rjNemo/underscore) - 面向 Go 1.18 及更高版本的函数式编程辅助工具。
- [g](https://github.com/enetx/g) - Go 的函数式编程框架。
- [valor](https://github.com/phelmkamp/valor) - 泛型 Option 和 Result 类型，可选地包含一个值。
:::

::: masonry
## 错误处理
> 用于处理错误的库。
- [go-multierror](https://github.com/hashicorp/go-multierror) - Go（golang）包，用于将错误列表表示为单个错误。
- [errors](https://github.com/cockroachdb/errors) - Go 错误库，支持通过网络进行错误可移植性。
- [eris](https://github.com/rotisserie/eris) - 在 Go 中处理、追踪和记录错误的更好方式。兼容标准错误库和 github.com/pkg/errors。
- [errorx](https://github.com/joomcode/errorx) - 功能丰富的错误包，包含堆栈跟踪、错误组合等功能。
- [multierr](https://github.com/uber-go/multierr) - 用于将错误列表表示为单个错误的包。
- [tracerr](https://github.com/ztrue/tracerr) - 带有堆栈跟踪和源代码片段的 Golang 错误。
- [oops](https://github.com/samber/oops) - 错误处理，支持上下文、堆栈跟踪和源代码片段。
- [errlog](https://github.com/snwfdhmp/errlog) - 可定制的包，用于确定错误的来源代码（以及其他快速调试功能）。可随时插入任何日志记录器。
- [emperror](https://github.com/emperror/emperror) - 面向 Go 库和应用程序的错误处理工具与最佳实践。
- [Fault](https://github.com/Southclaws/fault) - 一种符合人体工程学的错误包装机制，便于为错误值添加结构化元数据和上下文。
- [errors](https://github.com/emperror/errors) - 标准库 errors 包和 github.com/pkg/errors 的即插即用替代品。提供各种错误处理原语。
- [errors](https://github.com/naughtygopher/errors) - 内置 Go 错误的直接替代品。这是一个极简的错误处理包，包含自定义错误类型、用户友好消息、Unwrap 和 Is。提供非常易用且直观的辅助函数。
- [exception](https://github.com/rbrahul/exception) - 用于在 Golang 中实现 try-catch 异常处理的简单实用包。
- [Falcon](https://github.com/SonicRoshan/falcon) - 一个简单但功能强大的错误处理包。
- [errors](https://github.com/PumpkinSeed/errors) - 最简单的错误包装器，性能卓越且内存开销极小。
- [errors](https://github.com/neuronlabs/errors) - 简单的 Go 错误处理，带有分类原语。
- [metaerr](https://github.com/quantumcycle/metaerr) - 一个库，用于创建自定义错误构建器，生成带有来自不同来源的元数据和可选堆栈跟踪的结构化错误。
- [go-bruh](https://github.com/aisbergg/go-bruh) - 错误处理，支持堆栈跟踪、自定义格式和可观测性集成。
- [go-errr](https://github.com/go-errr/go) - 面向 Go 的错误处理库，具有 Catch/Recover 语义、包装错误链和堆栈跟踪。
- [ctxerrors](https://github.com/psyb0t/ctxerrors) - 使用每个调用点的文件、行号和函数名包装错误。
- [errors](https://gitlab.com/tozd/go/errors) - 提供带有堆栈跟踪和可选结构化细节的错误。兼容 github.com/pkg/errors API，但内部不使用它。
:::

::: masonry
## 流处理
> 用于流处理和响应式编程的库和工具。
- [go-streams](https://github.com/reugn/go-streams) - Go 流处理库。
- [ro](https://github.com/samber/ro) - 响应式编程：面向事件驱动应用的声明式和可组合 API。
- [go-etl](https://github.com/Breeze0806/go-etl) - 一个轻量级的数据源提取、转换和加载（ETL）工具包。
- [gostream](https://github.com/mariomac/gostream) - 受 Java Streams API 启发的类型安全流处理库。
- [machine](https://github.com/whitaker-io/machine) - 用于编写和生成流处理工作器的 Go 库，内置指标和可追溯性。
- [stream](https://github.com/youthlin/stream) - Go Stream，类似 Java 8 Stream：Filter/Map/FlatMap/Peek/Sorted/ForEach/Reduce...
- [goio](https://github.com/primetalk/goio) - Golang 的 IO、Stream、Fiber 实现，灵感来自优秀的 Scala 库 cats 和 fs2。
- [StreamSQL](https://github.com/rulego/streamsql) - 一个用于实时数据处理的轻量级流式 SQL 引擎。
- [signals](https://github.com/coregx/signals) - 受 Angular Signals 启发的类型安全响应式状态管理，支持计算值、效果和依赖跟踪。
- [nibbler](https://github.com/naughtygopher/nibbler) - 一个用于微批处理的轻量级包。
:::

::: masonry
## 视频
> 用于操作视频的库。
- [goav](https://github.com/giorgisio/goav) - FFmpeg 的全面 Go 绑定。
- [gortsplib](https://github.com/aler9/gortsplib) - 纯 Go 的 RTSP 服务器和客户端库。
- [gmf](https://github.com/3d0c/gmf) - FFmpeg av* 库的 Go 绑定。
- [go-astiav](https://github.com/asticode/go-astiav) - Go 中更好的 FFmpeg C 绑定。
- [go-astisub](https://github.com/asticode/go-astisub) - 在 Go 中操作字幕（.srt、.stl、.ttml、.webvtt、.ssa/.ass、图文电视、.smi 等）。
- [mp4ff](https://github.com/Eyevinn/mp4ff) - 用于处理包含视频、音频、字幕或元数据的 MP4 文件的库和工具。
- [go-astits](https://github.com/asticode/go-astits) - 在 Go 中原生解析和解复用 MPEG 传输流（.ts）。
- [libvlc-go](https://github.com/adrg/libvlc-go) - libvlc 2.X/3.X/4.X 的 Go 绑定（由 VLC 媒体播放器使用）。
- [v4l](https://github.com/korandiz/v4l) - 用 Go 编写的 Linux 视频捕获库。
- [hls-m3u8](https://github.com/Eyevinn/hls-m3u8) - HLS（M3U8）播放列表的解析器和生成器；紧跟规范更新。
- [onvif-go](https://github.com/0x524a/onvif-go) - 用于 IP 摄像头的 ONVIF 客户端、WS-Discovery 和虚拟摄像头服务器。
- [mpeg-ts-analyzer](https://github.com/small-teton/mpeg-ts-analyzer) - MPEG-2 传输流分析器，检查 PCR 时序合规性并转储底层 TS、PSI 和 PES 结构。
- [go-mpd](https://github.com/unki2aut/go-mpd) - MPEG-DASH 清单文件的解析器和生成器库。
- [mosaic](https://github.com/farshidrezaei/mosaic) - 面向 Go 的可预测、生产就绪的自适应码率（ABR）视频打包（HLS 与 DASH CMAF）。
- [manifestor](https://github.com/alanzng/manifestor) - 零依赖库，用于解析、过滤、转换和构建 HLS 与 DASH 清单。
- [rtspeek](https://github.com/0x524a/rtspeek) - 用于探测 RTSP 流并报告可达性、延迟、编解码器和分辨率的库和 CLI。
:::

::: masonry
## 基准测试
- [go-web-framework-benchmark](https://github.com/smallnest/go-web-framework-benchmark) - Go Web 框架基准测试。
- [go-http-routing-benchmark](https://github.com/julienschmidt/go-http-routing-benchmark) - Go HTTP 请求路由器基准测试和比较。
- [go_serialization_benchmarks](https://github.com/alecthomas/go_serialization_benchmarks) - Go 序列化方法的基准测试。
- [skynet](https://github.com/atemerev/skynet) - Skynet 100 万线程微基准测试。
- [speedtest-resize](https://github.com/fawick/speedtest-resize) - 比较 Go 语言的各种图像缩放算法。
- [go-benchmarks](https://github.com/tylertreat/go-benchmarks) - 一些杂项 Go 微基准测试。将某些语言特性与替代方法进行比较。
- [golang-benchmarks](https://github.com/SimonWaldherr/golang-benchmarks) - 一组 golang 基准测试。
- [gospeed](https://github.com/feyeleanor/GoSpeed) - 用于计算语言构造速度的 Go 微基准测试。
- [autobench](https://github.com/davecheney/autobench) - 用于比较不同 Go 版本性能的框架。
- [vizb](https://github.com/goptics/vizb) - 一个用于在 4D 空间中可视化 Go 基准数据的 CLI 工具。
- [gocostmodel](https://github.com/PuerkitoBio/gocostmodel) - Go 语言常见基本操作的基准测试。
- [go-ml-benchmarks](https://github.com/nikolaydubina/go-ml-benchmarks) - Go 中机器学习推理的基准测试。
- [go-benchmark-app](https://github.com/mrLSD/go-benchmark-app) - 强大的 HTTP 基准测试工具，结合了 Ab、Wrk、Siege 工具。收集统计数据和各种参数，用于基准测试和结果比较。
- [kvbench](https://github.com/jimrobinson/kvbench) - 键/值数据库基准测试。
- [go-json-benchmark](https://github.com/zerosnake0/go-json-benchmark) - Go JSON 基准测试。
:::

::: masonry
## 音频与音乐
> 用于操作音频和音乐的库。
- [Oto](https://github.com/hajimehoshi/oto) - 一个用于在多个平台上播放声音的低级库。
- [PortAudio](https://github.com/gordonklaus/portaudio) - PortAudio 音频 I/O 库的 Go 绑定。
- [beep](https://github.com/gopxl/beep) - 一个用于播放和音频操作的简单库。
- [music-theory](https://github.com/go-music-theory/music-theory) - Go 中的音乐理论模型。
- [GoAudio](https://github.com/DylanMeeus/GoAudio) - 原生 Go 音频处理库。
- [malgo](https://github.com/gen2brain/malgo) - 迷你音频库。
- [id3v2](https://github.com/bogem/id3v2) - Go 的 ID3 解码和编码库。
- [flac](https://github.com/mewkiz/flac) - 原生 Go FLAC 编码器/解码器，支持 FLAC 流。
- [gaad](https://github.com/Comcast/gaad) - 原生 Go AAC 比特流解析器。
- [minimp3](https://github.com/tosone/minimp3) - 轻量级 MP3 解码器库。
- [gosamplerate](https://github.com/dh1tw/gosamplerate) - libsamplerate 的 Go 绑定。
- [go-mpris](https://github.com/leberKleber/go-mpris) - 用于 mpris dbus 接口的客户端。
- [go-audio-resampler](https://github.com/tphakala/go-audio-resampler) - 纯 Go 高质量音频重采样器，支持 SIMD 加速。
- [go-aac](https://github.com/tphakala/go-aac) - 从 FFmpeg 移植的纯 Go AAC-LC 编码器和解码器。
- [go-wav](https://github.com/tphakala/go-wav) - 纯 Go WAV/RIFF 读写器，支持大于 4 GiB 文件的 RF64 和 BW64 格式。
- [voxrai-ai](https://github.com/Voxray-AI/Voxray) - AI 语音代理，采用 JSON 配置，通过 WebSocket 和 WebRTC 实现 STT → LLM → TTS 管道。
- [go-flac](https://github.com/tphakala/go-flac) - 原生 Go FLAC 编码器和解码器，支持 SIMD 加速。
- [go-opus](https://github.com/tphakala/go-opus) - Opus 音频编解码器（RFC 6716）的原生 Go 实现，包含符合 RFC 的解码器。
- [gocue](https://github.com/iSerganov/gocue) - 音频分析 CLI，可检测入点、出点和叠加点，并测量 EBU R128 响度，为 Liquidsoap 输出 JSON。
- [go-resample](https://github.com/gojargo/go-resample) - 纯 Go（无 cgo）音频采样率转换器，支持 sinc、线性和零阶保持转换器。
:::

::: masonry
## 动态 DNS
> 用于更新动态 DNS 记录的工具。
- [GoDNS](https://github.com/timothyye/godns) - 一个动态 DNS 客户端工具，支持 DNSPod 和 HE.net，使用 Go 编写。
- [DDNS](https://github.com/skibish/ddns) - 个人 DDNS 客户端，以 Digital Ocean Networking DNS 作为后端。
- [dyndns](https://gitlab.com/alcastle/dyndns) - 后台 Go 进程，定期自动检查你的 IP 地址，并在地址变化时更新 Google 域名的（一个或多个）动态 DNS 记录。
:::

::: masonry
## 表单
> 用于处理表单的库。
- [nosurf](https://github.com/justinas/nosurf) - Go 的 CSRF 保护中间件。
- [gorilla/csrf](https://github.com/gorilla/csrf) - Go Web 应用和服务的 CSRF 保护。
- [form](https://github.com/go-playground/form) - 将 url.Values 解码为 Go 值，并将 Go 值编码为 url.Values。支持双数组和完整映射。
- [httpin](https://github.com/ggicci/httpin) - 将 HTTP 请求解码为自定义结构体，包括查询字符串、表单、HTTP 头等。
- [conform](https://github.com/leebenson/conform) - 控制用户输入。根据结构体标签修剪、清理和擦除数据。
- [formam](https://github.com/monoculum/formam) - 将表单值解码为结构体。
- [forms](https://github.com/albrow/forms) - 与框架无关的表单/JSON 数据解析和验证库，支持多部分表单和文件。
- [qs](https://github.com/sonh/qs) - 将结构体编码为 URL 查询参数的 Go 模块。
- [bind](https://github.com/robfig/bind) - 将表单数据绑定到任意 Go 值。
- [queryparam](https://github.com/tomwright/queryparam) - 将 `url.Values` 解码为标准或自定义类型的可用结构体值。
- [gbind](https://github.com/bdjimmy/gbind) - 将数据绑定到任意 Go 值。可使用内置和自定义表达式绑定功能；支持数据验证。
- [roamer](https://github.com/slipros/roamer) - 通过使用简单标签，将 cookie、请求头、查询参数、路径参数、请求体等绑定到结构体，消除解析 HTTP 请求的样板代码。
:::

::: masonry
## OpenGL
> 在 Go 中使用 OpenGL 的库。
- [glfw](https://github.com/go-gl/glfw) - Go 语言的 GLFW 3 绑定。
- [gl](https://github.com/go-gl/gl) - Go 语言的 OpenGL 绑定（通过 glow 生成）。
- [mathgl](https://github.com/go-gl/mathgl) - 纯 Go 数学包，专用于 3D 数学，灵感来自 GLM。
- [goxjs/gl](https://github.com/goxjs/gl) - Go 跨平台 OpenGL 绑定（OS X、Linux、Windows、浏览器、iOS、Android）。
- [goxjs/glfw](https://github.com/goxjs/glfw) - Go 跨平台 glfw 库，用于创建 OpenGL 上下文并接收事件。
- [go-glmatrix](https://github.com/technohippy/go-glmatrix) - Go 语言移植的 [glMatrix](https://glmatrix.net/) 库。
:::

::: masonry
## Windows
- [go-ole](https://github.com/go-ole/go-ole) - 用于 golang 的 Win32 OLE 实现。
- [d3d9](https://github.com/gonutz/d3d9) - Direct3D9 的 Go 绑定。
- [windowsupdate](https://github.com/ceshihao/windowsupdate) - 使用 go-ole 的 Windows Update Agent API 的 Golang 绑定。
- [gosddl](https://github.com/MonaxGT/gosddl) - 将 SDDL 字符串转换为用户友好的 JSON。SDDL 由四部分组成：所有者、主组、DACL、SACL。
:::

::: masonry
## 资源嵌入
- [vfsgen](https://github.com/shurcooL/vfsgen) - 生成一个静态实现给定虚拟文件系统的 vfsdata.go 文件。
- [debme](https://github.com/leaanthony/debme) - 从现有的 `embed.FS` 子目录创建一个 `embed.FS`。
- [rebed](https://github.com/soypat/rebed) - 从 Go 1.16 的 `embed.FS` 类型重建文件夹结构和文件。
- [embed](https://pkg.go.dev/embed) - embed 包提供对运行中的 Go 程序中嵌入文件的访问。
:::

::: masonry
## XML
> 用于操作 XML 的库和工具。
- [zek](https://github.com/miku/zek) - 从 XML 生成 Go 结构体。
- [xpath](https://github.com/antchfx/xpath) - Go 的 XPath 包。
- [xmlquery](https://github.com/antchfx/xmlquery) - xmlquery 是用于 XML 查询的 Golang XPath 包。
- [xml2map](https://github.com/sbabiv/xml2map) - 用 Golang 编写的 XML 到 MAP 转换器。
- [xmlwriter](https://github.com/shabbyrobe/xmlwriter) - 基于 libxml2 的 xmlwriter 模块的过程式 XML 生成 API。
- [XML-Comp](https://github.com/xml-comp/xml-comp) - 简单的命令行 XML 比较器，可生成文件夹、文件和标签的差异。
:::

::: masonry
## 反射
- [Deepcopier](https://github.com/ulule/deepcopier) - Go 的简单结构体复制。
- [go-deepcopy](https://github.com/tiendc/go-deepcopy) - 快速深拷贝库。
- [gotype](https://github.com/wzshiming/gotype) - Golang 源码解析，用法类似 reflect 包。
- [copy](https://github.com/gotidy/copy) - 用于快速复制不同类型结构体的包。
- [gpath](https://github.com/tenntenn/gpath) - 通过反射中的 Go 表达式简化结构体字段访问的库。
- [goenum](https://github.com/lvyahui8/goenum) - 基于泛型和反射的通用枚举结构体，可快速定义枚举并使用一组有用的默认方法。
- [reflectutils](https://github.com/muir/reflectutils) - 处理反射的辅助工具：结构体标签解析；递归遍历；从字符串填充值。
- [reflectpro](https://github.com/gontainer/reflectpro) - Go 的调用器、复制器、获取器和设置器。
- [objwalker](https://github.com/rekby/objwalker) - 通过反射遍历 Go 对象。
:::

::: masonry
## CSS 预处理器
> 用于预处理 CSS 文件的库。
- [go-libsass](https://github.com/wellington/go-libsass) - 用于 100% 兼容 Sass 的 libsass 项目的 Go 封装。
- [go-css](https://github.com/napsy/go-css) - 一个非常简单的 CSS 解析器，用 Go 编写。
:::

::: masonry
## 会议
- [GoCon](https://gocon.connpass.com/) - 日本东京。
- [GoDays](https://www.godays.io/) - 德国柏林。
- [GoLab](https://golab.io/) - 意大利佛罗伦萨。
- [GopherCon](https://www.gophercon.com/) - 美国，每年地点不同。
- [GopherCon Africa](https://gophercon.africa/) - 肯尼亚内罗毕。
- [GopherCon Australia](https://gophercon.com.au/) - 澳大利亚悉尼。
- [GopherCon Brazil](https://gopherconbr.org) - 巴西弗洛里亚诺波利斯。
- [GopherCon China](https://gophercon.com.cn) - 中国上海。
- [GopherCon Europe](https://gophercon.eu/) - 德国柏林。
- [GopherCon India](https://gopherconindia.org/) - 印度浦那。
- [GopherCon Israel](https://www.gophercon.org.il/) - 以色列特拉维夫。
- [GopherCon Russia](https://www.gophercon-russia.ru) - 俄罗斯莫斯科。
- [GopherCon Singapore](https://gophercon.sg) - 新加坡美芝路商业园。
- [GopherCon UK](https://www.gophercon.co.uk/) - 英国伦敦。
- [GoWest Conference](https://gowestconf.com/) - 美国莱希。
:::

::: masonry
## 聚会
- [Basel Go Meetup](https://www.meetup.com/Basel-Go-Meetup/)
- [Belfast Gophers](https://www.meetup.com/Belfast-Gophers/)
- [Belgrade Golang Meetup](https://www.meetup.com/golang-serbia/)
- [Berlin Golang](https://www.meetup.com/golang-users-berlin/)
- [Brisbane Gophers](https://www.meetup.com/Brisbane-Golang-Meetup/)
- [Bärner Go Meetup - Berne, Switzerland](https://www.meetup.com/berner-go-meetup/)
- [Go Ireland - Dublin](https://www.meetup.com/goireland/)
- [Go Language NYC](https://www.meetup.com/golanguagenewyork/)
- [Go London User Group](https://www.meetup.com/Go-London-User-Group/)
- [Go Remote Meetup](https://www.meetup.com/Go-Remote-Meetup/)
- [Go Toronto](https://www.meetup.com/go-toronto/)
- [Go User Group Atlanta](https://www.meetup.com/Go-Users-Group-Atlanta/)
- [GoBandung](https://www.meetup.com/GoBandung/)
- [GoBridge, San Francisco, CA](https://www.meetup.com/gobridge/)
- [GoCracow - Krakow, Poland](https://www.meetup.com/GoCracow/)
- [GoJakarta](https://www.meetup.com/GoJakarta/)
- [Golang Amsterdam](https://www.meetup.com/golang-amsterdam/)
- [Golang Argentina](https://www.meetup.com/Golang-Argentina/)
- [Golang Athens](https://www.meetup.com/Athens-Gophers/)
- [Golang Baltimore, MD](https://www.meetup.com/BaltimoreGolang/)
- [Golang Bangalore](https://www.meetup.com/Golang-Bangalore/)
- [Golang Belo Horizonte - Brazil](https://www.meetup.com/go-belo-horizonte/)
- [Golang Boston](https://www.meetup.com/bostongo/)
- [Golang Bulgaria](https://www.meetup.com/Golang-Bulgaria/)
- [Golang Cardiff, UK](https://www.meetup.com/Cardiff-Go-Meetup/)
- [Golang Copenhagen](https://www.meetup.com/Go-Cph/)
- [Golang Curitiba - Brazil](https://www.meetup.com/GolangCWB/)
- [Golang DC, Arlington, VA](https://www.meetup.com/Golang-DC/)
- [Golang Dorset, UK](https://www.meetup.com/golang-dorset/)
- [Golang Estonia](https://www.meetup.com/Golang-Estonia/)
- [Golang Gurgaon, India](https://www.meetup.com/Gurgaon-Go-Meetup/)
- [Golang Hamburg - Germany](https://www.meetup.com/Go-User-Group-Hamburg/)
- [Golang Israel](https://www.meetup.com/Go-Israel/)
- [Golang Kathmandu](https://www.meetup.com/Golang-Kathmandu/)
- [Golang Lima - Peru](https://www.meetup.com/Golang-Peru/)
- [Golang Lyon](https://www.meetup.com/Golang-Lyon/)
- [Golang Marseille](https://www.meetup.com/fr-FR/Golang-Marseille/)
- [Golang Melbourne](https://www.meetup.com/golang-mel/)
- [Golang Milano](https://www.meetup.com/golang-milano/)
- [Golang North East](https://www.meetup.com/en-AU/Golang-North-East/)
- [Golang Paris](https://www.meetup.com/Golang-Paris/)
- [Golang Poland](https://www.meetup.com/Golang-Poland/)
- [Golang Pune](https://www.meetup.com/Golang-Pune/)
- [Golang Roma](https://www.meetup.com/golangroma/)
- [Golang Rotterdam](https://www.meetup.com/golang-rotterdam/)
- [Golang Singapore](https://www.meetup.com/golangsg/)
- [Golang Stockholm](https://www.meetup.com/Go-Stockholm/)
- [Golang Sydney, AU](https://www.meetup.com/golang-syd/)
- [Golang São Paulo - Brazil](https://www.meetup.com/golangbr/)
- [Golang Taipei](https://www.meetup.com/golang-taipei-meetup/)
- [Golang Thessaloniki](https://www.meetup.com/thessaloniki-golang-meetup/)
- [Golang Torino](https://www.meetup.com/golang-torino/)
- [Golang Turkey](https://kommunity.com/goturkiye)
- [Golang Vancouver, BC](https://www.meetup.com/golangvan/)
- [Golang Vienna, Austria](https://www.meetup.com/viennago/)
- [Golang Москва](https://www.meetup.com/Golang-Moscow/)
- [GoSF - San Francisco, CA](https://www.meetup.com/golangsf)
- [Istanbul Golang](https://www.meetup.com/Istanbul-Golang/)
- [Lagos Gophers](https://www.meetup.com/GolangNigeria/)
- [Nairobi Gophers](https://www.meetup.com/nairobi-gophers/)
- [Seattle Go Programmers](https://www.meetup.com/golang/)
- [Ukrainian Golang User Groups](https://www.meetup.com/uagolang/)
- [Utah Go User Group](https://www.meetup.com/utahgophers/)
- [Women Who Go - San Francisco, CA](https://www.meetup.com/Women-Who-Go/)
- [Zürich Gophers - Zurich, Switzerland](https://www.meetup.com/zurich-gophers/)
:::

::: masonry
## 社交媒体
- [@GoDiscussions](https://twitter.com/GoDiscussions)
- [@golang](https://twitter.com/golang)
- [@golang_news](https://twitter.com/golang_news)
- [@golangch](https://twitter.com/golangch)
- [@golangweekly](https://twitter.com/golangweekly)
- [r/golang](https://www.reddit.com/r/golang/)
:::

