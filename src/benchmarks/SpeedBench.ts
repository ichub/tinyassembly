import * as benchmark from "benchmark";
import {Computer} from "../Computer";

const suite = new benchmark.Suite("speed");

const program = [
    "LOAD 0 %A",
    "LOAD 1 %B",
    "LOAD 1 %C",
    "LOAD 0 %D",
    "loop:",
    "CMP " + 20 + " %D",
    "INC %D",
    "JMPLEQ $halt",
    "ADD %C %B %E",
    "LOAD %A %B",
    "LOAD %B %C",
    "LOAD %C %E",
    "JMP $loop",
    "halt:",
    "HALT"
].join("\n");

const computer = new Computer();
computer.loadProgram(program);

suite.add("fibonacci", () => {
    computer.cpu.registers.zeroOut();
    computer.cpu.runSynchronouslyUntilHalted();
});

export = suite;