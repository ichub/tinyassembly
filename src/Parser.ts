import {InstructionSet} from "./InstructionSet";
import {TokenStream} from "./TokenStream";
import {Param} from "./Param";
import {Registers} from "./Registers";
import {ParamType} from "./ParamType";
import {Token} from "./Token";
import {TokenType} from "./TokenType";

export class Parser {
    private _instructionSet:InstructionSet;

    constructor(instructionSet:InstructionSet) {
        this._instructionSet = instructionSet;
    }

    public parse(program:string):TokenStream {
        const lines = program.split(/\n/);

        const instructions = lines.map(this.parseSingleInstruction);
        let tokens = [];

        for (let i = 0; i < instructions.length; i++) {
            tokens = [...tokens, ...instructions, new Token(TokenType.InstructionSeparator, "\n")]
        }

        return new TokenStream(tokens);
    }

    public parseSingleInstruction(line:string):Token[] {
        const words = line.split(/\s+/);

        const instructionName = words[0];

        words.shift();

        const tokens = words.map(this.paramStringToToken);

        return [new Token(TokenType.InstructionName, instructionName), ...tokens];
    }

    public paramStringToToken(paramString:string):Token {
        const registerPattern = /%[a-zA-Z]/;
        let type;
        let value;

        if (registerPattern.test(paramString)) {
            value = Registers.registers.indexOf(paramString.substr(1).toUpperCase());
            type = TokenType.RegisterReference;
        } else {
            value = parseInt(paramString, 10);
            type = TokenType.NumberLiteral;
        }

        return Token(type, value);
    }
}