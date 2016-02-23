import {Registers} from "./registers";
import {RAM} from "./ram";

export interface IInstructionOperation {
    (registers:Registers, ram:RAM):void;
}