/**
This is the script containing the launch options for different gamemodes.
*/

function InitialiseGame() {
  // Set up the game controls
  InitialiseController();

  let boardSize = 64;
  Board(boardSize, boardSize);

  InitialiseCanvas(boardSize);

  // Call to start the game tick
  Timer();
}