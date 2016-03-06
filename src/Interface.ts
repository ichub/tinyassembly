import {Logger} from "./logger";
import {Computer} from "./computer";
import {InterfaceHolder} from "./InterfaceHolder";
import {bind} from "./BindDecorator";
import {eventlistener} from "./EventListenerDecorator";
import {EventName} from "./EventName";
import {RAM} from "./RAM";

export class Interface extends InterfaceHolder {
    private _computer:Computer;

    private static programTextAreaSelector = "textarea[name='program']";
    private static assembleButtonSelector = "#assemble";
    private static assemblerOutputSelector = "#assembler-output";
    private static assemblerErrorOutputSelector = "#assembler-error-output";
    private static graphicsSelector = "#graphics";

    private pixels = [];

    @bind(Interface.programTextAreaSelector)
    private _programTextArea:HTMLTextAreaElement;

    @bind(Interface.assembleButtonSelector)
    private _assembleButton:HTMLButtonElement;

    @bind(Interface.assemblerOutputSelector)
    private _assemblerOutput:HTMLDivElement;

    @bind(Interface.assemblerErrorOutputSelector)
    private _assemblerErrorOutput:HTMLDivElement;

    @bind(Interface.graphicsSelector)
    private _graphics:HTMLDivElement;

    constructor(computer:Computer) {
        super();

        this._computer = computer;
        this._computer.cpu.onStep = () => {
            this.updateScreen();
        };
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

    @eventlistener(Interface.assembleButtonSelector, EventName.click)
    private onAssembleButtonClick(e:Event) {
        try {
            this._assemblerOutput.innerText =
                this.stringifyAssembledProgram(this._computer.loadProgram(this._programTextArea.value));

            this._assemblerErrorOutput.innerText = "";
        } catch (e) {
            this._assemblerErrorOutput.innerText = e;
        }
    }

    private makePixel() {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");

        return pixel;
    }

    private updateScreen() {
        for (let i = 0; i < 64; i++) {
            for (let j = 0; j < 64; j++) {

                let memoryCellValue = this._computer.graphics.getCellValue(i * 64 + j);

                if (memoryCellValue === 0) {
                    this.pixels[i * 64 + j].classList.remove("on");
                } else {
                    this.pixels[i * 64 + j].classList.add("on");
                }
            }
        }
    }

    public onBind() {
        for (let i = 0; i < 64; i++) {
            for (let j = 0; j < 64; j++) {
                let pixel = this.makePixel();
                this.pixels.push(pixel);
                this._graphics.appendChild(pixel);
            }
        }
    }
}
