/*
This is the script for the main game board.
*/

var board;
var boardHeight;
var boardWidth;

function Board(width, height) {
  boardWidth = width;   // Width in tiles
  boardHeight = height;   // Height in tiles

  // This is the main board collection used to store the locations of objects
  board = Generate(width, height);

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
          var random = Math.floor(Math.random() * 10);

          if (random == 0) {
            newBoard[x][y] = IndestructibleTile(x, y);
          }
          else if (random < 3) {
            newBoard[x][y] = DestructableTile(x, y);
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
    tile.sprite = new Image(16, 16);

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

    tile.destroy = function() {
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
      sprite: undefined
    }

    return tile;
  }
}


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
  for(var y = 0; y < boardHeight; y++) {
    for(var x = 0; x < boardWidth; x++) {
      if(board[x][y].isDestructable) {
        board[x][y].destroy();
      }
    }
  }
}


function UpdateBoard() {
  //console.log("Board updated.");
}
