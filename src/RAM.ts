import {Memory} from "./Memory";
import {MemoryRange} from "./MemoryRange";
import {TextInitializer} from "./TextInitializer";
import {MemoryRegion} from "./MemoryRegion";

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

    public static getRangeName(offset:number):MemoryRegion {
        if (offset >= RAM._staticRange.low && offset < RAM._staticRange.high) {
            return MemoryRegion.Static
        } else if (offset >= RAM._programRange.low && offset < RAM._programRange.high) {
            return MemoryRegion.Program
        } else if (offset >= RAM._stackRange.low && offset < RAM._stackRange.high) {
            return MemoryRegion.Stack
        }

        throw "no region found for offset " + offset;
    }
}