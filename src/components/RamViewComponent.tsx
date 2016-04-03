import * as React from "react";
import {IComputerProps} from "../props/IComputerProps";
import {RAM} from "../RAM";
import {RamRowComponent} from "./RamRowComponent";
import {RamViewState, IRamViewState} from "../state/RamViewState";
import {NumberRenderFormat} from "../NumberRenderFormat";

export class RamViewComponent extends React.Component<IComputerProps, IRamViewState> {
    public refs:{
        [str:string]:React.Component<any, any> | Element;
        rowContainer:HTMLDivElement;
    };

    private rowLength = 4;

    constructor(props:IComputerProps) {
        super(props);

        props.computer.cpu.on("step", () => {
            this.setState({});
        });

        props.computer.cpu.on("run", () => {
            this.forceUpdate();
        });

        props.computer.cpu.on("stop", () => {
            this.forceUpdate();
        });

        this.state = new RamViewState();
        this.state.numberRenderFormat = NumberRenderFormat.Hexadecimal;
    }

    private onNumberMethodRenderChange(e:Event) {
        this.setState({
            numberRenderFormat: parseInt((e.target as HTMLSelectElement).value, 10)
        });
    }

    private onRamScroll(e:Event) {
        this.setState({
            scrollTop: this.refs.rowContainer.scrollTop
        })
    }

    public shouldComponentUpdate(nextProps:IComputerProps, nextState:IRamViewState):boolean {
        return !this.props.computer.cpu.isRunning;
    }

    public render() {
        const ram = this.props.computer.ram;
        const values = [];

        for (let i = 0; i < ram.size; i += this.rowLength) {
            values.push(ram.getMemorySlice(i, this.rowLength));
        }

        const rows = values.map((rowValues:number[], index:number) => {
            const region = RAM.getRangeName(index * this.rowLength);

            return (
                <RamRowComponent
                    scrollTop={this.state.scrollTop}
                    index={index}
                    numberRenderFormat={this.state.numberRenderFormat}
                    containerHeight={window.innerHeight}
                    key={index}
                    values={rowValues}
                    offset={this.rowLength * index}
                    regionName={region}
                    isCurrentInstruction={this.props.computer.cpu.registers.IP.value == index * 4}
                    disassembler={this.props.computer.disassembler}/>
            );
        });

        let cover;

        if (this.props.computer.cpu.isRunning) {
            cover = (
                <div className="cover">

                </div>
            );
        }

        return (
            <div className="ram-view">
                <div
                    ref="rowContainer"
                    onScroll={this.onRamScroll.bind(this)}
                    className="rows">
                    {rows}
                </div>

                {cover}
            </div>
        );
    }
}