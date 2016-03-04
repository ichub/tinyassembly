export class MemoryRange {
    private _low:number;
    private _high:number;

    constructor(low:number, high:number) {
        this._low = low;
        this._high = high;
    }

    get low():number {
        return this._low;
    }

    get high():number {
        return this._high;
    }
}