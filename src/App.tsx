import * as ReactDom from "react-dom";
/* tslint:disable:no-unused-variable */
import * as React from "react";
/* tslint:enable:no-unused-variable */
import {AppComponent} from "./components/AppComponent";

let hideCover = () => {
    const cover = document.querySelector(".load-cover");
    cover.classList.add("hidden");
    cover.classList.remove("visible");
};

ReactDom.render(
    <AppComponent/>,
    document.getElementById("app-container"),
    () => {
        setTimeout(hideCover, 1000);
    });
