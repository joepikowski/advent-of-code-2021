

import { simpleInput, fullInput } from './input/index.js';

class Submarine {

    constructor(private x = 0, private y = 0, private aim = 0){}
    
    get depth(): number{
        return -this.y;
    }

    get horizontalPosition(): number{
        return this.x;
    }

    public forward(distance): void{
        this.x += distance;
        this.y -= (this.aim * distance);
    }

    public down(value): void{
        this.aim += value;
    }

    public up(value): void{
        this.aim -= value;
    }
};

function getPositionSignatureFromInstructions(instructions: string[]): number{
    const sub = new Submarine();

    instructions.map(raw => {
        const [direction, distance] = raw.split(' ');
        sub[direction](Number(distance));
    });

    return sub.depth * sub.horizontalPosition;
}

const result = getPositionSignatureFromInstructions(fullInput);

console.log(`Result: ${result}`);
