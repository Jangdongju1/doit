package com.personal.doit.dto.response;

import lombok.Getter;

@Getter
public class SignInRep {
    private final String token;
    private final Integer expiration;

    public SignInRep(String token, Integer expiration) {
        this.token = token;
        this.expiration = expiration;
    }
}
