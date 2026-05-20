<script lang="ts" setup>
  import { ref } from 'vue'

  const value1 = ref(true)
</script>

<template>
  <router-view />

  <el-switch v-model="value1" />

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
