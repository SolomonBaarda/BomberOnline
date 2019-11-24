/**
This is the script containing the launch options for different gamemodes.
*/

var players = [];
var playerName;

const BATTLE_ROYALE_BOARD_SIZE = 16;


function saveUsername(name) {
  playerName = name;
}


function BattleRoyale() {
  hideWelcomeBox();
  showGame();

  // Just for now until the server works 
  generateBattleRoyale();

  loadBattleRoyale(playerName);
}

function Tutorial() {
  hideWelcomeBox();
  showGame();

  loadTutorial(playerName);
}


function SpawnPlayer(playerName, x, y) {
  player = Player(playerName, (x * PIXELS_PER_TILE) + ((PIXELS_PER_TILE - DEFAULT_PLAYER_SIZE) / 2), (y * PIXELS_PER_TILE) + ((PIXELS_PER_TILE - DEFAULT_PLAYER_SIZE) / 2));

  // Set up the game controls
  InitialiseController(player);

  if (players == undefined) {
    players = [];
  }

  players.push(player);
}



function removePlayer(player) {
  // Remove the right player
  for (var i = 0; i < gameObjects.length; i++) {
    if (players[i] === player) {
      // Remove the bomb from game objects
      players.splice(i, 1);
    }
  }

  delete (player);
}


function loadBattleRoyale(playerName) {
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
  let width = 24;
  let height = 7;

  generateTutorial(width, height);

  SpawnPlayer(playerName, 3, 3);

  StartGame()
}



function StartGame() {
  InitialiseCanvas();
  InitialiseMap();

  // Call to start the game tick
  Timer();
}

/**
 * Function that stops the game. To be called when the player dies, or to quit.
 */
function EndGame() {
  RemoveController();
  StopTimer();
}




function clearPlayers() {
  delete (players);

  players = undefined;
}




function UpdatePlayers() {
  for (var i = 0; i < players.length; i++) {
    players[i].update();
  }
}
