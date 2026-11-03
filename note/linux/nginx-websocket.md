---
title: Nginx 配置 WebSocket 代理
lastUpdated: 2023-12-21 10:39:19
---

从版本 `1.3.13` 开始，`nginx` 实现了特殊的操作模式，如果代理服务器返回代码为 `101`，并且客户端通过请求进行协议切换，则允许在客户端和代理服务器之间建立隧道。

```
location /ws/ {
    proxy_pass http://127.0.0.1:9000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```
一个更复杂的示例，其中对代理服务器的请求中的 `Connection` 字段的值取决于客户端请求标头中是否存在 `Upgrade` 字段：
```
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    server {
        ...

        location /ws/ {
            proxy_pass http://127.0.0.1:9000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }
    }
}
```
默认情况下，如果代理服务器在 60 秒内没有传输任何数据，连接将被关闭。可以使用proxy_read_timeout指令增加此超时 。或者，代理服务器可以配置为定期发送 WebSocket ping 帧以重置超时并检查连接是否仍然有效。
