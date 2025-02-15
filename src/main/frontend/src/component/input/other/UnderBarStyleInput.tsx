import "./style.css"
import React, {ChangeEvent} from "react";

// type : 모달 인풋용 props
type ModalInputProps = {
    placeHolder?: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export default function UnderBarStyleInput(props : ModalInputProps){
    const {placeHolder, value,onChange} = props

    return (
        <div id={"modal-input-wrapper"}>
            <input className={"modal-input-element"}
                   type={"text"}
                   value={value}
                   onChange={onChange}
                   placeholder={placeHolder}/>
        </div>
    )

}