<script lang="ts" setup>
  import type { Hero } from '@/types/hero.ts'
  import { Icon } from '@iconify/vue'

  defineProps<{
    hero: Hero
  }>()

  /**
   * Функция для получения иконки гендера
   * @param gender
   */
  const getIconGender = (gender: string) => {
    const iconsByGender = {
      male: 'material-symbols:male-rounded',
      female: 'material-symbols:female-rounded',
      other: 'material-symbols:question-mark-rounded',
    }
    return iconsByGender[gender.toLowerCase() as keyof typeof iconsByGender] || iconsByGender.other
  }

  /**
   * Интерфейс для описания свойств героя, которые выводим скопом
   */
  interface PropertyItem {
    icon: string
    key: string
    parent_key?: 'stats' | 'physical' | 'origin'
    tippy_text?: string | null | undefined
  }

  /**
   * Массив из объектов для вывода свойств героя, разделенный по группам
   */
  const properties_key: PropertyItem[][] = [
    [
      {
        icon: 'material-symbols:globe',
        key: 'universe',
        tippy_text: 'Universe in which the hero appears',
      },
      {
        icon: 'material-symbols:person',
        key: 'species',
        tippy_text: 'Species of the hero',
      },
    ],
    [
      {
        icon: 'material-symbols:speed',
        key: 'speed',
        parent_key: 'stats',
        tippy_text: 'Speed of the hero',
      },
      {
        icon: 'material-symbols:fitness-center',
        key: 'strength',
        parent_key: 'stats',
        tippy_text: 'Strength of the hero',
      },
      {
        icon: 'material-symbols:psychology',
        key: 'intelligence',
        parent_key: 'stats',
        tippy_text: 'Intelligence of the hero',
      },
      {
        icon: 'material-symbols:sports-martial-arts',
        key: 'fightingSkills',
        parent_key: 'stats',
        tippy_text: 'Fighting skills of the hero',
      },
    ],
    [
      {
        icon: 'material-symbols:groups',
        key: 'teams',
        tippy_text: 'Teams the hero belongs to',
      },
    ],
    [
      {
        icon: 'material-symbols:movie',
        key: 'moviesCount',
        tippy_text: 'Movies in which the hero appears',
      },
      {
        icon: 'material-symbols:menu-book',
        key: 'comicsCount',
        tippy_text: 'Comics in which the hero appears',
      },
    ],
  ]
  /**
   * Функция для получения значения свойства героя
   * @param hero {Hero} - объект с информацией по герою
   * @param item {PropertyItem} - объект с информацией по данным, которые хотим получить из героя
   */
  const getPropertyValue = (hero: Hero, item: PropertyItem): any => {
    if (!hero) return null

    if (item.parent_key) {
      const parent = hero[item.parent_key]
      if (parent && typeof parent === 'object' && !Array.isArray(parent)) {
        const value = parent[item.key as keyof typeof parent]
        if (value === undefined || value === null) return null
        return value
      }
      return null
    }

    const value = hero[item.key as keyof Hero]

    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value === '') ||
      (typeof value === 'number' && value === 0) ||
      (Array.isArray(value) && value.length === 0)
    )
      return null

    if (Array.isArray(value)) {
      return value.join(', ')
    }

    return value
  }
</script>

<template>
  <a
    :class="[
      'w-full flex flex-col bg-bg! overflow-hidden relative gap-5 shadow-comic transition duration-300 ease-in-out p-3 pl-4 rounded-sm',
      hero?.isAlive ? ' hover:bg-bg-overlay! ' : 'grayscale-[0.5] opacity-70 hover:opacity-100',
    ]"
    :href="`hero/${hero.id}`"
    target="_blank"
  >
    <div
      :style="{
        backgroundColor: hero?.colorScheme?.secondary,
      }"
      class="absolute w-1.5 left-0 top-0 h-full"
    />

    <div class="flex flex-col">
      <h2 class="text-xl font-600 text-text-title leading-none flex gap-1 flex-wrap items-center">
        {{ hero.name }}

        <Icon
          v-tippy="{ content: `Gender: ${hero.gender}` }"
          :class="[
            'text-md',
            { 'text-blue-300': hero.gender === 'male' },
            { 'text-pink-300': hero.gender === 'female' },
          ]"
          :icon="getIconGender(hero.gender)"
        />

        <Icon
          v-if="hero.causeOfDeath"
          v-tippy="{ content: `Cause of death: ${hero.causeOfDeath}` }"
          icon="material-symbols:skull-outline"
        />
      </h2>

      <span class="text-sm text-text-regular">
        {{ hero.realName }}
      </span>

      <el-rate
        v-tippy="{ content: `Popularity: ${hero.popularity}` }"
        :model-value="Number(hero.popularity) / 2"
        allow-half
        class="w-fit **:cursor-pointer! text-warning"
        disabled
      />
    </div>

    <div v-if="hero?.quote?.length" class="relative w-full p-3 bg-bg-page rounded-sm">
      <Icon
        class="text-text-placeholder absolute -top-2 -left-2 text-xl"
        icon="material-symbols:format-quote-rounded"
      />

      <p class="text-sm text-text-regular">
        {{ hero?.quote }}
      </p>
    </div>

    <div class="flex gap-4 flex-col">
      <div
        v-for="(property, index_property) in properties_key"
        :key="index_property"
        class="flex gap-3 flex-wrap"
      >
        <span
          v-for="item in property"
          v-show="getPropertyValue(hero, item)"
          :key="item.key"
          v-tippy="{ content: item.tippy_text }"
          class="flex gap-1 items-center"
        >
          <Icon :icon="item?.icon" class="text-md text-text-placeholder" />

          <p class="text-sm text-text-regular">
            {{ getPropertyValue(hero, item) }}
          </p>
        </span>
      </div>
    </div>

    <div v-if="hero.powers.length" class="flex items-start gap-1">
      <Icon
        class="text-md w-4! min-w-4 text-text-placeholder"
        icon="material-symbols:auto-awesome"
      />

      <div class="flex flex-wrap gap-2">
        <span
          v-for="power in hero.powers.slice(0, 2)"
          :key="power"
          class="text-xs text-text-regular"
        >
          {{ power }}
        </span>

        <p
          v-if="hero.powers.length > 2"
          class="text-xs text-text-placeholder leading-3 flex items-center ml-1"
        >
          +{{ hero.powers.length - 2 }}
        </p>
      </div>
    </div>

    <div
      v-if="!hero?.isAlive"
      v-tippy="{ content: `Hero is ${hero.status}` }"
      class="absolute -bottom-7 right-0 w-4 h-25 rotate-45 -translate-x-4 -translate-y-1 bg-black/80 py-1"
    />
  </a>
</template>
