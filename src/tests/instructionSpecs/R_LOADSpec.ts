import {Computer} from "../../computer";

describe("the R_LOAD instruction", function () {
    it("should load the value in register index parameter 1 into register index parameter 2", function () {
        const comp = new Computer();

        comp.ram.setMemory(0, [0, 0, 0, 0]);
        comp.cpu.step();
        expect(comp.cpu.flags.halt).toBe(true);
    });
});