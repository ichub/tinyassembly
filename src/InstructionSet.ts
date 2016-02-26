import {Instruction} from "./instruction";
import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {Flags} from "./Flags";
import {Register} from "./register";
import {instruction} from "./InstructionDecorator";

export class InstructionSet {
    private _instructions:Instruction[];

    constructor() {
        this.initInstructions();
    }

    private initInstructions() {
        this._instructions = [
            new Instruction(
                "HALT",
                0,
                (reg:Registers, flags:Flags, ram:RAM) => {
                    flags.halt = true;
                }),
            new Instruction(
                "R_LOAD",
                1,
                /**
                 * load value at at register position 1 into register position 2
                 */
                (reg:Registers, flags:Flags, ram:RAM) => {
                    const params = ram.getMemorySlice(reg.IP.value + 1, 3);

                    const first = params[0];
                    const second = params[1];

                    const firstRegister = reg.registerMap[first];
                    const secondRegister = reg.registerMap[second];

                    secondRegister.value = firstRegister.value;
                }),
            new Instruction(
                "V_LOAD",
                2,
                /**
                 * load value at position 1 into register position 2
                 */
                (reg:Registers, flags:Flags, ram:RAM) => {
                    const params = ram.getMemorySlice(reg.IP.value + 1, 3);

                    const value = params[0];
                    const register = reg.registerMap[params[1]];

                    register.value = value;
                }
            ),
            new Instruction(
                "R_ADD",
                3,
                /**
                 *  add registers param1 and param2 and put result in param3
                 */
                (reg:Registers, flags:Flags, ram:RAM) => {
                    const params = ram.getMemorySlice(reg.IP.value + 1, 3);

                    const left = reg.registerMap[params[0]];
                    const right = reg.registerMap[params[1]];
                    const result = reg.registerMap[params[2]];

                    result.value = left.value + right.value;
                }
            ),
            new Instruction(
                "V_ADD",
                4,
                /**
                 *  increment register param2 by value param1
                 */
                (reg:Registers, flags:Flags, ram:RAM) => {
                    const params = ram.getMemorySlice(reg.IP.value + 1, 3);

                    const value = params[0];
                    const register = reg.registerMap[params[1]];

                    register.incrementBy(value);
                }
            )
        ];
    }

    @instruction("one", "two", 3)
    public instruction() {

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