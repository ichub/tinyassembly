import * as React from "react";
import * as classnames from "classnames";
import {IRamRowProps} from "../props/IRamRowProps";
import {MemoryRegion} from "../MemoryRegion";
import {toHex} from "../Bits";
import {TooltipComponent} from "./TooltipComponent";
import {RamRowState, IRamRowState} from "../state/RamRowState";
import {NumberRenderFormat} from "../NumberRenderFormat";

export class RamRowComponent extends React.Component<IRamRowProps, IRamRowState> {
    constructor(props:IRamRowProps) {
        super(props);

        this.state = new RamRowState();
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
        this.setState({
            showTooltip: true
        });

        console.log("asdf");
    }

    private getTooltip() {
        if (this.state.showTooltip) {
            return <TooltipComponent top={0} left={0}/>;
        }

        return;
    }

    private arrayEqual(lhs:number[], rhs:number[]):boolean {
        if (lhs.length != rhs.length) {
            return false;
        }

        for (let i = 0; i < lhs.length; i++) {
            if (lhs[i] != rhs[i]) {
                return false;
            }
        }

        return true;
    }

    private renderNumber(num:number, prepend0x:boolean = false):string {
        if (this.props.numberRenderFormat === NumberRenderFormat.Decimal) {
            return num.toString();
        } else {
            return (prepend0x ? "0x" : "") + toHex(num, 4);
        }
    }

    private stateChanged(nextProps:IRamRowProps) {
        return (
            this.props.isCurrentInstruction !== nextProps.isCurrentInstruction ||
            !this.arrayEqual(this.props.values, nextProps.values) ||
            this.props.numberRenderFormat !== nextProps.numberRenderFormat
        )
    }

    private inViewport(nextProps:IRamRowProps) {
        return nextProps.scrollTop < nextProps.index * 20 && nextProps.index * 20 < nextProps.containerHeight + nextProps.scrollTop;
    }

    public shouldComponentUpdate(nextProps:IRamRowProps, nextState:RamRowState):boolean {
        const nowStateChanged = this.stateChanged(nextProps);

        if ((nowStateChanged || this.state.valuesUpdated) && this.inViewport(nextProps)) {
            this.state.valuesUpdated = nowStateChanged;
            return true;
        }

        this.state.valuesUpdated = nowStateChanged;
        return false;
    }

    public render() {
        const values = this.props.values.map((value, index) => {
            const valueClass = classnames(
                {
                    "zero": value === 0
                }
            );

            return <span className={valueClass} key={index}>{this.renderNumber(value, false) + " "}</span>;
        });

        const rowClass = classnames(
            "ram-row",
            {
                "current": this.props.isCurrentInstruction
            }
        );

        let disassembly;

        if (this.props.regionName === MemoryRegion.Program) {
            disassembly = (
                <span className="disassembly">
                    {this.props.disassembler.disassembleSingleInstruction(this.props.values)}
                </span>
            );
        }

        return (
            <div className={rowClass} onClick={this.handleClick.bind(this)}>
                <span className="offset">{this.renderNumber(this.props.offset, true)}</span>
                <span className={this.regionToClass(this.props.regionName)}>{values}</span>
                {disassembly}
                {this.getTooltip()}
            </div>
        );
    }
}