import {Computer} from "../../Computer";
import {RAM} from "../../RAM";

describe("the R_LOAD instruction", function () {
    it("should load the value in register index parameter 1 into register index parameter 2", function () {
        const comp = new Computer();

        comp.ram.setMemory(0, [0, 0, 0, 0]);
        comp.cpu.step();
        expect(comp.cpu.flags.halt).toBe(true);
    });

    it("should load the value at position 1 into register with index at position 2", function () {
        const comp = new Computer();
        const testValue = 100;

        comp.ram.setMemory(RAM.programRange.low, [2, testValue, 3, 0]);
        comp.cpu.step();

        expect(comp.cpu.registers.D.value).toBe(testValue);
    });
});
