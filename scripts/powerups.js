/*
This is the script used for the creation of the various
types of powerups used and picked up in-game.
*/
var powerup;
const powerupHeight = PIXELS_PER_TILE/2;
const powerupWidth = PIXELS_PER_TILE/2; // all powerups have the same constant width and height


function Powerup(x, y, width, height, duration, imagesprite) {
    var powerup = {powerupWidth:width, powerupHeight:height, powerupDuration:duration, powerupImage:imagesprite};
    return powerup;
}

function SpeedPowerup(x, y){
    
    var speedPowerup = Powerup(x, y, powerupWidth, powerupHeight, 3, );
}
function ExtraFlamePowerup(x, y){
    var extraflamePowerup = Powerup;
}
function ExtraBombPowerup(x, y){
    var extrabombPowerup = Powerup;
}
function CollisionPowerup(x, y){
    var collisionPowerup = Powerup;
}



