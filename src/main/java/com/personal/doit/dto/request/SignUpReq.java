package com.personal.doit.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignUpReq {
    @NotNull
    @NotBlank
    private String user_id;
    @NotNull
    @NotBlank
    private String password;
    @NotNull
    @NotBlank
    private String nickname;
}
