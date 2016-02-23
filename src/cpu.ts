import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {InstructionSet} from "./InstructionSet";
import {Instruction} from "./instruction";
import {Flags} from "./Flags";

export class CPU {
    private _registers:Registers;
    private _flags:Flags;
    private _ram:RAM;
    private _stepInterval = 100;
    private _instructionSet:InstructionSet;

    constructor(ram:RAM) {
        this._registers = new Registers();
        this._ram = ram;
        this._instructionSet = new InstructionSet();
        this._flags = new Flags();
    }

    public step() {
        const currentInstructionIndex = this._registers.IP.value;

        this._registers.IP.incrementBy(4);

        this.executeInstruction(this._ram.getCellValue(currentInstructionIndex));
    }

    public run() {
        this.step();

        if (this._flags.halt) {
            Logger.log(`halt instruction encountered`);
            return;
        }

        setTimeout(() => {
            this.run();
        }, this._stepInterval);
    }

    private executeInstruction(opcode:number) {
        Logger.log(`executing instruction ${opcode}`);

        const instruction = this._instructionSet.findInstruction(opcode);

        instruction.operation(this._registers, this._flags, this._ram);
    }

    get registers():Registers {
        return this._registers;
    }

    get flags():Flags {
        return this._flags;
    }
}

console.log("it works!");
