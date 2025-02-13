package com.personal.doit.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInReq {
    @NotNull
    @NotBlank
    private String user_id;
    @NotNull
    @NotBlank
    private String password;
}
