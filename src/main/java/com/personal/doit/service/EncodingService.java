package com.personal.doit.service;

public interface EncodingService {
    String encodingPassword(String password);
    boolean isMatch(String encodedPassword,String password);
}
