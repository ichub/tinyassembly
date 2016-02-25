import {Computer} from "../../computer";

describe("the V_LOAD instruction", function () {
    it("should load the value at position 1 into register with index at position 2", function () {
        const comp = new Computer();
        const testValue = 100;

        comp.ram.setMemory(0, [2, testValue, 3, 0]);
        comp.cpu.step();

        expect(comp.cpu.registers.D.value).toBe(testValue);
    });
});