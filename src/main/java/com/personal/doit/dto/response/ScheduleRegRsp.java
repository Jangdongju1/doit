package com.personal.doit.dto.response;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.custom.ScheduleDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ScheduleRegRsp {
    private final ScheduleDto added;

    public ScheduleRegRsp(ScheduleDto added) {
        this.added = added;
    }

    public static ResponseEntity<ApiResponse<ScheduleRegRsp>> success(ScheduleDto schedule) {
        ApiResponse<ScheduleRegRsp> response = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new ScheduleRegRsp(schedule)
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
