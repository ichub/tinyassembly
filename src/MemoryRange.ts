export class MemoryRange {
    private _low:number;
    private _high:number;

    constructor(low:number, length:number) {
        this._low = low;
        this._high = low + length;
    }

    get low():number {
        return this._low;
    }

    get high():number {
        return this._high;
    }
}
