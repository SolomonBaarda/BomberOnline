/**
This is the script for the main game tick.
*/

myTime = null;
var tickCount = 0;
var playerScore = 0;
var playerTime = 0;

const pScore = document.querySelector("#tableScore");
const pTime = document.querySelector("#tableTime");


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

  // Render map 4 times per second as its pretty laggy
  if (tickCount % (TICKS_PER_SECOND / 4) == 0) {
    RenderMap();
  }

  if (tickCount % 8 == 0) {
    playerScore++;
  }

  if (tickCount % TICKS_PER_SECOND == 0) {
    playerTime++;

    tickCount = 0;
  }

  pScore.innerHTML = playerScore;
  pTime.innerHTML = playerTime;

}


function StopTimer() {
  clearTimeout(myTime);
}
