import * as benchmark from "benchmark";
import {Computer} from "../Computer";

const suite = new benchmark.Suite("startup");

suite.add("new computer", () => {
    new Computer();
});

export = suite;