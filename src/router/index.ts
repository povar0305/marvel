import { createRouter, createWebHistory } from 'vue-router'
import { MENU } from '@/constants/menu.ts'
import { useHeroesStore } from '@/stores/heroes.ts'
import { useFavoriteStore } from '@/stores/favorite.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: MENU,
})

/**
 * Подстановка тайтла страницы
 */
router.afterEach(async (to, _from, _next) => {
  const defaultTitle = 'Marvel Heroes'
  const pageTitle = (to?.meta?.title as string) || defaultTitle

  const heroesStore = useHeroesStore()
  const favoriteStore = useFavoriteStore()

  if (!heroesStore.is_loaded) {
    await heroesStore.getHeroesData()

    if (heroesStore.is_loaded) {
      favoriteStore.loadFromSession()
    }
  }
  document.title = pageTitle ? `${pageTitle} | Marvel Heroes` : defaultTitle
})

export default router
