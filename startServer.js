var express = require('express');
var app = express();
var server = require('http').createServer(app);

// Initialise espress server
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use('/', express.static(__dirname + '/'));

console.log("Server started.")
//End of express initialisation

//Socket IO
var io = require('socket.io')(server);

io.sockets.on('connection', function(socket){

});
server.listen(8080);
