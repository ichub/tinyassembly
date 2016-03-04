import {Instruction} from "./instruction";
import {Register} from "./register";
import {instruction} from "./InstructionDecorator";
import {CPU} from "./cpu";
import {ParamType} from "./ParamType";
import {ignoreCaseEquals} from "./Strings";

export class InstructionSet {
    private _instructionLength:number = 4;
    private _instructions:Instruction[];

    @instruction("HALT", 0)
    public haltInstruction(cpu:CPU) {
        cpu.flags.halt = true;
    }

    @instruction("LOAD", 1, ParamType.Register, ParamType.Register)
    public loadRegister(cpu:CPU, destination:Register, source:Register) {
        destination.value = source.value;
    }

    @instruction("LOAD", 2, ParamType.Value, ParamType.Register)
    public loadValue(cpu:CPU, value:number, destination:Register) {
        destination.value = value;
    }

    @instruction("ADD", 3, ParamType.Register, ParamType.Register, ParamType.Register)
    public addRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value + cpu.params.r_second.value;
    }

    @instruction("ADD", 4, ParamType.Value, ParamType.Register)
    public addValues(cpu:CPU) {
        cpu.params.r_second.incrementBy(cpu.params.first);
    }

    @instruction("AND", 5, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwiseAndRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value & cpu.params.r_second.value;
    }

    @instruction("AND", 6, ParamType.Value, ParamType.Register)
    public bitwiseAndValues(cpu:CPU) {
        cpu.params.r_second.value &= cpu.params.first;
    }

    @instruction("OR", 7, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwiseOrRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value | cpu.params.r_second.value;
    }

    @instruction("OR", 8, ParamType.Value, ParamType.Register)
    public bitwiseOrValues(cpu:CPU) {
        cpu.params.r_second.value |= cpu.params.first;
    }

    @instruction("XOR", 9, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwiseXorRegisters(cpu:CPU) {
        cpu.params.r_third.value = cpu.params.r_first.value ^ cpu.params.r_second.value;
    }

    @instruction("XOR", 10, ParamType.Value, ParamType.Register)
    public bitwiseXorValues(cpu:CPU) {
        cpu.params.r_second.value ^= cpu.params.first;
    }

    @instruction("CMP", 11, ParamType.Value, ParamType.Register)
    public compareValues(cpu:CPU, lhs:number, rhs:Register) {
        this.compare(lhs, rhs.value, cpu);
    }

    @instruction("CMP", 12, ParamType.Register, ParamType.Register)
    public compareRegisters(cpu:CPU, lhs:Register, rhs:Register) {
        this.compare(lhs.value, rhs.value, cpu);
    }

    @instruction("JMPEQ", 13, ParamType.Value)
    public jumpIfEqual(cpu:CPU, destination:number) {
        this.jumpIf(cpu.flags.equal, cpu, destination);
    }

    @instruction("JMPNEQ", 14, ParamType.Value)
    public jumpIfNotEqual(cpu:CPU) {
        this.jumpIf(!cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMPL", 15, ParamType.Value)
    public jumpIfless(cpu:CPU) {
        this.jumpIf(cpu.flags.less && !cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMPLEQ", 16, ParamType.Value)
    public jumpIfLessOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.less || cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMPM", 17, ParamType.Value)
    public jumpIfMore(cpu:CPU) {
        this.jumpIf(cpu.flags.more && !cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMPMEQ", 18, ParamType.Value)
    public jumpIfMoreOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.more || cpu.flags.equal, cpu, cpu.params.first);
    }

    @instruction("JMPEQ", 19, ParamType.Register)
    public registerJumpIfEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.equal, cpu, cpu.params.r_first.value);
    }

    @instruction("JMPNEQ", 20, ParamType.Register)
    public registerJumpIfNotEqual(cpu:CPU) {
        this.jumpIf(!cpu.flags.equal, cpu, cpu.params.r_first.value);
    }

    @instruction("JMPL", 21, ParamType.Register)
    public registerJumpIfless(cpu:CPU) {
        this.jumpIf(cpu.flags.less, cpu, cpu.params.r_first.value);
    }

    @instruction("JMPLEQ", 22, ParamType.Register)
    public registerJumpIfLessOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.less || cpu.flags.equal, cpu, cpu.params.r_first.value);
    }

    @instruction("JMPM", 23, ParamType.Register)
    public registerJumpIfMore(cpu:CPU) {
        this.jumpIf(cpu.flags.more, cpu, cpu.params.r_first.value);
    }

    @instruction("JMPMEQ", 24, ParamType.Register)
    public registerJumpIfMoreOrEqual(cpu:CPU) {
        this.jumpIf(cpu.flags.more || cpu.flags.equal, cpu, cpu.params.r_first.value);
    }

    @instruction("PUSH", 25, ParamType.Register)
    public pushRegister(cpu:CPU, register:Register) {
        cpu.ram.setCellValue(cpu.registers.SP.value, register.value);
        cpu.registers.SP.increment();
    }

    @instruction("PUSH", 26, ParamType.Value)
    public pushValue(cpu:CPU, value:number) {
        cpu.ram.setCellValue(cpu.registers.SP.value, value);
        cpu.registers.SP.increment();
    }

    @instruction("POP", 27, ParamType.Register)
    public popRegister(cpu:CPU, register:Register) {
        register.value = cpu.ram.getCellValue(cpu.registers.SP.value);
        cpu.registers.SP.decrement();
    }

    @instruction("MUL", 28, ParamType.Register, ParamType.Register, ParamType.Register)
    public multiplyRegisters(cpu:CPU, lhs:Register, rhs:Register, result:Register) {
        result.value = lhs.value * rhs.value;
    }

    @instruction("MUL", 29, ParamType.Value, ParamType.Register)
    public multiplyValues(cpu:CPU, by:number, result:Register) {
        result.value = result.value * by;
    }

    @instruction("SWAP", 30, ParamType.Register, ParamType.Register)
    public swap(cpu:CPU, lhs:Register, rhs:Register) {
        const temp = lhs.value;
        lhs.value = rhs.value;
        rhs.value = temp;
    }

    @instruction("INC", 31, ParamType.Register)
    public increment(cpu:CPU, reg:Register) {
        reg.increment();
    }

    @instruction("JMP", 32, ParamType.Value)
    public jumpValue(cpu:CPU, value:number) {
        this.jumpIf(true, cpu, value);
    }

    @instruction("JMP", 33, ParamType.Register)
    public jumpRegister(cpu:CPU, reg:Register) {
        this.jumpIf(true, cpu, reg.value);
    }

    public findInstructionByOpcode(opcode:number):Instruction {
        for (let i = 0; i < this._instructions.length; i++) {
            if (this._instructions[i].opcode === opcode) {
                return this._instructions[i];
            }
        }

        throw "could not find matching instruction";
    }

    public findInstructionByNameAndParams(name:string, paramsTypes:ParamType[]):Instruction {
        for (let i = 0; i < this._instructions.length; i++) {
            const inst = this._instructions[i];

            if (ignoreCaseEquals(inst.name, name)) {
                let matching = true;

                for (let j = 0; j < paramsTypes.length; j++) {
                    const type = paramsTypes[j];

                    if (inst.paramList[j] !== type) {
                        matching = false;
                        break;
                    }
                }

                if (matching) {
                    return inst;
                }
            }
        }

        throw "could not find matching instruction";
    }

    public get instructions():Instruction[] {
        return this._instructions;
    }

    public get instructionLength():number {
        return this._instructionLength;
    }

    private jumpIf(predicate:boolean, cpu:CPU, to:number) {
        if (predicate) {
            cpu.flags.jumped = true;
            cpu.registers.IP.value = to;
        }
    }

    private compare(left:number, right:number, cpu:CPU) {
        if (left === right) {
            cpu.flags.equal = true;
            cpu.flags.less = false;
            cpu.flags.more = false;
        } else if (left < right) {
            cpu.flags.equal = false;
            cpu.flags.less = true;
            cpu.flags.more = false;
        } else if (left > right) {
            cpu.flags.equal = false;
            cpu.flags.less = false;
            cpu.flags.more = true;
        }
    }
}
