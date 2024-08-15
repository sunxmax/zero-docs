# Nginx

## 安装

[下载地址](http://nginx.org/en/download.html)，下载解压后即可使用

## 结构

Nginx 的配置结构图

```
main # 全局配置
├── events # 配置网络连接
├── http # 配置代理、缓存、日志等
│ ├── upstream # 配置负载均衡
│ ├── server # 配置虚拟主机，可以有多个 server
│ ├── server
│ │ ├── location # 用于匹配 URI（URL 是 URI 的一种），可以有多个 location
│ │ ├── location  
│ │ └── ...  
│ └── ...  
└── ...  
```

## 配置

### 添加 SSL

**配置**

```shell
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    # SSL 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

    # HSTS (可选，但推荐)
    add_header Strict-Transport-Security "max-age=63072000" always;

    # 其他服务器配置...
}
```

**HTTP 重定向 HTTPS（可选，但推荐）**
> 添加一个额外的服务器块来重定向HTTP流量到HTTPS：
```shell
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

### 静态服务

> 通过 `Nginx` 访问静态文件，可在 `server` 模块中进行配置，有以下几种种方式：

1. 使用 `root` 指令：

   配置：
   ```nginx
   server {
       listen 80;
       server_name example.com;
       root /var/www/example.com;
   }
   ```

   文件路径和URL关系：
    - 如果访问 http://example.com/image.jpg
    - Nginx会查找文件 /var/www/example.com/image.jpg

   root指令会将URL的完整路径附加到指定的根目录后。

2. 使用 `alias` 指令：

   配置：
   ```nginx
   location /static/ {
       alias /var/www/files/;
   }
   ```

   文件路径和URL关系：
    - 如果访问 http://example.com/static/image.jpg
    - Nginx会查找文件 /var/www/files/image.jpg

   alias会用指定的路径替换location匹配的部分。

3. 使用 `try_files` 指令：

   配置：
   ```nginx
   location / {
       root /var/www/example.com;
       try_files $uri $uri/ /index.html;
   }
   ```

   文件路径和URL关系：
    - 如果访问 http://example.com/page
    - Nginx会依次尝试：
        1. /var/www/example.com/page
        2. /var/www/example.com/page/index.html
        3. 如果都不存在，则返回 /var/www/example.com/index.html

4. 为特定文件类型配置：

   配置：
   ```nginx
   location ~* \.(jpg|jpeg|png|gif)$ {
       root /var/www/images;
       expires 30d;
   }
   ```

   文件路径和URL关系：
    - 如果访问 http://example.com/photos/image.jpg
    - Nginx会查找文件 /var/www/images/photos/image.jpg

5. 使用 `autoindex`：

   配置：
   ```nginx
   location /downloads/ {
       root /var/www;
       autoindex on;
   }
   ```

   文件路径和URL关系：
    - 如果访问 http://example.com/downloads/
    - Nginx会显示 /var/www/downloads/ 目录的内容列表

注意事项：

- 使用root时，完整的URL路径会被附加到root指定的路径后。
- 使用alias时，只有location匹配后的部分会被附加到alias指定的路径后。
- 路径末尾的斜杠很重要，可能会影响文件的查找。
