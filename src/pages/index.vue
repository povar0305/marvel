<script lang="ts" setup>
  import { useHeroesStore } from '@/stores/heroes.ts'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  const heroesStore = useHeroesStore()
  const { current_heroes } = storeToRefs(heroesStore)

  onMounted(() => {
    heroesStore.getHeroesData()
  })
</script>

<template>{{ current_heroes }}</template>

<style scoped></style>
