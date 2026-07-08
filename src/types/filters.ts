/**
 * Фильтры для поиска героев
 */
export interface HeroFilters {
  team?: string[] // Фильтр по командам
  universe?: string[] // Фильтр по вселенным
  affiliations?: string[] // Фильтр по организациям
  status?: statuses // Фильтр по статусу
  gender?: genders // Фильтр по полу
  minPowerLevel?: number // Минимальный уровень силы
  maxPowerLevel?: number // Максимальный уровень силы
  species?: string[] // Фильтр по расе
  searchQuery?: string // Поиск по имени/псевдониму
  sortBy?: sort_by // Сортировка
  sortOrder?: sort_order // Порядок сортировки
}

export type statuses = 'Жив' | 'Мертв' | 'Неизвестно'
export type genders = 'Мужчина' | 'Женщина' | 'Другое'
export type sort_by = 'popularity' | 'powerLevel' | 'name' | 'age'
export type sort_order = 'asc' | 'desc'
