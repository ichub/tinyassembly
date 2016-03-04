import {Assembler} from "../Assembler";
import {InstructionSet} from "../InstructionSet";
import {ParamType} from "../ParamType";

describe("assembler", function () {
    const assembler = new Assembler(new InstructionSet());

    it("should work on simple programs", function () {
        const numbers = assembler.assembleString("LOAD 100 %B");

        expect(numbers).toEqual([2, 100, 1, 0]);
    });

    it("should work on multiline programs", function () {
        const numbers = assembler.assembleString("LOAD 100 %B\nCMP %B %C");

        expect(numbers).toEqual([2, 100, 1, 0, 12, 1, 2, 0]);
    });

    it("should assemble labels", function () {
        const numbers = assembler.assembleString("label:\nJMP label");

        expect(numbers).toEqual([]);
    });
});