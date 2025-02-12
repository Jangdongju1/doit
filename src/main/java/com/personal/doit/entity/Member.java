package com.personal.doit.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@NoArgsConstructor
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer member_sequence;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_sequence", referencedColumnName = "group_sequence")
    private Group group_sequence;
    private Integer user_sequence;


    @Builder
    public Member(Group group_sequence, Integer user_sequence) {
        this.group_sequence = group_sequence;
        this.user_sequence = user_sequence;
    }
}
