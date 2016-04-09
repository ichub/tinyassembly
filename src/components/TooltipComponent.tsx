import * as React from "react";
import {ITooltipProps} from "../props/ITooltipProps";

export class TooltipComponent extends React.Component<ITooltipProps, any> {
    constructor(props) {
        super(props);
    }

    public getTooltipContainer(contents) {
        const style = {
            left: this.props.left,
            top: this.props.top,
        };

        return (
            <div ref="self" className="tooltip" style={style}>
                {contents}
            </div>
        );
    }

    public getTooltipContents() {
        return <span>contents</span>;
    }

    public render() {
        const contents = this.getTooltipContents();
        const container = this.getTooltipContainer(contents);

        return container;
    }
}
