import {DrawEventContext} from "./DrawEventContext";

export interface ICachedDrawEvent {
    apply(context:DrawEventContext):void;
}
