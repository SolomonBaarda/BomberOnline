/*
This is the script for rendering the game.
*/

const MAX_CANVAS_SIZE_PIXELS = 512

var canvas;
var ctx;
var boardSize;

function InitialiseCanvas(boardSize) {
  this.boardSize = boardSize

  // Make the canvas visible and set the size
  $("#canvas").show();

  canvas = document.getElementById("canvas");
  canvas.width = boardSize * PIXELS_PER_TILE;
  canvas.height = boardSize * PIXELS_PER_TILE;
  ctx = canvas.getContext("2d");
}

function Render() {
  // Render white background 
  RenderBoard(ctx);
  RenderPlayer(ctx);

  //console.log("Game rendered");
}

function RenderBoard(ctx) {
  ctx.canvas
  // Draw grey background 
  ctx.fillStyle = "#282828";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(var y = 0; y < boardSize; y++) {
    for(var x = 0; x < boardSize; x++) {
      // Loop through each tile and render them 
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(x*PIXELS_PER_TILE + 1, y*PIXELS_PER_TILE + 1, PIXELS_PER_TILE - 2, PIXELS_PER_TILE - 2);

      //$("#canvas").drawImage(board[x][y].element)
    }
  }
}




