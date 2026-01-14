package com.geonho.quiz.global.dto.response;

import lombok.Getter;

@Getter
public class SuccessResponse<T> {

    private final boolean success = true;
    private final int code;
    private final String message;
    private final T result;

    private SuccessResponse(int code, String message, T result) {
        this.code = code;
        this.message = message;
        this.result = result;
    }

    public static <T> SuccessResponse<T> of(int code, String message, T data) {
        return new SuccessResponse<>(code, message, data);
    }

    public static <T> SuccessResponse<T> of(ResponseState state, T data) {
        return new SuccessResponse<>(state.getCode(), state.getMessage(), data);
    }

    public static <T> SuccessResponse<T> ok(T data) {
        return of(ResponseState.SUCCESS, data);
    }

    public static <T> SuccessResponse<T> created(T data) {
        return of(ResponseState.CREATED, data);
    }
}
