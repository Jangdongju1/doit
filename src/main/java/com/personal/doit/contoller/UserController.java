package com.personal.doit.contoller;

import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.request.IdCheckReq;
import com.personal.doit.dto.request.SignUpReq;
import com.personal.doit.dto.response.IdCheckRsp;
import com.personal.doit.dto.response.SignUpRep;
import com.personal.doit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/duplication-check")
    public ResponseEntity<? super ApiResponse<IdCheckRsp>> duplicationCheck(@Validated @RequestBody IdCheckReq req){
        return userService.duplicationCheck(req);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<? super ApiResponse<SignUpRep>> signUp(@Validated @RequestBody SignUpReq req){
        return userService.signUp(req);
    }
}
