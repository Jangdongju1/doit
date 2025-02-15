package com.personal.doit.jwt;

import jakarta.servlet.http.HttpServletRequest;

public interface WebTokenService {

    public void init();

    public String createWebToken(String userId, String role, int expireTimeSec);

    public String parseToken(HttpServletRequest request);

    public boolean isExpired(String token);

    public String getUsername(String token);

    public String getRole(String token);
}
