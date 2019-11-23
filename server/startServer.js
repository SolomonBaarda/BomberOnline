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
  console.log('Server started on port ' + port);
});


/*
  ************************************************************
*/

console.log(board);

// Generate the board for the server
generateBattleRoyale();

console.log(board);


io.on('connection', (socket) => {
  console.log("Player connected");

  // Initalize a new player object
  socket.on('new player', (username) => {
    // This function creates a new player and spawns them
    loadBattleRoyale(username)
    console.log("Player " + username + " added to the game.");
  });



  // Update a players position 
  socket.on('updatePlayer', (keyHandler) => {
    // get player from server and set its x and y to the player here
    // local player has all the collision detection so just set them to be the same 


  });

  // Disconnect the player from the game if they disconect 
  socket.on('disconnect', (reason) => {

    // First get the player 

    // Remove them 
    removePlayer(player);
  });

});





// Main clock for the game 
setInterval(() => {
  if (players.length > 0) {
    io.sockets.emit('Timer');
  }
}, 1000 / TICKS_PER_SECOND);


