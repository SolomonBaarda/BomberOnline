/**
    This is the script for initialising the game.
*/
// Ensure sript runs when the page is loaded
window.onload = function Initialise() {

// Get the players name
const name = askForName();

// Set text to say welcome to the player
const description = document.querySelector("#inputNameDescription");
description.innerHTML = "Welcome player " +name+ ".";

// Set up the player

// TODO Unsure how to import player script from external script file
// import { Player() } from 'scripts/Player.js';
// const player = Player(name);






/**
    Function that prompts the user to enter a display name and returns it.
*/
function askForName() {
    var name = "";

    // Ensure name is valid
    while(name === "" || name === null) {
      name = window.prompt("Please enter a display name.", "");
    }

    console.log("Welcome player "+name);
    return name;
  }



}
