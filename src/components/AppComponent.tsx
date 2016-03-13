import * as React from "react";
import {ScreenComponent} from "./ScreenComponent";
import {Computer} from "../Computer";

export class AppComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            computer: new Computer()
        };
    }

    public render() {
        return <div className="app">
            <ScreenComponent computer={this.state.computer}/>
        </div>;
    }
}
