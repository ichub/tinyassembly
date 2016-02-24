import {Register} from "../register";

describe("cpu register", function () {
    it("should handle overflows gracefully", function () {
        let reg = new Register("A");

        const bigValue = Register.maxValue + 100;

        reg.value = bigValue;

        expect(reg.value).toBe(bigValue % (Register.maxValue ));
    });

    it("should handle underflows gracefully", function () {
        let reg = new Register("A");

        const negativeValue = -100;

        reg.value = negativeValue;

        expect(reg.value).toBe(Register.maxValue + negativeValue);
        expect(1).toBe(2);
    });
});