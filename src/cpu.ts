import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {InstructionSet} from "./InstructionSet";
import {Instruction} from "./instruction";

export class CPU {
    private _registers:Registers;
    private _ram:RAM;
    private _stepInterval = 100;
    private _instructionSet:InstructionSet;

    constructor(ram:RAM) {
        this._registers = new Registers();
        this._ram = ram;
        this._instructionSet = new InstructionSet();
    }

    public step() {
        const currentInstructionIndex = this._registers.IP.value;

        this._registers.IP.incrementBy(4);

        this.executeInstruction(this._ram.getCellValue(currentInstructionIndex));
    }

    public run() {
        setInterval(() => {
            this.step();
        }, this._stepInterval);
    }

    private executeInstruction(opcode:number) {
        Logger.log(`executing instruction ${opcode}`);

        const instruction = this._instructionSet.findInstruction(opcode);

        instruction.operation(this._registers, this._ram);
    }

    get registers():Registers {
        return this._registers;
    }
}

console.log("it works!");
