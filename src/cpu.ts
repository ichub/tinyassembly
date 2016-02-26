import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {InstructionSet} from "./InstructionSet";
import {Instruction} from "./instruction";
import {Flags} from "./Flags";
import {Params} from "./Params";

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
        this.executeInstruction(this._ram.getCellValue(this._registers.IP.value));

        if (this._flags.jumped) {
            this._flags.jumped = false;
        } else {
            this._registers.IP.incrementBy(4);
        }
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

        instruction.operation(this);
    }

    public get registers():Registers {
        return this._registers;
    }

    public get flags():Flags {
        return this._flags;
    }

    get ram():RAM {
        return this._ram;
    }

    public get params():Params {
        return new Params(this._ram.getMemorySlice(this._registers.IP.value + 1, 3));
    }
}
