/*
This is the script for the main game board.
*/

var board;
var boardHeight;
var boardWidth;

var isBattleRoyale;

var initialBoardTimer;
var secondaryBoardTimer;
var DEFAULT_SECONDARY_BOARD_TIMER = 5 * TICKS_PER_SECOND;
var currentWallPosition = 0;

var toldInitialMessage;

var gameObjects;

/**
 * Function that generates and returns an empty board.
 * @param {*} width 
 * @param {*} height 
 */
function createBoard(width, height) {
  boardWidth = width;   // Width in tiles
  boardHeight = height;   // Height in tiles

  // Array containing all bombs, powerups etc
  gameObjects = new Array();

  // Create 2-dimensional array for the board
  let newBoard = new Array(width);
  for (let i = 0; i < width; i++) {
    newBoard[i] = new Array(height);
  }


  // Initialise elements
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Set edge to be indestructable tiles
      if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
        newBoard[x][y] = IndestructibleTile(x, y);
      }
      else {
        // Set every tile to be empty
        newBoard[x][y] = EmptyTile(x, y);
      }
    }
  }
  return newBoard;
}


function generateTutorial(width, height) {
  isBattleRoyale = false;
  board = createBoard(width, height);

  // Initialise elements
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Set edge to be indestructable tiles
      if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
        board[x][y] = IndestructibleTile(x, y);
      }
      else {
        if (x == 6 && y < height - 2) {
          board[x][y] = IndestructibleTile(x, y);
        }
        else if (x == 8 && y > 1) {
          board[x][y] = IndestructibleTile(x, y);
        }
        else if (x > 11 && x < 14) {
          board[x][y] = DestructableTile(x, y);
        }

        if (x < 8) {
          board[x][y].message = "use WSAD to move";
        }
        else if (x < 14) {
          board[x][y].message = "press \"space\" for bomb";
        }
        else if (x < 21) {
          board[x][y].message = "pick up powerups";
        }
      }
    }
  }
}


/**
 * 
 * @param {*} width 
 * @param {*} height 
 * @param {*} warmupSeconds 
 */

function generateBattleRoyale() {
  width = 64;
  height = 64;

  warmupSeconds = 60;

  isBattleRoyale = true;
  initialBoardTimer = warmupSeconds * TICKS_PER_SECOND;
  secondaryBoardTimer = DEFAULT_SECONDARY_BOARD_TIMER;
  toldInitialMessage = false;

  // This is the main board collection used to store the locations of objects
  board = createBoard(width, height);
  board = Generate(board);


  // Battle royale's generate function 
  function Generate(board) {
    // Initialise elements
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Set edge to be indestructable tiles
        if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
          board[x][y] = IndestructibleTile(x, y);
        }
        else {
          // Set indestructable tiles 
          if (isValidIndestructble(x, y)) {
            board[x][y] = IndestructibleTile(x, y);
          }
          // Set destructable tiles randomly for now
          else {
            var random = Math.floor(Math.random() * 10);

            if (random < 4) {
              board[x][y] = DestructableTile(x, y);
            }
          }
        }
      }
    }

    return board;
  }

  function isValidIndestructble(x, y) {
    return (x % 4 == 0 && y % 4 == 0 || x % 4 == 2 && y % 2 == 1);
  }
}



/**
 * Tile that is empty.
 * @param {*} x 
 * @param {*} y 
 */
function EmptyTile(x, y) {
  let tile = Tile(x, y);
  tile.isDestructable = false;
  tile.isCollidable = false;
  tile.isEmpty = true;
  tile.isDamaging = false;
  tile.sprite.src = 'sprites/tileset/cropped/emptyTile.png';

  return tile;
}

/**
 * Tile that cannot be destroyed.
 * @param {*} x 
 * @param {*} y 
 */
function IndestructibleTile(x, y) {
  let tile = Tile(x, y);
  tile.isDestructable = false;
  tile.isCollidable = true;
  tile.isEmpty = false;
  tile.isDamaging = false;
  tile.sprite.src = 'sprites/tileset/cropped/indestructableTile.png';

  return tile;
}

/**
 * Tile that can be destroyed.
 * @param {*} x 
 * @param {*} y 
 */
function DestructableTile(x, y) {
  let tile = Tile(x, y);
  tile.isDestructable = true;
  tile.isCollidable = true;
  tile.isEmpty = false;
  tile.isDamaging = false;

  // Set sprite to be random 
  var random = Math.floor(Math.random() * 20);
  if (random < 8) {
    tile.sprite.src = 'sprites/tileset/cropped/destructableTile2.png';
  }
  else if (random < 15) {
    tile.sprite.src = 'sprites/tileset/cropped/destructableTile1.png';
  }
  else {
    tile.sprite.src = 'sprites/tileset/cropped/destructableTile4.png';
  }

  tile.destroy = function () {
    tile.isCollidable = false;
    tile.isEmpty = true;
    tile.sprite.src = 'sprites/tileset/cropped/destroyedTile.png';
  }

  return tile;
}

