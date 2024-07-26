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

**修改最新提交记录**

```shell
git commit --amend
```

**删除远程**

```shell
git remote rm origin
```

**修改远程地址**

```shell
git config remote.origin.url "git@github.com:username/xxx.git"
```

**一台电脑多 GitHub 账号设置**

1. 在 `.ssh` 文件夹下创建 `config` 文件
2. 进行以下相关配置

    > Host：别名
    >
    > HostName：地址
    >
    > IdentityFile：公钥地址
    >
    > User：用户

    ```text  
    # company  
    Host company  
    HostName github.com  
    IdentityFile ~/.ssh/id_company  
    PreferredAuthentications publickey  
    User company  
      
    # person  
    Host person  
    HostName github.com  
    IdentityFile ~/.ssh/id_person  
    PreferredAuthentications publickey  
    User person  
    ```  

3. 测试
    ```shell  
    # ssh -T git@Host  
    ssh -T git@company  
      
    # 成功结果  
    Hi company! You've successfully authenticated, but GitHub does not provide shell access.  
    ```  
4. 清楚全局默认 `user.name` 和 `user.email`
    ```shell  
    git config --global --unset user.namegit config --global --unset user.email
    ```  
5. 在对应项目中添加 `user.name` 和 `user.email`
    ```shell  
    git config --local user.name xxxgit config --local user.email xxx@xxx.com
    ```

## 撤销 commit

**编辑提交信息**

```shell  
git commit --amend
```  

**撤销回滚上版本**

```shell  
git reset --soft HEAD~1
```  

> 如果你进行了 2 次 `commit`，想都撤回，可以使用 `HEAD~2`
>
> 注意，这个命令仅仅是撤回 `commit` 操作，写的代码仍然保留
>
>`--mixed`
>
> 不删除工作空间改动代码，撤销 `commit`，并且撤销 `git add .` 操作
>
> 这个为默认参数，`git reset --mixed HEAD^` 和 `git reset HEAD^` 效果是一样的。
>
> `--soft`
>
> 不删除工作空间改动代码，撤销 `commit`，不撤销 `git add .`
>
> `--hard`
>
> 删除工作空间改动代码，撤销 `commit`，撤销 `git add .`
>
>注意完成这个操作后，会删除工作空间代码！！！恢复到上一次的 `commit` 状态。慎重！！！
