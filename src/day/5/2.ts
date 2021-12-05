import { simpleInput, fullInput } from './input/index.js';

type CoordinatePair = number[][];

type Coordinates = number[];

function parseInput(input: string[]): CoordinatePair[] {
   return input.map(rawLine => {
      return rawLine.split(' -> ').map(rawCoordinate => {
         return rawCoordinate.split(',').map(point => Number(point));
      });
   })
}

function getOverlapCountAtThreshold(threshold: number, pairs: CoordinatePair[], gridSize: number = 1000): number {
   const grid = Array.from({length: gridSize}, () => (
      Array.from({length: gridSize}, () => 0)
   ));

   for (let pair of pairs){
        const [startX, startY, endX, endY] = pair.flat();

        let currentY = startY;
        let currentX = startX;

        grid[endY][endX] += 1;

        while (currentY != endY || currentX != endX){
            ++grid[currentY][currentX];

            [currentX, currentY] = getNextLinearPoint(currentX, currentY, endX, endY); // Needs complexity
        }
   }
   return grid.flat().reduce((acc, n) => n >= threshold ? ++acc : acc, 0);
}

function getNextLinearPoint(currentX: number, currentY: number, endX: number, endY: number): Coordinates{
    const newX = currentX > endX ? --currentX :
                  ( currentX < endX ? ++currentX : currentX );

    const newY = currentY > endY ? --currentY :
                  ( currentY < endY ? ++currentY : currentY );

    return [newX, newY];
}

const coordinatePairs = parseInput(fullInput);

const result = getOverlapCountAtThreshold(2, coordinatePairs);

console.log(`Result: ${result}`);
