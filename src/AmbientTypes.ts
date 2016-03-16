interface ArrayConstructor {
    from<T, U>(arr:Array<T>, transform:(val:T) => U);
}

declare module "events" {
    export abstract class EventEmitter {
        public emit(event:string):void;
        public on(event:string, handler:Function):void;
    }
}