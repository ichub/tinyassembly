import {CPU} from "./CPU";
import {RAM} from "./RAM";
import {Assembler} from "./Assembler";
import {Graphics} from "./Graphics";
import {Disassembler} from "./Disassembler";
import {CachedClearEvent} from "./CachedClearEvent";

export class Computer {
    private _cpu:CPU;
    private _ram:RAM;
    private _graphics:Graphics;
    private _assembler:Assembler;
    private _disassembler:Disassembler;

    constructor() {
        this._ram = new RAM();
        this._graphics = new Graphics();
        this._cpu = new CPU(this._ram, this._graphics);
        this._assembler = new Assembler(this._cpu.instructionSet);
        this._disassembler = new Disassembler(this._cpu.instructionSet);
    }

    public run() {
        this._cpu.run();
    }

    public loadProgram(program:string):number[] {
        const assembledProgram = this._assembler.assembleString(program);

        this._cpu.registers.zeroOut();
        this._ram.zeroOut();
        this._ram.setMemory(RAM.programRange.low, assembledProgram);

        return assembledProgram;
    }

    public reset():void {
        this._ram.zeroOut();
        this._cpu.reset();
        this._graphics.zeroOut();
        this._graphics.drawCache.addEvent(new CachedClearEvent());
    }

    public stop():void {
        this._cpu.stop();
    }

    public step():void {
        this._cpu.step();
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

    get disassembler():Disassembler {
        return this._disassembler;
    }
}
