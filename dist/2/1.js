var input = require('./input');
var Submarine = /** @class */ (function () {
    function Submarine(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Submarine.prototype.getDepth = function () {
        return -this.y;
    };
    Submarine.prototype.getHorizontalPosition = function () {
        return this.x;
    };
    Submarine.prototype.forward = function (distance) {
        this.x += distance;
    };
    Submarine.prototype.down = function (distance) {
        this.y -= distance;
    };
    Submarine.prototype.up = function (distance) {
        this.y += distance;
    };
    return Submarine;
}());
;
function getPositionSignatureFromInstructions(instructions) {
    var sub = new Submarine();
    instructions.map(function (raw) {
        var _a = raw.split(' '), direction = _a[0], distance = _a[1];
        sub[direction](parseInt(distance));
    });
    return sub.getDepth() * sub.getHorizontalPosition();
}
var result = getPositionSignatureFromInstructions(input.full);
console.log("Result: ".concat(result));
