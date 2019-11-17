/**
This is the script for the player class.
*/

// Maximum speed the player can move at
const MAX_SPEED = 2;
// Maximum amount of bombs allowed
const DEFAULT_MAX_BOMBS = 1;
// Strength of bombs by default
const DEFAULT_BOMB_POWER = 1;

// Initialise new player
function Player(name, x, y) {
  let player = {
    // Store the players unique name
    name: name,

    // x and y position of the image on the board
    x: x,
    y: y,
    isAlive: false,
    // Player size in pixels
    size: 3 * PIXELS_PER_TILE / 4,

    // Player's current speed
    speed: MAX_SPEED,
    // Current velocities for x and y directions
    velX: 0,
    velY: 0,
    // Boolean for slow walk
    isRunning: true,

    // Maximum bombs allowed on the field
    currentMaxBombs: DEFAULT_MAX_BOMBS,
    activeBombs: 0,
    currentBombPower: DEFAULT_BOMB_POWER,

    // Reference to the element image
    sprite: undefined,

    // Move functions - they set the x and y velocities
    moveUp: function () {
      this.velY = -this.speed;
    },
    moveDown: function () {
      this.velY = this.speed
    },
    moveLeft: function () {
      this.velX = -this.speed
    },
    moveRight: function () {
      this.velX = this.speed
    },
    resetVelX: function () {
      this.velX = 0;
    },
    resetVelY: function () {
      this.velY = 0;
    },
    moveWalk: function () {
      this.isRunning = false;
    },
    moveRun: function () {
      this.isRunning = true;
    },

    // Function for updating the players position
    update: function () {
      // Set player bounds ie they cannot move past these points
      let minX = 0;
      let minY = 0;
      let maxX = boardWidth * PIXELS_PER_TILE - this.size;
      let maxY = boardHeight * PIXELS_PER_TILE - this.size;

      // Set current movement speed
      if (this.isRunning) {
        this.speed = MAX_SPEED;
      }
      else {
        this.speed = MAX_SPEED / 2;
      }

      // Store old values before checking collision
      let oldX = this.x;
      let oldY = this.y;

      // Update x position
      let newX = Clamp(this.x + this.velX, minX, maxX);

      // Update new x position
      if (newX != oldX) {
        this.x = newX;
        // Ensure it is a valid move before comitting to it
        if (!isValidMove(oldX, oldY, this.size, this.x, this.y)) {
          this.x = oldX;
        }
      }

      // Update y position
      var newY = Clamp(this.y + this.velY, minY, maxY);

      // Update new y position
      if (newY != oldY) {
        this.y = newY;
        // Ensure it is a valid move before comitting to it
        if (!isValidMove(this.x, oldY, this.size, this.x, this.y)) {
          this.y = oldY;
        }
      }

      // This movement style works well for objects moving at a slow speed. If they
      // move faster, then they may appear to collide in front of the wall. In this
      // case, movement would need to be done in smaller steps. Check out
      // https://jonathanwhiting.com/tutorial/collision/ for an explanation on collision.

      // Update the camera position to correctly render
      setCameraPosCentre(this.x + this.size / 2, this.y + this.size / 2);
    }

  }
  // Set image
  player.sprite = setImage();
  console.log("Player has been set.");

  return player;

  function setImage() {
    let playerTag = document.getElementById('player');
    // Set the image source
    playerTag.src = "sprites/player.jpg";
    playerTag.position = "absolute";

    // Use canvas to render image now
    $("#player").hide();

    return playerTag;
  }

  // End of player
}

function getPlayerX() {
  return player.x;
}

function getPlayerY() {
  return player.y;
}
