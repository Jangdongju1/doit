package com.personal.doit.service.impl;

import com.personal.doit.common.global.GlobalVariable;
import com.personal.doit.dto.ApiResponse;
import com.personal.doit.dto.CustomUserDetails;
import com.personal.doit.dto.ResponseDto;
import com.personal.doit.dto.custom.ScheduleDto;
import com.personal.doit.dto.request.ScheduleRegReq;
import com.personal.doit.dto.response.ScheduleListRsp;
import com.personal.doit.dto.response.ScheduleRegRsp;
import com.personal.doit.dto.response.ScheduleRsp;
import com.personal.doit.entity.Schedule;
import com.personal.doit.entity.User;
import com.personal.doit.repository.ScheduleRepository;
import com.personal.doit.repository.UserRepository;
import com.personal.doit.service.ScheduleService;
import com.personal.doit.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;


    @Override
    public ResponseEntity<? super ApiResponse<ScheduleRegRsp>> postSchedule(ScheduleRegReq req, UserDetails details) {
        ScheduleDto added = null;
        try {
            //  롤 및 사용자 확인
            logger.info(GlobalVariable.LOG_PATTERN, this.getClass().getName(), "userName: " + details.getUsername());
            Collection<? extends GrantedAuthority> authorities = details.getAuthorities();

            for (GrantedAuthority authority : authorities) {
                logger.info(GlobalVariable.LOG_PATTERN, this.getClass().getName(), "role: " + authority.getAuthority());
            }

            User user = userRepository.findByUserId(details.getUsername());


            Schedule newSchedule = Schedule.builder()
                    .title(req.getTitle())
                    .content(req.getContent())
                    .year(req.getYear())
                    .month(req.getMonth())
                    .day(req.getDay())
                    .start(req.getStart())
                    .end(req.getEnd())
                    .regDate(LocalDateTime.now().toString())  // 현재시각
                    .writer(user)
                    .build();


            scheduleRepository.save(newSchedule);

            added = ScheduleDto.builder()
                    .sequence(newSchedule.getSequence())
                    .title(newSchedule.getTitle())
                    .content(newSchedule.getContent())
                    .year(newSchedule.getYear())
                    .month(newSchedule.getMonth())
                    .day(newSchedule.getDay())
                    .start(newSchedule.getStart())
                    .end(newSchedule.getEnd())
                    .writer(details.getUsername())
                    .build();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.unexpectedError();
        }
        return ScheduleRegRsp.success(added);
    }


    // 월별 스케쥴로 바꾸기
    @Override
    public ResponseEntity<? super ApiResponse<ScheduleListRsp>> getScheduleList(CustomUserDetails details, Integer year, Integer month) {
        List<ScheduleDto> scheduleList = null;
        try {
            // 사용자 및 롤 확인
            logger.info(GlobalVariable.LOG_PATTERN, this.getClass().getName(), "userName: " + details.getUsername());
            Collection<? extends GrantedAuthority> authorities = details.getAuthorities();

            for (GrantedAuthority authority : authorities) {
                logger.info(GlobalVariable.LOG_PATTERN, this.getClass().getName(), "role: " + authority.getAuthority());
            }

            User user = userRepository.findByUserId(details.getUsername());  // 유저를 찾고

            if (user == null) {
                return ScheduleListRsp.notExistUser();
            }
            // year == 실제 년도 , month = 0~11 의값을 가짐.

            // month -1 ~ now  ~  month + 1 의 데이터를 가져가야함.
            Integer prevYear = month;
            Integer prevMonth = month - 1;
            Integer nextYear = month;
            Integer nextMonth = month + 1;


            if (month - 1 < 0) {
                prevYear = year - 1;
                prevMonth = 11;
            }

            if (month + 1 > 11) {
                nextYear = year + 1;
                nextMonth = 0;
            }

            List<Schedule> list = scheduleRepository.getScheduleList(prevYear, prevMonth, year, month, nextYear, nextMonth);


            scheduleList = new ArrayList<>();

            for (Schedule schedule : list) {
                ScheduleDto item = ScheduleDto.builder()
                        .sequence(schedule.getSequence())
                        .title(schedule.getTitle())
                        .content(schedule.getContent())
                        .year(schedule.getYear())
                        .month(schedule.getMonth())
                        .day(schedule.getDay())
                        .start(schedule.getStart())
                        .end(schedule.getEnd())
                        .writer(details.getUsername())
                        .build();

                scheduleList.add(item);

            }


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.unexpectedError();
        }
        return ScheduleListRsp.success(scheduleList);
    }

    @Override
    public ResponseEntity<? super ApiResponse<ScheduleRsp>> getSchedule(CustomUserDetails details, Integer sequence) {
        ScheduleDto schedule = null;
        try {
            logger.info(GlobalVariable.LOG_PATTERN, this.getClass().getName(), "userName: " + details.getUsername());
            Collection<? extends GrantedAuthority> authorities = details.getAuthorities();

            for (GrantedAuthority authority : authorities) {
                logger.info(GlobalVariable.LOG_PATTERN, this.getClass().getName(), "role: " + authority.getAuthority());
            }

            User user = userRepository.findByUserId(details.getUsername());

            if (user == null) {
                return ScheduleRsp.notExistUser();
            }

            Schedule currentSchedule = scheduleRepository.findBySequence(sequence);

            if (currentSchedule == null) {
                return ScheduleRsp.notExistSchedule();
            }

            schedule = ScheduleDto.builder()
                    .sequence(currentSchedule.getSequence())
                    .title(currentSchedule.getTitle())
                    .content(currentSchedule.getContent())
                    .year(currentSchedule.getYear())
                    .month(currentSchedule.getMonth())
                    .day(currentSchedule.getDay())
                    .start(currentSchedule.getStart())
                    .end(currentSchedule.getEnd())
                    .writer(details.getUsername())
                    .build();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.unexpectedError();
        }
        return ScheduleRsp.success(schedule);
    }
}
