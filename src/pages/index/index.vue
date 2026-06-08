<script lang="ts" setup>
  import { useHeroesStore } from '@/stores/heroes.js'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'
  import MFilters from '@/pages/index/components/m-filters.vue'

  const heroesStore = useHeroesStore()
  const { current_heroes } = storeToRefs(heroesStore)

  onMounted(() => {
    heroesStore.getHeroesData()
  })
</script>

<template>
  <div class="flex flex-col gap-2">
    <m-filters />

    <div class="grid gap-3 grid-cols-4 w-full">
      <m-card-hero
        v-for="hero in current_heroes"
        :key="hero.id"
        :hero="hero"
      />
    </div>
  </div>
</template>

<style scoped></style>
