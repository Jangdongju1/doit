package com.personal.doit.common.constant;

public enum UserRole {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");
    private String role;
    private UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
