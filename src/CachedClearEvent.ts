import {ICachedDrawEvent} from "./CachedDrawEvent";
import {DrawEventContext} from "./DrawEventContext";

export class CachedClearEvent implements ICachedDrawEvent {
    public apply(context:DrawEventContext):void {
        context.ctx.clearRect(0, 0, context.widthInVirtualPixels * context.pixelSizeInScreenPixels, context.heightInVirtualPixels * context.pixelSizeInScreenPixels);
    }
}