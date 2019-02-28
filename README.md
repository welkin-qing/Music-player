简体中文 | [English](./README.zh-English.md) 

<div align="center">

![myLogo](https://github.com/welkin-qing/Music-player/blob/master/img/mylogo.png)


A music player that works with ajax+ PHP based on a mysql database.

一个基于mysql数据库使用ajax+php工作的音乐播放器。

![](https://github.com/welkin-qing/Music-player/blob/master/img/release-1.0-darkcyan.svg)
![](https://github.com/welkin-qing/Music-player/blob/master/img/build-passing-brightgreen.svg)
![](https://github.com/welkin-qing/Music-player/blob/master/img/dependencies-up%20to%20date-brightgreen.svg)
![](https://github.com/welkin-qing/Music-player/blob/master/img/license-MIT-darkcyan.svg)

</div>

------

# 安装及使用

#### 1. 数据库安装
1. 首先需要安装wampserver

2. 设计表（如下所示）

![Music_list](https://github.com/welkin-qing/Music-player/blob/master/img/music_list.png)

3. 连接数据库
```php
<?PHP

	header("Content-type: text/html; charset=utf-8");  //指定编码
	$con = mysql_connect('localhost', '****', '****');   // 连接数据库
	mysql_select_db("****");   //连接指定的数据库
	mysql_query('set names utf8');  //指定数据库编码 

?>
```
#### 2. 安装项目到本地

```
git clone https://github.com/welkin-qing/Music-player
cd Music-player
```
在www文件夹下打开 index.html 页面

------

# ajax + mysql 搭建音乐播放器

#### 使用php做后台处理

- index为项目入口文件

- music_list.js为音乐列表

#### 完成打开播放器初识页面
1. 初始为welkin，音乐播放器标识
2. 不显示播放按钮

#### 完成音乐播放的功能
1. 点击音乐后完成音乐的播放
2. 完成歌词的加载
3. 完成到歌词页面的暂停和播放按钮和下一曲和上一曲按钮的操作

------

##### 上传代码
1. git add .
2. git commit -m "提交信息"
3. git push

