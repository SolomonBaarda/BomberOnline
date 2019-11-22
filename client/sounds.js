/*
This is the script for the sound effects included in the game
*/


/*
- theme tune playing from start of application through to the
end of the application
- sounds on each "click"/"Select" made on buttons e.g. Start button
- sound to signify start of the game
- sound for explosion of bomb
- sound for death of player/end of game
*/

//Initialise audio files to variables
var bombExplodeAudio = new Audio("sounds/bomb.mp3");
var backgroundMusic = new Audio("sounds/background.mp3")
var playerDeath = new Audio("sounds/death.mp3")

function playBackgroundMusic(){
  backgroundMusic.loop = true;
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.loop = false;
  backgroundMusic.pause();
}

function playerDeathSound() {
  playerDeath.play();
}
//plays the sound for bomb exploding
function playBombExplode(){
  bombExplodeAudio.play();
}
