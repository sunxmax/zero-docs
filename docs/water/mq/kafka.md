# Kafka

`kafka` 是一个由 `scala` 编写，分布式的消息队列系统，基于 `Topic`（主题）和 `partitions`（分区） 的设计，能达到非常高的消息发送处理性能。

## 基本概念

### Broker（集群）

`Kafka` 集群由一个或多个 `Broker` 组成,每个 `Broker` 是一个独立的 `Kafka` 服务器。

### Topic（主题）

`Kafka` 中的消息通过主题进行分类，每条发布到 `Kafka` 集群的消息都有一个类别，这个类别被称为 `Topic`。

每个主题就像一个消息队列,可以接收来自多个生产者的消息,并将这些消息传递给多个消费者。

一个 `Topic` 的消息可能保存于一个或多个 `Broker` 上，但用户只需指定消息的 `Topic` 即可生产或消费数据而不必关心数据存于何处。

### Producer（生产者）

生产者负责将数据发布到 Kafka 的主题中。

### Consumer（消费者）

消费者从 Kafka 主题中读取数据。

`Consumer Group` 每个 Consumer 属于一个特定的 `Consumer Group`（可为每个 `Consumer` 指定 `Consumer Group`，
若不指定 `Consumer Group` 则属于默认的 group）。

### Partition（分区）

每个主题可以划分为多个分区，以提高并行度和可扩展性。

一个 `topic`（主题） 可以包含多个 `partition`（分区），且分区可分布在不同的 `broker`（代理）上

### Replica（副本）

副本分为：`leader` 副本和 `follower` 副本，生产者和消费者只和 `leader` 副本进行通信，`follower` 副本通过拉取 `leader`
副本进行同步。

如果 `leader` 副本所在的 `breaker` 突然挂了，会通过 `follower` 副本选举出新的 `leader` 副本。

::: details 多分区与多副本

多分区 （`partition`） 和 多副本（`replica`）机制的好处？

- 多分区：给 `topic` 指定多个 `partition` 分布在不同的 `broker` 上，可提供较好的并发性（负载均衡）。
- 多副本：指定 `partition` 多个 `replica` 数，可提高消息的可靠性和容灾能力，但多副本增加了存储成本。

:::

## 主要特性

- 高吞吐量：能够处理大量的消息。
- 低延迟：毫秒级的消息处理能力。
- 可扩展性：轻松扩展集群以处理更多数据。
- 持久性：消息被持久化到磁盘,提供数据冗余。
- 容错性：集群中的部分节点失效不会影响整体服务。

## 应用场景

- 消息系统：作为传统消息中间件的替代方案
- 日志聚合：收集各种服务的日志信息
- 流处理：实时处理大量数据流
- 事件溯源：捕获和持久化状态变更事件

## 使用

通过 `docker-compose.yml` 搭建

```yaml
version: "2"

# 该镜像具体配置参考 https://github.com/bitnami/bitnami-docker-kafka/blob/master/README.md

services:

  zookeeper:
    image: bitnami/zookeeper:latest
    container_name: zookeeper
    ports:
      - "2181:2181"
    networks:
      - app-tier
    #    volumes:
    #      - "zookeeper_data:/bitnami"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes # 匿名登录--必须开启

  kafka:
    image: bitnami/kafka:latest
    container_name: kafka
    ports:
      - "9092:9092"
    networks:
      - app-tier
    #    volumes:
    #      - "kafka_data:/bitnami"
    environment:
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_BROKER_ID=1
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092
      - ALLOW_PLAINTEXT_LISTENER=yes
    depends_on:
      - zookeeper

networks:
  app-tier:
    driver: bridge
```

## FAQ

1. 如何获取 topic 主题的列表？

    ```shell
    bin/kafka-topics.sh --list --zookeeper localhost:2181
    ```
2. 生产者和消费者的命令行是什么？

   ```shell
   # 生产者在主题上发布消息：
   bin/kafka-console-producer.sh --broker-list 192.168.43.49:9092 --topic
   Hello-Kafka
   # 注意这里的 IP 是 server.properties 中的 listeners 的配置。接下来每个新行就是
   # 输入一条新消息。
   # 消费者接受消息：
   bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic
   Hello-Kafka --from-beginning
   ```

3. consumer 是推还是拉？

   在这方面，`Kafka` 遵循了一种大部分消息系统共同的传统的设计：`producer` 将消息推送到 `broker`，`consumer` 从 `broker`
   拉取消息。`push` 缺点：由 `broker` 决定消息推送的速率，对于不同消费速率的 consumer 就不太好处理了。当 `broker`
   推送的速率远大于 `consumer` 消费的速率时，`consumer` 恐怕就要崩溃了。`Pull` 优点：`consumer`
   可以自主决定是否批量的从 `broker` 拉取数据。Pull 模式下 `consumer` 就可以根据自己的消费能力去决定这些策略。`Pull`
   缺点：如果 `broker` 没有可供消费的消息，将导致 `consumer` 不断在循环中轮询，直到新消息到达。为了避免这点，`Kafka`
   有个参数可以让 `consumer` 阻塞知道新消息到达。

4. 讲讲 kafka 维护消费状态跟踪的方法？
5. 讲一下主从同步？
6. 为什么需要消息系统，mysql 不能满足需求吗？
7. Zookeeper 对于 Kafka 的作用是什么？
8. 数据传输的事务定义有哪三种？
9. Kafka 判断一个节点是否还活着有那两个条件？
10. Kafka 与传统 MQ 消息系统之间有三个关键区别？
11. 讲一讲 kafka 的 ack 的三种机制？
12. 消费者如何不自动提交偏移量，由应用提交？
13. 消费者故障，出现活锁问题如何解决？

14. 如何控制消费的位置？

    `kafka` 使用 `seek(TopicPartition, long)` 指定新的消费位置。用于查找服务器保留的最早和最新的 `offset`
    的特殊的方法也可用 `seekToBeginning(Collection)` 和 `seekToEnd(Collection)`

15. kafka 分布式（不是单机）的情况下，如何保证消息的顺序消费？

    > `Kafka` 分布式的单位是 `Partition`，同一个 `Partition` 用一个 `write ahead log` 组织，所以可以保证 `FIFO`
    > 的顺序。不同 `Partition` 之间不能保证顺序。
    >
    > 在消费端，`Kafka` 保证，1 个 `partition` 只能被 1 个 `consumer` 消费。
    >
    > 所以需要保证顺序消费只需要消息在一个分区 `partition` 中即可。

    `Kafka` 中发送 1 条消息的时候，可以指定(`topic`, `partition`, `key`) 3 个参数。`partition` 和 `key` 是可选的。

    - 指定 `partition`：那就是所有消息发往同 1 个 `partition`，就是有序的。

    - 指定 `key`：具有同 1 个 `key` 的 所有消息，会发往同 1 个 `partition`。

16. kafka 的高可用机制是什么？

17. kafka 如何减少数据丢失？

18. kafka 如何不消费重复数据？比如扣款，我们不能重复的扣。

    - 生产者发送数据时加入唯一性 `id` 字段。
    - 用此字段查询是否有该条数据，根据是否包含唯一性 `id` 的数据进行是否处理业务判断。
