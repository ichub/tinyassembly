import {Logger} from "./logger";
import {Computer} from "./computer";

export class Interface {
    private _computer:Computer;
    private _programTextArea:HTMLTextAreaElement;
    private _assembleButton:HTMLButtonElement;
    private _assemblerOutput:HTMLDivElement;
    private _assemblerErrorOutput:HTMLDivElement;

    constructor(computer:Computer) {
        this._computer = computer;
    }

    private onAssembleButtonClick(e:Event) {
        try {
            this._assemblerOutput.innerText = this._computer.loadProgram(this._programTextArea.value).join(" ");
        } catch (e) {
            this._assemblerErrorOutput.innerText = e;
        }
    }

    public bind() {
        this._programTextArea = <HTMLTextAreaElement> document.querySelector("textarea[name='program']");
        this._assembleButton = <HTMLButtonElement> document.querySelector("#assemble");
        this._assemblerOutput = <HTMLDivElement> document.querySelector("#assembler-output");
        this._assemblerErrorOutput = <HTMLDivElement> document.querySelector("#assembler-error-output");

        this.bindListeners();
    }

    private bindListeners() {
        this._assembleButton.addEventListener("click", (e) => {
            this.onAssembleButtonClick(e);
        });
    }
}
