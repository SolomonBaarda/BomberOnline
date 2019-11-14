function addPowerUp () {
    var speedo = SpeedPowerup (3 * PIXELS_PER_TILE, 3 * PIXELS_PER_TILE);
    console.log(speedo.x + ", " + speedo.y);
    
    gameObjects.push(speedo);
}
