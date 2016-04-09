import * as React from "react";
import {IComputerProps} from "../props/IComputerProps";
import {Graphics} from "../Graphics";
import {DrawCache} from "../DrawCache";
import {DrawEventContext} from "../DrawEventContext";

export class ScreenComponent extends React.Component<IComputerProps, any> {
    public refs:{
        [str:string]:React.Component<any, any> | Element;
        canvas:HTMLCanvasElement;
    };

    private drawCache:DrawCache;
    private rawGraphicsMem:number[];
    private ctx:CanvasRenderingContext2D;
    private pixelSize:number = 5;
    private mounted = false;

    constructor(props:IComputerProps) {
        super(props);

        this.rawGraphicsMem = this.props.computer.graphics.raw;
        this.drawCache = this.props.computer.graphics.drawCache;

        this.props.computer.cpu.on("draw", () => {
            this.updateCanvas();
        });
    }

    public render() {
        if (this.mounted) {
            this.updateCanvas();
        }

        return (
            <div className="screen">
                <canvas
                    ref="canvas"
                    width={this.getCanvasWidth()}
                    height={this.getCanvasHeight()}></canvas>
            </div>
        );
    }

    private getCanvasWidth() {
        return this.pixelSize * Graphics.width;
    }

    private getCanvasHeight() {
        return this.pixelSize * Graphics.height;
    }

    /* tslint:disable:no-unused-variable */
    private componentDidMount() {
        /* tslint:enable:no-unused-variable */

        this.ctx = this.refs.canvas.getContext("2d");

        this.setupCanvas();
        this.mounted = true;
    }

    /* tslint:disable:no-unused-variable */
    private componentWillUnmount() {
        /* tslint:enable:no-unused-variable */
        this.mounted = false;
    }


    private setupCanvas() {
        this.refs.canvas.width = this.getCanvasWidth();
        this.refs.canvas.height = this.getCanvasHeight();
    }

    private updateCanvas() {
        this.drawCache.apply(new DrawEventContext(this.ctx, Graphics.width, Graphics.height, this.pixelSize, this.rawGraphicsMem));
    }
}
