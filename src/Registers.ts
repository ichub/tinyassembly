import {Register} from "./register";
import {ignoreCaseEquals} from "./Strings";
import {RAM} from "./RAM";

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
    private _SP:Register = new Register("SP");
    private _map:Register[];

    constructor() {
        this._SP.value = RAM.stackRange.low;
        this._IP.value = RAM.programRange.low;
        this._map = Object.freeze([
            this._A,
            this._B,
            this._C,
            this._D,
            this._E,
            this._F,
            this._G,
            this._IP,
            this._SP,
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

    get SP():Register {
        return this._SP;
    }

    get map():Register[] {
        return this._map;
    }

    public static findRegisterNumberByName(name:string):number {
        for (let i = 0; i < Registers._registers.length; i++) {
            if (ignoreCaseEquals(Registers._registers[i], name)) {
                return i;
            }
        }

        throw "could not find register with that name";
    }

    public static findRegisterNameByNumber(number:number):string {
        return Registers._registers[number];
    }

    public findByName(registerName:string) {
        for (let i = 0; i < this._map.length; i++) {
            if (ignoreCaseEquals(this._map[i].name, registerName)) {
                return this._map[i];
            }
        }

        throw "could not find register with that name";
    }

    public zeroOut():void {
        for (let i = 0; i < this._map.length; i++) {
            this._map[i].value = 0;
        }

        this._IP.value = RAM.programRange.low;
        this._SP.value = RAM.stackRange.low;
    }

    public static get registers() {
        return Registers._registers;
    }
}
