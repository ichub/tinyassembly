import {Register} from "./register";

export class Registers {
    private _A:Register = new Register();
    private _B:Register = new Register();
    private _C:Register = new Register();
    private _D:Register = new Register();
    private _E:Register = new Register();
    private _F:Register = new Register();
    private _G:Register = new Register();
    private _IP:Register = new Register();
    private _registerMap:{[index:number]:Register};

    constructor() {
        this._registerMap = Object.freeze([
            this._A,
            this._B,
            this._C,
            this._D,
            this._E,
            this._F,
            this._G
        ]);
    }

    get A():Register {
        return this._A;
    }

    get B():Register {
        return this._B;
    }

    get C():Register {
        return this._C;
    }

    get D():Register {
        return this._D;
    }

    get E():Register {
        return this._E;
    }

    get F():Register {
        return this._F;
    }

    get G():Register {
        return this._G;
    }

    get IP():Register {
        return this._IP;
    }

    get registerMap():{} {
        return this._registerMap;
    }
}
