package com.personal.doit.service;

import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.CustomUserDetails;
import com.personal.doit.dto.request.EditScheduleReq;
import com.personal.doit.dto.request.ScheduleRegReq;
import com.personal.doit.dto.response.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface ScheduleService {
    public ResponseEntity<? super ApiResponse<ScheduleRegRsp>> postSchedule(ScheduleRegReq req , UserDetails details);

    public ResponseEntity<? super ApiResponse<ScheduleListRsp>> getScheduleList(CustomUserDetails details, Integer year, Integer month);

    public ResponseEntity<? super ApiResponse<ScheduleRsp>> getSchedule(CustomUserDetails details, Integer sequence);

    public ResponseEntity<? super ApiResponse<EditScheduleRsp>> editSchedule(CustomUserDetails details, EditScheduleReq req);

    public ResponseEntity<? super ApiResponse<DeleteScheduleRsp>> deleteSchedule(CustomUserDetails details, Integer sequence);

}
