import {InstructionSet} from "./InstructionSet";
import {Param} from "./Param";
import {ParamType} from "./ParamType";
import {Registers} from "./Registers";

export class Assembler {
    private _instructionSet:InstructionSet;

    constructor(instructionSet:InstructionSet) {
        this._instructionSet = instructionSet;
    }

    public assemble(program:string):number[] {
        return [];
    }

    public assembleSingleInstruction(line:string):number[] {
        const words = line.split(/\s+/);

        const instructionName = words[0];

        words.shift();

        const params = words.map(this.paramStringToParam);

        const paramTypes = params.map((param) => {
            return param.type;
        });

        const paramValues = params.map((param) => {
            return param.value;
        });

        while (paramValues.length < this._instructionSet.instructionLength - 1) {
            paramValues.push(0);
        }

        const instruction =
            this._instructionSet.findInstructionByNameAndParams(
                instructionName,
                paramTypes);

        return [instruction.opcode, ...paramValues];
    }

    public paramStringToParam(paramString:string):Param {
        const registerPattern = /%[a-zA-Z]/;
        let type;
        let value;

        if (registerPattern.test(paramString)) {
            value = Registers.registers.indexOf(paramString.substr(1).toUpperCase());
            type = ParamType.Register;
        } else {
            value = parseInt(paramString, 10);
            type = ParamType.Value;
        }

        return new Param(value, type);
    }
}