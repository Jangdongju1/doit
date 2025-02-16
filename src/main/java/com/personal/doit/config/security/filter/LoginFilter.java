package com.personal.doit.config.security.filter;

import com.google.gson.Gson;
import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.common.global.GlobalVariable;
import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.request.SignInReq;
import com.personal.doit.dto.response.SignInRsp;
import com.personal.doit.jwt.WebTokenService;
import com.personal.doit.util.Utils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;


public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final AuthenticationManager authenticationManager;
    private final WebTokenService webTokenService;
    private static final int TOKEN_EXPIRE_TIME = 10800;

    public LoginFilter(AuthenticationManager authenticationManager, WebTokenService webTokenService) {
        this.authenticationManager = authenticationManager;
        this.webTokenService = webTokenService;
    }

    // security를 통한 로그인 진행.
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authRequest = null;
        try (BufferedReader reader = request.getReader()) {
            String line = "";
            StringBuilder builder = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }

            SignInReq req = new Gson().fromJson(builder.toString(), SignInReq.class);

            authRequest = new UsernamePasswordAuthenticationToken(req.getUser_id(), req.getPassword());

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }


        // 검증을 위해서 매니저로 전달.
        return authenticationManager.authenticate(authRequest);
    }

    // 성공시
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserDetails details = (UserDetails) authResult.getPrincipal();

        Collection<? extends GrantedAuthority> authorities = details.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();  //

        String role = iterator.next().getAuthority();

        String token = webTokenService.createWebToken(details.getUsername(), role, TOKEN_EXPIRE_TIME);
//
//        final String TOKEN_PREFIX = "token=";
//        final String EXPIRATION_PREFIX = "MAX-AGE=";
//        final String PATH_PREFIX = "Path=";
//        final String SAME_SITE_PREFIX = "SameSite=";
//
//        StringBuilder builder = new StringBuilder();
//
//        builder.append(TOKEN_PREFIX + token + ";")
//                .append(EXPIRATION_PREFIX + TOKEN_EXPIRE_TIME + ";")
//                .append(PATH_PREFIX + "/" + ";")
//                .append(SAME_SITE_PREFIX + "None" + ";");
//
//        response.setHeader("Set-Cookie", builder.toString());
//
        ApiResponse<SignInRsp> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new SignInRsp(token,TOKEN_EXPIRE_TIME, details.getUsername()));

        // 반환타입 및 http 상태 세팅 인코딩
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.OK.value());

        response.getWriter().write(new Gson().toJson(responseBody));
    }

    //실패시
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        ApiResponse<SignInRsp> responseBody = new ApiResponse<>(
                ResponseCode.LOGIN_FAIL,
                ResponseMessage.LOGIN_FAIL,
                null
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        response.getWriter().write(new Gson().toJson(responseBody));

    }
}
