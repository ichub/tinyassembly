import {NumberRenderFormat} from "../NumberRenderFormat";

export interface IRamViewState {
    numberRenderFormat?:NumberRenderFormat;
    scrollTop?:number;
}

export class RamViewState implements IRamViewState {
    numberRenderFormat:NumberRenderFormat;
    scrollTop:number;

    constructor() {
        this.numberRenderFormat = NumberRenderFormat.Hexadecimal;
    }
}