import {CPU} from "./cpu";

export interface IInstructionOperation {
    (cpu:CPU):void;
}