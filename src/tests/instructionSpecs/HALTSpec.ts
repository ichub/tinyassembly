import {Computer} from "../../computer";

describe("the HALT instruction", function () {
    it("should set the halt flag", function () {
        const comp = new Computer();
        const testValue = 100;

        comp.cpu.registers.A.value = testValue;
        comp.ram.setMemory(0, [1, 0, 1, 0]);
        comp.cpu.step();

        expect(comp.cpu.registers.B.value).toBe(testValue);
    });
});