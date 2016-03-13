import {Memory} from "./Memory";
import {MemoryRange} from "./MemoryRange";
import {TextInitializer} from "./TextInitializer";

export class RAM extends Memory {
    private static _staticRange = new MemoryRange(0, RAM.staticSize);
    private static _programRange = new MemoryRange(RAM._staticRange.high, RAM.programSize - 1);
    private static _stackRange = new MemoryRange(RAM._programRange.high + 1, RAM.stackSize);

    constructor() {
        super(RAM.size);

        new TextInitializer().initText(this);
    }

    public zeroOut() {
        super.zeroOut();
        new TextInitializer().initText(this);
    }

    public static get staticSize() {
        return Math.pow(2, 12);
    }

    public static get size() {
        return RAM.stackSize + RAM.programSize + RAM.staticSize;
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

    static get programRange():MemoryRange {
        return this._programRange;
    }

    static get staticRange():MemoryRange {
        return this._staticRange;
    }
}