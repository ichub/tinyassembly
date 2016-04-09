import {InstructionSet} from "../InstructionSet";

describe("instruction set", function () {
    it("should not contain duplicate opcode instructions", function () {
        const instructionSet = new InstructionSet();

        const opcodes = [];
        const reported = [];

        instructionSet.instructions.forEach(function (instruction) {
            if (opcodes.indexOf(instruction.opcode) >= 0) {
                if (reported.indexOf(instruction.opcode) === -1) {
                    fail(`contained duplicate opcode: ${instruction.opcode}`);
                    reported.push(instruction.opcode);
                }
            }

            opcodes.push(instruction.opcode);
        });
    });
});
