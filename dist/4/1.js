"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./input/index.js");
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
    var boards = rawBoards.map(function (board) {
        return board.map(function (row) {
            row = row.replaceAll('  ', ' ').split(' ');
            return row.map(function (s) { return new BingoNode(parseInt(s)); });
        });
    });
    boards.forEach(function (board) {
        board.forEach(function (row, rowIndex) {
            row.forEach(function (node, colIndex) {
                var _a, _b, _c, _d;
                node.up = (_a = board[rowIndex - 1]) === null || _a === void 0 ? void 0 : _a[colIndex];
                node.down = (_b = board[rowIndex + 1]) === null || _b === void 0 ? void 0 : _b[colIndex];
                node.left = (_c = board[rowIndex]) === null || _c === void 0 ? void 0 : _c[colIndex - 1];
                node.right = (_d = board[rowIndex]) === null || _d === void 0 ? void 0 : _d[colIndex + 1];
            });
        });
    });
    return [input.draw, boards];
}
function getWinningBoardScore(draw, boards) {
    var winnerFound = false;
    var winningBoard;
    var drawIndex = 0;
    while (!winnerFound && drawIndex < draw.length) {
        for (var _i = 0, boards_1 = boards; _i < boards_1.length; _i++) {
            var board = boards_1[_i];
            if (isWinnerAfterMarking(draw[drawIndex], board)) {
                winningBoard = board;
                winnerFound = true;
                break;
            }
        }
        drawIndex++;
    }
    return winnerFound ? sumBoard(winningBoard) * draw[--drawIndex] : 0;
}
function isWinnerAfterMarking(toMark, board) {
    var isWinner = false;
    var rowIndex = 0;
    while (!isWinner && rowIndex < board.length) {
        for (var _i = 0, _a = board[rowIndex]; _i < _a.length; _i++) {
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
    return board.flat().reduce(function (sum, b) { return b.marked ? sum : sum + b.value; }, 0);
}
var _a = parseInput(index_js_1.fullInput), draw = _a[0], boards = _a[1];
var result = getWinningBoardScore(draw, boards);
console.log("Result: ".concat(result));
