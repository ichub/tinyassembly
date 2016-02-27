import {Register} from "./register";

export class Registers {
    private _A:Register = new Register("A");
    private _B:Register = new Register("B");
    private _C:Register = new Register("C");
    private _D:Register = new Register("D");
    private _E:Register = new Register("E");
    private _F:Register = new Register("F");
    private _G:Register = new Register("G");
    private _IP:Register = new Register("IP");
    private _map:{[index:number]:Register};

    constructor() {
        this._map = Object.freeze([
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

    get map():{} {
        return this._map;
    }
}
