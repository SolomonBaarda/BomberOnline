<?php

  $dbhost = "bomberonline.database.windows.net";
  $dbuser = "matthewreidy";
  $dbpass = "BomberOnlineF28WP";
  $dbname = "player_info";

  // Connect to sql server.
  $conn = mysql_connect($dbhost, $dbuser, $dbpass);

  // Select database.
  mysql_select_db($dbname) or die(mysql_error());

  // Retrieve data from query string.
  $playerName = $_GET['username'];
  $playerPassword = $_GET['password'];
  $highScore = $_GET['highScore'];

  // Build Query.
  $query = "SELECT * FROM player_info WHERE playerName = '$playerName'
          AND playerPassword = '$playerPassword' AND highScore = '$highScore'";

  // Execute query
  $qry_result = mysql_query($query) or die(mysql_error());

  // Build Result string
  echo $query;
  header('Content-Type: text/plain');
  exit();
?>
