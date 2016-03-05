import {Binder} from "./Binder";

export abstract class InterfaceHolder {
    public binders:Binder[];

    public bind():void {
        this.binders.forEach(binder => binder.bind(this));
        this.onBind();
    }

    public unbind():void {
        this.binders.forEach(binder => binder.unbind(this));
    }

    public onBind():void {

    }
}