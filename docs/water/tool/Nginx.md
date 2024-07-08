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

### 静态服务

> 通过 `Nginx` 访问静态文件，可在 `server` 模块中进行配置，有以下几种种方式：

- **通过 `alias` 关键字**

> 通过浏览器访问 `yourdomain.com/static/file.txt`，则访问的文件地址为：`/path/to/your/static/files/file.txt`

```bash
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;  # 修改为你的域名

  location /static/ {
    alias /path/to/your/static/files;  # 修改为你的静态文件目录路径
    expires 30d;
  }

  # 其他配置项...
  
}
```

- **使用 `root` 关键字**

> 通过浏览器访问 `yourdomain.com/static/file.txt`，则访问的文件地址为：`/path/to/your/static/files/static/file.txt`

```bash
server /static/ {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;  # 修改为你的域名

  root /path/to/your/static/files;  # 修改为你的静态文件目录路径
  index index.html;

  # 其他配置项...
}

```

- **使用 `try_files` 关键字**

```bash
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;  # 修改为你的域名

  location /static/ {
    try_files $uri $uri/ /path/to/your/static/files/$uri;  # 修改为你的静态文件目录路径
  }

  # 其他配置项...
}
```
