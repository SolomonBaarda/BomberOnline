/**
This is the script for initialising the game.
*/

// Pointer to the player element
var player;

var board;

// When the document is ready, make the click to play button visible.
// This ensures that the page is fully loaded befoere allowing the player to start the game
$(document).ready($("#play-button").show())

// Main initialise function
function Initialise() {
  // Hide the click to play button
  $("#play-button").hide();
  $("#playerName").show();

  // Set text to say welcome to the player
  const description = document.querySelector("#tableName");
  description.innerHTML = name;

  // Set up the game controls
  InitialiseController();

  board = Board(24, 24);

  // Call to start the game tick
  Timer();

  /**
  Function that prompts the user to enter a display name and returns it.
  */
  function askForName() {
    let name = "";

    // Ensure name is valid
    while(name === "" || name === null || name) {
      name = window.prompt("Please enter a display name.", "");
    }

    console.log("Player name set to " +name+ ".");
    return name;
  }


  // End of initialise
}
