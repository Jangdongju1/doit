package com.personal.doit.dto.response;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.ResponseDto;
import com.personal.doit.dto.custom.ScheduleDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ScheduleRsp {
    private final ScheduleDto schedule;

    public ScheduleRsp(ScheduleDto schedule) {
        this.schedule = schedule;
    }

    public static ResponseEntity<ApiResponse<ScheduleRsp>> success(ScheduleDto schedule) {
        ApiResponse<ScheduleRsp> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new ScheduleRsp(schedule)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistUser();
    }

    public static ResponseEntity<ResponseDto> notExistSchedule(){
        return ResponseDto.notExistSchedule();
    }
}
