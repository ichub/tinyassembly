import {InterfaceHolder} from "./InterfaceHolder";

export function bind(selector:string) {
    return function (target:InterfaceHolder, key:string, descriptor:PropertyDescriptor):PropertyDescriptor {
        target._binders = target._binders || [];

        target._binders.push(() => {
            target[key] = document.querySelector(selector);
        });

        return descriptor;
    };
}
