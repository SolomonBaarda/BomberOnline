/**
This is the script for the database.
*/


var socket = io();
socket.on('message', function(data) {
  console.log("message data: "+data);
});



const mysql = require('mysql');

// Create connection to the database
// Port 3306
const connection = mysql.createConnection({
  host: 'sql2.freesqldatabase.com',
  user: 'sql2313046',
  password: 'wP1%fL5!',
  database: 'sql2313046'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});