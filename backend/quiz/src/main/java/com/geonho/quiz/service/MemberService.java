package com.geonho.quiz.service;

import com.geonho.quiz.domain.Member;
import com.geonho.quiz.dto.request.SignupRequest;
import com.geonho.quiz.dto.response.SignupResponse;
import com.geonho.quiz.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public SignupResponse signup(SignupRequest signupRequest) {
        // 이메일 중복 체크
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());

        // Member 엔티티 생성
        Member member = Member.builder()
            .email(signupRequest.getEmail())
            .password(encodedPassword)
            .username(signupRequest.getUsername())
            .build();

        // DB 저장
        Member savedMember = memberRepository.save(member);

        return SignupResponse.from(savedMember);
    }
}
