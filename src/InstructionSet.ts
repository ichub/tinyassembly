import {Instruction} from "./instruction";
import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";
import {Flags} from "./Flags";
import {Register} from "./register";

export class InstructionSet {
    private _instructions:Instruction[];

    constructor() {
        this.initInstructions();
    }

    private initInstructions() {
        this._instructions = [
            new Instruction(
                "halt",
                0x00000000,
                (reg:Registers, flags:Flags, ram:RAM) => {
                    flags.halt = true;
                }),
            new Instruction(
                "r_load",
                0x00000001,
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

                    Logger.log(`loaded value ${firstRegister.value} at register
                                ${firstRegister.name} into register ${secondRegister.name} `);
                }),
            new Instruction(
                "v_load",
                0x00000002,
                /**
                 * load value at position 1 into register position 2
                 */
                (reg:Registers, flags:Flags, ram:RAM) => {
                    const params = ram.getMemorySlice(reg.IP.value + 1, 3);

                    const value = params[1];
                    const register = reg.registerMap[params[0]];

                    register.value = value;

                    Logger.log(`Loaded value ${value} into register ${register.name}`);
                }
            )
        ];
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