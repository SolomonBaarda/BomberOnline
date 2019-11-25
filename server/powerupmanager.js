/*
  Script for spawning powerups around the map.
*/

var powerupManagerTicks = 0;

function spawnRandomPowerup(tile) {
  x = tile.x * PIXELS_PER_TILE;
  y = tile.y * PIXELS_PER_TILE;

  // Get a value of 1,2,3
  let r = Math.floor(Math.random() * 3) + 1;

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

function getRandomPosition() {
  // Calculate random position that is valid for the new powerup 
  let x = Math.floor(Clamp(Math.random() * boardWidth, 0, boardWidth));
  let y = Math.floor(Clamp(Math.random() * boardHeight, 0, boardHeight));
  while (!board[x][y].isEmpty || board[x][y].isDamaging) {
    x = Math.floor(Clamp(Math.random() * boardWidth, 0, boardWidth));
    y = Math.floor(Clamp(Math.random() * boardHeight, 0, boardHeight));
  }

  return {
    x: x,
    y: y
  };
}


function UpdatePowerupManager() {
  powerupManagerTicks++;

  // Trigger every 3 seconds
  if (powerupManagerTicks % (3 * TICKS_PER_SECOND) == 0) {
    powerupManagerTicks = 0;

    spawnRandomPowerup(getRandomPosition());
  }
}
