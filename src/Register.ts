import {listToHex} from "./bits";
import {clamp} from "./bits";

export class Register {
    private _name:string;
    private _value:number = 0;

    constructor(name:string) {
        this._name = name;
    }

    public increment():number {
        return this.incrementBy(1);
    }

    public decrement():number {
        return this.incrementBy(-1);
    }

    public incrementBy(by:number):number {
        this._value = clamp(this._value + by, Register.maxValue);

        return this._value;
    }

    public static get maxValue() {
        return Math.pow(2, 16) - 1;
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
        if (typeof value !== "number") {
            throw `attempted to set value of register to ${value}, which
            is not allowed because it is of type ${typeof value}, and not "number"`;
        }

        if (isNaN(value)) {
            throw `register cannot be NaN`;
        }

        this._value = clamp(value, Register.maxValue);
    }

    get name():string {
        return this._name;
    }
}
