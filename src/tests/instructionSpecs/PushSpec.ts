import {Computer} from "../../Computer";
import {RAM} from "../../RAM";

describe("the push instruction", function () {
    const comp = new Computer();

    it("should push registers onto the stack", function () {
        const pushedValue = 100;

        comp.cpu.registers.A.value = pushedValue;
        comp.ram.setMemory(RAM.programRange.low, [25, 0, 0, 0]);
        comp.cpu.step();

        expect(comp.ram.getCellValue(comp.cpu.registers.SP.value - 1)).toEqual(pushedValue);
    });

    it("should push raw values onto the stack", function () {
        comp.reset();

        const pushedValue = 200;

        comp.ram.setMemory(RAM.programRange.low, [26, pushedValue, 0, 0]);
        comp.cpu.step();

        expect(comp.ram.getCellValue(comp.cpu.registers.SP.value - 1)).toEqual(pushedValue);
    });
});