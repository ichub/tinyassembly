import {Assembler} from "../Assembler";
import {InstructionSet} from "../InstructionSet";
import {ParamType} from "../ParamType";

describe("assembler", function () {
    const assembler = new Assembler(new InstructionSet());

    it("should work", function () {
        const numbers = assembler.assembleString("LOAD 100 %B");

        expect(numbers).toEqual([2, 100, 1, 0]);
    });
});