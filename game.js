/**
This is the script for the database.
*/


var socket = io();
socket.on('message', function(data) {
  console.log("message data: "+data);
});


