import {Computer} from "./computer";
import {Interface} from "./Interface";
import {RAM} from "./RAM";

const computer = new Computer();
const webInterface = new Interface(computer);

computer.ram.setMemory(100,
    [
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
    ]);

let mem = 0;
computer.ram.setMemory(mem, [36, 0, 0, 0]);
computer.ram.setMemory(mem += 4, [35, 100, 0, 0]);
computer.ram.setMemory(mem += 4, [37, 0, 0, 0]);
computer.ram.setMemory(mem += 4, [4, 1, 0, 0]);
computer.ram.setMemory(mem += 4, [32, 0, 0, 0]);


window.addEventListener("load", () => {
    webInterface.bind();
    computer.cpu.run();
});
