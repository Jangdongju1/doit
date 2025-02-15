import "./style.css"
import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import CommonEditor from "../../component/editor/CommonEditor";
import CommonButton from "../../component/button/CommonButton";
import modalStore from "../../store/ModalStore";
import TimePicker from "../../component/timepicker/TimePicker";
import {useCookies} from "react-cookie";
import {ScheduleRegReq} from "../../dto/req";
import {postScheduleRequest} from "../../api/ScheduleApi";
import ScheduleRegRsp from "../../dto/rsp/ScheduleRegRsp";
import ResponseDto from "../../dto/ResponseDto";
import {ResponseCode} from "../../constant/enum/ResponseCode";
import UnderBarStyleInput from "../../component/input/other/UnderBarStyleInput";
import {Schedule} from "../../dto/Type";

type ModalProps ={
    schedules : Schedule[],
    setSchedules  : React.Dispatch<React.SetStateAction<Schedule[]>>
}
export default function Modal(props : ModalProps) {
    const {schedules,setSchedules} = props;
    // global variable
    const {modalData, closeModal} = modalStore();
    // local storage :로그인한 유저의 정보
    const loginUser = sessionStorage.getItem("userSession");
    // cookie 상태
    const [cookies] = useCookies();
    // accesssToken
    const accessToken = cookies.accessToken;
    // state : 제목 입력상태
    const [title, setTitle] = useState<string>("");
    // state : 내용 입력 상태
    const [content, setContent] = useState<string>("");
    // state : 년 입력 상태
    const [year, setYear] = useState<number>(0);
    // state : 월 입력 상태
    const [month, setMonth] = useState<number>(0);
    // state : 일 입력 상태
    const [day, setDay] = useState<number>(0);
    // state : 스케쥴 시작시간
    const [start, setStart] = useState<string>("")
    // state : 스케쥴 끝나는 시간
    const [end, setEnd] = useState<string>("");
    // eventHandler : 인풋 체인지 이벤트 헨들러
    const onInputChangeEventHandler = (e: ChangeEvent<HTMLInputElement>,
                                       setter: React.Dispatch<React.SetStateAction<string>>) => {

        const value = e.target.value;
        setter(value);
    }

    const weeks: string[] = ["일", "월", "화", "수", "목", "금", "토"];

    // 년 월 일 요일 파싱
    const parseModalData = useMemo(() => {
        const [year, month, day, week] = modalData.split('_').map(Number);

        return new Date(year, month, day, week)
    }, [modalData]);


    // function : 스케쥴 등록 요청에 대한 응답처리
    const postScheduleResponse = (response: ScheduleRegRsp | ResponseDto | null) => {
        if (!response) return;

        const {code, message} = response as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message)
            return;
        }

        const {data} = response as ScheduleRegRsp;
        // 상태 업데이트
        const updateState = [...schedules, data.added]
        setSchedules(updateState);
        
        alert("작성되었습니다.")
        closeModal();


    }


    const getSchedule = () => {
        const year = parseModalData.getFullYear();
        const month = parseModalData.getMonth();
        const day = parseModalData.getDate();
        const week = parseModalData.getDay();

        return `${year}년 ${month + 1}월 ${day}일 ${weeks[week]}`
    }


    // eventHandler : 모달 닫기 버튼 클릭 이벤트 헨들러
    const onModalCloseBtnClickEventHandler = () => {
        closeModal();
    }

    // eventHandler : 작성 버튼 클릭 이벤트 헨들러
    const onWriteBtnClickEventHandler = () => {
        if (!accessToken || !loginUser) return;

        if (title.length == 0) {
            alert("제목은 공백일 수 없음");
        }

        const requestBody: ScheduleRegReq = {title, content, year, month, day, start, end, writer: loginUser};
        postScheduleRequest(requestBody, accessToken)
            .then(response => postScheduleResponse(response));

    }


    // 일부 데이터 세팅
    useEffect(() => {
        const year = parseModalData.getFullYear();
        const month = parseModalData.getMonth();
        const day = parseModalData.getDate();

        setYear(year);  // 실제 년도
        setMonth(month);  // 0~11의 값
        setDay(day);   // 실제 일

    }, [parseModalData]);


    return (
        <div id={"modal-wrapper"}>
            <div className={"modal-close-btn-box"}>
                <div className={"image modal-close-btn close-icon"} onClick={onModalCloseBtnClickEventHandler}></div>
            </div>

            <div className={"modal-title-container"}>{"일정 작성하기"}</div>
            <div className={"modal-content-container"}>
                <UnderBarStyleInput placeHolder={"제목을 입력해 주세요"}
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
                            <TimePicker setStart={setStart} setEnd={setEnd}/>
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
                                  buttonName={"작성하기"}
                                  onClick={onWriteBtnClickEventHandler}/>
                </div>


            </div>


        </div>
    )
}