<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Back, Moon, Search, Sunny } from '@element-plus/icons-vue'
  import { useThemeStore } from '@/stores/theme.ts'
  import { storeToRefs } from 'pinia'
  import { useHeroesStore } from '@/stores/heroes.ts'
  import { debounce } from '@/utils/debounce.ts'

  const router = useRouter()
  const route = useRoute()

  const heroesStore = useHeroesStore()
  /**
   * Функция для возврата на предыдущую страницу
   */
  const goBack = () => {
    router.back()
  }
  /**
   * Поисковый запрос
   */
  const request = ref((route.query.q as string) || '')
  /**
   * Функция для установки значения поискового запроса в стор
   */
  const handleSearch = debounce(() => {
    heroesStore.setSearchQuery(request.value)
  }, 500)
  /**
   * Функция для обновления поискового запроса
   * @param event_request - поисковый запрос
   */
  const onUpdateQuery = (event_request: string) => {
    request.value = event_request || ''

    if (router.currentRoute.value.name === 'home') {
      onUpdateUrl()
      handleSearch()
    }
  }
  /**
   * Функция для обновления урла страницы
   */
  const onUpdateUrl = () => {
    heroesStore.setSearchQuery(request.value.trim() || '')

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
  <div
    class="flex flex-1 p-2 sticky shadow-comic bg-bg-overlay top-2 m-2 mt-0 rounded-sm z-[2000000000]"
  >
    <el-page-header @back="goBack">
      <template #icon>
        <el-icon>
          <Back />
        </el-icon>
      </template>

      <template #title />

      <template #content>
        <div class="flex w-full gap-4 align-center">
          <span class="text-large font-600 mr-3 whitespace-nowrap leading-8">
            {{ route.meta?.title }}
          </span>

          <el-input
            :model-value="request"
            placeholder="Поиск персонажей по имени"
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

  & .el-divider {
    margin-left: 0;
  }

  &__title {
    display: none;
  }
}
</style>
