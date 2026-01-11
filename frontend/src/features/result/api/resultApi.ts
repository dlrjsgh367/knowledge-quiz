import client from '@/api/client';

export interface SubmitQuizRequest {
  quizId: number;
  answers: {
    questionId: number;
    selectedOptionId: number;
  }[];
  timeTaken: number;
}

export interface QuizAttemptResult {
  id: number;
  quiz: {
    id: number;
    title: string;
  };
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  completedAt: string;
  answers: {
    questionId: number;
    selectedOptionId: number;
    isCorrect: boolean;
    correctOptionId: number;
    explanation: string;
  }[];
}

export const resultApi = {
  // 퀴즈 제출
  submitQuiz: (data: SubmitQuizRequest) =>
    client.post<QuizAttemptResult>('/quiz-attempts', data),

  // 퀴즈 시도 상세 조회
  getAttemptById: (id: number) =>
    client.get<QuizAttemptResult>(`/quiz-attempts/${id}`),
};
