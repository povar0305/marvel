<script lang="ts" setup>
  import Skeleton from '@/components/m-skeleton/index.vue'

  /**
   * Skeleton-заглушка для детальной страницы героя (m-hero).
   * Повторяет структуру секций hero-страницы.
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
    class="flex flex-col gap-6 p-4"
  >
    <div class="flex flex-col gap-2 p-4">
      <div class="flex gap-4 items-center">
        <Skeleton
          width="300px"
          height="36"
          shape="rect"
        />
        <Skeleton
          height="36"
          width="36"
          shape="circle"
        />
      </div>
      <Skeleton
        width="96px"
        height="4"
        shape="rect"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-6 gap-7 w-full mx-auto p-4">
      <div class="bg-bg-overlay shadow-comic rounded-sm p-5 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <Skeleton
            height="24"
            width="24"
            shape="circle"
          />
          <Skeleton
            width="160"
            height="20"
            shape="rect"
          />
        </div>
        <div class="flex flex-col gap-3">
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
        </div>
      </div>

      <div class="bg-bg-overlay shadow-comic rounded-sm p-5 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <Skeleton
            height="24"
            width="24"
            shape="circle"
          />
          <Skeleton
            width="120"
            height="20"
            shape="rect"
          />
        </div>
        <div class="flex flex-col gap-3">
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
        </div>
      </div>

      <div class="bg-bg-overlay shadow-comic rounded-sm p-5 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <Skeleton
            height="24"
            width="24"
            shape="circle"
          />
          <Skeleton
            width="140"
            height="20"
            shape="rect"
          />
        </div>
        <div class="flex flex-col gap-3">
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
        </div>
      </div>

      <div class="bg-bg-overlay shadow-comic rounded-sm p-5 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <Skeleton
            height="24"
            width="24"
            shape="circle"
          />
          <Skeleton
            width="140"
            height="20"
            shape="rect"
          />
        </div>
        <div class="flex flex-col gap-3">
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
        </div>
      </div>

      <div class="bg-bg-overlay shadow-comic rounded-sm p-5 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <Skeleton
            height="24"
            width="24"
            shape="circle"
          />
          <Skeleton
            width="130"
            height="20"
            shape="rect"
          />
        </div>
        <div class="flex gap-3">
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
        </div>
      </div>

      <div class="bg-bg-overlay shadow-comic rounded-sm p-5 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <Skeleton
            height="24"
            width="24"
            shape="circle"
          />
          <Skeleton
            width="80"
            height="20"
            shape="rect"
          />
        </div>
        <div class="flex flex-col gap-3">
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
        </div>
      </div>

      <div class="bg-bg-overlay shadow-comic rounded-sm p-5 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <Skeleton
            height="24"
            width="24"
            shape="circle"
          />
          <Skeleton
            width="80"
            height="20"
            shape="rect"
          />
        </div>
        <div class="flex gap-3">
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
        </div>
      </div>

      <div class="bg-bg-overlay shadow-comic rounded-sm p-5 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <Skeleton
            height="24"
            width="24"
            shape="circle"
          />
          <Skeleton
            width="180"
            height="20"
            shape="rect"
          />
        </div>
        <div class="flex flex-col gap-3">
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
          <Skeleton
            height="16"
            width="100%"
            shape="rect"
          />
        </div>
      </div>
    </div>
  </div>
</template>
