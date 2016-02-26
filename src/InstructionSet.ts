import {Instruction} from "./instruction";
import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {Flags} from "./Flags";
import {Register} from "./register";
import {instruction} from "./InstructionDecorator";

export class InstructionSet {
    private _instructions:Instruction[];

    @instruction("HALT", 0)
    public haltInstruction(reg:Registers, flags:Flags, ram:RAM) {
        flags.halt = true
    }

    @instruction("R_LOAD", 1)
    public registerLoadInstruction(reg:Registers, flags:Flags, ram:RAM) {
        const params = ram.getMemorySlice(reg.IP.value + 1, 3);

        const first = params[0];
        const second = params[1];

        const firstRegister = reg.registerMap[first];
        const secondRegister = reg.registerMap[second];

        secondRegister.value = firstRegister.value;
    }

    @instruction("V_LOAD", 2)
    public loadValueInstruction(reg:Registers, flags:Flags, ram:RAM) {
        const params = ram.getMemorySlice(reg.IP.value + 1, 3);

        const value = params[0];
        const register = reg.registerMap[params[1]];

        register.value = value;
    }

    @instruction("R_ADD", 3)
    public registerAddInstruction(reg:Registers, flags:Flags, ram:RAM) {
        const params = ram.getMemorySlice(reg.IP.value + 1, 3);

        const left = reg.registerMap[params[0]];
        const right = reg.registerMap[params[1]];
        const result = reg.registerMap[params[2]];

        result.value = left.value + right.value;
    }

    @instruction("V_ADD", 4)
    public valueAddInstruction(reg:Registers, flags:Flags, ram:RAM) {
        const params = ram.getMemorySlice(reg.IP.value + 1, 3);

        const value = params[0];
        const register = reg.registerMap[params[1]];

        register.incrementBy(value);
    }

    public findInstruction(opcode:number):Instruction {
        for (let i = 0; i < this._instructions.length; i++) {
            if (this._instructions[i].opcode == opcode) {
                return this._instructions[i];
            }
        }

        throw "could not find matching instruction";
    }
}