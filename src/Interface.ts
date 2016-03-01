import {Logger} from "./logger";
import {Computer} from "./computer";
import {InterfaceHolder} from "./InterfaceHolder";
import {bind} from "./BindDecorator";
import {eventlistener} from "./EventListenerDecorator";

export class Interface extends InterfaceHolder {
    private _computer:Computer;

    private static programTextAreaSelector = "textarea[name='program']";
    private static assembleButtonSelector = "#assemble";
    private static assemblerOutputSelector = "#assembler-output";
    private static assemblerErrorOutputSelector = "#assembler-error-output";

    @bind(Interface.programTextAreaSelector)
    private _programTextArea:HTMLTextAreaElement;

    @bind(Interface.assembleButtonSelector)
    private _assembleButton:HTMLButtonElement;

    @bind(Interface.assemblerOutputSelector)
    private _assemblerOutput:HTMLDivElement;

    @bind(Interface.assemblerErrorOutputSelector)
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

    @eventlistener(Interface.assembleButtonSelector, "click")
    private onAssembleButtonClick(e:Event) {
        try {
            this._assemblerOutput.innerText =
                this.stringifyAssembledProgram(this._computer.loadProgram(this._programTextArea.value));

            this._assemblerErrorOutput.innerText = "";
        } catch (e) {
            this._assemblerErrorOutput.innerText = e;
        }
    }
}
