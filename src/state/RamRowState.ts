export interface IRamRowState {
    showTooltip?:boolean;
    stateChanged?:boolean;
}

export class RamRowState implements IRamRowState {
    public showTooltip:boolean;
    public valuesUpdated:boolean;

    constructor() {
        this.showTooltip = false;
        this.valuesUpdated = false;
    }
}
