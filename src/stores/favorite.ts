import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Hero } from '@/types/hero.ts'
import { useHeroesStore } from '@/stores/heroes.ts'

const STORAGE_KEY = 'favorite_hero_ids'

export const useFavoriteStore = defineStore('favorite', () => {
  const heroesStore = useHeroesStore()

  const favorite_list = ref<Hero[]>([])

  const favorite_count = computed(() => favorite_list.value.length)

  const page = ref(1)

  const per_page = ref(12)
  const total_pages = computed(() => Math.ceil(favorite_list.value.length / per_page.value))

  /**
   * Сброс страницы
   */
  function resetPage() {
    page.value = 1
  }

  /**
   * Следующая страница
   */
  function nextPage() {
    if (page.value < total_pages.value) page.value++
  }

  /**
   * Предыдущая страница
   */
  function prevPage() {
    if (page.value > 1) page.value--
  }

  /**
   * Перейти на конкретную страницу
   */
  function goToPage(newPage: number) {
    if (newPage >= 1 && newPage <= total_pages.value) {
      page.value = newPage
    }
  }

  /**
   * Изменить количество элементов на странице
   */
  function setItemsPerPage(count: number) {
    per_page.value = count
    resetPage()
  }

  /**
   * Сохранение ID избранных героев в sessionStorage
   */
  function saveToSession(): void {
    try {
      const ids = favorite_list.value.map((hero) => hero.id)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch (err) {
      console.error('Ошибка сохранения избранного в sessionStorage', err)
    }
  }

  /**
   * Восстановление избранного из sessionStorage
   */
  function loadFromSession(): void {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return

      const ids: string[] = JSON.parse(raw)

      if (ids.length === 0) return
      favorite_list.value = heroesStore.heroes.filter((hero) => {
        return ids.includes(hero.id)
      })
    } catch (err) {
      console.error('Ошибка восстановления избранного из sessionStorage', err)
    }
  }

  function toggleFavorite(hero: Hero): void {
    if (is_favorite.value(hero.id)) {
      const index = favorite_list.value.findIndex((h) => h.id === hero.id)
      if (index !== -1) favorite_list.value.splice(index, 1)
    } else {
      favorite_list.value.push(hero)
    }
    saveToSession()
  }

  const is_favorite = computed(() => (heroId: Hero['id']) => {
    return favorite_list.value.some((hero) => hero.id === heroId)
  })

  return {
    favorite_list,
    favorite_count,
    toggleFavorite,
    is_favorite,
    total_pages,
    page,
    per_page,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    resetPage,
    saveToSession,
    loadFromSession,
  }
})
