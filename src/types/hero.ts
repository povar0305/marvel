/**
 * Статистика героя
 */
export interface HeroStats {
  strength: number // Сила (0-100)
  speed: number // Скорость (0-100)
  intelligence: number // Интеллект (0-100)
  durability: number // Выносливость (0-100)
  energyProjection: number // Энергетические атаки (0-100)
  fightingSkills: number // Навыки боя (0-100)
}

/**
 * Цветовая схема героя
 */
export interface HeroColorScheme {
  primary: string // Основной цвет
  secondary: string // Вторичный цвет
  accent: string // Акцентный цвет
}

/**
 * Размеры и вес героя
 */
export interface HeroPhysical {
  height: string // Рост (например, "5'10\" (178 см)")
  weight: string // Вес (например, "165 lbs (75 кг)")
  eyeColor: string // Цвет глаз
  hairColor: string // Цвет волос
}

/**
 * Место рождения и гражданство
 */
export interface HeroOrigin {
  birthPlace: string // Место рождения
  citizenship: string // Гражданство
  identity: string // Секретная личность (public/secret)
}

/**
 * Семейное положение и родственники
 */
export interface HeroFamily {
  maritalStatus: string // Семейное положение
  spouse: string // Супруг(а)
  children: string[] // Дети
  parents: string[] // Родители
  otherRelatives: string[] // Другие родственники
}

/**
 * Появления в медиа
 */
export interface HeroAppearances {
  firstComic: string // Первое появление в комиксе
  firstMovie: string // Первое появление в фильме
  movies: string[] // Все фильмы с героем
  tvShows: string[] // Сериалы
  games: string[] // Видеоигры
  comicBooks: string[] // Комиксы
}

/**
 * Известные враги
 */
export interface HeroEnemies {
  mainNemesis: string[] // Главные враги
  otherVillains: string[] // Другие злодеи
}

/**
 * Альтернативные версии героя
 */
export interface HeroAlternateVersions {
  universe: string // Вселенная (Earth-616, Earth-1610 и т.д.)
  name: string // Имя в этой вселенной
  description?: string // Описание
}

/**
 * Полный интерфейс героя Marvel
 */
export interface Hero {
  id: string // Уникальный идентификатор
  slug: string // URL-дружественное имя (например, "iron-man")
  name: string // Псевдоним героя
  realName: string // Настоящее имя

  isAlive: boolean // Жив ли герой
  status: 'alive' | 'deceased' | 'unknown' // Статус подробно
  causeOfDeath?: string // Причина смерти (если мёртв)

  age: number // Возраст (в годах)
  birthDate: string // Дата рождения (ISO)
  deathDate?: string // Дата смерти (если мёртв)

  physical: HeroPhysical // Физические параметры
  gender: 'male' | 'female' | 'other' // Пол

  universe: string // Вселенная (Earth-616, Earth-1610 и т.д.)
  origin: HeroOrigin // Место рождения и гражданство
  species: string // Раса (человек, асгардец, мутант и т.д.)

  stats: HeroStats // Статистика героя
  powerLevel: number // Общий уровень силы (1-10)
  popularity: number // Популярность (0-10)

  powers: string[] // Суперспособности
  abilities: string[] // Навыки и умения
  equipment: string[] // Снаряжение и оружие

  teams: string[] // Команды (Мстители, Люди Икс и т.д.)
  affiliations: string[] // Организации (Щ.И.Т., Старк Индастриз)
  allies: string[] // Союзники (ID других героев)

  enemies: HeroEnemies // Информация о врагах

  appearances: HeroAppearances // Появления в медиа
  moviesCount: number // Количество фильмов
  comicsCount: number // Количество комиксов

  family: HeroFamily // Семейное положение и родственники

  description: string // Краткое описание
  fullDescription: string // Полное описание
  quote: string // Известная цитата героя

  colorScheme: HeroColorScheme // Цветовая схема для UI

  social: {
    twitter?: string
    instagram?: string
    facebook?: string
    officialSite?: string
  }

  alternateVersions?: HeroAlternateVersions[]
}

/**
 * Фильтры для поиска героев
 */
export interface HeroFilters {
  team?: string[] // Фильтр по командам
  universe?: string[] // Фильтр по вселенным
  status?: 'alive' | 'deceased' | 'unknown' // Фильтр по статусу
  gender?: 'male' | 'female' | 'other' // Фильтр по полу
  minPowerLevel?: number // Минимальный уровень силы
  maxPowerLevel?: number // Максимальный уровень силы
  species?: string[] // Фильтр по расе
  searchQuery?: string // Поиск по имени/псевдониму
  sortBy?: 'popularity' | 'powerLevel' | 'name' | 'age' // Сортировка
  sortOrder?: 'asc' | 'desc' // Порядок сортировки
}
