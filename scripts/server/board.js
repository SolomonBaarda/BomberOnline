/*
This is the script for the main game board.
*/

var board;
var boardHeight;
var boardWidth;

var gameObjects;

function Board(width, height) {
  boardWidth = width;   // Width in tiles
  boardHeight = height;   // Height in tiles

  // This is the main board collection used to store the locations of objects
  board = Generate(width, height);

  // Array containing all bombs, powerups etc
  gameObjects = new Array();



  function Generate(width, height) {
    // Create 2-dimensional array for the board
    var newBoard = new Array(width);
    for (let i = 0; i < height; i++) {
      newBoard[i] = new Array(height);
    }

    // Initialise elements
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Set every tile to be empty initially
        newBoard[x][y] = EmptyTile(x, y);

        // Set edge to be indestructable tiles
        if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
          newBoard[x][y] = IndestructibleTile(x, y);
        }
        else {
          if (x % 2 == 0 && y % 2 == 0) {
            newBoard[x][y] = IndestructibleTile(x, y);
          }
          else {
            var random = Math.floor(Math.random() * 10);

            if (random < 4) {
              newBoard[x][y] = DestructableTile(x, y);
            }
          }
        }

      }
    }

    return newBoard;
  }


  function EmptyTile(x, y) {
    let tile = Tile(x, y);
    tile.isDestructable = false;
    tile.isCollidable = false;
    tile.isEmpty = true;
    tile.isDamaging = false;
    tile.sprite = new Image(16, 16);
    tile.sprite.src = 'sprites/tileset/cropped/emptyTile.png';

    return tile;
  }

  /**
    Tile that cannot be destroyed.
  */
  function IndestructibleTile(x, y) {
    let tile = Tile(x, y);
    tile.isDestructable = false;
    tile.isCollidable = true;
    tile.isEmpty = false;
    tile.isDamaging = false;
    tile.sprite = new Image(16, 16);
    tile.sprite.src = 'sprites/tileset/cropped/indestructableTile.png';

    return tile;
  }

  /**
    Tile that can be destroyed.
  */
  function DestructableTile(x, y) {
    let tile = Tile(x, y);
    tile.isDestructable = true;
    tile.isCollidable = true;
    tile.isEmpty = false;
    tile.isDamaging = false;
    tile.sprite = new Image(16, 16);

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
      setDamaging: undefined,
      sprite: undefined
    }

    return tile;
  }
}

// Function that calculates the x and y tile position of the coordinates given 
function getNearestTile(x, y) {
  return {
    x: Clamp(Math.floor(x / PIXELS_PER_TILE), 0, boardWidth),
    y: Clamp(Math.floor(y / PIXELS_PER_TILE), 0, boardHeight)
  };
}

// Function that calculates all of the possible tiles that the objects is on
function getAllConnectingTiles(x, y, width, height) {
  var tileMin = getNearestTile(x, y);
  var tileMax = getNearestTile(x + width, y + height);

  return [tileMin, tileMax];
}


// this should be in the player object
function dropBomb(player) {
  if (player.activeBombs < player.currentMaxBombs) {
    // Centre of bomb should be centre of player
    var trueX = getPlayerX() + player.size / 2 - BOMB_SIZE / 2;
    var trueY = getPlayerY() + player.size / 2 - BOMB_SIZE / 2;

    var bomb = Bomb(trueX, trueY, BOMB_DEFAULT_TIMER, player);

    player.activeBombs++;

    gameObjects.push(bomb);
  }
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
    let left = Tile(Clamp(tile.x - i, 0, boardWidth-1), tile.y);
    affectedTiles.push(board[left.x][left.y]);

    // Tile to the right
    let right = Tile(Clamp(tile.x + i, 0, boardWidth-1), tile.y);
    affectedTiles.push(board[right.x][right.y]);

    // Tile up
    let up = Tile(tile.x, Clamp(tile.y - i, 0, boardHeight-1));
    affectedTiles.push(board[up.x][up.y]);

    // Tile down 
    let down = Tile(tile.x, Clamp(tile.y + i, 0, boardHeight-1));
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

  // Remove the bomb game object 
  for (var i = 0; i < gameObjects.length; i++) {
    if (gameObjects[i] === bomb) {
      // Remove the bomb from game objects
      gameObjects.splice(i, 1);
    }
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



function UpdateBoard() {
  // Update all gameObjects 
  for (var i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update();
  }

}
