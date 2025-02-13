import "./style.css"
import React, {useEffect, useState} from "react";
import useTimePicker from "../../hook/TimePicker";

export default function TimePicker() {

    // custom hook : 타임피커 시간 배열
    const {
        startTime,
        endTime,
        setEndTime,
        setStartTime,
        startOptions,
        endOptions
    } = useTimePicker();

    // const [isRender, setIsRender] = useState<boolean>(false);


    // state : 타임피커 start data 상태
    const [startClickState, setStartClickState] = useState<boolean>(false);
    // state : 타임피커 end data 상태
    const [endClickState, setEndClickState] = useState<boolean>(false);


    // eventHandler : start picker클릭 이벤트 헨들러
    const onPickerClickEventHandler = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prevState => !prevState);
    }
    // eventHandler : start option 클릭시 이벤트 헨들러
    const onStartOptionClickEventHandler = (value: string) => {
        setStartTime(value);
        setStartClickState(false)
    }

    // eventHandler : start option 클릭시 이벤트 헨들러
    const onEndOptionClickEventHandler = (value: string) => {
        setEndTime(value);
        setEndClickState(false)
    }


    type OptionProps = {
        options: string[]
        onClick: (value: string) => void
    }


    const PickerOption = (props: OptionProps) => {
        const {options, onClick} = props;
        return (
            <div id={"picker-option-wrapper"}>
                {options.map(value =>
                    <div className={"picker-option-item"} onClick={() => onClick(value)}>
                        {value}
                    </div>)}
            </div>
        )
    }

    //
    // useEffect(() => {
    //     setIsRender(true);
    // }, [startOptions]);
    return (
        <div id={"time-picker-wrapper"}>
            <div className={"time-picker-container"}
                 onClick={() => onPickerClickEventHandler(setStartClickState)}>{startTime}</div>
            -
            <div className={"time-picker-container"} onClick={() => onPickerClickEventHandler(setEndClickState)}>{endTime}</div>

            {startClickState && (
                <div className={"time-picker-option-start"}>
                    <PickerOption options={startOptions}
                                  onClick={onStartOptionClickEventHandler}/>
                </div>)}

            {endClickState && (<div className={"time-picker-option-end"}>
                <PickerOption options={endOptions}
                              onClick={onEndOptionClickEventHandler}/>
            </div>)}
        </div>
    )
}