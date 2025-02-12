package com.personal.doit.dto.response;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class IdCheckRsp {

    // 응답 데이터가 code, message 밖에 없는 경우에도 응답 형식의 통일을 위해서 null을 반환해 준다.
    public static ResponseEntity<ApiResponse<IdCheckRsp>> success() {
        ApiResponse<IdCheckRsp> response = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                null
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public static ResponseEntity<ResponseDto> isExistId(){
        return ResponseDto.isExistId();
    }
}
