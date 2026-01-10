package com.geonho.quiz.global.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@MappedSuperclass // 객체의 입장에서 공통 매핑 정보가 필요할 때 사용
@SuperBuilder
@EntityListeners(AuditingEntityListener.class) // JPA Entity에 이벤트가 발생할 때 콜백을 처리하고 코드를 처리하는 방법
@NoArgsConstructor // 파라미터가 없는 디폴터 생성자를 생성
public abstract class BaseEntity {

    @CreatedDate // Entity가 생성될 때 자동으로 현재 날짜와 시간을 저장하는 어노테이션
    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @LastModifiedDate // Entity가 수정될 때 자동으로 현재 날짜와 시간을 저장하는 어노테이션
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
}
