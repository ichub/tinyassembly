import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {InstructionSet} from "./InstructionSet";
import {Flags} from "./Flags";
import {Graphics} from "./Graphics";

export class CPU {
    private _registers:Registers;
    private _flags:Flags;
    private _ram:RAM;
    private _graphics:Graphics;
    private _stepInterval = 0;
    private _instructionSet:InstructionSet;
    private _timeoutHandle:number;

    public onStep:Function;

    constructor(ram:RAM, graphics:Graphics) {
        this._registers = new Registers();
        this._ram = ram;
        this._graphics = graphics;
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
            if (this._flags.draw) {
                this.onStep();
                this._flags.draw = false;
            }
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

        this._timeoutHandle = setTimeout(() => {
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
        this.stop();
    }

    public stop():void {
        clearTimeout(this._timeoutHandle);
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

    get instructionSet():InstructionSet {
        return this._instructionSet;
    }

    get graphics():Graphics {
        return this._graphics;
    }
}
