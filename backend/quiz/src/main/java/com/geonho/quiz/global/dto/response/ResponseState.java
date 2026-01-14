package com.geonho.quiz.global.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseState {

    // 성공
    SUCCESS(1, "성공하였습니다."),
    CREATED(1, "생성되었습니다."),

    // 인증 관련
    LOGIN_SUCCESS(1, "로그인에 성공하였습니다."),
    SIGNUP_SUCCESS(1, "회원가입에 성공하였습니다."),
    LOGOUT_SUCCESS(1, "로그아웃에 성공하였습니다.");

    private final int code;
    private final String message;
}
