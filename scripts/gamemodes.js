/**
This is the script containing the launch options for different gamemodes.
*/

function InitialiseGame(playerName) {

  // Set up the game controls
  InitialiseController();

  let boardSize = 64;
  Board(boardSize, boardSize);

  Player(playerName, boardSize/2 * PIXELS_PER_TILE, boardSize/2 * PIXELS_PER_TILE);

  InitialiseCanvas(boardSize);

  // Call to start the game tick
  Timer();
}