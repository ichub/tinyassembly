import {Computer} from "./computer";
import {Interface} from "./Interface";
import {RAM} from "./RAM";

const computer = new Computer();
const webInterface = new Interface(computer);

computer.loadProgram([
    "start:",
    "LOAD 100 %C",
    "LOAD 2 %A",
    "LOAD 2 %B",
    "loop:",
    "BLIT %C %A %B",
    "DRAW",
    "ADD 6 %A",
    "CMP 60 %A",
    "JMPMEQ $else",
    "LOAD 2 %A",
    "ADD 6 %B",
    "CMP 60 %B",
    "JMPLEQ $end",
    "else:",
    "JMP $loop",
    "end:",
    "HALT",


].join("\n"));

computer.ram.setMemory(100,
    [
        5, 5,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1
    ]);


window.addEventListener("load", () => {
    webInterface.bind();
    computer.cpu.run();
});
