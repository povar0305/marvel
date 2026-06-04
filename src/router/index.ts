import { createRouter, createWebHistory } from 'vue-router'
import { MENU } from '@/constants/menu.ts'

const router = createRouter({
  history: createWebHistory('/'),
  routes: MENU,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach((to, _from, _next) => {
  const defaultTitle = 'Marvel Heroes'
  const pageTitle = (to?.meta?.title as string) || defaultTitle
  document.title = pageTitle ? `${pageTitle} | Marvel Heroes` : defaultTitle

  return true
})

export default router
