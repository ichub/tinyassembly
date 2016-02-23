import {IInstructionOperation} from "./IInstructionOperation";

export class Instruction {
    private _opcode:number;
    private _operation:IInstructionOperation;


    constructor(opcode:number, operation:IInstructionOperation) {
        this._opcode = opcode;
        this._operation = operation;
    }

    get opcode():number {
        return this._opcode;
    }

    get operation():IInstructionOperation {
        return this._operation;
    }
}