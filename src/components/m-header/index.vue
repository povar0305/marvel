<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Back, Moon, Search, Sunny } from '@element-plus/icons-vue'

  const router = useRouter()
  const route = useRoute()

  const goBack = () => {
    router.back()
  }

  const request = ref((route.query.q as string) || '')
  const onUpdateQuery = (event_request: string) => {
    const newValue = event_request
    if (newValue) {
      request.value = newValue
    }
  }
  const onUpdateUrl = () => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        q: request.value.trim(),
      },
    })
  }
</script>

<template>
  <el-page-header @back="goBack">
    <template #icon>
      <el-icon>
        <Back />
      </el-icon>
    </template>

    <template #content>
      <div class="flex w-full gap-4 align-center">
        <span class="text-large font-600 mr-3 whitespace-nowrap leading-8">
          {{ route.meta?.title }}
        </span>

        <el-input
          :model-value="request"
          :prefix-icon="Search"
          class="min-w-[80vw] max-w-[80vw]"
          placeholder="Type something"
          @keyup.enter="onUpdateUrl"
          @update:model-value="onUpdateQuery"
        />

        <el-switch
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          :model-value="false"
        />
      </div>
    </template>
  </el-page-header>
</template>
