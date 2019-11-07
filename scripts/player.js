/**
This is the script for the player class.
*/

// The extra space between the player and a tile when the player is centered
// (as player is not a whole tile in size)
const offset = (PIXELS_PER_TILE / 4) / 2;
// Maximum speed the player can move at
const MAX_SPEED = 2;
// Maximum amount of bombs allowed 
const DEFAULT_MAX_BOMBS = 1;

// Reference to the player object (currently temporary as only singleplayer)
var player;

// Initialise new player
function Player(name, x, y) {
  let player = {
    // Store the players unique name 
    name: name,
    // x and y position of the image on the board
    x: x,
    y: y,
    alive: false,
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
    // Reference to the element image
    sprite: undefined
  }
  // Set image 
  player.sprite = setImage();
  console.log("Player image has been set.");
  

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

// Function for updating the players position
function UpdatePlayer() {
  // Set player bounds ie they cannot move past these points
  let minX = 0;
  let minY = 0;
  let maxX = boardWidth * PIXELS_PER_TILE - player.size;
  let maxY = boardHeight * PIXELS_PER_TILE - player.size;

  // Set current movement speed
  if (player.isRunning) {
    player.speed = MAX_SPEED;
  }
  else {
    player.speed = MAX_SPEED / 2;
  }

  // Store old values before checking collision 
  var oldX = player.x;
  var oldY = player.y;

  // Update x position
  var newX = Clamp(player.x + player.velX, minX, maxX);

  // Update new x position
  if (newX != oldX) {
    player.x = newX;
    // Ensure it is a valid move before comitting to it
    if (!isValidMove(oldX, oldY, player.size, player.x, player.y)) {
      player.x = oldX;
    }
  }

  // Update y position
  var newY = Clamp(player.y + player.velY, minY, maxY);

  // Update new y position 
  if (newY != oldY) {
    player.y = newY;
    // Ensure it is a valid move before comitting to it
    if (!isValidMove(player.x, oldY, player.size, player.x, player.y)) {
      player.y = oldY;
    }
  }

  // This movement style works well for objects moving at a slow speed. If they 
  // move faster, then they may appear to collide in front of the wall. In this
  // case, movement would need to be done in smaller steps. Check out 
  // https://jonathanwhiting.com/tutorial/collision/ for an explanation on collision.

  // Update the camera position to correctly render 
  setCameraPosCentre(player.x + player.size / 2, player.y + player.size / 2);
}


// Move functions - they set the x and y velocities
function moveUp() {
  player.velY = -player.speed;
}

function moveDown() {
  player.velY = player.speed;
}

function moveLeft() {
  player.velX = -player.speed;
}

function moveRight() {
  player.velX = player.speed;
}

function moveWalk() {
  player.isRunning = false;
}

function moveRun() {
  player.isRunning = true;
}

this.getName = function () {
  return player.name;
}

this.isAlive = function () {
  return player.alive;
}

this.setAlive = function () {
  player.alive = true;
}

this.setDead = function () {
  player.alive = false;
}

function getPlayerX() {
  return player.x;
}

function getPlayerY() {
  return player.y;
}

function resetVelX() {
  player.velX = 0;
}

function resetVelY() {
  player.velY = 0;
}
