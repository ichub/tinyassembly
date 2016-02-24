import {Computer} from "./computer";
import {Interface} from "./Interface";

const computer = new Computer();

computer.ram.setMemory(0, [
    2,
    0,
    50,
    0,
    0,
]);

const webInterface = new Interface(computer);

window.addEventListener("load", () => {
    webInterface.bind();
});