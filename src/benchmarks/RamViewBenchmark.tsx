import * as React from "react";
import * as benchmark from "benchmark";
import {Computer} from "../Computer";
import {mount} from "enzyme";
import {RamViewComponent} from "../components/RamViewComponent";
import {loadVirtualDOM} from "../TestUtils";

loadVirtualDOM();

const suite = new benchmark.Suite("ram view component");

const computer = new Computer();
const ramView = mount(<RamViewComponent computer={computer}/>);

suite.add("update", () => {
    ramView.update();
});

export = suite;