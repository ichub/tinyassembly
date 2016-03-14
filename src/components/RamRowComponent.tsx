import * as React from "react";
import * as classnames from "classnames";
import {IRamRowProps} from "../props/IRamRowProps";
import {MemoryRegion} from "../MemoryRegion";

export class RamRowComponent extends React.Component<IRamRowProps, any> {
    private regionToClass(region:MemoryRegion):string {
        switch (region) {
            case MemoryRegion.Program:
                return "range-program";
            case MemoryRegion.Stack:
                return "range-stack";
            case MemoryRegion.Static:
                return "range-static"
        }
    }

    public render() {
        const cssClasses = classnames(
            this.regionToClass(this.props.regionName)
        );

        const values = this.props.values.map(value => {
            return value + " ";
        });

        return <div className="ram-row">
            <span className="offset">{this.props.offset}</span>
            <span className={cssClasses}>{values}</span>
        </div>;
    }
}