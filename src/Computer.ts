import {CPU} from "./cpu";
import {RAM} from "./ram";
import {Assembler} from "./Assembler";

export class Computer {
    private _cpu:CPU;
    private _ram:RAM;
    private _assembler:Assembler;

    constructor() {
        this._ram = new RAM();
        this._cpu = new CPU(this._ram);
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

    public get assembler():Assembler {
        return this._assembler;
    }
}
