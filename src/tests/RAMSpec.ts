import {RAM} from "../ram";

describe("RAM", function () {
    it("should be initialized with zeroes", function () {
        const ram = new RAM();

        for (let i = 0; i < ram.size; i++) {
            expect(ram.getCellValue(i)).toBe(0);
        }
    });
});