import {ParamType} from "./ParamType";
import {CPU} from "./CPU";
import {Register} from "./Register";

export class Instruction {
    private _name:string;
    private _opcode:number;
    private _operation:Function;
    private _paramList:ParamType[];

    constructor(name:string, opcode:number, operation:Function, paramList:ParamType[]) {
        this._name = name;
        this._opcode = opcode;
        this._operation = operation;
        this._paramList = Object.freeze(paramList);
    }

    private verifySingleParam(type:ParamType, value:number):boolean {
        if (typeof value !== "number" || isNaN(value)) {
            return false;
        }

        switch (type) {
            case ParamType.Value:
                return true;
            case ParamType.Register:
                return value <= Register.maxValue && value >= 0;
            case ParamType.None:
                return value === 0;
            default:
                return false;
        }
    }

    private verifyParams(cpu:CPU):boolean {
        for (let i = 0; i < this._paramList.length; i++) {
            if (!this.verifySingleParam(this._paramList[i], cpu.ram.getCellValue(cpu.registers.IP.value + i + 1))) {
                return false;
            }
        }

        return true;
    }

    public get opcode():number {
        return this._opcode;
    }

    public get operation():Function {
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
