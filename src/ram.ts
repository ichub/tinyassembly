import {Register} from "./register";
export class RAM {
    private _memory:number[] = Array.from(new Array(RAM.size), () => 0);

    public static get size() {
        return Math.pow(2, 10);
    }

    public static get memoryCellSize() {
        return Register.maxValue;
    }

    public getCellValue(index:number) {
        return this._memory[index];
    }

    public setCellValue(index:number, value:number) {
        this._memory[index] = value;
    }
}
