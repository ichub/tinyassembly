import {Computer} from "../../Computer";

describe("the jump instruction", function () {
    const comp = new Computer();

    describe("JUMPEQ", function () {
        it("shoud jump if equal", function () {
            comp.cpu.flags.equal = true;
            comp.ram.setMemory(0, [13, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(100);
        });

        it("should not jump if not equal", function () {
            comp.reset();

            comp.cpu.flags.equal = false;
            comp.ram.setMemory(0, [13, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(comp.cpu.instructionSet.instructionLength);
        });
    });

    describe("JUMPNEQ", function () {
        it("should jump if not equal", function () {
            comp.reset();

            comp.cpu.flags.equal = false;
            comp.ram.setMemory(0, [14, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(100);
        });

        it("should jump if not equal", function () {
            comp.reset();

            comp.cpu.flags.equal = true;
            comp.ram.setMemory(0, [14, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(comp.cpu.instructionSet.instructionLength);
        });
    })
});