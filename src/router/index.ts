import { createRouter, createWebHistory } from 'vue-router'
import { MENU } from '@/constants/menu.ts'

const router = createRouter({
  history: createWebHistory('/'),
  routes: MENU,
})


/**
 * Подстановка тайтла страницы
 */
router.afterEach((to, _from, _next) => {
  const defaultTitle = 'Marvel Heroes'
  const pageTitle = (to?.meta?.title as string) || defaultTitle
  document.title = pageTitle ? `${pageTitle} | Marvel Heroes` : defaultTitle
})

export default router
