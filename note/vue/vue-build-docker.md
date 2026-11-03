---
title: Vue 项目打包成 Docker 镜像
lastUpdated: 2024-01-11 14:15:41
---

## 项目构建 
```
npm run build
```
## 编写Dockerfile

- 项目根目录创建 `Dockerfile`

```
FROM nginx:latest
COPY /dist /usr/share/nginx/vue_dist
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

- 项目根目录创建 `nginx.conf`

```
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    root   /usr/share/nginx/vue_dist;
    index  index.html index.htm;

    error_page   500 502 503 504  /50x.html;

    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    location / {  
        try_files $uri $uri/ /index.html;       
    }
    
    location /api/ {
        proxy_pass   http://localhost:9999/api/;
    }
}
```

## 打包镜像

> 本机已安装并登录 `Docker`

- 生成 `vue_dist` 镜像

``` sh
docker build -t vue_dist .

docker tag vue_dist:latest hub.docker.com/lufuhu/vue_dist:latest

docker push  hub.docker.com/lufuhu/vue_dist:latest
```

- 运行 `vue_dist` 镜像

``` sh
docker run -dit -p 80:80 --name vue_dist_1 vue_dist
```

- 访问

浏览器打开：http://localhost
