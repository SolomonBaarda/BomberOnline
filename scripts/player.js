/**
This is the script for the player class.
*/

// Reference to the element image
var player_image;
const player_size = 3 * PIXELS_PER_TILE / 4;
const offset = (PIXELS_PER_TILE / 4) / 2;
// Maximum speed the player can move at
const MAX_SPEED = 2;
// Player's current speed 
var speed = MAX_SPEED;
// Boolean for slow walk
var isRunning = true;
// Current velocities for x and y directions
var velX = 0, velY = 0;

// x and y position of the image on the board
// To get the tile pos xTile = x/PIXELS_PER_TILE;
var x = 0, y = 0;

// Initialise new player
function Player(name, x, y) {
  this.name = name;
  this.alive = false;
  this.x = x;
  this.y = y;

  player_image = setImage();

  function setImage() {
    let playerTag = document.getElementById('player');
    // Set the image source
    playerTag.src = "sprites/player.jpg";
    playerTag.position = "absolute";

    // Use canvas to render image now
    $("#player").hide();

    console.log("Player image has been set.");
    return playerTag;
  }

  // End of player
}

// Function for updating the players position
function UpdatePlayer() {
  // Set player bounds ie they cannot move past these points
  let minX = 0;
  let minY = 0;
  let maxX = boardWidth * PIXELS_PER_TILE - player_size;
  let maxY = boardHeight * PIXELS_PER_TILE - player_size;

  if (isRunning) {
    speed = MAX_SPEED;
  }
  else {
    speed = MAX_SPEED / 2;
  }

  // Store old values before checking collision 
  var oldX = x;
  var oldY = y;

  // Update x position
  var newX = Clamp(x + velX, minX, maxX);

  if (newX != oldX) {
    x = newX;
    if (!isValidMove(oldX, oldY, player_size, x, y)) {
      x = oldX;
    }
  }

  // Update y position
  var newY = Clamp(y + velY, minY, maxY);

  if (newY != oldY) {
    y = newY;
    if (!isValidMove(x, oldY, player_size, x, y)) {
      y = oldY;
    }
  }

  setCameraPosCentre(x + player_size / 2, y + player_size / 2);
}




// Move functions - they set the x and y velocities
function moveUp() {
  velY = -speed;
}

function moveDown() {
  velY = speed;
}

function moveLeft() {
  velX = -speed;
}

function moveRight() {
  velX = speed;
}

function moveWalk() {
  isRunning = false;
}

function moveRun() {
  isRunning = true;
}

this.getName = function () {
  return name;
}

this.isAlive = function () {
  return alive;
}

this.setAlive = function () {
  alive = true;
}

this.setDead = function () {
  alive = false;
}

function getPlayerX() {
  return x;
}

function getPlayerY() {
  return y;
}

function resetVelX() {
  velX = 0;
}

function resetVelY() {
  velY = 0;
}
