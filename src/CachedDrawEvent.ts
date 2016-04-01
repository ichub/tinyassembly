export interface ICachedDrawEvent {
    draw(ctx:CanvasRenderingContext2D, graphicsMem:number[], pixelSize:number):void;
}