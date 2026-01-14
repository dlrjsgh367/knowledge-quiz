package com.geonho.quiz.controller;

import com.geonho.quiz.dto.request.LoginRequest;
import com.geonho.quiz.dto.request.SignupRequest;
import com.geonho.quiz.dto.response.LoginResponse;
import com.geonho.quiz.dto.response.SignupResponse;
import com.geonho.quiz.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(
        @Validated @RequestBody SignupRequest request
    ) {
        log.info("POST /api/auth/signup - email: {}", request.getEmail());
        SignupResponse signupResponse = memberService.signup(request);
        log.info("회원가입 API 성공 - memberId: {}", signupResponse.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(signupResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
        @Validated @RequestBody LoginRequest request
    ) {
        log.info("POST /api/auth/login - email: {}", request.getEmail());
        LoginResponse loginResponse = memberService.login(request);
        log.info("로그인 API 성공 - memberId: {}", loginResponse.getId());
        return ResponseEntity.ok(loginResponse);
    }
}
