import {Register} from "./register";
import {clamp} from "./bits";
import {MemoryRange} from "./MemoryRange";

export class Memory {
    private static _programRange = new MemoryRange(0, Memory.programSize - 1);
    private static _stackRange = new MemoryRange(Memory._programRange.high + 1, Memory.stackSize);
    private _memory:number[];

    constructor() {
        this._memory = Array.from(new Array(Memory.size), () => 0);
    }

    public static get size() {
        return Memory.stackSize + Memory.programSize;
    }

    public static get stackSize() {
        return Math.pow(2, 10);
    }

    public static get programSize() {
        return Math.pow(2, 10);
    }

    public static get dataSize() {
        return Math.pow(2, 10);
    }

    public static get imageSize() {
        return 64 * 64;
    }

    public static get maxMemoryCellValue() {
        return Register.maxValue;
    }

    public getCellValue(index:number) {
        return this._memory[index];
    }

    public setCellValue(index:number, value:number) {
        this._memory[index] = clamp(value, Memory.maxMemoryCellValue);
    }

    public getMemorySlice(index:number, count:number) {
        return this._memory.slice(index, index + count);
    }

    public setMemory(offset:number, values:number[]) {
        for (let i = 0; i < values.length; i++) {
            this._memory[i + offset] = clamp(values[i], Memory.maxMemoryCellValue);
        }
    }

    public copy(source:number, length:number, destination:number, memory?:Memory) {
        memory = memory || this;

        for (let i = 0; i < length; i++) {
            memory._memory[destination + i] = this._memory[source + i];
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

    static get stackRange():MemoryRange {
        return this._stackRange;
    }
}
