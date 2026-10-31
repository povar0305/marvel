<script lang="ts" setup>
  import { useHeroesStore } from '@/stores/heroes.ts'
  import { useRoute } from 'vue-router'
  import { computed, onMounted } from 'vue'
  import SkeletonHero from '@/components/m-skeleton-hero/index.vue'

  const route = useRoute()
  const heroesStore = useHeroesStore()

  const heroId = computed(() => String(route.params.id))

  const hero = computed(() => heroesStore.getHeroById(heroId.value))

  onMounted(async () => {
    if (!heroesStore.is_loaded) {
      await heroesStore.getHeroesData()
    }
  })
</script>

<template>
  <div>
    <div v-if="hero">
      <m-hero :hero="hero" />
    </div>

    <SkeletonHero v-else-if="heroesStore.is_loading" />

    <div v-else-if="heroesStore.is_loaded" class="text-center py-10 text-red-500">
      Герой не найден
    </div>
  </div>
</template>
