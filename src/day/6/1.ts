import { simpleInput, fullInput } from './input/index.js';

class LaternfishPopulation {

   public valuesBySpawnCycle: number[];

   constructor(initialState: string){
      this.valuesBySpawnCycle = new Array(9).fill(0);
      const fishes = initialState.split(',').map(s => Number(s));
      for (let fish of fishes){
         ++this.valuesBySpawnCycle[fish];
      }
   }

   public tick(): void {
      const newState = this.valuesBySpawnCycle.reduce((newState, count, i, currentState) => {
         if (i === 0){
            newState[8] += currentState[0];
            newState[6] += currentState[0];
         }else{
            newState[i-1] += currentState[i];
         }
         return newState;
      }, new Array(9).fill(0));

      this.valuesBySpawnCycle = newState;
   }

   public getPopulationSum(): number {
      return this.valuesBySpawnCycle.reduce((acc, n) => acc + n, 0);
   }

}

function getPopulationSumAfterTicks(n: number, initialState: string): number{

   const population = new LaternfishPopulation(initialState);

   while (n > 0){
      population.tick();
      --n;
   }

   return population.getPopulationSum();
}

const result = getPopulationSumAfterTicks(80, fullInput);

console.log(`Result: ${result}`);
