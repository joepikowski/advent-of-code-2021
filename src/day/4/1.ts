import { full } from '../1/input/index.js';
import { simpleInput, fullInput } from './input/index.js';

type BingoBoard = BingoNode[][];

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

   const boards = rawBoards.map(board => {
      return board.map(row => {
         row = row.replaceAll('  ',' ').split(' ');
         return row.map(s => new BingoNode(parseInt(s)));
      });
   });

   boards.forEach(board => {
      board.forEach((row, rowIndex) => {
         row.forEach((node, colIndex) => {
            node.up = board[rowIndex-1]?.[colIndex];
            node.down = board[rowIndex+1]?.[colIndex];
            node.left = board[rowIndex]?.[colIndex-1];
            node.right = board[rowIndex]?.[colIndex+1];
         });
      });
   });

   return [input.draw, boards];
}

function getWinningBoardScore(draw: number[], boards: BingoBoards): number {
   let winnerFound = false;
   let winningBoard: BingoBoard | undefined;
   let drawIndex = 0;
   
   while (!winnerFound && drawIndex < draw.length){
      for (let board of boards){
         if (isWinnerAfterMarking(draw[drawIndex], board)){
            winningBoard = board;
            winnerFound = true;
            break;
         }
      }
      drawIndex++;
   }

   return winnerFound ? sumBoard(winningBoard) * draw[--drawIndex] : 0;
}

function isWinnerAfterMarking(toMark: number, board: BingoBoard): boolean {
   let isWinner = false;
   let rowIndex = 0;

   while (!isWinner && rowIndex < board.length){
      for (let node of board[rowIndex]){
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
   return board.flat().reduce(
      (sum, b) => b.marked ? sum : sum + b.value
   , 0);
}

const [draw, boards] = parseInput(fullInput);

const result = getWinningBoardScore(draw, boards);

console.log(`Result: ${result}`);
