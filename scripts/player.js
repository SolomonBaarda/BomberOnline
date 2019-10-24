/**
This is the script for the player class.
*/

// Reference to the element image
var image;
// Maximum speed the player can move at
const MAX_SPEED = 10;
// Current velocities for x and y directions
var velX = 0, velY = 0;

// x and y position of the image
var x = 0, y = 0;

// Initialise new player
function Player(name) {
  this.name = name;
  this.alive = false;

  image = setImage();

  $("#player").width(PIXELS_PER_TILE);
  $("#player").height(PIXELS_PER_TILE);


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
  let maxX = $("#canvas").width() - image.width;
  let maxY = $("#canvas").height() - image.height;

  // Update x position
  x += velX;
  if(x < minX) {x = minX}
  else if(x > maxX) {x = maxX}

  // Update y position
  y += velY;
  if(y < minY) {y = minY}
  else if(y > maxY) {y = maxY}
}


function RenderPlayer(ctx) {
  // Set positon of image on screen
  // Old method
  // image.style.left = getPlayerX() + "px";
  // image.style.top = getPlayerY() + "px";

  ctx.drawImage(image, x, y, PIXELS_PER_TILE, PIXELS_PER_TILE);
}

// Move functions - they set the x and y velocities
function moveUp() {
  velY = -MAX_SPEED;
}

function moveDown() {
  velY = MAX_SPEED;
}

function moveLeft() {
  velX = -MAX_SPEED;
}

function moveRight() {
  velX = MAX_SPEED;
}

this.getName = function() {
  return name;
}

this.isAlive = function() {
  return alive;
}

this.setAlive = function() {
  alive = true;
}

this.setDead = function() {
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
