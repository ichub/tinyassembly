import * as React from "react";
import {IComputerProps} from "../props/IComputerProps";
import {RAM} from "../RAM";
import {InstructionSet} from "../InstructionSet";
import {RamRowComponent} from "./RamRowComponent";

export class RamViewComponent extends React.Component<IComputerProps, any> {
    private rowLength = 4;

    constructor(props:IComputerProps) {
        super(props);

        props.computer.cpu.on("step", () => {
            this.forceUpdate();
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

            return <RamRowComponent
                key={index}
                values={rowValues}
                offset={this.rowLength * index}
                regionName={region}
                isCurrentInstruction={this.props.computer.cpu.registers.IP.value == index * 4}
                disassembler={this.props.computer.disassembler}/>;
        });

        return <div className="ram-view">
            {rows}
        </div>;
    }
}