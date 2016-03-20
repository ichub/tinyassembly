import {InstructionSet} from "./InstructionSet";
import {Param} from "./Param";
import {ParamType} from "./ParamType";
import {Registers} from "./Registers";
import {TokenStream} from "./TokenStream";
import {TokenType} from "./TokenType";
import {Parser} from "./Parser";
import {AssemblerContext} from "./AssemblerContext";
import {RAM} from "./RAM";
import {Graphics} from "./Graphics";
import {TextInitializer} from "./TextInitializer";

export class Assembler {
    private _instructionSet:InstructionSet;
    private _constants:{[name:string]:number};

    constructor(instructionSet:InstructionSet) {
        this._instructionSet = instructionSet;

        this._constants = {
            "m_static_low": RAM.staticRange.low,
            "m_static_high": RAM.staticRange.high,
            "m_program_low": RAM.programRange.low,
            "m_program_high": RAM.programRange.high,
            "m_stack_low": RAM.stackRange.low,
            "m_stack_high": RAM.stackRange.high,
            "m_size": RAM.size,
            "g_width": Graphics.width,
            "g_height": Graphics.height,
            "g_size": Graphics.memorySize,
            "g_char_width": TextInitializer.charWidth,
            "g_char_height": TextInitializer.charHeight,
            "g_char_size": TextInitializer.charSize,
        };
    }

    public assembleString(program:string) {
        const stream = new Parser(this._instructionSet).parse(program);

        return this.assemble(stream);
    }

    public assemble(tokenStream:TokenStream):number[] {
        const context:AssemblerContext = new AssemblerContext();
        const instructions = this.initAndFilterLabels(tokenStream, context);


        let result = [];

        for (let i = 0; i < instructions.length; i++) {
            let assembledInstruction = this.assembleSingleInstruction(instructions[i], context);

            result = result.concat(assembledInstruction);
        }

        return result;
    }

    private initAndFilterLabels(tokenStream:TokenStream, context:AssemblerContext):TokenStream[] {
        const instructions = tokenStream.skipBeginAndEndTokens().splitBySeparator();
        const filteredStatements = [];

        for (let i = 0; i < instructions.length; i++) {
            if (!this.addLabelIfLabelStatement(instructions[i], context)) {
                filteredStatements.push(instructions[i]);
            }
        }

        return filteredStatements;
    }

    private addLabelIfLabelStatement(tokenStream:TokenStream, context:AssemblerContext):boolean {
        if (tokenStream.tokens[0].type === TokenType.Label) {
            context.labels[tokenStream.tokens[0].value] = context.instructionCount;
            return true;
        } else {
            context.instructionCount++;
            return false;
        }
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

    private constantToValue(constant:string):number {
        const constantName = constant.substr(1);

        if (this._constants.hasOwnProperty(constantName)) {
            return this._constants[constantName];
        } else {
            throw `no constant with name ${constantName} exists`;
        }
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
                case TokenType.Constant:
                    value = this.constantToValue(tokens[i].value);
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
        return RAM.programRange.low + context.labels[value.substr(1)] * this._instructionSet.instructionLength;
    }
}
