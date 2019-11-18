// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

// JS Module imports
var person = require('./scripts/client/player.js');

app.set('port', 8080);
app.use(express.static('./'));

// Routing to index.html
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
server.listen(8080, function() {
  console.log('Server started on port 8080');
});

// Update player movement on the server.
var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: player.x,
      y: player.y
    };
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    
  });
});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);
