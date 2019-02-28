[简体中文](https://github.com/welkin-qing/Music-player) | English

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

# Installation and use

#### 1. Database installation

1. First you need to install wampserver

2. Design table (as shown below)

![Music_list](https://github.com/welkin-qing/Music-player/blob/master/img/music_list.png)

3. Connect to database
```php
<?PHP

	header("Content-type: text/html; charset=utf-8");  //Specifies the encoding
	$con = mysql_connect('localhost', '****', '****');   // Connect to database
	mysql_select_db("****");   //Connect to the specified database
	mysql_query('set names utf8');  //Specify database encoding

?>
```
#### 2. Install the project locally

```
git clone https://github.com/welkin-qing/Music-player
cd Music-player
```
Open the index.html page under the WWW folder

------

# ajax + mysql Set up the music player

#### Use PHP for background processing

- Index is the project entry file

- Music_list. js is the music list

#### Complete the opening of the player page
1. Initially welkin, music player identity
2. Do not display the play button

#### Complete the function of music playback
1. Click music to play music
2. Complete the loading of lyrics
3. Complete the pause and play button and the operation of the next and previous buttons on the lyrics page

------

##### Upload code
1. git add .
2. git commit -m "提交信息"
3. git push

