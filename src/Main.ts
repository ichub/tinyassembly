import {Computer} from "./computer";
import {Interface} from "./Interface";
import {RAM} from "./RAM";
import {TextInitializer} from "./TextInitializer";

const computer = new Computer();
const webInterface = new Interface(computer);

computer.loadProgram([
    "start:",
    "LOAD " + RAM.staticRange.low + TextInitializer.charSize * 33 + " %C",
    "LOAD 2 %A",
    "LOAD 2 %B",
    "loop:",
    "BLIT %C %A %B",
    "DRAW",
    "ADD " + (TextInitializer.charWidth + 1) + " %A",
    "CMP 60 %A",
    "JMPMEQ $else",
    "LOAD 2 %A",
    "ADD " + (TextInitializer.charHeight + 1) + " %B",
    "CMP 60 %B",
    "JMPLEQ $end",
    "else:",
    "ADD " + TextInitializer.charSize + " %C",
    "JMP $loop",
    "end:",
    "HALT",


].join("\n"));

window.addEventListener("load", () => {
    webInterface.bind();
    computer.cpu.run();
});
