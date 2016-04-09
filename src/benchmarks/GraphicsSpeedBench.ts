import * as benchmark from "benchmark";
import {Computer} from "../Computer";

const suite = new benchmark.Suite("program writing to graphics memory");

const graphicsProgram = [
    "LOAD 0 %A",
    "LOAD 0 %B",
    "LOAD 5 %C",
    "LOAD 3 %D",
    "LOAD #g_char_size %E",
    "MUL 33 %E",
    "ADD #m_static_low %E",
    "loop:",
    "CLS",
    "BLIT %E %A %B",
    "ADD %C %A %A",
    "ADD %D %B %B",
    "DRAW",
    "JMP $loop",
].join("\n");

const computer = new Computer();
computer.loadProgram(graphicsProgram);

suite.add("simple graphics", () => {
    computer.cpu.registers.zeroOut();
    computer.cpu.runSynchronouslyFor(20);
});

export = suite;
