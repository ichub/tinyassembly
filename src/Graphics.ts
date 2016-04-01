import {Memory} from "./Memory";
import {DrawCache} from "./DrawCache";

export class Graphics extends Memory {
    private _drawCache:DrawCache;

    constructor() {
        super(Graphics.memorySize);
        this._drawCache = new DrawCache();
    }

    public static get memorySize() {
        return Graphics.width * Graphics.height;
    }

    public static get width() {
        return 64;
    }

    public static get height() {
        return 64;
    }

    get drawCache():DrawCache {
        return this._drawCache;
    }
}
