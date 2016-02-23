import {Register} from "./register";
import {Registers} from "./registers";
import {RAM} from "./ram";

export class CPU {
    private _registers:Registers;
    private _ram:RAM;

    constructor(ram:RAM) {
        this._ram = ram;
    }

    public step() {
        const currentInstruction = this._registers.IP.value;
    }

    private executeInstruction(instruction:number) {

    }

    get registers():Registers {
        return this._registers;
    }
}

console.log("it works!");