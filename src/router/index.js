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
    },
    {
      name: 'category',
      path: '/category/:id?',
      component: () => import('@/views/CateGory/index.vue'),
      meta: {
        isShow: true
      },
      children: [
        {
          name: 'subcategory',
          path: 'sub/:sid?',
          component: () => import('@/views/SubCateGory/index.vue'),
          meta: {
            isShow: true
          }
        }
      ]
    },
    {
      name: 'product',
      path: '/product/:id',
      component: () => import('@/views/Product/index.vue'),
      meta: {
        isShow: true
      }
    }
  ]
})

export default router
