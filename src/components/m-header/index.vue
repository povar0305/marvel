<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router'
  import { computed } from 'vue'

  const router = useRouter()
  const route = useRoute()

  const goBack = () => {
    router.back()
  }

  const can_user_go_back = computed(() => route.path !== '/')
</script>

<template>
  <el-page-header @back="goBack">
    <template #icon>
      <el-icon v-if="can_user_go_back">
        <Back />
      </el-icon>
    </template>

    <template #title />

    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </el-page-header>
</template>
