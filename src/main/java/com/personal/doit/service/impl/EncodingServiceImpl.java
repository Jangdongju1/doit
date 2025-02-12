package com.personal.doit.service.impl;

import com.personal.doit.service.EncodingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EncodingServiceImpl implements EncodingService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public String encodingPassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    @Override
    public boolean isMatch(String encodedPassword,String password) {
        return bCryptPasswordEncoder.matches(encodedPassword, password);
    }
}
