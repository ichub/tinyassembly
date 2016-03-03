import {Register} from "./register";
import {clamp} from "./bits";
import {MemoryRange} from "./MemoryRange";

export class RAM {
    private _memory:number[];
    private _programRange:MemoryRange;
    private _stackRange:MemoryRange;

    constructor() {
        this._memory = Array.from(new Array(RAM.size), () => 0);
        this._programRange = new MemoryRange(0, RAM.programSize);
        this._stackRange = new MemoryRange(this._programRange.high + 1, RAM.stackSize);
    }

    public static get size() {
        return Math.pow(2, 11);
    }

    public static get stackSize() {
        return Math.pow(2, 10);
    }

    public static get programSize() {
        return Math.pow(2, 10);
    }

    public static get maxMemoryCellValue() {
        return Register.maxValue;
    }

    public getCellValue(index:number) {
        return this._memory[index];
    }

    public setCellValue(index:number, value:number) {
        this._memory[index] = clamp(value, RAM.maxMemoryCellValue);
    }

    public getMemorySlice(index:number, count:number) {
        return this._memory.slice(index, index + count);
    }

    public setMemory(offset:number, values:number[]) {
        for (let i = 0; i < values.length; i++) {
            this._memory[i + offset] = clamp(values[i], RAM.maxMemoryCellValue);
        }
    }

    public zeroOut() {
        for (let i = 0; i < this._memory.length; i++) {
            this._memory[0] = 0;
        }
    }

    public get size() {
        return this._memory.length;
    }
}
