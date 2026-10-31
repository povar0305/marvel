<script lang="ts" setup>
  import Skeleton from '@/components/m-skeleton/index.vue'

  /**
   * Skeleton-заглушка для карточки героя.
   * Повторяет визуальную структуру m-card-hero, чтобы верстка не скакала при загрузке.
   */
  withDefaults(
    defineProps<{
      count?: number
    }>(),
    {
      count: 1,
    },
  )
</script>

<template>
  <div
    v-for="i in count"
    :key="i"
    class="w-full flex flex-col gap-5 p-3 pl-4 rounded-sm overflow-hidden relative bg-bg-overlay"
  >
    <div class="absolute w-1.5 left-0 top-0 h-full skeleton" />

    <div class="flex flex-col gap-2">
      <div class="flex justify-between items-center">
        <Skeleton
          width="60%"
          height="24"
          shape="rect"
        />
        <Skeleton
          height="20"
          width="20"
          shape="circle"
        />
      </div>

      <Skeleton
        width="40%"
        height="16"
        shape="rect"
      />

      <div class="flex gap-1 w-fit">
        <Skeleton
          v-for="r in 5"
          :key="r"
          height="16"
          width="16"
          shape="circle"
        />
      </div>
    </div>

    <Skeleton
      height="64"
      width="100%"
      shape="rounded"
    />

    <div class="flex gap-3 flex-wrap">
      <Skeleton
        height="20"
        width="80"
        shape="rounded"
      />
      <Skeleton
        height="20"
        width="60"
        shape="rounded"
      />
    </div>
    <div class="flex gap-3 flex-wrap">
      <Skeleton
        height="20"
        width="100"
        shape="rounded"
      />
      <Skeleton
        height="20"
        width="70"
        shape="rounded"
      />
    </div>

    <div class="flex items-start gap-1">
      <Skeleton
        height="20"
        width="20"
        shape="circle"
      />
      <div class="flex flex-wrap gap-2">
        <Skeleton
          height="14"
          width="60"
          shape="rounded"
        />
        <Skeleton
          height="14"
          width="50"
          shape="rounded"
        />
      </div>
    </div>
  </div>
</template>
