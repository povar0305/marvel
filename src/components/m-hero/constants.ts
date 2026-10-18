import type { HeroField } from '@/utils/getHeroValue.ts'

// Описание секции (блока)
export interface HeroSection {
  title: string
  icon: string
  fields: HeroField[]
  col_span: number
  is_row?: boolean
}
export const HERO_SECTIONS: HeroSection[] = [
  {
    title: 'Основная информация',
    icon: 'material-symbols:badge-rounded',
    col_span: 2,
    fields: [
      { key: 'name', label: 'Псевдоним' },
      { key: 'realName', label: 'Настоящее имя' },
      { key: 'universe', label: 'Вселенная' },
      { key: 'species', label: 'Вид' },
      { key: 'gender', label: 'Пол' },
      { key: 'birthDate', label: 'Дата рождения', type: 'date' },
    ],
  },
  {
    title: 'Статус и жизнь',
    icon: 'material-symbols:monitor-heart-rounded',
    col_span: 1,
    fields: [
      { key: 'isAlive', label: 'Жив', type: 'boolean' },
      { key: 'status', label: 'Статус' },
      { key: 'causeOfDeath', label: 'Причина смерти' },
      { key: 'deathDate', label: 'Дата смерти', type: 'date' },
    ],
  },
  {
    title: 'Характеристики',
    icon: 'material-symbols:bar-chart-rounded',
    col_span: 1,
    fields: [
      { key: 'strength', label: 'Сила', parent_key: 'stats' },
      { key: 'speed', label: 'Скорость', parent_key: 'stats' },
      { key: 'intelligence', label: 'Интеллект', parent_key: 'stats' },
      { key: 'durability', label: 'Выносливость', parent_key: 'stats' },
      { key: 'energyProjection', label: 'Энергия', parent_key: 'stats' },
      { key: 'fightingSkills', label: 'Бой', parent_key: 'stats' },
    ],
  },
  {
    title: 'Происхождение',
    icon: 'material-symbols:public-rounded',
    col_span: 2,
    fields: [
      { key: 'birthPlace', label: 'Место рождения', parent_key: 'origin' },
      { key: 'citizenship', label: 'Гражданство', parent_key: 'origin' },
      { key: 'height', label: 'Рост', parent_key: 'physical' },
      { key: 'weight', label: 'Вес', parent_key: 'physical' },
    ],
  },
  {
    title: 'Способности',
    icon: 'material-symbols:auto-awesome',
    col_span: 2,
    is_row: true,
    fields: [
      { key: 'powers', label: 'Суперспособности', type: 'array' },
      { key: 'abilities', label: 'Навыки', type: 'array' },
      { key: 'equipment', label: 'Снаряжение', type: 'array' },
    ],
  },
  {
    title: 'Медиа',
    icon: 'material-symbols:movie-rounded',
    col_span: 2,
    fields: [
      { key: 'firstComic', label: 'Первый комикс', parent_key: 'appearances' },
      { key: 'firstMovie', label: 'Первый фильм', parent_key: 'appearances' },
      { key: 'moviesCount', label: 'Фильмов' },
      { key: 'comicsCount', label: 'Комиксов' },
    ],
  },
  {
    title: 'Связи',
    icon: 'material-symbols:groups-rounded',
    col_span: 2,
    is_row: true,
    fields: [
      { key: 'teams', label: 'Команды', type: 'array' },
      { key: 'affiliations', label: 'Организации', type: 'array' },
      { key: 'allies', label: 'Союзники', type: 'array' },
      { key: 'mainNemesis', label: 'Враги', parent_key: 'enemies', type: 'array' },
    ],
  },
  {
    title: 'Описание и цитаты',
    icon: 'material-symbols:menu-book-rounded',
    col_span: 6,
    fields: [
      { key: 'description', label: 'Краткое описание' },
      { key: 'fullDescription', label: 'Полное описание' },
      { key: 'quote', label: 'Цитата' },
    ],
  },
]
