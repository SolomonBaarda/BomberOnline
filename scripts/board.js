/*
This is the script for the main game board.
*/


function Board(width, height) {
  this.width = width;   // Width in tiles
  this.height = height;   // Height in tiles

  // This is the main board collection used to store the locations of objects
  var board = Generate(width, height);




  function Generate(width, height) {
    let board = new[width][height];

    for(int y = 0; y < height; y++) {
      for(int x = 0; x < width; x++) {
        // Set border of indestructable tiles at edge of map
        if(y == 0 || y == height || x == 0 || x == width) {
          board[x][y] = new IndestructibleTile(x, y);
        }
        else {
          board[x][y] = new DestructableTile(x, y);
        }
      }
    }

    return board;
  }


  /**
  This is the class for the tiles that can not be destroyed and
  that will be randomly positioned across the board but that will
  also be used to mark the silhouette of the board and limit the
  players movement to the map
  */
  function IndestructibleTile(x, y) {
    Tile.call(this, x, y);
  }

  /**
  This is the class for a tile that can be destroyed.
  */
  function DestructableTile(x, y) {
    Tile.call(this, x, y);
  }

  function Tile(x, y){
    this.x = x;
    this.y = y;
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
