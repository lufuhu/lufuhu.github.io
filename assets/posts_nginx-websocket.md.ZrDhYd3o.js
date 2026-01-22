import{_ as n,c as a,o as p,ah as e}from"./chunks/framework.DE7iKuik.js";const _=JSON.parse('{"title":"Nginx 配置 WebSocket 代理","description":null,"frontmatter":{"title":"Nginx 配置 WebSocket 代理","createTime":"2023/12/21 10:39:19","permalink":"/article/nginx-websocket/","tags":["Nginx"],"description":null,"lastUpdated":"2026-01-22","link":"/posts/nginx-websocket","layout":"doc","prev":{"text":"Nginx配置解析","link":"/posts/nginx-config"},"next":{"text":"树莓派网络配置","link":"/posts/raspberry-pi-network-config"}},"headers":[],"params":{"pkg":"nginx-websocket"},"relativePath":"posts/nginx-websocket.md","filePath":"posts/[pkg].md"}'),t={name:"posts/nginx-websocket.md"};function i(l,s,o,c,r,d){return p(),a("div",null,[...s[0]||(s[0]=[e(`<p>从版本 <code>1.3.13</code> 开始，<code>nginx</code> 实现了特殊的操作模式，如果代理服务器返回代码为 <code>101</code>，并且客户端通过请求进行协议切换，则允许在客户端和代理服务器之间建立隧道。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>location /ws/ {</span></span>
<span class="line"><span>    proxy_pass http://127.0.0.1:9000;</span></span>
<span class="line"><span>    proxy_http_version 1.1;</span></span>
<span class="line"><span>    proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span>    proxy_set_header Connection &quot;upgrade&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>一个更复杂的示例，其中对代理服务器的请求中的 <code>Connection</code> 字段的值取决于客户端请求标头中是否存在 <code>Upgrade</code> 字段：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    map $http_upgrade $connection_upgrade {</span></span>
<span class="line"><span>        default upgrade;</span></span>
<span class="line"><span>        &#39;&#39;      close;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location /ws/ {</span></span>
<span class="line"><span>            proxy_pass http://127.0.0.1:9000;</span></span>
<span class="line"><span>            proxy_http_version 1.1;</span></span>
<span class="line"><span>            proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span>            proxy_set_header Connection $connection_upgrade;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>默认情况下，如果代理服务器在 60 秒内没有传输任何数据，连接将被关闭。可以使用proxy_read_timeout指令增加此超时 。或者，代理服务器可以配置为定期发送 WebSocket ping 帧以重置超时并检查连接是否仍然有效。</p>`,5)])])}const h=n(t,[["render",i]]);export{_ as __pageData,h as default};
