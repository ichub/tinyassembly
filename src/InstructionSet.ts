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
        const params = cpu.currentParams;

        const first = params[0];
        const second = params[1];

        const firstRegister = cpu.registers.registerMap[first];
        const secondRegister = cpu.registers.registerMap[second];

        secondRegister.value = firstRegister.value;
    }

    @instruction("V_LOAD", 2)
    public loadValueInstruction(cpu:CPU) {
        const params = cpu.ram.getMemorySlice(cpu.registers.IP.value + 1, 3);

        const value = params[0];
        const register = cpu.registers.registerMap[params[1]];

        register.value = value;
    }

    @instruction("R_ADD", 3)
    public registerAddInstruction(cpu:CPU) {
        const params = cpu.ram.getMemorySlice(cpu.registers.IP.value + 1, 3);

        const left = cpu.registers.registerMap[params[0]];
        const right = cpu.registers.registerMap[params[1]];
        const result = cpu.registers.registerMap[params[2]];

        result.value = left.value + right.value;
    }

    @instruction("V_ADD", 4)
    public valueAddInstruction(cpu:CPU) {
        const params = cpu.ram.getMemorySlice(cpu.registers.IP.value + 1, 3);

        const value = params[0];
        const register = cpu.registers.registerMap[params[1]];

        register.incrementBy(value);
    }

    @instruction("R_AND", 5)
    public registerAndInstruction(cpu:CPU) {
        const params = cpu.ram.getMemorySlice(cpu.registers.IP.value + 1, 3);

        const left = cpu.registers.registerMap[params[0]];
        const right = cpu.registers.registerMap[params[1]];
        const result = cpu.registers.registerMap[params[2]];

        result.value = left.value & right.value;
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