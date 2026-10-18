import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Hero } from '@/types/hero.ts'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorite = ref<Hero[]>([])

  const favoriteCount = computed(() => favorite.value.length)

  function toggleFavorite(hero: Hero): void {
    if (isFavorite.value(hero.id)) {
      const index = favorite.value.findIndex((h) => h.id === hero.id)
      favorite.value.splice(index, 1)
    } else {
      favorite.value.push(hero)
    }
  }
  const isFavorite = computed(() => (heroId: Hero['id']) => {
    return favorite.value.some((hero) => hero.id === heroId)
  })

  return {
    favorite,
    favoriteCount,
    toggleFavorite,
    isFavorite,
  }
})
