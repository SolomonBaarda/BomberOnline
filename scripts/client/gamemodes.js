/**
This is the script containing the launch options for different gamemodes.
*/

var players;
var playerName;


function saveUsername(name) {
  playerName = name;
}


function BattleRoyale() {
  hideWelcomeBox();
  showGame();

  loadBattleRoyale(playerName);
}

function Tutorial() {
  hideWelcomeBox();
  showGame();

}




function loadBattleRoyale(playerName) {

  let boardSize = 64;
  Board(boardSize, boardSize);

  // For now, just spawn the player at a random, empty tile
  var x = Math.floor(Clamp(Math.random() * boardWidth, 0, boardWidth));
  var y = Math.floor(Clamp(Math.random() * boardHeight, 0, boardHeight));
  while (!board[x][y].isEmpty) {
    var x = Math.floor(Clamp(Math.random() * boardWidth, 0, boardWidth));
    var y = Math.floor(Clamp(Math.random() * boardHeight, 0, boardHeight));
  }
  player = Player(playerName, x * PIXELS_PER_TILE, y * PIXELS_PER_TILE);
  player.isAlive = true;

  // Set up the game controls
  InitialiseController(player);

  players = [];
  players[0] = player;

  InitialiseCanvas();
  InitialiseMap();

  //addPowerUp();

  // Call to start the game tick
  Timer();
}

// Function that is called when the player dies 
function GameOver() {
  RemoveController();
}



function UpdatePlayers() {
  for (var i = 0; i < players.length; i++) {
    players[i].update();
  }
}