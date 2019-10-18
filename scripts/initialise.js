/**
This is the script for initialising the game.
*/


// When the document is ready, make the click to play button visible.
// This ensures that the page is fully loaded befoere allowing the player to start the game
$(document).ready($("#click-to-play").show())

// Main initialise function
function Initialise() {
  // Hide the click to play button
  $("#click-to-play").hide();

  // let player input username, then pass into the player script
  Player(askForName());

  // Set text to say welcome to the player
  const description = document.querySelector("#inputNameDescription");
  description.innerHTML = "Welcome " +name+ "!";

  // Set up the game controls
  InitialiseController();

  let boardSize = 8;

  // Make the canvas visible and set the size
  $("#canvas").width(boardSize * 64);
  $("#canvas").height(boardSize * 64);
  $("#canvas").show();

  Board(boardSize, boardSize);

  // Call to start the game tick
  Timer();



  /**
  Function that prompts the user to enter a display name and returns it.
  */
  function askForName() {
    let name = "";

    // Ensure name is valid
    while(name === "" || name === null) {
      name = window.prompt("Please enter a display name.", "");
    }

    console.log("Player name set to " +name+ ".");
    return name;
  }


  // End of initialise
}
