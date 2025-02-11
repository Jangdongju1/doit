package com.personal.doit.dto.response;

import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.dto.ApiResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignUpResponse {
    private final String sign_up_id;
    private final String token;

    public SignUpResponse(String sign_up_id, String token) {
        this.sign_up_id = sign_up_id;
        this.token = token;
    }

    public static ResponseEntity<ApiResponse<SignUpResponse>> success(String id, String token) {
        ApiResponse<SignUpResponse> response = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new SignUpResponse(id, token)
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
