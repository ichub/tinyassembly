import * as benchmark from "benchmark";
import {Computer} from "../Computer";

const suite = new benchmark.Suite("startup");

suite.add("new computer", () => {
    /* tslint:disable:no-unused-variable */
    let instance = new Computer();
    /* tslint:enable:no-unused-variable */
});

export = suite;
