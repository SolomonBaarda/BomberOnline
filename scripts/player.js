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


  function setImage() {
    let playerTag = document.getElementById('player');
    // Set the image source
    playerTag.src = "sprites/player.jpg";
    playerTag.position = "absolute";

    $("#player").show();

    console.log("Player image has been set.");
    return playerTag;
  }

  // End of player
}

// Function for updating the players position
function UpdatePlayer() {
  // Set player bounds ie they cannot move past these points
  let boundsX = $(window).width() - image.width;
  let boundsY = $(window).height() - image.height;

  // Update x position
  x += velX;
  if(x < 0) {x = 0}
  else if(x > boundsX) {x = boundsX}

  // Update y position
  y += velY;
  if(y < 0) {y = 0}
  else if(y > boundsY) {y = boundsY}

  // Set positon of image on screen
  image.style.left = x + "px";
  image.style.top = y + "px";
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

function resetVelX() {
  velX = 0;
}

function resetVelY() {
  velY = 0;
}
