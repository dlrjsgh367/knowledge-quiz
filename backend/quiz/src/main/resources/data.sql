-- =====================================================
-- Knowledge Quiz 초기 데이터
-- =====================================================

-- 중복 실행 방지: 데이터가 없을 때만 INSERT
-- =====================================================

-- 카테고리
-- =====================================================
INSERT INTO category (name, code, icon, color, display_order, created_at)
SELECT 'IT/프로그래밍', 'IT', '💻', '#3B82F6', 1, NOW()
WHERE NOT EXISTS (SELECT 1 FROM category WHERE code = 'IT');

INSERT INTO category (name, code, icon, color, display_order, created_at)
SELECT '역사', 'HISTORY', '📜', '#EF4444', 2, NOW()
WHERE NOT EXISTS (SELECT 1 FROM category WHERE code = 'HISTORY');

INSERT INTO category (name, code, icon, color, display_order, created_at)
SELECT '과학', 'SCIENCE', '🔬', '#10B981', 3, NOW()
WHERE NOT EXISTS (SELECT 1 FROM category WHERE code = 'SCIENCE');

INSERT INTO category (name, code, icon, color, display_order, created_at)
SELECT '상식', 'GENERAL', '💡', '#F59E0B', 4, NOW()
WHERE NOT EXISTS (SELECT 1 FROM category WHERE code = 'GENERAL');

-- =====================================================
-- IT 카테고리 퀴즈
-- =====================================================

-- 퀴즈 1: 자바 기초
INSERT INTO quiz (title, description, category_id, difficulty, estimated_time, is_published, created_at, updated_at)
SELECT '자바 기초 퀴즈', 'Java 기본 문법과 개념을 테스트합니다.',
       (SELECT id FROM category WHERE code = 'IT'), 'EASY', 10, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM quiz WHERE title = '자바 기초 퀴즈');

-- 문제 1-1: JVM
INSERT INTO question (quiz_id, question_text, order_num, explanation, created_at, updated_at)
SELECT (SELECT id FROM quiz WHERE title = '자바 기초 퀴즈'),
       'JVM은 무엇의 약자인가요?', 1,
       'JVM은 Java Virtual Machine의 약자로, 자바 바이트코드를 실행하는 가상 머신입니다.',
       NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?');

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?'),
       'Java Virtual Machine', 1, true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'Java Virtual Machine'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?'),
       'Java Variable Manager', 2, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'Java Variable Manager'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?'),
       'Java Version Module', 3, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'Java Version Module'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?'),
       'Java View Model', 4, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'Java View Model'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'JVM은 무엇의 약자인가요?'));

-- 문제 1-2: 기본 자료형
INSERT INTO question (quiz_id, question_text, order_num, explanation, created_at, updated_at)
SELECT (SELECT id FROM quiz WHERE title = '자바 기초 퀴즈'),
       'Java에서 기본 자료형(Primitive Type)이 아닌 것은?', 2,
       'String은 참조 자료형(클래스)입니다. Java의 기본 자료형은 byte, short, int, long, float, double, boolean, char 8가지입니다.',
       NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?');

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?'),
       'int', 1, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'int'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?'),
       'boolean', 2, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'boolean'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?'),
       'String', 3, true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'String'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?'),
       'double', 4, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'double'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Java에서 기본 자료형(Primitive Type)이 아닌 것은?'));

-- 문제 1-3: 접근 제어자
INSERT INTO question (quiz_id, question_text, order_num, explanation, created_at, updated_at)
SELECT (SELECT id FROM quiz WHERE title = '자바 기초 퀴즈'),
       'Java의 접근 제어자(Access Modifier)가 아닌 것은?', 3,
       'friend는 C++의 접근 제어자입니다. Java의 접근 제어자는 public, protected, default(package-private), private 4가지입니다.',
       NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?');

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?'),
       'public', 1, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'public'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?'),
       'private', 2, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'private'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?'),
       'protected', 3, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'protected'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?'),
       'friend', 4, true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = 'friend'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Java의 접근 제어자(Access Modifier)가 아닌 것은?'));

