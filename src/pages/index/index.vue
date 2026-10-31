<script lang="ts" setup>
  import { useHeroesStore } from '@/stores/heroes.js'
  import { storeToRefs } from 'pinia'

  import MFilters from '@/pages/index/components/m-filters.vue'
  import SkeletonFilters from '@/components/m-skeleton-filters/index.vue'
  import SkeletonCardHero from '@/components/m-skeleton-card-hero/index.vue'

  const heroesStore = useHeroesStore()
  const { current_heroes, total_filtered_heroes, page, is_loading } = storeToRefs(heroesStore)

  const onChangePage: (currentPage: number, _pageSize: number) => void = (currentPage, _pageSize) => {
    if (currentPage !== page.value) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      heroesStore.goToPage(currentPage)
    }
  }
</script>

<template>
  <div class="flex flex-col gap-5">
    <template v-if="is_loading">
      <SkeletonFilters />

      <div class="grid gap-3 grid-cols-4 w-full">
        <SkeletonCardHero
          v-for="i in 12"
          :key="i"
          :count="1"
        />
      </div>
    </template>

    <template v-else>
      <m-filters />

      <div class="grid gap-3 grid-cols-4 w-full">
        <m-card-hero
          v-for="hero in current_heroes"
          :key="hero.id"
          :hero="hero"
        />
      </div>

      <div class="w-full justify-center flex">
        <el-pagination
          :total="total_filtered_heroes"
          layout="pager"
          :hide-on-single-page="true"
          @change="onChangePage"
        />
      </div>
    </template>
  </div>
</template>
