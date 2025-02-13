import "./style.css"
import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import CommonEditor from "../editor/CommonEditor";
import CommonButton from "../button/CommonButton";
import modalStore from "../../store/ModalStore";
import TimePicker from "../timepicker/TimePicker";

export default function Modal() {
    // global variable
    const {modalData, closeModal} = modalStore();
    // state : 제목 입력상태
    const [title, setTitle] = useState<string>("");
    // state : 내용 입력 상태
    const [content, setContent] = useState<string>("");
    // state : 년 입력 상태
    const [year , setYear] = useState<number>(0);
    // state : 월 입력 상태
    const [month , setMonth] = useState<number>(0);
    // state : 일 입력 상태
    const [day , setDay] = useState<number>(0);

    // eventHandler : 인풋 체인지 이벤트 헨들러
    const onInputChangeEventHandler = (e: ChangeEvent<HTMLInputElement>,
                                       setter: React.Dispatch<React.SetStateAction<string>>) => {

    }

    const weeks: string[] = ["일", "월", "화", "수", "목", "금", "토"];

    // 년 월 일 요일 파싱
    const parseModalData = useMemo(()=>{
        const [year, month, day, week] = modalData.split('_').map(Number);

        return new Date(year, month , day, week)
    }, [modalData]);


    const getSchedule = ()=>{
        const year = parseModalData.getFullYear();
        const month = parseModalData.getMonth();
        const day = parseModalData.getDate();
        const week= parseModalData.getDay();

        return `${year}년 ${month+1}월 ${day}일 ${weeks[week]}`
    }


    // eventHandler : 모달 닫기 버튼 클릭 이벤트 헨들러
    const onModalCloseBtnClickEventHandler = ()=>{
        closeModal();
    }

    type ModalInputProps = {
        placeHolder?: string,
        value: string,
        onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }

    const ModalInput = (props: ModalInputProps) => {
        const {placeHolder} = props
        return (
            <div id={"modal-input-wrapper"}>
                <input className={"modal-input-element"}
                       type={"text"}
                       placeholder={placeHolder}/>
            </div>
        )
    }

    // 일부 데이터 세팅
    useEffect(() => {
        const year = parseModalData.getFullYear();
        const month = parseModalData.getMonth();
        const day = parseModalData.getDate();

        setYear(year);
        setMonth(month);
        setDay(day);

    }, [parseModalData]);


    return (
        <div id={"modal-wrapper"}>
            <div className={"modal-close-btn-box"}>
                <div className={"image modal-close-btn close-icon"} onClick={onModalCloseBtnClickEventHandler}></div>
            </div>

            <div className={"modal-title-container"}>{"일정 작성하기"}</div>
            <div className={"modal-content-container"}>
                <ModalInput placeHolder={"제목을 입력해 주세요"}
                            value={title}
                            onChange={e => onInputChangeEventHandler(e, setTitle)}/>

                <div className={"modal-schedule-container"}>
                    <div className={"modal-schedule-title-box"}>
                        <div className={"modal-schedule-title"}>{"선택하신 일정"}</div>
                        <div className={"image modal-calender-image calender-icon"}/>
                    </div>

                    <div className={"modal-schedule-box"}>
                        <div className={"modal-schedule-value"}>{getSchedule()}</div>
                        <div className={"modal-schedule-time-picker"}>
                            <TimePicker/>
                        </div>
                    </div>

                </div>

                <div className={"modal-schedule-content-box"}>
                    <div className={"modal-schedule-content-title-box"}>
                        <div className={"modal-schedule-content-title"}>{"내용"}</div>
                        <div className={"image modal-schedule-memo-icon memo-icon"}></div>
                    </div>
                    <CommonEditor value={content} setValue={setContent}/>
                </div>

                <div className={"modal-btn-box"}>
                    <CommonButton size={{width: 120, height: 32}}
                                  buttonName={"작성하기"}/>
                </div>


            </div>


        </div>
    )
}