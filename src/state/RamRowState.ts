export interface IRamRowState {
    showTooltip?:boolean;
    valuesUpdated?:boolean;
}

export class RamRowState implements IRamRowState {
    showTooltip:boolean;
    valuesUpdated:boolean;

    constructor() {
        this.showTooltip = false;
        this.valuesUpdated = false;
    }
}