/*
This is the script for the player class. Currently, it stores the players display name.
*/

// Ensure sript runs when the page is loaded
window.onload = function Player() {

  function Player(name) {
    this.name = name;
    this.alive = false;
    // This is not geting called for some reason.
    this.image = initialisePlayer();

    console.log(image);


    // Need to add event listener to the window as well


    function initialisePlayer() {
      let playerTag = document.getElementById('player');
      // Set the image source
      playerTag.src = "sprites/player.jpg";

      console.log("Player image has been set");
      return playerTag;
    }

    function KeyDown(e) {
      switch (e.keyCode) {
        // Move left
        case 37:
        moveHoriz(-1);
        break;
        // Move right
        case 39:
        moveHoriz(1);
        break;
        // Move up
        case 38:
        moveVert(-1);
        break;
        // Move down
        case 40:
        moveVert(1);
        break;
      }

    }


    function moveVert(pixels) {
      // Move the player image vertically by the number of pixels

    }

    function moveHoriz(pixels) {
      // Move the player image horizontally by the number of pixels

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

  }

}
