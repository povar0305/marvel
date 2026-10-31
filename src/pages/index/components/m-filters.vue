<script lang="ts" setup>
  import { useHeroesStore } from '@/stores/heroes.ts'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import type {
    sort_by as sort_by_type,
    sort_order as sort_order_type,
    statuses as statuses_type
  } from '@/types/filters.ts'

  const heroesStore = useHeroesStore()
  const {
    universes,
    teams,
    statuses,
    selected_affiliations,
    selected_universe,
    selected_team,
    selected_status,
    sort_by,
    sort_order,
    affiliations,
    sort_by_list,
  } = storeToRefs(heroesStore)

  /**
   * Опция сортировки (объект с key/option)
   */
  interface SortOption {
    key: string
    option: string
  }

  /**
   * Объект с данными по фильтрам
   */
  const filters = computed(() => {
    return [
      {
        options: universes.value,
        placeholder: 'Вселенная',
        modelValue: selected_universe.value,
        onUpdate: (newValue: string) => {
          heroesStore.setUniverse(newValue)
        },
      },
      {
        options: teams.value,
        placeholder: 'Команда',
        modelValue: selected_team.value,
        onUpdate: (newValue: string) => {
          heroesStore.setTeam(newValue)
        },
      },
      {
        options: affiliations.value,
        placeholder: 'Организация',
        modelValue: selected_affiliations.value,
        onUpdate: (newValue: string) => {
          heroesStore.setAffiliations(newValue)
        },
      },
      {
        options: statuses.value,
        placeholder: 'Статус',
        modelValue: selected_status.value,
        onUpdate: (newValue: string) => {
          heroesStore.setStatus(newValue as statuses_type | 'Все')
        },
      },
    ]
  })

  /**
   * Объект с данными по сортировке
   */
  const sorting = computed(() => {
    return [
      {
        options: sort_by_list.value,
        modelValue: sort_by.value,
        filterable: true,
        onUpdate: (newValue: string) => {
          heroesStore.setSortBy(newValue as sort_by_type)
        },
      },
      {
        options: ['asc', 'desc'],
        modelValue: sort_order.value,
        filterable: false,
        classes: 'max-w-20! min-w-20!',
        onUpdate: (newValue: string) => {
          heroesStore.setSortOrder(newValue as sort_order_type)
        },
      },
    ]
  })
</script>

<template>
  <div class="w-full flex justify-between">
    <div class="flex gap-3 w-full">
      <div
        v-for="filter in filters"
        :key="filter.placeholder"
        class="flex flex-col gap-0 w-full max-w-50"
      >
        <span class="text-sm text-text-regular">
          {{ filter.placeholder }}
        </span>

        <el-select
          v-model="filter.modelValue"
          class="w-full"
          filterable
          @update:model-value="filter.onUpdate"
        >
          <el-option
            v-for="item in filter.options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
    </div>

    <div class="flex gap-2 w-fit items-center">
      <span class="text-sm text-text-regular"> Сортировка </span>

      <el-select
        v-for="(sort, index_sort) in sorting"
        :key="index_sort"
        v-model="sort.modelValue"
        :class="['w-full max-w-50 min-w-50', sort?.classes]"
        :filterable="sort.filterable"
        @update:model-value="sort.onUpdate"
      >
        <template v-if="sort.options.length > 0 && typeof sort.options[0] === 'object'">
          <el-option
            v-for="item in sort.options as SortOption[]"
            :key="item.key"
            :label="item.option"
            :value="item.key"
          />
        </template>
        <template v-else>
          <el-option
            v-for="item in sort.options as string[]"
            :key="item"
            :label="item"
            :value="item"
          />
        </template>
      </el-select>
    </div>
  </div>
</template>

<style scoped></style>
