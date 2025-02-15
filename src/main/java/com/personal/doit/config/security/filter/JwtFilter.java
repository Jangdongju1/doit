package com.personal.doit.config.security.filter;

import com.personal.doit.dto.CustomUserDetails;
import com.personal.doit.entity.User;
import com.personal.doit.jwt.WebTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    private final WebTokenService webTokenService;

    public JwtFilter(WebTokenService webTokenService) {
        this.webTokenService = webTokenService;
    }

    //토큰 인증 필터
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 1)토큰이 Bearer로 시작하지 않거나 없는경우
        String token = webTokenService.parseToken(request);

        //Authorization 헤더 검증  == 토큰이 없는 경우
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }


        // 토큰이 만료된 경우
        if (webTokenService.isExpired(token)){
            filterChain.doFilter(request, response);
            return ;
        }


        String username = webTokenService.getUsername(token);
        String role = webTokenService.getRole(token);

        User user = User.builder().
                userId(username)
                .role(role)
                .password("temp")
                .build();

        CustomUserDetails userDetails = new CustomUserDetails(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);

    }
}
