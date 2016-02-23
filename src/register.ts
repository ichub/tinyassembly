import {RAM} from "./ram";
export class Register {
    private _value:number = 0;

    public incrementAndReturn():number {
        this._value += 1;
        this.ensureOverflow();

        return this._value;
    }

    private ensureOverflow() {
        this._value = Math.abs(this._value) % (Register.maxValue + 1);
    }

    public get value():number {
        return this._value;
    }

    public static get maxValue() {
        return Math.pow(2, 16) - 1;
    }
}