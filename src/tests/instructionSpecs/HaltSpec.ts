import {Computer} from "../../Computer";
import {RAM} from "../../RAM";

describe("the HALT instruction", function () {
    it("should set the halt flag", function () {
        const comp = new Computer();

        comp.ram.setMemory(RAM.programRange.low, [0, 0, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.halt).toBe(true);
    });
});
