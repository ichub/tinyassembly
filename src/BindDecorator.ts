import {InterfaceHolder} from "./InterfaceHolder";
import {Binder} from "./Binder";

export function bind(selector:string):any {
    return function (target:InterfaceHolder, key:string):PropertyDescriptor {
        target.binders = target.binders || [];

        const bindfn = (holder:InterfaceHolder) => {
            target[key] = document.querySelector(selector);

            return null;
        };

        target.binders.push(new Binder(bindfn));

    };
}