-- =====================================================
-- 퀴즈 2: Spring Boot 입문
-- =====================================================
INSERT INTO quiz (title, description, category_id, difficulty, estimated_time, is_published, created_at, updated_at)
SELECT 'Spring Boot 입문', 'Spring Boot 핵심 개념을 확인해보세요.',
       (SELECT id FROM category WHERE code = 'IT'), 'MEDIUM', 15, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM quiz WHERE title = 'Spring Boot 입문');

-- 문제 2-1: @SpringBootApplication
INSERT INTO question (quiz_id, question_text, order_num, explanation, created_at, updated_at)
SELECT (SELECT id FROM quiz WHERE title = 'Spring Boot 입문'),
       '@SpringBootApplication 어노테이션에 포함되지 않는 것은?', 1,
       '@SpringBootApplication은 @Configuration, @EnableAutoConfiguration, @ComponentScan을 포함합니다. @RestController는 별도의 어노테이션입니다.',
       NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?');

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?'),
       '@Configuration', 1, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '@Configuration'
                  AND question_id = (SELECT id FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?'),
       '@EnableAutoConfiguration', 2, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '@EnableAutoConfiguration'
                  AND question_id = (SELECT id FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?'),
       '@ComponentScan', 3, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '@ComponentScan'
                  AND question_id = (SELECT id FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?'),
       '@RestController', 4, true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '@RestController'
                  AND question_id = (SELECT id FROM question WHERE question_text = '@SpringBootApplication 어노테이션에 포함되지 않는 것은?'));

-- 문제 2-2: 의존성 주입
INSERT INTO question (quiz_id, question_text, order_num, explanation, created_at, updated_at)
SELECT (SELECT id FROM quiz WHERE title = 'Spring Boot 입문'),
       'Spring에서 권장하는 의존성 주입(DI) 방식은?', 2,
       'Spring 공식 문서에서는 생성자 주입을 권장합니다. 불변성 보장, 순환 참조 방지, 테스트 용이성 등의 장점이 있습니다.',
       NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?');

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?'),
       '필드 주입 (@Autowired)', 1, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '필드 주입 (@Autowired)'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?'),
       '세터 주입', 2, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '세터 주입'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?'),
       '생성자 주입', 3, true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '생성자 주입'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?'),
       '룩업 메서드 주입', 4, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '룩업 메서드 주입'
                  AND question_id = (SELECT id FROM question WHERE question_text = 'Spring에서 권장하는 의존성 주입(DI) 방식은?'));

-- =====================================================
-- 상식 카테고리 퀴즈
-- =====================================================
INSERT INTO quiz (title, description, category_id, difficulty, estimated_time, is_published, created_at, updated_at)
SELECT '일반 상식 퀴즈', '다양한 분야의 기본 상식을 테스트합니다.',
       (SELECT id FROM category WHERE code = 'GENERAL'), 'EASY', 5, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM quiz WHERE title = '일반 상식 퀴즈');

-- 문제 3-1: 대한민국 수도
INSERT INTO question (quiz_id, question_text, order_num, explanation, created_at, updated_at)
SELECT (SELECT id FROM quiz WHERE title = '일반 상식 퀴즈'),
       '대한민국의 수도는 어디인가요?', 1,
       '대한민국의 수도는 서울특별시입니다. 1948년 정부 수립 이후 대한민국의 수도로 지정되었습니다.',
       NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM question WHERE question_text = '대한민국의 수도는 어디인가요?');

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = '대한민국의 수도는 어디인가요?'),
       '서울', 1, true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '서울'
                  AND question_id = (SELECT id FROM question WHERE question_text = '대한민국의 수도는 어디인가요?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = '대한민국의 수도는 어디인가요?'),
       '부산', 2, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '부산'
                  AND question_id = (SELECT id FROM question WHERE question_text = '대한민국의 수도는 어디인가요?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = '대한민국의 수도는 어디인가요?'),
       '대전', 3, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '대전'
                  AND question_id = (SELECT id FROM question WHERE question_text = '대한민국의 수도는 어디인가요?'));

INSERT INTO question_option (question_id, option_text, order_num, is_correct, created_at)
SELECT (SELECT id FROM question WHERE question_text = '대한민국의 수도는 어디인가요?'),
       '세종', 4, false, NOW()
WHERE NOT EXISTS (SELECT 1 FROM question_option WHERE option_text = '세종'
                  AND question_id = (SELECT id FROM question WHERE question_text = '대한민국의 수도는 어디인가요?'));
