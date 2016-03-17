import {MemoryRegion} from "../MemoryRegion";
import {Disassembler} from "../Disassembler";

export interface IRamRowProps {
    disassembler:Disassembler;
    values:number[];
    offset:number;
    regionName:MemoryRegion;
    isCurrentInstruction:boolean;
}