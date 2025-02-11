package com.personal.doit.dto;

import lombok.Getter;

@Getter
public class ApiResponse<D> extends ResponseDto {
    // api response의 최종 반환 형태를 정의한 클래스
    private final D data;

    public ApiResponse(String code, String message, D data) {
        super(code, message);
        this.data = data;
    }
}
