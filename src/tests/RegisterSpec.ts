import {Register} from "../register";

describe("testing cpu register", function() {
    it("testing overflow handling", function() {
        let reg = new Register("A");

        const bigValue = 193091238012983;

        reg.value = bigValue;

        expect(reg.value).toBe(bigValue % (Register.maxValue ));
    });
});