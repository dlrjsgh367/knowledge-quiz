## 들어가며

안녕하세요. 오늘은 Spring Scheduler에 대해 알아보겠습니다.

웹 애플리케이션을 개발하다 보면 **정해진 시간마다 반복적으로 실행해야 하는 작업**들이 생기곤 합니다. 예를 들어 매일 자정에 통계 데이터를 집계한다거나, 10분마다 외부 API에서 최신 데이터를 가져오는 작업 같은 것들이죠.

이런 작업들을 수동으로 실행하는 건 비효율적이고 실수하기 쉽습니다. Spring Scheduler는 이런 **정기적인 작업을 자동으로 실행**할 수 있게 도와주는 기능입니다.

그럼 이론부터 차근차근 알아보고, 제 개인 프로젝트에 어떻게 적용했는지 공유해드리겠습니다.

---

## Spring Scheduler 기본 개념

### 설치 방법

좋은 소식이 있습니다 ㅋㅋ. 따로 설치할 게 없어요

Spring Boot Starter를 사용하고 계신다면 Spring Scheduler는 이미 포함되어 있습니다. 별도의 의존성 추가 없이 바로 사용할 수 있습니다.

### 주요 기능

Spring Scheduler의 핵심은 **`@Scheduled` 어노테이션**입니다. 이 어노테이션을 메서드에 붙이면 해당 메서드가 정해진 규칙에 따라 자동으로 실행됩니다.

#### 필수 설정: @EnableScheduling

Scheduler를 사용하려면 반드시 **Application 클래스에 `@EnableScheduling`을 추가**해야 합니다.

```java
@SpringBootApplication
@EnableScheduling  // 이걸 꼭 추가해야 함
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

이 어노테이션이 없으면 `@Scheduled`가 붙은 메서드들이 실행되지 않으니 주의하세요.

---

## Spring Scheduler 사용 방법

### 설치 과정

앞서 말씀드린 것처럼 Spring Boot Starter를 사용하고 있다면 **추가 설치 없이 바로 사용 가능**합니다.

### @Scheduled 어노테이션 사용하기

#### 기본 규칙

`@Scheduled` 어노테이션을 사용할 때 지켜야 할 몇 가지 규칙이 있습니다.

**메서드 제약사항**
- 파라미터를 받으면 안 됩니다.
- 일반적으로 `void` 타입을 사용합니다.
- 다른 타입을 반환해도 되지만, 반환 값은 무시됩니다.

**클래스 제약사항**
- `@Scheduled`가 붙은 메서드의 클래스는 **Spring Bean으로 등록**되어야 합니다.
- `@Component`, `@Service` 등의 어노테이션을 붙여주세요.

```java
@Component
public class ScheduledTasks {
    
    @Scheduled(fixedRate = 5*1000)
    public void reportCurrentTime() {
        // 이 메서드는 5초마다 실행됨
        System.out.println("현재 시각: " + LocalDateTime.now());
    }
}
```

### 스케줄링 방식 선택하기

`@Scheduled` 어노테이션은 세 가지 주요 속성을 제공합니다. **이 중 하나를 선택**해서 사용하면 됩니다.

### 1. cron

**Unix cron 표현식**을 사용하는 방식입니다. 특정 시간에 작업을 실행하고 싶을 때 유용합니다.

```java
@Scheduled(cron = "0 0 0 * * ?")  // 매일 자정에 실행
public void midnightTask() {
    System.out.println("자정 작업 실행!");
}
```

이전 작업이 설정된 cron 시간까지 종료되지 않으면, 해당 시간의 작업은 건너뛰고 다음 cron 시간을 기다립니다.

예를 들어 매시 정각에 실행되는 작업이 있는데, 1시에 시작한 작업이 2시 5분까지 걸렸다면 2시 작업은 건너뛰고 3시에 다음 작업이 실행됩니다.

### 2. fixedDelay

**이전 작업이 끝난 후** 지정된 시간만큼 기다렸다가 다음 작업을 실행합니다.

```java
@Scheduled(fixedDelay = 10 * 1000)  // 이전 작업 종료 후 10초 뒤 실행
public void delayedTask() {
    System.out.println("이전 작업 완료 후 10초 지남!");
}
```

작업이 완료되는 시점부터 타이머가 시작됩니다.
만약 작업이 3초 걸렸다면, 작업 완료 후 10초를 기다렸다가 다음 작업이 시작됩니다 (총 13초 간격).

### 3. fixedRate

**작업 시작 시점**을 기준으로 일정한 간격으로 실행합니다.

```java
@Scheduled(fixedRate = 5 * 1000)  // 5초마다 실행
public void regularTask() {
    System.out.println("5초마다 실행!");
}
```

fixedRate는 작업 시작 시점을 기준으로 간격을 계산합니다.

만약 작업이 **설정한 간격보다 오래 걸리면** 어떻게 될까요?

다음 작업은 큐에 대기하다가 현재 작업이 끝나는 즉시 실행됩니다.

예를 들어 5초 간격으로 설정했는데 작업이 7초 걸렸다면, 작업이 끝나자마자 바로 다음 작업이 시작됩니다.

### initialDelay: 최초 실행 지연

모든 스케줄링 방식에 **선택적으로 추가**할 수 있는 속성입니다.

```java
@Scheduled(fixedRate = 5 * 1000, initialDelay = 10 * 1000)
public void delayedStart() {
    // 애플리케이션 시작 후 10초 뒤에 처음 실행되고,
    // 그 이후부터 5초마다 실행됨
}
```

**일회성 작업**을 만들고 싶다면 `initialDelay`만 사용할 수도 있습니다.

```java
@Scheduled(initialDelay = 5 * 1000)
public void oneTimeTask() {
    // 애플리케이션 시작 후 5초 뒤에 딱 한 번만 실행
}
```

### 실제 프로젝트 적용 예시

실제 프로젝트에 적용하고 작성 예정입니다.

---

## 마무리

Spring Scheduler는 **정기적인 작업을 자동화**하는 간단하면서도 강력한 도구입니다.

**핵심만 정리하면**
- Application 클래스에 `@EnableScheduling` 추가
- 스케줄러 클래스에 `@Component` 붙이기
- 실행할 메서드에 `@Scheduled` 붙이고 cron/fixedDelay/fixedRate 중 선택
- 메서드는 파라미터 없이, 보통 void 타입으로 작성

이 정도만 알아도 대부분의 스케줄링 작업은 충분히 처리할 수 있습니다.

여러분도 반복적인 작업이 있다면 Spring Scheduler로 자동화해보세요. 시간도 절약되고 실수도 줄일 수 있습니다.

---

**Reference**

https://docs.spring.io/spring-framework/reference/integration/scheduling.html

https://blog.naver.com/seek316/222705515189

https://velog.io/@ktf1686/Spring-Spring-Scheduler-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0

https://hongminpark.github.io/2020-04-13/Spring-Scheduler