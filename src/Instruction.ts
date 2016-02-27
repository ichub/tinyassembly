import {IInstructionOperation} from "./IInstructionOperation";

export class Instruction {
    private _name:string;
    private _opcode:number;
    private _operation:IInstructionOperation;


    constructor(name:string, opcode:number, operation:IInstructionOperation) {
        this._name = name;
        this._opcode = opcode;
        this._operation = operation;
    }

    public get opcode():number {
        return this._opcode;
    }

    public get operation():IInstructionOperation {
        return this._operation;
    }

    get name():string {
        return this._name;
    }
}