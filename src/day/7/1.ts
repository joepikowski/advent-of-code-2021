import { simpleInput, fullInput } from './input/index.js';

function getLowestFuelUsageForPosition(rawPosition: string): number{
   let lowestFuel = Number.POSITIVE_INFINITY;

   let maxPosition = 0;

   const position = rawPosition.split(',').map(n => {
      if (Number(n) > maxPosition){ maxPosition = Number(n); }
      return Number(n);
   });

   for (let i = 0; i < maxPosition; i++){
      const usedFuel = getFuelUsageForIndex(i, position);
      if ( usedFuel < lowestFuel){ lowestFuel = usedFuel; }
   }

   return lowestFuel;
}

function getFuelUsageForIndex(index: number, position: number[]): number{
   return position.reduce((acc, crab) => {
      acc += Math.abs( crab - index );
      return acc;
   }, 0);
}

const result = getLowestFuelUsageForPosition(fullInput);

console.log(`Result: ${result}`);
