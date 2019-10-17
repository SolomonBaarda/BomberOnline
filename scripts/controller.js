/**
This is the script for the game controls.
*/

var up, down, left, right;

function InitialiseController() {
  // Add keyboard listeners to the page
  document.addEventListener("keydown", KeyDown, false);
  document.addEventListener("keyup", KeyUp, false);
}



function KeyDown(e) {
  if(e.keyCode != undefined) {
    var key = e.keyCode;

    // left
    if(key == 37 || key == 65) {
      moveLeft();
      left = true;
    }
    // Right
    if(key == 39 || key == 68) {
      moveRight();
      right = true;
    }
    // Up
    if(key == 38 || key == 87) {
      moveUp();
      up = true;
    }
    // Down
    if(key == 40 || key == 83) {
      moveDown();
      down = true;
    }
  }
}

function KeyUp(e) {
  if(e.keyCode != undefined) {
    var key = e.keyCode;

    // Left
    if(key == 37 || key == 65) {
      left = false;
      if(right) {
        moveRight()
      }
      else {
        resetVelX();
      }
    }
    // Right
    if(key == 39 || key == 68) {
      right = false;
      if(left) {
        moveLeft()
      }
      else {
        resetVelX();
      }
    }
    // Up
    if(key == 38 || key == 87) {
      up = false;
      if(down) {
        moveDown()
      }
      else {
        resetVelY();
      }
    }
    // Down
    if(key == 40 || key == 83) {
      down = false;
      if(up) {
        moveUp()
      }
      else {
        resetVelY();
      }
    }
  }
}

// Old
// function KeyDown(e) {
//   if(e.keyCode != undefined) {
//     switch (e.keyCode) {
//
//       // Move left
//       case 37:
//       moveLeft();
//       break;
//
//       // Move right
//       case 39:
//       moveRight();
//       break;
//
//       // Move up
//       case 38:
//       moveUp();
//       break;
//
//       // Move down
//       case 40:
//       moveDown();
//       break;
//     }
//   }
//
// }
