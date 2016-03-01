import {Register} from "./register";

export class Registers {
    private static _registers:string[] = Object.freeze(["A", "B", "C", "D", "E", "F", "G", "IP"]);

    private _A:Register = new Register("A");
    private _B:Register = new Register("B");
    private _C:Register = new Register("C");
    private _D:Register = new Register("D");
    private _E:Register = new Register("E");
    private _F:Register = new Register("F");
    private _G:Register = new Register("G");
    private _IP:Register = new Register("IP");
    private _map:Register[];

    constructor() {
        this._map = Object.freeze([
            this._A,
            this._B,
            this._C,
            this._D,
            this._E,
            this._F,
            this._G,
            this._IP
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

    public findByName(registerName:string) {
        for (let i = 0; i < this._map.length; i++) {
            if (this._map[i].name == registerName) {
                return this._map[i];
            }
        }

        throw "could not find register with that name";
    }

    public zeroOut():void {
        for (let i = 0; i < this._map.length; i++) {
            this._map[i].value = 0;
        }
    }

    public static get registers() {
        return Registers._registers;
    }
}
