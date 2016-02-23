import {listToHex} from "./bits";

export class Register {
    private _name:string;
    private _value:number = 0;

    constructor(name:string) {
        this._name = name;
    }

    public increment():number {
        return this.incrementBy(1);
    }

    public incrementBy(by:number):number {
        this._value += by;
        this.ensureOverflow();

        return this._value;
    }

    public static get maxValue() {
        return Math.pow(2, 32) - 1;
    }

    public getBytes():number[] {
        const result = [];
        let tempValue = this._value;

        for (let i = 0; i < 4; i++) {
            result.push(tempValue & 0x000000FF);
            tempValue >>= 8;
        }

        return result.reverse();
    }

    public getBytesHex():string[] {
        return listToHex(this.getBytes(), 2);
    }


    public get value():number {
        return this._value;
    }

    public set value(value:number) {
        this._value = value;
        this.ensureOverflow();
    }

    private ensureOverflow() {
        this._value = Math.abs(this._value) % (Register.maxValue + 1);
    }
}
