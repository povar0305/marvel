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
    request.value = newValue || ''
  }
  const onUpdateUrl = () => {
    router.push({
      path: '/',
      query: {
        q: request.value.trim(),
      },
    })
  }
</script>

<template>
  <div class="flex w-full flex-1">
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
            placeholder="Search heroes by name"
            @keyup.enter="onUpdateUrl"
            @update:model-value="onUpdateQuery"
          >
            <template #suffix>
              <el-icon class="cursor-pointer el-input__icon" @click="onUpdateUrl">
                <Search />
              </el-icon>
            </template>
          </el-input>

          <el-switch
            :active-action-icon="Moon"
            :inactive-action-icon="Sunny"
            :model-value="false"
          />
        </div>
      </template>
    </el-page-header>
  </div>
</template>

<style lang="scss">
.el-page-header {
  display: flex;
  flex: 1;

  &__left {
    margin-right: 0;
    flex: 1;
  }
  &__content,
  &__header {
    display: flex;
    flex: 1;
  }
}
</style>
