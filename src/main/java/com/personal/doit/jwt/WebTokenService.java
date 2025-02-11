package com.personal.doit.jwt;

import org.springframework.beans.factory.annotation.Value;

public interface WebTokenService {

    public void init();

    public String createWebToken(String userId, String role, int expireTimeSec);

    public String getSub(String token);
}
