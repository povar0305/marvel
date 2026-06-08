import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Hero } from '@/types/hero.ts'
import type { sort_by, sort_order, statuses } from '@/types/filters.ts'

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
  const per_page = ref(12)

  /**
   * Поисковый запрос
   */
  const search_query = ref('')

  /**
   * Выбранная вселенная для фильтрации
   */
  const selected_universe = ref<string>('all')

  /**
   * Выбранная команда для фильтрации
   */
  const selected_team = ref<string>('all')

  /**
   * Выбранная организация для фильтрации
   */
  const selected_affiliations = ref<string>('all')

  /**
   * Выбранный статус для фильтрации
   */
  const selected_status = ref<statuses | 'all'>('all')

  /**
   * Поле для сортировки
   */
  const sort_by = ref<'name' | 'powerLevel' | 'popularity' | 'age'>('name')

  /**
   * Порядок сортировки
   */
  const sort_order = ref<sort_order>('asc')

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
    resetPage()
  }

  /**
   * Общее количество героев
   */
  const total_heroes = computed(() => heroes.value?.length || 0)

  /**
   * Отфильтрованные герои
   */
  const filtered_heroes = computed(() => {
    let result = [...heroes.value]

    if (search_query.value.trim()) {
      const query = search_query.value.toLowerCase().trim()
      result = result.filter(
        (hero) =>
          hero.name.toLowerCase().includes(query) ||
          hero.realName.toLowerCase().includes(query) ||
          hero.species?.toLowerCase().includes(query) ||
          hero.universe?.toLowerCase().includes(query) ||
          hero.powers.some((power) => power.toLowerCase().includes(query)) ||
          hero.teams.some((team) => team.toLowerCase().includes(query)),
      )
    }

    if (selected_universe.value !== 'all') {
      result = result.filter((hero) => hero.universe === selected_universe.value)
    }

    if (selected_team.value !== 'all') {
      result = result.filter((hero) => hero.teams.includes(selected_team.value))
    }

    if (selected_affiliations.value !== 'all') {
      result = result.filter((hero) => hero.affiliations.includes(selected_affiliations.value))
    }

    if (selected_status.value !== 'all') {
      result = result.filter((hero) => hero.status === selected_status.value)
    }

    return result
  })

  /**
   * Отсортированные герои
   */
  const sorted_heroes = computed(() => {
    const result = [...filtered_heroes.value]
    const order = sort_order.value === 'asc' ? 1 : -1

    result.sort((a, b) => {
      const aVal = a[sort_by.value]
      const bVal = b[sort_by.value]

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * order
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * order
      }

      return 0
    })

    return result
  })

  /**
   * Общее количество отфильтрованных героев
   */
  const total_filtered = computed(() => sorted_heroes.value.length)

  /**
   * Количество страниц для отфильтрованных героев
   */
  const filtered_total_pages = computed(() => Math.ceil(total_filtered.value / per_page.value))

  /**
   * Отфильтрованные, отсортированные, с нужной страницы массив героев
   */
  const current_heroes = computed(() => {
    const start = (page.value - 1) * per_page.value
    const end = start + per_page.value
    return sorted_heroes.value.slice(start, end) || []
  })

  /**
   * Получить героя по ID
   */
  const getHeroById = computed(() => (id: string) => {
    return heroes.value.find((hero: Hero) => hero.id === id)
  })

  /**
   * Уникальные вселенные для фильтра
   */
  const universes = computed(() => {
    const set = new Set(heroes.value.map((h) => h.universe).filter(Boolean))
    return ['all', ...Array.from(set)]
  })

  /**
   * Уникальные команды для фильтра
   */
  const teams = computed(() => {
    const set = new Set(heroes.value.flatMap((h) => h.teams))
    return ['all', ...Array.from(set)]
  })
  /**
   * Уникальные организации для фильтра
   */
  const affiliations = computed(() => {
    const set = new Set(heroes.value.flatMap((h) => h.affiliations))
    return ['all', ...Array.from(set)]
  })
  /**
   * Уникальные статусы для фильтра
   */
  const statuses = computed(() => {
    const set = new Set(heroes.value.flatMap((h) => h.status))
    return ['all', ...Array.from(set)]
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

  /**
   * Установка поискового запроса
   */
  function setSearchQuery(query: string) {
    search_query.value = query
    resetPage()
  }

  /**
   * Установка фильтра по вселенной
   */
  function setUniverse(universe: string) {
    selected_universe.value = universe
    resetPage()
  }

  /**
   * Установка фильтра по команде
   */
  function setTeam(team: string) {
    selected_team.value = team
    resetPage()
  }

  /**
   * Установка фильтра по организациям
   */
  function setAffiliations(affiliations: string) {
    selected_affiliations.value = affiliations
    resetPage()
  }

  /**
   * Установка фильтра по статусу
   */
  function setStatus(status: statuses | 'all') {
    selected_status.value = status
    resetPage()
  }

  /**
   * Установка сортировки
   */
  function setSortBy(field: sort_by) {
    if (sort_by.value === field) {
      sort_order.value = sort_order.value === 'asc' ? 'desc' : 'asc'
    } else {
      sort_by.value = field
      sort_order.value = 'asc'
    }
    resetPage()
  }

  /**
   * Сброс всех фильтров
   */
  function resetFilters() {
    search_query.value = ''
    selected_universe.value = 'all'
    selected_team.value = 'all'
    selected_status.value = 'all'
    sort_by.value = 'name'
    sort_order.value = 'asc'
    resetPage()
  }

  return {
    affiliations,
    current_heroes,
    error_message,
    filtered_total_pages,
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
    resetFilters,
    resetPage,
    search_query,
    selected_affiliations,
    selected_status,
    selected_team,
    selected_universe,
    setAffiliations,
    setItemsPerPage,
    setSearchQuery,
    setSortBy,
    setStatus,
    setTeam,
    setUniverse,
    sort_by,
    sort_order,
    statuses,
    teams,
    total_filtered,
    total_heroes,
    total_pages,
    universes,
  }
})
