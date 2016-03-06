import {Computer} from "./computer";
import {Interface} from "./Interface";
import {RAM} from "./RAM";

const computer = new Computer();
const webInterface = new Interface(computer);

computer.graphics.setMemory(0, [1, 1, 0, 0, 1, 1, 0, 0, 1, 1]);

window.addEventListener("load", () => {
    webInterface.bind();
    computer.cpu.runSynchronouslyUntilHalted();
});
