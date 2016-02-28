import {Computer} from "../../computer";

describe("the R_AND instruction", function () {
    it("param3 = param1 & param2", function () {
        const comp = new Computer();
        const left = 123;
        const right = 456;

        comp.cpu.registers.A.value = left;
        comp.cpu.registers.B.value = right;
        comp.ram.setMemory(0, [5, 0, 1, 2]);
        comp.cpu.step();

        expect(comp.cpu.registers.C.value).toBe(left & right);
    });

    it("param3 = param1 & param2", function () {
        const comp = new Computer();
        const left = 0b11101;
        const right = 0b01101;

        comp.cpu.registers.A.value = left;
        comp.ram.setMemory(0, [6, right, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.registers.A.value).toBe(left & right);
    });
});