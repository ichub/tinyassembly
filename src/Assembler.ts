import {InstructionSet} from "./InstructionSet";
import {Param} from "./Param";
import {ParamType} from "./ParamType";
import {Registers} from "./Registers";
import {TokenStream} from "./TokenStream";
import {TokenType} from "./TokenType";
import {Parser} from "./Parser";
import {AssemblerContext} from "./AssemblerContext";

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
        const context:AssemblerContext = new AssemblerContext();

        let result = [];

        for (let i = 0; i < instructions.length; i++) {
            let assembledInstruction = this.assembleSingleStatement(instructions[i], context);

            result = result.concat(assembledInstruction);
        }

        return result;
    }

    private tokenTypeToParameterType(tokenType:TokenType):ParamType {
        if (tokenType === TokenType.RegisterReference) {
            return ParamType.Register;
        } else if (tokenType === TokenType.NumberLiteral || TokenType.RegisterReference) {
            return ParamType.Value;
        } else {
            throw "no corresponding parameter type";
        }
    }

    private numberLiteralToValue(literal:string):number {
        return parseInt(literal, 10);
    }

    private registerLiteralToValue(literal:string):number {
        return Registers.findRegisterNumberByName(literal.substr(1));
    }

    private assembleSingleStatement(tokenStream:TokenStream, context:AssemblerContext) {
        if (tokenStream.tokens[0].type == TokenType.Label) {
            return this.assembleLabel(tokenStream, context);
        } else {
            return this.assembleSingleInstruction(tokenStream, context);
        }
    }

    private assembleLabel(tokenStream:TokenStream, context:AssemblerContext):number[] {
        context.labels[tokenStream.tokens[0].value] = context.instructionCount++;

        return [];
    }

    private assembleSingleInstruction(tokenStream:TokenStream, context:AssemblerContext):number[] {
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
                case TokenType.LabelReference:
                    value = this.labelReferenceToValue(tokens[i].value, context);
                    break;
                default:
                    throw `unexpected token at this time - value: "${tokens[i].value}" with type "${TokenType[tokens[i].type]}"`;
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

        context.instructionCount++;
        return [instruction.opcode, ...paramValues];
    }

    private labelReferenceToValue(value:string, context:AssemblerContext):number {
        return context.labels[value.substr(1)] * this._instructionSet.instructionLength;
    }
}
