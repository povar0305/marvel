<script lang="ts" setup></script>

<template>
  <m-header />

  <router-view />

  <el-backtop :bottom="100" :right="100" />

  <m-bottom-menu />
</template>
