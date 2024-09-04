# YT-DLP

`yt-dlp` 是一个强大的命令行工具，用于从 `YouTube` 和其他数百个视频平台下载视频和音频。它是 `youtube-dl` 的一个 `fork`，具有更多的功能和优化。

[地址](https://github.com/yt-dlp/yt-dlp)

## 安装


## 使用

**列出 URL 下所有资源**
```shell
yt-dlp -F --list-formats [URl]
yt-dlp -F https://xxx.xx.com/xx
```

**下载 ID 的指定文件**
```shell
yt-dlp -f[ID] [URL]

# 如
yt-dlp -f315+251 https://xxx.xx.com/xx
```
