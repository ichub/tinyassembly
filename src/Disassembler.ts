import {InstructionSet} from "./InstructionSet";
import {ParamType} from "./ParamType";
import {toHex} from "./Bits";
import {Registers} from "./Registers";

export class Disassembler {
    private instructionSet:InstructionSet;

    constructor(instructionSet:InstructionSet) {
        this.instructionSet = instructionSet;
    }

    private disassembleParam(value: number, type:ParamType):string {
        switch(type) {
            case ParamType.None:
                return "";
            case ParamType.Value:
                return "0x" + toHex(value, 4);
            case ParamType.Register:
                return "%" + Registers.findRegisterNameByNumber(value);
        }
    }

    public disassembleSingleInstruction(numbers:number[]):string {
        const opcode = numbers[0];

        const instruction = this.instructionSet.findInstructionByOpcode(opcode);

        let result = "";

        result += instruction.name;

        for (let i = 0; i < instruction.paramList.length; i++) {
            result += " ";
            result += this.disassembleParam(numbers[i + 1], instruction.paramList[i]);
        }

        return result;
    }
}