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


var bombAudio = new Audio("bomb.mp3");

function playBomb(){
  bombAudio.play();
}
