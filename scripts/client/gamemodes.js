/**
This is the script containing the launch options for different gamemodes.
*/

var players = [];
var playerName;

const BATTLE_ROYALE_BOARD_SIZE = 64;


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

  loadTutorial(playerName);
}


function SpawnPlayer(playerName, x, y) {
  player = Player(playerName, x * PIXELS_PER_TILE, y * PIXELS_PER_TILE);

  // Set up the game controls
  InitialiseController(player);

  players.push(player);
}


function loadBattleRoyale(playerName) {
  generateBattleRoyale(BATTLE_ROYALE_BOARD_SIZE, BATTLE_ROYALE_BOARD_SIZE);

  // For now, just spawn the player at a random, empty tile
  let x = Math.floor(Clamp(Math.random() * BATTLE_ROYALE_BOARD_SIZE, 0, BATTLE_ROYALE_BOARD_SIZE));
  let y = Math.floor(Clamp(Math.random() * BATTLE_ROYALE_BOARD_SIZE, 0, BATTLE_ROYALE_BOARD_SIZE));
  while (!board[x][y].isEmpty) {
    x = Math.floor(Clamp(Math.random() * BATTLE_ROYALE_BOARD_SIZE, 0, BATTLE_ROYALE_BOARD_SIZE));
    y = Math.floor(Clamp(Math.random() * BATTLE_ROYALE_BOARD_SIZE, 0, BATTLE_ROYALE_BOARD_SIZE));
  }
  SpawnPlayer(playerName, x, y);

  StartGame()
}

function loadTutorial(playerName) {
  generateTutorial(24, 8);

  SpawnPlayer(playerName, 4, 4);

  StartGame()
}



function StartGame() {
  InitialiseCanvas();
  InitialiseMap();

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