// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');

var socketIO = require('socket.io');
var app = express();

var server = http.Server(app);
var io = socketIO(server);

// JS Module imports


// Routing to index.html
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});


var port = process.env.port || 5000;
console.log(port);


/*
app.set('port', 8080);
app.use(express.static('./'));
*/


// Start the server
server.listen(port, function () {
  console.log('Server started on port ' +port);
});


/*
  ************************************************************
*/

io.on('connection', (socket) => {
  console.log("Connected");
  
});

  // initalize a new player object
  socket.on('new player', (name, maxX, maxY) => {
      
  });

  socket.on('updatePlayer', (keyHandler) => {

  });

  socket.on('disconnect', (reason) => {
 
  });

// Main clock for the game 
setInterval(() => {
  if (players.length > 0) {
      io.sockets.emit('drawPlayers', players);
  }
}, 1000 / TICKS_PER_SECOND);


