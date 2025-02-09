import "./style.css";
import {MouseEvent} from "react";

type CommonBtnProps = {
    size?: { width: number, height: number },
    colorOption?: {
        buttonColor: string,
        buttonNameColor: string
        hoverColor?: string,
    }
    buttonName?: string,
    onClick?: () => void
}
export default function CommonButton(props: CommonBtnProps) {
    const {buttonName, colorOption, size} = props;
    const {onClick} = props;
    const defaultSize = {width: 120, height: 32};

    const defaultColorOption = {
        buttonColor: "#0C66E4",
        buttonNameColor: "rgba(255,255,255,1)",
        hoverColor: "#0052CC"
    }

    const getSize = () => {
        return size ? size : defaultSize;
    }

    const getColorOption = () => {
        return colorOption ? colorOption : defaultColorOption;
    }

    // eventHandler : 마우스 Enter시 버튼 색변경
    const onMouseEnterEventHandler = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const hoverColor = getColorOption().hoverColor;
        if (!target || !hoverColor) return;
        target.style.backgroundColor = hoverColor;
    }

    // eventHandler : 마우스 Leave시 새상은 원상태로
    const onMouseLeaveEventHandler = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const color = getColorOption().buttonColor;

        if (!target) return;
        target.style.backgroundColor = color;

    }


    return (
        <div id={"common-btn-wrapper"}
             style={{
                 width: getSize().width,
                 height: getSize().height,
                 backgroundColor: getColorOption().buttonColor,
                 color: getColorOption().buttonNameColor
             }}
             onMouseEnter={onMouseEnterEventHandler}
             onMouseLeave={onMouseLeaveEventHandler}
        onClick={onClick? onClick : () => console.log(buttonName + " 버튼클릭")}>

            {buttonName ? buttonName : "button"}
        </div>
    )
}