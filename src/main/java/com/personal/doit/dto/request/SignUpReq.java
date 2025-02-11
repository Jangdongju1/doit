package com.personal.doit.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignUpReq {
    private String user_id;
    private String password;
    private String nickname;
}
