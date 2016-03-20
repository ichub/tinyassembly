import * as React from "react";
import * as classnames from "classnames";
import {IRamRowProps} from "../props/IRamRowProps";
import {MemoryRegion} from "../MemoryRegion";
import {toHex} from "../Bits";
import {TooltipComponent} from "./TooltipComponent";
import {IRamRowState} from "../state/IRamRowState";

export class RamRowComponent extends React.Component<IRamRowProps, IRamRowState> {
    constructor(props:IRamRowProps) {
        super(props);

        this.state = {
            showTooltip: false
        }
    }

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

    private handleClick() {
        this.setState({showTooltip: true});

        console.log("asdf");
    }

    private getTooltip() {
        if (this.state.showTooltip) {
            return <TooltipComponent top={0} left={0}/>;
        }

        return;
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

        let disassembly;

        if (this.props.regionName === MemoryRegion.Program) {
            disassembly = <span className="disassembly">
                {this.props.disassembler.disassembleSingleInstruction(this.props.values)}
            </span>;
        }


        return <div className={rowClass} onClick={this.handleClick.bind(this)}>
            <span className="offset">{"0x" + toHex(this.props.offset, 4)}</span>
            <span className={this.regionToClass(this.props.regionName)}>{values}</span>
            {disassembly}
            {this.getTooltip()}
        </div>;
    }
}