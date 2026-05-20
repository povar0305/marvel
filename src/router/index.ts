import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Hero from '@/pages/hero.vue'
import Favorites from '@/pages/favorite.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      meta: {
        title: 'Marvel Heroes',
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      meta: {
        title: 'Favorites',
      },
    },
    {
      path: '/hero/:id',
      name: 'hero',
      component: Hero,
      meta: {
        title: 'Hero',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const defaultTitle = 'Marvel Heroes'
  const pageTitle = (to?.meta?.title as string) || defaultTitle
  document.title = pageTitle ? `${pageTitle} | Marvel Heroes` : defaultTitle

  next()
})

export default router
