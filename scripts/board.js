/*
    This is the script for the main game board.
*/

<script type="text/javascript">

// This is the main board collection used to store the locations of objects
var board;

function Board(width, height) {
    this.width = width;
    this.height = height;

    Generate(width, height);

    function Generate(width, height){
        board = new[width][height];
    }
}
