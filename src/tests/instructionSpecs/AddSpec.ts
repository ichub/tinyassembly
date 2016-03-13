import {Computer} from "../../computer";
import {RAM} from "../../RAM";

describe("ADD", function () {
    it("register addition", function () {
        const comp = new Computer();
        const left = 123;
        const right = 456;

        comp.cpu.registers.A.value = left;
        comp.cpu.registers.B.value = right;
        comp.ram.setMemory(RAM.programRange.low, [3, 0, 1, 2]);
        comp.cpu.step();

        expect(comp.cpu.registers.C.value).toBe(left + right);
    });

    it("register and value addition", function () {
        const comp = new Computer();
        const initRegisterValue = 113;
        const incrementValue = 1414;

        comp.cpu.registers.A.value = initRegisterValue;
        comp.ram.setMemory(RAM.programRange.low, [4, incrementValue, 0, 0]);

        comp.cpu.step();

        expect(comp.cpu.registers.A.value).toBe(initRegisterValue + incrementValue);
    });
});