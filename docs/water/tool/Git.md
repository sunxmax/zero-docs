# Git

## 常用命令

**创建 Git 项目**

```shell
# 初始化
git init

# 添加远程仓库
git remote add origin <your-repo-URL>

# 添加文件并提交更改
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到 GitHub 仓库
git push -u origin main

```

**设置用户名和邮箱**

```shell
# 全局设置
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 单项目设置
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 查看设置（全局）
git config --global --list
# 查看设置（单个项目）
git config --list

```

**删除本地 Git信息**

通过删除 .git 目录来实现。

```shell
rm -rf .git
```
