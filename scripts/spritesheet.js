/**
This is a script that loads a specific spritesheet. It will return an array of sprites.
*/

// Currently unused, not sure how to split an image into tiles
function loadSpriteSheet(image, pixelsPerTile) {
    var spriteSheet = image;

    var spriteSheetWidth = image.width / pixelsPerTile;
    var spriteSheetHeight = image.height / pixelsPerTile;

    // Create 2d array with sprite icons in it
    var sprites = new Array(spriteSheetWidth);
    for (let i = 0; i < spriteSheetHeight; i++) {
        sprites[i] = new Array(spriteSheetHeight);
    }


    for (var y = 0; y < spriteSheetHeight; y++) {
        for (var x = 0; x < spriteSheetWidth; x++) {
            sprites[x][y] = spriteSheet
        }
    }
}



