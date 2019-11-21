function addPowerUpEf() {

    let x = Math.floor(Clamp(Math.random() * BATTLE_ROYALE_BOARD_SIZE, 0, BATTLE_ROYALE_BOARD_SIZE));
    let y = Math.floor(Clamp(Math.random() * BATTLE_ROYALE_BOARD_SIZE, 0, BATTLE_ROYALE_BOARD_SIZE));
    while (!board[x][y].isEmpty) {
      x = Math.floor(Clamp(Math.random() * BATTLE_ROYALE_BOARD_SIZE, 0, BATTLE_ROYALE_BOARD_SIZE));
      y = Math.floor(Clamp(Math.random() * BATTLE_ROYALE_BOARD_SIZE, 0, BATTLE_ROYALE_BOARD_SIZE));
    }
    console.log(x + "," + y);


    var speedo = ExtraFlamePowerup(x*PIXELS_PER_TILE, y*PIXELS_PER_TILE);
    
    gameObjects.push(speedo);
}
