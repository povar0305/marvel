<script lang="ts" setup>
  import { ref } from 'vue'

  const value1 = ref(true)
</script>

<template>
  <h1>Marvel Heroes</h1>
  <h2>Marvel Heroes</h2>
  <h3>Marvel Heroes</h3>

  <router-view />

  <el-switch v-model="value1" />
  <p class="text-sm font-heading text-ink-black m-4">
    Marvel Heroes
  </p>
  <el-button type="primary">
    Основное действие
  </el-button>

  <!-- Должна быть красная кнопка -->
  <el-button type="danger">
    Опасное действие
  </el-button>

  <!-- Должна быть жёлтая кнопка -->
  <el-button type="warning">
    Внимание
  </el-button>
</template>
