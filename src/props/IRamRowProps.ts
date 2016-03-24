import {MemoryRegion} from "../MemoryRegion";
import {Disassembler} from "../Disassembler";
import {NumberRenderFormat} from "../NumberRenderFormat";

export interface IRamRowProps {
    scrollTop:number;
    containerHeight:number;
    index:number;
    disassembler:Disassembler;
    values:number[];
    offset:number;
    regionName:MemoryRegion;
    isCurrentInstruction:boolean;
    numberRenderFormat:NumberRenderFormat;
}