<script lang="ts" setup>
  import { useHeroesData } from '@/composables/useHeroesData.ts'

  const { current_heroes, getHeroesData } = useHeroesData()

  getHeroesData()
</script>

<template>{{ current_heroes }}</template>

<style scoped></style>
