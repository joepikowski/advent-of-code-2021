"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./input/index.js");
function getOxygenAndC02RateSignature(binaryStrings) {
    var oxygen = filterForBitCriteria(binaryStrings, 0, true);
    var co2 = filterForBitCriteria(binaryStrings, 0, false);
    return oxygen * co2;
}
function filterForBitCriteria(binaryStrings, position, keepMostCommon) {
    var totalRows = binaryStrings.length;
    if (totalRows === 1) { // Base Case, Recursion Done.
        return parseInt(binaryStrings[0], 2);
    }
    var total = 0;
    var _a = binaryStrings.reduce(function (_a, b) {
        var ones = _a[0], zeroes = _a[1];
        if (b.split('')[position] === '1') {
            total++;
            ones.push(b);
        }
        else {
            zeroes.push(b);
        }
        return [ones, zeroes];
    }, [[], []]), ones = _a[0], zeroes = _a[1];
    var oneMostCommon = total >= (totalRows / 2);
    if (oneMostCommon) {
        return filterForBitCriteria(keepMostCommon ? ones : zeroes, ++position, keepMostCommon);
    }
    else {
        return filterForBitCriteria(keepMostCommon ? zeroes : ones, ++position, keepMostCommon);
    }
}
var result = getOxygenAndC02RateSignature(index_js_1.fullInput);
console.log("Result: ".concat(result));
