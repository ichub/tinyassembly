import {Instruction} from "./instruction";
import {ParamType} from "./ParamType";

export function instruction(name:string, opcode:number, ...params:ParamType[]) {
    while (params.length < 3) {
        params.push(ParamType.None);
    }

    return function (target, key, descriptor) {
        target._instructions = target._instructions || [];
        target._instructions.push(new Instruction(name, opcode, target[key], params));
        return descriptor;
    }
}