/**
This is the script for initialising the game.
*/


// Ensure page is fully loaded before showing the start button
$(document).ready($("#start-button").show());
$(document).ready($("#infobar").hide());

// Proceed to name selection menu when start is clicked
function Initialise() {
    name = null;
    console.log("Name: "+name);

  // Display fields relevant to the name selection page.
  $("#welcomeBox").show();
  $("#start-button").hide();
  $("#playerName").show();
  $("#play-button").show();
  $("#imgPreview").show();
  $("#hueSelect").show();

  // Set initial attributes for newly displayed elements.
  document.getElementById("player").src = "sprites/player.jpg";
  document.getElementById("playBox").style.display = "grid";
  document.getElementById("pBoxHeader").innerHTML="Select your colour and enter a name";
  document.getElementById("playBox").style.border="6px solid white";
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
