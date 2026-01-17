<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quizStore'
import { useAuthStore } from '@/stores/authStore'
import { Clock, Close, CircleCheck } from '@element-plus/icons-vue'

const router = useRouter()
const quizStore = useQuizStore()
const authStore = useAuthStore()

const currentQuestionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const answers = ref<(number | null)[]>([])
const showResult = ref(false)
const startTime = ref(Date.now())
const timeElapsed = ref(0)

let timer: number | null = null

const quiz = computed(() => quizStore.selectedQuiz)
const currentQuestion = computed(() => quiz.value?.questions[currentQuestionIndex.value])
const isLastQuestion = computed(() => quiz.value ? currentQuestionIndex.value === quiz.value.questions.length - 1 : false)
const progress = computed(() => quiz.value ? ((currentQuestionIndex.value + 1) / quiz.value.questions.length) * 100 : 0)

onMounted(() => {
  if (!quiz.value) {
    router.push('/quiz-selection')
    return
  }

  answers.value = Array(quiz.value.questions.length).fill(null)

  timer = window.setInterval(() => {
    timeElapsed.value = Math.floor((Date.now() - startTime.value) / 1000)
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function handleAnswerSelect(answerIndex: number) {
  selectedAnswer.value = answerIndex
}

function handleNext() {
  if (selectedAnswer.value === null || !quiz.value) return

  answers.value[currentQuestionIndex.value] = selectedAnswer.value

  if (isLastQuestion.value) {
    showResult.value = true
    setTimeout(() => {
      const score = answers.value.reduce((acc, answer, idx) => {
        return acc + (answer === quiz.value!.questions[idx].correctAnswer ? 1 : 0)
      }, 0)
      const timeTaken = Math.floor((Date.now() - startTime.value) / 1000)

      if (authStore.user) {
        quizStore.completeQuiz(score, quiz.value!.questions.length, timeTaken, authStore.user.id)
      }

      router.push('/quiz-result')
    }, 1500)
  } else {
    currentQuestionIndex.value++
    selectedAnswer.value = null
  }
}

function handlePrevious() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    selectedAnswer.value = answers.value[currentQuestionIndex.value]
  }
}

function handleQuit() {
  quizStore.clearSelectedQuiz()
  router.push('/quiz-selection')
}
</script>

<template>
  <div v-if="quiz" class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h1 class="font-semibold text-gray-900">{{ quiz.title }}</h1>
            <p class="text-sm text-gray-600">
              문제 {{ currentQuestionIndex + 1 }} / {{ quiz.questions.length }}
            </p>
          </div>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 text-gray-700">
              <el-icon><Clock /></el-icon>
              <span class="font-mono font-semibold">{{ formatTime(timeElapsed) }}</span>
            </div>
            <button
              @click="handleQuit"
              class="p-2 text-gray-600 hover:text-red-600 transition-colors"
              title="퀴즈 종료"
            >
              <el-icon :size="24"><Close /></el-icon>
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            class="bg-purple-600 h-full transition-all duration-300 ease-out"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
    </header>

    <!-- Question Content -->
    <main class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="max-w-3xl w-full">
        <div v-if="!showResult" class="bg-white rounded-2xl shadow-xl p-8">
          <div class="mb-8">
            <div class="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              Question {{ currentQuestionIndex + 1 }}
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              {{ currentQuestion?.question }}
            </h2>
          </div>

          <div class="space-y-4 mb-8">
            <button
              v-for="(option, index) in currentQuestion?.options"
              :key="index"
              @click="handleAnswerSelect(index)"
              :class="[
                'w-full p-4 text-left rounded-xl border-2 transition-all',
                selectedAnswer === index
                  ? 'border-purple-600 bg-purple-50 shadow-md transform scale-[1.02]'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50'
              ]"
            >
              <div class="flex items-center gap-4">
                <div :class="[
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold',
                  selectedAnswer === index
                    ? 'border-purple-600 bg-purple-600 text-white'
                    : 'border-gray-300 text-gray-500'
                ]">
                  {{ String.fromCharCode(65 + index) }}
                </div>
                <span class="text-lg text-gray-900">{{ option }}</span>
              </div>
            </button>
          </div>

          <div class="flex items-center justify-between">
            <button
              @click="handlePrevious"
              :disabled="currentQuestionIndex === 0"
              class="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              이전
            </button>
            <button
              @click="handleNext"
              :disabled="selectedAnswer === null"
              class="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {{ isLastQuestion ? '완료' : '다음' }}
            </button>
          </div>
        </div>

        <div v-else class="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div class="mb-6">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <el-icon :size="40" class="text-green-600"><CircleCheck /></el-icon>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">퀴즈 완료!</h2>
            <p class="text-gray-600">결과를 집계하고 있습니다...</p>
          </div>
          <div class="flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
