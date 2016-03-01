import {InterfaceHolder} from "./InterfaceHolder";

export function eventlistener(selector:string, event:string) {
    return function (target:InterfaceHolder, key:string, descriptor:PropertyDescriptor):PropertyDescriptor {
        target._binders = target._binders || [];

        target._binders.push((thisarg) => {
            document.querySelector(selector).addEventListener(event, (e) => {
                target[key].apply(thisarg, [e]);
            });
        });

        return descriptor;
    };
}
