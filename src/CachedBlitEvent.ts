import {ICachedDrawEvent} from "./CachedDrawEvent";
import {Graphics} from "./Graphics";
import {DrawEventContext} from "./DrawEventContext";

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

    public apply(context:DrawEventContext):void {
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                let actualPixelX = i % Graphics.width;
                let actualPixelY = j % Graphics.height;

                if (context.graphicsMemory[actualPixelY * Graphics.width + actualPixelX] === 0) {
                    context.ctx.clearRect(
                        actualPixelX * context.pixelSizeInScreenPixels,
                        actualPixelY * context.pixelSizeInScreenPixels,
                        context.pixelSizeInScreenPixels,
                        context.pixelSizeInScreenPixels
                    );
                } else {
                    context.ctx.fillRect(
                        actualPixelX * context.pixelSizeInScreenPixels,
                        actualPixelY * context.pixelSizeInScreenPixels,
                        context.pixelSizeInScreenPixels,
                        context.pixelSizeInScreenPixels
                    );
                }
            }
        }
    }
}
