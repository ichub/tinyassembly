import {InstructionSet} from "./InstructionSet";
import {TokenStream} from "./TokenStream";
import {Token} from "./Token";
import {TokenType} from "./TokenType";
import {Label} from "./Label";

export class Parser {
    private _instructionSet:InstructionSet;

    constructor(instructionSet:InstructionSet) {
        this._instructionSet = instructionSet;
    }

    public parse(program:string):TokenStream {
        const lines = program.split(/\n/).filter(str => str.length > 0);

        const instructions = [];

        for (let i = 0; i < lines.length; i++) {
            instructions.push(this.parseLine(lines[i]));
        }

        let tokens = [new Token(TokenType.Begin)];

        for (let i = 0; i < instructions.length; i++) {
            tokens = [...tokens, ...instructions[i], new Token(TokenType.StatementEnding)];
        }

        tokens.push(new Token(TokenType.End));

        return new TokenStream(tokens);
    }

    private parseInstructionLine(line:string):Token[] {
        const words = line.split(/\s+/).filter(str => str.length > 0);

        if (words.length > 0) {
            const instructionName = words[0];

            words.shift();

            const tokens = words.map(token => this.paramStringToToken(token));

            return [new Token(TokenType.InstructionName, instructionName), ...tokens];
        }

        return [];
    }

    private parseLabelLine(line:string):Token[] {
        const labelPattern = /^\s*([a-zA-Z]+):\s*$/;

        const result = line.match(labelPattern);

        return [new Token(TokenType.Label, result[1])];
    }

    private parseLine(line:string):Token[] {
        const labelPattern = /^\s*([a-zA-Z]+):\s*$/;

        if (labelPattern.test(line)) {
            return this.parseLabelLine(line);
        }

        return this.parseInstructionLine(line);
    }

    private paramStringToToken(paramString:string):Token {
        const registerPattern = /^%[a-zA-Z]$/;
        const numberLiteralPattern = /^\d+$/;

        let type;

        if (registerPattern.test(paramString)) {
            type = TokenType.RegisterReference;
        } else if (numberLiteralPattern.test(paramString)) {
            type = TokenType.NumberLiteral;
        } else {
            type = TokenType.Unknown;
        }

        return new Token(type, paramString);
    }
}
