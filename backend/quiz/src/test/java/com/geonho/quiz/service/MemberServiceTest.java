package com.geonho.quiz.service;

import com.geonho.quiz.domain.Member;
import com.geonho.quiz.domain.MemberStatus;
import com.geonho.quiz.domain.Role;
import com.geonho.quiz.dto.request.SignupRequest;
import com.geonho.quiz.dto.response.SignupResponse;
import com.geonho.quiz.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private MemberService memberService;

    private SignupRequest signupRequest;
    private Member member;

    @BeforeEach
    void setUp() {
        signupRequest = SignupRequest.builder()
                .email("test@example.com")
                .password("password123")
                .username("테스터")
                .build();

        member = Member.builder()
                .email("test@example.com")
                .password("encodedPassword")
                .username("테스터")
                .build();
    }

    @Test
    @DisplayName("회원가입 성공")
    void signup_success() {
        // given
        given(memberRepository.existsByEmail(anyString())).willReturn(false);
        given(passwordEncoder.encode(anyString())).willReturn("encodedPassword");
        given(memberRepository.save(any(Member.class))).willReturn(member);

        // when
        SignupResponse response = memberService.signup(signupRequest);

        // then
        assertThat(response).isNotNull();
        assertThat(response.getEmail()).isEqualTo("test@example.com");
        assertThat(response.getUsername()).isEqualTo("테스터");

        verify(memberRepository).existsByEmail("test@example.com");
        verify(passwordEncoder).encode("password123");
        verify(memberRepository).save(any(Member.class));
    }

    @Test
    @DisplayName("회원가입 실패 - 이메일 중복")
    void signup_duplicateEmail() {
        // given
        given(memberRepository.existsByEmail(anyString())).willReturn(true);

        // when & then
        assertThatThrownBy(() -> memberService.signup(signupRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이미 사용 중인 이메일입니다.");

        verify(memberRepository).existsByEmail("test@example.com");
        verify(passwordEncoder, never()).encode(anyString());
        verify(memberRepository, never()).save(any(Member.class));
    }

    @Test
    @DisplayName("회원가입 시 비밀번호 암호화 확인")
    void signup_passwordEncoded() {
        // given
        given(memberRepository.existsByEmail(anyString())).willReturn(false);
        given(passwordEncoder.encode("password123")).willReturn("encodedPassword");
        given(memberRepository.save(any(Member.class))).willReturn(member);

        // when
        memberService.signup(signupRequest);

        // then
        verify(passwordEncoder).encode("password123");
    }

    @Test
    @DisplayName("회원가입 시 기본 Role은 USER")
    void signup_defaultRoleIsUser() {
        // given
        given(memberRepository.existsByEmail(anyString())).willReturn(false);
        given(passwordEncoder.encode(anyString())).willReturn("encodedPassword");
        given(memberRepository.save(any(Member.class))).willReturn(member);

        // when
        SignupResponse response = memberService.signup(signupRequest);

        // then
        assertThat(response.getRole()).isEqualTo(Role.USER);
    }

    @Test
    @DisplayName("회원가입 시 기본 Status는 ACTIVE")
    void signup_defaultStatusIsActive() {
        // given
        given(memberRepository.existsByEmail(anyString())).willReturn(false);
        given(passwordEncoder.encode(anyString())).willReturn("encodedPassword");
        given(memberRepository.save(any(Member.class))).willReturn(member);

        // when
        SignupResponse response = memberService.signup(signupRequest);

        // then
        assertThat(response.getStatus()).isEqualTo(MemberStatus.ACTIVE);
    }
}