function Tile(xPosition, yPosition) {
  let tile = {
    x: xPosition,
    y: yPosition,
    isDestructable: undefined,
    isCollidable: undefined,
    isEmpty: undefined,
    isDamaging: undefined,
    // Message used for the tutorial level. This is where the string is stored.
    message: undefined,
    sprite: undefined
  }

  tile.sprite = new Image(16, 16);

  return tile;
}


/**
 * Function that calculates the closest x and y tile position of the coordinates given.
 * @param {*} x 
 * @param {*} y 
 */
function getNearestTile(x, y) {
  return {
    x: Clamp(Math.floor(x / PIXELS_PER_TILE), 0, boardWidth),
    y: Clamp(Math.floor(y / PIXELS_PER_TILE), 0, boardHeight)
  };
}

/**
 * Function that calculates all of the possible tiles that the objects is on top of.
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 * @param {*} height 
 */
function getAllConnectingTiles(x, y, width, height) {
  return [getNearestTile(x, y), getNearestTile(x + width, y), getNearestTile(x, y + height), getNearestTile(x + width, y + height)];
}




/**
 * Function that calculates which tiles are affected by a bomb when it explodes.
 * @param {*} bomb 
 */
function getBombTiles(bomb) {
  // Store all the tiles that have been damaged 
  let affectedTiles = [];

  // Gets the tile on the centre of the bomb sprite 
  let tile = getNearestTile(bomb.x + BOMB_SIZE / 2, bomb.y + BOMB_SIZE / 2);
  affectedTiles.push(board[tile.x][tile.y]);

  // Find out how many tiles should be damaged 
  let power = bomb.power;

  // Loop through tiles N E S W from tile by the power 
  for (var i = DEFAULT_BOMB_POWER; i <= power; i++) {
    // For each tile add it to the list of tiles affected 
    // Tile to the left
    let left = Tile(Clamp(tile.x - i, 0, boardWidth - 1), tile.y);
    affectedTiles.push(board[left.x][left.y]);

    // Tile to the right
    let right = Tile(Clamp(tile.x + i, 0, boardWidth - 1), tile.y);
    affectedTiles.push(board[right.x][right.y]);

    // Tile up
    let up = Tile(tile.x, Clamp(tile.y - i, 0, boardHeight - 1));
    affectedTiles.push(board[up.x][up.y]);

    // Tile down 
    let down = Tile(tile.x, Clamp(tile.y + i, 0, boardHeight - 1));
    affectedTiles.push(board[down.x][down.y]);
  }

  return affectedTiles;
}


/**
 * Function that is called by the bomb when it explodes.
 * @param {*} affectedTiles 
 */
function BombExplode(affectedTiles) {
  let currentTile;

  // Loop through all the affected tiles.
  for (let i = 0; i < affectedTiles.length; i++) {
    currentTile = Tile(affectedTiles[i].x, affectedTiles[i].y);

    // Destroy only destructable tiles 
    if (board[currentTile.x][currentTile.y].isDestructable) {
      board[currentTile.x][currentTile.y].destroy();
    }
    // Set empty tiles to damaging
    if (board[currentTile.x][currentTile.y].isEmpty) {
      board[currentTile.x][currentTile.y].isDamaging = true;
    }
  }

}

/**
 * Function that is called when a bomb has finished exploding.
 * @param {*} bomb 
 */
function bombExplodeFinish(bomb) {
  let affectedTiles = bomb.affected_tiles;

  // Loop through all the affected tiles.
  for (let i = 0; i < affectedTiles.length; i++) {
    currentTile = Tile(affectedTiles[i].x, affectedTiles[i].y);

    // Set all damaging to be false now 
    if (board[currentTile.x][currentTile.y].isDamaging) {
      board[currentTile.x][currentTile.y].isDamaging = false;;
    }
  }

  deleteGameObject(bomb);
}

/**
 * Function that removes an object from gameObjects. To be called once it's lifetime has expired.
 * @param {*} object 
 */
function deleteGameObject(object) {
  // Remove the bomb game object
  for (var i = 0; i < gameObjects.length; i++) {
    if (gameObjects[i] === object) {
      // Remove the bomb from game objects
      gameObjects.splice(i, 1);
    }
  }

}

/**
 * Function that adds an object to gameObjects.
 * @param {*} object 
 */
function addGameObject(object) {
  gameObjects.push(object);
}

/**
 * Function that returns true if an object is inside of a bomb explosion.
 * @param {*} x
 * @param {*} y
 * @param {*} size
 */
function isInsideExplosion(x, y, size) {
  let nearbyTiles = getAllConnectingTiles(x, y, size, size);

  // Check the nearby tiles to see if the player is inside an explosion 
  for (let i = 0; i < nearbyTiles.length; i++) {
    let tile = Tile(nearbyTiles[i].x, nearbyTiles[i].y);

    if (board[tile.x][tile.y].isDamaging) {
      // Check the player is intersecting with the damage
      if (Intersects(x, y, size, size, tile.x * PIXELS_PER_TILE, tile.y * PIXELS_PER_TILE, PIXELS_PER_TILE, PIXELS_PER_TILE)) {
        return true;
      }
    }
  }

  return false;
}



