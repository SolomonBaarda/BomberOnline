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
  $("#welcomeBox").show();
  $("#start-button").hide();
  $("#playerName").show();
  $("#play-button").show();
  $("#imgPreview").show();
}

/** SetName function takes in a value from the text box (playerName) and begins
the game if the requirements are met. If not, an error message is shown to the
player. */
function SetName() {
  // Sets name to playerName's value.
  let name = document.getElementById("playerName").value;

  // Accesses the error message in index.html.
  var nameInput = document.getElementById("playerName").value;
  // Name requirements (between 2 and 12 chars long, no spaces)
  if (nameInput.length > 12) {
    document.getElementById('errorMsg').style.display = 'block';
    console.error("Error: Name too long.");
    document.getElementById('errorMsg').innerHTML = "Name too long!";
  } else if (nameInput.length < 2) {
    document.getElementById('errorMsg').style.display = 'block';
    console.error("Error: Name too short.");
    document.getElementById('errorMsg').innerHTML = "Name too short!";
  } else if (nameInput.includes(" ")) {
    document.getElementById('errorMsg').style.display = 'block';
    console.error("Error: Name must not contain spaces")
    document.getElementById('errorMsg').innerHTML = "Space found in name!";
  } else { // Set name if requirements are met.
    console.log("Player name set to " + name + ".");

    $("#welcomeBox").hide();
    $("#infobar").show();

    // Displays name to the user.
    const description = document.querySelector("#tableName");
    description.innerHTML = name;

    InitialiseGame(name);
  }
}
