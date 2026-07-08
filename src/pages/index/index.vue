<script lang="ts" setup>
  import { useHeroesStore } from '@/stores/heroes.js'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  import MFilters from '@/pages/index/components/m-filters.vue'

  const heroesStore = useHeroesStore()
  const { current_heroes, total_filtred_heroes, page } = storeToRefs(heroesStore)

  const onChangePage: (currentPage: number, _pageSize: number) => void = (currentPage, _pageSize) => {
    if (currentPage !== page.value) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      heroesStore.goToPage(currentPage)
    }
  }

  onMounted(() => {
    heroesStore.getHeroesData()
  })
</script>

<template>
  <div class="flex flex-col gap-5">
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
        :total="total_filtred_heroes"
        layout="pager"
        :hide-on-single-page="true"
        @change="onChangePage"
      />
    </div>
  </div>
</template>

<style>
.el-pager {
  gap: 0.5rem;
}
</style>
