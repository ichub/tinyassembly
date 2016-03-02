import {InterfaceHolder} from "./InterfaceHolder";

export class Binder {
    private _bind:(holder:InterfaceHolder) => (holder:InterfaceHolder) => void;
    private _unbind:(holder:InterfaceHolder) => void;

    constructor(bind:(holder:InterfaceHolder) => (holder:InterfaceHolder) => void) {
        this._bind = bind;
        this._unbind = null;
    }

    public bind(holder:InterfaceHolder):void {
        if (this._unbind !== null) {
            throw "cannot bind before unbinding";
        }

        this._unbind = this._bind(holder);
    }

    public unbind(holder:InterfaceHolder):void {
        if (this._unbind === null) {
            throw "cannot unbind before binding";
        }

        this._unbind(holder);
        this._unbind = null;
    }
}
