package com.geonho.quiz.controller;

import com.geonho.quiz.dto.request.SignupRequest;
import com.geonho.quiz.dto.response.SignupResponse;
import com.geonho.quiz.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(
        @Validated @RequestBody SignupRequest request
    ) {
        log.info("POST /api/member/signup - email: {}", request.getEmail());
        SignupResponse signupResponse = memberService.signup(request);
        log.info("회원가입 API 성공 - memberId: {}", signupResponse.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(signupResponse);
    }
}
