<script lang="ts" setup>
  import { useThemeStore } from './stores/theme.ts'

  const themeStore = useThemeStore()

  themeStore.initTheme()
</script>

<template>
  <m-header />

  <router-view />

  <m-bottom-menu />
</template>
