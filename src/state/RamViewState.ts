import {NumberRenderFormat} from "../NumberRenderFormat";

export class RamViewState {
    public numberRenderFormat:NumberRenderFormat;

    constructor() {
        this.numberRenderFormat = NumberRenderFormat.Hexadecimal;
    }
}