# FFmpeg 使用

FFmpeg 是一个开源的多媒体处理工具，可以用于视频、音频的录制、转换以及流处理。它功能强大且支持多种格式，被广泛应用于多媒体处理的各个领域。

## 安装

### 在 Windows 上安装
1. 访问 [FFmpeg 官网](https://ffmpeg.org/download.html)。
2. 下载预编译的 Windows 版本。
3. 解压缩下载的压缩包。
4. 将 `bin` 文件夹的路径添加到系统的环境变量中。

### 在 macOS 上安装
1. 打开终端，确保 Homebrew 已安装。
2. 运行以下命令安装 FFmpeg：
    ```bash
    brew install ffmpeg
    ```

### 在 Linux 上安装
1. 打开终端，根据你的 Linux 发行版执行以下命令：
    - Ubuntu/Debian：
    ```bash
    sudo apt update
    sudo apt install ffmpeg
    ```
    - CentOS/Fedora：
    ```bash
    sudo yum install epel-release
    sudo yum install ffmpeg
    ```

## 常用命令

### 基本命令

```bash
# 查看 FFmpeg 版本
ffmpeg -version

# 获取帮助文档
ffmpeg -h

```
### 视频格式转换
```bash
# 例如，将 MP4 转换为 AVI 格式
ffmpeg -i input.mp4 output.avi
```
### 提取视频

```bash
# 提取视频，无音频 
ffmpeg -i input.mp4 -an output.mp4
```
### 提取音频

```bash
# 可以从视频中提取音频，并将其保存为 MP3 文件
ffmpeg -i input.mp4 -q:a 0 -map a output.mp3
```

### 视频压缩

```bash
# 可以对视频进行压缩，以减少文件大小：
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 output.mp4
```

### 截取视频片段

```bash
# 截取视频的特定片段。例如，从 00:01:00 开始，截取 30 秒的视频
ffmpeg -i input.mp4 -ss 00:01:00 -t 00:00:30 -c copy output.mp4

# 基于时间戳的截取,指定起始和结束时间来截取视频片段
ffmpeg -i input.mp4 -ss 00:01:30 -to 00:02:00 -c copy output.mp4

# 指定帧数截取
ffmpeg -i input.mp4 -vf "select='between(n,30,300)'" -vsync vfr output.mp4

# 使用帧率截取
ffmpeg -i input.mp4 -r 1 -ss 00:01:30 -t 00:00:10 output.mp4

```

### 切成图片

```bash
# 将视频的每一帧都保存为一张图片
# frame_%04d.png: 输出图片文件名格式，这里会生成如 frame_0001.png, frame_0002.png 等文件
ffmpeg -i input.mp4 frame_%04d.png

# 每秒提取一帧，可以使用 -r 参数设置帧率（-r 1: 设置输出帧率为每秒 1 帧）
ffmpeg -i input.mp4 -r 1 frame_%04d.png

# 每 n 秒提取一帧，可以使用复杂的滤镜命令
ffmpeg -i input.mp4 -vf "fps=1/5" frame_%04d.png

# 提取视频某一时间段的帧
# -ss 00:00:30: 从 30 秒开始提取
# -to 00:01:00: 提取到 1 分钟结束
ffmpeg -ss 00:00:30 -to 00:01:00 -i input.mp4 frame_%04d.png

# 提取特定帧（如每 100 帧）
# select=not(mod(n\,100)): 每 100 帧选一帧
ffmpeg -i input.mp4 -vf "select=not(mod(n\,100)),setpts=N/FRAME_RATE/TB" -vsync vfr frame_%04d.png

```

### 合并视频

合并多个视频文件。首先创建一个包含文件列表的文本文件（如 `filelist.txt`），文件内容如下：

```
file 'input1.mp4'
file 'input2.mp4'
file 'input3.mp4'
```
然后运行以下命令进行合并：

```bash
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
```

### 合并音视频

一个视频文件（没有音频）和一个音频文件，可以使用以下命令合并它们

```bash
# 简单合并视频和音频
ffmpeg -i video.mp4 -i audio.aac -c:v copy -c:a aac output.mp4

# 确保音视频同步
ffmpeg -i video.mp4 -i audio.aac -shortest -c:v copy -c:a aac output.mp4

# 设置延迟
ffmpeg -i video.mp4 -itsoffset 00:00:02 -i audio.aac -c:v copy -c:a aac output.mp4

# 调整音频音量
ffmpeg -i video.mp4 -i audio.aac -c:v copy -af "volume=1.5" output.mp4


# -i video.mp4 是输入视频文件。
# -i audio.aac 是输入音频文件。
# -c:v copy 表示复制视频流而不重新编码。
# -c:a aac 表示将音频编码为 AAC 格式（如果音频已经是 AAC 格式，可以使用 -c:a copy 来复制音频流而不重新编码）。
# volume=1.5 表示将音量增大 1.5 倍。你可以根据需要调整这个值。
```

### 添加水印

```bash
# 例如，使用以下命令将图片水印添加到视频的左上角
ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=10:10" output.mp4

# -i watermark.png：指定要叠加的水印图片 watermark.png。
# -filter_complex "overlay=10:10"：应用 overlay 滤镜，将水印图片叠加在视频的坐标 (10, 10) 处，即视频左上角向右和向下偏移 10 像素的位置。
# output.mp4：输出的带有水印的视频文件名为 output.mp4。
```
### 转换视频分辨率

```bash
# 例如，将视频的分辨率改为 1280x720
ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4
```

### 生成 GIF

```bash
# 可以将视频片段转换为 GIF 动画
ffmpeg -i input.mp4 -vf "fps=10,scale=320:-1:flags=lanczos" -ss 00:00:10 -t 5 output.gif

# -vf 是视频滤镜选项，表示对输入视频应用一系列滤镜。
# fps=10：这个滤镜设置输出帧率为每秒 10 帧 (Frames Per Second)，即从视频中每秒提取 10 帧图像。
# scale=320:-1：这是一个缩放滤镜，将视频缩放到宽度 320 像素，高度设置为 -1，意味着高度会按比例自动调整，以保持原始的宽高比不变。
# flags=lanczos：指定使用 Lanczos 算法进行缩放。Lanczos 是一种高级的图像缩放算法，能够在缩放时保持较高的图像质量。
# -ss 用于指定从视频的哪个时间点开始处理。这里表示从视频的第 10 秒处开始提取帧。
# -t 用于设置输出的持续时间。这里表示提取 5 秒长的视频片段。结合 -ss 参数，这个命令会从视频的第 10 秒开始提取，持续 5 秒的片段。
```



