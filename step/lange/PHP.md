# PHP

## 环境配置

### 安装

- **Windows**

    ```bash
    # 下载 PHP
    访问 php.net 下载 PHP ZIP 包
    解压到如 C:\php 目录
    将 PHP 目录添加到系统环境变量 PATH
    ```

- **Mac**

    ```bash
    # 使用 Homebrew 安装
    brew install php
    ```

- **Linux** (Ubuntu)
    ```bash
    sudo apt update
    sudo apt install php
    ```

::: details 

验证安装：
```bash
php -v  # 查看 PHP 版本
```

配置 PHP：
- 找到 php.ini-development 文件
- 复制为 php.ini
- 根据需要修改配置（内存限制、上传大小等）

创建第一个 PHP 文件：
```php
<?php
// hello.php
echo "Hello, World!";
?>
```

运行 PHP：

本地开发服务器：
```bash
php -S localhost:8000
```
然后访问 `http://localhost:8000/hello.php`
:::
