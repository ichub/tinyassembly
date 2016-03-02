import {InterfaceHolder} from "./InterfaceHolder";
import {Binder} from "./Binder";

export function bind(selector:string) {
    return function (target:InterfaceHolder, key:string, descriptor:PropertyDescriptor):PropertyDescriptor {
        target._binders = target._binders || [];

        const bindfn = (holder:InterfaceHolder) => {
            target[key] = document.querySelector(selector);

            return null;
        };

        target._binders.push(new Binder(bindfn));

        return descriptor;
    };
}
