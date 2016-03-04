export class Flags {
    public halt:boolean = false;
    public jumped:boolean = false;
    public equal:boolean = false;
    public less:boolean = false;
    public more:boolean = false;

    public zeroOut() {
        this.halt = false;
        this.jumped = false;
        this.equal = false;
        this.less = false;
        this.more = false;
    }
}
