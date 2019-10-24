/*
This is the script for rendering the game.
*/

const PIXELS_PER_TILE = 64;

var canvas;
var ctx;
var boardSize;

function InitialiseCanvas(boardSize) {
  // Make the canvas visible and set the size
  $("#canvas").width(boardSize * PIXELS_PER_TILE);
  $("#canvas").height(boardSize * PIXELS_PER_TILE);
  $("#canvas").show();

  this.boardSize = boardSize

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}

function Render() {
  // Render white background 
  // ctx.fillStyle = "#ffffff";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  RenderBoard(ctx);
  RenderPlayer(ctx);

  //console.log("Game rendered");
}

function RenderBoard(ctx) {
  for(var y = 0; y < boardSize; y++) {
    for(var x = 0; x < boardSize; x++) {
      // Draw white background 
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw tiles - doesnt work!!!!!!! :(
      // ctx.fillStyle = "#00ff00";
      // ctx.fillRect(x*PIXELS_PER_TILE + 16, y*PIXELS_PER_TILE + 16, PIXELS_PER_TILE / 2, PIXELS_PER_TILE / 2);

      //$("#canvas").drawImage(board[x][y].element)
    }
  }
}




