package com.personal.doit.service;

import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.request.IdCheckReq;
import com.personal.doit.dto.request.SignUpReq;
import com.personal.doit.dto.response.IdCheckRsp;
import com.personal.doit.dto.response.SignUpRep;
import org.springframework.http.ResponseEntity;

public interface UserService {
    public ResponseEntity<? super ApiResponse<IdCheckRsp>> duplicationCheck(IdCheckReq req);
    public ResponseEntity<? super ApiResponse<SignUpRep>> signUp(SignUpReq req);
}
