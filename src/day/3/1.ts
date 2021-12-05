import { simpleInput, fullInput } from './input/index.js';

function getGammaAndEpsilonRateSignature(binaryStrings: string[]): number{

   const totalRows = binaryStrings.length;

   const totals = new Array(binaryStrings[0].length).fill(0);

   binaryStrings.forEach(b => {
      b.split('').map(
         (char, i) => char === '1' ? totals[i]++ : null
      );
   });

   const gammaString = totals.map(n => n > totalRows / 2 ? 1 : 0).join('');

   const epsilonString = totals.map(n => n > totalRows / 2 ? 0 : 1).join('');

   const gamma = parseInt(gammaString, 2);

   const epsilon = parseInt(epsilonString, 2);

   return gamma * epsilon;
}

const result = getGammaAndEpsilonRateSignature(fullInput);

console.log(`Result: ${result}`);
