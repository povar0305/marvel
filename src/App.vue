<script lang="ts" setup>
  import { useThemeStore } from './stores/theme.ts'

  const themeStore = useThemeStore()

  themeStore.initTheme()
</script>

<template>
  <m-header />

  <div class="mt-4 p-4 pb-20">
    <router-view />
  </div>

  <m-bottom-menu />
</template>
