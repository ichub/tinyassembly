import * as React from "react";
import {ScreenComponent} from "./ScreenComponent";
import {RamViewComponent} from "./RamViewComponent";
import {RegistersComponent} from "./RegistersComponent";
import {Computer} from "../Computer";
import {TextInitializer} from "../TextInitializer";
import {RAM} from "../RAM";

export class AppComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const computer = new Computer();
        computer.loadProgram([
            "start:",
            "LOAD " + RAM.staticRange.low + TextInitializer.charSize * 33 + " %C",
            "LOAD 2 %A",
            "LOAD 2 %B",
            "loop:",
            "BLIT %C %A %B",
            "DRAW",
            "ADD " + (TextInitializer.charWidth + 1) + " %A",
            "CMP 60 %A",
            "JMPMEQ $else",
            "LOAD 2 %A",
            "ADD " + (TextInitializer.charHeight + 1) + " %B",
            "CMP 60 %B",
            "JMPLEQ $end",
            "else:",
            "ADD " + TextInitializer.charSize + " %C",
            "JMP $loop",
            "end:",
            "HALT",
        ].join("\n"));

        this.state = {
            computer: computer
        };
    }

    public handleRunClick() {
        this.state.computer.run();
        console.log("running");
    }

    public handleResetClick() {
        this.state.computer.reset();

        this.forceUpdate();
    }

    public handleStopClick() {
        this.state.computer.stop();
    }

    public handleStepClick() {
        this.state.computer.step();
    }

    public render() {
        return <div className="app">
            <ScreenComponent computer={this.state.computer}/>
            <button onClick={this.handleRunClick.bind(this)}>run</button>
            <button onClick={this.handleResetClick.bind(this)}>reset</button>
            <button onClick={this.handleStopClick.bind(this)}>stop</button>
            <button onClick={this.handleStepClick.bind(this)}>step</button>
            <RamViewComponent computer={this.state.computer}/>
            <RegistersComponent computer={this.state.computer}/>
        </div>;
    }
}
