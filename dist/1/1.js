var input = require('./input');
function timesIncreased(list) {
    var result = list.reduce(function (_a, depth) {
        var acc = _a[0], prevDepth = _a[1];
        if (depth > prevDepth) {
            return [++acc, depth];
        }
        return [acc, depth];
    }, [0, undefined]);
    return result[0];
}
var result = timesIncreased(input.full);
console.log("Result: ".concat(result));
