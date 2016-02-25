import {Computer} from "../../computer";

describe("the R_ADD instruction", function () {
    it("should set param3 register to be the sum of registers param1 and param2", function () {
        const comp = new Computer();
        const left = 123;
        const right = 456;

        comp.cpu.registers.A.value = left;
        comp.cpu.registers.B.value = right;
        comp.ram.setMemory(0, [3, 0, 1, 2]);
        comp.cpu.step();

        expect(comp.cpu.registers.C.value).toBe(left + right);
    });
});