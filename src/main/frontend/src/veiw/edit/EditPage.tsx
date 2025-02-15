import "./style.css"
import UnderBarStyleInput from "../../component/input/other/UnderBarStyleInput";
import React, {ChangeEvent, useEffect, useState} from "react";
import TimePicker from "../../component/timepicker/TimePicker";
import CommonEditor from "../../component/editor/CommonEditor";
import CommonButton from "../../component/button/CommonButton";
import {useNavigate, useParams} from "react-router-dom";
import {MAIN_PATH} from "../../constant/path";
import {useCookies} from "react-cookie";
import {getSchedule} from "../../api/ScheduleApi";
import {ScheduleRsp} from "../../dto/rsp";
import ResponseDto from "../../dto/ResponseDto";
import {ResponseCode} from "../../constant/enum/ResponseCode";

export default function EditPage() {
    // navigate : 네비게이트 함수
    const  navigator = useNavigate();
    // path variable
    const {sequence} = useParams();
    // accessToken
    const [cookies] = useCookies();
    const  accessToken  = cookies.accessToken;
    // login user
    const loginUser = sessionStorage.getItem("userSession");

    // state : 제목 상태
    const [title, setTitle] = useState<string>("");
    // state : 년도 상태
    const [year ,setYear] = useState<number>(0 );
    // state : 달 상태
    const [month, setMonth] = useState<number>(0);
    // state : 일 상태
    const [day, setDay] = useState<number>(0 );

    // state : 시작시간
    const [start, setStart] = useState<string>("");
    // state : 끝나는시간
    const [end, setEnd] = useState<string>("");
    // state : 내용
    const [content , setContent] = useState<string>("");


    // function : 수정할 스케쥴데이터 요청에 대한 응답처리
    const ScheduleResponse = (response: ScheduleRsp | ResponseDto | null) =>{
        if (!response) return;

        const {code,message} = response as ResponseDto;

        if (code !== ResponseCode.SUCCESS){
            alert(message);
            return;
        }

        const {data} = response as ScheduleRsp;

        setTitle(data.schedule.title);
        setContent(data.schedule.content);
        setYear(data.schedule.year);
        setMonth(data.schedule.month);
        setDay(data.schedule.day);
        setStart(data.schedule.start);
        setEnd(data.schedule.end)

    }
    //eventHandler : 인폿에 대한 체인지 이벤트
    const onTitleInputChangeEventHandler = (e: ChangeEvent<HTMLInputElement>,
                                            setter: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value;

        setter(value);
    }

    //eventHandler : x 버튼 클릭 이벤트 헨들러
    const onBackBtnClickEventHandler = ()=>{
        navigator(MAIN_PATH);
    }

    // fetchData;
    useEffect(() => {
        if (!accessToken || !loginUser || !sequence) return;
        getSchedule(sequence, accessToken).then(response => ScheduleResponse(response))


    }, [sequence]);

    return (
        <div id={"edit-page-wrapper"}>
            <div className={"edit-page-left-container"}>
                <div className={"edit-page-title"}>{"스케쥴을 수정합니다."}</div>

                <div className={"edit-page-schedule-title-container"}>

                    <div className={"edit-page-back-icon-background"} onClick={onBackBtnClickEventHandler}>
                        <div className={"image edit-page-back-icon close-icon"}></div>
                    </div>

                    <div className={"edit-page-schedule-title-box"}>
                        <UnderBarStyleInput value={title} onChange={e => onTitleInputChangeEventHandler(e, setTitle)}/>
                    </div>
                </div>

                <div className={"edit-page-schedule-small-title-box"}>
                    <div className={"edit-page-schedule-small-title"}>{"선택하신 일정"}</div>
                    <div className={"image edit-page-calender-icon calender-icon"}></div>
                </div>

                <div className={"edit-page-schedule-date-container"}>
                    <div className={"edit-page-schedule-date-box"}>
                        <div className={"edit-page-schedule-date"}>{`${year}년 ${month+1}월${day}일`}</div>
                        <div className={"edit-page-schedule-time"}>
                            <TimePicker setStart={setStart} setEnd={setEnd} defaultStart={start}
                                        defaultEnd={end}/>
                        </div>
                    </div>
                </div>


                <div className={"edit-page-content-container"}>
                    <div className={"edit-page-content-box"}>
                        <CommonEditor value={content} setValue={setContent}/>
                    </div>

                </div>


            </div>
            <div className={"edit-page-right-container"}>
                <div className={"edit-page-right-btn-box"}>
                    <CommonButton size={{width: 120, height: 32}}
                                  buttonName={"수정하기"}
                                  />
                </div>
            </div>
        </div>
    )
}