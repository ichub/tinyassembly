import {Binder} from "./Binder";

export abstract class InterfaceHolder {
    private _binders:Binder[];

    public bind():void {
        this._binders.forEach(binder => binder.bind(this));
    }

    public unbind():void {
        this._binders.forEach(binder => binder.unbind(this));
    }
}