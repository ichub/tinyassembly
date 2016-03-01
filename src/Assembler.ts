import {InstructionSet} from "./InstructionSet";
import {Param} from "./Param";
import {ParamType} from "./ParamType";
import {Registers} from "./Registers";
import {TokenStream} from "./TokenStream";
import {TokenType} from "./TokenType";

export class Assembler {
    private _instructionSet:InstructionSet;

    constructor(instructionSet:InstructionSet) {
        this._instructionSet = instructionSet;
    }

    public assemble(tokenStream:TokenStream):number[] {
        const instructions = tokenStream.skipBeginAndEndTokens().splitBySeparator();

        let result = [];

        for (let i = 0; i < instructions.length; i++) {
            result = result.concat(this.assembleSingleInstruction(instructions[i]));
        }

        return result;
    }

    private tokenTypeToParameterType(tokenType:TokenType):ParamType {
        if (tokenType === TokenType.RegisterReference) {
            return ParamType.Register;
        } else if (tokenType === TokenType.NumberLiteral) {
            return ParamType.Value;
        } else {
            throw "no corresponding parameter type";
        }
    }

    private assembleSingleInstruction(tokenStream:TokenStream):number[] {
        const name = tokenStream.tokens[0].value;


        return [];
    }
}