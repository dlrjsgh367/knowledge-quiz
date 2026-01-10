package com.geonho.quiz.domain.member.entity;

import com.geonho.quiz.domain.attempt.entity.QuizAttempt;
import com.geonho.quiz.global.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 100)
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private MemberStatus status = MemberStatus.ACTIVE;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<QuizAttempt> attempts = new ArrayList<>();

    @Builder
    public Member(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    // 비즈니스 메서드
    public void updateUsername(String username) {
        this.username = username;
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
    }
}
