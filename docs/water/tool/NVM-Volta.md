# NVM 和 Volta

Volta 和 NVM 都是用于管理 Node.js 版本的工具

## NVM

**安装**  
  
> 安裝NVM之前，一律建议您从系统中移除任何现有的 `Node.js` 或 `npm` 安裝，因为不同类型的安装可能导致奇怪且困惑的冲突。  
  
1. Run `npm cache clean --force`  
2. Uninstall from Programs & Features with the uninstaller.  
3. Reboot (or you probably can get away with killing all node-related processes from Task Manager).  
4. Look for these folders and remove them (and their contents) if any still exist. Depending on the version you installed, UAC settings, and CPU architecture, these may or may not exist:  

    ```text  
    C:\Program Files (x86)\Nodejs  
    C:\Program Files\Nodejs  
    C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)  
    C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)  
    C:\Users\{User}\.npmrc (and possibly check for that without the . prefix too)  
    C:\Users\{User}\AppData\Local\Temp\npm-*  
    ```  
5. Check your %PATH% environment variable to ensure no references to Nodejs or npm exist.  
  
> 这包括刪除任何现有的 `nodejs` 安裝目录 (例如，可能会保留的 "C:\Program Files\nodejs" ) 。  
> `NVM` 产生的连接将不会覆盖现有的（甚至是空的）安装目录。 https://stackoverflow.com/questions/20711240/how-to-completely-remove-node-js-from-windows  
> 如需移除先前安裝的说明，請參閱如何從 `Windows` 完全移除 `node.js`。 )
  
**使用**
  
1. 确保卸载系统中的 `nodejs`  
2. windows [开源库地址](https://github.com/coreybutler/nvm-windows#installation--upgrades)，[下载地址](https://github.com/coreybutler/nvm-windows/releases)  
3. 两种方式设置下载源
    ```shell  
    # 1.在 nvm 安装根路径找到 `setting.txt` 加入下载源的设置
    node_mirror: https://npm.taobao.org/mirrors/node/  
    npm_mirror: https://npm.taobao.org/mirrors/npm/  
   
    # 2.命令设置
    nvm npm_mirror https://npmmirror.com/mirrors/npm/
    nvm node_mirror https://npmmirror.com/mirrors/node/
    ```
4. `nvm instal version`  
5. `nvm use version`  
6. `nvm list`  
7. `nvm uninstall version`


## Volta

**安装**

[详见](https://volta.sh/)

**使用**

```shell
# volta 版本
volta -v 

# volta 已安装集合
volta list

# volta 安装
volta install node@version
volta install yarn@lastet

# volta pin 命令将更新项目的 package.json 文件以使用选定版本的工具。
volta pin node@10.5.0


```
