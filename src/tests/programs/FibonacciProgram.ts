import {Computer} from "../../Computer";

describe("finonacci number", function () {
    it("should work", function () {
        const fibCount = 12;

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
            }

            return fib;
        };

        const program = [
            "LOAD 0 %A",
            "LOAD 1 %B",
            "LOAD 1 %C",
            "LOAD 0 %D",
            "loop:",
            "CMP " + fibCount + " %D",
            "INC %D",
            "JMPLEQ $halt",
            "ADD %C %B %E",
            "LOAD %A %B",
            "LOAD %B %C",
            "LOAD %C %E",
            "JMP $loop",
            "halt:",
            "HALT",
        ].join("\n");

        const computer = new Computer();
        computer.loadProgram(program);
        computer.cpu.runSynchronouslyUntilHalted();

        expect(computer.cpu.registers.C.value).toEqual(fibonacci(fibCount));
    });
});
