import {Computer} from "./computer";

const computer = new Computer();
window.computer = computer;

let register = computer.cpu.registers.A;
register.value = 13134;
console.log(register.value);
console.log(register.getBytesHex());
