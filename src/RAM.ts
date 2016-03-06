import {Memory} from "./Memory";
import {MemoryRange} from "./MemoryRange";

export class RAM extends Memory {
    private static _programRange = new MemoryRange(0, RAM.programSize - 1);
    private static _stackRange = new MemoryRange(RAM._programRange.high + 1, RAM.stackSize);

    constructor() {
        super(RAM.size);
    }

    public static get size() {
        return RAM.stackSize + RAM.programSize;
    }

    public static get stackSize() {
        return Math.pow(2, 10);
    }

    public static get programSize() {
        return Math.pow(2, 10);
    }

    static get stackRange():MemoryRange {
        return this._stackRange;
    }
}