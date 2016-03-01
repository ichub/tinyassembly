import {InstructionSet} from "./InstructionSet";
import {Param} from "./Param";
import {ParamType} from "./ParamType";
import {Registers} from "./Registers";
import {TokenStream} from "./TokenStream";
import {TokenType} from "./TokenType";
import {Parser} from "./Parser";

export class Assembler {
    private _instructionSet:InstructionSet;

    constructor(instructionSet:InstructionSet) {
        this._instructionSet = instructionSet;
    }

    public assembleString(program:string) {
        const stream = new Parser(this._instructionSet).parse(program);

        return this.assemble(stream);
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

    private numberLiteralToValue(literal:string):number {
        return parseInt(literal, 10);
    }

    private registerLiteralToValue(literal:string):number {
        return Registers.registers.indexOf(literal.substr(1));
    }

    private assembleSingleInstruction(tokenStream:TokenStream):number[] {
        const tokens = tokenStream.tokens;

        const nameToken = tokens[0];

        if (nameToken.type !== TokenType.InstructionName) {
            throw "expected name, found something else";
        }

        const params:Param[] = [];

        for (let i = 1; i < tokens.length; i++) {
            let value;

            switch (tokens[i].type) {
                case TokenType.NumberLiteral:
                    value = this.numberLiteralToValue(tokens[i].value);
                    break;
                case TokenType.RegisterReference:
                    value = this.registerLiteralToValue(tokens[i].value);
                    break;
                default:
                    throw `unexpected token at this time - value: "${tokens[i].value}" with type ${TokenType[tokens[i].value]}`;
                    break;
            }

            const parameterType = this.tokenTypeToParameterType(tokens[i].type);
            const newParam = new Param(value, parameterType);

            params.push(newParam);
        }

        const paramValues = params.map(param => param.value);
        const paramTypes = params.map(param => param.type);

        while (paramValues.length < this._instructionSet.instructionLength - 1) {
            paramValues.push(0);
        }

        const instruction = this._instructionSet.findInstructionByNameAndParams(nameToken.value, paramTypes);


        return [instruction.opcode, ...paramValues];
    }
}