import * as React from "react";
import {IRamRowProps} from "../props/IRamRowProps";

export class RamRowComponent extends React.Component<IRamRowProps, any> {
    public render() {
        return <div className="ram-row">
            {this.props.values.map(value => {
                return value + " ";
                })}

        </div>;
    }
}