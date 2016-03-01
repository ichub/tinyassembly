import {InterfaceHolder} from "./InterfaceHolder";
import {EventName} from "./EventName";

export function eventlistener(selector:string, event:string | EventName) {
    return function (target:InterfaceHolder, key:string, descriptor:PropertyDescriptor):PropertyDescriptor {
        target._binders = target._binders || [];

        target._binders.push((thisarg) => {
            document.querySelector(selector).addEventListener(<string> event, (e) => {
                target[key].apply(thisarg, [e]);
            });
        });

        return descriptor;
    };
}
