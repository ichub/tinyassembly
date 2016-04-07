import * as React from "react";
import {ScreenComponent} from "./ScreenComponent";
import {RamViewComponent} from "./RamViewComponent";
import {RegistersComponent} from "./RegistersComponent";
import {FlagsComponent} from "./FlagsComponent";
import {Computer} from "../Computer";
import {AssemblyEditorComponent} from "./AssemblyEditorComponent";

export class AppComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const computer = new Computer();

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

        this.forceUpdate();
    }

    public handleStepClick() {
        this.state.computer.step();
    }

    public onAssemble() {
        this.forceUpdate();
    }

    public render() {
        return (
            <div className="app">
                <RamViewComponent computer={this.state.computer}/>
                <ScreenComponent computer={this.state.computer}/>
                <AssemblyEditorComponent computer={this.state.computer} didAssemble={this.onAssemble.bind(this)}/>
                <RegistersComponent computer={this.state.computer}/>
                <FlagsComponent computer={this.state.computer}/>
                <button onClick={this.handleRunClick.bind(this)}>run</button>
                <button onClick={this.handleResetClick.bind(this)}>reset</button>
                <button onClick={this.handleStopClick.bind(this)}>stop</button>
                <button onClick={this.handleStepClick.bind(this)}>step</button>
            </div>
        );
    }
}