/**
 * Function that checks if there is a message attached to the block at the coordinates x, y.
 * @param {*} x 
 * @param {*} y 
 */
function isMessageAt(x, y) {
  let tile = getNearestTile(x, y);

  if (board[tile.x][tile.y].message != undefined) {
    return true;
  }
  else {
    return false;
  }
}
/**
 * Function that returns the message attached to the block at the coordinates x, y.
 * @param {*} x 
 * @param {*} y 
 */
function returnMessageAt(x, y) {
  let tile = getNearestTile(x, y);

  if (board[tile.x][tile.y].message != undefined) {
    return board[tile.x][tile.y].message;
  }
}



/**
 * Function that checks if the players next move is valid or not.
 * @param {*} oldX 
 * @param {*} oldY 
 * @param {*} playerSize 
 * @param {*} newX 
 * @param {*} newY 
 */
function isValidMove(oldX, oldY, playerSize, newX, newY) {
  // Get the 3x3 array of tiles around the player
  var xTileMin = Math.floor(Clamp(getPlayerX() / PIXELS_PER_TILE, 0, boardWidth));
  var yTileMin = Math.floor(Clamp(getPlayerY() / PIXELS_PER_TILE, 0, boardHeight));
  var xTileMax = Math.floor(Clamp((getPlayerX() + playerSize) / PIXELS_PER_TILE + 1, 0, boardWidth));
  var yTileMax = Math.floor(Clamp((getPlayerY() + playerSize) / PIXELS_PER_TILE + 1, 0, boardHeight));

  // Loop through the nearby tiles
  for (var tileY = yTileMin; tileY < yTileMax; tileY++) {
    for (var tileX = xTileMin; tileX < xTileMax; tileX++) {
      // Check tile is collidable
      if (board[tileX][tileY].isCollidable) {
        // Check player actually collides with either the new x or y pos
        if (Intersects(newX, oldY, playerSize, playerSize, tileX * PIXELS_PER_TILE, tileY * PIXELS_PER_TILE, PIXELS_PER_TILE, PIXELS_PER_TILE)) {
          return false;
        }
        if (Intersects(oldX, newY, playerSize, playerSize, tileX * PIXELS_PER_TILE, tileY * PIXELS_PER_TILE, PIXELS_PER_TILE, PIXELS_PER_TILE)) {
          return false;
        }
      }
    }
  }
  return true;
}


function destroyAllTiles() {
  for (var y = 0; y < boardHeight; y++) {
    for (var x = 0; x < boardWidth; x++) {
      if (board[x][y].isDestructable) {
        board[x][y].destroy();
      }
    }
  }
}


function UpdateWallPosition(pos) {
  if (pos > 0) {
    allPositions = CalculateWallPositions(pos, pos);

    // Loop through all positions 
    for (let i = 0; i < allPositions.length; i++) {
      // Destroy the block
      if (board[allPositions[i].x][allPositions[i].y].isDestructable) {
        board[allPositions[i].x][allPositions[i].y].destroy();
      }
      // Set it to destructable 
      if (board[allPositions[i].x][allPositions[i].y].isEmpty) {
        board[allPositions[i].x][allPositions[i].y].isDamaging = true;
      }
    }


  }
}


function CalculateWallPositions(width, height) {
  allPositions = [];

  // Set left wall
  for (let h = height; h < boardHeight - height; h++) {
    allPositions.push(board[width][h]);
  }
  // Set right wall
  for (let h = height; h < boardHeight - height; h++) {
    allPositions.push(board[boardWidth - 1 - width][h]);
  }
  // Set top wall
  for (let w = width; w < boardWidth - width; w++) {
    allPositions.push(board[w][height]);
  }
  // Set bottom wall
  for (let w = width; w < boardWidth - width; w++) {
    allPositions.push(board[w][boardHeight - 1 - height]);
  }

  return allPositions;
}



function UpdateBoard() {
  // Update all gameObjects 
  for (var i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update();
  }

  // Only execute in battle royale mode
  if (isBattleRoyale) {
    // Initial timer for time before barrier comes in
    if (initialBoardTimer > 0) {
      initialBoardTimer--;
    }
    else {
      if (toldInitialMessage) {
        // Secondary timer for time between each block moving
        if (secondaryBoardTimer > 0) {
          secondaryBoardTimer--;
        }
        else {
          // Reset timer update wall position
          secondaryBoardTimer = DEFAULT_SECONDARY_BOARD_TIMER;
          currentWallPosition++;
          UpdateWallPosition(currentWallPosition);
        }
      }
      // Display a message to the players that the wall is closing in
      else {
        DisplayAlert("Warning! The wall is now closing in!", 5);
        toldInitialMessage = true;
      }
    }
  }

}

