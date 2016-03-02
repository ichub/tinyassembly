import {InterfaceHolder} from "./InterfaceHolder";
import {EventName} from "./EventName";
import {Binder} from "./Binder";

export function eventlistener(selector:string, event:string | EventName) {
    return function (target:InterfaceHolder, key:string, descriptor:PropertyDescriptor):PropertyDescriptor {
        target._binders = target._binders || [];

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

        target._binders.push(newBinder);

        return descriptor;
    };
}
