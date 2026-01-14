package com.geonho.quiz.service;

import com.geonho.quiz.domain.Member;
import com.geonho.quiz.domain.MemberStatus;
import com.geonho.quiz.domain.Role;
import com.geonho.quiz.dto.request.LoginRequest;
import com.geonho.quiz.dto.request.SignupRequest;
import com.geonho.quiz.dto.response.LoginResponse;
import com.geonho.quiz.dto.response.SignupResponse;
import com.geonho.quiz.global.jwt.JwtTokenProvider;
import com.geonho.quiz.repository.MemberRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
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

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @InjectMocks
    private MemberService memberService;

    private SignupRequest signupRequest;
    private LoginRequest loginRequest;
    private Member member;

    @BeforeEach
    void setUp() {
        signupRequest = SignupRequest.builder()
                .email("test@example.com")
                .password("password123")
                .username("테스터")
                .build();

        loginRequest = LoginRequest.builder()
                .email("test@example.com")
                .password("password123")
                .build();

        member = Member.builder()
                .email("test@example.com")
                .password("encodedPassword")
                .username("테스터")
                .build();
        ReflectionTestUtils.setField(member, "id", 1L);
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

    @Test
    @DisplayName("로그인 성공")
    void login_success() {
        // given
        given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));
        given(passwordEncoder.matches(anyString(), anyString())).willReturn(true);
        given(jwtTokenProvider.createAccessToken(anyLong(), anyString())).willReturn("accessToken");
        given(jwtTokenProvider.createRefreshToken(anyLong())).willReturn("refreshToken");

        // when
        LoginResponse response = memberService.login(loginRequest);

        // then
        assertThat(response).isNotNull();
        assertThat(response.getEmail()).isEqualTo("test@example.com");
        assertThat(response.getAccessToken()).isEqualTo("accessToken");
        assertThat(response.getRefreshToken()).isEqualTo("refreshToken");

        verify(memberRepository).findByEmail("test@example.com");
        verify(passwordEncoder).matches("password123", "encodedPassword");
    }

    @Test
    @DisplayName("로그인 실패 - 존재하지 않는 이메일")
    void login_emailNotFound() {
        // given
        given(memberRepository.findByEmail(anyString())).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> memberService.login(loginRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이메일 또는 비밀번호가 올바르지 않습니다.");

        verify(memberRepository).findByEmail("test@example.com");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    @DisplayName("로그인 실패 - 비밀번호 불일치")
    void login_wrongPassword() {
        // given
        given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));
        given(passwordEncoder.matches(anyString(), anyString())).willReturn(false);

        // when & then
        assertThatThrownBy(() -> memberService.login(loginRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이메일 또는 비밀번호가 올바르지 않습니다.");

        verify(memberRepository).findByEmail("test@example.com");
        verify(passwordEncoder).matches("password123", "encodedPassword");
        verify(jwtTokenProvider, never()).createAccessToken(anyLong(), anyString());
    }
}
