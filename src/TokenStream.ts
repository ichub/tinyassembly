import {Token} from "./Token";
import {TokenType} from "./TokenType";

export class TokenStream {
    private _tokens:Token[];

    constructor(tokens:Token[] = []) {
        this._tokens = tokens;
    }

    public appendToken(token:Token):void {
        this._tokens.push(token);
    }

    public splitBySeparator():Token[][] {
        const result = [];
        let bucket = [];

        for (let i = 0; i < this._tokens.length; i++) {
            if (this._tokens[i].type === TokenType.InstructionSeparator) {
                result.push(bucket);
                bucket = [];
            } else {
                bucket.push(this._tokens[i]);
            }
        }

        return result;
    }
}