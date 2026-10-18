<script lang="ts" setup>
  import { useFavoriteStore } from '@/stores/favorite.ts'
  import { storeToRefs } from 'pinia'

  const favoriteStore = useFavoriteStore()

  const { favorite_list, favorite_count, page } = storeToRefs(favoriteStore)

  const onChangePage: (currentPage: number, _pageSize: number) => void = (currentPage, _pageSize) => {
    if (currentPage !== page.value) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      favoriteStore.goToPage(currentPage)
    }
  }
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-if="favorite_count > 0" class="grid gap-3 grid-cols-4 w-full">
      <m-card-hero
        v-for="hero in favorite_list"
        :key="hero.id"
        :hero="hero"
      />
    </div>

    <div class="w-full justify-center flex">
      <el-pagination
        :total="favorite_count"
        layout="pager"
        :hide-on-single-page="true"
        @change="onChangePage"
      />
    </div>
  </div>
</template>

<style scoped></style>
