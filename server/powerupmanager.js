var powerupManagerTicks = 0;

function spawnRandomPowerup() {
  // Calculate random position that is valid for the new powerup 
  let x = Math.floor(Clamp(Math.random() * boardWidth, 0, boardWidth));
  let y = Math.floor(Clamp(Math.random() * boardHeight, 0, boardHeight));
  while (!board[x][y].isEmpty || board[x][y].isDamaging) {
    x = Math.floor(Clamp(Math.random() * boardWidth, 0, boardWidth));
    y = Math.floor(Clamp(Math.random() * boardHeight, 0, boardHeight));
  }
  x *= PIXELS_PER_TILE;
  y *= PIXELS_PER_TILE;

  // Get a value of 1,2,3,4
  let r = Math.floor(Math.random() * 4) + 1;

  let powerup;

  if (r == 1) {
    powerup = SpeedPowerup(x, y);
  }
  else if (r == 2) {
    powerup = ExtraFlamePowerup(x, y);
  }
  else if (r == 3) {
    powerup = ExtraBombPowerup(x, y);
  }

  addGameObject(powerup);
}



function UpdatePowerupManager() {
  powerupManagerTicks++;

  // Trigger every 3 seconds
  if (powerupManagerTicks % (3 * TICKS_PER_SECOND) == 0) {
    powerupManagerTicks = 0;

    spawnRandomPowerup();
  }
}
