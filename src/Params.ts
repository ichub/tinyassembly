import {CPU} from "./cpu";

export class Params {
    private _cpu:CPU;
    private _raw:number[];
    private _first:number;
    private _second:number;
    private _third:number;

    constructor(cpu:CPU) {
        this._cpu = cpu;
        this._raw = Object.freeze(cpu.ram.getMemorySlice(cpu.registers.IP.value + 1, 3));
        this._first = this._raw[0];
        this._second = this._raw[1];
        this._third = this._raw[2];
    }

    get first():number {
        return this._first;
    }

    get second():number {
        return this._second;
    }

    get third():number {
        return this._third;
    }

    get raw():number[] {
        return this._raw;
    }
}