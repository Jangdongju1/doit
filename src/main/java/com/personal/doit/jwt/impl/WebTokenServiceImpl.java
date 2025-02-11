package com.personal.doit.jwt.impl;

import com.personal.doit.common.global.GlobalVariable;
import com.personal.doit.jwt.WebTokenService;
import com.personal.doit.util.Utils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class WebTokenServiceImpl implements WebTokenService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${token.expire}")
    private Integer expireTime;
    @Value("${secret.key}")
    private String key;
    private SecretKey SECRET_KEY;

    @PostConstruct
    @Override
    public void init() {
        SECRET_KEY = Keys.hmacShaKeyFor(key.getBytes());
    }

    @Override
    public String createWebToken(String userId, String role, int expireTimeSec) {
        String token = "";
        try {

            Date expireDate = Date.from(Instant.now().plus(expireTimeSec, ChronoUnit.SECONDS));
            token = Jwts.builder()
                    .subject(userId)
                    .claim("role", role)
                    .issuedAt(Date.from(Instant.now()))  // 발행시간
                    .expiration(expireDate) // 만료일시
                    .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                    .compact();

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return token;
    }

    @Override
    public String getSub(String token) {
        String sub = "";
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            sub = claims.getSubject();
        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return sub;
    }
}
