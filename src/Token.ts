import {TokenType} from "./TokenType";

export class Token {
    private _type:TokenType;
    private _value:string;

    constructor(type:TokenType, value:string = "") {
        this._type = type;
        this._value = value;
    }

    get type():TokenType {
        return this._type;
    }

    get value():string {
        return this._value;
    }
}