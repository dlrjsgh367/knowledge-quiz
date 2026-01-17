import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
  },
  {
    path: '/quiz-selection',
    name: 'quiz-selection',
    component: () => import('@/views/QuizSelectionView.vue'),
  },
  {
    path: '/quiz-play',
    name: 'quiz-play',
    component: () => import('@/views/QuizPlayView.vue'),
  },
  {
    path: '/quiz-result',
    name: 'quiz-result',
    component: () => import('@/views/QuizResultView.vue'),
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('@/views/MyPageView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
