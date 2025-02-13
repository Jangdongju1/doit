import "./style.css";
import useCalender from "../../hook/Calender";
import {useEffect, useState, MouseEvent} from "react";
import {addMonths, getMonth, getYear, subMonths} from "date-fns";
import modalStore from "../../store/ModalStore";
import Modal from "../../component/modal/modal";

export default function Main() {
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


    // function : 현재 날짜의 달력이 아닌 것을 찾는 함수
    const isCurrentDate = (key: string): boolean => {
        // key  == 년도_월_일_요일
        const currentMonth = getMonth(currentDate);
        const keyItems: string[] = key.split("_");
        const month = parseInt(keyItems[1], 10); //

        return currentMonth === month;
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
        // 자식을 클릭하는 경우 데이터 세팅이 안됨.
        if (className !== "calender-item-box") {
            const parent = element.closest('.calender-item-box') as HTMLDivElement;

            if (!parent) return;

            data = parent.dataset.calenderKey;

        }


        setModalData(data);
        openModal("");
    }

    useEffect(() => {
        setCalenderRender(true);
    }, [currentCalender, calenderKeys]);


    return (
        <div id={"main-wrapper"}>
            {isModalOpen && (<Modal/>)}
            <div className={"main-top-container"}>
                <div className={"main-top-title-box"}>
                    <div className={"main-top-title"}>{"Schedule Calender"}</div>
                    <div className={"image main-top-icon calender-icon"}/>
                </div>

                <div className={"main-top-app-detail"}>
                    <div>{"jdj881204님 반갑습니다."}</div>
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
                        </div>) : null}
                </div>

            </div>
        </div>
    )
}