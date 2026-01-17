<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quizStore'
import { ElMessage } from 'element-plus'
import { Trophy, Aim, Clock, RefreshRight, House, Share } from '@element-plus/icons-vue'

const router = useRouter()
const quizStore = useQuizStore()

const result = computed(() => quizStore.quizResult)
const quiz = computed(() => quizStore.selectedQuiz)

const percentage = computed(() =>
  result.value ? Math.round((result.value.score / result.value.total) * 100) : 0
)

const performance = computed(() => {
  const pct = percentage.value
  if (pct >= 90) return { text: '완벽해요!', emoji: '🎉', color: 'text-green-600', bgColor: 'bg-green-100' }
  if (pct >= 70) return { text: '훌륭해요!', emoji: '🌟', color: 'text-blue-600', bgColor: 'bg-blue-100' }
  if (pct >= 50) return { text: '잘했어요!', emoji: '👍', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
  return { text: '다시 도전해보세요!', emoji: '💪', color: 'text-orange-600', bgColor: 'bg-orange-100' }
})

const circumference = computed(() => 2 * Math.PI * 88)
const strokeDashoffset = computed(() => circumference.value * (1 - percentage.value / 100))

onMounted(() => {
  if (!result.value || !quiz.value) {
    router.push('/quiz-selection')
  }
})

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}분 ${secs}초`
}

function handlePlayAgain() {
  quizStore.clearSelectedQuiz()
  router.push('/quiz-selection')
}

function handleGoHome() {
  quizStore.clearSelectedQuiz()
  router.push('/')
}

function handleShare() {
  const text = `${quiz.value?.title} 퀴즈에서 ${percentage.value}점을 받았어요! 🎉`
  if (navigator.share) {
    navigator.share({ text })
  } else {
    navigator.clipboard.writeText(text)
    ElMessage.success('결과가 클립보드에 복사되었습니다!')
  }
}
</script>

<template>
  <div v-if="result && quiz" class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="max-w-2xl w-full">
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div :class="[performance.bgColor, 'p-8 text-center']">
          <div class="text-6xl mb-4">{{ performance.emoji }}</div>
          <h1 :class="['text-4xl font-bold mb-2', performance.color]">
            {{ performance.text }}
          </h1>
          <p class="text-gray-700">{{ quiz.title }}</p>
        </div>

        <!-- Score Circle -->
        <div class="p-8 text-center">
          <div class="relative inline-flex items-center justify-center mb-6">
            <svg class="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e5e7eb"
                stroke-width="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#9333ea"
                stroke-width="12"
                fill="none"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="strokeDashoffset"
                stroke-linecap="round"
                class="transition-all duration-1000 ease-out"
              />
            </svg>
            <div class="absolute">
              <div class="text-5xl font-bold text-purple-600">{{ percentage }}%</div>
              <div class="text-gray-600 text-sm mt-1">정답률</div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="bg-purple-50 rounded-xl p-4">
              <div class="flex justify-center mb-2">
                <el-icon :size="24" class="text-purple-600"><Trophy /></el-icon>
              </div>
              <div class="text-2xl font-bold text-purple-600 mb-1">{{ result.score }}</div>
              <div class="text-sm text-gray-600">정답</div>
            </div>

            <div class="bg-blue-50 rounded-xl p-4">
              <div class="flex justify-center mb-2">
                <el-icon :size="24" class="text-blue-600"><Aim /></el-icon>
              </div>
              <div class="text-2xl font-bold text-blue-600 mb-1">{{ result.total }}</div>
              <div class="text-sm text-gray-600">전체</div>
            </div>

            <div class="bg-green-50 rounded-xl p-4">
              <div class="flex justify-center mb-2">
                <el-icon :size="24" class="text-green-600"><Clock /></el-icon>
              </div>
              <div class="text-lg font-bold text-green-600 mb-1">{{ formatTime(result.timeTaken) }}</div>
              <div class="text-sm text-gray-600">소요시간</div>
            </div>
          </div>

          <!-- Detailed Results -->
          <div class="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <h3 class="font-semibold text-gray-900 mb-3">결과 요약</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">맞은 문제:</span>
                <span class="font-semibold text-green-600">{{ result.score }}개</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">틀린 문제:</span>
                <span class="font-semibold text-red-600">{{ result.total - result.score }}개</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">평균 소요 시간:</span>
                <span class="font-semibold text-gray-900">{{ Math.round(result.timeTaken / result.total) }}초/문제</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="handlePlayAgain"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
            >
              <el-icon><RefreshRight /></el-icon>
              <span>다른 퀴즈 풀기</span>
            </button>
            <button
              @click="handleGoHome"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              <el-icon><House /></el-icon>
              <span>홈으로</span>
            </button>
          </div>

          <!-- Share Button -->
          <button
            @click="handleShare"
            class="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 text-purple-600 border-2 border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
          >
            <el-icon><Share /></el-icon>
            <span>결과 공유하기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
