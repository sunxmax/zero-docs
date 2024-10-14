# MongoDB

`MongoDB` 官方文档地址 [点击查看](https://www.mongodb.com/docs/manual/tutorial/getting-started/)

**为什么使用 MongoDB？**

**面向文档**

由于MongoDB是NoSQL类型的数据库，它不是以关系类型的格式存储数据，而是将数据存储在文档中。这使得MongoDB非常灵活，可以适应实际的业务环境和需求。

**临时查询**

MongoDB支持按字段，范围查询和正则表达式搜索。可以查询返回文档中的特定字段。

**索引**

可以创建索引以提高MongoDB中的搜索性能。MongoDB文档中的任何字段都可以建立索引。

复制-MongoDB可以提供副本集的高可用性。副本集由两个或多个mongo数据库实例组成。

每个副本集成员可以随时充当主副本或辅助副本的角色。主副本是与客户端交互并执行所有读/写操作的主服务器。

辅助副本使用内置复制维护主数据的副本。当主副本发生故障时，副本集将自动切换到辅助副本，然后它将成为主服务器。

**负载平衡**

MongoDB使用分片的概念，通过在多个MongoDB实例之间拆分数据来水平扩展。MongoDB可以在多台服务器上运行，以平衡负载或复制数据，以便在硬件出现故障时保持系统正常运行。


## 基本概念


**数据库（Database）**

MongoDB 中可以存在多个数据库，每个数据库中中用有不同的集合与用户权限，这样可以供不同的项目组使用不同的数据库。

**集合（Collection）**

集合指的是文档组（类似于 Mysql 中的表的概念），里面可以存储许多文档。

**文档（Document）**

文档是 MongoDB 中最基本的数据单元，由键值对组成，类似于 JSON 格式，可以存储不同字段，字段的值可以包括其他文档，数组和文档数组。

**字段（filed）**

文档中的字段，类似于关系型数据库中的列。

**主键（_id）**

主键主要作用是用于保证数据完整性，加快数据库的访问速度，方便快速定位某个文档。在 MongoDB 中可以手动指定文档主键 ID，如果未手动指定则 MongoDB 会生成 12 位的 ObjectID。

**索引（index）**

索引是一种特殊的数据结构，存储在一个易于遍历读取的数据集合中，其能够对数据库文档中的数据进行排序的一种结构。索引通常能极大提高文档查询效率，如果没有设置索引，MongoDB 会遍历集合中的整个文档，选取符合查询条件的文档记录。这种查询效率是非常低的，当处理大量时，查询可能需要花费几十秒甚至几分钟，这对网站的性能是非常致命的。

**聚合（aggregation）**

MongoDB 中聚合主要用于处理数据处理，例如统计平均值、求和等，可以快速通过聚合操作，汇总数据，尤其是对绘制图表添加了便利。


## 数据类型

**String**

字符串，存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。

**Integer**

整型数值，用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。

**Boolean**

布尔值，用于存储布尔值（true/false）。

**Double**

双精度浮点值，用于存储浮点值。

**Min/Max keys**

将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。

**Array**

用于将数组或列表或多个值存储为一个键。

**Timestamp**

时间戳。记录文档修改或添加的具体时间。

**Object**

用于内嵌文档。

**Null**

用于创建空值。

**Symbol**

符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。

**Date**

日期时间，用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。

**Object ID**

对象 ID，用于创建文档的 ID。

**Binary Data**

二进制数据，用于存储二进制数据。

**Code**

代码类型，用于在文档中存储 JavaScript 代码。

**Regular expression**

正则表达式类型，用于存储正则表达式。

## 应用

**docker compose 开启 MongoDB 服务**

::: details 详细

`docker compose up -d` 启动成功后可以浏览器访问 `http://localhost:8081`，进入 `mongo-express` 对 `MongoDB` 进行管理。

```yaml

version: '3.1'


services:


  mongo:

    image: mongo

    container_name: mongodb

    restart: always

    ports:

      - "27017:27017"

    environment:

      MONGO_INITDB_ROOT_USERNAME: root

      MONGO_INITDB_ROOT_PASSWORD: 123456


  mongo-express:

    image: mongo-express

    container_name: mongo-express

    restart: always

    ports:

      - "8081:8081"

    environment:

      ME_CONFIG_MONGODB_ADMINUSERNAME: root

      ME_CONFIG_MONGODB_ADMINPASSWORD: 123456

      ME_CONFIG_MONGODB_URL: mongodb://root:123456@mongo:27017/

```
:::


**SpringBoot 种调用 API**

1. 添加 maven 依赖

    ```xml
    
    <dependency>
    
      <groupId>org.springframework.boot</groupId>
    
      <artifactId>spring-boot-starter-data-mongodb</artifactId>
    
    </dependency>
    
    ```

2. 配置 `application.yml`

    ```yaml
    
    spring:
    
      data:
    
        mongodb:
    
          host: localhost
    
          port: 27017
    
          database: demo
    
          username: root
    
          password: 123456
    
    ```
