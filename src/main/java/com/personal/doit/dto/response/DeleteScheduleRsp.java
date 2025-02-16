package com.personal.doit.dto.response;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class DeleteScheduleRsp {
    private final Integer deleted;

    public DeleteScheduleRsp(Integer deleted) {
        this.deleted = deleted;
    }

    public static ResponseEntity<ApiResponse<DeleteScheduleRsp>> success(Integer deleted){
        ApiResponse<DeleteScheduleRsp> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new DeleteScheduleRsp(deleted));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistUser();
    }

    public static ResponseEntity<ResponseDto> notExistSchedule(){
        return ResponseDto.notExistSchedule();
    }
}
