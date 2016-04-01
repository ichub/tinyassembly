import {ICachedDrawEvent} from "./CachedDrawEvent";
import {DrawEventContext} from "./DrawEventContext";

export class DrawCache implements ICachedDrawEvent {
    private cachedDrawEvents:ICachedDrawEvent[];

    constructor() {
        this.cachedDrawEvents = [];
    }

    public addEvent(event:ICachedDrawEvent) {
        this.cachedDrawEvents.push(event);
    }

    public apply(context:DrawEventContext):void {
        this.cachedDrawEvents.forEach((cachedEvent) => {
            cachedEvent.apply(context);
        });

        this.cachedDrawEvents = [];
    }
}