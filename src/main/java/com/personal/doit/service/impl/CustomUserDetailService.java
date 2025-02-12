package com.personal.doit.service.impl;

import com.personal.doit.dto.CustomUserDetails;
import com.personal.doit.entity.User;
import com.personal.doit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(username);

        if (user == null){
            throw new UsernameNotFoundException("user not found");
        }
        return new CustomUserDetails(user);
    }
}
