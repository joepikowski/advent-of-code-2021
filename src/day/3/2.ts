import { simpleInput, fullInput } from './input/index.js';

function getOxygenAndC02RateSignature(binaryStrings: string[]): number{

    const oxygen = filterForBitCriteria(binaryStrings, 0, true);

    const co2 = filterForBitCriteria(binaryStrings, 0, false);

    return oxygen * co2;
}

function filterForBitCriteria(binaryStrings: string[], position: number, keepMostCommon: boolean): number{

    const totalRows = binaryStrings.length;

    if (totalRows === 1){ // Base Case, Recursion Done.
        return parseInt(binaryStrings[0], 2); 
    }

    let total = 0;

    const [ones, zeroes] = binaryStrings.reduce(
        ([ones, zeroes], b) => {

            if (b.split('')[position] === '1'){
                total++;
                ones.push(b);
            }else{
                zeroes.push(b);
            }

            return [ones, zeroes];
        }, [[], []]
    );

    const oneMostCommon = total >= (totalRows / 2);

    if (oneMostCommon){
        return filterForBitCriteria( keepMostCommon ? ones : zeroes, ++position, keepMostCommon);
    }else{
        return filterForBitCriteria( keepMostCommon ? zeroes : ones, ++position, keepMostCommon);
    }

}

const result = getOxygenAndC02RateSignature(fullInput);

console.log(`Result: ${result}`);