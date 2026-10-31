<script lang="ts" setup>
  import { useFavoriteStore } from '@/stores/favorite.ts'
  import { useHeroesStore } from '@/stores/heroes.ts'
  import { storeToRefs } from 'pinia'
  import SkeletonCardHero from '@/components/m-skeleton-card-hero/index.vue'

  const favoriteStore = useFavoriteStore()
  const heroesStore = useHeroesStore()

  const { favorite_list, favorite_count, page } = storeToRefs(favoriteStore)
  const { is_loading } = storeToRefs(heroesStore)

  const onChangePage: (currentPage: number, _pageSize: number) => void = (currentPage, _pageSize) => {
    if (currentPage !== page.value) {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      favoriteStore.goToPage(currentPage)
    }
  }
</script>

<template>
  <div class="flex flex-col gap-5">
    <template v-if="is_loading">
      <div class="grid gap-3 grid-cols-4 w-full">
        <SkeletonCardHero
          v-for="i in 4"
          :key="i"
          :count="1"
        />
      </div>
    </template>

    <template v-else>
      <div v-if="favorite_count > 0" class="grid gap-3 grid-cols-4 w-full">
        <m-card-hero
          v-for="hero in favorite_list"
          :key="hero.id"
          :hero="hero"
        />
      </div>

      <div v-else class="text-center py-10 text-text-secondary text-lg">
        Список избранного пуст
      </div>

      <div class="w-full justify-center flex">
        <el-pagination
          :total="favorite_count"
          layout="pager"
          :hide-on-single-page="true"
          @change="onChangePage"
        />
      </div>
    </template>
  </div>
</template>

<style scoped></style>
