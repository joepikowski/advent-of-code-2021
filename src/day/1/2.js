const input = require('./input');

function timesIncreased(list){
   const result = list.reduce(
       ([times, prevThree], depth, i, arr) => {
        if (prevThree.length < 3 || i > arr.length - 1){
            prevThree.push(depth);
            return [times, prevThree];
        }else{
            let prevSum = sum(prevThree);
            const newThree = prevThree.slice(1);
            newThree.push(depth);
            let newSum = sum(newThree);
            if (newSum > prevSum){ ++times; }
            return [times, newThree];
        }
    }, [0, []]);

   return result[0];
}

function sum(arr){
    return arr.reduce((acc, val) => acc + val);
}

const result = timesIncreased(input.full);

console.log(`Result: ${result}`);
