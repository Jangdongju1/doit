package com.personal.doit.dto.custom;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ScheduleDto {
    private Integer sequence;
    private String title;
    private String content;
    private Integer year;
    private Integer month;
    private Integer day;
    private String start;
    private String end;
    private String writer;


    @Builder
    public ScheduleDto(Integer sequence, String title, String content, Integer year, Integer month, Integer day, String start, String end, String writer) {
        this.sequence = sequence;
        this.title = title;
        this.content = content;
        this.year = year;
        this.month = month;
        this.day = day;
        this.start = start;
        this.end = end;
        this.writer = writer;
    }
}
