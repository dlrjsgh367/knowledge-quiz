package com.geonho.quiz.domain.quiz.entity;

import com.geonho.quiz.domain.member.entity.Member;
import com.geonho.quiz.global.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Difficulty difficulty;

    @Column(name = "estimated_time")
    private Integer estimatedTime;

    @Column(name = "is_published")
    private Boolean isPublished = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private Member createdBy;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderNum ASC")
    private List<Question> questions = new ArrayList<>();

    @Builder
    public Quiz(String title, String description, Category category,
                Difficulty difficulty, Integer estimatedTime) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.difficulty = difficulty;
        this.estimatedTime = estimatedTime;
    }

    // 비즈니스 메서드
    public void publish() {
        this.isPublished = true;
    }

    public void unpublish() {
        this.isPublished = false;
    }

    public void addQuestion(Question question) {
        this.questions.add(question);
        question.setQuiz(this);
    }
}
