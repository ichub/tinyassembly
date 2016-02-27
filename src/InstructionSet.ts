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
    public loadRegister(cpu:CPU) {
        cpu.params.r_first.value = cpu.params.r_second.value;
    }

    @instruction("V_LOAD", 2)
    public loadValue(cpu:CPU) {
        cpu.params.r_second.value = cpu.params.first;
    }

    @instruction("R_ADD", 3)
    public addRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value + cpu.params.r_second.value;
    }

    @instruction("V_ADD", 4)
    public addValues(cpu:CPU) {
        cpu.params.r_second.incrementBy(cpu.params.first);
    }

    @instruction("R_AND", 5)
    public bitwiseAndRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value & cpu.params.r_second.value;
    }

    @instruction("V_AND", 6)
    public bitwiseAndValues(cpu:CPU) {
        cpu.params.r_second.value &= cpu.params.first;
    }

    @instruction("R_OR", 7)
    public bitwiseOrRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value | cpu.params.r_second.value;
    }

    @instruction("V_OR", 8)
    public bitwiseOrValues(cpu:CPU) {
        cpu.params.r_second.value |= cpu.params.first;
    }

    @instruction("R_XOR", 9)
    public bitwoseXorRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value ^ cpu.params.r_second.value;
    }

    @instruction("V_XOR", 10)
    public bitwiseXorValues(cpu:CPU) {
        cpu.params.r_second.value ^= cpu.params.first;
    }

    @instruction("V_CMP", 11)
    public compareValues(cpu:CPU) {
        this.compare(cpu.params.first, cpu.params.r_second.value, cpu);
    }

    @instruction("R_CMP", 12)
    public compareRegisters(cpu:CPU) {
        this.compare(cpu.params.r_first.value, cpu.params.r_second.value, cpu);
    }

    @instruction("JMP_EQ", 13)
    public jumpIfEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMP_NEQ", 14)
    public jumpIfNotEqual(cpu:CPU) {
        this.jumpIf(!cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMP_L", 15)
    public jumpIfless(cpu:CPU) {
        this.jumpIf(cpu.flags.less, cpu, cpu.params.first);
    }

    @instruction("JMP_LEQ", 16)
    public jumpIfLessOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.less || cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMP_M", 17)
    public jumpIfMore(cpu:CPU) {
        this.jumpIf(cpu.flags.more, cpu, cpu.params.first);
    }

    @instruction("JMP_MEQ", 18)
    public jumpIfMoreOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.more || cpu.flags.equal, cpu, cpu.params.first);
    }

    private jumpIf(predicate:boolean, cpu:CPU, to:number) {
        if (predicate) {
            cpu.flags.jumped = true;
            cpu.registers.IP.value = to;
        }
    }

    private compare(left:number, right:number, cpu:CPU) {
        if (left == right) {
            cpu.flags.equal = true;
            cpu.flags.less = false;
            cpu.flags.equal = false;
        } else if (left < right) {
            cpu.flags.equal = false;
            cpu.flags.less = true;
            cpu.flags.equal = false;
        } else if (left > right) {
            cpu.flags.equal = false;
            cpu.flags.less = false;
            cpu.flags.equal = true;
        }
    }

    public findInstruction(opcode:number):Instruction {
        for (let i = 0; i < this._instructions.length; i++) {
            if (this._instructions[i].opcode == opcode) {
                return this._instructions[i];
            }
        }

        throw "could not find matching instruction";
    }

    public get instructions():Instruction[] {
        return this._instructions;
    }
}