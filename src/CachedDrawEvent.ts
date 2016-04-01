export interface ICachedDrawEvent {
    draw(ctx:CanvasRenderingContext2D, graphicsMem:number[], pixelWidth, pixelHeight):void;
}