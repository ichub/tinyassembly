import * as React from "react";
import * as classnames from "classnames";
import {IComputerProps} from "../props/IComputerProps";
import {toHex} from "../Bits";

export class FlagsComponent extends React.Component<IComputerProps, any> {
    constructor(props:IComputerProps) {
        super(props);

        props.computer.cpu.on("step", () => {
            this.forceUpdate();
        });
    }

    public render() {
        const flags = [];

        for (let flagName in this.props.computer.cpu.flags) {
            if (this.props.computer.cpu.flags.hasOwnProperty(flagName)) {

                const flag = <div key={flagName}>
                    <span>{flagName}:</span>
                    <span>{this.props.computer.cpu.flags[flagName].toString()}</span>
                </div>;

                flags.push(flag);
            }
        }

        return <div className="flags-view">
            {flags}
        </div>;
    }
}