import {Register} from "./register";
import {clamp} from "./bits";

export class RAM {
    private _memory:number[] = Array.from(new Array(RAM.size), () => 0);

    public static get size() {
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

    public get size() {
        return this._memory.length;
    }
}
