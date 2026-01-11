package com.geonho.quiz.domain;

import com.geonho.quiz.global.entity.BaseEntity;
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
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "question")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "order_num", nullable = false)
    private Integer orderNum;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderNum ASC")
    private List<QuestionOption> options = new ArrayList<>();

    @Builder
    public Question(Quiz quiz, String questionText, Integer orderNum, String explanation) {
        this.quiz = quiz;
        this.questionText = questionText;
        this.orderNum = orderNum;
        this.explanation = explanation;
    }

    protected void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public void addOption(QuestionOption option) {
        this.options.add(option);
        option.setQuestion(this);
    }

    public QuestionOption getCorrectOption() {
        return options.stream()
            .filter(QuestionOption::getIsCorrect)
            .findFirst()
            .orElseThrow(() -> new IllegalStateException("정답이 설정되지 않았습니다."));
    }
}
