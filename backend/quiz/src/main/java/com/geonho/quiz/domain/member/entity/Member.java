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
/*
－ JPA는 리플렉션을 통해 엔티티를 생성하기 때문에 기본 생성자가 필요합니다
- PROTECTED로 설정하면 외부에서 new Member()로 직접 생성하는 것을 막고, 오직 Builder나 정적 팩토리 메서드를 통해서만 생성하도록 강제합니다
- 이는 불완전한 상태의 객체 생성을 방지하기 위함입니다
*/
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자를 통해서 값 변경 목적으로 접근하는 메시지들 차단
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

    @Enumerated(EnumType.STRING) // 자바의 enum을 엔티티 클래스의 속성으로 사용
    @Column(length = 20)
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private MemberStatus status = MemberStatus.ACTIVE;

    // 엔티티 클래스 속성 값에 default 값을 지정해도 문제가 없는가?
    // 문제가 없다며 default 값을 지정하는 이유는 무엇인가?
    /*
        문제 없으며, 오히려 권장됩니다.

        이유:
        private Role role = Role.USER;  // ✅ 좋음

        - 애플리케이션 레벨에서 기본값 보장: Builder로 생성할 때 role을 지정하지 않으면 자동으로 USER가 됨
        - DB 제약조건과 별개: DB의 DEFAULT와는 독립적으로 작동
        - 명시적 의도 표현: "신규 회원은 기본적으로 USER 권한"이라는 비즈니스 규칙이 코드에 명확히 드러남

        주의사항:
        - 컬럼에 @Column(columnDefinition = "VARCHAR(20) DEFAULT 'USER'") 같은 DB 레벨 DEFAULT도 함께 설정하면 이중 보장
        - 하지만 애플리케이션 레벨 기본값만으로도 충분한 경우가 많음
    */
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<QuizAttempt> attempts = new ArrayList<>(); // Container 객체인 이유가 무엇인가?

    @Builder
    public Member(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    // 비즈니스 메서드가 엔티티 클래스 안에 있어도 되는건가?
    // 보통 실무에서는 어떻게 하는가?
    // 비즈니스 메서드
    public void updateUsername(String username) {
        this.username = username;
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
    }
}
