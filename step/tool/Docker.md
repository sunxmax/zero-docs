# Docker 使用

记录 `Docker` 和 `Docker Compose` 的使用以及常用服务的 `docker-componse.yml` 配置

::: tip
官网文档链接：https://docs.docker.com/engine/install/centos/
:::

## `Docker` 安装使用

### 移除旧版本

```shell  
sudo yum remove docker \docker-client \  
docker-client-latest \  
docker-common \  
docker-latest \  
docker-latest-logrotate \  
docker-logrotate \  
docker-engine  
```  

### 安装 `yum-utils` 包

```shell  
sudo yum install -y yum-utils
```  

### 配置镜像仓库

```sh  
# 默认配置  
sudo yum-config-manager \  
--add-repo \  
https://download.docker.com/linux/centos/docker-ce.repo  
  
# 配置阿里云  
sudo yum-config-manager \  
--add-repo \  
https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo  
```  

### 安装 `docker-ce`

```sh  
sudo yum install docker-ce docker-ce-cli containerd.io
```  

### 启动/验证

```shell
# 启动
sudo systemctl enable dockersudo systemctl start docker
# 验证
sudo docker run hello-world
```

::: details 
```shell
# 更新 Docker CE
sudo yum update docker-ce
# 卸载 Docker CE
sudo yum remove docker-ce

# 删除本地文件(注意，docker 的本地文件，包括镜像(images), 容器(containers), 存储卷(volumes)等，都需要手工删除。默认目录存储在 `/var/lib/docker`。)
sudo rm -rf /var/lib/docker
```  
:::

### `Docker` 常用命令

```shell 
# 进入容器
docker exec -it CONTAINER bash

## 查看日志
docker logs [OPTIONS] CONTAINER  
# 示例  
docker logs -f -t -n=10


```  
::: details

详细命令可通过 `docker logs --help` 查看

```shell  
Usage: docker logs [OPTIONS] CONTAINER  
  
Fetch the logs of a container  
  
Options:  
--details Show extra details provided to logs  
-f, --follow Follow log output  
--since string Show logs since timestamp (e.g.  
2013-01-02T13:23:37Z) or relative (e.g. 42m for 42  
minutes)  
-n, --tail string Number of lines to show from the end of the logs  
(default "all")  
-t, --timestamps Show timestamps  
--until string Show logs before a timestamp (e.g.  
2013-01-02T13:23:37Z) or relative (e.g. 42m for 42  
minutes)  
```  

> `-f`: 查看实时日志
>
> `--since`: 此参数指定了输出日志开始日期，即只输出指定日期之后的日志。
>
> `-n`：从日志末尾显示的行数
>
> `--tail`：查看最后的10条日志。
>
> `-t`：查看日志产生的日期
>
> `CONTAINER`：容器（名称/id）
:::


## Docker Compose

> 官网相关文档：https://docs.docker.com/compose/install/

### 安装

```sh  
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose  
```  

> If you have problems installing with `curl`,
> see [Alternative Install Options](https://docs.docker.com/compose/install/#alternative-install-options) tab above

### 文件夹授权

```sh  
sudo chmod +x /usr/local/bin/docker-compose
```  

> **Note**: If the command `docker-compose` fails after installation, check your path. You can also create a symbolic
> link to `/usr/bin` or any other directory in your path.

### 验证安装

```sh  
docker-compose --version  
```  

::: tip
.env 文件

在 `docker-compose.yml` 中一些可变参数（如：版本号等），可使用 `.env`
文件统一管理环境变量的方式。[中文文档地址](https://dockerdocs.cn/compose/environment-variables/index.html)  
:::

## 常用服务
