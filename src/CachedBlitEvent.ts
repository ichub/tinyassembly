import {ICachedDrawEvent} from "./CachedDrawEvent";
import {Graphics} from "./Graphics";

export class CachedBlitEvent implements ICachedDrawEvent {
    private x:number;
    private y:number;
    private width:number;
    private height:number;

    constructor(x:number, y:number, width:number, height:number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public draw(ctx:CanvasRenderingContext2D, graphicsMem:number[], pixelSize:number):void {
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; i++) {
                if (graphicsMem[i * Graphics.width + j] === 0) {
                    ctx.clearRect(
                        i * pixelSize,
                        j * pixelSize,
                        pixelSize,
                        pixelSize
                    )
                } else {
                    ctx.fillRect(
                        i * pixelSize,
                        j * pixelSize,
                        pixelSize,
                        pixelSize);
                }
            }
        }
    }
}