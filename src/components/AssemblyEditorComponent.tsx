import * as React from "react";
import {IAssemblyEditorProps} from "../props/IAssemblyEditorProps";
import {IAssemblyEditorState} from "../state/IAssemblyEditorState";
import {TextInitializer} from "../TextInitializer";
import {RAM} from "../RAM";

export class AssemblyEditorComponent extends React.Component<IAssemblyEditorProps, IAssemblyEditorState> {
    private refs:{
        [str:string]:string;
        program:HTMLTextAreaElement;
    };

    private handleAssembleButtonClick() {
        const programText = this.refs.program.value;

        this.props.computer.loadProgram(programText);
        this.props.didAssemble();
    }

    private getProgramText() {
        return [
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
        ].join("\n");
    }

    render() {
        return <div className="assembly-editor">
            assembler
            <br/>
            <textarea
                className="assembler-text"
                ref="program"
                cols="30"
                rows="10"
                defaultValue={this.getProgramText()}></textarea>
            <br/>
            <button onClick={this.handleAssembleButtonClick.bind(this)}>assemble</button>
        </div>;
    }
}