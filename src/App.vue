<script lang="ts" setup>
  import { useThemeStore } from './stores/theme.ts'

  const themeStore = useThemeStore()

  themeStore.initTheme()
</script>

<template>
  <m-header />

  <router-view />

  <el-backtop :bottom="100" :right="100" />

  <m-bottom-menu />
</template>
