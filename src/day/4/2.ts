import { simpleInput, fullInput } from './input/index.js';

class BingoBoard {
   constructor(
      public value: BingoNode[][],
      public isWinner: boolean = false
   ){}
}

type BingoBoards = BingoBoard[];

type Direction = 'up' | 'down' | 'left' | 'right';

class BingoNode {
   up: BingoNode | undefined;
   down: BingoNode | undefined;
   left: BingoNode | undefined;
   right: BingoNode | undefined;

   constructor(public value: number, public marked: boolean = false){}

   public isOnCompleteLine(): boolean {
      return this.isOnCompleteHorizontal() || this.isOnCompleteVertical();
   }

   private isOnCompleteVertical(): boolean {
      return this.getMarkedCountInDirection('up', this) + this.getMarkedCountInDirection('down', this) === 4;
   }

   private isOnCompleteHorizontal(): boolean {
      return this.getMarkedCountInDirection('left', this) + this.getMarkedCountInDirection('right', this) === 4;
   }

   private getMarkedCountInDirection(direction: Direction, node: BingoNode, sum: number = 0): number{
      if (node[direction] === undefined){
         return sum;
      }
      return this.getMarkedCountInDirection(direction, node[direction], (node[direction].marked ? ++sum : sum));
   }
}

function parseInput(input): [number[], BingoBoards] {

   const rawBoards = input.boards.split('\n\n').map(b => b.split('\n'));

   const boards = rawBoards.map(rawBoard => {
      const board = rawBoard.map(row => {
         row = row.replaceAll('  ',' ').split(' ');
         return row.map(s => new BingoNode(parseInt(s)));
      });
      return new BingoBoard(board);
   });

   boards.forEach(board => {
      board.value.forEach((row, rowIndex) => {
         row.forEach((node, colIndex) => {
            node.up = board.value[rowIndex-1]?.[colIndex];
            node.down = board.value[rowIndex+1]?.[colIndex];
            node.left = board.value[rowIndex]?.[colIndex-1];
            node.right = board.value[rowIndex]?.[colIndex+1];
         });
      });
   });

   return [input.draw, boards];
}

function getWinningBoardScore(draw: number[], boards: BingoBoards): number {
   let winnersFound = 0;
   let mostRecentWinner: BingoBoard | undefined;
   let drawIndex = 0;

   while (winnersFound < boards.length && drawIndex < draw.length){
      for (let board of boards){
         if (!board.isWinner && isWinnerAfterMarking(draw[drawIndex], board)){
            mostRecentWinner = board;
            board.isWinner = true;
            ++winnersFound;
         }
      }
      drawIndex++;
   }

   return winnersFound > 0 ? sumBoard(mostRecentWinner) * draw[--drawIndex] : 0;
}

function isWinnerAfterMarking(toMark: number, board: BingoBoard): boolean {
   let isWinner = false;
   let rowIndex = 0;

   while (!isWinner && rowIndex < board.value.length){
      for (let node of board.value[rowIndex]){
         if (node.value === toMark){
            node.marked = true;
            if (node.isOnCompleteLine()){
               isWinner = true;
               break;
            }
         }
      }
      rowIndex++;
   }
   return isWinner;
}

function sumBoard(board: BingoBoard): number{
   return board.value.flat().reduce(
      (sum, b) => b.marked ? sum : sum + b.value
   , 0);
}

const [draw, boards] = parseInput(fullInput);

const result = getWinningBoardScore(draw, boards);

console.log(`Result: ${result}`);
