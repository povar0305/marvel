<script lang="ts" setup>
  import { useHeroesStore } from '@/stores/heroes.ts'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import type {
    sort_by as sort_by_type,
    sort_order as sort_order_type,
    statuses as statuses_type,
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
  } = storeToRefs(heroesStore)

  /**
   * Объект с данными по фильтрам
   */
  const filters = computed(() => {
    return [
      {
        options: universes.value,
        placeholder: 'Universes',
        modelValue: selected_universe.value,
        onUpdate: (newValue: string) => {
          heroesStore.setUniverse(newValue as statuses_type | 'all')
        },
      },
      {
        options: teams.value,
        placeholder: 'Teams',
        modelValue: selected_team.value,
        onUpdate: (newValue: string) => {
          heroesStore.setTeam(newValue)
        },
      },
      {
        options: affiliations.value,
        placeholder: 'Organizations',
        modelValue: selected_affiliations.value,
        onUpdate: (newValue: string) => {
          heroesStore.setAffiliations(newValue)
        },
      },
      {
        options: statuses.value,
        placeholder: 'Status',
        modelValue: selected_status.value,
        onUpdate: (newValue: string) => {
          heroesStore.setStatus(newValue as statuses_type | 'all')
        },
      },
    ]
  })

  const sorting = computed(() => {
    return [
      {
        options: heroesStore.sort_by_list,
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
        :options="sort.options as unknown as Record<string, any>[]"
        @update:model-value="sort.onUpdate"
      >
        <el-option
          v-for="item in sort.options"
          :key="item.key"
          :label="item.option || item"
          :value="item.key || item"
        />
      </el-select>
    </div>
  </div>
</template>

<style scoped></style>
