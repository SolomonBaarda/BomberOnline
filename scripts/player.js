/*
    This is the script for the player class. Currently, it stores the players display name.
*/

<script type="text/javascript">

function Player(name) {
    this.name = name;
    this.alive = false;

    this.isAlive = function() {
      return alive;
    }

    this.setDead = function() {
      alive = false;
    }
}
