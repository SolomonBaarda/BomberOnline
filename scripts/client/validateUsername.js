/**
This is the script for ensuring the players username input is valid.
*/



/** 
 * SetName function takes in a value from the text box (playerName) and begins the 
 * game if the requirements are met. If not, an error message is shown to the player. 
 */
function SetName() {
  // Sets name to playerName's value.
  let name = document.getElementById("player-username").value;

  if (validInput(name)) {
    // Displays name to the user.
    const description = document.querySelector("#tableName");
    description.innerHTML = name;

    selectGamemode();
    saveUsername(name);
  }

}


function LogIn() {
  let userName = document.getElementById("player-username").value;
  let password = document.getElementById("player-password").value;

  if (validInput(userName) && validInput(password)) {
    // Need to check account is in the database and if not get the user to create an account 
    document.getElementById('errorMsg').innerHTML = "Welcome " + userName + ".";
    SetName();
  }
}


function CreateAccount() {
  $("#player-password2").show();

  let userName = document.getElementById("player-username").value;
  let password = document.getElementById("player-password").value;
  let password2 = document.getElementById("player-password2").value;

  if (validInput(userName) && validInput(password) && validInput(password2)) {
    if (password == password2) {
      // Need to check that the new account isnt already in the database and if so add it 
      document.getElementById('errorMsg').innerHTML = "Account is valid!";
      SetName();
    }
    else {
      console.error("Error: Passwords must match.");
      document.getElementById('errorMsg').innerHTML = "Passwords must match!";
    }
  }
}

/** 
 * Function that checks if a string is valid as an input. This only allows letters 
 * and numbers. This is to prevent malicious code being injected into the game. 
 */
function validInput(input) {
  // between 2 and 12 chars long
  if (input.length > 12 || input.length < 2) {
    console.error("Error: Input must be between 2 and 12 characters.");
    document.getElementById('errorMsg').innerHTML = "Input must be between 2 and 12 characters!";

    return false;
  }
  // If the input contains only letters and numbers 
  if (input.match("^[A-Za-z0-9]+$")) {
    //console.log("Input " + input + " is valid.");
    return true;
  }
  // Not a valid input 
  else {
    console.error("Error: Input must only contain letters and numbers.");
    document.getElementById('errorMsg').innerHTML = "Input must only contain letters and numbers!";

    return false;
  }

}
