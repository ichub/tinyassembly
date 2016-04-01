import {ICachedDrawEvent} from "./CachedDrawEvent";

export class DrawCache implements ICachedDrawEvent {
    private cachedDrawEvents:ICachedDrawEvent[];

    constructor() {
        this.cachedDrawEvents = [];
    }

    public addEvent(event:ICachedDrawEvent) {
        this.cachedDrawEvents.push(event);
    }

    draw(ctx:CanvasRenderingContext2D, graphicsMem:number[], pixelSize:number):void {
        this.cachedDrawEvents.forEach((cachedEvent) => {
            cachedEvent.draw(ctx, graphicsMem, pixelSize);
        });

        this.cachedDrawEvents = [];
    }
}