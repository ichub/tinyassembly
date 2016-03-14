import * as React from "react";
import * as classnames from "classnames";
import {IComputerProps} from "../props/IComputerProps";
import {Graphics} from "../Graphics";

export class ScreenComponent extends React.Component<IComputerProps, any> {
    constructor(props:IComputerProps) {
        super(props);

        this.props.computer.cpu.on("draw", () => {
            this.forceUpdate();
        });
    }

    public render() {
        let pixels = this
            .props
            .computer
            .graphics
            .getMemorySlice(0, Graphics.memorySize)
            .map((value:number, index:number) => {
                let cssClasses = classnames(
                    "pixel",
                    {
                        "on": value > 0
                    }
                );

                return <div className={cssClasses} key={index}></div>;
            });

        return <div className="screen">
            {pixels}
        </div>;
    }
}