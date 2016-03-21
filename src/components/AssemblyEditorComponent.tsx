import * as React from "react";
import {IAssemblyEditorProps} from "../props/IAssemblyEditorProps";
import {AssemblyEditorState} from "../state/AssemblyEditorState";

export class AssemblyEditorComponent extends React.Component<IAssemblyEditorProps, AssemblyEditorState> {
    public refs:{
        [str:string]:React.Component<any, any> | Element;
        program:HTMLTextAreaElement;
    };

    private handleAssembleButtonClick() {
        const programText = this.refs.program.value;

        this.props.computer.loadProgram(programText);
        this.props.didAssemble();

        this.state = new AssemblyEditorState();
    }

    private getProgramText() {
        return [
            "start:",
            "LOAD #g_char_size %C",
            "MUL 33 %C",
            "ADD #m_static_low %C",
            "LOAD 2 %A",
            "LOAD 2 %B",
            "loop:",
            "BLIT %C %A %B",
            "DRAW",
            "ADD #g_char_width %A",
            "INC %A",
            "CMP 60 %A",
            "JMPMEQ $else",
            "LOAD 2 %A",
            "ADD #g_char_height %B",
            "INC %B",
            "CMP 60 %B",
            "JMPLEQ $end",
            "else:",
            "ADD #g_char_size %C",
            "JMP $loop",
            "end:",
            "HALT",
        ].join("\n");
    }

    render() {
        return (
            <div className="assembly-editor">
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
            </div>
        );
    }
}