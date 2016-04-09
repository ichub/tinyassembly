/* tslint:disable:no-unused-variable */
import * as React from "react";
/* tslint:enable:no-unused-variable */
import * as benchmark from "benchmark";
import {Computer} from "../Computer";
import {mount} from "enzyme";
import {ScreenComponent} from "../components/ScreenComponent";
import {loadVirtualDOM} from "../TestUtils";

loadVirtualDOM();

const suite = new benchmark.Suite("screen component");

const computer = new Computer();
const ramView = mount(<ScreenComponent computer={computer}/>);

suite.add("update", () => {
    ramView.update();
});

export = suite;
