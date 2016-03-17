import * as React from "react";
import {IAssemblyEditorProps} from "../props/IAssemblyEditorProps";

export class AssemblyEditorComponent extends React.Component<IAssemblyEditorProps, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return <div className="assembly-editor">
            assembler
        </div>;
    }
}