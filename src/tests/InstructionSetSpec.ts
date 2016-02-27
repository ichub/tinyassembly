import {InstructionSet} from "../InstructionSet";

describe("instruction set", function () {
    it("should not contain duplicate opcode instructions", function () {
        const instructionSet = new InstructionSet();

        const opcodes = [];
        const reported = [];

        instructionSet.instructions.forEach(function (instruction) {
            if (opcodes.indexOf(instruction.opcode) >= 0) {
                if (reported.indexOf(instruction.opcode) == -1) {
                    fail(`contained duplicate opcode: ${instruction.opcode}`);
                    reported.push(instruction.opcode);
                }
            }

            opcodes.push(instruction.opcode);
        });
    });

    it("should not contain duplicate instruction names", function () {
        const instructionSet = new InstructionSet();

        const names = [];
        const reported = [];

        instructionSet.instructions.forEach(function (instruction) {
            if (names.indexOf(instruction.name) >= 0) {
                if (reported.indexOf(instruction.name) == -1) {
                    fail(`contained duplicate name: ${instruction.name}`);
                    reported.push(instruction.name);
                }
            }

            names.push(instruction.name);
        });
    });
});