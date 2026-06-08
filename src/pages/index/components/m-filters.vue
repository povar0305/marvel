<script lang="ts" setup>
  import { useHeroesStore } from '@/stores/heroes.ts'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import type { statuses as statuses_type } from '@/types/filters.ts'

  const heroesStore = useHeroesStore()
  const {
    universes,
    teams,
    statuses,
    selected_affiliations,
    selected_universe,
    selected_team,
    selected_status,
    affiliations,
  } = storeToRefs(heroesStore)

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
          :options="filter.options as unknown as Record<string, any>[]"
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
  </div>
</template>

<style scoped></style>
