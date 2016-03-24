import {NumberRenderFormat} from "../NumberRenderFormat";

export class RamViewState {
    public numberRenderFormat:NumberRenderFormat;
    public scrollTop:number;

    constructor() {
        this.numberRenderFormat = NumberRenderFormat.Hexadecimal;
    }
}