# Homebrew 安装使用

## 基本命令

```shell
# 查看 homebrew 版本
brew -v

# 更新 homebrew 版本
brew update

# 移除不需要的依赖
brew autoremove

# 查看本地安装软件
brew list

# 查找软件
brew search xxx
```

## 安装卸载

```shell
# 安装软件
brew install xxx

brew cask install xxx

# 卸载软件
brew uninstall xxx

brew cask uninstall xxx

# 查看软件安装位置
which xxx
```

## Casks 使用

> [官方教程](https://github.com/Homebrew/homebrew-cask/blob/master/USAGE.md)

```shell
# 自定义 cask 安装的文件（url 为 cask 安装文件地址）
brew cask install <url> 
```

## 配置国内源

```shell
# brew 程序本身，Homebrew/Linuxbrew 相同
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
  
# 以下针对 mac OS 系统上的 Homebrew
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git
git -C "$(brew --repo homebrew/cask-fonts)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-fonts.git
git -C "$(brew --repo homebrew/cask-drivers)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-drivers.git
  
# 以下针对 Linux 系统上的 Linuxbrew
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/linuxbrew-core.git
  
# 更换后测试工作是否正常
brew update
```

## Mac 多版本 JDK

> [https://tecadmin.net/install-java-macos/](https://tecadmin.net/install-java-macos/)

### 安装 JDK8

1. brew 安装
`brew install openjdk@8`

2. 软连接
```
sudo ln -sfn /usr/local/opt/openjdk@8/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-1.8.jdk
```

### 安装 JDK17

1. brew 安装
`brew install openjdk@17

2. 软连接
```
sudo ln -sfn /usr/local/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
```

## NVM 安装  
  
```bash  
export NVM_DIR="$HOME/.nvm"[ -s "$(brew --prefix)/opt/nvm/nvm.sh" ] && . "$(brew --prefix)/opt/nvm/nvm.sh" # This loads nvm  
[ -s "$(brew --prefix)/opt/nvm/etc/bash_completion.d/nvm" ] && . "$(brew --prefix)/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion  
  
Reload .bash_profile for the aliases to take effect:source ~/.bash_profile 或 source ~/.zshrc
```  
