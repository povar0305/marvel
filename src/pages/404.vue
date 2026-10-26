<script lang="ts" setup></script>

<template>
  <div class="flex justify-center items-center gap-4 h-full flex-col">
    <h1>404</h1>

    <p class="text-center">
      Возможно, этот герой был стёрт из мультивселенной, или вы ошиблись с адресом.
    </p>

    <el-button color="#1d4289" @click="$router.push({ name: 'home' })">
      На главную
    </el-button>
  </div>
</template>

<style scoped></style>
