import { createRouter, createWebHistory } from 'vue-router'
import HotPage from '@/views/hot/hotPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HotPage
    },
    
  ]
})

export default router
