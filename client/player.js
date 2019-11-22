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

var spriteTick = 0;

//temporary counter until i find a better solution
var i = 0

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


        //start playing the background music on a loop
        playBackgroundMusic();




        //tick counter to update sprite image after x ticks
        spriteTick++;
        //update the sprite image every 10 ticks
        if (spriteTick == 10) {
          console.log("tick gets to 10")
          //if players x velocity is positive update sprites for moving right
          if (player.velX > 0) {
            player.sprite.src = playerRight[i].src;
            if (i >= 3) {
              i = -1
            }
            console.log(i);
            i = i + 1;
          }

          //if players x velocity is negative update sprites for moving left
          else if (player.velX < 0) {
            player.sprite.src = playerLeft[i].src;
            if (i >= 1) {
              i = -1
            }
            i = i + 1;
          }

          //if players y velocity is positive update sprites for moving down
          else if (player.velY > 0) {
            player.sprite.src = playerDown[i].src;
            if (i >= 3) {
              i = -1
            }
            i = i + 1;
          }

          //if players y velocity is negative update sprites for moving up
          else if (player.velY < 0) {
            player.sprite.src = playerUp[i].src;
            if (i >= 3) {
              i = -1
            }
            i = i + 1;
          }
          //set tick back to 0 after image updated
          spriteTick = 0;
        }


        // Check that the new position isn't inside of an explosion
        if (isInsideExplosion(this.x, this.y, this.size))
        {
          // If it is, set the player to be dead
          this.isAlive = false;
          //as the player dies and game ends, play player death sound and stop
          //backgroud music
          playerDeathSound();
          stopBackgroundMusic();
          GameOver();

        }

        if (isMessageAt(this.x + (this.size / 2), this.y + (this.size / 2))) {
          DisplayAlert(returnMessageAt(this.x + (this.size / 2), this.y + (this.size / 2)), 0.1);
        }

        // Update the camera position to correctly render
        setCameraPosCentre(this.x + this.size / 2, this.y + this.size / 2);
      }
    },

    dropBomb: function () {
      if (this.activeBombs < this.currentMaxBombs) {
        // Centre of bomb should be centre of player
        let trueX = this.x + this.size / 2 - BOMB_SIZE / 2;
        let trueY = this.y + this.size / 2 - BOMB_SIZE / 2;

        player.activeBombs++;

        addGameObject(Bomb(trueX, trueY, BOMB_DEFAULT_TIMER, this));
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
playerUp[2] = new Image();
playerUp[2].src = "sprites/player/walkUp3.png"
playerUp[3] = new Image();
playerUp[3].src = "sprites/player/walkUp4.png"

//player moving down images
var playerDown = [];
playerDown[0] = new Image();
playerDown[0].src = "sprites/player/walkDown.png"
playerDown[1] = new Image();
playerDown[1].src = "sprites/player/walkDown2.png"
playerDown[2] = new Image();
playerDown[2].src = "sprites/player/walkDown3.png"
playerDown[3] = new Image();
playerDown[3].src = "sprites/player/walkDown4.png"

//player moving left images
var playerLeft = [];
playerLeft[0] = new Image();
playerLeft[0].src = "sprites/player/walkLeft1.png"
playerLeft[1] = new Image();
playerLeft[1].src = "sprites/player/walkLeft2.png"
playerLeft[2] = new Image();
playerLeft[2].src = "sprites/player/walkLeft3.png"
playerLeft[3] = new Image();
playerLeft[3].src = "sprites/player/walkLeft4.png"

//player moving right images
var playerRight = [];
playerRight[0] = new Image();
playerRight[0].src = "sprites/player/walkRight1.png"
playerRight[1] = new Image();
playerRight[1].src = "sprites/player/walkright2.png"
playerRight[2] = new Image();
playerRight[2].src = "sprites/player/walkRight3.png"
playerRight[3] = new Image();
playerRight[3].src = "sprites/player/walkright4.png"


function getPlayerX() {
  return player.x;
}

function getPlayerY() {
  return player.y;
}
