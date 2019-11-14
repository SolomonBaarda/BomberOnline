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
  $("#player-username").show();
  $("#player-password").show();
  $("#create-account-button").show();
  $("#play-button").show();
  $("#imgPreview").show();
}

