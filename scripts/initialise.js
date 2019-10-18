/**
This is the script for initialising the game.
*/

// Pointer to the player element
var player;
var board;

// When the document is ready, make the click to play button visible.
// This ensures that the page is fully loaded befoere allowing the player to start the game

$(document).ready($("#start-button").show());

// Proceeds to name selection menu.
function Initialise() {

  // Hide the start button and display a text box and button.
  $("#start-button").hide();
  $("#playerName").show();
  $("#play-button").show();

}

/** SetName function takes in a value from the text box (playerName) and begins
the game if the requirements are met. If not, an error message is shown to the
player. */
function SetName() {

  // Sets name to playerName's value.
  let name = document.getElementById("playerName").value;

  if (name.length > 12) {
    name = "";
    console.error("Error: Username too long.");
    $("#errorMsg").show();
  } else {
    console.log("Player name set to " +name+ ".");
    Player(askForName());

    function askForName() {
      return name;  }

    $("#errorMsg").hide();
    $("#play-button").hide();
    $("#playerName").hide();
    $("#nameInput").hide();
    $("#playBox").hide();
    $("#welcomeBox").hide();
  }

  // Displays name to the user.
  const description = document.querySelector("#tableName");
  description.innerHTML = name;

  // Set up the game controls
  InitialiseController();
  board = Board(24, 24);

  // Call to start the game tick
  Timer();

  // End of initialise
}
