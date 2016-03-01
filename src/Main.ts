import {Computer} from "./computer";
import {Interface} from "./Interface";

const computer = new Computer();
const webInterface = new Interface(computer);

window.addEventListener("load", () => {
    webInterface.bind();
});
