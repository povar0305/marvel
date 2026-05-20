<script lang="ts" setup>
  import MHeader from './components/m-header/index.vue'
</script>

<template>
  <m-header />

  <router-view />

  <el-backtop :bottom="100" :right="100" />
</template>
