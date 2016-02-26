import {Instruction} from "./instruction";
import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {Flags} from "./Flags";
import {Register} from "./register";
import {instruction} from "./InstructionDecorator";
import {Computer} from "./computer";
import {CPU} from "./cpu";

export class InstructionSet {
    private _instructions:Instruction[];

    @instruction("HALT", 0)
    public haltInstruction(cpu:CPU) {
        cpu.flags.halt = true
    }

    @instruction("R_LOAD", 1)
    public registerLoadInstruction(cpu:CPU) {
        const firstRegister = cpu.registers.map[cpu.params.first];
        const secondRegister = cpu.registers.map[cpu.params.second];

        secondRegister.value = firstRegister.value;
    }

    @instruction("V_LOAD", 2)
    public loadValueInstruction(cpu:CPU) {
        const value = cpu.params.first;
        const register = cpu.registers.map[cpu.params.second];

        register.value = value;
    }

    @instruction("R_ADD", 3)
    public registerAddInstruction(cpu:CPU) {
        const left = cpu.registers.map[cpu.params.first];
        const right = cpu.registers.map[cpu.params.second];
        const result = cpu.registers.map[cpu.params.third];

        result.value = left.value + right.value;
    }

    @instruction("V_ADD", 4)
    public valueAddInstruction(cpu:CPU) {
        const value = cpu.params.first;
        const register = cpu.registers.map[cpu.params.second];

        register.incrementBy(value);
    }

    @instruction("R_AND", 5)
    public registerAndInstruction(cpu:CPU) {
        const left = cpu.registers.map[cpu.params.first];
        const right = cpu.registers.map[cpu.params.second];
        const result = cpu.registers.map[cpu.params.third];

        result.value = left.value & right.value;
    }

    @instruction("V_AND", 6)
    public valueAndInstruction(cpu:CPU) {
        const value = cpu.params.first;
        const register = cpu.registers.map[cpu.params.second];

        register.value = register.value & value;
    }

    @instruction("R_OR", 7)
    public registerOrInstruction(cpu:CPU) {
        const left = cpu.registers.map[cpu.params.first];
        const right = cpu.registers.map[cpu.params.second];
        const result = cpu.registers.map[cpu.params.third];

        result.value = left.value | right.value;
    }

    @instruction("V_OR", 8)
    public valueOrInstruction(cpu:CPU) {
        const value = cpu.params.first;
        const register = cpu.registers.map[cpu.params.second];

        register.value = register.value | value;
    }

    @instruction("R_XOR", 9)
    public registerXorInstruction(cpu:CPU) {
        const left = cpu.registers.map[cpu.params.first];
        const right = cpu.registers.map[cpu.params.second];
        const result = cpu.registers.map[cpu.params.third];

        result.value = left.value ^ right.value;
    }

    @instruction("V_XOR", 10)
    public valueXorInstruction(cpu:CPU) {
        const value = cpu.params.first;
        const register = cpu.registers.map[cpu.params.second];

        register.value = register.value ^ value;
    }

    @instruction("V_CMP", 11)
    public valueCompareInstruction(cpu:CPU) {
        const value = cpu.params.first;
        const register = cpu.registers.map[cpu.params.second];

        if (value == register.value) {
            cpu.flags.equal = true;
            cpu.flags.less = false;
            cpu.flags.equal = false;
        } else if (value < register.value) {
            cpu.flags.equal = false;
            cpu.flags.less = true;
            cpu.flags.equal = false;
        } else if (value > register.value) {
            cpu.flags.equal = false;
            cpu.flags.less = false;
            cpu.flags.equal = true;
        }
    }

    @instruction("R_CMP", 12)
    public registerCompareInstruction(cpu:CPU) {
        const left = cpu.registers.map[cpu.params.first];
        const right = cpu.registers.map[cpu.params.second];

        if (left.value == right.value) {
            cpu.flags.equal = true;
            cpu.flags.less = false;
            cpu.flags.equal = false;
        } else if (left.value < right.value) {
            cpu.flags.equal = false;
            cpu.flags.less = true;
            cpu.flags.equal = false;
        } else if (left.value > right.value) {
            cpu.flags.equal = false;
            cpu.flags.less = false;
            cpu.flags.equal = true;
        }
    }

    @instruction("JMP_EQ", 13)
    public jumpInstruction(cpu:CPU) {

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