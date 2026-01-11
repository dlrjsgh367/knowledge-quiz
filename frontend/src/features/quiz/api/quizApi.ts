import client from '@/api/client';

export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: {
    id: number;
    name: string;
    code: string;
  };
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  questionCount: number;
  estimatedTime: number;
  createdAt: string;
}

export interface QuizDetail extends Quiz {
  questions: Question[];
}

export interface Question {
  id: number;
  questionText: string;
  orderNum: number;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: number;
  optionText: string;
  orderNum: number;
}

export interface Category {
  id: number;
  name: string;
  code: string;
  icon: string;
  color: string;
  quizCount: number;
}

export const quizApi = {
  // 퀴즈 목록 조회
  getQuizzes: (params?: {
    category?: string;
    difficulty?: string;
    page?: number;
    size?: number;
  }) => client.get<{ content: Quiz[]; totalPages: number }>('/quizzes', { params }),

  // 퀴즈 상세 조회
  getQuizById: (id: number) =>
    client.get<QuizDetail>(`/quizzes/${id}`),

  // 인기 퀴즈 조회
  getPopularQuizzes: (limit = 10) =>
    client.get<Quiz[]>('/quizzes/popular', { params: { limit } }),

  // 카테고리 목록 조회
  getCategories: () =>
    client.get<Category[]>('/categories'),
};
