import {Instruction} from "./instruction";

export function instruction(name:string, opcode:number) {
    return function (target, key, descriptor) {
        target._instructions = target._instructions || [];
        target._instructions.push(new Instruction(name, opcode, target[key]));
        return descriptor;
    }
}