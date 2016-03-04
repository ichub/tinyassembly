import {Computer} from "../../Computer";

describe("the pop instruction", function () {
    it("should pop values", function () {
        const comp = new Computer();

        const expectedValue = 100;

        comp.cpu.registers.SP.increment();
        comp.ram.setCellValue(comp.cpu.registers.SP.value, expectedValue);
        comp.ram.setMemory(0, [27, 0, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.registers.A.value).toEqual(expectedValue);
    });
});