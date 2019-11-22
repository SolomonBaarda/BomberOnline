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

//Initialise audio files to created variables

var bombAudio = new Audio("sounds/bomb.wav");
//function that plays each audio file

function playBombAudio()
{
bombAudio.play();
}
