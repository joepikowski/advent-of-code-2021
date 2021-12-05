const input = require('./input');

class Submarine {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    
    getDepth(){
        return -this.y;
    }

    getHorizontalPosition(){
        return this.x;
    }

    forward(distance){
        this.x += distance;
    }

    down(distance){
        this.y -= distance;
    }

    up(distance){
        this.y += distance;
    }
};

function getPositionSignatureFromInstructions(instructions){
    const sub = new Submarine();

    instructions.map(raw => {
        const [direction, distance] = raw.split(' ');
        sub[direction](parseInt(distance));
    });

    return sub.getDepth() * sub.getHorizontalPosition();
}

const result = getPositionSignatureFromInstructions(input.full);

console.log(`Result: ${result}`);
