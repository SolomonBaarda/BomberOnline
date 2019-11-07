/*
This is the script for rendering the game.
*/

const MAX_MINIMAP_SIZE_PIXELS = 256;

var map;
var map_ctx;

function InitialiseMap() {
  // Make the canvas visible and set the size
  $("#minimap").show();

  // Initialise the canvas 
  map = document.getElementById("minimap");
  map.width = MAX_MINIMAP_SIZE_PIXELS;
  map.height = MAX_MINIMAP_SIZE_PIXELS;
  map_ctx = map.getContext("2d");
}

function RenderMap() {
  map_ctx.clearRect(0, 0, map.width, map.height);

  // Draw black background 
  map_ctx.fillStyle = "#000000";
  map_ctx.fillRect(0, 0, map.width, map.height);

  let mapPixelsPerTile = Tile(map.width / boardWidth, map.height / boardHeight);

  for (let tileY = 0; tileY < boardHeight; tileY++) {
    for (let tileX = 0; tileX < boardWidth; tileX++) {
      if (board[tileX][tileY].isEmpty) {
        map_ctx.fillStyle = "#282828";
      }
      else if (!board[tileX][tileY].isDestructable) {
        map_ctx.fillStyle = "#D3D3D3";
      }
      else if (board[tileX][tileY].isDestructable) {
        map_ctx.fillStyle = "#808080";
      }
      map_ctx.fillRect(tileX * mapPixelsPerTile.x, tileY * mapPixelsPerTile.y, mapPixelsPerTile.x, mapPixelsPerTile.y);
    }
  }

  let playerTile = getNearestTile(getPlayerX(), getPlayerY());

  // Render player 3 * larger than the tile so easy to see
  map_ctx.fillStyle = "#33cc33";
  map_ctx.fillRect(playerTile.x * mapPixelsPerTile.x - 1, playerTile.y * mapPixelsPerTile.y - 1, mapPixelsPerTile.x * 3, mapPixelsPerTile.y * 3);
}

