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
    tile.isCollidable = false;
    tile.isEmpty = true;

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
    tile.element = $('<sprites/indestructibleblock1.png>');

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
    tile.element = $('<sprites/destructibleblock.png>');

    return tile;
  }

  function Tile(xPosition, yPosition) {
    let tile = {
      x: xPosition,
      y: yPosition,
      isDestructable: undefined,
      isCollidable: undefined,
      isEmpty: undefined,
      element: undefined
    }

    return tile;
  }
}


function UpdateBoard() {

  console.log("Board updated.");
}
