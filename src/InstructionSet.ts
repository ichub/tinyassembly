import {Instruction} from "./instruction";
import {Register} from "./register";
import {instruction} from "./InstructionDecorator";
import {CPU} from "./cpu";
import {ParamType} from "./ParamType";
import {ignoreCaseEquals} from "./Strings";
import {CachedBlitEvent} from "./CachedBlitEvent";
import {Graphics} from "./Graphics";
import {CachedClearEvent} from "./CachedClearEvent";

export class InstructionSet {
    private _instructionLength:number = 4;
    private _instructions:Instruction[];
    private _opcodeToInstructionMap:Instruction[];

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
    public addRegisters(cpu:CPU, lhs:Register, rhs:Register, dest:Register) {
        dest.value = lhs.value + rhs.value;
    }

    @instruction("ADD", 4, ParamType.Value, ParamType.Register)
    public addValues(cpu:CPU, value:number, dest:Register) {
        dest.incrementBy(value);
    }

    @instruction("AND", 5, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwiseAndRegisters(cpu:CPU, lhs:Register, rhs:Register, dest:Register) {
        dest.value = lhs.value & rhs.value;
    }

    @instruction("AND", 6, ParamType.Value, ParamType.Register)
    public bitwiseAndValues(cpu:CPU, value:number, dest:Register) {
        dest.value &= value;
    }

    @instruction("OR", 7, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwiseOrRegisters(cpu:CPU, lhs:Register, rhs:Register, dest:Register) {
        dest.value = lhs.value | rhs.value;
    }

    @instruction("OR", 8, ParamType.Value, ParamType.Register)
    public bitwiseOrValues(cpu:CPU, value:number, dest:Register) {
        dest.value |= value;
    }

    @instruction("XOR", 9, ParamType.Register, ParamType.Register, ParamType.Register)
    public bitwiseXorRegisters(cpu:CPU, lhs:Register, rhs:Register, dest:Register) {
        dest.value = lhs.value ^ rhs.value;
    }

    @instruction("XOR", 10, ParamType.Value, ParamType.Register)
    public bitwiseXorValues(cpu:CPU, value:number, dest:Register) {
        dest.value ^= value;
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
    public jumpIfNotEqual(cpu:CPU, value:number) {
        this.jumpIf(!cpu.flags.equal, cpu, value);
    }

    @instruction("JMPL", 15, ParamType.Value)
    public jumpIfless(cpu:CPU, value:number) {
        this.jumpIf(cpu.flags.less && !cpu.flags.equal, cpu, value);
    }

    @instruction("JMPLEQ", 16, ParamType.Value)
    public jumpIfLessOrEqual(cpu:CPU, value:number) {
        this.jumpIf(cpu.flags.less || cpu.flags.equal, cpu, value);
    }

    @instruction("JMPM", 17, ParamType.Value)
    public jumpIfMore(cpu:CPU, value:number) {
        this.jumpIf(cpu.flags.more && !cpu.flags.equal, cpu, value);
    }

    @instruction("JMPMEQ", 18, ParamType.Value)
    public jumpIfMoreOrEqual(cpu:CPU, value:number) {
        this.jumpIf(cpu.flags.more || cpu.flags.equal, cpu, value);
    }

    @instruction("JMPEQ", 19, ParamType.Register)
    public registerJumpIfEqual(cpu:CPU, reg:Register) {
        this.jumpIf(cpu.flags.equal, cpu, reg.value);
    }

    @instruction("JMPNEQ", 20, ParamType.Register)
    public registerJumpIfNotEqual(cpu:CPU, reg:Register) {
        this.jumpIf(!cpu.flags.equal, cpu, reg.value);
    }

    @instruction("JMPL", 21, ParamType.Register)
    public registerJumpIfless(cpu:CPU, reg:Register) {
        this.jumpIf(cpu.flags.less, cpu, reg.value);
    }

    @instruction("JMPLEQ", 22, ParamType.Register)
    public registerJumpIfLessOrEqual(cpu:CPU, reg:Register) {
        this.jumpIf(cpu.flags.less || cpu.flags.equal, cpu, reg.value);
    }

    @instruction("JMPM", 23, ParamType.Register)
    public registerJumpIfMore(cpu:CPU, reg:Register) {
        this.jumpIf(cpu.flags.more, cpu, reg.value);
    }

    @instruction("JMPMEQ", 24, ParamType.Register)
    public registerJumpIfMoreOrEqual(cpu:CPU, reg:Register) {
        this.jumpIf(cpu.flags.more || cpu.flags.equal, cpu, reg.value);
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

    @instruction("BLIT", 34, ParamType.Value, ParamType.Value, ParamType.Value)
    public blit(cpu:CPU, origin:number, x:number, y:number) {
        for (let i = 0; i < 8; i++) {
            cpu.ram.copy(origin + 8 * i, 8, x + (y + i) * 64, cpu.graphics);
        }
    }

    @instruction("BLIT", 35, ParamType.Value, ParamType.Register, ParamType.Register)
    public blitReg(cpu:CPU, origin:number, x:Register, y:Register) {
        const width = cpu.ram.getCellValue(origin);
        const height = cpu.ram.getCellValue(origin + 1);

        for (let i = 0; i < height; i++) {
            cpu.ram.copy(origin + width * i + 2, width, x.value + (y.value + i) * 64, cpu.graphics);
        }
    }

    @instruction("CLS", 36)
    public clearScreen(cpu:CPU) {
        cpu.graphics.zeroOut();

        cpu.graphics.drawCache.addEvent(new CachedClearEvent());
    }

    @instruction("DRAW", 37)
    public draw(cpu:CPU) {
        cpu.flags.draw = true;
    }

    @instruction("RAND", 38, ParamType.Register, ParamType.Value, ParamType.Value)
    public random(cpu:CPU, dest:Register, low:number, high:number) {
        dest.value = Math.round(Math.random() * (high - low)) + low;
    }

    @instruction("DEC", 39, ParamType.Register)
    public decrement(cpu:CPU, reg:Register) {
        reg.decrement();
    }

    @instruction("BLIT", 40, ParamType.Register, ParamType.Register, ParamType.Register)
    public blitRegReg(cpu:CPU, origin:Register, x:Register, y:Register) {
        const width = cpu.ram.getCellValue(origin.value);
        const height = cpu.ram.getCellValue(origin.value + 1);

        for (let i = 0; i < height; i++) {
            cpu.ram.copy(origin.value + width * i + 2, width, (x.value % Graphics.width) + ((y.value % Graphics.height) + i) * 64, cpu.graphics);
        }
        
        cpu.graphics.drawCache.addEvent(new CachedBlitEvent(x.value, y.value, width, height));
    }

    public findInstructionByOpcode(opcode:number):Instruction {
        if (opcode >= 0 && opcode < this._opcodeToInstructionMap.length) {
            return this._opcodeToInstructionMap[opcode];
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

        throw "could not find matching instruction: " + name;
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
