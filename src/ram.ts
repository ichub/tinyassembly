export class RAM {
    private _memory:number[] = Array.from(new Array(RAM.size), () => 0);

    public static get size() {
        return Math.pow(2, 10);
    }

    get memory():number[] {
        return this._memory;
    }
}