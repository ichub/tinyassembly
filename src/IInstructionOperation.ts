import {Registers} from "./registers";
import {RAM} from "./ram";
import {Flags} from "./Flags";

export interface IInstructionOperation {
    (registers:Registers, flags:Flags, ram:RAM):void;
}