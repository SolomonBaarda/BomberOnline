/*
    This is the script for the player class. Currently, it stores the players display name.
*/
export function Player(name) {


    const player = {this.name = name, this.alive = false, this.image = initialisePlayer()}




    function initialisePlayer() {
        const player = document.getElementById('player');
        // Set the image source
        player.src = "sprites/player.jpg";

        return player;
    }

    function KeyDown(e) {
        // Left
        if (e.keyCode == 37) {
            // move left
        }
        // Right
        if (e.keyCode == 39) {
            // move right
        }
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
