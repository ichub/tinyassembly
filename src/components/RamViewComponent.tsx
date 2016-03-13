import * as React from "react";
import {IComputerProps} from "../props/IComputerProps";
import {RAM} from "../RAM";
import {InstructionSet} from "../InstructionSet";
import {RamRowComponent} from "./RamRowComponent";

export class RamViewComponent extends React.Component<IComputerProps, any> {
    public render() {
        const ram = this.props.computer.ram;
        const values = [];

        for (let i = 0; i < ram.size; i += 4) {
            values.push(ram.getMemorySlice(i, 4));
        }

        const rows = values.map((rowValues:number[], index:number) => {
           return <RamRowComponent key={index} values={rowValues}/>;
        });

        return <div className="ram-view">
            {rows}
        </div>;
    }
}