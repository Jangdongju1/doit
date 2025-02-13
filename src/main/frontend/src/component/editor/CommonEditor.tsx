import "./style.css"
import React, {useMemo} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


type EditorProps = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function CommonEditor(props: EditorProps) {

    const {value, setValue} = props

    const modules: {} = useMemo(() => ({
        toolbar: {
            container: [
                [{header: [1, 2, 3, 4, 5, false]}],
                [{font: []}],
                [{color: []}],
                ["bold", "underline"],
                [{list: 'ordered'}, {list: 'bullet'}],

            ]
        }
    }), []);


    return (
        <div id={"editor-wrapper"}>
            <ReactQuill theme={"snow"}
                        modules={modules}
                        value={value}
                        placeholder={"내용을 입력 하세요"}
                        onChange={setValue}/>
        </div>


    )
}