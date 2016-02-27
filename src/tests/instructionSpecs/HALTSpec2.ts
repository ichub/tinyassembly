import {Computer} from "../../computer";

describe("the HALT instruction", function () {
    it("should set the halt flag", function () {
        const comp = new Computer();

        comp.ram.setMemory(0, [0, 0, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.halt).toBe(true);
    });
});