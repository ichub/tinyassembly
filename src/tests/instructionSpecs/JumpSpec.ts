import {Computer} from "../../Computer";
import {RAM} from "../../RAM";

describe("the jump instruction", function () {
    const comp = new Computer();

    describe("JUMPEQ", function () {
        it("shoud jump if equal", function () {
            comp.cpu.flags.equal = true;
            comp.ram.setMemory(RAM.programRange.low, [13, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(100);
        });

        it("should not jump if not equal", function () {
            comp.reset();

            comp.cpu.flags.equal = false;
            comp.ram.setMemory(RAM.programRange.low, [13, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(
                comp.cpu.instructionSet.instructionLength +
                RAM.programRange.low);
        });
    });

    describe("JMPNEQ", function () {
        it("should jump if not equal", function () {
            comp.reset();

            comp.cpu.flags.equal = false;
            comp.ram.setMemory(RAM.programRange.low, [14, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(100);
        });

        it("should not jump if equal", function () {
            comp.reset();

            comp.cpu.flags.equal = true;
            comp.ram.setMemory(RAM.programRange.low, [14, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(
                comp.cpu.instructionSet.instructionLength +
                RAM.programRange.low);
        });
    });

    describe("JMPL", function () {
        it("should jump if less", function () {
            comp.reset();

            comp.cpu.flags.less = true;
            comp.ram.setMemory(RAM.programRange.low, [15, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(100);
        });

        it("should not jump not less", function () {
            comp.reset();

            comp.cpu.flags.less = false;
            comp.ram.setMemory(RAM.programRange.low, [15, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(
                comp.cpu.instructionSet.instructionLength +
                RAM.programRange.low);
        });
    });

    describe("JMPLEQ", function () {
        it("should jump if less or equal", function () {
            comp.reset();

            comp.cpu.flags.less = true;
            comp.cpu.flags.equal = true;
            comp.ram.setMemory(RAM.programRange.low, [16, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(100);
        });

        it("should not jump not less or equal", function () {
            comp.reset();

            comp.cpu.flags.less = false;
            comp.ram.setMemory(RAM.programRange.low, [16, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(
                comp.cpu.instructionSet.instructionLength +
                RAM.programRange.low);
        });
    });

    describe("JMPM", function () {
        it("should jump if more", function () {
            comp.reset();

            comp.cpu.flags.more = true;
            comp.ram.setMemory(RAM.programRange.low, [17, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(100);
        });

        it("should not jump not more", function () {
            comp.reset();

            comp.cpu.flags.less = false;
            comp.ram.setMemory(RAM.programRange.low, [17, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(
                comp.cpu.instructionSet.instructionLength +
                RAM.programRange.low);
        });
    });

    describe("JMPMEQ", function () {
        it("should jump if more", function () {
            comp.reset();

            comp.cpu.flags.more = true;
            comp.cpu.flags.equal = true;
            comp.ram.setMemory(RAM.programRange.low, [18, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(100);
        });

        it("should not jump not more", function () {
            comp.reset();

            comp.cpu.flags.less = true;
            comp.ram.setMemory(RAM.programRange.low, [18, 100, 0, 0]);
            comp.cpu.step();

            expect(comp.cpu.registers.IP.value).toBe(
                comp.cpu.instructionSet.instructionLength +
                RAM.programRange.low);
        });
    });
});
