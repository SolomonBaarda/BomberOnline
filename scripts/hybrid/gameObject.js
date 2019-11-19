/*
This is the script for the all game objects
*/

const BOMB_SIZE = PIXELS_PER_TILE;
const BOMB_DEFAULT_TIMER = 2;

// all powerups have the same constant width and height
const POWERUP_SIZE = PIXELS_PER_TILE;
const POWERUP_DURATION = 6;

var EXPLOSION_SPRITE = new Image()
EXPLOSION_SPRITE.src = 'sprites/bomb/explosion.png';

/*
  Bomb constructor. Places a bomb at xPos, yPos on the board.
*/
function Bomb(x, y, seconds, owner) {
  // Create new bomb object
  let bomb = GameObject(x, y, BOMB_SIZE);

  // Timer that decreases each tick
  bomb.timer = TICKS_PER_SECOND * seconds;
  // Timer that damages the tiles around it when it has exploded
  bomb.explosion_timer = bomb.timer;

  bomb.hasExploded = false;

  // Get a list of the tiles that this bomb will affect
  bomb.affected_tiles = undefined;
  bomb.hasGotAffectedTiles = false;

  // Set reference to the owner of the bomb
  bomb.owner = owner;

  // Set how strong the bomb should be when it explodes
  bomb.power = owner.currentBombPower;

  // Update function is called once per tick
  bomb.update = function () {
    // Reduce timer by one
    if (bomb.timer > 0) {
      bomb.timer--;
      // Get affected tiles when the bomb has been properly created
      if(!bomb.hasGotAffectedTiles) {
        bomb.affected_tiles = getBombTiles(this);
        bomb.hasGotAffectedTiles = true;
      }
    }
    else {
      if (!bomb.hasExploded) {
        // Call explode function in board when timer has finished
        playBomb();
        BombExplode(bomb.affected_tiles);
        bomb.owner.activeBombs--;
        bomb.hasExploded = true;
        bomb.isVisible = false;
      }
      else {
        // Reduce the post explosion timer by 1
        if (bomb.explosion_timer > 0) {
          bomb.explosion_timer--;
        }
        else {
          // Set all tiles back to normal
          bombExplodeFinish(this);
        }
      }
    }
  },

  // Set source of sprite
  bomb.sprite.src = 'sprites/bomb/bomb.png';

  return bomb;
}



/*
This is the script used for the creation of the various
types of powerups used and picked up in-game.
*/
function Powerup(x, y) {
  var powerup = GameObject(x, y, POWERUP_SIZE);
  powerup.isPoweredUp = false;
  powerup.duration = POWERUP_DURATION * TICKS_PER_SECOND;
  powerup.isVisible = true;


  return powerup;
}


// TODO
function SpeedPowerup(x, y) {
  let speedPowerup = Powerup(x, y);
  speedPowerup.visible = true;
  speedPowerup.sprite.src = 'sprites/player.jpg';

  speedPowerup.update = function () {
    if (speedPowerup.isPoweredUp) {
      if (speedPowerup.duration > 0) {
        speedPowerup.duration--;
        // Increase velocity
        player.speed = MAX_SPEED + 5;
      }
      else {
        // delete powerup
      }
    }
    else {
      // Check collisions
      if (Intersects(getPlayerX(), getPlayerY(), player.size, player.size, speedPowerup.x, speedPowerup.y, POWERUP_SIZE, POWERUP_SIZE)) {
        speedPowerup.isPoweredUp = true;
        speedPowerup.isVisible = false;
        console.log("Has collided ");
      }
    }

  }

  return speedPowerup;
}

function ExtraFlamePowerup(x, y) {
  let efPowerup = Powerup(x, y);
  efPowerup.visible = true;
  efPowerup.sprite.src = 'sprites/player.jpg';
  efPowerup.update = function () {
    if (efPowerup.isPoweredUp) {
      efPowerup.timer--;
      if (efPowerup.timer >= 0) {
        // Increase range of bombs
        player.currentBombPower = DEFAULT_BOMB_POWER + 1;

      }

    }
    else {
      if (getPlayerX(), getPlayerY(), player.size, player.size, SpeedPowerup(x), SpeedPowerup(y), POWERUP_SIZE, POWERUP_SIZE) {
        efPowerup.isPoweredUp = true;
        efPowerup.isVisible = false;

      }

    }

  }

  return speedPowerup;
}


function ExtraBombPowerup(x, y) {
  var extrabombPowerup = Powerup;
}
function CollisionPowerup(x, y) {
  var collisionPowerup = Powerup;
}




/*
  This is the most basic object that can exist in the game.
*/
function GameObject(xPos, yPos, size) {
  // Create new bomb object
  let object = {
    // Has coordinates on the board
    x: xPos,
    y: yPos,
    // The size of object
    size: size,
    // A sprite to render
    sprite: undefined,
    // Visible boolean
    isVisible: true,
    // Update function is called once per tick
    update: function () {
    }
  }
  // Set source of sprite
  object.sprite = new Image(size, size);

  return object;
}
