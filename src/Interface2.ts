import {Logger} from "./logger";
import {Computer} from "./computer";

export class Interface {
    private _computer:Computer;

    constructor(computer:Computer) {
        this._computer = computer;
    }

    public bind() {
        Logger.log("bound interface");

        this._computer.run();
    }
}