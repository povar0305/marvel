<script lang="ts" setup>
  import { MENU } from '@/constants/menu.ts'
  import { useRoute } from 'vue-router'
  import { Icon } from '@iconify/vue'

  const route = useRoute()
  const mapped_menu = MENU.filter((item) => item.meta?.is_in_bottom_menu)
</script>

<template>
  <div class="fixed bottom-3 inset-x-0 mx-auto w-fit p-2 rounded-sm shadow-comic bg-bg-overlay">
    <el-button
      v-for="item in mapped_menu"
      :key="item.name"
      :plain="!(route.name === item.name)"
      color="#1d4289"
      @click="$router.push(item.path)"
    >
      {{ item.meta?.title }}

      <template #icon>
        <Icon :icon="item?.meta?.icon as string" v-bind="$attrs" />
      </template>
    </el-button>
  </div>
</template>
