/*
This is the script for the player class. Currently, it stores the players display name.
*/

// Reference to the element image
var image;
const MAX_SPEED = 3;
var velX = 0, velY = 0;

// x and y position of the image
var x = 0, y = 0;



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

      console.log("Player image has been set");
      return playerTag;
    }

// End of player
}


function UpdatePlayer() {

  // Update x position
  x += velX;
  if(x < 0) {x = 0}
  else if(x > 1000) {x = 1000}

  // Update y position
  y += velY;
  if(y < 0) {y = 0}
  else if(y > 1000) {y = 1000}

  // Set positon of image on screen
  $("#player")
  image.style.left = x + "px";
  image.style.top = y + "px";
}


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
