import {Computer} from "./computer";
import {RAM} from "./RAM";
import {TextInitializer} from "./TextInitializer";
import * as ReactDom from "react-dom";
import * as React from "react";
import {AppComponent} from "./components/AppComponent";

const computer = new Computer();

computer.loadProgram([
    "start:",
    "LOAD " + RAM.staticRange.low + TextInitializer.charSize * 33 + " %C",
    "LOAD 2 %A",
    "LOAD 2 %B",
    "loop:",
    "BLIT %C %A %B",
    "DRAW",
    "ADD " + (TextInitializer.charWidth + 1) + " %A",
    "CMP 60 %A",
    "JMPMEQ $else",
    "LOAD 2 %A",
    "ADD " + (TextInitializer.charHeight + 1) + " %B",
    "CMP 60 %B",
    "JMPLEQ $end",
    "else:",
    "ADD " + TextInitializer.charSize + " %C",
    "JMP $loop",
    "end:",
    "HALT",
].join("\n"));

window.addEventListener("load", () => {
    computer.cpu.run();

    ReactDom.render(<AppComponent/>, document.getElementById("app-container"));
});
