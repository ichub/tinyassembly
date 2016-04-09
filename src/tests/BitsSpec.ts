import {clamp} from "../bits";

describe("clamp", function () {
    it("should work with small numbers", function () {
        expect(clamp(1024, 1023)).toBe(0);
    });

    it("should work with negative numbers", function () {
        expect(clamp(-1, 1023)).toBe(1023);
    });

    it("should work with really big negative numbers", function () {
        expect(clamp(-100, 15)).toBe(12);
    });
});
