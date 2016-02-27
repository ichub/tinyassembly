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
        cpu.params.r_first.value = cpu.params.r_second.value;
    }

    @instruction("V_LOAD", 2)
    public loadValueInstruction(cpu:CPU) {
        cpu.params.r_second.value = cpu.params.first;
    }

    @instruction("R_ADD", 3)
    public registerAddInstruction(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value + cpu.params.r_second.value;
    }

    @instruction("V_ADD", 4)
    public valueAddInstruction(cpu:CPU) {
        cpu.params.r_second.incrementBy(cpu.params.first);
    }

    @instruction("R_AND", 5)
    public registerAndInstruction(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value & cpu.params.r_second.value;
    }

    @instruction("V_AND", 6)
    public valueAndInstruction(cpu:CPU) {
        cpu.params.r_second.value &= cpu.params.first;
    }

    @instruction("R_OR", 7)
    public registerOrInstruction(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value | cpu.params.r_second.value;
    }

    @instruction("V_OR", 8)
    public valueOrInstruction(cpu:CPU) {
        cpu.params.r_second.value |= cpu.params.first;
    }

    @instruction("R_XOR", 9)
    public registerXorInstruction(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value ^ cpu.params.r_second.value;
    }

    @instruction("V_XOR", 10)
    public valueXorInstruction(cpu:CPU) {
        cpu.params.r_second.value ^= cpu.params.first;
    }

    @instruction("V_CMP", 11)
    public valueCompareInstruction(cpu:CPU) {
        if (cpu.params.first == cpu.params.r_second.value) {
            cpu.flags.equal = true;
            cpu.flags.less = false;
            cpu.flags.equal = false;
        } else if (cpu.params.first < cpu.params.r_second.value) {
            cpu.flags.equal = false;
            cpu.flags.less = true;
            cpu.flags.equal = false;
        } else if (cpu.params.first > cpu.params.r_second.value) {
            cpu.flags.equal = false;
            cpu.flags.less = false;
            cpu.flags.equal = true;
        }
    }

    @instruction("R_CMP", 12)
    public registerCompareInstruction(cpu:CPU) {
        if (cpu.params.r_first.value == cpu.params.r_second.value) {
            cpu.flags.equal = true;
            cpu.flags.less = false;
            cpu.flags.equal = false;
        } else if (cpu.params.r_first.value < cpu.params.r_second.value) {
            cpu.flags.equal = false;
            cpu.flags.less = true;
            cpu.flags.equal = false;
        } else if (cpu.params.r_first.value > cpu.params.r_second.value) {
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