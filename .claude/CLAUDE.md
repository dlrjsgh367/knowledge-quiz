# Knowledge Quiz 프로젝트

## 프로젝트 개요

### 목적
- 개발 실력 증진
- 기술 블로그 콘텐츠 제작
- 풀스택 개발 경험 축적

### 프로젝트 정보
- **리포지토리명**: `knowledge-quiz`
- **프로젝트 구조**: 모노레포 (Spring Boot + React)
- **개발 기간**: 2026년 1분기
- **목표**: Toss 이직 준비용 포트폴리오

---

## 기술 스택

### Backend
- **Framework**: Spring Boot 3.5.9
- **Language**: Java 17
- **Build Tool**: Gradle
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA
- **Additional**: Lombok, Validation, Spring Boot DevTools

### Frontend
- **Framework**: React (Vite)
- **방식**: CSR (Client Side Rendering)
- **API 통신**: Axios + Vite Proxy
- **상태 관리**: useState + Context API (초기), 필요시 Zustand/React Query 추가

### Infrastructure
- **로컬 개발**: Docker Compose (MySQL)
- **배포 예정**:
    - Frontend: Vercel 또는 S3
    - Backend: EC2 또는 Elastic Beanstalk

---

## 아키텍처

### Backend: 레이어드 아키텍처 (Layered Architecture)

**선택 이유:**
- 비즈니스 로직이 복잡하지 않은 CRUD 중심 애플리케이션
- Spring Boot의 기본 구조와 가장 잘 맞음
- 빠른 개발과 유지보수 용이
- 실무에서 가장 많이 사용되는 구조

**레이어 구성:**
- **Controller Layer**: API 엔드포인트, HTTP 요청/응답 처리
- **Service Layer**: 비즈니스 로직, 트랜잭션 관리
- **Repository Layer**: 데이터베이스 접근, JPA 쿼리
- **Domain Layer**: 엔티티, 도메인 모델
- **DTO Layer**: 요청/응답 데이터 전송 객체

### Frontend: 기능 기반 구조 (Feature-based)

**선택 이유:**
- 화면/기능이 명확하게 구분됨
- 파일 찾기 쉽고 확장성 좋음
- 백엔드 레이어드 구조와 유사해 이해하기 쉬움

