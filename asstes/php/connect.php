<?PHP

	header("Content-type: text/html; charset=utf-8");  //指定编码
	$con = mysql_connect('localhost', 'root', '123456wq');   // 连接数据库
	mysql_select_db("testajax");   //连接指定的数据库
	mysql_query('set names utf8');  //指定数据库编码 

?>