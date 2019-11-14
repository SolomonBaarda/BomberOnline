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
  $("#player-username").show();
  $("#player-password").show();
  $("#create-account-button").show();
  $("#play-button").show();
  $("#imgPreview").show();
  $("#hueSelect").show();

  // Set initial attributes for newly displayed elements.
  document.getElementById("player").src = "sprites/player.jpg";
  document.getElementById("playBox").style.display = "grid";
  document.getElementById("pBoxHeader").innerHTML="Select your colour and enter a name";
  document.getElementById("playBox").style.border="6px solid white";
}

