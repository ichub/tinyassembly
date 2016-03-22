import {Instruction} from "./instruction";
import {ParamType} from "./ParamType";
import {CPU} from "./CPU";
import {InstructionSet} from "./InstructionSet";

function wrapInstructionWithParams(target:InstructionSet, params:ParamType[], instruction:Function):Function {
    return function (cpu:CPU) {
        let args = [];

        for (let i = 0; i < params.length; i++) {
            const rawValue = cpu.ram.getCellValue(cpu.registers.IP.value + i + 1);

            switch (params[i]) {
                case ParamType.Value:
                    args.push(rawValue);
                    break;
                case ParamType.Register:
                    args.push(cpu.registers.map[rawValue]);
                    break;
                case ParamType.None:
                    break;
                default:
                    break;
            }
        }

        args = [cpu, ...args];

        instruction.apply(target, args);
    };
}

export function instruction(name:string, opcode:number, ...params:ParamType[]) {
    while (params.length < 3) {
        params.push(ParamType.None);
    }

    return function (target, key:string, descriptor:PropertyDescriptor):PropertyDescriptor {
        const newInstruction = new Instruction(
            name,
            opcode,
            wrapInstructionWithParams(target, params, target[key]),
            params);

        target._instructions = target._instructions || [];
        target._instructions.push(newInstruction);
        target._opcodeToInstructionMap = target._opcodeToInstructionMap || [];
        target._opcodeToInstructionMap[newInstruction.opcode] = newInstruction;

        return descriptor;
    };
}
