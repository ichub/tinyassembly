import {Assembler} from "../Assembler";
import {InstructionSet} from "../InstructionSet";
import {ParamType} from "../ParamType";

describe("assembler", function () {
    let assembler = new Assembler(new InstructionSet());

    it("should parse registers", function () {
        expect(assembler.paramStringToParam("%A")).toEqual(jasmine.objectContaining({
            type: ParamType.Register,
            value: 0
        }));
    });

    it("should parse numbers", function () {
        expect(assembler.paramStringToParam("100")).toEqual(jasmine.objectContaining({
            type: ParamType.Value,
            value: 100
        }));
    });

    it("should assemble the halt instruction", function () {
        expect(assembler.assembleSingleInstruction("HALT")).toEqual([0, 0, 0, 0]);
    });

    it("should assemble the load instruction", function() {
        expect(assembler.assembleSingleInstruction("LOAD %A %B")).toEqual([1, 0, 1, 0]);
        expect(assembler.assembleSingleInstruction("LOAD 100 %A")).toEqual([2, 100, 0, 0]);
    });

    it("should assemble the add instruction", function() {
        expect(assembler.assembleSingleInstruction("ADD %A %B %C")).toEqual([3, 0, 1, 2]);
        expect(assembler.assembleSingleInstruction("ADD 100 %A")).toEqual([4, 100, 0, 0]);
    });

    it("should assemble the and instruction", function() {
        expect(assembler.assembleSingleInstruction("AND %A %B %C")).toEqual([5, 0, 1, 2]);
        expect(assembler.assembleSingleInstruction("AND 100 %A")).toEqual([6, 100, 0, 0]);
    });

    it("should assemble the or instruction", function() {
        expect(assembler.assembleSingleInstruction("OR 100 %A")).toEqual([8, 100, 0, 0]);
        expect(assembler.assembleSingleInstruction("OR %A %B %C")).toEqual([7, 0, 1, 2]);
    });

    it("should assemble the xor instruction", function() {
        expect(assembler.assembleSingleInstruction("XOR %A %B %C")).toEqual([9, 0, 1, 2]);
        expect(assembler.assembleSingleInstruction("XOR 100 %A")).toEqual([10, 100, 0, 0]);
    });

    it("should assemble the cmp instruction", function() {
        expect(assembler.assembleSingleInstruction("CMP 100 %A")).toEqual([11, 100, 0, 0]);
        expect(assembler.assembleSingleInstruction("CMP %A %B")).toEqual([12, 0, 1, 0]);
    });
});