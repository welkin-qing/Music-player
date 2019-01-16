<?PHP

	require_once('connect.php');
	
	$sql = "select name , musicName from music_list"; //查询music_list数据表
	
	$query = mysql_query($sql);
	
	if( $query && mysql_num_rows($query) ){
		while($row = mysql_fetch_assoc($query)){
			$data[] = $row;
		}
		echo json_encode($data);
	}

?>