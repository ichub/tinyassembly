import {InterfaceHolder} from "./InterfaceHolder";
import {Binder} from "./Binder";

export function eventlistener(selector:string, event:string):any {
    return function (target:InterfaceHolder, key:string):PropertyDescriptor {
        target.binders = target.binders || [];

        const bindfn = (holder:InterfaceHolder) => {
            const listener = (e:Event) => {
                target[key].apply(holder, [e]);
            };

            document.querySelector(selector).addEventListener(<string> event, listener);

            return (unbindHolder:InterfaceHolder) => {
                document.querySelector(selector).removeEventListener(<string> event, listener);
            };
        };

        const newBinder = new Binder(bindfn);

        target.binders.push(newBinder);

        return {};
    };
}
