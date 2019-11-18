function addPowerUp () {
    var speedo = SpeedPowerup (getPlayerX()-2*PIXELS_PER_TILE,getPlayerY()-2*PIXELS_PER_TILE);
    
    gameObjects.push(speedo);
}
