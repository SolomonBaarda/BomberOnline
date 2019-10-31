/**
This is the script for controlling the player movement.
*/

// Boolean values for the active direction
var up, down, left, right;

function InitialiseController() {
  // Add keyboard listeners to the page
  document.addEventListener("keydown", KeyDown, false);
  document.addEventListener("keyup", KeyUp, false);

  console.log("Keyboard listeners added.");
}


function KeyDown(e) {
  if(e.keyCode != undefined) {
    var key = e.keyCode;

    // Key is left
    if(key == 37 || key == 65) {
      moveLeft();
      left = true;
    }
    // Key is right
    if(key == 39 || key == 68) {
      moveRight();
      right = true;
    }
    // Key is up
    if(key == 38 || key == 87) {
      moveUp();
      up = true;
    }
    // Key is down
    if(key == 40 || key == 83) {
      moveDown();
      down = true;
    }
    // Key is shift 
    if(key == 16) {
      moveWalk();
    }
  }
}

function KeyUp(e) {
  if(e.keyCode != undefined) {
    var key = e.keyCode;

    // Key is left
    if(key == 37 || key == 65) {
      left = false;
      if(right) {
        moveRight()
      }
      else {
        resetVelX();
      }
    }
    // Key is right
    if(key == 39 || key == 68) {
      right = false;
      if(left) {
        moveLeft()
      }
      else {
        resetVelX();
      }
    }
    // Key is up
    if(key == 38 || key == 87) {
      up = false;
      if(down) {
        moveDown()
      }
      else {
        resetVelY();
      }
    }
    // Key is down
    if(key == 40 || key == 83) {
      down = false;
      if(up) {
        moveUp()
      }
      else {
        resetVelY();
      }
    }
    // Key is shift 
    if(key == 16) {
      moveRun();
    }
  }
}
