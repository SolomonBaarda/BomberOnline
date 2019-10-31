/**
This is the script for the main game tick.
*/

myTime = null;

// The main game clock function
function Timer() {
  // Update method that calls all sub update methods
  Update();
  // Render method that calls all sub render methods 
  Render();

  // Call timer again in 1 tick
  myTime = setTimeout('Timer()', 1000/TICKS_PER_SECOND);
}

// The main update function will call all others
function Update() {
  // Update the player
  UpdatePlayer();

  //console.log("Game updated");
}
