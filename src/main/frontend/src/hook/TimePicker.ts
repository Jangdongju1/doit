import {useEffect, useState} from "react";

const useTimePicker = () => {
    const [startOptions, setStartOptions] = useState<string[]>([]);
    const [endOptions, setEndOptions] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');

    const startHour = 0;
    const endHour = 23;

    // 1시간 단위로 시간 옵션 생성
    const generateTimeOption = () => {
        const options: string[] = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            let formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
            const time = `${formattedHour}:00`;
            options.push(time);
        }
        return options;
    };

    // startTime에 맞게 endOptions 업데이트
    const generateEndOptions = (start: string) => {
        const startHour = parseInt(start.split(':')[0]);
        const options: string[] = [];
        for (let hour = startHour + 1; hour <= endHour; hour++) {
            let formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
            const time = `${formattedHour}:00`;
            options.push(time);
        }
        return options;
    };

    // useEffect 훅에서 실행
    useEffect(() => {
        const startOptions = generateTimeOption();
        setStartOptions(startOptions); // 시작 시간 옵션 설정
    }, []);

    // startTime이 변경될 때마다 endOptions 업데이트
    useEffect(() => {
        if (startTime) {
            const updatedEndOptions = generateEndOptions(startTime); // startTime 이후의 시간만 필터링
            setEndOptions(updatedEndOptions); // 종료 시간 옵션 설정
            if (!endTime || parseInt(endTime.split(':')[0]) <= parseInt(startTime.split(':')[0])) {
                setEndTime(updatedEndOptions[0]); // 기본적으로 첫 번째 종료 시간을 설정
            }
        }
    }, [startTime]);

    return {
        startOptions,
        endOptions,
        startTime,
        setStartTime,
        endTime,
        setEndTime
    };

}

export default useTimePicker;