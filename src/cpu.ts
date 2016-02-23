import {Register} from "./register";
import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";

export class CPU {
    private _registers:Registers;
    private _ram:RAM;
    private _stepInterval = 100;

    constructor(ram:RAM) {
        this._registers = new Registers();
        this._ram = ram;
    }

    public step() {
        const currentInstructionIndex = this._registers.IP.value;

        this._registers.IP.incrementAndReturn();

        this.executeInstruction(this._ram.getCellValue(currentInstructionIndex));
    }

    public run() {
        setInterval(() => {
            this.step();
        }, this._stepInterval);
    }

    private executeInstruction(instruction:number) {
        Logger.log(`executing instruction ${instruction}`)
    }

    get registers():Registers {
        return this._registers;
    }
}

console.log("it works!");