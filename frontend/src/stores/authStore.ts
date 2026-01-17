import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthResponse, LoginRequest, SignupRequest, LoginResponse } from '@/types'
import client from '@/api/client'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)

  const isAuthenticated = computed(() => !!user.value)

  // Auth API
  const authApi = {
    signup: (data: SignupRequest) =>
      client.post<AuthResponse>('/auth/signup', data),
    login: (data: LoginRequest) =>
      client.post<LoginResponse>('/auth/login', data),
    logout: () =>
      client.post('/auth/logout'),
    getCurrentUser: () =>
      client.get<AuthResponse>('/auth/me'),
  }

  // Initialize auth state
  async function initAuth() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const response = await authApi.getCurrentUser()
        user.value = {
          id: response.data.id.toString(),
          username: response.data.username,
          email: response.data.email,
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        localStorage.removeItem('accessToken')
      }
    }
    isLoading.value = false
  }

  // Login
  async function login(data: LoginRequest): Promise<User> {
    const response = await authApi.login(data)
    const { accessToken, ...userData } = response.data
    localStorage.setItem('accessToken', accessToken)

    user.value = {
      id: userData.id.toString(),
      username: userData.username,
      email: userData.email,
    }

    return user.value
  }

  // Signup
  async function signup(data: SignupRequest): Promise<User> {
    await authApi.signup(data)
    // Auto login after signup
    return await login({ email: data.email, password: data.password })
  }

  // Logout
  async function logout() {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('accessToken')
      user.value = null
    }
  }

  // Set user directly (for localStorage restore)
  function setUser(userData: User | null) {
    user.value = userData
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    initAuth,
    login,
    signup,
    logout,
    setUser,
  }
})
