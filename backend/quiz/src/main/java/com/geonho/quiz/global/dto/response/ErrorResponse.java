package com.geonho.quiz.global.dto.response;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ErrorResponse {

    private final int status;
    private final String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    // 추가 생성자 (상세 정보 포함)
    public ErrorResponse(int status, String message, String detail) {
        this.status = status;
        this.message = message;
        this.detail = detail;
        this.timestamp = LocalDateTime.now();
    }

    private String detail; // 옵션
}