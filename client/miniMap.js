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

  // Draw tiles first 
  for (let tileY = 0; tileY < boardHeight; tileY++) {
    for (let tileX = 0; tileX < boardWidth; tileX++) {
      map_ctx.drawImage(board[tileX][tileY].sprite, tileX * mapPixelsPerTile, tileY * mapPixelsPerTile, mapPixelsPerTile, mapPixelsPerTile);

      if (board[tileX][tileY].isDamaging) {
        map_ctx.fillStyle = "#FFA500";
        map_ctx.fillRect(tileX * mapPixelsPerTile, tileY * mapPixelsPerTile, mapPixelsPerTile, mapPixelsPerTile);
      }

    }
  }

  for (let i = 0; i < players.length; i++) {
    let tile = getNearestTile(players[i].x, players[i].y);

    if (players[i].name != players.name) {
      map_ctx.fillStyle = "#33cc33";
    }
    else {
      map_ctx.fillStyle = "#FF0000";
    }

    // Render player 2 * larger than the tile so easy to see
    map_ctx.fillRect((tile.x * mapPixelsPerTile) - (mapPixelsPerTile / 2), (tile.y * mapPixelsPerTile) - (mapPixelsPerTile / 2), mapPixelsPerTile * 2, mapPixelsPerTile * 2);

  }


}
