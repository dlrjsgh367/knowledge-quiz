<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ElButton } from 'element-plus'
import { Trophy, VideoPlay, User, SwitchButton } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.setUser(null)
  localStorage.removeItem('quizAppUser')
}

function handleStartQuiz() {
  if (authStore.user) {
    router.push('/quiz-selection')
  } else {
    router.push('/auth')
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <el-icon :size="32" class="text-purple-600"><Trophy /></el-icon>
          <h1 class="text-2xl font-bold text-gray-900">퀴즈 마스터</h1>
        </div>

        <div v-if="authStore.user" class="flex items-center gap-4">
          <button
            @click="router.push('/mypage')"
            class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
          >
            <el-icon><User /></el-icon>
            <span>{{ authStore.user.username }}</span>
          </button>
          <button
            @click="handleLogout"
            class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <el-icon><SwitchButton /></el-icon>
            <span>로그아웃</span>
          </button>
        </div>
        <el-button
          v-else
          type="primary"
          @click="router.push('/auth')"
        >
          로그인
        </el-button>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="flex-1 flex items-center justify-center px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6">
            <el-icon :size="48" class="text-purple-600"><Trophy /></el-icon>
          </div>
          <h2 class="text-5xl font-bold text-gray-900 mb-4">
            퀴즈로 배우는 즐거움
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            다양한 카테고리의 퀴즈를 풀며 지식을 넓혀보세요
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <el-button
            type="primary"
            size="large"
            @click="handleStartQuiz"
            class="!px-8 !py-6 !text-lg !rounded-xl"
          >
            <el-icon class="mr-2"><VideoPlay /></el-icon>
            퀴즈 시작하기
          </el-button>

          <el-button
            v-if="!authStore.user"
            size="large"
            @click="router.push('/auth')"
            class="!px-8 !py-6 !text-lg !rounded-xl"
          >
            <el-icon class="mr-2"><User /></el-icon>
            회원가입
          </el-button>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div class="p-6 bg-white rounded-xl shadow-md">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span class="text-2xl">📚</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">다양한 카테고리</h3>
            <p class="text-gray-600 text-sm">
              역사, 과학, 문화 등 다양한 주제의 퀴즈
            </p>
          </div>

          <div class="p-6 bg-white rounded-xl shadow-md">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">난이도 선택</h3>
            <p class="text-gray-600 text-sm">
              초급부터 고급까지 실력에 맞게 선택
            </p>
          </div>

          <div class="p-6 bg-white rounded-xl shadow-md">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span class="text-2xl">📊</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">성적 추적</h3>
            <p class="text-gray-600 text-sm">
              내 퀴즈 기록과 통계를 확인하세요
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-6">
      <div class="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
        © 2026 퀴즈 마스터. All rights reserved.
      </div>
    </footer>
  </div>
</template>
