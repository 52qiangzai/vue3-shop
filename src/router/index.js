import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/Home/index.vue'),
      meta: {
        isShow: true
      }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: {
        isShow: false
      }
    }
  ]
})

export default router
