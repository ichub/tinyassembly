import {CPU} from "./cpu";
import {Register} from "./register";

export class Params {
    private _cpu:CPU;
    private _raw:number[];

    constructor(cpu:CPU) {
        this._cpu = cpu;
        this._raw = Object.freeze(cpu.ram.getMemorySlice(cpu.registers.IP.value + 1, 3));
    }

    get first():number {
        return this._raw[0];
    }

    get second():number {
        return this._raw[1];
    }

    get third():number {
        return this._raw[2];
    }

    get r_first():Register {
        return this._cpu.registers.map[this.first];
    }

    get r_second():Register {
        return this._cpu.registers.map[this.second];
    }

    get r_third():Register {
        return this._cpu.registers.map[this.third];
    }

    get raw():number[] {
        return this._raw;
    }
}