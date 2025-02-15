import "./style.css";
import useCalender from "../../hook/Calender";
import {useEffect, useState, MouseEvent, useMemo} from "react";
import {addMonths, getDay, getMonth, getYear, subMonths} from "date-fns";
import modalStore from "../../store/ModalStore";
import Modal from "../modal/modal";
import {getScheduleList} from "../../api/ScheduleApi";
import {useCookies} from "react-cookie";
import {ScheduleListRsp} from "../../dto/rsp";
import ResponseDto from "../../dto/ResponseDto";
import {ResponseCode} from "../../constant/enum/ResponseCode";
import {Schedule} from "../../dto/Type";
import DOMPurify from "dompurify";
import {useNavigate} from "react-router-dom";
import {EDIT_PATH} from "../../constant/path";


export default function Main() {
    // navigate : 네비게이트함수
    const navigator = useNavigate();
    // global state : 모달 상태
    const {
        modalType,
        isModalOpen,
        openModal,
        closeModal,
        setModalData
    } = modalStore();
    // custom hook : 커스텀 캘린더 훅
    const {
        currentDate,
        setCurrentDate,
        currentCalender,
        calenderKeys
    } = useCalender(new Date());
    // state : 캘린더 랜더  상태
    const [calenderRender, setCalenderRender] = useState<boolean>(false);
    // variable : 요일관련 변수
    const weeks: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // 로그인 한 유저의 아이디
    const loginUser = sessionStorage.getItem("userSession");

    // accessToken
    const [cookies] = useCookies();
    const accessToken = cookies.accessToken;

    // state : 캘린더 데이터 상태
    const [schedules, setSchedules] = useState<Schedule[]>([]);


    // useMemo : 캘린더 데이터  자료구조화
    const scheduleMap = useMemo(() => {
        const map = new Map<string, Schedule[]>;

        schedules.forEach(schedule => {
            const date = new Date(schedule.year, schedule.month, schedule.day);
            const day = date.getDay();

            const key = `${schedule.year}_${schedule.month}_${schedule.day}_${day}`;

            if (map.has(key)) {
                map.get(key)?.push(schedule);
            } else {
                map.set(key, [schedule]); // 새로운 날짜라면 새 배열로 추가
            }
        })

        return map;
    }, [schedules]);


    // function : 현재 날짜의 달력이 아닌 것을 찾는 함수
    const isCurrentDate = (key: string): boolean => {
        // key  == 년도_월_일_요일
        const currentMonth = getMonth(currentDate);
        const keyItems: string[] = key.split("_");
        const month = parseInt(keyItems[1], 10); //

        return currentMonth === month;
    }


    // function : 스케쥴 리스트 요청에 대한 응답 처리함수.
    const getScheduleListResponse = (response: ScheduleListRsp | ResponseDto | null) => {
        if (!response) return;

        const {message, code} = response as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }


        const {data} = response as ScheduleListRsp;


        setSchedules(data.scheduleList);

    }
    // function:  주말의 경우를 찾는 함수
    const isWeekend = (key: string): boolean => {
        // key  == 년도_월_일_요일
        const keyItems: string[] = key.split("_");
        const day = keyItems[keyItems.length - 1]; // 맨마지막 요소가 요일을 나타냄
        return parseInt(day, 10) === 0;
    }

    // eventHandler : 이전 날짜 클릭 이벤트 헨들러
    const onPrevBtnClickEventHandler = () => {
        setCurrentDate(prevState => subMonths(prevState, 1));
    }

    // eventHandler : 다음 날짜 클릭 이벤트 헨들러
    const onNextBtnClickEventHandler = () => {
        setCurrentDate(prevState => addMonths(prevState, 1));
    }

    // function:  캘린더의 주말 및 평일을 구분 하여 색을 반환하는 함수
    const getCalenderColor = (key: string) => {
        if (!isCurrentDate(key)) return "rgba(0,0,0,0.3)"
        else if (isWeekend(key)) return "rgba(255,0,0,1)"

        return ""
    }


    // eventHandler : 날짜 클릭시 실행할 함수.
    const onDateClickEventHandler = (e: MouseEvent<HTMLDivElement>) => {
        let element = e.target as HTMLDivElement;
        const className = element.className;
        let data = element.dataset.calenderKey;

        if (className === "calender-schedule-item") return;
        // 자식을 클릭하는 경우 데이터 세팅이 안됨.
        if (className !== "calender-item-box") {
            const parent = element.closest('.calender-item-box') as HTMLDivElement;

            if (!parent) return;

            data = parent.dataset.calenderKey;

        }

        setModalData(data);
        openModal("");
    }

    type ScheduleCompProps = {
        scheduleData: Schedule,
    }
    // component : 캘린더 스케쥴 컴포넌트
    const CalenderScheduleComp = (props: ScheduleCompProps) => {
        const {scheduleData} = props;
        // state : schedule 클릭상태
        const [clickScheduleState, setScheduleClickState] = useState<boolean>(false);

        const weeks: string[] = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        // 요일 값 얻어오기
        const dayValue = getDay(new Date(scheduleData.year, scheduleData.month, scheduleData.day));
        // dangerousSetInnerHTMl 에 대한 보안처리
        const sanitizedContent = DOMPurify().sanitize(scheduleData.content)

        // 시간값은 조건부로 넣기
        const getTime= ()=>{
            if (scheduleData.start.length !== 0  && scheduleData.end) {
                return `${scheduleData.start} ~ ${scheduleData.end}`;
            }

            return ""
        }
        // eventHandler : 스케쥴 클릭  이벤트 헨들러
        const onScheduleClickEventHandler = (e: MouseEvent<HTMLDivElement>) => {
            setScheduleClickState(prevState => !prevState);
            e.stopPropagation();
        }

        //eventHandler : 자식 요소 이벤트 전파 방지
        const onPreventEventBubble = (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        }

        // eventHandler : 디테일 닫기 버튼 클릭 이벤트 헨들러
        const onEventDetailCloseBtnClickEventHandler = () => {
            setScheduleClickState(false);
        }

        // eventHandler : 수정버튼 클릭 이벤트 헨들러
        const onEditBtnClickEventHandler = ()=>{
            const sequence  = scheduleData.sequence;

            if (!sequence) return;
            navigator(EDIT_PATH(String(sequence)));
        }

        return (
            <div className={"calender-schedule-item-wrapper"} onClick={(e) => onScheduleClickEventHandler(e)}>
                <div className={"calender-schedule-item"}>{`${scheduleData.start} ${scheduleData.title}`}</div>


                {clickScheduleState && (
                    <div className={"calender-schedule-detail"} onClick={e => onPreventEventBubble(e)}>
                        <div className={"calender-schedule-detail-close-box"}>
                            <div className={"image calender-schedule-detail-icons edit-icon"} onClick={onEditBtnClickEventHandler}/>
                            <div className={"image calender-schedule-detail-icons delete-icon"}/>
                            <div className={"image calender-schedule-detail-icons close-icon"}
                                 onClick={onEventDetailCloseBtnClickEventHandler}/>
                        </div>

                        <div className={"calender-schedule-detail-title-box"}>
                            <div className={"calender-schedule-detail-title"}>{scheduleData.title}</div>
                            <div className={"calender-schedule-detail-datetime"}>
                                {`${scheduleData.year}년 ${scheduleData.month + 1}월${scheduleData.day}일(${weeks[dayValue]}) `+ getTime()}
                            </div>
                        </div>
                        <div className={"calender-schedule-detail-content"}
                             dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>

                    </div>)}

            </div>
        )
    }
    // 캘린더 훅 호출 여부 확인
    useEffect(() => {
        setCalenderRender(true);
    }, [currentCalender, calenderKeys]);

    // fetchData : 일정 리스트 요청
    useEffect(() => {
        if (!accessToken) return;
        // 현재 년월
        const year = String(currentDate.getFullYear());
        const month = String(currentDate.getMonth());
        getScheduleList(year, month, accessToken).then(response => getScheduleListResponse(response));
        console.log('d')

    }, [currentDate]);

    return (
        <div id={"main-wrapper"}>
            {isModalOpen && (<Modal schedules={schedules} setSchedules={setSchedules}/>)}
            <div className={"main-top-container"}>
                <div className={"main-top-title-box"}>
                    <div className={"main-top-title"}>{"Schedule Calender"}</div>
                    <div className={"image main-top-icon calender-icon"}/>
                </div>

                <div className={"main-top-app-detail"}>
                    <div>{`${loginUser ? atob(loginUser) : ""}님 반갑습니다.`}</div>
                    <div>{"일정이 있으신 날짜를 클릭하시고 일정을 등록해 보세요."}</div>
                </div>

            </div>
            <div className={"main-bottom-container"}>
                <div className={"main-bottom-yearmonth-box"}>
                    <div className={"image main-bottom-btn arrow-left-icon"} onClick={onPrevBtnClickEventHandler}/>
                    <div className={"image main-bottom-btn arrow-right-icon"} onClick={onNextBtnClickEventHandler}/>
                    <div className={"main-bottom-calender-yearmonth"}>
                        {`${getYear(currentDate)}년 ${getMonth(currentDate) + 1}월`}
                    </div>
                </div>
                <div className={"main-bottom-calender-week"}>
                    {weeks.map((value, index) => <div key={index} className={"week-item"}>{value}</div>)}
                </div>
                <div className={"main-bottom-calender-box"}>
                    {calenderRender ? currentCalender.map((value, index) =>
                        <div key={calenderKeys[index]}
                             className={"calender-item-box"}
                             onClick={onDateClickEventHandler}
                             data-calender-key={calenderKeys[index]}>
                            <div className={"calender-day"} style={{
                                color: getCalenderColor(calenderKeys[index])
                            }}>{value}</div>

                            <div className={"calender-schedule"}>
                                {(scheduleMap.get(calenderKeys[index]) || []).map((value, index) => (
                                    <CalenderScheduleComp key={value.sequence} scheduleData={value}/>
                                ))}
                            </div>
                        </div>) : null}
                </div>

            </div>
        </div>
    )
}