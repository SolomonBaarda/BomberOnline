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
- sound for player activating power up
*/


//Initialise audio files to created variables

var bombAudio = new Audio("sounds/bomb.wav");
var backgroundMusic = new Audio("sounds/background.mp3");
var playerDeath = new Audio("sounds/death.mp3");
var powerupAudio = new Audio("sounds/powerup.wav");
var gameStart = new Audio("sounds/start.ogg")
var buttonClick = new Audio("sounds/button.wav")


//function that plays/stops each audio file

function playBombAudio()
{
bombAudio.play();
}

function playBackgroundMusic()
{
  backgroundMusic.loop = true;
  backgroundMusic.play();
}

function stopBackgroundMusic()
{
  backgroundMusic.loop = false;
  backgroundMusic.pause();
}

function playerDeathSound()
{
  playerDeath.play();
}

function playPowerupAudio()
{
  powerupAudio.play();
}

function playStartSound()
{
gameStart.play();
}

function playButtonClick()
{
buttonClick.play();
}
