import {ParamType} from "./ParamType";

export class Param {
    private _value:number;
    private _type:ParamType;

    constructor(value:number, type:ParamType) {
        this._value = value;
        this._type = type;
    }

    get value():number {
        return this._value;
    }

    get type():ParamType {
        return this._type;
    }
}