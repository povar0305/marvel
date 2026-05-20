import { createRouter, createWebHistory } from 'vue-router'
import { MENU } from '@/constants/menu.ts'

const router = createRouter({
  history: createWebHistory('/'),
  routes: MENU,
})

router.beforeEach((to, from, next) => {
  const defaultTitle = 'Marvel Heroes'
  const pageTitle = (to?.meta?.title as string) || defaultTitle
  document.title = pageTitle ? `${pageTitle} | Marvel Heroes` : defaultTitle

  next()
})

export default router
