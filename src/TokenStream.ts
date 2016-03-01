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

    public splitBySeparator():TokenStream[] {
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

        return result.map(bucket => new TokenStream(bucket));
    }

    public skipBeginAndEndTokens():TokenStream {
        return new TokenStream(this._tokens.filter(item => {
            return item.type !== TokenType.Begin && item.type !== TokenType.End;
        }));
    }

    get tokens():Token[] {
        return this._tokens;
    }
}