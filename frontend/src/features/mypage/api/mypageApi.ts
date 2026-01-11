import client from '@/api/client';

export interface QuizAttemptHistory {
  id: number;
  quiz: {
    id: number;
    title: string;
    category: {
      name: string;
      code: string;
    };
  };
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  completedAt: string;
}

export interface MemberStats {
  totalAttempts: number;
  totalQuestions: number;
  totalCorrect: number;
  averageScore: number;
  totalTimeTaken: number;
  categoryStats: {
    category: {
      id: number;
      name: string;
      code: string;
    };
    attemptCount: number;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
  }[];
  recentAttempts: QuizAttemptHistory[];
}

export const mypageApi = {
  // 내 퀴즈 히스토리
  getMyHistory: (params?: { page?: number; size?: number }) =>
    client.get<{
      content: QuizAttemptHistory[];
      totalPages: number;
    }>('/users/me/history', { params }),

  // 내 전체 통계
  getMyStats: () =>
    client.get<MemberStats>('/users/me/stats'),
};
