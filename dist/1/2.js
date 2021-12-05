var input = require('./input');
function timesIncreased(list) {
    var result = list.reduce(function (_a, depth, i, arr) {
        var times = _a[0], prevThree = _a[1];
        if (prevThree.length < 3 || i > arr.length - 1) {
            prevThree.push(depth);
            return [times, prevThree];
        }
        else {
            var prevSum = sum(prevThree);
            var newThree = prevThree.slice(1);
            newThree.push(depth);
            var newSum = sum(newThree);
            if (newSum > prevSum) {
                ++times;
            }
            return [times, newThree];
        }
    }, [0, []]);
    return result[0];
}
function sum(arr) {
    return arr.reduce(function (acc, val) { return acc + val; });
}
var result = timesIncreased(input.full);
console.log("Result: ".concat(result));
