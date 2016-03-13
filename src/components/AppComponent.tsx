import * as React from "react";
import {ScreenComponent} from "./ScreenComponent";

export class AppComponent extends React.Component<any, any> {
    public render() {
        return <div className="app">
            <ScreenComponent/>
        </div>
    }
}
