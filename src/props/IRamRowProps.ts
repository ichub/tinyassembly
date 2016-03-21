import {MemoryRegion} from "../MemoryRegion";
import {Disassembler} from "../Disassembler";
import {NumberRenderFormat} from "../NumberRenderFormat";

export interface IRamRowProps {
    disassembler:Disassembler;
    values:number[];
    offset:number;
    regionName:MemoryRegion;
    isCurrentInstruction:boolean;
    numberRenderFormat:NumberRenderFormat;
}