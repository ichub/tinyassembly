import {CPU} from "./cpu";
import {RAM} from "./ram";
import {Assembler} from "./Assembler";
import {Graphics} from "./Graphics";

export class Computer {
    private _cpu:CPU;
    private _ram:RAM;
    private _graphics:Graphics;
    private _assembler:Assembler;

    constructor() {
        this._ram = new RAM();
        this._graphics = new Graphics();
        this._cpu = new CPU(this._ram, this._graphics);
        this._assembler = new Assembler(this._cpu.instructionSet);
    }

    public run() {
        this._cpu.run();
    }

    public loadProgram(program:string):number[] {
        const assembledProgram = this._assembler.assembleString(program);

        this._cpu.registers.zeroOut();
        this._ram.zeroOut();
        this._ram.setMemory(0, assembledProgram);

        return assembledProgram;
    }

    public reset():void {
        this._ram.zeroOut();
        this._cpu.reset();
    }

    public get cpu():CPU {
        return this._cpu;
    }

    public get ram():RAM {
        return this._ram;
    }

    get graphics():Graphics {
        return this._graphics;
    }

    public get assembler():Assembler {
        return this._assembler;
    }
}
