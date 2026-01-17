<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useQuizStore } from '@/stores/quizStore'

const authStore = useAuthStore()
const quizStore = useQuizStore()

onMounted(() => {
  // Load user from localStorage
  const savedUser = localStorage.getItem('quizAppUser')
  if (savedUser) {
    authStore.setUser(JSON.parse(savedUser))
  }

  // Load quiz history
  quizStore.loadHistory()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
    <router-view />
  </div>
</template>
