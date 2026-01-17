package com.geonho.quiz.global.exception;

import com.geonho.quiz.global.dto.response.ErrorResponse;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/*
* @RestControllerAdvice는 @ControllerAdvice와 @ResponseBody를 합친 어노테이션이다. @ControllerAdvice의 역할을 수행하고, @ResponseBody를 통해 객체를 리턴할 수 있다.
* @ControllerAdvice는 @ExceptionHandler, @ModelAttribute, @InitBinder가 적용된 메소드들에 AOP를 적용하여 Controller단에 적용하기 위해 고안된 어노테이션이다. 클래스에 선언되며, 모든 @Controller에 대한 전역적으로 발생할 수 있는 예외를 잡아서 처리할 수 있다.
* 출처: https://jangjjolkit.tistory.com/51 [장쫄깃 기술블로그:티스토리]
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException e) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            e.getMessage()
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(FieldError::getDefaultMessage)
            .collect(Collectors.joining(", "));

        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            message
        );
        return ResponseEntity.badRequest().body(error);
    }
}
