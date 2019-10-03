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
              if(y == 0 || y == height || x == 0 || x == width) {
                board[x][y] = new DestructableTile(x, y);
              }
              else {
                board[x][y] = new DestructableTile(x, y);
              }
          }
        }

        return board;
    }


    

    /**
        This is the class for a tile that can be destroyed.
    */
    function DestructableTile(x, y) {
      Tile.call(this, x, y);
    }


    /**
        This is the sub class for storing tiles
    */
    function Tile(x, y) {
        this.x = x;
        this.y = y;
    }
}
