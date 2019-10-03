/*
    This is the script for initialising each player object.
*/

/*
    Function that reads name input from a form. Currently changes
    some html on the screen to display it.
*/
function Initialise() {

const name = InitialisePlayer();






function InitialisePlayer() {
    // Get the form input element text value
    let name = document.querySelector(".main-content .inputName .inputNameForm .submitName").value;

    // Ensure name is valid.
    // TODO later will have to check name against database of all other
    // connected users.
    if(name != "") {
        var description = document.querySelector("#inputNameDescription");
        description.innerHTML = "Welcome player " +name+ ".";

        // Disable form when done
        const form = document.querySelector(".main-content .inputName .inputNameForm");
        form.style.display = 'none';
    }
    else {
        // Promt user to enter a valid name input
        window.alert("Please enter a valid display name");
    }

    return name;
  }

}
