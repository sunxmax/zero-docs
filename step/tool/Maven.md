# Maven

## 私有 Maven 仓库

### Windows

#### 下载

> 获取初始管理员密码
> 
> 查看文件：安装目录\sonatype-work\nexus3\admin.password

1. 下载地址：[Download](https://help.sonatype.com/en/orientdb-downloads.html)
2. 下载 Windows 版本的 nexus-3.x.x-xx-win64.zip

#### 解压

将下载的文件解压到指定目录，例如 C:\nexus

   > 目录结构应该如下：
   > 
   > C:\nexus\nexus-3.x.x
   > 
   > C:\nexus\sonatype-work

#### 启动

在 Windows 上启动 Nexus 服务有两种主要方式：

1. 直接运行启动命令：
   ```shell
   # 切换到 Nexus bin 目录
   cd xxx\nexus-3.x.x\bin
   
   # 直接启动
   .\nexus.exe /run
   ```

2. 通过 Windows 服务管理器：
    - 打开 Windows 服务（services.msc）
    - 找到名为 "nexus" 的服务
    - 右键选择"启动"或"重启"

   ::: details 服务方式启动详解
   如果要以服务方式运行，需要先注册服务：
   
   ```shell
   # 以管理员权限运行 PowerShell
   cd xxx\nexus-3.x.x\bin
   
   # 安装服务
   .\nexus.exe /install
   
   # 移除服务（如果需要的话）
   .\nexus.exe /uninstall
   ```
   
   安装为服务后，也可以使用 PowerShell 命令来控制服务：
   
   ```shell
   Start-Service nexus    # 启动服务
   Stop-Service nexus     # 停止服务
   Restart-Service nexus  # 重启服务
   ```
   :::

#### 使用

1. 访问地址：`http://localhost:8081`

2. 输入管理员账号密码
   - 用户名：admin
   - 密码：查看文件：xxx\sonatype-work\nexus3\admin.password
   - 第一次登录需要修改密码

3. 一些最佳实践：
   - 正式发布用 releases 仓库
   - 开发中用 snapshots 仓库
   - 定期清理旧的 snapshot 版本
   - 重要的第三方包要上传到 3rd party 仓库

4. 配置 Maven 仓库

   1. 编辑 Maven 的 settings.xml 文件
      ```xml
                  <servers>
                    <server>
                      <id>nexus-releases</id>
                      <username>your-username</username>
                      <password>your-password</password>
                    </server>
                  </servers>
          
                  <mirrors>
                    <mirror>
                      <id>nexus</id>
                      <mirrorOf>*</mirrorOf>
                      <url>http://localhost:8081/repository/maven-public/</url>
                    </mirror>
                  </mirrors>
      ```
   2. 在项目的 pom.xml 中添加仓库配置
   
       ```xml
               <!-- 配置私服仓库地址 -->
                 <repositories>
                     <!-- 私服快照版本仓库 -->
                     <repository>
                         <id>nexus-snapshots</id>
                         <url>http://172.16.6.143:8081/repository/maven-snapshots/</url>
                         <releases>
                             <enabled>false</enabled>
                         </releases>
                         <snapshots>
                             <enabled>true</enabled>
                             <updatePolicy>always</updatePolicy>
                         </snapshots>
                     </repository>
                     <!-- 私服发布版本仓库 -->
                     <repository>
                         <id>nexus-releases</id>
                         <url>http://172.16.6.143:8081/repository/maven-releases/</url>
                         <releases>
                             <enabled>true</enabled>
                         </releases>
                         <snapshots>
                             <enabled>false</enabled>
                         </snapshots>
                     </repository>
                 </repositories>
      
                 <!-- 配置私服部署地址 -->
                 <distributionManagement>
                     <!-- 发布版本仓库 -->
                     <repository>
                         <id>nexus-releases</id>
                         <url>http://172.16.6.143:8081/repository/maven-releases/</url>
                     </repository>
                     <!-- 快照版本仓库 -->
                     <snapshotRepository>
                         <id>nexus-snapshots</id>
                         <url>http://172.16.6.143:8081/repository/maven-snapshots/</url>
                     </snapshotRepository>
                 </distributionManagement>
       ```
      
5. 使用场景
   > 发布项目：使用 mvn deploy 命令发布你的项目到私服

   - Browse：浏览和搜索构件
   - Upload：上传第三方 JAR 包
   - Security > Users：管理用户和权限
   - System > Tasks：配置定时任务，如清理旧的快照版本
   - 正式发布用 releases 仓库
   - 开发中用 snapshots 仓库
   - 定期清理旧的 snapshot 版本

::: details 忘记密码
Nexus 管理员密码忘记了有几种恢复方式：

1. 如果是新装的系统，查看初始密码：
   ```
   xxx\sonatype-work\nexus3\admin.password
   ```

2. 如果已经更改过密码，可以重置为随机密码：
   - 停止 Nexus 服务
   - 删除数据库文件：
     ```
     删除目录：xxx\sonatype-work\nexus3\db\security
     ```
   - 删除 `admin.password` 文件
   - 重启 Nexus
   - 系统会生成新的 `admin.password` 文件
   - 用新生成的密码登录，然后重新设置你的密码

3. 如果以上方法都不行，可以完全重置：
   - 停止 Nexus 服务
   - 备份 `sonatype-work/nexus3` 目录（保存已有的包）
   - 删除整个 `sonatype-work/nexus3` 目录
   - 重启 Nexus，会重新初始化
   - 查看新生成的 `admin.password` 文件获取密码
:::
