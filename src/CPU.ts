import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {InstructionSet} from "./InstructionSet";
import {Flags} from "./Flags";
import {Params} from "./Params";

export class CPU {
    private _registers:Registers;
    private _flags:Flags;
    private _ram:RAM;
    private _stepInterval = 100;
    private _instructionSet:InstructionSet;

    public onStep:Function;

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
        if (this.onStep) {
            this.onStep();
        }
    }

    public runSynchronouslyUntilHalted():void {
        while (!this._flags.halt) {
            this.step();
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

        const instruction = this._instructionSet.findInstructionByOpcode(opcode);

        instruction.operation(this);
    }

    public reset():void {
        this._registers.zeroOut();
        this._flags.zeroOut();
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
        return new Params(this);
    }

    get instructionSet():InstructionSet {
        return this._instructionSet;
    }
}
