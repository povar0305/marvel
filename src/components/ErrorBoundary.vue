<script lang="ts" setup>
  import { onErrorCaptured, ref } from 'vue'

  const hasError = ref(false)

  onErrorCaptured((err) => {
    console.error('Ошибка в компоненте:', err)
    hasError.value = true
    return false
  })

  const reset = () => {
    hasError.value = false
    window.location.reload()
  }
</script>

<template>
  <div v-if="hasError" class="flex justify-center items-center gap-4 h-full flex-col">
    <h1>500</h1>

    <p class="text-center">
      Даже Мстители иногда терпят поражение. Мы уже работаем над этим.
    </p>

    <div class="flex gap-4">
      <el-button color="#1d4289" @click="reset">
        Попробовать еще раз
      </el-button>
      <el-button @click="$router.push({ name: 'home' })">
        На главную
      </el-button>
    </div>
  </div>

  <slot v-else />
</template>

<style scoped></style>
