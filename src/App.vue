<script lang="ts" setup>
  import { useThemeStore } from './stores/theme.ts'
  import { useFavoriteStore } from '@/stores/favorite.ts'

  const themeStore = useThemeStore()

  themeStore.initTheme()

  const favoriteStore = useFavoriteStore()

  favoriteStore.loadFromSession()
</script>

<template>
  <m-header />

  <div class="mt-4 p-4 pb-20">
    <error-boundary>
      <router-view />
    </error-boundary>
  </div>

  <m-bottom-menu />
</template>
