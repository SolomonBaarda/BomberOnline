/**
This is the script for controlling the player movement.
*/

// Boolean values for the active direction
var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

var player;

function InitialiseController(player) {
  this.player = player;

  // Add keyboard listeners to the page
  document.addEventListener("keydown", KeyDown, false);
  document.addEventListener("keyup", KeyUp, false);

  console.log("Keyboard listeners added.");
}

function RemoveController() {
  document.removeEventListener("keydown", KeyDown);
  document.removeEventListener("keyup", KeyUp);

  console.log("Keyboard listeners removed");
}

function KeyDown(e) {
  if (e.keyCode != undefined) {
    var key = e.keyCode;

    // Key is left
    if (key == 37 || key == 65) {
      player.moveLeft();
      movement.left = true;

    }
    // Key is right
    if (key == 39 || key == 68) {
      player.moveRight();
      movement.right = true;

    }
    // Key is up
    if (key == 38 || key == 87) {
      player.moveUp();
      movement.up = true;

    }
    // Key is down
    if (key == 40 || key == 83) {
      player.moveDown();
      movement.down = true;

    }
    // Key is spacebar
    if (key == 32) {
      player.dropBomb();
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
      movement.left = false;
      if (movement.right) {
        player.moveRight()
      }
      else {
        player.resetVelX();
      }
    }
    // Key is right
    if (key == 39 || key == 68) {
      movement.right = false;
      if (movement.left) {
        player.moveLeft()
      }
      else {
        player.resetVelX();
      }
    }
    // Key is up
    if (key == 38 || key == 87) {
      movement.up = false;
      if (movement.down) {
        player.moveDown()
      }
      else {
        player.resetVelY();
      }
    }
    // Key is down
    if (key == 40 || key == 83) {
      movement.down = false;
      if (movement.up) {
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

// Calls InitialiseController on the server
//socket.emit('new player');
//Sends the keyboard inputs of the client to the server 60x a second
// setInterval(function () {
//   socket.emit('movement', movement);
// }, 1000 / 60);
