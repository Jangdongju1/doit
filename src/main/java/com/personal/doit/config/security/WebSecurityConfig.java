package com.personal.doit.config.security;

import com.personal.doit.common.global.GlobalVariable;
import com.personal.doit.config.security.entrypoint.FailedAuthenticationEntryPoint;
import com.personal.doit.util.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Bean
    protected SecurityFilterChain configureSecurityFilterChain(HttpSecurity http) throws Exception {
        SecurityFilterChain chain = null;
        try {

            // csrf, basic off
            http.csrf(AbstractHttpConfigurer::disable);
            http.httpBasic(AbstractHttpConfigurer::disable);

            // session 정책  -> Jwt Token   == stateless
            http.sessionManagement(managementConfigurer -> managementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

            // http cors Config
            http.cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()));

            // 인증이 필요한 url 설정
            http.authorizeHttpRequests(authorizationRequests ->
                    authorizationRequests
                            .requestMatchers(HttpMethod.POST, "api/v1/user/**").permitAll()
                            .anyRequest().authenticated());

            // 인증 실패시 핸들러 등록ㄹ
            http.exceptionHandling(handler ->  handler.authenticationEntryPoint(new FailedAuthenticationEntryPoint()));

            // 로그인 필터 추가

            // 커스텀 필터 추가

            chain = http.build();

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return chain;
    }



    // cors 설정 반환 메서드
    private CorsConfigurationSource corsConfigurationSource() {
        return httpServletRequest -> {

            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedMethods(Collections.singletonList("*")); // 1) get 2)post ....
            configuration.setAllowedHeaders(Collections.singletonList("*")); // 1) Authentication, 2)Content-Type
            configuration.setAllowedOriginPatterns(Collections.singletonList("*"));  // 모든 도메인으로 부터의 요청 허용.
            configuration.setAllowCredentials(true);

            return configuration;
        };

    }

}
