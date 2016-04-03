import * as React from "react";
import * as classnames from "classnames";
import {IComputerProps} from "../props/IComputerProps";
import {Graphics} from "../Graphics";
import {ICachedDrawEvent} from "../CachedDrawEvent";
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

    private getCanvasWidth() {
        return this.pixelSize * Graphics.width;
    }

    private getCanvasHeight() {
        return this.pixelSize * Graphics.height;
    }

    private componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");

        this.setupCanvas();
        this.mounted = true;
    }

    private componentWillUnmount() {
        this.mounted = false;
    }

    private setupCanvas() {
        this.refs.canvas.width = this.getCanvasWidth();
        this.refs.canvas.height = this.getCanvasHeight();
    }

    private updateCanvas() {
        /*
        for (let i = 0; i < Graphics.width; i++) {
            for (let j = 0; j < Graphics.height; j++) {
                if (this.rawGraphicsMem[i * Graphics.width + j] === 0) {
                    this.ctx.clearRect(
                        i * this.pixelSize,
                        j * this.pixelSize,
                        this.pixelSize,
                        this.pixelSize
                    )
                } else {
                    this.ctx.fillRect(
                        i * this.pixelSize,
                        j * this.pixelSize,
                        this.pixelSize,
                        this.pixelSize);
                }
            }
        }*/

        this.drawCache.apply(new DrawEventContext(this.ctx, Graphics.width, Graphics.height, this.pixelSize, this.rawGraphicsMem));
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
}