/*
    This is the script for initialising each player object.
*/

/*
    Function that reads name input from a form. Currently changes
    some html on the screen to display it.
*/
function initialisePlayer() {
    // Get the form input element text value
    const name = document.querySelector(".main-content .inputName .inputNameForm .submitName").value;

    // Ensure name is valid.
    // TODO later will have to check name against database of all other
    // connected users.
    if(name != "") {
        var description = document.querySelector(".main-content .inputName #inputNameDescription");
        description.innerHTML = "Welcome player" +name+ ".";

        // Disable form when done
        document.querySelector(".main-content .inputName .inputNameForm").style.displey="none";
    }
    else {
        // Promt user to enter a valid name input
        window.alert("Please enter a valid display name");
    }
}
