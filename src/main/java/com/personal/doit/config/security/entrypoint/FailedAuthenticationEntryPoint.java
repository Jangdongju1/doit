package com.personal.doit.config.security.entrypoint;

import com.google.gson.Gson;
import com.personal.doit.common.ResponseCode;
import com.personal.doit.common.ResponseMessage;
import com.personal.doit.common.global.GlobalVariable;
import com.personal.doit.dto.ResponseDto;
import com.personal.doit.util.Utils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(authException));

        // http 상태 코드 및 메세지 반환

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);// 인증실패

        ResponseDto authenticationFailed = new ResponseDto(ResponseCode.AUTHENTICATION_FAIL, ResponseMessage.AUTHENTICATION_FAIL);
        response.getWriter().write(new Gson().toJson(authenticationFailed));

        // 인증 실패시 반환 값 설정.

    }
}
