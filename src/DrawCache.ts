import {ICachedDrawEvent} from "./CachedDrawEvent";
import {DrawEventContext} from "./DrawEventContext";
import {CachedClearEvent} from "./CachedClearEvent";

export class DrawCache implements ICachedDrawEvent {
    private cachedDrawEvents:ICachedDrawEvent[];

    constructor() {
        this.cachedDrawEvents = [];
    }

    public addEvent(event:ICachedDrawEvent) {
        this.cachedDrawEvents.push(event);
    }

    private optimizeDrawEvents():void {
        // remove all events before the last clear event
        for (let i = this.cachedDrawEvents.length; i > 0; i--) {
            if (this.cachedDrawEvents[i] instanceof CachedClearEvent) {
                this.cachedDrawEvents = this.cachedDrawEvents.slice(i);
                break;
            }
        }
    }

    public apply(context:DrawEventContext):void {
        this.optimizeDrawEvents();

        this.cachedDrawEvents.forEach((cachedEvent) => {
            cachedEvent.apply(context);
        });

        this.cachedDrawEvents = [];
    }
}