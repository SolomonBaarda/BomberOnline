/**
This is the script for controlling the player movement.
*/

// Boolean values for the active direction
var up, down, left, right;
var player;

function InitialiseController(player) {
  this.player = player;

  // Add keyboard listeners to the page
  document.addEventListener("keydown", KeyDown, false);
  document.addEventListener("keyup", KeyUp, false);

  console.log("Keyboard listeners added.");
}


function KeyDown(e) {
  if (e.keyCode != undefined) {
    var key = e.keyCode;

    // Key is left
    if (key == 37 || key == 65) {
      player.moveLeft();
      left = true;
    }
    // Key is right
    if (key == 39 || key == 68) {
      player.moveRight();
      right = true;
    }
    // Key is up
    if (key == 38 || key == 87) {
      player.moveUp();
      up = true;
    }
    // Key is down
    if (key == 40 || key == 83) {
      player.moveDown();
      down = true;
    }
    // Key is spacebar 
    if (key == 32) {
      dropBomb(player);
    }
    // Key is shift 
    if (key == 16) {
      player.moveWalk();
    }
    //key is q
    if (key == 81) {
      // Unused for now
    }
    //key is e
    if (key == 69) {
      // Unused for now
    }
  }
}

function KeyUp(e) {
  if (e.keyCode != undefined) {
    var key = e.keyCode;

    // Key is left
    if (key == 37 || key == 65) {
      left = false;
      if (right) {
        player.moveRight()
      }
      else {
        player.resetVelX();
      }
    }
    // Key is right
    if (key == 39 || key == 68) {
      right = false;
      if (left) {
        player.moveLeft()
      }
      else {
        player.resetVelX();
      }
    }
    // Key is up
    if (key == 38 || key == 87) {
      up = false;
      if (down) {
        player.moveDown()
      }
      else {
        player.resetVelY();
      }
    }
    // Key is down
    if (key == 40 || key == 83) {
      down = false;
      if (up) {
        player.moveUp()
      }
      else {
        player.resetVelY();
      }
    }
    // Key is shift 
    if (key == 16) {
      player.moveRun();
    }
  }
}
