var socket = io();
socket.on('message', function(data) {
  console.log("message data: "+data);
});
