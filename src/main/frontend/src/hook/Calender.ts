import {useEffect, useState} from "react";
import {
    addMonths,
    endOfMonth,
    getDate,
    getDay,
    getDaysInMonth,
    getMonth,
    getYear,
    startOfMonth,
    subMonths
} from "date-fns";


const CALENDER_LENGTH = 42;

const useCalender = (date: Date) => {
    const [currentDate, setCurrentDate] = useState<Date>(date);
    const [currentCalender, setCurrentCalender]=useState<number[]>([]);
    const [calenderKeys, setCalenderKeys]=useState<string[]>([]);
    const totalDays = getDaysInMonth(currentDate);  // 해당 월의 일 수 를 가져옴
    //현재의 날짜로부터 1달전의 날짜.
    const prevDate = subMonths(currentDate, 1);
    const nextDate = addMonths(currentDate,1);


    // 현재 달의 전체 일 수를 배열로 반환함
    const currentArr = Array.from({length: totalDays}).map(
        (_, i) => i + 1,
    );


    // 표기될 전달의 배열을 구함
    const prevDayList = () => {
        const prevArr: number[] = []

        const start = getDay(startOfMonth(currentDate)); // 매달 의 첫날이 무슨 요일인지 구함
        const prevEnd = getDate(endOfMonth(prevDate));  // 전달의 마지막날
        //const trashSize = Math.max(0, start - 1);  // 빈공간의 크기
        const trashSize = start-1;
        // 달력에서 빈공간이 남지 않는 경우  ==  월요일부터 1일인 경우에는 빈 배열을 반환한다.
        if(trashSize < 0) return [];

        for (let i = prevEnd - trashSize; i <= prevEnd; i++) {
            prevArr.push(i);
        }

        return prevArr;
    }

    // 전달의 날자에 대한 key 배열을 만듬
    const getKeys =(date: Date, prevArr:number[])=>{
        // key == 년도 + 월 + 일 + 요일
        const prevKeyArr : string[] = [];
        const year = getYear(date);
        const month = getMonth(date);  //* 0~11

        for (const item of prevArr){
            let day  = getDay(new Date(year,month,item));  //* 0~6
            let key = `${year}_${month}_${item}_${day}`;   // 템플릿 리터럴을 사용한 문자열화
            prevKeyArr.push(key);
        }

        return prevKeyArr;

    }


    // // 표기될 다음 달의 배열을 구함
    const nextDayList = (prevArr : number[]) => {
        const nextArr: number[] = [];
        // 달력의 빈공간의 갯수
        const vacuumQuantity = CALENDER_LENGTH - currentArr.length - prevArr.length;

        for (let i = 1; i <= vacuumQuantity; i++) {
            nextArr.push(i);
        }
        return nextArr;
    }

    useEffect(() => {
        // prevArr, currentDayList, nextArr 한 번에 계산 후 상태 업데이트
        const prevArr = prevDayList();
        const nextArr = nextDayList(prevArr);
        // 전체 날짜에 대한 배열을 제작.
        const fullCalendar = [...prevArr, ...currentArr, ...nextArr];

        const prevKeys = getKeys(prevDate, prevArr);
        const currentKeys = getKeys(currentDate, currentArr);
        const nextKeys = getKeys(nextDate, nextArr);

        const fullKeys=[...prevKeys, ...currentKeys, ...nextKeys];



        setCalenderKeys(fullKeys);
        setCurrentCalender(fullCalendar); // 한 번에 상태 업데이트
    }, [currentDate]); // currentDate가 변경될 때마다 달력 갱신

    useEffect(() => {
    }, [currentCalender]); // calendar가 변경될 때마다 콘솔에 출력

    return {
        currentCalender,
        currentDate,
        setCurrentDate,
        calenderKeys
    };

}

export default useCalender;
