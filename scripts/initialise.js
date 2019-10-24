/**
This is the script for initialising the game.
*/


// When the document is ready, make the click to play button visible.
// This ensures that the page is fully loaded befoere allowing the player to start the game.
$(document).ready($("#start-button").show());
$(document).ready($("#infobar").hide());

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
  // Accesses the error message in index.html.
  var errorCase = document.getElementById('#errorMsg');

  // Player name requirements.
  switch (name) {
    case (name.Length > 12):
      name = "";
      console.error("Error: Username too long.");
      errorCase.innerHTML = "Error: Name is too long!"
      $("#errorMsg").show();
      break;
    case (name.Length < 1):
      name = "";
      console.error("Error: Username too short.");
      errorCase.innerHTML = "Error: Name is too long!"
      $("#errorMsg").show();
      break;
    case (name.includes(" ")):
      name = "";
      errorCase.innerHTML = "Error: Name cannot have a space."
      $("#errorMsg").show();
      break;
    // If all the requirements are met then the game begins.
    default:
      console.log("Player name set to " +name+ ".");
      Player(askForName());

      function askForName() {
        return name;
      }

      $("#errorMsg").hide();
      $("#play-button").hide();
      $("#playerName").hide();
      $("#nameInput").hide();
      $("#playBox").hide();
      $("#welcomeBox").hide();
      $("#infobar").show();
  }

  // Displays name to the user.
  const description = document.querySelector("#tableName");
  description.innerHTML = name;

  // Set up the game controls
  InitialiseController();

  let boardSize = 8;
  Board(boardSize, boardSize);

  InitialiseCanvas(boardSize);

  // Call to start the game tick
  Timer();

}
