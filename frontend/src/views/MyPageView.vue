<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useQuizStore } from '@/stores/quizStore'
import { ArrowLeft, Trophy, Aim, Clock, TrendCharts, Calendar } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()
const quizStore = useQuizStore()

const user = computed(() => authStore.user)

onMounted(() => {
  if (!user.value) {
    router.push('/')
  }
})

function formatDate(date: Date) {
  const d = new Date(date)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}분 ${secs}초`
}

function getCategoryName(category: string) {
  const names: Record<string, string> = {
    history: '역사',
    science: '과학',
    geography: '지리',
    culture: '문화',
    entertainment: '엔터테인먼트',
    technology: '기술',
    general: '일반상식',
  }
  return names[category] || category
}

function getScoreColor(pct: number) {
  if (pct >= 80) return 'text-green-600 bg-green-50'
  if (pct >= 60) return 'text-blue-600 bg-blue-50'
  if (pct >= 40) return 'text-yellow-600 bg-yellow-50'
  return 'text-red-600 bg-red-50'
}
</script>

<template>
  <div v-if="user" class="min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          @click="router.push('/')"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <el-icon><ArrowLeft /></el-icon>
          <span>홈으로</span>
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- User Info -->
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h1 class="text-3xl font-bold">{{ user.username }}</h1>
            <p class="text-purple-100">{{ user.email }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-2xl font-bold">{{ quizStore.totalQuizzes }}</div>
            <div class="text-sm text-purple-100">완료한 퀴즈</div>
          </div>
          <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-2xl font-bold">{{ quizStore.averageScore }}%</div>
            <div class="text-sm text-purple-100">평균 정답률</div>
          </div>
          <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-2xl font-bold">{{ quizStore.totalCorrect }}</div>
            <div class="text-sm text-purple-100">맞은 문제</div>
          </div>
          <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-2xl font-bold">{{ formatTime(quizStore.totalTimeTaken) }}</div>
            <div class="text-sm text-purple-100">총 소요시간</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Statistics -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <el-icon class="text-purple-600"><TrendCharts /></el-icon>
              전체 통계
            </h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <el-icon class="text-purple-600"><Trophy /></el-icon>
                  <span class="text-sm text-gray-700">평균 점수</span>
                </div>
                <span class="font-bold text-purple-600">{{ quizStore.averageScore }}%</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <el-icon class="text-blue-600"><Aim /></el-icon>
                  <span class="text-sm text-gray-700">총 문제 수</span>
                </div>
                <span class="font-bold text-blue-600">{{ quizStore.totalQuestions }}</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <el-icon class="text-green-600"><Clock /></el-icon>
                  <span class="text-sm text-gray-700">평균 시간</span>
                </div>
                <span class="font-bold text-green-600">
                  {{ quizStore.totalQuizzes > 0 ? formatTime(Math.round(quizStore.totalTimeTaken / quizStore.totalQuizzes)) : '0초' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Category Performance -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">카테고리별 성적</h2>
            <div class="space-y-3">
              <div
                v-for="(stats, category) in quizStore.categoryStats"
                :key="category"
                class="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700">
                    {{ getCategoryName(category as string) }}
                  </span>
                  <span class="text-sm font-bold text-purple-600">
                    {{ Math.round((stats.correct / stats.total) * 100) }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${Math.round((stats.correct / stats.total) * 100)}%` }"
                  />
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{{ stats.count }}개 퀴즈</span>
                  <span>{{ stats.correct }}/{{ stats.total }} 정답</span>
                </div>
              </div>
              <p
                v-if="Object.keys(quizStore.categoryStats).length === 0"
                class="text-sm text-gray-500 text-center py-4"
              >
                아직 완료한 퀴즈가 없습니다
              </p>
            </div>
          </div>
        </div>

        <!-- Quiz History -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <el-icon class="text-purple-600"><Calendar /></el-icon>
              퀴즈 기록
            </h2>

            <div v-if="quizStore.quizHistory.length > 0" class="space-y-4">
              <div
                v-for="quiz in quizStore.quizHistory"
                :key="quiz.id"
                class="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1">{{ quiz.quizTitle }}</h3>
                    <div class="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span class="px-2 py-1 bg-gray-100 rounded">
                        {{ getCategoryName(quiz.category) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <el-icon :size="16"><Clock /></el-icon>
                        {{ formatTime(quiz.timeTaken) }}
                      </span>
                      <span class="text-gray-400">•</span>
                      <span>{{ formatDate(quiz.completedAt) }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="text-right">
                      <div class="text-sm text-gray-600">정답률</div>
                      <div :class="['text-2xl font-bold', getScoreColor(Math.round((quiz.score / quiz.totalQuestions) * 100)).split(' ')[0]]">
                        {{ Math.round((quiz.score / quiz.totalQuestions) * 100) }}%
                      </div>
                    </div>
                    <div :class="['px-4 py-2 rounded-lg', getScoreColor(Math.round((quiz.score / quiz.totalQuestions) * 100))]">
                      <div class="font-bold">{{ quiz.score }}/{{ quiz.totalQuestions }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <div class="text-6xl mb-4">📝</div>
              <p class="text-gray-600 text-lg mb-2">아직 완료한 퀴즈가 없습니다</p>
              <p class="text-gray-500 text-sm">첫 퀴즈를 풀어보세요!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
