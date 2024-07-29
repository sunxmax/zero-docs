# SQLite

SQLite 是一个广泛使用的轻量级关系型数据库管理系统（RDBMS），以其快速、便捷和自包含而著称。

## 安装

[下载地址](https://www.sqlite.org/)

**Windows**

1. 下载 `sqlite-dll-win64-x64-3390300.zip`
2. 下载 `sqlite-tools-win32-x86-3390300.zip`
3. 新建文件夹（如：`D:/app/sqlite3`）
4. 将步骤 1、2 中的文件解压放到步骤 3 中的目录中
5. 新建 data 文件夹（`D:/app/sqlite3/data`）用于持久化数据
6. 在 data 文件夹下创建一个 *.sqlite 文件
7. Navicat 中连接 SQLite

## 使用

**SpringBoot**

- 依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <!--jdbc-->
    <dependency>
        <groupId>org.xerial</groupId>
        <artifactId>sqlite-jdbc</artifactId>
        <version>3.39.2.1</version>
    </dependency>
    <!--方言-->
    <dependency>
        <groupId>com.github.gwenn</groupId>
        <artifactId>sqlite-dialect</artifactId>
        <version>0.1.2</version>
    </dependency>
</dependencies>
```
- yml 配置

```yaml
spring:
  datasource:
    # 因为没有用户名和密码，所以这两个参数就没有值
    username:
    password:
    # 创建的 sqlite 数据库所在路径
    url: jdbc:sqlite:D:\App\Dev_App\sqlite\data\sqlite-demo.sqlite3
    driver-class-name: org.sqlite.JDBC

  jpa:
    generate-ddl: true
```
