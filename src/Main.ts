import {Computer} from "./computer";
import {Interface} from "./Interface";
import {RAM} from "./RAM";

const computer = new Computer();
const webInterface = new Interface(computer);

computer.ram.setMemory(RAM.imageRange.low, [1, 0, 1, 0, 1]);

window.addEventListener("load", () => {
    webInterface.bind();
    computer.cpu.step();
});
