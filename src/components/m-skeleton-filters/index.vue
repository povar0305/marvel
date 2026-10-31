<script lang="ts" setup>
  import Skeleton from '@/components/m-skeleton/index.vue'

  /**
   * Skeleton-заглушка для блока фильтров.
   * Повторяет визуальную структуру m-filters.vue.
   */
</script>

<template>
  <div class="w-full flex justify-between">
    <div class="flex gap-3 w-full">
      <div
        v-for="i in 4"
        :key="i"
        class="flex flex-col gap-0 w-full max-w-50"
      >
        <Skeleton
          height="14"
          width="60"
          shape="rect"
        />
        <Skeleton
          height="38"
          width="100%"
          shape="rounded"
        />
      </div>
    </div>

    <div class="flex gap-2 w-fit items-center">
      <Skeleton
        height="14"
        width="80"
        shape="rect"
      />
      <div class="flex gap-2">
        <Skeleton
          height="38"
          width="200"
          shape="rounded"
        />
        <Skeleton
          height="38"
          width="80"
          shape="rounded"
        />
      </div>
    </div>
  </div>
</template>
