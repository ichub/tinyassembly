import {ICachedDrawEvent} from "./CachedDrawEvent";

export class DrawCache {
    private cachedDrawEvents:ICachedDrawEvent[];

    constructor() {
        this.cachedDrawEvents = [];
    }

    public clearEvents() {
        this.cachedDrawEvents = [];
    }

    public addEvent(event:ICachedDrawEvent) {
        this.cachedDrawEvents.push(event);
    }

    public iterateOverEvents(processor:(evt:ICachedDrawEvent) => void) {
        this.cachedDrawEvents.forEach(processor);
    }
}