/**
This is the script for the main game tick.
*/

myTime = null;
var tickCount = 0;

// The main game clock function
function Timer() {
  // Update method that calls all sub update methods
  Update();
  // Render method that calls all sub render methods 
  Render();

  // Call timer again in 1 tick
  myTime = setTimeout('Timer()', 1000 / TICKS_PER_SECOND);
}

// The main update function will call all others
function Update() {
  // Update the player
  UpdatePlayers();

  // Update the collisions on the board 
  UpdateBoard();

  //console.log("Game updated");
}

// The main render function 
function Render() {
  tickCount++;

  // Render the main canvas
  RenderCanvas()

  // Render map twice per second as its pretty laggy 
  if (tickCount % (TICKS_PER_SECOND / 2) == 0) {
    RenderMap();
    tickCount = 0;
  }
}

function stopTimer() {
  clearTimeout(myTime);
}
