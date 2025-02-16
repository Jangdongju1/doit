package com.personal.doit.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "schedule")
@Getter
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_sequence")
    private Integer sequence;
    @Setter
    @Column(name = "schedule_title")
    private String title;
    @Setter
    @Column(name = "schedule_content")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_writer", referencedColumnName = "user_sequence")
    private User writer;
    @Column(name = "schedule_year")
    private Integer year;
    @Column(name = "schedule_month")
    private Integer month;
    @Column(name = "schedule_day")
    private Integer day;
    @Setter
    @Column(name = "schedule_start")
    private String start;
    @Setter
    @Column(name = "schedule_end")
    private String end;
    @Column(name = "schedule_reg_date")
    private String regDate;

    @Builder
    public Schedule(String title, String content, User writer, Integer year, Integer month, Integer day, String start, String end, String regDate) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.year = year;
        this.month = month;
        this.day = day;
        this.start = start;
        this.end = end;
        this.regDate = regDate;
    }
}
