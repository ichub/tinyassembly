import * as React from "react";
import {IComputerProps} from "../props/IComputerProps";
import {Register} from "../Register";
import {toHex} from "../Bits";

export class RegistersComponent extends React.Component<IComputerProps, any> {
    constructor(props:IComputerProps) {
        super(props);

        props.computer.cpu.on("step", () => {
            this.forceUpdate();
        });
    }

    public render() {
        const registers = this.props.computer.cpu.registers.map.map((reg:Register) => {
            return (
                <div key={reg.name}>
                    <span>{reg.name}: </span>
                    <span>{toHex(reg.value, 4)}</span>
                </div>
            );
        });

        return (
            <div className="registers-view">
                {registers}
            </div>
        );
    }
}
