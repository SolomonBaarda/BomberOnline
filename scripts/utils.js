/**
This is the script for the main game tick.
*/

// Set number of updates per second
const TICKS_PER_SECOND = 60;
const PIXELS_PER_TILE = 32;

function Clamp(value, min, max) {
    if(value < min) {
        value = min;
    }

    if(value > max) {
        value = max;
    } 

    return value;
}

function Intersects(aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight) {
    
}

