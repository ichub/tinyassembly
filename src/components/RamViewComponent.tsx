import * as React from "react";
import {IComputerProps} from "../props/IComputerProps";
import {RAM} from "../RAM";
import {RamRowComponent} from "./RamRowComponent";
import {RamViewState} from "../state/RamViewState";
import {NumberRenderFormat} from "../NumberRenderFormat";

export class RamViewComponent extends React.Component<IComputerProps, RamViewState> {
    private rowLength = 4;

    constructor(props:IComputerProps) {
        super(props);

        props.computer.cpu.on("step", () => {
            this.forceUpdate();
        });

        this.state = new RamViewState();
    }

    private onNumberMethodRenderChange(e:Event) {
        this.setState({
            numberRenderFormat: parseInt((e.target as HTMLSelectElement).value, 10)
        });
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
                    numberRenderFormat={this.state.numberRenderFormat}
                    key={index}
                    values={rowValues}
                    offset={this.rowLength * index}
                    regionName={region}
                    isCurrentInstruction={this.props.computer.cpu.registers.IP.value == index * 4}
                    disassembler={this.props.computer.disassembler}/>
            );
        });

        return (
            <div className="ram-view">
                <div className="header">
                    <select ref="number-render-method" onChange={this.onNumberMethodRenderChange.bind(this)}>
                        <option value={NumberRenderFormat.Hexadecimal}>hex</option>
                        <option value={NumberRenderFormat.Decimal}>decimal</option>
                    </select>
                </div>

                <div className="rows">
                    {rows}
                </div>
            </div>
        );
    }
}