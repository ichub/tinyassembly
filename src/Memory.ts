import {Register} from "./Register";
import {clamp} from "./Bits";

export class Memory {
    private _memory:number[];

    constructor(length:number) {
        this._memory = Array.from(new Array(length), () => 0);
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

    public setMemory(offset:number, values:number[]):number {
        for (let i = 0; i < values.length; i++) {
            this._memory[i + offset] = clamp(values[i], Memory.maxMemoryCellValue);
        }

        return offset + values.length;
    }

    public copy(source:number, length:number, destination:number, memory?:Memory) {
        memory = memory || this;

        for (let i = 0; i < length; i++) {
            memory._memory[(destination + i) % memory.size] = this._memory[(source + i) % this.size];
        }
    }

    public zeroOut() {
        for (let i = 0; i < this._memory.length; i++) {
            this._memory[i] = 0;
        }
    }

    public get size() {
        return this._memory.length;
    }

    public get raw() {
        return this._memory;
    }
}
