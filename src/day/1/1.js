const input = require('./input');

function timesIncreased(list){
   const result = list.reduce(([acc, prevDepth], depth) => {
      if (depth > prevDepth){ return [++acc, depth]; }
      return [acc, depth];
   }, [0, undefined]);

   return result[0];
}

const result = timesIncreased(input.full);

console.log(`Result: ${result}`);
