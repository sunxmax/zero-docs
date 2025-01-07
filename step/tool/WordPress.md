# WordPress

## Windows

### 前期准备

**PHP**

> WordPress 是基于 PHP 开发的，所以需要先安装 PHP 环境。

1. [下载 PHP](https://www.php.net/downloads.php)
2. 解压到指定目录，例如 D:\php
3. 将 PHP 目录添加到系统环境变量 PATH 中
4. 验证安装：`php -v`
5. 配置 PHP：找到 php.ini-development 文件，复制为 php.ini，根据需要修改配置（内存限制、上传大小等）
    - 开启扩展目录：在 php.ini 文件中取消注释 `extension_dir = "ext"`。
    - 开启数据与PHP交互扩展：在 php.ini 文件中取消注释 `extension=pdo_mysql`。
    - 开始 MySQL 扩展：在 php.ini 文件中取消注释 `extension=mysqli`。
6. 启动 php-cgi（用于通过 FastCGI 协议与 Web 服务器（如 Nginx）进行 PHP 请求处理。）
   > 在命令行中输入 `php-cgi.exe -b 127.0.0.1:9000` 启动 php-cgi，也可以通过将其加入 Windows 服务来启动。
   >
   > 启动 php-cgi 后，可以通过访问 `http://localhost:9000/phpinfo.php` 来验证 php-cgi 是否启动成功。
   >
   > 关于 Nginx 的相关配置后面会介绍。
   
**Nginx**

> WordPress 是基于 Web 服务器运行的，这里使用 Nginx 作为 Web 服务器。

1. [下载 Nginx](http://nginx.org/en/download.html)
2. 解压到指定目录，例如 D:\nginx
3. 配置 Nginx：找到 nginx.conf 文件，修改配置文件。
     ```nginx
     server {
         listen       80;
         server_name  localhost;
         root   html;
         index  index.php index.html index.htm;
         location / {
             try_files $uri $uri/ /index.php?$args;
         }
     # WordPress 在子目录的配置
     location /wordpress {
         root E:\www;
         index index.php;
         try_files $uri $uri/ /wordpress/index.php?$args;

         # PHP 处理
         location ~ \.php$ {
                 fastcgi_pass   127.0.0.1:9000;
                 fastcgi_index  index.php;
                 fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
                 include        fastcgi_params;
            }
         }
     }
     ```
4. 启动 Nginx：在命令行中输入 `nginx.exe` 启动 Nginx，也可以通过将其加入 Windows 服务来启动。

**WordPress**

1. [下载 WordPress 压缩包](https://cn.wordpress.org/download/releases/)，解压到服务器的web目录下。例如：E:/www/wordpress
2. 已配置好的 Nginx （上述步骤）和 PHP （上述步骤）
3. 浏览器打开 `http://localhost/wordpress` 进入安装界面，根据提示进行安装。