**구성:**
- **features/**: 기능별 컴포넌트, 훅, API 모음
- **shared/**: 공통 컴포넌트, 유틸 함수
- **pages/**: 페이지 컴포넌트 (라우팅)
- **api/**: API 클라이언트 설정

---

## 프로젝트 구조

### Backend (레이어드 아키텍처)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/geonho/quiz/
│   │   │   ├── controller/              # API 엔드포인트
│   │   │   │   ├── MemberController.java
│   │   │   │   ├── QuizController.java
│   │   │   │   ├── AttemptController.java
│   │   │   │   └── CategoryController.java
│   │   │   │
│   │   │   ├── service/                 # 비즈니스 로직
│   │   │   │   ├── MemberService.java
│   │   │   │   ├── QuizService.java
│   │   │   │   ├── AttemptService.java
│   │   │   │   └── CategoryService.java
│   │   │   │
│   │   │   ├── repository/              # 데이터베이스 접근
│   │   │   │   ├── MemberRepository.java
│   │   │   │   ├── QuizRepository.java
│   │   │   │   ├── QuestionRepository.java
│   │   │   │   ├── OptionRepository.java
│   │   │   │   ├── AttemptRepository.java
│   │   │   │   ├── AnswerRepository.java
│   │   │   │   └── CategoryRepository.java
│   │   │   │
│   │   │   ├── domain/                  # 엔티티
│   │   │   │   ├── Member.java
│   │   │   │   ├── Quiz.java
│   │   │   │   ├── Question.java
│   │   │   │   ├── Option.java
│   │   │   │   ├── QuizAttempt.java
│   │   │   │   ├── Answer.java
│   │   │   │   └── Category.java
│   │   │   │
│   │   │   ├── dto/                     # 데이터 전송 객체
│   │   │   │   ├── request/
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── SignupRequest.java
│   │   │   │   │   └── SubmitQuizRequest.java
│   │   │   │   └── response/
│   │   │   │       ├── QuizResponse.java
│   │   │   │       ├── QuizDetailResponse.java
│   │   │   │       ├── AttemptResultResponse.java
│   │   │   │       └── MemberResponse.java
│   │   │   │
│   │   │   ├── config/                  # 설정
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   └── WebConfig.java
│   │   │   │
│   │   │   └── exception/               # 예외 처리
│   │   │       ├── GlobalExceptionHandler.java
│   │   │       ├── QuizNotFoundException.java
│   │   │       └── MemberNotFoundException.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       └── data.sql                 # 초기 데이터
│   │
│   └── test/
│       └── java/com/geonho/quiz/
│           ├── controller/
│           ├── service/
│           └── repository/
│
├── build.gradle
├── docker-compose.yml
└── README.md
```

### Frontend (기능 기반 구조)

```
frontend/
├── src/
│   ├── features/                        # 기능별 모듈
│   │   ├── auth/                       # 인증 관련
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js
│   │   │   └── api/
│   │   │       └── authApi.js
│   │   │
│   │   ├── quiz/                       # 퀴즈 관련
│   │   │   ├── components/
│   │   │   │   ├── QuizList.jsx
│   │   │   │   ├── QuizCard.jsx
│   │   │   │   └── QuizPlayer.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useQuiz.js
│   │   │   └── api/
│   │   │       └── quizApi.js
│   │   │
│   │   ├── result/                     # 결과 관련
│   │   │   ├── components/
│   │   │   │   ├── ResultCard.jsx
│   │   │   │   └── ScoreDisplay.jsx
│   │   │   └── api/
│   │   │       └── resultApi.js
│   │   │
│   │   └── mypage/                     # 마이페이지
│   │       ├── components/
│   │       │   ├── AttemptList.jsx
│   │       │   └── Statistics.jsx
│   │       └── api/
│   │           └── mypageApi.js
│   │
│   ├── shared/                          # 공통 요소
│   │   ├── components/                 # 재사용 컴포넌트
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Header.jsx
│   │   ├── hooks/                      # 공통 훅
│   │   │   └── useFetch.js
│   │   ├── utils/                      # 유틸 함수
│   │   │   └── formatDate.js
│   │   └── contexts/                   # Context API
│   │       └── AuthContext.jsx
│   │
│   ├── pages/                           # 페이지 (라우팅)
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── QuizListPage.jsx
│   │   ├── QuizPage.jsx
│   │   ├── ResultPage.jsx
│   │   └── MyPage.jsx
│   │
│   ├── api/                            # API 설정
│   │   └── client.js                   # axios 인스턴스
│   │
│   ├── routes/                         # 라우팅 설정
│   │   └── index.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

### Root

```
knowledge-quiz/
├── backend/
├── frontend/
├── .gitignore
└── README.md
```

---

## 데이터베이스 설계

### ERD

```
┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
│   Member                             │       │ QuizAttempt                          │       │    Quiz                              │
├──────────────────────────────────────┤       ├──────────────────────────────────────┤       ├──────────────────────────────────────┤
│ id              BIGINT PK            │──1:N──│ id              BIGINT PK            │──N:1──│ id              BIGINT PK            │
│ email           VARCHAR(100) UNIQUE  │       │ member_id       BIGINT FK            │       │ title           VARCHAR(200)         │
│ password        VARCHAR(255)         │       │ quiz_id         BIGINT FK            │       │ category_id     BIGINT FK            │
│ username        VARCHAR(50)          │       │ score           INT                  │       │ difficulty      VARCHAR(20)          │
│ created_at      TIMESTAMP            │       │ time_taken      INT (초)             │       │ created_at      TIMESTAMP            │
│ updated_at      TIMESTAMP            │       │ completed_at    TIMESTAMP            │       └──────────────────────────────────────┘
└──────────────────────────────────────┘       │ created_at      TIMESTAMP            │              │
                                               └──────────────────────────────────────┘              │ 1:N
                                                      │ 1:N                                          ▼
                                                      ▼                                   ┌──────────────────────────────────────┐
                                               ┌──────────────────────────────────────┐  │  Question                            │
                                               │    Answer                            │  ├──────────────────────────────────────┤
                                               ├──────────────────────────────────────┤  │ id              BIGINT PK            │
                                               │ id              BIGINT PK            │  │ quiz_id         BIGINT FK            │
                                               │ attempt_id      BIGINT FK            │  │ question_text   TEXT                 │
                                               │ question_id     BIGINT FK            │  │ order_num       INT                  │
                                               │ selected_option INT                  │  │ created_at      TIMESTAMP            │
                                               │ is_correct      BOOLEAN              │  └──────────────────────────────────────┘
                                               └──────────────────────────────────────┘         │ 1:N
                                                                                                ▼
                                                                                     ┌──────────────────────────────────────┐
                                                                                     │   Option                             │
                                                                                     ├──────────────────────────────────────┤
                                                                                     │ id              BIGINT PK            │
                                                                                     │ question_id     BIGINT FK            │
                                                                                     │ option_text     VARCHAR(500)         │
                                                                                     │ order_num       INT                  │
                                                                                     │ is_correct      BOOLEAN              │
                                                                                     └──────────────────────────────────────┘

┌──────────────────────────────────────┐
│   Category                           │
├──────────────────────────────────────┤
│ id              BIGINT PK            │
│ name            VARCHAR(50)          │
│ code            VARCHAR(20) UNIQUE   │
│ icon            VARCHAR(100)         │
│ color           VARCHAR(20)          │
└──────────────────────────────────────┘
```

### 테이블별 역할

- **Member**: 회원 정보 (누가 서비스를 사용하는가)
- **Category**: 퀴즈 카테고리 (IT, 역사, 과학, 상식 등)
- **Quiz**: 퀴즈 정보 (어떤 퀴즈가 있는가)
- **Question**: 퀴즈별 문제 (각 퀴즈의 문제들)
- **Option**: 문제별 선택지 (각 문제의 답 후보들)
- **QuizAttempt**: 퀴즈 시도 기록 (누가, 언제, 어떤 퀴즈를 풀었는가)
- **Answer**: 답안 기록 (각 문제에 무엇을 선택했는가)

---

## 데이터베이스 설정

### Docker Compose 구성

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: home-container
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root1234
      MYSQL_DATABASE: home_db
      MYSQL_USER: user
      MYSQL_PASSWORD: qwer1234!@
    ports:
      - "3306:3306"
    volumes:
      - home_mysql_data:/var/lib/mysql
    networks:
      - home-network
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
      - --default-authentication-plugin=mysql_native_password

volumes:
  home_mysql_data:

networks:
  home-network:
    driver: bridge
```

### application.yml 설정

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/home_db?useSSL=false&serverTimezone=Asia/Seoul&characterEncoding=UTF-8
    username: user
    password: qwer1234!@
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQLDialect
```

### 실행 방법

```bash
# MySQL 컨테이너 시작
docker-compose up -d

# 로그 확인
docker-compose logs -f mysql

# 컨테이너 중지
docker-compose down

# 데이터까지 삭제
docker-compose down -v
```

---

## 서비스 흐름

### 사용자 시나리오: 퀴즈 풀기

```
1. 회원가입/로그인
   → Member 테이블에 사용자 정보 저장

2. 메인 화면에서 "IT 상식" 카테고리 선택
   → Category 테이블 조회

3. "자바 기초 퀴즈" 선택
   → Quiz 테이블에서 퀴즈 조회
   → Question 테이블에서 문제 조회
   → Option 테이블에서 선택지 조회

4. 문제 풀기
   → 각 문제에 대해 선택지 선택

5. 퀴즈 제출
   → QuizAttempt 테이블에 시도 기록
   → Answer 테이블에 답안 저장
   → 정답 체크 및 점수 계산

6. 결과 화면
   → QuizAttempt + Answer 조회하여 결과 표시
```

### API 흐름 예시

```
GET /api/categories
→ 카테고리 목록 조회

GET /api/quizzes?category=IT
→ IT 카테고리 퀴즈 목록 조회

GET /api/quizzes/1
→ 퀴즈 상세 (문제 + 선택지 포함)

POST /api/attempts
{
  "quiz_id": 1,
  "answers": [
    {"question_id": 1, "selected_option": 1},
    {"question_id": 2, "selected_option": 2}
  ]
}
→ 퀴즈 제출 및 결과 반환

GET /api/members/1/attempts
→ 내가 푼 퀴즈 목록
```

---

## 화면 구성 (MVP)

### 필수 화면
1. **메인(홈) 화면**
    - 로그인 전/후 랜딩 페이지
    - 오늘의 퀴즈 미리보기

2. **로그인/회원가입**
    - 이메일 기반 인증

3. **퀴즈 선택**
    - 카테고리별 분류 (역사/과학/상식/IT 등)

4. **퀴즈 풀기**
    - 문제 표시
    - 객관식 선택
    - 타이머 (선택사항)

5. **결과 화면**
    - 점수 표시
    - 정답/오답 확인
    - 공유 기능

6. **마이페이지**
    - 내가 푼 퀴즈 목록
    - 내가 푼 퀴즈 상세
    - 통계 (정답률, 총 문제 수 등)

### 추가 고려 기능
- 랭킹 화면 (전체/주간 상위 유저)
- 관리자 페이지 (퀴즈 등록/수정)

---

## 개발 로드맵

### Phase 1: 백엔드 API 개발
- [ ] 프로젝트 초기 설정
- [ ] 도메인 모델 설계
- [ ] DB 스키마 설계
- [ ] REST API 구현
    - 회원 관리 API
    - 퀴즈 조회 API
    - 퀴즈 풀이/제출 API
    - 결과 조회 API
- [ ] 단위 테스트 작성

### Phase 2: 프론트엔드 개발
- [ ] React 프로젝트 초기 설정
- [ ] 컴포넌트 구조 설계
- [ ] 화면별 UI 구현
- [ ] API 연동
- [ ] 상태 관리

### Phase 3: 통합 및 배포
- [ ] 프론트-백엔드 통합 테스트
- [ ] 배포 환경 구성
- [ ] 배포

---

## 블로그 포스팅 계획

### 시리즈 구성
1. **프로젝트 기획**
    - "상식 퀴즈 사이트의 MVP 설계"
    - "사용자 경험을 고려한 화면 플로우"
    - "퀴즈 사이트에 레이어드 아키텍처를 선택한 이유"

2. **백엔드 개발**
    - "퀴즈 앱의 도메인 설계와 DB 스키마"
    - "Spring Boot REST API 설계"
    - "JPA를 활용한 퀴즈 데이터 관리"

3. **프론트엔드 개발**
    - "모노레포로 관리하는 풀스택 프로젝트 구조"
    - "Spring Boot API와 React 연동하기"
    - "기능 기반 React 프로젝트 구조"

4. **최적화 및 배포**
    - "퀴즈 조회 성능 최적화"
    - "AWS를 활용한 풀스택 배포"

---

## 참고 사항

### Vite Proxy 설정
```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
}
```

### 개발 실행
```bash
# Backend (포트 8080)
cd backend
./gradlew bootRun

# Frontend (포트 5173)
cd frontend
npm run dev
```

### 코드 예시

**Backend - Controller**
```java
@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
  private final QuizService quizService;
  
  @GetMapping("/{id}")
  public QuizResponse getQuiz(@PathVariable Long id) {
    return quizService.getQuizWithQuestions(id);
  }
}
```

**Frontend - API 호출**
```javascript
// features/quiz/api/quizApi.js
import client from '@/api/client';

export const quizApi = {
  getQuizById: (id) => client.get(`/api/quizzes/${id}`)
};
```

**Frontend - Custom Hook**
```javascript
// features/quiz/hooks/useQuiz.js
import { useState, useEffect } from 'react';
import { quizApi } from '../api/quizApi';

export const useQuiz = (quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quizApi.getQuizById(quizId)
    .then(res => setQuiz(res.data))
    .finally(() => setLoading(false));
  }, [quizId]);

  return { quiz, loading };
};
```

---

## 학습 목표

### 기술적 목표
- Spring Boot 3.x 최신 기능 활용
- React Hooks와 현대적 상태 관리
- REST API 설계 원칙 적용
- JPA 성능 최적화 경험
- 레이어드 아키텍처 설계 경험
- 기능 기반 프론트엔드 구조 설계

### 포트폴리오 목표
- 풀스택 개발 역량 증명
- 체계적인 프로젝트 관리 능력
- 기술 블로그를 통한 학습 과정 공유
- Toss 지원 시 차별화된 포트폴리오
- 아키텍처 선택에 대한 논리적 사고 증명

---

## 다음 단계

1. ~~프로젝트 구조 설계~~ ✅
2. ~~DB 환경 구축~~ ✅
3. ~~아키텍처 선택~~ ✅
4. **도메인 모델 및 엔티티 설계** (진행 예정)
5. 백엔드 API 개발 시작