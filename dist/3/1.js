"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./input/index.js");
function getGammaAndEpsilonRateSignature(binaryStrings) {
    var totalRows = binaryStrings.length;
    var totals = new Array(binaryStrings[0].length).fill(0);
    binaryStrings.forEach(function (b) {
        b.split('').map(function (char, i) { return char === '1' ? totals[i]++ : null; });
    });
    var gammaString = totals.map(function (n) { return n > totalRows / 2 ? 1 : 0; }).join('');
    var epsilonString = totals.map(function (n) { return n > totalRows / 2 ? 0 : 1; }).join('');
    var gamma = parseInt(gammaString, 2);
    var epsilon = parseInt(epsilonString, 2);
    return gamma * epsilon;
}
var result = getGammaAndEpsilonRateSignature(index_js_1.fullInput);
console.log("Result: ".concat(result));
