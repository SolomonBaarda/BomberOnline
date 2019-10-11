/**
This is the script for the main game tick.
*/

myTime = null;
const TICKS_PER_SECOND = 60;

// The main game clock function
function Timer() {
  Update();

  // Call timer again in 1 tick
  myTime = setTimeout('Timer()', 1000/TICKS_PER_SECOND);
}

// The main update method will call others
function Update() {
  // Update the player
  UpdatePlayer();


  console.log("Game updated");
}
