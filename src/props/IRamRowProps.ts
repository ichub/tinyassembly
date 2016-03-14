import {MemoryRegion} from "../MemoryRegion";

export interface IRamRowProps {
    values:number[];
    offset:number;
    regionName:MemoryRegion;
    isCurrentInstruction:boolean;
}