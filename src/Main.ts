import {Computer} from "./computer";
import {Interface} from "./Interface";
import {RAM} from "./RAM";

const computer = new Computer();
const webInterface = new Interface(computer);

computer.ram.setMemory(
    RAM.dataRange.low,
    [
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
    ]);
computer.ram.setMemory(RAM.programRange.low, [34, RAM.dataRange.low, 5, 5]);

window.addEventListener("load", () => {
    webInterface.bind();
    computer.cpu.runSynchronouslyUntilHalted();
});
