import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Hero } from '@/types/hero.ts'

export const useHeroesStore = defineStore('heroes', () => {
  /**
   * Полный массив героев
   */
  const heroes = ref<Hero[]>([])

  /**
   * Состояние загрузки информации по героям
   */
  const is_loading = ref(false)

  /**
   * Сообщение об ошибке
   */
  const error_message = ref<string | null>(null)

  /**
   * Флаг, загружены ли данные (для кэширования)
   */
  const is_loaded = ref(false)

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
    resetPage() // Сбрасываем на первую страницу
  }

  /**
   * Общее количество героев
   */
  const total_heroes = computed(() => heroes.value?.length || 0)

  /**
   * Отфильтрованные, отсортированные, с нужной страницы массив героев
   */
  const current_heroes = computed(() => {
    const start = (page.value - 1) * per_page.value
    const end = start + per_page.value

    return heroes.value?.length ? heroes.value.slice(start, end) : []
  })

  /**
   * Получить героя по ID
   */
  const getHeroById = computed(() => (id: string) => {
    return heroes.value.find((hero: Hero) => hero.id === id)
  })

  /**
   * Получение информации по героям
   */
  async function getHeroesData() {
    // Если данные уже загружены, не грузим повторно
    if (is_loaded.value) return

    is_loading.value = true
    error_message.value = null

    try {
      const response = await fetch('/heroes.json')
      if (!response.ok) throw new Error('Ошибка загрузки')
      const result = await response.json()

      heroes.value = result?.heroes || []
      is_loaded.value = true
    } catch (err) {
      error_message.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
      is_loaded.value = false
    } finally {
      is_loading.value = false
    }
  }

  /**
   * Принудительная перезагрузка данных (если нужно обновить)
   */
  async function refetchHeroes() {
    is_loaded.value = false
    await getHeroesData()
  }

  return {
    current_heroes,
    error_message,
    getHeroById,
    getHeroesData,
    goToPage,
    heroes,
    is_loaded,
    is_loading,
    nextPage,
    page,
    per_page,
    prevPage,
    refetchHeroes,
    resetPage,
    setItemsPerPage,
    total_heroes,
    total_pages,
  }
})
