package com.personal.doit.dto.response;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.ResponseDto;
import com.personal.doit.dto.custom.ScheduleDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class ScheduleListRsp {

    List<ScheduleDto> scheduleList;

    public ScheduleListRsp(List<ScheduleDto> scheduleList) {
        this.scheduleList = scheduleList;
    }

    public static ResponseEntity<ApiResponse<ScheduleListRsp>> success(List<ScheduleDto> scheduleList){
        ApiResponse<ScheduleListRsp> response = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new ScheduleListRsp(scheduleList)
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistUser();
    }
}
