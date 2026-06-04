import { computed, ref } from 'vue'
import type { Hero } from '@/types/hero.ts'

/**
 * Получение данных по героям
 */
export function useHeroesData() {
  /**
   * Состояние загрузки информации по героям
   */
  const is_loading = ref(false)
  /**
   * Сообщение об ошибке
   */
  const error_message: Ref<string | null> = ref(null)

  /**
   * Полный массив героев
   */
  const heroes: Ref<Hero[], Hero[]> = ref([])
  /**
   * Общее количество героев в апи
   */
  const total_heroes = computed(() => heroes.value?.length || 0)

  /**
   * Получение информации по героям
   */
  async function getHeroesData() {
    is_loading.value = true
    error_message.value = null

    try {
      const response = await fetch('/heroes.json')
      if (!response.ok) throw new Error('Ошибка загрузки')
      const result = await response.json()

      heroes.value = result?.heroes || []
    } catch (err) {
      error_message.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    } finally {
      is_loading.value = false
    }
  }

  /**
   * Номер текущей страницы
   */
  const page = ref(1)
  /**
   * Количество результатов на странице
   */
  const per_page = ref(10)
  /**
   * Количество страниц
   */
  const total_pages = computed(() => Math.ceil(heroes.value.length / per_page.value))

  /**
   * Отфильтрованные, отсортированные, с нужной страницы массив героев
   */
  const current_heroes = computed(() => {
    const start = page.value * per_page.value
    const end = start + per_page.value

    return heroes.value?.length ? heroes.value.slice(start, end) : []
  })

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

  return {
    heroes,
    total_heroes,
    current_heroes,
    getHeroesData,
    is_loading,
  }
}
