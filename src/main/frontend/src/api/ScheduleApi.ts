import {BASE_URL, SCHEDULE, SCHEDULE_LIST, SCHEDULE_REG} from "../constant/ApiEndPoint";
import {ScheduleRegReq} from "../dto/req";
import axios from "axios";
import ResponseDto from "../dto/ResponseDto";
import ScheduleRegRsp from "../dto/rsp/ScheduleRegRsp";
import ScheduleListRsp from "../dto/rsp/ScheduleListRsp";

const BASE_INDICATOR = "/api/v1/schedule";
const REQUEST_URL = (indicator: string) => BASE_URL() + BASE_INDICATOR + indicator;
const authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
}


// schedule등록 요청
export const postScheduleRequest = async (requestBody: ScheduleRegReq, accessToken: string) => {
    try {
        const result =
            await axios.post(REQUEST_URL(SCHEDULE_REG()), requestBody, authorization(accessToken));
        const responseBody: ScheduleRegRsp = result.data;

        return responseBody;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (!err.response) {
                console.log(err.message)
                return null;
            }
            const response: ResponseDto = err.response.data;
            return response;
        } else {
            console.error(err)
            return null;
        }
    }
}

// schedule 리스트 요청
export const getScheduleList = async (year: string, month: string, accessToken: string) => {
    try {
        const result =
            await axios.get(REQUEST_URL(SCHEDULE_LIST(year, month)), authorization(accessToken));

        const responseBody: ScheduleListRsp = result.data;
        return responseBody;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (!err.response) {
                console.log(err.message)
                return null;
            }
            const response: ResponseDto = err.response.data;
            return response;
        } else {
            console.error(err)
            return null;
        }
    }
}

// 스케쥴 수정시 해당 스케쥴에 대한 데이터를 가져옴
export const getSchedule = async (sequence: string, accessToken: string) => {
    try {
        const result = await axios.get(REQUEST_URL(SCHEDULE(sequence)), authorization(accessToken));

        const responseBody : ScheduleRegRsp = result.data;
        return responseBody;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (!err.response) {
                console.log(err.message)
                return null;
            }
            const response: ResponseDto = err.response.data;
            return response;
        } else {
            console.error(err)
            return null;
        }
    }
}