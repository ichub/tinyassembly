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




}