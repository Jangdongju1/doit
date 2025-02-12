package com.personal.doit.dto.response;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.dto.ApiResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignUpRep {
    private final String addedId;

    public SignUpRep(String sign_up_id) {
        this.addedId = sign_up_id;
    }

    public static ResponseEntity<ApiResponse<SignUpRep>> success(String id) {
        ApiResponse<SignUpRep> response = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new SignUpRep(id)
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
