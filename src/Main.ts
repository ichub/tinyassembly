import {Computer} from "./computer";
import {Interface} from "./Interface";
import {RAM} from "./RAM";

const computer = new Computer();
const webInterface = new Interface(computer);

let mem = 0;

computer.ram.setMemory(mem, [36, 0, 0, 0]);
computer.ram.setMemory(mem += 4, [35, 100, 0, 0]);
computer.ram.setMemory(mem += 4, [37, 0, 0, 0]);
computer.ram.setMemory(mem += 4, [4, 1, 0, 0]);
computer.ram.setMemory(mem += 4, [32, 0, 0, 0]);

computer.loadProgram([
    "start:",
    "CLS",
    "BLIT 100 %A %D",
    "DRAW",
    "CMP 0 %B",
    "JMPNEQ $notequal",
    "RAND %B 5 10",
    "notequal:",
    "CMP 0 %C",
    "JMPNEQ $notequaltwo",
    "RAND %C 5 10",
    "notequaltwo:",
    "DEC %B",
    "ADD %B %A %A",
    "ADD %C %D %D",
    "JMP $start"
].join("\n"));

computer.ram.setMemory(100,
    [
        3, 2,
        1, 0, 1,
        0, 1, 0
    ]);


window.addEventListener("load", () => {
    webInterface.bind();
    computer.cpu.run();
});
