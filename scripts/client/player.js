/**
This is the script for the player class.
*/

// Maximum speed the player can move at
const MAX_SPEED = 2;
// Maximum amount of bombs allowed
const DEFAULT_MAX_BOMBS = 1;
// Strength of bombs by default
const DEFAULT_BOMB_POWER = 1;

const DEFAULT_PLAYER_SIZE = 3 * PIXELS_PER_TILE / 4;

// Initialise new player
function Player(name, x, y) {
  let player = {
    // Store the players unique name
    name: name,

    // x and y position of the image on the board
    x: x,
    y: y,
    isAlive: true,
    // Player size in pixels
    size: DEFAULT_PLAYER_SIZE,

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
      if (this.isAlive) {
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

        // Check that the new position isn't inside of an explosion
        if (isInsideExplosion(this.x, this.y, this.size)) {
          // If it is, set the player to be dead
          this.isAlive = false;
          GameOver();
        }

        if (isMessageAt(this.x + (this.size / 2), this.y + (this.size / 2))) {
          DisplayAlert(returnMessageAt(this.x + (this.size / 2), this.y + (this.size / 2)), 0.1);
        }

        // Update the camera position to correctly render
        setCameraPosCentre(this.x + this.size / 2, this.y + this.size / 2);
      }
    }
  }
  // Set image
  player.sprite = new Image();
  player.sprite.src = "sprites/player/still.png"



  console.log("Player has been set.");


  return player;
  // End of player
}

//Initialise array of images for player animation
//player moving up images
var playerUp = [];
playerUp[0] = new Image();
playerUp[0].src = "sprites/player/walkUp.png"
playerUp[1] = new Image();
playerUp[1].src = "sprites/player/walkUp2.png"

//player moving down images
var playerDown = [];
playerDown[0] = new Image();
playerDown[0].src = "sprites/player/walkDown.png"
playerDown[1] = new Image();
playerDown[1].src = "sprites/player/walkDown2.png"

//player moving left images
var playerLeft = [];
playerLeft[0] = new Image();
playerLeft[0].src = "sprites/player/walkLeft.png"
playerLeft[1] = new Image();
playerLeft[1].src = "sprites/player/walkLeft2.png"

//player moving right images
var playerRight = [];
playerRight[0] = new Image();
playerRight[0].src = "sprites/player/walkRight.png"
playerRight[1] = new Image();
playerRight[1].src = "sprites/player/walkright2.png"


//temporary counter until i find a better solution
var i = 0

//function that updates the players sprite for animation
function updateSprite(direction) {
//if up key pressed loop through the walkin up images
  if (direction == "u") {
    player.sprite.src = playerUp[i].src;
    if (i >= 1) {
      i = -1
    }
    i = i + 1;
  }
  //if up down pressed loop through the walkin down images
  else if (direction == "d") {
    player.sprite.src = playerDown[i].src;
    if (i >= 1) {
      i = -1
    }
    i = i + 1;
  }
  //if left key pressed loop through the walkin left images
  else if (direction == "l") {
    player.sprite.src = playerLeft[i].src;
    if (i >= 1) {
      i = -1
    }
    i = i + 1;
  }
  //if up right pressed loop through the walkin right images
  else if (direction == "r") {
    player.sprite.src = playerRight[i].src;
    if (i >= 1) {
      i = -1
    }
    i = i + 1;
  }
    //redraw the player 
    setInterval(RenderPlayers(), 100);
}


function getPlayerX() {
  return player.x;
}

function getPlayerY() {
  return player.y;
}
