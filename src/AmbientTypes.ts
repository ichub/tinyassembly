interface ArrayConstructor {
    from<T, U>(arr:Array<T>, transform:(val:T) => U);
}

declare module "livereload" {
    export function createServer();

    interface ILiveReloadServer {
        watch(dir:string);
    }
}