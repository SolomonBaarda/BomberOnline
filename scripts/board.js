/*
This is the script for the main game board.
*/

var board;
var boardHeight;
var boardWidth;

function Board(width, height) {
  boardHeight = width;   // Width in tiles
  boardHeight = height;   // Height in tiles

  // This is the main board collection used to store the locations of objects
  board = Generate(width, height);



  function Generate(width, height) {
    // Create 2-dimensional array for the board
    var newBoard = new Array(width);
    for(let i = 0; i < height; i++) {
      newBoard[i] = new Array(height);
    }

    // Initialise elements
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        if(x == 0 || x == width || y == 0 || y == height) {
          newBoard[x][y] = IndestructibleTile(x, y);
        }
        else {
          newBoard[x][y] = DestructableTile(x, y);
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
    let tile = Tile(x, y)
    tile.isDestructable = false

    tile.element = $('<sprites/indestructibleblock1.png>');

    return tile;
  }

  /**
  This is the class for a tile that can be destroyed.
  */
  function DestructableTile(x, y) {
    let tile = Tile(x, y)
    tile.isDestructable = true;
    tile.element = $('<sprites/destructibleblock.png>');

    return tile;
  }

  function Tile(xPosition, yPosition){
    let tile = {
      x: xPosition,
      y: yPosition,
      //health: 0,
      isDestructable: undefined,
      element: undefined
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
  var canvas = document.getElementById("#canvas").getContext("2d");

  for(let y = 0; y < boardHeight; y++) {
    for(let x = 0; x < boardWidth; x++) {

      canvas.fillRect(x, y, 64, 64);

      //$("#canvas").drawImage(board[x][y].element)
    }
  }

  canvas.fillRect(0, 0, 200, 200);

  console.log("Board updated.");
}
