import * as React from "react";
import * as classnames from "classnames";
import {IRamRowProps} from "../props/IRamRowProps";
import {MemoryRegion} from "../MemoryRegion";
import {toHex} from "../Bits";

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
        const values = this.props.values.map((value, index) => {
            const valueClass = classnames(
                {
                    "zero": value === 0
                }
            );

            return <span className={valueClass} key={index}>{toHex(value, 4) + " "}</span>;
        });

        const rowClass = classnames(
            "ram-row",
            {
                "current": this.props.isCurrentInstruction
            }
        );

        return <div className={rowClass}>
            <span className="offset">{"0x" + toHex(this.props.offset, 4)}</span>
            <span className={this.regionToClass(this.props.regionName)}>{values}</span>
            <span className="disassembly">{this.props.disassembler.disassembleSingleInstruction(this.props.values)}</span>
        </div>;
    }
}