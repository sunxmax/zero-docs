# Arthas 使用

## 介绍

> `Arthas` 是 `Alibaba` 开源的 `Java` 诊断工具，深受开发者喜爱。

当你遇到以下类似问题而束手无策时，`Arthas`可以帮助你解决：

- 这个类从哪个 `jar` 包加载的？为什么会报各种类相关的 `Exception`？
- 我改的代码为什么没有执行到？难道是我没 `commit`？分支搞错了？
- 遇到问题无法在线上 `debug`，难道只能通过加日志再重新发布吗？
- 线上遇到某个用户的数据处理有问题，但线上同样无法 `debug`，线下无法重现！
- 是否有一个全局视角来查看系统的运行状况？
- 有什么办法可以监控到 `JVM` 的实时运行状态？
- 怎么快速定位应用的热点，生成火焰图？
- 怎样直接从 `JVM` 内查找某个类的实例？

## 使用

- [下载 arthas-boot.jar](https://arthas.aliyun.com/math-game.jar)

- 启动 `arthas-boot.jar`

```shell
java -jar arthas-boot.jar
```

- 选择程序的PID，进入程序中

[//]: # (![选择PID进入程序]&#40;../../assets/image/arthas-pid.png&#41;)

## 热更新

- 查找/反编译源文件

```shell
# 使用 sc 查看JVM已加载的类信息(以Test类为示例)
sc com.masily.Test
```

- 使用 `jad` 反编译 `Test` 类
- 使用 `idea` 修改 `Test` 类
- 修改后编译成 `class` 字节码
- 上传到服务器中
- 使用 `redefine` 进行热更新

```shell
# 注：Windows 文件路径需要加转义符 `/`
# 如 redefine D://arthas//classes//Test.class
redefine /usr/local/arthas/classes/Test.class
```

- 控制台返回

```shell
# 当返回success时,表示代码已在jvm中重新加载
redefine success, size: 1
```
