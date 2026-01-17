<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ElMessage } from 'element-plus'
import { ArrowLeft, Message, Lock, User } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const username = ref('')
const isLoading = ref(false)

async function handleSubmit() {
  isLoading.value = true

  try {
    if (isLogin.value) {
      if (!email.value || !password.value) {
        ElMessage.error('모든 필드를 입력해주세요')
        return
      }

      const user = await authStore.login({ email: email.value, password: password.value })
      localStorage.setItem('quizAppUser', JSON.stringify(user))
      ElMessage.success('로그인 성공!')
      router.push('/')
    } else {
      if (!email.value || !password.value || !username.value) {
        ElMessage.error('모든 필드를 입력해주세요')
        return
      }

      if (password.value.length < 6) {
        ElMessage.error('비밀번호는 6자 이상이어야 합니다')
        return
      }

      const user = await authStore.signup({
        email: email.value,
        password: password.value,
        username: username.value,
      })
      localStorage.setItem('quizAppUser', JSON.stringify(user))
      ElMessage.success('회원가입 성공!')
      router.push('/')
    }
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || '요청 중 오류가 발생했습니다.'
    ElMessage.error(errorMessage)
  } finally {
    isLoading.value = false
  }
}

function toggleMode() {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <button
        @click="router.push('/')"
        class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <el-icon><ArrowLeft /></el-icon>
        <span>돌아가기</span>
      </button>

      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <el-icon :size="32" class="text-purple-600"><User /></el-icon>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">
            {{ isLogin ? '로그인' : '회원가입' }}
          </h2>
          <p class="text-gray-600 mt-2">
            {{ isLogin ? '계정에 로그인하세요' : '새 계정을 만드세요' }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div v-if="!isLogin">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              사용자 이름
            </label>
            <div class="relative">
              <el-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><User /></el-icon>
              <input
                v-model="username"
                type="text"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="닉네임을 입력하세요"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <div class="relative">
              <el-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Message /></el-icon>
              <input
                v-model="email"
                type="email"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="이메일을 입력하세요"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <div class="relative">
              <el-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Lock /></el-icon>
              <input
                v-model="password"
                type="password"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>

          <el-button
            type="primary"
            native-type="submit"
            :loading="isLoading"
            class="w-full !py-3 !text-base"
          >
            {{ isLogin ? '로그인' : '회원가입' }}
          </el-button>
        </form>

        <div class="mt-6 text-center">
          <button
            @click="toggleMode"
            class="text-purple-600 hover:text-purple-700 font-medium"
          >
            {{ isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
