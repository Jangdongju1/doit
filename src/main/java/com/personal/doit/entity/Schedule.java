package com.personal.doit.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "schedule")
@Getter
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer schedule_sequence;
    private String schedule_title;
    private String schedule_content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_writer", referencedColumnName = "user_sequence")
    private User schedule_writer;
    private Integer schedule_year;
    private Integer schedule_month;
    private Integer schedule_day;
    private String schedule_time;
    private String schedule_reg_date;


    @Builder
    public Schedule(String schedule_title, String schedule_content, User schedule_writer, Integer schedule_year, Integer schedule_month, Integer schedule_day, String schedule_time, String schedule_reg_date) {
        this.schedule_title = schedule_title;
        this.schedule_content = schedule_content;
        this.schedule_writer = schedule_writer;
        this.schedule_year = schedule_year;
        this.schedule_month = schedule_month;
        this.schedule_day = schedule_day;
        this.schedule_time = schedule_time;
        this.schedule_reg_date = schedule_reg_date;
    }


}
