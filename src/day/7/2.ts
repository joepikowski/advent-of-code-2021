import { simpleInput, fullInput } from './input/index.js';

function getLowestFuelUsageForPosition(rawPosition: string): number{
   let lowestFuel = Number.POSITIVE_INFINITY;

   let maxPosition = 0;

   const position = rawPosition.split(',').map(n => {
      if (Number(n) > maxPosition){ maxPosition = Number(n); }
      return Number(n);
   });

   for (let i = 0; i < maxPosition; i++){
      const usedFuel = getFuelUsageForDestination(i, position);
      if ( usedFuel < lowestFuel){ lowestFuel = usedFuel; }
   }

   return lowestFuel;
}

function getFuelUsageForDestination(destination: number, position: number[]): number{
   return position.reduce((acc, start) => {
      acc += getRecursiveFuelUsage(start, destination);
      return acc;
   }, 0);
}

function getRecursiveFuelUsage(start: number, destination: number, stepsSoFar: number = 0, acc: number = 0){
    if (start === destination){ return acc; }

    acc += 1 + stepsSoFar;

    return getRecursiveFuelUsage(
        (start > destination ? --start : ++start), 
        destination,
        ++stepsSoFar,
        acc
    );
}

const result = getLowestFuelUsageForPosition(fullInput);

console.log(`Result: ${result}`);