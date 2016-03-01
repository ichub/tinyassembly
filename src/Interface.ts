import {Logger} from "./logger";
import {Computer} from "./computer";
import {InterfaceHolder} from "./InterfaceHolder";
import {bind} from "./BindDecorator";

export class Interface extends InterfaceHolder {
    private _computer:Computer;

    @bind("textarea[name='program']")
    private _programTextArea:HTMLTextAreaElement;

    @bind("#assemble")
    private _assembleButton:HTMLButtonElement;

    @bind("#assembler-output")
    private _assemblerOutput:HTMLDivElement;

    @bind("#assembler-error-output")
    private _assemblerErrorOutput:HTMLDivElement;

    constructor(computer:Computer) {
        super();

        this._computer = computer;
    }

    private stringifyAssembledProgram(program:number[]):string {
        let stringified = "";

        for (let i = 0; i < program.length; i++) {
            stringified += program[i] + " ";

            if (i % this._computer.cpu.instructionSet.instructionLength ===
                this._computer.cpu.instructionSet.instructionLength - 1) {
                stringified += "\n";
            }
        }

        return stringified;
    }

    private onAssembleButtonClick(e:Event) {
        try {
            this._assemblerOutput.innerText =
                this.stringifyAssembledProgram(this._computer.loadProgram(this._programTextArea.value));

            this._assemblerErrorOutput.innerText = "";
        } catch (e) {
            this._assemblerErrorOutput.innerText = e;
        }
    }

    private bindListeners() {
        this._assembleButton.addEventListener("click", (e) => {
            this.onAssembleButtonClick(e);
        });
    }
}
