import {Memory} from "./Memory";

export class Graphics extends Memory {
    constructor() {
        super(Graphics.width * Graphics.height);
    }

    public static get width() {
        return 64;
    }

    public static get height() {
        return 64;
    }
}