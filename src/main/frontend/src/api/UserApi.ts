import {BASE_URL, DUPLICATION_CHECK, SIGN_IN, SIGN_UP} from "../constant/ApiEndPoint";
import axios from "axios";
import {DuplicationCheckReq, SignInReq, SignUpReq} from "../dto/req";
import ResponseDto from "../dto/ResponseDto";
import {DuplicationCheckRsp, SignInRsp, SignUpRep} from "../dto/rsp";

const BASE_INDICATOR = "/api/v1/user";
const REQUEST_URL = (indicator: string) => BASE_URL() + BASE_INDICATOR + indicator;

// 아이디 중복체크

export const duplicationCheckRequest = async (requestBody: DuplicationCheckReq) => {
    try {
        const result = await axios.post(REQUEST_URL(DUPLICATION_CHECK()), requestBody);
        const response: DuplicationCheckRsp = result.data;
        return response
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


// 회원가입 요청  //토큰 불요
export const signUPRequest = async (requestBody: SignUpReq) => {
    try {
        const result = await axios.post(REQUEST_URL(SIGN_UP()), requestBody);
        const response: SignUpRep = result.data;
        return response
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

// 로그인 요청
export const signInRequest = async (requestBody: SignInReq) => {
    try {
        const result = await axios.post(REQUEST_URL(SIGN_IN()), requestBody);

        const responseBody: SignInRsp = result.data;
        return responseBody

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




