import {CPU} from "./cpu";
import {RAM} from "./ram";

export class Computer {
    private _cpu:CPU;
    private _ram:RAM;

    constructor() {
        this._ram = new RAM();
        this._cpu = new CPU(this._ram);
    }

    public run() {
        this._cpu.run();
    }

    public get cpu():CPU {
        return this._cpu;
    }

    get ram():RAM {
        return this._ram;
    }
}
