import {Assembler} from "../Assembler";
import {InstructionSet} from "../InstructionSet";
import {ParamType} from "../ParamType";
import {RAM} from "../RAM";

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
        const numbers = assembler.assembleString("HALT\nlabel:\nJMP $label");

        expect(numbers).toEqual([0, 0, 0, 0, 32, RAM.programRange.low + 4, 0, 0]);
    });

    it("should assemble constants", function () {
        const numbers = assembler.assembleString("LOAD #m_static_high %C");

        expect(numbers).toEqual([2, RAM.staticRange.high, 2, 0]);
    });
});