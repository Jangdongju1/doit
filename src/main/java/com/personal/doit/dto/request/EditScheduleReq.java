package com.personal.doit.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditScheduleReq {
    private Integer sequence;
    private String title;
    private String content;
    private Integer year;
    private Integer month;
    private Integer day;
    private String start;
    private String end;
}
