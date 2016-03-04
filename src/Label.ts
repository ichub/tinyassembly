export class Label {
    private _name:string;
    private _instructionLocation:number;

    constructor(name:string, instructionLocation:number) {
        this._name = name;
        this._instructionLocation = instructionLocation;
    }

    get name():string {
        return this._name;
    }

    get instructionLocation():number {
        return this._instructionLocation;
    }
}