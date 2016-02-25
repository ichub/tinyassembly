import {RAM} from "../ram";

describe("RAM", function () {
    it("should be initialized with zeroes", function () {
        const ram = new RAM();

        for (let i = 0; i < ram.size; i++) {
            expect(ram.getCellValue(i)).toBe(0);
        }
    });

    it("should handle overflows in its cells", function () {
        const ram = new RAM();

        ram.setCellValue(0, RAM.maxMemoryCellValue + 1);

        expect(ram.getCellValue(0)).toBe(0);
    });

    it("should handle underflows in its cells", function () {
        const ram = new RAM();

        ram.setCellValue(0, -1);

        expect(ram.getCellValue(0)).toBe(RAM.maxMemoryCellValue);
    });
});