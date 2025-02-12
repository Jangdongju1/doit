package com.personal.doit.service.impl;

import com.personal.doit.common.constant.UserRole;
import com.personal.doit.common.global.GlobalVariable;
import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.ResponseDto;
import com.personal.doit.dto.request.IdCheckReq;
import com.personal.doit.dto.request.SignUpReq;
import com.personal.doit.dto.response.IdCheckRsp;
import com.personal.doit.dto.response.SignUpRep;
import com.personal.doit.entity.User;
import com.personal.doit.repository.UserRepository;
import com.personal.doit.service.EncodingService;
import com.personal.doit.service.UserService;
import com.personal.doit.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final EncodingService encodingService;

    @Override
    public ResponseEntity<? super ApiResponse<IdCheckRsp>> duplicationCheck(IdCheckReq req) {
        try {
            boolean isExistUserId = userRepository.existsByUserId(req.getUser_id());

            if (isExistUserId) return IdCheckRsp.isExistId();

        }catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.unexpectedError();
        }
        return IdCheckRsp.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<SignUpRep>> signUp(SignUpReq req) {
        try {
            User user = User.builder()
                    .userId(req.getUser_id())
                    .password(encodingService.encodingPassword(req.getPassword()))
                    .nickname(req.getNickname())
                    .role(UserRole.USER.getRole())
                    .build();
            userRepository.save(user);

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.unexpectedError();
        }
        return SignUpRep.success(req.getUser_id());
    }
}
