import {Computer} from "../../Computer";
import {RAM} from "../../RAM";

describe("CMP instruction", function () {
    it("value less", function () {
        const comp = new Computer();
        let less = 123;
        let more = 456;

        comp.cpu.registers.A.value = more;
        comp.ram.setMemory(RAM.programRange.low, [11, less, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.less).toBe(true);
        expect(comp.cpu.flags.more).toBe(false);
        expect(comp.cpu.flags.equal).toBe(false);
    });

    it("value more", function () {
        const comp = new Computer();
        let less = 123;
        let more = 456;

        comp.cpu.registers.A.value = less;
        comp.ram.setMemory(RAM.programRange.low, [11, more, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.less).toBe(false);
        expect(comp.cpu.flags.more).toBe(true);
        expect(comp.cpu.flags.equal).toBe(false);
    });

    it("value equal", function () {
        const comp = new Computer();
        let value = 123;

        comp.cpu.registers.A.value = value;
        comp.ram.setMemory(RAM.programRange.low, [11, value, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.less).toBe(false);
        expect(comp.cpu.flags.more).toBe(false);
        expect(comp.cpu.flags.equal).toBe(true);
    });

    it("register less", function () {
        const comp = new Computer();
        let less = 123;
        let more = 456;

        comp.cpu.registers.A.value = less;
        comp.cpu.registers.B.value = more;
        comp.ram.setMemory(RAM.programRange.low, [12, 0, 1, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.less).toBe(true);
        expect(comp.cpu.flags.more).toBe(false);
        expect(comp.cpu.flags.equal).toBe(false);
    });

    it("register more", function () {
        const comp = new Computer();
        let less = 123;
        let more = 456;

        comp.cpu.registers.A.value = more;
        comp.cpu.registers.B.value = less;
        comp.ram.setMemory(RAM.programRange.low, [12, 0, 1, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.less).toBe(false);
        expect(comp.cpu.flags.more).toBe(true);
        expect(comp.cpu.flags.equal).toBe(false);
    });

    it("register equal", function () {
        const comp = new Computer();
        let value = 123;

        comp.cpu.registers.A.value = value;
        comp.cpu.registers.B.value = value;
        comp.ram.setMemory(RAM.programRange.low, [12, 0, 1, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.less).toBe(false);
        expect(comp.cpu.flags.more).toBe(false);
        expect(comp.cpu.flags.equal).toBe(true);
    });
});
