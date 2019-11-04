/*
This is the script for rendering the game.
*/

const MAX_CANVAS_SIZE_PIXELS = 512;

var canvas;
var ctx;
var boardSize;

var tilesOnCanvasX, tilesOnCanvasY;
var cameraCentreX, cameraCentreY;
var cameraOffsetX, cameraOffsetY;

var canvasCentreX, canvasCentreY;

function InitialiseCanvas(boardSize) {
  this.boardSize = boardSize

  // Make the canvas visible and set the size
  $("#canvas").show();

  // Initialise the canvas 
  canvas = document.getElementById("canvas");
  canvas.width = MAX_CANVAS_SIZE_PIXELS;
  canvas.height = MAX_CANVAS_SIZE_PIXELS;
  ctx = canvas.getContext("2d");

  // The number of tiles visible on the canvas
  tilesOnCanvasX = canvas.width / PIXELS_PER_TILE;
  tilesOnCanvasY = canvas.height / PIXELS_PER_TILE;

  // The x and y pos for half the canvas
  canvasCentreX = canvas.width / 2;
  canvasCentreY = canvas.height / 2;

  // x,y pos of the centre of the canvas (in-game)
  // Initially set to this value, updated by setCameraPosCentre(x, y)
  cameraCentreX = getPlayerX() + player_size / 2;
  cameraCentreY = getPlayerY() + player_size / 2
}

function Render() {
  // Clear canvas before each render
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the x,y pos of the top left corner of the canvas (in-game)
  cameraOffsetX = cameraCentreX - canvasCentreX;
  cameraOffsetY = cameraCentreY - canvasCentreY;

  RenderBoard();

  RenderGameObjects();

  RenderPlayer();

  //console.log("player x:"+getPlayerX()+", y:"+getPlayerY());
  //console.log("Game rendered");
}


function RenderBoard() {
  // Draw black background 
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Get the min and max values for the tiles visible on screen (around the player)
  // This means only tiles visible on the screen are rendered 
  var xTileMin = Math.floor(Clamp(cameraOffsetX / PIXELS_PER_TILE, 0, boardWidth));
  var yTileMin = Math.floor(Clamp(cameraOffsetY / PIXELS_PER_TILE, 0, boardHeight));
  var xTileMax = Math.floor(Clamp((cameraOffsetX + canvas.width) / PIXELS_PER_TILE + 1, 0, boardWidth));
  var yTileMax = Math.floor(Clamp((cameraOffsetY + canvas.height) / PIXELS_PER_TILE + 1, 0, boardHeight));

  //console.log("xMin:"+xTileMin+", yMin:"+yTileMin+", xMax:"+xTileMax+", yMax:"+yTileMax);

  // Loop through the nearby tiles 
  for (var y = yTileMin; y < yTileMax; y++) {
    for (var x = xTileMin; x < xTileMax; x++) {
      // Calculate the x and y pos of the tile on the screen 
      var tileCanvasX = x * PIXELS_PER_TILE - cameraOffsetX;
      var tileCanvasY = y * PIXELS_PER_TILE - cameraOffsetY;

      var sprite = board[x][y].sprite;

      ctx.drawImage(sprite, tileCanvasX, tileCanvasY, PIXELS_PER_TILE, PIXELS_PER_TILE);
    }
  }
}

function RenderGameObjects() {
  // Loop through all game objects 
  for (var i = 0; i < gameObjects.length; i++) {
    var objectX = gameObjects[i].x - cameraOffsetX;
    var objectY = gameObjects[i].y - cameraOffsetY;

    // Render them on the screen 
    ctx.drawImage(gameObjects[i].sprite, objectX, objectY, BOMB_SIZE, BOMB_SIZE);
  }
}

function RenderPlayer() {
  var playerOnCanvasX = canvasCentreX - player_size / 2;
  var playerOnCanvasY = canvasCentreY - player_size / 2;

  //console.log("player x:"+x+", y:"+y+", pCanvasX:"+playerOnCanvasX+", pCanvasY:"+playerOnCanvasY);

  ctx.drawImage(player_image, playerOnCanvasX, playerOnCanvasY, player_size, player_size);
  ctx.fillStyle = "#ffffff";
  //ctx.fillRect(getPlayerX(), getPlayerY(), player_size, player_size);
}



function setCameraPosCentre(x, y) {
  cameraCentreX = x;
  cameraCentreY = y;
}






