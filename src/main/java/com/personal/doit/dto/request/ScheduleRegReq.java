package com.personal.doit.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleRegReq {
    @NotNull @NotBlank
    private String title;
    private String content;
    private Integer year;
    private Integer month;
    private Integer day;
    private String start;
    private String end;
}
