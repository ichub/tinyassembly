import {Computer} from "../../Computer";
describe("finonacci number", function () {
    it("should work", function () {
        const fibonacci = function (n) {
            let first = 0;
            let second = 1;
            let fib = 1;
            let counter = 0;

            while (counter++ < n) {
                let temp = fib + second;
                first = second;
                second = fib;
                fib = temp;

                console.log(`first: ${first}, second: ${second}, fib:${fib}`);
            }

            return fib;
        };

        const program = "LOAD 1 %A\nLOAD 1 %B\n";

        const computer = new Computer();
        computer.loadProgram(program);
        computer.cpu.runSynchronouslyUntilHalted();

        expect(computer.cpu.registers.C.value).toEqual(fibonacci(10));
    });
});