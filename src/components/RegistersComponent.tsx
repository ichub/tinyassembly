import * as React from "react";
import * as classnames from "classnames";
import {IComputerProps} from "../props/IComputerProps";

export class RegistersComponent extends React.Component<IComputerProps, any> {
    constructor(props:IComputerProps) {
        super(props);
    }

    public render() {
        return <div className="registers-view"></div>;
    }
}