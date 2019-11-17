/**
This is the script for controlling the main manu.
*/

/**
 * Shows the initial "PLAY" button when you first load the game.
 */
function showStartButton() {
  showWelcomeBox();
  $("#start-button").show()
}

/**
 * Shows the main menu.
 */
function showWelcomeBox() {
  $("#welcomeBox").show();
  $("#infobar").hide();
}

/**
 * Shows the main game div.
 */
function showGame() {
  $(".main-game").show();
}

/**
 * Hides the main menu.
 */
function hideWelcomeBox() {
  $("#welcomeBox").hide();
  $("#infobar").show();
}

/**
 * Shows the "select gamemode" screen on the main menu.
 */
function selectGamemode() {
  showWelcomeBox();

  $("#tutorial").show();
  $("#battle_royale").show();

  $("#player-username").hide();
  $("#player-password").hide();
  $("#player-password2").hide();
  $("#create-account-button").hide();
  $("#play-button").hide();

  $("#infobar").show();
}


/**
 * Shows the player username screen (log in, create account etc).
 */
function showNameSelection() {
  // Display fields relevant to the name selection page.
  showWelcomeBox()
  $("#start-button").hide();

  $("#player-username").show();
  $("#player-password").show();
  $("#create-account-button").show();
  $("#play-button").show();

  //$("#imgPreview").show();
  //$("#hueSelect").show();

  $("#tutorial").hide();
  $("#battle_royale").hide();

  // Set initial attributes for newly displayed elements.
  document.getElementById("playBox").style.display = "grid";
  document.getElementById("pBoxHeader").innerHTML = "Select your colour and enter a name";
  document.getElementById("playBox").style.border = "6px solid white";
}




