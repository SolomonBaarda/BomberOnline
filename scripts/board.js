/*
This is the script for the main game board.
*/

var board;

function Board(width, height) {
  this.width = width;   // Width in tiles
  this.height = height;   // Height in tiles

  // This is the main board collection used to store the locations of objects
  board = Generate(width, height);




  function Generate(width, height) {
    let newBoard = [width][height];

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        // Set border of indestructable tiles at edge of map
        if(y == 0 || y == height || x == 0 || x == width) {
          //newBoard[x][y] = DestructableTile(x, y);
        }
        else {
          //newBoard[x][y] = DestructableTile(x, y);
        }
      }
    }
    return newBoard;
  }

  /**
  This is the class for the tiles that can not be destroyed and
  that will be randomly positioned across the board but that will
  also be used to mark the silhouette of the board and limit the
  players movement to the map
  */
  function IndestructibleTile(x, y) {
    let tile
  }

  /**
  This is the class for a tile that can be destroyed.
  */
  function DestructableTile(x, y) {
    let tile = Tile(x, y)
    tile.health = 100;
    tile.element = $('<sprites/player.jpg>');

    return tile;
  }

  function Tile(xPosition, yPosition){
    let tile = {
      x: xPosition,
      y: yPosition,
      health: 0,
      element: null
    }

    return tile;
  }



  /**
  This is the class for the power up blocks, class that will
  later divide itself into the different powerUps we might
  implement into the game
  */
  function PowerUps(x, y) {
    this.x = x;this.y = y;
  }
}


function UpdateBoard() {
  for(var i = 0; i < board.length; i++) {
    board[i].get
  }
}
