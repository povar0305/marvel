import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Hero } from '@/types/hero.ts'

export const useFavoriteStore = defineStore('favorite', () => {
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

  function toggleFavorite(hero: Hero): void {
    if (is_favorite.value(hero.id)) {
      const index = favorite_list.value.findIndex((h) => h.id === hero.id)
      favorite_list.value.splice(index, 1)
    } else {
      favorite_list.value.push(hero)
    }
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
  }
})
