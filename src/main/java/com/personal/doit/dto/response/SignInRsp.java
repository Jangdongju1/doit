package com.personal.doit.dto.response;

import lombok.Getter;

@Getter
public class SignInRsp {
    private final String token;
    private final Integer expiration;
    private final String userId;

    public SignInRsp(String token, Integer expiration, String userId) {
        this.token = token;
        this.expiration = expiration;
        this.userId = userId;
    }
}
