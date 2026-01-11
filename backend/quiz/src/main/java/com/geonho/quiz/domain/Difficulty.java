package com.geonho.quiz.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Difficulty {
    EASY("초급"),
    MEDIUM("중급"),
    HARD("고급");

    private final String description;
}
