/*
This is the script for the all game objects
*/

const BOMB_SIZE = PIXELS_PER_TILE / 2;
const BOMB_DEFAULT_TIMER = 2;

// all powerups have the same constant width and height
const POWERUP_SIZE = PIXELS_PER_TILE / 2;
const POWERUP_DURATION = 6;

/*
  Bomb constructor. Places a bomb at xPos, yPos on the board.
*/
function Bomb(x, y, seconds, owner) {
  // Create new bomb object
  let bomb = GameObject(x, y, BOMB_SIZE);

  // Timer that decreases each tick
  bomb.timer = TICKS_PER_SECOND * seconds;

  // Set reference to the owner of the bomb
  bomb.owner = owner;

  // Update function is called once per tick
  bomb.update = function () {
    bomb.timer--;
    if (bomb.timer <= 0) {
      // Call explode function in board
      bombExplode(this);
    }
  }

  // Set source of sprite
  bomb.sprite.src = 'sprites/bomb.png';

  return bomb;
}


/*
This is the script used for the creation of the various
types of powerups used and picked up in-game.
*/
function Powerup(x, y) {
  let powerup = GameObject(x, y, POWERUP_SIZE);
  powerup.isPoweredUp = false;
  powerup.duration = POWERUP_DURATION * TICKS_PER_SECOND;
  powerup.sprite.src = '';
  

  return powerup;
}

// TODO
function SpeedPowerup(x, y) {
  var speedPowerup = Powerup(x, y);
  speedPowerup.visible = true;
  speedPowerup.sprite.src = 'sprites/player.jpg';
  speedPowerup.update = function () {
    if (speedPowerup.isPoweredUp) {
      speedPowerup.timer--;
      if (speedPowerup.timer >= 0) {
        // Increase velocity
        player.speed = MAX_SPEED + 1;
      }

    }
    else {
      if (getPlayerX(), getPlayerY(), player.size, player.size, SpeedPowerup(x), SpeedPowerup(y), POWERUP_SIZE, POWERUP_SIZE){
        speedPowerup.isPoweredUp = true;
        speedPowerup.isVisible = false;
        
      }
      
    }

  }

}
function ExtraFlamePowerup(x, y) {
  var extraflamePowerup = Powerup;
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
