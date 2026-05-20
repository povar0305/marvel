import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Favorite from '@/pages/favorite.vue'
import Hero from '@/pages/hero.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
    },
    {
      path: '/hero/:id',
      name: 'hero',
      component: Hero,
    },
  ],
})

export default router
