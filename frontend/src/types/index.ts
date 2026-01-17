export type Screen = 'home' | 'auth' | 'quiz-selection' | 'quiz-play' | 'quiz-result' | 'mypage'

export interface User {
  id: string
  username: string
  email: string
}

export interface Quiz {
  id: string
  title: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  questions: Question[]
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizHistory {
  id: string
  quizId: string
  quizTitle: string
  category: string
  score: number
  totalQuestions: number
  completedAt: Date
  timeTaken: number
}

export interface QuizResult {
  score: number
  total: number
  timeTaken: number
}

// Auth API types
export interface SignupRequest {
  email: string
  password: string
  username: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  id: number
  email: string
  username: string
  role: string
  status: string
  createdAt: string
}

export interface LoginResponse extends AuthResponse {
  accessToken: string
  refreshToken: string
}
