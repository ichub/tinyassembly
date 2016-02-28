import {Computer} from "../../Computer";

describe("CMP instruction", function () {
    it("value less", function () {
        const comp = new Computer();
        let less = 123;
        let more = 456;

        comp.cpu.registers.A.value = more;
        comp.ram.setMemory(0, [11, less, 0, 0]);
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
        comp.ram.setMemory(0, [11, more, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.less).toBe(false);
        expect(comp.cpu.flags.more).toBe(true);
        expect(comp.cpu.flags.equal).toBe(false);
    });

    it("value equal", function () {
        const comp = new Computer();
        let value = 123;

        comp.cpu.registers.A.value = value;
        comp.ram.setMemory(0, [11, value, 0, 0]);
        comp.cpu.step();

        expect(comp.cpu.flags.less).toBe(false);
        expect(comp.cpu.flags.more).toBe(false);
        expect(comp.cpu.flags.equal).toBe(true);
    });
    
    it("register", function () {
        const comp = new Computer();
        const left = 123;
        const right = 456;

        comp.cpu.registers.A.value = left;
        comp.cpu.registers.B.value = right;
        comp.ram.setMemory(0, [9, 0, 1, 2]);
        comp.cpu.step();

        expect(comp.cpu.registers.C.value).toBe(left ^ right);
    });
});