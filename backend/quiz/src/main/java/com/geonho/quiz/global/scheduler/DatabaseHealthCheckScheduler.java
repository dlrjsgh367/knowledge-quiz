package com.geonho.quiz.global.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.LocalDateTime;

@Component
@Slf4j
@RequiredArgsConstructor
public class DatabaseHealthCheckScheduler {

    private final DataSource dataSource;

    @Scheduled(fixedDelay = 30 * 1000)
    public void checkDatabaseConnection() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(1)) {
                log.info("DB 연결 정상 - {}", LocalDateTime.now());
            }
        } catch (Exception e) {
            log.error("DB 연결 실패 - {}", e.getMessage());
        }
    }
}
