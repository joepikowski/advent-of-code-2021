"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./input/index.js");
var BingoBoard = /** @class */ (function () {
    function BingoBoard(value, isWinner) {
        if (isWinner === void 0) { isWinner = false; }
        this.value = value;
        this.isWinner = isWinner;
    }
    return BingoBoard;
}());
var BingoNode = /** @class */ (function () {
    function BingoNode(value, marked) {
        if (marked === void 0) { marked = false; }
        this.value = value;
        this.marked = marked;
    }
    BingoNode.prototype.isOnCompleteLine = function () {
        return this.isOnCompleteHorizontal() || this.isOnCompleteVertical();
    };
    BingoNode.prototype.isOnCompleteVertical = function () {
        return this.getMarkedCountInDirection('up', this) + this.getMarkedCountInDirection('down', this) === 4;
    };
    BingoNode.prototype.isOnCompleteHorizontal = function () {
        return this.getMarkedCountInDirection('left', this) + this.getMarkedCountInDirection('right', this) === 4;
    };
    BingoNode.prototype.getMarkedCountInDirection = function (direction, node, sum) {
        if (sum === void 0) { sum = 0; }
        if (node[direction] === undefined) {
            return sum;
        }
        return this.getMarkedCountInDirection(direction, node[direction], (node[direction].marked ? ++sum : sum));
    };
    return BingoNode;
}());
function parseInput(input) {
    var rawBoards = input.boards.split('\n\n').map(function (b) { return b.split('\n'); });
    var boards = rawBoards.map(function (rawBoard) {
        var board = rawBoard.map(function (row) {
            row = row.replaceAll('  ', ' ').split(' ');
            return row.map(function (s) { return new BingoNode(parseInt(s)); });
        });
        return new BingoBoard(board);
    });
    boards.forEach(function (board) {
        board.value.forEach(function (row, rowIndex) {
            row.forEach(function (node, colIndex) {
                var _a, _b, _c, _d;
                node.up = (_a = board.value[rowIndex - 1]) === null || _a === void 0 ? void 0 : _a[colIndex];
                node.down = (_b = board.value[rowIndex + 1]) === null || _b === void 0 ? void 0 : _b[colIndex];
                node.left = (_c = board.value[rowIndex]) === null || _c === void 0 ? void 0 : _c[colIndex - 1];
                node.right = (_d = board.value[rowIndex]) === null || _d === void 0 ? void 0 : _d[colIndex + 1];
            });
        });
    });
    return [input.draw, boards];
}
function getWinningBoardScore(draw, boards) {
    var winnersFound = 0;
    var mostRecentWinner;
    var drawIndex = 0;
    while (winnersFound < boards.length && drawIndex < draw.length) {
        for (var _i = 0, boards_1 = boards; _i < boards_1.length; _i++) {
            var board = boards_1[_i];
            if (!board.isWinner && isWinnerAfterMarking(draw[drawIndex], board)) {
                mostRecentWinner = board;
                board.isWinner = true;
                ++winnersFound;
            }
        }
        drawIndex++;
    }
    return winnersFound > 0 ? sumBoard(mostRecentWinner) * draw[--drawIndex] : 0;
}
function isWinnerAfterMarking(toMark, board) {
    var isWinner = false;
    var rowIndex = 0;
    while (!isWinner && rowIndex < board.value.length) {
        for (var _i = 0, _a = board.value[rowIndex]; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.value === toMark) {
                node.marked = true;
                if (node.isOnCompleteLine()) {
                    isWinner = true;
                    break;
                }
            }
        }
        rowIndex++;
    }
    return isWinner;
}
function sumBoard(board) {
    return board.value.flat().reduce(function (sum, b) { return b.marked ? sum : sum + b.value; }, 0);
}
var _a = parseInput(index_js_1.fullInput), draw = _a[0], boards = _a[1];
var result = getWinningBoardScore(draw, boards);
console.log("Result: ".concat(result));
