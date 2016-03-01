export abstract class InterfaceHolder {
    private _binders;

    public bind():void {
        this._binders.forEach(binder => binder());
    }
}