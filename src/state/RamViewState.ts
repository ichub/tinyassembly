import {NumberRenderFormat} from "../NumberRenderFormat";

export interface IRamViewState {
    numberRenderFormat?:NumberRenderFormat;
    scrollTop?:number;
}

export class RamViewState implements IRamViewState {
    public numberRenderFormat:NumberRenderFormat;
    public scrollTop:number;

    constructor() {
        this.numberRenderFormat = NumberRenderFormat.Hexadecimal;
    }
}
