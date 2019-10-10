/**
This is the script for initialising the game.
*/

// Ensure sript runs when the page is loaded
window.onload = function Initialise() {

  // Get the players name
  const name = askForName();

  // Set text to say welcome to the player
  const description = document.querySelector("#inputNameDescription");
  description.innerHTML = "Welcome " +name+ "!";

  // Set up the player

  // TODO Unsure how to import player script from external script file
  // import { Player() } from 'scripts/Player.js';
  // const player = Player(name);

  // for now, just do it in here
  var player = document.getElementById('player');
  // Set the image source
  player.src = "sprites/player.jpg";
  player.style.left = "500px";
  player.style.top = "200px";

  console.log("Player image has been set");

  document.addEventListener("keydown", KeyDown, false);

  myTime = null;
  //clearTimeout(myTime);

  var xDir = 0;
  var yDir = 0;

  myTime = setTimeout('Timer()', 10);



  function Timer() {
    var y = player.offsetTop;
    var x = player.offsetLeft;

    y += yDir;
    x += xDir;

    player.style.top = y + "px";
    player.style.left = x + "px";

    myTime = setTimeout('Timer()', 10);

    console.log("Game updated");
  }


  function KeyDown(e) {
    if(e.keyCode != undefined) {
      switch (e.keyCode) {
        // Move left
        case 37:
        xDir = -1;
        break;
        // Move right
        case 39:
        xDir = 1;
        break;
        // Move up
        case 38:
        yDir = -1;
        break;
        // Move down
        case 40:
        yDir = 1;
        break;
      }
    }

  }


  /**
  Function that prompts the user to enter a display name and returns it.
  */
  function askForName() {
    var name = "";

    // Ensure name is valid
    while(name === "" || name === null) {
      name = window.prompt("Please enter a display name.", "");
    }

    console.log("Player name set to " +name+ ".");
    return name;
  }



}
