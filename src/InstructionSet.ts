import {Instruction} from "./instruction";
import {Registers} from "./registers";
import {RAM} from "./ram";
import {Logger} from "./logger";

export class InstructionSet {
    private _instructions:Instruction[];

    constructor() {
        this.initInstructions();
    }

    private initInstructions() {
        this._instructions = [
            new Instruction(0x00000000, (reg:Registers, ram:RAM) => {
                Logger.log("no op");
            })
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