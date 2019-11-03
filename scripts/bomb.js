/*
This is the script for the bomb
*/


/*
bomb placed with press of key on th players location
has a time limit
when explodes destroys destructible in the vicinity
*/

function Bomb(xPos, yPos, seconds) {
  let bomb = {
    x: xPos,
    y: yPos,
    timer: TICKS_PER_SECOND * seconds,

    // Update function is called once per tick
    update: function () {
      timer--;
      if (timer <= 0) {
        // explode - add this function at new needed game object manager script 
        bombExplode(x, y);
      }
    }
  }

  return bomb;
}

// this should be in the player object
function bombDrop() {
  x = getPlayerX;
  y = getPlayerY;
}
