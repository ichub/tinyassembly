import {Computer} from "./computer";
import {Interface} from "./Interface";
import {RAM} from "./RAM";

const computer = new Computer();
const webInterface = new Interface(computer);

window.addEventListener("load", () => {
    webInterface.bind();
    computer.cpu.runSynchronouslyUntilHalted();
});
