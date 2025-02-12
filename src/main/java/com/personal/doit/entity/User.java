package com.personal.doit.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // db의 pk 생성 전략을 따름.
    private Integer user_sequence;
    // 사이즈에 대한 제한은 따로 안주는 것으로.

    @NotNull @NotBlank
    @Column(name = "user_id")
    private String userId;
    @NotNull @NotBlank
    private String password;
    @NotNull @NotBlank
    private String nickname;
    private String role;

    @Builder
    public User(String userId, String password, String nickname, String role) {
        this.userId = userId;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
    }
}
