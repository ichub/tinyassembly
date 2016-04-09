export class DrawEventContext {
    private _ctx:CanvasRenderingContext2D;
    private _widthInVirtualPixels:number;
    private _heightInVirtualPixels:number;
    private _pixelSizeInScreenPixels:number;
    private _graphicsMemory:number[];

    constructor(ctx:CanvasRenderingContext2D,
                widthInVirtualPixels:number,
                heightInVirtualPixels:number,
                pixelSizeInScreenPixels:number,
                graphicsMemory:number[]) {
        this._ctx = ctx;
        this._widthInVirtualPixels = widthInVirtualPixels;
        this._heightInVirtualPixels = heightInVirtualPixels;
        this._pixelSizeInScreenPixels = pixelSizeInScreenPixels;
        this._graphicsMemory = graphicsMemory;
    }

    get ctx():CanvasRenderingContext2D {
        return this._ctx;
    }

    get widthInVirtualPixels():number {
        return this._widthInVirtualPixels;
    }

    get heightInVirtualPixels():number {
        return this._heightInVirtualPixels;
    }

    get pixelSizeInScreenPixels():number {
        return this._pixelSizeInScreenPixels;
    }

    get graphicsMemory():number[] {
        return this._graphicsMemory;
    }
}
