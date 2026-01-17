import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Quiz, QuizHistory, QuizResult } from '@/types'

export const useQuizStore = defineStore('quiz', () => {
  const selectedQuiz = ref<Quiz | null>(null)
  const quizResult = ref<QuizResult | null>(null)
  const quizHistory = ref<QuizHistory[]>([])

  // Load history from localStorage
  function loadHistory() {
    const savedHistory = localStorage.getItem('quizAppHistory')
    if (savedHistory) {
      quizHistory.value = JSON.parse(savedHistory)
    }
  }

  // Select a quiz
  function selectQuiz(quiz: Quiz) {
    selectedQuiz.value = quiz
  }

  // Clear selected quiz
  function clearSelectedQuiz() {
    selectedQuiz.value = null
    quizResult.value = null
  }

  // Complete quiz and save result
  function completeQuiz(score: number, total: number, timeTaken: number, userId: string) {
    quizResult.value = { score, total, timeTaken }

    if (selectedQuiz.value) {
      const newHistory: QuizHistory = {
        id: Date.now().toString(),
        quizId: selectedQuiz.value.id,
        quizTitle: selectedQuiz.value.title,
        category: selectedQuiz.value.category,
        score,
        totalQuestions: total,
        completedAt: new Date(),
        timeTaken,
      }

      quizHistory.value = [newHistory, ...quizHistory.value]
      localStorage.setItem('quizAppHistory', JSON.stringify(quizHistory.value))
    }
  }

  // Statistics
  const totalQuizzes = computed(() => quizHistory.value.length)

  const totalQuestions = computed(() =>
    quizHistory.value.reduce((sum, quiz) => sum + quiz.totalQuestions, 0)
  )

  const totalCorrect = computed(() =>
    quizHistory.value.reduce((sum, quiz) => sum + quiz.score, 0)
  )

  const averageScore = computed(() =>
    totalQuestions.value > 0
      ? Math.round((totalCorrect.value / totalQuestions.value) * 100)
      : 0
  )

  const totalTimeTaken = computed(() =>
    quizHistory.value.reduce((sum, quiz) => sum + quiz.timeTaken, 0)
  )

  const categoryStats = computed(() => {
    return quizHistory.value.reduce((acc, quiz) => {
      if (!acc[quiz.category]) {
        acc[quiz.category] = { count: 0, correct: 0, total: 0 }
      }
      acc[quiz.category].count++
      acc[quiz.category].correct += quiz.score
      acc[quiz.category].total += quiz.totalQuestions
      return acc
    }, {} as Record<string, { count: number; correct: number; total: number }>)
  })

  return {
    selectedQuiz,
    quizResult,
    quizHistory,
    loadHistory,
    selectQuiz,
    clearSelectedQuiz,
    completeQuiz,
    // Statistics
    totalQuizzes,
    totalQuestions,
    totalCorrect,
    averageScore,
    totalTimeTaken,
    categoryStats,
  }
})
