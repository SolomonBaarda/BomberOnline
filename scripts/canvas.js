/*
This is the script for rendering the game.
*/
var tickCount = 0;

const MAX_CANVAS_SIZE_PIXELS = 512;

var canvas;
var canvas_ctx;

var tilesOnCanvasX, tilesOnCanvasY;
var cameraCentreX, cameraCentreY;
var cameraOffsetX, cameraOffsetY;

var canvasCentreX, canvasCentreY;

function InitialiseCanvas() {
  // Make the canvas visible and set the size
  $("#canvas").show();

  // Initialise the canvas 
  canvas = document.getElementById("canvas");
  canvas.width = MAX_CANVAS_SIZE_PIXELS;
  canvas.height = MAX_CANVAS_SIZE_PIXELS;
  canvas_ctx = canvas.getContext("2d");

  // The number of tiles visible on the canvas
  tilesOnCanvasX = canvas.width / PIXELS_PER_TILE;
  tilesOnCanvasY = canvas.height / PIXELS_PER_TILE;

  // The x and y pos for half the canvas
  canvasCentreX = canvas.width / 2;
  canvasCentreY = canvas.height / 2;

  // x,y pos of the centre of the canvas (in-game)
  // Initially set to this value, updated by setCameraPosCentre(x, y)
  cameraCentreX = getPlayerX() + player.size / 2;
  cameraCentreY = getPlayerY() + player.size / 2;
}

function Render() {
  tickCount++;
  // Clear canvas before each render
  canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the x,y pos of the top left corner of the canvas (in-game)
  cameraOffsetX = cameraCentreX - canvasCentreX;
  cameraOffsetY = cameraCentreY - canvasCentreY;

  // Render game
  RenderBoard();
  RenderGameObjects();
  RenderPlayer();

  // Render map twice per second as its pretty laggy 
  if (tickCount % (TICKS_PER_SECOND / 2) == 0) {
    RenderMap();
    tickCount = 0;
  }
}


function RenderBoard() {
  // Draw black background 
  canvas_ctx.fillStyle = "#000000";
  canvas_ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Get the min and max values for the tiles visible on screen (around the player)
  // This means only tiles visible on the screen are rendered 
  let tileMin = getNearestTile(cameraOffsetX, cameraOffsetY);
  let tileMax = getNearestTile(cameraOffsetX + canvas.width + PIXELS_PER_TILE, cameraOffsetY + canvas.height + PIXELS_PER_TILE);

  // Loop through the nearby tiles 
  for (let y = tileMin.y; y < tileMax.y; y++) {
    for (let x = tileMin.x; x < tileMax.x; x++) {
      // Calculate the x and y pos of the tile on the screen 
      let tileCanvasX = x * PIXELS_PER_TILE - cameraOffsetX;
      let tileCanvasY = y * PIXELS_PER_TILE - cameraOffsetY;

      canvas_ctx.drawImage(board[x][y].sprite, tileCanvasX, tileCanvasY, PIXELS_PER_TILE, PIXELS_PER_TILE);
    }
  }
}

function RenderGameObjects() {
  // Loop through all game objects 
  for (var i = 0; i < gameObjects.length; i++) {
    let objectCanvasX = gameObjects[i].x - cameraOffsetX;
    let objectCanvasY = gameObjects[i].y - cameraOffsetY;


    if (gameObjects[i].isVisible) {
      // Render each object 
      canvas_ctx.drawImage(gameObjects[i].sprite, objectCanvasX, objectCanvasY, gameObjects[i].size, gameObjects[i].size);
    }

  }
}

function RenderPlayer() {
  let playerOnCanvasX = canvasCentreX - (player.size / 2);
  let playerOnCanvasY = canvasCentreY - (player.size / 2);

  canvas_ctx.drawImage(player.sprite, playerOnCanvasX, playerOnCanvasY, player.size, player.size);
}


function setCameraPosCentre(x, y) {
  cameraCentreX = x;
  cameraCentreY = y;
}






