import{_ as n,c as a,o as e,aj as p}from"./chunks/framework.B-K7myP5.js";const u=JSON.parse('{"title":"创建 Composer 插件","frontmatter":{"title":"创建 Composer 插件","createTime":"2025/01/17 19:27:31","permalink":"/docs/composer/plugins.html","lastUpdated":"2026-01-22","tags":[],"link":"/docs/composer/官方文章/plugins","layout":"doc","sidebar":true,"aside":true,"prev":{"text":"HTTP 基础认证","link":"/docs/composer/官方文章/basic-authentication"},"next":{"text":"事件和自定义脚本","link":"/docs/composer/官方文章/scripts"}},"headers":[],"params":{"pkg":"composer/官方文章/plugins","sidebar":[{"text":"常见问题","items":[{"text":"如何为我的框架自定义一个扩展包安装目录？","link":"/docs/composer/index"},{"text":"如何使用脚本安装 Composer？","link":"/docs/composer/常见问题/to-install-composer-programmatically"},{"text":"使用 root 用户来安装扩展包是否安全？如何安全地安装未认证渠道的扩展包？","link":"/docs/composer/常见问题/to-install-untrusted-packages-safely"},{"text":"我应该将 vendor 目录加入版本控制吗？","link":"/docs/composer/常见问题/i-commit-the-dependencies-in-my-vendor-directory"},{"text":"Composer 使用的是什么版本命名规范？","link":"/docs/composer/常见问题/version-numbering-system-does-composer-itself-use"},{"text":"为什么限制版本是最佳实践？","link":"/docs/composer/常见问题/are-unbound-version-constraints-a-bad-idea"},{"text":"为何版本限制与对比符、通配符配合使用是个糟糕的行为？","link":"/docs/composer/常见问题/are-version-constraints-combining-comparisons-and-wildcards-a-bad-idea"},{"text":"为什么 Composer 不递归加载代码库？","link":"/docs/composer/常见问题/cant-composer-load-repositories-recursively"}]},{"text":"官方文章","items":[{"text":"分支别名","link":"/docs/composer/官方文章/aliases"},{"text":"版本限制","link":"/docs/composer/官方文章/versions"},{"text":"自动加载器优化","link":"/docs/composer/官方文章/optimization"},{"text":"自定义安装器","link":"/docs/composer/官方文章/installers"},{"text":"使用 Satis 处理私有仓库","link":"/docs/composer/官方文章/private-packages-with-satis"},{"text":"HTTP 基础认证","link":"/docs/composer/官方文章/basic-authentication"},{"text":"创建 Composer 插件","link":"/docs/composer/官方文章/plugins"},{"text":"事件和自定义脚本","link":"/docs/composer/官方文章/scripts"},{"text":"故障排除","link":"/docs/composer/官方文章/troubleshooting"},{"text":"可执行二进制文件","link":"/docs/composer/官方文章/binaries"}]},{"text":"教程","items":[{"text":"简介","link":"/docs/composer/教程/intro"},{"text":"基本使用","link":"/docs/composer/教程/basic-usage"},{"text":"创建扩展包","link":"/docs/composer/教程/libraries"},{"text":"Composer 命令的使用","link":"/docs/composer/教程/cli"},{"text":"json 完全解析","link":"/docs/composer/教程/schema"},{"text":"扩展包源仓库","link":"/docs/composer/教程/repositories"},{"text":"配置信息","link":"/docs/composer/教程/config"},{"text":"社区","link":"/docs/composer/教程/community"}]}],"versions":[]},"relativePath":"docs/composer/官方文章/plugins.md","filePath":"docs/[pkg].md"}'),o={name:"docs/composer/官方文章/plugins.md"};function l(i,s,t,r,c,m){return e(),a("div",null,[...s[0]||(s[0]=[p(`<h1 id="设置和使用插件" tabindex="-1">设置和使用插件 <a class="header-anchor" href="#设置和使用插件" aria-label="Permalink to “设置和使用插件”">​</a></h1><h2 id="概要" tabindex="-1">概要 <a class="header-anchor" href="#概要" aria-label="Permalink to “概要”">​</a></h2><p>您可能希望使用自己的功能更改或扩展 Composer 的功能。例如，如果您的环境对 Composer 的行为提出了特殊要求，这些要求不适用于大多数用户，或者您希望以大多数用户不希望的方式使用 Composer 完成某些任务。</p><p>在这些情况下，您可以考虑创建一个插件来处理您的特定逻辑。</p><h2 id="创建一个插件" tabindex="-1">创建一个插件 <a class="header-anchor" href="#创建一个插件" aria-label="Permalink to “创建一个插件”">​</a></h2><p>插件是一个常规的 Composer 包，它将代码作为包的一部分提供，也可能依赖于其他包。</p><h3 id="插件包" tabindex="-1">插件包 <a class="header-anchor" href="#插件包" aria-label="Permalink to “插件包”">​</a></h3><p>包文件与任何其他包文件相同，但具有以下要求：</p><ol><li><a href="https://github.com/composer/composer/blob/master/doc/04-schema.md#type" target="_blank" rel="noreferrer">type</a> 属性必须是 <code>composer-plugin</code>.</li><li><a href="https://github.com/composer/composer/blob/master/doc/04-schema.md#extra" target="_blank" rel="noreferrer">extra</a> 属性必须包含一个元素 <code>class</code>，用于定义插件的类名（包括命名空间）。如果包中包含多个插件，则可以是类名称数组。</li><li>您需要依赖名为 <code>composer-plugin-api</code> 的特殊包来定义插件兼容的插件API版本。</li></ol><p>所需的 <code>composer-plugin-api</code> 版本遵循与普通包相同的 <a href="https://github.com/composer/composer/blob/master/doc/01-basic-usage.md#package-versions" target="_blank" rel="noreferrer">规则</a> 。</p><p>当前的 composer 插件 API 版本是 1.1.0。</p><p>常规的插件 <code>composer.json</code> 文件的示例（省略了自动加载部分）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;name&quot;: &quot;my/plugin-package&quot;,</span></span>
<span class="line"><span>    &quot;type&quot;: &quot;composer-plugin&quot;,</span></span>
<span class="line"><span>    &quot;require&quot;: {</span></span>
<span class="line"><span>        &quot;composer-plugin-api&quot;: &quot;^1.1&quot;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;extra&quot;: {</span></span>
<span class="line"><span>        &quot;class&quot;: &quot;My\\\\Plugin&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="插件类" tabindex="-1">插件类 <a class="header-anchor" href="#插件类" aria-label="Permalink to “插件类”">​</a></h3><p>每个插件都必须提供一个实现  <a href="https://github.com/composer/composer/blob/master/src/Composer/Plugin/PluginInterface.php" target="_blank" rel="noreferrer"><code>Composer\\Plugin\\PluginInterface</code></a> 的类。 加载插件后调用插件的 <code>activate()</code> 方法并接收 <a href="https://github.com/composer/composer/blob/master/src/Composer/Composer.php" target="_blank" rel="noreferrer"><code>Composer\\Composer</code></a> 以及 <a href="https://github.com/composer/composer/blob/master/src/Composer/IO/IOInterface.php" target="_blank" rel="noreferrer"><code>Composer\\IO\\IOInterface</code></a> 的实例。使用这两个对象可以读取所有配置，并且可以根据需要操纵所有内部对象和状态。</p><p>例如:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>&lt;?php</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace phpDocumentor\\Composer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>use Composer\\Composer;</span></span>
<span class="line"><span>use Composer\\IO\\IOInterface;</span></span>
<span class="line"><span>use Composer\\Plugin\\PluginInterface;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class TemplateInstallerPlugin implements PluginInterface</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    public function activate(Composer $composer, IOInterface $io)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        $installer = new TemplateInstaller($io, $composer);</span></span>
<span class="line"><span>        $composer-&gt;getInstallationManager()-&gt;addInstaller($installer);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="事件处理器" tabindex="-1">事件处理器 <a class="header-anchor" href="#事件处理器" aria-label="Permalink to “事件处理器”">​</a></h2><p>此外，插件可以实现 <a href="https://github.com/composer/composer/blob/master/src/Composer/EventDispatcher/EventSubscriberInterface.php" target="_blank" rel="noreferrer"><code>Composer\\EventDispatcher\\EventSubscriberInterface</code></a> 以便在加载插件时让其事件处理程序自动注册到 <code>EventDispatcher</code> 。 要将方法注册到事件，请实现方法 <code>getSubscribedEvents()</code> 并让它返回一个数组。 数组键必须是 <a href="https://getcomposer.org/doc/articles/scripts.md#event-names" target="_blank" rel="noreferrer">事件名称</a> 并且对应的键值是要调用的此类中方法的名称。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>public static function getSubscribedEvents()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    return array(</span></span>
<span class="line"><span>        &#39;post-autoload-dump&#39; =&gt; &#39;methodToBeCalled&#39;,</span></span>
<span class="line"><span>        // ^ event name ^         ^ method name ^</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>默认情况下，事件处理程序的优先级设置为 0。可以通过附加元组来更改优先级，其中第一个值是方法名称，如前所述，第二个值是表示优先级的整数。更高的整数代表更高的优先级。优先级 2 在优先级 1 之前调用，等等。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>public static function getSubscribedEvents()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    return array(</span></span>
<span class="line"><span>        // Will be called before events with priority 0</span></span>
<span class="line"><span>        &#39;post-autoload-dump&#39; =&gt; array(&#39;methodToBeCalled&#39;, 1)</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果应该调用多个方法，则可以将每个事件附加一个元组数组。元组不需要包含优先级。如果省略，则默认为 0。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>public static function getSubscribedEvents()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    return array(</span></span>
<span class="line"><span>        &#39;post-autoload-dump&#39; =&gt; array(</span></span>
<span class="line"><span>            array(&#39;methodToBeCalled&#39;      ), // Priority defaults to 0</span></span>
<span class="line"><span>            array(&#39;someOtherMethodName&#39;, 1), // This fires first</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>完整示例:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>&lt;?php</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace Naderman\\Composer\\AWS;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>use Composer\\Composer;</span></span>
<span class="line"><span>use Composer\\EventDispatcher\\EventSubscriberInterface;</span></span>
<span class="line"><span>use Composer\\IO\\IOInterface;</span></span>
<span class="line"><span>use Composer\\Plugin\\PluginInterface;</span></span>
<span class="line"><span>use Composer\\Plugin\\PluginEvents;</span></span>
<span class="line"><span>use Composer\\Plugin\\PreFileDownloadEvent;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class AwsPlugin implements PluginInterface, EventSubscriberInterface</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    protected $composer;</span></span>
<span class="line"><span>    protected $io;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public function activate(Composer $composer, IOInterface $io)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        $this-&gt;composer = $composer;</span></span>
<span class="line"><span>        $this-&gt;io = $io;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static function getSubscribedEvents()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return array(</span></span>
<span class="line"><span>            PluginEvents::PRE_FILE_DOWNLOAD =&gt; array(</span></span>
<span class="line"><span>                array(&#39;onPreFileDownload&#39;, 0)</span></span>
<span class="line"><span>            ),</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public function onPreFileDownload(PreFileDownloadEvent $event)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        $protocol = parse_url($event-&gt;getProcessedUrl(), PHP_URL_SCHEME);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if ($protocol === &#39;s3&#39;) {</span></span>
<span class="line"><span>            $awsClient = new AwsClient($this-&gt;io, $this-&gt;composer-&gt;getConfig());</span></span>
<span class="line"><span>            $s3RemoteFilesystem = new S3RemoteFilesystem($this-&gt;io, $event-&gt;getRemoteFilesystem()-&gt;getOptions(), $awsClient);</span></span>
<span class="line"><span>            $event-&gt;setRemoteFilesystem($s3RemoteFilesystem);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="插件功能" tabindex="-1">插件功能 <a class="header-anchor" href="#插件功能" aria-label="Permalink to “插件功能”">​</a></h2><p>Composer 定义了一组可由插件实现的标准功能。通过为常见的插件需求提供明确的扩展点，减少了弄乱  <a href="https://github.com/composer/composer/blob/master/src/Composer/Composer.php" target="_blank" rel="noreferrer"><code>Composer\\Composer</code></a> 内部状态的需求，使插件生态系统更加稳定。 Capable Plugins 类必须实现 <a href="https://github.com/composer/composer/blob/master/src/Composer/Plugin/Capable.php" target="_blank" rel="noreferrer"><code>Composer\\Plugin\\Capable</code></a> 接口并在 <code>getCapabilities()</code> 方法中声明它们的功能。这个方法必须要返回一个数组，并且数组的 <em>key</em> 为 Composer Capability 类名称，<em>value</em> 为作为 Plugin 自己的实现类名称：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>&lt;?php</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace My\\Composer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>use Composer\\Composer;</span></span>
<span class="line"><span>use Composer\\IO\\IOInterface;</span></span>
<span class="line"><span>use Composer\\Plugin\\PluginInterface;</span></span>
<span class="line"><span>use Composer\\Plugin\\Capable;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Plugin implements PluginInterface, Capable</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    public function activate(Composer $composer, IOInterface $io)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public function getCapabilities()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return array(</span></span>
<span class="line"><span>            &#39;Composer\\Plugin\\Capability\\CommandProvider&#39; =&gt; &#39;My\\Composer\\CommandProvider&#39;,</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="命令提供者" tabindex="-1">命令提供者 <a class="header-anchor" href="#命令提供者" aria-label="Permalink to “命令提供者”">​</a></h3><p><a href="https://github.com/composer/composer/blob/master/src/Composer/Plugin/Capability/CommandProvider.php" target="_blank" rel="noreferrer"><code>Composer\\Plugin\\Capability\\CommandProvider</code></a> 功能允许为 Composer 注册其它命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>&lt;?php</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace My\\Composer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>use Composer\\Plugin\\Capability\\CommandProvider as CommandProviderCapability;</span></span>
<span class="line"><span>use Symfony\\Component\\Console\\Input\\InputInterface;</span></span>
<span class="line"><span>use Symfony\\Component\\Console\\Output\\OutputInterface;</span></span>
<span class="line"><span>use Composer\\Command\\BaseCommand;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class CommandProvider implements CommandProviderCapability</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    public function getCommands()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return array(new Command);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Command extends BaseCommand</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    protected function configure()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        $this-&gt;setName(&#39;custom-plugin-command&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    protected function execute(InputInterface $input, OutputInterface $output)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        $output-&gt;writeln(&#39;Executing&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在， <code>custom-plugin-command</code> 与 Composer 命令一起提供。</p><blockquote><p><em>Composer 命令是基于 <a href="https://symfony.com/doc/current/components/console.html" target="_blank" rel="noreferrer">Symfony Console Component</a> 控制台组件的。</em></p></blockquote><h2 id="使用插件" tabindex="-1">使用插件 <a class="header-anchor" href="#使用插件" aria-label="Permalink to “使用插件”">​</a></h2><p>插件包在安装后将会自动加载，如果在当前项目的已安装软件包列表中找到，则会在编译器启动时加载。此外，在加载本地项目插件之前，将使用 composer global 命令在 <code>COMPOSER_HOME</code> 目录中安装所有插件包。</p><blockquote><p>您可以将 <code>--no-plugins</code> 选项传递给 Composer 命令以禁用所有已安装的插件。如果有插件造成错误，您希望更新或卸载它，这可能特别有用。</p></blockquote>`,37)])])}const h=n(o,[["render",l]]);export{u as __pageData,h as default};
