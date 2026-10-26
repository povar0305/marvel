<script setup lang="ts">
  import { computed } from 'vue'
  import type { Hero } from '@/types/hero.ts'
  import { Icon } from '@iconify/vue'
  import { HERO_SECTIONS, type HeroSection } from '@/components/m-hero/constants.ts'
  import { getHeroValue } from '@/utils/getHeroValue.ts'
  import { useFavoriteStore } from '@/stores/favorite.ts'

  const props = defineProps<{ hero: Hero }>()

  const visibleSections = computed(() => {
    return HERO_SECTIONS.map((section: HeroSection) => {
      const visibleFields = section.fields.filter((field) => {
        const value = getHeroValue(props.hero, field)
        return value !== null && value !== undefined && value !== '' && value !== 'Нет данных'
      })
      return { ...section, fields: visibleFields }
    }).filter((section: HeroSection) => section.fields.length > 0)
  })

  const getColSpanClass = (span: number): string => {
    const classes: Record<number, string> = {
      1: '2xl:col-span-1',
      2: '2xl:col-span-2',
      3: '2xl:col-span-3',
      4: '2xl:col-span-4',
      5: '2xl:col-span-5',
      6: '2xl:col-span-6',
    }
    return classes[span] ?? '2xl:col-span-1'
  }

  const { is_favorite, toggleFavorite } = useFavoriteStore()
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2 p-4">
      <div class="flex gap-4 items-center">
        <h1 class="text-3xl font-bold text-text-title">
          {{ hero.name }}
        </h1>

        <Icon
          :class="[
            'text-4xl cursor-pointer! transition-colors',
            is_favorite(hero.id) ? 'text-red-300' : 'text-text-placeholder',
          ]"
          :icon="
            is_favorite(hero.id) ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'
          "
          @click.prevent.stop="toggleFavorite(hero)"
        />
      </div>

      <div
        class="h-1 w-24 rounded-full"
        :style="{ backgroundColor: hero.colorScheme?.primary || '#3b82f6' }"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-6 gap-7 w-full mx-auto p-4">
      <div
        v-for="section in visibleSections"
        :key="section.title"
        :class="[
          'bg-bg shadow-comic rounded-sm p-5 flex flex-col gap-6 h-full',
          getColSpanClass(section.col_span),
        ]"
      >
        <h3 class="text-lg font-bold flex items-center gap-4 text-text-title">
          <Icon :icon="section.icon" class="text-xl text-text-placeholder" />
          {{ section.title }}
        </h3>

        <div :class="[section.is_row ? 'flex gap-3' : 'flex flex-col gap-3']">
          <div
            v-for="field in section.fields"
            :key="field.key"
            class="flex flex-col gap-1 flex-1"
          >
            <div v-if="field.type === 'array'" class="flex flex-col gap-4 w-full">
              <span class="text-xs font-semibold text-text-placeholder uppercase tracking-wider">
                {{ field.label }}
              </span>

              <ul class="flex flex-col gap-1 w-auto flex-1">
                <li
                  v-for="(item, idx) in String(getHeroValue(hero, field))
                    .split(',')
                    .map((i) => i.trim())"
                  :key="idx"
                  class="text-sm text-text-regular flex items-start gap-2"
                >
                  <span class="text-text-placeholder mt-1 text-xs">•</span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <template v-else>
              <div class="flex justify-between gap-4">
                <span class="text-xs font-semibold text-text-placeholder uppercase tracking-wider">
                  {{ field.label }}
                </span>
                <span class="text-sm text-text-regular font-medium">
                  {{ getHeroValue(hero, field) }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
