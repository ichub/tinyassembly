import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {InstructionSet} from "./InstructionSet";
import {Flags} from "./Flags";
import {Graphics} from "./Graphics";
import {EventEmitter} from "events";

export class CPU extends EventEmitter {
    private _registers:Registers;
    private _flags:Flags;
    private _ram:RAM;
    private _graphics:Graphics;
    private _stepInterval = 0;
    private _stepsPerInterval = 10;
    private _instructionSet:InstructionSet;
    private _timeoutHandle:number;

    constructor(ram:RAM, graphics:Graphics) {
        super();

        this._registers = new Registers();
        this._ram = ram;
        this._graphics = graphics;
        this._instructionSet = new InstructionSet();
        this._flags = new Flags();
        this._timeoutHandle = null;
    }

    public step() {
        this.executeInstruction(this._ram.getCellValue(this._registers.IP.value));

        if (this._flags.jumped) {
            this._flags.jumped = false;
        } else if (!this._flags.halt) {
            this._registers.IP.incrementBy(4);
        }

        if (this._flags.draw) {
            this._flags.draw = false;
            this.emit("draw");
        }

        this.emit("step");
    }

    public runSynchronouslyUntilHalted():void {
        while (!this._flags.halt) {
            this.step();
        }
    }

    public runSynchronouslyFor(cycles:number):void {
        for (let i = 0; i < cycles; i++) {
            if (this._flags.halt) {
                break;
            }

            this.step();
        }
    }

    public run() {
        if (this._timeoutHandle === null) {
            this.emit("run");
        }

        this.runSynchronouslyFor(this._stepsPerInterval);

        if (this._flags.halt) {
            Logger.log(`halt instruction encountered`);
            return;
        }

        this._timeoutHandle = setTimeout(() => {
            this.run();
        }, this._stepInterval);
    }

    public reset():void {
        this._registers.zeroOut();
        this._flags.zeroOut();
        this.stop();
    }

    public stop():void {
        clearTimeout(this._timeoutHandle);
        this._timeoutHandle = null;
        this.emit("stop");
    }

    public get registers():Registers {
        return this._registers;
    }

    public get flags():Flags {
        return this._flags;
    }

    public get ram():RAM {
        return this._ram;
    }

    public get instructionSet():InstructionSet {
        return this._instructionSet;
    }

    public get graphics():Graphics {
        return this._graphics;
    }

    public get isRunning():boolean {
        return this._timeoutHandle !== null;
    }

    private executeInstruction(opcode:number) {
        Logger.log(`executing instruction ${opcode}`);

        const instruction = this._instructionSet.findInstructionByOpcode(opcode);

        instruction.operation(this);
    }
}
