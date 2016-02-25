import {Computer} from "../../computer";

describe("the V_ADD instruction", function () {
    it("should increment the register at param2 by value at param1", function () {
        const comp = new Computer();
        const initRegisterValue = 113;
        const incrementValue = 1414;

        comp.cpu.registers.A.value = initRegisterValue;
        comp.ram.setMemory(0, [4, incrementValue, 0, 0]);

        comp.cpu.step();

        expect(comp.cpu.registers.A.value).toBe(initRegisterValue + incrementValue);
    });
});