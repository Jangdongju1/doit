package com.personal.doit.contoller;

import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.CustomUserDetails;
import com.personal.doit.dto.request.ScheduleRegReq;
import com.personal.doit.dto.response.ScheduleListRsp;
import com.personal.doit.dto.response.ScheduleRegRsp;
import com.personal.doit.dto.response.ScheduleRsp;
import com.personal.doit.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/schedule")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @PostMapping("")
    public ResponseEntity<? super ApiResponse<ScheduleRegRsp>> poseSchedule(
            @AuthenticationPrincipal CustomUserDetails details,
            @Validated @RequestBody ScheduleRegReq req) {

        return scheduleService.postSchedule(req, details);
    }

    @GetMapping("/schedule-list")
    public ResponseEntity<? super ApiResponse<ScheduleListRsp>> getScheduleList(
            @AuthenticationPrincipal CustomUserDetails details,
            @RequestParam("year") Integer year,
            @RequestParam("month") Integer month) {

        return scheduleService.getScheduleList(details, year, month);
    }


    @GetMapping("")
    public ResponseEntity<? super ApiResponse<ScheduleRsp>> getSchedule(
            @AuthenticationPrincipal CustomUserDetails details,
            @RequestParam("sequence") Integer sequence){

        return scheduleService.getSchedule(details, sequence);
    }
}
