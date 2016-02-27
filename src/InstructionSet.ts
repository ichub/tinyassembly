import {Instruction} from "./instruction";
import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {Flags} from "./Flags";
import {Register} from "./register";
import {instruction} from "./InstructionDecorator";
import {Computer} from "./computer";
import {CPU} from "./cpu";
import {ParamType} from "./ParamType";

export class InstructionSet {
    private _instructions:Instruction[];

    @instruction("HALT", 0)
    public haltInstruction(cpu:CPU) {
        cpu.flags.halt = true
    }

    @instruction("R_LOAD", 1, ParamType.Register, ParamType.Register)
    public loadRegister(cpu:CPU) {
        cpu.params.r_first.value = cpu.params.r_second.value;
    }

    @instruction("V_LOAD", 2, ParamType.Value, ParamType.Register)
    public loadValue(cpu:CPU) {
        cpu.params.r_second.value = cpu.params.first;
    }

    @instruction("R_ADD", 3, ParamType.Register, ParamType.Register, ParamType.Register)
    public addRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value + cpu.params.r_second.value;
    }

    @instruction("V_ADD", 4, ParamType.Value, ParamType.Register)
    public addValues(cpu:CPU) {
        cpu.params.r_second.incrementBy(cpu.params.first);
    }

    @instruction("R_AND", 5, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwiseAndRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value & cpu.params.r_second.value;
    }

    @instruction("V_AND", 6, ParamType.Value, ParamType.Register)
    public bitwiseAndValues(cpu:CPU) {
        cpu.params.r_second.value &= cpu.params.first;
    }

    @instruction("R_OR", 7, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwiseOrRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value | cpu.params.r_second.value;
    }

    @instruction("V_OR", 8, ParamType.Value, ParamType.Register)
    public bitwiseOrValues(cpu:CPU) {
        cpu.params.r_second.value |= cpu.params.first;
    }

    @instruction("R_XOR", 9, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwoseXorRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value ^ cpu.params.r_second.value;
    }

    @instruction("V_XOR", 10, ParamType.Value, ParamType.Register)
    public bitwiseXorValues(cpu:CPU) {
        cpu.params.r_second.value ^= cpu.params.first;
    }

    @instruction("V_CMP", 11, ParamType.Value, ParamType.Register)
    public compareValues(cpu:CPU) {
        this.compare(cpu.params.first, cpu.params.r_second.value, cpu);
    }

    @instruction("R_CMP", 12, ParamType.Register, ParamType.Register)
    public compareRegisters(cpu:CPU) {
        this.compare(cpu.params.r_first.value, cpu.params.r_second.value, cpu);
    }

    @instruction("JMP_EQ", 13, ParamType.Value)
    public jumpIfEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMP_NEQ", 14, ParamType.Value)
    public jumpIfNotEqual(cpu:CPU) {
        this.jumpIf(!cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMP_L", 15, ParamType.Value)
    public jumpIfless(cpu:CPU) {
        this.jumpIf(cpu.flags.less, cpu, cpu.params.first);
    }

    @instruction("JMP_LEQ", 16, ParamType.Value)
    public jumpIfLessOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.less || cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMP_M", 17, ParamType.Value)
    public jumpIfMore(cpu:CPU) {
        this.jumpIf(cpu.flags.more, cpu, cpu.params.first);
    }

    @instruction("JMP_MEQ", 18, ParamType.Value)
    public jumpIfMoreOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.more || cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("R_JMP_EQ", 19, ParamType.Register)
    public registerJumpIfEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.equal, cpu, cpu.params.r_first.value);
    }

    @instruction("R_JMP_NEQ", 20, ParamType.Register)
    public registerJumpIfNotEqual(cpu:CPU) {
        this.jumpIf(!cpu.flags.equal, cpu, cpu.params.r_first.value);
    }

    @instruction("R_JMP_L", 21, ParamType.Register)
    public registerJumpIfless(cpu:CPU) {
        this.jumpIf(cpu.flags.less, cpu, cpu.params.r_first.value);
    }

    @instruction("R_JMP_LEQ", 22, ParamType.Register)
    public registerJumpIfLessOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.less || cpu.flags.equal, cpu, cpu.params.r_first.value);
    }

    @instruction("R_JMP_M", 23, ParamType.Register)
    public registerJumpIfMore(cpu:CPU) {
        this.jumpIf(cpu.flags.more, cpu, cpu.params.r_first.value);
    }

    @instruction("R_JMP_MEQ", 24, ParamType.Register)
    public registerJumpIfMoreOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.more || cpu.flags.equal, cpu, cpu.params.r_first.value);
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