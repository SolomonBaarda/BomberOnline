<?php

  $dbhost = "bomberonline.database.windows.net";
  $dbuser = "matthewreidy";
  $dbpass = "BomberOnlineF28WP";
  $dbname = "live_table";

  // Connect to sql server.
  $conn = mysql_connect($dbhost, $dbuser, $dbpass);

  $sql = 'SELECT * FROM live_table';
  $rowCount = 'SELECT COUNT(*) FROM Tasks';
  mysql_select_db('live_table');
  $retval = mysql_query($sql, $conn);
  $retrows = mysql_query($rowCount, $conn);

  if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }

   while($row = mysql_fetch_array($retval, MTSQL_ASSOC)) {
     echo COL1;
   }

  mysql_close($conn);
?>
