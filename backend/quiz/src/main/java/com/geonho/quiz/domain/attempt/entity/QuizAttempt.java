package com.geonho.quiz.domain.attempt.entity;

import com.geonho.quiz.domain.member.entity.Member;
import com.geonho.quiz.domain.quiz.entity.Quiz;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "quiz_attempt")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(nullable = false)
    private Integer score;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(name = "time_taken", nullable = false)
    private Integer timeTaken;

    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<>();

    @Builder
    public QuizAttempt(Member member, Quiz quiz, Integer score,
                       Integer totalQuestions, Integer timeTaken,
                       LocalDateTime completedAt) {
        this.member = member;
        this.quiz = quiz;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.timeTaken = timeTaken;
        this.completedAt = completedAt;
    }

    public void addAnswer(Answer answer) {
        this.answers.add(answer);
        answer.setAttempt(this);
    }

    public double getPercentage() {
        return (double) score / totalQuestions * 100;
    }
}
