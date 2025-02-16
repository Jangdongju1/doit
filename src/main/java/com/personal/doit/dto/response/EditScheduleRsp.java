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
public class EditScheduleRsp {
    private final ScheduleDto edited;

    public EditScheduleRsp(ScheduleDto edited) {
        this.edited = edited;
    }

    public static ResponseEntity<ApiResponse<EditScheduleRsp>> success(ScheduleDto edited) {
        ApiResponse<EditScheduleRsp> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new EditScheduleRsp(edited)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser () {
        return ResponseDto.notExistUser();
    }

    public static ResponseEntity<ResponseDto> notExistSchedule () {
        return ResponseDto.notExistSchedule();
    }
}
