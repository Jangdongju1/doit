package com.personal.doit.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginReq {
    private String user_id;
    private String password;
}
