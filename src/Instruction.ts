import {IInstructionOperation} from "./IInstructionOperation";
import {ParamType} from "./ParamType";
import {CPU} from "./CPU";
import {Register} from "./Register";

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

    private verifySingleParam(type:ParamType, value:number):boolean {
        switch (type) {
            case ParamType.Value:
                return true;
            case ParamType.Register:
                return value <= Register.maxValue;
            case ParamType.None:
                return value === 0;
            default:
                return false;
        }
    }

    private verifyParams(cpu:CPU):boolean {
        for (let i = 0; i < this._paramList.length; i++) {
            if (!this.verifySingleParam(this._paramList[i], cpu.params.raw[i])) {
                return false;
            }
        }

        return true;
    }

    public get opcode():number {
        return this._opcode;
    }

    public get operation():IInstructionOperation {
        return (cpu:CPU) => {
            if (!this.verifyParams(cpu)) {
                throw "params were not correct";
            }

            this._operation(cpu);
        };
    }

    get name():string {
        return this._name;
    }

    get paramList():ParamType[] {
        return this._paramList;
    }
}