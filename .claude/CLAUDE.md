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

### Infrastructure
- **로컬 개발**: Docker Compose (MySQL)
- **배포 예정**:
  - Frontend: Vercel 또는 S3
  - Backend: EC2 또는 Elastic Beanstalk

---

## 프로젝트 구조

```
knowledge-quiz/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/geonho/quiz/
│   │   │   │   ├── domain/          # 도메인 모델
│   │   │   │   ├── controller/      # REST API
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   └── config/
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── data.sql         # 초기 퀴즈 데이터
│   │   └── test/
│   ├── build.gradle
│   ├── docker-compose.yml
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Quiz/
│   │   │   ├── Result/
│   │   │   └── common/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── api/                     # axios 인스턴스, API 호출
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
└── README.md
```

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

2. **백엔드 개발**
    - "퀴즈 앱의 도메인 설계와 DB 스키마"
    - "Spring Boot REST API 설계"
    - "JPA를 활용한 퀴즈 데이터 관리"

3. **프론트엔드 개발**
    - "모노레포로 관리하는 풀스택 프로젝트 구조"
    - "Spring Boot API와 React 연동하기"

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
      '/api': 'http://localhost:8080'
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

---

## 학습 목표

### 기술적 목표
- Spring Boot 3.x 최신 기능 활용
- React Hooks와 현대적 상태 관리
- REST API 설계 원칙 적용
- JPA 성능 최적화 경험

### 포트폴리오 목표
- 풀스택 개발 역량 증명
- 체계적인 프로젝트 관리 능력
- 기술 블로그를 통한 학습 과정 공유
- Toss 지원 시 차별화된 포트폴리오

---

## 다음 단계

1. ~~프로젝트 구조 설계~~ ✅
2. ~~DB 환경 구축~~ ✅
3. **화면정의서 작성** (진행 예정)
4. 도메인 모델 및 DB 스키마 설계
5. 백엔드 API 개발 시작