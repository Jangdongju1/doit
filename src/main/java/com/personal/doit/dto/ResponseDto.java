package com.personal.doit.dto;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDto {
    // 응답코드를 및 메세지를 반환하는 클래스
    private String code;
    private String message;


    public static ResponseDto success() {
        return new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

}
