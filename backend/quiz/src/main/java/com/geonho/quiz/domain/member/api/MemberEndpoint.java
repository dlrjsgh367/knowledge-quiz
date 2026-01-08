package com.geonho.quiz.domain.member.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberEndpoint {

    @GetMapping("/")
    public String home() {
        return "Hello World";
    }
}
