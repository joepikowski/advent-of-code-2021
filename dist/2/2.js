"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./input/index.js");
var Submarine = /** @class */ (function () {
    function Submarine(x, y, aim) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (aim === void 0) { aim = 0; }
        this.x = x;
        this.y = y;
        this.aim = aim;
    }
    Object.defineProperty(Submarine.prototype, "depth", {
        get: function () {
            return -this.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Submarine.prototype, "horizontalPosition", {
        get: function () {
            return this.x;
        },
        enumerable: false,
        configurable: true
    });
    Submarine.prototype.forward = function (distance) {
        this.x += distance;
        this.y -= (this.aim * distance);
    };
    Submarine.prototype.down = function (value) {
        this.aim += value;
    };
    Submarine.prototype.up = function (value) {
        this.aim -= value;
    };
    return Submarine;
}());
;
function getPositionSignatureFromInstructions(instructions) {
    var sub = new Submarine();
    instructions.map(function (raw) {
        var _a = raw.split(' '), direction = _a[0], distance = _a[1];
        sub[direction](Number(distance));
    });
    return sub.depth * sub.horizontalPosition;
}
var result = getPositionSignatureFromInstructions(index_js_1.fullInput);
console.log("Result: ".concat(result));
