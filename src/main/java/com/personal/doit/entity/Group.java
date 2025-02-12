package com.personal.doit.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "group")
@NoArgsConstructor
@Getter
public class Group {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer group_sequence;

    // 사용자별 1 그룹
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence" ,referencedColumnName = "user_sequence")
    private User user_sequence;

    @Builder
    public Group(User user_sequence) {
        this.user_sequence = user_sequence;
    }
}
