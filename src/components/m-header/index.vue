<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Back, Moon, Search, Sunny } from '@element-plus/icons-vue'
  import { useThemeStore } from '@/stores/theme.ts'
  import { storeToRefs } from 'pinia'

  const router = useRouter()
  const route = useRoute()

  const goBack = () => {
    router.back()
  }

  const request = ref((route.query.q as string) || '')
  const onUpdateQuery = (event_request: string) => {
    request.value = event_request || ''
  }
  const onUpdateUrl = () => {
    router.push({
      path: '/',
      query: {
        q: request.value.trim(),
      },
    })
  }

  const themeStore = useThemeStore()

  const { is_dark } = storeToRefs(themeStore)
</script>

<template>
  <div class="flex flex-1 p-2 sticky shadow-comic bg-bg-overlay top-2 m-2 mt-0 rounded-sm">
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
            :model-value="is_dark"
            @update:model-value="themeStore.toggleTheme"
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
