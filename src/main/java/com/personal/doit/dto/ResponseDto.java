package com.personal.doit.dto;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ResponseDto {
    // 응답코드를 및 메세지를 반환하는 클래스
    private String code;
    private String message;


    public static ResponseEntity<ResponseDto> unexpectedError() {
        ResponseDto response = new ResponseDto(ResponseCode.UNEXPECTED_ERROR, ResponseMessage.UNEXPECTED_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    public static ResponseEntity<ResponseDto> isExistId(){
        ResponseDto response = new ResponseDto(ResponseCode.EXIST_ID, ResponseMessage.EXIST_ID);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

}
