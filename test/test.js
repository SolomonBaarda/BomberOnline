var assert = require('assert');

var i = Clamp(5, 0, 10);
assert(i == 5);

var i = Clamp(-4, 0, 10);
assert(i == 0);

var i = Clamp(46, 0, 10);
assert(i == 10);
