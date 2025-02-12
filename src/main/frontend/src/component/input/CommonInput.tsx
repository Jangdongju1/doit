import "./style.css";
import React, {ChangeEvent} from "react";

type CommonInputProps = {
    size?: { width: number, height: number }
    label?: string,
    icon?: string,
    type: string,
    placeholder?: string,
    name? : string
    value: string,
    isError?: boolean,
    errorMessage?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
}
export default function CommonInput(props: CommonInputProps) {
    const {
        size,
        label,
        type,
        placeholder,
        name,
        icon,
        isError,
        errorMessage
    } = props
    const {value, onClick, onChange} = props;

    // default size : px 이라는 단위는 붙이지 않아도 자동으로 처리가 된다.
    const defaultSize = {width: 200, height: 32};

    const getSize = () => {
        return size ? size : defaultSize;
    }
    const getBorderColor = () => {
        if (isError != undefined) {
            if (isError) return "1px solid red"
        }
        return "1px solid rgba(0,0,0,0.3)"
    }


    return (
        <div id={"common-input-wrapper"}>
            {label && (<div className={"common-input-label"}>{label}</div>)}
            <div className={"common-input-container"} style={{
                width: getSize().width,
                height: getSize().height,
                border: getBorderColor()
            }}>
                <input className={"common-input-element"}
                       type={type}
                       name={name? name : ""}
                       placeholder={placeholder ? placeholder : ""}
                       value={value}
                       onChange={onChange}/>

                {icon && (<div className={`image common-input-password-confirm-icon ${icon}`}
                               onClick={onClick ? onClick : () => {}}></div>)}
            </div>
            {isError && errorMessage && (<span className={"common-input-error-message"}>{errorMessage}</span>)}
        </div>

    )
}