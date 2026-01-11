package com.geonho.quiz.dto.response;

import com.geonho.quiz.domain.Member;
import com.geonho.quiz.domain.MemberStatus;
import com.geonho.quiz.domain.Role;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignupResponse {
    private Long id;
    private String email;
    private String username;
    private Role role;
    private MemberStatus status;
    private LocalDateTime createdAt;

    public static SignupResponse from(Member member) {
        return SignupResponse.builder()
            .id(member.getId())
            .email(member.getEmail())
            .username(member.getUsername())
            .role(member.getRole())
            .status(member.getStatus())
            .createdAt(member.getCreatedAt())
            .build();
    }
}
