/*
This is the script for rendering the game.
*/

const MAX_MINIMAP_SIZE_PIXELS = 256;

var map;
var map_ctx;
var mapPixelsPerTile;

function InitialiseMap() {
  // Make the canvas visible and set the size
  $("#minimap").show();

  // Initialise the canvas 
  map = document.getElementById("minimap");
  map.width = MAX_MINIMAP_SIZE_PIXELS;
  map.height = MAX_MINIMAP_SIZE_PIXELS;
  map_ctx = map.getContext("2d");

  mapPixelsPerTile = Smallest(map.width / boardWidth, map.height / boardHeight);
}


function RenderMap() {
  map_ctx.clearRect(0, 0, map.width, map.height);

  // Draw black background 
  map_ctx.fillStyle = "#000000";
  map_ctx.fillRect(0, 0, map.width, map.height);

  for (let tileY = 0; tileY < boardHeight; tileY++) {
    for (let tileX = 0; tileX < boardWidth; tileX++) {

      if (board[tileX][tileY].isEmpty) {
        // Set explosion colour
        if (board[tileX][tileY].isDamaging) {
          map_ctx.fillStyle = "#FFA500";
        }
        // Empty tile colour
        else {
          map_ctx.fillStyle = "#282828";
        }
      }
      // Indestructable tile
      else if (!board[tileX][tileY].isDestructable) {
        map_ctx.fillStyle = "#D3D3D3";
      }
      // Destructable, not destroyed tile 
      else if (board[tileX][tileY].isDestructable) {
        map_ctx.fillStyle = "#808080";
      }

      map_ctx.fillRect(tileX * mapPixelsPerTile, tileY * mapPixelsPerTile, mapPixelsPerTile, mapPixelsPerTile);
    }
  }

  let playerTile = getNearestTile(getPlayerX(), getPlayerY());

  // Render player 3 * larger than the tile so easy to see
  map_ctx.fillStyle = "#33cc33";
  map_ctx.fillRect((playerTile.x * mapPixelsPerTile) - mapPixelsPerTile, (playerTile.y * mapPixelsPerTile) - mapPixelsPerTile, mapPixelsPerTile * 3, mapPixelsPerTile * 3);
}

