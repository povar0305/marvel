import dayjs from 'dayjs'
import type {
  Hero,
  HeroAlternateVersions,
  HeroAppearances,
  HeroColorScheme,
  HeroEnemies,
  HeroFamily,
  HeroOrigin,
  HeroPhysical,
  HeroStats,
} from '@/types/hero.ts'

// Описание одного поля для вывода
export interface HeroField {
  key: string // Ключ в объекте Hero (или вложенном объекте)
  label: string // Подпись для пользователя
  parent_key?: keyof Hero // Если поле вложенное (например, physical или stats)
  type?: 'text' | 'date' | 'array' | 'number' | 'boolean' // Как форматировать
  icon?: string // Иконка для конкретного поля (опционально)
  width?: number // Ширина блока
}
export function getHeroValue(
  hero: Hero,
  field: HeroField,
):
  | HeroPhysical
  | HeroOrigin
  | HeroStats
  | HeroEnemies
  | HeroAppearances
  | HeroFamily
  | HeroColorScheme
  | {
      twitter?: string
      instagram?: string
      facebook?: string
      officialSite?: string
    }
  | string
  | string[]
  | HeroAlternateVersions[]
  | number
  | boolean
  | null {
  if (!hero) return null

  let value:
    | string
    | boolean
    | 'Жив'
    | 'Мертв'
    | 'Неизвестно'
    | undefined
    | number
    | HeroPhysical
    | 'Мужчина'
    | 'Женщина'
    | 'Другое'
    | HeroOrigin
    | HeroStats
    | string[]
    | HeroEnemies
    | HeroAppearances
    | HeroFamily
    | HeroColorScheme
    | {
        twitter?: string
        instagram?: string
        facebook?: string
        officialSite?: string
      }
    | HeroAlternateVersions[]

  if (field.parent_key) {
    const parent = hero[field.parent_key]
    if (parent && typeof parent === 'object') {
      value = parent[field.key as keyof typeof parent]
    }
  } else {
    value = hero[field.key as keyof Hero]
  }

  if (value === undefined || value === null) return null
  if (typeof value === 'string' && value.trim() === '') return null
  if (Array.isArray(value) && value.length === 0) return null
  if (typeof value === 'number' && value === 0) return null // Если 0 - считаем пустым (опционально)

  if (field.type === 'date' && typeof value === 'string') {
    return dayjs(value).format('D MMMM YYYY г.')
  }

  if (field.type === 'boolean') {
    return value ? 'Да' : 'Нет'
  }

  if (field.type === 'array' && Array.isArray(value)) {
    return value.join(', ')
  }

  return value
}
