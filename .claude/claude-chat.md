좋아요! 회원가입/로그인 완료했으니 다음은 **퀴즈 조회 API**를 만들면 돼요.

## 추천 순서

### 1단계: 카테고리 & 퀴즈 조회 (지금 할 것)
```
GET /api/categories           # 카테고리 목록
GET /api/quizzes              # 퀴즈 목록 (카테고리별 필터)
GET /api/quizzes/{id}         # 퀴즈 상세 (문제 + 선택지 포함)
```

**이유:**
- 로그인 후 바로 보여줄 화면 (카테고리 선택 → 퀴즈 목록)
- 퀴즈 풀기 전에 필요한 데이터
- CRUD 중 Read만 있어서 비교적 간단

### 2단계: 퀴즈 제출 & 결과
```
POST /api/attempts            # 퀴즈 제출 및 채점
GET /api/attempts/{id}        # 퀴즈 결과 상세
```

### 3단계: 마이페이지
```
GET /api/members/{id}/attempts     # 내가 푼 퀴즈 목록
GET /api/members/{id}/statistics   # 내 통계
```

## 지금 구현할 API 상세

### 1. 카테고리 목록 조회
```java
// CategoryController
@GetMapping("/api/categories")
public List<CategoryResponse> getCategories() {
    return categoryService.getAllCategories();
}
```

### 2. 퀴즈 목록 조회 (카테고리별)
```java
// QuizController
@GetMapping("/api/quizzes")
public List<QuizResponse> getQuizzes(
    @RequestParam(required = false) Long categoryId
) {
    return quizService.getQuizzes(categoryId);
}
```

### 3. 퀴즈 상세 조회 ⭐ 가장 중요
```java
// QuizController
@GetMapping("/api/quizzes/{id}")
public QuizDetailResponse getQuizDetail(@PathVariable Long id) {
    return quizService.getQuizWithQuestions(id);
}
```

**응답 예시:**
```json
{
  "id": 1,
  "title": "자바 기초 퀴즈",
  "difficulty": "EASY",
  "category": {
    "id": 1,
    "name": "IT"
  },
  "questions": [
    {
      "id": 1,
      "questionText": "JVM이란?",
      "orderNum": 1,
      "options": [
        {"id": 1, "optionText": "자바 가상 머신", "orderNum": 1},
        {"id": 2, "optionText": "자바 변수 매니저", "orderNum": 2},
        {"id": 3, "optionText": "자바 버전 모듈", "orderNum": 3},
        {"id": 4, "optionText": "자바 뷰 모델", "orderNum": 4}
      ]
    }
  ]
}
```

## 주의할 점

**N+1 문제 방지:**
```java
// QuizRepository
@Query("SELECT q FROM Quiz q " +
       "JOIN FETCH q.questions qs " +
       "JOIN FETCH qs.options " +
       "WHERE q.id = :id")
Quiz findByIdWithQuestionsAndOptions(@Param("id") Long id);
```

**정답은 숨기기:**
```java
// OptionResponse - 퀴즈 풀 때는 is_correct 제외
public class OptionResponse {
    private Long id;
    private String optionText;
    private Integer orderNum;
    // is_correct는 제외!
}
```

## 테스트 데이터 준비

`data.sql`에 샘플 데이터 넣어두면 테스트하기 편해요:
```sql
INSERT INTO category (name, code) VALUES ('IT', 'IT');
INSERT INTO quiz (title, category_id, difficulty) VALUES ('자바 기초', 1, 'EASY');
INSERT INTO question (quiz_id, question_text, order_num) VALUES (1, 'JVM이란?', 1);
INSERT INTO option (question_id, option_text, order_num, is_correct) VALUES 
    (1, '자바 가상 머신', 1, true),
    (1, '자바 변수 매니저', 2, false);
```

**카테고리 & 퀴즈 조회 API부터 시작**하시면 될 것 같아요. 진행하면서 막히는 부분 있으면 물어보세요!