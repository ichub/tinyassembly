import {Computer} from "./computer";
import {Interface} from "./Interface";

const computer = new Computer();
const webInterface = new Interface(computer);

window.addEventListener("load", () => {
    webInterface.bind();
});


const comp = new Computer();
const left = 123;
const right = 456;

comp.cpu.registers.A.value = left;
comp.cpu.registers.B.value = right;
comp.ram.setMemory(0, [3, 0, 1, 2]);
comp.cpu.step();
