/**
This is the script for ensuring the players username input is valid.
*/

const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 12;


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

      // Send the new account to the database
      /* Couldn't get working.
      function ajaxFunction(){
        var ajaxRequest = new XMLHttpRequest({mozSystem: true});

        // Fetches info from server
        ajaxRequest.onreadystatechange = function(){
          if(ajaxRequest.readyState == 4){
            console.log("Info read from SQL server.")
          }
        }

        // Get User info from input boxes and pass it to the player_info DB.
        var username = document.getElementById('player-username').value;
        var password = document.getElementById('player-password').value;
        var highScore = 0;
        var queryString = "?playerName=" + username;

        queryString += "&playerPassword=" + password + "&highScore" + highScore;
        ajaxRequest.open("GET","playerInfo.php"+queryString, true);
        ajaxRequest.send(null);
      } */

      /*
      not working either
      $.ajax({
        async: false,
        // get places arguments in query string (post doesn't)
        // get call in ajax has a size limitation on the amount of data
        // get is used to get data to display on the screen
        // post is used to update data on the server
        type: 'POST',
        url: '/dbInteraction/user/createAccount/',
        // Turn the data into a json string
        data: JSON.stringify({
          username: userName,
          password: password
        }),
        contentType: 'application/json',

        success: function (result) {
          console.log(result);
        },

        error: function (xhr, status, error) {
          var errorResponse = xhr.responseJSON;
          document.getElementById("error").innerHTML += errorResponse.message + "<br>";
          document.getElementById("error").style.display = "block";
          loginSignupValid = false;
        }
      });
      */

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
  if (input.length > USERNAME_MAX_LENGTH || input.length < USERNAME_MIN_LENGTH) {
    console.error("Error: Input must be between " + USERNAME_MIN_LENGTH + " and " + USERNAME_MAX_LENGTH + " characters.");
    document.getElementById('errorMsg').innerHTML = "Input must be between " + USERNAME_MIN_LENGTH + " and " + USERNAME_MAX_LENGTH + " characters!";

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
