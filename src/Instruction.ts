import {IInstructionOperation} from "./IInstructionOperation";
import {ParamType} from "./ParamType";

export class Instruction {
    private _name:string;
    private _opcode:number;
    private _operation:IInstructionOperation;
    private _paramList:ParamType[];

    constructor(name:string, opcode:number, operation:IInstructionOperation, paramList:ParamType[]) {
        this._name = name;
        this._opcode = opcode;
        this._operation = operation;
        this._paramList = Object.freeze(paramList);
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

    get paramList():ParamType[] {
        return this._paramList;
    }
}