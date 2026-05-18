<script lang="ts" setup>
  import {ref} from 'vue'

  const value1 = ref(true)
</script>

<template>
  <router-view />

  <el-switch v-model="value1" />
</template>
