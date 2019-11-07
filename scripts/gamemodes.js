/**
This is the script containing the launch options for different gamemodes.
*/

function InitialiseGame(playerName) {

  // Set up the game controls
  InitialiseController();

  let boardSize = 64;
  Board(boardSize, boardSize);

  // For now, just spawn the player at a random, empty tile
  var x = Math.floor(Clamp(Math.random() * boardWidth, 0, boardWidth));
  var y = Math.floor(Clamp(Math.random() * boardHeight, 0, boardHeight));
  while(!board[x][y].isEmpty) {
    var x = Math.floor(Clamp(Math.random() * boardWidth, 0, boardWidth));
    var y = Math.floor(Clamp(Math.random() * boardHeight, 0, boardHeight));
  }
  player = Player(playerName, x * PIXELS_PER_TILE, y * PIXELS_PER_TILE);
  player.alive = true;

  InitialiseCanvas(boardSize);


  addPowerUp();
  
  // Call to start the game tick
  Timer();
}