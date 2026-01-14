package com.geonho.quiz.service;

import com.geonho.quiz.domain.Member;
import com.geonho.quiz.dto.request.LoginRequest;
import com.geonho.quiz.dto.request.SignupRequest;
import com.geonho.quiz.dto.response.LoginResponse;
import com.geonho.quiz.dto.response.SignupResponse;
import com.geonho.quiz.global.jwt.JwtTokenProvider;
import com.geonho.quiz.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public SignupResponse signup(SignupRequest signupRequest) {
        log.debug("회원가입 시도 - email: {}, username: {}", signupRequest.getEmail(), signupRequest.getUsername());

        // 이메일 중복 체크
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            log.warn("회원가입 실패 - 중복된 이메일: {}", signupRequest.getEmail());
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());
        log.debug("비밀번호 암호화 완료");

        // Member 엔티티 생성
        Member member = Member.builder()
            .email(signupRequest.getEmail())
            .password(encodedPassword)
            .username(signupRequest.getUsername())
            .build();

        // DB 저장
        Member savedMember = memberRepository.save(member);
        log.info("회원가입 성공 - memberId: {}, email: {}", savedMember.getId(), savedMember.getEmail());

        return SignupResponse.from(savedMember);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest loginRequest) {
        log.debug("로그인 시도 - email: {}", loginRequest.getEmail());

        // 이메일로 회원 조회
        Member member = memberRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> {
                log.warn("로그인 실패 - 존재하지 않는 이메일: {}", loginRequest.getEmail());
                return new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
            });

        // 비밀번호 검증
        if (!passwordEncoder.matches(loginRequest.getPassword(), member.getPassword())) {
            log.warn("로그인 실패 - 비밀번호 불일치: {}", loginRequest.getEmail());
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // JWT 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(member.getId(), member.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getId());

        log.info("로그인 성공 - memberId: {}, email: {}", member.getId(), member.getEmail());

        return LoginResponse.of(member, accessToken, refreshToken);
    }
}
