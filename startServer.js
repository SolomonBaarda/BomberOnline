// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 8080);
app.use(express.static('./'));


app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
server.listen(8080, function() {
  console.log('Server started on port 8080');
});


// Add socketIO handler
io.on('connection', function(socket) {
});
